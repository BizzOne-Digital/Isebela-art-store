/**
 * Unified media seed: pushes every product image and video in
 * `public/images/img` into MongoDB as Category / Artwork / Video documents.
 *
 *   npm run seed:media              upsert everything (safe to re-run)
 *   npm run seed:media -- --dry-run  audit + validate only, no writes
 *   npm run seed:media -- --fresh    DELETE all categories/artworks/videos first
 *
 * Idempotent: categories and artworks are matched on `slug`, videos on
 * `videoUrl`, so re-running updates in place instead of duplicating.
 *
 * Every payload is run through the same zod schemas the admin API uses
 * (`lib/validation.ts`) before it is written, so seeded records are exactly as
 * valid as hand-entered ones — over-long copy or a bad path fails loudly here
 * instead of silently landing in the database.
 */
import { existsSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import { connectMongo, hasMongoConfig } from './db';
import { Artwork } from './models/Artwork';
import { Category } from './models/Category';
import { Video } from './models/Video';
import { products as staticProducts, type Product } from './products';
import { artworkSchema, categorySchema, videoSchema } from './validation';
import {
  brandAssets,
  categorySeeds,
  productTranslations,
  videoSeeds,
} from './media-catalog';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MEDIA_DIR = path.join(process.cwd(), 'public', 'images', 'img');
const MEDIA_URL_PREFIX = '/images/img';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const fresh = args.includes('--fresh');

const problems: string[] = [];
const warnings: string[] = [];

/** Every local media path a product references, primary image first. */
function imagePathsOf(product: Product): string[] {
  return [product.image, ...(product.secondaryImages ?? [])];
}

/** `/images/img/is12.png` -> absolute path on disk. */
function toDiskPath(mediaUrl: string): string {
  return path.join(process.cwd(), 'public', ...mediaUrl.replace(/^\//, '').split('/'));
}

/**
 * Sort key for the catalog. Product ids are `prod-<n>` where <n> matches the
 * image number, so this keeps the storefront order aligned with the source
 * photos and makes `displayOrder` stable across re-seeds (the model's fallback
 * sort is `createdAt`, which would reshuffle the catalog on every wipe).
 */
function displayOrderOf(product: Product): number {
  const parsed = Number.parseInt(product.id.replace(/^prod-/, ''), 10);
  return Number.isFinite(parsed) ? Math.min(parsed, 1000) : 0;
}

/**
 * Cross-checks the catalog against what is actually on disk, in both
 * directions, before anything is written.
 */
async function auditMediaFolder() {
  if (!existsSync(MEDIA_DIR)) {
    problems.push(`Media folder not found: ${MEDIA_DIR} (run this from the project root).`);
    return;
  }

  const onDisk = new Set(
    (await readdir(MEDIA_DIR, { withFileTypes: true }))
      .filter((entry) => entry.isFile())
      .map((entry) => `${MEDIA_URL_PREFIX}/${entry.name}`),
  );

  const referenced = new Set<string>(brandAssets);

  for (const product of staticProducts) {
    for (const image of imagePathsOf(product)) {
      referenced.add(image);
      if (!onDisk.has(image)) {
        problems.push(`${product.slug}: image is missing from disk -> ${image}`);
      }
    }
  }

  for (const video of videoSeeds) {
    referenced.add(video.videoUrl);
    if (!onDisk.has(video.videoUrl)) {
      problems.push(`Video file is missing from disk -> ${video.videoUrl}`);
    }
  }

  for (const category of categorySeeds) {
    if (category.image && !onDisk.has(category.image)) {
      problems.push(`Category "${category.name}": cover image is missing -> ${category.image}`);
    }
  }

  // Anything on disk the catalog does not account for is almost always a newly
  // dropped-in photo that nobody wrote metadata for yet.
  for (const file of [...onDisk].sort()) {
    if (!referenced.has(file)) {
      warnings.push(`Unseeded file in public${file} — add it to lib/products.ts to publish it.`);
    }
  }
}

/**
 * Guards the join between the two collections: `Artwork.category` stores the
 * Spanish category *name*, so a product pointing at a category with no seed
 * definition would be published into a category the storefront cannot render.
 */
function auditCategoryCoverage() {
  const defined = new Set(categorySeeds.map((category) => category.name));
  const used = new Set(staticProducts.map((product) => product.category));

  for (const name of [...used].sort()) {
    if (!defined.has(name)) {
      problems.push(
        `Category "${name}" is used by products but has no definition in lib/media-catalog.ts.`,
      );
    }
  }

  for (const category of categorySeeds) {
    if (category.isActive && !used.has(category.name)) {
      warnings.push(
        `Category "${category.name}" is active but has no products — it will render as an empty filter.`,
      );
    }
  }
}

function buildCategoryPayloads() {
  return categorySeeds.map((category) => categorySchema.parse(category));
}

function buildArtworkPayloads() {
  return staticProducts.map((product) => {
    const translation = productTranslations[product.slug];
    if (!translation) {
      warnings.push(`${product.slug}: no English translation — will fall back to Spanish copy.`);
    }

    return artworkSchema.parse({
      name: product.name,
      nameEn: translation?.nameEn ?? '',
      slug: product.slug,
      description: product.description,
      descriptionEn: translation?.descriptionEn ?? '',
      shortDescription: product.shortDescription,
      shortDescriptionEn: translation?.shortDescriptionEn ?? '',
      images: imagePathsOf(product),
      category: product.category,
      price: product.price ?? '',
      priceLabel: product.priceLabel ?? '',
      materials: product.materials ?? [],
      colors: [],
      tags: product.tags ?? [],
      features: product.features ?? [],
      featured: Boolean(product.isFeatured),
      isNewArrival: Boolean(product.isNew),
      isSeasonal: Boolean(product.isSeasonal),
      availability: product.availability,
      status: 'published',
      displayOrder: displayOrderOf(product),
    });
  });
}

function buildVideoPayloads() {
  return videoSeeds.map((video) =>
    videoSchema.parse({
      ...video,
      // Both files live in /public, so there is no Cloudinary id to store and
      // no separate poster frame — the <video> element falls back to frame one.
      videoPublicId: '',
      thumbnail: '',
      thumbnailPublicId: '',
      isActive: true,
    }),
  );
}

async function seedMedia() {
  if (!hasMongoConfig()) {
    throw new Error('MONGODB_URI is not configured. Add it to .env.local before seeding.');
  }

  await auditMediaFolder();
  auditCategoryCoverage();

  const categoryPayloads = buildCategoryPayloads();
  const artworkPayloads = buildArtworkPayloads();
  const videoPayloads = buildVideoPayloads();

  for (const warning of warnings) {
    console.warn(`  warn  ${warning}`);
  }

  if (problems.length > 0) {
    throw new Error(
      `Media audit failed with ${problems.length} problem(s):\n  - ${problems.join('\n  - ')}`,
    );
  }

  console.log(
    `Audit passed: ${categoryPayloads.length} categories, ${artworkPayloads.length} artworks, ` +
      `${videoPayloads.length} videos, ${brandAssets.length} brand assets skipped.`,
  );

  if (dryRun) {
    console.log('--dry-run: nothing was written.');
    return { categories: 0, artworks: 0, videos: 0, deleted: 0 };
  }

  await connectMongo();

  let deleted = 0;
  if (fresh) {
    console.warn('--fresh: deleting all existing categories, artworks and videos...');
    const results = await Promise.all([
      Category.deleteMany({}),
      Artwork.deleteMany({}),
      Video.deleteMany({}),
    ]);
    deleted = results.reduce((total, result) => total + (result.deletedCount ?? 0), 0);
  }

  for (const category of categoryPayloads) {
    await Category.updateOne({ slug: category.slug }, { $set: category }, { upsert: true });
  }

  for (const artwork of artworkPayloads) {
    await Artwork.updateOne({ slug: artwork.slug }, { $set: artwork }, { upsert: true });
  }

  for (const video of videoPayloads) {
    await Video.updateOne({ videoUrl: video.videoUrl }, { $set: video }, { upsert: true });
  }

  return {
    categories: categoryPayloads.length,
    artworks: artworkPayloads.length,
    videos: videoPayloads.length,
    deleted,
  };
}

seedMedia()
  .then(async (result) => {
    if (!dryRun) {
      console.log(
        `Seeded ${result.categories} categories, ${result.artworks} artworks and ` +
          `${result.videos} videos${result.deleted ? ` (removed ${result.deleted} old documents)` : ''}.`,
      );
    }
    await mongoose.disconnect().catch(() => {});
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Seed media failed:', error instanceof Error ? error.message : error);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  });
