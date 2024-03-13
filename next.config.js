// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('./package.json')

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  extends: ['plugin:@next/next/recommended'],
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/github-pages',
  distDir: 'build',
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
