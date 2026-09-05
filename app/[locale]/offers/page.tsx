import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SeasonalOffers from '@/components/SeasonalOffers';
import { getPublishedCatalog } from '@/lib/storefront-data';
import type { AppLocale } from '@/i18n/routing';

export const revalidate = 60;

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.offers' });
  return { title: t('title'), description: t('description') };
}

export default async function OffersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { products } = await getPublishedCatalog(locale);

  return (
    <>
      <main className="min-h-screen bg-surface pt-8">
        <SeasonalOffers artworks={products} />
      </main>
    </>
  );
}
