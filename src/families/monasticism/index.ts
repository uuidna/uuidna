import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MONASTICISM — scaffolded integer measures crossed to sociology. Every output an exact finite nonnegative integer. */

const PROOF = 'monasticism arithmetic (hoursofprayer, ruleclauses, officeorderings, vowcombos, communitysize, dailycycle, silenceratio, obediencelevels); scaffolded from the integer-op palette; a measure crossed to sociology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'monasticism', dst: 'sociology', formula, value, proof: PROOF, ...extra }, holds, { name: `monasticism.${name}`, params })

export class MonasticismFormulas {
  static hoursofprayer(x: number, y: number): CrossFormula { return c('monasticism-hoursofprayer', 'hoursofprayer(x, y) = x + y', x + y, nat(x, y), 'hoursofprayer', [x, y]) }
  static ruleclauses(x: number, y: number): CrossFormula { return c('monasticism-ruleclauses', 'ruleclauses(x, y) = x · y', x * y, nat(x, y), 'ruleclauses', [x, y]) }
  static officeorderings(x: number): CrossFormula { return c('monasticism-officeorderings', 'officeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'officeorderings', [x]) }
  static vowcombos(x: number, y: number): CrossFormula { return c('monasticism-vowcombos', 'vowcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'vowcombos', [x, y]) }
  static communitysize(x: number, y: number): CrossFormula { return c('monasticism-communitysize', 'communitysize(x, y) = x · y', x * y, nat(x, y), 'communitysize', [x, y]) }
  static dailycycle(x: number, y: number): CrossFormula { return c('monasticism-dailycycle', 'dailycycle(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'dailycycle', [x, y]) }
  static silenceratio(x: number, y: number): CrossFormula { return c('monasticism-silenceratio', 'silenceratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'silenceratio', [x, y]) }
  static obediencelevels(x: number): CrossFormula { return c('monasticism-obediencelevels', 'obediencelevels(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'obediencelevels', [x]) }
}

for (const name of ['communitysize', 'dailycycle', 'hoursofprayer', 'obediencelevels', 'officeorderings', 'ruleclauses', 'silenceratio', 'vowcombos'] as const)
  hexRegisterOf('monasticism', name, (MonasticismFormulas[name] as (...x: unknown[]) => unknown).bind(MonasticismFormulas))
