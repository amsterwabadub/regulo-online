import type { Metadata } from 'next';
import { Sora, Public_Sans, Cairo } from 'next/font/google';
import './globals.css';
import './regulo.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GlobalChrome, { MainSlot } from '@/components/GlobalChrome';
import GoogleAnalytics from '@/components/GoogleAnalytics';

// Self-hosted by next/font — no render-blocking request to Google, and the
// variables are only consumed by `.rg-page`, so existing pages are unaffected.
const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

// Arabic UI face for the Morocco subtree. The supplied style guide specifies
// "Baghdad", a macOS system font that cannot be shipped as a webfont; Cairo is
// the closest high-quality distributable equivalent.
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  // Yandex Webmaster ownership verification. The host was registered against the
  // existing shared Operator Ventures grant; this only proves ownership.
  verification: { yandex: '646cbdcf7b69dbcc' },
  metadataBase: new URL('https://regulo.online'),
  title: {
    default: 'Regulo — Global Statutory & Payroll Calculators 2026',
    template: '%s | Regulo',
  },
  description:
    'Instant, accurate, and localized statutory administrative calculators for Kenya, Mexico, Morocco, and Colombia updated for 2026 tax regulations.',
  keywords: [
    'regulo',
    'regulo online',
    'kenya net salary calculator 2026',
    'aguinaldo neto calculadora mexico 2026',
    'calculateur salaire net maroc 2026',
    'retencion en la fuente calculadora colombia 2026',
    'statutory tax calculator',
  ],
  authors: [{ name: 'Regulo Regulatory Engine' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://regulo.online',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://regulo.online',
    title: 'Regulo — Global Statutory & Payroll Calculators 2026',
    description:
      'Localized statutory administrative calculators solving mandatory financial, tax, and employment questions worldwide.',
    siteName: 'Regulo',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  // Yandex Metrika counter for regulo.online, created in the existing Operator
  // Ventures Metrika account. Env-overridable; no secret involved.
  const ymId = process.env.NEXT_PUBLIC_YM_ID || '111495493';

  return (
    <html lang="en" className={`${sora.variable} ${publicSans.variable} ${cairo.variable}`}>
      <body>
        <GoogleAnalytics gaId={gaId} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(${ymId}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
            `,
          }}
        />
        <noscript>
          <div>
            <img src={`https://mc.yandex.ru/watch/${ymId}`} style={{ position: 'absolute', left: '-9999px' }} alt="" />
          </div>
        </noscript>
        <GlobalChrome>
          <Header />
        </GlobalChrome>
        <MainSlot>{children}</MainSlot>
        <GlobalChrome>
          <Footer />
        </GlobalChrome>
      </body>
    </html>
  );
}
