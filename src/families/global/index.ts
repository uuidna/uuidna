import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GLOBAL — THE PAYLOAD CMS GLOBALS API, AS ARITHMETIC (the single-document site config: settings, header, footer, nav,
 *  chosen by the registry, not by hand). A global is numbers: the fields it holds, how much is translated, versions kept,
 *  its size across locales, access across roles, cache hit rate, nesting depth, and how populated it is. Crosses to
 *  `payload` — a global is what Payload serves. A measure. */

const PROOF = 'global arithmetic (fields, locales translated, versions kept, size across locales, access across roles, cache hits, nesting depth, populated); the Payload globals API as a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'global', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `global.${name}`, params })

export class GlobalFormulas {
  /** FIELDS: the fields a global holds. value count. */
  static fields(count: number): CrossFormula { return c('global-fields', 'fields(count) = count', count, nat(count), 'fields', [count]) }
  /** LOCALES translated as a percentage. value ⌊translated · 100 / total⌋. */
  static locales(translated: number, total: number): CrossFormula { return c('global-locales', 'locales(translated, total) = ⌊translated · 100 / total⌋', total > 0 ? Math.floor((translated * 100) / total) : 0, nat(translated, total) && total > 0 && translated <= total, 'locales', [translated, total]) }
  /** VERSIONS kept, capped at a maximum. value min(kept, max). */
  static versions(kept: number, max: number): CrossFormula { return c('global-versions', 'versions(kept, max) = min(kept, max)', Math.min(kept, max), nat(kept, max), 'versions', [kept, max]) }
  /** SIZE: the fields across the locales. value fields · locales. */
  static size(fields: number, locales: number): CrossFormula { return c('global-size', 'size(fields, locales) = fields · locales', fields * locales, nat(fields, locales), 'size', [fields, locales]) }
  /** ACCESS: the roles allowed, as a percentage. value ⌊allowed · 100 / roles⌋. */
  static access(allowed: number, roles: number): CrossFormula { return c('global-access', 'access(allowed, roles) = ⌊allowed · 100 / roles⌋', roles > 0 ? Math.floor((allowed * 100) / roles) : 0, nat(allowed, roles) && roles > 0 && allowed <= roles, 'access', [allowed, roles]) }
  /** CACHED: the cache hit rate as a percentage. value ⌊hits · 100 / reads⌋. */
  static cached(hits: number, reads: number): CrossFormula { return c('global-cached', 'cached(hits, reads) = ⌊hits · 100 / reads⌋', reads > 0 ? Math.floor((hits * 100) / reads) : 0, nat(hits, reads) && reads > 0 && hits <= reads, 'cached', [hits, reads]) }
  /** DEPTH: the nesting of a global's fields. value nested; holds nested ≤ 5. */
  static depth(nested: number): CrossFormula { return c('global-depth', 'depth(nested) = nested', nested, nat(nested) && nested <= 5, 'depth', [nested]) }
  /** POPULATED: the fields set, as a percentage. value ⌊set · 100 / total⌋. */
  static populated(set: number, total: number): CrossFormula { return c('global-populated', 'populated(set, total) = ⌊set · 100 / total⌋', total > 0 ? Math.floor((set * 100) / total) : 0, nat(set, total) && total > 0 && set <= total, 'populated', [set, total]) }
}

for (const name of ['access', 'cached', 'depth', 'fields', 'locales', 'populated', 'size', 'versions'] as const)
  hexRegisterOf('global', name, (GlobalFormulas[name] as (...x: unknown[]) => unknown).bind(GlobalFormulas))
