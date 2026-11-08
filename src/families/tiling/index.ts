import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TILING — COVERING THE PLANE, AS ARITHMETIC (how shapes fill a surface without gap or overlap). Running a tiling is
 *  numbers: the tiles a surface takes, how much it covers, the gap left, the interior angle at a vertex, the symmetry
 *  order of the pattern, the tiles per row, the offcut wasted, and how an aspect fits. Crosses to `geometry` — a tiling
 *  is geometry laid down on a surface. A measure. */

const PROOF = 'tiling arithmetic (tile count, coverage, gap ratio, vertex angle, symmetry order, row tiles, waste, aspect fit); covering the plane without gap or overlap; a measure crossed to geometry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tiling', dst: 'geometry', formula, value, proof: PROOF, ...extra }, holds, { name: `tiling.${name}`, params })

export class TilingFormulas {
  /** TILE COUNT: square tiles of a side that cover a width·height surface. value ⌊width / side⌋ · ⌊height / side⌋. */
  static tilecount(width: number, height: number, side: number): CrossFormula { return c('tiling-tilecount', 'tilecount(width, height, side) = ⌊width / side⌋ · ⌊height / side⌋', side > 0 ? Math.floor(width / side) * Math.floor(height / side) : 0, nat(width, height, side) && side > 0, 'tilecount', [width, height, side]) }
  /** COVERAGE as a percentage of the surface. value ⌊covered · 100 / total⌋. */
  static coverage(covered: number, total: number): CrossFormula { return c('tiling-coverage', 'coverage(covered, total) = ⌊covered · 100 / total⌋', total > 0 ? Math.floor((covered * 100) / total) : 0, nat(covered, total) && total > 0 && covered <= total, 'coverage', [covered, total]) }
  /** GAP RATIO: the uncovered part as a percentage. value ⌊gaps · 100 / total⌋. */
  static gapratio(gaps: number, total: number): CrossFormula { return c('tiling-gapratio', 'gapratio(gaps, total) = ⌊gaps · 100 / total⌋', total > 0 ? Math.floor((gaps * 100) / total) : 0, nat(gaps, total) && total > 0 && gaps <= total, 'gapratio', [gaps, total]) }
  /** VERTEX CONFIG: the interior angle of a regular n-gon meeting at a vertex. value ⌊(n − 2) · 180 / n⌋. */
  static vertexconfig(n: number): CrossFormula { return c('tiling-vertexconfig', 'vertexconfig(n) = ⌊(n − 2) · 180 / n⌋', n > 0 ? Math.floor((Math.max(0, n - 2) * 180) / n) : 0, nat(n) && n > 0, 'vertexconfig', [n]) }
  /** SYMMETRY ORDER: the order of the dihedral symmetry group of an n-fold pattern. value 2 · n. */
  static symmetryorder(n: number): CrossFormula { return c('tiling-symmetryorder', 'symmetryorder(n) = 2 · n', 2 * n, nat(n), 'symmetryorder', [n]) }
  /** ROW TILES: tiles of a width that fit across a surface width. value ⌊width / tilewidth⌋. */
  static rowtiles(width: number, tilewidth: number): CrossFormula { return c('tiling-rowtiles', 'rowtiles(width, tilewidth) = ⌊width / tilewidth⌋', tilewidth > 0 ? Math.floor(width / tilewidth) : 0, nat(width, tilewidth) && tilewidth > 0, 'rowtiles', [width, tilewidth]) }
  /** WASTE: the offcut left when a used part is taken from the total. value max(0, total − used). */
  static waste(total: number, used: number): CrossFormula { return c('tiling-waste', 'waste(total, used) = max(0, total − used)', Math.max(0, total - used), nat(total, used), 'waste', [total, used]) }
  /** ASPECT FIT: how many times a height divides a width. value ⌊width / height⌋. */
  static aspectfit(width: number, height: number): CrossFormula { return c('tiling-aspectfit', 'aspectfit(width, height) = ⌊width / height⌋', height > 0 ? Math.floor(width / height) : 0, nat(width, height) && height > 0, 'aspectfit', [width, height]) }
}

for (const name of ['aspectfit', 'coverage', 'gapratio', 'rowtiles', 'symmetryorder', 'tilecount', 'vertexconfig', 'waste'] as const)
  hexRegisterOf('tiling', name, (TilingFormulas[name] as (...x: unknown[]) => unknown).bind(TilingFormulas))
