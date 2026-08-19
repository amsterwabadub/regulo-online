import { CalculatorConfig, CalculationResult } from '@/types/calculator';

const formatMXN = (val: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  }).format(val);
};

export const calculateMexicoAguinaldo = (inputs: Record<string, any>): CalculationResult => {
  const monthlySalary = Math.max(0, Number(inputs.monthlySalary) || 0);
  const daysWorked = Math.min(365, Math.max(1, Number(inputs.daysWorked) || 365));
  const customDaysEntitled = Math.max(15, Number(inputs.customDaysEntitled) || 15);
  const calculationPeriod = inputs.calculationPeriod || 'february2026_onward';

  const dailySalary = monthlySalary / 30;
  const fullYearAguinaldo = dailySalary * customDaysEntitled;
  const grossAguinaldo = (fullYearAguinaldo * daysWorked) / 365;

  // UMA Effective Date Boundary:
  // Jan 1 to Jan 31, 2026: UMA 2025 = 113.14 MXN (30 UMA = 3,394.20 MXN)
  // Feb 1, 2026 onward (including Aguinaldo 2026 paid Dec 2026): UMA 2026 = 117.31 MXN (30 UMA = 3,519.30 MXN)
  const umaDaily = calculationPeriod === 'january2026' ? 113.14 : 117.31;
  const exemptLimit = 30 * umaDaily; // 3,519.30 MXN exempt for 2026 UMA
  const exemptAmount = Math.min(grossAguinaldo, exemptLimit);
  const taxableBase = Math.max(0, grossAguinaldo - exemptAmount);

  // ISR Marginal Rate Estimation (LISR 2026 Table Approximation)
  let effectiveIsrRate = 0;
  if (monthlySalary > 112741) {
    effectiveIsrRate = 0.34;
  } else if (monthlySalary > 59078) {
    effectiveIsrRate = 0.30;
  } else if (monthlySalary > 37480) {
    effectiveIsrRate = 0.2352;
  } else if (monthlySalary > 18585) {
    effectiveIsrRate = 0.2136;
  } else if (monthlySalary > 15522) {
    effectiveIsrRate = 0.1792;
  } else if (monthlySalary > 13353) {
    effectiveIsrRate = 0.16;
  } else if (monthlySalary > 7598) {
    effectiveIsrRate = 0.1088;
  } else if (monthlySalary > 895) {
    effectiveIsrRate = 0.064;
  } else {
    effectiveIsrRate = 0.0192;
  }

  const estimatedIsr = taxableBase * effectiveIsrRate;
  const netAguinaldo = Math.max(0, grossAguinaldo - estimatedIsr);

  return {
    heroOutput: {
      id: 'net_aguinaldo',
      label: 'Aguinaldo Neto a Recibir (2026)',
      value: netAguinaldo,
      formattedValue: formatMXN(netAguinaldo),
      isHero: true,
      type: 'positive',
      description: `Monto libre que recibirás antes del 20 de diciembre tras aplicar la exención de 30 UMA ($${exemptLimit.toFixed(2)} MXN) y retención de ISR.`,
    },
    breakdown: [
      {
        id: 'gross_aguinaldo',
        label: 'Aguinaldo Bruto',
        value: grossAguinaldo,
        formattedValue: formatMXN(grossAguinaldo),
        type: 'neutral',
        description: `Calculado sobre ${customDaysEntitled} días de salario por ${daysWorked} días trabajados en el año.`,
      },
      {
        id: 'exempt_amount',
        label: `Parte Exenta de ISR (30 UMA ${calculationPeriod === 'january2026' ? '2025' : '2026'})`,
        value: exemptAmount,
        formattedValue: `+ ${formatMXN(exemptAmount)}`,
        type: 'positive',
        description: `Monto libre de impuestos garantizado por Ley (Art. 93 Fracc. XIV LISR; UMA diaria $${umaDaily.toFixed(2)} MXN).`,
      },
      {
        id: 'taxable_base',
        label: 'Base Gravable para ISR',
        value: taxableBase,
        formattedValue: formatMXN(taxableBase),
        type: 'neutral',
      },
      {
        id: 'estimated_isr',
        label: 'Retención de ISR Estimada',
        value: estimatedIsr,
        formattedValue: `- ${formatMXN(estimatedIsr)}`,
        type: 'negative',
        description: `Impuesto sobre la Renta estimado al ${(effectiveIsrRate * 100).toFixed(2)}%.`,
      },
      {
        id: 'net_total',
        label: 'Monto Neto a Depositar',
        value: netAguinaldo,
        formattedValue: formatMXN(netAguinaldo),
        type: 'highlight',
      },
    ],
    notes: [
      'De acuerdo con la Ley Federal del Trabajo (Art. 87), el aguinaldo debe pagarse antes del 20 de diciembre.',
      `La exención de 30 UMA equivale a $${exemptLimit.toFixed(2)} MXN para el ejercicio 2026 (con UMA diaria oficial INEGI de $117.31 MXN vigente desde el 1 de febrero de 2026).`,
      'El cálculo aplica el procedimiento simplificado de retención de ISR de la Ley del Impuesto sobre la Renta.',
    ],
  };
};

