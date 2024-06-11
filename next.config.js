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
    API_URL: process.env.API_URL,
    JWT_PASS: process.env.JWT_PASS,
    FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN,
    FRONTEND_TOKEN: process.env.FRONTEND_TOKEN,
  },
};

module.exports = nextConfig;
