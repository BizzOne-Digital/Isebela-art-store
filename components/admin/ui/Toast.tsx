'use client';

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

type ToastVariant = 'success' | 'error';

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, variant: ToastVariant = 'success') => {
    const id = idRef.current++;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => dismiss(id), 4000);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-admin-pop min-w-[260px] max-w-sm ${
                toast.variant === 'success'
                  ? 'bg-admin-surface border-admin-success/25 text-admin-ink'
                  : 'bg-admin-surface border-admin-danger/25 text-admin-ink'
              }`}
            >
              {toast.variant === 'success' ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-admin-success" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-admin-danger" />
              )}
              <p className="text-sm flex-1">{toast.message}</p>
              <button onClick={() => dismiss(toast.id)} className="text-admin-muted hover:text-admin-ink" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
