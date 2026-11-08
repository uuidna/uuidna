import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONFECTIONERY — scaffolded integer measures crossed to chemistry. Every output an exact finite nonnegative integer. */

const PROOF = 'confectionery arithmetic (sugarstage, crystalsize, temperaturecurve, temperingstages, cocoaratio, bloomtemp, recipecombos, yieldpct); scaffolded from the integer-op palette; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'confectionery', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `confectionery.${name}`, params })

export class ConfectioneryFormulas {
  static sugarstage(x: number, y: number): CrossFormula { return c('confectionery-sugarstage', 'sugarstage(x, y) = max(x, y)', Math.max(x, y), nat(x, y), 'sugarstage', [x, y]) }
  static crystalsize(x: number, y: number): CrossFormula { return c('confectionery-crystalsize', 'crystalsize(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'crystalsize', [x, y]) }
  static temperaturecurve(x: number, y: number): CrossFormula { return c('confectionery-temperaturecurve', 'temperaturecurve(x, y) = x · y', x * y, nat(x, y), 'temperaturecurve', [x, y]) }
  static temperingstages(x: number, y: number): CrossFormula { return c('confectionery-temperingstages', 'temperingstages(x, y) = x + y', x + y, nat(x, y), 'temperingstages', [x, y]) }
  static cocoaratio(x: number, y: number): CrossFormula { return c('confectionery-cocoaratio', 'cocoaratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'cocoaratio', [x, y]) }
  static bloomtemp(x: number, y: number): CrossFormula { return c('confectionery-bloomtemp', 'bloomtemp(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'bloomtemp', [x, y]) }
  static recipecombos(x: number, y: number): CrossFormula { return c('confectionery-recipecombos', 'recipecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'recipecombos', [x, y]) }
  static yieldpct(x: number, y: number): CrossFormula { return c('confectionery-yieldpct', 'yieldpct(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'yieldpct', [x, y]) }
}

for (const name of ['bloomtemp', 'cocoaratio', 'crystalsize', 'recipecombos', 'sugarstage', 'temperaturecurve', 'temperingstages', 'yieldpct'] as const)
  hexRegisterOf('confectionery', name, (ConfectioneryFormulas[name] as (...x: unknown[]) => unknown).bind(ConfectioneryFormulas))
