import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { routing, type AppLocale } from './routing';

function isAppLocale(value: string | undefined): value is AppLocale {
  return !!value && (routing.locales as readonly string[]).includes(value);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  let locale: AppLocale;
  if (isAppLocale(requested)) {
    locale = requested;
  } else {
    // Routes outside the `[locale]` segment (e.g. `/admin/**`) fall back to
    // the same `NEXT_LOCALE` cookie next-intl's own routing uses to persist
    // a visitor's locale choice, so both halves of the app share one system.
    const cookieLocale = (await cookies()).get('NEXT_LOCALE')?.value;
    locale = isAppLocale(cookieLocale) ? cookieLocale : routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
