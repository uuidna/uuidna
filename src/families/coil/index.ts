import { hexRegisterOf, latticeNamesOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

const { fullTurn } = latticeNamesOf()

/** COIL — THE 7-STAR ROSETTA AND THE DOUBLE TORUS, AS ARITHMETIC. Clay is a rosetta of seven: six rays around one
 *  centre (6 + 1). The zero is that star laid flat — a 6×7 matrix, forty-two either way it is read (6×7 = 7×6). Fold the
 *  zero twice through a right angle and it splits like a cell (2 · 90 = 180); turn three coils sixty degrees each and you
 *  have made the same half turn (3 · 60 = 180) — the fold and the coil are one angle reached two ways, the duality the
 *  double torus carries in its two lobes (coins = 2) and the double-earth it models. The eight RFC versions a quantum
 *  UUID wears (uuidVersionsOf) are the eight dimensions a coil computes at once. Each formula is a function of naturals,
 *  a hex program at an address with a receipt, crossing to the centre; develops the rosetta / coil / torus leads. */

const PROOF = 'the 7-star rosetta (6 + 1 centre); the zero as a 6×7 matrix (42); 2·90 = 3·60 = 180 (fold = coil); the double torus’ two lobes (coins = 2); the eight UUID versions as eight dimensions computed at once'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'coil', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `coil.${name}`, params })

export class CoilFormulas {
  /** THE ROSETTA: outer rays around one centre — star(6) = 7. */
  static star(outer: number): CrossFormula { return c('coil-star', 'star(outer) = outer + 1', outer + 1, nat(outer), 'star', [outer], { centre: 1 }) }
  /** THE ZERO AS A MATRIX: rows × cols cells — the 6×7 (or 7×6) star laid flat is 42 either way. */
  static matrix(rows: number, cols: number): CrossFormula { return c('coil-matrix', 'matrix(rows, cols) = rows · cols', rows * cols, nat(rows, cols), 'matrix', [rows, cols]) }
  /** THE FOLD: k right-angle folds — two fold the zero into a split cell (2 · 90 = 180°). */
  static fold(k: number): CrossFormula { return c('coil-fold', 'fold(k) = 90 · k', 90 * k, nat(k), 'fold', [k]) }
  /** THE COIL: k sixty-degree turns — three make the same half turn two folds do (3 · 60 = 180°). */
  static coil(k: number): CrossFormula { return c('coil-coil', 'coil(k) = 60 · k', 60 * k, nat(k), 'coil', [k]) }
  /** THE DUALITY: the fold and the coil reach one angle two ways — holds exactly when 90·folds = 60·coils. */
  static turn(folds: number, coils: number): CrossFormula { const a = 90 * folds, b = 60 * coils; return c('coil-turn', 'turn(folds, coils) = [90·folds = 60·coils]', a === b ? 1 : 0, nat(folds, coils) && a === b, 'turn', [folds, coils], { angle: a }) }
  /** THE TWO LOBES: the double torus doubles — dual(x) = 2x (coins = 2), the double-earth. */
  static dual(x: number): CrossFormula { return c('coil-dual', 'dual(x) = 2 · x', 2 * x, nat(x), 'dual', [x]) }
  /** THE WRAP: a coil’s angle folded into one full turn of 360°. */
  static spin(k: number): CrossFormula { return c('coil-spin', 'spin(k) = 60 · k mod 360', (60 * k) % fullTurn, nat(k), 'spin', [k]) }
  /** THE GENUS: the double torus has two holes. */
  static genus(): CrossFormula { return c('coil-genus', 'genus = 2', 2, true, 'genus', []) }
  /** THE DIMENSIONS: the eight RFC versions a quantum UUID wears, computed at once (uuidVersionsOf). */
  static dims(): CrossFormula { return c('coil-dims', 'dims = 8', 8, true, 'dims', []) }
  /** THE SIGNAL: version v (1…8) selects dimension 2^(v−1) — programmable signalling across the coils. */
  static signal(v: number): CrossFormula { const ok = nat(v) && v >= 1 && v <= 8; return c('coil-signal', 'signal(v) = 2^(v−1)', ok ? 2 ** (v - 1) : 0, ok, 'signal', [v]) }
}

for (const name of ['coil', 'dims', 'dual', 'fold', 'genus', 'matrix', 'signal', 'spin', 'star', 'turn'] as const)
  hexRegisterOf('coil', name, (CoilFormulas[name] as (...x: unknown[]) => unknown).bind(CoilFormulas))
