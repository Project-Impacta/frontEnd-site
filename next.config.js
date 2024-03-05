// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

/**
 * @type {import('next').NextConfig}
 */
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
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]',
          publicPath: '/_next/static/assets',
          outputPath: 'static/assets',
          esModule: false,
        },
      },
    })

    return config
  },
}

// eslint-disable-next-line no-undef
module.exports = nextConfig
