'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AlertCircle, Loader2 } from 'lucide-react';
import { toSlug } from '@/lib/slug';
import ImageUploader from './ImageUploader';
import Button from './ui/Button';
import { useToast } from './ui/Toast';

interface CategoryFormValues {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  descriptionEn: string;
  image: string;
  displayOrder: number;
  isActive: boolean;
}

interface CategoryFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<CategoryFormValues> & { _id?: string };
}

const EMPTY_VALUES: CategoryFormValues = {
  name: '',
  nameEn: '',
  slug: '',
  description: '',
  descriptionEn: '',
  image: '',
  displayOrder: 0,
  isActive: true,
};

// Field chrome lives in globals.css (.admin-field / .admin-label) so every
// admin form shares one border, focus ring, and disabled treatment.
const inputClass = 'admin-field';
const labelClass = 'admin-label';

function FormSection({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="space-y-4 border-t border-admin-border pt-7 first:border-t-0 first:pt-0">
      <div>
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-admin-ink">{title}</h2>
        {hint && <p className="admin-hint max-w-[58ch]">{hint}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export default function CategoryForm({ mode, initialValues }: CategoryFormProps) {
  const router = useRouter();
  const t = useTranslations('admin.categoryForm');
  const tCommon = useTranslations('admin.common');
  const { showToast } = useToast();
  const [values, setValues] = useState<CategoryFormValues>({ ...EMPTY_VALUES, ...initialValues });
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function updateField<K extends keyof CategoryFormValues>(field: K, value: CategoryFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleNameChange(name: string) {
    setValues((prev) => ({
      ...prev,
      name,
      slug: slugTouched ? prev.slug : toSlug(name),
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');

    if (values.name.trim().length < 2) {
      setError(t('errorNameLength'));
      return;
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(values.slug)) {
      setError(t('errorSlugFormat'));
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/categories', {
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
        if (response.status === 409) {
          setError(t('errorSlugTaken'));
        } else {
          setError(data.error || t('errorGeneric'));
        }
        return;
      }

      showToast(mode === 'create' ? tCommon('successCreated') : tCommon('successSaved'));
      router.push('/admin/dashboard/categories');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <FormSection title={t('sectionInfo')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t('name')}</label>
            <input value={values.name} onChange={(event) => handleNameChange(event.target.value)} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('slug')}</label>
            <input
              value={values.slug}
              onChange={(event) => {
                setSlugTouched(true);
                updateField('slug', event.target.value);
              }}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t('description')}</label>
          <textarea value={values.description} onChange={(event) => updateField('description', event.target.value)} rows={3} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>{t('image')}</label>
          <ImageUploader
            images={values.image ? [values.image] : []}
            onChange={(images) => updateField('image', images[0] || '')}
            multiple={false}
            max={1}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
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
              aria-pressed={values.isActive}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                values.isActive
                  ? 'border-admin-primary bg-admin-primary text-white shadow-sm'
                  : 'border-admin-border bg-admin-surface text-admin-body hover:border-admin-border-strong hover:bg-admin-surface-alt'
              }`}
            >
              {values.isActive ? t('markActive') : t('markInactive')}
            </button>
          </div>
        </div>
      </FormSection>

      <FormSection title={t('sectionEnglish')} hint={t('sectionEnglishHint')}>
        <div>
          <label className={labelClass}>{t('nameEn')}</label>
          <input value={values.nameEn} onChange={(event) => updateField('nameEn', event.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t('descriptionEn')}</label>
          <textarea value={values.descriptionEn} onChange={(event) => updateField('descriptionEn', event.target.value)} rows={3} className={inputClass} />
        </div>
      </FormSection>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-admin-danger/25 bg-admin-danger-soft px-3.5 py-3 text-sm text-admin-danger"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col-reverse gap-2.5 border-t border-admin-border pt-6 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/dashboard/categories')}>
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
