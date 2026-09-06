#!/usr/bin/env node
// @non-harmonic: reads api.crossref.org over the network — a NAMED research boundary, like org-fit. The response
// is DATA: it is recorded, never run, never followed. A match is a title overlap in someone else's metadata; it
// is not proof of prior art and it is not their consent.
//
// prior-art-sweep — ASK THE LITERATURE ABOUT EVERY SEALED THEOREM, WITHOUT A HUMAN IN THE LOOP.
//
// (the captain, 2026-09-06: "first you need to cover all prior work NOT MANUALLY".)
//
// WHY IT EXISTS. HISTORY, 2026-09-06: docs/captain-claims.json claimed every sealed theorem for the captain
// while rosetta, reading the same wings, attributed 16 of them elsewhere — SI, CODATA, WGS 84, Landauer,
// Eratosthenes, Gutenberg, four DOIs. That disagreement is now SETTLED in src/claim-attribution.ts: the captain
// claims the formalisation of all of them and the discovery of the rest, and the 16 facts are credited. No count
// is quoted here — a ledger size in prose is a number no generator keeps current, and this sentence already
// carried a stale one.
//
// The settlement does not retire this sweep, because NEITHER surface measures novelty: both answer "who wrote
// the note", not "did someone get here first". `two_order_six` is 2^6 ≡ 1 mod 9 and centuries old; Chargaff is
// 1950; Maxwell's rule is 1864. Only the literature answers that, and only for rows nobody thought to annotate.
// Over-claiming is exactly as grave as under-claiming (the claim involution, fixed only at the honest statement).
//
// ITS OWN CONTROL, and the reason the 16 matter here. Those rows have KNOWN answers: Chargaff and Landauer were
// the calibration probes, and both scored agreement 2 while two synthetic misses scored 0. A full sweep that
// returns no candidate for `dna_base_pairing_involution` has not found novelty — it has proven itself broken.
//
// ON-DEMAND BY ITS NATURE, and DECLARED in lean/dormant-scripts.json rather than given an npm entry point. The
// entry point was tried first and one-receipt caught it immediately: a package.json line that only spells out
// the dist path, called by nothing, is a thin wrapper. What the declaration needed instead was a bare run that
// touches no network — the dormant roster is exercised in full on every gate pass and required to exit 0, and a
// paced multi-hour network sweep inside a chain this tree requires to be deterministic is what org-fit is
// declared to avoid. So bare REPORTS from the checkpoint file, and asking the literature costs `--run` for
// everything left or `--limit=N` for a slice, invoked directly on the built script.
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

export interface Hit { title: string; score: number }
export interface Row { key: string; query: string; crossref: number; arxiv: number; agreement: number; asked: boolean; why?: string; top?: string }

/** THE FUSED SIGNAL IS AGREEMENT BETWEEN INDEPENDENT INDEXES, not a score threshold.
 *
 *  Calibrated 2026-09-06 against two known hits and two known misses. A bare Crossref score does NOT separate
 *  them — Chargaff 53, Landauer 28, garbage 26 and 18, a genuine hit scoring BELOW a coincidence. Vocabulary
 *  overlap between Crossref and arXiv separates all four cleanly: hits 2 and 2, misses 0 and 0. Noise does not
 *  agree across indexes that share no corpus and no ranker.
 *
 *  DataCite was measured and DROPPED: it returned results but contributed ZERO overlap on every probe, hit or
 *  miss. An index that agrees with nothing adds requests and no signal. */
const AGREEMENT_IS_A_CANDIDATE = 1

const words = (s: string): string[] => s.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 3)
const overlap = (a: readonly Hit[], b: readonly Hit[]): number => {
  const A = new Set(a.flatMap((h) => words(h.title))), B = new Set(b.flatMap((h) => words(h.title)))
  let n = 0; for (const w of A) if (B.has(w)) n++; return n
}

