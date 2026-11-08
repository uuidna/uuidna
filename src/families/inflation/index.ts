import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INFLATION — scaffolded integer measures crossed to macroeconomics. Every output an exact finite nonnegative integer. */

const PROOF = 'inflation arithmetic (cpi, ratepct, realvalue, pricelevel, purchasingpower, indexorderings, basketitems, erosion); scaffolded from the integer-op palette; a measure crossed to macroeconomics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'inflation', dst: 'macroeconomics', formula, value, proof: PROOF, ...extra }, holds, { name: `inflation.${name}`, params })

export class InflationFormulas {
  static cpi(x: number, y: number): CrossFormula { return c('inflation-cpi', 'cpi(x, y) = x · y', x * y, nat(x, y), 'cpi', [x, y]) }
  static ratepct(x: number, y: number): CrossFormula { return c('inflation-ratepct', 'ratepct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'ratepct', [x, y]) }
  static realvalue(x: number, y: number): CrossFormula { return c('inflation-realvalue', 'realvalue(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'realvalue', [x, y]) }
  static pricelevel(x: number, y: number): CrossFormula { return c('inflation-pricelevel', 'pricelevel(x, y) = x + y', x + y, nat(x, y), 'pricelevel', [x, y]) }
  static purchasingpower(x: number, y: number): CrossFormula { return c('inflation-purchasingpower', 'purchasingpower(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'purchasingpower', [x, y]) }
  static indexorderings(x: number): CrossFormula { return c('inflation-indexorderings', 'indexorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'indexorderings', [x]) }
  static basketitems(x: number, y: number): CrossFormula { return c('inflation-basketitems', 'basketitems(x, y) = x · y', x * y, nat(x, y), 'basketitems', [x, y]) }
  static erosion(x: number, y: number): CrossFormula { return c('inflation-erosion', 'erosion(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'erosion', [x, y]) }
}

for (const name of ['basketitems', 'cpi', 'erosion', 'indexorderings', 'pricelevel', 'purchasingpower', 'ratepct', 'realvalue'] as const)
  hexRegisterOf('inflation', name, (InflationFormulas[name] as (...x: unknown[]) => unknown).bind(InflationFormulas))
