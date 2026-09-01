'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Plus, Search, Pencil, Trash2, RotateCcw, PackageOpen, SearchX, AlertTriangle } from 'lucide-react';
import Badge from '@/components/admin/ui/Badge';
import Button from '@/components/admin/ui/Button';
import { SkeletonRow } from '@/components/admin/ui/Skeleton';
import PageHeader from '@/components/admin/ui/PageHeader';
import EmptyState from '@/components/admin/ui/EmptyState';
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
    <div>
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        action={
          <Link href="/admin/dashboard/artworks/new">
            <Button>
              <Plus className="h-4 w-4" />
              {t('newProduct')}
            </Button>
          </Link>
        }
      />

      <div className="mb-5 grid gap-2.5 md:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(0,1fr))]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-admin-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            className="admin-field pl-9"
          />
        </div>
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label={t('allCategories')} className="admin-field">
          <option value="all">{t('allCategories')}</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label={t('allStatuses')} className="admin-field">
          <option value="all">{t('allStatuses')}</option>
          <option value="published">{tCommon('published')}</option>
          <option value="draft">{tCommon('draft')}</option>
        </select>
        <select value={featured} onChange={(event) => setFeatured(event.target.value)} aria-label={t('anyFeatured')} className="admin-field">
          <option value="all">{t('anyFeatured')}</option>
          <option value="yes">{tCommon('featured')}</option>
          <option value="no">{tCommon('notFeatured')}</option>
        </select>
      </div>

      {loadState === 'loading' && (
        <div className="space-y-3" aria-busy="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      )}

      {loadState === 'error' && (
        <EmptyState
          icon={AlertTriangle}
          tone="danger"
          title={t('errorTitle')}
          description={t('errorText')}
          action={
            <Button variant="secondary" onClick={load}>
              <RotateCcw className="h-4 w-4" />
              {tCommon('retry')}
            </Button>
          }
        />
      )}

      {loadState === 'ready' && artworks.length === 0 && (
        <EmptyState
          icon={PackageOpen}
          title={t('emptyTitle')}
          description={t('emptyText')}
          action={
            <Link href="/admin/dashboard/artworks/new">
              <Button>
                <Plus className="h-4 w-4" />
                {t('emptyAction')}
              </Button>
            </Link>
          }
        />
      )}

      {loadState === 'ready' && artworks.length > 0 && filtered.length === 0 && (
        <EmptyState
          icon={SearchX}
          title={t('noMatchesTitle')}
          description={t('noMatchesText')}
          action={
            <Button
              variant="secondary"
              onClick={() => {
                setQuery('');
                setCategory('all');
                setStatus('all');
                setFeatured('all');
              }}
            >
              <RotateCcw className="h-4 w-4" />
              {t('clearFilters')}
            </Button>
          }
        />
      )}

      {loadState === 'ready' && filtered.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-admin-card md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-admin-border bg-admin-surface-alt text-[11px] font-semibold uppercase tracking-[0.1em] text-admin-muted">
                  <tr>
                    <th scope="col" className="py-2.5 pl-5 pr-3">{t('columnImage')}</th>
                    <th scope="col" className="px-3 py-2.5">{t('columnName')}</th>
                    <th scope="col" className="px-3 py-2.5">{t('columnCategory')}</th>
                    <th scope="col" className="px-3 py-2.5">{t('columnStatus')}</th>
                    <th scope="col" className="px-3 py-2.5">{t('columnFeatured')}</th>
                    <th scope="col" className="px-3 py-2.5">{t('columnUpdated')}</th>
                    <th scope="col" className="py-2.5 pl-3 pr-5 text-right">{t('columnActions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-border">
                  {filtered.map((item) => (
                    <tr key={item._id} className="admin-row">
                      <td className="py-2.5 pl-5 pr-3">
                        <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-admin-border bg-admin-surface-alt">
                          {item.images?.[0] ? (
                            <Image src={item.images[0]} alt="" fill className="object-cover" sizes="44px" />
                          ) : null}
                        </div>
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="font-medium text-admin-ink">{item.name}</p>
                        <p className="text-[13px] text-admin-muted">{item.slug}</p>
                      </td>
                      <td className="px-3 py-2.5 text-admin-body">{item.category}</td>
                      <td className="px-3 py-2.5">
                        <Badge tone={item.status === 'published' ? 'success' : 'neutral'} dot>
                          {item.status === 'published' ? tCommon('published') : tCommon('draft')}
                        </Badge>
                      </td>
                      <td className="px-3 py-2.5">
                        {item.featured ? (
                          <Badge tone="gold">{tCommon('featured')}</Badge>
                        ) : (
                          <span className="text-admin-muted">-</span>
                        )}
                      </td>
                      <td className="admin-num px-3 py-2.5 text-admin-body">{new Date(item.updatedAt).toLocaleDateString()}</td>
                      <td className="py-2.5 pl-3 pr-5">
                        <div className="flex justify-end gap-1.5">
                          <Link
                            href={`/admin/dashboard/artworks/${item._id}`}
                            aria-label={`${tCommon('edit')} ${item.name}`}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-admin-border px-2.5 py-1.5 text-xs text-admin-body transition-colors hover:border-admin-border-strong hover:bg-admin-surface-alt hover:text-admin-ink"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            {tCommon('edit')}
                          </Link>
                          <button
                            onClick={() => setPendingDelete(item)}
                            disabled={deletingId === item._id}
                            aria-label={`${tCommon('delete')} ${item.name}`}
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
            {filtered.map((item) => (
              <div key={item._id} className="rounded-2xl border border-admin-border bg-admin-surface p-3.5 shadow-admin-card">
                <div className="flex gap-3">
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-admin-border bg-admin-surface-alt">
                    {item.images?.[0] ? (
                      <Image src={item.images[0]} alt="" fill className="object-cover" sizes="56px" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-admin-ink">{item.name}</p>
                    <p className="truncate text-[13px] text-admin-muted">{item.category}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge tone={item.status === 'published' ? 'success' : 'neutral'} dot>
                        {item.status === 'published' ? tCommon('published') : tCommon('draft')}
                      </Badge>
                      {item.featured && <Badge tone="gold">{tCommon('featured')}</Badge>}
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2 border-t border-admin-border pt-3">
                  <Link href={`/admin/dashboard/artworks/${item._id}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full">
                      <Pencil className="h-3.5 w-3.5" />
                      {tCommon('edit')}
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
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
