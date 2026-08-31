'use client';

import { useTranslations } from 'next-intl';
import AdminFormLayout from '@/components/admin/AdminFormLayout';
import VideoForm from '@/components/admin/VideoForm';

export default function NewVideoPage() {
  const t = useTranslations('admin.videoForm');
  const tCommon = useTranslations('admin.common');

  return (
    <AdminFormLayout title={t('titleNew')} backHref="/admin/dashboard/videos" backLabel={tCommon('back')}>
      <VideoForm mode="create" />
    </AdminFormLayout>
  );
}
