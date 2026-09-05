// mirror — RECOVER AN INVOLUTION FROM AN UNORDERED SET, so a pairing can be DISCOVERED and not merely asserted.
//
// src/diamond.ts already lifts the ten's-complement reflection to any list: `involute` pairs index i with
// (n−1)−i. That map is correct and it is not an instrument: it pairs whatever it is handed, so a list arranged
// into mirror order by its author comes back "mirrored" and the arrangement is the only thing that was tested.
// Handed a shuffled set it returns nonsense with the same confidence. An index-mirror can CONFIRM a symmetry; it
// cannot FIND one — by construction, since it reads only the index and never the content — and until something
// can, there is no way to tell a real involution from a tidy list.
//
// What this module adds is the finder. A pairing is recovered from the facts alone — two items mirror when they
// sit on a SHARED AXIS, at OPPOSITE POLES of one antonym pair, on DIFFERENT SIDES — and the recovered pairing is
// then checked against the index-mirror. Agreement across two instruments that share no mechanism is the only
// evidence here that either is right; a divergence is a gap and names which one moved.
//
// THREE DEFECTS FOUND BY BUILDING IT, each folded below because each will recur:
//
//   1. NEGATION IS INVISIBLE TO A VERB SCAN. `writes nothing` scored as `writes`, so a genuine opposition read as
//      an agreement and the pair was lost. Same class as the four notation blind spots of 2026-09-05.
//   2. THE FIX OVER-REACHED. A three-word negator window read `generates from Lean, no hand-written file` as
//      negating the verb and inverted a true statement. Scope is the ADJACENT token; a negator further out is
//      negating something else. The fold introduced the next defect and only a control caught it.
//   3. A SINGLE CANDIDATE IS NOT A UNIQUE ONE. Requiring `exactly one candidate` let a weakly-related item
//      capture a partner whose true mirror had been removed. The requirement is a unique MAXIMUM axis overlap.
//
// AND ONE LIMIT OF THE INSTRUMENT, which matters more than the defects: a cross-side matcher requires
// side(a) ≠ side(b), so it can never report a self-match. Its fixed-point count is therefore a fact about the
// matcher, not about the set — reading a zero there as "no fixed point" is exactly the collapse
// `no_instrument_narrower_than_its_question` forbids. Fixed points need `agreements`, a separate detector.

/** one antonym pair; side 0 and side 1 are the two poles */
export type Antonyms = readonly [string, string]

/** the declaration a corpus is read through — nothing below is inferred, all of it is stated */
export interface Lexicon {
  /** the nouns that name an axis; an item off every axis has nothing to be mirrored ABOUT */
  readonly axes: readonly string[]
  /** the opposed verbs; an item on no pole has nothing to be mirrored BY */
  readonly poles: readonly Antonyms[]
}

/** an item resolved against a lexicon: which axes it touches, which pole it sits on, which side asserts it */
export interface Facet<T> {
  readonly item: T
  readonly side: string
  readonly axes: readonly string[]
  readonly pole: { readonly pair: number; readonly side: 0 | 1; readonly negated: boolean } | null
  readonly label: string
}

export interface Discovery<T> {
  /** mirrors: shared axis, opposite pole, different side */
  readonly pairs: ReadonlyArray<readonly [Facet<T>, Facet<T>]>
  /** candidate fixed points: shared axis, SAME pole, different side — what a cross-side matcher cannot self-match */
  readonly agreements: ReadonlyArray<readonly [Facet<T>, Facet<T>]>
  readonly orphans: ReadonlyArray<Facet<T> & { readonly why: string }>
  /** does the recovered map satisfy m(m(x)) = x — the property that makes it an involution at all */
  readonly selfInverse: boolean
  readonly covered: number
}

/** a negator BOUND TO THE VERB. Defect 2: only the adjacent token counts. */
const NEGATOR = /^(nothing|no|not|never|none|neither)$/

