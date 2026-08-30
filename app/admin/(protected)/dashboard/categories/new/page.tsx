'use client';

import { useTranslations } from 'next-intl';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import CategoryForm from '@/components/admin/CategoryForm';

export default function NewCategoryPage() {
  const t = useTranslations('admin.categoryForm');
  const tCommon = useTranslations('admin.common');

  return (
    <AdminFormLayout title={t('titleNew')} backHref="/admin/dashboard/categories" backLabel={tCommon('back')}>
      <CategoryForm mode="create" />
    </AdminFormLayout>
  );
}
