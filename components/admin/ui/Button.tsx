import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'destructive' | 'ghost';
type Size = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

// Burgundy is the single accent. Secondary and ghost stay neutral so one
// action per screen reads as the primary one.
const variantClasses: Record<Variant, string> = {
  primary:
    'bg-admin-primary text-white shadow-sm hover:bg-admin-primary-hover active:translate-y-px',
  secondary:
    'border border-admin-border bg-admin-surface text-admin-ink hover:border-admin-border-strong hover:bg-admin-surface-alt active:translate-y-px',
  destructive:
    'border border-admin-danger/25 bg-admin-danger-soft text-admin-danger hover:bg-admin-danger hover:text-white active:translate-y-px',
  ghost: 'text-admin-body hover:bg-admin-surface-alt hover:text-admin-ink',
};

const sizeClasses: Record<Size, string> = {
  sm: 'gap-1.5 px-3 py-1.5 text-xs',
  md: 'gap-2 px-4 py-2.5 text-sm',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-55 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
