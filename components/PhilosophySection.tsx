'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Sparkles, Leaf, Award, Palette, Recycle } from 'lucide-react';

const PhilosophySection = () => {
  const values = [
    { icon: Heart, title: 'Amor por el Detalle', desc: 'Cada pliegue, cada corte, cada color se elige con intención. El amor está en los detalles que solo el ojo artesanal puede ver.' },
    { icon: Sparkles, title: 'Imaginación Sin Límites', desc: 'No hay diseños imposibles, solo ideas que esperan ser materializadas. Transformo sueños en objetos tangibles.' },
    { icon: Leaf, title: 'Respeto Natural', desc: 'Uso goma eva de calidad premium y materiales reciclados. Crear belleza no debe costar el futuro del planeta.' },
    { icon: Award, title: 'Calidad Heirloom', desc: 'Piezas hechas para durar generaciones. La durabilidad y el acabado impecable son mi promesa en cada creación.' },
    { icon: Palette, title: 'Color como Lenguaje', desc: 'La paleta de cada pieza cuenta una historia. Los colores no decoran, comunican emociones y atmósferas.' },
    { icon: Recycle, title: 'Segunda Vida', desc: 'La línea reciclada transforma residuos en arte. Botellas, cartón y vidrio cobran nueva vida con propósito.' },
  ];

  const story = [
    {
      title: 'El Inicio',
      text: 'Todo comenzó en 2015, en una pequeña mesa de mi casa, con un paquete de goma eva y la curiosidad de una madre que quería crear juguetes únicos para su hija. Lo que empezó como un pasatiempo se convirtió en mi forma de expresión más pura.'
    },
    {
      title: 'La Evolución',
      text: 'Con los años, la técnica se refinó. Los cortes se volvieron más precisos, los ensambles más complejos, los diseños más atrevidos. Cada pieza me enseñó algo nuevo sobre la paciencia, la geometría del color y la magia de lo hecho a mano.'
    },
    {
      title: 'Hoy',
      text: 'Isabel Creando Arte y Magia es un taller donde cada día nacen muñecas con alma, tarjetas que guardan secretos, libretas que esperan historias y objetos reciclados que honran su pasado. Mi misión: que quien reciba una pieza sienta la intención con la que fue hecha.'
    }
  ];

  return (
    <section id="philosophy" className="px-6 max-w-7xl mx-auto py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-4 block">Filosofía</span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-6">
          El Arte de Crear
          <br />
          <span className="text-primary">Con las Manos y el Alma</span>
        </h2>
        <p className="text-textBase/60 text-lg max-w-3xl mx-auto leading-relaxed">
          No solo hago manualidades. Doy forma a emociones, materializo sueños y creo puentes
          entre la imaginación y la realidad tangible.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10"
      >
        <div className="space-y-8">
          {story.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-6 md:p-8 border border-accent/10 bg-surfaceAlt/30 relative overflow-hidden"
            >
              <span className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-serif text-xl">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif text-textBase mb-2">{item.title}</h3>
                  <p className="text-textBase/60 leading-relaxed">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="aspect-[4/5] rounded-lg overflow-hidden border border-accent/20 bg-surfaceAlt relative"
          >
            <Image
              src="/images/about-workshop.svg"
              alt="Taller de Isabel creando arte con goma eva"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface/90 backdrop-blur-sm border border-accent/20">
              <p className="text-textBase/80 text-sm leading-relaxed italic">
                &ldquo;Mis manos saben lo que mi corazón imagina. Cada pieza es un fragmento de mi mundo interior hecho visible.&rdquo;
              </p>
              <p className="text-accent text-sm mt-3 font-sans">&mdash; Isabel</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-6 -left-6 md:-left-10 w-72 md:w-80 p-6 bg-primary border border-primary/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
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
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-20 relative z-10"
      >
        <h3 className="text-3xl font-serif text-textBase text-center mb-12">Valores que Guían Cada Creación</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.08 }}
              className="group p-6 border border-accent/10 bg-surfaceAlt/30 hover:border-primary/30 hover:bg-surfaceAlt/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                <value.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-lg font-serif text-textBase mb-2">{value.title}</h4>
              <p className="text-textBase/60 text-sm leading-relaxed">{value.desc}</p>
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
        <div className="inline-flex items-center gap-4 px-8 py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg">
          <Sparkles className="w-6 h-6 text-accent" />
          <div className="text-left">
            <p className="font-serif text-textBase">¿Tienes una idea en mente?</p>
            <p className="text-textBase/60 text-sm">Hablemos y demos vida a tu visión única.</p>
          </div>
          <a
            href="#contact"
            className="ml-auto px-5 py-2 bg-primary text-white text-sm font-sans rounded-sm hover:bg-primary/90 transition-colors"
          >
            Encargo Personalizado
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default PhilosophySection;