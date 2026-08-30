import type { ReactNode } from 'react';

type Tone = 'success' | 'neutral' | 'gold' | 'danger';

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  success: 'bg-admin-success-soft text-admin-success',
  neutral: 'bg-admin-surface-alt text-admin-muted border border-admin-border',
  gold: 'bg-admin-gold-soft text-admin-gold',
  danger: 'bg-admin-danger-soft text-admin-danger',
};

export default function Badge({ tone = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
