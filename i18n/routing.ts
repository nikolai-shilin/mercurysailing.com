// i18n/routing.ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ru'] as const,
  defaultLocale: 'en',
  localePrefix: 'always', // both /en/ and /ru/ are always prefixed — no bare default URL
})

export type Locale = (typeof routing.locales)[number]
