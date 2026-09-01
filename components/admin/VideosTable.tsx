'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Pencil, Trash2, Eye, Clapperboard } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import ConfirmDialog from './ui/ConfirmDialog';
import EmptyState from './ui/EmptyState';
import { useToast } from './ui/Toast';

export interface VideoRecord {
  _id: string;
  title: string;
  subtitle?: string;
  tag?: string;
  videoUrl: string;
  thumbnail?: string;
  displayOrder?: number;
  isActive: boolean;
}

interface VideosTableProps {
  initialVideos: VideoRecord[];
}

export default function VideosTable({ initialVideos }: VideosTableProps) {
  const router = useRouter();
  const t = useTranslations('admin.videos');
  const tCommon = useTranslations('admin.common');
  const { showToast } = useToast();
  const [videos, setVideos] = useState(initialVideos);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<VideoRecord | null>(null);
  const [preview, setPreview] = useState<VideoRecord | null>(null);

  async function confirmDelete() {
    if (!pendingDelete) return;
    const id = pendingDelete._id;
    setDeletingId(id);
    try {
      const response = await fetch('/api/videos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error || t('deleteError'), 'error');
        return;
      }

      setVideos((prev) => prev.filter((item) => item._id !== id));
      showToast(tCommon('successDeleted'));
      router.refresh();
    } catch (err) {
      showToast(err instanceof Error ? err.message : t('deleteError'), 'error');
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  }

  if (videos.length === 0) {
    return (
      <EmptyState
        icon={Clapperboard}
        title={t('emptyTitle')}
        description={t('emptyText')}
        action={
          <Link href="/admin/dashboard/videos/new">
            <Button>{t('emptyAction')}</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-admin-card md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-admin-border bg-admin-surface-alt text-[11px] font-semibold uppercase tracking-[0.1em] text-admin-muted">
              <tr>
                <th scope="col" className="py-2.5 pl-5 pr-3">{t('columnPreview')}</th>
                <th scope="col" className="px-3 py-2.5">{t('columnTitle')}</th>
                <th scope="col" className="px-3 py-2.5">{t('columnTag')}</th>
                <th scope="col" className="px-3 py-2.5">{t('columnStatus')}</th>
                <th scope="col" className="px-3 py-2.5">{t('columnOrder')}</th>
                <th scope="col" className="py-2.5 pl-3 pr-5 text-right">{t('columnActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border">
              {videos.map((video) => (
                <tr key={video._id} className="admin-row">
                  <td className="py-2.5 pl-5 pr-3">
                    <div className="relative h-11 w-[72px] overflow-hidden rounded-xl border border-admin-border bg-black">
                      <video
                        src={video.videoUrl}
                        poster={video.thumbnail || undefined}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <p className="font-medium text-admin-ink">{video.title}</p>
                    {video.subtitle && <p className="text-[13px] text-admin-muted">{video.subtitle}</p>}
                  </td>
                  <td className="px-3 py-2.5 text-admin-body">
                    {video.tag ? video.tag : <span className="text-admin-muted">-</span>}
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge tone={video.isActive ? 'success' : 'neutral'} dot>
                      {video.isActive ? tCommon('active') : tCommon('inactive')}
                    </Badge>
                  </td>
                  <td className="admin-num px-3 py-2.5 text-admin-body">{video.displayOrder ?? 0}</td>
                  <td className="py-2.5 pl-3 pr-5">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => setPreview(video)}
                        aria-label={`${t('preview')} ${video.title}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-admin-border px-2.5 py-1.5 text-xs text-admin-body transition-colors hover:border-admin-border-strong hover:bg-admin-surface-alt hover:text-admin-ink"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        {t('preview')}
                      </button>
                      <Link
                        href={`/admin/dashboard/videos/${video._id}`}
                        aria-label={`${tCommon('edit')} ${video.title}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-admin-border px-2.5 py-1.5 text-xs text-admin-body transition-colors hover:border-admin-border-strong hover:bg-admin-surface-alt hover:text-admin-ink"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        {tCommon('edit')}
                      </Link>
                      <button
                        onClick={() => setPendingDelete(video)}
                        disabled={deletingId === video._id}
                        aria-label={`${tCommon('delete')} ${video.title}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-admin-danger/20 px-2.5 py-1.5 text-xs text-admin-danger transition-colors hover:bg-admin-danger-soft disabled:pointer-events-none disabled:opacity-55"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {tCommon('delete')}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2.5 md:hidden">
        {videos.map((video) => (
          <div key={video._id} className="rounded-2xl border border-admin-border bg-admin-surface p-3.5 shadow-admin-card">
            <div className="flex gap-3">
              <div className="relative h-14 w-[84px] flex-shrink-0 overflow-hidden rounded-xl border border-admin-border bg-black">
                <video
                  src={video.videoUrl}
                  poster={video.thumbnail || undefined}
                  className="h-full w-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-admin-ink">{video.title}</p>
                {video.subtitle && <p className="truncate text-[13px] text-admin-muted">{video.subtitle}</p>}
                <div className="mt-2">
                  <Badge tone={video.isActive ? 'success' : 'neutral'} dot>
                    {video.isActive ? tCommon('active') : tCommon('inactive')}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2 border-t border-admin-border pt-3">
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => setPreview(video)}>
                <Eye className="h-3.5 w-3.5" />
                {t('preview')}
              </Button>
              <Link href={`/admin/dashboard/videos/${video._id}`} className="flex-1">
                <Button variant="secondary" size="sm" className="w-full">
                  <Pencil className="h-3.5 w-3.5" />
                  {tCommon('edit')}
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={() => setPendingDelete(video)}
                disabled={deletingId === video._id}
              >
                <Trash2 className="h-3.5 w-3.5" />
                {tCommon('delete')}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-admin-ink/60 p-4 backdrop-blur-sm"
          onClick={() => setPreview(null)}
          role="presentation"
        >
          <div
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-admin-pop"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              src={preview.videoUrl}
              poster={preview.thumbnail || undefined}
              controls
              autoPlay
              playsInline
              className="max-h-[70vh] w-full bg-black object-contain"
            />
            <div className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-admin-ink">{preview.title}</p>
                {preview.subtitle && <p className="truncate text-sm text-admin-muted">{preview.subtitle}</p>}
              </div>
              <Button variant="secondary" onClick={() => setPreview(null)}>
                {tCommon('close')}
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={pendingDelete !== null}
        title={t('deleteConfirmTitle')}
        description={t('deleteConfirmText')}
        confirmLabel={tCommon('delete')}
        cancelLabel={tCommon('cancel')}
        loading={deletingId !== null}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
