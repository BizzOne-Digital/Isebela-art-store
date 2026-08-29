'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedProducts } from '@/lib/products';
import { ChevronRight, Sparkles } from 'lucide-react';

const FeaturedCreations = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 4);

  return (
    <section id="featured" suppressHydrationWarning className="px-6 max-w-7xl mx-auto py-20 relative">
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
          Una selección curada de las piezas más representativas y queridas de nuestro taller.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        {featuredProducts.map((product, index) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.08 }}
            className="relative group border border-accent/15 bg-surfaceAlt/60 hover:border-primary/50 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg flex flex-col justify-between"
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
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  {product.isNew && (
                    <span className="bg-secondary text-white text-xs font-sans px-2.5 py-1 rounded-full shadow-sm">
                      Nuevo
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-primary text-white text-xs font-sans px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-yellow-300" />
                      Destacado
                    </span>
                  )}
                </div>
              </Link>

              <div className="p-5 space-y-3">
                <span className="text-accent text-xs font-sans uppercase tracking-wider font-medium">
                  {product.category}
                </span>
                <Link href={`/products/${product.slug}`} className="block">
                  <h3 className="text-lg font-serif text-textBase group-hover:text-primary transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-textBase/60 text-xs line-clamp-2 leading-relaxed">
                  {product.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.features.slice(0, 2).map((feature, i) => (
                    <span
                      key={i}
                      className="text-[11px] text-textBase/70 bg-surface px-2.5 py-1 rounded-md border border-accent/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <div className="flex items-center justify-between pt-3 border-t border-accent/10">
                <span className="text-primary font-serif text-lg font-semibold">{product.price}</span>
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/10 text-primary text-xs font-sans font-medium rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Ver detalles
                  <ChevronRight className="w-3.5 h-3.5" />
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
          Descubre los 46 modelos hechos a mano en nuestro catálogo.
        </p>
        <Link
          href="/#productos"
          onClick={(e) => {
            const el = document.getElementById('productos');
            if (el) {
              e.preventDefault();
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-sans shadow-md"
        >
          Ver todo el catálogo (46 piezas)
          <ChevronRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
};

export default FeaturedCreations;