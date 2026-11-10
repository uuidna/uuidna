import type { Metadata } from 'next'

import { CloudflareWebAnalytics } from '@components/Analytics/CloudflareWebAnalytics/index'
import { PrivacyBanner } from '@components/PrivacyBanner/index'
import { Providers } from '@providers/index'
import { PrivacyProvider } from '@root/providers/Privacy/index'
import { mergeOpenGraph } from '@root/seo/mergeOpenGraph'
import { GeistMono } from 'geist/font/mono'
import React from 'react'

import { untitledSans } from './fonts'
import '../../css/app.scss'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <PrivacyProvider>
        <head>
          <link href="/images/favicon.svg" rel="icon" />
          <link href={process.env.NEXT_PUBLIC_CLOUD_CMS_URL} rel="dns-prefetch" />
          <link href="https://api.github.com/repos/payloadcms/payload" rel="dns-prefetch" />
          <link href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" rel="stylesheet" />
        </head>
        <body className={[GeistMono.variable, untitledSans.variable].join(' ')}>
          <Providers>
            {children}
            <PrivacyBanner />
          </Providers>
          <CloudflareWebAnalytics />
        </body>
      </PrivacyProvider>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
