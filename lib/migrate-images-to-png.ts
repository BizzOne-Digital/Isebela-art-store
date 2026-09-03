/**
 * One-off migration: repoint stored image paths from the original JPGs to the
 * background-removed PNGs in `public/images/img`.
 *
 *   npx tsx lib/migrate-images-to-png.ts --dry-run   report what would change
 *   npx tsx lib/migrate-images-to-png.ts             apply
 *
 * Only the image path fields are touched, so any copy edited through the admin
 * UI since the last seed survives. `is2` / `is4` are the brand illustrations
 * (see `brandAssets` in lib/media-catalog.ts) — they keep their backgrounds and
 * are deliberately left as `.jpg`.
 */
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import { connectMongo, hasMongoConfig } from './db';
import { Artwork } from './models/Artwork';
import { Category } from './models/Category';

dotenv.config({ path: '.env.local' });
dotenv.config();

const dryRun = process.argv.slice(2).includes('--dry-run');

/** Brand illustrations that were not background-removed. */
const KEEP_AS_JPG = new Set(['is2', 'is4']);

/** `/images/img/is13.jpg` -> `/images/img/is13.png`; anything else untouched. */
function toPng(path: string): string {
  const match = /^\/images\/img\/(is\d+)\.jpe?g$/i.exec(path);
  if (!match || KEEP_AS_JPG.has(match[1])) {
    return path;
  }
  return `/images/img/${match[1]}.png`;
}

async function migrate() {
  if (!hasMongoConfig()) {
    throw new Error('MONGODB_URI is not configured. Add it to .env.local before migrating.');
  }
  await connectMongo();

  let artworksChanged = 0;
  let pathsChanged = 0;

  for (const artwork of await Artwork.find({}, 'slug images').lean()) {
    const images: string[] = artwork.images ?? [];
    const next = images.map(toPng);
    const changed = next.filter((path, i) => path !== images[i]).length;
    if (changed === 0) continue;

    artworksChanged += 1;
    pathsChanged += changed;
    console.log(`  ${artwork.slug}: ${images.join(', ')}\n    -> ${next.join(', ')}`);
    if (!dryRun) {
      await Artwork.updateOne({ _id: artwork._id }, { $set: { images: next } });
    }
  }

  let categoriesChanged = 0;
  for (const category of await Category.find({}, 'slug image').lean()) {
    const image: string = category.image ?? '';
    const next = toPng(image);
    if (next === image) continue;

    categoriesChanged += 1;
    console.log(`  category ${category.slug}: ${image} -> ${next}`);
    if (!dryRun) {
      await Category.updateOne({ _id: category._id }, { $set: { image: next } });
    }
  }

  return { artworksChanged, pathsChanged, categoriesChanged };
}

migrate()
  .then(async (result) => {
    console.log(
      `\n${dryRun ? '[dry-run] would update' : 'Updated'} ` +
        `${result.pathsChanged} image path(s) across ${result.artworksChanged} artwork(s) ` +
        `and ${result.categoriesChanged} category cover(s).`,
    );
    await mongoose.disconnect().catch(() => {});
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('Migration failed:', error instanceof Error ? error.message : error);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  });
