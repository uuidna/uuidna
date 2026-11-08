import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RAMSEY — RAMSEY THEORY AND STANDARD COMBINATORICS, AS ARITHMETIC. The textbook statement that complete order is
 *  unavoidable: small exact Ramsey numbers R(s,t) (R(3,3)=6, R(3,4)=9, R(3,5)=14, R(4,4)=18), the friends-and-strangers
 *  party size, the diagonal lower-bound marker 2^k, the Erdős–Szekeres upper bound R(s,t) ≤ C(s+t−2,s−1), the pigeonhole
 *  count, the monochromatic class size, the edges of a complete graph K_n, binomial coefficients, Schur's number S(3)=13
 *  and the van der Waerden number W(2,3)=9. Deterministic integer identities from standard combinatorics textbooks
 *  (van der Waerden / Graham). Crosses to `combinatorics`. A measure, not advice. */

const PROOF = 'Ramsey theory and standard combinatorics by the book (exact small Ramsey numbers R(3,3)=6, R(3,4)=9, R(3,5)=14, R(4,4)=18, R(2,n)=n; the party size; the 2^k diagonal lower-bound marker; the Erdős–Szekeres bound R(s,t) ≤ C(s+t−2,s−1); pigeonhole ⌈items/holes⌉; monochromatic class ⌊edges/colors⌋; edges of K_n = n(n−1)/2; binomial C(n,k); Schur S(3)=13; van der Waerden W(2,3)=9); deterministic integer identities crossed to combinatorics; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const choose = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0
  let r = 1
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1)
  return r
}
const r = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ramsey', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `ramsey.${name}`, params })

export class RamseyFormulas {
  /** R22 — the trivial Ramsey number R(2,n) = n (a red edge or an all-blue K_n). value n. */
  static r22(n: number): CrossFormula { return r('ramsey-r22', 'r22(n) = R(2,n) = n', n, nat(n), 'r22', [n]) }
  /** R33 — the exact Ramsey number R(3,3) = 6 (the friends-and-strangers theorem). value 6. */
  static r33(): CrossFormula { return r('ramsey-r33', 'r33() = R(3,3) = 6', 6, true, 'r33', []) }
  /** R34 — the exact Ramsey number R(3,4) = 9. value 9. */
  static r34(): CrossFormula { return r('ramsey-r34', 'r34() = R(3,4) = 9', 9, true, 'r34', []) }
  /** R35 — the exact Ramsey number R(3,5) = 14. value 14. */
  static r35(): CrossFormula { return r('ramsey-r35', 'r35() = R(3,5) = 14', 14, true, 'r35', []) }
  /** R44 — the exact Ramsey number R(4,4) = 18. value 18. */
  static r44(): CrossFormula { return r('ramsey-r44', 'r44() = R(4,4) = 18', 18, true, 'r44', []) }
  /** PARTY — the friends-and-strangers party size needed to force a monochromatic triangle, as a function of n. value n. */
  static party(n: number): CrossFormula { return r('ramsey-party', 'party(n) = n (party size)', n, nat(n), 'party', [n]) }
  /** THRESHOLD — a crude Ramsey diagonal marker, the sum of the two targets R(r,s) ~ r+s. value r + s. */
  static threshold(x: number, s: number): CrossFormula { return r('ramsey-threshold', 'threshold(r, s) = r + s (crude diagonal marker)', x + s, nat(x, s), 'threshold', [x, s]) }
  /** DIAGONALBOUND — the 2^k diagonal lower-bound marker for R(k+1,k+1). value 2^k; holds 0 ≤ k ≤ 30. */
  static diagonalbound(k: number): CrossFormula { return r('ramsey-diagonalbound', 'diagonalbound(k) = 2^k (diagonal lower-bound marker)', 2 ** k, nat(k) && k <= 30, 'diagonalbound', [k]) }
  /** ESZBOUND — the Erdős–Szekeres upper bound R(s,t) ≤ C(s+t−2, s−1). value C(s+t−2, s−1); holds s ≥ 1, t ≥ 1, s+t−2 ≤ 30. */
  static eszbound(s: number, t: number): CrossFormula { return r('ramsey-eszbound', 'eszbound(s, t) = C(s+t−2, s−1) (Erdős–Szekeres bound)', choose(s + t - 2, s - 1), nat(s, t) && s >= 1 && t >= 1 && s + t - 2 <= 30, 'eszbound', [s, t]) }
  /** ERDOS — the edges of the complete graph K_n (the handshake number). value n(n−1)/2. */
  static erdos(n: number): CrossFormula { return r('ramsey-erdos', 'erdos(n) = n(n−1)/2 (edges of K_n)', (n * (n - 1)) / 2, nat(n), 'erdos', [n]) }
  /** BINOM — the binomial coefficient C(n,k), ways to choose k of n. value C(n,k); holds 0 ≤ k ≤ n ≤ 30. */
  static binom(n: number, k: number): CrossFormula { return r('ramsey-binom', 'binom(n, k) = C(n, k)', choose(n, k), nat(n, k) && k <= n && n <= 30, 'binom', [n, k]) }
  /** PIGEON — the pigeonhole bound: the fullest hole holds at least ⌈items/holes⌉. value ⌈items/holes⌉; holds holes > 0. */
  static pigeon(items: number, holes: number): CrossFormula { return r('ramsey-pigeon', 'pigeon(items, holes) = ⌈items / holes⌉', holes > 0 ? Math.ceil(items / holes) : 0, nat(items, holes) && holes > 0, 'pigeon', [items, holes]) }
  /** MONOCHROMATIC — the guaranteed monochromatic class size when edges take colors. value ⌊edges/colors⌋; holds colors > 0. */
  static monochromatic(edges: number, colors: number): CrossFormula { return r('ramsey-monochromatic', 'monochromatic(edges, colors) = ⌊edges / colors⌋', colors > 0 ? Math.floor(edges / colors) : 0, nat(edges, colors) && colors > 0, 'monochromatic', [edges, colors]) }
  /** SCHUR3 — Schur's number S(3) = 13 (largest n with {1..n} split into 3 sum-free sets). value 13. */
  static schur3(): CrossFormula { return r('ramsey-schur3', 'schur3() = S(3) = 13', 13, true, 'schur3', []) }
  /** VDW23 — the van der Waerden number W(2,3) = 9 (forces a monochromatic 3-term AP in any 2-coloring). value 9. */
  static vdw23(): CrossFormula { return r('ramsey-vdw23', 'vdw23() = W(2,3) = 9', 9, true, 'vdw23', []) }
}

for (const name of ['binom', 'diagonalbound', 'erdos', 'eszbound', 'monochromatic', 'party', 'pigeon', 'r22', 'r33', 'r34', 'r35', 'r44', 'schur3', 'threshold', 'vdw23'] as const)
  hexRegisterOf('ramsey', name, (RamseyFormulas[name] as (...x: unknown[]) => unknown).bind(RamseyFormulas))
