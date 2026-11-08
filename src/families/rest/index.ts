import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** REST — THE HTTP API SURFACE, AS ARITHMETIC (chosen by the public-API registry, not by hand). Serving requests is numbers:
 *  requests per second, average latency, payload size, the status class of a code, the rate limit per window, cache freshness,
 *  the pages a result set spans, and the error rate. Crosses to `networking` — REST is what the network carries. A measure. */

const PROOF = 'rest arithmetic (throughput, latency, payload size, status class, rate limit, cache ttl, pagination, error rate); a public-API registry domain; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'rest', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `rest.${name}`, params })

export class RestFormulas {
  /** THROUGHPUT: requests over seconds. value ⌊requests / seconds⌋. */
  static throughput(requests: number, seconds: number): CrossFormula { return c('rest-throughput', 'throughput(requests, seconds) = ⌊requests / seconds⌋', seconds > 0 ? Math.floor(requests / seconds) : 0, nat(requests, seconds) && seconds > 0, 'throughput', [requests, seconds]) }
  /** AVERAGE LATENCY: total milliseconds over the requests served. value ⌊total / requests⌋. */
  static latency(total: number, requests: number): CrossFormula { return c('rest-latency', 'latency(total, requests) = ⌊total / requests⌋', requests > 0 ? Math.floor(total / requests) : 0, nat(total, requests) && requests > 0, 'latency', [total, requests]) }
  /** PAYLOAD SIZE: fields at a size each. value fields · bytes. */
  static payloadsize(fields: number, bytes: number): CrossFormula { return c('rest-payloadsize', 'payloadsize(fields, bytes) = fields · bytes', fields * bytes, nat(fields, bytes), 'payloadsize', [fields, bytes]) }
  /** STATUS CLASS: the leading digit of an HTTP code (2xx → 2, 4xx → 4). value ⌊code / 100⌋. */
  static statusclass(code: number): CrossFormula { return c('rest-statusclass', 'statusclass(code) = ⌊code / 100⌋', Math.floor(code / 100), nat(code) && code >= 100 && code < 600, 'statusclass', [code]) }
  /** RATE LIMIT: the requests allowed per unit of the window. value ⌊limit / window⌋. */
  static ratelimit(limit: number, window: number): CrossFormula { return c('rest-ratelimit', 'ratelimit(limit, window) = ⌊limit / window⌋', window > 0 ? Math.floor(limit / window) : 0, nat(limit, window) && window > 0, 'ratelimit', [limit, window]) }
  /** CACHE TTL: the freshness left after an age against the ttl. value max(0, ttl − age). */
  static cachettl(ttl: number, age: number): CrossFormula { return c('rest-cachettl', 'cachettl(ttl, age) = max(0, ttl − age)', Math.max(0, ttl - age), nat(ttl, age), 'cachettl', [ttl, age]) }
  /** PAGINATION: the pages a result set spans at a page size. value ⌈total / perPage⌉. */
  static pagination(total: number, perPage: number): CrossFormula { return c('rest-pagination', 'pagination(total, perPage) = ⌈total / perPage⌉', perPage > 0 ? Math.ceil(total / perPage) : 0, nat(total, perPage) && perPage > 0, 'pagination', [total, perPage]) }
  /** ERROR RATE as a percentage. value ⌊errors · 100 / total⌋. */
  static errorrate(errors: number, total: number): CrossFormula { return c('rest-errorrate', 'errorrate(errors, total) = ⌊errors · 100 / total⌋', total > 0 ? Math.floor((errors * 100) / total) : 0, nat(errors, total) && total > 0 && errors <= total, 'errorrate', [errors, total]) }
}

for (const name of ['cachettl', 'errorrate', 'latency', 'pagination', 'payloadsize', 'ratelimit', 'statusclass', 'throughput'] as const)
  hexRegisterOf('rest', name, (RestFormulas[name] as (...x: unknown[]) => unknown).bind(RestFormulas))
