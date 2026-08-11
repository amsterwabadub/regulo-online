'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

/**
 * Country product pages ship their own header, main and footer, because each
 * country is a self-contained product rather than a skin over a shared portal.
 *
 * These two gates hide the global chrome on those routes only — every other
 * route keeps the existing Header/<main>/Footer structure untouched.
 */
const SELF_CHROMED_ROUTES = new Set(['/ke', '/co', '/ma']);

function isSelfChromed(pathname: string | null) {
  return Boolean(pathname && SELF_CHROMED_ROUTES.has(pathname));
}

/** Renders the global Header/Footer everywhere except self-chromed routes. */
export default function GlobalChrome({ children }: { children: React.ReactNode }) {
  if (isSelfChromed(usePathname())) return null;
  return <>{children}</>;
}

/**
 * Wraps page content in the global <main> landmark, but steps aside on
 * self-chromed routes so they can declare their own — avoiding nested <main>
 * elements and banner/contentinfo landmarks trapped inside main.
 */
export function MainSlot({ children }: { children: React.ReactNode }) {
  if (isSelfChromed(usePathname())) return <>{children}</>;
  return <main>{children}</main>;
}
