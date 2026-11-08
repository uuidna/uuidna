import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ZOROASTRIANISM — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'zoroastrianism arithmetic (principles, amesha, dualitypairs, hymncount, fireranks, prayerorderings, gathasubsets, cosmiccycles); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'zoroastrianism', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `zoroastrianism.${name}`, params })

export class ZoroastrianismFormulas {
  static principles(x: number, y: number): CrossFormula { return c('zoroastrianism-principles', 'principles(x, y) = x + y', x + y, nat(x, y), 'principles', [x, y]) }
  static amesha(x: number, y: number): CrossFormula { return c('zoroastrianism-amesha', 'amesha(x, y) = x + y', x + y, nat(x, y), 'amesha', [x, y]) }
  static dualitypairs(x: number, y: number): CrossFormula { return c('zoroastrianism-dualitypairs', 'dualitypairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'dualitypairs', [x, y]) }
  static hymncount(x: number, y: number): CrossFormula { return c('zoroastrianism-hymncount', 'hymncount(x, y) = x · y', x * y, nat(x, y), 'hymncount', [x, y]) }
  static fireranks(x: number, y: number): CrossFormula { return c('zoroastrianism-fireranks', 'fireranks(x, y) = x + y', x + y, nat(x, y), 'fireranks', [x, y]) }
  static prayerorderings(x: number): CrossFormula { return c('zoroastrianism-prayerorderings', 'prayerorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'prayerorderings', [x]) }
  static gathasubsets(x: number): CrossFormula { return c('zoroastrianism-gathasubsets', 'gathasubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'gathasubsets', [x]) }
  static cosmiccycles(x: number, y: number): CrossFormula { return c('zoroastrianism-cosmiccycles', 'cosmiccycles(x, y) = x · y', x * y, nat(x, y), 'cosmiccycles', [x, y]) }
}

for (const name of ['amesha', 'cosmiccycles', 'dualitypairs', 'fireranks', 'gathasubsets', 'hymncount', 'prayerorderings', 'principles'] as const)
  hexRegisterOf('zoroastrianism', name, (ZoroastrianismFormulas[name] as (...x: unknown[]) => unknown).bind(ZoroastrianismFormulas))
