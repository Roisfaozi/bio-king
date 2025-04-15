import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { NextResponse } from 'next/server';

const defaultLocale = 'en';
const locales = ['bn', 'en', 'ar'];

// Get the preferred locale, similar to above or using a library
function getLocale(request: Request) {
  const acceptedLanguage = request.headers.get('accept-language') ?? undefined;
  const headers = { 'accept-language': acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale); // -> 'en-US'
}

export function middleware(request: any) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Skip processing for API routes and invalid URLs
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    try {
      // Ensure pathname starts with a slash
      const cleanPathname = pathname.startsWith('/')
        ? pathname
        : `/${pathname}`;
      const newUrl = new URL(
        `/${locale}${cleanPathname}`,
        request.nextUrl.origin,
      );

      return NextResponse.redirect(newUrl);
    } catch (error) {
      console.error('URL construction error:', error);
      // If URL construction fails, continue without redirect
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    //"/((?!api|assets|.*\\..*|_next).*)",
    '/((?!assets|docs|.*\\..*|_next).*)',
    // Optional: only run on root (/) URL
  ],
};
