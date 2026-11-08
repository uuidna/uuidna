import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PARTITION — INTEGER PARTITIONS, BY THE BOOK. The ways of writing n as an unordered sum of positive parts, as exact
 *  arithmetic: the partition numbers p(0..10), the side and cells of the Durfee square, the staircase (triangular) sum of
 *  distinct parts, the generalized pentagonal numbers of Euler's theorem, the most distinct parts a budget allows, the cells
 *  of a Ferrers diagram and the conjugate (transpose) that preserves them, the closed counts p(n,1)/p(n,2) and partitions
 *  into at most two parts, the corner-cell hook length, Dyson's rank, the odd part-sizes that Euler pairs with distinct
 *  parts, and the principal hook of a self-conjugate square. Deterministic integer identities from standard combinatorics
 *  (Concrete Mathematics, Andrews, The Theory of Partitions). Crosses to `combinatorics`. A measure, not advice. */

const P = [1, 1, 2, 3, 5, 7, 11, 15, 22, 30, 42] // p(0..10), the partition numbers (Andrews)
const PROOF = 'Integer partitions by the book (p(0..10) table, Durfee square side ⌊√n⌋ and its d² cells, the triangular staircase n(n+1)/2 as the least sum of distinct parts, the generalized pentagonal numbers n(3n-1)/2, the most distinct parts within n, Ferrers rectangle cells and conjugation preserving them, the closed counts p(n,1)=1 and p(n,2)=⌊n/2⌋ and at-most-two = ⌊n/2⌋+1, the corner hook rows+cols-1, Dyson rank largest-parts, ⌈n/2⌉ odd part-sizes, the principal hook 2d-1 of a self-conjugate square); deterministic integer identities crossed to combinatorics; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const g = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'partition', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `partition.${name}`, params })

