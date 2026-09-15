// @non-harmonic: natureReport reads a web page over the network (netRead, kind 'page') — the host answers or does not; every verdict, path and receipt computed from what arrives is pure.
// rights — THE PUBLIC'S DOOR TO THE RIGHT TO LAND AND TO ACCESS. Anyone can hand it a claim or a link.
//   verifyRightsClaim(claim) — does the instrument and article the claim cites exist in the sealed table, as cited?
//   natureReport(url)        — read the page, audit every detail in it, and return the legislative paths it touches.
// Both answer from src/rights/land-instruments.json (each instrument read from its official source, verified rows
// only) and both return a receipt signed by 2×7 theorems (receiptSealOf), so anyone can re-verify an answer offline.
// WHAT A VERDICT MEANS: VERIFIED says the citation exists as cited — the instrument is in the table and carries that
// article — and shows what the table records of it; it never says what the law means, that a right is honoured, or
// who is in breach. Integrity of the citation, not legal advice. No instrument in the table grants unrestricted access
// to all land (theorem every_access_instrument_is_qualified), and the answers carry each instrument's qualifications.
import table from './land-instruments.json' with { type: 'json' }
import { contentWords } from '../adjudicate.js'
import { auditDetails, type DetailAudit } from '../detail-audit.js'
import { receiptSealOf, SEALED_BY } from '../refusal-trials.js'
import { netRead, pageText, type NetRead } from '../os/netapi/index.js'

export interface RightsArticle { n: string; topic: string; summary: string }
export interface RightsInstrument {
  id: string; title: string; body: string; kind: string; adopted: number | null; inForce: number | null
  articles: RightsArticle[]; url: string; verified: boolean; qualifications: string
}

/** the verified instruments, in table order — the only rows any answer may cite */
export const RIGHTS_INSTRUMENTS: readonly RightsInstrument[] = (table as unknown as RightsInstrument[]).filter((r) => r.verified)

export const RIGHTS_SCOPE = 'Integrity of the citation against the sealed instrument table — never what a law means, whether a right is honoured, or who is in breach; not legal advice.'

const words = (s: string): Set<string> => new Set(contentWords(s))
const overlap = (a: Set<string>, b: Set<string>): number => [...a].filter((w) => b.has(w)).length

const escape = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const asWord = (name: string, flags: string): RegExp => new RegExp(`(^|[^A-Za-z0-9_])${escape(name)}([^A-Za-z0-9_]|$)`, flags)

/** does the text NAME this instrument? Derived from its row, never from a list of aliases:
 *  - its id written as the instrument is written — an id with no underscore (udhr, undrop, aarhus, crow) only in
 *    capitals (UDHR) or capitalised (Aarhus), so a lowercase common word ("a crow in the forest") names nothing;
 *    an underscored id (bg_forest) only verbatim — its parts are common words and are never names on their own;
 *  - a short name the title gives in parentheses (friluftsloven), as a whole word, any case;
 *  - or most of its title's content words (two thirds or more of a title of two or more). */
function names(r: RightsInstrument, text: string, tw: Set<string>): boolean {
  if (r.id.includes('_')) { if (asWord(r.id, 'i').test(text)) return true }
  else if (asWord(r.id.toUpperCase(), '').test(text) || asWord(r.id[0]!.toUpperCase() + r.id.slice(1), '').test(text)) return true
  // the title's own names: what it gives in parentheses (friluftsloven), and what it LEADS with before them — the
  // native name a national title puts first ("Regeringsformen (Instrument of Government)", "Miljöbalken (…)")
  const short = [...r.title.matchAll(/\(([^)]{3,40})\)/g)].map((m) => m[1]!)
  const lead = r.title.includes('(') ? r.title.slice(0, r.title.indexOf('(')).trim() : ''
  if ([...short, ...(lead.length > 2 && lead.length <= 60 ? [lead] : [])].some((s) => asWord(s, 'i').test(text))) return true
  const title = words(r.title)
  return title.size > 1 && 3 * overlap(title, tw) >= 2 * title.size
}

