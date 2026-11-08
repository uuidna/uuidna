import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** JUMPING — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'jumping arithmetic (height, hangtime, takeoffvelocity, horizontalrange, power, approachspeed, impulse, netheight); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'jumping', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `jumping.${name}`, params })

export class JumpingFormulas {
  static height(x: number, y: number): CrossFormula { return c('jumping-height', 'height(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'height', [x, y]) }
  static hangtime(x: number, y: number): CrossFormula { return c('jumping-hangtime', 'hangtime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'hangtime', [x, y]) }
  static takeoffvelocity(x: number, y: number): CrossFormula { return c('jumping-takeoffvelocity', 'takeoffvelocity(x, y) = x · y', x * y, nat(x, y), 'takeoffvelocity', [x, y]) }
  static horizontalrange(x: number, y: number): CrossFormula { return c('jumping-horizontalrange', 'horizontalrange(x, y) = x · y', x * y, nat(x, y), 'horizontalrange', [x, y]) }
  static power(x: number, y: number): CrossFormula { return c('jumping-power', 'power(x, y) = x · y', x * y, nat(x, y), 'power', [x, y]) }
  static approachspeed(x: number, y: number): CrossFormula { return c('jumping-approachspeed', 'approachspeed(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'approachspeed', [x, y]) }
  static impulse(x: number, y: number): CrossFormula { return c('jumping-impulse', 'impulse(x, y) = x · y', x * y, nat(x, y), 'impulse', [x, y]) }
  static netheight(x: number, y: number): CrossFormula { return c('jumping-netheight', 'netheight(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'netheight', [x, y]) }
}

for (const name of ['approachspeed', 'hangtime', 'height', 'horizontalrange', 'impulse', 'netheight', 'power', 'takeoffvelocity'] as const)
  hexRegisterOf('jumping', name, (JumpingFormulas[name] as (...x: unknown[]) => unknown).bind(JumpingFormulas))
