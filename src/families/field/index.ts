import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FIELD — THE PAYLOAD CMS FIELD API, AS ARITHMETIC (chosen by the field registry, not by hand). A field schema is numbers:
 *  the share of fields that are required, the share localized, how deeply groups nest, whether a value fits its max length,
 *  whether values stay unique, the share indexed, how many options a select carries, and fields packed per group. Crosses to
 *  `payload` — fields are what Payload stores. A measure. */

const PROOF = 'field arithmetic (required %, localized %, nesting depth, length fit, uniqueness, indexed %, option count, fields per group); the Payload CMS field API as exact integers; a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'field', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `field.${name}`, params })

export class FieldFormulas {
  /** DEPTH: how deeply field groups nest. value nested (holds when ≤ 5). */
  static depth(nested: number): CrossFormula { return c('field-depth', 'depth(nested) = nested', nested, nat(nested) && nested <= 5, 'depth', [nested]) }
  /** GROUP: fields packed per group. value ⌊fields / groups⌋. */
  static group(fields: number, groups: number): CrossFormula { return c('field-group', 'group(fields, groups) = ⌊fields / groups⌋', groups > 0 ? Math.floor(fields / groups) : 0, nat(fields, groups) && groups > 0, 'group', [fields, groups]) }
  /** INDEXED as a percentage of all fields. value ⌊idx · 100 / total⌋. */
  static indexed(idx: number, total: number): CrossFormula { return c('field-indexed', 'indexed(idx, total) = ⌊idx · 100 / total⌋', total > 0 ? Math.floor((idx * 100) / total) : 0, nat(idx, total) && total > 0 && idx <= total, 'indexed', [idx, total]) }
  /** LENGTH: 1 when a value fits its max length. value [value ≤ max]. */
  static length(value: number, max: number): CrossFormula { return c('field-length', 'length(value, max) = [value ≤ max]', value <= max ? 1 : 0, nat(value, max), 'length', [value, max]) }
  /** LOCALIZED as a percentage of all fields. value ⌊loc · 100 / total⌋. */
  static localized(loc: number, total: number): CrossFormula { return c('field-localized', 'localized(loc, total) = ⌊loc · 100 / total⌋', total > 0 ? Math.floor((loc * 100) / total) : 0, nat(loc, total) && total > 0 && loc <= total, 'localized', [loc, total]) }
  /** OPTIONS a select field carries. value count. */
  static options(count: number): CrossFormula { return c('field-options', 'options(count) = count', count, nat(count), 'options', [count]) }
  /** REQUIRED as a percentage of all fields. value ⌊req · 100 / total⌋. */
  static required(req: number, total: number): CrossFormula { return c('field-required', 'required(req, total) = ⌊req · 100 / total⌋', total > 0 ? Math.floor((req * 100) / total) : 0, nat(req, total) && total > 0 && req <= total, 'required', [req, total]) }
  /** UNIQUE: 1 when no duplicates remain. value [dupes = 0]. */
  static unique(dupes: number): CrossFormula { return c('field-unique', 'unique(dupes) = [dupes = 0]', dupes === 0 ? 1 : 0, nat(dupes), 'unique', [dupes]) }
}

for (const name of ['depth', 'group', 'indexed', 'length', 'localized', 'options', 'required', 'unique'] as const)
  hexRegisterOf('field', name, (FieldFormulas[name] as (...x: unknown[]) => unknown).bind(FieldFormulas))
