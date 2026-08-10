import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { KENYA_CALCULATOR_CONFIG } from '@/config/calculators/kenya';
import { PageSEO } from '@/types/calculator';
import StructuredData from '@/components/StructuredData';

import CountryHeader from '@/components/regulo/CountryHeader';
import CountryFooter from '@/components/regulo/CountryFooter';
import KenyaSalaryCalculator from '@/components/regulo/KenyaSalaryCalculator';
import SectionHeading from '@/components/regulo/SectionHeading';
import HowItWorks from '@/components/regulo/HowItWorks';
import ToolCard from '@/components/regulo/ToolCard';
import TrustSection from '@/components/regulo/TrustSection';
import SupportCTA from '@/components/regulo/SupportCTA';
import FAQAccordion, { FAQEntry } from '@/components/regulo/FAQAccordion';
import {
  IconUpdated,
  IconGlobe,
  IconNoSignup,
  IconScales,
  IconShieldCheck,
} from '@/components/regulo/Icons';

const CANONICAL = 'https://regulo.online/ke';

export const metadata: Metadata = {
  title: 'Kenya Net Salary Calculator — PAYE, SHIF, NSSF & Housing Levy',
  description:
    'Calculate your net salary in Kenya. Regulo applies current KRA PAYE bands, NSSF, SHIF and the Affordable Housing Levy to show your take-home pay and a full deduction breakdown.',
  keywords: [
    'kenya net salary calculator',
    'paye calculator kenya',
    'shif calculator',
    'nssf calculator kenya',
    'housing levy calculator',
    'take home pay kenya',
  ],
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: CANONICAL,
    siteName: 'Regulo',
    title: 'Kenya Net Salary Calculator — PAYE, SHIF, NSSF & Housing Levy',
    description:
      'Work out your Kenyan take-home pay with current KRA PAYE bands, NSSF, SHIF and the Affordable Housing Levy.',
  },
};

/* -------------------------------------------------------------------------- */
/* Content                                                                     */
/* -------------------------------------------------------------------------- */

