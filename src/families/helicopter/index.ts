import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HELICOPTER — scaffolded integer measures crossed to aerospace. Every output an exact finite nonnegative integer. */

const PROOF = 'helicopter arithmetic (rotordiameter, lift, maxspeed, bladecount, bladeorderings, ceiling, autorotationrate, powerkw); scaffolded from the integer-op palette; a measure crossed to aerospace'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'helicopter', dst: 'aerospace', formula, value, proof: PROOF, ...extra }, holds, { name: `helicopter.${name}`, params })

export class HelicopterFormulas {
  static rotordiameter(x: number, y: number): CrossFormula { return c('helicopter-rotordiameter', 'rotordiameter(x, y) = x · y', x * y, nat(x, y), 'rotordiameter', [x, y]) }
  static lift(x: number, y: number): CrossFormula { return c('helicopter-lift', 'lift(x, y) = x · y', x * y, nat(x, y), 'lift', [x, y]) }
  static maxspeed(x: number, y: number): CrossFormula { return c('helicopter-maxspeed', 'maxspeed(x, y) = x · y', x * y, nat(x, y), 'maxspeed', [x, y]) }
  static bladecount(x: number, y: number): CrossFormula { return c('helicopter-bladecount', 'bladecount(x, y) = x + y', x + y, nat(x, y), 'bladecount', [x, y]) }
  static bladeorderings(x: number): CrossFormula { return c('helicopter-bladeorderings', 'bladeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'bladeorderings', [x]) }
  static ceiling(x: number, y: number): CrossFormula { return c('helicopter-ceiling', 'ceiling(x, y) = x · y', x * y, nat(x, y), 'ceiling', [x, y]) }
  static autorotationrate(x: number, y: number): CrossFormula { return c('helicopter-autorotationrate', 'autorotationrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'autorotationrate', [x, y]) }
  static powerkw(x: number, y: number): CrossFormula { return c('helicopter-powerkw', 'powerkw(x, y) = x · y', x * y, nat(x, y), 'powerkw', [x, y]) }
}

for (const name of ['autorotationrate', 'bladecount', 'bladeorderings', 'ceiling', 'lift', 'maxspeed', 'powerkw', 'rotordiameter'] as const)
  hexRegisterOf('helicopter', name, (HelicopterFormulas[name] as (...x: unknown[]) => unknown).bind(HelicopterFormulas))
