import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HERALDRY — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'heraldry arithmetic (tincturecount, chargecombos, quarterings, blazonorderings, fieldsubsets, marshallingpairs, ordinaries, differencingmarks); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'heraldry', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `heraldry.${name}`, params })

export class HeraldryFormulas {
  static tincturecount(x: number, y: number): CrossFormula { return c('heraldry-tincturecount', 'tincturecount(x, y) = x + y', x + y, nat(x, y), 'tincturecount', [x, y]) }
  static chargecombos(x: number, y: number): CrossFormula { return c('heraldry-chargecombos', 'chargecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'chargecombos', [x, y]) }
  static quarterings(x: number, y: number): CrossFormula { return c('heraldry-quarterings', 'quarterings(x, y) = x · y', x * y, nat(x, y), 'quarterings', [x, y]) }
  static blazonorderings(x: number): CrossFormula { return c('heraldry-blazonorderings', 'blazonorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'blazonorderings', [x]) }
  static fieldsubsets(x: number): CrossFormula { return c('heraldry-fieldsubsets', 'fieldsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'fieldsubsets', [x]) }
  static marshallingpairs(x: number, y: number): CrossFormula { return c('heraldry-marshallingpairs', 'marshallingpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'marshallingpairs', [x, y]) }
  static ordinaries(x: number, y: number): CrossFormula { return c('heraldry-ordinaries', 'ordinaries(x, y) = x + y', x + y, nat(x, y), 'ordinaries', [x, y]) }
  static differencingmarks(x: number, y: number): CrossFormula { return c('heraldry-differencingmarks', 'differencingmarks(x, y) = x · y', x * y, nat(x, y), 'differencingmarks', [x, y]) }
}

for (const name of ['blazonorderings', 'chargecombos', 'differencingmarks', 'fieldsubsets', 'marshallingpairs', 'ordinaries', 'quarterings', 'tincturecount'] as const)
  hexRegisterOf('heraldry', name, (HeraldryFormulas[name] as (...x: unknown[]) => unknown).bind(HeraldryFormulas))
