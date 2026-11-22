import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    qualities: [90, 100],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
  reactStrictMode: true,
  // Packages with Cloudflare Workers (workerd) specific code
  // Read more: https://opennext.js.org/cloudflare/howtos/workerd
  // `@modelcontextprotocol/server` ships a `workerd` export condition (`./_shims`) that swaps its
  // default JSON-schema validator from the eval-based Ajv one to `CfWorkerJsonSchemaValidator`, which
  // the Workers runtime requires (code generation from strings is disallowed). Next's own build resolves
  // with Node conditions and bakes the Ajv validator into `.next/server`, before OpenNext's workerd pass
  // can re-resolve it. Keeping the package external lets OpenNext bundle it under the `workerd` condition.
  serverExternalPackages: ['jose', 'pg-cloudflare', '@modelcontextprotocol/server'],
  redirects,
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
