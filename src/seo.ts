// seo — QUANTUM SEO: recomputable, honest discoverability derived from the sealed ledger. One function computes the
// SEO surface for ANY subject (a theorem, a publication, or a static page): the canonical URL, a per-page description
// drawn from the ONE verbose source (Lean — a theorem's own statement, a publication's abstract; everything else is
// terse), machine-readable schema.org JSON-LD, keyword tags carried from the sealed skill/principle, and the page's
// CONTENT-ADDRESS — the encrypted quantum message that DELIVERS the payload: a 128-bit pointer that recomputes to the
// exact page, the same for every crawler and every host. Folded to one receipt.
//
// HONEST SCOPE: integrity, not truth. This describes what is SEALED — it never manipulates a ranking, cloaks, keyword-
// stuffs, or claims a position; the description is the theorem's real statement, the JSON-LD cites the real proof and
// address, and rel=canonical folds every serving host (.net/.org/CNAME) to the one recomputable home. Recomputable by
// anyone from the same ledger. It optimises for HONEST discovery, not for gaming a search engine.
import { theorems } from './theorems/index.js'
import { publications } from './publish.js'
import { captainRights } from './rights.js'
import { toUuid, merkleFold } from './address.js'

const HOST = 'https://uuidna.com'

/** A head tuple in VitePress frontmatter form: [tag, attrs] or [tag, attrs, innerHTML]. Reusable by the front. */
export type HeadTuple = [string, Record<string, string>] | [string, Record<string, string>, string]

export interface Seo {
  route: string
  kind: 'theorem' | 'publication' | 'page'
  canonical: string          // the ONE recomputable home — rel=canonical folds every serving host to it
  address: string            // the page's 128-bit content-address — the quantum message that delivers the payload
  title: string
  description: string        // per-page, drawn from the verbose Lean source where there is one
  keywords: string[]         // the sealed skill/principle (theorem) or the section (page) — never a hand-kept list
  jsonLd: Record<string, unknown>  // schema.org — ScholarlyArticle (publication), Article (theorem), WebPage (page)
  head: HeadTuple[]          // the frontmatter `head` array to infuse — canonical, og, uuidna:address, keywords, JSON-LD
  receipt: string            // fold of (canonical, address, description) — recomputable
  honest: string
}

const HONEST =
  'Quantum SEO: recomputable, honest discoverability derived from the sealed ledger — the description is the real Lean ' +
  'statement/abstract, the JSON-LD cites the real proof and content-address, rel=canonical folds every host to one home, ' +
  'and the content-address is the quantum message that delivers the payload. It never manipulates a ranking, cloaks, or ' +
  'keyword-stuffs; it optimises for honest discovery of what is sealed. Recomputable by anyone. Integrity, not truth.'

const clean = (r: string): string => r.replace(/^\/+/, '').replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '').replace(/\/$/, '')

/** quantumSeo(subject) → the recomputable SEO surface for a theorem (by key), a publication (by slug), or any static
 *  page (by route). Derived from the ledger; the content-address is the quantum-message pointer. Reusable by the front
 *  (its `head` is a VitePress frontmatter head array) and queryable through the MCP. */
