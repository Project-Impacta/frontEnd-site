const { version } = require('./package.json')

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
    optimizePackageImports: ['@mui/icons-material', '@telefonica/mistica'],
  },
  env: {
    version,
  },
}

module.exports = nextConfig
