const { version } = require('./package.json')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/github-pages',
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['@mui/icons-material'],
  },
  env: {
    version,
  },
}

module.exports = nextConfig
