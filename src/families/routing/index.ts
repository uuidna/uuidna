import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ROUTING — WEB APP ROUTING, AS ARITHMETIC (the path a request takes through the registry's pages, as numbers). A route is
 *  its depth in segments, the share of its params that are dynamic, whether a redirect settles in one hop, how much of the
 *  table a request matches, how children nest under a parent, the share of routes behind a lazy split, the wildcards that
 *  catch all, and the share of links prefetched. Crosses to `frontend` — routing is what the frontend renders. A measure. */

const PROOF = 'routing arithmetic (depth, dynamic params, redirect, match, nesting, lazy split, catchall, prefetch); web app routing as exact integers; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'routing', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `routing.${name}`, params })

export class RoutingFormulas {
  /** DEPTH: the segments a route nests through. value segments (holds for a shallow table, ≤ 5). */
  static depth(segments: number): CrossFormula { return c('routing-depth', 'depth(segments) = segments', segments, nat(segments) && segments <= 5, 'depth', [segments]) }
  /** DYNAMIC PARAMS as a percentage of the route's params. value ⌊dynamic · 100 / total⌋. */
  static params(dynamic: number, total: number): CrossFormula { return c('routing-params', 'params(dynamic, total) = ⌊dynamic · 100 / total⌋', total > 0 ? Math.floor((dynamic * 100) / total) : 0, nat(dynamic, total) && total > 0 && dynamic <= total, 'params', [dynamic, total]) }
  /** REDIRECT: 1 when the chain settles in one hop. value [hops ≤ 1]. */
  static redirect(hops: number): CrossFormula { return c('routing-redirect', 'redirect(hops) = [hops ≤ 1]', hops <= 1 ? 1 : 0, nat(hops), 'redirect', [hops]) }
  /** MATCH: the share of the route table a request matches. value ⌊matched · 100 / routes⌋. */
  static match(matched: number, routes: number): CrossFormula { return c('routing-match', 'match(matched, routes) = ⌊matched · 100 / routes⌋', routes > 0 ? Math.floor((matched * 100) / routes) : 0, nat(matched, routes) && routes > 0 && matched <= routes, 'match', [matched, routes]) }
  /** NESTED: children per parent route. value ⌊children / parents⌋. */
  static nested(children: number, parents: number): CrossFormula { return c('routing-nested', 'nested(children, parents) = ⌊children / parents⌋', parents > 0 ? Math.floor(children / parents) : 0, nat(children, parents) && parents > 0, 'nested', [children, parents]) }
  /** LAZY: the share of routes behind a code split. value ⌊split · 100 / routes⌋. */
  static lazy(split: number, routes: number): CrossFormula { return c('routing-lazy', 'lazy(split, routes) = ⌊split · 100 / routes⌋', routes > 0 ? Math.floor((split * 100) / routes) : 0, nat(split, routes) && routes > 0 && split <= routes, 'lazy', [split, routes]) }
  /** CATCHALL: the wildcards that catch the rest. value wildcards. */
  static catchall(wildcards: number): CrossFormula { return c('routing-catchall', 'catchall(wildcards) = wildcards', wildcards, nat(wildcards), 'catchall', [wildcards]) }
  /** PREFETCH: the share of links prefetched. value ⌊prefetched · 100 / links⌋. */
  static prefetch(prefetched: number, links: number): CrossFormula { return c('routing-prefetch', 'prefetch(prefetched, links) = ⌊prefetched · 100 / links⌋', links > 0 ? Math.floor((prefetched * 100) / links) : 0, nat(prefetched, links) && links > 0 && prefetched <= links, 'prefetch', [prefetched, links]) }
}

for (const name of ['catchall', 'depth', 'lazy', 'match', 'nested', 'params', 'prefetch', 'redirect'] as const)
  hexRegisterOf('routing', name, (RoutingFormulas[name] as (...x: unknown[]) => unknown).bind(RoutingFormulas))
