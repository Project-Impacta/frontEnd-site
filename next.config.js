/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  basePath: '/github-pages',
  distDir: 'build'
}

module.exports = nextConfig
