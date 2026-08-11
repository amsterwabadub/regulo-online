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
 * Calculadora de salario neto — Colombia.
 *
 * Delegates every figure to the production engine
 * (`calculateColombiaRetefuente`): Art. 383 E.T. brackets in UVT, aportes
 * obligatorios, FSP, deducciones del Art. 387 and the 25% renta exenta. This
 * component only arranges inputs and presents the result.
 *
 * The engine's headline output is the retención; the homepage leads with
 * `net_takehome` ("Salario Neto Aproximado en Banco") because that is the
 * dominant consumer intent, with the retención kept as its own line.
 */

const fmtCOP = (value: number) =>
  `$ ${new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(Math.round(value))}`;

const fmtPlain = (value: number) =>
  new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(Math.round(value));

const toDigits = (raw: string) => raw.replace(/[^\d]/g, '');
const groupDigits = (digits: string) =>
  digits === '' ? '' : new Intl.NumberFormat('es-CO').format(Number(digits));

const pick = (r: CalculationResult, id: string): FormulaOutputItem | undefined =>
  r.breakdown.find((i) => i.id === id);

/** Matches the supplied Colombia style guide rather than the engine's own
 *  default of 15,000,000, which is unrepresentative of most salaries. */
const INITIAL_GROSS = '3000000';

