// references — THE EXTERNAL BIBLIOGRAPHY OF THE SEALED LEDGER, DERIVED FROM THE LEDGER'S OWN PROSE.
//
// WHAT WAS MISSING, AND WHY IT WAS INVISIBLE. src/citations reads theorem NAMES and builds the graph of which
// seal leans on which; seo.ts turns that graph into JSON-LD `citation`. Both are real, and neither can see
// outside the tree — nothing in a theorem name is Euler. So a wing could credit a person at length in its prose,
// and the credit reached no bibliography, no crawler, and no line of the LaTeX manuscript. Eleven DOIs were
// already sitting in wing prose — Nature, PNAS, Zenodo, CERN Open Data — and not one surface displayed them.
//
// THE RULE, and it is the same shape as the internal one: every DOI-shaped token inside a sealed theorem's NAME
// or its wing's PRINCIPLE blurb is a reference of that wing. It is SCANNED, never picked. A wing sealed tomorrow
// that writes a DOI beside its credit appears in the bibliography tomorrow, and no hand-kept list can linger,
// drift, or quietly omit someone. Nothing here is authored: the relation is computed, and the citation TEXT is
// resolved from the registry of record (Crossref, DataCite) by `npm run x -- gen-references`, cached in
// lean/references.json. Typing a citation by hand would put a second, driftable source beside the ledger — the
// exact crack this replaces.
import { theorems, PRINCIPLES, type Theorem } from './theorems/index.js'
import { RESOLVED_REFERENCES } from './references-resolved.js'
import { toUuid } from './address.js'

/** the DOI shape, per the DOI handbook: a "10." prefix, a registrant code, then the suffix */
const DOI_TOKEN = /\b10\.\d{4,9}\/[^\s")<>,;]+/g

/** trailing sentence punctuation is prose, not part of the identifier */
const clean = (d: string) => d.replace(/[.,;:)\]]+$/, '')

/** ONE external work, as the registry of record describes it. `cite` is resolved, never typed. */
export interface Reference {
  doi: string
  cite?: string        // resolved: authors · title · container · year
  title?: string
  authors?: string[]
  year?: number
  container?: string
  registry?: 'crossref' | 'datacite'
  resolved: boolean    // false = declared in prose but never resolved (a gap, not a citation)
}

/** A STANDARD NAMED BY ITS NUMBER IS A DOI THE PUBLISHER ALREADY MINTED. The RFC Editor registers every RFC with
 *  Crossref as 10.17487/RFC followed by the number padded to four digits (RFC 7669, "Assigning Digital Object
 *  Identifiers to RFCs"), and NIST registers each FIPS as 10.6028/NIST.FIPS.<number> — so "RFC 8439" and
 *  "FIPS 180-4" in prose resolve through the same registry as a typed DOI, and a number the publisher never
 *  registered comes back unresolved rather than counted. */
const RFC_TOKEN = /\bRFC\s?(\d{1,4})\b/g
const FIPS_TOKEN = /\bFIPS\s?(\d{2,3}(?:-\d+)?)\b/g

/** identifiersIn(text) → every source the prose names by a registered identifier, as DOIs, in order, once each */
export function identifiersIn(text: string): string[] {
  const s = String(text)
  const found = [
    ...(s.match(DOI_TOKEN) ?? []).map(clean),
    ...[...s.matchAll(RFC_TOKEN)].map((m) => `10.17487/RFC${m[1]!.padStart(4, '0')}`),
    ...[...s.matchAll(FIPS_TOKEN)].map((m) => `10.6028/NIST.FIPS.${m[1]}`),
  ]
  return [...new Set(found)]
}

/** One wing's prose, counted by what it names: rows naming a source whose DOI the registry resolved, rows naming
 *  only identifiers no registry resolved, and the rest, which name none. */
export interface WingSources { wing: string; theorems: number; resolvable: number; unresolved: number; unsourced: number; dois: string[]; unresolvedDois: string[] }

