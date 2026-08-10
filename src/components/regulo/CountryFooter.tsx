import React from 'react';
import Link from 'next/link';
import ReguloLogo from './ReguloLogo';
import { IconLock } from './Icons';

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

interface CountryFooterProps {
  homeHref: string;
  countryName: string;
  flag: string;
  tagline: string;
  columns: FooterColumn[];
  /** Factual disclaimer — never a trust claim we cannot support. */
  disclaimer: string;
  /** Localised privacy line. Defaults to the English original. */
  privacyNote?: string;
}

export default function CountryFooter({
  homeHref,
  countryName,
  flag,
  tagline,
  columns,
  disclaimer,
  privacyNote = 'Calculations run in your browser.',
}: CountryFooterProps) {
  return (
    <footer className="rg-footer">
      <div className="rg-shell">
        <div className="rg-footer__grid">
          <div>
            <Link href={homeHref} className="rg-brand" aria-label={`Regulo ${countryName} — home`}>
              <ReguloLogo size={28} />
            </Link>
            <p className="rg-footer__desc">{tagline}</p>
            <p
              className="rg-footer__desc"
              style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}
            >
              <IconLock size={18} />
              {privacyNote}
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="rg-footer__col">
              <h2>{col.heading}</h2>
              <ul className="rg-footer__links">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rg-footer__bottom">
          <span>© {new Date().getFullYear()} Regulo. All rights reserved.</span>
          <span>
            <span aria-hidden="true">{flag}</span> {countryName}
          </span>
        </div>

        <p className="rg-footer__disclaimer">{disclaimer}</p>
      </div>
    </footer>
  );
}
