'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LayoutDashboard, Package, FolderTree, Settings, LogOut } from 'lucide-react';
import AdminLocaleSwitcher from './AdminLocaleSwitcher';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, key: 'dashboard' as const, exact: true },
  { href: '/admin/dashboard/artworks', icon: Package, key: 'products' as const, exact: false },
  { href: '/admin/dashboard/categories', icon: FolderTree, key: 'categories' as const, exact: false },
  { href: '/admin/dashboard/settings', icon: Settings, key: 'settings' as const, exact: false },
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
    <div className="flex h-full flex-col gap-6 bg-admin-surface p-5">
      <Link href="/admin/dashboard" onClick={onNavigate} className="flex items-center gap-3 px-1 pt-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-admin-primary font-serif text-lg text-white">
          I
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-serif text-base text-admin-ink">{t('brand')}</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-admin-muted">{t('brandSub')}</span>
        </div>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-admin-primary-soft text-admin-primary font-medium'
                  : 'text-admin-body hover:bg-admin-surface-alt hover:text-admin-ink'
              }`}
            >
              <item.icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.75} />
              {t(item.key)}
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-admin-gold" />}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3">
        <AdminLocaleSwitcher />
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-admin-body transition-colors hover:bg-admin-danger-soft hover:text-admin-danger"
        >
          <LogOut className="h-[18px] w-[18px]" strokeWidth={1.75} />
          {t('logout')}
        </button>
      </div>
    </div>
  );
}
