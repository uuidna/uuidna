#!/usr/bin/env node
// @non-harmonic: reads api.crossref.org over the network — a NAMED research boundary, like org-fit. The response
// is DATA: it is recorded, never run, never followed. A match is a title overlap in someone else's metadata; it
// is not proof of prior art and it is not their consent.
//
// prior-art-sweep — ASK THE LITERATURE ABOUT EVERY SEALED THEOREM, WITHOUT A HUMAN IN THE LOOP.
//
// (the captain, 2026-09-06: "first you need to cover all prior work NOT MANUALLY".)
//
// WHY IT EXISTS. docs/captain-claims.json claims 2657 of 2657 theorems for the captain. rosetta, reading the same
// wings, attributes 16 of them elsewhere — SI, CODATA, WGS 84, Landauer, Eratosthenes, Gutenberg, four DOIs. The
// two surfaces disagree, and NEITHER measures novelty: both answer "who wrote the note", not "did someone get
// here first". `two_order_six` is 2^6 ≡ 1 mod 9 and centuries old; Chargaff is 1950; Maxwell's rule is 1864.
// Claiming all 2657 as discoveries is an over-claim, which this ledger holds to be exactly as grave as an
// under-claim (the claim involution, fixed only at the honest statement).
//
// WHAT IT DOES AND DOES NOT DECIDE. It records what the registration agency returns for each theorem's own claim
// sentence, with the score the agency itself assigned. It does NOT decide novelty: a hit is a CANDIDATE for
// prior art that a human or a later gate must read. An empty result is likewise not proof of novelty — it is
// proof that this query, on this day, against this index, returned nothing. Both are recorded as what they are.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'

import { theorems } from '../theorems/index.js'

const OUT = join(ROOT, 'lean/prior-art-sweep.json')
const MAILTO = 'ceccec@psg.bg'          // the polite pool: identified traffic, not anonymous scraping

/** THE QUERY IS THE CLAIM SENTENCE, not the key. A key is this tree's compressed name and matches nothing in the
 *  literature; the claim sentence is the thing another author might have written first. Leading label and
 *  trailing scope are stripped so the query is the assertion rather than this tree's framing of it. */
export function queryOf(name: string): string {
  return String(name)
    .replace(/^[A-Z][A-Z —-]{2,}:\s*/, '')      // "BIOLOGY: ", "CLAIMED by enumeration over ...: "
    .replace(/\bCLAIMED[^:]*:\s*/i, '')
    .split(/[—.]/)[0]!
    .replace(/`[^`]*`/g, ' ')                        // theorem keys and code are not literature
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)
}

export interface Hit { doi: string; title: string; score: number; year: number | null }
export interface Row { key: string; query: string; hits: Hit[]; asked: boolean; why?: string }

// NOT crossrefSearchUrl — its `select` list omits `score`, so every hit came back scored 0 and the sweep had no
// discrimination at all: `1·1 ≡ 1 (mod 9)` "matched" *Standing Biceps Stretch Mod 1*. The score is the whole
// instrument here, because Crossref returns SOMETHING for nearly any query; only the score separates a real
// prior-art candidate from a coincidence of words.
const searchUrl = (subject: string, rows = 3): string =>
  'https://api.crossref.org/works?query.bibliographic=' + encodeURIComponent(subject) +
  '&rows=' + String(rows) +
  '&select=' + encodeURIComponent('DOI,title,issued,score') +
  '&mailto=' + encodeURIComponent(MAILTO)

const parse = (body: unknown): Hit[] => {
  const items = (body as { message?: { items?: unknown[] } })?.message?.items ?? []
  return items.slice(0, 3).map((raw) => {
    const it = raw as { DOI?: string; title?: string[]; score?: number; issued?: { 'date-parts'?: number[][] } }
    return {
      doi: String(it.DOI ?? ''),
      title: String(it.title?.[0] ?? '').slice(0, 140),
      score: Number(it.score ?? 0),
      year: it.issued?.['date-parts']?.[0]?.[0] ?? null,
    }
  })
}

/** ask ONE theorem. A network failure is UNASKED, never "no prior art" — the distinction this tree
 *  spent the day on: an absent instrument voids, it does not verdict. */
export async function ask(key: string, name: string): Promise<Row> {
  const query = queryOf(name)
  if (!query) return { key, query: '', hits: [], asked: false, why: 'no claim sentence to query' }
  try {
    const res = await fetch(searchUrl(query), { headers: { accept: 'application/json' } })
    if (!res.ok) return { key, query, hits: [], asked: false, why: `crossref ${res.status}` }
    return { key, query, hits: parse(await res.json()), asked: true }
  } catch (e) {
    return { key, query, hits: [], asked: false, why: e instanceof Error ? e.message.slice(0, 60) : 'fetch failed' }
  }
}

const limit = Number(process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? '0')

if (process.argv[1]?.endsWith('prior-art-sweep.js')) {
  const prior: Record<string, Row> = existsSync(OUT)
    ? Object.fromEntries((JSON.parse(readFileSync(OUT, 'utf8')) as { rows: Row[] }).rows.map((r) => [r.key, r]))
    : {}
  const all = theorems()
  // RESUMABLE BY CONSTRUCTION: a row already asked is not asked again, so a metered sweep can be run in as many
  // sittings as it takes and a failure costs only its own row.
  const todo = all.filter((t) => !prior[t.key]?.asked)
  const batch = limit > 0 ? todo.slice(0, limit) : todo
  console.log(`prior-art-sweep — ${all.length} sealed · ${all.length - todo.length} already asked · asking ${batch.length}`)
  const rows: Row[] = [...Object.values(prior)]
  let asked = 0, withHits = 0
  for (const t of batch) {
    const r = await ask(t.key, t.name)
    const i = rows.findIndex((x) => x.key === r.key)
    if (i >= 0) rows[i] = r; else rows.push(r)
    if (r.asked) { asked++; if (r.hits.length) withHits++ }
    if (asked % 25 === 0 && asked) console.log(`  ${asked}/${batch.length} asked · ${withHits} with candidates`)
  }
  rows.sort((a, b) => a.key.localeCompare(b.key))
  const answered = rows.filter((r) => r.asked)
  writeFileSync(OUT, JSON.stringify({
    why: 'What the registration agency returned for each theorem\'s own claim sentence. A hit is a CANDIDATE for prior art, not a finding of it; an empty result is not proof of novelty, only that this query returned nothing on this day. Neither decides novelty — a human or a later gate reads these.',
    sealed: all.length, asked: answered.length, unasked: rows.length - answered.length,
    withCandidates: answered.filter((r) => r.hits.length).length,
    clean: answered.filter((r) => !r.hits.length).length,
    rows,
  }, null, 2) + '\n')
  console.log(`✓ ${answered.length} asked · ${answered.filter((r) => r.hits.length).length} with candidates · ${answered.filter((r) => !r.hits.length).length} returned nothing · ${OUT.replace(ROOT + '/', '')}`)
}