const crossref = async (q: string): Promise<Hit[]> => {
  const r = await fetch('https://api.crossref.org/works?query.bibliographic=' + encodeURIComponent(q) +
    '&rows=3&select=' + encodeURIComponent('DOI,title,score') + '&mailto=' + encodeURIComponent(MAILTO))
  if (!r.ok) throw new Error('crossref ' + r.status)
  const j = await r.json() as { message?: { items?: { title?: string[]; score?: number }[] } }
  return (j.message?.items ?? []).map((i) => ({ title: String(i.title?.[0] ?? ''), score: Number(i.score ?? 0) }))
}
const arxiv = async (q: string): Promise<Hit[]> => {
  const r = await fetch('https://export.arxiv.org/api/query?search_query=all:' + encodeURIComponent(q) + '&max_results=3')
  if (!r.ok) throw new Error('arxiv ' + r.status)
  const x = await r.text()
  return [...x.matchAll(/<title>([\s\S]*?)<\/title>/g)].slice(1).map((m) => ({ title: m[1]!.trim(), score: 0 }))
}

/** ask ONE theorem of both indexes. A failure is UNASKED, never "no prior art" — an absent instrument voids. */
export async function ask(key: string, name: string): Promise<Row> {
  const query = queryOf(name)
  if (!query) return { key, query: '', crossref: 0, arxiv: 0, agreement: 0, asked: false, why: 'no claim sentence' }
  try {
    const [cr, ax] = await Promise.all([crossref(query), arxiv(query)])
    return { key, query, crossref: cr.length, arxiv: ax.length, agreement: overlap(cr, ax), asked: true, top: cr[0]?.title.slice(0, 120) }
  } catch (e) {
    return { key, query, crossref: 0, arxiv: 0, agreement: 0, asked: false, why: e instanceof Error ? e.message.slice(0, 60) : 'fetch failed' }
  }
}

/** How many consecutive UNASKED rows mean the index is refusing rather than answering. */
const FAILURES_THAT_END_A_RUN = 5
/** The wait after the 1st..4th consecutive failure. Fixed, not jittered: an RNG is a determinism hard-reject here. */
const BACKOFF_MS: readonly number[] = [10000, 30000, 60000, 120000]

const limit = Number(process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? '0')
// THE NETWORK NEEDS A WORD SAID OUT LOUD. Bare invocation REPORTS and asks nobody.
//
// This script is declared in lean/dormant-scripts.json, and that roster is executed in full on every gate pass
// and required to exit 0 — so whatever a bare run does, the deterministic chain does. org-fit.ts is declared for
// exactly this reason and stops there; a sweep can do better than stop, because its state is already on disk.
// Bare therefore reads lean/prior-art-sweep.json and prints how far the sweep has got: offline, O(1), no clock,
// and it still exercises the parsing and the resume arithmetic — the parts that rot. Asking the literature costs
// --run (everything left) or --limit=N (a slice).
const wantsNetwork = process.argv.includes('--run') || limit > 0

