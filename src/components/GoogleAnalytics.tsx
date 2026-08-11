'use client';

import Script from 'next/script';

/**
 * The gtag shim and `config` call are emitted as a plain inline script so they
 * execute while the HTML is parsed — before React hydration. Previously both
 * were `afterInteractive`, so calculator events fired during hydration were
 * pushed to a dataLayer that gtag.js had not yet been configured for.
 * The heavy gtag.js download stays async/afterInteractive.
 */
export default function GoogleAnalytics({ gaId }: { gaId: string }) {
  if (!gaId) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { page_path: window.location.pathname });
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
    </>
  );
}
