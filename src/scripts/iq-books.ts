#!/usr/bin/env node
// @non-harmonic: fetches sampled books over the network — a NAMED boundary, like books.ts and mine-wikisource.ts.
//
// iq-books — DO THE DECODER'S FACTS DISCRIMINATE, OR DO THEY MERELY HOLD?
//
// A claim true of every book tells you nothing about any book. decode-book.ts emits candidate facts — a vocabulary
// bracket, a Zipf comparison between the first two ranks, a letter ordering — and each one LOOKS like knowledge
// when you read a single decoding. The question that settles whether it is knowledge is whether it VARIES. This
// is the vacuity law turned on the decoder itself: the same test that killed the seams theorem, which was true by
// construction and therefore said nothing.
//
// THE SAMPLE IS COMPUTED, NOT CHOSEN. The first attempt at this was nine book ids typed by hand and called random.
// They were not random, they were mine — English-language classics I happened to know — so any conclusion drawn
// from them would have measured my taste and reported it as a property of literature. Here the sample is derived
// from a seed through toUuid, the ledger's own content-addresser: nobody picks the books, and anyone re-running
// with the same seed draws the identical sample. That is strictly better than host randomness, which is banned tree-
// wide anyway because it settles no theorem — a seeded draw is both unbiased and RECOMPUTABLE, so a surprising
// result can be checked rather than taken on trust.
//
// MISSES ARE REPORTED, NEVER HIDDEN. A sampled id may not exist or may carry no plain text. Those are counted and
// named, because a sample that silently drops its failures is a sample that reports whatever survived.
//
// Exits non-zero when a candidate fact holds across the WHOLE sample: that is the finding, not a pass. It means
// the fact cannot distinguish one book from another and must not be sealed as though it identifies anything.
//
//   node dist/scripts/iq-books.js [--seed <text>] [--n 12]
import { toUuid } from '../index.js'
import { decode } from './decode-book.js'

const CATALOGUE = 75000 // Gutenberg ids run roughly to here; misses are expected and reported

export interface Probe { id: number; words: number; distinct: number; richness: number; top1: string; top2: string; c1: number; c2: number; letters: string }
export interface Verdict { fact: string; held: number; failed: number; discriminates: boolean }

/** Deterministic sample: fold the seed with the draw index, read the fold as an integer, land it in range.
 *  Same seed, same books, every time — on any machine, by anyone. */
export function sample(seed: string, n: number): number[] {
  const ids: number[] = []
  for (let i = 0; ids.length < n && i < n * 40; i++) {
    const hex = toUuid(`${seed}:${i}`).replace(/-/g, '').slice(0, 8)
    const id = (parseInt(hex, 16) % CATALOGUE) + 1
    if (!ids.includes(id)) ids.push(id)
  }
  return ids
}

/** The candidate facts, each asked of one decoding. Kept here rather than in decode-book so the question
 *  "does it discriminate" stays separate from the question "what does it say". */
export const FACTS: { name: string; of: (p: Probe) => boolean }[] = [
  { name: 'vocabulary richness is exactly 10x distinct', of: (p) => p.richness === 10 },
  { name: 'rank1 exceeds rank2', of: (p) => p.c1 > p.c2 },
  { name: 'rank1 is under twice rank2', of: (p) => p.c1 < 2 * p.c2 },
  { name: "commonest word is 'the'", of: (p) => p.top1 === 'the' },
  { name: "letter order begins 'eta'", of: (p) => p.letters === 'eta' },
]

export function judge(probes: readonly Probe[]): Verdict[] {
  return FACTS.map((f) => {
    const held = probes.filter((p) => f.of(p)).length
    return { fact: f.name, held, failed: probes.length - held, discriminates: held > 0 && held < probes.length }
  })
}

export function probeOf(id: number, raw: string): Probe | null {
  const d = decode(raw, 3)
  if (!d.words || d.ranks.length < 2) return null
  let k = 0
  while ((k + 1) * d.distinct <= d.words) k++
  return {
    id, words: d.words, distinct: d.distinct, richness: k,
    top1: d.ranks[0].word, top2: d.ranks[1].word, c1: d.ranks[0].count, c2: d.ranks[1].count,
    letters: d.letters.slice(0, 3).map((l) => l.letter).join(''),
  }
}

if (process.argv[1] && /iq-books\.(js|ts)$/.test(process.argv[1])) {
  const arg = (n: string, d: string) => (process.argv.indexOf(n) >= 0 ? process.argv[process.argv.indexOf(n) + 1] : d)
  const seed = arg('--seed', 'uuidna:iq')
  const n = Number(arg('--n', '12')) || 12
  const ids = sample(seed, n)
  console.log(`iq-books — seed "${seed}" draws ${ids.join(', ')}\n`)

  const { fetchGutenberg } = await import('../books.js')
  const probes: Probe[] = []
  const missed: number[] = []
  for (const id of ids) {
    try {
      const f = await fetchGutenberg(id) as unknown
      const raw = typeof f === 'string' ? f : String((f as { text?: string }).text ?? '')
      const p = probeOf(id, raw)
      if (!p) { missed.push(id); continue }
      probes.push(p)
      console.log(`  ${String(p.id).padStart(6)} ${String(p.words).padStart(7)}w  rich ${String(p.richness).padStart(2)}  ${(p.top1 + '=' + p.c1).padEnd(14)} ${(p.top2 + '=' + p.c2).padEnd(14)} ${p.letters}`)
    } catch { missed.push(id) }
  }

  console.log(`\n  ${probes.length} decoded, ${missed.length} unavailable (${missed.join(', ') || 'none'})`)
  if (probes.length < 3) { console.error('\n✗ iq-books — fewer than 3 books decoded; the sample cannot settle anything'); process.exit(1) }

  console.log('\n  fact                                        holds  fails  verdict')
  const verdicts = judge(probes)
  for (const v of verdicts) {
    console.log(`  ${v.fact.padEnd(44)} ${String(v.held).padStart(4)} ${String(v.failed).padStart(6)}   ${v.discriminates ? 'DISCRIMINATES' : v.held === probes.length ? 'VACUOUS — true of every book' : 'never holds'}`)
  }
  const vacuous = verdicts.filter((v) => v.held === probes.length)
  if (vacuous.length) {
    console.error(`\n✗ iq-books — ${vacuous.length} candidate fact(s) hold across the WHOLE sample and so identify nothing:`)
    for (const v of vacuous) console.error(`  · ${v.fact}`)
    console.error('  Do not seal these as if they described a particular book.')
    process.exit(1)
  }
  console.log('\n✓ iq-books — every candidate fact varies across the sample; each one carries information.')
}
