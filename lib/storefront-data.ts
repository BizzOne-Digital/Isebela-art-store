import { connectMongo, hasMongoConfig } from './db';
import { Artwork } from './models/Artwork';
import { Category } from './models/Category';
import { toProductView, toPlain, type ArtworkLean } from './artwork-adapter';
import type { Product } from './products';
import type { AppLocale } from '@/i18n/routing';

export interface CategoryView {
  _id: string;
  name: string;
  /** The original (Spanish) category name — the stable join key stored on Artwork.category. Always use this, never `name`, to match/filter artworks by category. */
  canonicalName: string;
  slug: string;
  description?: string;
  image?: string;
  displayOrder?: number;
}

interface CategoryDocPlain {
  _id: unknown;
  name: string;
  nameEn?: string;
  slug: string;
  description?: string;
  descriptionEn?: string;
  image?: string;
  displayOrder?: number;
}

function localizeCategory(doc: CategoryDocPlain, locale: AppLocale): CategoryView {
  return {
    _id: String(doc._id),
    name: locale === 'en' && doc.nameEn ? doc.nameEn : doc.name,
    canonicalName: doc.name,
    slug: doc.slug,
    description: locale === 'en' && doc.descriptionEn ? doc.descriptionEn : doc.description,
    image: doc.image,
    displayOrder: doc.displayOrder,
  };
}

export async function getPublishedCatalog(locale: AppLocale = 'es'): Promise<{
  products: Product[];
  categories: CategoryView[];
}> {
  if (!hasMongoConfig()) {
    return { products: [], categories: [] };
  }

  await connectMongo();

  const [artworkDocs, categoryDocs] = await Promise.all([
    Artwork.find({ status: 'published' }).sort({ displayOrder: 1, createdAt: -1 }).lean(),
    Category.find({ isActive: true }).sort({ displayOrder: 1, name: 1 }).lean(),
  ]);

  return {
    products: artworkDocs.map((doc) => toProductView(toPlain(doc) as ArtworkLean, locale)),
    categories: toPlain(categoryDocs).map((doc) => localizeCategory(doc as CategoryDocPlain, locale)),
  };
}
