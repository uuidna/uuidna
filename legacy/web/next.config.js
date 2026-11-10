import { withPayload } from '@payloadcms/next/withPayload'
import fs from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'node:url'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const rootPayloadUIMajor = Number(
  JSON.parse(
    fs.readFileSync(path.resolve(dirname, 'node_modules/@payloadcms/ui/package.json'), 'utf8'),
  ).version.split('.')[0],
)

import { redirects } from './redirects.js'

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const localhost = process.env.NEXT_PUBLIC_IS_LIVE
  ? []
  : [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: 'local.payloadcms.com',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: 'cms.local.payloadcms.com',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: 'cms.local.payloadcms.com',
        port: '8001',
      },
    ]

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  // Packages with Workers-specific code, as the with-cloudflare-d1 template lists them
  // (https://opennext.js.org/cloudflare/howtos/workerd)
  serverExternalPackages: ['jose', 'pg-cloudflare', 'wrangler'],
  transpilePackages: ['@payloadcms/v3-preview-runtime', '@payloadcms/v4-preview-runtime'],
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year,
    remotePatterns: [
      ...localhost,
      {
        protocol: 'https',
        hostname: 'cms.payloadcms.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cloud-api.payloadcms.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cms.local.payloadcms.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'stage.cms.payloadcms.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
      },
    ],
  },
  sassOptions: {
    // The modern compiler is the default. @import stays out of this app's stylesheets.
    silenceDeprecations: ['legacy-js-api'],
  },
  typescript: {
    // The Payload plugins import the quantum modules. Those modules typecheck under node --experimental-strip-types, and this Next build emits with swc.
    ignoreBuildErrors: true,
  },
  turbopack: {
    resolveAlias: {
      '@scss': path.resolve(dirname, './src/css/'),
      '@components': path.resolve(dirname, './src/components.js'),
      '@cloud': path.resolve(dirname, './src/app/cloud'),
      '@forms': path.resolve(dirname, './src/forms'),
      '@blocks': path.resolve(dirname, './src/blocks'),
      '@providers': path.resolve(dirname, './src/providers'),
      '@icons': path.resolve(dirname, './src/icons'),
      '@utilities': path.resolve(dirname, './src/utilities'),
      '@types': path.resolve(dirname, './payload-types.ts'),
      '@graphics': path.resolve(dirname, './src/graphics'),
      '@graphql': path.resolve(dirname, './src/graphql'),
    },
  },
  webpack: (config, { webpack }) => {
    const configCopy = { ...config }
    configCopy.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      extensionAlias: {
        '.js': ['.ts', '.js', '.tsx', '.jsx'],
        '.mjs': ['.mts', '.mjs'],
      },
      alias: {
        ...config.resolve.alias,
        '@scss': path.resolve(dirname, './src/css/'),
        '@components': path.resolve(dirname, './src/components.js'),
        '@cloud': path.resolve(dirname, './src/app/cloud'),
        '@forms': path.resolve(dirname, './src/forms'),
        '@blocks': path.resolve(dirname, './src/blocks'),
        '@providers': path.resolve(dirname, './src/providers'),
        '@icons': path.resolve(dirname, './src/icons'),
        '@utilities': path.resolve(dirname, './src/utilities'),
        '@types': path.resolve(dirname, './payload-types.ts'),
        '@graphics': path.resolve(dirname, './src/graphics'),
        '@graphql': path.resolve(dirname, './src/graphql'),
        '@payloadcms/ui/scss': path.resolve(dirname, './src/css/payload-admin.scss'),
        '~@payloadcms/ui/scss': path.resolve(dirname, './src/css/payload-admin.scss'),
      },
    }
    configCopy.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/\.(css|scss)$/, (resource) => {
        const isV3UIStyle =
          rootPayloadUIMajor !== 3 &&
          (resource.context.includes(`${path.sep}.pnpm${path.sep}@payloadcms+ui@3`) ||
            resource.context.includes(
              `${path.sep}preview-runtimes${path.sep}v3${path.sep}node_modules${path.sep}@payloadcms${path.sep}ui${path.sep}`,
            ))
        const isV4UIStyle =
          resource.context.includes(`${path.sep}.pnpm${path.sep}@payloadcms+ui@4`) ||
          resource.context.includes(
            `${path.sep}preview-runtimes${path.sep}v4${path.sep}node_modules${path.sep}@payloadcms${path.sep}ui${path.sep}`,
          )

        if (resource.request.includes('AnalyticsMetrics.scss')) {
          resource.request = path.resolve(dirname, './src/css/analytics-metrics.scss')
          return
        }
        if (isV3UIStyle || isV4UIStyle) {
          resource.request = path.resolve(dirname, './src/css/empty.css')
        }
      }),
    )
    return configCopy
  },
  redirects,
  async headers() {
    const headers = [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "object-src 'none';base-uri 'self';form-action 'self';",
          },
        ],
      },
    ]

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headers.push({
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
      })
    }
    return headers
  },
})

export default withPayload(nextConfig, { devBundleServerPackages: false })