export const MEXICO_CALCULATOR_CONFIG: CalculatorConfig = {
  id: 'mexico-aguinaldo',
  countryCode: 'mx',
  countryName: 'Mexico',
  flagEmoji: '🇲🇽',
  language: 'es',
  currencyCode: 'MXN',
  currencySymbol: '$',
  name: 'Calculadora Aguinaldo Neto México 2026',
  description: 'Calcula gratis tu aguinaldo neto 2026 en México conforme a la Ley Federal del Trabajo y exención oficial de 30 UMA del ISR ($3,519.30 MXN).',
  lastUpdated: '2026-08-10',
  inputs: [
    {
      id: 'monthlySalary',
      label: 'Salario Mensual Bruto ($ MXN)',
      type: 'currency',
      defaultValue: 25000,
      min: 0,
      step: 500,
      prefix: '$',
      helpText: 'Tu sueldo bruto mensual base antes de impuestos y deducciones.',
    },
    {
      id: 'daysWorked',
      label: 'Días Trabajados en el Año',
      type: 'number',
      defaultValue: 365,
      min: 1,
      max: 365,
      step: 1,
      suffix: 'días',
      helpText: 'Ingresa 365 si trabajaste el año completo, o el número proporcional de días.',
    },
    {
      id: 'customDaysEntitled',
      label: 'Días de Aguinaldo por Convenio',
      type: 'number',
      defaultValue: 15,
      min: 15,
      max: 90,
      step: 1,
      suffix: 'días',
      helpText: 'Mínimo de ley: 15 días. Algunas empresas ofrecen 20, 30 o 45 días.',
    },
    {
      id: 'calculationPeriod',
      label: 'Período de Aplicación UMA',
      type: 'select',
      defaultValue: 'february2026_onward',
      options: [
        { value: 'february2026_onward', label: 'Febrero - Diciembre 2026 (UMA 2026 = $117.31 MXN / 30 UMA = $3,519.30 MXN)' },
          ],
      helpText: 'Conforme a la Constitución y Ley de UMA, el valor oficial entra en vigor el 1 de febrero de cada año.',
    },
  ],
  calculate: calculateMexicoAguinaldo,
  pages: {
    'salario-neto-mexico': {
      slug: 'salario-neto-mexico',
      title: 'Salario Neto México 2026 — De Bruto a Neto Mensual',
      h1: 'Calculadora de Salario Neto México 2026',
      metaDescription: 'Calcula tu sueldo neto quincenal o mensual en México considerando deducciones del IMSS e ISR.',
      keywords: ['salario neto mexico', 'sueldo bruto a neto mexico', 'calculo nomina mexico'],
      canonicalUrl: 'https://regulo.online/mx/salario-neto-mexico',
      explanationMarkdown: `
### Salario Bruto vs Salario Neto en México

Conoce la diferencia entre lo que pactas en tu contrato laboral y lo que realmente recibes en tu nómina.
      `,
      faqs: [
        {
          question: '¿Cuáles son las deducciones obligatorias en la nómina en México?',
          answer: 'Las dos deducciones obligatorias principales son la cuota obrera del IMSS y la retención del ISR del SAT.',
        },
      ],
      relatedPages: [
          ],
    },
  },
};
