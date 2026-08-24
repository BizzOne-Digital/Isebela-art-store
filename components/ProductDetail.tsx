'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { FaWhatsapp } from 'react-icons/fa';
import {
  ChevronLeft,
  MessageCircle,
  Mail,
  Heart,
  Sparkles,
  Leaf,
  Truck,
  Shield,
  MapPin,
  Clock,
  Tag,
  Layers,
  Brush,
  Package
} from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductDetail = ({ product, relatedProducts }: ProductDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [product.image, ...(product.secondaryImages || [])];

  const availabilityLabels = {
    available: { label: 'Disponible', color: 'text-green-600', bg: 'bg-green-500/10' },
    'made-to-order': { label: 'Hecho a pedido', color: 'text-primary', bg: 'bg-primary/10' },
    limited: { label: 'Últimas unidades', color: 'text-secondary', bg: 'bg-secondary/10' },
    'sold-out': { label: 'Agotado', color: 'text-neutral-500', bg: 'bg-neutral-500/10' },
  };

  const availability = availabilityLabels[product.availability];

  const processSteps = [
    { icon: Sparkles, title: 'Inspiración', desc: 'Observación y bocetos iniciales' },
    { icon: Brush, title: 'Diseño', desc: 'Patrones, colores y planificación técnica' },
    { icon: Layers, title: 'Creación', desc: 'Corte, moldeado y ensamble artesanal' },
    { icon: Heart, title: 'Acabado', desc: 'Detalles finales y control de calidad' },
    { icon: Package, title: 'Entrega', desc: 'Embalaje sostenible y envío con seguimiento' },
  ];

  const whatsappMessage = `Hola Isabel, me interesa "${product.name}" (${product.price}). Quisiera consultar disponibilidad y detalles.`;
  const emailSubject = `Consulta sobre: ${product.name}`;
  const emailBody = `Hola Isabel,\n\nMe interesa la pieza "${product.name}" (${product.price}).\n\nQuisiera saber:\n- Disponibilidad actual\n- Tiempo de entrega\n- Opciones de personalización\n- Costos de envío a [tu ciudad]\n\nQuedo a la espera de tu respuesta.\n\nGracias!`;

  return (
    <article className="min-h-screen bg-surface">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24"
      >
        <Link
          href="/#productos"
          className="inline-flex items-center gap-2 text-textBase/60 hover:text-primary transition-colors text-sm font-sans mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a la colección
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden border border-accent/20 bg-surfaceAlt">
              <Image
                src={images[currentImageIndex]}
                alt={`${product.name} - Vista ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 justify-center">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-primary'
                        : 'border-accent/20 hover:border-accent/50'
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-sans ${availability.bg} ${availability.color}`}>
                <Tag className="w-3.5 h-3.5" />
                {availability.label}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-accent/10 text-accent text-xs font-sans">
                <MapPin className="w-3.5 h-3.5" />
                Hecho en Buenos Aires, Argentina
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-primary/10 text-primary text-xs font-sans">
                <Clock className="w-3.5 h-3.5" />
                {product.availability === 'made-to-order' ? '15-20 días' : 'Envío 2-5 días'}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-accent text-xs font-sans uppercase tracking-widest">{product.category}</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-textBase mt-2 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-textBase/60 text-lg leading-relaxed max-w-xl">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-accent/10">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl md:text-4xl font-serif text-primary">{product.price}</span>
                {product.priceLabel && (
                  <span className="text-textBase/50 text-sm">{product.priceLabel}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/5491186371242?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans text-sm"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Consultar por WhatsApp
                </a>
                <a
                  href={`mailto:isadoug01@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 border border-secondary/30 text-secondary rounded-sm hover:bg-secondary/10 transition-colors font-sans text-sm"
                >
                  <Mail className="w-5 h-5" />
                  Consultar por Email
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-accent/10 space-y-4">
              <h3 className="text-xl font-serif text-textBase">Características</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 bg-surfaceAlt/50 border border-accent/10 rounded-sm">
                    <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-textBase/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {product.materials && product.materials.length > 0 && (
              <div className="pt-6 border-t border-accent/10 space-y-4">
                <h3 className="text-xl font-serif text-textBase">Materiales</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.materials.map((material, index) => (
                    <li key={index} className="flex items-center gap-3 p-3 bg-surfaceAlt/50 border border-accent/10 rounded-sm">
                      <Leaf className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-textBase/80 text-sm">{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-6 border-t border-accent/10 space-y-4">
              <h3 className="text-xl font-serif text-textBase">El Proceso Detrás de Esta Pieza</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {processSteps.map((step, index) => (
                  <div key={index} className="p-4 bg-surfaceAlt/50 border border-accent/10 rounded-sm text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-sm bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-serif text-textBase text-sm mb-1">{step.title}</h4>
                    <p className="text-textBase/60 text-xs">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-accent/10">
              <h3 className="text-xl font-serif text-textBase mb-4">Garantías</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { icon: Shield, title: 'Satisfacción Garantizada', desc: 'Revisamos cada detalle antes de enviar' },
                  { icon: Truck, title: 'Envío Seguro', desc: 'Embalaje cuidadoso y seguimiento incluido' },
                  { icon: Heart, title: 'Hecho con Amor', desc: 'Cada pieza lleva dedicación artesanal' },
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 bg-surfaceAlt/50 border border-accent/10 rounded-sm">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-sm bg-secondary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h4 className="font-serif text-textBase text-sm mb-1">{item.title}</h4>
                    <p className="text-textBase/60 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-24 relative z-10"
          >
            <h2 className="text-3xl font-serif text-textBase text-center mb-12">Creaciones Relacionadas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.article
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="group border border-accent/10 bg-surfaceAlt/50 hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  <Link href={`/products/${relatedProduct.slug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </Link>
                  <div className="p-5 space-y-2">
                    <span className="text-accent text-xs font-sans uppercase tracking-wider">{relatedProduct.category}</span>
                    <Link href={`/products/${relatedProduct.slug}`} className="block">
                      <h3 className="text-lg font-serif text-textBase group-hover:text-primary transition-colors line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <p className="text-textBase/60 text-sm line-clamp-2">{relatedProduct.shortDescription}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-accent/10">
                      <span className="text-primary font-serif text-lg">{relatedProduct.price}</span>
                      <Link
                        href={`/products/${relatedProduct.slug}`}
                        className="text-accent text-sm font-sans hover:underline"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center relative z-10"
        >
          <div className="inline-flex items-center gap-4 px-4 md:px-8 py-5 md:py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg">
            <Sparkles className="w-6 h-6 text-accent" />
            <div className="text-left">
              <p className="font-serif text-textBase">¿Quieres personalizar esta pieza?</p>
              <p className="text-textBase/60 text-sm">Hablemos y adaptemos colores, tamaño o detalles a tu gusto.</p>
            </div>
            <a
              href={`https://wa.me/5491186371242?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto px-5 py-2 bg-primary text-white text-sm font-sans rounded-sm hover:bg-primary/90 transition-colors"
            >
              Personalizar
            </a>
          </div>
        </motion.div>
      </motion.div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: `https://isabel-creando-arte-magia.vercel.app${product.image}`,
            brand: {
              '@type': 'Brand',
              name: 'Isabel Creando Arte y Magia',
            },
            offers: {
              '@type': 'Offer',
              url: `https://isabel-creando-arte-magia.vercel.app/products/${product.slug}`,
              priceCurrency: 'ARS',
              price: product.price?.replace(/[^\d]/g, '') || '0',
              availability: product.availability === 'available' ? 'https://schema.org/InStock' :
                           product.availability === 'made-to-order' ? 'https://schema.org/AvailableForOrder' :
                           product.availability === 'limited' ? 'https://schema.org/LimitedAvailability' : 'https://schema.org/OutOfStock',
              seller: {
                '@type': 'Organization',
                name: 'Isabel Creando Arte y Magia',
              },
            },
            sku: product.id,
            category: product.category,
          }),
        }}
      />
    </article>
  );
};

export default ProductDetail;