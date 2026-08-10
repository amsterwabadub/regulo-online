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
} from '@/lib/analytics';
import { IconChevronDown, IconArrowRight, IconAlert } from './Icons';

/**
 * Kenya country-home calculator.
 *
 * Calculation is delegated wholesale to the production engine
 * (`calculateKenyaSalary` via the country config) — this component only
 * arranges inputs and presents the result. Fields are limited to what that
 * engine actually consumes: gross salary, pay frequency, voluntary pension and
 * other voluntary deductions. The visual reference also showed "Work location"
 * and "Dependants"; Kenyan PAYE has no regional or dependant variation, so
 * those are deliberately absent rather than rendered as inert controls.
 */

/** Display formatter matching the Regulo result treatment: whole shillings. */
const formatKSh = (value: number) =>
  `KSh ${new Intl.NumberFormat('en-KE', { maximumFractionDigits: 0 }).format(Math.round(value))}`;

const formatPlain = (value: number) =>
  new Intl.NumberFormat('en-KE', { maximumFractionDigits: 0 }).format(Math.round(value));

/** Digits only — what we hand to the engine. */
const toDigits = (raw: string) => raw.replace(/[^\d]/g, '');

/** Grouped for display, so six- and seven-figure salaries stay readable. */
const groupDigits = (digits: string) =>
  digits === '' ? '' : new Intl.NumberFormat('en-KE').format(Number(digits));

const pick = (result: CalculationResult, id: string): FormulaOutputItem | undefined =>
  result.breakdown.find((item) => item.id === id);

interface DeductionLine {
  id: string;
  label: string;
  value: number;
}

