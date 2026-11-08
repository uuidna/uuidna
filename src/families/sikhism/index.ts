import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SIKHISM — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'sikhism arithmetic (gurus, scripturepages, pillars, prayerorderings, articlesoffaith, hymncombos, communitymeals, devotionratio); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sikhism', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `sikhism.${name}`, params })

export class SikhismFormulas {
  static gurus(x: number, y: number): CrossFormula { return c('sikhism-gurus', 'gurus(x, y) = x + y', x + y, nat(x, y), 'gurus', [x, y]) }
  static scripturepages(x: number, y: number): CrossFormula { return c('sikhism-scripturepages', 'scripturepages(x, y) = x · y', x * y, nat(x, y), 'scripturepages', [x, y]) }
  static pillars(x: number, y: number): CrossFormula { return c('sikhism-pillars', 'pillars(x, y) = x + y', x + y, nat(x, y), 'pillars', [x, y]) }
  static prayerorderings(x: number): CrossFormula { return c('sikhism-prayerorderings', 'prayerorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'prayerorderings', [x]) }
  static articlesoffaith(x: number, y: number): CrossFormula { return c('sikhism-articlesoffaith', 'articlesoffaith(x, y) = x + y', x + y, nat(x, y), 'articlesoffaith', [x, y]) }
  static hymncombos(x: number, y: number): CrossFormula { return c('sikhism-hymncombos', 'hymncombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'hymncombos', [x, y]) }
  static communitymeals(x: number, y: number): CrossFormula { return c('sikhism-communitymeals', 'communitymeals(x, y) = x · y', x * y, nat(x, y), 'communitymeals', [x, y]) }
  static devotionratio(x: number, y: number): CrossFormula { return c('sikhism-devotionratio', 'devotionratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'devotionratio', [x, y]) }
}

for (const name of ['articlesoffaith', 'communitymeals', 'devotionratio', 'gurus', 'hymncombos', 'pillars', 'prayerorderings', 'scripturepages'] as const)
  hexRegisterOf('sikhism', name, (SikhismFormulas[name] as (...x: unknown[]) => unknown).bind(SikhismFormulas))
