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
