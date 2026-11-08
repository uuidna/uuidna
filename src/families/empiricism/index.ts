import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EMPIRICISM — scaffolded integer measures crossed to logic. Every output an exact finite nonnegative integer. */

const PROOF = 'empiricism arithmetic (observations, inductionsteps, evidencecombos, hypothesissubsets, confirmationratio, samplepairs, generalizationpaths, certaintydegree); scaffolded from the integer-op palette; a measure crossed to logic'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'empiricism', dst: 'logic', formula, value, proof: PROOF, ...extra }, holds, { name: `empiricism.${name}`, params })

export class EmpiricismFormulas {
  static observations(x: number, y: number): CrossFormula { return c('empiricism-observations', 'observations(x, y) = x · y', x * y, nat(x, y), 'observations', [x, y]) }
  static inductionsteps(x: number, y: number): CrossFormula { return c('empiricism-inductionsteps', 'inductionsteps(x, y) = x + y', x + y, nat(x, y), 'inductionsteps', [x, y]) }
  static evidencecombos(x: number, y: number): CrossFormula { return c('empiricism-evidencecombos', 'evidencecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'evidencecombos', [x, y]) }
  static hypothesissubsets(x: number): CrossFormula { return c('empiricism-hypothesissubsets', 'hypothesissubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'hypothesissubsets', [x]) }
  static confirmationratio(x: number, y: number): CrossFormula { return c('empiricism-confirmationratio', 'confirmationratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'confirmationratio', [x, y]) }
  static samplepairs(x: number, y: number): CrossFormula { return c('empiricism-samplepairs', 'samplepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'samplepairs', [x, y]) }
  static generalizationpaths(x: number, y: number): CrossFormula { return c('empiricism-generalizationpaths', 'generalizationpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'generalizationpaths', [x, y]) }
  static certaintydegree(x: number, y: number): CrossFormula { return c('empiricism-certaintydegree', 'certaintydegree(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'certaintydegree', [x, y]) }
}

for (const name of ['certaintydegree', 'confirmationratio', 'evidencecombos', 'generalizationpaths', 'hypothesissubsets', 'inductionsteps', 'observations', 'samplepairs'] as const)
  hexRegisterOf('empiricism', name, (EmpiricismFormulas[name] as (...x: unknown[]) => unknown).bind(EmpiricismFormulas))
