import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CYCLONE — scaffolded integer measures crossed to meteorology. Every output an exact finite nonnegative integer. */

const PROOF = 'cyclone arithmetic (category, windspeed, pressuredrop, radius, stormsurge, rainfall, eyediameter, intensityindex); scaffolded from the integer-op palette; a measure crossed to meteorology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cyclone', dst: 'meteorology', formula, value, proof: PROOF, ...extra }, holds, { name: `cyclone.${name}`, params })

export class CycloneFormulas {
  static category(x: number, y: number): CrossFormula { return c('cyclone-category', 'category(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'category', [x, y]) }
  static windspeed(x: number, y: number): CrossFormula { return c('cyclone-windspeed', 'windspeed(x, y) = x · y', x * y, nat(x, y), 'windspeed', [x, y]) }
  static pressuredrop(x: number, y: number): CrossFormula { return c('cyclone-pressuredrop', 'pressuredrop(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'pressuredrop', [x, y]) }
  static radius(x: number, y: number): CrossFormula { return c('cyclone-radius', 'radius(x, y) = x · y', x * y, nat(x, y), 'radius', [x, y]) }
  static stormsurge(x: number, y: number): CrossFormula { return c('cyclone-stormsurge', 'stormsurge(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'stormsurge', [x, y]) }
  static rainfall(x: number, y: number): CrossFormula { return c('cyclone-rainfall', 'rainfall(x, y) = x · y', x * y, nat(x, y), 'rainfall', [x, y]) }
  static eyediameter(x: number, y: number): CrossFormula { return c('cyclone-eyediameter', 'eyediameter(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'eyediameter', [x, y]) }
  static intensityindex(x: number, y: number): CrossFormula { return c('cyclone-intensityindex', 'intensityindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'intensityindex', [x, y]) }
}

for (const name of ['category', 'eyediameter', 'intensityindex', 'pressuredrop', 'radius', 'rainfall', 'stormsurge', 'windspeed'] as const)
  hexRegisterOf('cyclone', name, (CycloneFormulas[name] as (...x: unknown[]) => unknown).bind(CycloneFormulas))
