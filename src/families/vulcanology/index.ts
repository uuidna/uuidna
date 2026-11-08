import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VULCANOLOGY — scaffolded integer measures crossed to geology. Every output an exact finite nonnegative integer. */

const PROOF = 'vulcanology arithmetic (vei, ejectavolume, explosivity, lavaflowrate, ashheight, repose, magmaviscosity, hazardindex); scaffolded from the integer-op palette; a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'vulcanology', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `vulcanology.${name}`, params })

export class VulcanologyFormulas {
  static vei(x: number, y: number): CrossFormula { return c('vulcanology-vei', 'vei(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'vei', [x, y]) }
  static ejectavolume(x: number, y: number): CrossFormula { return c('vulcanology-ejectavolume', 'ejectavolume(x, y) = x · y', x * y, nat(x, y), 'ejectavolume', [x, y]) }
  static explosivity(x: number, y: number): CrossFormula { return c('vulcanology-explosivity', 'explosivity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'explosivity', [x, y]) }
  static lavaflowrate(x: number, y: number): CrossFormula { return c('vulcanology-lavaflowrate', 'lavaflowrate(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'lavaflowrate', [x, y]) }
  static ashheight(x: number, y: number): CrossFormula { return c('vulcanology-ashheight', 'ashheight(x, y) = x · y', x * y, nat(x, y), 'ashheight', [x, y]) }
  static repose(x: number, y: number): CrossFormula { return c('vulcanology-repose', 'repose(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'repose', [x, y]) }
  static magmaviscosity(x: number, y: number): CrossFormula { return c('vulcanology-magmaviscosity', 'magmaviscosity(x, y) = x · y', x * y, nat(x, y), 'magmaviscosity', [x, y]) }
  static hazardindex(x: number, y: number): CrossFormula { return c('vulcanology-hazardindex', 'hazardindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'hazardindex', [x, y]) }
}

for (const name of ['ashheight', 'ejectavolume', 'explosivity', 'hazardindex', 'lavaflowrate', 'magmaviscosity', 'repose', 'vei'] as const)
  hexRegisterOf('vulcanology', name, (VulcanologyFormulas[name] as (...x: unknown[]) => unknown).bind(VulcanologyFormulas))
