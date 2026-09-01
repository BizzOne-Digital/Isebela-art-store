import { getTranslations } from 'next-intl/server';
import { getAdminSession } from '@/lib/auth';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Artwork } from '@/lib/models/Artwork';
import { Category } from '@/lib/models/Category';
import { Video } from '@/lib/models/Video';
import MongoNotConfiguredNotice from '@/components/admin/MongoNotConfiguredNotice';
import Badge from '@/components/admin/ui/Badge';
import PageHeader from '@/components/admin/ui/PageHeader';
import EmptyState from '@/components/admin/ui/EmptyState';
import Link from 'next/link';
import { Package, FileEdit, FolderTree, Sparkles, Clapperboard, ChevronRight, Inbox } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const t = await getTranslations('admin.dashboard');
  const tCommon = await getTranslations('admin.common');

  if (!hasMongoConfig()) {
    return <MongoNotConfiguredNotice />;
  }

  await connectMongo();

  const [artworkCount, publishedCount, draftCount, categoryCount, featuredCount, videoCount] = await Promise.all([
    Artwork.countDocuments(),
    Artwork.countDocuments({ status: 'published' }),
    Artwork.countDocuments({ status: 'draft' }),
    Category.countDocuments({ isActive: true }),
    Artwork.countDocuments({ featured: true, status: 'published' }),
    Video.countDocuments({ isActive: true }),
  ]);

  const recent = await Artwork.find({}).sort({ updatedAt: -1 }).limit(5).lean();

  // Catalog size is the headline number; everything else qualifies it.
  const secondaryStats = [
    { label: t('publishedProducts'), value: publishedCount, icon: Package, href: '/admin/dashboard/artworks' },
    { label: t('draftProducts'), value: draftCount, icon: FileEdit, href: '/admin/dashboard/artworks' },
    { label: t('featuredProducts'), value: featuredCount, icon: Sparkles, href: '/admin/dashboard/artworks' },
    { label: t('totalCategories'), value: categoryCount, icon: FolderTree, href: '/admin/dashboard/categories' },
    { label: t('totalVideos'), value: videoCount, icon: Clapperboard, href: '/admin/dashboard/videos' },
  ];

  return (
    <div>
      <PageHeader
        title={session ? t('greeting', { name: session.name }) : t('title')}
        description={t('subtitle')}
      />

      <section className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col justify-between rounded-2xl border border-admin-border bg-admin-primary p-6 text-white shadow-admin-card">
          <div className="flex items-center gap-2 text-white/70">
            <Package className="h-[18px] w-[18px]" strokeWidth={1.75} />
            <p className="text-xs font-medium uppercase tracking-[0.1em]">{t('totalProducts')}</p>
          </div>
          <p className="admin-num mt-6 font-serif text-5xl leading-none">{artworkCount}</p>
          <Link
            href="/admin/dashboard/artworks"
            className="mt-6 inline-flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-white"
          >
            {t('manageProducts')}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {secondaryStats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="group rounded-2xl border border-admin-border bg-admin-surface p-5 shadow-admin-card transition-colors hover:border-admin-border-strong"
            >
              <stat.icon
                className="h-[18px] w-[18px] text-admin-muted transition-colors group-hover:text-admin-primary"
                strokeWidth={1.75}
              />
              <p className="admin-num mt-4 font-serif text-3xl leading-none text-admin-ink">{stat.value}</p>
              <p className="mt-1.5 text-[13px] text-admin-muted">{stat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-admin-border bg-admin-surface shadow-admin-card">
        <div className="flex items-center justify-between gap-4 border-b border-admin-border px-6 py-4">
          <h2 className="font-serif text-lg text-admin-ink">{t('recentChanges')}</h2>
          <Link
            href="/admin/dashboard/artworks"
            className="inline-flex items-center gap-1 text-sm text-admin-primary transition-opacity hover:opacity-75"
          >
            {t('viewAll')}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-6">
            <EmptyState icon={Inbox} title={t('noRecentTitle')} description={t('noRecentText')} />
          </div>
        ) : (
          <ul className="divide-y divide-admin-border">
            {recent.map((item) => (
              <li key={String(item._id)}>
                <Link
                  href={`/admin/dashboard/artworks/${String(item._id)}`}
                  className="admin-row flex items-center justify-between gap-4 px-6 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-admin-ink">{item.name}</p>
                    <p className="truncate text-[13px] text-admin-muted">{item.category}</p>
                  </div>
                  <Badge tone={item.status === 'published' ? 'success' : 'neutral'} dot>
                    {item.status === 'published' ? tCommon('published') : tCommon('draft')}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
