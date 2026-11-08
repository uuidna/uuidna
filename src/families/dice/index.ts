import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DICE — TABLETOP CHANCE AS ARITHMETIC. Rolling dice is numbers: the outcomes a pool can show, the sum you expect, the
 *  percent chance of one face, the span from lowest to highest, the ways to choose, the spread, the most common sum, and
 *  the lift of rolling with advantage. Crosses to `probability` — dice are what probability counts. A measure. */

const PROOF = 'dice arithmetic (outcome space, expected sum, single-face percent, range, combinations, variance, modal sum, advantage); exact finite integers over small dice; a measure crossed to probability'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dice', dst: 'probability', formula, value, proof: PROOF, ...extra }, holds, { name: `dice.${name}`, params })

export class DiceFormulas {
  /** OUTCOME SPACE: the faces a pool of dice can show. value sides^dice. */
  static outcomes(sides: number, dice: number): CrossFormula { let v = 1; for (let i = 0; i < dice; i++) v *= sides; return c('dice-outcomes', 'outcomes(sides, dice) = sides^dice', nat(sides, dice) ? v : 0, nat(sides, dice), 'outcomes', [sides, dice]) }
  /** EXPECTED SUM of the pool. value ⌊dice · (sides + 1) / 2⌋. */
  static expectedsum(sides: number, dice: number): CrossFormula { return c('dice-expectedsum', 'expectedsum(sides, dice) = ⌊dice · (sides + 1) / 2⌋', Math.floor((dice * (sides + 1)) / 2), nat(sides, dice), 'expectedsum', [sides, dice]) }
  /** SINGLE-FACE PROBABILITY as a percentage. value ⌊100 / sides⌋. */
  static probabilitypct(sides: number): CrossFormula { return c('dice-probabilitypct', 'probabilitypct(sides) = ⌊100 / sides⌋', sides > 0 ? Math.floor(100 / sides) : 0, nat(sides) && sides > 0, 'probabilitypct', [sides]) }
  /** RANGE: the span from the lowest to the highest sum. value dice · (sides − 1). */
  static range(sides: number, dice: number): CrossFormula { return c('dice-range', 'range(sides, dice) = dice · (sides − 1)', dice * Math.max(0, sides - 1), nat(sides, dice), 'range', [sides, dice]) }
  /** COMBINATIONS: the ways to choose k of n. value C(n, k). */
  static combinations(n: number, k: number): CrossFormula { const kk = Math.min(k, Math.max(0, n - k)); let v = 1; for (let i = 0; i < kk; i++) v = (v * (n - i)) / (i + 1); return c('dice-combinations', 'combinations(n, k) = C(n, k)', (nat(n, k) && k <= n) ? v : 0, nat(n, k) && k <= n, 'combinations', [n, k]) }
  /** VARIANCE of a single die. value ⌊(sides² − 1) / 12⌋. */
  static variance(sides: number): CrossFormula { return c('dice-variance', 'variance(sides) = ⌊(sides² − 1) / 12⌋', sides > 0 ? Math.floor((sides * sides - 1) / 12) : 0, nat(sides) && sides > 0, 'variance', [sides]) }
  /** MODAL SUM: the most common sum of the pool. value dice + ⌊dice · (sides − 1) / 2⌋. */
  static mode(sides: number, dice: number): CrossFormula { return c('dice-mode', 'mode(sides, dice) = dice + ⌊dice · (sides − 1) / 2⌋', dice + Math.floor((dice * Math.max(0, sides - 1)) / 2), nat(sides, dice), 'mode', [sides, dice]) }
  /** ADVANTAGE: the expected higher of two rolls, floored. value ⌊Σ k(2k − 1) / sides²⌋. */
  static advantage(sides: number): CrossFormula { let num = 0; for (let k = 1; k <= sides; k++) num += k * (2 * k - 1); return c('dice-advantage', 'advantage(sides) = ⌊Σ k(2k − 1) / sides²⌋', sides > 0 ? Math.floor(num / (sides * sides)) : 0, nat(sides) && sides > 0, 'advantage', [sides]) }
}

for (const name of ['advantage', 'combinations', 'expectedsum', 'mode', 'outcomes', 'probabilitypct', 'range', 'variance'] as const)
  hexRegisterOf('dice', name, (DiceFormulas[name] as (...x: unknown[]) => unknown).bind(DiceFormulas))
