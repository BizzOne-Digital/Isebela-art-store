'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Sparkles, Shield, Crown } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const testimonialKeys = ['t1', 't2', 't3', 't4', 't5', 't6'] as const;
const testimonialAvatars: Record<(typeof testimonialKeys)[number], string> = {
  t1: 'MG', t2: 'CR', t3: 'LM', t4: 'SH', t5: 'JP', t6: 'VR',
};

const statConfig = [
  { key: 'happyClients', number: '500+', icon: Heart },
  { key: 'recommend', number: '98%', icon: Star },
  { key: 'yearsExperience', number: '10+', icon: Crown },
  { key: 'possibilities', number: '∞', icon: Sparkles },
] as const;

const TestimonialsSection = () => {
  const t = useTranslations('testimonials');

  return (
    <section id="testimonios" className="px-6 max-w-7xl mx-auto py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-4 block">{t('eyebrow')}</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-textBase mb-6">
          {t('titleStart')}
          <br />
          <span className="text-secondary">{t('titleAccent')}</span>
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 relative z-10"
      >
        {statConfig.map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.08 }}
            className="text-center p-4 sm:p-6 border border-accent/10 bg-surfaceAlt/30 hover:border-primary/30 transition-colors rounded-lg"
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary mb-1">{stat.number}</p>
            <p className="text-textBase/60 text-xs sm:text-sm font-sans leading-snug">{t(`stats.${stat.key}`)}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialKeys.map((key, index) => {
            const tags = t.raw(`items.${key}.tags`) as string[];
            return (
              <motion.article
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + index * 0.08 }}
                className="p-6 md:p-8 bg-surfaceAlt/50 border border-accent/10 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <span className="absolute top-4 left-4 text-accent text-2xl opacity-50">&ldquo;</span>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-serif text-xl font-bold">{testimonialAvatars[key]}</span>
                  </div>
                  <div>
                    <p className="font-serif text-textBase">{t(`items.${key}.name`)}</p>
                    <p className="text-textBase/50 text-xs font-sans">{t(`items.${key}.location`)} &middot; {t(`items.${key}.role`)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4 relative z-10">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-textBase/70 leading-relaxed mb-6 relative z-10">
                  &ldquo;{t(`items.${key}.text`)}&rdquo;
                </p>
                <div className="pt-4 border-t border-accent/10 relative z-10">
                  <p className="text-accent text-xs font-sans uppercase tracking-wider mb-1">{t('pieceLabel')}</p>
                  <p className="font-serif text-textBase text-sm">{t(`items.${key}.product`)}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-sans rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-4 md:px-8 py-5 md:py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg mb-8">
          <Shield className="w-6 h-6 text-accent" />
          <div className="text-left">
            <p className="font-serif text-textBase">{t('satisfactionTitle')}</p>
            <p className="text-textBase/60 text-sm">{t('satisfactionText')}</p>
          </div>
        </div>

        <p className="text-textBase/60 mb-4">{t('nextStory')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/5491186371242"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
          >
            <FaWhatsapp className="w-5 h-5" />
            {t('writeWhatsApp')}
          </a>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 border border-accent/30 text-accent rounded-sm hover:bg-accent/10 transition-colors font-sans"
          >
            {t('viewCatalog')}
            <Sparkles className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
