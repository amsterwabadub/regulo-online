import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MOROCCO_CALCULATOR_CONFIG } from '@/config/calculators/morocco';
import { PageSEO } from '@/types/calculator';
import StructuredData from '@/components/StructuredData';

import CountryHeader from '@/components/regulo/CountryHeader';
import CountryFooter from '@/components/regulo/CountryFooter';
import MoroccoSalaryCalculator from '@/components/regulo/MoroccoSalaryCalculator';
import CommercialCTA from '@/components/regulo/CommercialCTA';
import SectionHeading from '@/components/regulo/SectionHeading';
import HowItWorks from '@/components/regulo/HowItWorks';
import SupportCTA from '@/components/regulo/SupportCTA';
import FAQAccordion, { FAQEntry } from '@/components/regulo/FAQAccordion';
import { IconGlobe, IconNoSignup, IconScales, IconCheck, IconArrowRight } from '@/components/regulo/Icons';

const CANONICAL = 'https://regulo.online/ma';

export const metadata: Metadata = {
  title: 'حاسبة الأجر الصافي في المغرب 2026 — CNSS و AMO والضريبة على الدخل',
  description:
    'احسب أجرك الصافي في المغرب حسب جدول الضريبة على الدخل لسنة 2026، مساهمات CNSS و AMO والمصاريف المهنية. مجاناً وبدون تسجيل.',
  keywords: [
    'حاسبة الراتب الصافي المغرب',
    'الضريبة على الدخل المغرب',
    'CNSS AMO المغرب',
    'الأجر الصافي 2026',
    'salaire net maroc',
  ],
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'ar_MA',
    url: CANONICAL,
    siteName: 'Regulo',
    title: 'حاسبة الأجر الصافي في المغرب 2026',
    description:
      'احسب أجرك الصافي في المغرب مع مساهمات CNSS و AMO وجدول الضريبة على الدخل لسنة 2026.',
  },
};

/* -------------------------------------------------------------------------- */

const NAV = [
  { label: 'الأدوات', href: '#adawat' },
  { label: 'كيف تعمل', href: '#kayfa' },
  { label: 'الأسئلة', href: '#asila' },
];

/** Factual constants taken straight from the production engine. */
const STATS: { k: string; v: string; ltr?: boolean }[] = [
  { k: 'سقف CNSS', v: '6,000 درهم' },
  { k: 'AMO', v: '2,26%' },
  // Two percentages separated by a slash reverse inside an RTL run, so this
  // one is isolated left-to-right.
  { k: 'المصاريف المهنية', v: '35% / 25%', ltr: true },
];

const FEATURES = [
  { label: '100% عبر الإنترنت', icon: <IconGlobe size={18} /> },
  { label: 'بدون تسجيل', icon: <IconNoSignup size={18} /> },
  { label: 'حسب القوانين المغربية', icon: <IconScales size={18} /> },
];

const STEPS = [
  { title: 'أدخل بياناتك', text: 'الراتب الإجمالي الشهري وعدد الأشخاص المكفولين.' },
  { title: 'نطبّق القواعد المغربية', text: 'CNSS و AMO والمصاريف المهنية وجدول الضريبة على الدخل.' },
  { title: 'اعرض نتيجتك', text: 'أجرك الصافي مع تفصيل كل اقتطاع، فوراً.' },
];

/**
 * أربع مسارات حقيقية فقط. لا توجد حاسبات مستقلة لـ CNSS أو AMO، لذلك تظهران
 * كمفهومين داخل النتيجة وليس كبطاقتين مستقلتين.
 * Every card links to a French page, flagged with an FR cue.
 */
const TOOLS = [
  {
    href: '/ma/salaire-net-calculateur',
    name: 'الأجر الصافي',
    desc: 'الحاسبة الرئيسية للأجر الصافي بعد كل الاقتطاعات.',
    icon: '/ma/icon-salaire-net.webp',
  },
  {
    href: '/ma/calcul-ir-maroc',
    name: 'الضريبة على الدخل IR',
    desc: 'احتساب الضريبة حسب جدول 2026.',
    icon: '/ma/icon-ir.webp',
  },
  {
    href: '/ma/calculateur-salaire-net-maroc',
    name: 'بطاقة الأجر ومساهمات CNSS',
    desc: 'حاسبة الأجر الصافي مع تفصيل مساهمات الضمان الاجتماعي.',
    icon: '/ma/icon-cnss.webp',
  },
  {
    href: '/ma/salaire-brut-net-maroc',
    name: 'من الإجمالي إلى الصافي',
    desc: 'محوّل الأجر الإجمالي إلى صافٍ مع AMO وباقي الاقتطاعات.',
    icon: '/ma/icon-amo.webp',
  },
];

