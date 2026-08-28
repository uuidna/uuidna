// @non-harmonic: two ONLINE verbs — searchTrialFor (researchEvidence: the archives answer at their own pace) and
// viesVerify (the EU register answers at its own pace) — ride the same named fetch boundary as corroborate.ts;
// they return EVIDENCE, never approval, and the offline core (articleFor, editorialState, publicationStatus)
// stays fully deterministic. The boundary is named here so the scan holds it visible, never hidden.
// editorial — THE DESK AS A LIBRARY. Every editorial skill this repo runs (writing articles computed from the
// ledger, the prose-trial census, the publication's license law and archive conformance, the search-on-trial,
// the entity register lookup) as pure exported functions — the ONE implementation the scripts, the MCP tools
// and the CI automation all call. Writing is computing: an article is derived from sealed theorems, every claim
// born citing its proof. Integrity, not truth — the desk verifies citations, scope and conformance; it never
// decides what is true. Deterministic offline core; the two ONLINE verbs (searchTrialFor, viesVerify) ride the
// same named fetch boundary corroborate.ts holds and return evidence, never approval.
import { theorems } from './theorems/index.js'
import { toUuid } from './address.js'
import { reveal } from './gate.js'
import { researchEvidence, evidenceRow } from './corroborate.js'
import { collectApiEvidence } from './api-mint.js'
import { harvestFragments } from './harvest.js'
import { rdRoot } from './boundary.js'
import { decide } from './decide.js'
import { hexbitDoorOf } from './hexbit/index.js'

interface Entry { key: string; name: string; statement: string; tactic: string; file: string; principle: string; skill: string }

