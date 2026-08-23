'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { categories, getProductsByCategory, products } from '@/lib/products';
import { Search, ChevronRight, Filter, X } from 'lucide-react';

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let result = getProductsByCategory(activeTab);
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return result;
  }, [activeTab, searchQuery]);

  const hasActiveFilters = activeTab !== 'Todos' || searchQuery.trim() !== '';

  return (
    <section className="px-6 max-w-7xl mx-auto py-16" id="productos">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-2 block">Nuestra Colección</span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase">Piezas Únicas Hechas a Mano</h2>
        <p className="text-textBase/60 mt-4 max-w-2xl mx-auto">
          Cada creación nace de la imaginación y se materializa con dedicación artesanal.
          Descubre muñecas, tarjetas, papelería y piezas recicladas que cuentan historias.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-10"
      >
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-textBase/40" />
          <input
            type="search"
            placeholder="Buscar por nombre, categoría, descripción..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-surface border border-accent/20 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors text-textBase placeholder:text-textBase/40 rounded-sm"
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

        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setSearchQuery('');
              }}
              className={`px-5 py-2.5 border rounded-sm text-sm font-sans transition-all flex items-center gap-2 ${
                activeTab === cat
                  ? 'border-primary bg-primary text-white shadow-[0_0_20px_rgba(107,33,168,0.3)]'
                  : 'border-accent/20 text-textBase/70 hover:border-accent/50 hover:text-textBase'
              }`}
            >
              {cat !== 'Todos' && <Filter className="w-3.5 h-3.5" />}
              {cat}
            </button>
          ))}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="group border border-accent/10 bg-surfaceAlt/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {(product.isNew || product.isFeatured) && (
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isNew && (
                        <span className="bg-secondary text-white text-xs font-sans px-2 py-1 rounded-sm">
                          Nuevo
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="bg-primary text-white text-xs font-sans px-2 py-1 rounded-sm">
                          Destacado
                        </span>
                      )}
                    </div>
                  )}
                  {product.availability === 'limited' && (
                    <span className="absolute top-3 right-3 bg-accent text-white text-xs font-sans px-2 py-1 rounded-sm">
                      Últimas unidades
                    </span>
                  )}
                  {product.availability === 'sold-out' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white/90 text-textBase text-sm font-sans px-4 py-2 rounded-sm">
                        Agotado
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-accent text-xs font-sans uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <Link href={`/products/${product.slug}`} className="block">
                  <h3 className="text-lg font-serif text-textBase group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-textBase/60 text-sm line-clamp-2">{product.shortDescription}</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs text-textBase/50 bg-surface px-2 py-0.5 rounded-sm border border-accent/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-accent/10">
                  <span className="text-primary font-serif text-lg">{product.price}</span>
                  <Link
                    href={`/products/${product.slug}`}
                    className="px-4 py-2 bg-accent/10 text-accent text-sm font-sans rounded-sm hover:bg-accent hover:text-white transition-colors group-hover:bg-primary/20 group-hover:text-primary"
                  >
                    Ver detalles
                    <ChevronRight className="w-3.5 h-3.5" />
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
          className="text-center py-16"
        >
          <Search className="w-12 h-12 mx-auto mb-4 text-textBase/30" />
          <h3 className="text-lg font-serif text-textBase mb-2">No se encontraron productos</h3>
          <p className="text-textBase/60 mb-6">Intenta con otros términos de búsqueda o selecciona otra categoría.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTab('Todos');
            }}
            className="px-6 py-2.5 border border-accent/30 text-accent rounded-sm hover:bg-accent/10 transition-colors font-sans text-sm"
          >
            Limpiar filtros
          </button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16 text-center"
      >
        <p className="text-textBase/60 mb-4">
          ¿Buscas algo único y personalizado?
        </p>
        <Link
          href="#custom-orders"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
        >
          Encargo Personalizado
          <ChevronRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
};

export default ProductShowcase;