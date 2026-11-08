import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REPLICATION — KEEPING COPIES IN AGREEMENT, AS ARITHMETIC. A distributed store is numbers: how far a follower lags, the
 *  quorum a write needs, the replication factor, the consistency reached, replicated throughput, failover time, write
 *  amplification across replicas, and how far two copies have diverged. Crosses to `networking` — replication is what the
 *  network carries between nodes. A measure. */

const PROOF = 'replication arithmetic (lag, quorum, factor, consistency, throughput, failover, sync amplification, divergence); keeping copies in agreement; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'replication', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `replication.${name}`, params })

export class ReplicationFormulas {
  /** CONSISTENCY: the percentage of replicas that acknowledged a write. value ⌊acks · 100 / replicas⌋. */
  static consistency(acks: number, replicas: number): CrossFormula { return c('replication-consistency', 'consistency(acks, replicas) = ⌊acks · 100 / replicas⌋', replicas > 0 ? Math.floor((acks * 100) / replicas) : 0, nat(acks, replicas) && replicas > 0 && acks <= replicas, 'consistency', [acks, replicas]) }
  /** DIVERGENCE: how many entries the follower is behind the leader. value max(0, leader − follower). */
  static divergence(leader: number, follower: number): CrossFormula { return c('replication-divergence', 'divergence(leader, follower) = max(0, leader − follower)', Math.max(0, leader - follower), nat(leader, follower), 'divergence', [leader, follower]) }
  /** REPLICATION FACTOR: copies kept at each of several sites. value copies · sites. */
  static factor(copies: number, sites: number): CrossFormula { return c('replication-factor', 'factor(copies, sites) = copies · sites', copies * sites, nat(copies, sites), 'factor', [copies, sites]) }
  /** FAILOVER: detection time plus election time. value detect + elect. */
  static failover(detect: number, elect: number): CrossFormula { return c('replication-failover', 'failover(detect, elect) = detect + elect', detect + elect, nat(detect, elect), 'failover', [detect, elect]) }
  /** LAG: time to drain the replication backlog at a per-second apply rate. value ⌈pending / rate⌉. */
  static lag(pending: number, rate: number): CrossFormula { return c('replication-lag', 'lag(pending, rate) = ⌈pending / rate⌉', rate > 0 ? Math.ceil(pending / rate) : 0, nat(pending, rate) && rate > 0, 'lag', [pending, rate]) }
  /** QUORUM: the majority a write must reach. value ⌊nodes / 2⌋ + 1. */
  static quorum(nodes: number): CrossFormula { return c('replication-quorum', 'quorum(nodes) = ⌊nodes / 2⌋ + 1', nodes > 0 ? Math.floor(nodes / 2) + 1 : 0, nat(nodes) && nodes > 0, 'quorum', [nodes]) }
  /** SYNC: write amplification — each write applied to every replica. value writes · replicas. */
  static sync(writes: number, replicas: number): CrossFormula { return c('replication-sync', 'sync(writes, replicas) = writes · replicas', writes * replicas, nat(writes, replicas), 'sync', [writes, replicas]) }
  /** THROUGHPUT: replicated operations per second. value ⌊ops / seconds⌋. */
  static throughput(ops: number, seconds: number): CrossFormula { return c('replication-throughput', 'throughput(ops, seconds) = ⌊ops / seconds⌋', seconds > 0 ? Math.floor(ops / seconds) : 0, nat(ops, seconds) && seconds > 0, 'throughput', [ops, seconds]) }
}

for (const name of ['consistency', 'divergence', 'factor', 'failover', 'lag', 'quorum', 'sync', 'throughput'] as const)
  hexRegisterOf('replication', name, (ReplicationFormulas[name] as (...x: unknown[]) => unknown).bind(ReplicationFormulas))
