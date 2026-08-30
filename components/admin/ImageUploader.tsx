'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
  max?: number;
}

const MAX_FILE_BYTES = 8 * 1024 * 1024;

export default function ImageUploader({ images, onChange, multiple = true, max }: ImageUploaderProps) {
  const t = useTranslations('admin.imageUploader');
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState('');

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    setError('');
    const files = Array.from(fileList);

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError(t('onlyImages'));
        return;
      }
      if (file.size > MAX_FILE_BYTES) {
        setError(t('maxSize'));
        return;
      }
    }

    const remaining = typeof max === 'number' ? Math.max(0, max - images.length) : files.length;
    const filesToUpload = files.slice(0, remaining);

    setUploading(true);
    setProgress({ current: 0, total: filesToUpload.length });

    const uploaded: string[] = [];
    try {
      for (let i = 0; i < filesToUpload.length; i += 1) {
        const formData = new FormData();
        formData.append('file', filesToUpload[i]);

        const response = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || t('errorGeneric'));
        }

        uploaded.push(data.url);
        setProgress({ current: i + 1, total: filesToUpload.length });
      }

      onChange(multiple ? [...images, ...uploaded] : uploaded);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'));
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function moveImage(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const next = [...images];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    onChange(next);
  }

  const canAddMore = typeof max !== 'number' || images.length < max;

  return (
    <div className="space-y-3">
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((image, index) => (
            <div key={image + index} className="group relative aspect-square overflow-hidden rounded-xl border border-admin-border bg-admin-surface-alt">
              <Image src={image} alt={`${index + 1}`} fill className="object-cover" sizes="120px" />
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-admin-ink/50 opacity-0 transition-opacity group-hover:opacity-100">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, -1)}
                    className="rounded-full bg-white/90 p-1.5 text-admin-ink hover:bg-white"
                    aria-label={t('moveLeft')}
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="rounded-full bg-white/90 p-1.5 text-admin-danger hover:bg-white"
                  aria-label={t('remove')}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                {index < images.length - 1 && (
                  <button
                    type="button"
                    onClick={() => moveImage(index, 1)}
                    className="rounded-full bg-white/90 p-1.5 text-admin-ink hover:bg-white"
                    aria-label={t('moveRight')}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {canAddMore && (
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple={multiple}
            onChange={(event) => handleFiles(event.target.files)}
            className="hidden"
            id={`image-uploader-input-${multiple ? 'multi' : 'single'}`}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border border-admin-border bg-admin-surface-alt px-4 py-2.5 text-sm text-admin-body transition hover:bg-admin-primary-soft hover:text-admin-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload className="h-4 w-4" />
            {uploading ? t('uploading', { current: progress.current, total: progress.total }) : t('uploadImage')}
          </button>
        </div>
      )}

      {error && <p className="text-sm text-admin-danger">{error}</p>}
    </div>
  );
}
