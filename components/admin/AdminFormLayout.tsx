import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface AdminFormLayoutProps {
  title: string;
  backHref: string;
  backLabel: string;
  children: ReactNode;
}

export default function AdminFormLayout({ title, backHref, backLabel, children }: AdminFormLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm text-admin-primary hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      </div>
      <div className="rounded-2xl border border-admin-border bg-admin-surface p-6 shadow-admin-card md:p-8">
        <h1 className="mb-6 font-serif text-3xl text-admin-ink">{title}</h1>
        {children}
      </div>
    </div>
  );
}
