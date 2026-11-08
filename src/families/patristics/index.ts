import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PATRISTICS — scaffolded integer measures crossed to sociology. Every output an exact finite nonnegative integer. */

const PROOF = 'patristics arithmetic (fathercount, worksorderings, councilcombos, influencepairs, eracount, translationways, citationtotal, orthodoxyratio); scaffolded from the integer-op palette; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'patristics', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `patristics.${name}`, params })

export class PatristicsFormulas {
  static fathercount(x: number, y: number): CrossFormula { return c('patristics-fathercount', 'fathercount(x, y) = x + y', x + y, nat(x, y), 'fathercount', [x, y]) }
  static worksorderings(x: number): CrossFormula { return c('patristics-worksorderings', 'worksorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'worksorderings', [x]) }
  static councilcombos(x: number, y: number): CrossFormula { return c('patristics-councilcombos', 'councilcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'councilcombos', [x, y]) }
  static influencepairs(x: number, y: number): CrossFormula { return c('patristics-influencepairs', 'influencepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'influencepairs', [x, y]) }
  static eracount(x: number, y: number): CrossFormula { return c('patristics-eracount', 'eracount(x, y) = x + y', x + y, nat(x, y), 'eracount', [x, y]) }
  static translationways(x: number, y: number): CrossFormula { return c('patristics-translationways', 'translationways(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'translationways', [x, y]) }
  static citationtotal(x: number, y: number): CrossFormula { return c('patristics-citationtotal', 'citationtotal(x, y) = x · y', x * y, nat(x, y), 'citationtotal', [x, y]) }
  static orthodoxyratio(x: number, y: number): CrossFormula { return c('patristics-orthodoxyratio', 'orthodoxyratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'orthodoxyratio', [x, y]) }
}

for (const name of ['citationtotal', 'councilcombos', 'eracount', 'fathercount', 'influencepairs', 'orthodoxyratio', 'translationways', 'worksorderings'] as const)
  hexRegisterOf('patristics', name, (PatristicsFormulas[name] as (...x: unknown[]) => unknown).bind(PatristicsFormulas))
