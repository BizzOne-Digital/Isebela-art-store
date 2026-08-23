'use client';
import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const TopInfoBar = () => {
  const contactInfo = [
    { icon: <Mail className="w-3.5 h-3.5" />, text: 'isadoug01@gmail.com', href: 'mailto:isadoug01@gmail.com' },
    { icon: <FaWhatsapp className="w-3.5 h-3.5" />, text: '+54 9 11 8637-1242', href: 'https://wa.me/5491186371242' },
    { icon: <Phone className="w-3.5 h-3.5" />, text: 'Lunes a Sábado: 10:00 - 19:00', href: '#' },
  ];

  return (
    <div className="bg-neutral-900 text-neutral-50 py-2 border-b border-white/5 overflow-hidden">
      <div className="marquee">
        <div className="marquee-content">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              {contactInfo.map((info, index) => (
                <a
                  key={`${i}-${index}`}
                  href={info.href}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-sans hover:text-accent transition-colors whitespace-nowrap"
                >
                  {info.icon}
                  {info.text}
                </a>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopInfoBar;