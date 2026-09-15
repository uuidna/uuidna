// edge-served — the routes the Worker renders on demand that the static site never builds.
//
// The four-hex span is sealed but pageless (isPagelessFile): VitePress spreads its page list into one call and V8
// caps the arguments near 2^16, the span's own size, so the Worker renders /theorem/enumeration_hex4_<hex> from the
// ledger instead. The site's dead-link check sees only built pages, so it asks this module whether a link missing
// from that page list is one of those routes. The answer is read from the ledger: a sealed, pageless key resolves; a typo, a key the
// ledger does not hold, or any other missing page does not — the check stays strict, it reads the full route table.
import { theorems, isPagelessFile } from './theorems/index.js'

let _served: ReadonlySet<string> | null = null

export interface Span { count: number; template: string; first: string; last: string; route: string }

/** spanOf(rows) → pageless rows stated once: the one statement every row is at its own station n (the number its key
 *  ends in, read as hex), checked on EVERY row, so a page that states the span states the exact set and never lists
 *  near-identical rows the ledger declares pageless — or null when any row is not that statement at its own n. */
export function spanOf(rows: readonly { key: string; statement: string }[]): Span | null {
  if (!rows.length) return null
  const station = (key: string): number => parseInt(key.slice(key.lastIndexOf('_') + 1), 16)
  const templateOf = (r: { key: string; statement: string }): string => r.statement.replace(new RegExp(`\\b${station(r.key)}\\b`, 'g'), 'n')
  const template = templateOf(rows[0]!)
  if (!rows.every((r) => Number.isInteger(station(r.key)) && templateOf(r) === template)) return null
  const sorted = [...rows].sort((a, b) => station(a.key) - station(b.key))
  const first = sorted[0]!.key
  return { count: rows.length, template, first, last: sorted[sorted.length - 1]!.key, route: `/theorem/${first.slice(0, first.lastIndexOf('_') + 1)}<hex>` }
}

/** edgeServes(link) → the link is /theorem/<key> for a sealed theorem the Worker renders because the site has no page
 *  for it. A query, fragment, `.html` or trailing slash is not part of the route. */
export function edgeServes(link: string): boolean {
  _served ??= new Set(theorems().filter((t) => isPagelessFile(t.file)).map((t) => `/theorem/${t.key}`))
  return _served.has(link.replace(/[?#].*$/, '').replace(/\.html$/, '').replace(/\/$/, ''))
}
