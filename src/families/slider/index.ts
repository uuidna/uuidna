import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SLIDER — THE CAROUSEL BLOCK FROM payloadcms/website, AS ARITHMETIC (a front-end use case, not chosen by hand). A slider is
 *  numbers: the slides it holds, the current index as a percentage, the autoplay cycle, the looping position, how many are
 *  visible, the gap between them, the transition time, and the pages it paginates into. Crosses to `frontend` — a slider is
 *  what the front end renders. A measure. */

const PROOF = 'slider arithmetic (slides, index %, autoplay cycle, loop position, visible %, gap, transition, pages); the carousel use case from payloadcms/website; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'slider', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `slider.${name}`, params })

export class SliderFormulas {
  /** SLIDES: the slides a slider holds. value count. */
  static slides(count: number): CrossFormula { return c('slider-slides', 'slides(count) = count', count, nat(count), 'slides', [count]) }
  /** INDEX: the current slide as a percentage. value ⌊current · 100 / total⌋. */
  static index(current: number, total: number): CrossFormula { return c('slider-index', 'index(current, total) = ⌊current · 100 / total⌋', total > 0 ? Math.floor((current * 100) / total) : 0, nat(current, total) && total > 0 && current <= total, 'index', [current, total]) }
  /** AUTOPLAY: the total cycle in milliseconds for all slides at an interval. value interval · slides. */
  static autoplay(interval: number, slides: number): CrossFormula { return c('slider-autoplay', 'autoplay(interval, slides) = interval · slides', interval * slides, nat(interval, slides), 'autoplay', [interval, slides]) }
  /** LOOP: the wrapped position within the slides. value position mod total. */
  static loop(position: number, total: number): CrossFormula { return c('slider-loop', 'loop(position, total) = position mod total', total > 0 ? position % total : 0, nat(position, total) && total > 0, 'loop', [position, total]) }
  /** VISIBLE: the slides shown as a percentage. value ⌊shown · 100 / total⌋. */
  static visible(shown: number, total: number): CrossFormula { return c('slider-visible', 'visible(shown, total) = ⌊shown · 100 / total⌋', total > 0 ? Math.floor((shown * 100) / total) : 0, nat(shown, total) && total > 0 && shown <= total, 'visible', [shown, total]) }
  /** GAP: the total gap between the slides. value max(0, slides − 1) · gap. */
  static gap(slides: number, gap: number): CrossFormula { return c('slider-gap', 'gap(slides, gap) = max(0, slides − 1) · gap', Math.max(0, slides - 1) * gap, nat(slides, gap), 'gap', [slides, gap]) }
  /** TRANSITION: the transition time in milliseconds. value ms. */
  static transition(ms: number): CrossFormula { return c('slider-transition', 'transition(ms) = ms', ms, nat(ms), 'transition', [ms]) }
  /** PAGES: the pages the slides paginate into at a per-view count. value ⌈slides / perView⌉. */
  static pages(slides: number, perView: number): CrossFormula { return c('slider-pages', 'pages(slides, perView) = ⌈slides / perView⌉', perView > 0 ? Math.ceil(slides / perView) : 0, nat(slides, perView) && perView > 0, 'pages', [slides, perView]) }
}

for (const name of ['autoplay', 'gap', 'index', 'loop', 'pages', 'slides', 'transition', 'visible'] as const)
  hexRegisterOf('slider', name, (SliderFormulas[name] as (...x: unknown[]) => unknown).bind(SliderFormulas))
