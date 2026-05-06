export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];

/** Strongly-typed localized string: `{ en: string; ru: string }` */
export type LocalizedText = Record<Locale, string>;

export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Prefix an internal path with locale (e.g. "/events" -> "/en/events") */
export function getPathWithLocale(path: string, locale: Locale): string {
  const pathname = path.startsWith('/') ? path : `/${path}`;

  if (pathname === '/') return `/${locale}`;
  return `/${locale}${pathname}`;
}

/** Get locale from pathname (e.g. "/en/events" -> "en") */
export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
  return isLocale(segment) ? segment : defaultLocale;
}

/** Replace locale in pathname (e.g. pathname="/en/events", "ru" -> "/ru/events") */
export function getLocalizedPath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return `/${locale}`;
  if (isLocale(segments[0])) {
    segments[0] = locale;
    return '/' + segments.join('/');
  }
  return `/${locale}${pathname.startsWith('/') ? pathname : '/' + pathname}`;
}
