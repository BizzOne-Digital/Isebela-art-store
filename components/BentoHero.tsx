'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, Sparkles, Heart, Leaf } from 'lucide-react';

const BentoHero = () => {
  return (
    <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[320px] md:auto-rows-[380px]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 md:row-span-2 relative overflow-hidden border border-accent/20 bg-surfaceAlt/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
          <Image
            src="/images/img/is2.jpg"
            alt="Isabel creando arte y magia con goma eva"
            fill
            className="object-cover opacity-90"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end relative z-10">
            <span className="absolute top-4 left-4 text-accent text-2xl">┌</span>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-sans uppercase tracking-wider border border-primary/30 rounded-sm">
                Hecho a Mano
              </span>
              <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-sans uppercase tracking-wider border border-secondary/30 rounded-sm">
                Goma Eva
              </span>
              <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-sans uppercase tracking-wider border border-accent/30 rounded-sm">
                Único
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-textBase leading-tight mb-4 max-w-2xl">
              Donde la imaginación
              <br />
              <span className="text-primary">cobra vida</span>
            </h1>
            <p className="text-textBase/70 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
              Creaciones artesanales únicas en goma eva: muñecas, tarjetas pop-up, papelería y arte reciclado.
              Cada pieza cuenta una historia hecha con el corazón.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#collection"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-all font-sans text-sm"
              >
                Ver Colección
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent/30 text-accent rounded-sm hover:bg-accent/10 transition-all font-sans text-sm"
              >
                Encargo Personalizado
              </a>
            </div>
            <span className="absolute bottom-4 right-4 text-accent text-2xl">┘</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative p-6 border border-accent/20 bg-surfaceAlt/50 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-sm bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h2 className="text-xl font-serif text-textBase mb-2">Filosofía</h2>
            <p className="text-textBase/60 text-sm leading-relaxed">
              Creo que el arte nace de la observación y el asombro. Cada pliegue, cada color, cada detalle
              nace de inspirarse en lo simple y transformarlo en magia.
            </p>
          </div>
          <div className="pt-4 border-t border-accent/10">
            <a href="#philosophy" className="text-accent text-sm font-sans hover:underline flex items-center gap-1">
              Descubrir más
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative p-6 border-2 border-secondary/30 bg-secondary/10 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-sm bg-secondary/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
            </div>
            <h2 className="text-xl font-serif text-textBase mb-2">Oferta de Temporada</h2>
            <p className="text-textBase/60 text-sm leading-relaxed">
              Colección Primavera-Verano: flores silvestres, hadas del bosque y colores que despiertan
              la alegría. Disponible por tiempo limitado.
            </p>
          </div>
          <div className="pt-4 border-t border-secondary/20">
            <a href="#collection" className="text-secondary text-sm font-sans hover:underline flex items-center gap-1 font-medium">
              Ver Novedades
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-2 relative overflow-hidden border border-accent/20 bg-surfaceAlt/30"
        >
          <Image
            src="/images/img/is7.jpg"
            alt="Detalle de creaciones en goma eva"
            fill
            className="object-cover opacity-60"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center relative z-10">
            <span className="absolute top-4 left-4 text-accent text-2xl">┌</span>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-sm bg-accent/20 flex items-center justify-center">
                <Leaf className="w-7 h-7 text-accent" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-textBase mb-4 max-w-sm">
              Conectemos y<br />creemos juntos
            </h2>
            <div className="space-y-3 text-sm">
              <a
                href="tel:+5491186371242"
                className="flex items-center justify-center gap-2 text-textBase/80 hover:text-accent transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +54 9 11 8637-1242
              </a>
              <a
                href="mailto:isadoug01@gmail.com"
                className="flex items-center justify-center gap-2 text-textBase/80 hover:text-accent transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                isadoug01@gmail.com
              </a>
            </div>
            <div className="mt-6 flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener" className="text-textBase/50 hover:text-accent transition-colors" aria-label="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" className="text-textBase/50 hover:text-accent transition-colors" aria-label="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://wa.me/5491186371242" target="_blank" rel="noopener" className="text-textBase/50 hover:text-green-500 transition-colors" aria-label="WhatsApp">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>
            <span className="absolute bottom-4 right-4 text-accent text-2xl">┘</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6"
      >
        {[
          { icon: Heart, label: 'Hecho con Amor', desc: 'Cada pieza lleva horas de dedicación y cariño artesanal' },
          { icon: Sparkles, label: 'Diseño Único', desc: 'No hay dos piezas iguales, cada una es irrepetible' },
          { icon: Leaf, label: 'Materiales Nobles', desc: 'Goma eva premium y materiales reciclados con conciencia' },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-start gap-4 p-6 border border-accent/10 bg-surfaceAlt/30 hover:border-primary/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-serif text-textBase mb-1">{item.label}</h3>
              <p className="text-textBase/60 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BentoHero;