/** poleOf(text, lexicon) — the pole a sentence sits on, with an adjacent negator flipping it. */
export function poleOf(text: string, lex: Lexicon): Facet<unknown>['pole'] {
  const w = text.toLowerCase()
  for (let pair = 0; pair < lex.poles.length; pair++) {
    for (const s of [0, 1] as const) {
      const m = new RegExp(`\\b${lex.poles[pair][s]}\\b(?:\\s+(\\S+))?`).exec(w)
      if (!m) continue
      const negated = NEGATOR.test((m[1] ?? '').replace(/[^a-z]/g, ''))
      return { pair, side: (negated ? 1 - s : s) as 0 | 1, negated }
    }
  }
  return null
}

export const axesOf = (text: string, lex: Lexicon): string[] =>
  lex.axes.filter((a) => text.toLowerCase().includes(a))

/** facetsOf — resolve a tagged corpus against a lexicon. Order of the corpus is not read here or below. */
export function facetsOf(corpus: readonly { side: string; text: string }[], lex: Lexicon): Facet<string>[] {
  return corpus.map((c) => ({ item: c.text, side: c.side, axes: axesOf(c.text, lex), pole: poleOf(c.text, lex), label: c.text }))
}

/** the canonical traversal — by AXIS then SIDE then LABEL, never by input position. This is what makes the
 *  result a function of the facts: permute the input and the same pairing comes back. */
const canonical = <T>(fs: readonly Facet<T>[]): Facet<T>[] =>
  [...fs].sort((a, b) => (a.axes[0] ?? '~').localeCompare(b.axes[0] ?? '~') || a.side.localeCompare(b.side) || a.label.localeCompare(b.label))

/** discoverInvolution — the pairing recovered from the facts. Returns zero pairs when there is no symmetry. */
export function discoverInvolution<T>(facets: readonly Facet<T>[]): Discovery<T> {
  const order = canonical(facets)
  const idx = new Map(order.map((f, i) => [f, i]))
  const used = new Set<number>()
  // a refusal is final: an item refused as ambiguous must not be claimable by a later item, or the
  // ambiguity is settled by traversal order — the fault the refusal exists to prevent.
  const refused = new Set<number>()
  const pairs: Array<readonly [Facet<T>, Facet<T>]> = []
  const orphans: Array<Facet<T> & { why: string; at: number }> = []

  for (const f of order) {
    const fi = idx.get(f) as number
    if (used.has(fi)) continue
    const pole = f.pole
    if (!pole || f.axes.length === 0) { orphans.push({ ...f, why: f.axes.length === 0 ? 'off every axis' : 'on no pole', at: fi }); continue }
    const cands = order
      .filter((g) => !used.has(idx.get(g) as number) && !refused.has(idx.get(g) as number) && g !== f && g.side !== f.side && g.pole
        && g.pole.pair === pole.pair && g.pole.side !== pole.side && g.axes.some((a) => f.axes.includes(a)))
      .map((g) => ({ g, overlap: g.axes.filter((a) => f.axes.includes(a)).length }))
      .sort((x, y) => y.overlap - x.overlap || x.g.label.localeCompare(y.g.label))
    if (cands.length === 0) { orphans.push({ ...f, why: 'no mirror', at: fi }); continue }
    // Defect 3: one candidate is not a unique one. A tie at the top is an ambiguity, and an ambiguity resolved
    // by sort order is a pairing invented by the sort.
    if (cands.length > 1 && cands[0].overlap === cands[1].overlap) {
      refused.add(fi)
      orphans.push({ ...f, why: `ambiguous — ${cands.length} candidates tied at overlap ${cands[0].overlap}`, at: fi }); continue
    }
    used.add(fi); used.add(idx.get(cands[0].g) as number)
    pairs.push([f, cands[0].g] as const)
  }

  // agreements: the fixed-point detector the mirror matcher cannot be BY CONSTRUCTION — its candidate filter
  // requires side(a) ≠ side(b), so no item is ever its own candidate.
  const agreements: Array<readonly [Facet<T>, Facet<T>]> = []
  for (const a of order) for (const b of order) {
    if ((idx.get(a) as number) >= (idx.get(b) as number)) continue
    if (a.side === b.side || !a.pole || !b.pole) continue
    if (a.pole.pair === b.pole.pair && a.pole.side === b.pole.side && b.axes.some((x) => a.axes.includes(x))) agreements.push([a, b] as const)
  }

  const m = new Map<number, number>()
  for (const [a, b] of pairs) { m.set(idx.get(a) as number, idx.get(b) as number); m.set(idx.get(b) as number, idx.get(a) as number) }
  const selfInverse = [...m.keys()].every((k) => m.get(m.get(k) as number) === k)

  // an orphan that a LATER item claimed as its mirror is not an orphan — the traversal reached it first.
  return { pairs, agreements, orphans: orphans.filter((o) => !used.has(o.at)), selfInverse, covered: m.size }
}

