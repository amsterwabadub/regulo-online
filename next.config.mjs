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
    ];
  },
};

export default nextConfig;
