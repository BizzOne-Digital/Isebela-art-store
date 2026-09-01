import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AdminFormLayoutProps {
  title: string;
  /** One line saying what saving this form will do. */
  description?: string;
  backHref: string;
  backLabel: string;
  children: ReactNode;
}

export default function AdminFormLayout({
  title,
  description,
  backHref,
  backLabel,
  children,
}: AdminFormLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={backHref}
        className="mb-5 inline-flex items-center gap-1.5 rounded-xl py-1 text-sm text-admin-muted transition-colors hover:text-admin-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <div className="overflow-hidden rounded-2xl border border-admin-border bg-admin-surface shadow-admin-card">
        <div className="border-b border-admin-border px-6 py-5 md:px-8">
          <h1 className="font-serif text-2xl text-admin-ink">{title}</h1>
          {description && <p className="mt-1 text-sm text-admin-muted">{description}</p>}
        </div>
        <div className="px-6 py-6 md:px-8 md:py-7">{children}</div>
      </div>
    </div>
  );
}