/** sourcesByWing(rows, resolved) → per wing, how many rows of prose name a resolvable source. Pure: the rows are the
 *  ledger's (file, name) pairs and `resolved` is the set of DOIs gen-references resolved from the registry of record. */
export function sourcesByWing(rows: readonly { file: string; name: string }[], resolved: ReadonlySet<string>): WingSources[] {
  const by = new Map<string, WingSources>()
  for (const r of rows) {
    const w = by.get(r.file) ?? { wing: r.file, theorems: 0, resolvable: 0, unresolved: 0, unsourced: 0, dois: [], unresolvedDois: [] }
    by.set(r.file, w)
    w.theorems++
    const ids = identifiersIn(r.name)
    const ok = ids.filter((d) => resolved.has(d.toLowerCase()))
    if (ok.length) w.resolvable++
    else if (ids.length) w.unresolved++
    else w.unsourced++
    for (const d of ok) if (!w.dois.includes(d)) w.dois.push(d)
    for (const d of ids) if (!ok.includes(d) && !w.unresolvedDois.includes(d)) w.unresolvedDois.push(d)
  }
  return [...by.values()].sort((a, b) => b.resolvable - a.resolvable || b.theorems - a.theorems || a.wing.localeCompare(b.wing))
}

/** referenceDois() → {wing file → the DOIs its own prose carries}, sorted, deduplicated. Pure. */
export function referenceDois(): Map<string, string[]> {
  const out = new Map<string, Set<string>>()
  const add = (file: string, text: string) => {
    for (const d of identifiersIn(text)) {
      if (!out.has(file)) out.set(file, new Set())
      out.get(file)!.add(d)
    }
  }
  for (const p of PRINCIPLES) add(p[0], p[2])
  for (const t of theorems() as readonly Theorem[]) add(t.file, t.name)
  return new Map([...out].sort((a, b) => a[0].localeCompare(b[0])).map(([f, s]) => [f, [...s].sort()]))
}

/** sourcesReport({wing}) → the uuidna_sources door: per wing, how many rows of prose name a source the registry of
 *  record resolved (lean/references.json, written by gen-references), how many name only unresolved identifiers, and
 *  how many name none. Without {wing}, every wing that names anything is listed and the rest are counted. */
export function sourcesReport(wing?: string): Record<string, unknown> {
  const resolved = new Set(RESOLVED_REFERENCES.filter((r) => r.resolved).map((r) => r.doi.toLowerCase()))
  const all = sourcesByWing((theorems() as readonly Theorem[]).map((t) => ({ file: t.file, name: t.name })), resolved)
  const sum = (k: 'theorems' | 'resolvable' | 'unresolved' | 'unsourced'): number => all.reduce((s, w) => s + w[k], 0)
  const totals = { theorems: sum('theorems'), resolvable: sum('resolvable'), unresolved: sum('unresolved'), unsourced: sum('unsourced'), wings: all.length, wingsCiting: all.filter((w) => w.resolvable > 0).length }
  const asked = wing === undefined ? undefined : (wing.endsWith('.lean') ? wing : `${wing}.lean`)
  const byWing = asked ? all.filter((w) => w.wing === asked) : all.filter((w) => w.resolvable + w.unresolved > 0)
  if (asked && !byWing.length) return { refused: true, why: `unknown wing: ${wing} — ${all.length} wings are served`, totals }
  const body = { totals, byWing, silentWings: asked ? undefined : all.length - byWing.length }
  return { ...body, receipt: toUuid(JSON.stringify(body)),
    honest: 'A row counts as resolvable when its prose names a DOI (an RFC or FIPS number read as the DOI its publisher registered) that Crossref or DataCite resolved when gen-references last ran. Resolving proves the record exists; it does not read the work, and it does not say the work supports the sentence citing it.' }
}

/** every DOI the ledger cites, once, sorted — the set gen-references resolves */
export function allReferenceDois(): string[] {
  return [...new Set([...referenceDois().values()].flat())].sort()
}
