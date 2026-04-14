// proxy.ts
import createMiddleware from 'next-intl/middleware'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const handler = createMiddleware(routing)

export function proxy(request: NextRequest) {
  return handler(request)
}

export const config = {
  matcher: [
    '/((?!studio|api|_next/static|_next/image|favicon.ico).*)',
  ],
}
