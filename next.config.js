/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { version } = require('./package.json')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  experimental: {
    optimizePackageImports: ['@mui/icons-material'],
  },
  env: {
    version,
  },
}

module.exports = nextConfig
