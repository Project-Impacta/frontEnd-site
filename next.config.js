/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
  basePath: '/github-pages',
  assetPrefix: '/github-pages/',
  distDir: 'build',
}

module.exports = nextConfig
