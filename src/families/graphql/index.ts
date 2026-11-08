import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GRAPHQL — SERVING A GRAPH, AS ARITHMETIC (chosen by the public-API registry, not by hand). A query is numbers: how deep
 *  the selection set runs, its complexity score, the resolver calls it fires, the N+1 fan-out, the fields a schema holds,
 *  the batches a loader groups, the cache hit rate, and how often a fragment is reused. Crosses to `networking` — a graph
 *  query is what the wire carries. A measure. */

const PROOF = 'graphql arithmetic (query depth, complexity, resolver calls, N+1 fan-out, field count, batch size, cache hit rate, fragment reuse); a registry domain served over the wire; a measure crossed to networking'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'graphql', dst: 'networking', formula, value, proof: PROOF, ...extra }, holds, { name: `graphql.${name}`, params })

export class GraphqlFormulas {
  /** QUERY DEPTH: selection-set nodes across the levels a query runs. value fields · levels. */
  static querydepth(fields: number, levels: number): CrossFormula { return c('graphql-querydepth', 'querydepth(fields, levels) = fields · levels', fields * levels, nat(fields, levels), 'querydepth', [fields, levels]) }
  /** COMPLEXITY: a query's score as fields weighted by their cost. value fields · cost. */
  static complexity(fields: number, cost: number): CrossFormula { return c('graphql-complexity', 'complexity(fields, cost) = fields · cost', fields * cost, nat(fields, cost), 'complexity', [fields, cost]) }
  /** RESOLVERS: resolver calls over the seconds served. value ⌊calls / seconds⌋. */
  static resolvers(calls: number, seconds: number): CrossFormula { return c('graphql-resolvers', 'resolvers(calls, seconds) = ⌊calls / seconds⌋', seconds > 0 ? Math.floor(calls / seconds) : 0, nat(calls, seconds) && seconds > 0, 'resolvers', [calls, seconds]) }
  /** N+1: the total queries a list resolves — one for the list, then one per parent. value 1 + parents · per. */
  static nplusone(parents: number, per: number): CrossFormula { return c('graphql-nplusone', 'nplusone(parents, per) = 1 + parents · per', 1 + parents * per, nat(parents, per), 'nplusone', [parents, per]) }
  /** FIELD COUNT: the fields a schema holds — types at a per-type field count. value types · perType. */
  static fieldcount(types: number, perType: number): CrossFormula { return c('graphql-fieldcount', 'fieldcount(types, perType) = types · perType', types * perType, nat(types, perType), 'fieldcount', [types, perType]) }
  /** BATCH SIZE: the batches a dataloader groups items into. value ⌈items / perBatch⌉. */
  static batchsize(items: number, perBatch: number): CrossFormula { return c('graphql-batchsize', 'batchsize(items, perBatch) = ⌈items / perBatch⌉', perBatch > 0 ? Math.ceil(items / perBatch) : 0, nat(items, perBatch) && perBatch > 0, 'batchsize', [items, perBatch]) }
  /** CACHE HIT: the hit rate as a percentage. value ⌊hits · 100 / total⌋. */
  static cachehit(hits: number, total: number): CrossFormula { return c('graphql-cachehit', 'cachehit(hits, total) = ⌊hits · 100 / total⌋', total > 0 ? Math.floor((hits * 100) / total) : 0, nat(hits, total) && total > 0 && hits <= total, 'cachehit', [hits, total]) }
  /** FRAGMENT REUSE: how often a fragment is reused on average across a query. value ⌊uses / fragments⌋. */
  static fragmentreuse(uses: number, fragments: number): CrossFormula { return c('graphql-fragmentreuse', 'fragmentreuse(uses, fragments) = ⌊uses / fragments⌋', fragments > 0 ? Math.floor(uses / fragments) : 0, nat(uses, fragments) && fragments > 0, 'fragmentreuse', [uses, fragments]) }
}

for (const name of ['batchsize', 'cachehit', 'complexity', 'fieldcount', 'fragmentreuse', 'nplusone', 'querydepth', 'resolvers'] as const)
  hexRegisterOf('graphql', name, (GraphqlFormulas[name] as (...x: unknown[]) => unknown).bind(GraphqlFormulas))
