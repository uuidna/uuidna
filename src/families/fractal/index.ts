import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FRACTAL — SELF-SIMILARITY AS ARITHMETIC. A shape made of smaller copies of itself is numbers: the pieces after an
 *  iteration, the ratio of whole to part, a dimension scaled to an integer, the total nodes of an iterated tree, how a
 *  perimeter grows, a box count, the Hausdorff dimension scaled, and self-similar copies. Crosses to `topology` — a
 *  fractal is a space with a non-integer dimension, which is what topology measures. A measure. */

const PROOF = 'fractal arithmetic (pieces after iterations, scale ratio, scaled dimension, iterated tree nodes, perimeter growth, box count, scaled Hausdorff dimension, self-similar copies); self-similarity as a measure crossed to topology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'fractal', dst: 'topology', formula, value, proof: PROOF, ...extra }, holds, { name: `fractal.${name}`, params })

export class FractalFormulas {
  /** BOX COUNT: boxes per side raised to the dimension. value side^dimension. */
  static boxcount(side: number, dimension: number): CrossFormula { return c('fractal-boxcount', 'boxcount(side, dimension) = side^dimension', side ** dimension, nat(side, dimension), 'boxcount', [side, dimension]) }
  /** SCALED DIMENSION: pieces over a scale, scaled to an integer by a thousand. value ⌊pieces · 1000 / scale⌋. */
  static dimensionscaled(pieces: number, scale: number): CrossFormula { return c('fractal-dimensionscaled', 'dimensionscaled(pieces, scale) = ⌊pieces · 1000 / scale⌋', scale > 0 ? Math.floor((pieces * 1000) / scale) : 0, nat(pieces, scale) && scale > 0, 'dimensionscaled', [pieces, scale]) }
  /** HAUSDORFF DIMENSION, SCALED: floored ⌊log N⌋ over floored ⌊log s⌋, scaled to an integer by a thousand. value ⌊logn · 1000 / logs⌋. */
  static hausdorffscaled(logn: number, logs: number): CrossFormula { return c('fractal-hausdorffscaled', 'hausdorffscaled(logn, logs) = ⌊logn · 1000 / logs⌋', logs > 0 ? Math.floor((logn * 1000) / logs) : 0, nat(logn, logs) && logs > 0, 'hausdorffscaled', [logn, logs]) }
  /** ITERATED TREE NODES: the total nodes of a branching tree to a depth. value ⌊(base^(depth+1) − 1) / (base − 1)⌋. */
  static iterationdepth(base: number, depth: number): CrossFormula { return c('fractal-iterationdepth', 'iterationdepth(base, depth) = ⌊(base^(depth+1) − 1) / (base − 1)⌋', base > 1 ? Math.floor((base ** (depth + 1) - 1) / (base - 1)) : 0, nat(base, depth) && base > 1, 'iterationdepth', [base, depth]) }
  /** PERIMETER GROWTH: each segment splits into four per iteration. value segments · 4^iterations. */
  static perimetergrowth(segments: number, iterations: number): CrossFormula { return c('fractal-perimetergrowth', 'perimetergrowth(segments, iterations) = segments · 4^iterations', segments * (4 ** iterations), nat(segments, iterations), 'perimetergrowth', [segments, iterations]) }
  /** PIECE COUNT: self-similar pieces after iterations of a base rule. value base^iterations. */
  static piececount(base: number, iterations: number): CrossFormula { return c('fractal-piececount', 'piececount(base, iterations) = base^iterations', base ** iterations, nat(base, iterations), 'piececount', [base, iterations]) }
  /** SCALE RATIO: whole over a part. value ⌊whole / part⌋. */
  static scaleratio(whole: number, part: number): CrossFormula { return c('fractal-scaleratio', 'scaleratio(whole, part) = ⌊whole / part⌋', part > 0 ? Math.floor(whole / part) : 0, nat(whole, part) && part > 0, 'scaleratio', [whole, part]) }
  /** SELF-SIMILARITY: self-similar copies at a factor. value copies · factor. */
  static selfsimilarity(copies: number, factor: number): CrossFormula { return c('fractal-selfsimilarity', 'selfsimilarity(copies, factor) = copies · factor', copies * factor, nat(copies, factor), 'selfsimilarity', [copies, factor]) }
}

for (const name of ['boxcount', 'dimensionscaled', 'hausdorffscaled', 'iterationdepth', 'perimetergrowth', 'piececount', 'scaleratio', 'selfsimilarity'] as const)
  hexRegisterOf('fractal', name, (FractalFormulas[name] as (...x: unknown[]) => unknown).bind(FractalFormulas))
