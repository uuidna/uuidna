import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EXISTENTIALISM — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'existentialism arithmetic (freedomchoices, authenticitymodes, anguishindex, projectorderings, facticitypairs, badfaithratio, situationsubsets, becomingstages); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'existentialism', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `existentialism.${name}`, params })

export class ExistentialismFormulas {
  static freedomchoices(x: number): CrossFormula { return c('existentialism-freedomchoices', 'freedomchoices(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'freedomchoices', [x]) }
  static authenticitymodes(x: number, y: number): CrossFormula { return c('existentialism-authenticitymodes', 'authenticitymodes(x, y) = x + y', x + y, nat(x, y), 'authenticitymodes', [x, y]) }
  static anguishindex(x: number, y: number): CrossFormula { return c('existentialism-anguishindex', 'anguishindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'anguishindex', [x, y]) }
  static projectorderings(x: number): CrossFormula { return c('existentialism-projectorderings', 'projectorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'projectorderings', [x]) }
  static facticitypairs(x: number, y: number): CrossFormula { return c('existentialism-facticitypairs', 'facticitypairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'facticitypairs', [x, y]) }
  static badfaithratio(x: number, y: number): CrossFormula { return c('existentialism-badfaithratio', 'badfaithratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'badfaithratio', [x, y]) }
  static situationsubsets(x: number): CrossFormula { return c('existentialism-situationsubsets', 'situationsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'situationsubsets', [x]) }
  static becomingstages(x: number, y: number): CrossFormula { return c('existentialism-becomingstages', 'becomingstages(x, y) = x + y', x + y, nat(x, y), 'becomingstages', [x, y]) }
}

for (const name of ['anguishindex', 'authenticitymodes', 'badfaithratio', 'becomingstages', 'facticitypairs', 'freedomchoices', 'projectorderings', 'situationsubsets'] as const)
  hexRegisterOf('existentialism', name, (ExistentialismFormulas[name] as (...x: unknown[]) => unknown).bind(ExistentialismFormulas))
