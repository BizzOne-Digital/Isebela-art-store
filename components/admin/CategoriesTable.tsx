'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Pencil, Trash2 } from 'lucide-react';
import Badge from './ui/Badge';
import Button from './ui/Button';
import ConfirmDialog from './ui/ConfirmDialog';
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
      <div className="rounded-2xl border border-admin-border bg-admin-surface p-12 text-center shadow-admin-card">
        <p className="font-serif text-lg text-admin-ink">{t('emptyTitle')}</p>
        <Link href="/admin/dashboard/categories/new" className="mt-5 inline-block">
          <Button>{t('emptyAction')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-admin-card md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-admin-surface-alt text-xs uppercase tracking-[0.12em] text-admin-muted">
              <tr>
                <th className="px-4 py-3">{t('columnImage')}</th>
                <th className="px-4 py-3">{t('columnName')}</th>
                <th className="px-4 py-3">{t('columnSlug')}</th>
                <th className="px-4 py-3">{t('columnStatus')}</th>
                <th className="px-4 py-3">{t('columnOrder')}</th>
                <th className="px-4 py-3">{t('columnActions')}</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-t border-admin-border">
                  <td className="px-4 py-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-admin-border bg-admin-surface-alt">
                      {category.image ? (
                        <Image src={category.image} alt={category.name} fill className="object-cover" sizes="56px" />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-admin-ink">{category.name}</td>
                  <td className="px-4 py-3 text-admin-body">{category.slug}</td>
                  <td className="px-4 py-3">
                    <Badge tone={category.isActive ? 'success' : 'neutral'}>
                      {category.isActive ? tCommon('active') : tCommon('inactive')}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-admin-body">{category.displayOrder ?? 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/dashboard/categories/${category._id}`} className="inline-flex items-center gap-1 rounded-lg border border-admin-border px-2.5 py-1.5 text-xs text-admin-body hover:bg-admin-surface-alt">
                        <Pencil className="h-3.5 w-3.5" />
                        {tCommon('edit')}
                      </Link>
                      <button
                        onClick={() => setPendingDelete(category)}
                        disabled={deletingId === category._id}
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
        {categories.map((category) => (
          <div key={category._id} className="rounded-2xl border border-admin-border bg-admin-surface p-4 shadow-admin-card">
            <div className="flex gap-3">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-admin-border bg-admin-surface-alt">
                {category.image ? (
                  <Image src={category.image} alt={category.name} fill className="object-cover" sizes="64px" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-admin-ink">{category.name}</p>
                <p className="text-sm text-admin-muted">{category.slug}</p>
                <div className="mt-1.5">
                  <Badge tone={category.isActive ? 'success' : 'neutral'}>
                    {category.isActive ? tCommon('active') : tCommon('inactive')}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2 border-t border-admin-border pt-3">
              <Link href={`/admin/dashboard/categories/${category._id}`} className="flex-1">
                <Button variant="secondary" className="w-full">
                  <Pencil className="h-3.5 w-3.5" />
                  {tCommon('edit')}
                </Button>
              </Link>
              <Button
                variant="destructive"
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
