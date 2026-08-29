'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Sparkles } from 'lucide-react';

const categoryData = [
  {
    id: 'munecas',
    name: 'Muñecas',
    description: 'Fofuchas y figuras únicas modeladas en goma eva con alma propia',
    count: '15+ diseños',
    image: '/images/img/is1.jpg',
    color: 'primary',
  },
  {
    id: 'tarjetas',
    name: 'Tarjetas',
    description: 'Tarjetas 3D, acordeón y bolsas artesanales para momentos especiales',
    count: '10+ diseños',
    image: '/images/img/is22.jpg',
    color: 'secondary',
  },
  {
    id: 'papeleria',
    name: 'Papelería',
    description: 'Libretas con portada 3D, agendas, punteras y llaveros hechos a mano',
    count: '12+ diseños',
    image: '/images/img/is9.jpg',
    color: 'accent',
  },
  {
    id: 'manualidades-recicladas',
    name: 'Manualidades Recicladas',
    description: 'Arte sostenible y cestas organizadoras que dan nueva vida a materiales',
    count: '8+ diseños',
    image: '/images/img/is16.jpg',
    color: 'primary',
  },
  {
    id: 'personalizados',
    name: 'Personalizados',
    description: 'Creaciones exclusivas diseñadas con tus ideas, temáticas y mascotas',
    count: 'A medida',
    image: '/images/img/is18.jpg',
    color: 'secondary',
  },
];

const CategoryExplorer = () => {
  return (
    <section id="categories" className="px-6 max-w-7xl mx-auto py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-12 text-center relative z-10"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-2 block">Explorar por Categoría</span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-4">
          Descubre <span className="text-secondary">Nuestro Universo</span>
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Cada categoría cuenta una historia diferente. Encuentra la que resuena contigo.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 relative z-10"
      >
        {categoryData.map((category, index) => (
          <motion.article
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.08 }}
            className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Link
              href="/#productos"
              onClick={(e) => {
                const el = document.getElementById('productos');
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="block relative aspect-[4/5] overflow-hidden bg-surfaceAlt/50 border border-accent/15 hover:border-primary/50 transition-all duration-300 rounded-lg"
            >
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              </div>
              <div className="absolute inset-0 p-5 flex flex-col justify-end relative z-10">
                <span className="text-white/80 text-xs font-sans uppercase tracking-wider mb-1">
                  {category.count}
                </span>
                <h3 className="text-xl font-serif text-white mb-1 group-hover:text-amber-200 transition-colors">
                  {category.name}
                </h3>
                <p className="text-white/70 text-xs line-clamp-2 mb-3 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                  <span className="inline-flex items-center gap-1 text-white text-xs font-sans font-medium group-hover:gap-2 transition-all">
                    Ver piezas
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center relative z-10"
      >
        <Link
          href="/#productos"
          onClick={(e) => {
            const el = document.getElementById('productos');
            if (el) {
              e.preventDefault();
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
        >
          <Sparkles className="w-4 h-4" />
          Ver todas las creaciones
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
};

export default CategoryExplorer;