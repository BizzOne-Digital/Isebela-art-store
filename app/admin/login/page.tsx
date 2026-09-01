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
  const tSidebar = await getTranslations('admin.sidebar');

  return (
    <main className="admin-root flex min-h-screen items-center justify-center bg-admin-bg px-5 py-12">
      <div className="w-full max-w-[400px]">
        <div className="mb-7 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-admin-primary font-serif text-xl text-white">
            I
          </div>
          <h1 className="font-serif text-2xl text-admin-ink">{t('title')}</h1>
          <p className="mt-1 text-sm text-admin-muted">{tSidebar('brandSub')}</p>
        </div>

        <div className="rounded-2xl border border-admin-border bg-admin-surface p-6 shadow-admin-card sm:p-7">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
