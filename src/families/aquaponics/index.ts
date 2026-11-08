import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AQUAPONICS — scaffolded integer measures crossed to agriculture. Every output an exact finite nonnegative integer. */

const PROOF = 'aquaponics arithmetic (fishdensity, plantgrowbeds, nitrogencycle, feedratio, watervolume, bacteriastrains, phbalance, yieldratio); scaffolded from the integer-op palette; a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'aquaponics', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `aquaponics.${name}`, params })

export class AquaponicsFormulas {
  static fishdensity(x: number, y: number): CrossFormula { return c('aquaponics-fishdensity', 'fishdensity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'fishdensity', [x, y]) }
  static plantgrowbeds(x: number, y: number): CrossFormula { return c('aquaponics-plantgrowbeds', 'plantgrowbeds(x, y) = x · y', x * y, nat(x, y), 'plantgrowbeds', [x, y]) }
  static nitrogencycle(x: number, y: number): CrossFormula { return c('aquaponics-nitrogencycle', 'nitrogencycle(x, y) = x + y', x + y, nat(x, y), 'nitrogencycle', [x, y]) }
  static feedratio(x: number, y: number): CrossFormula { return c('aquaponics-feedratio', 'feedratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'feedratio', [x, y]) }
  static watervolume(x: number, y: number): CrossFormula { return c('aquaponics-watervolume', 'watervolume(x, y) = x · y', x * y, nat(x, y), 'watervolume', [x, y]) }
  static bacteriastrains(x: number, y: number): CrossFormula { return c('aquaponics-bacteriastrains', 'bacteriastrains(x, y) = x + y', x + y, nat(x, y), 'bacteriastrains', [x, y]) }
  static phbalance(x: number, y: number): CrossFormula { return c('aquaponics-phbalance', 'phbalance(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'phbalance', [x, y]) }
  static yieldratio(x: number, y: number): CrossFormula { return c('aquaponics-yieldratio', 'yieldratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'yieldratio', [x, y]) }
}

for (const name of ['bacteriastrains', 'feedratio', 'fishdensity', 'nitrogencycle', 'phbalance', 'plantgrowbeds', 'watervolume', 'yieldratio'] as const)
  hexRegisterOf('aquaponics', name, (AquaponicsFormulas[name] as (...x: unknown[]) => unknown).bind(AquaponicsFormulas))
