const path = require('path')

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
}

if (process.env.NEXT_PUBLIC_NODE_ENV !== 'local') {
  console.log('FrontEnd-NextConfig-CI/CD')
  Object.assign(nextConfig, {
    output: 'export',
    basePath: '/github-pages',
    distDir: 'build',
  })
} else {
  console.log('Ambiente local vai ser iniciado!')
}

module.exports = nextConfig