/** instruments the text NAMES (see names) */
export function instrumentsNamed(text: string): RightsInstrument[] {
  const tw = words(text)
  return RIGHTS_INSTRUMENTS.filter((r) => names(r, text, tw))
}

/** the article numbers a text cites: "Art. 17", "article 144(1)", "§ 3", "section 2", "op. 1", and the Nordic
 *  chapter-and-section form "2 kap. 15 §" (the section sign AFTER the number), normalised to the table's spelling */
export function articlesCited(text: string): string[] {
  const nordic = [...text.matchAll(/\b(\d+)\s*kap\.?\s*(\d+)\s*§/gi)].map((m) => `${m[1]} kap. ${m[2]} §`)
  const rest = text.replace(/\b\d+\s*kap\.?\s*\d+\s*§/gi, ' ')
  return [...nordic, ...[...rest.matchAll(/(?:\bart(?:icle)?s?\.?|§|\bsection|\bs\.|\bop\.)\s*(\d+[a-z]?(?:\(\d+\))*)/gi)].map((m) => m[1]!.toLowerCase())]
}

/** does the instrument carry the cited article? "17" matches 17, 17(1), 17(4)-(5); "17(1)" matches 17(1) */
const carries = (r: RightsInstrument, cited: string): RightsArticle[] =>
  r.articles.filter((a) => {
    const n = a.n.toLowerCase()
    return n === cited || n.startsWith(cited + '(') || n.startsWith(cited + ' ') || n.split(/[;,]\s*/).includes(cited) || n.endsWith(' ' + cited)
  })

export interface RightsPath {
  instrument: string; title: string; kind: string; body: string; adopted: number | null
  article: string; topic: string; summary: string; qualifications: string; url: string
}
const pathOf = (r: RightsInstrument, a: RightsArticle): RightsPath => ({
  instrument: r.id, title: r.title, kind: r.kind, body: r.body, adopted: r.adopted,
  article: a.n, topic: a.topic, summary: a.summary, qualifications: r.qualifications, url: r.url,
})

/** the table's articles ranked by the content words they share with a text — vocabulary overlap, the house's one
 *  relevance floor (contentWords), not a judgement that the article applies. Every article sharing a word is kept. */
export function nearestPaths(text: string): (RightsPath & { shared: number })[] {
  const tw = words(text)
  return RIGHTS_INSTRUMENTS.flatMap((r) => r.articles.map((a) => ({ ...pathOf(r, a), shared: overlap(words(`${a.summary} ${r.title}`), tw) })))
    .filter((p) => p.shared > 0)
    .sort((x, y) => y.shared - x.shared)
}

// The receipt rides INSIDE the seal, never beside the body: receiptSealed(answer) recomputes the seal over every field
// except SEALED_BY, so an address stored next to the body would change the very bytes it seals.
type Sealed<T> = T & { [SEALED_BY]: { address: string; seal: string | null; signed: number; of: number; legal: boolean } }
function sealed<T extends Record<string, unknown>>(body: T): Sealed<T> {
  const s = receiptSealOf(body)
  return { ...body, [SEALED_BY]: { address: s.address, seal: s.seal, signed: s.signed, of: s.of, legal: s.legal } }
}

export type RightsVerdict = 'VERIFIED' | 'UNVERIFIED'
export interface RightsClaimAnswer extends Record<string, unknown> {
  claim: string
  verdict: RightsVerdict
  /** what was checked, in words a reader recognises */
  why: string
  /** the instrument(s) and article(s) found as cited */
  found: RightsPath[]
  /** when UNVERIFIED: what the table does hold nearest to the claim */
  nearest: (RightsPath & { shared: number })[]
  honest: string
}

/** verifyRightsClaim(claim) → VERIFIED only when the claim names an instrument in the sealed table and every article
 *  it cites exists in that instrument. Otherwise UNVERIFIED, with the nearest rows the table holds. Pure. */
