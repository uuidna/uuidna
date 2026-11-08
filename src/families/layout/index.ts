import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LAYOUT — CSS FLEXBOX/GRID, LEARNED FROM TAILWIND, AS ARITHMETIC. A page's shape is numbers: the width a column span
 *  takes of a 12-column grid, the columns themselves, an aspect ratio, a flex basis, how growth divides free space, the
 *  gap between cells, the order of an item, and the width a track gets in a container. Crosses to `css`. A measure. */

const PROOF = 'layout arithmetic (span width, columns, aspect ratio, flex basis, grow share, gap, order, track width) learned from Tailwind\'s 12-column grid and flexbox; a measure crossed to css'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'layout', dst: 'css', formula, value, proof: PROOF, ...extra }, holds, { name: `layout.${name}`, params })

export class LayoutFormulas {
  /** SPAN: the width a column span takes, as a percentage of the grid. value ⌊cols · 100 / of⌋. */
  static span(cols: number, of: number): CrossFormula { return c('layout-span', 'span(cols, of) = ⌊cols · 100 / of⌋', of > 0 ? Math.floor((cols * 100) / of) : 0, nat(cols, of) && of > 0 && cols <= of, 'span', [cols, of]) }
  /** COLUMNS: a grid of n columns. value n. */
  static columns(n: number): CrossFormula { return c('layout-columns', 'columns(n) = n', n, nat(n), 'columns', [n]) }
  /** ASPECT RATIO: width over height, as a percentage. value ⌊width · 100 / height⌋. */
  static aspect(width: number, height: number): CrossFormula { return c('layout-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) }
  /** FLEX BASIS: a percentage basis. value pct. */
  static basis(pct: number): CrossFormula { return c('layout-basis', 'basis(pct) = pct', pct, nat(pct) && pct <= 100, 'basis', [pct]) }
  /** GROW: the share of free space a flex item takes. value ⌊flex · 100 / total⌋. */
  static grow(flex: number, total: number): CrossFormula { return c('layout-grow', 'grow(flex, total) = ⌊flex · 100 / total⌋', total > 0 ? Math.floor((flex * 100) / total) : 0, nat(flex, total) && total > 0, 'grow', [flex, total]) }
  /** GAP: the total gap across cols cells at a per-gap size. value max(0, cols − 1) · gap. */
  static gap(cols: number, gap: number): CrossFormula { return c('layout-gap', 'gap(cols, gap) = max(0, cols − 1) · gap', Math.max(0, cols - 1) * gap, nat(cols, gap), 'gap', [cols, gap]) }
  /** ORDER: 1 when a position fits within the total. value [position ≤ total]. */
  static order(position: number, total: number): CrossFormula { return c('layout-order', 'order(position, total) = [position ≤ total]', position <= total ? 1 : 0, nat(position, total), 'order', [position, total]) }
  /** TRACK: the width a column gets in a container. value ⌊container / cols⌋. */
  static track(container: number, cols: number): CrossFormula { return c('layout-track', 'track(container, cols) = ⌊container / cols⌋', cols > 0 ? Math.floor(container / cols) : 0, nat(container, cols) && cols > 0, 'track', [container, cols]) }
}

for (const name of ['aspect', 'basis', 'columns', 'gap', 'grow', 'order', 'span', 'track'] as const)
  hexRegisterOf('layout', name, (LayoutFormulas[name] as (...x: unknown[]) => unknown).bind(LayoutFormulas))
