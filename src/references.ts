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

/** referenceDois() → {wing file → the DOIs its own prose carries}, sorted, deduplicated. Pure. */
export function referenceDois(): Map<string, string[]> {
  const out = new Map<string, Set<string>>()
  const add = (file: string, text: string) => {
    for (const m of String(text).match(DOI_TOKEN) ?? []) {
      if (!out.has(file)) out.set(file, new Set())
      out.get(file)!.add(clean(m))
    }
  }
  for (const p of PRINCIPLES) add(p[0], p[2])
  for (const t of theorems() as readonly Theorem[]) add(t.file, t.name)
  return new Map([...out].sort((a, b) => a[0].localeCompare(b[0])).map(([f, s]) => [f, [...s].sort()]))
}

/** every DOI the ledger cites, once, sorted — the set gen-references resolves */
export function allReferenceDois(): string[] {
  return [...new Set([...referenceDois().values()].flat())].sort()
}
