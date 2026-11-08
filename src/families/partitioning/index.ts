import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PARTITIONING — SPLITTING A KEYSPACE ACROSS NODES, AS ARITHMETIC (chosen by the data-layout registry, not by hand). Laying
 *  data out is numbers: the partitions a keyset needs, the keys each node holds, load skew, the keys a rebalance moves, the
 *  hottest partition's share, a range's width, a coalesce factor, and the leaves a fan-out makes. Crosses to `sharding` —
 *  partitioning is what sharding routes over. A measure. */

const PROOF = 'partitioning arithmetic (partition count, keyspace split, skew, rebalance moves, hot partition, range width, coalesce, fanout); the registry\'s uncovered data-layout domain; a measure crossed to sharding'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'partitioning', dst: 'sharding', formula, value, proof: PROOF, ...extra }, holds, { name: `partitioning.${name}`, params })

export class PartitioningFormulas {
  /** PARTITIONS: the partitions a keyset needs at a per-partition capacity. value ⌈keys / perPartition⌉. */
  static partitions(keys: number, perPartition: number): CrossFormula { return c('partitioning-partitions', 'partitions(keys, perPartition) = ⌈keys / perPartition⌉', perPartition > 0 ? Math.ceil(keys / perPartition) : 0, nat(keys, perPartition) && perPartition > 0, 'partitions', [keys, perPartition]) }
  /** KEYSPACE SPLIT: the keys each node holds when a keyspace is split evenly. value ⌊keyspace / nodes⌋. */
  static keyspacesplit(keyspace: number, nodes: number): CrossFormula { return c('partitioning-keyspacesplit', 'keyspacesplit(keyspace, nodes) = ⌊keyspace / nodes⌋', nodes > 0 ? Math.floor(keyspace / nodes) : 0, nat(keyspace, nodes) && nodes > 0, 'keyspacesplit', [keyspace, nodes]) }
  /** SKEW: how far the busiest partition runs over the average, as a percentage. value ⌊max(0, maxLoad − avgLoad) · 100 / avgLoad⌋. */
  static skew(maxLoad: number, avgLoad: number): CrossFormula { return c('partitioning-skew', 'skew(maxLoad, avgLoad) = ⌊max(0, maxLoad − avgLoad) · 100 / avgLoad⌋', avgLoad > 0 ? Math.floor((Math.max(0, maxLoad - avgLoad) * 100) / avgLoad) : 0, nat(maxLoad, avgLoad) && avgLoad > 0, 'skew', [maxLoad, avgLoad]) }
  /** REBALANCE: the keys that move when growing from `from` nodes to `to` nodes. value ⌊keys · max(0, to − from) / to⌋. */
  static rebalance(keys: number, from: number, to: number): CrossFormula { return c('partitioning-rebalance', 'rebalance(keys, from, to) = ⌊keys · max(0, to − from) / to⌋', to > 0 ? Math.floor((keys * Math.max(0, to - from)) / to) : 0, nat(keys, from, to) && to > 0, 'rebalance', [keys, from, to]) }
  /** HOT PARTITION: the hottest partition's share of total load, as a percentage. value ⌊partitionLoad · 100 / totalLoad⌋. */
  static hotpartition(partitionLoad: number, totalLoad: number): CrossFormula { return c('partitioning-hotpartition', 'hotpartition(partitionLoad, totalLoad) = ⌊partitionLoad · 100 / totalLoad⌋', totalLoad > 0 ? Math.floor((partitionLoad * 100) / totalLoad) : 0, nat(partitionLoad, totalLoad) && totalLoad > 0, 'hotpartition', [partitionLoad, totalLoad]) }
  /** RANGE WIDTH: the width of each range when a keyspace is cut into partitions. value ⌊keyspace / partitions⌋. */
  static rangewidth(keyspace: number, partitions: number): CrossFormula { return c('partitioning-rangewidth', 'rangewidth(keyspace, partitions) = ⌊keyspace / partitions⌋', partitions > 0 ? Math.floor(keyspace / partitions) : 0, nat(keyspace, partitions) && partitions > 0, 'rangewidth', [keyspace, partitions]) }
  /** COALESCE: the partitions left after merging by a factor. value ⌈partitions / factor⌉. */
  static coalesce(partitions: number, factor: number): CrossFormula { return c('partitioning-coalesce', 'coalesce(partitions, factor) = ⌈partitions / factor⌉', factor > 0 ? Math.ceil(partitions / factor) : 0, nat(partitions, factor) && factor > 0, 'coalesce', [partitions, factor]) }
  /** FANOUT: the leaf partitions a tree makes from parents each split a fixed number of ways. value parents · childrenEach. */
  static fanout(parents: number, childrenEach: number): CrossFormula { return c('partitioning-fanout', 'fanout(parents, childrenEach) = parents · childrenEach', parents * childrenEach, nat(parents, childrenEach), 'fanout', [parents, childrenEach]) }
}

for (const name of ['coalesce', 'fanout', 'hotpartition', 'keyspacesplit', 'partitions', 'rangewidth', 'rebalance', 'skew'] as const)
  hexRegisterOf('partitioning', name, (PartitioningFormulas[name] as (...x: unknown[]) => unknown).bind(PartitioningFormulas))
