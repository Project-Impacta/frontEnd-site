// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    // Se você realmente precisa desativar a otimização de imagens (não recomendado),
    // você pode definir `unoptimized: true`. Caso contrário, é melhor remover essa linha
    // e deixar o Next.js otimizar suas imagens automaticamente.
    unoptimized: true,
  },
  basePath: '/github-pages',
  distDir: 'build',
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
}

module.exports = nextConfig
