'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronRight, Sparkles, Heart, Leaf, Award, ArrowDown } from 'lucide-react';
import { AsciiArt } from '@/components/ui/ink-garden';

export default function HeroSection() {
  const scrollToProducts = () => {
    const element = document.querySelector('#productos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {/* AsciiArt Background - subtle animated ASCII art */}
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <AsciiArt className="h-full w-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto w-full py-20 md:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/35 text-primary text-xs font-sans uppercase tracking-widest rounded-full mb-6">
              <Sparkles className="w-4 h-4 " />
              Hecho a mano en Argentina
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-textBase leading-tight mb-6">
              Donde la imaginación
              <br />
              <span className="text-primary">cobra vida</span>
            </h1>
            <p className="text-textBase/60 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
              Creaciones artesanales únicas en goma eva: muñecas con alma, tarjetas pop-up que guardan secretos,
              papelería que inspira y arte reciclado que honra el planeta. Cada pieza cuenta una historia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans text-base"
              >
                <Sparkles className="w-5 h-5" />
                Ver Colección
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => { const el = document.querySelector('#contacto'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-black/70 border border-black/70 text-white rounded-sm hover:bg-black/80 transition-colors font-sans text-base"
              >
                Encargo Personalizado
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-16 w-full flex flex-wrap gap-6 justify-center lg:justify-start">
              {[
                { icon: Heart, label: 'Hecho con Amor', desc: 'Cada pieza lleva horas de dedicación' },
                { icon: Sparkles, label: 'Diseño Único', desc: 'No hay dos piezas iguales' },
                { icon: Leaf, label: 'Materiales Nobles', desc: 'Goma eva premium y reciclados' },
                { icon: Award, label: 'Calidad Heirloom', desc: 'Piezas para durar generaciones' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-surface/80 backdrop-blur-sm border border-accent/10 rounded-lg min-w-[200px]"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-serif text-textBase text-sm">{item.label}</p>
                    <p className="text-textBase/50 text-xs">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-accent/20 bg-surfaceAlt">
              <Image
                src="/images/hero-main.svg"
                alt="Isabel creando arte con goma eva en su taller"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface/90 backdrop-blur-sm border border-accent/20">
                <p className="text-textBase/80 text-sm leading-relaxed italic text-center">
                  &ldquo;Mis manos saben lo que mi corazón imagina. Cada pieza es un fragmento de mi mundo interior hecho visible.&rdquo;
                </p>
                <p className="text-accent text-sm mt-3 font-sans text-end">&mdash; Isabel</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-40 -right-1 md:-right-4 w-64 md:w-72 p-6 bg-primary border border-primary/50  max-w-[calc(100vw-2rem)] md:max-w-none"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className=''>
                  <p className="text-white text-sm font-sans uppercase tracking-wider">Hecho a Mano</p>
                  <p className="text-white/70 text-xs">En Argentina</p>
                </div>
              </div>
             <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-serif text-white">50+</p>
                  <p className="text-white/70 text-xs">Diseños Únicos</p>
                </div>
                <div>
                  <p className="text-2xl font-serif text-white">10+</p>
                  <p className="text-white/70 text-xs">Años de Experiencia</p>
                </div>
              </div>
             </motion.div>

            <motion.button
              onClick={scrollToProducts}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-surface/80 backdrop-blur-sm border border-accent/20 flex items-center justify-center hover:bg-surface hover:border-primary/30 transition-colors animate-bounce"
              aria-label="Deslizar hacia productos"
            >
              <ArrowDown className="w-5 h-5 text-accent" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}