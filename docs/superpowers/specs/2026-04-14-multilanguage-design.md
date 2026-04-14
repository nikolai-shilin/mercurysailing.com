# Multilanguage Support — Design Spec

**Date:** 2026-04-14  
**Status:** Approved

## Overview

Add English and Russian language support to mercurysailing.com using `next-intl` for routing and UI strings, with field-level translations in Sanity.

## Decisions

| Concern | Decision |
|---|---|
| Languages | English (default), Russian |
| URL structure | `/en/...` and `/ru/...` — both prefixed, symmetric |
| Routing library | `next-intl` |
| Sanity translation model | Field-level (`{ en, ru }` objects per translatable field) |
| Studio UX | `@sanity/language-filter` plugin to toggle language in editor |

## Section 1: Routing & File Structure

All app routes move under an `[locale]` dynamic segment. The Studio catch-all stays outside it.

```
app/
  [locale]/
    layout.tsx       ← locale-aware root layout, sets <html lang>, wraps NextIntlClientProvider
    page.tsx         ← home page
    ...              ← all future pages live here
  studio/
    [[...tool]]/
      page.tsx       ← unchanged
```

**Middleware** (`proxy.ts`): uses `next-intl`'s `createMiddleware()` to detect locale from URL → cookie → `Accept-Language` header and redirect bare `/` to `/en/`. Both locales are explicit in the URL.

`params` in all `[locale]` routes are `Promise<{ locale: string }>` — awaited per Next.js 16 async params requirement.

## Section 2: UI Strings (next-intl)

Message files at project root:

```
messages/
  en.json
  ru.json
```

Config files:

- `i18n/routing.ts` — exports `locales: ['en', 'ru']` and `defaultLocale: 'en'`
- `i18n/request.ts` — server-side config, loads `messages/${locale}.json`

Usage:
- Server Components: `const t = await getTranslations('namespace')`
- Client Components: `const t = useTranslations('namespace')`

Message keys are TypeScript-typed from the JSON shape. `[locale]/layout.tsx` wraps children in `NextIntlClientProvider`.

## Section 3: Sanity Schema

A shared helper in `sanity/schemaTypes/locale.ts`:

```ts
export const localizedString = {
  type: 'object',
  fields: [
    { name: 'en', type: 'string', title: 'English' },
    { name: 'ru', type: 'string', title: 'Russian' },
  ],
}

export const localizedText = {
  type: 'object',
  fields: [
    { name: 'en', type: 'text', title: 'English' },
    { name: 'ru', type: 'text', title: 'Russian' },
  ],
}
```

Schema types spread these helpers:

```ts
defineField({ name: 'title', title: 'Title', ...localizedString })
```

`@sanity/language-filter` plugin added to `sanity.config.ts` so editors can filter the Studio UI to one language at a time.

## Section 4: Data Fetching & GROQ

GROQ projections extract the right language server-side using a `$locale` parameter — no client-side unwrapping needed:

```groq
*[_type == "page"][0] {
  "title": title[$locale],
  "body": body[$locale]
}
```

Pages pass the locale as a GROQ param:

```ts
const { locale } = await params
const data = await sanityFetch({
  query: PAGE_QUERY,
  params: { locale },
})
```

Fetched data types are plain strings (`title: string`), not locale objects.

## Files to Create / Modify

| Action | Path |
|---|---|
| Create | `proxy.ts` |
| Create | `i18n/routing.ts` |
| Create | `i18n/request.ts` |
| Create | `messages/en.json` |
| Create | `messages/ru.json` |
| Move + modify | `app/layout.tsx` → `app/[locale]/layout.tsx` |
| Move + modify | `app/page.tsx` → `app/[locale]/page.tsx` |
| Create | `sanity/schemaTypes/locale.ts` |
| Modify | `sanity/schemaTypes/index.ts` |
| Modify | `sanity.config.ts` (add language-filter plugin) |
| Install | `next-intl`, `@sanity/language-filter` |
