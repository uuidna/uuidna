import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** JOURNALISM — THE NEWSROOM AS ARITHMETIC. Writing is numbers: words per sentence, how much of the story sits above the
 *  fold, sources per claim, time to deadline, how a piece travels, its length, what held up to a fact-check, and how
 *  loaded the language is. Crosses to `content` — journalism is content made and measured. A measure. */

const PROOF = 'journalism arithmetic (readability, inverted pyramid, sources per claim, deadline, engagement, word count, fact-check, bias); the newsroom as a measure crossed to content'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'journalism', dst: 'content', formula, value, proof: PROOF, ...extra }, holds, { name: `journalism.${name}`, params })

export class JournalismFormulas {
  /** READABILITY: words per sentence. value ⌊words / sentences⌋. */
  static readability(words: number, sentences: number): CrossFormula { return c('journalism-readability', 'readability(words, sentences) = ⌊words / sentences⌋', sentences > 0 ? Math.floor(words / sentences) : 0, nat(words, sentences) && sentences > 0, 'readability', [words, sentences]) }
  /** INVERTED PYRAMID: how much of the story sits in the lead, as a percentage. value ⌊lead · 100 / total⌋. */
  static inverted(lead: number, total: number): CrossFormula { return c('journalism-inverted', 'inverted(lead, total) = ⌊lead · 100 / total⌋', total > 0 ? Math.floor((lead * 100) / total) : 0, nat(lead, total) && total > 0 && lead <= total, 'inverted', [lead, total]) }
  /** SOURCES per claim, as a percentage. value ⌊cited · 100 / claims⌋. */
  static sources(cited: number, claims: number): CrossFormula { return c('journalism-sources', 'sources(cited, claims) = ⌊cited · 100 / claims⌋', claims > 0 ? Math.floor((cited * 100) / claims) : 0, nat(cited, claims) && claims > 0 && cited <= claims, 'sources', [cited, claims]) }
  /** DEADLINE: units left between filing and the due time. value max(0, due − filed). */
  static deadline(filed: number, due: number): CrossFormula { return c('journalism-deadline', 'deadline(filed, due) = max(0, due − filed)', Math.max(0, due - filed), nat(filed, due), 'deadline', [filed, due]) }
  /** ENGAGEMENT: shares per read, as a percentage. value ⌊shares · 100 / reads⌋. */
  static engagement(shares: number, reads: number): CrossFormula { return c('journalism-engagement', 'engagement(shares, reads) = ⌊shares · 100 / reads⌋', reads > 0 ? Math.floor((shares * 100) / reads) : 0, nat(shares, reads) && reads > 0, 'engagement', [shares, reads]) }
  /** WORD COUNT: paragraphs at an average length each. value paragraphs · average. */
  static wordcount(paragraphs: number, average: number): CrossFormula { return c('journalism-wordcount', 'wordcount(paragraphs, average) = paragraphs · average', paragraphs * average, nat(paragraphs, average), 'wordcount', [paragraphs, average]) }
  /** FACT-CHECK: verified of the facts checked, as a percentage. value ⌊verified · 100 / checked⌋. */
  static factcheck(verified: number, checked: number): CrossFormula { return c('journalism-factcheck', 'factcheck(verified, checked) = ⌊verified · 100 / checked⌋', checked > 0 ? Math.floor((verified * 100) / checked) : 0, nat(verified, checked) && checked > 0 && verified <= checked, 'factcheck', [verified, checked]) }
  /** BIAS: loaded words of the total, as a percentage. value ⌊loaded · 100 / words⌋. */
  static bias(loaded: number, words: number): CrossFormula { return c('journalism-bias', 'bias(loaded, words) = ⌊loaded · 100 / words⌋', words > 0 ? Math.floor((loaded * 100) / words) : 0, nat(loaded, words) && words > 0 && loaded <= words, 'bias', [loaded, words]) }
}

for (const name of ['bias', 'deadline', 'engagement', 'factcheck', 'inverted', 'readability', 'sources', 'wordcount'] as const)
  hexRegisterOf('journalism', name, (JournalismFormulas[name] as (...x: unknown[]) => unknown).bind(JournalismFormulas))
