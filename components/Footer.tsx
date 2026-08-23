'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-400 pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                <Image src="/images/logo/logo.jpeg" alt="Isabel Creando Logo" width={48} height={48} className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white">Isabel Creando Arte y Magia</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-sans">Hecho a mano con amor</p>
              </div>
            </div>
            <p className="text-neutral-400 text-sm max-w-md leading-relaxed mb-8">
              Creaciones artesanales únicas en goma eva: muñecas con alma, tarjetas pop-up que guardan secretos,
              papelería que inspira y arte reciclado que honra el planeta. Cada pieza cuenta una historia.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://wa.me/5491186371242" target="_blank" rel="noopener" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all" aria-label="WhatsApp">
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-white text-lg mb-8">Explorar</h4>
            <nav className="flex flex-col gap-4">
              <Link href="/#philosophy" className="text-sm hover:text-primary transition-colors">Nuestra Filosofía</Link>
              <Link href="/#collection" className="text-sm hover:text-primary transition-colors">Colección Completa</Link>
              <Link href="/#process" className="text-sm hover:text-primary transition-colors">Proceso Creativo</Link>
              <Link href="/#offers" className="text-sm hover:text-primary transition-colors">Ofertas Especiales</Link>
              <Link href="/#contact" className="text-sm hover:text-primary transition-colors">Pedidos Personalizados</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-serif text-white text-lg mb-8">Contacto</h4>
            <address className="not-italic flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <a href="https://wa.me/5491186371242" className="text-sm hover:text-white transition-colors">+54 9 11 8637-1242</a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <a href="mailto:isadoug01@gmail.com" className="text-sm hover:text-white transition-colors">isadoug01@gmail.com</a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm">Buenos Aires, Argentina</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm">Lun-Sáb: 10:00 - 19:00</span>
              </div>
            </address>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Isabel Creando Arte y Magia. Todos los derechos reservados.
          </p>
          <div className="flex gap-8 text-xs text-neutral-500">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacidad</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Términos</a>
          </div>
          <p className="text-xs text-neutral-600 italic">
            Artesanía con alma desde Argentina
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;