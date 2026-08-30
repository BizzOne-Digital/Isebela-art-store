'use server';

import { cookies } from 'next/headers';
import { routing, type AppLocale } from '@/i18n/routing';

export async function setAdminLocale(locale: AppLocale) {
  if (!(routing.locales as readonly string[]).includes(locale)) {
    return;
  }
  const cookieStore = await cookies();
  cookieStore.set('NEXT_LOCALE', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
}
