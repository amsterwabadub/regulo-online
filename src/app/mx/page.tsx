import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MEXICO_CALCULATOR_CONFIG } from '@/config/calculators/mexico';
import { PageSEO } from '@/types/calculator';
import StructuredData from '@/components/StructuredData';

import CountryHeader from '@/components/regulo/CountryHeader';
import CountryFooter from '@/components/regulo/CountryFooter';
import MexicoAguinaldoCalculator from '@/components/regulo/MexicoAguinaldoCalculator';
import SectionHeading from '@/components/regulo/SectionHeading';
import HowItWorks from '@/components/regulo/HowItWorks';
import SupportCTA from '@/components/regulo/SupportCTA';
import FAQAccordion, { FAQEntry } from '@/components/regulo/FAQAccordion';
import { IconGlobe, IconNoSignup, IconScales, IconCheck, IconArrowRight } from '@/components/regulo/Icons';

const CANONICAL = 'https://regulo.online/mx';

export const metadata: Metadata = {
  title: 'Calculadora de Aguinaldo Neto 2026 México — Exención 30 UMA e ISR',
  description:
    'Calcula tu aguinaldo neto 2026 en México: cálculo proporcional por días trabajados, exención de 30 UMA ($3,519.30) y retención de ISR estimada. Gratis y sin registro.',
  keywords: [
    'calculadora aguinaldo neto 2026',
    'aguinaldo mexico',
    'isr aguinaldo',
    'exencion 30 uma',
    'aguinaldo proporcional',
  ],
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: CANONICAL,
    siteName: 'Regulo',
    title: 'Calculadora de Aguinaldo Neto 2026 México',
    description:
      'Calcula tu aguinaldo neto 2026 con la exención de 30 UMA y la retención de ISR estimada.',
  },
};

/* -------------------------------------------------------------------------- */

