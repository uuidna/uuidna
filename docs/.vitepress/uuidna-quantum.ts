// uuidna-quantum — the VitePress QUANTUM PLUGIN: it DELIVERS THE PAYLOAD (the uuidna content-address, the encrypted
// quantum message) into every page's frontmatter, and gives the pages the sealed ledger does NOT already enrich — the
// STATIC section pages — their recomputable quantum SEO (canonical, description, schema.org JSON-LD, keyword tags, and
// the page's 128-bit content-address). The theorem/publication dynamic routes carry their own Lean-derived meta (their
// statement/abstract IS the verbose source); this plugin covers the rest, so EVERY page delivers a payload and no page
// is a dead node to a crawler. One source: it calls quantumSeo() from the compiled ledger (the same the MCP tool
// serves), so the front and the MCP agree. HONEST SCOPE: integrity, not truth — honest discoverability of what is
// sealed, never a ranking trick; recomputable by anyone. "Only Lean is verbose; all else is the address that delivers."
import { quantumSeo, type HeadTuple } from '../../dist/index.js'
import { assertSeoPackage, seoPackageGaps } from '../../dist/seo-package.js'

// VitePress pageData is loosely typed at this boundary; we touch only description / frontmatter.head / frontmatter.tags.
interface PageDataLike {
  params?: { address?: string; key?: string; slug?: string } & Record<string, unknown>
  relativePath: string
  title?: string
  description?: string
  frontmatter: { head?: HeadTuple[]; tags?: string[] } & Record<string, unknown>
}

/** Infuse the quantum payload into EVERY page: its content-address (the delivered quantum message) plus recomputable
 *  description, STRICT schema.org JSON-LD, canonical and keyword tags. One source for all three page kinds — a
 *  dynamic theorem page ({key}) gets its ScholarlyArticle citing the real Lean proof, a publication page ({slug})
 *  likewise, and a static page gets WebPage (with a typed mainEntity where the subject is real). Returns the page's
 *  content-address (the payload pointer).
 *
 *  SEO PACKAGING LAW: refuses to ship if the quantumSeo head is not a complete OG+microdata package. */
export function infuseQuantumPayload(pageData: PageDataLike, routeOf: (rel: string) => string): string | null {
  const p = pageData.params
  // pass the page's own frontmatter description through — the JSON-LD entity (School on /school, MathSolver on
  // /trials) then describes itself in the page's one voice, never a second hand-kept copy.
  const seo = p?.key ? quantumSeo({ key: p.key })
    : p?.slug ? quantumSeo({ slug: p.slug })
    : quantumSeo({ route: routeOf(pageData.relativePath), title: pageData.title, description: pageData.description })
  assertSeoPackage(seo, pageData.relativePath)
  // per-page description (unique, recomputable) if the page didn't set its own
  if (!pageData.description) pageData.description = seo.description
  pageData.frontmatter.head ??= []
  // don't double-push canonical/og:url — the config already sets those; add the payload + discovery meta the static
  // page lacks: the content-address (the quantum message), the JSON-LD, and the keyword tags.
  // Still ensure the COMPLETE package lands: any missing required OG property is filled from seo.head.
  const existing = new Set(pageData.frontmatter.head.map((h) => JSON.stringify(h[1])))
  for (const tuple of seo.head) {
    if (existing.has(JSON.stringify(tuple[1]))) continue
    pageData.frontmatter.head.push(tuple)
    existing.add(JSON.stringify(tuple[1]))
  }
  // mark the page as a packaged SEO object (theme / auditors can read this)
  pageData.frontmatter.seoPackage = 'complete'
  pageData.frontmatter.seoAddress = seo.address
  const check = seoPackageGaps(seo)
  if (!check.ok) throw new Error(`infuseQuantumPayload: ${pageData.relativePath} package gaps ${check.missing.join(',')}`)
  pageData.frontmatter.tags ??= seo.keywords
  return seo.address                                        // the payload delivered
}
