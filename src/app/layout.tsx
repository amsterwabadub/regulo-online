import type { Metadata } from 'next';
import { Sora, Public_Sans } from 'next/font/google';
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

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans',
  display: 'swap',
});

export const metadata: Metadata = {
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

  return (
    <html lang="en" className={`${sora.variable} ${publicSans.variable}`}>
      <body>
        <GoogleAnalytics gaId={gaId} />
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
