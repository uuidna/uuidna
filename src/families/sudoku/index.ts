import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SUDOKU — scaffolded integer measures crossed to combinatorics. Every output an exact finite nonnegative integer. */

const PROOF = 'sudoku arithmetic (cells, boxes, givens, candidatesubsets, rowperms, pairelims, difficultyindex, emptycells); scaffolded from the integer-op palette; a measure crossed to combinatorics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sudoku', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `sudoku.${name}`, params })

export class SudokuFormulas {
  static cells(x: number, y: number): CrossFormula { return c('sudoku-cells', 'cells(x, y) = x · y', x * y, nat(x, y), 'cells', [x, y]) }
  static boxes(x: number, y: number): CrossFormula { return c('sudoku-boxes', 'boxes(x, y) = x · y', x * y, nat(x, y), 'boxes', [x, y]) }
  static givens(x: number, y: number): CrossFormula { return c('sudoku-givens', 'givens(x, y) = x + y', x + y, nat(x, y), 'givens', [x, y]) }
  static candidatesubsets(x: number): CrossFormula { return c('sudoku-candidatesubsets', 'candidatesubsets(x) = 2^x', x <= 30 ? 2 ** x : 0, nat(x) && x <= 30, 'candidatesubsets', [x]) }
  static rowperms(x: number): CrossFormula { return c('sudoku-rowperms', 'rowperms(x) = x!', x <= 12 ? ((n: number) => { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r })(x) : 0, nat(x) && x <= 12, 'rowperms', [x]) }
  static pairelims(x: number, y: number): CrossFormula { return c('sudoku-pairelims', 'pairelims(x, y) = C(x, y)', x >= y ? ((n: number, k: number) => { let kk = Math.min(k, n - k); let r = 1; for (let i = 0; i < kk; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) })(x, y) : 0, nat(x, y) && x >= y, 'pairelims', [x, y]) }
  static difficultyindex(x: number, y: number): CrossFormula { return c('sudoku-difficultyindex', 'difficultyindex(x, y) = ⌊x · 100 / y⌋', y > 0 ? Math.floor((x * 100) / y) : 0, nat(x, y) && y > 0, 'difficultyindex', [x, y]) }
  static emptycells(x: number, y: number): CrossFormula { return c('sudoku-emptycells', 'emptycells(x, y) = max(0, x − y)', Math.max(0, x - y), nat(x, y), 'emptycells', [x, y]) }
}

for (const name of ['boxes', 'candidatesubsets', 'cells', 'difficultyindex', 'emptycells', 'givens', 'pairelims', 'rowperms'] as const)
  hexRegisterOf('sudoku', name, (SudokuFormulas[name] as (...x: unknown[]) => unknown).bind(SudokuFormulas))
