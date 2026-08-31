import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Video } from '@/lib/models/Video';
import { toPlain } from '@/lib/artwork-adapter';
import MongoNotConfiguredNotice from '@/components/admin/MongoNotConfiguredNotice';
import VideosTable, { type VideoRecord } from '@/components/admin/VideosTable';
import Button from '@/components/admin/ui/Button';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function VideosAdminPage() {
  const t = await getTranslations('admin.videos');

  if (!hasMongoConfig()) {
    return <MongoNotConfiguredNotice />;
  }

  await connectMongo();
  const videoDocs = await Video.find({}).sort({ displayOrder: 1, createdAt: -1 }).lean();
  const videos = toPlain(videoDocs).map((doc: Record<string, unknown>) => ({
    ...doc,
    _id: String(doc._id),
  })) as VideoRecord[];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-admin-gold">{t('eyebrow')}</p>
          <h1 className="mt-2 font-serif text-3xl text-admin-ink">{t('title')}</h1>
        </div>
        <Link href="/admin/dashboard/videos/new">
          <Button>
            <Plus className="h-4 w-4" />
            {t('newVideo')}
          </Button>
        </Link>
      </div>

      <VideosTable initialVideos={videos} />
    </div>
  );
}