const TRUST_POINTS = [
  'مساهمة CNSS بنسبة 4,48% في حدود 6,000 درهم شهرياً',
  'التأمين الإجباري AMO بنسبة 2,26% دون سقف',
  'المصاريف المهنية حسب المادة 59 من المدونة العامة للضرائب',
  'جدول الضريبة على الدخل لسنة 2026 وتخفيضات الأعباء العائلية',
];

const EXTRA_FAQS: FAQEntry[] = [
  {
    question: 'ما هي الاقتطاعات التي تدخل في احتساب الأجر الصافي؟',
    answer:
      'يُخصم من الأجر الإجمالي مساهمة CNSS بنسبة 4,48% في حدود 6,000 درهم، والتأمين الإجباري AMO بنسبة 2,26% دون سقف، ثم الضريبة على الدخل المحتسبة على الدخل الصافي الخاضع للضريبة بعد طرح المصاريف المهنية.',
  },
  {
    question: 'هل تحتفظ ريجولو ببيانات راتبي؟',
    answer:
      'لا. يتم الاحتساب بالكامل داخل متصفحك، ولا تُرسل أرقامك إلى ريجولو ولا تُدرج في أدوات التحليل.',
  },
];

const FOOTER_COLUMNS = [
  {
    heading: 'الأدوات',
    links: [
      { label: 'الأجر الصافي', href: '/ma/salaire-net-calculateur' },
      { label: 'الضريبة على الدخل', href: '/ma/calcul-ir-maroc' },
      { label: 'من الإجمالي إلى الصافي', href: '/ma/salaire-brut-net-maroc' },
    ],
  },
  {
    heading: 'موارد',
    links: [
      { label: 'كيف تعمل', href: '#kayfa' },
      { label: 'الأسئلة الشائعة', href: '#asila' },
    ],
  },
  {
    heading: 'ريجولو',
    links: [
      { label: 'حاسبات حسب الدولة', href: '/' },
      { label: 'سياسة الخصوصية', href: '/politica-de-privacidade' },
    ],
  },
];

/* -------------------------------------------------------------------------- */

