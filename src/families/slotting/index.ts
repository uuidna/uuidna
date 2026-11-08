import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SLOTTING — scaffolded integer measures crossed to supplychain. Every output an exact finite nonnegative integer. */

const PROOF = 'slotting arithmetic (pickdensity, traveltime, velocityrank, utilizationrate, replenishrate, goldenzone, picksperslot, congestionindex); scaffolded from the integer-op palette; a measure crossed to supplychain'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'slotting', dst: 'supplychain', formula, value, proof: PROOF, ...extra }, holds, { name: `slotting.${name}`, params })

export class SlottingFormulas {
  static pickdensity(x: number, y: number): CrossFormula { return c('slotting-pickdensity', 'pickdensity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'pickdensity', [x, y]) }
  static traveltime(x: number, y: number): CrossFormula { return c('slotting-traveltime', 'traveltime(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'traveltime', [x, y]) }
  static velocityrank(x: number, y: number): CrossFormula { return c('slotting-velocityrank', 'velocityrank(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'velocityrank', [x, y]) }
  static utilizationrate(x: number, y: number): CrossFormula { return c('slotting-utilizationrate', 'utilizationrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'utilizationrate', [x, y]) }
  static replenishrate(x: number, y: number): CrossFormula { return c('slotting-replenishrate', 'replenishrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'replenishrate', [x, y]) }
  static goldenzone(x: number, y: number): CrossFormula { return c('slotting-goldenzone', 'goldenzone(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'goldenzone', [x, y]) }
  static picksperslot(x: number, y: number): CrossFormula { return c('slotting-picksperslot', 'picksperslot(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'picksperslot', [x, y]) }
  static congestionindex(x: number, y: number): CrossFormula { return c('slotting-congestionindex', 'congestionindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'congestionindex', [x, y]) }
}

for (const name of ['congestionindex', 'goldenzone', 'pickdensity', 'picksperslot', 'replenishrate', 'traveltime', 'utilizationrate', 'velocityrank'] as const)
  hexRegisterOf('slotting', name, (SlottingFormulas[name] as (...x: unknown[]) => unknown).bind(SlottingFormulas))
