'use client'

import Script from 'next/script'
import React from 'react'

// Cloudflare Turnstile, rendered explicitly:
// https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
type TurnstileApi = {
  remove: (widgetId: string) => void
  render: (
    el: HTMLElement,
    options: { callback: (token: string) => void; sitekey: string; theme?: 'auto' | 'dark' | 'light' },
  ) => string
}

export const Turnstile: React.FC<{
  className?: string
  onToken: (token: string) => void
  theme?: 'auto' | 'dark' | 'light'
}> = ({ className, onToken, theme = 'auto' }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    const turnstile = (window as { turnstile?: TurnstileApi }).turnstile
    if (!loaded || !turnstile || !ref.current) {
      return
    }
    const id = turnstile.render(ref.current, {
      callback: onToken,
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
      theme,
    })
    return () => turnstile.remove(id)
  }, [loaded, onToken, theme])

  return (
    <React.Fragment>
      <Script
        onReady={() => setLoaded(true)}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      />
      <div className={className} ref={ref} />
    </React.Fragment>
  )
}
