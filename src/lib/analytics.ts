/**
 * Regulo analytics.
 *
 * Events are pushed onto `window.dataLayer` using the standard gtag shim shape
 * rather than calling `window.gtag` directly. gtag.js is loaded with
 * next/script `afterInteractive`, so a guard on `window.gtag` silently dropped
 * every event that fired during hydration — which is why 40 users produced only
 * 8 calculator events. dataLayer exists before gtag.js finishes loading and
 * gtag.js drains it on arrival, so nothing is lost.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: unknown[];
  }
}

export type GAEventName =
  | 'calculator_view'
  | 'calculator_start'
  | 'calculator_complete'
  | 'result_view'
  | 'commercial_cta_view'
  | 'commercial_cta_click'
  | 'affiliate_redirect'
  | 'outbound_click'
  | 'share_result';

export interface GAEventParams {
  country: string;
  calculator_id: string;
  page_path: string;
  calculator_type: string;
  [key: string]: any;
}

/** Standard gtag shim: gtag.js reads the pushed `arguments` object. */
function dataLayerPush(..._args: unknown[]) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

export const trackGA4Event = (eventName: GAEventName, params: GAEventParams) => {
  if (typeof window === 'undefined') return;
  // Never send exact salary, deduction or tax values — only bands and ids.
  dataLayerPush('event', eventName, { ...params });
};

/** Coarse, non-identifying salary band. Never the exact figure. */
export function getSalaryBand(value: number, currency: string): string {
  if (!Number.isFinite(value) || value <= 0) return 'unknown';
  const buckets = [1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 1000000];
  const idx = buckets.findIndex((b) => value <= b);
  if (idx === -1) return `${currency}_1000000+`;
  const lo = idx === 0 ? 0 : buckets[idx - 1];
  return `${currency}_${lo}-${buckets[idx]}`;
}

const base = (country: string, calculatorId: string, pagePath: string) => ({
  country,
  market: country.toUpperCase(),
  calculator_id: calculatorId,
  page_path: pagePath,
  landing_page: pagePath,
  calculator_type: 'tax_payroll',
});

export const trackCalculatorView = (country: string, calculatorId: string, pagePath: string) => {
  trackGA4Event('calculator_view', base(country, calculatorId, pagePath));
};

export const trackCalculatorStart = (
  country: string,
  calculatorId: string,
  pagePath: string,
  extra: Record<string, string> = {},
) => {
  trackGA4Event('calculator_start', { ...base(country, calculatorId, pagePath), ...extra });
};

export const trackCalculatorComplete = (
  country: string,
  calculatorId: string,
  pagePath: string,
  extra: Record<string, string> = {},
) => {
  trackGA4Event('calculator_complete', { ...base(country, calculatorId, pagePath), ...extra });
};

export const trackResultView = (
  country: string,
  calculatorId: string,
  pagePath: string,
  extra: Record<string, string> = {},
) => {
  trackGA4Event('result_view', { ...base(country, calculatorId, pagePath), ...extra });
};

export const trackShareResult = (country: string, calculatorId: string, pagePath: string) => {
  trackGA4Event('share_result', {
    country,
    calculator_id: calculatorId,
    page_path: pagePath,
    calculator_type: 'tax_payroll',
  });
};

export const trackOutboundClick = (country: string, calculatorId: string, pagePath: string, destinationUrl: string) => {
  trackGA4Event('outbound_click', {
    country,
    calculator_id: calculatorId,
    page_path: pagePath,
    calculator_type: 'tax_payroll',
    destination_url: destinationUrl,
  });
};
