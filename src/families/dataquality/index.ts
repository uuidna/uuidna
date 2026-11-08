import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** DATAQUALITY — THE STATE OF A TABLE, AS ARITHMETIC (chosen by the public-API registry, not by hand). A dataset's health is
 *  numbers: how many cells are filled, how many rows are right, how many are distinct, how many pass the rules, how many
 *  agree across copies, how stale the newest row is, the share of nulls, and the share of duplicates. Crosses to `statistics` —
 *  data quality is what statistics summarises. A measure. */

const PROOF = 'dataquality arithmetic (completeness, accuracy, uniqueness, validity, consistency, freshness, null rate, duplicate rate); a registry-chosen measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'dataquality', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `dataquality.${name}`, params })

export class DataqualityFormulas {
  /** ACCURACY as a percentage: the rows left after errors are removed. value ⌊max(0, total − errors) · 100 / total⌋. */
  static accuracy(errors: number, total: number): CrossFormula { return c('dataquality-accuracy', 'accuracy(errors, total) = ⌊max(0, total − errors) · 100 / total⌋', total > 0 ? Math.floor((Math.max(0, total - errors) * 100) / total) : 0, nat(errors, total) && total > 0 && errors <= total, 'accuracy', [errors, total]) }
  /** COMPLETENESS as a percentage: the cells that are filled. value ⌊filled · 100 / total⌋. */
  static completeness(filled: number, total: number): CrossFormula { return c('dataquality-completeness', 'completeness(filled, total) = ⌊filled · 100 / total⌋', total > 0 ? Math.floor((filled * 100) / total) : 0, nat(filled, total) && total > 0 && filled <= total, 'completeness', [filled, total]) }
  /** CONSISTENCY as a percentage: the rows that agree across copies. value ⌊matched · 100 / total⌋. */
  static consistency(matched: number, total: number): CrossFormula { return c('dataquality-consistency', 'consistency(matched, total) = ⌊matched · 100 / total⌋', total > 0 ? Math.floor((matched * 100) / total) : 0, nat(matched, total) && total > 0 && matched <= total, 'consistency', [matched, total]) }
  /** DUPLICATE RATE as a percentage: the rows that repeat. value ⌊dupes · 100 / total⌋. */
  static duplicaterate(dupes: number, total: number): CrossFormula { return c('dataquality-duplicaterate', 'duplicaterate(dupes, total) = ⌊dupes · 100 / total⌋', total > 0 ? Math.floor((dupes * 100) / total) : 0, nat(dupes, total) && total > 0 && dupes <= total, 'duplicaterate', [dupes, total]) }
  /** FRESHNESS: how stale the newest row is. value max(0, now − updated). */
  static freshness(now: number, updated: number): CrossFormula { return c('dataquality-freshness', 'freshness(now, updated) = max(0, now − updated)', Math.max(0, now - updated), nat(now, updated) && now >= updated, 'freshness', [now, updated]) }
  /** NULL RATE as a percentage: the cells left empty. value ⌊nulls · 100 / total⌋. */
  static nullrate(nulls: number, total: number): CrossFormula { return c('dataquality-nullrate', 'nullrate(nulls, total) = ⌊nulls · 100 / total⌋', total > 0 ? Math.floor((nulls * 100) / total) : 0, nat(nulls, total) && total > 0 && nulls <= total, 'nullrate', [nulls, total]) }
  /** UNIQUENESS as a percentage: the rows that are distinct. value ⌊distinct · 100 / total⌋. */
  static uniqueness(distinct: number, total: number): CrossFormula { return c('dataquality-uniqueness', 'uniqueness(distinct, total) = ⌊distinct · 100 / total⌋', total > 0 ? Math.floor((distinct * 100) / total) : 0, nat(distinct, total) && total > 0 && distinct <= total, 'uniqueness', [distinct, total]) }
  /** VALIDITY as a percentage: the rows that pass the rules. value ⌊valid · 100 / total⌋. */
  static validity(valid: number, total: number): CrossFormula { return c('dataquality-validity', 'validity(valid, total) = ⌊valid · 100 / total⌋', total > 0 ? Math.floor((valid * 100) / total) : 0, nat(valid, total) && total > 0 && valid <= total, 'validity', [valid, total]) }
}

for (const name of ['accuracy', 'completeness', 'consistency', 'duplicaterate', 'freshness', 'nullrate', 'uniqueness', 'validity'] as const)
  hexRegisterOf('dataquality', name, (DataqualityFormulas[name] as (...x: unknown[]) => unknown).bind(DataqualityFormulas))
