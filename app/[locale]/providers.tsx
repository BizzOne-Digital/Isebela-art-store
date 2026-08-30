'use client';

import { CatalogFilterProvider } from '@/components/CatalogFilterContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CatalogFilterProvider>{children}</CatalogFilterProvider>;
}
