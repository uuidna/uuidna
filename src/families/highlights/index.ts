import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HIGHLIGHTS — THE StickyHighlights/HoverHighlights USE CASE FROM payloadcms/website, AS ARITHMETIC. A page of sticky,
 *  hover-revealed highlights is numbers: how many items, which one is active as you scroll, scroll and reveal progress as
 *  percentages, the sticky offset, parallax shift, the reveal duration, and the intersection threshold. Crosses to
 *  `frontend` — highlights are what the frontend renders. A measure. */

const PROOF = 'highlights arithmetic (items, active index, scroll progress, reveal progress, sticky offset, parallax shift, duration, threshold); the StickyHighlights/HoverHighlights use case from payloadcms/website; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'highlights', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `highlights.${name}`, params })

export class HighlightsFormulas {
  /** ITEMS: how many highlights on the page. value count. */
  static items(count: number): CrossFormula { return c('highlights-items', 'items(count) = count', count, nat(count), 'items', [count]) }
  /** ACTIVE: the active highlight as a percentage through the list. value ⌊index · 100 / total⌋. */
  static active(index: number, total: number): CrossFormula { return c('highlights-active', 'active(index, total) = ⌊index · 100 / total⌋', total > 0 ? Math.floor((index * 100) / total) : 0, nat(index, total) && total > 0 && index <= total, 'active', [index, total]) }
  /** SCROLL: scroll progress as a percentage of the scrollable height. value ⌊pos · 100 / height⌋. */
  static scroll(pos: number, height: number): CrossFormula { return c('highlights-scroll', 'scroll(pos, height) = ⌊pos · 100 / height⌋', height > 0 ? Math.floor((pos * 100) / height) : 0, nat(pos, height) && height > 0 && pos <= height, 'scroll', [pos, height]) }
  /** REVEAL: reveal progress — highlights shown as a percentage of the total. value ⌊shown · 100 / total⌋. */
  static reveal(shown: number, total: number): CrossFormula { return c('highlights-reveal', 'reveal(shown, total) = ⌊shown · 100 / total⌋', total > 0 ? Math.floor((shown * 100) / total) : 0, nat(shown, total) && total > 0 && shown <= total, 'reveal', [shown, total]) }
  /** STICKY: the sticky offset from the top in pixels. value offset. */
  static sticky(offset: number): CrossFormula { return c('highlights-sticky', 'sticky(offset) = offset', offset, nat(offset), 'sticky', [offset]) }
  /** PARALLAX: the parallax shift at a speed over a distance. value ⌊speed · distance / 100⌋. */
  static parallax(speed: number, distance: number): CrossFormula { return c('highlights-parallax', 'parallax(speed, distance) = ⌊speed · distance / 100⌋', Math.floor((speed * distance) / 100), nat(speed, distance), 'parallax', [speed, distance]) }
  /** DURATION: the reveal duration in milliseconds. value ms. */
  static duration(ms: number): CrossFormula { return c('highlights-duration', 'duration(ms) = ms', ms, nat(ms), 'duration', [ms]) }
  /** THRESHOLD: the intersection threshold as a percentage. value pct. */
  static threshold(pct: number): CrossFormula { return c('highlights-threshold', 'threshold(pct) = pct', pct, nat(pct) && pct <= 100, 'threshold', [pct]) }
}

for (const name of ['active', 'duration', 'items', 'parallax', 'reveal', 'scroll', 'sticky', 'threshold'] as const)
  hexRegisterOf('highlights', name, (HighlightsFormulas[name] as (...x: unknown[]) => unknown).bind(HighlightsFormulas))
