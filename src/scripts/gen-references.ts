#!/usr/bin/env node
// gen-references — RESOLVE EVERY DOI THE LEDGER'S OWN PROSE CITES, from the registry of record.
//
// THE NAMED NETWORK BOUNDARY. This script reads the public DOI registries (Crossref, then DataCite for the
// DOIs Crossref does not mint — Zenodo deposits and CERN Open Data among them). That is a live read of somebody
// else's index, so it lives HERE, in a gen-* script that declares it, and never inside a lean-* generator, which
// must stay deterministic. Its product is cached to lean/references.json and committed, so every downstream
// surface — the monographs, the JSON-LD, the LaTeX manuscript — is offline and reproducible from the cache.
//
// NOTHING HERE IS AUTHORED. src/references.ts computes WHICH works the ledger cites by scanning wing prose for
// DOI tokens; this script asks the registry WHAT each one is. A citation typed by hand would be a second source
// beside the ledger, free to drift and free to be wrong in a way nothing checks. A resolved one cannot: if a DOI
// does not resolve it is reported as a gap and is not written as a citation.
import { writeFileSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { referenceDois, type Reference } from '../references.js'
import { toUuid } from '../address.js'
import { handleOf } from '../handle.js'

const UA = { 'User-Agent': 'uuidna-references/1.0 (https://uuidna.com; mailto:ceci@psg.bg)' }

const fromCrossref = (m: Record<string, unknown>): Partial<Reference> => {
  const authors = ((m.author as { family?: string; given?: string; name?: string }[]) ?? [])
    .map((a) => a.family ? (a.given ? `${a.family}, ${a.given}` : a.family) : (a.name ?? '')).filter(Boolean)
  const year = ((m.issued as { 'date-parts'?: number[][] })?.['date-parts'] ?? [[]])[0]?.[0]
  return { title: tidy(((m.title as string[]) ?? [])[0] ?? ''), authors, year,
    container: ((m['container-title'] as string[]) ?? [])[0], registry: 'crossref' }
}

const fromDataCite = (a: Record<string, unknown>): Partial<Reference> => {
  const authors = ((a.creators as { name?: string; familyName?: string; givenName?: string }[]) ?? [])
    .map((c) => c.familyName ? (c.givenName ? `${c.familyName}, ${c.givenName}` : c.familyName) : (c.name ?? '')).filter(Boolean)
  return { title: ((a.titles as { title?: string }[]) ?? [])[0]?.title, authors,
    year: a.publicationYear as number, container: (a.publisher as string) ?? undefined, registry: 'datacite' }
}

// Registry titles arrive as they were deposited — with markup (Crossref carries <i>…</i> and entities inside
// titles) and with authors whose own initials already end in a period. Both are the registry's business, not the
// citation's, so the text is normalised on the way out: tags stripped, whitespace collapsed, and a terminating
// period added only where one is not already there. Nothing is invented — only the punctuation is ours.
const tidy = (t: string) => t.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
const dot = (t: string) => (/[.?!]$/.test(t) ? t : t + '.')

// the human citation, ASSEMBLED from resolved fields — never a typed string
const citeOf = (r: Partial<Reference>): string => {
  const a = (r.authors ?? []).map(tidy).filter(Boolean)
  const who = a.length ? (a.length > 4 ? a.slice(0, 3).join('; ') + '; et al' : a.join('; ')) : ''
  return [who, r.year ? `(${r.year})` : '', tidy(r.title ?? ''), tidy(r.container ?? '')]
    .filter(Boolean).map(dot).join(' ')
}

const resolve = async (doi: string): Promise<Reference> => {
  try {
    const r = await fetch('https://api.crossref.org/works/' + encodeURIComponent(doi), { headers: UA })
    if (r.ok) { const j = await r.json() as { message: Record<string, unknown> }
      const p = fromCrossref(j.message); return { doi, ...p, cite: citeOf(p), resolved: true } }
  } catch { /* fall through to DataCite — a Crossref miss is not an answer */ }
  try {
    const r = await fetch('https://api.datacite.org/dois/' + encodeURIComponent(doi), { headers: UA })
    if (r.ok) { const j = await r.json() as { data: { attributes: Record<string, unknown> } }
      const p = fromDataCite(j.data.attributes); return { doi, ...p, cite: citeOf(p), resolved: true } }
  } catch { /* unresolved — reported, never invented */ }
  return { doi, resolved: false }
}

// THE SOURCE IS THE SIGNED ARTIFACT. referenceDois() reads the ledger's structured prose — theorem names and
// PRINCIPLE blurbs — and that missed four of the eleven DOIs already in the tree, because a wing's HEADER carries
// credit too and no ledger field holds it. The .lean file is the text the kernel signed and the text a reader
// checks, so it is what gets scanned; the ledger relation is merged in rather than replaced, so a DOI reachable
// either way is attributed either way.
const DOI_TOKEN = /\b10\.\d{4,9}\/[^\s")<>,;]+/g
const byWing = referenceDois()
for (const f of readdirSync(join(ROOT, 'lean')).filter((f) => f.endsWith('.lean'))) {
  const found = (readFileSync(join(ROOT, 'lean', f), 'utf8').match(DOI_TOKEN) ?? []).map((d) => d.replace(/[.,;:)\]]+$/, ''))
  if (!found.length) continue
  byWing.set(f, [...new Set([...(byWing.get(f) ?? []), ...found])].sort())
}
const dois = [...new Set([...byWing.values()].flat())].sort()
console.log(`gen-references — ${dois.length} DOI(s) cited by ${byWing.size} wing(s); resolving …`)