export default function MoroccoHomePage() {
  const primary = MOROCCO_CALCULATOR_CONFIG.pages['salaire-net-calculateur'];
  const faqs: FAQEntry[] = EXTRA_FAQS;

  const homeSeo: PageSEO = {
    slug: '',
    title: 'حاسبة الأجر الصافي في المغرب 2026',
    h1: 'احسب أجرك الصافي في المغرب',
    metaDescription:
      'احسب أجرك الصافي في المغرب مع CNSS و AMO وجدول الضريبة على الدخل لسنة 2026.',
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
      { '@type': 'ListItem', position: 2, name: 'المغرب', item: CANONICAL },
    ],
  };

  return (
    // The root layout is lang="en"; this subtree is Arabic and right-to-left.
    <div className="rg-page rg-theme-ma" lang="ar" dir="rtl">
      <StructuredData
        seo={homeSeo}
        countryName={MOROCCO_CALCULATOR_CONFIG.countryName}
        currencyCode={MOROCCO_CALCULATOR_CONFIG.currencyCode}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <CountryHeader
        homeHref="/ma"
        countryName="المغرب"
        flag="🇲🇦"
        nav={NAV}
        ctaLabel="احسب الآن"
        ctaHref="#calculatrice"
      />

      <main>
        {/* ------------------------------------------------------------ hero */}
        <section className="rg-ma-hero">
          <div className="rg-ma-hero__art">
            <Image
              src="/ma/hero-casablanca.jpg"
              alt="مسجد الحسن الثاني والواجهة البحرية للدار البيضاء"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              style={{ objectFit: 'cover', objectPosition: '60% 55%' }}
            />
          </div>

          <div className="rg-shell">
            <div className="rg-ma-hero__grid">
              <div>
                <p className="rg-badge-country">
                  <span aria-hidden="true">🇲🇦</span> مصمم للمغرب
                </p>

                <h1 className="rg-hero__title">
                  احسب أجرك الصافي <em>في المغرب</em>
                </h1>

                <p className="rg-hero__lead">
                  أدوات دقيقة مبنية على قوانين الشغل والضرائب المغربية: CNSS و AMO والضريبة على
                  الدخل.
                </p>

                <ul className="rg-ma-stats">
                  {STATS.map((s) => (
                    <li key={s.k}>
                      <span className="rg-ma-stats__k">{s.k}</span>
                      <span className="rg-ma-stats__v" dir={s.ltr ? 'ltr' : undefined}>
                        {s.v}
                      </span>
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

              <MoroccoSalaryCalculator />
            <CommercialCTA market="ma" calculatorId="morocco-net-salary" pagePath="/ma" />
            </div>
          </div>
        </section>

        <div className="rg-ma-motif" role="presentation" />

        {/* ------------------------------------------------------ كيف تعمل */}
        <section className="rg-section" id="kayfa">
          <div className="rg-shell">
            <SectionHeading eyebrow="ببساطة وسرعة" title="كيف تعمل الحاسبة" />
            <HowItWorks steps={STEPS} />
          </div>
        </section>

        {/* -------------------------------------------------------- الأدوات */}
        <section className="rg-section rg-band--tint" id="adawat">
          <div className="rg-shell">
            <SectionHeading
              eyebrow="الأدوات الأكثر استعمالاً"
              title="حاسبات مبنية على القوانين المغربية"
              subtitle="صفحات الحاسبات متوفرة حالياً باللغة الفرنسية."
            />
            <ul className="rg-ma-tools">
              {TOOLS.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="rg-tool">
                    <Image
                      className="rg-tool__icon"
                      src={t.icon}
                      alt=""
                      width={72}
                      height={72}
                    />
                    <span className="rg-tool__name">
                      {t.name}
                      <span className="rg-ma-fr">FR</span>
                    </span>
                    <span className="rg-tool__desc">{t.desc}</span>
                    <span className="rg-tool__cta">
                      احسب الآن
                      <IconArrowRight size={14} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------------------------- الثقة */}
        <section className="rg-section">
          <div className="rg-shell">
            <div className="rg-ma-trust">
              <div className="rg-ma-trust__art">
                <Image
                  src="/ma/trust-maroc.webp"
                  alt="معالم معمارية مغربية وخريطة المملكة"
                  width={900}
                  height={596}
                  sizes="(max-width: 1024px) 90vw, 44vw"
                />
              </div>

              <div>
                <p className="rg-eyebrow">مبني على القوانين المغربية</p>
                <h2>أدوات موثوقة، مبنية على النصوص الجاري بها العمل.</h2>
                <p style={{ marginTop: 16, color: 'var(--rg-text-muted)', maxWidth: 480 }}>
                  تعتمد حاساتنا على مساهمات الضمان الاجتماعي والمدونة العامة للضرائب كما هي منشورة،
                  دون تقريب.
                </p>
                <ul className="rg-trust__list">
                  {TRUST_POINTS.map((p) => (
                    <li key={p}>
                      <IconCheck size={18} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                {/* CNSS و AMO مفهومان داخل النتيجة، لا حاسبتان مستقلتان */}
                <ul className="rg-ma-concepts">
                  <li>
                    <Image src="/ma/icon-cnss.webp" alt="" width={44} height={44} />
                    <span>
                      <b>CNSS</b>
                      <span>الضمان الاجتماعي — 4,48% في حدود 6,000 درهم</span>
                    </span>
                  </li>
                  <li>
                    <Image src="/ma/icon-amo.webp" alt="" width={44} height={44} />
                    <span>
                      <b>AMO</b>
                      <span>التأمين الإجباري عن المرض — 2,26% دون سقف</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- المساعدة */}
        <section className="rg-section--tight">
          <div className="rg-shell">
            <SupportCTA
              eyebrow="تحتاج إلى توضيح؟"
              title="افهم تفاصيل راتبك واقتطاعاتك"
              body="اطّلع على طريقة احتساب المصاريف المهنية والدخل الخاضع للضريبة خطوة بخطوة."
              points={['شرح كل اقتطاع على حدة', 'النسب والسقوف الجاري بها العمل']}
              ctaLabel="اقرأ الدليل الكامل"
              ctaHref="/ma/salaire-net-calculateur"
              imageSrc="/ma/support-advisers.webp"
            />
          </div>
        </section>

        {/* --------------------------------------------------------- الأسئلة */}
        <section className="rg-section rg-band--wash" id="asila">
          <div className="rg-shell">
            <SectionHeading eyebrow="الأسئلة الشائعة" title="أسئلة متكررة حول الاحتساب" />
            <FAQAccordion items={faqs} />
          </div>
        </section>
      </main>

      <CountryFooter
        homeHref="/ma"
        countryName="المغرب"
        flag="🇲🇦"
        tagline="أدوات دقيقة لحساب الأجور والضرائب في المغرب."
        columns={FOOTER_COLUMNS}
        privacyNote="يتم الاحتساب داخل متصفحك."
        disclaimer="تقدّم ريجولو نتائج تقديرية مبنية على النصوص والنسب المنشورة. لأي إجراء رسمي، استشر مختصاً."
      />

      <div className="rg-sticky-bar">
        <a href="#calculatrice" className="rg-btn rg-btn--primary">
          احسب الآن
        </a>
      </div>
    </div>
  );
}
