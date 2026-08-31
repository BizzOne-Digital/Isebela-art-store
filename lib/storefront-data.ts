import { connectMongo, hasMongoConfig } from './db';
import { Artwork } from './models/Artwork';
import { Category } from './models/Category';
import { Video } from './models/Video';
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

export interface VideoView {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  tag?: string;
  videoUrl: string;
  thumbnail?: string;
  displayOrder?: number;
}

interface VideoDocPlain {
  _id: unknown;
  title: string;
  titleEn?: string;
  subtitle?: string;
  subtitleEn?: string;
  description?: string;
  descriptionEn?: string;
  tag?: string;
  tagEn?: string;
  videoUrl: string;
  thumbnail?: string;
  displayOrder?: number;
}

function localizeVideo(doc: VideoDocPlain, locale: AppLocale): VideoView {
  const pick = (es?: string, en?: string) => (locale === 'en' && en ? en : es || '');
  return {
    _id: String(doc._id),
    title: pick(doc.title, doc.titleEn),
    subtitle: pick(doc.subtitle, doc.subtitleEn),
    description: pick(doc.description, doc.descriptionEn),
    tag: pick(doc.tag, doc.tagEn),
    videoUrl: doc.videoUrl,
    thumbnail: doc.thumbnail,
    displayOrder: doc.displayOrder,
  };
}

/** Videos published through the dedicated admin Videos section. Independent of the artwork catalog. */
export async function getPublishedVideos(locale: AppLocale = 'es'): Promise<VideoView[]> {
  if (!hasMongoConfig()) {
    return [];
  }

  await connectMongo();
  const videoDocs = await Video.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 }).lean();
  return toPlain(videoDocs).map((doc) => localizeVideo(doc as VideoDocPlain, locale));
}
