import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DESIGNTHEORY — BLOCK DESIGNS AS ARITHMETIC. A balanced incomplete block design (BIBD) is numbers by the book
 *  (van Lint & Wilson, A Course in Combinatorics): the two flag counts v·r and b·k that a 2-design equates, the
 *  identity r(k−1) = λ(v−1), the replication and block counts derived from the parameters, Fisher's inequality b ≥ v,
 *  Steiner triple incidences, the v points and the ½v(v−1) pairs they form, and the point/line counts of the finite
 *  projective plane PG(2,n) and affine plane AG(2,n). Deterministic exact-integer identities, standard combinatorics.
 *  Crosses to `combinatorics`. A measure, not advice. */

const PROOF = 'Block-design arithmetic by the book (van Lint & Wilson): the flag counts vr and bk a 2-design equates, r(k−1)=λ(v−1), replication r=⌊λ(v−1)/(k−1)⌋ and block count b=⌊λv(v−1)/(k(k−1))⌋, r=⌊bk/v⌋, blocks=⌊vr/k⌋, Fisher b≥v, Steiner triples ⌊v(v−1)/6⌋, v points and ½v(v−1) pairs, PG(2,n) order n²+n+1 and line order n+1, AG(2,n) points n² and lines n²+n; deterministic exact-integer identities crossed to combinatorics; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const d = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'designtheory', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `designtheory.${name}`, params })

export class DesignTheoryFormulas {
  /** INCIDENCES — point-flag count of a design: each of v points lies in r blocks. value v · r. */
  static incidences(v: number, r: number): CrossFormula { return d('designtheory-incidences', 'incidences(v, r) = v · r (point flags)', v * r, nat(v, r), 'incidences', [v, r]) }
  /** BLOCKSIZES — block-flag count of a design: each of b blocks holds k points. value b · k. */
  static blocksizes(b: number, k: number): CrossFormula { return d('designtheory-blocksizes', 'blocksizes(b, k) = b · k (block flags)', b * k, nat(b, k), 'blocksizes', [b, k]) }
  /** LAMBDACHECK — the left side of the 2-design identity r(k−1) = λ(v−1), the pairs through a point. value r · (k − 1). */
  static lambdacheck(v: number, r: number, k: number): CrossFormula { return d('designtheory-lambdacheck', 'lambdacheck(v, r, k) = r · (k − 1) [= λ(v − 1)]', r * (k - 1), nat(v, r, k) && k >= 1, 'lambdacheck', [v, r, k]) }
  /** REPLICATION — the replication number r from the design identity r(k−1)=λ(v−1). value ⌊λ(v−1)/(k−1)⌋; holds k > 1. */
  static replication(lambda: number, v: number, k: number): CrossFormula { return d('designtheory-replication', 'replication(λ, v, k) = ⌊λ(v − 1) / (k − 1)⌋', k > 1 ? Math.floor((lambda * (v - 1)) / (k - 1)) : 0, nat(lambda, v, k) && k > 1, 'replication', [lambda, v, k]) }
  /** BLOCKS — the block count from the flag identity vr = bk. value ⌊v·r / k⌋; holds k > 0. */
  static blocks(v: number, r: number, k: number): CrossFormula { return d('designtheory-blocks', 'blocks(v, r, k) = ⌊v · r / k⌋', k > 0 ? Math.floor((v * r) / k) : 0, nat(v, r, k) && k > 0, 'blocks', [v, r, k]) }
  /** FISHER — Fisher's inequality: a 2-design has at least as many blocks as points. value [b ≥ v]. */
  static fisher(b: number, v: number): CrossFormula { return d('designtheory-fisher', "fisher(b, v) = [b ≥ v] (Fisher's inequality, 1 holds)", b >= v ? 1 : 0, nat(b, v), 'fisher', [b, v]) }
  /** STEINERTRIPLES — triples in a Steiner triple system on v points: each covers one of the ½v(v−1) pairs, three per triple. value ⌊v(v−1)/6⌋. */
  static steinertriples(v: number): CrossFormula { return d('designtheory-steinertriples', 'steinertriples(v) = ⌊v(v − 1) / 6⌋', Math.floor((v * (v - 1)) / 6), nat(v), 'steinertriples', [v]) }
  /** POINTS — the point count of a design, the ground set. value v. */
  static points(v: number): CrossFormula { return d('designtheory-points', 'points(v) = v', v, nat(v), 'points', [v]) }
  /** PAIRS — the unordered pairs of v points, the 2-subsets a design balances. value v(v−1)/2. */
  static pairs(v: number): CrossFormula { return d('designtheory-pairs', 'pairs(v) = v(v − 1) / 2', (v * (v - 1)) / 2, nat(v), 'pairs', [v]) }
  /** PROJECTIVEORDER — points (and lines) of the projective plane PG(2,n) of order n. value n² + n + 1. */
  static projectiveorder(n: number): CrossFormula { return d('designtheory-projectiveorder', 'projectiveorder(n) = n² + n + 1 (points of PG(2,n))', n * n + n + 1, nat(n), 'projectiveorder', [n]) }
  /** REPLICATIONS — the replication number r from the flag identity bk = vr. value ⌊b·k / v⌋; holds v > 0. */
  static replications(b: number, k: number, v: number): CrossFormula { return d('designtheory-replications', 'replications(b, k, v) = ⌊b · k / v⌋', v > 0 ? Math.floor((b * k) / v) : 0, nat(b, k, v) && v > 0, 'replications', [b, k, v]) }
  /** BLOCKCOUNT — the block count b of a 2-design from its parameters, b = λv(v−1)/(k(k−1)). value ⌊λv(v−1)/(k(k−1))⌋; holds k > 1. */
  static blockcount(lambda: number, v: number, k: number): CrossFormula { return d('designtheory-blockcount', 'blockcount(λ, v, k) = ⌊λv(v − 1) / (k(k − 1))⌋', k > 1 ? Math.floor((lambda * v * (v - 1)) / (k * (k - 1))) : 0, nat(lambda, v, k) && k > 1, 'blockcount', [lambda, v, k]) }
  /** LINEORDER — points on a line of PG(2,n) (equivalently lines through a point), n + 1. value n + 1. */
  static lineorder(n: number): CrossFormula { return d('designtheory-lineorder', 'lineorder(n) = n + 1 (points per line of PG(2,n))', n + 1, nat(n), 'lineorder', [n]) }
  /** AFFINEPOINTS — points of the affine plane AG(2,n) of order n. value n². */
  static affinepoints(n: number): CrossFormula { return d('designtheory-affinepoints', 'affinepoints(n) = n² (points of AG(2,n))', n * n, nat(n), 'affinepoints', [n]) }
  /** AFFINELINES — lines of the affine plane AG(2,n) of order n, n(n+1) = n² + n. value n² + n. */
  static affinelines(n: number): CrossFormula { return d('designtheory-affinelines', 'affinelines(n) = n² + n (lines of AG(2,n))', n * n + n, nat(n), 'affinelines', [n]) }
}

for (const name of ['affinelines', 'affinepoints', 'blockcount', 'blocks', 'blocksizes', 'fisher', 'incidences', 'lambdacheck', 'lineorder', 'pairs', 'points', 'projectiveorder', 'replication', 'replications', 'steinertriples'] as const)
  hexRegisterOf('designtheory', name, (DesignTheoryFormulas[name] as (...x: unknown[]) => unknown).bind(DesignTheoryFormulas))
