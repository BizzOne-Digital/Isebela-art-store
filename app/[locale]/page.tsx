import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedCreations from '@/components/FeaturedCreations';
import PhilosophySection from '@/components/PhilosophySection';
import ProcessSection from '@/components/ProcessSection';
import CustomOrderSection from '@/components/CustomOrderSection';
import ArtDecoDivider from '@/components/ArtDecoDivider';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getPublishedCatalog } from '@/lib/storefront-data';
import { setRequestLocale } from 'next-intl/server';
import type { AppLocale } from '@/i18n/routing';

export const revalidate = 60;

interface Props {
  params: Promise<{ locale: AppLocale }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { products } = await getPublishedCatalog(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface">
        <HeroSection artworks={products} />
        <ArtDecoDivider />
        <FeaturedCreations artworks={products} />
        <ArtDecoDivider />
        <PhilosophySection />
        <ArtDecoDivider />
        <ProcessSection />
        <ArtDecoDivider />
        <CustomOrderSection />
        <Footer />
      </main>
      <WhatsAppButton />
    </>
  );
}
