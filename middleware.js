import { NextResponse } from 'next/server'

// No subdomain routing — templates are served at /modern-team and /luxury-agent
// under a single domain (re-templates.chavbuilds.com)
export function middleware(request) {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
