'use client';

import { useState, type ReactNode } from 'react';
import Sidebar from './Sidebar';
import MobileDrawer from './MobileDrawer';
import Topbar from './Topbar';
import { ToastProvider } from './ui/Toast';

interface AdminShellProps {
  children: ReactNode;
  adminName?: string;
  adminEmail?: string;
}

export default function AdminShell({ children, adminName, adminEmail }: AdminShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="admin-root min-h-screen bg-admin-bg lg:flex">
        <aside className="hidden w-[264px] flex-shrink-0 border-r border-admin-border lg:block">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
        </aside>

        <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenuClick={() => setDrawerOpen(true)} adminName={adminName} adminEmail={adminEmail} />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-[1180px]">{children}</div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
