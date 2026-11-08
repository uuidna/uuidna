import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HOVER — THE HOVERCARDS / HOVERHIGHLIGHTS USE CASE (payloadcms/website), AS ARITHMETIC. A pointer rests on a block and
 *  the page answers: the delay before it responds, how much a card scales, how much of a hidden layer is revealed, the
 *  transition time, the stagger across items, the stack depth, the cards on show, the trigger area that counts. Crosses
 *  to `frontend` — hover is what the frontend renders. A measure. */

const PROOF = 'hover arithmetic (delay, scale, reveal, transition, stagger, depth, cards, trigger); the HoverCards/HoverHighlights use case from payloadcms/website; a measure crossed to frontend'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hover', dst: 'frontend', formula, value, proof: PROOF, ...extra }, holds, { name: `hover.${name}`, params })

export class HoverFormulas {
  /** DELAY before the hover responds, in milliseconds. value ms. */
  static delay(ms: number): CrossFormula { return c('hover-delay', 'delay(ms) = ms', ms, nat(ms), 'delay', [ms]) }
  /** SCALE: a base dimension grown by a percentage. value ⌊base · pct / 100⌋. */
  static scale(base: number, pct: number): CrossFormula { return c('hover-scale', 'scale(base, pct) = ⌊base · pct / 100⌋', Math.floor((base * pct) / 100), nat(base, pct), 'scale', [base, pct]) }
  /** REVEAL: how much of a hidden layer is shown, as a percentage. value ⌊hidden · 100 / total⌋. */
  static reveal(hidden: number, total: number): CrossFormula { return c('hover-reveal', 'reveal(hidden, total) = ⌊hidden · 100 / total⌋', total > 0 ? Math.floor((hidden * 100) / total) : 0, nat(hidden, total) && total > 0 && hidden <= total, 'reveal', [hidden, total]) }
  /** TRANSITION time, in milliseconds. value ms. */
  static transition(ms: number): CrossFormula { return c('hover-transition', 'transition(ms) = ms', ms, nat(ms), 'transition', [ms]) }
  /** STAGGER: items each offset by a gap. value items · gap. */
  static stagger(items: number, gap: number): CrossFormula { return c('hover-stagger', 'stagger(items, gap) = items · gap', items * gap, nat(items, gap), 'stagger', [items, gap]) }
  /** DEPTH: the stack layers of the card. value layers. */
  static depth(layers: number): CrossFormula { return c('hover-depth', 'depth(layers) = layers', layers, nat(layers) && layers <= 5, 'depth', [layers]) }
  /** CARDS on show. value count. */
  static cards(count: number): CrossFormula { return c('hover-cards', 'cards(count) = count', count, nat(count), 'cards', [count]) }
  /** TRIGGER: the hot area that counts, as a percentage of the whole. value ⌊area · 100 / total⌋. */
  static trigger(area: number, total: number): CrossFormula { return c('hover-trigger', 'trigger(area, total) = ⌊area · 100 / total⌋', total > 0 ? Math.floor((area * 100) / total) : 0, nat(area, total) && total > 0 && area <= total, 'trigger', [area, total]) }
}

for (const name of ['cards', 'delay', 'depth', 'reveal', 'scale', 'stagger', 'transition', 'trigger'] as const)
  hexRegisterOf('hover', name, (HoverFormulas[name] as (...x: unknown[]) => unknown).bind(HoverFormulas))
