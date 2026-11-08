import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOCIALNETWORK — THE SHAPE OF WHO CONNECTS TO WHOM, AS ARITHMETIC (chosen by the public-API registry, not by hand). A
 *  graph of people is numbers: how dense the ties are, how central a person is, how tightly neighbourhoods close, whether
 *  bonds are returned, how far apart two people sit, who the bridges are, how many islands, and how alike the connected.
 *  Crosses to `statistics` — a social graph is a sample of a population. A measure. */

const PROOF = 'socialnetwork arithmetic (density, degree centrality, clustering, reciprocity, path length, betweenness, components, homophily); a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'socialnetwork', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `socialnetwork.${name}`, params })

export class SocialnetworkFormulas {
  /** DENSITY: edges as a percentage of the ties possible among n nodes. value ⌊2E · 100 / (n(n−1))⌋. */
  static density(n: number, edges: number): CrossFormula { return c('socialnetwork-density', 'density(n, edges) = ⌊2·edges·100 / (n(n−1))⌋', n * (n - 1) > 0 ? Math.floor((2 * edges * 100) / (n * (n - 1))) : 0, nat(n, edges) && n * (n - 1) > 0, 'density', [n, edges]) }
  /** DEGREE CENTRALITY: a node's degree as a percentage of the n−1 ties it could hold. value ⌊degree · 100 / (n−1)⌋. */
  static degreecentrality(degree: number, n: number): CrossFormula { return c('socialnetwork-degreecentrality', 'degreecentrality(degree, n) = ⌊degree · 100 / (n−1)⌋', n > 1 ? Math.floor((degree * 100) / (n - 1)) : 0, nat(degree, n) && n > 1, 'degreecentrality', [degree, n]) }
  /** CLUSTERING: closed triples (triangles) as a percentage of connected triples. value ⌊triangles · 100 / triples⌋. */
  static clustering(triangles: number, triples: number): CrossFormula { return c('socialnetwork-clustering', 'clustering(triangles, triples) = ⌊triangles · 100 / triples⌋', triples > 0 ? Math.floor((triangles * 100) / triples) : 0, nat(triangles, triples) && triples > 0, 'clustering', [triangles, triples]) }
  /** RECIPROCITY: returned ties as a percentage of directed ties. value ⌊mutual · 100 / total⌋. */
  static reciprocity(mutual: number, total: number): CrossFormula { return c('socialnetwork-reciprocity', 'reciprocity(mutual, total) = ⌊mutual · 100 / total⌋', total > 0 ? Math.floor((mutual * 100) / total) : 0, nat(mutual, total) && total > 0 && mutual <= total, 'reciprocity', [mutual, total]) }
  /** PATH LENGTH: the average shortest-path distance over the pairs. value ⌊totaldist / pairs⌋. */
  static pathlength(totaldist: number, pairs: number): CrossFormula { return c('socialnetwork-pathlength', 'pathlength(totaldist, pairs) = ⌊totaldist / pairs⌋', pairs > 0 ? Math.floor(totaldist / pairs) : 0, nat(totaldist, pairs) && pairs > 0, 'pathlength', [totaldist, pairs]) }
  /** BETWEENNESS: shortest paths through a node as a percentage of all shortest paths. value ⌊through · 100 / total⌋. */
  static betweenness(through: number, total: number): CrossFormula { return c('socialnetwork-betweenness', 'betweenness(through, total) = ⌊through · 100 / total⌋', total > 0 ? Math.floor((through * 100) / total) : 0, nat(through, total) && total > 0 && through <= total, 'betweenness', [through, total]) }
  /** COMPONENTS: the islands left when a forest of n nodes holds e edges. value max(0, n − edges). */
  static components(n: number, edges: number): CrossFormula { return c('socialnetwork-components', 'components(n, edges) = max(0, n − edges)', Math.max(0, n - edges), nat(n, edges), 'components', [n, edges]) }
  /** HOMOPHILY: same-group ties as a percentage of all ties. value ⌊same · 100 / total⌋. */
  static homophily(same: number, total: number): CrossFormula { return c('socialnetwork-homophily', 'homophily(same, total) = ⌊same · 100 / total⌋', total > 0 ? Math.floor((same * 100) / total) : 0, nat(same, total) && total > 0 && same <= total, 'homophily', [same, total]) }
}

for (const name of ['betweenness', 'clustering', 'components', 'degreecentrality', 'density', 'homophily', 'pathlength', 'reciprocity'] as const)
  hexRegisterOf('socialnetwork', name, (SocialnetworkFormulas[name] as (...x: unknown[]) => unknown).bind(SocialnetworkFormulas))
