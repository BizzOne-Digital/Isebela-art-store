'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, Sparkles, Heart, PenTool, Truck, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

const stepIcons = { idea: Sparkles, design: PenTool, creation: Heart, delivery: Truck } as const;

const CustomOrderSection = () => {
  const t = useTranslations('customOrder');
  const stepKeys: Array<keyof typeof stepIcons> = ['idea', 'design', 'creation', 'delivery'];

  const emailBody = t('emailBody');
  const mailtoHref = `mailto:isadoug01@gmail.com?subject=${encodeURIComponent(t('emailSubject'))}&body=${encodeURIComponent(emailBody)}`;
  const whatsappHref = `https://wa.me/5491186371242?text=${encodeURIComponent(t('whatsappPrefill'))}`;

  return (
    <section id="custom-orders" className="px-6 max-w-7xl mx-auto py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-16"
      >
        <span className="text-accent text-sm font-sans tracking-widest uppercase mb-2 block">{t('eyebrow')}</span>
        <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-6">
          {t('titleStart')} <span className="text-primary">{t('titleAccent')}</span>?
        </h2>
        <p className="text-textBase/60 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          {t('description')}
        </p>
        <div className="inline-flex items-center gap-4 px-4 md:px-8 py-4 bg-surfaceAlt/50 border border-accent/20 rounded-lg">
          <Sparkles className="w-6 h-6 text-accent" />
          <div className="text-left">
            <p className="font-serif text-textBase">{t('fullCustomization')}</p>
            <p className="text-textBase/60 text-sm">{t('colorSizesThemes')}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
      >
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="p-8 bg-surfaceAlt/50 border border-accent/20 relative overflow-hidden"
          >
            <span className="absolute top-4 left-4 text-accent text-2xl">┌</span>
            <span className="absolute bottom-4 right-4 text-accent text-2xl">┘</span>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-textBase mb-3">{t('whatsappTitle')}</h3>
                <p className="text-textBase/60 leading-relaxed mb-4">
                  {t('whatsappText')}
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t('whatsappButton')}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-surfaceAlt/50 border border-accent/20 relative overflow-hidden"
          >
            <span className="absolute top-4 left-4 text-accent text-2xl">┌</span>
            <span className="absolute bottom-4 right-4 text-accent text-2xl">┘</span>
            <div className="relative z-10 flex items-start gap-4">
              <div className="w-14 h-14 rounded-sm bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <PenTool className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-serif text-textBase mb-3">{t('emailTitle')}</h3>
                <p className="text-textBase/60 leading-relaxed mb-4">
                  {t('emailText')}
                </p>
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-secondary/30 text-secondary rounded-sm hover:bg-secondary/10 transition-colors font-sans text-sm"
                >
                  <PenTool className="w-5 h-5" />
                  {t('emailButton')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-accent/20 bg-surfaceAlt relative shadow-xl">
            <Image
              src="/images/img/is18.jpg"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary/90 backdrop-blur-md text-white text-xs font-sans rounded-full flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              {t('imageBadge')}
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-surface/95 backdrop-blur-md border border-accent/20 rounded-lg">
              <p className="text-textBase/85 text-sm leading-relaxed italic text-center">
                &ldquo;{t('quote')}&rdquo;
              </p>
              <p className="text-primary font-medium text-sm mt-3 font-sans text-center">{t('quoteAttribution')}</p>
            </div>
          </div>
        </motion.div>

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-20 relative z-10"
      >
        <h3 className="text-3xl font-serif text-textBase text-center mb-12">{t('howItWorksTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stepKeys.map((key, index) => {
            const Icon = stepIcons[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                className="group p-6 border border-accent/10 bg-surfaceAlt/30 hover:border-primary/30 hover:bg-surfaceAlt/50 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-sm bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-serif text-textBase mb-2">{index + 1}. {t(`steps.${key}.title`)}</h4>
                <p className="text-textBase/60 text-sm leading-relaxed">{t(`steps.${key}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-4 md:px-8 py-5 md:py-6 bg-surfaceAlt/50 border border-accent/20 rounded-lg " >
          <Shield className="w-6 h-6 text-accent" />
          <div className="text-left">
            <p className="font-serif text-textBase">{t('satisfactionTitle')}</p>
            <p className="text-textBase/60 text-sm">{t('satisfactionText')}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CustomOrderSection;
