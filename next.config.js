// eslint-disable-next-line @typescript-eslint/no-var-requires
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
    reactStrictMode: true,
    images: {
      unoptimized: true,
    },
    basePath: '/github-pages',
    distDir: 'build',
    sassOptions: {
      includePaths: [path.join(__dirname, 'src/styles')],
    },
  })
} else {
  console.log('Ambiente local vai ser iniciado!')
}

module.exports = nextConfig
