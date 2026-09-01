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

interface SignaturePayload {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  folder: string;
}

interface CloudinaryUploadResult {
  secure_url?: string;
  url?: string;
  public_id: string;
}

/** Cloudinary renders a poster frame from any uploaded video on the fly. */
function posterUrl(cloudName: string, publicId: string) {
  return `https://res.cloudinary.com/${cloudName}/video/upload/c_fill,h_360,q_auto,w_640/${publicId}.jpg`;
}

/**
 * Sends the file straight from the browser to Cloudinary using a signature
 * minted by our server. Going through a route handler instead would hit the
 * serverless request-body cap (4.5MB on Vercel) and the function timeout, so
 * anything but a tiny clip would fail once deployed.
 */
function uploadToCloudinary(
  file: File,
  auth: SignaturePayload,
  onProgress: (percent: number) => void,
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const body = new FormData();
    body.append('file', file);
    body.append('api_key', auth.apiKey);
    body.append('timestamp', String(auth.timestamp));
    body.append('signature', auth.signature);
    body.append('folder', auth.folder);

    // XHR rather than fetch: it is the only way to read upload progress.
    const request = new XMLHttpRequest();
    request.open('POST', `https://api.cloudinary.com/v1_1/${auth.cloudName}/video/upload`);

    request.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    });

    request.addEventListener('load', () => {
      let parsed: { error?: { message?: string } } & CloudinaryUploadResult;
      try {
        parsed = JSON.parse(request.responseText);
      } catch {
        reject(new Error('Cloudinary returned an unreadable response'));
        return;
      }
      if (request.status >= 200 && request.status < 300 && parsed.public_id) {
        resolve(parsed);
      } else {
        reject(new Error(parsed.error?.message || `Cloudinary upload failed (${request.status})`));
      }
    });

    request.addEventListener('error', () => reject(new Error('Network error during upload')));
    request.addEventListener('abort', () => reject(new Error('Upload cancelled')));

    request.send(body);
  });
}

export default function VideoUploader({ value, onChange }: VideoUploaderProps) {
  const t = useTranslations('admin.videoUploader');
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
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
    setProgress(0);
    try {
      const signatureResponse = await fetch('/api/videos/signature', { method: 'POST' });
      const auth = await signatureResponse.json();

      if (!signatureResponse.ok) {
        throw new Error(auth.error || t('errorGeneric'));
      }

      const result = await uploadToCloudinary(file, auth as SignaturePayload, setProgress);

      onChange({
        url: result.secure_url || result.url || '',
        publicId: result.public_id,
        thumbnail: posterUrl((auth as SignaturePayload).cloudName, result.public_id),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'));
    } finally {
      setUploading(false);
      setProgress(0);
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
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-admin-border-strong bg-admin-surface px-4 py-3.5 text-sm text-admin-body transition-colors hover:border-admin-primary hover:bg-admin-primary-soft hover:text-admin-primary disabled:pointer-events-none disabled:opacity-55"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading
            ? t('uploadingPercent', { percent: progress })
            : value?.url
              ? t('replaceVideo')
              : t('uploadVideo')}
        </button>

        {uploading && (
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t('uploadingPercent', { percent: progress })}
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-admin-surface-alt"
          >
            <div
              className="h-full rounded-full bg-admin-primary transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <p className="admin-hint">{t('hint')}</p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-admin-danger">
          {error}
        </p>
      )}
    </div>
  );
}
