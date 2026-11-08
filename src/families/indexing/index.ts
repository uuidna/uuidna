import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INDEXING — THE DATABASE INDEX, AS ARITHMETIC. Choosing an index is numbers: how selective a predicate is, how distinct a
 *  column, the fan-out of a B-tree node, the depth of the tree, how much of a table a scan reads, whether an index covers a
 *  query, how bloated with dead rows, and the speedup an index buys. Crosses to `db` — indexing is what the database plans. A measure. */

const PROOF = 'indexing arithmetic (selectivity, cardinality, fanout, tree depth, scan fraction, query coverage, dead-row bloat, index speedup); a measure crossed to db'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'indexing', dst: 'db', formula, value, proof: PROOF, ...extra }, holds, { name: `indexing.${name}`, params })

export class IndexingFormulas {
  /** SELECTIVITY: the fraction of rows a predicate matches, as a percentage. value ⌊matched · 100 / total⌋. */
  static selectivity(matched: number, total: number): CrossFormula { return c('indexing-selectivity', 'selectivity(matched, total) = ⌊matched · 100 / total⌋', total > 0 ? Math.floor((matched * 100) / total) : 0, nat(matched, total) && total > 0 && matched <= total, 'selectivity', [matched, total]) }
  /** CARDINALITY: distinct values over rows, as a percentage. value ⌊distinct · 100 / rows⌋. */
  static cardinality(distinct: number, rows: number): CrossFormula { return c('indexing-cardinality', 'cardinality(distinct, rows) = ⌊distinct · 100 / rows⌋', rows > 0 ? Math.floor((distinct * 100) / rows) : 0, nat(distinct, rows) && rows > 0 && distinct <= rows, 'cardinality', [distinct, rows]) }
  /** FANOUT: keys per page of a B-tree node. value ⌊keys / pages⌋. */
  static fanout(keys: number, pages: number): CrossFormula { return c('indexing-fanout', 'fanout(keys, pages) = ⌊keys / pages⌋', pages > 0 ? Math.floor(keys / pages) : 0, nat(keys, pages) && pages > 0, 'fanout', [keys, pages]) }
  /** DEPTH: a tree-depth proxy, entries over fan-out. value ⌊entries / fanout_⌋. */
  static depth(entries: number, fanout_: number): CrossFormula { return c('indexing-depth', 'depth(entries, fanout_) = ⌊entries / fanout_⌋', fanout_ > 0 ? Math.floor(entries / fanout_) : 0, nat(entries, fanout_) && fanout_ > 0, 'depth', [entries, fanout_]) }
  /** SCAN: the fraction of a table a scan reads, as a percentage. value ⌊read · 100 / total⌋. */
  static scan(read: number, total: number): CrossFormula { return c('indexing-scan', 'scan(read, total) = ⌊read · 100 / total⌋', total > 0 ? Math.floor((read * 100) / total) : 0, nat(read, total) && total > 0 && read <= total, 'scan', [read, total]) }
  /** COVERAGE: the fraction of queries an index covers, as a percentage. value ⌊covered · 100 / queries⌋. */
  static coverage(covered: number, queries: number): CrossFormula { return c('indexing-coverage', 'coverage(covered, queries) = ⌊covered · 100 / queries⌋', queries > 0 ? Math.floor((covered * 100) / queries) : 0, nat(covered, queries) && queries > 0 && covered <= queries, 'coverage', [covered, queries]) }
  /** BLOAT: dead rows over total, as a percentage. value ⌊dead · 100 / total⌋. */
  static bloat(dead: number, total: number): CrossFormula { return c('indexing-bloat', 'bloat(dead, total) = ⌊dead · 100 / total⌋', total > 0 ? Math.floor((dead * 100) / total) : 0, nat(dead, total) && total > 0 && dead <= total, 'bloat', [dead, total]) }
  /** SPEEDUP: sequential cost over indexed cost, as a percentage. value ⌊sequential · 100 / indexed⌋. */
  static speedup(sequential: number, indexed: number): CrossFormula { return c('indexing-speedup', 'speedup(sequential, indexed) = ⌊sequential · 100 / indexed⌋', indexed > 0 ? Math.floor((sequential * 100) / indexed) : 0, nat(sequential, indexed) && indexed > 0, 'speedup', [sequential, indexed]) }
}

for (const name of ['bloat', 'cardinality', 'coverage', 'depth', 'fanout', 'scan', 'selectivity', 'speedup'] as const)
  hexRegisterOf('indexing', name, (IndexingFormulas[name] as (...x: unknown[]) => unknown).bind(IndexingFormulas))
