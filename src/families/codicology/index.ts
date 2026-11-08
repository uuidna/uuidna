import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CODICOLOGY — scaffolded integer measures crossed to linguistics. Every output an exact finite nonnegative integer. */

const PROOF = 'codicology arithmetic (quires, foliocount, gatheringorderings, collationpairs, rulingpatterns, inkcombos, bindingstages, completeness); scaffolded from the integer-op palette; a measure crossed to linguistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'codicology', dst: 'linguistics', formula, value, proof: PROOF, ...extra }, holds, { name: `codicology.${name}`, params })

export class CodicologyFormulas {
  static quires(x: number, y: number): CrossFormula { return c('codicology-quires', 'quires(x, y) = x + y', x + y, nat(x, y), 'quires', [x, y]) }
  static foliocount(x: number, y: number): CrossFormula { return c('codicology-foliocount', 'foliocount(x, y) = x · y', x * y, nat(x, y), 'foliocount', [x, y]) }
  static gatheringorderings(x: number): CrossFormula { return c('codicology-gatheringorderings', 'gatheringorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'gatheringorderings', [x]) }
  static collationpairs(x: number, y: number): CrossFormula { return c('codicology-collationpairs', 'collationpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'collationpairs', [x, y]) }
  static rulingpatterns(x: number): CrossFormula { return c('codicology-rulingpatterns', 'rulingpatterns(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'rulingpatterns', [x]) }
  static inkcombos(x: number, y: number): CrossFormula { return c('codicology-inkcombos', 'inkcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'inkcombos', [x, y]) }
  static bindingstages(x: number, y: number): CrossFormula { return c('codicology-bindingstages', 'bindingstages(x, y) = x + y', x + y, nat(x, y), 'bindingstages', [x, y]) }
  static completeness(x: number, y: number): CrossFormula { return c('codicology-completeness', 'completeness(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'completeness', [x, y]) }
}

for (const name of ['bindingstages', 'collationpairs', 'completeness', 'foliocount', 'gatheringorderings', 'inkcombos', 'quires', 'rulingpatterns'] as const)
  hexRegisterOf('codicology', name, (CodicologyFormulas[name] as (...x: unknown[]) => unknown).bind(CodicologyFormulas))
