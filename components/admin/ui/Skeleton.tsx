interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`admin-shimmer rounded-xl ${className}`} />;
}

/** Placeholder shaped like a populated list row, so loading matches the result. */
export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-admin-border bg-admin-surface p-4">
      <Skeleton className="h-14 w-14 flex-shrink-0" />
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-3.5 w-2/5" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="hidden h-6 w-20 rounded-full sm:block" />
      <Skeleton className="hidden h-8 w-28 sm:block" />
    </div>
  );
}
