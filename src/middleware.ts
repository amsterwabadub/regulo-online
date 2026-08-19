import { NextRequest, NextResponse } from 'next/server';

/**
 * Passes the request path through to the root layout so it can declare the right
 * `lang` on <html>.
 *
 * Every page on this domain was served as lang="en", including the Spanish
 * Mexican and Colombian calculators and the French Moroccan one. A page whose
 * text is Spanish but whose document declares English is giving Google a
 * contradictory language signal in a market where language is the whole targeting
 * story, and the root layout is the only place <html> is rendered.
 */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set('x-regulo-path', request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|webp|txt|xml)$).*)'],
};
