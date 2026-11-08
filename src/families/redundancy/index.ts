import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REDUNDANCY — KEEPING A SYSTEM UP BY HAVING MORE THAN IT NEEDS, AS ARITHMETIC. Spare units, majority votes, quorum
 *  sizes, failover load, coverage: all integers. How many units N+1 provisions, the votes a majority needs, idle spares,
 *  a parallel-availability proxy, redundancy coverage, the load each surviving node carries, the nodes a fault count
 *  needs, standby capacity. Crosses to `reliability` — redundancy is how reliability is bought. A measure. */

const PROOF = 'redundancy arithmetic (N+1 units, voting threshold, spare count, parallel availability, coverage, failover load, quorum, active/passive); more than is needed so a part can fail; a measure crossed to reliability'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'redundancy', dst: 'reliability', formula, value, proof: PROOF, ...extra }, holds, { name: `redundancy.${name}`, params })

export class RedundancyFormulas {
  /** STANDBY CAPACITY: the standby as a percentage of the primary. value ⌊standby · 100 / primary⌋. */
  static activepassive(primary: number, standby: number): CrossFormula { return c('redundancy-activepassive', 'activepassive(primary, standby) = ⌊standby · 100 / primary⌋', primary > 0 ? Math.floor((standby * 100) / primary) : 0, nat(primary, standby) && primary > 0, 'activepassive', [primary, standby]) }
  /** COVERAGE: the components that have a backup, as a percentage. value ⌊covered · 100 / total⌋. */
  static coverage(covered: number, total: number): CrossFormula { return c('redundancy-coverage', 'coverage(covered, total) = ⌊covered · 100 / total⌋', total > 0 ? Math.floor((covered * 100) / total) : 0, nat(covered, total) && total > 0 && covered <= total, 'coverage', [covered, total]) }
  /** FAILOVER: the load each surviving node carries when one of the nodes fails. value ⌈requests / (nodes − 1)⌉. */
  static failover(requests: number, nodes: number): CrossFormula { return c('redundancy-failover', 'failover(requests, nodes) = ⌈requests / (nodes − 1)⌉', nodes - 1 > 0 ? Math.ceil(requests / (nodes - 1)) : 0, nat(requests, nodes) && nodes > 1, 'failover', [requests, nodes]) }
  /** N+1: the units provisioned — the active ones plus the spares. value active + spare. */
  static nplusone(active: number, spare: number): CrossFormula { return c('redundancy-nplusone', 'nplusone(active, spare) = active + spare', active + spare, nat(active, spare), 'nplusone', [active, spare]) }
  /** PARALLEL AVAILABILITY: a proxy — each parallel unit divides the remaining downtime gap. value 100 − ⌊(100 − up) / n⌋. */
  static parallelreliability(up: number, n: number): CrossFormula { return c('redundancy-parallelreliability', 'parallelreliability(up, n) = 100 − ⌊(100 − up) / n⌋', n > 0 ? 100 - Math.floor(Math.max(0, 100 - up) / n) : 0, nat(up, n) && up <= 100 && n > 0, 'parallelreliability', [up, n]) }
  /** QUORUM: the nodes needed to tolerate f crash faults. value 2 · faults + 1. */
  static quorum(faults: number): CrossFormula { return c('redundancy-quorum', 'quorum(faults) = 2 · faults + 1', 2 * faults + 1, nat(faults), 'quorum', [faults]) }
  /** SPARE COUNT: the idle units — the total less the active. value max(0, total − active). */
  static sparecount(total: number, active: number): CrossFormula { return c('redundancy-sparecount', 'sparecount(total, active) = max(0, total − active)', Math.max(0, total - active), nat(total, active), 'sparecount', [total, active]) }
  /** VOTING THRESHOLD: the votes a majority needs. value ⌊voters / 2⌋ + 1. */
  static votingthreshold(voters: number): CrossFormula { return c('redundancy-votingthreshold', 'votingthreshold(voters) = ⌊voters / 2⌋ + 1', voters > 0 ? Math.floor(voters / 2) + 1 : 0, nat(voters) && voters > 0, 'votingthreshold', [voters]) }
}

for (const name of ['activepassive', 'coverage', 'failover', 'nplusone', 'parallelreliability', 'quorum', 'sparecount', 'votingthreshold'] as const)
  hexRegisterOf('redundancy', name, (RedundancyFormulas[name] as (...x: unknown[]) => unknown).bind(RedundancyFormulas))
