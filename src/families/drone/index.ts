import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DRONE — scaffolded integer measures crossed to aerospace. Every output an exact finite nonnegative integer. */

const PROOF = 'drone arithmetic (flighttime, payload, rotorcount, range, thrust, batterykwh, maxaltitude, stabilitymargin); scaffolded from the integer-op palette; a measure crossed to aerospace'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'drone', dst: 'aerospace', formula, value, proof: PROOF, ...extra }, holds, { name: `drone.${name}`, params })

export class DroneFormulas {
  static flighttime(x: number, y: number): CrossFormula { return c('drone-flighttime', 'flighttime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'flighttime', [x, y]) }
  static payload(x: number, y: number): CrossFormula { return c('drone-payload', 'payload(x, y) = x · y', x * y, nat(x, y), 'payload', [x, y]) }
  static rotorcount(x: number, y: number): CrossFormula { return c('drone-rotorcount', 'rotorcount(x, y) = x + y', x + y, nat(x, y), 'rotorcount', [x, y]) }
  static range(x: number, y: number): CrossFormula { return c('drone-range', 'range(x, y) = x · y', x * y, nat(x, y), 'range', [x, y]) }
  static thrust(x: number, y: number): CrossFormula { return c('drone-thrust', 'thrust(x, y) = x · y', x * y, nat(x, y), 'thrust', [x, y]) }
  static batterykwh(x: number, y: number): CrossFormula { return c('drone-batterykwh', 'batterykwh(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'batterykwh', [x, y]) }
  static maxaltitude(x: number, y: number): CrossFormula { return c('drone-maxaltitude', 'maxaltitude(x, y) = x · y', x * y, nat(x, y), 'maxaltitude', [x, y]) }
  static stabilitymargin(x: number, y: number): CrossFormula { return c('drone-stabilitymargin', 'stabilitymargin(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'stabilitymargin', [x, y]) }
}

for (const name of ['batterykwh', 'flighttime', 'maxaltitude', 'payload', 'range', 'rotorcount', 'stabilitymargin', 'thrust'] as const)
  hexRegisterOf('drone', name, (DroneFormulas[name] as (...x: unknown[]) => unknown).bind(DroneFormulas))
