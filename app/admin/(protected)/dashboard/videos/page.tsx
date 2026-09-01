import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Video } from '@/lib/models/Video';
import { toPlain } from '@/lib/artwork-adapter';
import MongoNotConfiguredNotice from '@/components/admin/MongoNotConfiguredNotice';
import VideosTable, { type VideoRecord } from '@/components/admin/VideosTable';
import Button from '@/components/admin/ui/Button';
import PageHeader from '@/components/admin/ui/PageHeader';
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
    <div>
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        action={
          <Link href="/admin/dashboard/videos/new">
            <Button>
              <Plus className="h-4 w-4" />
              {t('newVideo')}
            </Button>
          </Link>
        }
      />

      <VideosTable initialVideos={videos} />
    </div>
  );
}
