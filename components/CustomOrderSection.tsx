'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, Heart, PenTool, Truck, Shield } from 'lucide-react';

const CustomOrderSection = () => {
  return (
    <section id="custom-orders" className="px-6 max-w-7xl mx-auto py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-16"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-2 block">Encargos a Medida</span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-6">
          ¿Tienes una <span className="text-primary">Idea Especial</span>?
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          Cuéntame qué imaginas y juntas le daremos forma. Desde un personaje único hasta una colección completa para tu evento.
        </p>
        <div className="inline-flex items-center gap-4 px-4 md:px-8 py-4 bg-surfaceAlt/50 border border-accent/20 rounded-lg">
          <Sparkles className="w-6 h-6 text-accent" />
          <div className="text-left">
            <p className="font-serif text-textBase">Personalización total</p>
            <p className="text-textBase/60 text-sm">Colores, tamaños, temáticas y detalles a tu medida</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 bg-surfaceAlt/50 border border-accent/20 relative overflow-hidden"
          >
            <span className="absolute top-4 left-4 text-accent text-2xl">┌</span>
            <span className="absolute bottom-4 right-4 text-accent text-2xl">┘</span>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-textBase mb-3">Hablemos por WhatsApp</h3>
                <p className="text-textBase/60 leading-relaxed mb-4">
                  La forma más directa y cercana. Te respondo personalmente, vemos fotos de referencia,
                  definimos colores y te doy presupuesto sin compromiso.
                </p>
                <a
                  href="https://wa.me/5491186371242?text=Hola%20Isabel%2C%20tengo%20una%20idea%20para%20un%20encargo%20personalizado..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-surfaceAlt/50 border border-accent/20 relative overflow-hidden"
          >
            <span className="absolute top-4 left-4 text-accent text-2xl">┌</span>
            <span className="absolute bottom-4 right-4 text-accent text-2xl">┘</span>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-14 h-14 rounded-sm bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <PenTool className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-textBase mb-3">O envía tu consulta por email</h3>
                <p className="text-textBase/60 leading-relaxed mb-4">
                  Ideal para proyectos más complejos, pedidos al por mayor o colaboraciones.
                  Adjunta inspiración, medidas, cantidad y fecha estimada.
                </p>
                <a
                  href="mailto:isadoug01@gmail.com?subject=Encargo%20Personalizado&body=Hola%20Isabel%2C%0A%0ATengo%20una%20idea%20para%20un%20encargo%20personalizado%3A%0A%0A- Tipo de pieza%3A%0A- Temática%2Fcolores%3A%0A- Tamaño aproximado%3A%0A- Cantidad%3A%0A- Fecha de entrega deseada%3A%0A%0AAdjunto%20imagenes%20de%20referencia.%0A%0AGracias%21"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-secondary/30 text-secondary rounded-sm hover:bg-secondary/10 transition-colors font-sans text-sm"
                >
                  <PenTool className="w-5 h-5" />
                  Enviar email
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-square rounded-2xl overflow-hidden border border-accent/20 bg-surfaceAlt relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <Sparkles className="w-24 h-24 mx-auto mb-6 text-primary/30" />
                <h3 className="text-2xl md:text-3xl font-serif text-textBase mb-4">
                  Tu imaginación,<br />mis manos
                </h3>
                <p className="text-textBase/60 text-lg max-w-xs mx-auto leading-relaxed">
                  No hay ideas demasiado locas ni detalles demasiado pequeños. Solo hay ganas de crear.
                </p>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface/90 backdrop-blur-sm border border-accent/20">
              <p className="text-textBase/80 text-sm leading-relaxed italic text-center">
                &ldquo;Nunca pensé que pudiera existir exactamente lo que tenía en mente. Isabel lo hizo realidad superando mis expectativas.&rdquo;
              </p>
              <p className="text-secondary text-sm mt-3 font-sans text-center">&mdash; María, cliente</p>
            </div>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute -bottom-35 -right-1 md:-right-6 w-60 sm:w-72 md:w-80 p-6 bg-primary border border-primary/50 max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-40px)]"
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
                <p className="text-2xl font-serif text-white">∞</p>
                <p className="text-white/70 text-xs">Posibilidades</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-white">1</p>
                <p className="text-white/70 text-xs">Pieza Única</p>
              </div>
            </div>
          </motion.div> */}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-20 relative z-10"
      >
        <h3 className="text-3xl font-serif text-textBase text-center mb-12">Cómo Funciona un Encargo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: '1. Idea', desc: 'Me cuentas tu visión, muestras referencias, definimos concepto' },
            { icon: PenTool, title: '2. Diseño', desc: 'Te presento bocetos y paleta de colores para tu aprobación' },
            { icon: Heart, title: '3. Creación', desc: 'Fabrico la pieza compartiendo avances por WhatsApp' },
            { icon: Truck, title: '4. Entrega', desc: 'Embalaje cuidadoso y envío con seguimiento a todo el país' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.08 }}
              className="group p-6 border border-accent/10 bg-surfaceAlt/30 hover:border-primary/30 hover:bg-surfaceAlt/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="font-serif text-textBase mb-2">{item.title}</h4>
              <p className="text-textBase/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-4 md:px-8 py-5 md:py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg " >
          <Shield className="w-6 h-6 text-accent" />
          <div className="text-left">
            <p className="font-serif text-textBase">Garantía de satisfacción</p>
            <p className="text-textBase/60 text-sm">Revisamos juntas cada detalle antes del envío. Si no es lo que soñabas, lo ajustamos.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CustomOrderSection;