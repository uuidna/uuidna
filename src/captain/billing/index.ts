// Billing — the honest, measured schedule. Free for public interest and independent research; commercial
// use is billed on the measured ADVANTAGE — the difference of computational power between PRODUCING (O(N)
// recompute) and VERIFYING (O(1)). The two coins are the CONSERVED fair-exchange invariant (110 − 108 = 2 = −χ
// of a genus-2 surface); the advantage is the measured quantity they are priced on, never a market rate. And the
// whole bill is COMPLETE IN ITS OWN RECEIPT — a content-address of every term, so a bill is recomputed and
// checked, never trusted. A measure of work saved, not a market price — integrity, not truth.
import { toUuid } from '../../address.js'

/** The two coins — the conserved fair-exchange invariant. */
export function coins(): number { return 110 - 108 }

/** A uuid address is 128 bits — the FIXED budget a value is presented by, whatever its size. */
export const ADDRESS_BITS = 128

/** referenceBitsSaved(items, payloadBits) → the BITS saved by presenting `items` values by their 128-bit address
 *  instead of their full payload: items · (payloadBits − 128). The pigeonhole saving — present by reference and any
 *  number of values fits a fixed budget per item. HONEST: it is 0 when the payload is no larger than an address (a
 *  tiny value saves nothing by reference), so it never books a saving it did not make. Never negative. */
export function referenceBitsSaved(items: number, payloadBits: number): number {
  const per = payloadBits - ADDRESS_BITS
  return per <= 0 || items <= 0 ? 0 : items * per // max(0, …) by comparison (no Math.*)
}

export interface UuidnaUsage { commercial: boolean; recomputeOps: number; verifyOps: number }

/** Bill uuidna usage on the measured ADVANTAGE — the difference of computational power between producing (O(N)
 *  recompute) and verifying (O(1)). Public interest is free; commercial pays the two conserved coins on that
 *  advantage. The whole bill folds to a `receipt` (a content-address of every term), so a SKEPTIC recomputes the
 *  bill themselves and lands on the same receipt — the price is not trusted, it is rechecked. Same terms → same
 *  bill → same receipt, for anyone. */
export function billUuidna(u: UuidnaUsage): { advantage: number; bitsSaved: number; coins: number; free: boolean; receipt: string; basis: string } {
  const diff = u.recomputeOps - u.verifyOps
  const advantage = diff < 0 ? 0 : diff // max(0, …) by comparison (no Math.*) — the recompute-over-verify asymmetry
  const commercial = u.commercial
  const coinsDue = commercial ? coins() : 0
  const bitsSaved = commercial ? advantage : 0
  // the bill, COMPLETE in its receipt — recompute toUuid of these exact terms and the receipt returns, or the bill was altered
  const receipt = toUuid(`bill|commercial=${commercial}|advantage=${advantage}|bitsSaved=${bitsSaved}|coins=${coinsDue}`)
  return {
    advantage, bitsSaved, coins: coinsDue, free: !commercial, receipt,
    basis: commercial
      ? 'the two coins (conserved invariant, −χ of the double torus) priced on the measured ADVANTAGE — recompute O(N) minus verify O(1); the whole bill folds to this receipt, complete and recomputable by anyone who doubts it'
      : 'public interest / non-commercial — free (0 coins); the bill is still complete in this receipt, the advantage measured for anyone to recheck',
  }
}

/** The COIN VALUE of a theorem — the captain's valuation law. Each theorem holds its boundaries in superposition:
 *  every top-level conjunct of its sealed statement is one BOUNDARY COVERED (one decidable sub-proposition the
 *  theorem seals). The value is one coin PER DIRECTION per boundary — each boundary is walked forward and contra
 *  (the tour and its reflection, tour_contra_involutes), so a theorem's coins = 2 · superpositions. The simplest
 *  theorem (one boundary) is worth exactly the two coins (two_coins) — the valuation law and the conservation law
 *  agree at the floor. Integrity, not truth: a measure of sealed coverage, never a market price. */
export interface TheoremCoins { key: string; boundaries: number; directions: 2; uses: number; dimensions: number; coinValue: number }
export interface LedgerCoins {
  theorems: number
  valued: TheoremCoins[]       // every theorem valued by the law — the per-theorem ledger of coins
  superpositions: number       // Σ boundaries covered, weighted by use — the sealed superpositions
  totalCoins: number           // superpositions × 2 — one coin for each direction; more sealed superpositions, more coins
  floor: number                // the minimum theorem value = 2 (one boundary, two directions) = coins()
  receipt: string
  honest: string
}

