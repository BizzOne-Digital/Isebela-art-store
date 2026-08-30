'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Sidebar from './Sidebar';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-admin-ink/40 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-admin-border shadow-admin-pop lg:hidden"
          >
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-3 top-3 rounded-full p-1.5 text-admin-muted hover:bg-admin-surface-alt hover:text-admin-ink"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar onNavigate={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
