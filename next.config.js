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
  env: {
    version,
  },
};

module.exports = nextConfig;