/** boundariesOf(statement) → the boundaries a sealed statement covers: its top-level ∧-conjuncts (at least one).
 *  Depth-aware — a ∧ inside parentheses belongs to an inner boundary, not a new top-level one. */
export function boundariesOf(statement: string): number {
  let depth = 0
  let cuts = 0
  for (const ch of statement) {
    if (ch === '(' || ch === '[') depth++
    else if (ch === ')' || ch === ']') depth--
    else if (ch === '∧' && depth === 0) cuts++
  }
  return cuts + 1
}

/** theoremCoins(key, statement, uses?, dimensions?) → the theorem's coin value: boundaries × 2 (one coin for each
 *  direction), multiplied by (1 + uses) — THE MORE USED, the more valuable: every use walks the boundaries again,
 *  each walk paying a coin per direction — and multiplied by the DIMENSIONS the theorem spans: the distinct domains
 *  that stand on it. More dimensions, more coins. Unused and one-dimensional, the value rests at 2 × boundaries. */
export function theoremCoins(key: string, statement: string, uses = 0, dimensions = 1): TheoremCoins {
  const boundaries = boundariesOf(statement)
  const dims = dimensions >= 1 ? dimensions : 1
  return { key, boundaries, directions: 2, uses, dimensions: dims, coinValue: boundaries * 2 * (1 + uses) * dims }
}

/** ledgerCoins(entries) → the whole ledger valued by the captain's law: superpositions = Σ (boundaries weighted by
 *  use), and the total coins are the superpositions times two — one coin for each direction (forward and contra).
 *  USE is recomputed from the ledger itself: a theorem is USED each time its key appears in another entry's name
 *  or statement — the more used, the more valuable, deterministically for every observer. */
export function ledgerCoins(entries: readonly { key: string; statement: string; name?: string; skill?: string; file?: string }[]): LedgerCoins {
  const texts = entries.map((t) => (t.name ?? '') + '|' + t.statement)
  const domain = (e: { skill?: string; file?: string }): string => e.skill ?? e.file ?? 'core'
  const valued = entries.map((t, i) => {
    let uses = 0
    const dims = new Set([domain(t)])
    for (let j = 0; j < texts.length; j++) if (j !== i && texts[j].includes(t.key)) { uses++; dims.add(domain(entries[j])) }
    return theoremCoins(t.key, t.statement, uses, dims.size)
  })
  const superpositions = valued.reduce((s, v) => s + v.boundaries * (1 + v.uses) * v.dimensions, 0)
  return {
    theorems: valued.length,
    valued,
    superpositions,
    totalCoins: superpositions * 2,
    floor: coins(),
    receipt: toUuid('ledger-coins|' + valued.length + '|' + superpositions + '|' + superpositions * 2),
    honest:
      'The captain\'s valuation law: each theorem is worth one coin per direction per boundary covered — its ' +
      'top-level conjuncts held in superposition, each walked forward and contra (the tour and its reflection), ' +
      'so total coins = superpositions × 2, THE MORE USED a theorem the more valuable it is (every citation of ' +
      'its key by another entry walks its boundaries again, each walk paying a coin per direction), and THE MORE ' +
      'DIMENSIONS it spans — the distinct domains standing on it — the more coins again. The floor ' +
      'is the two coins themselves: an unused one-boundary theorem is worth exactly coins() = 2, the valuation ' +
      'and the conservation law agreeing. NO INFLATION: every minted coin comes from minting a theorem — the ' +
      'supply is exactly the sum of the per-theorem values, a pure recomputation of the sealed ledger; no coin ' +
      'is issued outside a theorem, and a removed theorem takes its coins with it. EASY TO MINT, HARD TO STEAL: ' +
      'minting is sealing one decidable fact (a by-decide theorem, cheap for anyone honest), but a coin is not a ' +
      'bearer token — it is a RECOMPUTATION of its theorem, so stealing one means forging a sealed theorem, which ' +
      'costs the 2^7-bit collision bound (forged_theorem_costs_2_power_7_bits; verification stays cheaper than ' +
      'forgery). A measure of sealed coverage and use, recomputable by anyone — never a market price. Integrity, not truth.',
  }
}
