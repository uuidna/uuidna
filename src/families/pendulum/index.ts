import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PendulumFormulas — 8 exact-integer formulas of the pendulum domain, each at a hex address crossing to cross; develops the pendulum leads. */

const PROOF = "pendulum counts: period(x, y) = x / y; frequency(x, y) = x / y; length(x, y) = x · y; swings(x, y) = x · y; amplitude(x, y) = max(0, x − y); energy(x, y) = x · y; bobmass(x, y) = x · y; combos(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'pendulum', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `pendulum.${name}`, params })

export class PendulumFormulas {
  /** period(x, y) = x / y. */
  static period(x: number, y: number): CrossFormula { return f('pendulum-period', 'period(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'period', [x, y]) }
  /** frequency(x, y) = x / y. */
  static frequency(x: number, y: number): CrossFormula { return f('pendulum-frequency', 'frequency(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'frequency', [x, y]) }
  /** length(x, y) = x · y. */
  static length(x: number, y: number): CrossFormula { return f('pendulum-length', 'length(x, y) = x · y', x * y, nat(x, y), 'length', [x, y]) }
  /** swings(x, y) = x · y. */
  static swings(x: number, y: number): CrossFormula { return f('pendulum-swings', 'swings(x, y) = x · y', x * y, nat(x, y), 'swings', [x, y]) }
  /** amplitude(x, y) = max(0, x − y). */
  static amplitude(x: number, y: number): CrossFormula { return f('pendulum-amplitude', 'amplitude(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'amplitude', [x, y]) }
  /** energy(x, y) = x · y. */
  static energy(x: number, y: number): CrossFormula { return f('pendulum-energy', 'energy(x, y) = x · y', x * y, nat(x, y), 'energy', [x, y]) }
  /** bobmass(x, y) = x · y. */
  static bobmass(x: number, y: number): CrossFormula { return f('pendulum-bobmass', 'bobmass(x, y) = x · y', x * y, nat(x, y), 'bobmass', [x, y]) }
  /** combos(x, y) = C(x, y). */
  static combos(x: number, y: number): CrossFormula { return f('pendulum-combos', 'combos(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'combos', [x, y]) }
}

for (const name of ['amplitude', 'bobmass', 'combos', 'energy', 'frequency', 'length', 'period', 'swings'] as const)
  hexRegisterOf('pendulum', name, (PendulumFormulas[name] as (...x: unknown[]) => unknown).bind(PendulumFormulas))