/** the unordered pairing as a comparable signature — what two instruments must agree on */
export const signatureOf = <T>(pairs: ReadonlyArray<readonly [Facet<T>, Facet<T>]>): string =>
  pairs.map(([a, b]) => [a.label, b.label].sort().join(' | ')).sort().join('\n')

// ── THE GENERALISATION, and it is a claim rather than a hope because it is measured in mirror.test.ts.
//
// The mechanism above mentions no domain. What is domain-specific is the LEXICON, and swapping it is the whole
// port: the same matcher recovers this tree's own sealed reflection r(d) = 10 − d — all four 2-cycles AND the
// unique fixed point 5 — from a permuted corpus of digit facts under a numeric lexicon of nine magnitudes and
// one antonym pair, none of which existed when the prose lexicon was written. The digit facts never state the
// pairing: each says only how far a digit sits from one end, and (d, 10−d) falls out of shared magnitude at
// opposite ends. Recovering a sealed involution the instrument was not built for is what generalisation means
// here, and the test perturbs a fact to show the recovery can fail.

import { diamond, involute, involutionFixed, DIAMOND_FIXED } from './diamond.js'

const MAGNITUDES = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] as const

/** the numeric lexicon — nine magnitudes, one antonym pair. Nothing in it names a mirror. */
export const DIGIT_LEXICON: Lexicon = { axes: MAGNITUDES, poles: [['above', 'below']] }

/** the digit corpus: how far each digit sits from each end, and nothing else. `skew` perturbs one fact so the
 *  test can watch the recovery break — a finder with no failing input has not been shown to work. */
export function digitCorpus(skew: { digit: number; by: number } | null = null): { side: string; text: string; digit: number }[] {
  const rows: { side: string; text: string; digit: number }[] = []
  for (const d of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    const lift = skew && skew.digit === d ? skew.by : 0
    rows.push({ side: 'from-zero', text: `${MAGNITUDES[d - 1 + lift]} above zero`, digit: d })
    rows.push({ side: 'from-ten', text: `${MAGNITUDES[10 - d - 1]} below ten`, digit: d })
  }
  return rows
}

/** the pairing the discovery recovers, as digit 2-cycles — comparable to `involute([1..9])` term for term */
export function recoveredDigitPairs(corpus = digitCorpus()): Array<[number, number]> {
  const facets = corpus.map((c) => ({ item: c.digit, side: c.side, axes: axesOf(c.text, DIGIT_LEXICON), pole: poleOf(c.text, DIGIT_LEXICON), label: `${c.side}:${c.text}` }))
  return discoverInvolution(facets).pairs
    .map(([a, b]) => [a.item, b.item].sort((x, y) => x - y) as [number, number])
    .sort((p, q) => p[0] - q[0] || p[1] - q[1])
}

