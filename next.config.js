// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/**
 * @type {import('next').NextConfig}
 */

// if (process.env.NEXT_PUBLIC_NODE_ENV !== 'local') {
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
// } else {
//   console.log('Ambiente local vai ser iniciado!')
//   const nextConfig = {
//     reactStrictMode: true,
//     images: {
//       unoptimized: true,
//     },
//     sassOptions: {
//       includePaths: [path.join(__dirname, 'src/styles')],
//     },
//   }
//   module.exports = nextConfig
// }
