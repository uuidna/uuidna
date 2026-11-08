import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** RATELIMITING — ADMITTING TRAFFIC, AS ARITHMETIC. A limiter is numbers: the tokens a bucket holds, the rate a leak
 *  drains, the requests counted in a window, the headroom left under a limit, how fast tokens refill, the burst a bucket
 *  can absorb, the seconds a client must wait, and the quota still unspent. Crosses to `networking` — rate limiting is how
 *  the network admits load. A measure. */

const PROOF = 'ratelimiting arithmetic (token bucket, leaky-bucket rate, window count, throttle margin, refill rate, burst capacity, retry-after, quota remaining); admitting traffic as numbers; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ratelimiting', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `ratelimiting.${name}`, params })

export class RatelimitingFormulas {
  /** TOKEN BUCKET: tokens accrued at a rate over seconds, capped at capacity. value min(rate · seconds, capacity). */
  static tokenbucket(rate: number, seconds: number, capacity: number): CrossFormula { return c('ratelimiting-tokenbucket', 'tokenbucket(rate, seconds, capacity) = min(rate · seconds, capacity)', Math.min(rate * seconds, capacity), nat(rate, seconds, capacity), 'tokenbucket', [rate, seconds, capacity]) }
  /** LEAKY RATE: a fixed drain — volume over seconds. value ⌊volume / seconds⌋. */
  static leakyrate(volume: number, seconds: number): CrossFormula { return c('ratelimiting-leakyrate', 'leakyrate(volume, seconds) = ⌊volume / seconds⌋', seconds > 0 ? Math.floor(volume / seconds) : 0, nat(volume, seconds) && seconds > 0, 'leakyrate', [volume, seconds]) }
  /** WINDOW COUNT: requests averaged over the windows observed. value ⌊requests / windows⌋. */
  static windowcount(requests: number, windows: number): CrossFormula { return c('ratelimiting-windowcount', 'windowcount(requests, windows) = ⌊requests / windows⌋', windows > 0 ? Math.floor(requests / windows) : 0, nat(requests, windows) && windows > 0, 'windowcount', [requests, windows]) }
  /** THROTTLE MARGIN: the headroom left under a limit. value max(0, limit − used). */
  static throttlemargin(limit: number, used: number): CrossFormula { return c('ratelimiting-throttlemargin', 'throttlemargin(limit, used) = max(0, limit − used)', Math.max(0, limit - used), nat(limit, used), 'throttlemargin', [limit, used]) }
  /** REFILL RATE: tokens restored per second. value ⌊tokens / seconds⌋. */
  static refillrate(tokens: number, seconds: number): CrossFormula { return c('ratelimiting-refillrate', 'refillrate(tokens, seconds) = ⌊tokens / seconds⌋', seconds > 0 ? Math.floor(tokens / seconds) : 0, nat(tokens, seconds) && seconds > 0, 'refillrate', [tokens, seconds]) }
  /** BURST CAPACITY: the steady rate plus the burst a bucket absorbs. value rate + burst. */
  static burstcapacity(rate: number, burst: number): CrossFormula { return c('ratelimiting-burstcapacity', 'burstcapacity(rate, burst) = rate + burst', rate + burst, nat(rate, burst), 'burstcapacity', [rate, burst]) }
  /** RETRY-AFTER: seconds a client must wait to clear the remaining debt at a rate. value ⌈remaining / rate⌉. */
  static retryafter(remaining: number, rate: number): CrossFormula { return c('ratelimiting-retryafter', 'retryafter(remaining, rate) = ⌈remaining / rate⌉', rate > 0 ? Math.ceil(remaining / rate) : 0, nat(remaining, rate) && rate > 0, 'retryafter', [remaining, rate]) }
  /** QUOTA REMAINING: the quota still unspent. value max(0, quota − used). */
  static quotaremaining(quota: number, used: number): CrossFormula { return c('ratelimiting-quotaremaining', 'quotaremaining(quota, used) = max(0, quota − used)', Math.max(0, quota - used), nat(quota, used), 'quotaremaining', [quota, used]) }
}

for (const name of ['burstcapacity', 'leakyrate', 'quotaremaining', 'refillrate', 'retryafter', 'throttlemargin', 'tokenbucket', 'windowcount'] as const)
  hexRegisterOf('ratelimiting', name, (RatelimitingFormulas[name] as (...x: unknown[]) => unknown).bind(RatelimitingFormulas))
