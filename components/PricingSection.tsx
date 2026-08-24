'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Heart, Truck, Shield, Star, Crown, Gift } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Piezas de Catálogo',
    description: 'Diseños listos para enviar de mi colección actual',
    price: 'Desde $8.000',
    period: 'por unidad',
    features: [
      'Disponibilidad inmediata',
      'Diseños probados y queridos',
      'Envío 2-5 días hábiles',
      'Empaque sostenible incluido',
      'Nota manuscrita de agradecimiento',
    ],
    cta: 'Ver Catálogo',
    popular: false,
    icon: Sparkles,
    scrollTo: '#productos',
  },
  {
    name: 'Encargo Personalizado',
    description: 'Tu idea hecha realidad, diseñada exclusivamente para ti',
    price: 'Desde $25.000',
    period: 'por pieza',
    features: [
      'Diseño 100% original y exclusivo',
      'Bocetos y revisiones incluidas',
      'Elección de colores y materiales',
      'Actualizaciones de proceso por WhatsApp',
      'Certificado de autenticidad',
      'Envío seguro con seguimiento',
    ],
    cta: 'Solicitar Presupuesto',
    popular: true,
    icon: Heart,
    scrollTo: '#contacto',
  },
  {
    name: 'Pedidos al Por Mayor',
    description: 'Para eventos, regalos corporativos o revendedores',
    price: 'Consultar',
    period: '10+ unidades',
    features: [
      'Descuento por volumen (15-30%)',
      'Diseños coordinados para tu evento',
      'Plazos de entrega acordados',
      'Factura A / B disponible',
      'Empaque personalizado opcional',
      'Asesoría en selección de piezas',
    ],
    cta: 'Consultar Mayorista',
    popular: false,
    icon: Crown,
    scrollTo: '#contacto',
  },
];

const processSteps = [
  { number: '01', title: 'Conversación', desc: 'Hablamos de tu idea, presupuesto y plazos', icon: Sparkles },
  { number: '02', title: 'Propuesta', desc: 'Te envío bocetos, paleta de colores y precio final', icon: Star },
  { number: '03', title: 'Aprobación', desc: 'Das el visto bueno y comienzo la creación', icon: Check },
  { number: '04', title: 'Creación', desc: 'Fabrico tu pieza compartiendo avances', icon: Heart },
  { number: '05', title: 'Entrega', desc: 'Empaqueto con amor y envío con seguimiento', icon: Truck },
];

const PricingSection = () => {
  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="precios" className="px-6 max-w-7xl mx-auto py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-4 block">Precios</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-textBase mb-6">
          Inversión en
          <br />
          <span className="text-primary">Arte Hecho a Mano</span>
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Cada precio refleja horas de dedicación, materiales de calidad y el cariño artesanal
          que hace única a cada pieza. No hay costos ocultos, solo transparencia.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
      >
        {pricingTiers.map((tier, index) => (
          <motion.article
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.1 }}
            className={`relative p-8 bg-surfaceAlt/50 border rounded-xl transition-all duration-300 ${
              tier.popular
                ? 'border-primary/50 shadow-[0_0_30px_rgba(107,33,168,0.15)]'
                : 'border-accent/10 hover:border-primary/30'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-sans uppercase tracking-wider rounded-full">
                Más Popular
              </div>
            )}
            <div className="text-center mb-8">
              <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <tier.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif text-textBase mb-2">{tier.name}</h3>
              <p className="text-textBase/60 text-sm">{tier.description}</p>
            </div>
            <div className="text-center mb-6">
              <span className="text-4xl md:text-5xl font-serif text-primary">{tier.price}</span>
              <p className="text-textBase/50 text-sm mt-1">{tier.period}</p>
            </div>
            <ul className="space-y-4 mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-textBase/70 text-sm">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollTo(tier.scrollTo)}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans text-sm transition-colors ${
                tier.popular
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-accent/10 text-accent hover:bg-accent hover:text-white'
              }`}
            >
              {tier.cta}
              {tier.scrollTo === '#contacto' && <Gift className="w-4 h-4" />}
            </button>
          </motion.article>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-20 relative z-10"
      >
        <h3 className="text-3xl font-serif text-textBase text-center mb-12">Cómo Funciona el Proceso</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.08 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-primary">{step.number}</span>
              </div>
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary/10 flex items-center justify-center">
                <step.icon className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-serif text-textBase mb-2">{step.title}</h4>
              <p className="text-textBase/60 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-4 md:px-8 py-5 md:py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg mb-8">
          <Shield className="w-6 h-6 text-accent" />
          <div className="text-left">
            <p className="font-serif text-textBase">Garantía de Satisfacción</p>
            <p className="text-textBase/60 text-sm">Si no es lo que soñabas, lo ajustamos. Revisamos cada detalle antes del envío.</p>
          </div>
        </div>

        <p className="text-textBase/60 mb-4">¿Tienes dudas sobre qué opción se adapta mejor a ti?</p>
        <button
          onClick={() => { const el = document.querySelector('#contacto'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
        >
          <Star className="w-5 h-5" />
          Asesoramiento Gratis
        </button>
      </motion.div>
    </section>
  );
};

export default PricingSection;