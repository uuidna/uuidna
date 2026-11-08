import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FOLKLORE — scaffolded integer measures crossed to sociology. Every output an exact finite nonnegative integer. */

const PROOF = 'folklore arithmetic (taletypes, motifcombos, variantorderings, transmissionpaths, regionsubsets, performercount, diffusionrate, collectionsize); scaffolded from the integer-op palette; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'folklore', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `folklore.${name}`, params })

export class FolkloreFormulas {
  static taletypes(x: number, y: number): CrossFormula { return c('folklore-taletypes', 'taletypes(x, y) = x + y', x + y, nat(x, y), 'taletypes', [x, y]) }
  static motifcombos(x: number, y: number): CrossFormula { return c('folklore-motifcombos', 'motifcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'motifcombos', [x, y]) }
  static variantorderings(x: number): CrossFormula { return c('folklore-variantorderings', 'variantorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'variantorderings', [x]) }
  static transmissionpaths(x: number, y: number): CrossFormula { return c('folklore-transmissionpaths', 'transmissionpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'transmissionpaths', [x, y]) }
  static regionsubsets(x: number): CrossFormula { return c('folklore-regionsubsets', 'regionsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'regionsubsets', [x]) }
  static performercount(x: number, y: number): CrossFormula { return c('folklore-performercount', 'performercount(x, y) = x · y', x * y, nat(x, y), 'performercount', [x, y]) }
  static diffusionrate(x: number, y: number): CrossFormula { return c('folklore-diffusionrate', 'diffusionrate(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'diffusionrate', [x, y]) }
  static collectionsize(x: number, y: number): CrossFormula { return c('folklore-collectionsize', 'collectionsize(x, y) = x + y', x + y, nat(x, y), 'collectionsize', [x, y]) }
}

for (const name of ['collectionsize', 'diffusionrate', 'motifcombos', 'performercount', 'regionsubsets', 'taletypes', 'transmissionpaths', 'variantorderings'] as const)
  hexRegisterOf('folklore', name, (FolkloreFormulas[name] as (...x: unknown[]) => unknown).bind(FolkloreFormulas))
