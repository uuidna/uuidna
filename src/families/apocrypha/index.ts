import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** APOCRYPHA — scaffolded integer measures crossed to statistics. Every output an exact finite nonnegative integer. */

const PROOF = 'apocrypha arithmetic (bookcount, readingorders, inclusionsubsets, canonpairs, disputedratio, versetotal, manuscriptcombos, orderingchoices); scaffolded from the integer-op palette; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'apocrypha', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `apocrypha.${name}`, params })

export class ApocryphaFormulas {
  static bookcount(x: number, y: number): CrossFormula { return c('apocrypha-bookcount', 'bookcount(x, y) = x + y', x + y, nat(x, y), 'bookcount', [x, y]) }
  static readingorders(x: number): CrossFormula { return c('apocrypha-readingorders', 'readingorders(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'readingorders', [x]) }
  static inclusionsubsets(x: number): CrossFormula { return c('apocrypha-inclusionsubsets', 'inclusionsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'inclusionsubsets', [x]) }
  static canonpairs(x: number, y: number): CrossFormula { return c('apocrypha-canonpairs', 'canonpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'canonpairs', [x, y]) }
  static disputedratio(x: number, y: number): CrossFormula { return c('apocrypha-disputedratio', 'disputedratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'disputedratio', [x, y]) }
  static versetotal(x: number, y: number): CrossFormula { return c('apocrypha-versetotal', 'versetotal(x, y) = x · y', x * y, nat(x, y), 'versetotal', [x, y]) }
  static manuscriptcombos(x: number, y: number): CrossFormula { return c('apocrypha-manuscriptcombos', 'manuscriptcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'manuscriptcombos', [x, y]) }
  static orderingchoices(x: number, y: number): CrossFormula { return c('apocrypha-orderingchoices', 'orderingchoices(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'orderingchoices', [x, y]) }
}

for (const name of ['bookcount', 'canonpairs', 'disputedratio', 'inclusionsubsets', 'manuscriptcombos', 'orderingchoices', 'readingorders', 'versetotal'] as const)
  hexRegisterOf('apocrypha', name, (ApocryphaFormulas[name] as (...x: unknown[]) => unknown).bind(ApocryphaFormulas))
