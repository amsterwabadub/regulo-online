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
import { IconChevronDown, IconArrowRight, IconAlert, IconCheck, IconShieldCheck } from './Icons';

/**
 * Calculadora de aguinaldo neto — México.
 *
 * Every figure comes from the production engine `calculateMexicoAguinaldo`:
 * aguinaldo proporcional por días trabajados, exención de 30 UMA
 * (Art. 93 Fracc. XIV LISR) and the estimated ISR withholding.
 *
 * Deliberately NOT a salario neto calculator: production has no monthly net
 * salary engine and no IMSS logic, so the homepage leads with the calculation
 * that actually exists rather than the one the visual reference depicts.
 */

const fmtMXN = (v: number) =>
  `$${new Intl.NumberFormat('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v)}`;

const toDigits = (raw: string) => raw.replace(/[^\d]/g, '');
const groupDigits = (d: string) =>
  d === '' ? '' : new Intl.NumberFormat('es-MX').format(Number(d));

const pick = (r: CalculationResult, id: string): FormulaOutputItem | undefined =>
  r.breakdown.find((i) => i.id === id);

export default function MexicoAguinaldoCalculator() {
  const config = getCalculatorConfigByCountry('mx');
  const baseId = useId();
  const pathname = usePathname() || '/mx';

  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    config?.inputs.forEach((f) => {
      initial[f.id] = f.defaultValue;
    });
    return initial;
  });

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const result = useMemo<CalculationResult | null>(
    () => (config ? config.calculate(inputs) : null),
    [config, inputs],
  );

  const salaryDigits = toDigits(String(inputs.monthlySalary ?? ''));
  const salaryInvalid = salaryDigits === '';

  useEffect(() => {
    if (config) trackCalculatorView(config.countryCode, config.id, pathname);
  }, [config, pathname]);

  const netValue = result?.heroOutput.value ?? 0;

  useEffect(() => {
    if (!config || salaryInvalid) return;
    trackCalculatorComplete(config.countryCode, config.id, pathname);
    trackResultView(config.countryCode, config.id, pathname);
  }, [netValue, config, pathname, salaryInvalid]);

  if (!config || !result) {
    return <div className="rg-calc">No se encontró la configuración de México.</div>;
  }

  const change = (id: string, value: any) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackCalculatorStart(config.countryCode, config.id, pathname);
    }
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const bruto = pick(result, 'gross_aguinaldo')?.value ?? 0;
  const exento = pick(result, 'exempt_amount')?.value ?? 0;
  const gravable = pick(result, 'taxable_base')?.value ?? 0;
  const isr = pick(result, 'estimated_isr')?.value ?? 0;
  const neto = result.heroOutput.value;

  const errorId = `${baseId}-salario-error`;

  return (
    <div className="rg-calc" id="calculadora">
      <h2 className="rg-calc__title">Calcula tu aguinaldo neto</h2>

      <div className="rg-calc__body">
        <div className="rg-calc__inputs">
          <div className="rg-field">
            <label className="rg-field__label" htmlFor={`${baseId}-salario`}>
              Salario bruto mensual
            </label>
            <div className="rg-field__control">
              <span className="rg-field__unit" aria-hidden="true">
                $
              </span>
              <input
                id={`${baseId}-salario`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={groupDigits(salaryDigits)}
                onChange={(e) => change('monthlySalary', toDigits(e.target.value))}
                aria-invalid={salaryInvalid}
                aria-describedby={salaryInvalid ? errorId : undefined}
              />
              <span className="rg-field__unit">MXN</span>
            </div>
            {salaryInvalid && (
              <p className="rg-field__error" id={errorId} role="alert">
                <IconAlert />
                Escribe tu salario para ver el resultado.
              </p>
            )}
          </div>

          <div className="rg-field">
            <label className="rg-field__label" htmlFor={`${baseId}-dias`}>
              Días trabajados en el año
            </label>
            <div className="rg-field__control">
              <input
                id={`${baseId}-dias`}
                type="number"
                inputMode="numeric"
                min={1}
                max={365}
                value={inputs.daysWorked ?? 365}
                onChange={(e) => change('daysWorked', e.target.value)}
              />
              <span className="rg-field__unit">/ 365</span>
            </div>
          </div>

          <button
            type="button"
            className="rg-advanced__toggle"
            aria-expanded={advancedOpen}
            aria-controls={`${baseId}-avanzadas`}
            onClick={() => setAdvancedOpen((v) => !v)}
          >
            Opciones avanzadas
            <IconChevronDown />
          </button>

          {advancedOpen && (
            <div className="rg-advanced__panel" id={`${baseId}-avanzadas`}>
              <div className="rg-field">
                <label className="rg-field__label" htmlFor={`${baseId}-dias-ag`}>
                  Días de aguinaldo por contrato
                </label>
                <div className="rg-field__control">
                  <input
                    id={`${baseId}-dias-ag`}
                    type="number"
                    inputMode="numeric"
                    min={15}
                    max={90}
                    value={inputs.customDaysEntitled ?? 15}
                    onChange={(e) => change('customDaysEntitled', e.target.value)}
                  />
                  <span className="rg-field__unit">días</span>
                </div>
                <p className="rg-field__help">
                  La Ley Federal del Trabajo (Art. 87) marca un mínimo de 15 días.
                </p>
              </div>

              <div className="rg-field">
                <label className="rg-field__label" htmlFor={`${baseId}-uma`}>
                  Periodo de aplicación de la UMA
                </label>
                <select
                  id={`${baseId}-uma`}
                  value={inputs.calculationPeriod}
                  onChange={(e) => change('calculationPeriod', e.target.value)}
                >
                  <option value="february2026_onward">Febrero–diciembre 2026 (UMA $117.31)</option>
                  <option value="january2026">Enero 2026 (UMA $113.14)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Two-column result card, per the Mexico style guide */}
        <div className="rg-mx-result" aria-live="polite">
          <div className="rg-mx-result__figure">
            <span className="rg-mx-result__label">Aguinaldo neto estimado</span>
            <span className="rg-mx-result__value">{salaryInvalid ? '—' : fmtMXN(neto)}</span>
            <span className="rg-mx-result__unit">MXN</span>
            <span className="rg-mx-pill">
              <IconCheck size={14} /> Cálculo estimado
            </span>
          </div>

          <dl className="rg-mx-result__rows">
            <div>
              <dt>Aguinaldo bruto</dt>
              <dd>{salaryInvalid ? '—' : fmtMXN(bruto)}</dd>
            </div>
            <div>
              <dt>Parte exenta (30 UMA)</dt>
              <dd className="is-pos">{salaryInvalid ? '—' : fmtMXN(exento)}</dd>
            </div>
            <div>
              <dt>Base gravable</dt>
              <dd>{salaryInvalid ? '—' : fmtMXN(gravable)}</dd>
            </div>
            <div>
              <dt>ISR retenido</dt>
              <dd className="is-neg">{salaryInvalid ? '—' : `−${fmtMXN(isr)}`}</dd>
            </div>
            <div>
              <dt>Neto a recibir</dt>
              <dd>{salaryInvalid ? '—' : fmtMXN(neto)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <Link href="/mx/aguinaldo-calculator" className="rg-btn rg-btn--primary rg-btn--block">
        Ver resultado completo
        <IconArrowRight />
      </Link>

      <p className="rg-mx-note">
        <IconShieldCheck size={16} />
        Cálculo basado en la Ley Federal del Trabajo y la LISR vigentes. Es informativo y no
        sustituye la asesoría profesional.
      </p>
    </div>
  );
}
