import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SPINNING — YARN SPINNING, AS ARITHMETIC (the mill floor reduced to numbers). A fibre becomes a yarn by counting it,
 *  twisting it, and weighing it against a length: the count, turns per inch, denier and tex of the linear density, the
 *  tenacity it breaks at, the draft that thins it, the yield off the frame, and how even it runs. Crosses to `materials` —
 *  spinning is what turns a material into a thread. A measure. */

const PROOF = 'spinning arithmetic (count, twist, denier, tenacity, draft, yield, evenness, tex); the yarn mill as linear-density numbers; a measure crossed to materials'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'spinning', dst: 'materials', formula, value, proof: PROOF, ...extra }, holds, { name: `spinning.${name}`, params })

export class SpinningFormulas {
  /** COUNT: hanks of length per unit weight (English cotton count). value ⌊length / weight⌋. */
  static count(length: number, weight: number): CrossFormula { return c('spinning-count', 'count(length, weight) = ⌊length / weight⌋', weight > 0 ? Math.floor(length / weight) : 0, nat(length, weight) && weight > 0, 'count', [length, weight]) }
  /** TWIST: turns inserted over the length, as turns per inch. value ⌊turns / length⌋. */
  static twist(turns: number, length: number): CrossFormula { return c('spinning-twist', 'twist(turns, length) = ⌊turns / length⌋', length > 0 ? Math.floor(turns / length) : 0, nat(turns, length) && length > 0, 'twist', [turns, length]) }
  /** DENIER: grams per 9000 metres of the strand. value ⌊mass · 9000 / length⌋. */
  static denier(mass: number, length: number): CrossFormula { return c('spinning-denier', 'denier(mass, length) = ⌊mass · 9000 / length⌋', length > 0 ? Math.floor((mass * 9000) / length) : 0, nat(mass, length) && length > 0, 'denier', [mass, length]) }
  /** TENACITY: breaking force per unit of linear density. value ⌊force / denier⌋. */
  static tenacity(force: number, denier: number): CrossFormula { return c('spinning-tenacity', 'tenacity(force, denier) = ⌊force / denier⌋', denier > 0 ? Math.floor(force / denier) : 0, nat(force, denier) && denier > 0, 'tenacity', [force, denier]) }
  /** DRAFT: the thinning ratio of delivered length to fed length. value ⌊output / input⌋. */
  static draft(output: number, input: number): CrossFormula { return c('spinning-draft', 'draft(output, input) = ⌊output / input⌋', input > 0 ? Math.floor(output / input) : 0, nat(output, input) && input > 0, 'draft', [output, input]) }
  /** YIELD: good output off the frame as a percentage of what was fed. value ⌊good · 100 / total⌋. */
  static yield(good: number, total: number): CrossFormula { return c('spinning-yield', 'yield(good, total) = ⌊good · 100 / total⌋', total > 0 ? Math.floor((good * 100) / total) : 0, nat(good, total) && total > 0 && good <= total, 'yield', [good, total]) }
  /** EVENNESS: 100 minus the coefficient of variation of mass per length. value max(0, 100 − ⌊variation · 100 / mean⌋). */
  static evenness(variation: number, mean: number): CrossFormula { return c('spinning-evenness', 'evenness(variation, mean) = max(0, 100 − ⌊variation · 100 / mean⌋)', mean > 0 ? Math.max(0, 100 - Math.floor((variation * 100) / mean)) : 0, nat(variation, mean) && mean > 0, 'evenness', [variation, mean]) }
  /** TEX: grams per 1000 metres of the strand. value ⌊mass · 1000 / length⌋. */
  static tex(mass: number, length: number): CrossFormula { return c('spinning-tex', 'tex(mass, length) = ⌊mass · 1000 / length⌋', length > 0 ? Math.floor((mass * 1000) / length) : 0, nat(mass, length) && length > 0, 'tex', [mass, length]) }
}

for (const name of ['count', 'denier', 'draft', 'evenness', 'tenacity', 'tex', 'twist', 'yield'] as const)
  hexRegisterOf('spinning', name, (SpinningFormulas[name] as (...x: unknown[]) => unknown).bind(SpinningFormulas))
