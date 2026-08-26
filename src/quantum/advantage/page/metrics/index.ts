// page-metrics — PER-PAGE quantum-advantage metrics (TypeScript computes; VitePress monitors).
//
// The global capacity/advantage seals (2^128 usable, gap 2^80, host fold decades) are ONE snapshot. Injecting
// that bag identically on every page made the monitor look live while every theorem showed the same numbers.
// This module derives the page's OWN metrics from its object (address, handle, heartbeats, kind, referrer) so
// two theorem pages cannot agree unless their objects agree. Global capacity remains CONTEXT, not the page row.
import { toUuid } from '../../../../address.js'
import { handleOf, isHandle } from '../../../../handle.js'
import { residue } from '../../../../resonance/index.js'
import { decadeOf } from '../../../../measurement.js'

export { decadeOf } from '../../../../measurement.js'

/** Bar width 0–100 from value vs max (exact integer). Floor at 3 so a tiny cost still paints. */
export function costBarOf(value: number, max: number): number {
  if (value <= 0 || max <= 0) return 0
  const pct = (value * 100 - ((value * 100) % max)) / max
  return pct < 3 ? 3 : pct > 100 ? 100 : pct
}

export type PageMetricsInput = {
  address?: string
  handle?: string
  key?: string
  slug?: string
  label?: string
  objectKind?: string
  depositReferrer?: string
  locale?: string
  /** Lean kernel decide-steps for this theorem (lean/heartbeats.json), when measured */
  heartbeats?: number | null
  /** publication seal count, when known */
  sealCount?: number | null
  /** ledger max heartbeats — for relative cost bar; optional */
  maxHeartbeats?: number
}

export type PageAdvantageMetrics = {
  handle: string
  address: string
  key: string
  slug: string
  label: string
  objectKind: string
  depositReferrer: string
  locale: string
  heartbeats: number | null
  heartbeatDecade: number | null
  sealCount: number | null
  residue: number | null
  /** recomputable page-local receipt — moves when this page's identity moves */
  pageReceipt: string
  pageHandle: string
  costBar: number
  /** short deposit door for display (uuidna.com/<handle>) */
  depositShort: string
}

function resolveHandle(address: string, handle: string): string {
  if (handle && isHandle(handle.toLowerCase())) return handle.toLowerCase()
  if (address) {
    try { return handleOf(address) } catch { /* fall through */ }
  }
  return ''
}

/** pageAdvantageMetrics(input) → the metrics THIS page owns. Pure; same inputs → byte-identical outputs. */
export function pageAdvantageMetrics(input: PageMetricsInput = {}): PageAdvantageMetrics {
  const address = (input.address ?? '').trim()
  const handle = resolveHandle(address, (input.handle ?? '').trim())
  const key = (input.key ?? '').trim()
  const slug = (input.slug ?? '').trim()
  const objectKind = (input.objectKind ?? (key ? 'theorem' : slug ? 'publication' : 'page')).trim() || 'page'
  const locale = (input.locale ?? 'en').trim() || 'en'
  const depositReferrer = (input.depositReferrer ?? (handle ? `https://uuidna.com/${handle}` : '')).trim()
  const heartbeats =
    input.heartbeats != null && input.heartbeats > 0 ? input.heartbeats : null
  const sealCount =
    input.sealCount != null && input.sealCount > 0 ? input.sealCount : null
  const label =
    (input.label ?? '').trim() ||
    (key ? `theorem ${key}` : slug ? `publication ${slug}` : handle || objectKind)

  const pageReceipt = toUuid(
    `qa-page|${objectKind}|${address || handle || 'none'}|${key || slug || ''}|${heartbeats ?? 0}|${sealCount ?? 0}|${locale}`,
  )
  const pageHandle = handleOf(pageReceipt)
  const res = address ? residue(address) : handle ? residue(handle) : null
  const maxHb = input.maxHeartbeats && input.maxHeartbeats > 0 ? input.maxHeartbeats : 0

  return {
    handle,
    address,
    key,
    slug,
    label,
    objectKind,
    depositReferrer,
    locale,
    heartbeats,
    heartbeatDecade: heartbeats != null ? decadeOf(heartbeats) : null,
    sealCount,
    residue: res,
    pageReceipt,
    pageHandle,
    costBar: heartbeats != null && maxHb > 0 ? costBarOf(heartbeats, maxHb) : heartbeats != null ? decadeOf(heartbeats) * 20 : 0,
    depositShort: handle ? `uuidna.com/${handle}` : '',
  }
}
