import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BACKEND — THE SERVICE LAYER AS ARITHMETIC (chosen by the public-API registry, not by hand). Serving requests is numbers:
 *  the requests a stream carries, average latency, the error rate, the connection pool, the cache hit rate, the queue
 *  backlog, throughput, and how saturated the capacity is. Crosses to `obs` — the backend is what observability watches. A
 *  measure. */

const PROOF = 'backend arithmetic (requests, latency, error rate, connection pool, cache hit rate, queue backlog, throughput, saturation); a service-layer domain; a measure crossed to obs'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'backend', dst: 'obs', formula, value, proof: PROOF, ...extra }, holds, { name: `backend.${name}`, params })

export class BackendFormulas {
  /** REQUESTS: a stream at rps over seconds. value rps · seconds. */
  static requests(rps: number, seconds: number): CrossFormula { return c('backend-requests', 'requests(rps, seconds) = rps · seconds', rps * seconds, nat(rps, seconds), 'requests', [rps, seconds]) }
  /** AVERAGE LATENCY: total milliseconds over the requests served. value ⌊total / requests⌋. */
  static latency(total: number, requests: number): CrossFormula { return c('backend-latency', 'latency(total, requests) = ⌊total / requests⌋', requests > 0 ? Math.floor(total / requests) : 0, nat(total, requests) && requests > 0, 'latency', [total, requests]) }
  /** ERROR RATE as a percentage. value ⌊errors · 100 / requests⌋. */
  static error(errors: number, requests: number): CrossFormula { return c('backend-error', 'error(errors, requests) = ⌊errors · 100 / requests⌋', requests > 0 ? Math.floor((errors * 100) / requests) : 0, nat(errors, requests) && requests > 0 && errors <= requests, 'error', [errors, requests]) }
  /** CONNECTION POOL: the connections a load takes, capped at the pool max. value min(connections, max). */
  static pool(connections: number, max: number): CrossFormula { return c('backend-pool', 'pool(connections, max) = min(connections, max)', Math.min(connections, max), nat(connections, max), 'pool', [connections, max]) }
  /** CACHE HIT RATE as a percentage. value ⌊hits · 100 / total⌋. */
  static cache(hits: number, total: number): CrossFormula { return c('backend-cache', 'cache(hits, total) = ⌊hits · 100 / total⌋', total > 0 ? Math.floor((hits * 100) / total) : 0, nat(hits, total) && total > 0 && hits <= total, 'cache', [hits, total]) }
  /** QUEUE BACKLOG: what arrives beyond what is processed. value max(0, incoming − processed). */
  static queue(incoming: number, processed: number): CrossFormula { return c('backend-queue', 'queue(incoming, processed) = max(0, incoming − processed)', Math.max(0, incoming - processed), nat(incoming, processed), 'queue', [incoming, processed]) }
  /** THROUGHPUT: requests over seconds. value ⌊requests / seconds⌋. */
  static throughput(requests: number, seconds: number): CrossFormula { return c('backend-throughput', 'throughput(requests, seconds) = ⌊requests / seconds⌋', seconds > 0 ? Math.floor(requests / seconds) : 0, nat(requests, seconds) && seconds > 0, 'throughput', [requests, seconds]) }
  /** SATURATION as a percentage of capacity. value ⌊used · 100 / capacity⌋. */
  static saturation(used: number, capacity: number): CrossFormula { return c('backend-saturation', 'saturation(used, capacity) = ⌊used · 100 / capacity⌋', capacity > 0 ? Math.floor((used * 100) / capacity) : 0, nat(used, capacity) && capacity > 0 && used <= capacity, 'saturation', [used, capacity]) }
}

for (const name of ['cache', 'error', 'latency', 'pool', 'queue', 'requests', 'saturation', 'throughput'] as const)
  hexRegisterOf('backend', name, (BackendFormulas[name] as (...x: unknown[]) => unknown).bind(BackendFormulas))
