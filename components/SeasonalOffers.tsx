'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getSeasonalProducts, getNewProducts } from '@/lib/products';
import { ChevronRight, Sparkles, Leaf, Sun, Flower2 } from 'lucide-react';

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
            <span className="text-secondary text-sm font-sans tracking-widest uppercase mb-2 block">Oferta de Temporada</span>
            <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-4">
              Colección <span className="text-secondary">Primavera-Verano</span>
            </h2>
            <p className="text-textBase/60 text-lg max-w-xl leading-relaxed">
              Colores que despiertan la alegría, flores que nunca se marchitan y hadas que cuidan tus sueños.
              Disponible por tiempo limitado.
            </p>
          </div>
          <div className="flex items-center gap-4 md:ml-auto">
            <div className="flex items-center gap-3 p-4 bg-surface/80 border border-secondary/30 rounded-lg">
              <div className="w-12 h-12 rounded-sm bg-secondary/20 flex items-center justify-center">
                <Sun className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-secondary font-serif text-sm">Edición Limitada</p>
                <p className="text-textBase/60 text-xs">Hasta agotar existencias</p>
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
            className="group relative border border-secondary/20 bg-surfaceAlt/50 hover:border-secondary/50 transition-all duration-300 overflow-hidden"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="bg-secondary text-white text-xs font-sans px-2 py-1 rounded-sm flex items-center gap-1">
                  <Flower2 className="w-3 h-3" />
                  Temporada
                </span>
                {product.isNew && (
                  <span className="bg-accent text-white text-xs font-sans px-2 py-1 rounded-sm">
                    Nuevo
                  </span>
                )}
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-secondary text-xs font-sans uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              <h3 className="text-lg font-serif text-textBase group-hover:text-secondary transition-colors">
                {product.name}
              </h3>
              <p className="text-textBase/60 text-sm line-clamp-2">{product.shortDescription}</p>
              <div className="flex items-center justify-between pt-3 border-t border-secondary/10">
                <span className="text-secondary font-serif text-lg">{product.price}</span>
                <Link
                  href={`/products/${product.slug}`}
                  className="px-4 py-2 bg-secondary/10 text-secondary text-sm font-sans rounded-sm hover:bg-secondary hover:text-white transition-colors"
                >
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
          className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-white rounded-sm hover:bg-secondary/90 transition-colors font-sans"
        >
          Descubrir colección completa
          <ChevronRight className="w-5 h-5" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Sparkles, title: 'Diseños Exclusivos', desc: 'Piezas que solo existen esta temporada' },
            { icon: Leaf, title: 'Materiales Naturales', desc: 'Colores tierra, fibras y texturas orgánicas' },
            { icon: Flower2, title: 'Edición Limitada', desc: 'Máximo 10 unidades por diseño' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center p-6 border border-secondary/20 bg-secondary/5 hover:border-secondary/40 transition-colors"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-sm bg-secondary/10 flex items-center justify-center">
                <item.icon className="w-7 h-7 text-secondary" />
              </div>
              <h4 className="font-serif text-textBase mb-2">{item.title}</h4>
              <p className="text-textBase/60 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SeasonalOffers;