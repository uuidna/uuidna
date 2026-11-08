import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HYDROGRAPHY — scaffolded integer measures crossed to oceanography. Every output an exact finite nonnegative integer. */

const PROOF = 'hydrography arithmetic (depth, soundingdensity, tidalrange, currentspeed, chartscale, shoalcount, surveycoverage, isobathinterval); scaffolded from the integer-op palette; a measure crossed to oceanography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hydrography', dst: 'oceanography', formula, value, proof: PROOF, ...extra }, holds, { name: `hydrography.${name}`, params })

export class HydrographyFormulas {
  static depth(x: number, y: number): CrossFormula { return c('hydrography-depth', 'depth(x, y) = x · y', x * y, nat(x, y), 'depth', [x, y]) }
  static soundingdensity(x: number, y: number): CrossFormula { return c('hydrography-soundingdensity', 'soundingdensity(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'soundingdensity', [x, y]) }
  static tidalrange(x: number, y: number): CrossFormula { return c('hydrography-tidalrange', 'tidalrange(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'tidalrange', [x, y]) }
  static currentspeed(x: number, y: number): CrossFormula { return c('hydrography-currentspeed', 'currentspeed(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'currentspeed', [x, y]) }
  static chartscale(x: number, y: number): CrossFormula { return c('hydrography-chartscale', 'chartscale(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'chartscale', [x, y]) }
  static shoalcount(x: number, y: number): CrossFormula { return c('hydrography-shoalcount', 'shoalcount(x, y) = x + y', x + y, nat(x, y), 'shoalcount', [x, y]) }
  static surveycoverage(x: number, y: number): CrossFormula { return c('hydrography-surveycoverage', 'surveycoverage(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'surveycoverage', [x, y]) }
  static isobathinterval(x: number, y: number): CrossFormula { return c('hydrography-isobathinterval', 'isobathinterval(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'isobathinterval', [x, y]) }
}

for (const name of ['chartscale', 'currentspeed', 'depth', 'isobathinterval', 'shoalcount', 'soundingdensity', 'surveycoverage', 'tidalrange'] as const)
  hexRegisterOf('hydrography', name, (HydrographyFormulas[name] as (...x: unknown[]) => unknown).bind(HydrographyFormulas))
