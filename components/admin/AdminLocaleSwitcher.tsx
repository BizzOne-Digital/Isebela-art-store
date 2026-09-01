'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { setAdminLocale } from '@/app/admin/actions';
import type { AppLocale } from '@/i18n/routing';

export default function AdminLocaleSwitcher() {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('admin.sidebar');

  function handleSelect(next: AppLocale) {
    if (next === locale) return;
    startTransition(async () => {
      await setAdminLocale(next);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-admin-border bg-admin-surface-alt px-3 py-2">
      <span className="text-xs font-medium uppercase tracking-wider text-admin-muted">{t('language')}</span>
      <div className="flex items-center gap-1 rounded-full bg-admin-bg p-0.5">
        {(['en', 'es'] as const).map((code) => (
          <button
            key={code}
            type="button"
            disabled={isPending}
            onClick={() => handleSelect(code)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
              locale === code
                ? 'bg-admin-primary text-white shadow-sm'
                : 'text-admin-body hover:text-admin-ink'
            }`}
          >
            {code}
          </button>
        ))}
      </div>
    </div>
  );
}
