import { getTranslations } from 'next-intl/server';

export default async function MongoNotConfiguredNotice() {
  const t = await getTranslations('admin.dashboard');

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-admin-border bg-admin-surface p-8 shadow-admin-card">
      <p className="text-xs uppercase tracking-[0.22em] text-admin-gold">Configuration needed</p>
      <h1 className="mt-3 font-serif text-3xl text-admin-ink">{t('mongoNotConfiguredTitle')}</h1>
      <p className="mt-4 text-admin-body">{t('mongoNotConfiguredText')}</p>
    </div>
  );
}
