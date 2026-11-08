import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WIREFRAME — LAYOUT AS ARITHMETIC. A low-fidelity plan is numbers: the column a width divides into, the gutter, how
 *  densely elements pack an area, the hierarchy depth, the share of whitespace, the alignment and above-the-fold ratios,
 *  and how detailed the mock is. Crosses to `layout` — a wireframe is what a layout renders. A measure. */

const PROOF = 'wireframe arithmetic (grid column, gutter, density, hierarchy, whitespace, alignment, fold, fidelity); low-fidelity layout as a measure crossed to layout'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'wireframe', dst: 'layout', formula, value, proof: PROOF, ...extra }, holds, { name: `wireframe.${name}`, params })

export class WireframeFormulas {
  /** GRID: the column width a total width divides into. value ⌊width / columns⌋. */
  static grid(width: number, columns: number): CrossFormula { return c('wireframe-grid', 'grid(width, columns) = ⌊width / columns⌋', columns > 0 ? Math.floor(width / columns) : 0, nat(width, columns) && columns > 0, 'grid', [width, columns]) }
  /** GUTTER: the space each column gets from a total. value ⌊total / columns⌋. */
  static gutter(total: number, columns: number): CrossFormula { return c('wireframe-gutter', 'gutter(total, columns) = ⌊total / columns⌋', columns > 0 ? Math.floor(total / columns) : 0, nat(total, columns) && columns > 0, 'gutter', [total, columns]) }
  /** DENSITY: elements per area, as a percentage. value ⌊elements · 100 / area⌋. */
  static density(elements: number, area: number): CrossFormula { return c('wireframe-density', 'density(elements, area) = ⌊elements · 100 / area⌋', area > 0 ? Math.floor((elements * 100) / area) : 0, nat(elements, area) && area > 0, 'density', [elements, area]) }
  /** HIERARCHY: the number of nesting levels. value levels. */
  static hierarchy(levels: number): CrossFormula { return c('wireframe-hierarchy', 'hierarchy(levels) = levels', levels, nat(levels), 'hierarchy', [levels]) }
  /** WHITESPACE as a percentage of the total. value ⌊empty · 100 / total⌋. */
  static whitespace(empty: number, total: number): CrossFormula { return c('wireframe-whitespace', 'whitespace(empty, total) = ⌊empty · 100 / total⌋', total > 0 ? Math.floor((empty * 100) / total) : 0, nat(empty, total) && total > 0 && empty <= total, 'whitespace', [empty, total]) }
  /** ALIGNMENT: the share of elements on the grid. value ⌊aligned · 100 / elements⌋. */
  static alignment(aligned: number, elements: number): CrossFormula { return c('wireframe-alignment', 'alignment(aligned, elements) = ⌊aligned · 100 / elements⌋', elements > 0 ? Math.floor((aligned * 100) / elements) : 0, nat(aligned, elements) && elements > 0 && aligned <= elements, 'alignment', [aligned, elements]) }
  /** FOLD: the share of content above the fold. value ⌊above · 100 / total⌋. */
  static fold(above: number, total: number): CrossFormula { return c('wireframe-fold', 'fold(above, total) = ⌊above · 100 / total⌋', total > 0 ? Math.floor((above * 100) / total) : 0, nat(above, total) && total > 0 && above <= total, 'fold', [above, total]) }
  /** FIDELITY: the share of detailed blocks in the mock. value ⌊detailed · 100 / total⌋. */
  static fidelity(detailed: number, total: number): CrossFormula { return c('wireframe-fidelity', 'fidelity(detailed, total) = ⌊detailed · 100 / total⌋', total > 0 ? Math.floor((detailed * 100) / total) : 0, nat(detailed, total) && total > 0 && detailed <= total, 'fidelity', [detailed, total]) }
}

for (const name of ['alignment', 'density', 'fidelity', 'fold', 'grid', 'gutter', 'hierarchy', 'whitespace'] as const)
  hexRegisterOf('wireframe', name, (WireframeFormulas[name] as (...x: unknown[]) => unknown).bind(WireframeFormulas))
