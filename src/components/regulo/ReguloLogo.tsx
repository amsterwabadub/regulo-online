import React from 'react';

/**
 * The Regulo mark.
 *
 * Drawn from the supplied logo asset and the reference header: a folded-ribbon
 * "R" whose top-left fold carries the red accent while the body stays deep
 * green. It is vector rather than the supplied raster because that file is a
 * neon-glow render on black — it cannot be matted cleanly and would show as a
 * soft smudge at the 28–32px the header and footer actually use.
 *
 * Colour slots map to the country theme; the geometry never changes per
 * country. `tone="mono"` collapses it to a single-colour silhouette.
 */

interface ReguloMarkProps {
  size?: number;
  tone?: 'brand' | 'mono';
  title?: string;
}

export function ReguloMark({ size = 32, tone = 'brand', title }: ReguloMarkProps) {
  const body = tone === 'mono' ? 'currentColor' : 'var(--rg-primary, #065f46)';
  const fold = tone === 'mono' ? 'currentColor' : 'var(--rg-accent, #e11d2e)';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {/* Body — stem, bowl and leg, with the counter knocked out */}
      <path
        d="M8.6 3.4h10.1a7.3 7.3 0 0 1 2.3 14.2l5.2 11h-6.5l-4.8-10h-1.6v10H8.6V3.4Zm4.7 4.5v5.5h5.2a2.75 2.75 0 0 0 0-5.5h-5.2Z"
        fill={body}
        fillRule="evenodd"
        clipRule="evenodd"
      />
      {/* Fold — the red ribbon turning over the top-left corner */}
      <path d="M8.6 3.4h8.9l-4.6 5.7H8.6V3.4Z" fill={fold} />
    </svg>
  );
}

interface ReguloLogoProps {
  size?: number;
  tone?: 'brand' | 'mono';
  label?: string;
}

export default function ReguloLogo({ size = 32, tone = 'brand', label = 'Regulo' }: ReguloLogoProps) {
  return (
    <>
      <ReguloMark size={size} tone={tone} />
      <span className="rg-brand__word">{label}</span>
    </>
  );
}
