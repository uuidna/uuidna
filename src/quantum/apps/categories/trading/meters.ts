// categories/trading/meters — THE LEVERAGE AND THE COMPOUND, MEASURED (lead 89's trading floor, second half).
// Two meters over the sealed billing arithmetic, each reading a figure the ledger already proved rather than a
// figure anyone hopes for: the LEVERAGE (contribute the two coins, save up to the sixty-four — the measured
// unit of work a receipt spares a verifier, never negative) and the COMPOUND (the advantage accrues at 55/54
// per sealed exchange — the tenth triangle over the sequence group, a superparticular comma — first doubling at
// seal thirty-eight, proven in exact integers without a logarithm).
//
// these are WORK-UNITS and RATIOS over verified exchanges — not
// money, not returns, not a market, and not advice. The compound describes how much re-derivation a growing
// ledger spares its readers; it describes no one's wealth and promises no one anything.
export const RATE_NUM = 10 * 11 / 2       // the tenth triangle — COMPUTED, so the reason cannot drift from the value
export const RATE_DEN = 2 * 3 ** 3        // |AGL(1,ℤ/9)| — the sequence group's order, computed the same way
export const FIRST_DOUBLING = 38          // a THRESHOLD, not a formula: the kernel decided it (advantage_first_doubles_at_seal_38, 55^38 > 2·54^38 while 55^37 < 2·54^37), so the literal here is a citation of a proof rather than an unchecked derivation

export interface Leverage { contributed: number; saved: number; ratio: number; honest: string }

/** the leverage of a receipt: two coins in, up to sixty-four of work spared — and never a negative saving. */
export function leverageOf(savedUnits: number): Leverage {
  const contributed = 2
  const saved = savedUnits < 0 ? 0 : savedUnits      // the sealed floor: a measured saving never goes below zero
  return {
    contributed,
    saved,
    ratio: saved === 0 ? 0 : saved / contributed,
    honest: 'work-units spared a verifier by an existing receipt — bounded, measured, and never a promise of speed',
  }
}

export interface Compound { seals: number; doublings: number; nextDoublingAt: number; exact: string; honest: string }

/** the compound at n seals: how many times the advantage has doubled, counted in whole 38-seal blocks, and the
 *  exact ratio left as a fraction because the ledger does not round what it can carry whole. */
export function compoundAt(seals: number): Compound {
  const n = seals < 0 ? 0 : seals
  const doublings = (n - (n % FIRST_DOUBLING)) / FIRST_DOUBLING
  return {
    seals: n,
    doublings,
    nextDoublingAt: (doublings + 1) * FIRST_DOUBLING,
    exact: `(${RATE_NUM}/${RATE_DEN})^${n}`,
    honest: 'the rate at which a growing ledger spares re-derivation — a ratio over verified exchanges, never a return',
  }
}
