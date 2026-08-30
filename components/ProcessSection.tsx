'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  PenTool,
  Scissors,
  Sparkles,
  Package,
  Heart,
  Leaf
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const stepConfig = [
  { key: 'inspiration', icon: Lightbulb, color: 'primary' },
  { key: 'design', icon: PenTool, color: 'secondary' },
  { key: 'craft', icon: Scissors, color: 'accent' },
  { key: 'finish', icon: Sparkles, color: 'primary' },
  { key: 'ready', icon: Package, color: 'secondary' },
] as const;

const ProcessSection = () => {
  const t = useTranslations('process');

  return (
    <section id="process" className="px-6 max-w-7xl mx-auto py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mb-16 text-center relative z-10"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-2 block">{t('eyebrow')}</span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-4">
          {t('titleStart')} <span className="text-accent">{t('titleAccent')}</span> {t('titleEnd')}
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10"
      >
        <div className="hidden lg:block " />

        <div className="space-y-16 lg:space-y-24">
          {stepConfig.map((step, index) => {
            const details = t.raw(`steps.${step.key}.details`) as string[];
            return (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + index * 0.12, duration: 0.6 }}
                className={`relative flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} items-start gap-8 lg:gap-16`}
              >
                <div className={`relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 flex items-center justify-center bg-surface z-10 ${index % 2 === 0 ? 'border-primary/30' : 'border-secondary/30'}`}>
                  <span className="text-2xl md:text-3xl font-serif font-bold text-textBase">{String(index + 1).padStart(2, '0')}</span>
                  <div className="absolute -inset-2 rounded-full border-2 border-accent/20 animate-pulse" style={{ animationDelay: `${index * 0.5}s` }} />
                </div>

                <div className={`flex-1 lg:w-1/2 p-6 md:p-8 bg-surfaceAlt/50 border border-accent/10 relative ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-sm bg-${step.color}/10 flex items-center justify-center`}>
                      <step.icon className={`w-6 h-6 text-${step.color}`} />
                    </div>
                    <h3 className="text-2xl font-serif text-textBase">{t(`steps.${step.key}.title`)}</h3>
                  </div>
                  <p className="text-textBase/60 leading-relaxed mb-6">{t(`steps.${step.key}.description`)}</p>
                  <ul className="space-y-2">
                    {details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3 text-textBase/70 text-sm">
                        <span className={`w-2 h-2 rounded-full bg-${step.color} flex-shrink-0`} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-4 md:px-8 py-5 md:py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg">
          <Heart className="w-6 h-6 text-secondary" />
          <div className="text-left">
            <p className="font-serif text-textBase">{t('footerTitle')}</p>
            <p className="text-textBase/60 text-sm">{t('footerText')}</p>
          </div>
          <Leaf className="w-6 h-6 text-primary ml-auto" />
        </div>
      </motion.div>
    </section>
  );
};

export default ProcessSection;
