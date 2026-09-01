'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface TopbarProps {
  onMenuClick: () => void;
  /** Signed-in admin, shown as the identity anchor on desktop. */
  adminName?: string;
  adminEmail?: string;
}

export default function Topbar({ onMenuClick, adminName, adminEmail }: TopbarProps) {
  const t = useTranslations('admin.sidebar');
  const initial = (adminName || 'A').trim().charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-admin-border bg-admin-surface/85 px-4 backdrop-blur-md lg:px-8">
      <button
        onClick={onMenuClick}
        aria-label={t('openMenu')}
        className="-ml-1 rounded-xl p-2 text-admin-ink transition-colors hover:bg-admin-surface-alt lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex min-w-0 items-center gap-2.5 lg:hidden">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-admin-primary font-serif text-sm text-white">
          I
        </div>
        <span className="truncate font-serif text-sm text-admin-ink">{t('brand')}</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {adminName && (
          <div className="hidden text-right leading-tight sm:block">
            <p className="text-[13px] font-medium text-admin-ink">{adminName}</p>
            {adminEmail && <p className="text-[11px] text-admin-muted">{adminEmail}</p>}
          </div>
        )}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-admin-primary-soft font-medium text-admin-primary ring-1 ring-inset ring-admin-primary/15">
          {initial}
        </div>
      </div>
    </header>
  );
}
