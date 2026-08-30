'use client';

import { useTranslations } from 'next-intl';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import ArtworkForm from '@/components/admin/ArtworkForm';

export default function NewArtworkPage() {
  const t = useTranslations('admin.productForm');
  const tCommon = useTranslations('admin.common');

  return (
    <AdminFormLayout title={t('titleNew')} backHref="/admin/dashboard/artworks" backLabel={tCommon('back')}>
      <ArtworkForm mode="create" />
    </AdminFormLayout>
  );
}
