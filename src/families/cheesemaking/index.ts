import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHEESEMAKING — scaffolded integer measures crossed to microbiology. Every output an exact finite nonnegative integer. */

const PROOF = 'cheesemaking arithmetic (yield, culturestrains, phlevel, agingdays, moisture, rennetdrops, saltpct, culturecombos); scaffolded from the integer-op palette; a measure crossed to microbiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cheesemaking', dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `cheesemaking.${name}`, params })

export class CheesemakingFormulas {
  static yield(x: number, y: number): CrossFormula { return c('cheesemaking-yield', 'yield(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'yield', [x, y]) }
  static culturestrains(x: number, y: number): CrossFormula { return c('cheesemaking-culturestrains', 'culturestrains(x, y) = x + y', x + y, nat(x, y), 'culturestrains', [x, y]) }
  static phlevel(x: number, y: number): CrossFormula { return c('cheesemaking-phlevel', 'phlevel(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'phlevel', [x, y]) }
  static agingdays(x: number, y: number): CrossFormula { return c('cheesemaking-agingdays', 'agingdays(x, y) = x · y', x * y, nat(x, y), 'agingdays', [x, y]) }
  static moisture(x: number, y: number): CrossFormula { return c('cheesemaking-moisture', 'moisture(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'moisture', [x, y]) }
  static rennetdrops(x: number, y: number): CrossFormula { return c('cheesemaking-rennetdrops', 'rennetdrops(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'rennetdrops', [x, y]) }
  static saltpct(x: number, y: number): CrossFormula { return c('cheesemaking-saltpct', 'saltpct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'saltpct', [x, y]) }
  static culturecombos(x: number, y: number): CrossFormula { return c('cheesemaking-culturecombos', 'culturecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'culturecombos', [x, y]) }
}

for (const name of ['agingdays', 'culturecombos', 'culturestrains', 'moisture', 'phlevel', 'rennetdrops', 'saltpct', 'yield'] as const)
  hexRegisterOf('cheesemaking', name, (CheesemakingFormulas[name] as (...x: unknown[]) => unknown).bind(CheesemakingFormulas))
