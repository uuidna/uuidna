import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COMBINATORICS — COUNTING, AS ARITHMETIC. The ways to arrange and choose are exact integers: n factorial, the ordered
 *  pick (permutations), the unordered pick (combinations), identical items into boxes (stars and bars), the fixed-point-free
 *  arrangements (derangements), the Catalan numbers, the multiset pick (multichoose), and the size of a power set (binomial
 *  sum). Crosses to `statistics` — counting is what probability divides by. A measure. */

const PROOF = 'combinatorics arithmetic (factorial, permutations, combinations, stars and bars, derangements, catalan, multichoose, power-set); exact finite integers by the multiplicative method; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'combinatorics', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `combinatorics.${name}`, params })

/** n! as an exact product (1 for n = 0). */
const fact = (n: number): number => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r }
/** C(n, k) by the multiplicative method (shorter side); 0 when k is out of range. */
const comb = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0
  const m = Math.min(k, Math.max(0, n - k))
  let r = 1
  for (let i = 1; i <= m; i++) r = (r * (n - m + i)) / i
  return r
}
/** P(n, k) = n·(n-1)···(n-k+1); 0 when k is out of range. */
const perm = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0
  let r = 1
  for (let i = 0; i < k; i++) r *= (n - i)
  return r
}
/** !n by the recurrence !n = n·!(n-1) + (-1)ⁿ, !0 = 1. */
const derange = (n: number): number => {
  let prev = 1
  if (n === 0) return 1
  for (let i = 1; i <= n; i++) prev = i * prev + (i % 2 === 0 ? 1 : -1)
  return Math.max(0, prev)
}

export class CombinatoricsFormulas {
  /** FACTORIAL: the orderings of n items. value n!. */
  static factorial(n: number): CrossFormula { return c('combinatorics-factorial', 'factorial(n) = n!', fact(n), nat(n), 'factorial', [n]) }
  /** PERMUTATIONS: the ordered picks of k from n. value n!/(n-k)!. */
  static permutations(n: number, k: number): CrossFormula { return c('combinatorics-permutations', 'permutations(n, k) = n·(n-1)···(n-k+1)', perm(n, k), nat(n, k) && k <= n, 'permutations', [n, k]) }
  /** COMBINATIONS: the unordered picks of k from n. value C(n, k). */
  static combinations(n: number, k: number): CrossFormula { return c('combinatorics-combinations', 'combinations(n, k) = C(n, k)', comb(n, k), nat(n, k) && k <= n, 'combinations', [n, k]) }
  /** STARS AND BARS: n identical items into k boxes. value C(n+k-1, k-1). */
  static stars(n: number, k: number): CrossFormula { return c('combinatorics-stars', 'stars(n, k) = C(n+k-1, k-1)', k > 0 ? comb(n + k - 1, k - 1) : 0, nat(n, k) && k > 0, 'stars', [n, k]) }
  /** DERANGEMENT: the fixed-point-free arrangements of n. value !n. */
  static derangement(n: number): CrossFormula { return c('combinatorics-derangement', 'derangement(n) = !n = n·!(n-1) + (-1)ⁿ', derange(n), nat(n), 'derangement', [n]) }
  /** CATALAN: the nth Catalan number. value C(2n, n)/(n+1). */
  static catalan(n: number): CrossFormula { return c('combinatorics-catalan', 'catalan(n) = C(2n, n)/(n+1)', n + 1 > 0 ? comb(2 * n, n) / (n + 1) : 0, nat(n), 'catalan', [n]) }
  /** MULTICHOOSE: the multisets of size k from n kinds. value C(n+k-1, k). */
  static multichoose(n: number, k: number): CrossFormula { return c('combinatorics-multichoose', 'multichoose(n, k) = C(n+k-1, k)', comb(n + k - 1, k), nat(n, k), 'multichoose', [n, k]) }
  /** BINOMIAL SUM: the subsets of an n-set. value Σ C(n, k) = 2ⁿ. */
  static binomial(n: number): CrossFormula { let v = 1; for (let i = 0; i < n; i++) v *= 2; return c('combinatorics-binomial', 'binomial(n) = Σ C(n, k) = 2ⁿ', v, nat(n), 'binomial', [n]) }
}

for (const name of ['binomial', 'catalan', 'combinations', 'derangement', 'factorial', 'multichoose', 'permutations', 'stars'] as const)
  hexRegisterOf('combinatorics', name, (CombinatoricsFormulas[name] as (...x: unknown[]) => unknown).bind(CombinatoricsFormulas))
