import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** QSEC — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'qsec arithmetic (keybits, entropybits, attemptpairs, hashrounds, collisionresistance, attackcost, saltlength, strengthmargin); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'qsec', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `qsec.${name}`, params })

export class QsecFormulas {
  static keybits(x: number): CrossFormula { return c('qsec-keybits', 'keybits(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'keybits', [x]) }
  static entropybits(x: number, y: number): CrossFormula { return c('qsec-entropybits', 'entropybits(x, y) = x · y', x * y, nat(x, y), 'entropybits', [x, y]) }
  static attemptpairs(x: number, y: number): CrossFormula { return c('qsec-attemptpairs', 'attemptpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'attemptpairs', [x, y]) }
  static hashrounds(x: number, y: number): CrossFormula { return c('qsec-hashrounds', 'hashrounds(x, y) = x · y', x * y, nat(x, y), 'hashrounds', [x, y]) }
  static collisionresistance(x: number, y: number): CrossFormula { return c('qsec-collisionresistance', 'collisionresistance(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'collisionresistance', [x, y]) }
  static attackcost(x: number): CrossFormula { return c('qsec-attackcost', 'attackcost(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'attackcost', [x]) }
  static saltlength(x: number, y: number): CrossFormula { return c('qsec-saltlength', 'saltlength(x, y) = x + y', x + y, nat(x, y), 'saltlength', [x, y]) }
  static strengthmargin(x: number, y: number): CrossFormula { return c('qsec-strengthmargin', 'strengthmargin(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'strengthmargin', [x, y]) }
}

for (const name of ['attackcost', 'attemptpairs', 'collisionresistance', 'entropybits', 'hashrounds', 'keybits', 'saltlength', 'strengthmargin'] as const)
  hexRegisterOf('qsec', name, (QsecFormulas[name] as (...x: unknown[]) => unknown).bind(QsecFormulas))
