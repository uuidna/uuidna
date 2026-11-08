import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SHINTO — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'shinto arithmetic (kamicount, shrinecombos, ritualstages, purificationtypes, festivaldays, offeringsubsets, prayerpairs, harmonyratio); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'shinto', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `shinto.${name}`, params })

export class ShintoFormulas {
  static kamicount(x: number, y: number): CrossFormula { return c('shinto-kamicount', 'kamicount(x, y) = x · y', x * y, nat(x, y), 'kamicount', [x, y]) }
  static shrinecombos(x: number, y: number): CrossFormula { return c('shinto-shrinecombos', 'shrinecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'shrinecombos', [x, y]) }
  static ritualstages(x: number): CrossFormula { return c('shinto-ritualstages', 'ritualstages(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'ritualstages', [x]) }
  static purificationtypes(x: number, y: number): CrossFormula { return c('shinto-purificationtypes', 'purificationtypes(x, y) = x + y', x + y, nat(x, y), 'purificationtypes', [x, y]) }
  static festivaldays(x: number, y: number): CrossFormula { return c('shinto-festivaldays', 'festivaldays(x, y) = x · y', x * y, nat(x, y), 'festivaldays', [x, y]) }
  static offeringsubsets(x: number): CrossFormula { return c('shinto-offeringsubsets', 'offeringsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'offeringsubsets', [x]) }
  static prayerpairs(x: number, y: number): CrossFormula { return c('shinto-prayerpairs', 'prayerpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'prayerpairs', [x, y]) }
  static harmonyratio(x: number, y: number): CrossFormula { return c('shinto-harmonyratio', 'harmonyratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'harmonyratio', [x, y]) }
}

for (const name of ['festivaldays', 'harmonyratio', 'kamicount', 'offeringsubsets', 'prayerpairs', 'purificationtypes', 'ritualstages', 'shrinecombos'] as const)
  hexRegisterOf('shinto', name, (ShintoFormulas[name] as (...x: unknown[]) => unknown).bind(ShintoFormulas))