const NAV = [
  { label: 'Herramientas', href: '#herramientas' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Preguntas', href: '#preguntas' },
];

/** Constants taken straight from the production engine. */
const STATS = [
  { k: 'UMA 2026', v: '$117.31' },
  { k: 'Exención', v: '30 UMA' },
  { k: 'Mínimo de ley', v: '15 días' },
];

const FEATURES = [
  { label: '100% en línea', icon: <IconGlobe size={18} /> },
  { label: 'Sin registro', icon: <IconNoSignup size={18} /> },
  { label: 'Conforme a la LFT', icon: <IconScales size={18} /> },
];

const STEPS = [
  { title: 'Escribe tu salario', text: 'Tu sueldo bruto mensual y los días que trabajaste este año.' },
  { title: 'Aplicamos la ley', text: 'Cálculo proporcional, exención de 30 UMA y retención de ISR.' },
  { title: 'Conoce tu neto', text: 'El monto que realmente te depositan, con el desglose completo.' },
];

/**
 * Solo rutas cuyo título coincide con lo que realmente calculan.
 * /mx/salario-neto-mexico y /mx/calculadora-isr-mexico prometen un cálculo
 * mensual que el motor de producción no realiza, así que no se enlazan aquí.
 */
const TOOLS = [
  {
    href: '/mx/aguinaldo-calculator',
    name: 'Aguinaldo neto',
    desc: 'Cuánto te depositan después del ISR.',
    icon: '/mx/icon-aguinaldo.webp',
  },
  {
    href: '/mx/aguinaldo-neto-calculadora-2026',
    name: 'Aguinaldo neto 2026',
    desc: 'Con la UMA vigente de $117.31.',
    icon: '/mx/icon-neto.webp',
  },
  {
    href: '/mx/isr-aguinaldo-calculator',
    name: 'ISR sobre aguinaldo',
    desc: 'Cuánto retiene el SAT de tu aguinaldo.',
    icon: '/mx/icon-isr.webp',
  },
];

const TRUST_POINTS = [
  'Aguinaldo mínimo de 15 días de salario (Art. 87 LFT)',
  'Pago obligatorio antes del 20 de diciembre',
  'Exención de 30 UMA (Art. 93 Fracc. XIV LISR)',
  'UMA diaria oficial INEGI de $117.31 desde febrero de 2026',
];

const FAQS: FAQEntry[] = [
  {
    question: '¿Cuánto aguinaldo me corresponde por ley en México?',
    answer:
      'La Ley Federal del Trabajo (Art. 87) establece un mínimo de 15 días de salario. Si no trabajaste el año completo, el aguinaldo se paga en proporción a los días laborados.',
  },
  {
    question: '¿Cuánto del aguinaldo está libre de ISR?',
    answer:
      'Están exentos 30 días de UMA. Con la UMA diaria de $117.31 vigente desde febrero de 2026, la parte exenta es de $3,519.30; solo el excedente forma la base gravable.',
  },
  {
    question: '¿Cuándo deben pagarme el aguinaldo?',
    answer:
      'Antes del 20 de diciembre de cada año, según el Art. 87 de la Ley Federal del Trabajo.',
  },
  {
    question: '¿Regulo guarda mis datos salariales?',
    answer:
      'No. El cálculo se ejecuta por completo en tu navegador. Tus cifras no se envían a Regulo ni se incluyen en analítica.',
  },
];

const FOOTER_COLUMNS = [
  {
    heading: 'Calculadoras',
    links: [
      { label: 'Aguinaldo neto', href: '/mx/aguinaldo-calculator' },
      { label: 'Aguinaldo neto 2026', href: '/mx/aguinaldo-neto-calculadora-2026' },
      { label: 'ISR sobre aguinaldo', href: '/mx/isr-aguinaldo-calculator' },
    ],
  },
  {
    heading: 'Recursos',
    links: [
      { label: 'Cómo funciona', href: '#como-funciona' },
      { label: 'Preguntas frecuentes', href: '#preguntas' },
    ],
  },
  {
    heading: 'Regulo',
    links: [
      { label: 'Calculadoras por país', href: '/' },
      { label: 'Aviso de privacidad', href: '/politica-de-privacidade' },
    ],
  },
];

/* -------------------------------------------------------------------------- */

export default function MexicoHomePage() {
  const homeSeo: PageSEO = {
    slug: '',
    title: 'Calculadora de Aguinaldo Neto 2026 México',
    h1: 'Calcula tu aguinaldo neto en México',
    metaDescription:
      'Calcula tu aguinaldo neto 2026 en México con la exención de 30 UMA y la retención de ISR.',
    keywords: [],
    canonicalUrl: CANONICAL,
    explanationMarkdown: '',
    faqs: FAQS,
    relatedPages: [],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Regulo', item: 'https://regulo.online' },
      { '@type': 'ListItem', position: 2, name: 'México', item: CANONICAL },
    ],
  };

  return (
    // The root layout declares lang="en"; this subtree is Spanish.
    <div className="rg-page rg-theme-mx" lang="es">
      <StructuredData
        seo={homeSeo}
        countryName={MEXICO_CALCULATOR_CONFIG.countryName}
        currencyCode={MEXICO_CALCULATOR_CONFIG.currencyCode}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <CountryHeader
        homeHref="/mx"
        countryName="México"
        flag="🇲🇽"
        nav={NAV}
        ctaLabel="Calcular ahora"
        ctaHref="#calculadora"
      />

      <main>
        {/* ------------------------------------------------------------ hero */}
        <section className="rg-mx-hero">
          <div className="rg-shell">
            <div className="rg-mx-hero__top">
              <div>
                <p className="rg-badge-country">
                  <span aria-hidden="true">🇲🇽</span> Hecho para México
                </p>

                <h1 className="rg-hero__title">
                  Calcula tu aguinaldo <em>neto</em> en México
                </h1>

                <p className="rg-hero__lead">
                  Cálculo proporcional por días trabajados, exención de 30 UMA y retención de ISR
                  estimada, conforme a la ley vigente.
                </p>

                <ul className="rg-mx-stats">
                  {STATS.map((s) => (
                    <li key={s.k}>
                      <span className="rg-mx-stats__k">{s.k}</span>
                      <span className="rg-mx-stats__v">{s.v}</span>
                    </li>
                  ))}
                </ul>

                <ul className="rg-feature-row">
                  {FEATURES.map((f) => (
                    <li className="rg-feature-chip" key={f.label}>
                      <span className="rg-feature-chip__icon">{f.icon}</span>
                      {f.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rg-mx-hero__art">
                <Image
                  src="/mx/hero-cdmx.jpg"
                  alt="Paseo de la Reforma y el Ángel de la Independencia, Ciudad de México"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  style={{ objectPosition: '50% 45%' }}
                />
              </div>
            </div>

            <MexicoAguinaldoCalculator />
          </div>
        </section>

        {/* --------------------------------------------------- cómo funciona */}
        <section className="rg-section" id="como-funciona">
          <div className="rg-shell">
            <SectionHeading eyebrow="Así de fácil" title="Cómo funciona" />
            <HowItWorks steps={STEPS} />
          </div>
        </section>

        {/* ----------------------------------------------------- herramientas */}
        <section className="rg-section rg-band--tint" id="herramientas">
          <div className="rg-shell">
            <SectionHeading
              eyebrow="Herramientas"
              title="Calculadoras de aguinaldo para México"
            />
            <ul className="rg-mx-tools">
              {TOOLS.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="rg-tool">
                    <Image className="rg-tool__icon" src={t.icon} alt="" width={72} height={72} />
                    <span className="rg-tool__name">{t.name}</span>
                    <span className="rg-tool__desc">{t.desc}</span>
                    <span className="rg-tool__cta">
                      Calcular ahora
                      <IconArrowRight size={14} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ trust */}
        <section className="rg-section">
          <div className="rg-shell">
            <div className="rg-mx-trust">
              <div>
                <p className="rg-eyebrow">Hecho para México</p>
                <h2>Basado en la ley mexicana vigente.</h2>
                <p style={{ marginTop: 16, color: 'var(--rg-text-muted)', maxWidth: 460 }}>
                  Aplicamos la Ley Federal del Trabajo y la LISR tal como están publicadas, con la
                  UMA oficial del INEGI.
                </p>
                <ul className="rg-trust__list">
                  {TRUST_POINTS.map((p) => (
                    <li key={p}>
                      <IconCheck size={18} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rg-mx-trust__art">
                <Image
                  src="/mx/trust-mexico.webp"
                  alt="Ángel de la Independencia, Palacio de Bellas Artes y Torre Latinoamericana"
                  width={900}
                  height={596}
                  sizes="(max-width: 1024px) 90vw, 44vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- soporte */}
        <section className="rg-section--tight">
          <div className="rg-shell">
            <SupportCTA
              eyebrow="¿Tienes dudas?"
              title="Entiende cómo se calcula tu aguinaldo"
              body="Revisa el desglose completo: días proporcionales, exención de 30 UMA y la retención de ISR."
              points={['Cada concepto explicado por separado', 'Fundamento legal de cada paso']}
              ctaLabel="Ver la guía completa"
              ctaHref="/mx/aguinaldo-calculator"
              imageSrc="/mx/support-advisers.webp"
            />
          </div>
        </section>

        {/* -------------------------------------------------------- preguntas */}
        <section className="rg-section rg-band--wash" id="preguntas">
          <div className="rg-shell">
            <SectionHeading eyebrow="Preguntas frecuentes" title="Dudas comunes sobre el aguinaldo" />
            <FAQAccordion items={FAQS} />
          </div>
        </section>
      </main>

      <CountryFooter
        homeHref="/mx"
        countryName="México"
        flag="🇲🇽"
        tagline="Herramientas de nómina y prestaciones hechas para México."
        columns={FOOTER_COLUMNS}
        privacyNote="El cálculo se ejecuta en tu navegador."
        disclaimer="Regulo entrega estimaciones basadas en la legislación publicada. Para trámites o cálculos oficiales, consulta a un contador."
      />

      <div className="rg-sticky-bar">
        <a href="#calculadora" className="rg-btn rg-btn--primary">
          Calcular ahora
        </a>
      </div>
    </div>
  );
}
