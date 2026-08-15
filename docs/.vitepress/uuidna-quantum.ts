// uuidna-quantum — the VitePress QUANTUM PLUGIN: it DELIVERS THE PAYLOAD (the uuidna content-address, the encrypted
// quantum message) into every page's frontmatter, and gives the pages the sealed ledger does NOT already enrich — the
// STATIC section pages — their recomputable quantum SEO (canonical, description, schema.org JSON-LD, keyword tags, and
// the page's 128-bit content-address). The theorem/publication dynamic routes carry their own Lean-derived meta (their
// statement/abstract IS the verbose source); this plugin covers the rest, so EVERY page delivers a payload and no page
// is a dead node to a crawler. One source: it calls quantumSeo() from the compiled ledger (the same the MCP tool
// serves), so the front and the MCP agree. HONEST SCOPE: integrity, not truth — honest discoverability of what is
// sealed, never a ranking trick; recomputable by anyone. "Only Lean is verbose; all else is the address that delivers."
import { quantumSeo, type HeadTuple } from '../../dist/index.js'

// VitePress pageData is loosely typed at this boundary; we touch only description / frontmatter.head / frontmatter.tags.
interface PageDataLike {
  params?: { address?: string } & Record<string, unknown>
  relativePath: string
  title?: string
  description?: string
  frontmatter: { head?: HeadTuple[]; tags?: string[] } & Record<string, unknown>
}

/** Infuse the quantum payload into ONE static page: its content-address (the delivered quantum message) plus a
 *  recomputable description, schema.org WebPage JSON-LD, canonical and keyword tags. A no-op on dynamic theorem/
 *  publication routes (they already carry their Lean-derived meta) — call it AFTER the dynamic-route branch. Returns
 *  the page's content-address (the payload pointer), or null when it was a dynamic route left untouched. */
export function infuseQuantumPayload(pageData: PageDataLike, routeOf: (rel: string) => string): string | null {
  if (pageData.params?.address) return null                 // a theorem/publication page — already enriched, leave it
  const route = routeOf(pageData.relativePath)
  const seo = quantumSeo({ route, title: pageData.title })
  // per-page description (unique, recomputable) if the page didn't set its own
  if (!pageData.description) pageData.description = seo.description
  pageData.frontmatter.head ??= []
  // don't double-push canonical/og:url — the config already sets those; add the payload + discovery meta the static
  // page lacks: the content-address (the quantum message), the JSON-LD, and the keyword tags.
  const existing = new Set(pageData.frontmatter.head.map((h) => JSON.stringify(h[1])))
  for (const tuple of seo.head) {
    const isCanonical = tuple[0] === 'link' || (tuple[1] as Record<string, string>)['property'] === 'og:url'
    if (isCanonical) continue                               // config owns canonical + og:url
    if (existing.has(JSON.stringify(tuple[1]))) continue
    pageData.frontmatter.head.push(tuple)
  }
  pageData.frontmatter.tags ??= seo.keywords
  return seo.address                                        // the payload delivered
}
