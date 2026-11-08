import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** API — the web interface's own arithmetic. Pages of a result set, a per-second rate-limit budget, exponential retry
 *  backoff, the status class of a code, quota remaining, a body's bytes, the method subsets a count opens, and a page's
 *  offset. Each an exact integer at a hex address; develops the api leads. */

const PROOF = 'api counts: pages = ceil(total / perPage); window = limit / seconds; backoff = base · 2^attempt; statusClass = code / 100; remaining = max(0, quota − used); payload = fields · avg; methods = 2^k; offset = page · perPage; ratelimit = requests / windowSec; quota = limit − used; pagesize = ceil(total / perPage); latency = hops · perHop; throughput = rps · payload; retries = attempts − 1; versions = major·100 + minor; api crossed to software'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const div = (a: number, b: number) => (b > 0 ? Math.floor(a / b) : 0)
const ceilDiv = (a: number, b: number) => (b > 0 ? Math.floor((a + b - 1) / b) : 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'api', dst: 'software', formula, value, proof: PROOF, ...extra }, holds, { name: `api.${name}`, params })

export class ApiFormulas {
  /** Pages of `perPage` needed for `total` rows: ceil(total / perPage). */
  static pages(total: number, perPage: number): CrossFormula { return f('api-pages', 'pages(total, perPage) = ceil(total / perPage)', ceilDiv(total, perPage), nat(total, perPage) && perPage > 0, 'pages', [total, perPage]) }
  /** The per-second budget of `limit` requests over a `seconds`-second window: limit / seconds. */
  static window(limit: number, seconds: number): CrossFormula { return f('api-window', 'window(limit, seconds) = limit / seconds', div(limit, seconds), nat(limit, seconds) && seconds > 0, 'window', [limit, seconds]) }
  /** Exponential retry backoff after `attempt` tries from `base`: base · 2^attempt (attempt ≤ 20). */
  static backoff(base: number, attempt: number): CrossFormula { return f('api-backoff', 'backoff(base, attempt) = base · 2^attempt', attempt <= 20 ? base * 2 ** attempt : 0, nat(base, attempt) && attempt <= 20, 'backoff', [base, attempt]) }
  /** The status class of an HTTP `code`: code / 100 (2, 3, 4, 5). */
  static statusClass(code: number): CrossFormula { return f('api-statusClass', 'statusClass(code) = code / 100', div(code, 100), nat(code), 'statusClass', [code]) }
  /** Quota left after `used` of `quota`: max(0, quota − used). */
  static remaining(quota: number, used: number): CrossFormula { return f('api-remaining', 'remaining(quota, used) = max(0, quota − used)', Math.max(0, quota - used), nat(quota, used), 'remaining', [quota, used]) }
  /** A body's bytes: `fields` of `avg` bytes each: fields · avg. */
  static payload(fields: number, avg: number): CrossFormula { return f('api-payload', 'payload(fields, avg) = fields · avg', fields * avg, nat(fields, avg), 'payload', [fields, avg]) }
  /** The method subsets `k` HTTP verbs open: 2^k (k ≤ 30). */
  static methods(k: number): CrossFormula { return f('api-methods', 'methods(k) = 2^k', k <= 30 ? 2 ** k : 0, nat(k) && k <= 30, 'methods', [k]) }
  /** The row offset of `page` at `perPage` rows: page · perPage. */
  static offset(page: number, perPage: number): CrossFormula { return f('api-offset', 'offset(page, perPage) = page · perPage', page * perPage, nat(page, perPage), 'offset', [page, perPage]) }
  /** The per-second rate limit of `requests` over a `windowSec`-second window: requests / windowSec (windowSec > 0). */
  static ratelimit(requests: number, windowSec: number): CrossFormula { return f('api-ratelimit', 'ratelimit(requests, windowSec) = requests / windowSec', div(requests, windowSec), nat(requests, windowSec) && windowSec > 0, 'ratelimit', [requests, windowSec]) }
  /** The quota left of `limit` after `used`: limit − used (used ≤ limit). */
  static quota(limit: number, used: number): CrossFormula { return f('api-quota', 'quota(limit, used) = limit − used', limit - used, nat(limit, used) && used <= limit, 'quota', [limit, used]) }
  /** The page size needed to split `total` rows into `perPage`: ceil(total / perPage) (perPage > 0). */
  static pagesize(total: number, perPage: number): CrossFormula { return f('api-pagesize', 'pagesize(total, perPage) = ceil(total / perPage)', ceilDiv(total, perPage), nat(total, perPage) && perPage > 0, 'pagesize', [total, perPage]) }
  /** The latency across `hops` hops of `perHop` each: hops · perHop. */
  static latency(hops: number, perHop: number): CrossFormula { return f('api-latency', 'latency(hops, perHop) = hops · perHop', hops * perHop, nat(hops, perHop), 'latency', [hops, perHop]) }
  /** The retries left after `attempts` total tries: attempts − 1 (attempts ≥ 1). */
  static retries(attempts: number): CrossFormula { return f('api-retries', 'retries(attempts) = attempts − 1', attempts - 1, nat(attempts) && attempts >= 1, 'retries', [attempts]) }
}

// 13 formulas, not 15: `api` is a contested family — the api-door registers two more (call, operations) to the same
// nibble, so api's own set leaves room (13 + 2 = 15). throughput and versions were the two most generic additions, dropped.
for (const name of ['backoff', 'latency', 'methods', 'offset', 'pages', 'pagesize', 'payload', 'quota', 'ratelimit', 'remaining', 'retries', 'statusClass', 'window'] as const)
  hexRegisterOf('api', name, (ApiFormulas[name] as (...x: unknown[]) => unknown).bind(ApiFormulas))
