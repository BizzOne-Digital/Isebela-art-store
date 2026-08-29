'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/products';
import { FaWhatsapp } from 'react-icons/fa';
import {
  ChevronLeft,
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
  Package,
  ZoomIn,
  X,
  ChevronRight
} from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

const ProductDetail = ({ product, relatedProducts }: ProductDetailProps) => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setCurrentImageIndex(0);
    setIsLightboxOpen(false);
  }, [product.id]);

  const images = [product.image, ...(product.secondaryImages || [])];

  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/#productos');
    }
  };

  const availabilityLabels = {
    available: { label: 'Disponible para Entrega', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' },
    'made-to-order': { label: 'Hecho a Pedido (Personalizable)', color: 'text-purple-700 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800' },
    limited: { label: 'Últimas Unidades', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800' },
    'sold-out': { label: 'Agotado', color: 'text-neutral-600 dark:text-neutral-400', bg: 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700' },
  };

  const availability = availabilityLabels[product.availability];

  const processSteps = [
    { icon: Sparkles, title: 'Inspiración', desc: 'Bocetos y diseño del personaje' },
    { icon: Brush, title: 'Corte y Termoformado', desc: 'Moldeado con calor capa por capa' },
    { icon: Layers, title: 'Ensamblado', desc: 'Estructura interna y pegado artesanal' },
    { icon: Heart, title: 'Pintura y Detalles', desc: 'Rostros y accesorios hechos a mano' },
    { icon: Package, title: 'Embalaje Seguro', desc: 'Empaque protegido con nota especial' },
  ];

  const whatsappMessage = `Hola Isabel! Me interesa "${product.name}" (${product.price}). Quisiera consultar disponibilidad y detalles de entrega.`;
  const emailSubject = `Consulta sobre: ${product.name}`;
  const emailBody = `Hola Isabel,\n\nMe interesa la pieza "${product.name}" (${product.price}).\n\nQuisiera saber:\n- Disponibilidad actual\n- Tiempo de entrega\n- Opciones de personalización\n- Costos de envío a mi ciudad\n\nMuchas gracias!`;

  return (
    <article className="min-h-screen bg-surface">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20"
      >
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 text-textBase/70 hover:text-primary transition-colors text-sm font-sans mb-8 px-4 py-2 bg-surfaceAlt/60 rounded-lg border border-accent/15 hover:border-primary/40 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a la página anterior
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Product Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden border border-accent/20 bg-surfaceAlt/90 shadow-xl flex items-center justify-center p-4">
              <Image
                src={images[currentImageIndex]}
                alt={`${product.name} - Vista ${currentImageIndex + 1}`}
                fill
                className="object-contain p-4 transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 p-3 rounded-full bg-surface/90 backdrop-blur-md border border-accent/20 text-textBase hover:text-primary hover:bg-surface transition-all shadow-md"
                aria-label="Ampliar imagen"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-surface/90 backdrop-blur-md text-textBase/80 text-xs font-sans rounded-full border border-accent/20">
                  Foto {currentImageIndex + 1} de {images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {images.length > 1 && (
              <div className="flex gap-3 justify-center overflow-x-auto py-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all bg-surfaceAlt/90 flex-shrink-0 ${
                      index === currentImageIndex
                        ? 'border-primary ring-2 ring-primary/30 scale-105 shadow-md'
                        : 'border-accent/20 opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`Ver vista ${index + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} miniatura ${index + 1}`}
                      fill
                      className="object-contain p-1"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans border ${availability.bg} ${availability.color}`}>
                <Tag className="w-3.5 h-3.5" />
                {availability.label}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surfaceAlt border border-accent/15 text-textBase/80 text-xs font-sans">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                Hecho a mano en Argentina
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surfaceAlt border border-accent/15 text-textBase/80 text-xs font-sans">
                <Clock className="w-3.5 h-3.5 text-secondary" />
                {product.availability === 'made-to-order' ? 'Elaboración 7-15 días' : 'Despacho en 48hs'}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-accent text-xs font-sans uppercase tracking-widest font-semibold">{product.category}</span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-textBase mt-2 mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-textBase/70 text-base md:text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="p-6 bg-surfaceAlt/60 border border-accent/15 rounded-2xl space-y-4">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <span className="text-3xl md:text-4xl font-serif text-primary font-bold">{product.price}</span>
                  {product.priceLabel && (
                    <p className="text-textBase/50 text-xs font-sans mt-0.5">{product.priceLabel}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/5491186371242?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all font-sans text-sm font-medium shadow-md shadow-primary/20"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  Consultar por WhatsApp
                </a>
                <a
                  href={`mailto:isadoug01@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface border border-accent/30 text-textBase rounded-xl hover:border-primary/50 transition-colors font-sans text-sm"
                >
                  <Mail className="w-5 h-5 text-secondary" />
                  Email
                </a>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-serif text-textBase font-semibold">Detalles y Características</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2.5 p-3 bg-surfaceAlt/40 border border-accent/10 rounded-xl">
                    <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-textBase/80 text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-serif text-textBase font-semibold">Materiales Nobles Utilizados</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.materials.map((material, index) => (
                    <li key={index} className="flex items-center gap-2.5 p-3 bg-surfaceAlt/40 border border-accent/10 rounded-xl">
                      <Leaf className="w-4 h-4 text-secondary flex-shrink-0" />
                      <span className="text-textBase/80 text-xs sm:text-sm">{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Process */}
            <div className="space-y-3 pt-2">
              <h3 className="text-lg font-serif text-textBase font-semibold">El Proceso Artesanal</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {processSteps.map((step, index) => (
                  <div key={index} className="p-3 bg-surfaceAlt/40 border border-accent/10 rounded-xl text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h4 className="font-serif text-textBase text-xs font-semibold">{step.title}</h4>
                    <p className="text-textBase/50 text-[10px] mt-0.5 leading-tight">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-24 relative z-10"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-serif text-textBase font-bold">Otras Creaciones del Taller</h2>
              <Link href="/#productos" className="text-primary text-sm font-sans flex items-center gap-1 hover:underline">
                Ver todo
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.article
                  key={relatedProduct.id}
                  className="group border border-accent/15 bg-surfaceAlt/50 hover:border-primary/50 transition-all duration-300 rounded-2xl overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/products/${relatedProduct.slug}`} className="block relative aspect-[4/5] bg-surfaceAlt/80 overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </Link>
                    <div className="p-4 space-y-2">
                      <span className="text-accent text-[11px] font-sans uppercase tracking-wider font-semibold">{relatedProduct.category}</span>
                      <Link href={`/products/${relatedProduct.slug}`} className="block">
                        <h3 className="text-base font-serif text-textBase group-hover:text-primary transition-colors line-clamp-1">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <p className="text-textBase/60 text-xs line-clamp-2">{relatedProduct.shortDescription}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <div className="flex items-center justify-between pt-2 border-t border-accent/10">
                      <span className="text-primary font-serif text-base font-bold">{relatedProduct.price}</span>
                      <Link
                        href={`/products/${relatedProduct.slug}`}
                        className="text-accent text-xs font-sans hover:underline font-medium"
                      >
                        Ver detalles &rarr;
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Cerrar vista completa"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default ProductDetail;