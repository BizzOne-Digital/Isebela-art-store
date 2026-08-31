import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Video } from '@/lib/models/Video';
import { toPlain } from '@/lib/artwork-adapter';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import VideoForm from '@/components/admin/VideoForm';
import MongoNotConfiguredNotice from '@/components/admin/MongoNotConfiguredNotice';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditVideoPage({ params }: Props) {
  if (!hasMongoConfig()) {
    return <MongoNotConfiguredNotice />;
  }

  const { id } = await params;
  const t = await getTranslations('admin.videoForm');
  const tCommon = await getTranslations('admin.common');

  await connectMongo();
  const videoDoc = await Video.findById(id).lean();
  if (!videoDoc) {
    notFound();
  }

  const initialValues = toPlain({ ...videoDoc, _id: String(videoDoc._id) });

  return (
    <AdminFormLayout title={t('titleEdit')} backHref="/admin/dashboard/videos" backLabel={tCommon('back')}>
      <VideoForm mode="edit" initialValues={initialValues} />
    </AdminFormLayout>
  );
}
