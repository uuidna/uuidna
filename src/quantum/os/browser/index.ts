// browser — PWA mount for uuidnaOS tab hosts: service worker + verified boot (one entry for site + agents).
import { bootUuidnaOSInBrowser, DEFAULT_CATALOGUE_URL, type BrowserBootResult } from '../boot/index.js'

export { DEFAULT_CATALOGUE_URL, type BrowserBootResult }
export { runCourtViaMcp, formatCourtFuseHint, mcpToolsCallRaw, type McpCourtResult } from './court/index.js'

/** Register the site service worker (catalogue precache + offline shell). Idempotent; no-op without SW. */
export function registerServiceWorker(url = '/sw.js'): void {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return
  navigator.serviceWorker.register(url).catch(() => {})
}

export interface MountUuidnaOSOpts {
  catalogueUrl?: string
  selfTest?: boolean
  /** default true — precache catalogue on first visit so /terminal works offline after install */
  registerSw?: boolean
}

/** mountUuidnaOS — register SW (optional) then verify-load install port + prime catalogue. */
export async function mountUuidnaOS(opts?: MountUuidnaOSOpts): Promise<BrowserBootResult> {
  if (opts?.registerSw !== false) registerServiceWorker()
  return bootUuidnaOSInBrowser(opts?.catalogueUrl ?? DEFAULT_CATALOGUE_URL, { selfTest: opts?.selfTest })
}

/** formatBootLine — human-readable boot status for terminal and catalogue surfaces. */
export function formatBootLine(boot: BrowserBootResult, kind: 'terminal' | 'catalogue' = 'terminal'): string {
  const tag = boot.bootReceipt.slice(0, 8)
  if (!boot.catalogue.present) {
    return kind === 'terminal'
      ? `uuidnaOS booted — catalogue absent (${boot.catalogue.why ?? 'unknown'})`
      : `catalogue absent — ${boot.catalogue.why ?? 'not cached'}`
  }
  const count = boot.catalogue.count.toLocaleString('en-US')
  return kind === 'terminal'
    ? `Layer 1 · uuidnaOS \`${tag}\` · ${count} packages · offline`
    : `uuidnaOS · ${count} packages · offline · boot \`${tag}\``
}
