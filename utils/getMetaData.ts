import type { Locale } from 'lib/i18n';
import type { Metadata } from 'next/types';

const SITE_URL  = 'https://wildworkation.com';
const SITE_NAME = 'Wild Workation';
const FALLBACK_OG_IMAGE = `${SITE_URL}/bg-social-wild-workation.jpg`;

const DEFAULT_DESCRIPTION =
  'Yacht workations in the Mediterranean — work remotely from a sailing catamaran in Turkey, Greece, Croatia, Montenegro, or Thailand. For remote workers and digital nomads.';


/**
 * Resize a Sanity CDN image to 1200×630 for social sharing.
 * For non-Sanity URLs the original URL is returned unchanged.
 */
function toOgImageUrl(url: string): string {
  if (!url.includes('cdn.sanity.io')) return url;
  const base = url.split('?')[0];
  return `${base}?w=1200&h=630&fit=crop&auto=format`;
}

/**
 * Strip the brand suffix from a title so og:title stays punchy.
 * og:site_name already provides brand context on most platforms.
 * Example: "Sailing Workations | Wild Workation" → "Sailing Workations"
 */
function toOgTitle(title: string): string {
  return title.replace(/\s*\|\s*Wild Workation\s*$/i, '').trim();
}

/**
 * Centralised metadata factory for all pages.
 *
 * @param locale      - 'en' | 'ru'
 * @param title       - Page title. May already contain "| Wild Workation" — the
 *                      function appends it only when absent.
 * @param description - Page description (plain text).
 * @param keywords    - Additional comma-separated keywords.
 * @param image       - Sanity CDN URL or absolute URL of the share image.
 * @param _theme      - Visual theme (kept for backwards compat, unused here).
 * @param path        - Path relative to locale root, e.g. '/cruises/adriatic'.
 *                      Pass '/' for the home page. Omit to skip canonical/hreflang.
 * @param noIndex     - true → robots: noindex (for transactional/private pages).
 * @param ogType      - OpenGraph type (default 'website').
 */
export function getMetaData(
  locale: Locale,
  title?: string,
  description?: string,
  keywords?: string,
  image?: string,
  _theme = 'black',
  path?: string,
  noIndex?: boolean,
  ogType: 'website' | 'article' = 'website',
): Metadata {
  // Append site name only when the title doesn't already contain it,
  // preventing the "… | Wild Workation | Wild Workation" double-append bug.
  const pageTitle = title
    ? title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
    : SITE_NAME;

  const pageDescription = description ?? DEFAULT_DESCRIPTION;

  // Canonical URL and hreflang alternates
  const normalizedPath = path === '/' ? '' : (path ?? '');
  const canonicalUrl =
    path != null ? `${SITE_URL}/${locale}${normalizedPath}` : undefined;

  // OG image: resize Sanity images to 1200×630; fall back to brand image
  const rawImage  = image || FALLBACK_OG_IMAGE;
  const ogImageUrl = toOgImageUrl(rawImage);

  const ogImage = [
    {
      url:       ogImageUrl,
      secureUrl: ogImageUrl,
      type:      ogImageUrl.includes('.png') ? 'image/png' : 'image/jpeg',
      width:     1200,
      height:    630,
      alt:       toOgTitle(pageTitle),   // concise alt, no brand suffix
    },
  ];

  // og:title: strip brand suffix — og:site_name provides brand context on
  // Facebook, LinkedIn, Slack. Keeps the title punchy and under 60 chars.
  const ogTitle = toOgTitle(pageTitle);

  return {
    title: { absolute: pageTitle },
    description: pageDescription,
    keywords: [
      keywords,
      'wild workation',
      'yacht workation',
      'sailing workation',
      'workation Mediterranean',
      'remote work on yacht',
      'workation cruise',
      'digital nomad sailing',
    ]
      .filter(Boolean)
      .join(', '),
    ...(noIndex && { robots: { index: false, follow: true } }),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
        languages: {
          en: `${SITE_URL}/en${normalizedPath}`,
          ru: `${SITE_URL}/ru${normalizedPath}`,
          'x-default': `${SITE_URL}/en${normalizedPath}`,
        },
      },
    }),
    openGraph: {
      title:           ogTitle,
      description:     pageDescription,
      images:          ogImage,
      locale:          locale === 'en' ? 'en_US' : 'ru_RU',
      alternateLocale: [locale === 'en' ? 'ru_RU' : 'en_US'],
      siteName:        SITE_NAME,
      type:            ogType,
      ...(canonicalUrl && { url: canonicalUrl }),
    },
    twitter: {
      card:        'summary_large_image',
      site:        '@wild_workation',
      creator:     '@wild_workation',
      title:       ogTitle,
      description: pageDescription,
      images:      [{ url: ogImageUrl, width: 1200, height: 630, alt: ogTitle }],
    },
  };
}
