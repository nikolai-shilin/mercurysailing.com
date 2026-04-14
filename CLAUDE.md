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
```

## Architecture

App Router project under `app/`. No `pages/` directory. All routing is file-based under `app/`.

- `app/layout.tsx` — root layout with Geist font variables
- `app/page.tsx` — home page
- `app/globals.css` — global styles
- `app/page.module.css` — page-scoped CSS module

ESLint uses flat config (`eslint.config.mjs`), not `.eslintrc`.

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
