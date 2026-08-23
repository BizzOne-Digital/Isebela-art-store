'use client';
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedCreations from '@/components/FeaturedCreations';
import CategoryExplorer from '@/components/CategoryExplorer';
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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface">
        <HeroSection />
        <ArtDecoDivider />
        <FeaturedCreations />
        <ArtDecoDivider />
        <CategoryExplorer />
        <ArtDecoDivider />
        <PhilosophySection />
        <ArtDecoDivider />
        <ProcessSection />
        <ArtDecoDivider />
        <ProductShowcase />
        <ArtDecoDivider />
        <SeasonalOffers />
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