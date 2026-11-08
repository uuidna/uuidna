import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHENOMENOLOGY — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'phenomenology arithmetic (intentionalacts, reductions, horizonlayers, noesisnoema, epochestages, experiencepairs, consciousnessmodes, givennessratio); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'phenomenology', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `phenomenology.${name}`, params })

export class PhenomenologyFormulas {
  static intentionalacts(x: number, y: number): CrossFormula { return c('phenomenology-intentionalacts', 'intentionalacts(x, y) = x + y', x + y, nat(x, y), 'intentionalacts', [x, y]) }
  static reductions(x: number, y: number): CrossFormula { return c('phenomenology-reductions', 'reductions(x, y) = x · y', x * y, nat(x, y), 'reductions', [x, y]) }
  static horizonlayers(x: number): CrossFormula { return c('phenomenology-horizonlayers', 'horizonlayers(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'horizonlayers', [x]) }
  static noesisnoema(x: number, y: number): CrossFormula { return c('phenomenology-noesisnoema', 'noesisnoema(x, y) = x · y', x * y, nat(x, y), 'noesisnoema', [x, y]) }
  static epochestages(x: number): CrossFormula { return c('phenomenology-epochestages', 'epochestages(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'epochestages', [x]) }
  static experiencepairs(x: number, y: number): CrossFormula { return c('phenomenology-experiencepairs', 'experiencepairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'experiencepairs', [x, y]) }
  static consciousnessmodes(x: number, y: number): CrossFormula { return c('phenomenology-consciousnessmodes', 'consciousnessmodes(x, y) = x + y', x + y, nat(x, y), 'consciousnessmodes', [x, y]) }
  static givennessratio(x: number, y: number): CrossFormula { return c('phenomenology-givennessratio', 'givennessratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'givennessratio', [x, y]) }
}

for (const name of ['consciousnessmodes', 'epochestages', 'experiencepairs', 'givennessratio', 'horizonlayers', 'intentionalacts', 'noesisnoema', 'reductions'] as const)
  hexRegisterOf('phenomenology', name, (PhenomenologyFormulas[name] as (...x: unknown[]) => unknown).bind(PhenomenologyFormulas))
