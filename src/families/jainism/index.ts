import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** JAINISM — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'jainism arithmetic (vows, principles, tirthankaras, karmatypes, substancecombos, stageorderings, nonviolencelevels, liberationpaths); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'jainism', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `jainism.${name}`, params })

export class JainismFormulas {
  static vows(x: number, y: number): CrossFormula { return c('jainism-vows', 'vows(x, y) = x + y', x + y, nat(x, y), 'vows', [x, y]) }
  static principles(x: number, y: number): CrossFormula { return c('jainism-principles', 'principles(x, y) = x + y', x + y, nat(x, y), 'principles', [x, y]) }
  static tirthankaras(x: number, y: number): CrossFormula { return c('jainism-tirthankaras', 'tirthankaras(x, y) = x + y', x + y, nat(x, y), 'tirthankaras', [x, y]) }
  static karmatypes(x: number, y: number): CrossFormula { return c('jainism-karmatypes', 'karmatypes(x, y) = x + y', x + y, nat(x, y), 'karmatypes', [x, y]) }
  static substancecombos(x: number, y: number): CrossFormula { return c('jainism-substancecombos', 'substancecombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'substancecombos', [x, y]) }
  static stageorderings(x: number): CrossFormula { return c('jainism-stageorderings', 'stageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stageorderings', [x]) }
  static nonviolencelevels(x: number, y: number): CrossFormula { return c('jainism-nonviolencelevels', 'nonviolencelevels(x, y) = x + y', x + y, nat(x, y), 'nonviolencelevels', [x, y]) }
  static liberationpaths(x: number): CrossFormula { return c('jainism-liberationpaths', 'liberationpaths(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'liberationpaths', [x]) }
}

for (const name of ['karmatypes', 'liberationpaths', 'nonviolencelevels', 'principles', 'stageorderings', 'substancecombos', 'tirthankaras', 'vows'] as const)
  hexRegisterOf('jainism', name, (JainismFormulas[name] as (...x: unknown[]) => unknown).bind(JainismFormulas))
