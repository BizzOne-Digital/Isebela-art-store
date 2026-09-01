'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/LocaleSwitcher';

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

const Navbar = () => {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/videos', label: t('videos') },
    { href: '/products', label: t('products') },
    { href: '/pricing', label: t('pricing') },
    { href: '/testimonials', label: t('testimonials') },
    { href: '/contact', label: t('contact') },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/50 backdrop-blur-md border-b border-neutral-200/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-sm relative overflow-hidden transition-transform group-hover:scale-105">
                <Image src="/images/logo/logo.jpeg" alt="Isabel Creando Logo" width={40} height={40} className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-serif text-textBase leading-none">
                  Isabel <span className="text-primary">Creando</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-black-400 font-sans mt-1">
                  Arte y Magia
                </span>
              </div>
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center gap-6 md:gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="text-xs uppercase tracking-widest font-sans font-medium text-textBase/70 hover:text-primary transition-colors relative group bg-transparent p-0"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300"
                    style={{ width: isActive(link.href) ? '100%' : '0' }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LocaleSwitcher />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="inline-block px-6 py-2.5 bg-primary text-white text-[10px] uppercase tracking-widest font-sans font-semibold rounded-sm hover:bg-primary-dark transition-colors"
              >
                {t('consult')}
              </Link>
            </motion.div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-textBase/60 hover:text-accent transition-colors"
              aria-label={t('instagram')}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-textBase/60 hover:text-accent transition-colors"
              aria-label={t('facebook')}
            >
              <FacebookIcon />
            </a>
            <a
              href="https://wa.me/5491186371242"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-textBase/60 hover:text-green-500 transition-colors"
              aria-label={t('whatsapp')}
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LocaleSwitcher className="inline-flex items-center justify-center min-w-[44px] px-2.5 py-1.5 border border-accent/30 bg-surfaceAlt/80 text-textBase text-[10px] uppercase tracking-widest font-sans font-semibold rounded-full transition-all hover:border-primary/50 hover:text-primary" />
            <button
              className="p-2 text-textBase hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t('closeMenu') : t('openMenu')}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-surface border-b border-neutral-200 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col py-6 px-6 gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className="block text-sm uppercase tracking-widest font-sans font-medium text-left p-2 transition-colors relative"
                      style={{ color: isActive(link.href) ? 'var(--color-primary)' : 'var(--color-neutral-700)' }}
                    >
                      {link.label}
                      {isActive(link.href) && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r" />
                      )}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full py-4 bg-primary text-white text-center text-xs uppercase tracking-widest font-sans font-semibold rounded-sm"
                  >
                    {t('consult')}
                  </Link>
                </motion.div>
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-neutral-200">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 text-textBase/60 hover:text-accent transition-colors" aria-label={t('instagram')}>
                    <InstagramIcon />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 text-textBase/60 hover:text-accent transition-colors" aria-label={t('facebook')}>
                    <FacebookIcon />
                  </a>
                  <a href="https://wa.me/5491186371242" target="_blank" rel="noopener noreferrer" className="p-2 text-textBase/60 hover:text-green-500 transition-colors" aria-label={t('whatsapp')}>
                    <FaWhatsapp className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
