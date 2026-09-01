import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { connectMongo, hasMongoConfig } from '@/lib/db';
import { Category } from '@/lib/models/Category';
import { toPlain } from '@/lib/artwork-adapter';
import MongoNotConfiguredNotice from '@/components/admin/MongoNotConfiguredNotice';
import CategoriesTable, { type CategoryRecord } from '@/components/admin/CategoriesTable';
import Button from '@/components/admin/ui/Button';
import PageHeader from '@/components/admin/ui/PageHeader';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CategoriesAdminPage() {
  const t = await getTranslations('admin.categories');

  if (!hasMongoConfig()) {
    return <MongoNotConfiguredNotice />;
  }

  await connectMongo();
  const categoryDocs = await Category.find({}).sort({ displayOrder: 1, name: 1 }).lean();
  const categories = toPlain(categoryDocs).map((doc: Record<string, unknown>) => ({
    ...doc,
    _id: String(doc._id),
  })) as CategoryRecord[];

  return (
    <div>
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        action={
          <Link href="/admin/dashboard/categories/new">
            <Button>
              <Plus className="h-4 w-4" />
              {t('newCategory')}
            </Button>
          </Link>
        }
      />

      <CategoriesTable initialCategories={categories} />
    </div>
  );
}
