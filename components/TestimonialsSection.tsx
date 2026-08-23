'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Sparkles, Shield, MessageCircle, Crown } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    location: 'Buenos Aires',
    role: 'Mamá de Sofía (5 años)',
    avatar: 'MG',
    rating: 5,
    text: 'La muñeca hada que encargué para el cumpleaños de mi hija superó todas mis expectativas. Isabel capturó exactamente la esencia que yo imaginaba y los detalles son increíbles. Mi hija no se separa de ella. El proceso fue hermoso: me mandó fotos del avance y pude opinar en cada etapa. 100% recomendada.',
    product: 'Hada del Bosque Encantado (Personalizada)',
    tags: ['Encargo personalizado', 'Regalo infantil', 'Muñeca'],
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    location: 'Córdoba',
    role: 'Novio de Ana',
    avatar: 'CR',
    rating: 5,
    text: 'Buscaba algo único para nuestro aniversario y la tarjeta pop-up personalizada fue el acierto total. Cuando Ana la abrió y vio nuestra foto en 3D con el mensaje que le escribí, se emocionó muchísimo. Isabel fue súper atenta, me guió en todo el proceso y la entrega fue rapidísima a Córdoba. Volveré a encargar sin duda.',
    product: 'Tarjeta Pop-Up Aniversario (Personalizada)',
    tags: ['Encargo personalizado', 'Aniversario', 'Tarjeta 3D'],
  },
  {
    id: 3,
    name: 'Laura Martínez',
    location: 'Rosario',
    role: 'Organizadora de eventos',
    avatar: 'LM',
    rating: 5,
    text: 'Encargué 50 libretas personalizadas para un evento corporativo y quedé fascinada. La calidad del papel, la encuadernación, los detalles en la tapa... todo impecable. Isabel respetó los plazos ajustados y la comunicación fue fluida todo el tiempo. Los asistentes al evento alucinaron con el detalle. Profesionalismo artesanal de verdad.',
    product: 'Libretas Corporativas x50 (Por Mayor)',
    tags: ['Pedido mayorista', 'Evento corporativo', 'Papelería'],
  },
  {
    id: 4,
    name: 'Sofía Herrera',
    location: 'Mendoza',
    role: 'Coleccionista',
    avatar: 'SH',
    rating: 5,
    text: 'Tengo varias piezas de Isabel y cada una es un tesoro. La bailarina articulada es mi favorita: la calidad de los materiales, la precisión en las articulaciones, los detalles pintados a mano... se nota que hay amor en cada corte. Además, el empaque es tan bonito que da pena abrirlo. Es arte para toda la vida.',
    product: 'Bailarina de Ensueño + Muñeca Flor',
    tags: ['Coleccionista', 'Muñecas articuladas', 'Calidad premium'],
  },
  {
    id: 5,
    name: 'Javier y Paula',
    location: 'La Plata',
    role: 'Novios',
    avatar: 'JP',
    rating: 5,
    text: 'Para nuestra boda quisimos tarjetas de agradecimiento especiales para cada invitado (120 personas). Isabel diseñó un modelo base y personalizó cada una con el nombre. El resultado fue mágico: los invitados se llevaron un recuerdo único y nosotros quedamos tranquilos sabiendo que cada detalle estaba cuidado. Gracias por hacer nuestro día aún más especial.',
    product: 'Tarjetas Boda Personalizadas x120',
    tags: ['Boda', 'Pedido mayorista', 'Tarjetas personalizadas'],
  },
  {
    id: 6,
    name: 'Valentina Ruiz',
    location: 'Neuquén',
    role: 'Docente',
    avatar: 'VR',
    rating: 5,
    text: 'Compré la maceta reciclada y el lapicero de botella para mi aula. Los chicos fliparon al saber que estaban hechos de materiales que íbamos a tirar. Isabel me explicó el proceso y hasta me mandó fichas didácticas para trabajar el reciclaje en clase. Ahora queremos encargar más cosas para el día del ambiente. Arte con conciencia.',
    product: 'Maceta Reciclada + Lapicero Botella Mágica',
    tags: ['Línea reciclada', 'Educación', 'Sostenibilidad'],
  },
];

const stats = [
  { number: '500+', label: 'Clientas Felices', icon: Heart },
  { number: '98%', label: 'Recomiendan', icon: Star },
  { number: '10+', label: 'Años de Experiencia', icon: Crown },
  { number: '∞', label: 'Posibilidades', icon: Sparkles },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="px-6 max-w-7xl mx-auto py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-4 block">Testimonios</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-textBase mb-6">
          Lo que Dicen Quienes
          <br />
          <span className="text-secondary">Ya Confiaron</span>
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Más de 500 personas han llevado a casa una pieza de mi taller. Estas son algunas de sus historias.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 relative z-10"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.08 }}
            className="text-center p-6 border border-accent/10 bg-surfaceAlt/30 hover:border-primary/30 transition-colors"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className="w-7 h-7 text-primary" />
            </div>
            <p className="text-3xl md:text-4xl font-serif text-primary mb-1">{stat.number}</p>
            <p className="text-textBase/60 text-sm font-sans">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.08 }}
              className="p-6 md:p-8 bg-surfaceAlt/50 border border-accent/10 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute top-4 left-4 text-accent text-2xl opacity-50">&ldquo;</span>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-serif text-xl font-bold">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="font-serif text-textBase">{testimonial.name}</p>
                  <p className="text-textBase/50 text-xs font-sans">{testimonial.location} &middot; {testimonial.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4 relative z-10">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-textBase/70 leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="pt-4 border-t border-accent/10 relative z-10">
                <p className="text-accent text-xs font-sans uppercase tracking-wider mb-1">Pieza: </p>
                <p className="font-serif text-textBase text-sm">{testimonial.product}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {testimonial.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-sans rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-8 py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg mb-8">
          <Shield className="w-6 h-6 text-accent" />
          <div className="text-left">
            <p className="font-serif text-textBase">Garantía de Satisfacción</p>
            <p className="text-textBase/60 text-sm">Si no es lo que soñabas, lo ajustamos. Revisamos cada detalle antes del envío.</p>
          </div>
        </div>

        <p className="text-textBase/60 mb-4">¿Quieres ser la próxima historia?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5491186371242"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
          >
            <FaWhatsapp className="w-5 h-5" />
            Escribir por WhatsApp
          </a>
          <button
            onClick={() => { const el = document.querySelector('#productos'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-8 py-3 border border-accent/30 text-accent rounded-sm hover:bg-accent/10 transition-colors font-sans"
          >
            Ver Catálogo
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;