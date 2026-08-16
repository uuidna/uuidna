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
import { researchEvidence } from './corroborate.js'
import { rdRoot } from './boundary.js'

interface Entry { key: string; name: string; statement: string; file: string; principle: string; skill: string }

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
export interface LedgerSearch { q: string; count: number; total: number; receipt: string; matches: Array<{ key: string; name: string; principle: string; skill: string }> }
export function searchLedger(q: string, limit = 60): LedgerSearch {
  const T = theorems() as Entry[]
  const s = q.trim().toLowerCase()
  const hit = s ? T.filter((t) => `${t.key} ${t.name} ${t.statement} ${t.principle} ${t.skill}`.toLowerCase().includes(s)) : []
  return {
    q, count: hit.length, total: T.length,
    receipt: toUuid(hit.map((t) => t.key).join('\n')),
    matches: hit.slice(0, limit).map((t) => ({ key: t.key, name: t.name, principle: t.principle, skill: t.skill })),
  }
}

/** ONLINE — the search on trial for one wing: findings content-addressed, each verdict computed; evidence, never approval */
export interface SearchTrial {
  file: string; principle: string; sealed: number
  findings: Array<{ address: string; source: string; note: string; alone: string; withBacking: string }>
  usable: number; receipt: string
}
export async function searchTrialFor(file: string): Promise<SearchTrial> {
  const a = articleFor(file)
  const found = await researchEvidence(a.title)
  const cited = a.claims.map((c) => c.cite).join(' ')
  const findings = found.map((f) => {
    const alone = reveal(f.note).verdict
    const withBacking = reveal(`${f.note} — held beside the sealed backing: ${cited}`).verdict
    return { address: f.address, source: f.source, note: f.note, alone, withBacking }
  })
  return {
    file, principle: a.title, sealed: a.count, findings,
    usable: findings.filter((f) => f.alone === 'UNVERIFIED' && f.withBacking === 'VERIFIED').length,
    receipt: toUuid(findings.map((f) => f.address).join('\n')),
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
