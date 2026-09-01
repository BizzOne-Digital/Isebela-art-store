import type { ComponentType, ReactNode } from 'react';

interface EmptyStateProps {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description?: string;
  action?: ReactNode;
  /** Switches the icon plate to the danger tone for failed loads. */
  tone?: 'neutral' | 'danger';
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  tone = 'neutral',
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-admin-border-strong bg-admin-surface px-6 py-14 text-center">
      <div
        className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
          tone === 'danger'
            ? 'bg-admin-danger-soft text-admin-danger'
            : 'bg-admin-surface-alt text-admin-muted'
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <p className="font-serif text-lg text-admin-ink">{title}</p>
      {description && (
        <p className="mx-auto mt-1.5 max-w-[42ch] text-sm leading-relaxed text-admin-muted">
          {description}
        </p>
      )}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}
