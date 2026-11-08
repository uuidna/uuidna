import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LINEHAUL — scaffolded integer measures crossed to logistics. Every output an exact finite nonnegative integer. */

const PROOF = 'linehaul arithmetic (transittime, costpermile, avgspeed, fuelburn, payloadmiles, driverhours, teamutilization, laneprofit); scaffolded from the integer-op palette; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'linehaul', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `linehaul.${name}`, params })

export class LinehaulFormulas {
  static transittime(x: number, y: number): CrossFormula { return c('linehaul-transittime', 'transittime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'transittime', [x, y]) }
  static costpermile(x: number, y: number): CrossFormula { return c('linehaul-costpermile', 'costpermile(x, y) = x · y', x * y, nat(x, y), 'costpermile', [x, y]) }
  static avgspeed(x: number, y: number): CrossFormula { return c('linehaul-avgspeed', 'avgspeed(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'avgspeed', [x, y]) }
  static fuelburn(x: number, y: number): CrossFormula { return c('linehaul-fuelburn', 'fuelburn(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'fuelburn', [x, y]) }
  static payloadmiles(x: number, y: number): CrossFormula { return c('linehaul-payloadmiles', 'payloadmiles(x, y) = x · y', x * y, nat(x, y), 'payloadmiles', [x, y]) }
  static driverhours(x: number, y: number): CrossFormula { return c('linehaul-driverhours', 'driverhours(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'driverhours', [x, y]) }
  static teamutilization(x: number, y: number): CrossFormula { return c('linehaul-teamutilization', 'teamutilization(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'teamutilization', [x, y]) }
  static laneprofit(x: number, y: number): CrossFormula { return c('linehaul-laneprofit', 'laneprofit(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'laneprofit', [x, y]) }
}

for (const name of ['avgspeed', 'costpermile', 'driverhours', 'fuelburn', 'laneprofit', 'payloadmiles', 'teamutilization', 'transittime'] as const)
  hexRegisterOf('linehaul', name, (LinehaulFormulas[name] as (...x: unknown[]) => unknown).bind(LinehaulFormulas))
