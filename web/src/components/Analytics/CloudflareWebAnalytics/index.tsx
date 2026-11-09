import Script from 'next/script'
import React from 'react'

// Cloudflare Web Analytics, the JS beacon for a site not proxied by Cloudflare's own injection:
// https://developers.cloudflare.com/web-analytics/get-started/
// It sets no cookies, so it needs no consent banner.
const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN

export const CloudflareWebAnalytics: React.FC = () => {
  if (!token) {
    return null
  }

  return (
    <Script
      data-cf-beacon={JSON.stringify({ token })}
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
    />
  )
}
