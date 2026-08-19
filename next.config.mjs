import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve('./'),
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.regulo.online' }],
        destination: 'https://regulo.online/:path*',
        permanent: true,
      },
      // Retired 2026-08-19. Sibling pages inside each country measured 65-69%
      // six-gram overlap with each other — five Mexican URLs competing for one
      // aguinaldo intent, four Colombian for one retefuente intent. Google
      // crawled three pages on 11-12 August and did not come back; 22 of 25 URLs
      // are still "unknown to Google". Folding the duplicates into the strongest
      // page in each country is the change that addresses that.
      {
        source: '/mx/aguinaldo-calculator',
        destination: '/mx',
        permanent: true,
      },
      {
        source: '/mx/aguinaldo-neto-calculadora-2026',
        destination: '/mx',
        permanent: true,
      },
      {
        source: '/mx/isr-aguinaldo-calculator',
        destination: '/mx',
        permanent: true,
      },
      {
        source: '/mx/calculadora-isr-mexico',
        destination: '/mx/salario-neto-mexico',
        permanent: true,
      },
      {
        source: '/ke/kenya-net-salary-calculator-2026',
        destination: '/ke/net-salary-calculator',
        permanent: true,
      },
      {
        source: '/ke/paye-calculator-kenya',
        destination: '/ke/net-salary-calculator',
        permanent: true,
      },
      {
        source: '/ke/housing-levy-calculator-kenya',
        destination: '/ke/shif-calculator-kenya',
        permanent: true,
      },
      {
        source: '/co/retefuente-calculadora-2026',
        destination: '/co/retefuente-calculadora',
        permanent: true,
      },
      {
        source: '/co/uvt-calculator',
        destination: '/co/retefuente-calculadora',
        permanent: true,
      },
      {
        source: '/co/salario-neto-colombia',
        destination: '/co/retefuente-calculadora',
        permanent: true,
      },
      {
        source: '/ma/calculateur-salaire-net-maroc',
        destination: '/ma/salaire-net-calculateur',
        permanent: true,
      },
      {
        source: '/ma/salaire-brut-net-maroc',
        destination: '/ma/salaire-net-calculateur',
        permanent: true,
      },
      {
        source: '/ma/calcul-ir-maroc',
        destination: '/ma/salaire-net-calculateur',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
