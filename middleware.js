import { NextResponse } from 'next/server'

const SUBDOMAIN_MAP = {
  'modern-team':  '/modern-team',
  'luxury-agent': '/luxury-agent',
}

export function middleware(request) {
  const hostname = request.headers.get('host') ?? ''
  // Extract subdomain — works for modern-team.chavbuilds.com and local preview
  const subdomain = hostname.split('.')[0]
  const templateBase = SUBDOMAIN_MAP[subdomain]

  if (!templateBase) return NextResponse.next()

  const { pathname, search } = request.nextUrl

  // Already prefixed — don't double-rewrite
  if (pathname.startsWith(templateBase)) return NextResponse.next()

  const rewritten = new URL(`${templateBase}${pathname}${search}`, request.url)
  return NextResponse.rewrite(rewritten)
}

export const config = {
  // Run on all routes except Next.js internals and static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
