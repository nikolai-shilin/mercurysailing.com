# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack by default)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npx next typegen # Generate type helpers for async params/searchParams
npx sanity dev   # Run Sanity Studio standalone (also available at /studio in Next.js dev)
npx sanity schema deploy  # Deploy schema changes to Sanity
```

## Architecture

App Router project under `app/`. No `pages/` directory. All routing is file-based under `app/`.

- `app/layout.tsx` — root layout with Geist font variables
- `app/page.tsx` — home page
- `app/studio/[[...tool]]/page.tsx` — embedded Sanity Studio (catch-all route, force-static)

ESLint uses flat config (`eslint.config.mjs`), not `.eslintrc`.

### Sanity CMS

Sanity is integrated via `next-sanity` with the Studio embedded at `/studio`.

- `sanity.config.ts` — Studio config (plugins, schema, structure), mounted at `/studio`
- `sanity.cli.ts` — CLI config (reads `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`)
- `sanity/env.ts` — exports `projectId`, `dataset`, `apiVersion` from env vars
- `sanity/schemaTypes/index.ts` — document type definitions (add new types here)
- `sanity/structure.ts` — Studio sidebar structure
- `sanity/lib/client.ts` — `createClient` from `next-sanity`, CDN enabled
- `sanity/lib/live.ts` — exports `sanityFetch` and `SanityLive` for Live Content API; render `<SanityLive />` in root layout to enable real-time updates
- `sanity/lib/image.ts` — exports `urlFor(source)` helper using `@sanity/image-url`

**Localized fields:** Use `localizedString` / `localizedText` from `sanity/schemaTypes/locale.ts` for translatable fields:
```ts
import { localizedString } from '../schemaTypes/locale'
defineField({ name: 'title', title: 'Title', ...localizedString })
```

**GROQ locale pattern:** Pass `$locale` as a query param and project with `"field": field[$locale]`:
```ts
const data = await sanityFetch({ query: QUERY, params: { locale } })
```
```groq
*[_type == "page"][0] { "title": title[$locale] }
```

**Required env vars:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=   # optional, defaults to today's date
```

**Data fetching pattern:** use `sanityFetch` (not the raw client) in Server Components for automatic live updates. Add `<SanityLive />` to `app/layout.tsx`.

## Next.js 16 Breaking Changes

This is Next.js **16.2.3** — not 15 or 14. Key differences:

**Async Request APIs (fully async — no sync fallback):**
- `cookies()`, `headers()`, `draftMode()` must be awaited
- `params` and `searchParams` in `page.tsx`, `layout.tsx`, `route.ts` etc. must be awaited
- Run `npx next typegen` to generate `PageProps`/`LayoutProps`/`RouteContext` type helpers

**Routing:**
- `middleware.ts` is now `proxy.ts` — the `middleware` convention is deprecated

**Caching:**
- `revalidateTag(tag)` now requires a second `cacheLife` profile argument: `revalidateTag('posts', 'max')`
- For immediate expiration use `updateTag()` in Server Actions instead of `revalidateTag`
- New cache primitives: `cacheLife`, `cacheTag`, `refresh`

**Images:**
- Local images with query strings are a breaking change
- `minimumCacheTTL`, `imageSizes`, `qualities` defaults changed
- `images.domains` config is deprecated — use `remotePatterns`
- `next/legacy/image` is deprecated

**Other:**
- Turbopack is the default bundler in `next dev`; opt out with `next dev --no-turbopack`
- Parallel Routes `default.js` is now required
