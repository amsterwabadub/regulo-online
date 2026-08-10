import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Heading level, so page outline stays correct wherever this is dropped in. */
  as?: 'h2' | 'h3';
  id?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = 'h2',
  id,
}: SectionHeadingProps) {
  return (
    <div className="rg-section-heading">
      {eyebrow && <p className="rg-eyebrow">{eyebrow}</p>}
      <Tag id={id}>{title}</Tag>
      {subtitle && <p className="rg-section-heading__sub">{subtitle}</p>}
    </div>
  );
}
