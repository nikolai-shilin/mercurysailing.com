'use client';

import { usePathname } from 'next/navigation';
import { getLocaleFromPathname, getLocalizedPath } from './i18n';
import type { Locale } from './i18n';

export function useLocale(): Locale {
  const pathname = usePathname();
  return getLocaleFromPathname(pathname ?? '');
}

export function useLocalizedPath(): (locale: Locale) => string {
  const pathname = usePathname();
  return (locale: Locale) => getLocalizedPath(pathname ?? '', locale);
}
