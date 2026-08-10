'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ReguloLogo from './ReguloLogo';
import { IconMenu, IconClose, IconChevronDown } from './Icons';

export interface NavItem {
  label: string;
  href: string;
}

interface CountryHeaderProps {
  /** Country home, used as the brand link so the country product stays self-contained. */
  homeHref: string;
  countryName: string;
  flag: string;
  nav: NavItem[];
  ctaLabel: string;
  /** In-page anchor to the calculator, or a route. */
  ctaHref: string;
}

export default function CountryHeader({
  homeHref,
  countryName,
  flag,
  nav,
  ctaLabel,
  ctaHref,
}: CountryHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="rg-header">
      <div className="rg-shell">
        <div className="rg-header__inner">
          <Link href={homeHref} className="rg-brand" aria-label={`Regulo ${countryName} — home`}>
            <ReguloLogo size={32} />
          </Link>

          <nav className="rg-header__nav" aria-label="Primary">
            {nav.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="rg-header__actions">
            <span className="rg-country-pill">
              <span aria-hidden="true">{flag}</span>
              {countryName}
            </span>

            <Link href={ctaHref} className="rg-btn rg-btn--primary">
              {ctaLabel}
            </Link>

            <button
              type="button"
              className="rg-header__burger"
              aria-expanded={open}
              aria-controls="rg-mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        <nav
          id="rg-mobile-nav"
          className={`rg-header__drawer${open ? ' rg-header__drawer--open' : ''}`}
          aria-label="Mobile"
        >
          {nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link
            href={ctaHref}
            className="rg-btn rg-btn--primary"
            style={{ marginTop: 12 }}
            onClick={() => setOpen(false)}
          >
            {ctaLabel}
            <IconChevronDown size={0} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
