'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronRight, Sparkles } from 'lucide-react';
import type { CategoryView } from '@/lib/storefront-data';
import type { Product } from '@/lib/products';

interface CategoryExplorerProps {
  categories: CategoryView[];
  artworks: Product[];
}

const CategoryExplorer = ({ categories, artworks }: CategoryExplorerProps) => {
  const t = useTranslations('categories');

  if (categories.length === 0) {
    return null;
  }

  return (
    <section id="categories" className="px-6 max-w-7xl mx-auto py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-12 text-center relative z-10"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-2 block">{t('eyebrow')}</span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-4">
          {t('titleStart')} <span className="text-secondary">{t('titleAccent')}</span>
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed">
          {t('intro')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        // Mobile swipes through the categories; sm+ falls back to the grid.
        className="relative z-10 flex snap-x snap-mandatory overflow-x-auto -mx-6 px-6 pb-2 gap-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5"
      >
        {categories.map((category, index) => {
          const categoryArtworks = artworks.filter((product) => product.category === category.canonicalName);
          const image = category.image || categoryArtworks[0]?.image || '/images/img/is1.png';

          return (
            <motion.article
              key={category._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
              className="group relative snap-start flex-shrink-0 w-[78%] sm:w-auto sm:flex-shrink overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Link
                href={{ pathname: '/products', query: { category: category.canonicalName } }}
                className="block relative aspect-[4/5] overflow-hidden bg-surfaceAlt/50 border border-accent/15 hover:border-primary/50 transition-all duration-300 rounded-lg"
              >
                <div className="absolute inset-0">
                  <Image
                    src={image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                </div>
                <div className="absolute inset-0 p-5 flex flex-col justify-end relative z-10">
                  <span className="text-white/80 text-xs font-sans uppercase tracking-wider mb-1">
                    {t('piecesCount', { count: categoryArtworks.length })}
                  </span>
                  <h3 className="text-xl font-serif text-white mb-1 group-hover:text-amber-200 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-white/70 text-xs line-clamp-2 mb-3 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/20">
                    <span className="inline-flex items-center gap-1 text-white text-xs font-sans font-medium group-hover:gap-2 transition-all">
                      {t('seePieces')}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center relative z-10"
      >
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
        >
          <Sparkles className="w-4 h-4" />
          {t('seeAllCreations')}
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
};

export default CategoryExplorer;
