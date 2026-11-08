import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PAPYROLOGY — scaffolded integer measures crossed to archaeology. Every output an exact finite nonnegative integer. */

const PROOF = 'papyrology arithmetic (fragments, joinpairs, columnorderings, linespercolumn, datingrange, recovery, scribalhands, subsetreadings); scaffolded from the integer-op palette; a measure crossed to archaeology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'papyrology', dst: 'archaeology', formula, value, proof: PROOF, ...extra }, holds, { name: `papyrology.${name}`, params })

export class PapyrologyFormulas {
  static fragments(x: number, y: number): CrossFormula { return c('papyrology-fragments', 'fragments(x, y) = x + y', x + y, nat(x, y), 'fragments', [x, y]) }
  static joinpairs(x: number, y: number): CrossFormula { return c('papyrology-joinpairs', 'joinpairs(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'joinpairs', [x, y]) }
  static columnorderings(x: number): CrossFormula { return c('papyrology-columnorderings', 'columnorderings(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'columnorderings', [x]) }
  static linespercolumn(x: number, y: number): CrossFormula { return c('papyrology-linespercolumn', 'linespercolumn(x, y) = ⌊x / y⌋', y > 0 ? Math.floor(x / y) : 0, nat(x, y) && y > 0, 'linespercolumn', [x, y]) }
  static datingrange(x: number, y: number): CrossFormula { return c('papyrology-datingrange', 'datingrange(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'datingrange', [x, y]) }
  static recovery(x: number, y: number): CrossFormula { return c('papyrology-recovery', 'recovery(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'recovery', [x, y]) }
  static scribalhands(x: number, y: number): CrossFormula { return c('papyrology-scribalhands', 'scribalhands(x, y) = x · y', x * y, nat(x, y), 'scribalhands', [x, y]) }
  static subsetreadings(x: number): CrossFormula { return c('papyrology-subsetreadings', 'subsetreadings(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'subsetreadings', [x]) }
}

for (const name of ['columnorderings', 'datingrange', 'fragments', 'joinpairs', 'linespercolumn', 'recovery', 'scribalhands', 'subsetreadings'] as const)
  hexRegisterOf('papyrology', name, (PapyrologyFormulas[name] as (...x: unknown[]) => unknown).bind(PapyrologyFormulas))
