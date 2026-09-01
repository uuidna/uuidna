// separation — REACH WHAT YOU CANNOT REACH DIRECTLY, BY ALTERNATING TWO THINGS YOU CAN DO.
//
// Three domains in this ledger already carry the same shape, and none of them derives the others:
//
//   SAILING     a boat cannot point into the wind. `no_go_zone : 45 + 45 = 90` is the cone it cannot steer into.
//               It alternates two headings it CAN hold, and `tacking_cancels_leeway : (4 + (-4)) = 0` says what
//               happens — the cross-wind parts annihilate and what survives is progress along the forbidden axis.
//   THE VORTEX  doubling never lands on 3, 6 or 9 — the orbit is [1,2,4,8,7,5] (`doubling_circuit`), six cases because
//               2^6 = 1 mod 9 closes the walk. The mirror reaches them, and the mirror
//               is an INVOLUTION: applied twice it is the identity, so it separates nothing on its own.
//   ISOTOPES    deuterium cannot be filtered from hydrogen — they are the same element and no sieve sees the
//               difference. The industrial route is a reversible exchange run at two temperatures, where the
//               preference REVERSES between them. One pass moves nothing; cycling enriches.
//
// The common form is an involution plus an asymmetry between applications. An involution alone is barren: f(f(x))
// = x means the second application undoes the first, which is exactly why a single reversible step cannot
// separate. Progress comes from applying it under two different conditions, so the two passes do not cancel.
//
// WHAT THIS MODULE DOES AND DOES NOT ASSERT. It computes the STRUCTURE: whether a map involutes, whether two
// applications actually differ, and what a cascade of such steps accumulates. It does NOT assert any physical
// separation factor. That number belongs to a measurement I have not read, and this ledger's failure mode today
// was asserting from recall what a source would have corrected — so the factor is a PARAMETER here, awaiting its
// witness. The arithmetic is exact: cascades run in BigInt rationals
// compounded fifty times is where rounding silently invents an answer.
import { toUuid } from './address.js'

/** f is an involution on `domain` when applying it twice returns every element unchanged. */
export function involutes<T>(f: (x: T) => T, domain: readonly T[], eq: (a: T, b: T) => boolean = (a, b) => a === b): boolean {
  return domain.every((x) => eq(f(f(x)), x))
}

/** The barrenness of a lone involution, stated as a check rather than a claim: a single application returns the
 *  domain to itself as a SET, so nothing has been separated — only relabelled. */
export function separatesNothingAlone<T>(f: (x: T) => T, domain: readonly T[], key: (x: T) => string = String): boolean {
  const before = new Set(domain.map(key))
  const after = new Set(domain.map((x) => key(f(x))))
  return before.size === after.size && [...before].every((k) => after.has(k))
}

/** Two applications are ASYMMETRIC when they disagree somewhere — the condition that makes alternation productive.
 *  Returns the witnesses, so a caller can see WHERE they differ rather than being told that they do. */
export function asymmetry<T>(a: (x: T) => T, b: (x: T) => T, domain: readonly T[], key: (x: T) => string = String): T[] {
  return domain.filter((x) => key(a(x)) !== key(b(x)))
}

export interface Ratio { num: bigint; den: bigint }

/** One enrichment stage multiplies the ratio by the separation factor. Exact rationals throughout: a factor
 *  compounded over many stages is precisely where floating point starts inventing digits. */
export const enrich = (r: Ratio, factor: Ratio): Ratio => ({ num: r.num * factor.num, den: r.den * factor.den })

/** Run a cascade of `stages` identical steps from a starting ratio. */
export function cascade(start: Ratio, factor: Ratio, stages: number): Ratio {
  let r = start
  for (let i = 0; i < stages; i++) r = enrich(r, factor)
  return r
}

/** How many stages are needed to reach `target`, and the bracket that proves it — the last stage that falls short
 *  and the first that clears. No logarithm is taken: `Math.*` settles no theorem and is rejected tree-wide, so the
 *  count is found by climbing, and the two comparisons ARE the proof. Returns null if the factor cannot climb. */