export function verifyRightsClaim(claim: string): Sealed<RightsClaimAnswer> {
  const named = instrumentsNamed(claim)
  const cited = articlesCited(claim)
  const found = named.flatMap((r) => cited.flatMap((c) => carries(r, c).map((a) => pathOf(r, a))))
  const everyCited = cited.length > 0 && cited.every((c) => named.some((r) => carries(r, c).length > 0))
  const verdict: RightsVerdict = named.length > 0 && everyCited ? 'VERIFIED' : 'UNVERIFIED'
  const why = named.length === 0 ? 'the claim names no instrument in the sealed table'
    : cited.length === 0 ? `the claim names ${named.map((r) => r.id).join(', ')} but cites no article, so there is nothing to check it against`
      : everyCited ? `${named.map((r) => r.id).join(', ')} carries article ${cited.join(', ')} as cited`
        : `${named.map((r) => r.id).join(', ')} does not carry article ${cited.filter((c) => !named.some((r) => carries(r, c).length)).join(', ')} in the sealed table`
  return sealed({ claim, verdict, why, found, nearest: verdict === 'VERIFIED' ? [] : nearestPaths(claim), honest: RIGHTS_SCOPE })
}

export interface NatureReport extends Record<string, unknown> {
  url: string
  reached: boolean
  note: string
  /** the content-address of the bytes read — pin it and the same report is re-verifiable against the same page */
  address: string | null
  audit: Pick<DetailAudit, 'outcome' | 'details' | 'dropped' | 'counts' | 'receipt'> | null
  /** citations of instruments the page makes, each checked as verifyRightsClaim checks one claim */
  citations: { detail: string; verdict: RightsVerdict; why: string }[]
  /** the legislative paths the page touches, strongest vocabulary overlap first, each an instrument article with its
   *  kind, adopting body, qualifications and official source */
  paths: (RightsPath & { shared: number; details: number })[]
  honest: string
}

/** natureReport(url, read?) → one sealed report for one link: the page is read (netRead, kind 'page'), its words are
 *  audited detail by detail (auditDetails), every instrument citation it makes is checked, and every table article it
 *  shares vocabulary with is returned as a legislative path. A page the fetch does not reach (netRead answers
 *  reached:false — declined, refused or unreachable, with the host's own note) is reported as exactly that, with no
 *  audit and no paths. `read` is injectable so the report is testable without a network. */
export async function natureReport(url: string, read: (u: string) => Promise<NetRead> = (u) => netRead(u, 'page')): Promise<Sealed<NatureReport>> {
  const r = await read(url)
  if (!r.reached || r.body === null) {
    return sealed({ url, reached: false, note: r.note, address: null, audit: null, citations: [], paths: [], honest: RIGHTS_SCOPE })
  }
  const text = pageText(r.body)
  const a = auditDetails(text, { title: url })
  // Citations are read LINE BY LINE from the page text, not from the audit's details: the audit splits sentences at
  // a full stop, and "Art. 17" carries one, so a detail would hold the instrument and lose its article number.
  // pageText keeps each block element on its own line, which is where a citation stays whole.
  const citations = text.split('\n').filter((line) => instrumentsNamed(line).length > 0 && articlesCited(line).length > 0)
    .map((line) => { const c = verifyRightsClaim(line); return { detail: line, verdict: c.verdict, why: c.why } })
  const byPath = new Map<string, RightsPath & { shared: number; details: number }>()
  for (const v of a.verdicts) for (const p of nearestPaths(v.detail)) {
    const k = `${p.instrument}#${p.article}`
    const had = byPath.get(k)
    byPath.set(k, had ? { ...had, shared: had.shared + p.shared, details: had.details + 1 } : { ...p, details: 1 })
  }
  const paths = [...byPath.values()].sort((x, y) => y.shared - x.shared || y.details - x.details)
  return sealed({
    url, reached: true, note: r.note, address: r.address,
    audit: { outcome: a.outcome, details: a.details, dropped: a.dropped, counts: a.counts, receipt: a.receipt },
    citations, paths, honest: RIGHTS_SCOPE,
  })
}
