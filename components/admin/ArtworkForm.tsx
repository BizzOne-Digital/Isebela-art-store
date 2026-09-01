'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AlertCircle, Loader2 } from 'lucide-react';
import { toSlug } from '@/lib/slug';
import TagInput from './TagInput';
import ImageUploader from './ImageUploader';
import Button from './ui/Button';
import { useToast } from './ui/Toast';

type Availability = 'available' | 'made-to-order' | 'limited' | 'sold-out';

interface ArtworkFormValues {
  name: string;
  nameEn: string;
  slug: string;
  description: string;
  descriptionEn: string;
  shortDescription: string;
  shortDescriptionEn: string;
  category: string;
  price: string;
  priceLabel: string;
  materials: string[];
  colors: string[];
  tags: string[];
  features: string[];
  availability: Availability;
  featured: boolean;
  isNewArrival: boolean;
  isSeasonal: boolean;
  status: 'draft' | 'published';
  displayOrder: number;
  images: string[];
}

interface ArtworkFormProps {
  mode: 'create' | 'edit';
  initialValues?: Partial<ArtworkFormValues> & { _id?: string };
}

const EMPTY_VALUES: ArtworkFormValues = {
  name: '',
  nameEn: '',
  slug: '',
  description: '',
  descriptionEn: '',
  shortDescription: '',
  shortDescriptionEn: '',
  category: '',
  price: '',
  priceLabel: '',
  materials: [],
  colors: [],
  tags: [],
  features: [],
  availability: 'available',
  featured: false,
  isNewArrival: false,
  isSeasonal: false,
  status: 'published',
  displayOrder: 0,
  images: [],
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

export default function ArtworkForm({ mode, initialValues }: ArtworkFormProps) {
  const router = useRouter();
  const t = useTranslations('admin.productForm');
  const tCommon = useTranslations('admin.common');
  const { showToast } = useToast();
  const [values, setValues] = useState<ArtworkFormValues>({ ...EMPTY_VALUES, ...initialValues });
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [categoryOptions, setCategoryOptions] = useState<{ name: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const AVAILABILITY_OPTIONS: { value: Availability; label: string }[] = [
    { value: 'available', label: t('availabilityOptions.available') },
    { value: 'made-to-order', label: t('availabilityOptions.madeToOrder') },
    { value: 'limited', label: t('availabilityOptions.limited') },
    { value: 'sold-out', label: t('availabilityOptions.soldOut') },
  ];

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch('/api/categories', { cache: 'no-store' });
        if (!response.ok) return;
        const data = await response.json();
        setCategoryOptions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    }

    loadCategories();
  }, []);

  function updateField<K extends keyof ArtworkFormValues>(field: K, value: ArtworkFormValues[K]) {
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
    if (values.description.trim().length < 10) {
      setError(t('errorDescriptionLength'));
      return;
    }
    if (!values.category.trim()) {
      setError(t('errorCategoryRequired'));
      return;
    }
    if (values.images.length < 1) {
      setError(t('errorImagesRequired'));
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...values };
      const response = await fetch('/api/artworks', {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'create' ? payload : { id: initialValues?._id, ...payload }),
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
      router.push('/admin/dashboard/artworks');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'));
    } finally {
      setSubmitting(false);
    }
  }

  const categoryNames = new Set(categoryOptions.map((category) => category.name));
  if (values.category && !categoryNames.has(values.category)) {
    categoryNames.add(values.category);
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
          <label className={labelClass}>{t('shortDescription')}</label>
          <input value={values.shortDescription} onChange={(event) => updateField('shortDescription', event.target.value)} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>{t('description')}</label>
          <textarea value={values.description} onChange={(event) => updateField('description', event.target.value)} required rows={4} className={inputClass} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t('category')}</label>
            <select value={values.category} onChange={(event) => updateField('category', event.target.value)} required className={inputClass}>
              <option value="">{t('categoryPlaceholder')}</option>
              {Array.from(categoryNames).map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t('availability')}</label>
            <select value={values.availability} onChange={(event) => updateField('availability', event.target.value as Availability)} className={inputClass}>
              {AVAILABILITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </FormSection>

      <FormSection title={t('sectionMedia')}>
        <ImageUploader images={values.images} onChange={(images) => updateField('images', images)} multiple />
      </FormSection>

      <FormSection title={t('sectionOrganization')}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t('price')}</label>
            <input value={values.price} onChange={(event) => updateField('price', event.target.value)} placeholder="$48.000" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t('priceLabel')}</label>
            <input value={values.priceLabel} onChange={(event) => updateField('priceLabel', event.target.value)} className={inputClass} />
          </div>
        </div>

        <TagInput label={t('materials')} values={values.materials} onChange={(v) => updateField('materials', v)} placeholder={t('materialsPlaceholder')} />
        <TagInput label={t('colors')} values={values.colors} onChange={(v) => updateField('colors', v)} placeholder={t('colorsPlaceholder')} />
        <TagInput label={t('features')} values={values.features} onChange={(v) => updateField('features', v)} placeholder={t('featuresPlaceholder')} />
        <TagInput label={t('tags')} values={values.tags} onChange={(v) => updateField('tags', v)} placeholder={t('tagsPlaceholder')} />

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className={labelClass}>{t('status')}</label>
            <select value={values.status} onChange={(event) => updateField('status', event.target.value as 'draft' | 'published')} className={inputClass}>
              <option value="published">{tCommon('published')}</option>
              <option value="draft">{tCommon('draft')}</option>
            </select>
          </div>
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
              onClick={() => updateField('featured', !values.featured)}
              aria-pressed={values.featured}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                values.featured
                  ? 'border-admin-primary bg-admin-primary text-white shadow-sm'
                  : 'border-admin-border bg-admin-surface text-admin-body hover:border-admin-border-strong hover:bg-admin-surface-alt'
              }`}
            >
              {values.featured ? t('featuredOn') : t('markFeatured')}
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => updateField('isNewArrival', !values.isNewArrival)}
              aria-pressed={values.isNewArrival}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              values.isNewArrival
                ? 'border-admin-primary bg-admin-primary text-white shadow-sm'
                : 'border-admin-border bg-admin-surface text-admin-body hover:border-admin-border-strong hover:bg-admin-surface-alt'
            }`}
          >
            {values.isNewArrival ? t('newOn') : t('markNew')}
          </button>
          <button
            type="button"
            onClick={() => updateField('isSeasonal', !values.isSeasonal)}
              aria-pressed={values.isSeasonal}
            className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              values.isSeasonal
                ? 'border-admin-primary bg-admin-primary text-white shadow-sm'
                : 'border-admin-border bg-admin-surface text-admin-body hover:border-admin-border-strong hover:bg-admin-surface-alt'
            }`}
          >
            {values.isSeasonal ? t('seasonalOn') : t('markSeasonal')}
          </button>
        </div>
      </FormSection>

      <FormSection title={t('sectionEnglish')} hint={t('sectionEnglishHint')}>
        <div>
          <label className={labelClass}>{t('nameEn')}</label>
          <input value={values.nameEn} onChange={(event) => updateField('nameEn', event.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t('shortDescriptionEn')}</label>
          <input value={values.shortDescriptionEn} onChange={(event) => updateField('shortDescriptionEn', event.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{t('descriptionEn')}</label>
          <textarea value={values.descriptionEn} onChange={(event) => updateField('descriptionEn', event.target.value)} rows={4} className={inputClass} />
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
        <Button type="button" variant="secondary" onClick={() => router.push('/admin/dashboard/artworks')}>
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
