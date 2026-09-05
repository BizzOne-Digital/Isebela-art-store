'use client';

import { useTranslations } from 'next-intl';
import { SearchX } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import EmptyState from '@/components/ui/EmptyState';

/**
 * Rendered when a product slug no longer resolves. Without it, Next falls back
 * to its bare default 404, which reads as a broken site.
 */
export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <>
      <main className="min-h-screen bg-surface pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <EmptyState
            icon={SearchX}
            title={t('title')}
            message={t('text')}
            action={
              <>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
                >
                  {t('catalogCta')}
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-accent/30 text-accent rounded-sm hover:bg-accent/10 transition-colors font-sans"
                >
                  {t('homeCta')}
                </Link>
              </>
            }
          />
        </div>
      </main>
    </>
  );
}
