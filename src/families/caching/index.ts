import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CACHING — THE CACHE AS ARITHMETIC. A cache is numbers: how often it hits, how often it misses, how much it evicts,
 *  how long an entry lives, the latency it saves, how full it is, how warm it is on start, and the speedup it buys.
 *  Crosses to `cloud` — a cache is what sits in front of cloud compute. A measure. */

const PROOF = 'caching arithmetic (hit rate, miss rate, eviction, ttl, saved latency, utilization, warmup, speedup); the cache in front of cloud compute; a measure crossed to cloud'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'caching', dst: 'cloud', formula, value, proof: PROOF, ...extra }, holds, { name: `caching.${name}`, params })

export class CachingFormulas {
  /** HIT RATE as a percentage. value ⌊hits · 100 / requests⌋. */
  static hitrate(hits: number, requests: number): CrossFormula { return c('caching-hitrate', 'hitrate(hits, requests) = ⌊hits · 100 / requests⌋', requests > 0 ? Math.floor((hits * 100) / requests) : 0, nat(hits, requests) && requests > 0 && hits <= requests, 'hitrate', [hits, requests]) }
  /** MISS RATE as a percentage. value ⌊misses · 100 / requests⌋. */
  static missrate(misses: number, requests: number): CrossFormula { return c('caching-missrate', 'missrate(misses, requests) = ⌊misses · 100 / requests⌋', requests > 0 ? Math.floor((misses * 100) / requests) : 0, nat(misses, requests) && requests > 0 && misses <= requests, 'missrate', [misses, requests]) }
  /** EVICTION rate against capacity. value ⌊evicted · 100 / capacity⌋. */
  static eviction(evicted: number, capacity: number): CrossFormula { return c('caching-eviction', 'eviction(evicted, capacity) = ⌊evicted · 100 / capacity⌋', capacity > 0 ? Math.floor((evicted * 100) / capacity) : 0, nat(evicted, capacity) && capacity > 0, 'eviction', [evicted, capacity]) }
  /** TTL: the seconds an entry lives, held as-is. value seconds. */
  static ttl(seconds: number): CrossFormula { return c('caching-ttl', 'ttl(seconds) = seconds', seconds, nat(seconds), 'ttl', [seconds]) }
  /** AVERAGE SAVED LATENCY per request. value ⌊saved / requests⌋. */
  static latency(saved: number, requests: number): CrossFormula { return c('caching-latency', 'latency(saved, requests) = ⌊saved / requests⌋', requests > 0 ? Math.floor(saved / requests) : 0, nat(saved, requests) && requests > 0, 'latency', [saved, requests]) }
  /** UTILIZATION as a percentage of capacity. value ⌊used · 100 / capacity⌋. */
  static utilization(used: number, capacity: number): CrossFormula { return c('caching-utilization', 'utilization(used, capacity) = ⌊used · 100 / capacity⌋', capacity > 0 ? Math.floor((used * 100) / capacity) : 0, nat(used, capacity) && capacity > 0 && used <= capacity, 'utilization', [used, capacity]) }
  /** WARMUP: the fraction of a target set already cached. value ⌊cached · 100 / total⌋. */
  static warmup(cached: number, total: number): CrossFormula { return c('caching-warmup', 'warmup(cached, total) = ⌊cached · 100 / total⌋', total > 0 ? Math.floor((cached * 100) / total) : 0, nat(cached, total) && total > 0 && cached <= total, 'warmup', [cached, total]) }
  /** SPEEDUP: uncached latency over cached latency, as a percentage. value ⌊uncached · 100 / cached⌋. */
  static speedup(uncached: number, cached_: number): CrossFormula { return c('caching-speedup', 'speedup(uncached, cached) = ⌊uncached · 100 / cached⌋', cached_ > 0 ? Math.floor((uncached * 100) / cached_) : 0, nat(uncached, cached_) && cached_ > 0, 'speedup', [uncached, cached_]) }
}

for (const name of ['eviction', 'hitrate', 'latency', 'missrate', 'speedup', 'ttl', 'utilization', 'warmup'] as const)
  hexRegisterOf('caching', name, (CachingFormulas[name] as (...x: unknown[]) => unknown).bind(CachingFormulas))
