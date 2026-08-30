'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Sparkles, Leaf, Award, Palette, Recycle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const valueConfig = [
  { key: 'detail', icon: Heart },
  { key: 'imagination', icon: Sparkles },
  { key: 'nature', icon: Leaf },
  { key: 'quality', icon: Award },
  { key: 'color', icon: Palette },
  { key: 'recycle', icon: Recycle },
] as const;

const storyKeys = ['beginning', 'evolution', 'today'] as const;

const PhilosophySection = () => {
  const t = useTranslations('philosophy');

  return (
    <section id="philosophy" className="px-6 max-w-7xl mx-auto py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-4 block">{t('eyebrow')}</span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-6">
          {t('titleStart')}
          <br />
          <span className="text-primary">{t('titleAccent')}</span>
        </h2>
        <p className="text-textBase/60 text-lg max-w-3xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10"
      >
        <div className="space-y-8">
          {storyKeys.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="p-6 md:p-8 border border-accent/10 bg-surfaceAlt/30 relative overflow-hidden"
            >
              <span className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-serif text-xl">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif text-textBase mb-2">{t(`story.${key}.title`)}</h3>
                  <p className="text-textBase/60 leading-relaxed">{t(`story.${key}.text`)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="aspect-[4/5] rounded-lg overflow-hidden border border-accent/20 bg-surfaceAlt relative"
          >
            <Image
              src="/images/img/is4.jpg"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface/90 backdrop-blur-sm border border-accent/20">
              <p className="text-textBase/80 text-sm leading-relaxed italic">
                &ldquo;{t('quote')}&rdquo;
              </p>
              <p className="text-accent text-sm mt-3 font-sans">{t('quoteAttribution')}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-20 relative z-10"
      >
        <h3 className="text-3xl font-serif text-textBase text-center mb-12">{t('valuesTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueConfig.map((value, index) => (
            <motion.div
              key={value.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.08 }}
              className="group p-6 border border-accent/10 bg-surfaceAlt/30 hover:border-primary/30 hover:bg-surfaceAlt/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                <value.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-lg font-serif text-textBase mb-2">{t(`values.${value.key}.title`)}</h4>
              <p className="text-textBase/60 text-sm leading-relaxed">{t(`values.${value.key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-4 md:px-8 py-5 md:py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg">
          <Sparkles className="w-6 h-6 text-accent" />
          <div className="text-left">
            <p className="font-serif text-textBase">{t('askIdea')}</p>
            <p className="text-textBase/60 text-sm">{t('letSCreate')}</p>
          </div>
          <a
            href="#contact"
            className="ml-auto px-5 py-2 bg-primary text-white text-sm font-sans rounded-sm hover:bg-primary/90 transition-colors"
          >
            {t('customOrderButton')}
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default PhilosophySection;
