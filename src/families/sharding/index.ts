import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SHARDING — SPLITTING A KEY SPACE ACROSS SHARDS, AS ARITHMETIC. Partitioning is numbers: the shards a key set needs, the
 *  keys each shard owns, how many move on a rebalance, how hot the hottest shard runs, a scatter query's fanout, the load
 *  skew between shards, where a key lands, and how many keys migrate on a resharding. Crosses to `indexing` — sharding is
 *  what an index is partitioned by. A measure. */

const PROOF = 'sharding arithmetic (shards needed, key range per shard, rebalance movement, hotspot ratio, scatter fanout, load skew, placement, resharding migration); partitioning crossed to indexing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sharding', dst: 'indexing', formula, value, proof: PROOF, ...extra }, holds, { name: `sharding.${name}`, params })

export class ShardingFormulas {
  /** SHARDS NEEDED: a key count at a per-shard capacity. value ⌈keys / perShard⌉. */
  static shards(keys: number, perShard: number): CrossFormula { return c('sharding-shards', 'shards(keys, perShard) = ⌈keys / perShard⌉', perShard > 0 ? Math.ceil(keys / perShard) : 0, nat(keys, perShard) && perShard > 0, 'shards', [keys, perShard]) }
  /** KEY RANGE: the keys each shard owns of a key space. value ⌊space / shards⌋. */
  static keyrange(space: number, shards: number): CrossFormula { return c('sharding-keyrange', 'keyrange(space, shards) = ⌊space / shards⌋', shards > 0 ? Math.floor(space / shards) : 0, nat(space, shards) && shards > 0, 'keyrange', [space, shards]) }
  /** REBALANCE: keys that move when one shard is added (consistent hashing). value ⌊keys / (shards + 1)⌋. */
  static rebalance(keys: number, shards: number): CrossFormula { return c('sharding-rebalance', 'rebalance(keys, shards) = ⌊keys / (shards + 1)⌋', (shards + 1) > 0 ? Math.floor(keys / (shards + 1)) : 0, nat(keys, shards), 'rebalance', [keys, shards]) }
  /** HOTSPOT: how much hotter the hottest shard runs than the average. value ⌊peak / avg⌋. */
  static hotspot(peak: number, avg: number): CrossFormula { return c('sharding-hotspot', 'hotspot(peak, avg) = ⌊peak / avg⌋', avg > 0 ? Math.floor(peak / avg) : 0, nat(peak, avg) && avg > 0, 'hotspot', [peak, avg]) }
  /** FANOUT: the physical nodes a scatter query touches across shards and replicas. value shards · replicas. */
  static fanout(shards: number, replicas: number): CrossFormula { return c('sharding-fanout', 'fanout(shards, replicas) = shards · replicas', shards * replicas, nat(shards, replicas), 'fanout', [shards, replicas]) }
  /** SKEW: the load gap between the hottest and coldest shard. value max(0, max − min). */
  static skew(max: number, min: number): CrossFormula { return c('sharding-skew', 'skew(max, min) = max(0, max − min)', Math.max(0, max - min), nat(max, min), 'skew', [max, min]) }
  /** PLACEMENT: the shard a key lands on. value key mod shards. */
  static placement(key: number, shards: number): CrossFormula { return c('sharding-placement', 'placement(key, shards) = key mod shards', shards > 0 ? key % shards : 0, nat(key, shards) && shards > 0, 'placement', [key, shards]) }
  /** RESHARDING: keys that migrate when going from old shards to new. value ⌊keys · max(0, new − old) / new⌋. */
  static resharding(keys: number, old: number, nw: number): CrossFormula { return c('sharding-resharding', 'resharding(keys, old, new) = ⌊keys · max(0, new − old) / new⌋', nw > 0 ? Math.floor((keys * Math.max(0, nw - old)) / nw) : 0, nat(keys, old, nw) && nw > 0, 'resharding', [keys, old, nw]) }
}

for (const name of ['fanout', 'hotspot', 'keyrange', 'placement', 'rebalance', 'resharding', 'shards', 'skew'] as const)
  hexRegisterOf('sharding', name, (ShardingFormulas[name] as (...x: unknown[]) => unknown).bind(ShardingFormulas))
