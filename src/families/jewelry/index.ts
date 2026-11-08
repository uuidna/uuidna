import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** JEWELRY — scaffolded integer measures crossed to materials. Every output an exact finite nonnegative integer. */

const PROOF = 'jewelry arithmetic (caratweight, facetcount, karatfineness, stonecombos, settingprongs, metalgrams, symmetryorderings, pricetotal); scaffolded from the integer-op palette; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'jewelry', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `jewelry.${name}`, params })

export class JewelryFormulas {
  static caratweight(x: number, y: number): CrossFormula { return c('jewelry-caratweight', 'caratweight(x, y) = x · y', x * y, nat(x, y), 'caratweight', [x, y]) }
  static facetcount(x: number, y: number): CrossFormula { return c('jewelry-facetcount', 'facetcount(x, y) = x · y', x * y, nat(x, y), 'facetcount', [x, y]) }
  static karatfineness(x: number, y: number): CrossFormula { return c('jewelry-karatfineness', 'karatfineness(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'karatfineness', [x, y]) }
  static stonecombos(x: number, y: number): CrossFormula { return c('jewelry-stonecombos', 'stonecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'stonecombos', [x, y]) }
  static settingprongs(x: number, y: number): CrossFormula { return c('jewelry-settingprongs', 'settingprongs(x, y) = x + y', x + y, nat(x, y), 'settingprongs', [x, y]) }
  static metalgrams(x: number, y: number): CrossFormula { return c('jewelry-metalgrams', 'metalgrams(x, y) = x · y', x * y, nat(x, y), 'metalgrams', [x, y]) }
  static symmetryorderings(x: number): CrossFormula { return c('jewelry-symmetryorderings', 'symmetryorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'symmetryorderings', [x]) }
  static pricetotal(x: number, y: number): CrossFormula { return c('jewelry-pricetotal', 'pricetotal(x, y) = x · y', x * y, nat(x, y), 'pricetotal', [x, y]) }
}

for (const name of ['caratweight', 'facetcount', 'karatfineness', 'metalgrams', 'pricetotal', 'settingprongs', 'stonecombos', 'symmetryorderings'] as const)
  hexRegisterOf('jewelry', name, (JewelryFormulas[name] as (...x: unknown[]) => unknown).bind(JewelryFormulas))
