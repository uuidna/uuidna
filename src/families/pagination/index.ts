import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PAGINATION — PAGING A STREAM OF ITEMS, AS ARITHMETIC (how a list or a bound volume is cut into pages). The page count,
 *  the offset into the stream, the count with pinned front-matter, the items on the last page, the print signatures,
 *  the columns that fit a measure, the characters a page holds, and the last item a page shows. Crosses to `typography` —
 *  pagination is where the stream meets the page it is set on. A measure. */

const PROOF = 'pagination arithmetic (page count, offset, pinned total, last-page items, print signatures, columns, chars per page, page range); a stream cut into pages; a measure crossed to typography'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pagination', dst: 'typography', formula, value, proof: PROOF, ...extra }, holds, { name: `pagination.${name}`, params })

export class PaginationFormulas {
  /** PAGE COUNT: the pages a run of items needs at a per-page capacity. value ⌈items / perPage⌉. */
  static pages(items: number, perPage: number): CrossFormula { return c('pagination-pages', 'pages(items, perPage) = ⌈items / perPage⌉', perPage > 0 ? Math.ceil(items / perPage) : 0, nat(items, perPage) && perPage > 0, 'pages', [items, perPage]) }
  /** OFFSET: the zero-based index of the first item on a page. value max(0, page − 1) · perPage. */
  static pageoffset(page: number, perPage: number): CrossFormula { return c('pagination-pageoffset', 'pageoffset(page, perPage) = max(0, page − 1) · perPage', Math.max(0, page - 1) * perPage, nat(page, perPage) && page >= 1, 'pageoffset', [page, perPage]) }
  /** TOTAL PAGES including pinned front-matter counted into the stream. value ⌈(items + pinned) / perPage⌉. */
  static totalpages(items: number, perPage: number, pinned: number): CrossFormula { return c('pagination-totalpages', 'totalpages(items, perPage, pinned) = ⌈(items + pinned) / perPage⌉', perPage > 0 ? Math.ceil((items + pinned) / perPage) : 0, nat(items, perPage, pinned) && perPage > 0, 'totalpages', [items, perPage, pinned]) }
  /** ITEMS ON THE LAST PAGE: the remainder, a full page when it divides. value items mod perPage, or perPage. */
  static itemsonpage(items: number, perPage: number): CrossFormula { return c('pagination-itemsonpage', 'itemsonpage(items, perPage) = items mod perPage, or perPage when it divides', perPage > 0 ? (items % perPage === 0 ? perPage : items % perPage) : 0, nat(items, perPage) && perPage > 0, 'itemsonpage', [items, perPage]) }
  /** PRINT SIGNATURES: the folded sheets a page run binds into. value ⌈pages / perSig⌉. */
  static signatures(pages: number, perSig: number): CrossFormula { return c('pagination-signatures', 'signatures(pages, perSig) = ⌈pages / perSig⌉', perSig > 0 ? Math.ceil(pages / perSig) : 0, nat(pages, perSig) && perSig > 0, 'signatures', [pages, perSig]) }
  /** COLUMNS that fit a measure at a column width with a gutter between. value ⌊(width + gutter) / (colWidth + gutter)⌋. */
  static columns(width: number, colWidth: number, gutter: number): CrossFormula { return c('pagination-columns', 'columns(width, colWidth, gutter) = ⌊(width + gutter) / (colWidth + gutter)⌋', (colWidth + gutter) > 0 ? Math.floor((width + gutter) / (colWidth + gutter)) : 0, nat(width, colWidth, gutter) && (colWidth + gutter) > 0, 'columns', [width, colWidth, gutter]) }
  /** CHARACTERS PER PAGE: the set lines each holding a measure of characters. value cpl · lines. */
  static charsperpage(cpl: number, lines: number): CrossFormula { return c('pagination-charsperpage', 'charsperpage(cpl, lines) = cpl · lines', cpl * lines, nat(cpl, lines), 'charsperpage', [cpl, lines]) }
  /** PAGE RANGE: the last item number a page shows (1-based). value page · perPage. */
  static pagerange(page: number, perPage: number): CrossFormula { return c('pagination-pagerange', 'pagerange(page, perPage) = page · perPage', page * perPage, nat(page, perPage) && page >= 1, 'pagerange', [page, perPage]) }
}

for (const name of ['charsperpage', 'columns', 'itemsonpage', 'pageoffset', 'pagerange', 'pages', 'signatures', 'totalpages'] as const)
  hexRegisterOf('pagination', name, (PaginationFormulas[name] as (...x: unknown[]) => unknown).bind(PaginationFormulas))