const NAV = [
  { label: 'Tools', href: '#tools' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Guides', href: '/ke/net-salary-calculator' },
  { label: 'FAQ', href: '#faq' },
];

const FEATURES = [
  { label: '100% online', icon: <IconGlobe size={18} /> },
  { label: 'No sign-up', icon: <IconNoSignup size={18} /> },
  { label: 'Updated for 2026', icon: <IconUpdated size={18} /> },
  { label: 'Built for Kenyan rules', icon: <IconScales size={18} /> },
];

const STEPS = [
  {
    title: 'Enter your salary',
    text: 'Add your gross pay and choose whether it is monthly or annual.',
  },
  {
    title: 'We apply Kenyan rules',
    text: 'Current KRA PAYE bands, NSSF, SHIF and the Affordable Housing Levy.',
  },
  {
    title: 'See your take-home',
    text: 'Your net pay and a full deduction breakdown, calculated instantly.',
  },
];

/** Every card points at an existing Kenya route — no placeholder destinations. */
const TOOLS = [
  {
    href: '/ke/net-salary-calculator',
    name: 'Net salary',
    description: 'Take-home pay after all deductions.',
    iconSrc: '/ke/icon-net-salary.webp',
  },
  {
    href: '/ke/paye-calculator-kenya',
    name: 'PAYE',
    description: 'Your PAYE tax on current KRA bands.',
    iconSrc: '/ke/icon-paye.webp',
  },
  {
    href: '/ke/shif-calculator-kenya',
    name: 'SHIF',
    description: 'Health contributions, with tax relief.',
    iconSrc: '/ke/icon-shif.webp',
  },
  {
    href: '/ke/housing-levy-calculator-kenya',
    name: 'Housing Levy',
    description: 'The 1.5% levy on your gross pay.',
    iconSrc: '/ke/icon-housing.webp',
  },
  {
    href: '/ke/salary-after-tax-kenya',
    name: 'Salary after tax',
    description: 'What actually lands in your account.',
    iconSrc: '/ke/icon-after-tax.webp',
  },
  {
    href: '/ke/kenya-net-salary-calculator-2026',
    name: 'Net salary 2026',
    description: '2026 bands and contribution caps.',
    iconSrc: '/ke/icon-benefits.webp',
  },
];

const TRUST_POINTS = [
  'KRA PAYE bands from 10% up to 35%',
  'NSSF Tier I and Tier II, capped at KES 6,480 per month',
  'SHIF at 2.75% of gross pay, with 15% tax relief applied',
  'Affordable Housing Levy at 1.5% of gross pay',
];

/* Config FAQs are the source of truth; the two additions below are factual and
   verifiable against the same calculation rules. */
const EXTRA_FAQS: FAQEntry[] = [
  {
    question: 'What is the Affordable Housing Levy?',
    answer:
      'A statutory deduction of 1.5% of your gross monthly pay, matched by an equal employer contribution, paid into the National Housing Development Fund.',
  },
  {
    question: 'Does Regulo store my salary details?',
    answer:
      'No. The calculation runs entirely in your browser. Your salary figures are not sent to Regulo and are not included in analytics.',
  },
];

const FOOTER_COLUMNS = [
  {
    heading: 'Calculators',
    links: [
      { label: 'Net salary', href: '/ke/net-salary-calculator' },
      { label: 'PAYE', href: '/ke/paye-calculator-kenya' },
      { label: 'SHIF', href: '/ke/shif-calculator-kenya' },
      { label: 'Housing Levy', href: '/ke/housing-levy-calculator-kenya' },
      { label: 'Salary after tax', href: '/ke/salary-after-tax-kenya' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Frequently asked questions', href: '#faq' },
      { label: 'Net salary 2026', href: '/ke/kenya-net-salary-calculator-2026' },
    ],
  },
  {
    heading: 'Regulo',
    links: [
      { label: 'All country calculators', href: '/' },
      { label: 'Privacy policy', href: '/politica-de-privacidade' },
    ],
  },
];

/* -------------------------------------------------------------------------- */

export default function KenyaHomePage() {
  const primary = KENYA_CALCULATOR_CONFIG.pages['net-salary-calculator'];
  const faqs: FAQEntry[] = [...(primary?.faqs ?? []), ...EXTRA_FAQS];

  // Reuses the existing structured-data component rather than introducing a
  // second schema implementation.
  const homeSeo: PageSEO = {
    slug: '',
    title: 'Kenya Net Salary Calculator — PAYE, SHIF, NSSF & Housing Levy',
    h1: 'Calculate your net salary and taxes in Kenya',
    metaDescription:
      'Calculate your net salary in Kenya using current KRA PAYE bands, NSSF, SHIF and the Affordable Housing Levy.',
    keywords: [],
    canonicalUrl: CANONICAL,
    explanationMarkdown: '',
    faqs,
    relatedPages: [],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Regulo', item: 'https://regulo.online' },
      { '@type': 'ListItem', position: 2, name: 'Kenya', item: CANONICAL },
    ],
  };

  return (
    <div className="rg-page rg-theme-ke">
      <StructuredData
        seo={homeSeo}
        countryName={KENYA_CALCULATOR_CONFIG.countryName}
        currencyCode={KENYA_CALCULATOR_CONFIG.currencyCode}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <CountryHeader
        homeHref="/ke"
        countryName="Kenya"
        flag="🇰🇪"
        nav={NAV}
        ctaLabel="Calculate now"
        ctaHref="#calculator"
      />

      <main>
        {/* ------------------------------------------------------------ hero */}
        <section className="rg-hero">
          <div className="rg-shell">
            <div className="rg-hero__grid">
              <div className="rg-hero__copy">
                <p className="rg-badge-country">
                  <span aria-hidden="true">🇰🇪</span> Made for Kenya
                </p>

                <h1 className="rg-hero__title">Calculate your net salary and taxes in Kenya</h1>

                <p className="rg-hero__lead">
                  Accurate calculators built for Kenyan payroll rules — PAYE, SHIF, NSSF and the
                  Affordable Housing Levy.
                </p>

                <ul className="rg-feature-row">
                  {FEATURES.map((feature) => (
                    <li className="rg-feature-chip" key={feature.label}>
                      <span className="rg-feature-chip__icon">{feature.icon}</span>
                      {feature.label}
                    </li>
                  ))}
                </ul>

                <div className="rg-hero__assurance">
                  <span className="rg-hero__assurance-icon">
                    <IconShieldCheck size={22} />
                  </span>
                  <span className="rg-hero__assurance-text">
                    Reflects the KRA PAYE bands, NSSF schedule, SHIF rate and Housing Levy currently
                    in force.
                  </span>
                </div>
              </div>

              {/* Supplied Nairobi photograph. Absolutely positioned on desktop
                  as a full-height panel behind the copy; on mobile it drops
                  into flow as a band between headline and calculator. */}
              <div className="rg-hero__art">
                <Image
                  src="/ke/hero-nairobi.jpg"
                  alt="Nairobi city skyline"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  style={{ objectFit: 'cover', objectPosition: '38% 58%' }}
                />
              </div>

              <KenyaSalaryCalculator />
            </div>
          </div>
        </section>

        {/* Kenyan woven-zigzag motif, used once as a section break */}
        <div className="rg-motif" role="presentation" />

        {/* --------------------------------------------------- how it works */}
        <section className="rg-section rg-band--plain" id="how-it-works">
          <div className="rg-shell">
            <SectionHeading eyebrow="How it works" title="Get your result in 3 simple steps" />
            <HowItWorks steps={STEPS} />
          </div>
        </section>

        {/* --------------------------------------------------------- tools */}
        <section className="rg-section rg-band--tint" id="tools">
          <div className="rg-shell">
            <SectionHeading
              eyebrow="Popular calculators"
              title="Tools for every payroll and tax question"
            />
            <ul className="rg-tools">
              {TOOLS.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
            </ul>
          </div>
        </section>

        {/* --------------------------------------------------------- trust */}
        <section className="rg-section rg-band--plain">
          <div className="rg-shell">
            <TrustSection
              eyebrow="Built for Kenya"
              title="Built on Kenya's statutory rules."
              body="Regulo applies the KRA PAYE bands, the NSSF contribution schedule, SHIF health contributions and the Affordable Housing Levy exactly as currently published."
              points={TRUST_POINTS}
              badgeTitle="100% Kenya"
              badgeText="Calculations follow Kenyan payroll and tax law."
            />
          </div>
        </section>

        {/* ------------------------------------------------------- support */}
        <section className="rg-section--tight rg-band--plain">
          <div className="rg-shell">
            <SupportCTA
              eyebrow="Need more detail?"
              title="Understand every line on your payslip"
              body="See how PAYE, NSSF, SHIF and the Housing Levy are worked out, rate by rate."
              points={[
                'Every deduction explained line by line',
                'Current rates, tiers and thresholds in full',
              ]}
              ctaLabel="Read the full breakdown"
              ctaHref="/ke/net-salary-calculator"
            />
          </div>
        </section>

        {/* ----------------------------------------------------------- faq */}
        <section className="rg-section rg-band--wash" id="faq">
          <div className="rg-shell">
            <SectionHeading eyebrow="FAQs" title="Common questions about the calculation" />
            <FAQAccordion items={faqs} />
          </div>
        </section>
      </main>

      <CountryFooter
        homeHref="/ke"
        countryName="Kenya"
        flag="🇰🇪"
        tagline="Payroll and tax tools made for Kenya."
        columns={FOOTER_COLUMNS}
        disclaimer="Regulo provides estimates based on published statutory rates and legislation. For payroll filing or tax advice, consult a qualified professional."
      />

      {/* Mobile-only persistent route back to the calculator. Plain anchor —
          no JavaScript, and it works with the native scroll offset above. */}
      <div className="rg-sticky-bar">
        <a href="#calculator" className="rg-btn rg-btn--primary">
          Calculate now
        </a>
      </div>
    </div>
  );
}
