import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MEMORY — HOW WHAT IS LEARNED IS KEPT, LOST, AND FOUND AGAIN, AS ARITHMETIC. Retention of what was learned, the
 *  forgetting of what faded, recall and recognition of what was stored, the span of what is held, consolidation of what
 *  was encoded, interference across trials, and the spacing of reviews. Crosses to `neurology` — memory is what the brain
 *  does. A measure. */

const PROOF = 'memory arithmetic (retention, forgetting, recall, recognition, span, consolidation, interference, spacing); how what is learned is kept, lost, and found; a measure crossed to neurology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'memory', dst: 'neurology', formula, value, proof: PROOF, ...extra }, holds, { name: `memory.${name}`, params })

export class MemoryFormulas {
  /** RETENTION: what is remembered of what was learned, as a percentage. value ⌊remembered · 100 / learned⌋. */
  static retention(remembered: number, learned: number): CrossFormula { return c('memory-retention', 'retention(remembered, learned) = ⌊remembered · 100 / learned⌋', learned > 0 ? Math.floor((remembered * 100) / learned) : 0, nat(remembered, learned) && learned > 0 && remembered <= learned, 'retention', [remembered, learned]) }
  /** FORGETTING: what is lost of the initial, as a percentage. value ⌊forgotten · 100 / initial⌋. */
  static forgetting(forgotten: number, initial: number): CrossFormula { return c('memory-forgetting', 'forgetting(forgotten, initial) = ⌊forgotten · 100 / initial⌋', initial > 0 ? Math.floor((forgotten * 100) / initial) : 0, nat(forgotten, initial) && initial > 0 && forgotten <= initial, 'forgetting', [forgotten, initial]) }
  /** RECALL: what is retrieved of what was stored, as a percentage. value ⌊retrieved · 100 / stored⌋. */
  static recall(retrieved: number, stored: number): CrossFormula { return c('memory-recall', 'recall(retrieved, stored) = ⌊retrieved · 100 / stored⌋', stored > 0 ? Math.floor((retrieved * 100) / stored) : 0, nat(retrieved, stored) && stored > 0 && retrieved <= stored, 'recall', [retrieved, stored]) }
  /** RECOGNITION: what is identified of what was presented, as a percentage. value ⌊identified · 100 / presented⌋. */
  static recognition(identified: number, presented: number): CrossFormula { return c('memory-recognition', 'recognition(identified, presented) = ⌊identified · 100 / presented⌋', presented > 0 ? Math.floor((identified * 100) / presented) : 0, nat(identified, presented) && presented > 0 && identified <= presented, 'recognition', [identified, presented]) }
  /** SPAN: the number of items held at once. value items. */
  static span(items: number): CrossFormula { return c('memory-span', 'span(items) = items', items, nat(items), 'span', [items]) }
  /** CONSOLIDATION: what is stabilized of what was encoded, as a percentage. value ⌊stabilized · 100 / encoded⌋. */
  static consolidation(stabilized: number, encoded: number): CrossFormula { return c('memory-consolidation', 'consolidation(stabilized, encoded) = ⌊stabilized · 100 / encoded⌋', encoded > 0 ? Math.floor((stabilized * 100) / encoded) : 0, nat(stabilized, encoded) && encoded > 0 && stabilized <= encoded, 'consolidation', [stabilized, encoded]) }
  /** INTERFERENCE: errors across trials, as a percentage. value ⌊errors · 100 / trials⌋. */
  static interference(errors: number, trials: number): CrossFormula { return c('memory-interference', 'interference(errors, trials) = ⌊errors · 100 / trials⌋', trials > 0 ? Math.floor((errors * 100) / trials) : 0, nat(errors, trials) && trials > 0 && errors <= trials, 'interference', [errors, trials]) }
  /** SPACING: reviews over the interval between them. value ⌊reviews / interval⌋. */
  static spacing(reviews: number, interval: number): CrossFormula { return c('memory-spacing', 'spacing(reviews, interval) = ⌊reviews / interval⌋', interval > 0 ? Math.floor(reviews / interval) : 0, nat(reviews, interval) && interval > 0, 'spacing', [reviews, interval]) }
}

for (const name of ['consolidation', 'forgetting', 'interference', 'recall', 'recognition', 'retention', 'spacing', 'span'] as const)
  hexRegisterOf('memory', name, (MemoryFormulas[name] as (...x: unknown[]) => unknown).bind(MemoryFormulas))
