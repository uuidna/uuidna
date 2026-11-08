import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CLOUDFLARE — THE WORKER BINDING SURFACE, AS ARITHMETIC. A Worker composes bindings: KV, R2, D1, Durable Objects,
 *  Queues, service bindings, Workers AI, Vectorize, Hyperdrive, Analytics Engine, Email, Browser Rendering, Workflows,
 *  mTLS, Dispatch (Workers for Platforms), Secrets Store, rate limiting, Images, static Assets, version metadata,
 *  Pipelines, Stream. The combinatorial usage is every subset a Worker can bind — 2^bindings — with the pairs, triples
 *  and ordered pipelines over them; the storage, stateful and compute categories; and the platform's own subrequest
 *  ceiling. Deterministic integer identities, standard Cloudflare Workers platform. Crosses to `cloud`. A measure. */

const BINDINGS = ['kv', 'r2', 'd1', 'durableobject', 'queue', 'service', 'ai', 'vectorize', 'hyperdrive', 'analyticsengine', 'email', 'browser', 'workflow', 'mtls', 'dispatch', 'secretsstore', 'ratelimit', 'images', 'assets', 'versionmetadata', 'pipeline', 'stream'] as const
const STORAGE = ['kv', 'r2', 'd1'] as const // the bindings that persist addressed values
const STATEFUL = ['durableobject', 'kv', 'r2', 'd1', 'queue', 'hyperdrive'] as const // bindings that keep state across requests
const COMPUTE = ['ai', 'browser', 'workflow', 'service', 'dispatch', 'vectorize'] as const // bindings that do work, not storage
const SUBREQUESTS = 1000 // the paid per-invocation subrequest ceiling (50 on the free plan)

const PROOF = 'Cloudflare Worker binding arithmetic: the binding surface and its combinatorial usage — 2^bindings subsets, 2^bindings−1 non-empty compositions, pairs C(n,2), triples C(n,3), k-subsets C(n,k), ordered pipelines P(n,k), the API method surface, the storage/stateful/compute categories, queue fan-out, edge reach, and the 1000 subrequest ceiling; deterministic integer identities crossed to cloud; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const comb = (n: number, k: number): number => { if (k < 0 || k > n) return 0; k = Math.min(k, n - k); let r = 1; for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1); return Math.round(r) }
const perm = (n: number, k: number): number => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 0; i < k; i++) r *= n - i; return r }
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cloudflare', dst: 'cloud', formula, value, proof: PROOF, ...extra }, holds, { name: `cloudflare.${name}`, params })

