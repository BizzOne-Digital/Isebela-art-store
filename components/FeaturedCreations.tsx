'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import { ChevronRight } from 'lucide-react';

const FeaturedCreations = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  return (
    <section id="featured" className="px-6 max-w-7xl mx-auto py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-12 text-center relative z-10"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-2 block">Destacados</span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-4">
          Nuestras <span className="text-primary">Creaciones</span> Estrella
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Una selección curada de las piezas más queridas y representativas del taller.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10"
      >
        {featuredProducts.map((product, index) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.1 }}
            className={`relative group border border-accent/10 bg-surfaceAlt/50 hover:border-primary/50 transition-all duration-300 overflow-hidden ${index === 0 ? 'lg:col-span-2 lg:row-span-1' : ''}`}
          >
            <div className="relative aspect-[4/5] lg:aspect-[16/10] overflow-hidden bg-surface">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            </div>
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-accent text-xs font-sans uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-textBase group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-textBase/60 text-base md:text-lg line-clamp-3 leading-relaxed">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 4).map((feature, i) => (
                  <span
                    key={i}
                    className="text-xs text-textBase/60 bg-surface px-3 py-1 rounded-sm border border-accent/10"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-accent/10">
                <span className="text-primary font-serif text-xl">{product.price}</span>
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent/10 text-accent text-sm font-sans rounded-sm hover:bg-accent hover:text-white transition-colors group-hover:bg-primary/20 group-hover:text-primary"
                >
                  Ver detalles
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-center relative z-10"
      >
        <p className="text-textBase/60 mb-4">
          ¿Quieres ver más creaciones únicas?
        </p>
        <Link
          href="#collection"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
        >
          Ver toda la colección
          <ChevronRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
};

export default FeaturedCreations;