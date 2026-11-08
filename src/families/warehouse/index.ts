import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WAREHOUSE — THE ANALYTIC STORE, AS ARITHMETIC (chosen by the public-API registry, not by hand). A columnar warehouse is
 *  numbers: the rows a scan touches, the partitions pruning leaves, a column's bytes, the compression ratio, a query's cost,
 *  a materialized view's net hits, a column's cardinality, and the blocks clustering touches. Crosses to `indexing` — the
 *  warehouse is what an index addresses. A measure. */

const PROOF = 'warehouse arithmetic (scan rows, partition pruning, column size, compression ratio, query cost, materialized hits, cardinality, clustering); the analytic store as a measure crossed to indexing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'warehouse', dst: 'indexing', formula, value, proof: PROOF, ...extra }, holds, { name: `warehouse.${name}`, params })

export class WarehouseFormulas {
  /** SCAN ROWS: the rows a scan touches at a selectivity percent. value ⌊rows · selectivity / 100⌋. */
  static scanrows(rows: number, selectivity: number): CrossFormula { return c('warehouse-scanrows', 'scanrows(rows, selectivity) = ⌊rows · selectivity / 100⌋', Math.floor((rows * selectivity) / 100), nat(rows, selectivity) && selectivity <= 100, 'scanrows', [rows, selectivity]) }
  /** PARTITION PRUNE: the partitions pruning leaves to read. value max(0, total − pruned). */
  static partitionprune(total: number, pruned: number): CrossFormula { return c('warehouse-partitionprune', 'partitionprune(total, pruned) = max(0, total − pruned)', Math.max(0, total - pruned), nat(total, pruned) && pruned <= total, 'partitionprune', [total, pruned]) }
  /** COLUMN SIZE: a column's bytes — rows at a width each. value rows · bytes. */
  static columnsize(rows: number, bytes: number): CrossFormula { return c('warehouse-columnsize', 'columnsize(rows, bytes) = rows · bytes', rows * bytes, nat(rows, bytes), 'columnsize', [rows, bytes]) }
  /** COMPRESSION RATIO: raw over compressed. value ⌊raw / compressed⌋. */
  static compressionratio(raw: number, compressed: number): CrossFormula { return c('warehouse-compressionratio', 'compressionratio(raw, compressed) = ⌊raw / compressed⌋', compressed > 0 ? Math.floor(raw / compressed) : 0, nat(raw, compressed) && compressed > 0, 'compressionratio', [raw, compressed]) }
  /** QUERY COST: rows at a per-row cost plus a startup cost. value rows · perRow + startup. */
  static querycost(rows: number, perRow: number, startup: number): CrossFormula { return c('warehouse-querycost', 'querycost(rows, perRow, startup) = rows · perRow + startup', rows * perRow + startup, nat(rows, perRow, startup), 'querycost', [rows, perRow, startup]) }
  /** MATERIALIZED: a view's net hits — queries served less refreshes paid. value max(0, queries − refreshes). */
  static materialized(queries: number, refreshes: number): CrossFormula { return c('warehouse-materialized', 'materialized(queries, refreshes) = max(0, queries − refreshes)', Math.max(0, queries - refreshes), nat(queries, refreshes), 'materialized', [queries, refreshes]) }
  /** CARDINALITY: distinct values as a percent of the total. value ⌊distinct · 100 / total⌋. */
  static cardinality(distinct: number, total: number): CrossFormula { return c('warehouse-cardinality', 'cardinality(distinct, total) = ⌊distinct · 100 / total⌋', total > 0 ? Math.floor((distinct * 100) / total) : 0, nat(distinct, total) && total > 0 && distinct <= total, 'cardinality', [distinct, total]) }
  /** CLUSTERING: the blocks a clustered column touches at a rows-per-block. value ⌈rows / perBlock⌉. */
  static clustering(rows: number, perBlock: number): CrossFormula { return c('warehouse-clustering', 'clustering(rows, perBlock) = ⌈rows / perBlock⌉', perBlock > 0 ? Math.ceil(rows / perBlock) : 0, nat(rows, perBlock) && perBlock > 0, 'clustering', [rows, perBlock]) }
}

for (const name of ['cardinality', 'clustering', 'columnsize', 'compressionratio', 'materialized', 'partitionprune', 'querycost', 'scanrows'] as const)
  hexRegisterOf('warehouse', name, (WarehouseFormulas[name] as (...x: unknown[]) => unknown).bind(WarehouseFormulas))
