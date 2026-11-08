import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** EPISTEMOLOGY — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'epistemology arithmetic (beliefstates, justificationpaths, evidencecombos, certaintydegree, inferencedepth, gettiercases, truthconditions, doubtmargin); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'epistemology', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `epistemology.${name}`, params })

export class EpistemologyFormulas {
  static beliefstates(x: number): CrossFormula { return c('epistemology-beliefstates', 'beliefstates(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'beliefstates', [x]) }
  static justificationpaths(x: number): CrossFormula { return c('epistemology-justificationpaths', 'justificationpaths(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'justificationpaths', [x]) }
  static evidencecombos(x: number, y: number): CrossFormula { return c('epistemology-evidencecombos', 'evidencecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'evidencecombos', [x, y]) }
  static certaintydegree(x: number, y: number): CrossFormula { return c('epistemology-certaintydegree', 'certaintydegree(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'certaintydegree', [x, y]) }
  static inferencedepth(x: number, y: number): CrossFormula { return c('epistemology-inferencedepth', 'inferencedepth(x, y) = x + y', x + y, nat(x, y), 'inferencedepth', [x, y]) }
  static gettiercases(x: number, y: number): CrossFormula { return c('epistemology-gettiercases', 'gettiercases(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'gettiercases', [x, y]) }
  static truthconditions(x: number): CrossFormula { return c('epistemology-truthconditions', 'truthconditions(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'truthconditions', [x]) }
  static doubtmargin(x: number, y: number): CrossFormula { return c('epistemology-doubtmargin', 'doubtmargin(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'doubtmargin', [x, y]) }
}

for (const name of ['beliefstates', 'certaintydegree', 'doubtmargin', 'evidencecombos', 'gettiercases', 'inferencedepth', 'justificationpaths', 'truthconditions'] as const)
  hexRegisterOf('epistemology', name, (EpistemologyFormulas[name] as (...x: unknown[]) => unknown).bind(EpistemologyFormulas))
