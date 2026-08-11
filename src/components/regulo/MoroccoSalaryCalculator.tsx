'use client';

import React, { useEffect, useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCalculatorConfigByCountry } from '@/config/calculators';
import { CalculationResult, FormulaOutputItem } from '@/types/calculator';
import {
  trackCalculatorView,
  trackCalculatorStart,
  trackCalculatorComplete,
  trackResultView,
  getSalaryBand,
} from '@/lib/analytics';
import { IconChevronDown, IconArrowRight, IconAlert } from './Icons';

/**
 * حاسبة الأجر الصافي — المغرب.
 *
 * Every figure comes from the production engine `calculateMoroccoSalary`:
 * CNSS (4,48% plafonné à 6 000 DH), AMO (2,26%), frais professionnels
 * (CGI art. 59), salaire net imposable, the IR barème 2026 (loi 55-23) and
 * charges de famille. Only the engine's two real inputs are exposed — the
 * reference's "city" and "marital status" fields do not exist and would be
 * inert controls.
 *
 * Amounts and Latin abbreviations are wrapped in .rg-num (direction: ltr,
 * unicode-bidi: isolate) so nothing reorders inside the Arabic run.
 */

const groupNum = (n: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n));

const toDigits = (raw: string) => raw.replace(/[^\d]/g, '');
const groupDigits = (d: string) =>
  d === '' ? '' : new Intl.NumberFormat('en-US').format(Number(d));

const pick = (r: CalculationResult, id: string): FormulaOutputItem | undefined =>
  r.breakdown.find((i) => i.id === id);

/** Isolated numeric run — keeps digits, separators and signs left-to-right. */
function Num({ children }: { children: React.ReactNode }) {
  return <bdi className="rg-num">{children}</bdi>;
}

