'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { ChevronRight, Baby, FileText, BookOpen, Recycle, Sparkles } from 'lucide-react';

const categoryImages = [
  'https://4.bp.blogspot.com/_BAVVNvuf7o8/TUzgXk1vK0I/AAAAAAAACdA/xdZ-R-xZpSw/s1600/01.JPG',
  'https://i.pinimg.com/564x/49/5d/18/495d1862e773f21362a01b7efba6ef66.jpg',
  'https://i.pinimg.com/736x/17/fa/d9/17fad9e6ed0459fe4305476fd6973a96.jpg',
  'https://i.pinimg.com/736x/b0/19/80/b01980ea44ded92407fe814c1e9d072f.jpg',
  'https://i.pinimg.com/736x/17/fa/d9/17fad9e6ed0459fe4305476fd6973a96.jpg',
];

const categoryData = [
  {
    id: 'muñecas',
    name: 'Muñecas',
    //icon: Baby,
    //description: 'Muñecas artesanales con alma y personalidad propia',
    count: '12+ diseños',
    image: categoryImages[0],
    color: 'primary',
  },
  {
    id: 'tarjetas',
    name: 'Tarjetas',
    //icon: FileText,
   // description: 'Tarjetas pop-up y 3D para ocasiones especiales',
    count: '8+ diseños',
    image: categoryImages[1],
    color: 'secondary',
  },
  {
    id: 'papelería',
    name: 'Papelería',
   // icon: BookOpen,
    //description: 'Libretas, agendas y marcadores hechos a mano',
    count: '6+ diseños',
    image: categoryImages[2],
    color: 'accent',
  },
  {
    id: 'manualidades-recicladas',
    name: 'Manualidades Recicladas',
    //icon: Recycle,
    //description: 'Arte sostenible con materiales reciclados',
    count: '5+ diseños',
    image: categoryImages[3],
    color: 'primary',
  },
  {
    id: 'personalizados',
    name: 'Personalizados',
    //icon: Sparkles,
    //description: 'Creaciones únicas diseñadas exclusivamente para ti',
    count: 'A medida',
    image: categoryImages[4],
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
            className="group relative overflow-hidden"
          >
            <Link
              href={`#collection?category=${encodeURIComponent(category.name)}`}
              className="block relative aspect-[4/5] overflow-hidden bg-surfaceAlt/50 border border-accent/10 hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/20 to-transparent" />
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end relative z-10">
                <div className="mb-4">
                  {/* <category.icon className={`w-10 h-10 text-${category.color}`} /> */}
                </div>
                {/* <h3 className="text-xl font-serif text-textBase mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3> */}
                {/* <p className="text-textBase/60 text-sm mb-4 line-clamp-2">{category.description}</p> */}
                <div className="flex items-center justify-between">
                  <span className="text-orange-500 text-md
                   font-sans">{category.count}</span>
                  {/* <span className="inline-flex items-center gap-1 text-accent text-sm font-sans group-hover:gap-2 transition-all">
                    Explorar
                    <ChevronRight className="w-4 h-4" />
                  </span> */}
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
          href="#featured"
          className="inline-flex items-center gap-2 px-8 py-3 border border-accent/30 text-accent rounded-sm hover:bg-accent/10 transition-colors font-sans"
        >
          Ver todas las categorías
          <ChevronRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
};

export default CategoryExplorer;