import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BUTCHERY — scaffolded integer measures crossed to agriculture. Every output an exact finite nonnegative integer. */

const PROOF = 'butchery arithmetic (yield, primalcuts, weightkg, cutcombos, boneratio, aginggraysdays, portionsper, gradescore); scaffolded from the integer-op palette; a measure crossed to agriculture'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'butchery', dst: 'agriculture', formula, value, proof: PROOF, ...extra }, holds, { name: `butchery.${name}`, params })

export class ButcheryFormulas {
  static yield(x: number, y: number): CrossFormula { return c('butchery-yield', 'yield(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'yield', [x, y]) }
  static primalcuts(x: number, y: number): CrossFormula { return c('butchery-primalcuts', 'primalcuts(x, y) = x + y', x + y, nat(x, y), 'primalcuts', [x, y]) }
  static weightkg(x: number, y: number): CrossFormula { return c('butchery-weightkg', 'weightkg(x, y) = x · y', x * y, nat(x, y), 'weightkg', [x, y]) }
  static cutcombos(x: number, y: number): CrossFormula { return c('butchery-cutcombos', 'cutcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'cutcombos', [x, y]) }
  static boneratio(x: number, y: number): CrossFormula { return c('butchery-boneratio', 'boneratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'boneratio', [x, y]) }
  static aginggraysdays(x: number, y: number): CrossFormula { return c('butchery-aginggraysdays', 'aginggraysdays(x, y) = x · y', x * y, nat(x, y), 'aginggraysdays', [x, y]) }
  static portionsper(x: number, y: number): CrossFormula { return c('butchery-portionsper', 'portionsper(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'portionsper', [x, y]) }
  static gradescore(x: number, y: number): CrossFormula { return c('butchery-gradescore', 'gradescore(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'gradescore', [x, y]) }
}

for (const name of ['aginggraysdays', 'boneratio', 'cutcombos', 'gradescore', 'portionsper', 'primalcuts', 'weightkg', 'yield'] as const)
  hexRegisterOf('butchery', name, (ButcheryFormulas[name] as (...x: unknown[]) => unknown).bind(ButcheryFormulas))
