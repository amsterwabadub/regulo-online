import React from 'react';
import Image from 'next/image';
import { IconCheck, IconShieldCheck } from './Icons';

interface TrustSectionProps {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  badgeTitle: string;
  badgeText: string;
}

/**
 * Local information / trust panel.
 *
 * Every claim here is factual and verifiable against the calculation config —
 * no user counts, ratings, testimonials, certifications or implied government
 * affiliation. The visual reference carried a "trusted by thousands" line;
 * that is an unsupported claim and is intentionally not reproduced.
 */
export default function TrustSection({
  eyebrow,
  title,
  body,
  points,
  badgeTitle,
  badgeText,
}: TrustSectionProps) {
  return (
    <div className="rg-trust">
      <div>
        <p className="rg-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p style={{ marginTop: 16, color: 'var(--rg-text-muted)', maxWidth: 440 }}>{body}</p>
        <ul className="rg-trust__list">
          {points.map((point) => (
            <li key={point}>
              <IconCheck size={18} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rg-trust__art">
        <Image
          src="/ke/trust-nairobi.webp"
          alt="Nairobi landmarks — the Nairobi Expressway, KICC and Parliament"
          width={1100}
          height={583}
          sizes="(max-width: 1024px) 92vw, 46vw"
        />
        <div className="rg-trust__badge">
          <span style={{ color: 'var(--rg-primary)', flexShrink: 0 }}>
            <IconShieldCheck size={22} />
          </span>
          <span>
            <span className="rg-trust__badge-title">{badgeTitle}</span>
            <span className="rg-trust__badge-text" style={{ display: 'block' }}>
              {badgeText}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
