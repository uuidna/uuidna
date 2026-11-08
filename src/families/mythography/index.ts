import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MYTHOGRAPHY — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'mythography arithmetic (mythcount, variantpaths, motifpairs, typeindex, culturesubsets, diffusionlinks, archetypecombos, versioncount); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mythography', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `mythography.${name}`, params })

export class MythographyFormulas {
  static mythcount(x: number, y: number): CrossFormula { return c('mythography-mythcount', 'mythcount(x, y) = x + y', x + y, nat(x, y), 'mythcount', [x, y]) }
  static variantpaths(x: number): CrossFormula { return c('mythography-variantpaths', 'variantpaths(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'variantpaths', [x]) }
  static motifpairs(x: number, y: number): CrossFormula { return c('mythography-motifpairs', 'motifpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'motifpairs', [x, y]) }
  static typeindex(x: number, y: number): CrossFormula { return c('mythography-typeindex', 'typeindex(x, y) = x · y', x * y, nat(x, y), 'typeindex', [x, y]) }
  static culturesubsets(x: number): CrossFormula { return c('mythography-culturesubsets', 'culturesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'culturesubsets', [x]) }
  static diffusionlinks(x: number, y: number): CrossFormula { return c('mythography-diffusionlinks', 'diffusionlinks(x, y) = x · y', x * y, nat(x, y), 'diffusionlinks', [x, y]) }
  static archetypecombos(x: number, y: number): CrossFormula { return c('mythography-archetypecombos', 'archetypecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'archetypecombos', [x, y]) }
  static versioncount(x: number, y: number): CrossFormula { return c('mythography-versioncount', 'versioncount(x, y) = x + y', x + y, nat(x, y), 'versioncount', [x, y]) }
}

for (const name of ['archetypecombos', 'culturesubsets', 'diffusionlinks', 'motifpairs', 'mythcount', 'typeindex', 'variantpaths', 'versioncount'] as const)
  hexRegisterOf('mythography', name, (MythographyFormulas[name] as (...x: unknown[]) => unknown).bind(MythographyFormulas))
