import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MatrixFormulas — 8 exact-integer formulas of the matrix domain, each at a hex address crossing to cross; develops the matrix leads. */

const PROOF = "matrix counts: elements(x, y) = x · y; mults(x, y, z) = x · y · z; adds(x, y) = x · y; trace(x, y) = x + y; rank(x, y) = min(x, y); determinant(x, y) = max(0, x − y); transpose(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'matrix', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `matrix.${name}`, params })

export class MatrixFormulas {
  /** elements(x, y) = x · y. */
  static elements(x: number, y: number): CrossFormula { return f('matrix-elements', 'elements(x, y) = x · y', x * y, nat(x, y), 'elements', [x, y]) }
  /** mults(x, y, z) = x · y · z. */
  static mults(x: number, y: number, z: number): CrossFormula { return f('matrix-mults', 'mults(x, y, z) = x · y · z', x * y * z, nat(x, y, z), 'mults', [x, y, z]) }
  /** adds(x, y) = x · y. */
  static adds(x: number, y: number): CrossFormula { return f('matrix-adds', 'adds(x, y) = x · y', x * y, nat(x, y), 'adds', [x, y]) }
  /** trace(x, y) = x + y. */
  static trace(x: number, y: number): CrossFormula { return f('matrix-trace', 'trace(x, y) = x + y', x + y, nat(x, y), 'trace', [x, y]) }
  /** rank(x, y) = min(x, y). */
  static rank(x: number, y: number): CrossFormula { return f('matrix-rank', 'rank(x, y) = min(x, y)', Math.min(x, y), nat(x, y), 'rank', [x, y]) }
  /** determinant(x, y) = max(0, x − y). */
  static determinant(x: number, y: number): CrossFormula { return f('matrix-determinant', 'determinant(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'determinant', [x, y]) }
  /** transpose(x, y) = x · y. */
  static transpose(x: number, y: number): CrossFormula { return f('matrix-transpose', 'transpose(x, y) = x · y', x * y, nat(x, y), 'transpose', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('matrix-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
  /** ranknullity(rank, nullity) = rank + nullity (rank–nullity theorem). */
  static ranknullity(rank: number, nullity: number): CrossFormula { return f('matrix-ranknullity', 'ranknullity(rank, nullity) = rank + nullity (rank–nullity theorem)', rank + nullity, nat(rank, nullity), 'ranknullity', [rank, nullity]) }
  /** nullity(cols, rank) = cols − rank. */
  static nullity(cols: number, rank: number): CrossFormula { return f('matrix-nullity', 'nullity(cols, rank) = cols − rank', Math.max(0, cols - rank), nat(cols, rank), 'nullity', [cols, rank]) }
  /** symmetricentries(n) = n·(n+1)/2 (independent entries of a symmetric n×n). */
  static symmetricentries(nn: number): CrossFormula { return f('matrix-symmetricentries', 'symmetricentries(n) = n·(n+1)/2 (independent entries of a symmetric n×n)', nn * (nn + 1) / 2, nat(nn), 'symmetricentries', [nn]) }
  /** offdiagonal(n) = n·(n−1) (off-diagonal entries of n×n). */
  static offdiagonal(nn: number): CrossFormula { return f('matrix-offdiagonal', 'offdiagonal(n) = n·(n−1) (off-diagonal entries of n×n)', nn * (nn - 1), nat(nn), 'offdiagonal', [nn]) }
  /** identitytrace(n) = n (tr Iₙ). */
  static identitytrace(nn: number): CrossFormula { return f('matrix-identitytrace', 'identitytrace(n) = n (tr Iₙ)', nn, nat(nn), 'identitytrace', [nn]) }
  /** minors(n) = n² (first minors of n×n). */
  static minors(nn: number): CrossFormula { return f('matrix-minors', 'minors(n) = n² (first minors of n×n)', nn * nn, nat(nn), 'minors', [nn]) }
  /** characteristicdegree(n) = n (deg det(A − λI)). */
  static characteristicdegree(nn: number): CrossFormula { return f('matrix-characteristicdegree', 'characteristicdegree(n) = n (deg det(A − λI))', nn, nat(nn), 'characteristicdegree', [nn]) }
}

for (const name of ['adds', 'characteristicdegree', 'combos', 'determinant', 'elements', 'identitytrace', 'minors', 'mults', 'nullity', 'offdiagonal', 'rank', 'ranknullity', 'symmetricentries', 'trace', 'transpose'] as const)
  hexRegisterOf('matrix', name, (MatrixFormulas[name] as (...x: unknown[]) => unknown).bind(MatrixFormulas))
