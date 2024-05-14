const { version } = require('./package.json');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@mui/icons-material'],
  },
  env: {
    version,
  },
};

module.exports = nextConfig;
