'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Loader2, Upload, X } from 'lucide-react';

export interface UploadedVideo {
  url: string;
  publicId: string;
  thumbnail: string;
}

interface VideoUploaderProps {
  value: UploadedVideo | null;
  onChange: (value: UploadedVideo | null) => void;
}

const MAX_FILE_BYTES = 100 * 1024 * 1024;

export default function VideoUploader({ value, onChange }: VideoUploaderProps) {
  const t = useTranslations('admin.videoUploader');
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;

    setError('');

    if (!file.type.startsWith('video/')) {
      setError(t('onlyVideos'));
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setError(t('maxSize'));
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/videos/upload', { method: 'POST', body: formData });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('errorGeneric'));
      }

      onChange({ url: data.url, publicId: data.publicId || '', thumbnail: data.thumbnail || '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'));
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  return (
    <div className="space-y-3">
      {value?.url && (
        <div className="relative overflow-hidden rounded-xl border border-admin-border bg-black">
          <video
            key={value.url}
            src={value.url}
            poster={value.thumbnail || undefined}
            controls
            playsInline
            preload="metadata"
            className="h-auto max-h-[320px] w-full object-contain"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            aria-label={t('remove')}
            className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-admin-danger hover:bg-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <div>
        <input
          ref={inputRef}
          type="file"
          accept="video/*"
          onChange={(event) => handleFile(event.target.files)}
          className="hidden"
          id="video-uploader-input"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-xl border border-admin-border bg-admin-surface-alt px-4 py-2.5 text-sm text-admin-body transition hover:bg-admin-primary-soft hover:text-admin-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? t('uploading') : value?.url ? t('replaceVideo') : t('uploadVideo')}
        </button>
        <p className="mt-2 text-xs text-admin-muted">{t('hint')}</p>
      </div>

      {error && <p className="text-sm text-admin-danger">{error}</p>}
    </div>
  );
}
