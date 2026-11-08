import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ICONOGRAPHY — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'iconography arithmetic (symbolcount, attributepairs, gesturetypes, colorsubsets, compositionorderings, haloforms, motifcombos, canonratio); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'iconography', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `iconography.${name}`, params })

export class IconographyFormulas {
  static symbolcount(x: number, y: number): CrossFormula { return c('iconography-symbolcount', 'symbolcount(x, y) = x + y', x + y, nat(x, y), 'symbolcount', [x, y]) }
  static attributepairs(x: number, y: number): CrossFormula { return c('iconography-attributepairs', 'attributepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'attributepairs', [x, y]) }
  static gesturetypes(x: number, y: number): CrossFormula { return c('iconography-gesturetypes', 'gesturetypes(x, y) = x · y', x * y, nat(x, y), 'gesturetypes', [x, y]) }
  static colorsubsets(x: number): CrossFormula { return c('iconography-colorsubsets', 'colorsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'colorsubsets', [x]) }
  static compositionorderings(x: number): CrossFormula { return c('iconography-compositionorderings', 'compositionorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'compositionorderings', [x]) }
  static haloforms(x: number, y: number): CrossFormula { return c('iconography-haloforms', 'haloforms(x, y) = x + y', x + y, nat(x, y), 'haloforms', [x, y]) }
  static motifcombos(x: number, y: number): CrossFormula { return c('iconography-motifcombos', 'motifcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'motifcombos', [x, y]) }
  static canonratio(x: number, y: number): CrossFormula { return c('iconography-canonratio', 'canonratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'canonratio', [x, y]) }
}

for (const name of ['attributepairs', 'canonratio', 'colorsubsets', 'compositionorderings', 'gesturetypes', 'haloforms', 'motifcombos', 'symbolcount'] as const)
  hexRegisterOf('iconography', name, (IconographyFormulas[name] as (...x: unknown[]) => unknown).bind(IconographyFormulas))
