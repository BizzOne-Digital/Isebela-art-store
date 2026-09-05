import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import ProductsCatalogClient from '@/components/ProductsCatalogClient';
import { getPublishedCatalog } from '@/lib/storefront-data';
import type { AppLocale } from '@/i18n/routing';

interface Props {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.products' });
  return { title: t('title'), description: t('description') };
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // `?category=` is resolved on the server so the catalog (and the carousel)
  // ship in the HTML instead of behind a client-only Suspense fallback.
  const { category } = await searchParams;
  const { products, categories } = await getPublishedCatalog(locale);

  return (
    <>
      <ProductsCatalogClient
        artworks={products}
        categories={categories}
        initialCategory={category}
      />
    </>
  );
}
