import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  /** One short line telling the admin what this screen is for. */
  description?: string;
  /** Primary action for the screen, rendered at the end of the header row. */
  action?: ReactNode;
  /** Optional inline stats or filters that belong with the title block. */
  meta?: ReactNode;
}

export default function PageHeader({ title, description, action, meta }: PageHeaderProps) {
  return (
    <header className="mb-7 border-b border-admin-border pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-serif text-[1.75rem] leading-tight text-admin-ink">{title}</h1>
          {description && (
            <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-admin-muted">{description}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {meta && <div className="mt-5">{meta}</div>}
    </header>
  );
}
