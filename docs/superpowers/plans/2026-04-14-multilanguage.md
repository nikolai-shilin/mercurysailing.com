# Multilanguage Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add English and Russian language support with `/en/` and `/ru/` URL prefixes, next-intl routing, and field-level Sanity translations.

**Architecture:** All app pages move under `app/[locale]/`. `proxy.ts` (Next.js 16 middleware) detects and enforces locale in URLs. UI strings live in `messages/en.json` and `messages/ru.json`, served via next-intl. Sanity schemas use `{ en, ru }` field objects; GROQ projects the correct language using a `$locale` parameter.

**Tech Stack:** Next.js 16.2.3 (App Router), next-intl, @sanity/language-filter, Sanity v5

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install packages**

```bash
npm install next-intl @sanity/language-filter
```

- [ ] **Step 2: Verify packages were added to package.json**

```bash
grep -E "next-intl|language-filter" package.json
```

Expected: both packages appear in `dependencies`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install next-intl and @sanity/language-filter"
```

---

### Task 2: Create next-intl routing config

**Files:**
- Create: `i18n/routing.ts`

- [ ] **Step 1: Create `i18n/routing.ts`**

```ts
// i18n/routing.ts
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ru'] as const,
  defaultLocale: 'en',
})

export type Locale = (typeof routing.locales)[number]
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add i18n/routing.ts
git commit -m "feat: add next-intl routing config"
```

---

### Task 3: Create next-intl request config

**Files:**
- Create: `i18n/request.ts`

- [ ] **Step 1: Create `i18n/request.ts`**

```ts
// i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add i18n/request.ts
git commit -m "feat: add next-intl request config"
```

---

### Task 4: Create message files

**Files:**
- Create: `messages/en.json`
- Create: `messages/ru.json`

- [ ] **Step 1: Create `messages/en.json`**

```json
{
  "nav": {
    "home": "Home"
  }
}
```

- [ ] **Step 2: Create `messages/ru.json`**

```json
{
  "nav": {
    "home": "Главная"
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add messages/en.json messages/ru.json
git commit -m "feat: add initial en and ru message files"
```

---

### Task 5: Create proxy middleware

**Files:**
- Create: `proxy.ts`

- [ ] **Step 1: Create `proxy.ts`**

```ts
// proxy.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Match all paths except: studio, api, _next internals, and files with extensions
    '/((?!studio|api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add proxy.ts
git commit -m "feat: add next-intl proxy middleware for locale routing"
```

---

### Task 6: Add next-intl plugin to next.config.ts

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Update `next.config.ts`**

Replace the entire file with:

```ts
// next.config.ts
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  /* config options here */
}

export default withNextIntl(nextConfig)
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "feat: wrap next config with next-intl plugin"
```

---

### Task 7: Simplify root layout

The root `app/layout.tsx` must exist but must not render `<html>`/`<body>` since `app/[locale]/layout.tsx` will own those tags.

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `app/layout.tsx` with a passthrough**

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: simplify root layout to passthrough for locale routing"
```

---

### Task 8: Create locale layout

This replaces the full layout (html, body, fonts, metadata, NextIntlClientProvider).

**Files:**
- Create: `app/[locale]/layout.tsx`

- [ ] **Step 1: Create `app/[locale]/layout.tsx`**

```tsx
// app/[locale]/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '../../i18n/routing'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mercury Sailing',
  description: 'Mercury Sailing',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/layout.tsx
git commit -m "feat: add locale-aware layout with NextIntlClientProvider"
```

---

### Task 9: Move home page under [locale]

**Files:**
- Create: `app/[locale]/page.tsx`
- Delete: `app/page.tsx`

- [ ] **Step 1: Create `app/[locale]/page.tsx`**

```tsx
// app/[locale]/page.tsx
import Image from 'next/image'
import styles from '../page.module.css'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>To get started, edit the page.tsx file.</h1>
          <p>Locale: {locale}</p>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Delete `app/page.tsx`**

```bash
rm app/page.tsx
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Start dev server and manually verify**

```bash
npm run dev
```

Open in browser:
- `http://localhost:3000` → should redirect to `http://localhost:3000/en`
- `http://localhost:3000/en` → should show home page with "Locale: en"
- `http://localhost:3000/ru` → should show home page with "Locale: ru"
- `http://localhost:3000/studio` → should still show Sanity Studio

- [ ] **Step 5: Stop dev server and commit**

```bash
git add app/[locale]/page.tsx
git rm app/page.tsx
git commit -m "feat: move home page under [locale] dynamic segment"
```

---

### Task 10: Create Sanity locale field helpers

**Files:**
- Create: `sanity/schemaTypes/locale.ts`

- [ ] **Step 1: Create `sanity/schemaTypes/locale.ts`**

```ts
// sanity/schemaTypes/locale.ts
// Spread these into defineField calls for translatable fields.
// Example: defineField({ name: 'title', title: 'Title', ...localizedString })

export const localizedString = {
  type: 'object' as const,
  fields: [
    { name: 'en', type: 'string', title: 'English' },
    { name: 'ru', type: 'string', title: 'Russian' },
  ],
}

export const localizedText = {
  type: 'object' as const,
  fields: [
    { name: 'en', type: 'text', title: 'English' },
    { name: 'ru', type: 'text', title: 'Russian' },
  ],
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add sanity/schemaTypes/locale.ts
git commit -m "feat: add Sanity localized field helpers"
```

---

### Task 11: Export locale helpers from schema index

**Files:**
- Modify: `sanity/schemaTypes/index.ts`

- [ ] **Step 1: Update `sanity/schemaTypes/index.ts`**

```ts
// sanity/schemaTypes/index.ts
import { type SchemaTypeDefinition } from 'sanity'

export { localizedString, localizedText } from './locale'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [],
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add sanity/schemaTypes/index.ts
git commit -m "feat: export locale helpers from schema index"
```

---

### Task 12: Add language-filter plugin to Sanity Studio

**Files:**
- Modify: `sanity.config.ts`

- [ ] **Step 1: Update `sanity.config.ts`**

```ts
// sanity.config.ts
'use client'

import { visionTool } from '@sanity/vision'
import { languageFilter } from '@sanity/language-filter'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    languageFilter({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'ru', title: 'Russian' },
      ],
      defaultLanguages: ['en'],
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and verify Studio still loads**

```bash
npm run dev
```

Open `http://localhost:3000/studio` — should load without errors. The language filter toggle should be visible in the Studio toolbar.

- [ ] **Step 4: Stop dev server and commit**

```bash
git add sanity.config.ts
git commit -m "feat: add language-filter plugin to Sanity Studio"
```

---

### Task 13: Final build verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build completes without errors. Both `/en` and `/ru` routes should appear in the output.

- [ ] **Step 2: Update CLAUDE.md to document GROQ locale pattern**

Add a note under the Sanity section in `CLAUDE.md`:

```markdown
**GROQ locale pattern:** Pass `$locale` as a query param and project with `"field": field[$locale]`:
\`\`\`ts
const data = await sanityFetch({ query: QUERY, params: { locale } })
\`\`\`
\`\`\`groq
*[_type == "page"][0] { "title": title[$locale] }
\`\`\`
```

- [ ] **Step 3: Final commit**

```bash
git add CLAUDE.md
git commit -m "docs: document GROQ locale projection pattern in CLAUDE.md"
```
