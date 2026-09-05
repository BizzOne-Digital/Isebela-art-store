'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Search, ChevronRight, X, Sparkles, Filter, Eye } from 'lucide-react';
import ProductCarousel from '@/components/ProductCarousel';
import PageHeroImage from '@/components/PageHeroImage';
import type { Product } from '@/lib/products';
import type { CategoryView } from '@/lib/storefront-data';
import { ALL_CATEGORIES } from '@/components/CatalogFilterContext';

/** Craft tools and cut paper on a workshop mat — the making behind the catalog. */
const CATALOG_HERO_IMAGE =
  'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=2000&q=80';

interface ProductsCatalogClientProps {
  artworks: Product[];
  categories: CategoryView[];
  /** Category from `?category=`, resolved on the server. Lets a category tile
      elsewhere on the site deep-link into its filtered view. */
  initialCategory?: string;
}

export default function ProductsCatalogClient({
  artworks,
  categories,
  initialCategory,
}: ProductsCatalogClientProps) {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const tCategories = useTranslations('categories');
  const [activeTab, setActiveTab] = useState(
    initialCategory && categories.some((category) => category.canonicalName === initialCategory)
      ? initialCategory
      : ALL_CATEGORIES,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const categoryTabs = useMemo(
    () => [
      { value: ALL_CATEGORIES, label: tCategories('all') },
      ...categories.map((category) => ({ value: category.canonicalName, label: category.name })),
    ],
    [categories, tCategories],
  );

  const getProductsByCategory = (category: string) =>
    category === ALL_CATEGORIES ? artworks : artworks.filter((product) => product.category === category);

  const filteredProducts = useMemo(() => {
    let result = getProductsByCategory(activeTab);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(product => {
        const nameMatch = product.name ? product.name.toLowerCase().includes(query) : false;
        const catMatch = product.category ? product.category.toLowerCase().includes(query) : false;
        const descMatch = product.description ? product.description.toLowerCase().includes(query) : false;
        const shortDescMatch = product.shortDescription ? product.shortDescription.toLowerCase().includes(query) : false;
        const tagMatch = product.tags && Array.isArray(product.tags)
          ? product.tags.some(tag => typeof tag === 'string' && tag.toLowerCase().includes(query))
          : false;
        return nameMatch || catMatch || descMatch || shortDescMatch || tagMatch;
      });
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, searchQuery, artworks]);

  const hasActiveFilters = activeTab !== ALL_CATEGORIES || searchQuery.trim() !== '';

  return (
    <main className="min-h-screen bg-surface">
      <section className="px-6 max-w-7xl mx-auto py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <PageHeroImage src={CATALOG_HERO_IMAGE} priority>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/15 border border-white/25 text-white text-xs font-sans uppercase tracking-widest rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {t('pageTitle')} • {t('piecesCount', { count: artworks.length })}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 font-normal">
            {t('pageHeading')} <span className="text-primary-soft">{t('pageHeadingAccent')}</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('pageDescription', { count: artworks.length })}
          </p>
        </PageHeroImage>

        {artworks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 relative z-10"
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-textBase/30" />
            <h2 className="text-xl font-serif text-textBase mb-2">{t('emptyCatalogTitle')}</h2>
            <p className="text-textBase/60 text-sm">{t('emptyCatalogText')}</p>
          </motion.div>
        ) : (
          <>
            <ProductCarousel artworks={artworks} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-10 relative z-10"
            >
              <div className="relative max-w-xl mx-auto mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textBase/40" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 bg-surface border border-accent/25 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-textBase placeholder:text-textBase/40 rounded-xl shadow-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                  aria-label={t('searchAriaLabel')}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-textBase/40 hover:text-primary transition-colors"
                    aria-label={t('clearSearch')}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {categoryTabs.map(cat => {
                  const count = cat.value === ALL_CATEGORIES ? artworks.length : getProductsByCategory(cat.value).length;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => {
                        setActiveTab(cat.value);
                        setSearchQuery('');
                      }}
                      className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans transition-all flex items-center gap-2 ${
                        activeTab === cat.value
                          ? 'border-primary bg-primary text-white shadow-md shadow-primary/20 font-medium'
                          : 'border border-accent/20 bg-surfaceAlt/60 text-textBase/70 hover:border-accent/40 hover:text-textBase'
                      }`}
                    >
                      {cat.value !== ALL_CATEGORIES && <Filter className="w-3.5 h-3.5" />}
                      {cat.label}
                      <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${activeTab === cat.value ? 'bg-white/20 text-white' : 'bg-accent/15 text-textBase/60'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 text-center"
                >
                  <p className="text-textBase/60 text-sm">
                    {t('showing')} <span className="font-semibold text-primary">{filteredProducts.length}</span> {t('of')}{' '}
                    {activeTab === ALL_CATEGORIES ? artworks.length : getProductsByCategory(activeTab).length} {t('pieces')}
                    {searchQuery && (
                      <> {t('forSearch')} <span className="font-semibold text-primary">&ldquo;{searchQuery}&rdquo;</span></>
                    )}
                  </p>
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + searchQuery}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10"
              >
                {filteredProducts.map((product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index % 12) * 0.04 }}
                    className="group border border-accent/15 bg-white hover:border-primary/50 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] bg-white overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

                      <div className="p-4 sm:p-5 space-y-2.5">
                        <span className="text-accent text-[11px] font-sans uppercase tracking-wider font-semibold">
                          {product.category}
                        </span>
                        <Link href={`/products/${product.slug}`} className="block">
                          <h3 className="text-base font-serif text-textBase group-hover:text-primary transition-colors line-clamp-1 font-medium">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-textBase/60 text-xs line-clamp-2 leading-relaxed">
                          {product.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0">
                      <div className="flex items-center justify-end pt-3 border-t border-accent/10">
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-sans font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          {t('details')}
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 relative z-10"
              >
                <Search className="w-12 h-12 mx-auto mb-4 text-textBase/30" />
                <h2 className="text-xl font-serif text-textBase mb-2">{t('noResultsTitle')}</h2>
                <p className="text-textBase/60 mb-6 text-sm">{t('noResultsHint')}</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab(ALL_CATEGORIES);
                  }}
                  className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-sans text-sm"
                >
                  {t('viewAllProducts', { count: artworks.length })}
                </button>
              </motion.div>
            )}
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center relative z-10"
        >
          <p className="text-textBase/60 mb-4">
            {t('customIdeaText')}
          </p>
          <a
            href="https://wa.me/5491186371242?text=Hola%20Isabel%2C%20quiero%20un%20encargo%20personalizado"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-sans shadow-md"
          >
            {t('customOrderWhatsapp')}
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>
    </main>
  );
}
