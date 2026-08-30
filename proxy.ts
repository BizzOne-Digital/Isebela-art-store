import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Runs for the localized public site only — admin routes, API routes, and
  // static assets are excluded so the locale proxy never interferes with the
  // JWT-cookie admin auth/redirect flow.
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
};
