import React from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { COLOMBIA_CALCULATOR_CONFIG } from '@/config/calculators/colombia';
import { PageSEO } from '@/types/calculator';
import StructuredData from '@/components/StructuredData';

import CountryHeader from '@/components/regulo/CountryHeader';
import CountryFooter from '@/components/regulo/CountryFooter';
import ColombiaSalaryCalculator from '@/components/regulo/ColombiaSalaryCalculator';
import CommercialCTA from '@/components/regulo/CommercialCTA';
import SectionHeading from '@/components/regulo/SectionHeading';
import HowItWorks from '@/components/regulo/HowItWorks';
import ToolCard from '@/components/regulo/ToolCard';
import SupportCTA from '@/components/regulo/SupportCTA';
import FAQAccordion, { FAQEntry } from '@/components/regulo/FAQAccordion';
import { IconGlobe, IconNoSignup, IconScales, IconCheck, IconShieldCheck } from '@/components/regulo/Icons';

const CANONICAL = 'https://regulo.online/co';

export const metadata: Metadata = {
  title: 'Calculadora de Salario Neto Colombia 2026 — Retención, UVT y Aportes',
  description:
    'Calcula tu salario neto en Colombia con la UVT 2026 ($52.374), la tabla del Art. 383 E.T., los aportes a salud y pensión y la retención en la fuente. Gratis y sin registro.',
  keywords: [
    'calculadora salario neto colombia',
    'retencion en la fuente 2026',
    'uvt 2026 colombia',
    'calculadora retefuente',
    'aportes salud pension colombia',
  ],
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: CANONICAL,
    siteName: 'Regulo',
    title: 'Calculadora de Salario Neto Colombia 2026 — Retención, UVT y Aportes',
    description:
      'Calcula tu salario neto en Colombia con la UVT 2026, la tabla del Art. 383 E.T. y los aportes de ley.',
  },
};

/* -------------------------------------------------------------------------- */

