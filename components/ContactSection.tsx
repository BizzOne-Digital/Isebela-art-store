'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, MessageSquare, Sparkles, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSection = () => {
  const t = useTranslations('contact');
  const tValidation = useTranslations('validation');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({ name: false, email: false, subject: false, message: false });

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    const trimmed = value.trim();
    switch (name) {
      case 'name':
        if (!trimmed) return tValidation('requiredName');
        if (trimmed.length < 2) return tValidation('minLengthName');
        break;
      case 'email':
        if (!trimmed) return tValidation('requiredEmail');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return tValidation('validEmail');
        break;
      case 'subject':
        if (!trimmed) return tValidation('requiredSubject');
        break;
      case 'message':
        if (!trimmed) return tValidation('requiredMessage');
        if (trimmed.length < 10) return tValidation('minLengthMessage');
        break;
    }
    return undefined;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, value);
    setErrors(prev => ({ ...prev, [fieldName]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;
    const trimmed = value.trim();
    setFormData(prev => ({ ...prev, [fieldName]: trimmed }));
    if (touched[fieldName]) {
      const error = validateField(fieldName, trimmed);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    const fields: (keyof FormData)[] = ['name', 'email', 'subject', 'message'];
    fields.forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setStatus('submitting');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTouched({ name: false, email: false, subject: false, message: false });
    } catch {
      setStatus('error');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setTouched({ name: false, email: false, subject: false, message: false });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('info.email.title'),
      value: 'isadoug01@gmail.com',
      href: 'mailto:isadoug01@gmail.com',
      desc: t('info.email.desc'),
    },
    {
      icon: FaWhatsapp,
      title: t('info.whatsapp.title'),
      value: '+54 9 11 8637-1242',
      href: 'https://wa.me/5491186371242',
      desc: t('info.whatsapp.desc'),
    },
    {
      icon: MapPin,
      title: t('info.location.title'),
      value: t('info.location.value'),
      href: '#',
      desc: t('info.location.desc'),
    },
    {
      icon: FaInstagram,
      title: t('info.instagram.title'),
      value: '@isabel.creando.arte',
      href: 'https://instagram.com',
      desc: t('info.instagram.desc'),
    },
  ];

  const renderFieldError = (fieldName: keyof FormData) => {
    const error = errors[fieldName];
    const isTouched = touched[fieldName];
    if (error && isTouched && status !== 'success') {
      return (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-secondary text-xs font-sans mt-1.5"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </motion.p>
      );
    }
    return null;
  };

  const getInputClassName = (fieldName: keyof FormData) => {
    const hasError = errors[fieldName] && touched[fieldName] && status !== 'success';
    return `w-full bg-surface p-3 transition-colors text-textBase placeholder:text-textBase/40 ${
      hasError
        ? 'border-secondary focus:border-secondary focus:ring-1 focus:ring-secondary'
        : 'border-accent/20 focus:border-primary focus:ring-1 focus:ring-primary'
    }`;
  };

  return (
    <section id="contacto" className="px-6 max-w-7xl mx-auto py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative z-10 mb-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="text-accent text-sm font-sans tracking-widest uppercase mb-4 block">{t('eyebrow')}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-textBase mb-6">
              {t('titleStart')}
              <br />
              <span className="text-secondary">{t('titleAccent')}</span>
            </h2>
            <p className="text-textBase/60 text-lg mb-8 leading-relaxed">
              {t('description')}
            </p>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="flex items-start gap-4 p-4 border border-accent/10 bg-surfaceAlt/30 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-textBase mb-1">{item.title}</h4>
                    <a
                      href={item.href}
                      className="text-accent hover:text-primary transition-colors font-sans"
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {item.value}
                    </a>
                    <p className="text-textBase/50 text-sm mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surfaceAlt/50 border border-accent/20 p-6 md:p-8 relative overflow-hidden"
          >
            <span className="absolute top-4 left-4 text-accent text-2xl">┌</span>
            <span className="absolute bottom-4 right-4 text-accent text-2xl">┘</span>
            <h3 className="text-2xl font-serif text-textBase mb-6 relative z-10">{t('formTitle')}</h3>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 relative z-10"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h4 className="text-xl font-serif text-textBase mb-2">{t('successTitle')}</h4>
                <p className="text-textBase/60 mb-6">{t('successText')}</p>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 px-6 py-2.5 border border-accent/30 text-accent rounded-sm hover:bg-accent/10 transition-colors font-sans text-sm"
                >
                  {t('sendAnother')}
                  <Sparkles className="w-4 h-4" />
                </button>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 relative z-10"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="text-xl font-serif text-textBase mb-2">{t('errorTitle')}</h4>
                <p className="text-textBase/60 mb-6">{t('errorText')}</p>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans text-sm"
                >
                  {t('retry')}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-sans text-textBase/70 mb-1.5">
                      {t('nameLabel')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClassName('name')}
                      placeholder={t('namePlaceholder')}
                      disabled={status === 'submitting'}
                      autoComplete="name"
                    />
                    {renderFieldError('name')}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-sans text-textBase/70 mb-1.5">
                      {t('emailLabel')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClassName('email')}
                      placeholder={t('emailPlaceholder')}
                      disabled={status === 'submitting'}
                      autoComplete="email"
                    />
                    {renderFieldError('email')}
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-sans text-textBase/70 mb-1.5">
                    {t('subjectLabel')}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName('subject')}
                    disabled={status === 'submitting'}
                  >
                    <option value="">{t('subjectPlaceholder')}</option>
                    <option value="custom-order">{t('subjectOptions.customOrder')}</option>
                    <option value="wholesale">{t('subjectOptions.wholesale')}</option>
                    <option value="event">{t('subjectOptions.event')}</option>
                    <option value="collaboration">{t('subjectOptions.collaboration')}</option>
                    <option value="other">{t('subjectOptions.other')}</option>
                  </select>
                  {renderFieldError('subject')}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-sans text-textBase/70 mb-1.5">
                    {t('messageLabel')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${getInputClassName('message')} resize-none`}
                    placeholder={t('messagePlaceholder')}
                    disabled={status === 'submitting'}
                  />
                  {renderFieldError('message')}
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3 bg-primary text-white font-sans rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      {t('submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('submit')}
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-textBase/40">
                  {t('privacyNote')}
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 mt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Sparkles, title: t('features.customization.title'), desc: t('features.customization.desc') },
            { icon: Mail, title: t('features.directComm.title'), desc: t('features.directComm.desc') },
            { icon: Send, title: t('features.safeShipping.title'), desc: t('features.safeShipping.desc') },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center p-6 border border-accent/10 bg-surfaceAlt/30"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-sm bg-secondary/10 flex items-center justify-center">
                <item.icon className="w-7 h-7 text-secondary" />
              </div>
              <h4 className="font-serif text-textBase mb-2">{item.title}</h4>
              <p className="text-textBase/60 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
