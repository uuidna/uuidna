// quantum/apps/url-audit — THE 404 IS AN AUDIT, NOT A DEAD END (the captain's rule, 2026-08-22: "404 is
// handled by the audit that parses the url finding relevant content to display" — serving always 200 in
// substance). A request for a path the book does not carry is still a REQUEST: this app parses the url,
// tokenises it, and computes the relevant sealed content — the default-install spec the path means exactly
// (installFor: /terminal answers busybox), the spec family it falls under, the pages and theorems its tokens
// reach, and always, totally, the search that carries the reader on. The answer is NEVER empty: the fallback
// (home, the meta package, + search) is part of the function, not an error branch — totality is the property,
// exactly as prev/next are total on the closed cycle (every_referrer_reaches_every_page). The requested path
// itself is compiled to the lattice (32 hexbit states of its address): hexbit evaporates the fixed space of
// the sitemap and reorganises it to meet the referrer's request. PURE hexbit-app law: no filesystem, no
// network, no clock, no float — the same path and context give the same report, browser or Node, and the
// report carries its own content-address so anyone can recompute it.
import { toUuid } from '../../address.js'
import { contentWords } from '../../adjudicate.js'
import { defaultInstalls, installFor, hexbitDoorOf } from '../os/index.js'
import { catalogueFor, catalogueCompile } from '../os/catalogue/index.js'

export interface UrlAuditMatch {
  kind: 'spec' | 'family' | 'page' | 'theorem' | 'search' | 'home' | 'catalogue'
  link: string
  text: string
  why: string          // the audit's reason this content is relevant — stated, never implied
  score: number        // deterministic relevance: exact spec 100, family 50, token overlap ×10, fallback 1
}

export interface UrlAuditReport {
  path: string         // the parsed path (query/hash stripped, decoded, lowercased)
  tokens: string[]     // what the url says, word by word
  matches: UrlAuditMatch[]   // relevant content, best first — NEVER empty (totality is the property)
  address: string      // content-address of this exact report — recompute it or it changed
  hexbits: number[]    // the requested path compiled to 32 lattice states — even a missing page has an address
  honest: string
}

const HONEST =
  'The url is parsed and audited, never bounced: exact path meaning from the sealed default install, family ' +
  'and token matches over the pages and theorems the caller supplies, and a total fallback (home + search) so ' +
  'the answer is never empty. Deterministic and recomputable — same path, same context, same report, same ' +
  'address. No fetch, no clock, no guess: content the ledger can stand behind, or the search that finds it.'

// the url's words that CARRY MEANING — adjudicate's own contentWords law (one definition, the relevance
// floor: of/the never score), plus bare numbers, which the letter-only law drops but a path like /grid-432
// genuinely says. Found by a peer session's probe: without the floor, almost any theorem with of/the in its
// key matched almost any wordy miss, outranking genuinely relevant content.
const tokensOf = (s: string): string[] => {
  const seen: string[] = []
  for (const t of [...contentWords(s), ...s.split(/[/\-_.\s]+/).filter((x) => /^[0-9]+$/.test(x))])
    if (t && !seen.includes(t)) seen.push(t)
  return seen
}

const overlap = (a: string[], b: string[]): number => a.filter((t) => b.includes(t)).length

/** auditUrl(path, context?) → the audit a not-found handler serves INSTEAD of a 404. Context is optional and
 *  additive: pages (route + label) and theorem keys widen the audit; with no context the sealed default
 *  install and the total fallback still answer. */
