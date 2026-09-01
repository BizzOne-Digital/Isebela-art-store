'use client';

import React, { useId, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, type AppLocale } from '@/i18n/routing';

interface LocaleSwitcherProps {
  /** Extra classes for the pill container (sizing tweaks per breakpoint). */
  className?: string;
  /** Hide the globe glyph where horizontal room is tight. */
  showIcon?: boolean;
}

/** Native names, so a Spanish speaker recognises their language without translating it. */
const localeNames: Record<AppLocale, string> = {
  en: 'English',
  es: 'Español',
};

/**
 * Segmented EN | ES control. Showing both options with the active one
 * highlighted removes the ambiguity of a single-code button, where "ES" reads
 * equally as "you are in Spanish" and "switch to Spanish".
 */
export default function LocaleSwitcher({ className = '', showIcon = true }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('navigation');
  const reduceMotion = useReducedMotion();
  const [isPending, startTransition] = useTransition();
  // Desktop and mobile navbars both mount a switcher; a shared layoutId would
  // make their highlight pills fight over the same layout animation.
  const pillId = useId();

  function selectLocale(nextLocale: AppLocale) {
    if (nextLocale === locale) return;
    // usePathname drops the query string, so carry it over by hand — otherwise
    // switching language on a filtered catalog resets the filters.
    const query =
      typeof window === 'undefined'
        ? {}
        : Object.fromEntries(new URLSearchParams(window.location.search));

    startTransition(() => {
      router.replace({ pathname, query }, { locale: nextLocale });
    });
  }

  return (
    <div
      role="group"
      aria-label={t('languageToggle')}
      data-pending={isPending || undefined}
      className={`relative inline-flex items-center gap-0.5 p-0.5 rounded-full border border-accent/30 bg-surfaceAlt/80 backdrop-blur-sm transition-opacity ${
        isPending ? 'opacity-60 pointer-events-none' : ''
      } ${className}`}
    >
      {showIcon && (
        <Globe className="w-3.5 h-3.5 ml-2 mr-0.5 text-textBase/50 flex-shrink-0" aria-hidden />
      )}

      {routing.locales.map((option) => {
        const isActive = option === locale;
        return (
          <button
            key={option}
            type="button"
            onClick={() => selectLocale(option)}
            aria-pressed={isActive}
            aria-label={localeNames[option]}
            title={localeNames[option]}
            className={`relative px-2.5 py-1 rounded-full text-[11px] uppercase tracking-widest font-sans font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              isActive ? 'text-white' : 'text-textBase/55 hover:text-primary'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={`locale-switcher-pill-${pillId}`}
                transition={
                  reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }
                }
                className="absolute inset-0 rounded-full bg-primary shadow-sm"
                aria-hidden
              />
            )}
            <span className="relative z-10">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
