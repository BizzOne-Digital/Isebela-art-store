/**
 * SAFE TO DELETE — leftover scratch file from the media-seed session.
 *
 * Read-only: reports any Category document that `lib/media-catalog.ts` does
 * not define, plus how many artworks reference it. It writes nothing, so
 * running it by accident cannot change data.
 *
 *   npx tsx lib/inspect-junk.tmp.ts
 */
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectMongo } from './db';
import { Artwork } from './models/Artwork';
import { Category } from './models/Category';
import { categorySeeds } from './media-catalog';

dotenv.config({ path: '.env.local' });
dotenv.config();

async function main() {
  await connectMongo();

  const seeded = new Set(categorySeeds.map((category) => category.slug));
  const all = (await Category.find({}).sort({ displayOrder: 1 }).lean()) as any[];
  const orphans = all.filter((category) => !seeded.has(category.slug));

  console.log(
    `Categories: ${all.length} total, ${seeded.size} defined by the seed, ${orphans.length} orphaned.`,
  );

  for (const category of orphans) {
    const usedBy = await Artwork.countDocuments({ category: category.name });
    console.log(
      `\n  orphan: "${category.name}" [${category.slug}] _id=${category._id} ` +
        `active=${category.isActive} artworks=${usedBy}`,
    );
    console.log(
      usedBy === 0
        ? '    -> safe to remove from Admin > Dashboard > Categories'
        : '    -> still in use; reassign those artworks before removing',
    );
  }

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error instanceof Error ? error.message : error);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
