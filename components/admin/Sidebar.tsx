'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LayoutDashboard, Package, FolderTree, Clapperboard, Settings, LogOut, ExternalLink } from 'lucide-react';
import AdminLocaleSwitcher from './AdminLocaleSwitcher';

// Grouped so the three catalog surfaces read as one job, separate from the
// overview and account screens.
const navGroups = [
  {
    key: 'overview' as const,
    items: [{ href: '/admin/dashboard', icon: LayoutDashboard, key: 'dashboard' as const, exact: true }],
  },
  {
    key: 'catalog' as const,
    items: [
      { href: '/admin/dashboard/artworks', icon: Package, key: 'products' as const, exact: false },
      { href: '/admin/dashboard/categories', icon: FolderTree, key: 'categories' as const, exact: false },
      { href: '/admin/dashboard/videos', icon: Clapperboard, key: 'videos' as const, exact: false },
    ],
  },
  {
    key: 'account' as const,
    items: [{ href: '/admin/dashboard/settings', icon: Settings, key: 'settings' as const, exact: false }],
  },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('admin.sidebar');

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="admin-root flex h-full flex-col bg-admin-surface">
      <Link
        href="/admin/dashboard"
        onClick={onNavigate}
        className="flex items-center gap-3 border-b border-admin-border px-5 py-5"
      >
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-admin-primary font-serif text-lg text-white">
          I
        </div>
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate font-serif text-[0.9375rem] text-admin-ink">{t('brand')}</span>
          <span className="truncate text-[11px] text-admin-muted">{t('brandSub')}</span>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {navGroups.map((group, groupIndex) => (
          <div key={group.key} className={groupIndex > 0 ? 'mt-6' : ''}>
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-admin-muted">
              {t(`group${group.key.charAt(0).toUpperCase()}${group.key.slice(1)}` as 'groupOverview')}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? 'bg-admin-primary-soft font-medium text-admin-primary'
                        : 'text-admin-body hover:bg-admin-surface-alt hover:text-admin-ink'
                    }`}
                  >
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-admin-gold"
                        aria-hidden="true"
                      />
                    )}
                    <item.icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.75} />
                    {t(item.key)}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-2 border-t border-admin-border px-3 py-4">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-admin-body transition-colors hover:bg-admin-surface-alt hover:text-admin-ink"
        >
          <ExternalLink className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.75} />
          {t('viewSite')}
        </a>
        <AdminLocaleSwitcher />
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-admin-body transition-colors hover:bg-admin-danger-soft hover:text-admin-danger"
        >
          <LogOut className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.75} />
          {t('logout')}
        </button>
      </div>
    </div>
  );
}
