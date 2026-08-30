'use client';

import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import MobileDrawer from './MobileDrawer';
import Topbar from './Topbar';
import { ToastProvider } from './ui/Toast';

export default function AdminShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-admin-bg lg:flex">
        <aside className="hidden w-72 flex-shrink-0 border-r border-admin-border lg:block">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
        </aside>

        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <div className="min-w-0 flex-1">
          <Topbar onMenuClick={() => setDrawerOpen(true)} />
          <main className="p-4 sm:p-6 lg:p-10">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
