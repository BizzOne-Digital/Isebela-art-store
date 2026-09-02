'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Heart, Shield, Star, Crown, Gift } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PageHeroImage from '@/components/PageHeroImage';

/** Hand-wrapped gifts and twine — what every tier is ultimately paying for. */
const PRICING_HERO_IMAGE =
  'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=2000&q=80';

const tierIcons = { catalog: Sparkles, custom: Heart, wholesale: Crown } as const;
const tierLinks = { catalog: '/products', custom: '/contact', wholesale: '/contact' } as const;
const processIcons = [Sparkles, Star, Check, Heart, Shield];

const PricingSection = () => {
  const t = useTranslations('pricing');

  const tierKeys: Array<keyof typeof tierIcons> = ['catalog', 'custom', 'wholesale'];
  const processKeys = ['conversation', 'proposal', 'approval', 'creation', 'delivery'] as const;

  return (
    <section id="precios" className="px-6 max-w-7xl mx-auto py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <PageHeroImage src={PRICING_HERO_IMAGE} priority className="mb-16">
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-4 block">{t('eyebrow')}</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6">
          {t('titleStart')}
          <br />
          <span className="text-primary-soft">{t('titleAccent')}</span>
        </h2>
        <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </PageHeroImage>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
      >
        {tierKeys.map((key, index) => {
          const Icon = tierIcons[key];
          const isPopular = key === 'custom';
          const tierHref = tierLinks[key];
          const features = t.raw(`tiers.${key}.features`) as string[];
          return (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1 }}
              className={`relative p-8 bg-surfaceAlt/50 border rounded-xl transition-all duration-300 ${
                isPopular
                  ? 'border-primary/50 shadow-[0_0_30px_rgba(107,33,168,0.15)]'
                  : 'border-accent/10 hover:border-primary/30'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-sans uppercase tracking-wider rounded-full">
                  {t('mostPopular')}
                </div>
              )}
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-serif text-textBase mb-2">{t(`tiers.${key}.name`)}</h3>
                <p className="text-textBase/60 text-sm">{t(`tiers.${key}.description`)}</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl md:text-5xl font-serif text-primary">{t(`tiers.${key}.price`)}</span>
                <p className="text-textBase/50 text-sm mt-1">{t(`tiers.${key}.period`)}</p>
              </div>
              <ul className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-textBase/70 text-sm">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={tierHref}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans text-sm transition-colors ${
                  isPopular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-accent/10 text-accent hover:bg-accent hover:text-white'
                }`}
              >
                {t(`tiers.${key}.cta`)}
                {tierHref === '/contact' && <Gift className="w-4 h-4" />}
              </Link>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-20 relative z-10"
      >
        <h3 className="text-3xl font-serif text-textBase text-center mb-12">{t('howItWorksTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {processKeys.map((key, index) => {
            const Icon = processIcons[index];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.08 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-serif font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-serif text-textBase mb-2">{t(`process.${key}.title`)}</h4>
                <p className="text-textBase/60 text-sm">{t(`process.${key}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-4 md:px-8 py-5 md:py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg mb-8">
          <Shield className="w-6 h-6 text-accent" />
          <div className="text-left">
            <p className="font-serif text-textBase">{t('satisfactionTitle')}</p>
            <p className="text-textBase/60 text-sm">{t('satisfactionText')}</p>
          </div>
        </div>

        <p className="text-textBase/60 mb-4">{t('closingQuestion')}</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
        >
          <Star className="w-5 h-5" />
          {t('freeAdvice')}
        </Link>
      </motion.div>
    </section>
  );
};

export default PricingSection;
