'use client';

import { Menu } from 'lucide-react';

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-admin-border bg-admin-surface/90 px-4 py-3 backdrop-blur-sm lg:hidden">
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="rounded-lg p-2 text-admin-ink hover:bg-admin-surface-alt"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-admin-primary font-serif text-sm text-white">
        I
      </div>
      <span className="font-serif text-sm text-admin-ink">Isabel Creando</span>
    </header>
  );
}
