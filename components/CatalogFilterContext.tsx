'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

/** Locale-invariant sentinel for "no category filter applied" — never render this directly, always map it to a translated label. */
export const ALL_CATEGORIES = '__all__';

type CatalogFilterValue = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

const CatalogFilterContext = createContext<CatalogFilterValue | null>(null);

export function CatalogFilterProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  return (
    <CatalogFilterContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </CatalogFilterContext.Provider>
  );
}

export function useCatalogFilter() {
  const ctx = useContext(CatalogFilterContext);
  if (!ctx) {
    throw new Error('useCatalogFilter must be used within a CatalogFilterProvider');
  }
  return ctx;
}
