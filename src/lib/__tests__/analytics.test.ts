/**
 * Regression tests for the dual-stack event helper.
 *
 * The defect these lock down: trackGA4Event pushed to window.dataLayer only, so
 * Metrika counter 111495493 recorded page traffic but could never record a
 * product event — it had zero goals and zero goal reaches while GA4 counted 32
 * calculator_complete over the same window.
 */
import { describe, it, expect, afterEach } from 'vitest';
import { trackCalculatorComplete, trackGA4Event, getSalaryBand } from '../analytics';

declare const globalThis: any;

function installWindow(withYm = true) {
  const ymCalls: any[] = [];
  const w: any = { dataLayer: [] };
  if (withYm) w.ym = (...args: any[]) => ymCalls.push(args);
  globalThis.window = w;
  return { w, ymCalls };
}

afterEach(() => {
  delete globalThis.window;
});

describe('analytics transmission', () => {
  it('queues a non-empty dataLayer entry for GA4', () => {
    const { w } = installWindow();
    trackGA4Event('calculator_view', {
      country: 'ke', calculator_id: 'paye', page_path: '/ke',
      calculator_type: 'tax_payroll',
    });
    expect(w.dataLayer).toHaveLength(1);
    const entry = Array.from(w.dataLayer[0] as ArrayLike<unknown>);
    expect(entry[0]).toBe('event');
    expect(entry[1]).toBe('calculator_view');
  });

  it('sends the same event name to Metrika as a reachGoal', () => {
    const { ymCalls } = installWindow();
    trackCalculatorComplete('ke', 'paye', '/ke', {
      salary_band: getSalaryBand(85000, 'KES'),
    });
    expect(ymCalls).toHaveLength(1);
    expect(ymCalls[0][0]).toBe(111495493);
    expect(ymCalls[0][1]).toBe('reachGoal');
    // The goal identifier must equal the GA4 event name, or a Metrika `action`
    // goal configured against it never fires.
    expect(ymCalls[0][2]).toBe('calculator_complete');
    expect(ymCalls[0][3]).toMatchObject({ country: 'ke', calculator_id: 'paye' });
  });

  it('sends a salary band and never the raw figure', () => {
    const { ymCalls } = installWindow();
    trackCalculatorComplete('ke', 'paye', '/ke', {
      salary_band: getSalaryBand(85000, 'KES'),
    });
    const flat = JSON.stringify(ymCalls[0][3]);
    expect(flat).toContain('KES_50000-100000');
    expect(flat).not.toContain('85000');
  });

  it('still reaches GA4 when Metrika is blocked or not yet loaded', () => {
    const { w, ymCalls } = installWindow(false);
    trackCalculatorComplete('mx', 'aguinaldo', '/mx');
    expect(ymCalls).toHaveLength(0);
    expect(w.dataLayer).toHaveLength(1);
  });
});