export function auditUrl(path: string, context?: { pages?: { route: string; text?: string }[]; theoremKeys?: string[] }): UrlAuditReport {
  let clean = (path || '/').split(/[?#]/)[0]!
  try { clean = decodeURIComponent(clean) } catch { /* a malformed escape is still a path — audit it as sent */ }
  clean = clean.toLowerCase()
  {
    let n = clean.length
    while (n > 0 && clean.charCodeAt(n - 1) === 47) n--
    clean = (n === 0 ? '/' : clean.slice(0, n)) || '/'
  }
  const tokens = tokensOf(clean)
  const matches: UrlAuditMatch[] = []

  // 1) the EXACT meaning — the sealed default install answers the path directly
  const spec = installFor(clean)
  if (spec) matches.push({ kind: 'spec', link: '/os', text: `${spec.id} ${spec.version}`, score: 100,
    why: `this path's exact meaning, sealed: "${spec.meaning}" (address ${spec.address})` })

  // 1b) CATALOGUE — any published Alpine package at /catalogue/<name> (editorial routes beyond the 25 install paths)
  if (clean === '/catalogue') {
    matches.push({ kind: 'page', link: '/catalogue', text: 'Alpine catalogue', score: 95,
      why: 'the full published census — every package searchable; integrity and meaning, loading rather than running' })
  }
  const cat = catalogueFor(clean)
  if (cat) {
    const compiled = catalogueCompile(cat)
    matches.push({ kind: 'catalogue', link: '/catalogue?pkg=' + encodeURIComponent(cat.name),
      text: `${cat.name}-${cat.version} [${cat.repo}]`, score: 90,
      why: `published Alpine package: "${cat.desc}" (address ${compiled.address})` })
  }

  // 2) the FAMILY — the path sits under (or over) a sealed spec's route
  for (const s of defaultInstalls().specs) {
    if (s.route === clean) continue
    if (clean.startsWith(s.route === '/' ? '//' : s.route + '/') || s.route.startsWith(clean + '/'))
      matches.push({ kind: 'family', link: '/os', text: `${s.route} — ${s.id}`, score: 50,
        why: `the nearest sealed path family: ${s.route} means "${s.meaning}"` })
  }

  // 3) the TOKENS — pages and theorems the url's own words reach (context supplied by the caller)
  for (const p of context?.pages ?? []) {
    const n = overlap(tokens, tokensOf(p.route + ' ' + (p.text ?? '')))
    if (n > 0) matches.push({ kind: 'page', link: p.route, text: p.text ?? p.route, score: n * 10,
      why: `${n} of the url's words land on this page` })
  }
  for (const k of context?.theoremKeys ?? []) {
    const n = overlap(tokens, k.split('_'))
    if (n > 0) matches.push({ kind: 'theorem', link: `/theorem/${k}`, text: k, score: n * 10,
      why: `${n} of the url's words land on this sealed theorem` })
  }

  // one answer per destination: the same link reached two ways (a theorem's page and its key) is ONE match —
  // keep the higher score, first arrival on ties (deterministic: insertion order is deterministic)
  const byLink = new Map<string, UrlAuditMatch>()
  for (const m of matches) { const prev = byLink.get(m.link); if (!prev || m.score > prev.score) byLink.set(m.link, m) }
  const ranked = [...byLink.values()].sort((a, b) => b.score - a.score || (a.link < b.link ? -1 : 1)).slice(0, 10)

  // 4) TOTALITY — the fallback is part of the function, not an error branch, and it SURVIVES the cap: the
  // answer always ends with the search that carries the reader on and the home everything is reachable from
  ranked.push({ kind: 'search', score: 1, link: tokens.length ? `/search?q=${encodeURIComponent(tokens.join(' '))}` : '/search',
    text: 'search the ledger', why: 'every audited url carries its own words to the search' })
  ranked.push({ kind: 'home', link: '/', text: 'home — the meta package', score: 1,
    why: 'opening home is installing the default set; every member is reachable from it (home_reaches_every_install)' })
  const sorted = ranked
  return {
    path: clean, tokens, matches: sorted,
    address: toUuid('url-audit|' + clean + '|' + sorted.map((m) => m.kind + ':' + m.link).join(',')),
    ...hexbitDoorOf(toUuid('url|' + clean)),
    honest: HONEST,
  }
}