/** the computed article for one wing — headline from the principle, every claim citing its sealed proof */
export interface Article {
  file: string
  slug: string
  title: string
  count: number
  claims: Array<{ key: string; name: string; statement: string; cite: string }>
}
export function articleFor(file: string): Article {
  const entries = (theorems() as Entry[]).filter((t) => t.file === file)
  if (!entries.length) throw new Error('editorial: no theorems in the ledger for wing ' + file)
  const slug = file.replace('.lean', '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
  return {
    file, slug, title: entries[0]!.principle, count: entries.length,
    claims: entries.map((t) => ({ key: t.key, name: t.name, statement: t.statement, cite: `/theorem/${t.key}` })),
  }
}

/** UNIQUENESS COMES FROM LEAN, NOT FROM THE NAME — the ledger counts ENTRIES, but a theorem is its statement:
 *  two entries proving the same proposition under different keys are one theorem wearing two names. This census
 *  reports both numbers so no surface can quietly print the larger one, and names every group so a new re-naming
 *  cannot enter silently. Normalisation is deliberately narrow (whitespace, redundant parens, `(n : Nat)` type
 *  ascriptions): it catches re-namings of the SAME text, never claims two different proofs are the same. */
export interface StatementCensus {
  entries: number
  distinct: number
  renamings: number
  groups: Array<{ statement: string; keys: string[]; files: string[] }>
}
const normStatement = (s: string): string =>
  s.replace(/\s+/g, '').replace(/\((\d+)\s*:\s*Nat\)/g, '$1').replace(/[()]/g, '')

/** THE LEAN UUID — a theorem's identity is its Lean, so the identity is the address of the STATEMENT, never of
 *  the key. Two entries proving the same proposition share one lean uuid however they are named or wherever
 *  they are filed; the wings then USE the theorem from that identity rather than owning a copy of it. Additive
 *  by design: the per-entry address stays exactly as published (every citation, receipt and DOI'd record keeps
 *  resolving), and this is the identity beneath them. */
export function leanUuid(statement: string): string {
  return toUuid('lean:' + normStatement(statement))
}

export interface LeanIdentity { leanUuid: string; statement: string; keys: string[]; files: string[]; entries: number }

/** the ledger indexed BY LEAN — one entry per distinct proposition, with every name that wears it */
export function leanIndex(): LeanIdentity[] {
  const T = theorems() as Array<Entry & { statement: string }>
  const by = new Map<string, LeanIdentity>()
  for (const t of T) {
    const id = leanUuid(t.statement)
    const cur = by.get(id)
    if (cur) { cur.keys.push(t.key); if (!cur.files.includes(t.file)) cur.files.push(t.file); cur.entries++ }
    else by.set(id, { leanUuid: id, statement: t.statement, keys: [t.key], files: [t.file], entries: 1 })
  }
  return [...by.values()]
}

/** resolve a theorem BY ITS LEAN IDENTITY — the uuid, or any name that wears it, or the statement itself */
export function byLean(query: string): LeanIdentity | null {
  const q = query.trim()
  const idx = leanIndex()
  return idx.find((e) => e.leanUuid === q)
    ?? idx.find((e) => e.keys.includes(q))
    ?? idx.find((e) => normStatement(e.statement) === normStatement(q))
    ?? null
}
function groupByStatement(): Map<string, Array<Entry & { statement: string }>> {
  const T = theorems() as Array<Entry & { statement: string }>
  const by = new Map<string, Array<Entry & { statement: string }>>()
  for (const t of T) {
    const k = normStatement(t.statement)
    const g = by.get(k)
    if (g) g.push(t); else by.set(k, [t])
  }
  return by
}
export function statementCensus(): StatementCensus {
  const by = groupByStatement()
  const T = [...by.values()].flat()
  const groups = [...by.values()].filter((g) => g.length > 1).map((g) => ({
    statement: g[0]!.statement,
    keys: g.map((t) => t.key),
    files: [...new Set(g.map((t) => t.file))],
  }))
  return { entries: T.length, distinct: by.size, renamings: T.length - by.size, groups }
}

/** EVERY distinct proven fact, singleton or reused — the reusable Lean-line CHUNK a handle addresses. Unlike
 *  statementCensus's `groups` (which names only the 79 RE-USED facts, the backlog guard tracks), this names all
 *  1224: the storable unit is the algebra, not the theorem record, so every distinct statement gets one chunk
 *  whether one key cites it or five. */
export interface StatementChunk { statement: string; tactic: string; keys: string[]; files: string[] }
export function allStatementChunks(): StatementChunk[] {
  return [...groupByStatement().values()].map((g) => ({
    statement: g[0]!.statement,
    tactic: g[0]!.tactic.replace(/\s*--.*$/, '').trim(),
    keys: g.map((t) => t.key).sort(),
    files: [...new Set(g.map((t) => t.file))].sort(),
  }))
}

/** the desk's census — the committed prose-trials artifact (derived, never authored); repo-reads via the boundary */
export interface EditorialState { surfaces: number; paragraphs_tried: number; usable: number; unverified: number; drained: number; receipt: string }
export function editorialState(): EditorialState {
  const t = JSON.parse(rdRoot('prose-trials.json'))
  return { surfaces: t.surfaces, paragraphs_tried: t.paragraphs_tried, usable: t.usable, unverified: t.unverified, drained: t.drained, receipt: t.receipt }
}

/** the publication's laws, checked as functions — the same assertions the release pipeline enforces */
export interface PublicationStatus {
  version: string
  license: string
  licenseLawHolds: boolean          // package.json license == .zenodo.json license (case-insensitive)
  zenodoConformance: { title: boolean; description: boolean; creators: boolean; uploadType: boolean; accessRight: boolean; licenseWhenOpen: boolean }
  communities: string[]
  conforms: boolean
}
export function publicationStatus(): PublicationStatus {
  const pkg = JSON.parse(rdRoot('package.json'))
  const z = JSON.parse(rdRoot('.zenodo.json'))
  const UPLOAD = ['publication', 'poster', 'presentation', 'dataset', 'image', 'video', 'software', 'lesson', 'physicalobject', 'other']
  const ACCESS = ['open', 'embargoed', 'restricted', 'closed']
  const c = {
    title: typeof z.title === 'string' && z.title.length > 0,
    description: typeof z.description === 'string' && z.description.length >= 3,
    creators: Array.isArray(z.creators) && z.creators.length > 0 && z.creators.every((x: { name?: string }) => typeof x.name === 'string' && x.name.length > 0),
    uploadType: UPLOAD.includes(z.upload_type),
    accessRight: ACCESS.includes(z.access_right),
    licenseWhenOpen: z.access_right !== 'open' || (typeof z.license === 'string' && z.license.length > 0),
  }
  const licenseLawHolds = String(pkg.license).toLowerCase() === String(z.license).toLowerCase()
  return {
    version: pkg.version, license: pkg.license, licenseLawHolds,
    zenodoConformance: c,
    communities: (z.communities ?? []).map((x: { identifier: string }) => x.identifier),
    conforms: licenseLawHolds && Object.values(c).every(Boolean),
  }
}

/** THE FUSED SEARCH — one pure function over the sealed ledger, served identically by the browser page, the
 *  stdio MCP and the edge MCP: filter by text, fold the matched keys to ONE receipt. Two independent parties
 *  (your browser, the edge) running the same query MUST compute the same receipt — dual-party verification
 *  applied to search itself; a differing receipt exposes a diverged ledger instantly. */
export interface LedgerSearch {
  q: string; count: number; total: number; receipt: string
  handle: string; hexbits: number[]; door: string
  matches: Array<{ key: string; name: string; principle: string; skill: string }>
}
export function searchLedger(q: string, limit = 60): LedgerSearch {
  const T = theorems() as Entry[]
  const s = q.trim().toLowerCase()
  const hit = s ? T.filter((t) => `${t.key} ${t.name} ${t.statement} ${t.principle} ${t.skill}`.toLowerCase().includes(s)) : []
  const receipt = toUuid(hit.map((t) => t.key).join('\n'))
  return {
    q, count: hit.length, total: T.length,
    receipt,
    ...hexbitDoorOf(receipt),
    matches: hit.slice(0, limit).map((t) => ({ key: t.key, name: t.name, principle: t.principle, skill: t.skill })),
  }
}

/** ONLINE — the search on trial for one wing: findings content-addressed, each verdict computed; evidence, never approval */
export interface SearchTrial {
  file: string; principle: string; sealed: number
  findings: Array<{ address: string; source: string; note: string; handle: string; door: string; alone: string; withBacking: string }>
  usable: number
  /** THE NOVELTY HARVEST — arithmetic fragments extracted from the findings (the AI summaries included), each
   *  judged by the quantum calculator: decided TRUE and absent from the sealed statement index = a candidate
   *  fact the web asserts, the calculator confirms, and the ledger does not yet hold. Really novel content,
   *  born receipted — REMANDED for admission (the paying handle decides what becomes a wing), never auto-sealed. */
  novel: Array<{ from: string; fragment: string; receipt: string }>
  receipt: string
  handle: string
  hexbits: number[]
  door: string
}
export async function searchTrialFor(file: string): Promise<SearchTrial> {
  const a = articleFor(file)
  const apiEvidence = await collectApiEvidence(a.title)
  const found = apiEvidence.length
    ? apiEvidence.map((e) => ({ source: e.source, address: e.address, note: e.text.slice(0, 800), handle: e.handle, door: e.door }))
    : (await researchEvidence(a.title)).map((e) => evidenceRow(e.source, e.address, e.note))
  const cited = a.claims.map((c) => c.cite).join(' ')
  const novel: SearchTrial['novel'] = []
  const findings = found.map((f) => {
    const row = evidenceRow(f.source, f.address, f.note)
    const alone = reveal(row.note).verdict
    const withBacking = reveal(`${row.note} — held beside the sealed backing: ${cited}`).verdict
    // the harvest: every arithmetic fragment in the finding judged totally; true-and-unsealed is novel
    for (const fragment of harvestFragments(row.note)) {
      const d = decide(fragment)
      if (d.verdict === 'VERIFIED_BY_DECIDE' && d.kind === 'decided-arithmetic')
        novel.push({ from: row.address, fragment, receipt: d.receipt })
    }
    return { address: row.address, source: row.source, note: row.note, handle: row.handle, door: row.door, alone, withBacking }
  })
  const receipt = toUuid(findings.map((f) => f.address).join('\n'))
  return {
    file, principle: a.title, sealed: a.count, findings,
    usable: findings.filter((f) => f.alone === 'UNVERIFIED' && f.withBacking === 'VERIFIED').length,
    novel,
    receipt,
    ...hexbitDoorOf(receipt),
  }
}

/** ONLINE — verify an EU VAT number against the VIES register (the EU's own ledger); a register lookup, not tax advice */
export interface ViesResult { countryCode: string; vatNumber: string; valid: boolean; name: string | null; address: string | null; requestDate: string | null }
export async function viesVerify(countryCode: string, vatNumber: string): Promise<ViesResult> {
  const cc = countryCode.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2)
  const num = vatNumber.replace(/[^0-9A-Za-z+*.]/g, '')
  if (cc.length !== 2 || !num) throw new Error('viesVerify: need a 2-letter country code and a VAT number')
  const res = await fetch(`https://ec.europa.eu/taxation_customs/vies/rest-api/ms/${cc}/vat/${num}`)
  if (!res.ok) throw new Error('viesVerify: VIES answered HTTP ' + res.status)
  const d = await res.json() as { isValid?: boolean; name?: string; address?: string; requestDate?: string }
  return { countryCode: cc, vatNumber: num, valid: d.isValid === true, name: d.name ?? null, address: (d.address ?? '').trim() || null, requestDate: d.requestDate ?? null }
}
