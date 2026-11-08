import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MYSTICISM — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'mysticism arithmetic (stages, ascentorderings, unionstates, virtuecombos, contemplationlevels, darknesslight, numberpaths, illuminationratio); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mysticism', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `mysticism.${name}`, params })

export class MysticismFormulas {
  static stages(x: number, y: number): CrossFormula { return c('mysticism-stages', 'stages(x, y) = x + y', x + y, nat(x, y), 'stages', [x, y]) }
  static ascentorderings(x: number): CrossFormula { return c('mysticism-ascentorderings', 'ascentorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'ascentorderings', [x]) }
  static unionstates(x: number): CrossFormula { return c('mysticism-unionstates', 'unionstates(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'unionstates', [x]) }
  static virtuecombos(x: number, y: number): CrossFormula { return c('mysticism-virtuecombos', 'virtuecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'virtuecombos', [x, y]) }
  static contemplationlevels(x: number, y: number): CrossFormula { return c('mysticism-contemplationlevels', 'contemplationlevels(x, y) = x · y', x * y, nat(x, y), 'contemplationlevels', [x, y]) }
  static darknesslight(x: number, y: number): CrossFormula { return c('mysticism-darknesslight', 'darknesslight(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'darknesslight', [x, y]) }
  static numberpaths(x: number, y: number): CrossFormula { return c('mysticism-numberpaths', 'numberpaths(x, y) = x! / (x − y)!', x >= y && x <= 20 ? ((n: number, k: number) => { let r = 1; for (let i = 0; i < k; i++) r *= (n - i); return r })(x, y) : 0, nat(x, y) && x >= y && x <= 20, 'numberpaths', [x, y]) }
  static illuminationratio(x: number, y: number): CrossFormula { return c('mysticism-illuminationratio', 'illuminationratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'illuminationratio', [x, y]) }
}

for (const name of ['ascentorderings', 'contemplationlevels', 'darknesslight', 'illuminationratio', 'numberpaths', 'stages', 'unionstates', 'virtuecombos'] as const)
  hexRegisterOf('mysticism', name, (MysticismFormulas[name] as (...x: unknown[]) => unknown).bind(MysticismFormulas))
