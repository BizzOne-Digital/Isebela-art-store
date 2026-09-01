'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Pencil, Trash2, FolderTree } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import ConfirmDialog from './ui/ConfirmDialog';
import EmptyState from './ui/EmptyState';
import { useToast } from './ui/Toast';

export interface CategoryRecord {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  displayOrder?: number;
  isActive: boolean;
}

interface CategoriesTableProps {
  initialCategories: CategoryRecord[];
}

export default function CategoriesTable({ initialCategories }: CategoriesTableProps) {
  const router = useRouter();
  const t = useTranslations('admin.categories');
  const tCommon = useTranslations('admin.common');
  const { showToast } = useToast();
  const [categories, setCategories] = useState(initialCategories);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<CategoryRecord | null>(null);

  async function confirmDelete() {
    if (!pendingDelete) return;
    const id = pendingDelete._id;
    setDeletingId(id);
    try {
      const response = await fetch('/api/categories', {
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
        showToast(response.status === 409 ? t('deleteBlockedError') : (data.error || t('deleteError')), 'error');
        return;
      }

      setCategories((prev) => prev.filter((item) => item._id !== id));
      showToast(tCommon('successDeleted'));
    } catch (err) {
      showToast(err instanceof Error ? err.message : t('deleteError'), 'error');
    } finally {
      setDeletingId(null);
      setPendingDelete(null);
    }
  }

  if (categories.length === 0) {
    return (
      <EmptyState
        icon={FolderTree}
        title={t('emptyTitle')}
        description={t('emptyText')}
        action={
          <Link href="/admin/dashboard/categories/new">
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
                <th scope="col" className="py-2.5 pl-5 pr-3">{t('columnImage')}</th>
                <th scope="col" className="px-3 py-2.5">{t('columnName')}</th>
                <th scope="col" className="px-3 py-2.5">{t('columnStatus')}</th>
                <th scope="col" className="px-3 py-2.5">{t('columnOrder')}</th>
                <th scope="col" className="py-2.5 pl-3 pr-5 text-right">{t('columnActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border">
              {categories.map((category) => (
                <tr key={category._id} className="admin-row">
                  <td className="py-2.5 pl-5 pr-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-admin-border bg-admin-surface-alt">
                      {category.image ? (
                        <Image src={category.image} alt="" fill className="object-cover" sizes="44px" />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <p className="font-medium text-admin-ink">{category.name}</p>
                    <p className="text-[13px] text-admin-muted">{category.slug}</p>
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge tone={category.isActive ? 'success' : 'neutral'} dot>
                      {category.isActive ? tCommon('active') : tCommon('inactive')}
                    </Badge>
                  </td>
                  <td className="admin-num px-3 py-2.5 text-admin-body">{category.displayOrder ?? 0}</td>
                  <td className="py-2.5 pl-3 pr-5">
                    <div className="flex justify-end gap-1.5">
                      <Link
                        href={`/admin/dashboard/categories/${category._id}`}
                        aria-label={`${tCommon('edit')} ${category.name}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-admin-border px-2.5 py-1.5 text-xs text-admin-body transition-colors hover:border-admin-border-strong hover:bg-admin-surface-alt hover:text-admin-ink"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        {tCommon('edit')}
                      </Link>
                      <button
                        onClick={() => setPendingDelete(category)}
                        disabled={deletingId === category._id}
                        aria-label={`${tCommon('delete')} ${category.name}`}
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
        {categories.map((category) => (
          <div key={category._id} className="rounded-2xl border border-admin-border bg-admin-surface p-3.5 shadow-admin-card">
            <div className="flex gap-3">
              <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-admin-border bg-admin-surface-alt">
                {category.image ? (
                  <Image src={category.image} alt="" fill className="object-cover" sizes="56px" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-admin-ink">{category.name}</p>
                <p className="truncate text-[13px] text-admin-muted">{category.slug}</p>
                <div className="mt-2">
                  <Badge tone={category.isActive ? 'success' : 'neutral'} dot>
                    {category.isActive ? tCommon('active') : tCommon('inactive')}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2 border-t border-admin-border pt-3">
              <Link href={`/admin/dashboard/categories/${category._id}`} className="flex-1">
                <Button variant="secondary" size="sm" className="w-full">
                  <Pencil className="h-3.5 w-3.5" />
                  {tCommon('edit')}
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={() => setPendingDelete(category)}
                disabled={deletingId === category._id}
              >
                <Trash2 className="h-3.5 w-3.5" />
                {tCommon('delete')}
              </Button>
            </div>
          </div>
        ))}
      </div>

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
