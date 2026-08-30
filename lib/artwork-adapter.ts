import type { Product } from './products';
import type { AppLocale } from '@/i18n/routing';

export type AvailabilityValue = 'available' | 'made-to-order' | 'limited' | 'sold-out';

export interface ArtworkLean {
  _id: unknown;
  name: string;
  nameEn?: string;
  slug: string;
  description: string;
  descriptionEn?: string;
  shortDescription?: string;
  shortDescriptionEn?: string;
  images: string[];
  category: string;
  price?: string;
  priceLabel?: string;
  materials?: string[];
  colors?: string[];
  tags?: string[];
  features?: string[];
  featured: boolean;
  isNewArrival?: boolean;
  isSeasonal?: boolean;
  availability?: AvailabilityValue;
  status: 'draft' | 'published';
  displayOrder?: number;
}

export function toPlain<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

/** Picks the English variant of a bilingual field when present, falling back to the original Spanish content. */
function localize(locale: AppLocale, es: string, en: string | undefined): string {
  return locale === 'en' && en ? en : es;
}

export function toProductView(doc: ArtworkLean, locale: AppLocale = 'es'): Product {
  const images = Array.isArray(doc.images) ? doc.images : [];
  return {
    id: String(doc._id),
    slug: doc.slug,
    name: localize(locale, doc.name, doc.nameEn),
    category: doc.category,
    description: localize(locale, doc.description, doc.descriptionEn),
    shortDescription: localize(locale, doc.shortDescription || '', doc.shortDescriptionEn),
    image: images[0] || '/images/img/is1.jpg',
    secondaryImages: images.slice(1),
    price: doc.price || '',
    priceLabel: doc.priceLabel || '',
    features: doc.features || [],
    materials: doc.materials || [],
    isNew: Boolean(doc.isNewArrival),
    isFeatured: Boolean(doc.featured),
    isSeasonal: Boolean(doc.isSeasonal),
    availability: doc.availability || 'available',
    tags: doc.tags || [],
  };
}
