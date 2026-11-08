import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONTENT — THE CONTENT-COMPOSITION USE CASE FROM payloadcms/website, AS ARITHMETIC. A page is built from blocks
 *  (BlogContent, Content, ContentGrid, MediaContent, ReusableContent): how many blocks, how much is reused, how much is
 *  media, the sections and their nesting depth, the words a rich-text field holds, and the table of contents. Crosses to
 *  `payload` — content is what payload composes. A measure. */

const PROOF = 'content arithmetic (blocks, reuse, media, sections, depth, words, toc, richtext) from payloadcms/website block composition; a measure crossed to payload'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'content', dst: 'payload', formula, value, proof: PROOF, ...extra }, holds, { name: `content.${name}`, params })

export class ContentFormulas {
  /** BLOCKS: the blocks a page is composed from. value count. */
  static blocks(count: number): CrossFormula { return c('content-blocks', 'blocks(count) = count', count, nat(count), 'blocks', [count]) }
  /** REUSE: the share that is ReusableContent, as a percentage. value ⌊reused · 100 / total⌋. */
  static reuse(reused: number, total: number): CrossFormula { return c('content-reuse', 'reuse(reused, total) = ⌊reused · 100 / total⌋', total > 0 ? Math.floor((reused * 100) / total) : 0, nat(reused, total) && total > 0 && reused <= total, 'reuse', [reused, total]) }
  /** MEDIA: the share that is MediaContent, as a percentage. value ⌊mediaBlocks · 100 / total⌋. */
  static media(mediaBlocks: number, total: number): CrossFormula { return c('content-media', 'media(mediaBlocks, total) = ⌊mediaBlocks · 100 / total⌋', total > 0 ? Math.floor((mediaBlocks * 100) / total) : 0, nat(mediaBlocks, total) && total > 0 && mediaBlocks <= total, 'media', [mediaBlocks, total]) }
  /** SECTIONS: the top-level sections of a page. value count. */
  static sections(count: number): CrossFormula { return c('content-sections', 'sections(count) = count', count, nat(count), 'sections', [count]) }
  /** DEPTH: the nesting depth of blocks within a section. value nested; holds when ≤ 5. */
  static depth(nested: number): CrossFormula { return c('content-depth', 'depth(nested) = nested', nested, nat(nested) && nested <= 5, 'depth', [nested]) }
  /** WORDS: the words a rich-text field holds. value ⌊chars / perWord⌋. */
  static words(chars: number, perWord: number): CrossFormula { return c('content-words', 'words(chars, perWord) = ⌊chars / perWord⌋', perWord > 0 ? Math.floor(chars / perWord) : 0, nat(chars, perWord) && perWord > 0, 'words', [chars, perWord]) }
  /** TOC: the table-of-contents entries, one per heading. value headings. */
  static toc(headings: number): CrossFormula { return c('content-toc', 'toc(headings) = headings', headings, nat(headings), 'toc', [headings]) }
  /** RICHTEXT: the words per block across a rich-text document. value ⌊words / blocks⌋. */
  static richtext(words: number, blocks: number): CrossFormula { return c('content-richtext', 'richtext(words, blocks) = ⌊words / blocks⌋', blocks > 0 ? Math.floor(words / blocks) : 0, nat(words, blocks) && blocks > 0, 'richtext', [words, blocks]) }
}

for (const name of ['blocks', 'depth', 'media', 'reuse', 'richtext', 'sections', 'toc', 'words'] as const)
  hexRegisterOf('content', name, (ContentFormulas[name] as (...x: unknown[]) => unknown).bind(ContentFormulas))