export function stagesToReach(start: Ratio, factor: Ratio, target: Ratio, cap = 4096): { stages: number; below: Ratio; above: Ratio } | null {
  if (factor.num <= factor.den) return null // a factor at or below 1 never enriches; say so rather than loop
  let r = start
  for (let n = 0; n < cap; n++) {
    const next = enrich(r, factor)
    // cross-multiplied comparison: r < target <= next, with no division anywhere
    if (r.num * target.den < target.num * r.den && next.num * target.den >= target.num * next.den) {
      return { stages: n + 1, below: r, above: next }
    }
    r = next
  }
  return null
}

/** the content address of a cascade's outcome, so a stranger recomputes the same enrichment from the same inputs */
export const cascadeAddress = (start: Ratio, factor: Ratio, stages: number): string => {
  const out = cascade(start, factor, stages)
  return toUuid(`separation:${start.num}/${start.den}:${factor.num}/${factor.den}:${stages}:${out.num}/${out.den}`)
}

// ── the three instances, as data rather than prose ────────────────────────────────────────────────────────────

/** THE VORTEX. dz(x) = 10 - x, fixing the void. An involution on the ten digits — hence barren alone, and hence
 *  why the triangle is reached by ALTERNATING it with doubling rather than by either map on its own. */
export const dz = (x: number): number => (x === 0 ? 0 : 10 - x)
export const doubling = (x: number): number => (x * 2) % 9
export const DIGITS: readonly number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/** THE TACK. Port and starboard as signed cross-wind displacement: each is its own inverse under negation, the
 *  pair sums to zero (`tacking_cancels_leeway`), and the forward component is what accumulates. */
export const tack = (leeway: number): number => -leeway

/** Reachability by alternation: which points does repeatedly applying a THEN b reach, starting from `seed`? This
 *  is the computational content of the doctrine — the set alternation reaches, versus the set either map reaches
 *  alone. */
export function reach(seed: number, a: (x: number) => number, b: (x: number) => number, steps: number): number[] {
  const seen = new Set<number>([seed])
  let x = seed
  for (let i = 0; i < steps; i++) {
    x = i % 2 === 0 ? a(x) : b(x)
    seen.add(x)
  }
  return [...seen].sort((p, q) => p - q)
}

// ── THE OTHER ASPECTS ─────────────────────────────────────────────────────────────────────────────────────────
//
// Reachability is only the first question. Four more decide whether an alternation is usable, and each is already
// present in the ledger under another name.

/** ORDER. a-then-b need not equal b-then-a, and where they differ is the COMMUTATOR — which the sequence wing
 *  already seals: `commutator_is_shift` proves that doubling composed with the mirror, both ways round, is the
 *  unit shift x -> x+1. So the order of a tack is not cosmetic: reversing it displaces you by exactly one step.
 *  Returns the points where the two orders disagree. */
export function orderMatters<T>(a: (x: T) => T, b: (x: T) => T, domain: readonly T[], key: (x: T) => string = String): T[] {
  return domain.filter((x) => key(a(b(x))) !== key(b(a(x))))
}

/** FIXED POINTS — where separation FAILS. A point held still by both maps can never be moved by alternating them,
 *  however many stages you run. In the vortex these are exactly the digits that formed no pyramid: the mirror
 *  fixes 5 (`mirror_fixed_five`), and 0 with 9 are one residue. A cascade cannot enrich what it cannot move. */
export function stuck<T>(a: (x: T) => T, b: (x: T) => T, domain: readonly T[], key: (x: T) => string = String): T[] {
  return domain.filter((x) => key(a(x)) === key(x) && key(b(x)) === key(x))
}

/** PERIOD — after how many alternations the walk returns to where it began. A closed cycle bounds the work: the
 *  doubling orbit closes after six because 2^6 = 1 mod 9, which is why six cases decide an infinite claim. Returns
 *  0 when the walk does not close within `cap`. */