const resolved: Reference[] = []
for (const d of dois) { const r = await resolve(d); resolved.push(r); console.log(`  ${r.resolved ? '✓' : '✗'} ${d}${r.resolved ? ' — ' + (r.title ?? '').slice(0, 72) : '  UNRESOLVED'}`) }

// no wall-clock in the artifact: the receipt is the content's own address, so an unchanged resolution is
// byte-identical run to run and the cache is comparable rather than merely fresh.
const body = JSON.stringify({ references: resolved.sort((a, b) => a.doi.localeCompare(b.doi)),
  byWing: Object.fromEntries([...byWing]) }, null, 0) + '\n'
writeFileSync(join(ROOT, 'lean', 'references.json'), body)

// AND the same content as a generated TypeScript module. seo.ts runs on the edge, where there is no filesystem,
// so a surface that needs the resolved bibliography cannot read the JSON — it imports this. Generated, never
// edited, exactly as src/theorems/generated.ts is: one source, two shapes, no hand-kept copy between them.
const ts = `// src/references-resolved.ts — GENERATED by scripts/gen-references. Do not edit.
// The external bibliography, resolved from Crossref and DataCite against the DOIs the wings' own prose carries.
// Regenerate with \`npm run x -- gen-references\` (a named network read); every downstream surface is offline.
export interface ResolvedReference { doi: string; cite?: string; title?: string; year?: number; registry?: string; resolved: boolean }

/** every external work the ledger cites, resolved from the registry of record */
export const RESOLVED_REFERENCES: readonly ResolvedReference[] = ${JSON.stringify(resolved.map((r) => ({ doi: r.doi, cite: r.cite, title: r.title, year: r.year, registry: r.registry, resolved: r.resolved })), null, 0)}

/** which wing cites which DOI — computed from wing prose, not authored */
export const REFERENCES_BY_WING: Readonly<Record<string, readonly string[]>> = ${JSON.stringify(Object.fromEntries([...byWing]), null, 0)}
`
writeFileSync(join(ROOT, 'src', 'references-resolved.ts'), ts)

const gaps = resolved.filter((r) => !r.resolved)
console.log(`\n${gaps.length === 0 ? '✓' : '✗'} gen-references — ${resolved.length - gaps.length}/${resolved.length} resolved from the registry of record; receipt ${handleOf(toUuid(body))}`)
if (gaps.length) { console.log('  UNRESOLVED (a DOI in prose that no registry knows — fix the prose, never the cache):')
  for (const g of gaps) console.log('    ' + g.doi); process.exitCode = 1 }
