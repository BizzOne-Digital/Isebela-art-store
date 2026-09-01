import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import CustomOrderSection from '@/components/CustomOrderSection';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.customOrders' });
  return { title: t('title'), description: t('description') };
}

export default async function CustomOrdersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface pt-8">
        <CustomOrderSection />
      </main>
      <Footer />
    </>
  );
}
