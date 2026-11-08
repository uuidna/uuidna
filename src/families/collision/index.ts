import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CollisionFormulas — 8 exact-integer formulas of the collision domain, each at a hex address crossing to cross; develops the collision leads. */

const PROOF = "collision counts: momentum(x, y) = x · y; impulse(x, y) = x · y; energy(x, y) = x · y; restitution(x, y) = x · 100 / y; force(x, y) = x / y; bodies(x, y) = x + y; deltav(x, y) = max(0, x − y); pairs(x, y) = C(x, y)"
const factOf = (x: number): number => { if (x > 12) return 0; let v = 1; for (let i = 2; i <= x; i++) v *= i; return v }
const combOf = (nn: number, k: number): number => { if (k < 0 || k > nn) return 0; let kk = k > nn - k ? nn - k : k, v = 1; for (let i = 0; i < kk; i++) v = (v * (nn - i)) / (i + 1); return Math.round(v) }
const permOf = (nn: number, k: number): number => (k < 0 || k > nn || nn > 20 ? 0 : combOf(nn, k) * factOf(k))
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[]): CrossFormula =>
  crossFormulaOf({ id, src: 'collision', dst: 'cross', formula, value, proof: PROOF }, holds, { name: `collision.${name}`, params })

export class CollisionFormulas {
  /** momentum(x, y) = x · y. */
  static momentum(x: number, y: number): CrossFormula { return f('collision-momentum', 'momentum(x, y) = x · y', x * y, nat(x, y), 'momentum', [x, y]) }
  /** impulse(x, y) = x · y. */
  static impulse(x: number, y: number): CrossFormula { return f('collision-impulse', 'impulse(x, y) = x · y', x * y, nat(x, y), 'impulse', [x, y]) }
  /** energy(x, y) = x · y. */
  static energy(x: number, y: number): CrossFormula { return f('collision-energy', 'energy(x, y) = x · y', x * y, nat(x, y), 'energy', [x, y]) }
  /** restitution(x, y) = x · 100 / y. */
  static restitution(x: number, y: number): CrossFormula { return f('collision-restitution', 'restitution(x, y) = x · 100 / y', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'restitution', [x, y]) }
  /** force(x, y) = x / y. */
  static force(x: number, y: number): CrossFormula { return f('collision-force', 'force(x, y) = x / y', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'force', [x, y]) }
  /** bodies(x, y) = x + y. */
  static bodies(x: number, y: number): CrossFormula { return f('collision-bodies', 'bodies(x, y) = x + y', x + y, nat(x, y), 'bodies', [x, y]) }
  /** deltav(x, y) = max(0, x − y). */
  static deltav(x: number, y: number): CrossFormula { return f('collision-deltav', 'deltav(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'deltav', [x, y]) }
  /** pairs(x, y) = C(x, y). */
  static pairs(x: number, y: number): CrossFormula { return f('collision-pairs', 'pairs(x, y) = C(x, y)', combOf(x, y), nat(x, y) && y <= x, 'pairs', [x, y]) }
}

for (const name of ['bodies', 'deltav', 'energy', 'force', 'impulse', 'momentum', 'pairs', 'restitution'] as const)
  hexRegisterOf('collision', name, (CollisionFormulas[name] as (...x: unknown[]) => unknown).bind(CollisionFormulas))
