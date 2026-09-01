'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react';
import type { Product } from '@/lib/products';

interface ProductCarouselProps {
  artworks: Product[];
  /** Most slides to show. The full catalog stays the job of the grid below. */
  max?: number;
}

/**
 * Highlights strip for the catalog page. Native CSS scroll-snap does the
 * scrolling (touch swipe and trackpad work for free); the arrows are a
 * pointer affordance on top of it, so no carousel dependency is needed.
 */
export default function ProductCarousel({ artworks, max = 12 }: ProductCarouselProps) {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Lead with the pieces worth showcasing, then fill with the rest.
  const slides = React.useMemo(() => {
    const seen = new Set<string>();
    const ordered: Product[] = [];
    for (const group of [
      artworks.filter((p) => p.isFeatured),
      artworks.filter((p) => p.isNew),
      artworks.filter((p) => p.isSeasonal),
      artworks,
    ]) {
      for (const product of group) {
        if (seen.has(product.id) || ordered.length >= max) continue;
        seen.add(product.id);
        ordered.push(product);
      }
    }
    return ordered;
  }, [artworks, max]);

  const syncArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // 1px tolerance: fractional scroll widths never land exactly on the edge.
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    syncArrows();
    el.addEventListener('scroll', syncArrows, { passive: true });

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncArrows) : null;
    observer?.observe(el);

    return () => {
      el.removeEventListener('scroll', syncArrows);
      observer?.disconnect();
    };
  }, [syncArrows, slides.length]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function scrollByPage(direction: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction * Math.max(el.clientWidth * 0.8, 240),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });

    // Some engines emit no scroll events for programmatic scrolling, so poll
    // until the position settles rather than trusting the scroll event alone.
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    let previous = -1;
    const settle = () => {
      const node = trackRef.current;
      if (!node) return;
      syncArrows();
      const current = node.scrollLeft;
      if (current !== previous) {
        previous = current;
        rafRef.current = requestAnimationFrame(settle);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(settle);
  }

  if (slides.length < 2) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      aria-label={t('carouselHeading')}
      className="relative z-10 mb-14"
    >
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif text-textBase font-normal">
            {t('carouselHeading')}
          </h2>
          <p className="text-textBase/60 text-sm mt-1">{t('carouselHint')}</p>
        </div>
      </div>

      {/* The arrows sit over the first and last visible cards, so the relative
          wrapper is what they anchor to. */}
      <div className="relative">
        {/* Pointer affordance only. Touch users swipe, keyboard users tab the track. */}
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={atStart}
          aria-label={t('carouselPrev')}
          className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-accent/25 bg-surfaceAlt/90 backdrop-blur-sm text-textBase shadow-md items-center justify-center transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={atEnd}
          aria-label={t('carouselNext')}
          className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-accent/25 bg-surfaceAlt/90 backdrop-blur-sm text-textBase shadow-md items-center justify-center transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-0 disabled:pointer-events-none"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* scroll-pl-6 matches the px-6 gutter so slides snap flush with the page
            edge and the track still rests at scrollLeft 0. */}
        <div
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-label={t('carouselHeading')}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-pl-6 pb-2 -mx-6 px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded-2xl"
        >
          {slides.map((product) => (
            <article
              key={product.id}
              className="group snap-start flex-shrink-0 w-[240px] sm:w-[264px] border border-accent/15 bg-surfaceAlt/60 hover:border-primary/50 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <Link
                  href={`/products/${product.slug}`}
                  className="block relative aspect-[4/5] bg-surfaceAlt/80 overflow-hidden"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    sizes="264px"
                  />
                  {(product.isNew || product.isFeatured || product.isSeasonal) && (
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      {product.isNew && (
                        <span className="bg-secondary text-white text-[11px] font-sans px-2.5 py-0.5 rounded-full shadow-sm">
                          {tCommon('newLabel')}
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="bg-primary text-white text-[11px] font-sans px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-yellow-300" />
                          {tCommon('featuredLabel')}
                        </span>
                      )}
                      {product.isSeasonal && (
                        <span className="bg-amber-600 text-white text-[11px] font-sans px-2.5 py-0.5 rounded-full shadow-sm">
                          {tCommon('seasonalLabel')}
                        </span>
                      )}
                    </div>
                  )}
                </Link>

                <div className="p-4 space-y-2">
                  <span className="text-accent text-[11px] font-sans uppercase tracking-wider font-semibold">
                    {product.category}
                  </span>
                  <Link href={`/products/${product.slug}`} className="block">
                    <h3 className="text-base font-serif text-textBase group-hover:text-primary transition-colors line-clamp-1 font-medium">
                      {product.name}
                    </h3>
                  </Link>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="flex items-center justify-between pt-3 border-t border-accent/10">
                  <span className="text-primary font-serif text-base font-bold">{product.price}</span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-sans font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    {t('details')}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
