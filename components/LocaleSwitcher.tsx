'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { AppLocale } from '@/i18n/routing';

interface LocaleSwitcherProps {
  className?: string;
}

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('navigation');

  function toggleLocale() {
    const nextLocale: AppLocale = locale === 'en' ? 'es' : 'en';
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={
        className ??
        'inline-flex items-center justify-center min-w-[52px] px-3 py-2 border border-accent/30 bg-surfaceAlt/80 text-textBase text-[10px] uppercase tracking-widest font-sans font-semibold rounded-full transition-all hover:border-primary/50 hover:text-primary'
      }
      aria-label={t('languageToggle')}
    >
      {locale === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
