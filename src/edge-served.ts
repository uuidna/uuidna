// edge-served — the routes the Worker renders on demand that the static site never builds.
//
// The four-hex span is sealed but pageless (isPagelessFile): VitePress spreads its page list into one call and V8
// caps the arguments near 2^16, the span's own size, so the Worker renders /theorem/enumeration_hex4_<hex> from the
// ledger instead. The site's dead-link check sees only built pages, so it asks this module whether a link missing
// from that page list is one of those routes. The answer is read from the ledger: a sealed, pageless key resolves; a typo, a key the
// ledger does not hold, or any other missing page does not — the check stays strict, it reads the full route table.
import { theorems, isPagelessFile } from './theorems/index.js'

let _served: ReadonlySet<string> | null = null

/** edgeServes(link) → the link is /theorem/<key> for a sealed theorem the Worker renders because the site has no page
 *  for it. A query, fragment, `.html` or trailing slash is not part of the route. */
export function edgeServes(link: string): boolean {
  _served ??= new Set(theorems().filter((t) => isPagelessFile(t.file)).map((t) => `/theorem/${t.key}`))
  return _served.has(link.replace(/[?#].*$/, '').replace(/\.html$/, '').replace(/\/$/, ''))
}
