import type { ReactNode } from 'react';

type Tone = 'success' | 'neutral' | 'gold' | 'danger';

interface BadgeProps {
  tone?: Tone;
  /** Adds a small state dot. Use only where the badge reports real state. */
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  success: 'bg-admin-success-soft text-admin-success ring-admin-success/15',
  neutral: 'bg-admin-surface-alt text-admin-body ring-admin-border',
  gold: 'bg-admin-gold-soft text-admin-gold ring-admin-gold/20',
  danger: 'bg-admin-danger-soft text-admin-danger ring-admin-danger/15',
};

const dotClasses: Record<Tone, string> = {
  success: 'bg-admin-success',
  neutral: 'bg-admin-muted',
  gold: 'bg-admin-gold',
  danger: 'bg-admin-danger',
};

export default function Badge({ tone = 'neutral', dot = false, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${toneClasses[tone]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[tone]}`} aria-hidden="true" />}
      {children}
    </span>
  );
}
