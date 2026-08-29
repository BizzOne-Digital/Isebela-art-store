'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getSeasonalProducts, getNewProducts } from '@/lib/products';
import { ChevronRight, Sparkles, Leaf, Sun, Flower2, Eye } from 'lucide-react';

const SeasonalOffers = () => {
  const seasonalProducts = [
    ...getNewProducts(),
    ...getSeasonalProducts(),
  ].slice(0, 4);

  return (
    <section id="offers" className="px-6 max-w-7xl mx-auto py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-16"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-secondary text-xs font-sans tracking-widest uppercase mb-2 block font-semibold">Oferta de Temporada</span>
            <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-4">
              Colección <span className="text-secondary">Especial & Novedades</span>
            </h2>
            <p className="text-textBase/60 text-lg max-w-xl leading-relaxed">
              Piezas temáticas, recuerdos de temporada y las creaciones más recientes que salen del taller.
            </p>
          </div>
          <div className="flex items-center gap-4 md:ml-auto">
            <div className="flex items-center gap-3 p-4 bg-surface/80 border border-secondary/30 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Sun className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-secondary font-serif text-sm font-semibold">Edición Especial</p>
                <p className="text-textBase/60 text-xs">Artesanías limitadas</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        {seasonalProducts.map((product, index) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.08 }}
            className="group relative border border-secondary/25 bg-surfaceAlt/60 hover:border-secondary/60 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between"
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
                  <span className="bg-secondary text-white text-[11px] font-sans px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Flower2 className="w-3 h-3" />
                    Destacado
                  </span>
                  {product.isNew && (
                    <span className="bg-primary text-white text-[11px] font-sans px-2.5 py-0.5 rounded-full shadow-sm">
                      Nuevo
                    </span>
                  )}
                </div>
              </Link>
              <div className="p-4 sm:p-5 space-y-2.5">
                <span className="text-secondary text-[11px] font-sans uppercase tracking-wider font-semibold">
                  {product.category}
                </span>
                <Link href={`/products/${product.slug}`} className="block">
                  <h3 className="text-base font-serif text-textBase group-hover:text-secondary transition-colors line-clamp-1 font-medium">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-textBase/60 text-xs line-clamp-2 leading-relaxed">{product.shortDescription}</p>
              </div>
            </div>

            <div className="p-4 sm:p-5 pt-0">
              <div className="flex items-center justify-between pt-3 border-t border-secondary/15">
                <span className="text-secondary font-serif text-base font-bold">{product.price}</span>
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-secondary/15 text-secondary text-xs font-sans font-medium rounded-lg hover:bg-secondary hover:text-white transition-colors"
                >
                  <Eye className="w-3 h-3" />
                  Ver detalles
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
        <Link
          href="/#productos"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-all font-sans shadow-md"
        >
          Descubrir colección completa (48 modelos)
          <ChevronRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
};

export default SeasonalOffers;