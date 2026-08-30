import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Category } from '@/lib/models/Category';
import { toPlain } from '@/lib/artwork-adapter';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import CategoryForm from '@/components/admin/CategoryForm';
import MongoNotConfiguredNotice from '@/components/admin/MongoNotConfiguredNotice';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: Props) {
  if (!hasMongoConfig()) {
    return <MongoNotConfiguredNotice />;
  }

  const { id } = await params;
  const t = await getTranslations('admin.categoryForm');
  const tCommon = await getTranslations('admin.common');

  await connectMongo();
  const categoryDoc = await Category.findById(id).lean();
  if (!categoryDoc) {
    notFound();
  }

  const initialValues = toPlain({ ...categoryDoc, _id: String(categoryDoc._id) });

  return (
    <AdminFormLayout title={t('titleEdit')} backHref="/admin/dashboard/categories" backLabel={tCommon('back')}>
      <CategoryForm mode="edit" initialValues={initialValues} />
    </AdminFormLayout>
  );
}
