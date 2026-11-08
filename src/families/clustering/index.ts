import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CLUSTERING — UNSUPERVISED GROUPING, AS ARITHMETIC (chosen by the registry, not by hand). Finding groups in data is
 *  numbers: a point's squared distance to its centroid, a clustering's inertia, the silhouette, the purity against labels,
 *  the k a dataset wants, the within- and between-cluster spread, and local density. Crosses to `statistics` — clustering is
 *  statistics applied to grouping. A measure. */

const PROOF = 'clustering arithmetic (centroid distance, inertia, silhouette, purity, k selection, within/between spread, density); an uncovered domain; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'clustering', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `clustering.${name}`, params })

export class ClusteringFormulas {
  /** CENTROID DISTANCE: a point's squared Euclidean distance to its centroid (no sqrt). value dx² + dy². */
  static centroiddist(dx: number, dy: number): CrossFormula { return c('clustering-centroiddist', 'centroiddist(dx, dy) = dx² + dy²', dx * dx + dy * dy, nat(dx, dy), 'centroiddist', [dx, dy]) }
  /** INERTIA: the summed squared distance of points at an average squared distance. value points · avg. */
  static inertia(points: number, avg: number): CrossFormula { return c('clustering-inertia', 'inertia(points, avg) = points · avg', points * avg, nat(points, avg), 'inertia', [points, avg]) }
  /** SILHOUETTE as a percentage: the near-to-far separation (b − a) over the larger. value ⌊max(0, b − a) · 100 / max(a, b)⌋. */
  static silhouette(a: number, b: number): CrossFormula { const m = Math.max(a, b); return c('clustering-silhouette', 'silhouette(a, b) = ⌊max(0, b − a) · 100 / max(a, b)⌋', m > 0 ? Math.floor((Math.max(0, b - a) * 100) / m) : 0, nat(a, b), 'silhouette', [a, b]) }
  /** PURITY: the fraction of points matching the majority label, as a percentage. value ⌊correct · 100 / total⌋. */
  static purity(correct: number, total: number): CrossFormula { return c('clustering-purity', 'purity(correct, total) = ⌊correct · 100 / total⌋', total > 0 ? Math.floor((correct * 100) / total) : 0, nat(correct, total) && correct <= total, 'purity', [correct, total]) }
  /** K SELECTION: the number of clusters a dataset wants at a per-cluster size. value ⌊points / per⌋. */
  static kselection(points: number, per: number): CrossFormula { return c('clustering-kselection', 'kselection(points, per) = ⌊points / per⌋', per > 0 ? Math.floor(points / per) : 0, nat(points, per) && per > 0, 'kselection', [points, per]) }
  /** WITHIN-CLUSTER spread: points at a per-point squared spread. value points · spread. */
  static within(points: number, spread: number): CrossFormula { return c('clustering-within', 'within(points, spread) = points · spread', points * spread, nat(points, spread), 'within', [points, spread]) }
  /** BETWEEN-CLUSTER spread: the total spread not within clusters. value max(0, total − within). */
  static between(total: number, within: number): CrossFormula { return c('clustering-between', 'between(total, within) = max(0, total − within)', Math.max(0, total - within), nat(total, within), 'between', [total, within]) }
  /** DENSITY: points over the squared radius of their neighbourhood (no sqrt). value ⌊points / radius²⌋. */
  static density(points: number, radius: number): CrossFormula { return c('clustering-density', 'density(points, radius) = ⌊points / radius²⌋', radius > 0 ? Math.floor(points / (radius * radius)) : 0, nat(points, radius) && radius > 0, 'density', [points, radius]) }
}

for (const name of ['between', 'centroiddist', 'density', 'inertia', 'kselection', 'purity', 'silhouette', 'within'] as const)
  hexRegisterOf('clustering', name, (ClusteringFormulas[name] as (...x: unknown[]) => unknown).bind(ClusteringFormulas))
