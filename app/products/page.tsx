'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { categories, getProductsByCategory, products } from '@/lib/products';
import { Search, ChevronRight, X, Tag, Sparkles, Filter, Eye } from 'lucide-react';

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [activeTab, searchQuery]);

  const hasActiveFilters = activeTab !== 'Todos' || searchQuery.trim() !== '';

  return (
    <main className="min-h-screen bg-surface">
      <section className="px-6 max-w-7xl mx-auto py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-12 text-center relative z-10"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary text-xs font-sans uppercase tracking-widest rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Catálogo Completo • 46 Piezas
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-textBase mb-4 font-normal">
            Colección de <span className="text-primary">Piezas Únicas</span>
          </h1>
          <p className="text-textBase/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Cada creación nace de la imaginación y se materializa con dedicación artesanal.
            Descubre 46 modelos en muñecas, tarjetas, papelería y piezas recicladas.
          </p>
        </motion.div>

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
              placeholder="Buscar por nombre, categoría, descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-10 py-3.5 bg-surface border border-accent/25 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-textBase placeholder:text-textBase/40 rounded-xl shadow-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              aria-label="Buscar productos"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-textBase/40 hover:text-primary transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map(cat => {
              const count = cat === 'Todos' ? products.length : getProductsByCategory(cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveTab(cat);
                    setSearchQuery('');
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans transition-all flex items-center gap-2 ${
                    activeTab === cat
                      ? 'border-primary bg-primary text-white shadow-md shadow-primary/20 font-medium'
                      : 'border border-accent/20 bg-surfaceAlt/60 text-textBase/70 hover:border-accent/40 hover:text-textBase'
                  }`}
                >
                  {cat !== 'Todos' && <Filter className="w-3.5 h-3.5" />}
                  {cat}
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${activeTab === cat ? 'bg-white/20 text-white' : 'bg-accent/15 text-textBase/60'}`}>
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
                Mostrando <span className="font-semibold text-primary">{filteredProducts.length}</span> de{' '}
                {activeTab === 'Todos' ? products.length : getProductsByCategory(activeTab).length} productos
                {searchQuery && (
                  <> para <span className="font-semibold text-primary">&ldquo;{searchQuery}&rdquo;</span></>
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
                className="group border border-accent/15 bg-surfaceAlt/60 hover:border-primary/50 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <Link href={`/products/${product.slug}`} className="block relative aspect-[4/5] bg-surfaceAlt/80 overflow-hidden">
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
                            Nuevo
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="bg-primary text-white text-[11px] font-sans px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-yellow-300" />
                            Destacado
                          </span>
                        )}
                        {product.isSeasonal && (
                          <span className="bg-amber-600 text-white text-[11px] font-sans px-2.5 py-0.5 rounded-full shadow-sm">
                            Navideño
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
                  <div className="flex items-center justify-between pt-3 border-t border-accent/10">
                    <span className="text-primary font-serif text-base font-bold">{product.price}</span>
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary/10 text-primary text-xs font-sans font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      Detalles
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
            <h2 className="text-xl font-serif text-textBase mb-2">No se encontraron productos</h2>
            <p className="text-textBase/60 mb-6 text-sm">Intenta con otros términos de búsqueda o selecciona otra categoría.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('Todos');
              }}
              className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-sans text-sm"
            >
              Ver todos los 48 productos
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center relative z-10"
        >
          <p className="text-textBase/60 mb-4">
            ¿Buscas algo único y totalmente personalizado?
          </p>
          <a
            href="https://wa.me/5491186371242?text=Hola%20Isabel%2C%20quiero%20un%20encargo%20personalizado"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-sans shadow-md"
          >
            Encargo Personalizado por WhatsApp
            <ChevronRight className="w-5 h-5" />
          </a>
        </motion.div>
      </section>
    </main>
  );
}