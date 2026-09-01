import { getTranslations } from 'next-intl/server';
import { getAdminSession } from '@/lib/auth';
import { hasMongoConfig } from '@/lib/db';
import { hasCloudinaryConfig } from '@/lib/cloudinary';
import AdminLocaleSwitcher from '@/components/admin/AdminLocaleSwitcher';
import Badge from '@/components/admin/ui/Badge';
import PageHeader from '@/components/admin/ui/PageHeader';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  const t = await getTranslations('admin.settings');
  const tSidebar = await getTranslations('admin.sidebar');

  const accountRows = [
    { label: t('name'), value: session?.name },
    { label: t('email'), value: session?.email },
  ];

  const services = [
    { label: t('database'), ok: hasMongoConfig() },
    { label: t('mediaStorage'), ok: hasCloudinaryConfig() },
  ];

  return (
    <div>
      <PageHeader title={tSidebar('settings')} description={t('subtitle')} />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-admin-border bg-admin-surface shadow-admin-card">
          <h2 className="border-b border-admin-border px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-admin-ink">
            {t('account')}
          </h2>
          <dl className="divide-y divide-admin-border">
            {accountRows.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <dt className="text-sm text-admin-muted">{row.label}</dt>
                <dd className="truncate text-sm font-medium text-admin-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-2xl border border-admin-border bg-admin-surface shadow-admin-card">
          <h2 className="border-b border-admin-border px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-admin-ink">
            {t('services')}
          </h2>
          <dl className="divide-y divide-admin-border">
            {services.map((service) => (
              <div key={service.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <dt className="text-sm text-admin-muted">{service.label}</dt>
                <dd>
                  <Badge tone={service.ok ? 'success' : 'danger'} dot>
                    {service.ok ? t('connected') : t('notConfigured')}
                  </Badge>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-2xl border border-admin-border bg-admin-surface shadow-admin-card lg:col-span-2">
          <h2 className="border-b border-admin-border px-5 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-admin-ink">
            {tSidebar('language')}
          </h2>
          <div className="px-5 py-4">
            <p className="admin-hint mb-3 mt-0 max-w-[58ch]">{t('languageHint')}</p>
            <AdminLocaleSwitcher />
          </div>
        </section>
      </div>
    </div>
  );
}
