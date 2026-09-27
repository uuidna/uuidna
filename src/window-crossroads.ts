// window-crossroads — WHERE A WING OF FINITE WINDOWS MEETS THE REST OF THE CORPUS, counted rather than asserted.
//
// The captain, 2026-09-27: "only cross proving clay on each cross road results in thousands of formulated
// applications". The measurement behind that sentence is this: Clay.lean seals ONE finite window per problem, seven
// windows total, and a point has no crossroads. Worse, the cross machinery could not reach them even in principle.
// `corpusAlgebra()` walks `formulas()`, which keeps only rows that PARSE as formulas — and every Clay window is a
// program (`List.range`, `filter`, `.all`, `flatMap`). So the integers those windows are ABOUT — 16 boolean functions
// on two inputs, 27 index triples, 6 non-zero Levi-Civita symbols, the four Hasse primes — never entered the pool the
// crosses are drawn from. The seven hardest problems in the corpus stood at zero junctions, and nothing said so.
//
// IT IS NOT ABOUT CLAY, and saying so cost one rename. The captain, 2026-09-27: "Cern is another cross example of
// clay" — and lean/CernLinks.lean is the worked proof of it, five theorems relating the published integers of four CMS
// primary datasets to arithmetic this ledger already seals, each one perturbation-tested on both sides. CERN's windows
// onto an unfinished physics got their crossings BY HAND; Clay's windows onto seven unfinished mathematics never got
// any. Two instances of one species, so this module takes the wing as an argument and has no favourite. Ask it about
// Cern.lean, StringTheory.lean, or any wing at all, and it answers in the same terms.
//
// THE FOLD IS THAT A PROGRAM'S NUMERALS ARE STILL ITS ARITHMETIC. The parser refuses the SHAPE of
// `((List.range 16).filter …).length = 4`; it does not make 16 and 4 stop being the quantities the window counts.
// Lexing the numerals out of the statement — which is what `dataNumerals` already does for a different purpose —
// puts every window on the grid without weakening anything, because nothing here is sealed: a crossroad is a place to
// look, and the crosses it formulates go to the conveyor as candidates exactly as `cross-formulate`'s do.
//
// WHY 0 AND 1 ARE EXCLUDED, and why that is the same judgement made twice. `dataNumerals` drops them because a 0 or a
// 1 under substitution is structure rather than data — `x * 1 = x` says nothing about x. Here they are dropped for the
// same reason from the other side: a window sharing the integer 1 with another wing shares nothing, because almost
// every wing carries 1. A junction on 1 is the crossroad-shaped form of a padding conjunct, and it is refused for the
// same reason.
//
// WHAT COUNTS AS AN APPLICATION. At a junction between a window and a wing, an application is a cross `a ⊕ b = c`
// where `a` is an integer the WINDOW carries, `b` one the WING carries, `⊕` an arithmetic operator the corpus already
// uses, `c` an integer the corpus already carries, the identity TRUE in exact integers, and the whole thing UNSTATED.
// Every clause is a filter against fabrication: unstated, so it is not a restatement; landing on a carried integer, so
// it joins two things the corpus already said rather than inventing a third; true by construction, so the kernel can
// decide it. The count is therefore a count of decidable propositions nobody has written down, not an estimate.
//
// NOTHING HERE SEALS, AND NOTHING HERE CLAIMS A MILLENNIUM PROBLEM. A window is not the conjecture — Clay.lean says so
// in its own header and this module inherits that scope exactly. Crossing a window with a wing produces arithmetic
// about the window's finite quantities. It does not touch the conjecture, and a reader who thinks otherwise has been
// misled by this file rather than by the mathematics.

import type { BinOp, Classification } from './formula.js'
import { characteristicNumerals, classify } from './formula.js'
import { applyOp } from './formulas.js'

/** the wing the seven Millennium windows are sealed in — one instance of the species, not the species */
export const CLAY_WING = 'Clay.lean'
/** CERN's published integers, and the hand-made crossings that proved this pattern works before it was automated */
export const CERN_WINGS = ['Cern.lean', 'CernLinks.lean'] as const

export interface ClayWindow {
  key: string
  /** the statement's shape. A `program` cannot enter corpusAlgebra() — which is the whole reason this module exists */
  shape: Classification
  /** the characteristic integers it carries, ascending by value, with 0 and 1 excluded as structure */
  integers: string[]
}

export interface Crossroad {
  windowKey: string
  wing: string
  /** the integers both sides carry — what makes this a junction rather than a coincidence of digits */
  shared: string[]
  /** decidable crosses formulable here that the corpus has not stated */
  applications: number
  /**
   * of those, the ones built on a CHARACTERISTIC quantity — an integer carried by fewer wings than the corpus's
   * median. This is the column to read. A cross on 3 and 4 is arithmetic every wing could have written; a cross on
   * 27 and 110 joins two places that each had a reason to count that far.
   */
  characteristic: number
  /** the fewest wings carrying any shared integer — 1 means this junction is the only other place it appears */
  rarity: number
}

export interface CrossroadInput {
  windows: readonly ClayWindow[]
  /** the wing the windows come from — never crossed with itself, because that is its own arithmetic */
  homeWing: string
  /** every integer the corpus carries → the wings carrying it, as corpusAlgebra() reports them */
  integers: readonly { value: string; wings: readonly string[] }[]
  /** the canonical text of every cross the corpus already STATES */
  stated: ReadonlySet<string>
  arithmetic: readonly BinOp[]
  /** the landing ceiling, taken from the corpus so nothing is bounded from outside it */
  ceiling: string
}