export default function ColombiaSalaryCalculator() {
  const config = getCalculatorConfigByCountry('co');
  const baseId = useId();
  const pathname = usePathname() || '/co';

  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    config?.inputs.forEach((f) => {
      initial[f.id] = f.defaultValue;
    });
    initial.grossSalary = INITIAL_GROSS;
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

  const netValue = pick(result as CalculationResult, 'net_takehome')?.value ?? 0;

  useEffect(() => {
    // Only after a genuine interaction. Firing on mount would make
    // calculator_complete a page-load proxy rather than a funnel step.
    if (!config || !hasStarted || grossInvalid) return;
    trackCalculatorComplete(config.countryCode, config.id, pathname);
    trackResultView(config.countryCode, config.id, pathname);
    }, [netValue, config, pathname, grossInvalid, hasStarted]);

  if (!config || !result) {
    return <div className="rg-calc">No se encontró la configuración de Colombia.</div>;
  }

  const change = (id: string, value: any) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackCalculatorStart(config.countryCode, config.id, pathname);
    }
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const gross = pick(result, 'gross_salary')?.value ?? 0;
  const aportes = pick(result, 'health_pension')?.value ?? 0;
  const fsp = pick(result, 'fsp')?.value ?? 0;
  const retefuente = pick(result, 'retefuente_total')?.value ?? 0;
  const net = pick(result, 'net_takehome')?.value ?? 0;
  const baseCop = pick(result, 'taxable_base_cop')?.value ?? 0;
  const baseUvt = pick(result, 'taxable_base_uvt')?.value ?? 0;
  const totalDeducciones = Math.max(0, gross - net);

  const lines = [
    { id: 'aportes', label: 'Salud y pensión', value: aportes },
    { id: 'fsp', label: 'Solidaridad pensional', value: fsp },
    { id: 'rete', label: 'Retención en la fuente', value: retefuente },
  ];

  const errorId = `${baseId}-bruto-error`;

  return (
    <div className="rg-calc" id="calculadora">
      <h2 className="rg-calc__title">Calcula tu salario neto</h2>

      <div className="rg-calc__body">
        <div className="rg-calc__inputs">
          <div className="rg-field">
            <label className="rg-field__label" htmlFor={`${baseId}-bruto`}>
              Ingreso mensual bruto
            </label>
            <div className="rg-field__control">
              <span className="rg-field__unit" aria-hidden="true">
                $
              </span>
              <input
                id={`${baseId}-bruto`}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={groupDigits(grossDigits)}
                onChange={(e) => change('grossSalary', toDigits(e.target.value))}
                aria-invalid={grossInvalid}
                aria-describedby={grossInvalid ? errorId : undefined}
              />
              <span className="rg-co-chip">
                <span aria-hidden="true">🇨🇴</span> COP
              </span>
            </div>
            {grossInvalid && (
              <p className="rg-field__error" id={errorId} role="alert">
                <IconAlert />
                Ingresa tu salario bruto para ver el resultado.
              </p>
            )}
          </div>

          <button
            type="button"
            className="rg-advanced__toggle"
            aria-expanded={advancedOpen}
            aria-controls={`${baseId}-avanzadas`}
            onClick={() => setAdvancedOpen((v) => !v)}
          >
            Ver opciones avanzadas
            <IconChevronDown />
          </button>

          {advancedOpen && (
            <div className="rg-advanced__panel" id={`${baseId}-avanzadas`}>
              <div className="rg-field">
                <label className="rg-check">
                  <input
                    type="checkbox"
                    checked={Boolean(inputs.hasDependents)}
                    onChange={(e) => change('hasDependents', e.target.checked)}
                  />
                  <span>Tengo dependientes a cargo</span>
                </label>
                <p className="rg-field__help">
                  Deducción del 10% del ingreso, hasta 32 UVT al mes (Art. 387 E.T.).
                </p>
              </div>

              <div className="rg-field">
                <label className="rg-field__label" htmlFor={`${baseId}-vivienda`}>
                  Intereses de crédito hipotecario
                </label>
                <div className="rg-field__control">
                  <span className="rg-field__unit" aria-hidden="true">
                    $
                  </span>
                  <input
                    id={`${baseId}-vivienda`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={groupDigits(toDigits(String(inputs.housingInterest ?? '')))}
                    onChange={(e) => change('housingInterest', toDigits(e.target.value))}
                  />
                  <span className="rg-co-chip">COP</span>
                </div>
              </div>

              <div className="rg-field">
                <label className="rg-field__label" htmlFor={`${baseId}-prepagada`}>
                  Medicina prepagada
                </label>
                <div className="rg-field__control">
                  <span className="rg-field__unit" aria-hidden="true">
                    $
                  </span>
                  <input
                    id={`${baseId}-prepagada`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={groupDigits(toDigits(String(inputs.prepaidHealth ?? '')))}
                    onChange={(e) => change('prepaidHealth', toDigits(e.target.value))}
                  />
                  <span className="rg-co-chip">COP</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rg-result" aria-live="polite">
          <p className="rg-result__label">Salario neto estimado</p>
          <div className="rg-result__value">{grossInvalid ? '—' : fmtCOP(net)}</div>
          <p className="rg-result__period">COP / mes</p>

          <dl className="rg-breakdown">
            {lines.map((l) => (
              <div className="rg-breakdown__row" key={l.id}>
                <dt>{l.label}</dt>
                <dd className="is-negative">
                  {grossInvalid ? '—' : l.value > 0 ? `− ${fmtPlain(l.value)}` : '$ 0'}
                </dd>
              </div>
            ))}

            <div className="rg-result__total">
              <dt>Total deducciones</dt>
              <dd>{grossInvalid ? '—' : `− ${fmtPlain(totalDeducciones)}`}</dd>
            </div>

            <div className="rg-result__net">
              <dt>Total a recibir</dt>
              <dd>{grossInvalid ? '—' : fmtCOP(net)}</dd>
            </div>
          </dl>

          {/* Below ~95 UVT of taxable base there is genuinely no retención —
              worth saying, rather than leaving a bare $0. */}
          {!grossInvalid && retefuente === 0 && gross > 0 && (
            <p className="rg-result__caption" style={{ marginTop: 12, marginBottom: 0 }}>
              Con este ingreso no aplica retención en la fuente.
            </p>
          )}
        </div>

        {/* Base gravable en UVT — real engine output, and the unit Colombians
            actually reason in. Secondary to the net figure. */}
        {!grossInvalid && (
          <div className="rg-co-base">
            <p className="rg-co-base__k">Base gravable</p>
            <p className="rg-co-base__v">{fmtCOP(baseCop)}</p>
            <p className="rg-co-base__u">{baseUvt.toFixed(2)} UVT · valor UVT $52.374</p>
          </div>
        )}
      </div>

      <Link href="/co/retefuente-calculadora" className="rg-btn rg-btn--accent rg-btn--block">
        Ver resultado completo
        <IconArrowRight />
      </Link>

      <p className="rg-calc__note">
        Cálculo aproximado con la UVT 2026 ($52.374) y la tabla del Art. 383 E.T. Puede variar según
        tu contrato y otras prestaciones.
      </p>
    </div>
  );
}