export class PartitionFormulas {
  /** P — the partition number p(n), the ways to write n as an unordered sum of positive parts. value P[n]; holds 0 ≤ n ≤ 10. */
  static p(n: number): CrossFormula { return g('partition-p', 'p(n) = P[n] (partition numbers p(0..10))', nat(n) && n <= 10 ? P[n] : 0, nat(n) && n <= 10, 'p', [n]) }
  /** DURFEE — the side of the Durfee square, the largest d whose d×d block fits in the Ferrers diagram. value ⌊√n⌋. */
  static durfee(n: number): CrossFormula { return g('partition-durfee', 'durfee(n) = ⌊√n⌋ (Durfee square side)', Math.floor(Math.sqrt(n)), nat(n), 'durfee', [n]) }
  /** DURFEECELLS — the cells of the Durfee square of side d. value d². */
  static durfeecells(d: number): CrossFormula { return g('partition-durfeecells', 'durfeecells(d) = d² (Durfee square cells)', d * d, nat(d), 'durfeecells', [d]) }
  /** TRIANGULAR — the staircase partition 1+2+⋯+n, the least sum of n distinct positive parts. value n(n+1)/2. */
  static triangular(n: number): CrossFormula { return g('partition-triangular', 'triangular(n) = n(n+1)/2 (least sum of n distinct parts)', (n * (n + 1)) / 2, nat(n), 'triangular', [n]) }
  /** PENTAGONAL — the generalized pentagonal number (Euler's pentagonal number theorem exponent). value n(3n-1)/2. */
  static pentagonal(n: number): CrossFormula { return g('partition-pentagonal', 'pentagonal(n) = n(3n-1)/2 (generalized pentagonal number)', (n * (3 * n - 1)) / 2, nat(n), 'pentagonal', [n]) }
  /** DISTINCTMAX — the most distinct positive parts summing to at most n, the largest k with k(k+1)/2 ≤ n. value ⌊(√(8n+1)-1)/2⌋. */
  static distinctmax(n: number): CrossFormula { return g('partition-distinctmax', 'distinctmax(n) = ⌊(√(8n+1)-1)/2⌋ (most distinct parts within n)', Math.floor((Math.sqrt(8 * n + 1) - 1) / 2), nat(n), 'distinctmax', [n]) }
  /** FERRERS — the cells of a rectangular Ferrers diagram, rows of equal length. value rows · cols. */
  static ferrers(rows: number, cols: number): CrossFormula { return g('partition-ferrers', 'ferrers(rows, cols) = rows · cols (Ferrers rectangle cells)', rows * cols, nat(rows, cols), 'ferrers', [rows, cols]) }
  /** CONJUGATECELLS — conjugation (transpose of the Ferrers diagram) preserves the total cell count. value n. */
  static conjugatecells(n: number): CrossFormula { return g('partition-conjugatecells', 'conjugatecells(n) = n (conjugation preserves cells)', n, nat(n), 'conjugatecells', [n]) }
  /** EXACTONE — the single partition of n into exactly one part, p(n,1). value 1; holds n ≥ 1. */
  static exactone(n: number): CrossFormula { return g('partition-exactone', 'exactone(n) = 1 (p(n,1), the partition n = n)', 1, nat(n) && n >= 1, 'exactone', [n]) }
  /** EXACTTWO — partitions of n into exactly two positive parts, p(n,2). value ⌊n/2⌋; holds n ≥ 2. */
  static exacttwo(n: number): CrossFormula { return g('partition-exacttwo', 'exacttwo(n) = ⌊n/2⌋ (p(n,2))', Math.floor(n / 2), nat(n) && n >= 2, 'exacttwo', [n]) }
  /** ATMOSTTWO — partitions of n into at most two parts (equivalently into parts ≤ 2). value ⌊n/2⌋ + 1. */
  static atmosttwo(n: number): CrossFormula { return g('partition-atmosttwo', 'atmosttwo(n) = ⌊n/2⌋ + 1 (at most two parts)', Math.floor(n / 2) + 1, nat(n), 'atmosttwo', [n]) }
  /** HOOK — the hook length of the corner cell of a rows×cols diagram, arm + leg + 1. value rows + cols - 1; holds rows,cols ≥ 1. */
  static hook(rows: number, cols: number): CrossFormula { return g('partition-hook', 'hook(rows, cols) = rows + cols - 1 (corner-cell hook length)', rows + cols - 1, nat(rows, cols) && rows >= 1 && cols >= 1, 'hook', [rows, cols]) }
  /** RANK — Dyson's rank of a partition, the largest part minus the number of parts. value largest - parts; holds largest ≥ parts. */
  static rank(largest: number, parts: number): CrossFormula { return g('partition-rank', 'rank(largest, parts) = largest - parts (Dyson rank)', largest - parts, nat(largest, parts) && largest >= parts, 'rank', [largest, parts]) }
  /** ODDAVAILABLE — the odd part-sizes in 1..n that Euler's theorem pairs with distinct parts. value ⌈n/2⌉. */
  static oddavailable(n: number): CrossFormula { return g('partition-oddavailable', 'oddavailable(n) = ⌈n/2⌉ (odd part-sizes in 1..n)', Math.ceil(n / 2), nat(n), 'oddavailable', [n]) }
  /** SELFCONJUGATEHOOK — the principal (main-diagonal) hook of a self-conjugate d×d square, an odd number. value 2d - 1; holds d ≥ 1. */
  static selfconjugatehook(d: number): CrossFormula { return g('partition-selfconjugatehook', 'selfconjugatehook(d) = 2d - 1 (principal hook of a self-conjugate square)', 2 * d - 1, nat(d) && d >= 1, 'selfconjugatehook', [d]) }
}

for (const name of ['atmosttwo', 'conjugatecells', 'distinctmax', 'durfee', 'durfeecells', 'exactone', 'exacttwo', 'ferrers', 'hook', 'oddavailable', 'p', 'pentagonal', 'rank', 'selfconjugatehook', 'triangular'] as const)
  hexRegisterOf('partition', name, (PartitionFormulas[name] as (...x: unknown[]) => unknown).bind(PartitionFormulas))
