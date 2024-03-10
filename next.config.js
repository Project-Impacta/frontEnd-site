// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/**
 * @type {import('next').NextConfig}
 */

console.log('FrontEnd-NextConfig-CI/CD')
const nextConfig = {
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
}
module.exports = nextConfig