export default function MoroccoSalaryCalculator() {
  const config = getCalculatorConfigByCountry('ma');
  const baseId = useId();
  const pathname = usePathname() || '/ma';

  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    config?.inputs.forEach((f) => {
      initial[f.id] = f.defaultValue;
    });
    // The supplied style guide demonstrates 20 000 DH.
    initial.grossSalary = '20000';
    return initial;
  });

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const result = useMemo<CalculationResult | null>(
    () => (config ? config.calculate(inputs) : null),
    [config, inputs],
  );

  const grossDigits = toDigits(String(inputs.grossSalary ?? ''));
  const grossInvalid = grossDigits === '';

  useEffect(() => {
    if (config) trackCalculatorView(config.countryCode, config.id, pathname);
  }, [config, pathname]);

  const netValue = result?.heroOutput.value ?? 0;

  useEffect(() => {
    // Only after a genuine interaction. Firing on mount would make
    // calculator_complete a page-load proxy rather than a funnel step.
    if (!config || !hasStarted || grossInvalid) return;
    // Band only — the exact figure is never sent.
    const band = getSalaryBand(Number(grossDigits) || 0, config.currencyCode);
    trackCalculatorComplete(config.countryCode, config.id, pathname, { salary_band: band });
    trackResultView(config.countryCode, config.id, pathname);
    }, [netValue, config, pathname, grossInvalid, hasStarted, grossDigits]);

  if (!config || !result) {
    return <div className="rg-calc">تعذّر تحميل إعدادات المغرب.</div>;
  }

  const change = (id: string, value: any) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackCalculatorStart(config.countryCode, config.id, pathname);
    }
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const dependents = Math.min(6, Math.max(0, Number(inputs.dependents) || 0));
  const cnss = pick(result, 'cnss')?.value ?? 0;
  const amo = pick(result, 'amo')?.value ?? 0;
  const netIr = pick(result, 'net_ir')?.value ?? 0;
  const fraisPro = pick(result, 'frais_pro')?.value ?? 0;
  const netImposable = pick(result, 'net_imposable')?.value ?? 0;
  const totalDeductions = pick(result, 'total_deductions')?.value ?? 0;
  const net = result.heroOutput.value;

  const lines = [
    { id: 'cnss', label: 'مساهمة CNSS', value: cnss },
    { id: 'amo', label: 'التأمين الإجباري AMO', value: amo },
    { id: 'ir', label: 'الضريبة على الدخل IR', value: netIr },
  ];

  const errorId = `${baseId}-brut-error`;

  return (
    <div className="rg-calc" id="calculatrice">
      <h2 className="rg-calc__title">احسب أجرك الصافي</h2>

      <div className="rg-calc__body">
        <div className="rg-calc__inputs">
          <div className="rg-field">
            <label className="rg-field__label" htmlFor={`${baseId}-brut`}>
              الراتب الإجمالي الشهري
            </label>
            <div className="rg-field__control">
              <input
                id={`${baseId}-brut`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                dir="ltr"
                style={{ textAlign: 'start' }}
                value={groupDigits(grossDigits)}
                onChange={(e) => change('grossSalary', toDigits(e.target.value))}
                aria-invalid={grossInvalid}
                aria-describedby={grossInvalid ? errorId : undefined}
              />
              <span className="rg-field__unit">درهم</span>
            </div>
            {grossInvalid && (
              <p className="rg-field__error" id={errorId} role="alert">
                <IconAlert />
                أدخل راتبك الإجمالي لعرض النتيجة.
              </p>
            )}
          </div>

          <div className="rg-field">
            <label className="rg-field__label" htmlFor={`${baseId}-charges`}>
              عدد الأشخاص المكفولين
            </label>
            <div className="rg-field__control">
              <input
                id={`${baseId}-charges`}
                type="number"
                inputMode="numeric"
                min={0}
                max={6}
                dir="ltr"
                style={{ textAlign: 'start' }}
                value={dependents}
                onChange={(e) => change('dependents', e.target.value)}
              />
              <span className="rg-field__unit">/ 6 كحد أقصى</span>
            </div>
            <p className="rg-field__help">
              تخفيض <Num>50</Num> درهماً شهرياً عن كل شخص مكفول (المادة <Num>74</Num> من المدونة
              العامة للضرائب).
            </p>
          </div>

          <button
            type="button"
            className="rg-advanced__toggle"
            aria-expanded={advancedOpen}
            aria-controls={`${baseId}-details`}
            onClick={() => setAdvancedOpen((v) => !v)}
          >
            تفاصيل الاحتساب
            <IconChevronDown />
          </button>

          {advancedOpen && (
            <div className="rg-advanced__panel" id={`${baseId}-details`}>
              <dl className="rg-breakdown">
                <div className="rg-breakdown__row">
                  <dt>المصاريف المهنية</dt>
                  <dd>
                    <Num>{groupNum(fraisPro)}</Num> درهم
                  </dd>
                </div>
                <div className="rg-breakdown__row">
                  <dt>الدخل الصافي الخاضع للضريبة</dt>
                  <dd>
                    <Num>{groupNum(netImposable)}</Num> درهم
                  </dd>
                </div>
                <div className="rg-breakdown__row">
                  <dt>مجموع الاقتطاعات</dt>
                  <dd>
                    <Num>{groupNum(totalDeductions)}</Num> درهم
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>

        <div className="rg-result" aria-live="polite">
          <p className="rg-result__label">الراتب الصافي التقديري</p>
          <div className="rg-result__value">
            {grossInvalid ? '—' : (
              <>
                <Num>{groupNum(net)}</Num> درهم
              </>
            )}
          </div>
          <p className="rg-result__period">شهرياً</p>

          <dl className="rg-breakdown">
            {lines.map((l) => (
              <div className="rg-breakdown__row" key={l.id}>
                <dt>{l.label}</dt>
                <dd className="is-negative">
                  {grossInvalid ? '—' : (
                    <>
                      <Num>−{groupNum(l.value)}</Num> د.م
                    </>
                  )}
                </dd>
              </div>
            ))}

            <div className="rg-result__total">
              <dt>إجمالي الاقتطاعات</dt>
              <dd>
                {grossInvalid ? '—' : (
                  <>
                    <Num>−{groupNum(totalDeductions)}</Num> د.م
                  </>
                )}
              </dd>
            </div>

            <div className="rg-result__net">
              <dt>الأجر الصافي</dt>
              <dd>
                {grossInvalid ? '—' : (
                  <>
                    <Num>{groupNum(net)}</Num> درهم
                  </>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <Link href="/ma/salaire-net-calculateur" className="rg-btn rg-btn--primary rg-btn--block">
        عرض النتيجة الكاملة
        <IconArrowRight />
        <span className="rg-ma-fr">FR</span>
      </Link>

      <p className="rg-calc__note">
        نتائج تقديرية وفق جدول الضريبة على الدخل لسنة <Num>2026</Num> ومساهمات CNSS و AMO. قد تختلف
        حسب وضعيتك المهنية.
      </p>
    </div>
  );
}
