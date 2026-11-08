import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PUBLISHING — THE TRADE AS ARITHMETIC (chosen by the registry, not by hand). Making and selling books is numbers:
 *  the author's royalty on sales, the pages a manuscript sets, the margin on a title, the sheets a print run burns,
 *  the share a run comes back as returns, readers per copy, the live share of a backlist, and a paper's citation impact.
 *  Crosses to `content` — publishing is what content becomes. A measure. */

const PROOF = 'publishing arithmetic (royalty, pages, margin, print run, returns, readership, backlist, impact); a registry domain; a measure crossed to content'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'publishing', dst: 'content', formula, value, proof: PROOF, ...extra }, holds, { name: `publishing.${name}`, params })

export class PublishingFormulas {
  /** ROYALTY: the author's cut of sales at a percent rate. value ⌊sales · rate / 100⌋. */
  static royalty(sales: number, rate: number): CrossFormula { return c('publishing-royalty', 'royalty(sales, rate) = ⌊sales · rate / 100⌋', Math.floor((sales * rate) / 100), nat(sales, rate), 'royalty', [sales, rate]) }
  /** PAGES: the pages a manuscript sets at words per page. value ⌊words / perpage⌋. */
  static pages(words: number, perpage: number): CrossFormula { return c('publishing-pages', 'pages(words, perpage) = ⌊words / perpage⌋', perpage > 0 ? Math.floor(words / perpage) : 0, nat(words, perpage) && perpage > 0, 'pages', [words, perpage]) }
  /** MARGIN on a title as a percent. value ⌊(revenue − cost) · 100 / revenue⌋. */
  static margin(revenue: number, cost: number): CrossFormula { return c('publishing-margin', 'margin(revenue, cost) = ⌊(revenue − cost) · 100 / revenue⌋', revenue > 0 ? Math.floor(((revenue - cost) * 100) / revenue) : 0, nat(revenue, cost) && revenue > 0 && cost <= revenue, 'margin', [revenue, cost]) }
  /** PRINT RUN: the sheets a run burns, copies times signatures. value copies · signatures. */
  static print(copies: number, signatures: number): CrossFormula { return c('publishing-print', 'print(copies, signatures) = copies · signatures', copies * signatures, nat(copies, signatures), 'print', [copies, signatures]) }
  /** RETURNS: the share a run comes back as a percent. value ⌊returned · 100 / shipped⌋. */
  static returns(returned: number, shipped: number): CrossFormula { return c('publishing-returns', 'returns(returned, shipped) = ⌊returned · 100 / shipped⌋', shipped > 0 ? Math.floor((returned * 100) / shipped) : 0, nat(returned, shipped) && shipped > 0 && returned <= shipped, 'returns', [returned, shipped]) }
  /** READERSHIP: readers per copy. value ⌊readers / copies⌋. */
  static readership(readers: number, copies: number): CrossFormula { return c('publishing-readership', 'readership(readers, copies) = ⌊readers / copies⌋', copies > 0 ? Math.floor(readers / copies) : 0, nat(readers, copies) && copies > 0, 'readership', [readers, copies]) }
  /** BACKLIST: the live share of a backlist as a percent. value ⌊active · 100 / titles⌋. */
  static backlist(active: number, titles: number): CrossFormula { return c('publishing-backlist', 'backlist(active, titles) = ⌊active · 100 / titles⌋', titles > 0 ? Math.floor((active * 100) / titles) : 0, nat(active, titles) && titles > 0 && active <= titles, 'backlist', [active, titles]) }
  /** IMPACT: citations per paper. value ⌊citations / papers⌋. */
  static impact(citations: number, papers: number): CrossFormula { return c('publishing-impact', 'impact(citations, papers) = ⌊citations / papers⌋', papers > 0 ? Math.floor(citations / papers) : 0, nat(citations, papers) && papers > 0, 'impact', [citations, papers]) }
}

for (const name of ['backlist', 'impact', 'margin', 'pages', 'print', 'readership', 'returns', 'royalty'] as const)
  hexRegisterOf('publishing', name, (PublishingFormulas[name] as (...x: unknown[]) => unknown).bind(PublishingFormulas))
