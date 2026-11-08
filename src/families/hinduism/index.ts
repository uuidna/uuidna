import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HINDUISM — scaffolded integer measures crossed to philosophy. Every output an exact finite nonnegative integer. */

const PROOF = 'hinduism arithmetic (vedas, deitycombos, yogapaths, mantrarepetitions, chakras, versesum, stageorderings, gunasubsets); scaffolded from the integer-op palette; a measure crossed to philosophy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hinduism', dst: 'philosophy', formula, value, proof: PROOF, ...extra }, holds, { name: `hinduism.${name}`, params })

export class HinduismFormulas {
  static vedas(x: number, y: number): CrossFormula { return c('hinduism-vedas', 'vedas(x, y) = x + y', x + y, nat(x, y), 'vedas', [x, y]) }
  static deitycombos(x: number, y: number): CrossFormula { return c('hinduism-deitycombos', 'deitycombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'deitycombos', [x, y]) }
  static yogapaths(x: number, y: number): CrossFormula { return c('hinduism-yogapaths', 'yogapaths(x, y) = x + y', x + y, nat(x, y), 'yogapaths', [x, y]) }
  static mantrarepetitions(x: number, y: number): CrossFormula { return c('hinduism-mantrarepetitions', 'mantrarepetitions(x, y) = x · y', x * y, nat(x, y), 'mantrarepetitions', [x, y]) }
  static chakras(x: number, y: number): CrossFormula { return c('hinduism-chakras', 'chakras(x, y) = x + y', x + y, nat(x, y), 'chakras', [x, y]) }
  static versesum(x: number, y: number): CrossFormula { return c('hinduism-versesum', 'versesum(x, y) = x · y', x * y, nat(x, y), 'versesum', [x, y]) }
  static stageorderings(x: number): CrossFormula { return c('hinduism-stageorderings', 'stageorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'stageorderings', [x]) }
  static gunasubsets(x: number): CrossFormula { return c('hinduism-gunasubsets', 'gunasubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'gunasubsets', [x]) }
}

for (const name of ['chakras', 'deitycombos', 'gunasubsets', 'mantrarepetitions', 'stageorderings', 'vedas', 'versesum', 'yogapaths'] as const)
  hexRegisterOf('hinduism', name, (HinduismFormulas[name] as (...x: unknown[]) => unknown).bind(HinduismFormulas))
