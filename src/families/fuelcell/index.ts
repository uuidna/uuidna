import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FUELCELL — scaffolded integer measures crossed to energy. Every output an exact finite nonnegative integer. */

const PROOF = 'fuelcell arithmetic (cellvoltage, stackvoltage, efficiency, currentdensity, powerdensity, stackcells, h2consumption, degradation); scaffolded from the integer-op palette; a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fuelcell', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `fuelcell.${name}`, params })

export class FuelcellFormulas {
  static cellvoltage(x: number, y: number): CrossFormula { return c('fuelcell-cellvoltage', 'cellvoltage(x, y) = x · y', x * y, nat(x, y), 'cellvoltage', [x, y]) }
  static stackvoltage(x: number, y: number): CrossFormula { return c('fuelcell-stackvoltage', 'stackvoltage(x, y) = x · y', x * y, nat(x, y), 'stackvoltage', [x, y]) }
  static efficiency(x: number, y: number): CrossFormula { return c('fuelcell-efficiency', 'efficiency(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'efficiency', [x, y]) }
  static currentdensity(x: number, y: number): CrossFormula { return c('fuelcell-currentdensity', 'currentdensity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'currentdensity', [x, y]) }
  static powerdensity(x: number, y: number): CrossFormula { return c('fuelcell-powerdensity', 'powerdensity(x, y) = x · y', x * y, nat(x, y), 'powerdensity', [x, y]) }
  static stackcells(x: number, y: number): CrossFormula { return c('fuelcell-stackcells', 'stackcells(x, y) = x · y', x * y, nat(x, y), 'stackcells', [x, y]) }
  static h2consumption(x: number, y: number): CrossFormula { return c('fuelcell-h2consumption', 'h2consumption(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'h2consumption', [x, y]) }
  static degradation(x: number, y: number): CrossFormula { return c('fuelcell-degradation', 'degradation(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'degradation', [x, y]) }
}

for (const name of ['cellvoltage', 'currentdensity', 'degradation', 'efficiency', 'h2consumption', 'powerdensity', 'stackcells', 'stackvoltage'] as const)
  hexRegisterOf('fuelcell', name, (FuelcellFormulas[name] as (...x: unknown[]) => unknown).bind(FuelcellFormulas))
