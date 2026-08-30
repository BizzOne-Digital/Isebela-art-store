'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Plus, Search, Pencil, Trash2, RotateCcw, PackageOpen } from 'lucide-react';
import Badge from '@/components/admin/ui/Badge';
import Button from '@/components/admin/ui/Button';
import Skeleton from '@/components/admin/ui/Skeleton';
import ConfirmDialog from '@/components/admin/ui/ConfirmDialog';
import { useToast } from '@/components/admin/ui/Toast';

type ArtworkRecord = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  status: 'draft' | 'published';
  featured: boolean;
  updatedAt: string;
  images: string[];
};

export default function ArtworkAdminPage() {
  const router = useRouter();
  const t = useTranslations('admin.products');
  const tCommon = useTranslations('admin.common');
  const { showToast } = useToast();

  const [artworks, setArtworks] = useState<ArtworkRecord[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'error' | 'ready'>('loading');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [featured, setFeatured] = useState('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ArtworkRecord | null>(null);

  async function load() {
    setLoadState('loading');
    try {
      const response = await fetch('/api/admin/artworks', { cache: 'no-store' });
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      if (!response.ok) {
        throw new Error('Unable to load artworks');
      }
      const data = await response.json();
      setArtworks(data.artworks || []);
      setLoadState('ready');
    } catch (error) {
      console.error(error);
      setLoadState('error');
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function confirmDelete() {
    if (!pendingDelete) return;
    const id = pendingDelete._id;
    setDeletingId(id);
    try {
      const response = await fetch('/api/artworks', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }

      if (!response.ok) {
        showToast(t('deleteError'), 'error');
        return;
      }

      setArtworks((prev) => prev.filter((item) => item._id !== id));
      showToast(tCommon('successDeleted'));
    } catch (error) {
      console.error(error);
      showToast(t('deleteError'), 'error');
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  }

  const categories = useMemo(
    () => Array.from(new Set(artworks.map((item) => item.category))).sort(),
    [artworks],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return artworks.filter((item) => {
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q);

      const matchesCategory = category === 'all' || item.category === category;
      const matchesStatus = status === 'all' || item.status === status;
      const matchesFeatured =
        featured === 'all' ||
        (featured === 'yes' && item.featured) ||
        (featured === 'no' && !item.featured);

      return matchesQuery && matchesCategory && matchesStatus && matchesFeatured;
    });
  }, [artworks, category, featured, query, status]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-admin-gold">{t('eyebrow')}</p>
          <h1 className="mt-2 font-serif text-3xl text-admin-ink">{t('title')}</h1>
        </div>
        <Link href="/admin/dashboard/artworks/new">
          <Button>
            <Plus className="h-4 w-4" />
            {t('newProduct')}
          </Button>
        </Link>
      </div>

      <div className="mb-6 rounded-2xl border border-admin-border bg-admin-surface p-4 shadow-admin-card">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-xl border border-admin-border bg-admin-surface-alt py-3 pl-9 pr-4 text-sm text-admin-ink outline-none focus:border-admin-primary"
            />
          </div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-admin-border bg-admin-surface-alt px-4 py-3 text-sm text-admin-ink">
            <option value="all">{t('allCategories')}</option>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-admin-border bg-admin-surface-alt px-4 py-3 text-sm text-admin-ink">
            <option value="all">{t('allStatuses')}</option>
            <option value="published">{tCommon('published')}</option>
            <option value="draft">{tCommon('draft')}</option>
          </select>
          <select value={featured} onChange={(event) => setFeatured(event.target.value)} className="rounded-xl border border-admin-border bg-admin-surface-alt px-4 py-3 text-sm text-admin-ink">
            <option value="all">{t('anyFeatured')}</option>
            <option value="yes">{tCommon('featured')}</option>
            <option value="no">{tCommon('notFeatured')}</option>
          </select>
        </div>
      </div>

      {loadState === 'loading' && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {loadState === 'error' && (
        <div className="rounded-2xl border border-admin-border bg-admin-surface p-10 text-center shadow-admin-card">
          <p className="text-admin-ink font-serif text-lg">{t('errorTitle')}</p>
          <Button variant="secondary" className="mt-4 mx-auto" onClick={load}>
            <RotateCcw className="h-4 w-4" />
            {tCommon('retry')}
          </Button>
        </div>
      )}

      {loadState === 'ready' && artworks.length === 0 && (
        <div className="rounded-2xl border border-admin-border bg-admin-surface p-12 text-center shadow-admin-card">
          <PackageOpen className="mx-auto mb-3 h-10 w-10 text-admin-muted" strokeWidth={1.5} />
          <p className="font-serif text-lg text-admin-ink">{t('emptyTitle')}</p>
          <p className="mt-1 text-sm text-admin-muted">{t('emptyText')}</p>
          <Link href="/admin/dashboard/artworks/new" className="mt-5 inline-block">
            <Button>
              <Plus className="h-4 w-4" />
              {t('emptyAction')}
            </Button>
          </Link>
        </div>
      )}

      {loadState === 'ready' && artworks.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-admin-card md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-admin-surface-alt text-xs uppercase tracking-[0.12em] text-admin-muted">
                  <tr>
                    <th className="px-4 py-3">{t('columnImage')}</th>
                    <th className="px-4 py-3">{t('columnName')}</th>
                    <th className="px-4 py-3">{t('columnCategory')}</th>
                    <th className="px-4 py-3">{t('columnStatus')}</th>
                    <th className="px-4 py-3">{t('columnFeatured')}</th>
                    <th className="px-4 py-3">{t('columnUpdated')}</th>
                    <th className="px-4 py-3">{t('columnActions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item._id} className="border-t border-admin-border">
                      <td className="px-4 py-3">
                        <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-admin-border bg-admin-surface-alt">
                          {item.images?.[0] ? (
                            <Image src={item.images[0]} alt={item.name} fill className="object-cover" sizes="56px" />
                          ) : null}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-admin-ink">{item.name}</td>
                      <td className="px-4 py-3 text-admin-body">{item.category}</td>
                      <td className="px-4 py-3">
                        <Badge tone={item.status === 'published' ? 'success' : 'neutral'}>{item.status}</Badge>
                      </td>
                      <td className="px-4 py-3">{item.featured ? <Badge tone="gold">{tCommon('featured')}</Badge> : <span className="text-admin-muted text-sm">—</span>}</td>
                      <td className="px-4 py-3 text-admin-body">{new Date(item.updatedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link href={`/admin/dashboard/artworks/${item._id}`} className="inline-flex items-center gap-1 rounded-lg border border-admin-border px-2.5 py-1.5 text-xs text-admin-body hover:bg-admin-surface-alt">
                            <Pencil className="h-3.5 w-3.5" />
                            {tCommon('edit')}
                          </Link>
                          <button
                            onClick={() => setPendingDelete(item)}
                            disabled={deletingId === item._id}
                            className="inline-flex items-center gap-1 rounded-lg border border-admin-danger/25 bg-admin-danger-soft px-2.5 py-1.5 text-xs text-admin-danger disabled:cursor-not-allowed disabled:opacity-60"
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
          <div className="space-y-3 md:hidden">
            {filtered.map((item) => (
              <div key={item._id} className="rounded-2xl border border-admin-border bg-admin-surface p-4 shadow-admin-card">
                <div className="flex gap-3">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-admin-border bg-admin-surface-alt">
                    {item.images?.[0] ? (
                      <Image src={item.images[0]} alt={item.name} fill className="object-cover" sizes="64px" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-admin-ink">{item.name}</p>
                    <p className="text-sm text-admin-muted">{item.category}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      <Badge tone={item.status === 'published' ? 'success' : 'neutral'}>{item.status}</Badge>
                      {item.featured && <Badge tone="gold">{tCommon('featured')}</Badge>}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 border-t border-admin-border pt-3">
                  <Link href={`/admin/dashboard/artworks/${item._id}`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                      <Pencil className="h-3.5 w-3.5" />
                      {tCommon('edit')}
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => setPendingDelete(item)}
                    disabled={deletingId === item._id}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {tCommon('delete')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
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
