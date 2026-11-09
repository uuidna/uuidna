'use client'
// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
// The branding, computed in real time from the host's address (the one quantum core) until the tenant's global answers with what the tenant defined in the admin
// (tenants.branding: name, tagline, accent, logo, icon); the admin's Logo and Icon and the site's wordmark render from here. Nothing loaded but the core.
import * as React from 'react'
import { uuid, style } from '@uuidna/qpu/blocks'
export type Branding = { name: string; tagline?: string; accent: string; logo?: string; icon?: string; theme?: string; mode?: 'light' | 'dark'; template?: string; source?: Record<string, string> }
const computed = (host: string): Branding => { const s = style(uuid('tenant:' + (host || 'uuidna'))); return { name: host || '@uuidna/qpu', accent: `hsl(${s.hue} ${s.sat}% 45%)`, theme: 'neutral', mode: 'light', template: 'landing', source: { name: 'computed', accent: 'computed' } } }
const applyUi = (b: Branding) => { const root = document.documentElement; root.dataset.theme = b.theme || 'neutral'; root.dataset.template = b.template || 'landing'; root.classList.toggle('dark', b.mode === 'dark') }
export const useBranding = (): Branding => {
  const [b, set] = React.useState<Branding>(() => computed(typeof window === 'undefined' ? '' : window.location.hostname))
  React.useEffect(() => { let on = true; fetch('/api/globals/qpu?depth=1', { headers: { accept: 'application/json' } }).then((r) => r.json()).then((j: { branding?: Branding | null }) => { if (!on || !j.branding) return; set(j.branding); applyUi(j.branding) }).catch(() => { /* the computed branding stands */ }); return () => { on = false } }, [])
  return b
}
export const QpuIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => { const b = useBranding(); return b.icon ? <img src={b.icon} alt={b.name} height={24} width={24} /> : <svg viewBox="0 0 24 24" width={24} height={24} role="img" aria-label={b.name} {...props}><rect width="24" height="24" rx="6" fill={b.accent} /></svg> }
export const QpuLogo = ({ className, ...rest }: React.ComponentPropsWithoutRef<'svg'>) => { const b = useBranding(); if (b.logo) return <img className={className} src={b.logo} alt={b.name} height={30} />; return <svg className={className} viewBox="0 0 194 44" height={44} width={194} role="img" aria-label={b.name} {...rest}><rect x="0" y="4" width="36" height="36" rx="8" fill={b.accent} /><text x="46" y="31" fontFamily="system-ui, sans-serif" fontSize="22" fill="currentColor">{b.name}</text></svg> }
export default QpuLogo