export class CloudflareFormulas {
  /** BINDINGS — the Worker binding types a Worker can bind. value |BINDINGS|. */
  static bindings(): CrossFormula { return c('cloudflare-bindings', 'bindings() = |BINDINGS| (the Worker binding types)', BINDINGS.length, true, 'bindings', []) }
  /** SUBSETS — the combinatorial usage: every subset of n bindings a Worker could compose, including none. value 2^n; holds 0 ≤ n ≤ 30. */
  static subsets(n: number): CrossFormula { return c('cloudflare-subsets', 'subsets(n) = 2^n (every subset of n bindings)', 2 ** n, nat(n) && n <= 30, 'subsets', [n]) }
  /** USAGE — the non-empty compositions: every way to bind at least one of n bindings. value 2^n − 1; holds 0 ≤ n ≤ 30. */
  static usage(n: number): CrossFormula { return c('cloudflare-usage', 'usage(n) = 2^n − 1 (non-empty binding compositions)', 2 ** n - 1, nat(n) && n <= 30, 'usage', [n]) }
  /** PAIRS — the binding pairs that can compose, C(n, 2). value n(n−1)/2. */
  static pairs(n: number): CrossFormula { return c('cloudflare-pairs', 'pairs(n) = C(n, 2) = n(n−1)/2', (n * (n - 1)) / 2, nat(n), 'pairs', [n]) }
  /** TRIPLES — the binding triples, C(n, 3). value n(n−1)(n−2)/6. */
  static triples(n: number): CrossFormula { return c('cloudflare-triples', 'triples(n) = C(n, 3) = n(n−1)(n−2)/6', (n * (n - 1) * (n - 2)) / 6, nat(n) && n >= 2, 'triples', [n]) }
  /** CHOOSE — the k-binding combinations, C(n, k). value n!/(k!(n−k)!); holds 0 ≤ k ≤ n ≤ 30. */
  static choose(n: number, k: number): CrossFormula { return c('cloudflare-choose', 'choose(n, k) = C(n, k)', comb(n, k), nat(n, k) && k <= n && n <= 30, 'choose', [n, k]) }
  /** ORDERED — the ordered binding pipelines of length k from n, P(n, k). value n!/(n−k)!; holds 0 ≤ k ≤ n ≤ 18. */
  static ordered(n: number, k: number): CrossFormula { return c('cloudflare-ordered', 'ordered(n, k) = P(n, k) = n!/(n−k)!', perm(n, k), nat(n, k) && k <= n && n <= 18, 'ordered', [n, k]) }
  /** APIS — the API method surface across the bound bindings. value bindings · perBinding. */
  static apis(bindings: number, perBinding: number): CrossFormula { return c('cloudflare-apis', 'apis(bindings, perBinding) = bindings · perBinding', bindings * perBinding, nat(bindings, perBinding), 'apis', [bindings, perBinding]) }
  /** STORAGE — the bindings that persist addressed values: KV, R2, D1. value |STORAGE|. */
  static storage(): CrossFormula { return c('cloudflare-storage', 'storage() = |{kv, r2, d1}|', STORAGE.length, true, 'storage', []) }
  /** STATEFUL — the bindings that keep state across requests. value |STATEFUL|. */
  static stateful(): CrossFormula { return c('cloudflare-stateful', 'stateful() = |{durableobject, kv, r2, d1, queue, hyperdrive}|', STATEFUL.length, true, 'stateful', []) }
  /** COMPUTE — the bindings that do work rather than store. value |COMPUTE|. */
  static compute(): CrossFormula { return c('cloudflare-compute', 'compute() = |{ai, browser, workflow, service, dispatch, vectorize}|', COMPUTE.length, true, 'compute', []) }
  /** PIPELINE — a data pipeline of stages, each touching the bound bindings. value stages · bindings. */
  static pipeline(stages: number, bindings: number): CrossFormula { return c('cloudflare-pipeline', 'pipeline(stages, bindings) = stages · bindings', stages * bindings, nat(stages, bindings), 'pipeline', [stages, bindings]) }
  /** FANOUT — queue fan-out: producers times consumers. value producers · consumers. */
  static fanout(producers: number, consumers: number): CrossFormula { return c('cloudflare-fanout', 'fanout(producers, consumers) = producers · consumers', producers * consumers, nat(producers, consumers), 'fanout', [producers, consumers]) }
  /** SUBREQUESTS — the per-invocation subrequest ceiling on the paid plan. value 1000. */
  static subrequests(): CrossFormula { return c('cloudflare-subrequests', 'subrequests() = 1000 (paid per-invocation ceiling)', SUBREQUESTS, true, 'subrequests', []) }
  /** REACH — the binding reach across edge colos: bindings available in every colo. value bindings · colos. */
  static reach(bindings: number, colos: number): CrossFormula { return c('cloudflare-reach', 'reach(bindings, colos) = bindings · colos', bindings * colos, nat(bindings, colos), 'reach', [bindings, colos]) }
}

for (const name of ['apis', 'bindings', 'choose', 'compute', 'fanout', 'ordered', 'pairs', 'pipeline', 'reach', 'stateful', 'storage', 'subrequests', 'subsets', 'triples', 'usage'] as const)
  hexRegisterOf('cloudflare', name, (CloudflareFormulas[name] as (...x: unknown[]) => unknown).bind(CloudflareFormulas))