const NAV = [
  { label: 'Herramientas', href: '#herramientas' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Guías', href: '/co/retefuente-calculadora' },
  { label: 'Preguntas', href: '#preguntas' },
];

/** Factual, straight from the production engine's constants. */
const STATS = [
  { k: 'UVT 2026', v: '$52.374' },
  { k: 'Salud + pensión', v: '8%' },
  { k: 'Retención desde', v: '95 UVT' },
];

const FEATURES = [
  { label: '100% en línea', icon: <IconGlobe size={18} /> },
  { label: 'Sin registro', icon: <IconNoSignup size={18} /> },
  { label: 'Normas colombianas', icon: <IconScales size={18} /> },
];

const STEPS = [
  {
    title: 'Ingresa tu salario',
    text: 'Escribe tu ingreso mensual bruto y, si aplica, tus deducciones.',
  },
  {
    title: 'Aplicamos las normas',
    text: 'Aportes de ley, renta exenta del 25% y la tabla del Art. 383 E.T.',
  },
  {
    title: 'Consulta tu resultado',
    text: 'Tu salario neto y el detalle de cada descuento, al instante.',
  },
];

/** One card per real Colombia route. Prima, cesantías y seguridad social no
 *  tienen motor de cálculo en producción, así que no aparecen. */
const TOOLS = [
  {
    href: '/co/salario-neto-colombia',
    name: 'Salario neto',
    description: 'Cuánto recibes en el banco cada mes.',
    iconSrc: '/co/icon-salario-neto.webp',
    ctaLabel: 'Calcular ahora',
  },
  {
    href: '/co/retefuente-calculadora',
    name: 'Retención en la fuente',
    description: 'Tu retención laboral según la tabla del Art. 383 E.T.',
    iconSrc: '/co/icon-retencion.webp',
    ctaLabel: 'Calcular ahora',
  },
  {
    href: '/co/uvt-calculator',
    name: 'UVT 2026',
    description: 'Convierte pesos a UVT con el valor oficial de la DIAN.',
    iconSrc: '/co/icon-uvt.webp',
    ctaLabel: 'Calcular ahora',
  },
  {
    href: '/co/retefuente-calculadora-2026',
    name: 'Retefuente nómina',
    description: 'El descuento mensual aplicado en tu nómina 2026.',
    iconSrc: '/co/icon-nomina.webp',
    ctaLabel: 'Calcular ahora',
  },
];

const TRUST_POINTS = [
  'Tabla de retención del Art. 383 del Estatuto Tributario',
  'UVT 2026 de $52.374, fijada por la DIAN',
  'Aportes obligatorios de salud y pensión del 4% cada uno',
  'Renta exenta del 25% con los topes del Art. 336 E.T.',
];

const EXTRA_FAQS: FAQEntry[] = [
  {
    question: '¿Qué descuentos incluye el cálculo del salario neto?',
    answer:
      'Se restan del salario bruto los aportes obligatorios a salud (4%) y pensión (4%), el Fondo de Solidaridad Pensional cuando el ingreso supera 4 SMMLV, y la retención en la fuente que resulte de la base gravable depurada.',
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
      { label: 'Salario neto', href: '/co/salario-neto-colombia' },
      { label: 'Retención en la fuente', href: '/co/retefuente-calculadora' },
      { label: 'UVT 2026', href: '/co/uvt-calculator' },
      { label: 'Retefuente nómina', href: '/co/retefuente-calculadora-2026' },
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

export default function ColombiaHomePage() {
  const primary = COLOMBIA_CALCULATOR_CONFIG.pages['retefuente-calculadora'];
  const faqs: FAQEntry[] = [...(primary?.faqs ?? []), ...EXTRA_FAQS];

  const homeSeo: PageSEO = {
    slug: '',
    title: 'Calculadora de Salario Neto Colombia 2026',
    h1: 'Calcula tu salario neto en Colombia',
    metaDescription:
      'Calcula tu salario neto en Colombia con la UVT 2026, los aportes de ley y la retención en la fuente.',
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
      { '@type': 'ListItem', position: 2, name: 'Colombia', item: CANONICAL },
    ],
  };

  return (
    // The root layout declares lang="en" for the whole app; this subtree is
    // Spanish, so it declares its own language for screen readers and search.
    <div className="rg-page rg-theme-co" lang="es">
      <StructuredData
        seo={homeSeo}
        countryName={COLOMBIA_CALCULATOR_CONFIG.countryName}
        currencyCode={COLOMBIA_CALCULATOR_CONFIG.currencyCode}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <CountryHeader
        homeHref="/co"
        countryName="Colombia"
        flag="🇨🇴"
        nav={NAV}
        ctaLabel="Calcular ahora"
        ctaHref="#calculadora"
      />

      <main>
        {/* ------------------------------------------------------------ hero */}
        <section className="rg-co-hero">
          <div className="rg-shell">
            <div className="rg-co-hero__grid">
              <div>
                <p className="rg-badge-country">
                  <span aria-hidden="true">🇨🇴</span> Hecho para Colombia
                </p>

                <h1 className="rg-hero__title">
                  Calcula tu salario neto <em>en Colombia</em>
                </h1>

                <p className="rg-hero__lead">
                  Aportes de ley, deducciones y retención en la fuente con la UVT vigente. Rápido,
                  claro y sin registro.
                </p>

                <ul className="rg-co-stats">
                  {STATS.map((s) => (
                    <li key={s.k}>
                      <span className="rg-co-stats__k">{s.k}</span>
                      <span className="rg-co-stats__v">{s.v}</span>
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

              <ColombiaSalaryCalculator />
            <CommercialCTA market="co" calculatorId="colombia-retefuente" pagePath="/co" />
            </div>
          </div>

          {/* Bogotá spans the full width beneath the fold as a horizon */}
          <div className="rg-co-hero__band">
            <Image
              src="/co/hero-bogota.webp"
              alt="Bogotá: teleférico, torres del centro y los cerros orientales"
              width={900}
              height={457}
              priority
              sizes="100vw"
            />
          </div>
        </section>

        {/* ---------------------------------------------------- cómo funciona */}
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
              eyebrow="Herramientas populares"
              title="Calculadoras hechas para Colombia"
            />
            <ul className="rg-co-tools">
              {TOOLS.map((t) => (
                <ToolCard key={t.href} {...t} />
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------------------ trust */}
        <section className="rg-section">
          <div className="rg-shell">
            <div className="rg-co-trust">
              <div className="rg-co-trust__art">
                <Image
                  src="/co/trust-colombia.webp"
                  alt="Arquitectura colonial y torres del centro de Bogotá"
                  width={820}
                  height={631}
                  sizes="(max-width: 1024px) 90vw, 44vw"
                />
                <div className="rg-co-badge">
                  <span style={{ color: 'var(--rg-primary)', flexShrink: 0 }}>
                    <IconShieldCheck size={22} />
                  </span>
                  <span>
                    <span className="rg-co-badge__t">100% Colombia</span>
                    <span className="rg-co-badge__d">
                      Cálculos con normas tributarias colombianas.
                    </span>
                  </span>
                </div>
              </div>

              <div>
                <p className="rg-eyebrow">Hecho para Colombia</p>
                <h2>Reglas colombianas. Resultados claros.</h2>
                <p style={{ marginTop: 16, color: 'var(--rg-text-muted)', maxWidth: 460 }}>
                  Regulo aplica las normas tributarias y laborales colombianas vigentes tal como
                  están publicadas, sin aproximaciones.
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
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- soporte */}
        <section className="rg-section--tight">
          <div className="rg-shell">
            <SupportCTA
              eyebrow="¿Tienes dudas?"
              title="Entiende cada detalle de tu cálculo"
              body="Consulta cómo se depura la base gravable y cómo se aplica la tabla del Art. 383 E.T., paso a paso."
              points={[
                'Cada descuento explicado línea por línea',
                'Topes, UVT y deducciones vigentes',
              ]}
              ctaLabel="Ver la guía completa"
              ctaHref="/co/retefuente-calculadora"
              imageSrc="/co/support-advisers.webp"
            />
          </div>
        </section>

        {/* -------------------------------------------------------- preguntas */}
        <section className="rg-section rg-band--wash" id="preguntas">
          <div className="rg-shell">
            <SectionHeading eyebrow="Preguntas frecuentes" title="Dudas comunes sobre el cálculo" />
            <FAQAccordion items={faqs} />
          </div>
        </section>
      </main>

      <CountryFooter
        homeHref="/co"
        countryName="Colombia"
        flag="🇨🇴"
        tagline="Herramientas fiscales y de nómina hechas para Colombia."
        columns={FOOTER_COLUMNS}
        privacyNote="El cálculo se ejecuta en tu navegador."
        disclaimer="Regulo entrega estimaciones basadas en las normas y tarifas publicadas. Para tu declaración o liquidación de nómina, consulta a un profesional."
      />

      <div className="rg-sticky-bar">
        <a href="#calculadora" className="rg-btn rg-btn--primary">
          Calcular ahora
        </a>
      </div>
    </div>
  );
}
