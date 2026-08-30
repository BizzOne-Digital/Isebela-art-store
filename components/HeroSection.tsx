'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, Sparkles, Heart, Leaf, Award, Eye } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AsciiArt } from '@/components/ui/ink-garden';
import type { Product } from '@/lib/products';

interface HeroSectionProps {
  artworks: Product[];
}

export default function HeroSection({ artworks }: HeroSectionProps) {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const [selectedCraftIndex, setSelectedCraftIndex] = useState(0);

  const heroCrafts = artworks
    .filter((product) => product.isFeatured)
    .slice(0, 4)
    .map((product) => ({
      id: product.id,
      title: product.name,
      desc: product.shortDescription,
      image: product.image,
      badge: product.isNew ? tCommon('newLabel') : tCommon('featuredLabel'),
      slug: product.slug,
    }));

  const activeCraft = heroCrafts[Math.min(selectedCraftIndex, heroCrafts.length - 1)];

  const scrollToProducts = () => {
    const element = document.querySelector('#productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" suppressHydrationWarning className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-28 pb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* AsciiArt Background - subtle animated ASCII art */}
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <AsciiArt className="h-full w-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center lg:text-left lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-xs font-sans uppercase tracking-widest rounded-full mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4" />
              {t('badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-textBase leading-tight mb-6">
              {t('titlePart1')}
              <br />
              <span className="text-primary">{t('titlePart2')}</span>
            </h1>
            <p className="text-textBase/70 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-sans text-base shadow-lg shadow-primary/20"
              >
                <Sparkles className="w-5 h-5" />
                {t('viewCreations')}
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => { const el = document.querySelector('#contacto'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surfaceAlt border border-accent/30 text-textBase rounded-lg hover:border-primary/50 transition-colors font-sans text-base"
              >
                <Heart className="w-5 h-5 text-primary" />
                {t('customOrder')}
              </button>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Heart, label: t('madeByHand'), desc: t('madeByHandDesc') },
                { icon: Sparkles, label: t('uniqueDesign'), desc: t('uniqueDesignDesc') },
                { icon: Leaf, label: t('ecoFriendly'), desc: t('ecoFriendlyDesc') },
                { icon: Award, label: t('totalModels'), desc: t('totalModelsDesc') },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.08 }}
                  className="p-3 bg-surfaceAlt/60 backdrop-blur-sm border border-accent/15 rounded-xl text-left"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="font-serif text-textBase text-sm font-semibold">{item.label}</p>
                  <p className="text-textBase/60 text-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Right Showcase with Real Handcrafted Products */}
          {activeCraft && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-accent/20 bg-surfaceAlt/80 shadow-2xl flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCraft.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <Image
                    src={activeCraft.image}
                    alt={activeCraft.title}
                    fill
                    className="object-contain p-4"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3.5 py-1.5 bg-primary/95 text-white text-xs font-sans rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  {activeCraft.badge}
                </span>
              </div>

              {/* Bottom Info Overlay */}
              <div className="absolute bottom-4 inset-x-4 p-4 bg-surface/95 backdrop-blur-md border border-accent/20 rounded-2xl shadow-xl z-20">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-textBase text-base sm:text-lg font-medium">
                      {activeCraft.title}
                    </h3>
                    <p className="text-textBase/60 text-xs line-clamp-1">
                      {activeCraft.desc}
                    </p>
                  </div>
                  <Link
                    href={`/products/${activeCraft.slug}`}
                    className="px-3.5 py-2 bg-primary text-white text-xs font-sans rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1 flex-shrink-0 shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {t('viewDetails')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Thumbnail Selector of Real Crafts */}
            <div className="mt-4 flex items-center justify-center gap-3">
              {heroCrafts.map((craft, idx) => (
                <button
                  key={craft.id}
                  onClick={() => setSelectedCraftIndex(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all bg-surfaceAlt/90 ${
                    idx === selectedCraftIndex
                      ? 'border-primary ring-2 ring-primary/30 scale-105 shadow-md'
                      : 'border-accent/20 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={craft.title}
                >
                  <Image
                    src={craft.image}
                    alt={craft.title}
                    fill
                    className="object-contain p-1"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
