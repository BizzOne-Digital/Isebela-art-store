'use client';

import React, { useCallback, useEffect, useId, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useRouter as useNextRouter } from 'next/navigation';
import { getPathname, usePathname } from '@/i18n/navigation';
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
 * Mirrors next-intl's own cookie defaults (`NEXT_LOCALE`, SameSite=Lax, path
 * `/`). It has to be written *before* the navigation starts: the middleware
 * detects the locale from this cookie, so switching to the unprefixed default
 * locale while the cookie still says `es` would be bounced straight back to
 * `/es/...`.
 */
function writeLocaleCookie(locale: AppLocale) {
  document.cookie = `NEXT_LOCALE=${locale};path=/;samesite=lax`;
}

/**
 * Segmented EN | ES control. Showing both options with the active one
 * highlighted removes the ambiguity of a single-code button, where "ES" reads
 * equally as "you are in Spanish" and "switch to Spanish".
 *
 * Speed notes: next-intl's `router.replace({ locale })` always force-prefixes
 * the target (`/en/contact`), which the middleware then redirects to the
 * canonical `/contact` — two server round trips per switch. Resolving the
 * canonical path here instead makes it one, and because that path is a plain
 * route we can prefetch it, so the switch is usually served straight from the
 * client router cache. The pill also moves optimistically, so the control
 * never sits frozen while the payload arrives.
 */
export default function LocaleSwitcher({ className = '', showIcon = true }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useNextRouter();
  const t = useTranslations('navigation');
  const reduceMotion = useReducedMotion();
  const [isPending, startTransition] = useTransition();
  // While the payload for the new language is in flight the pill shows the
  // choice the visitor just made. Recording the locale it was made *from*
  // means the optimistic value expires by itself as soon as the new locale
  // lands, with no effect needed to clear it.
  const [pending, setPending] = useState<{ from: AppLocale; to: AppLocale } | null>(null);
  // Desktop and mobile navbars both mount a switcher; a shared layoutId would
  // make their highlight pills fight over the same layout animation.
  const pillId = useId();

  // `usePathname` drops the query string, so carry it over by hand — otherwise
  // switching language on a filtered catalog resets the filters. Read from
  // `location` rather than `useSearchParams`, which would opt every static
  // page that renders the navbar out of prerendering.
  const hrefFor = useCallback(
    (target: AppLocale) => {
      const query =
        typeof window === 'undefined'
          ? {}
          : Object.fromEntries(new URLSearchParams(window.location.search));

      return getPathname({
        // An empty object would still serialise to a trailing "?".
        href: Object.keys(query).length > 0 ? { pathname, query } : pathname,
        locale: target,
      });
    },
    [pathname],
  );

  /**
   * Warming the other language's payload turns the switch into a cache hit.
   * It is only safe for the prefixed locales though: the default locale's URL
   * carries no prefix, so while `NEXT_LOCALE` still names the *current*
   * language the proxy resolves that URL to the current language instead —
   * and the router would keep serving that wrong (404'd) entry from its cache
   * after the click. Those switches skip the warm-up and fetch once, after
   * the cookie has been rewritten.
   */
  const canPrefetch = useCallback(
    (target: AppLocale) => target !== locale && target !== routing.defaultLocale,
    [locale],
  );

  useEffect(() => {
    for (const option of routing.locales) {
      if (canPrefetch(option)) router.prefetch(hrefFor(option));
    }
  }, [canPrefetch, hrefFor, router]);

  function selectLocale(nextLocale: AppLocale) {
    if (nextLocale === locale) return;
    setPending({ from: locale, to: nextLocale });
    writeLocaleCookie(nextLocale);
    startTransition(() => {
      router.replace(hrefFor(nextLocale), { scroll: false });
    });
  }

  const displayedLocale = pending?.from === locale ? pending.to : locale;

  return (
    <div
      role="group"
      aria-label={t('languageToggle')}
      data-pending={isPending || undefined}
      className={`relative inline-flex items-center gap-0.5 p-0.5 rounded-full border border-accent/30 bg-surfaceAlt/80 backdrop-blur-sm ${className}`}
    >
      {showIcon && (
        <Globe className="w-3.5 h-3.5 ml-2 mr-0.5 text-textBase/50 flex-shrink-0" aria-hidden />
      )}

      {routing.locales.map((option) => {
        const isActive = option === displayedLocale;
        return (
          <button
            key={option}
            type="button"
            onClick={() => selectLocale(option)}
            onPointerEnter={() => {
              if (canPrefetch(option)) router.prefetch(hrefFor(option));
            }}
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
