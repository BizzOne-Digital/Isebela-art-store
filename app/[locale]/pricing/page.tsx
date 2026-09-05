import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import PricingSection from '@/components/PricingSection';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.pricing' });
  return { title: t('title'), description: t('description') };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <main className="min-h-screen bg-surface pt-8">
        <PricingSection />
      </main>
    </>
  );
}
