import React from 'react';

/**
 * Regulo icon system.
 *
 * One coherent set: 24x24 bounding box, 1.8 stroke, round caps and joins,
 * no fills. Every icon depicts the concept it labels — there are no coloured
 * placeholder boxes anywhere in this system.
 */

export interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: 'false' as const,
});

/** Calculator — net salary tools */
export const IconCalculator = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="4" y="2" width="16" height="20" rx="3" />
    <rect x="7.5" y="5.5" width="9" height="4" rx="1" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);

/** Document with lines — tax / PAYE */
export const IconTaxDocument = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
    <path d="M14 2v5h5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);

/** Piggy/vault — pension & NSSF savings */
export const IconPension = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10M9.5 9.8c0-1.1 1.1-1.8 2.5-1.8s2.5.7 2.5 1.8-1.1 1.6-2.5 1.9-2.5.8-2.5 1.9 1.1 1.8 2.5 1.8 2.5-.7 2.5-1.8" />
  </svg>
);

/** Shield with cross — SHIF health insurance */
export const IconHealthShield = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z" />
    <path d="M12 8.5v6M9 11.5h6" />
  </svg>
);

/** House — Affordable Housing Levy */
export const IconHousing = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 11 12 4l9 7" />
    <path d="M5 10v10h14V10" />
    <rect x="10" y="14" width="4" height="6" />
  </svg>
);

/** Wallet — take-home pay */
export const IconWallet = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2" />
    <rect x="3" y="7" width="18" height="13" rx="2.5" />
    <circle cx="16.5" cy="13.5" r="1.4" />
  </svg>
);

/** Shield check — assurance / statutory accuracy */
export const IconShieldCheck = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 2 4 5v6c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V5z" />
    <path d="m9 11.5 2.2 2.2L15.5 9.5" />
  </svg>
);

/** Globe — 100% online */
export const IconGlobe = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.4 2.5 3.7 5.6 3.7 9S14.4 18.5 12 21c-2.4-2.5-3.7-5.6-3.7-9S9.6 5.5 12 3z" />
  </svg>
);

/** Person — no sign-up required */
export const IconNoSignup = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20a7 7 0 0 1 14 0" />
  </svg>
);

/** Refresh clock — kept current */
export const IconUpdated = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1" />
    <path d="M20.5 4v4.5H16" />
    <path d="M12 8v4.4l2.8 1.6" />
  </svg>
);

/** Scales — built on local law */
export const IconScales = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 3v18M7 21h10" />
    <path d="M4 8h16M4 8l-2.4 5.2a3.2 3.2 0 0 0 4.8 0zM20 8l-2.4 5.2a3.2 3.2 0 0 0 4.8 0z" />
    <path d="M12 3 4 8M12 3l8 5" />
  </svg>
);

/** Check in a circle — verified list items */
export const IconCheck = ({ size = 18, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.4 2.4 4.6-4.8" />
  </svg>
);

/** Headset — support slot */
export const IconSupport = ({ size = 28, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <rect x="2.5" y="13" width="4.5" height="6" rx="2" />
    <rect x="17" y="13" width="4.5" height="6" rx="2" />
    <path d="M20 19v.5a3 3 0 0 1-3 3h-3" />
  </svg>
);

/** Book — guides */
export const IconGuide = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5z" />
    <path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20" />
  </svg>
);

/** Lock — data stays in the browser */
export const IconLock = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="4.5" y="10" width="15" height="10.5" rx="2.5" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

export const IconChevronDown = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className} strokeWidth={2.2}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconArrowRight = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className} strokeWidth={2.2}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const IconPlus = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className} strokeWidth={2.4}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconMenu = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className} strokeWidth={2}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = ({ size = 22, className }: IconProps) => (
  <svg {...base(size)} className={className} strokeWidth={2}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconAlert = ({ size = 14, className }: IconProps) => (
  <svg {...base(size)} className={className} strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5M12 16h.01" />
  </svg>
);
