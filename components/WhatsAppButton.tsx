'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <motion.a
        href="https://wa.me/5491186371242"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba5a] transition-colors group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Contactar por WhatsApp"
      >
        {/* Ripple effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-0 transition-opacity" />
        
        <FaWhatsapp className="w-7 h-7" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1 bg-neutral-900 text-white text-xs font-sans rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ¿En qué puedo ayudarte?
        </span>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;