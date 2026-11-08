import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** QUERY — THE PAYLOAD LOCAL API, AS ARITHMETIC (find/where/depth/pagination/sort/limit, not by hand). A query is numbers:
 *  the pages a result spans, the docs to skip, the relation depth, the where-conditions, the relations a population walks,
 *  the sort fields, the limit under a cap, and the hit rate of returned over total. Crosses to `payload` — query is how
 *  Payload reads. A measure. */

const PROOF = 'query arithmetic (pages, skip, depth, where, population, sort, limit, hit) over the Payload Local API; find/where/depth/pagination/sort/limit as exact integers; a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'query', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `query.${name}`, params })

export class QueryFormulas {
  /** PAGES: the pages a result spans at a page limit. value ⌈docs / limit⌉. */
  static pages(docs: number, limit: number): CrossFormula { return c('query-pages', 'pages(docs, limit) = ⌈docs / limit⌉', limit > 0 ? Math.ceil(docs / limit) : 0, nat(docs, limit) && limit > 0, 'pages', [docs, limit]) }
  /** SKIP: the docs to skip to reach a page. value max(0, (page − 1) · limit). */
  static skip(page: number, limit: number): CrossFormula { return c('query-skip', 'skip(page, limit) = max(0, (page − 1) · limit)', Math.max(0, (page - 1) * limit), nat(page, limit) && page >= 1, 'skip', [page, limit]) }
  /** DEPTH: the relation depth requested. value d. */
  static depth(d: number): CrossFormula { return c('query-depth', 'depth(d) = d', d, nat(d) && d <= 10, 'depth', [d]) }
  /** WHERE: the conditions in a where clause. value conditions. */
  static where(conditions: number): CrossFormula { return c('query-where', 'where(conditions) = conditions', conditions, nat(conditions), 'where', [conditions]) }
  /** POPULATION: the relations a population walks at a depth. value relations · depth. */
  static population(relations: number, depth: number): CrossFormula { return c('query-population', 'population(relations, depth) = relations · depth', relations * depth, nat(relations, depth), 'population', [relations, depth]) }
  /** SORT: the fields a sort orders by. value fields. */
  static sort(fields: number): CrossFormula { return c('query-sort', 'sort(fields) = fields', fields, nat(fields), 'sort', [fields]) }
  /** LIMIT: the requested limit under a cap. value min(requested, cap). */
  static limit(requested: number, cap: number): CrossFormula { return c('query-limit', 'limit(requested, cap) = min(requested, cap)', Math.min(requested, cap), nat(requested, cap), 'limit', [requested, cap]) }
  /** HIT: returned over total as a percentage. value ⌊returned · 100 / total⌋. */
  static hit(returned: number, total: number): CrossFormula { return c('query-hit', 'hit(returned, total) = ⌊returned · 100 / total⌋', total > 0 ? Math.floor((returned * 100) / total) : 0, nat(returned, total) && total > 0 && returned <= total, 'hit', [returned, total]) }
}

for (const name of ['depth', 'hit', 'limit', 'pages', 'population', 'skip', 'sort', 'where'] as const)
  hexRegisterOf('query', name, (QueryFormulas[name] as (...x: unknown[]) => unknown).bind(QueryFormulas))
