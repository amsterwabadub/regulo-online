'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MARKET_OFFERS } from '@/config/offers';
import { trackGA4Event } from '@/lib/analytics';

/**
 * The first measurable commercial surface, shown after the calculator result.
 *
 * When no real offer exists for the market the component still renders and still
 * emits `commercial_cta_view`, so demand can be measured before a partner is
 * signed — but it is deliberately NOT a link and promises nothing. No partner is
 * named, no callback is implied, and no personal data is collected anywhere.
 */
export default function CommercialCTA({
  market,
  calculatorId,
  pagePath,
}: {
  market: 'ke' | 'mx' | 'co' | 'ma';
  calculatorId: string;
  pagePath: string;
}) {
  const offer = MARKET_OFFERS[market];
  const ref = useRef<HTMLDivElement | null>(null);
  const [viewed, setViewed] = useState(false);

  const dims = {
    country: market,
    calculator_id: calculatorId,
    page_path: pagePath,
    calculator_type: 'tax_payroll',
    market: market.toUpperCase(),
    landing_page: pagePath,
    offer_state: offer.enabled ? 'live' : 'waiting_for_offer',
  };

  // Fire once, when the CTA actually enters the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el || viewed) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setViewed(true);
          trackGA4Event('commercial_cta_view', dims);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewed, market, pagePath]);

  const onClick = () => {
    trackGA4Event('commercial_cta_click', dims);
    if (offer.enabled && offer.url) {
      trackGA4Event('affiliate_redirect', { ...dims, destination_host: safeHost(offer.url) });
    }
  };

  return (
    <div className="rg-commercial" ref={ref}>
      <p className="rg-commercial__blurb">{offer.blurb}</p>

      {offer.enabled && offer.url ? (
        <a
          className="rg-btn rg-btn--primary"
          href={offer.url}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          onClick={onClick}
        >
          {offer.label}
        </a>
      ) : (
        <>
          <button type="button" className="rg-btn rg-btn--outline" onClick={onClick}>
            {offer.label}
          </button>
          <p className="rg-commercial__pending" role="status">
            {offer.pendingNote}
          </p>
        </>
      )}
    </div>
  );
}

function safeHost(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return 'invalid_url';
  }
}