export default function KenyaSalaryCalculator() {
  const config = getCalculatorConfigByCountry('ke');
  const baseId = useId();
  const pathname = usePathname() || '/ke';

  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    config?.inputs.forEach((field) => {
      initial[field.id] = field.defaultValue;
    });
    return initial;
  });

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Production calculation engine — untouched.
  const result = useMemo<CalculationResult | null>(
    () => (config ? config.calculate(inputs) : null),
    [config, inputs],
  );

  // Stored digits-only, so the value stays directly parseable by the engine
  // while the field displays it grouped.
  const grossDigits = toDigits(String(inputs.grossSalary ?? ''));
  const grossInvalid = grossDigits === '';

  useEffect(() => {
    if (config) trackCalculatorView(config.countryCode, config.id, pathname);
  }, [config, pathname]);

  const heroValue = result?.heroOutput.value ?? 0;

  useEffect(() => {
    if (!config || grossInvalid) return;
    trackCalculatorComplete(config.countryCode, config.id, pathname);
    trackResultView(config.countryCode, config.id, pathname);
    // Keyed on the computed figure so a settled result reports once, not per render.
  }, [heroValue, config, pathname, grossInvalid]);

  if (!config || !result) {
    return <div className="rg-calc">Kenya calculator configuration not found.</div>;
  }

  const handleChange = (fieldId: string, value: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackCalculatorStart(config.countryCode, config.id, pathname);
    }
    setInputs((prev) => ({ ...prev, [fieldId]: value }));
  };

  const isAnnual = inputs.payFrequency === 'annual';
  const periodLabel = isAnnual ? 'per year' : 'per month';

  const gross = pick(result, 'gross_salary')?.value ?? 0;
  const paye = pick(result, 'net_paye')?.value ?? 0;
  const shif = pick(result, 'shif')?.value ?? 0;
  const nssf = pick(result, 'nssf')?.value ?? 0;
  const housing = pick(result, 'housing_levy')?.value ?? 0;
  const totalDeductions = pick(result, 'total_deductions')?.value ?? 0;

  const lines: DeductionLine[] = [
    { id: 'paye', label: 'PAYE (tax)', value: paye },
    { id: 'shif', label: 'SHIF', value: shif },
    { id: 'nssf', label: 'NSSF (employee)', value: nssf },
    { id: 'housing', label: 'Housing Levy', value: housing },
  ];

  const statutory = shif + nssf + housing;
  // Every figure in the breakdown is monthly, including on an annual selection
  // (only the hero figure is annualised) — so the share bar uses monthly net.
  const monthlyNet = Math.max(0, gross - totalDeductions);
  const pct = (part: number) => (gross > 0 ? Math.min(100, Math.round((part / gross) * 100)) : 0);

  const advancedFields = config.inputs.filter(
    (f) => f.id === 'pension' || f.id === 'otherDeductions',
  );

  const errorId = `${baseId}-gross-error`;

  return (
    <div className="rg-calc" id="calculator">
      <h2 className="rg-calc__title">Calculate your net salary</h2>

      <div className="rg-calc__body">
        {/* ---------------------------------------------------------- inputs */}
        <div className="rg-calc__inputs">
          <div className="rg-field">
            <label className="rg-field__label" htmlFor={`${baseId}-gross`}>
              {isAnnual ? 'Gross annual salary' : 'Gross monthly salary'}
            </label>
            <div className="rg-field__control">
              <input
                id={`${baseId}-gross`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={groupDigits(grossDigits)}
                onChange={(e) => handleChange('grossSalary', toDigits(e.target.value))}
                aria-invalid={grossInvalid}
                aria-describedby={grossInvalid ? errorId : undefined}
              />
              <span className="rg-field__unit">KES</span>
            </div>
            {grossInvalid && (
              <p className="rg-field__error" id={errorId} role="alert">
                <IconAlert />
                Enter your gross salary to see a result.
              </p>
            )}
          </div>

          <div className="rg-field">
            <label className="rg-field__label" htmlFor={`${baseId}-frequency`}>
              Pay frequency
            </label>
            <select
              id={`${baseId}-frequency`}
              value={inputs.payFrequency}
              onChange={(e) => handleChange('payFrequency', e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
          </div>

          <button
            type="button"
            className="rg-advanced__toggle"
            aria-expanded={advancedOpen}
            aria-controls={`${baseId}-advanced`}
            onClick={() => setAdvancedOpen((v) => !v)}
          >
            Advanced options
            <IconChevronDown />
          </button>

          {advancedOpen && (
            <div className="rg-advanced__panel" id={`${baseId}-advanced`}>
              {advancedFields.map((field) => (
                <div className="rg-field" key={field.id}>
                  <label className="rg-field__label" htmlFor={`${baseId}-${field.id}`}>
                    {field.id === 'pension'
                      ? 'Voluntary pension contribution'
                      : 'Other voluntary deductions'}
                  </label>
                  <div className="rg-field__control">
                    <input
                      id={`${baseId}-${field.id}`}
                      type="number"
                      inputMode="decimal"
                      min={field.min ?? 0}
                      max={field.max}
                      step={field.step ?? 500}
                      value={inputs[field.id] ?? ''}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                    <span className="rg-field__unit">KES</span>
                  </div>
                  <p className="rg-field__help">{field.helpText}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* ---------------------------------------------------------- result */}
        <div className="rg-result" aria-live="polite">
          <p className="rg-result__label">Net salary estimate</p>
          <div className="rg-result__value">
            {grossInvalid ? '—' : formatKSh(result.heroOutput.value)}
          </div>
          <p className="rg-result__period">{periodLabel}</p>

          {/* The engine annualises only the headline figure; every breakdown
              line stays monthly. Say so, or the rows look like they fail to
              sum to the total above. */}
          {isAnnual && <p className="rg-result__caption">Deductions shown per month</p>}

          <dl className="rg-breakdown">
            {lines.map((line) => (
              <div className="rg-breakdown__row" key={line.id}>
                <dt>{line.label}</dt>
                <dd className="is-negative">
                  {grossInvalid ? '—' : `− ${formatPlain(line.value)}`}
                </dd>
              </div>
            ))}

            <div className="rg-result__total">
              <dt>Total deductions</dt>
              <dd>{grossInvalid ? '—' : `− ${formatPlain(totalDeductions)}`}</dd>
            </div>

            <div className="rg-result__net">
              <dt>Take-home pay</dt>
              <dd>{grossInvalid ? '—' : formatKSh(result.heroOutput.value)}</dd>
            </div>
          </dl>
        </div>

        {/* Employer-side figures the engine already computes but the page was
            not surfacing. A grid sibling rather than a child of the input
            column, so on mobile it falls below the result instead of pushing
            it off the fold. Monthly in both pay-frequency modes. */}
        {!grossInvalid && result.employerCost && (
          <div className="rg-employer">
            <p className="rg-employer__label">Total monthly cost to employer</p>
            <p className="rg-employer__value">{formatKSh(result.employerCost.totalCost)}</p>
            <ul className="rg-employer__list">
              {result.employerCost.items.slice(1).map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <span>{formatPlain(item.value)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Link href="/ke/net-salary-calculator" className="rg-btn rg-btn--accent rg-btn--block">
        View full breakdown
        <IconArrowRight />
      </Link>

      <p className="rg-calc__note">
        Estimate based on current KRA PAYE bands, NSSF, SHIF and Housing Levy rates. Your payslip may
        differ where allowances or benefits apply.
      </p>
    </div>
  );
}
