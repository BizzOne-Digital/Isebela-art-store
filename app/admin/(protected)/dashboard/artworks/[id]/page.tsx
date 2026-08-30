import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Artwork } from '@/lib/models/Artwork';
import { toPlain } from '@/lib/artwork-adapter';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import ArtworkForm from '@/components/admin/ArtworkForm';
import MongoNotConfiguredNotice from '@/components/admin/MongoNotConfiguredNotice';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditArtworkPage({ params }: Props) {
  if (!hasMongoConfig()) {
    return <MongoNotConfiguredNotice />;
  }

  const { id } = await params;
  const t = await getTranslations('admin.productForm');
  const tCommon = await getTranslations('admin.common');

  await connectMongo();
  const artworkDoc = await Artwork.findById(id).lean();
  if (!artworkDoc) {
    notFound();
  }

  const initialValues = toPlain({ ...artworkDoc, _id: String(artworkDoc._id) });

  return (
    <AdminFormLayout title={t('titleEdit')} backHref="/admin/dashboard/artworks" backLabel={tCommon('back')}>
      <ArtworkForm mode="edit" initialValues={initialValues} />
    </AdminFormLayout>
  );
}
