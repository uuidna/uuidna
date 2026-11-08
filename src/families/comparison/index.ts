import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COMPARISON — THE ComparisonTable USE CASE FROM payloadcms/website, AS ARITHMETIC. A comparison table is numbers: the
 *  cells of a feature-by-plan grid, the rows (features) and columns (plans), how much of the grid a plan covers, which
 *  plan is highlighted, the difference between two cells, whether a score wins, and the spread across a row. Crosses to
 *  `frontend` — a comparison table is what the frontend renders. A measure. */

const PROOF = 'comparison arithmetic (grid cells, rows, columns, coverage, highlight, diff, winner, spread); the ComparisonTable use case from payloadcms/website; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'comparison', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `comparison.${name}`, params })

export class ComparisonFormulas {
  /** CELLS: the grid is rows by columns. value rows · cols. */
  static cells(rows: number, cols: number): CrossFormula { return c('comparison-cells', 'cells(rows, cols) = rows · cols', rows * cols, nat(rows, cols), 'cells', [rows, cols]) }
  /** ROWS: a comparison table has one row per feature. value features. */
  static rows(features: number): CrossFormula { return c('comparison-rows', 'rows(features) = features', features, nat(features), 'rows', [features]) }
  /** COLUMNS: a comparison table has one column per plan. value plans. */
  static columns(plans: number): CrossFormula { return c('comparison-columns', 'columns(plans) = plans', plans, nat(plans), 'columns', [plans]) }
  /** COVERAGE: how much of the grid is checked, as a percentage. value ⌊checked · 100 / cells⌋. */
  static coverage(checked: number, cells: number): CrossFormula { return c('comparison-coverage', 'coverage(checked, cells) = ⌊checked · 100 / cells⌋', cells > 0 ? Math.floor((checked * 100) / cells) : 0, nat(checked, cells) && cells > 0 && checked <= cells, 'coverage', [checked, cells]) }
  /** HIGHLIGHT: the highlighted plan's position, as a percentage. value ⌊plan · 100 / plans⌋. */
  static highlight(plan: number, plans: number): CrossFormula { return c('comparison-highlight', 'highlight(plan, plans) = ⌊plan · 100 / plans⌋', plans > 0 ? Math.floor((plan * 100) / plans) : 0, nat(plan, plans) && plans > 0 && plan <= plans, 'highlight', [plan, plans]) }
  /** DIFF: the difference between two cells, never below zero. value max(0, a − b). */
  static diff(a: number, b: number): CrossFormula { return c('comparison-diff', 'diff(a, b) = max(0, a − b)', Math.max(0, a - b), nat(a, b), 'diff', [a, b]) }
  /** WINNER: 1 when a score meets the max. value [score ≥ max]. */
  static winner(score: number, max: number): CrossFormula { return c('comparison-winner', 'winner(score, max) = [score ≥ max]', score >= max ? 1 : 0, nat(score, max), 'winner', [score, max]) }
  /** SPREAD: the gap across a row, never below zero. value max(0, max − min). */
  static spread(max: number, min: number): CrossFormula { return c('comparison-spread', 'spread(max, min) = max(0, max − min)', Math.max(0, max - min), nat(max, min), 'spread', [max, min]) }
}

for (const name of ['cells', 'columns', 'coverage', 'diff', 'highlight', 'rows', 'spread', 'winner'] as const)
  hexRegisterOf('comparison', name, (ComparisonFormulas[name] as (...x: unknown[]) => unknown).bind(ComparisonFormulas))
