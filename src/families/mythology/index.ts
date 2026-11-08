import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MYTHOLOGY — scaffolded integer measures crossed to anthropology. Every output an exact finite nonnegative integer. */

const PROOF = 'mythology arithmetic (pantheonsize, deitypairs, archetypecount, narrativeorderings, motifsubsets, genealogylinks, questcombos, variantcount); scaffolded from the integer-op palette; a measure crossed to anthropology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mythology', dst: 'anthropology', formula, value, proof: PROOF, ...extra }, holds, { name: `mythology.${name}`, params })

export class MythologyFormulas {
  static pantheonsize(x: number, y: number): CrossFormula { return c('mythology-pantheonsize', 'pantheonsize(x, y) = x + y', x + y, nat(x, y), 'pantheonsize', [x, y]) }
  static deitypairs(x: number, y: number): CrossFormula { return c('mythology-deitypairs', 'deitypairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'deitypairs', [x, y]) }
  static archetypecount(x: number, y: number): CrossFormula { return c('mythology-archetypecount', 'archetypecount(x, y) = x · y', x * y, nat(x, y), 'archetypecount', [x, y]) }
  static narrativeorderings(x: number): CrossFormula { return c('mythology-narrativeorderings', 'narrativeorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'narrativeorderings', [x]) }
  static motifsubsets(x: number): CrossFormula { return c('mythology-motifsubsets', 'motifsubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'motifsubsets', [x]) }
  static genealogylinks(x: number, y: number): CrossFormula { return c('mythology-genealogylinks', 'genealogylinks(x, y) = x · y', x * y, nat(x, y), 'genealogylinks', [x, y]) }
  static questcombos(x: number, y: number): CrossFormula { return c('mythology-questcombos', 'questcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'questcombos', [x, y]) }
  static variantcount(x: number, y: number): CrossFormula { return c('mythology-variantcount', 'variantcount(x, y) = x + y', x + y, nat(x, y), 'variantcount', [x, y]) }
}

for (const name of ['archetypecount', 'deitypairs', 'genealogylinks', 'motifsubsets', 'narrativeorderings', 'pantheonsize', 'questcombos', 'variantcount'] as const)
  hexRegisterOf('mythology', name, (MythologyFormulas[name] as (...x: unknown[]) => unknown).bind(MythologyFormulas))