export function period(seed: number, a: (x: number) => number, b: (x: number) => number, cap = 512): number {
  let x = seed
  for (let i = 0; i < cap; i++) {
    x = i % 2 === 0 ? a(x) : b(x)
    if (x === seed && i % 2 === 1) return i + 1
  }
  return 0
}

/** COST. Nothing here is free, and the ledger states the rate: `beating_distance_penalty : 5 > 3` — you sail five
 *  through the water to make good three to windward. Every alternation pays the same shape of tax, so the honest
 *  report is a RATIO of work spent to progress made, held as an exact fraction and never divided. */
export interface Cost { spent: bigint; gained: bigint }
export const costOf = (spent: bigint, gained: bigint): Cost => ({ spent, gained })

/** Is the price no worse than a declared bound? Cross-multiplied, so no division is taken: spent/gained <= n/d. */
export const withinPrice = (c: Cost, n: bigint, d: bigint): boolean => c.spent * d <= n * c.gained

/** REVERSIBILITY is where the cost actually enters, and the ledger has already sealed the reason:
 *  `reversible_erases_nothing`, beside the Landauer bound. A pure involution is reversible and therefore free, and
 *  free is exactly why it separates nothing. The asymmetry that makes alternation productive is the irreversible
 *  step, and that is where the bill is paid. So this is not an analogy between sailing and thermodynamics — it is
 *  the same accounting: no separation without an irreversible difference between the two passes. */
export const isReversible = <T>(f: (x: T) => T, domain: readonly T[], key: (x: T) => string = String): boolean =>
  new Set(domain.map((x) => key(f(x)))).size === new Set(domain.map(key)).size

// ── THE SINGULARITY FOLD — every vector folded at once, through the involution, to one core ─────────────────────
// The involution reflects; the fold collapses. Applied to a SET rather than to one input, they compose into a
// single address that every member reaches simultaneously: fold in all vectors at once and the result is one core,
// independent of the order they arrived in. That order-independence is the whole point — a set of referrers is a
// SUPERPOSITION, not a sequence, and a core that depended on arrival order would be reading history rather than
// membership.
//
// WHY THE REFLECTION BEFORE THE FOLD. dz is a bijection (Phase.lean: dz_loses_nothing), so reflecting first
// destroys nothing and the core remains a function of exactly the same information. Applying it TWICE returns every
// vector to itself, so the core of the twice-reflected set is the core of the original — the fold inherits the
// involution's own self-inverse property, which is what makes the singularity a mirror rather than a drain.
//
// integrity. The core proves WHICH set folded to it and nothing about what the members
// mean. Two different sets can share a core only by collision, and the address layer's bound governs that.
import { toUuid as _toUuidForFold } from './address.js'
import { merkleGravity as _foldForCore } from './gravity/index.js'

export interface Singularity {
  vectors: readonly string[]  // the inputs, as given
  seeds: number[]             // each vector's residue, before reflection
  reflected: number[]         // each seed's mirror under dz — the involution applied to all at once
  core: string                // the order-invariant fold of the reflected set: the singularity
  fixed: number[]             // the vectors the reflection does not move (seeds 0 and 5)
  honest: string
}

/** singularity(vectors) → fold every vector through the involution, all at once, to one core address. */
export function singularity(vectors: readonly string[]): Singularity {
  const seeds = vectors.map((v) => { const s = Number('0x' + _toUuidForFold(v).slice(0, 8)) % 10; return s })
  const reflected = seeds.map(dz)
  return {
    vectors, seeds, reflected,
    // fold the REFLECTED members — order-invariant by merkleGravity, so a superposition and not a sequence
    core: _foldForCore(vectors.map((v, i) => _toUuidForFold(reflected[i] + ':' + v))),
    fixed: seeds.filter((s) => dz(s) === s),
    honest:
      'Every vector reflected and folded at once into one core. The fold is ORDER-INVARIANT, so the core reads ' +
      'membership rather than arrival order — a set of referrers is a superposition. The reflection ' +
      'is a bijection, so nothing is lost before the fold, and applying it twice returns every vector to itself. ' +
      'integrity— the core proves WHICH set folded to it.',
  }
}
