import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'destructive' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-admin-primary text-white hover:bg-admin-primary-hover shadow-sm disabled:opacity-60 disabled:cursor-not-allowed',
  secondary:
    'border border-admin-border bg-admin-surface text-admin-body hover:bg-admin-surface-alt disabled:opacity-60 disabled:cursor-not-allowed',
  destructive:
    'border border-admin-danger/25 bg-admin-danger-soft text-admin-danger hover:bg-admin-danger hover:text-white disabled:opacity-60 disabled:cursor-not-allowed',
  ghost:
    'text-admin-body hover:bg-admin-surface-alt disabled:opacity-60 disabled:cursor-not-allowed',
};

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
