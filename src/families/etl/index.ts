import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ETL — EXTRACT, TRANSFORM, LOAD AS ARITHMETIC (chosen by the data-pipeline registry, not by hand). Moving data is
 *  numbers: rows per second, the share rejected, the batches a load splits into, transform cost, the duplicates a stage
 *  removes, stage latency, how full the sink is, and partition skew. Crosses to `compression` — what ETL dedupes and
 *  packs is what compression shrinks. A measure. */

const PROOF = 'etl arithmetic (throughput, reject rate, batch window, transform cost, dedupe, latency, load factor, skew); the registry\'s data-pipeline domain; a measure crossed to compression'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'etl', dst: 'compression', formula, value, proof: PROOF, ...extra }, holds, { name: `etl.${name}`, params })

export class EtlFormulas {
  /** THROUGHPUT: records over seconds. value ⌊records / seconds⌋. */
  static throughput(records: number, seconds: number): CrossFormula { return c('etl-throughput', 'throughput(records, seconds) = ⌊records / seconds⌋', seconds > 0 ? Math.floor(records / seconds) : 0, nat(records, seconds) && seconds > 0, 'throughput', [records, seconds]) }
  /** REJECT RATE: the percentage of rows dropped. value ⌊bad · 100 / total⌋. */
  static rejectrate(bad: number, total: number): CrossFormula { return c('etl-rejectrate', 'rejectrate(bad, total) = ⌊bad · 100 / total⌋', total > 0 ? Math.floor((bad * 100) / total) : 0, nat(bad, total) && total > 0 && bad <= total, 'rejectrate', [bad, total]) }
  /** BATCH WINDOW: the batches a load splits into at a batch size. value ⌈records / batch⌉. */
  static batchwindow(records: number, batch: number): CrossFormula { return c('etl-batchwindow', 'batchwindow(records, batch) = ⌈records / batch⌉', batch > 0 ? Math.ceil(records / batch) : 0, nat(records, batch) && batch > 0, 'batchwindow', [records, batch]) }
  /** TRANSFORM COST: operations per row over the rows. value rows · ops. */
  static transformcost(rows: number, ops: number): CrossFormula { return c('etl-transformcost', 'transformcost(rows, ops) = rows · ops', rows * ops, nat(rows, ops), 'transformcost', [rows, ops]) }
  /** DEDUPE: the duplicates a stage removes. value max(0, total − unique). */
  static dedupe(total: number, unique: number): CrossFormula { return c('etl-dedupe', 'dedupe(total, unique) = max(0, total − unique)', Math.max(0, total - unique), nat(total, unique) && unique <= total, 'dedupe', [total, unique]) }
  /** STAGE LATENCY: total milliseconds over the stages crossed. value ⌊total / stages⌋. */
  static latency(total: number, stages: number): CrossFormula { return c('etl-latency', 'latency(total, stages) = ⌊total / stages⌋', stages > 0 ? Math.floor(total / stages) : 0, nat(total, stages) && stages > 0, 'latency', [total, stages]) }
  /** LOAD FACTOR: how full the sink is, as a percentage. value ⌊loaded · 100 / capacity⌋. */
  static loadfactor(loaded: number, capacity: number): CrossFormula { return c('etl-loadfactor', 'loadfactor(loaded, capacity) = ⌊loaded · 100 / capacity⌋', capacity > 0 ? Math.floor((loaded * 100) / capacity) : 0, nat(loaded, capacity) && capacity > 0, 'loadfactor', [loaded, capacity]) }
  /** PARTITION SKEW: how far the heaviest partition runs over the average. value max(0, max − avg). */
  static skew(max: number, avg: number): CrossFormula { return c('etl-skew', 'skew(max, avg) = max(0, max − avg)', Math.max(0, max - avg), nat(max, avg), 'skew', [max, avg]) }
}

for (const name of ['batchwindow', 'dedupe', 'latency', 'loadfactor', 'rejectrate', 'skew', 'throughput', 'transformcost'] as const)
  hexRegisterOf('etl', name, (EtlFormulas[name] as (...x: unknown[]) => unknown).bind(EtlFormulas))
