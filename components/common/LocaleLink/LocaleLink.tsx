'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getPathWithLocale, getLocaleFromPathname } from 'lib/i18n';

type LocaleLinkProps = React.ComponentProps<typeof Link> & {
  /** If true, href is treated as external (no locale prefix). Default: false for paths starting with / */
  external?: boolean;
};

/**
 * Link that prefixes internal paths with the current locale (e.g. /events -> /en/events).
 * Use for internal navigation so links work under /[lang]/.
 */
export function LocaleLink({ href, external, ...props }: LocaleLinkProps) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  if (external === true) {
    return <Link href={href} {...props} />;
  }

  const hrefStr =
    typeof href === 'string' ? href : (href && typeof href === 'object' && 'pathname' in href ? href.pathname : '') ?? '';
  const isInternal = hrefStr.startsWith('/') && !hrefStr.startsWith('//');
  const isTel = hrefStr.startsWith('tel:');
  const isMailto = hrefStr.startsWith('mailto:');

  if (!isInternal || isTel || isMailto) {
    return <Link href={href} {...props} />;
  }

  const localizedHref = getPathWithLocale(hrefStr, locale);
  return <Link href={localizedHref} {...props} />;
}
