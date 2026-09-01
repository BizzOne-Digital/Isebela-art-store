import { getTranslations } from 'next-intl/server';
import { Database } from 'lucide-react';

export default async function MongoNotConfiguredNotice() {
  const t = await getTranslations('admin.dashboard');

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-admin-border bg-admin-surface p-7 shadow-admin-card">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-admin-danger-soft text-admin-danger">
        <Database className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <h1 className="font-serif text-2xl text-admin-ink">{t('mongoNotConfiguredTitle')}</h1>
      <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-admin-body">{t('mongoNotConfiguredText')}</p>
    </div>
  );
}