/**
 * The carrier count AT OR BELOW which an integer is a characteristic quantity rather than a counting number: the
 * corpus's OWN median. Taking the median rather than picking a threshold is the difference between a measured boundary
 * and a tuned one — the corpus decides where its counting numbers end, and the boundary moves when the corpus does.
 *
 * AT OR BELOW, not below, and the reason is measured: the median carrier count in this corpus is 1, because there are
 * thousands of distinct integers and most appear in exactly one wing. A strict `<` is therefore empty — it reports
 * that nothing is characteristic, which is a vacuous answer dressed as a strict one. `<=` says what is meant: an
 * integer no more common than the typical integer. My first version used `<` and the census duly returned 0 of
 * 256,265, which is how the degeneracy was caught.
 */
export function characteristicCeiling(
  integers: readonly { value: string; wings: readonly string[] }[],
): number {
  if (integers.length === 0) return 0
  const counts = integers.map((i) => i.wings.length).sort((a, b) => a - b)
  const mid = counts.length >> 1
  return counts.length % 2 === 1
    ? counts[mid]!
    : Math.ceil((counts[mid - 1]! + counts[mid]!) / 2)
}

/** the numerals a statement is about, whatever its shape. One reader, shared with corpusAlgebra() — see formula.ts */
export const windowIntegers = characteristicNumerals

/** the windows of one wing, read from whatever rows are handed in — pure, so a test can hand it a world it built */
export function windowsOf(
  rows: readonly { key: string; file: string; statement: string }[],
  wing: string,
): ClayWindow[] {
  return rows
    .filter((r) => r.file === wing)
    .map((r) => ({
      key: r.key,
      shape: classify(String(r.statement)),
      integers: windowIntegers(String(r.statement)),
    }))
}

/**
 * Every junction between a window and another wing, with the applications formulable at it COUNTED.
 *
 * A wing is a neighbour of a window when they carry an integer in common. The applications are then every
 * `a ⊕ b = c` with `a` from the window, `b` from the wing, `c` carried by the corpus, true in exact integers and
 * unstated. `a` and `b` are drawn from the two sides separately and on purpose: a cross built from two integers of
 * the SAME wing is that wing's own arithmetic and says nothing about the junction.
 */
export function crossroads(input: CrossroadInput): Crossroad[] {
  const carried = new Set(input.integers.map((i) => i.value))
  const byWing = new Map<string, Set<string>>()
  for (const { value, wings } of input.integers) {
    for (const w of wings) {
      if (w === input.homeWing) continue
      const s = byWing.get(w) ?? new Set<string>()
      s.add(value)
      byWing.set(w, s)
    }
  }
  const carriers = new Map(input.integers.map((i) => [i.value, i.wings.length]))
  const rare = characteristicCeiling(input.integers)
  const ceiling = BigInt(input.ceiling)
  const out: Crossroad[] = []
  for (const win of input.windows) {
    if (win.integers.length === 0) continue
    for (const [wing, wingInts] of byWing) {
      const shared = win.integers.filter((v) => wingInts.has(v))
      if (shared.length === 0) continue
      let applications = 0
      let characteristic = 0
      const isRare = (v: string): boolean => (carriers.get(v) ?? 0) <= rare
      for (const a of win.integers) {
        for (const b of wingInts) {
          for (const op of input.arithmetic) {
            const c = applyOp(op, BigInt(a), BigInt(b), ceiling)
            if (c === null || !carried.has(String(c))) continue
            if (input.stated.has(`${a} ${op} ${b} = ${c}`)) continue
            applications += 1
            if (isRare(a) || isRare(b)) characteristic += 1
          }
        }
      }
      out.push({
        windowKey: win.key,
        wing,
        shared: [...shared],
        applications,
        characteristic,
        rarity: Math.min(...shared.map((v) => carriers.get(v) ?? 0)),
      })
    }
  }
  // RANKED BY THE CHARACTERISTIC COLUMN, not the total: sorting by `applications` would put the window that happens
  // to carry the most counting numbers on top, which is the opposite of interesting.
  return out.sort((x, y) => y.characteristic - x.characteristic || x.windowKey.localeCompare(y.windowKey))
}

export interface CrossroadCensus {
  windows: number
  /** windows the cross machinery can reach through formulas() alone — the rest are invisible to it */
  reachableAsFormula: number
  junctions: number
  applications: number
  /** the subset worth looking at first — built on an integer the corpus rarely carries */
  characteristic: number
  /** windows standing at no junction at all */
  isolated: string[]
}

export function crossroadCensus(
  windows: readonly ClayWindow[],
  roads: readonly Crossroad[],
): CrossroadCensus {
  const standing = new Set(roads.map((r) => r.windowKey))
  return {
    windows: windows.length,
    reachableAsFormula: windows.filter((w) => w.shape === 'formula').length,
    junctions: roads.length,
    applications: roads.reduce((n, r) => n + r.applications, 0),
    characteristic: roads.reduce((n, r) => n + r.characteristic, 0),
    isolated: windows.filter((w) => !standing.has(w.key)).map((w) => w.key),
  }
}
