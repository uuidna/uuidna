import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STOICISM — scaffolded integer measures crossed to psychology. Every output an exact finite nonnegative integer. */

const PROOF = 'stoicism arithmetic (virtues, dichotomypairs, passionstates, controlratio, disciplineorderings, impressionfilters, apatheiaindex, preferredindifferents); scaffolded from the integer-op palette; a measure crossed to psychology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'stoicism', dst: 'psychology', formula, value, proof: PROOF, ...extra }, holds, { name: `stoicism.${name}`, params })

export class StoicismFormulas {
  static virtues(x: number, y: number): CrossFormula { return c('stoicism-virtues', 'virtues(x, y) = x + y', x + y, nat(x, y), 'virtues', [x, y]) }
  static dichotomypairs(x: number, y: number): CrossFormula { return c('stoicism-dichotomypairs', 'dichotomypairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'dichotomypairs', [x, y]) }
  static passionstates(x: number): CrossFormula { return c('stoicism-passionstates', 'passionstates(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'passionstates', [x]) }
  static controlratio(x: number, y: number): CrossFormula { return c('stoicism-controlratio', 'controlratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'controlratio', [x, y]) }
  static disciplineorderings(x: number): CrossFormula { return c('stoicism-disciplineorderings', 'disciplineorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'disciplineorderings', [x]) }
  static impressionfilters(x: number, y: number): CrossFormula { return c('stoicism-impressionfilters', 'impressionfilters(x, y) = x · y', x * y, nat(x, y), 'impressionfilters', [x, y]) }
  static apatheiaindex(x: number, y: number): CrossFormula { return c('stoicism-apatheiaindex', 'apatheiaindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'apatheiaindex', [x, y]) }
  static preferredindifferents(x: number, y: number): CrossFormula { return c('stoicism-preferredindifferents', 'preferredindifferents(x, y) = x + y', x + y, nat(x, y), 'preferredindifferents', [x, y]) }
}

for (const name of ['apatheiaindex', 'controlratio', 'dichotomypairs', 'disciplineorderings', 'impressionfilters', 'passionstates', 'preferredindifferents', 'virtues'] as const)
  hexRegisterOf('stoicism', name, (StoicismFormulas[name] as (...x: unknown[]) => unknown).bind(StoicismFormulas))
