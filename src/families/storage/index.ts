import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STORAGE — OBJECT AND BLOCK STORAGE, AS ARITHMETIC (chosen by the public-API registry, not by hand). Keeping bytes is
 *  numbers: raw capacity, used space, the cost of redundancy, operations per second, bytes per second, the dedup ratio,
 *  the two tiers summed, and the bill per gigabyte. Crosses to `cloud` — storage is capacity the cloud allocates. A measure. */

const PROOF = 'storage arithmetic (capacity, used, redundancy, iops, throughput, dedup, tier, cost); object and block storage as numbers; a measure crossed to cloud'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'storage', dst: 'cloud', formula, value, proof: PROOF, ...extra }, holds, { name: `storage.${name}`, params })

export class StorageFormulas {
  /** CAPACITY: objects at a size each. value objects · size. */
  static capacity(objects: number, size: number): CrossFormula { return c('storage-capacity', 'capacity(objects, size) = objects · size', objects * size, nat(objects, size), 'capacity', [objects, size]) }
  /** USED: allocated space less what is free, never below zero. value max(0, allocated − free). */
  static used(allocated: number, free: number): CrossFormula { return c('storage-used', 'used(allocated, free) = max(0, allocated − free)', Math.max(0, allocated - free), nat(allocated, free), 'used', [allocated, free]) }
  /** REDUNDANCY: copies of a size each. value copies · size. */
  static redundancy(copies: number, size: number): CrossFormula { return c('storage-redundancy', 'redundancy(copies, size) = copies · size', copies * size, nat(copies, size), 'redundancy', [copies, size]) }
  /** IOPS: operations over seconds. value ⌊ops / seconds⌋. */
  static iops(ops: number, seconds: number): CrossFormula { return c('storage-iops', 'iops(ops, seconds) = ⌊ops / seconds⌋', seconds > 0 ? Math.floor(ops / seconds) : 0, nat(ops, seconds) && seconds > 0, 'iops', [ops, seconds]) }
  /** THROUGHPUT: bytes over seconds. value ⌊bytes / seconds⌋. */
  static throughput(bytes: number, seconds: number): CrossFormula { return c('storage-throughput', 'throughput(bytes, seconds) = ⌊bytes / seconds⌋', seconds > 0 ? Math.floor(bytes / seconds) : 0, nat(bytes, seconds) && seconds > 0, 'throughput', [bytes, seconds]) }
  /** DEDUP: stored as a percentage of raw. value ⌊stored · 100 / raw⌋. */
  static dedup(raw: number, stored: number): CrossFormula { return c('storage-dedup', 'dedup(raw, stored) = ⌊stored · 100 / raw⌋', raw > 0 ? Math.floor((stored * 100) / raw) : 0, nat(raw, stored) && raw > 0 && stored <= raw, 'dedup', [raw, stored]) }
  /** TIER: hot and cold summed. value hot + cold. */
  static tier(hot: number, cold: number): CrossFormula { return c('storage-tier', 'tier(hot, cold) = hot + cold', hot + cold, nat(hot, cold), 'tier', [hot, cold]) }
  /** COST: gigabytes at a rate per hundred. value ⌊gb · rate / 100⌋. */
  static cost(gb: number, rate: number): CrossFormula { return c('storage-cost', 'cost(gb, rate) = ⌊gb · rate / 100⌋', Math.floor((gb * rate) / 100), nat(gb, rate), 'cost', [gb, rate]) }
}

for (const name of ['capacity', 'cost', 'dedup', 'iops', 'redundancy', 'throughput', 'tier', 'used'] as const)
  hexRegisterOf('storage', name, (StorageFormulas[name] as (...x: unknown[]) => unknown).bind(StorageFormulas))
