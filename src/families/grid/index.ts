import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GRID — THE GRID BLOCKS USE CASE, AS ARITHMETIC (CardGrid/LinkGrid/LogoGrid/ContentGrid from payloadcms/website).
 *  Laying out a grid is numbers: the rows a count needs at a column width, the total gutter, a column span as a
 *  percentage, how full a grid is, total cells, the columns that fit a container, the aspect ratio, and density.
 *  Crosses to `css` — grid is what the stylesheet lays out. A measure. */

const PROOF = 'grid arithmetic (rows, gap, column span, fill, cells, auto-fit columns, aspect ratio, density); the Grid blocks use case (CardGrid/LinkGrid/LogoGrid/ContentGrid); a measure crossed to css'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'grid', dst: 'css', formula, value, proof: PROOF, ...extra }, holds, { name: `grid.${name}`, params })

export class GridFormulas {
  /** ROWS: the rows a count of items needs at a column width. value ⌈items / cols⌉. */
  static rows(items: number, cols: number): CrossFormula { return c('grid-rows', 'rows(items, cols) = ⌈items / cols⌉', cols > 0 ? Math.ceil(items / cols) : 0, nat(items, cols) && cols > 0, 'rows', [items, cols]) }
  /** GAP: the total gutter between columns. value max(0, cols − 1) · gap. */
  static gap(cols: number, gap: number): CrossFormula { return c('grid-gap', 'gap(cols, gap) = max(0, cols − 1) · gap', Math.max(0, cols - 1) * gap, nat(cols, gap), 'gap', [cols, gap]) }
  /** SPAN: a column span as a percentage of the track count. value ⌊item · 100 / cols⌋. */
  static span(item: number, cols: number): CrossFormula { return c('grid-span', 'span(item, cols) = ⌊item · 100 / cols⌋', cols > 0 ? Math.floor((item * 100) / cols) : 0, nat(item, cols) && cols > 0 && item <= cols, 'span', [item, cols]) }
  /** FILL: how full the grid is as a percentage. value ⌊filled · 100 / cells⌋. */
  static fill(filled: number, cells: number): CrossFormula { return c('grid-fill', 'fill(filled, cells) = ⌊filled · 100 / cells⌋', cells > 0 ? Math.floor((filled * 100) / cells) : 0, nat(filled, cells) && cells > 0 && filled <= cells, 'fill', [filled, cells]) }
  /** CELLS: total cells in a grid of rows by columns. value rows · cols. */
  static cells(rows: number, cols: number): CrossFormula { return c('grid-cells', 'cells(rows, cols) = rows · cols', rows * cols, nat(rows, cols), 'cells', [rows, cols]) }
  /** AUTO: the columns that fit a container at a minimum column width. value ⌊container / min⌋. */
  static auto(container: number, min: number): CrossFormula { return c('grid-auto', 'auto(container, min) = ⌊container / min⌋', min > 0 ? Math.floor(container / min) : 0, nat(container, min) && min > 0, 'auto', [container, min]) }
  /** ASPECT: a cell aspect ratio as a percentage. value ⌊width · 100 / height⌋. */
  static aspect(width: number, height: number): CrossFormula { return c('grid-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) }
  /** DENSITY: items per unit area as a percentage. value ⌊items · 100 / area⌋. */
  static density(items: number, area: number): CrossFormula { return c('grid-density', 'density(items, area) = ⌊items · 100 / area⌋', area > 0 ? Math.floor((items * 100) / area) : 0, nat(items, area) && area > 0 && items <= area, 'density', [items, area]) }
}

for (const name of ['aspect', 'auto', 'cells', 'density', 'fill', 'gap', 'rows', 'span'] as const)
  hexRegisterOf('grid', name, (GridFormulas[name] as (...x: unknown[]) => unknown).bind(GridFormulas))
