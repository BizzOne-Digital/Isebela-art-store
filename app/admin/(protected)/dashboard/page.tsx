import { getTranslations } from 'next-intl/server';
import { getAdminSession } from '@/lib/auth';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Artwork } from '@/lib/models/Artwork';
import { Category } from '@/lib/models/Category';
import MongoNotConfiguredNotice from '@/components/admin/MongoNotConfiguredNotice';
import Badge from '@/components/admin/ui/Badge';
import Link from 'next/link';
import { Package, CheckCircle2, FileEdit, FolderTree, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const t = await getTranslations('admin.dashboard');

  if (!hasMongoConfig()) {
    return <MongoNotConfiguredNotice />;
  }

  await connectMongo();

  const [artworkCount, publishedCount, draftCount, categoryCount, featuredCount] = await Promise.all([
    Artwork.countDocuments(),
    Artwork.countDocuments({ status: 'published' }),
    Artwork.countDocuments({ status: 'draft' }),
    Category.countDocuments({ isActive: true }),
    Artwork.countDocuments({ featured: true, status: 'published' }),
  ]);

  const recent = await Artwork.find({}).sort({ updatedAt: -1 }).limit(5).lean();

  const stats = [
    { label: t('totalProducts'), value: artworkCount, icon: Package },
    { label: t('publishedProducts'), value: publishedCount, icon: CheckCircle2 },
    { label: t('draftProducts'), value: draftCount, icon: FileEdit },
    { label: t('totalCategories'), value: categoryCount, icon: FolderTree },
    { label: t('featuredProducts'), value: featuredCount, icon: Sparkles },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.22em] text-admin-gold">{t('eyebrow')}</p>
        <h1 className="mt-2 font-serif text-3xl text-admin-ink">
          {session ? `${t('title')} — ${session.name}` : t('title')}
        </h1>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-admin-border bg-admin-surface p-5 shadow-admin-card">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-admin-primary-soft text-admin-primary">
              <stat.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>
            <p className="text-xs uppercase tracking-[0.1em] text-admin-muted">{stat.label}</p>
            <p className="mt-1 font-serif text-3xl text-admin-ink">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.8fr_1fr]">
        <div className="rounded-2xl border border-admin-border bg-admin-surface p-6 shadow-admin-card">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-admin-ink">{t('recentChanges')}</h2>
            <Link href="/admin/dashboard/artworks" className="text-sm text-admin-primary hover:underline">
              {t('viewAll')}
            </Link>
          </div>

          <div className="space-y-3">
            {recent.map((item) => (
              <div key={String(item._id)} className="flex items-center justify-between rounded-xl border border-admin-border bg-admin-surface-alt p-3">
                <div>
                  <p className="font-medium text-admin-ink">{item.name}</p>
                  <p className="text-sm text-admin-muted">{item.category}</p>
                </div>
                <Badge tone={item.status === 'published' ? 'success' : 'neutral'}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-admin-border bg-admin-surface p-6 shadow-admin-card">
          <h2 className="font-serif text-2xl text-admin-ink">{t('quickActions')}</h2>
          <div className="mt-5 space-y-3">
            <Link
              href="/admin/dashboard/artworks"
              className="block rounded-xl border border-admin-border bg-admin-surface-alt px-4 py-3 text-admin-body transition hover:border-admin-gold hover:text-admin-ink"
            >
              {t('manageProducts')}
            </Link>
            <Link
              href="/admin/dashboard/categories"
              className="block rounded-xl border border-admin-border bg-admin-surface-alt px-4 py-3 text-admin-body transition hover:border-admin-gold hover:text-admin-ink"
            >
              {t('manageCategories')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
