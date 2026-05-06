import type { ImageLoaderProps } from 'next/image'

/**
 * Custom Next.js image loader for Sanity CDN images.
 *
 * Instead of fetching the full original (e.g. 5760×3840px) and having
 * Next.js resize it — which causes timeouts — we tell the Sanity CDN to
 * pre-size the image to the requested width. Next.js then receives a small
 * JPEG and converts it to AVIF/WebP as usual.
 *
 * Configured via `images.loaderFile` in next.config.ts.
 */
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src.includes('cdn.sanity.io')) return src

  const url = new URL(src)
  url.searchParams.set('w', width.toString())
  url.searchParams.set('q', (quality ?? 75).toString())
  url.searchParams.set('fit', 'max') // never upscale
  return url.toString()
}
