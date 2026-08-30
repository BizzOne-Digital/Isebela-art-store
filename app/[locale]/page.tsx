import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedCreations from '@/components/FeaturedCreations';
import CategoryExplorer from '@/components/CategoryExplorer';
import VideoShowcase from '@/components/VideoShowcase';
import ProductShowcase from '@/components/ProductShowcase';
import ArtDecoDivider from '@/components/ArtDecoDivider';
import PhilosophySection from '@/components/PhilosophySection';
import ProcessSection from '@/components/ProcessSection';
import SeasonalOffers from '@/components/SeasonalOffers';
import CustomOrderSection from '@/components/CustomOrderSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import TestimonialsSection from '@/components/TestimonialsSection';
import PricingSection from '@/components/PricingSection';
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
  const { products, categories } = await getPublishedCatalog(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface">
        <HeroSection artworks={products} />
        <ArtDecoDivider />
        <FeaturedCreations artworks={products} />
        <ArtDecoDivider />
        <CategoryExplorer categories={categories} artworks={products} />
        <ArtDecoDivider />
        <VideoShowcase />
        <ArtDecoDivider />
        <PhilosophySection />
        <ArtDecoDivider />
        <ProcessSection />
        <ArtDecoDivider />
        <ProductShowcase artworks={products} categories={categories} />
        <ArtDecoDivider />
        <SeasonalOffers artworks={products} />
        <ArtDecoDivider />
        <CustomOrderSection />
        <ArtDecoDivider />
        <PricingSection />
        <ArtDecoDivider />
        <TestimonialsSection />
        <ArtDecoDivider />
        <ContactSection />
        <Footer />
      </main>
      <WhatsAppButton />
    </>
  );
}