if (process.argv[1]?.endsWith('prior-art-sweep.js')) {
  const prior: Record<string, Row> = existsSync(OUT)
    ? Object.fromEntries((JSON.parse(readFileSync(OUT, 'utf8')) as { rows: Row[] }).rows.map((r) => [r.key, r]))
    : {}
  const all = theorems()
  if (!wantsNetwork) {
    const done = all.filter((t) => prior[t.key]?.asked).length
    const cand = Object.values(prior).filter((r) => r.asked && r.agreement >= AGREEMENT_IS_A_CANDIDATE).length
    console.log(`prior-art-sweep — ${done}/${all.length} asked · ${cand} with candidates · ${all.length - done} left`)
    console.log('  no network read: pass --run for the rest, or --limit=N for a slice')
    process.exit(0)
  }
  // RESUMABLE BY CONSTRUCTION: a row already asked is not asked again, so a metered sweep can be run in as many
  // sittings as it takes and a failure costs only the rows since the last checkpoint.
  //
  // THE CHECKPOINT IS WHAT MAKES THAT TRUE, and it was missing. This wrote once, after the loop, while the
  // comment above claimed a failure cost one row — so a crash at row 2600 would have cost 2600 rows and two
  // hours, and the resume path would have found the file exactly as it started. Caught by running the bare
  // reporter mid-sweep and reading 4 asked when the log said 200: the claim and the instrument disagreed, which
  // is the same shape as every other lead found today. Now the state on disk is never more than 25 rows behind.
  const todo = all.filter((t) => !prior[t.key]?.asked)
  const batch = limit > 0 ? todo.slice(0, limit) : todo
  console.log(`prior-art-sweep — ${all.length} sealed · ${all.length - todo.length} already asked · asking ${batch.length}`)
  const rows: Row[] = [...Object.values(prior)]
  let asked = 0, withHits = 0, consecutiveFailures = 0
  for (const t of batch) {
    const r = await ask(t.key, t.name)
    const i = rows.findIndex((x) => x.key === r.key)
    if (i >= 0) rows[i] = r; else rows.push(r)
    if (r.asked) { asked++; consecutiveFailures = 0; if (r.agreement >= AGREEMENT_IS_A_CANDIDATE) withHits++ }
    // A REFUSING INDEX MUST STOP THE SWEEP, NOT BE WALKED PAST 2654 TIMES.
    //
    // Recording a 429 as UNASKED is right per row — an absent instrument voids, it never reports "no prior art".
    // In aggregate it is a trap: the run marches the whole roster at three seconds a row, spends two hours, and
    // writes a file that LOOKS complete because every row has an entry. MEASURED, and this is why the rule
    // exists: arXiv returned 200 for a 34-row slice and then 429 for every row of the next run. The per-row
    // honesty was intact and the sweep was still worthless.
    //
    // So failures escalate the wait and then end the run. The rows already asked are checkpointed and the resume
    // path picks them up, which is exactly the cost model the checkpoint was added for.
    else {
      consecutiveFailures++
      if (consecutiveFailures >= FAILURES_THAT_END_A_RUN) {
        save(all.length, rows)
        console.error(`\n✗ prior-art-sweep — ${consecutiveFailures} rows in a row went UNASKED (last: ${r.why}).`)
        console.error(`  The index is refusing, not answering empty. ${asked} rows asked this run and CHECKPOINTED;`)
        console.error('  re-run later with --run to continue from there. Nothing was recorded as "no prior art".')
        process.exit(1)
      }
      // BACK OFF BEFORE THE NEXT ROW — a fixed table, because a computed jitter would need an RNG this tree bans.
      await new Promise((res) => setTimeout(res, BACKOFF_MS[consecutiveFailures - 1] ?? 60000))
    }
    // arXiv asks for one request every three seconds. It is the index carrying the signal, so the sweep runs at
    // ITS pace, not at the pace of the fastest door — 2658 rows is hours, and that is the honest cost.
    await new Promise((res) => setTimeout(res, 3000))
    if (asked % 25 === 0 && asked) {
      save(all.length, rows)
      console.log(`  ${asked}/${batch.length} asked · ${withHits} with candidates · checkpointed`)
    }
  }
  save(all.length, rows)
  const answered = rows.filter((r) => r.asked)
  console.log(`✓ ${answered.length} asked · ${answered.filter((r) => r.agreement >= AGREEMENT_IS_A_CANDIDATE).length} with candidates · ${answered.filter((r) => r.agreement < AGREEMENT_IS_A_CANDIDATE).length} no agreement · ${OUT.replace(ROOT + '/', '')}`)
}

/** save(sealed, rows) → the sweep's state on disk. Called at every checkpoint AND at the end, so the file the
 *  resume path reads is written by exactly one piece of code — a checkpoint cannot drift from the final write
 *  because there is no second writer to drift from, which is the only way to get that guarantee: two call sites
 *  computing the same summary independently is precisely how `asked` and `withCandidates` would come to disagree
 *  between a mid-run file and the one written at the end. */
function save(sealed: number, rows: Row[]): void {
  rows.sort((a, b) => a.key.localeCompare(b.key))
  const answered = rows.filter((r) => r.asked)
  writeFileSync(OUT, JSON.stringify({
    why: 'What the registration agency returned for each theorem\'s own claim sentence. A hit is a CANDIDATE for prior art, not a finding of it; an empty result is not proof of novelty, only that this query returned nothing on this day. Neither decides novelty — a human or a later gate reads these.',
    sealed, asked: answered.length, unasked: rows.length - answered.length,
    withCandidates: answered.filter((r) => r.agreement >= AGREEMENT_IS_A_CANDIDATE).length,
    clean: answered.filter((r) => r.agreement < AGREEMENT_IS_A_CANDIDATE).length,
    rows,
  }, null, 2) + '\n')
}
