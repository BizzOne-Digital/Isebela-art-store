'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import VideoUploader, { type UploadedVideo } from './VideoUploader';
import Button from './ui/Button';
import { useToast } from './ui/Toast';

interface VideoFormValues {
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  description: string;
  descriptionEn: string;
  tag: string;
  tagEn: string;
  videoUrl: string;
  videoPublicId: string;
  thumbnail: string;
  thumbnailPublicId: string;
  displayOrder: number;
  isActive: boolean;
}

interface VideoFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<VideoFormValues> & { _id?: string };
}

const EMPTY_VALUES: VideoFormValues = {
  title: '',
  titleEn: '',
  subtitle: '',
  subtitleEn: '',
  description: '',
  descriptionEn: '',
  tag: '',
  tagEn: '',
  videoUrl: '',
  videoPublicId: '',
  thumbnail: '',
  thumbnailPublicId: '',
  displayOrder: 0,
  isActive: true,
};

const inputClass =
  'w-full rounded-xl border border-admin-border bg-admin-surface-alt px-4 py-3 text-admin-ink outline-none transition focus:border-admin-primary';
const labelClass = 'mb-2 block text-sm font-medium text-admin-body';

function FormSection({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="space-y-5 border-t border-admin-border pt-6 first:border-t-0 first:pt-0">
      <div>
        <h2 className="font-serif text-lg text-admin-ink">{title}</h2>
        {hint && <p className="mt-0.5 text-xs text-admin-muted">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

export default function VideoForm({ mode, initialValues }: VideoFormProps) {
  const router = useRouter();
  const t = useTranslations('admin.videoForm');
  const tCommon = useTranslations('admin.common');
  const { showToast } = useToast();
  const [values, setValues] = useState<VideoFormValues>({ ...EMPTY_VALUES, ...initialValues });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function updateField<K extends keyof VideoFormValues>(field: K, value: VideoFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleVideoChange(uploaded: UploadedVideo | null) {
    setValues((prev) => ({
      ...prev,
      videoUrl: uploaded?.url || '',
      videoPublicId: uploaded?.publicId || '',
      // Only overwrite the poster when it was auto-generated alongside the video.
      thumbnail: uploaded?.thumbnail || '',
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');

    if (values.title.trim().length < 2) {
      setError(t('errorTitleLength'));
      return;
    }
    if (!values.videoUrl) {
      setError(t('errorVideoRequired'));
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/videos', {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'create' ? values : { id: initialValues?._id, ...values }),
      });

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || t('errorGeneric'));
        return;
      }

      showToast(mode === 'create' ? tCommon('successCreated') : tCommon('successSaved'));
      router.push('/admin/dashboard/videos');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormSection title={t('sectionFile')} hint={t('sectionFileHint')}>
        <VideoUploader
          value={
            values.videoUrl
              ? { url: values.videoUrl, publicId: values.videoPublicId, thumbnail: values.thumbnail }
              : null
          }
          onChange={handleVideoChange}
        />
      </FormSection>

      <FormSection title={t('sectionInfo')}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t('title')}</label>
            <input value={values.title} onChange={(event) => updateField('title', event.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('tag')}</label>
            <input value={values.tag} onChange={(event) => updateField('tag', event.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t('subtitle')}</label>
          <input value={values.subtitle} onChange={(event) => updateField('subtitle', event.target.value)} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>{t('description')}</label>
          <textarea value={values.description} onChange={(event) => updateField('description', event.target.value)} rows={3} className={inputClass} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t('displayOrder')}</label>
            <input
              type="number"
              min={0}
              max={1000}
              value={values.displayOrder}
              onChange={(event) => updateField('displayOrder', Number(event.target.value))}
              className={inputClass}
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => updateField('isActive', !values.isActive)}
              className={`w-full rounded-xl border px-4 py-3 text-sm font-medium transition ${
                values.isActive
                  ? 'border-admin-primary bg-admin-primary text-white'
                  : 'border-admin-border bg-admin-surface-alt text-admin-body hover:bg-admin-primary-soft'
              }`}
            >
              {values.isActive ? t('markActive') : t('markInactive')}
            </button>
          </div>
        </div>
      </FormSection>

      <FormSection title={t('sectionEnglish')} hint={t('sectionEnglishHint')}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t('titleEn')}</label>
            <input value={values.titleEn} onChange={(event) => updateField('titleEn', event.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('tagEn')}</label>
            <input value={values.tagEn} onChange={(event) => updateField('tagEn', event.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>{t('subtitleEn')}</label>
          <input value={values.subtitleEn} onChange={(event) => updateField('subtitleEn', event.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t('descriptionEn')}</label>
          <textarea value={values.descriptionEn} onChange={(event) => updateField('descriptionEn', event.target.value)} rows={3} className={inputClass} />
        </div>
      </FormSection>

      {error && (
        <div className="rounded-lg border border-admin-danger/25 bg-admin-danger-soft px-3 py-2 text-sm text-admin-danger">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-3 border-t border-admin-border pt-6">
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/dashboard/videos')}>
          {tCommon('cancel')}
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting ? tCommon('saving') : mode === 'create' ? t('submitCreate') : t('submitEdit')}
        </Button>
      </div>
    </form>
  );
}
