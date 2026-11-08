import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONCURRENCY — PARALLEL COMPUTE, AS ARITHMETIC. The limits of running work at once are numbers: Amdahl's speedup, raw
 *  speedup, throughput, utilization, contention, latency, deadlock cycles, and how work scales with nodes. Crosses to
 *  `code` — concurrency is a property of the code that runs. A measure. */

const PROOF = 'concurrency arithmetic (amdahl speedup, speedup, throughput, utilization, contention, latency, deadlock, scalability, stolen-task count); a measure crossed to code'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'concurrency', dst: 'code', formula, value, proof: PROOF, ...extra }, holds, { name: `concurrency.${name}`, params })

export class ConcurrencyFormulas {
  /** AMDAHL'S SPEEDUP ×100: parallel is a percent 0..99, processors ≥ 1. value ⌊10000 / denom⌋. */
  static amdahl(parallel: number, processors: number): CrossFormula {
    const denom = processors > 0 ? 100 - parallel + Math.floor((parallel * 100) / processors) : 0
    return c('concurrency-amdahl', 'amdahl(parallel, processors) = ⌊10000 / (100 − parallel + ⌊parallel · 100 / processors⌋)⌋', processors > 0 && denom > 0 ? Math.floor(10000 / denom) : 0, nat(parallel, processors) && processors > 0 && denom > 0, 'amdahl', [parallel, processors])
  }
  /** SPEEDUP ×100: serial time over parallel time. value ⌊serial · 100 / parallel⌋. */
  static speedup(serial: number, parallel: number): CrossFormula { return c('concurrency-speedup', 'speedup(serial, parallel) = ⌊serial · 100 / parallel⌋', parallel > 0 ? Math.floor((serial * 100) / parallel) : 0, nat(serial, parallel) && parallel > 0, 'speedup', [serial, parallel]) }
  /** THROUGHPUT: tasks over seconds. value ⌊tasks / seconds⌋. */
  static throughput(tasks: number, seconds: number): CrossFormula { return c('concurrency-throughput', 'throughput(tasks, seconds) = ⌊tasks / seconds⌋', seconds > 0 ? Math.floor(tasks / seconds) : 0, nat(tasks, seconds) && seconds > 0, 'throughput', [tasks, seconds]) }
  /** UTILIZATION as a percentage: busy over total. value ⌊busy · 100 / total⌋. */
  static utilization(busy: number, total: number): CrossFormula { return c('concurrency-utilization', 'utilization(busy, total) = ⌊busy · 100 / total⌋', total > 0 ? Math.floor((busy * 100) / total) : 0, nat(busy, total) && total > 0 && busy <= total, 'utilization', [busy, total]) }
  /** CONTENTION as a percentage: waiting over threads. value ⌊waiting · 100 / threads⌋. */
  static contention(waiting: number, threads: number): CrossFormula { return c('concurrency-contention', 'contention(waiting, threads) = ⌊waiting · 100 / threads⌋', threads > 0 ? Math.floor((waiting * 100) / threads) : 0, nat(waiting, threads) && threads > 0 && waiting <= threads, 'contention', [waiting, threads]) }
  /** AVERAGE LATENCY: total milliseconds over the requests served. value ⌊total / requests⌋. */
  static latency(total: number, requests: number): CrossFormula { return c('concurrency-latency', 'latency(total, requests) = ⌊total / requests⌋', requests > 0 ? Math.floor(total / requests) : 0, nat(total, requests) && requests > 0, 'latency', [total, requests]) }
  /** DEADLOCK: the number of cycles in the wait-for graph. value cycles. */
  static deadlock(cycles: number): CrossFormula { return c('concurrency-deadlock', 'deadlock(cycles) = cycles', cycles, nat(cycles), 'deadlock', [cycles]) }
  /** SCALABILITY as a percentage: nodes over the baseline. value ⌊nodes · 100 / baseline⌋. */
  static scalability(nodes: number, baseline: number): CrossFormula { return c('concurrency-scalability', 'scalability(nodes, baseline) = ⌊nodes · 100 / baseline⌋', baseline > 0 ? Math.floor((nodes * 100) / baseline) : 0, nat(nodes, baseline) && baseline > 0, 'scalability', [nodes, baseline]) }
  /** STOLEN TASKS: the work-stealing scheduler's count of items taken from its queue. value stolen. */
  static steal(stolen: number): CrossFormula { return c('concurrency-steal', 'steal(stolen) = stolen', stolen, nat(stolen), 'steal', [stolen]) }
}

for (const name of ['amdahl', 'contention', 'deadlock', 'latency', 'scalability', 'speedup', 'steal', 'throughput', 'utilization'] as const)
  hexRegisterOf('concurrency', name, (ConcurrencyFormulas[name] as (...x: unknown[]) => unknown).bind(ConcurrencyFormulas))
