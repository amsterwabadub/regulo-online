import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IconArrowRight } from './Icons';

export interface ToolCardProps {
  href: string;
  name: string;
  description: string;
  /** Supplied illustrated tile from the Kenya asset pack. */
  iconSrc: string;
  ctaLabel?: string;
}

export default function ToolCard({
  href,
  name,
  description,
  iconSrc,
  ctaLabel = 'Calculate now',
}: ToolCardProps) {
  return (
    <li>
      <Link href={href} className="rg-tool">
        {/* Decorative: the card's own name already labels the destination. */}
        <Image className="rg-tool__icon" src={iconSrc} alt="" width={72} height={72} />
        <span className="rg-tool__name">{name}</span>
        <span className="rg-tool__desc">{description}</span>
        <span className="rg-tool__cta">
          {ctaLabel}
          <IconArrowRight size={14} />
        </span>
      </Link>
    </li>
  );
}
