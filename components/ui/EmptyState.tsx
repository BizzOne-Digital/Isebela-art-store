'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
  /** Optional call to action, so a dead end still offers a way forward. */
  action?: React.ReactNode;
  className?: string;
}

/**
 * Shared placeholder for sections whose content set is empty. Sections used to
 * render nothing at all, which read as a broken page rather than an empty one.
 */
export default function EmptyState({
  icon: Icon,
  title,
  message,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      role="status"
      className={`relative z-10 flex flex-col items-center text-center px-6 py-16 md:py-20 border border-dashed border-accent/25 bg-surfaceAlt/30 rounded-2xl ${className}`}
    >
      <div className="w-16 h-16 mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-8 h-8 text-primary/70" aria-hidden />
      </div>
      <h3 className="text-xl md:text-2xl font-serif text-textBase mb-2">{title}</h3>
      <p className="text-textBase/60 text-sm md:text-base max-w-md leading-relaxed">{message}</p>
      {action && <div className="mt-7 flex flex-col sm:flex-row gap-3">{action}</div>}
    </motion.div>
  );
}
