import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STRATIGRAPHY — THE LAYERED ROCK RECORD, AS ARITHMETIC (reading a section as numbers, not by hand). A column of strata is
 *  measure: how fast sediment fell, the age a bed records, how thick it is between two depths, how far it compacted, the gap an
 *  unconformity hides, how well two sections correlate, how many depositional sequences stack, and how far the basin sank.
 *  Crosses to `geology` — stratigraphy is the time-ordering geology reads from the rock. A measure. */

const PROOF = 'stratigraphy arithmetic (deposition rate, bed age, thickness, compaction, unconformity gap, correlation, sequences, subsidence); the layered rock record as a measure crossed to geology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'stratigraphy', dst: 'geology', formula, value, proof: PROOF, ...extra }, holds, { name: `stratigraphy.${name}`, params })

export class StratigraphyFormulas {
  /** BED AGE: thickness over the deposition rate. value ⌊thickness / rate⌋. */
  static age(thickness: number, rate: number): CrossFormula { return c('stratigraphy-age', 'age(thickness, rate) = ⌊thickness / rate⌋', rate > 0 ? Math.floor(thickness / rate) : 0, nat(thickness, rate) && rate > 0, 'age', [thickness, rate]) }
  /** COMPACTION: how much of the original thickness survives, as a percentage. value ⌊compacted · 100 / original⌋. */
  static compaction(original: number, compacted: number): CrossFormula { return c('stratigraphy-compaction', 'compaction(original, compacted) = ⌊compacted · 100 / original⌋', original > 0 ? Math.floor((compacted * 100) / original) : 0, nat(original, compacted) && original > 0 && compacted <= original, 'compaction', [original, compacted]) }
  /** CORRELATION: matched markers between two sections, as a percentage. value ⌊matched · 100 / total⌋. */
  static correlation(matched: number, total: number): CrossFormula { return c('stratigraphy-correlation', 'correlation(matched, total) = ⌊matched · 100 / total⌋', total > 0 ? Math.floor((matched * 100) / total) : 0, nat(matched, total) && total > 0 && matched <= total, 'correlation', [matched, total]) }
  /** DEPOSITION RATE: sediment thickness over the years that laid it down. value ⌊sediment / years⌋. */
  static depositionrate(sediment: number, years: number): CrossFormula { return c('stratigraphy-depositionrate', 'depositionrate(sediment, years) = ⌊sediment / years⌋', years > 0 ? Math.floor(sediment / years) : 0, nat(sediment, years) && years > 0, 'depositionrate', [sediment, years]) }
  /** SEQUENCES: the depositional cycles a column of beds stacks into. value ⌈beds / perCycle⌉. */
  static sequence(beds: number, perCycle: number): CrossFormula { return c('stratigraphy-sequence', 'sequence(beds, perCycle) = ⌈beds / perCycle⌉', perCycle > 0 ? Math.ceil(beds / perCycle) : 0, nat(beds, perCycle) && perCycle > 0, 'sequence', [beds, perCycle]) }
  /** SUBSIDENCE: how far the basin floor sank under a sediment load at a per-unit rate. value load · rate. */
  static subsidence(load: number, rate: number): CrossFormula { return c('stratigraphy-subsidence', 'subsidence(load, rate) = load · rate', load * rate, nat(load, rate), 'subsidence', [load, rate]) }
  /** THICKNESS: the span of a bed between two depths. value max(0, top − bottom). */
  static thickness(top: number, bottom: number): CrossFormula { return c('stratigraphy-thickness', 'thickness(top, bottom) = max(0, top − bottom)', Math.max(0, top - bottom), nat(top, bottom) && top >= bottom, 'thickness', [top, bottom]) }
  /** UNCONFORMITY: the time gap a missing section hides between an upper and a lower age. value max(0, upper − lower). */
  static unconformity(upper: number, lower: number): CrossFormula { return c('stratigraphy-unconformity', 'unconformity(upper, lower) = max(0, upper − lower)', Math.max(0, upper - lower), nat(upper, lower) && upper >= lower, 'unconformity', [upper, lower]) }
}

for (const name of ['age', 'compaction', 'correlation', 'depositionrate', 'sequence', 'subsidence', 'thickness', 'unconformity'] as const)
  hexRegisterOf('stratigraphy', name, (StratigraphyFormulas[name] as (...x: unknown[]) => unknown).bind(StratigraphyFormulas))
