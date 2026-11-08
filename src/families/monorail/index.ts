import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MONORAIL — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'monorail arithmetic (speed, headwayseconds, capacity, stations, traveltime, accelrate, gradientpct, throughput); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'monorail', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `monorail.${name}`, params })

export class MonorailFormulas {
  static speed(x: number, y: number): CrossFormula { return c('monorail-speed', 'speed(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'speed', [x, y]) }
  static headwayseconds(x: number, y: number): CrossFormula { return c('monorail-headwayseconds', 'headwayseconds(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'headwayseconds', [x, y]) }
  static capacity(x: number, y: number): CrossFormula { return c('monorail-capacity', 'capacity(x, y) = x · y', x * y, nat(x, y), 'capacity', [x, y]) }
  static stations(x: number, y: number): CrossFormula { return c('monorail-stations', 'stations(x, y) = x + y', x + y, nat(x, y), 'stations', [x, y]) }
  static traveltime(x: number, y: number): CrossFormula { return c('monorail-traveltime', 'traveltime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'traveltime', [x, y]) }
  static accelrate(x: number, y: number): CrossFormula { return c('monorail-accelrate', 'accelrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'accelrate', [x, y]) }
  static gradientpct(x: number, y: number): CrossFormula { return c('monorail-gradientpct', 'gradientpct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'gradientpct', [x, y]) }
  static throughput(x: number, y: number): CrossFormula { return c('monorail-throughput', 'throughput(x, y) = x · y', x * y, nat(x, y), 'throughput', [x, y]) }
}

for (const name of ['accelrate', 'capacity', 'gradientpct', 'headwayseconds', 'speed', 'stations', 'throughput', 'traveltime'] as const)
  hexRegisterOf('monorail', name, (MonorailFormulas[name] as (...x: unknown[]) => unknown).bind(MonorailFormulas))
