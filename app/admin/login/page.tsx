import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getAdminSession } from '@/lib/auth';
import LoginForm from '@/components/admin/LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect('/admin/dashboard');
  }

  const t = await getTranslations('admin.login');

  return (
    <main className="flex min-h-screen items-center justify-center bg-admin-bg px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-admin-border bg-admin-surface p-8 shadow-admin-card">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-admin-primary font-serif text-xl text-white">
            I
          </div>
          <p className="text-xs uppercase tracking-[0.22em] text-admin-gold">{t('eyebrow')}</p>
          <h1 className="mt-3 font-serif text-3xl text-admin-ink">{t('title')}</h1>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
