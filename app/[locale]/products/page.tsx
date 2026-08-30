import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductsCatalogClient from '@/components/ProductsCatalogClient';
import { getPublishedCatalog } from '@/lib/storefront-data';
import type { AppLocale } from '@/i18n/routing';

export const revalidate = 60;

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.products' });
  return { title: t('title'), description: t('description') };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { products, categories } = await getPublishedCatalog(locale);
  return (
    <>
      <Navbar />
      <ProductsCatalogClient artworks={products} categories={categories} />
      <Footer />
    </>
  );
}