export function quantumSeo(subject: { key?: string; slug?: string; route?: string; title?: string }): Seo {
  // ── a THEOREM ──────────────────────────────────────────────────────────────────────────────────────────────
  if (subject.key) {
    const t = theorems().find((x) => x.key === subject.key)
    if (!t) throw new Error('unknown theorem: ' + subject.key + ' (see uuidna_theorems)')
    const route = `/theorem/${t.key}`, canonical = `${HOST}${route}`
    const description = `${t.statement} — proven by ${t.tactic ?? 'decide'} in Lean 4, sorry-free (no Mathlib); part of ${t.principle}.`
    const keywords = [t.skill, t.principle].filter(Boolean) as string[]
    const jsonLd = {
      '@context': 'https://schema.org', '@type': 'Article', headline: t.name, abstract: t.statement,
      identifier: t.address, url: canonical, keywords: keywords.join(', '),
      isBasedOn: `https://github.com/uuidna/uuidna/blob/main/lean/${t.file}`,
      creativeWorkStatus: `Proven by ${t.tactic ?? 'decide'} in Lean 4, sorry-free, axiom-free`,
      isPartOf: { '@type': 'Dataset', name: 'uuidna theorem ledger', url: `${HOST}/theorems` },
    }
    return seal('theorem', route, canonical, t.address, t.name, description, keywords, jsonLd, t.address)
  }
  // ── a PUBLICATION (monograph) ──────────────────────────────────────────────────────────────────────────────
  if (subject.slug) {
    const p = publications().find((x) => x.slug === subject.slug)
    if (!p) throw new Error('unknown publication: ' + subject.slug + ' (see uuidna_publish)')
    const route = `/publications/${p.slug}`, canonical = `${HOST}${route}`
    const description = `${p.title} — ${p.count} sealed Lean proofs folding to receipt ${p.receipt}; audited by uuidna's honesty gate.`
    const keywords = ['monograph', p.slug]
    const jsonLd = {
      '@context': 'https://schema.org', '@type': 'ScholarlyArticle', headline: p.title, abstract: p.abstract,
      identifier: p.address, url: canonical, isBasedOn: `https://github.com/uuidna/uuidna/blob/main/lean/${p.file}`,
      creativeWorkStatus: `Audited (uuidna honesty gate); ${p.count} proofs fold to receipt ${p.receipt}`,
      publisher: { '@type': 'Organization', name: 'uuidna' },
    }
    return seal('publication', route, canonical, p.address, p.title, description, keywords, jsonLd, p.address)
  }
  // ── a STATIC PAGE ──────────────────────────────────────────────────────────────────────────────────────────
  const route = '/' + clean(subject.route ?? '')
  const canonical = route === '/' ? HOST + '/' : `${HOST}${route}`
  const address = toUuid('uuidna-page:' + canonical)           // the page's content-address — the quantum message
  const section = (clean(subject.route ?? '').split('/')[0] || 'home')
  const title = subject.title || 'uuidna'
  const description = `${title} — part of uuidna: content-addressed identity, honest by construction; every claim links a sealed Lean proof. Integrity, not truth.`
  const keywords = ['uuidna', section, 'content-address', 'lean', 'honest']
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'WebPage', name: title, url: canonical, identifier: address,
    isPartOf: { '@type': 'WebSite', name: 'uuidna', url: HOST },
    publisher: { '@type': 'Organization', name: 'uuidna' },
  }
  return seal('page', route, canonical, address, title, description, keywords, jsonLd, address)
}

// assemble the head array + receipt — ONE place, so theorem/publication/page all infuse the same shape (DRY).
function seal(kind: Seo['kind'], route: string, canonical: string, address: string, title: string, description: string,
             keywords: string[], jsonLd: Record<string, unknown>, ogId: string): Seo {
  // hard-imprint the CAPTAIN'S RIGHTS into every page: the licence relation, copyright, the rights content-address,
  // and the schema.org license/copyrightHolder/creditText folded into the JSON-LD — no page ships without the rights.
  const rights = captainRights()
  const ld = { ...jsonLd, license: rights.licenseUrl, copyrightYear: 2025, creditText: rights.copyright,
    copyrightHolder: { '@type': 'Person', name: rights.holder } }
  const head: HeadTuple[] = [
    ['link', { rel: 'canonical', href: canonical }],
    ['meta', { name: 'description', content: description }],
    ['meta', { property: 'og:type', content: kind === 'page' ? 'website' : 'article' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: canonical }],
    ['meta', { property: 'uuidna:address', content: ogId }],
    ['meta', { name: 'keywords', content: keywords.join(', ') }],
    ...rights.head,                                                       // the captain's rights, imprinted on every page
    ['script', { type: 'application/ld+json' }, JSON.stringify(ld)],
  ]
  return { route, kind, canonical, address, title, description, keywords, jsonLd: ld, head,
    receipt: merkleFold([toUuid('seo:' + canonical), toUuid(address), toUuid(description), rights.imprint]), honest: HONEST }
}
