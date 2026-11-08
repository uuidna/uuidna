import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CHOREOGRAPHY — scaffolded integer measures crossed to kinematics. Every output an exact finite nonnegative integer. */

const PROOF = 'choreography arithmetic (dancers, formationorderings, stepcombos, beatspermeasure, symmetrygroups, phrasecount, spacingmeters, syncratio); scaffolded from the integer-op palette; a measure crossed to kinematics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'choreography', dst: 'kinematics', formula, value, proof: PROOF, ...extra }, holds, { name: `choreography.${name}`, params })

export class ChoreographyFormulas {
  static dancers(x: number, y: number): CrossFormula { return c('choreography-dancers', 'dancers(x, y) = x + y', x + y, nat(x, y), 'dancers', [x, y]) }
  static formationorderings(x: number): CrossFormula { return c('choreography-formationorderings', 'formationorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'formationorderings', [x]) }
  static stepcombos(x: number, y: number): CrossFormula { return c('choreography-stepcombos', 'stepcombos(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'stepcombos', [x, y]) }
  static beatspermeasure(x: number, y: number): CrossFormula { return c('choreography-beatspermeasure', 'beatspermeasure(x, y) = x · y', x * y, nat(x, y), 'beatspermeasure', [x, y]) }
  static symmetrygroups(x: number): CrossFormula { return c('choreography-symmetrygroups', 'symmetrygroups(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'symmetrygroups', [x]) }
  static phrasecount(x: number, y: number): CrossFormula { return c('choreography-phrasecount', 'phrasecount(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'phrasecount', [x, y]) }
  static spacingmeters(x: number, y: number): CrossFormula { return c('choreography-spacingmeters', 'spacingmeters(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'spacingmeters', [x, y]) }
  static syncratio(x: number, y: number): CrossFormula { return c('choreography-syncratio', 'syncratio(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'syncratio', [x, y]) }
}

for (const name of ['beatspermeasure', 'dancers', 'formationorderings', 'phrasecount', 'spacingmeters', 'stepcombos', 'symmetrygroups', 'syncratio'] as const)
  hexRegisterOf('choreography', name, (ChoreographyFormulas[name] as (...x: unknown[]) => unknown).bind(ChoreographyFormulas))
