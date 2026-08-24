'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  PenTool,
  Scissors,
  Sparkles,
  Package,
  Heart,
  Leaf
} from 'lucide-react';

const processSteps = [
  {
    number: '01',
    title: 'Inspiración',
    icon: Lightbulb,
    color: 'primary',
    description: 'Todo comienza observando el mundo: una flor silvestre, un cuento infantil, una textura en la naturaleza. La inspiración llega en los momentos más inesperados y se guarda en bocetos y notas.',
    details: ['Observación de la naturaleza', 'Bocetos a mano alzada', 'Selección de paleta de colores', 'Investigación de formas'],
  },
  {
    number: '02',
    title: 'Diseño',
    icon: PenTool,
    color: 'secondary',
    description: 'Los bocetos cobran forma técnica. Se definen medidas, patrones, capas y ensambles. Cada pieza se planifica milimétricamente para que la magia funcione al montarse.',
    details: ['Patrones vectoriales', 'Pruebas de escala', 'Definición de capas', 'Planificación de ensamble'],
  },
  {
    number: '03',
    title: 'Creación Artesanal',
    icon: Scissors,
    color: 'accent',
    description: 'El corte preciso de cada pieza de goma eva, el moldeado con calor, el pegado paciente capa por capa. Aquí es donde las manos saben más que la mente.',
    details: ['Corte manual y plotter', 'Moldeado con calor', 'Ensamble capa a capa', 'Detalles pintados a mano'],
  },
  {
    number: '04',
    title: 'Acabado',
    icon: Sparkles,
    color: 'primary',
    description: 'Los toques finales que elevan la pieza: barnices protectores, detalles metálicos, ajustes de movimiento, revisión de cada ángulo. La calidad está en lo que no se ve a simple vista.',
    details: ['Barniz protector ecológico', 'Detalles en foil/relieve', 'Revisión de articulaciones', 'Control de calidad exhaustivo'],
  },
  {
    number: '05',
    title: 'Lista para Ti',
    icon: Package,
    color: 'secondary',
    description: 'Empaquetada con cariño en materiales reciclados, con una nota manuscrita y lista para viajar a su nuevo hogar. El viaje termina cuando la abres y sonríes.',
    details: ['Embalaje sostenible', 'Nota manuscrita personal', 'Certificado de autenticidad', 'Envío con seguimiento'],
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="px-6 max-w-7xl mx-auto py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-16 text-center relative z-10"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-2 block">Proceso</span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-4">
          El Camino <span className="text-accent">De la Idea</span> a Tus Manos
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Cada pieza recorre cinco etapas de cuidado artesanal. No hay atajos, solo dedicación.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <div className="hidden lg:block " />

        <div className="space-y-16 lg:space-y-24">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + index * 0.12, duration: 0.6 }}
              className={`relative flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} items-start gap-8 lg:gap-16`}
            >
              <div className={`relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 flex items-center justify-center bg-surface z-10 ${index % 2 === 0 ? 'border-primary/30' : 'border-secondary/30'}`}>
                <span className="text-2xl md:text-3xl font-serif font-bold text-textBase">{step.number}</span>
                <div className="absolute -inset-2 rounded-full border-2 border-accent/20 animate-pulse" style={{ animationDelay: `${index * 0.5}s` }} />
              </div>

              <div className={`flex-1 lg:w-1/2 p-6 md:p-8 bg-surfaceAlt/50 border border-accent/10 relative ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-sm bg-${step.color}/10 flex items-center justify-center`}>
                    <step.icon className={`w-6 h-6 text-${step.color}`} />
                  </div>
                  <h3 className="text-2xl font-serif text-textBase">{step.title}</h3>
                </div>
                <p className="text-textBase/60 leading-relaxed mb-6">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-textBase/70 text-sm">
                      <span className={`w-2 h-2 rounded-full bg-${step.color} flex-shrink-0`} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-4 md:px-8 py-5 md:py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg">
          <Heart className="w-6 h-6 text-secondary" />
          <div className="text-left">
            <p className="font-serif text-textBase">Hecho con paciencia y amor</p>
            <p className="text-textBase/60 text-sm">Cada pieza lleva 8-40 horas de trabajo artesanal</p>
          </div>
          <Leaf className="w-6 h-6 text-primary ml-auto" />
        </div>
      </motion.div>
    </section>
  );
};

export default ProcessSection;