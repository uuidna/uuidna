import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HERMENEUTICS — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'hermeneutics arithmetic (interpretivelayers, methodcombos, contextfactors, principleorderings, ambiguityspread, lensselections, framingchoices, consensusratio); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hermeneutics', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `hermeneutics.${name}`, params })

export class HermeneuticsFormulas {
  static interpretivelayers(x: number): CrossFormula { return c('hermeneutics-interpretivelayers', 'interpretivelayers(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'interpretivelayers', [x]) }
  static methodcombos(x: number, y: number): CrossFormula { return c('hermeneutics-methodcombos', 'methodcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'methodcombos', [x, y]) }
  static contextfactors(x: number, y: number, z: number): CrossFormula { return c('hermeneutics-contextfactors', 'contextfactors(x, y, z) = x + y + z', x + y + z, nat(x, y, z), 'contextfactors', [x, y, z]) }
  static principleorderings(x: number): CrossFormula { return c('hermeneutics-principleorderings', 'principleorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'principleorderings', [x]) }
  static ambiguityspread(x: number, y: number): CrossFormula { return c('hermeneutics-ambiguityspread', 'ambiguityspread(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'ambiguityspread', [x, y]) }
  static lensselections(x: number, y: number): CrossFormula { return c('hermeneutics-lensselections', 'lensselections(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'lensselections', [x, y]) }
  static framingchoices(x: number, y: number): CrossFormula { return c('hermeneutics-framingchoices', 'framingchoices(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'framingchoices', [x, y]) }
  static consensusratio(x: number, y: number): CrossFormula { return c('hermeneutics-consensusratio', 'consensusratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'consensusratio', [x, y]) }
}

for (const name of ['ambiguityspread', 'consensusratio', 'contextfactors', 'framingchoices', 'interpretivelayers', 'lensselections', 'methodcombos', 'principleorderings'] as const)
  hexRegisterOf('hermeneutics', name, (HermeneuticsFormulas[name] as (...x: unknown[]) => unknown).bind(HermeneuticsFormulas))