/** involutionGaps — THE FINDER. Two instruments that share no mechanism must return one pairing.
 *
 *  `involute` pairs by index and `discoverInvolution` pairs by shared axis at opposite poles; neither can check
 *  itself. A divergence means one of them moved, and the gap names which, because css.ts picks its mirror pairs
 *  and grid.ts reports a broken involution from the index side alone — a silent drift there is a wrong stylesheet
 *  and a wrong verdict, both of them confident. */
export function involutionGaps(): { what: string; fix: string }[] {
  const gaps: { what: string; fix: string }[] = []
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  // 1) the map is self-inverse on its own domain — the property the word "involution" asserts
  const notSelf = digits.filter((d) => diamond(diamond(d)) !== d)
  if (notSelf.length) gaps.push({
    what: `diamond r(d) = 10 − d is NOT self-inverse at ${notSelf.join(', ')} — r∘r ≠ id, so the word "involution" is unearned`,
    fix: 'restore r(d) = 10 − d, or rename it: a map that is not self-inverse has no mirror pairs and css.ts is picking its rules from a lie',
  })

  // 2) the fixed points ARE the declared ones — a count nobody re-derives is a count that drifts
  const fixed = digits.filter((d) => diamond(d) === d)
  if (fixed.join(',') !== DIAMOND_FIXED.join(',')) gaps.push({
    what: `diamond fixed points recompute to [${fixed.join(', ')}] against the declared DIAMOND_FIXED [${DIAMOND_FIXED.join(', ')}]`,
    fix: 'DIAMOND_FIXED must be derived from diamond, never restated beside it',
  })

  // 3) THE CROSS-CHECK. The index-mirror and the discovery must name the same 2-cycles.
  const byIndex = involute(digits).map(([a, b]) => [a, b].sort((x, y) => x - y).join('↔'))
  const byDiscovery = recoveredDigitPairs().map(([a, b]) => `${a}↔${b}`)
  const indexSet = [...new Set(byIndex)].sort()
  const discSet = [...new Set(byDiscovery)].sort()
  if (indexSet.join(' ') !== discSet.join(' ')) gaps.push({
    what: `the two instruments disagree — index-mirror gives {${indexSet.join(', ')}} and axis-discovery gives {${discSet.join(', ')}}`,
    fix: 'one of src/diamond.ts (index) or src/mirror.ts (discovery) moved. The index-mirror pairs whatever it is handed, so it is the one that can be wrong while looking right — check it first',
  })

  // 4) the centre survives BOTH readings — an odd list has exactly one, and the discovery reports it as a
  //    2-cycle whose two members name the same element. A cross-side matcher never self-matches — by
  //    construction, side(a) ≠ side(b) is required of every candidate — so this is the only shape available.
  const centreByIndex = involutionFixed(digits)
  const centreByDiscovery = recoveredDigitPairs().filter(([a, b]) => a === b).map(([a]) => a)
  if (centreByIndex.join(',') !== centreByDiscovery.join(',')) gaps.push({
    what: `the unique centre disagrees — index says [${centreByIndex.join(', ')}], discovery says [${centreByDiscovery.join(', ')}]`,
    fix: 'the ten\'s-complement reflection fixes exactly 5; a second centre or none means the domain or the map changed under one of the two instruments',
  })

  // 5) REDUNDANCY. Each 2-cycle is named by both of its magnitudes, so every one should be witnessed twice; the
  //    centre once, its two facts being the same digit. A 2-cycle standing on a single witness means a fact went
  //    missing, and this is the check that caught a corrupted corpus when the pairing itself still looked right.
  const witnesses = recoveredDigitPairs().map(([a, b]) => `${a}↔${b}`)
  const thin = [...new Set(witnesses)].filter((c) => c !== '5↔5' && witnesses.filter((w) => w === c).length !== 2)
  if (thin.length) gaps.push({
    what: `${thin.length} 2-cycle(s) stand on a single witness — ${thin.join(', ')} — where the corpus should name each from both magnitudes`,
    fix: 'a lost witness means a digit fact is wrong or missing; the pairing can still look correct on the surviving witness, which is why the count is checked and not just the pairing',
  })

  return gaps
}
