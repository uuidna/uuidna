import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COACHING — TRAINING LOAD AS ARITHMETIC. Preparing a body is numbers: how a macrocycle splits into blocks, the taper
 *  before a race, progressive overload, the work-to-rest ratio, readiness from recovery, the acute:chronic workload ratio,
 *  the peak as fitness minus fatigue, and the deload week. Crosses to `physiology` — coaching is what the body's limits
 *  answer to. A measure. */

const PROOF = 'coaching arithmetic (periodization, taper, overload, work:rest, readiness, acwr, peaking, deload); training load as hex-addressable integers; a measure crossed to physiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'coaching', dst: 'physiology', formula, value, proof: PROOF, ...extra }, holds, { name: `coaching.${name}`, params })

export class CoachingFormulas {
  /** ACUTE:CHRONIC WORKLOAD RATIO, scaled by 100. value ⌊acute · 100 / chronic⌋. */
  static acwr(acute: number, chronic: number): CrossFormula { return c('coaching-acwr', 'acwr(acute, chronic) = ⌊acute · 100 / chronic⌋', chronic > 0 ? Math.floor((acute * 100) / chronic) : 0, nat(acute, chronic) && chronic > 0, 'acwr', [acute, chronic]) }
  /** DELOAD: a reduced-volume week at a percent of normal. value ⌊volume · pct / 100⌋. */
  static deload(volume: number, pct: number): CrossFormula { return c('coaching-deload', 'deload(volume, pct) = ⌊volume · pct / 100⌋', Math.floor((volume * pct) / 100), nat(volume, pct) && pct <= 100, 'deload', [volume, pct]) }
  /** PROGRESSIVE OVERLOAD: load raised by a percent. value load + ⌊load · pct / 100⌋. */
  static overload(load: number, pct: number): CrossFormula { return c('coaching-overload', 'overload(load, pct) = load + ⌊load · pct / 100⌋', load + Math.floor((load * pct) / 100), nat(load, pct), 'overload', [load, pct]) }
  /** PEAKING: form on race day is fitness minus fatigue. value max(0, fitness − fatigue). */
  static peaking(fitness: number, fatigue: number): CrossFormula { return c('coaching-peaking', 'peaking(fitness, fatigue) = max(0, fitness − fatigue)', Math.max(0, fitness - fatigue), nat(fitness, fatigue), 'peaking', [fitness, fatigue]) }
  /** PERIODIZATION: weeks of a macrocycle split across blocks. value ⌊weeks / blocks⌋. */
  static periodization(weeks: number, blocks: number): CrossFormula { return c('coaching-periodization', 'periodization(weeks, blocks) = ⌊weeks / blocks⌋', blocks > 0 ? Math.floor(weeks / blocks) : 0, nat(weeks, blocks) && blocks > 0, 'periodization', [weeks, blocks]) }
  /** READINESS: today's recovery against baseline, as a percentage. value ⌊hrv · 100 / baseline⌋. */
  static readiness(hrv: number, baseline: number): CrossFormula { return c('coaching-readiness', 'readiness(hrv, baseline) = ⌊hrv · 100 / baseline⌋', baseline > 0 ? Math.floor((hrv * 100) / baseline) : 0, nat(hrv, baseline) && baseline > 0, 'readiness', [hrv, baseline]) }
  /** TAPER: volume cut by a percent before a race. value ⌊volume · (100 − pct) / 100⌋. */
  static taper(volume: number, pct: number): CrossFormula { return c('coaching-taper', 'taper(volume, pct) = ⌊volume · (100 − pct) / 100⌋', Math.floor((volume * Math.max(0, 100 - pct)) / 100), nat(volume, pct) && pct <= 100, 'taper', [volume, pct]) }
  /** WORK:REST RATIO of an interval session. value ⌊work / rest⌋. */
  static workratio(work: number, rest: number): CrossFormula { return c('coaching-workratio', 'workratio(work, rest) = ⌊work / rest⌋', rest > 0 ? Math.floor(work / rest) : 0, nat(work, rest) && rest > 0, 'workratio', [work, rest]) }
}

for (const name of ['acwr', 'deload', 'overload', 'peaking', 'periodization', 'readiness', 'taper', 'workratio'] as const)
  hexRegisterOf('coaching', name, (CoachingFormulas[name] as (...x: unknown[]) => unknown).bind(CoachingFormulas))
