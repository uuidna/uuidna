import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CONCRETE — THE POUR, AS ARITHMETIC (what a mix is, before it sets). Placing concrete is numbers: the volume of a form,
 *  the cement it needs, the water-to-cement ratio, the slump left after loss, the strength gained over days, the days left
 *  to cure, the parts in a mix, and the rebar a slab takes. Crosses to `materials` — concrete is one material, specified.
 *  A measure. */

const PROOF = 'concrete arithmetic (form volume, cement, water-cement ratio, slump, strength, cure, mix parts, rebar count); the pour before it sets; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'concrete', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `concrete.${name}`, params })

export class ConcreteFormulas {
  /** CEMENT: bags for a volume at a per-unit rate. value volume · bags. */
  static cement(volume: number, bags: number): CrossFormula { return c('concrete-cement', 'cement(volume, bags) = volume · bags', volume * bags, nat(volume, bags), 'cement', [volume, bags]) }
  /** CURE: days of curing still owed against a target. value max(0, target − done). */
  static cure(target: number, done: number): CrossFormula { return c('concrete-cure', 'cure(target, done) = max(0, target − done)', Math.max(0, target - done), nat(target, done), 'cure', [target, done]) }
  /** MIX: the total parts of a cement:sand:gravel mix. value cement + sand + gravel. */
  static mix(cement: number, sand: number, gravel: number): CrossFormula { return c('concrete-mix', 'mix(cement, sand, gravel) = cement + sand + gravel', cement + sand + gravel, nat(cement, sand, gravel), 'mix', [cement, sand, gravel]) }
  /** REBAR: the bars a span takes at a per-bar coverage. value ⌈area / perBar⌉. */
  static rebar(area: number, perBar: number): CrossFormula { return c('concrete-rebar', 'rebar(area, perBar) = ⌈area / perBar⌉', perBar > 0 ? Math.ceil(area / perBar) : 0, nat(area, perBar) && perBar > 0, 'rebar', [area, perBar]) }
  /** SLUMP: the slump (mm) left after loss on the way to the form. value max(0, target − loss). */
  static slump(target: number, loss: number): CrossFormula { return c('concrete-slump', 'slump(target, loss) = max(0, target − loss)', Math.max(0, target - loss), nat(target, loss), 'slump', [target, loss]) }
  /** STRENGTH: compressive strength gained over days at a daily rate. value days · rate. */
  static strength(days: number, rate: number): CrossFormula { return c('concrete-strength', 'strength(days, rate) = days · rate', days * rate, nat(days, rate), 'strength', [days, rate]) }
  /** VOLUME: the volume of a rectangular form. value length · width · height. */
  static volume(length: number, width: number, height: number): CrossFormula { return c('concrete-volume', 'volume(length, width, height) = length · width · height', length * width * height, nat(length, width, height), 'volume', [length, width, height]) }
  /** WATER-CEMENT RATIO as a percentage. value ⌊water · 100 / cement⌋. */
  static watercement(water: number, cement: number): CrossFormula { return c('concrete-watercement', 'watercement(water, cement) = ⌊water · 100 / cement⌋', cement > 0 ? Math.floor((water * 100) / cement) : 0, nat(water, cement) && cement > 0, 'watercement', [water, cement]) }
}

for (const name of ['cement', 'cure', 'mix', 'rebar', 'slump', 'strength', 'volume', 'watercement'] as const)
  hexRegisterOf('concrete', name, (ConcreteFormulas[name] as (...x: unknown[]) => unknown).bind(ConcreteFormulas))
