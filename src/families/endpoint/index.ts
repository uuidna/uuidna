import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ENDPOINT — PAYLOAD'S CUSTOM ENDPOINTS AND REST + GRAPHQL API, AS ARITHMETIC (chosen by the CMS route registry, not by hand).
 *  Serving the API is numbers: average latency, request rate, the share of OK responses, the handler methods, the share of
 *  protected routes, the bytes a response carries, query depth, and the error share. Crosses to `payload` — the endpoints are
 *  what Payload exposes. A measure. */

const PROOF = 'endpoint arithmetic (latency, rate, status share, methods, auth share, payload bytes, query depth, error share); Payload custom endpoints over REST + GraphQL; a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'endpoint', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `endpoint.${name}`, params })

export class EndpointFormulas {
  /** AVERAGE LATENCY: total milliseconds over the requests served. value ⌊total / requests⌋. */
  static latency(total: number, requests: number): CrossFormula { return c('endpoint-latency', 'latency(total, requests) = ⌊total / requests⌋', requests > 0 ? Math.floor(total / requests) : 0, nat(total, requests) && requests > 0, 'latency', [total, requests]) }
  /** REQUEST RATE: requests over seconds. value ⌊requests / seconds⌋. */
  static rate(requests: number, seconds: number): CrossFormula { return c('endpoint-rate', 'rate(requests, seconds) = ⌊requests / seconds⌋', seconds > 0 ? Math.floor(requests / seconds) : 0, nat(requests, seconds) && seconds > 0, 'rate', [requests, seconds]) }
  /** OK STATUS SHARE as a percentage. value ⌊ok · 100 / total⌋. */
  static status(ok: number, total: number): CrossFormula { return c('endpoint-status', 'status(ok, total) = ⌊ok · 100 / total⌋', total > 0 ? Math.floor((ok * 100) / total) : 0, nat(ok, total) && total > 0 && ok <= total, 'status', [ok, total]) }
  /** HANDLER METHODS: the count a route exposes. value count. */
  static methods(count: number): CrossFormula { return c('endpoint-methods', 'methods(count) = count', count, nat(count), 'methods', [count]) }
  /** AUTH SHARE: protected routes as a percentage of all. value ⌊protected · 100 / total⌋. */
  static auth(protected_: number, total: number): CrossFormula { return c('endpoint-auth', 'auth(protected, total) = ⌊protected · 100 / total⌋', total > 0 ? Math.floor((protected_ * 100) / total) : 0, nat(protected_, total) && total > 0 && protected_ <= total, 'auth', [protected_, total]) }
  /** PAYLOAD SIZE: fields at a byte width each. value fields · bytes. */
  static payload(fields: number, bytes: number): CrossFormula { return c('endpoint-payload', 'payload(fields, bytes) = fields · bytes', fields * bytes, nat(fields, bytes), 'payload', [fields, bytes]) }
  /** QUERY DEPTH: the GraphQL population a query reaches. value population. */
  static depth(population: number): CrossFormula { return c('endpoint-depth', 'depth(population) = population', population, nat(population) && population <= 10, 'depth', [population]) }
  /** ERROR SHARE: errors as a percentage of the requests served. value ⌊errors · 100 / requests⌋. */
  static error(errors: number, requests: number): CrossFormula { return c('endpoint-error', 'error(errors, requests) = ⌊errors · 100 / requests⌋', requests > 0 ? Math.floor((errors * 100) / requests) : 0, nat(errors, requests) && requests > 0 && errors <= requests, 'error', [errors, requests]) }
}

for (const name of ['auth', 'depth', 'error', 'latency', 'methods', 'payload', 'rate', 'status'] as const)
  hexRegisterOf('endpoint', name, (EndpointFormulas[name] as (...x: unknown[]) => unknown).bind(EndpointFormulas))
