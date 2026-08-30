import { getTranslations } from 'next-intl/server';
import { getAdminSession } from '@/lib/auth';
import { hasMongoConfig } from '@/lib/db';
import AdminLocaleSwitcher from '@/components/admin/AdminLocaleSwitcher';
import Badge from '@/components/admin/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  const t = await getTranslations('admin.sidebar');

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-admin-gold">{t('settings')}</p>
        <h1 className="mt-2 font-serif text-3xl text-admin-ink">{t('settings')}</h1>
      </header>

      <div className="space-y-6">
        <section className="rounded-2xl border border-admin-border bg-admin-surface p-6 shadow-admin-card">
          <h2 className="mb-4 font-serif text-lg text-admin-ink">Account</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-admin-muted">Name</dt>
              <dd className="text-admin-ink">{session?.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-admin-muted">Email</dt>
              <dd className="text-admin-ink">{session?.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-admin-muted">Database</dt>
              <dd>
                <Badge tone={hasMongoConfig() ? 'success' : 'danger'}>
                  {hasMongoConfig() ? 'Connected' : 'Not configured'}
                </Badge>
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-admin-border bg-admin-surface p-6 shadow-admin-card">
          <h2 className="mb-4 font-serif text-lg text-admin-ink">{t('language')}</h2>
          <AdminLocaleSwitcher />
        </section>
      </div>
    </div>
  );
}
