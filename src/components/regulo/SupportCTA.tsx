import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IconArrowRight, IconCheck } from './Icons';

interface SupportCTAProps {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Country support artwork. Defaults to the Kenya duo. */
  imageSrc?: string;
}

/**
 * Contextual support slot, placed after the user has already received value.
 *
 * This is the structural home for a future expert-help / advisory / partner
 * integration. Until such a partnership is actually configured, it points at
 * our own explanatory content rather than naming a provider we do not have —
 * no invented specialists, availability, phone numbers or certifications. The
 * illustration is geometric for the same reason: warmth without implying
 * photographs of staff we do not employ.
 */
export default function SupportCTA({
  eyebrow,
  title,
  body,
  points,
  ctaLabel,
  ctaHref,
  imageSrc = '/ke/support-team.webp',
}: SupportCTAProps) {
  return (
    <aside className="rg-support">
      <div className="rg-support__art">
        <Image
          src={imageSrc}
          alt=""
          width={860}
          height={610}
          sizes="(max-width: 1024px) 60vw, 280px"
        />
      </div>

      <div className="rg-support__body">
        <p className="rg-support__eyebrow">{eyebrow}</p>
        <h2 className="rg-support__title">{title}</h2>
        <p className="rg-support__text">{body}</p>

        <ul className="rg-support__points">
          {points.map((point) => (
            <li key={point}>
              <IconCheck size={17} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link href={ctaHref} className="rg-btn rg-btn--accent rg-btn--lg">
        {ctaLabel}
        <IconArrowRight />
      </Link>
    </aside>
  );
}
