import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** NOISEPOLLUTION — ENVIRONMENTAL NOISE, AS ARITHMETIC (chosen by the public-API registry, not by hand). Unwanted sound is
 *  numbers: the equivalent level over a window, the day-night average with its night penalty, how far a reading exceeds a
 *  limit, the dose a shift accumulates, how a point source drops with distance, a barrier's insertion loss, the margin left
 *  under a limit, and an annoyance index over a population. Crosses to `acoustics` — noise pollution is acoustics felt as
 *  harm. A measure. */

const PROOF = 'noisepollution arithmetic (equivalent level, day-night average, exceedance, exposure dose, distance attenuation, barrier loss, limit margin, annoyance index); a registry domain; a measure crossed to acoustics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'noisepollution', dst: 'acoustics', formula, value, proof: PROOF, ...extra }, holds, { name: `noisepollution.${name}`, params })

export class NoisepollutionFormulas {
  /** EQUIVALENT LEVEL: the summed energy proxy over the window. value ⌊total / time⌋. */
  static leq(total: number, time: number): CrossFormula { return c('noisepollution-leq', 'leq(total, time) = ⌊total / time⌋', time > 0 ? Math.floor(total / time) : 0, nat(total, time) && time > 0, 'leq', [total, time]) }
  /** DAY-NIGHT AVERAGE: 12 day hours and 12 night hours, night penalised by 10. value ⌊(12 · day + 12 · (night + 10)) / 24⌋. */
  static daynight(day: number, night: number): CrossFormula { return c('noisepollution-daynight', 'daynight(day, night) = ⌊(12 · day + 12 · (night + 10)) / 24⌋', Math.floor((12 * day + 12 * (night + 10)) / 24), nat(day, night), 'daynight', [day, night]) }
  /** EXCEEDANCE: how far a reading tops the limit. value max(0, measured − limit). */
  static exceedance(measured: number, limit: number): CrossFormula { return c('noisepollution-exceedance', 'exceedance(measured, limit) = max(0, measured − limit)', Math.max(0, measured - limit), nat(measured, limit), 'exceedance', [measured, limit]) }
  /** EXPOSURE DOSE: level held for a number of hours. value level · hours. */
  static exposuredose(level: number, hours: number): CrossFormula { return c('noisepollution-exposuredose', 'exposuredose(level, hours) = level · hours', level * hours, nat(level, hours), 'exposuredose', [level, hours]) }
  /** DISTANCE ATTENUATION: a point source drops 6 per distance doubling. value max(0, ref − 6 · doublings). */
  static distanceattenuation(ref: number, doublings: number): CrossFormula { return c('noisepollution-distanceattenuation', 'distanceattenuation(ref, doublings) = max(0, ref − 6 · doublings)', Math.max(0, ref - 6 * doublings), nat(ref, doublings), 'distanceattenuation', [ref, doublings]) }
  /** BARRIER LOSS: insertion loss grows with the path difference over the distance. value ⌊height² / distance⌋. */
  static barrierloss(height: number, distance: number): CrossFormula { return c('noisepollution-barrierloss', 'barrierloss(height, distance) = ⌊height² / distance⌋', distance > 0 ? Math.floor((height * height) / distance) : 0, nat(height, distance) && distance > 0, 'barrierloss', [height, distance]) }
  /** LIMIT MARGIN: the headroom left under the limit. value max(0, limit − measured). */
  static limitmargin(limit: number, measured: number): CrossFormula { return c('noisepollution-limitmargin', 'limitmargin(limit, measured) = max(0, limit − measured)', Math.max(0, limit - measured), nat(limit, measured), 'limitmargin', [limit, measured]) }
  /** ANNOYANCE INDEX: the fraction of a population annoyed at a level, per hundred. value ⌊level · population / 100⌋. */
  static annoyanceindex(level: number, population: number): CrossFormula { return c('noisepollution-annoyanceindex', 'annoyanceindex(level, population) = ⌊level · population / 100⌋', Math.floor((level * population) / 100), nat(level, population), 'annoyanceindex', [level, population]) }
}

for (const name of ['annoyanceindex', 'barrierloss', 'daynight', 'distanceattenuation', 'exceedance', 'exposuredose', 'leq', 'limitmargin'] as const)
  hexRegisterOf('noisepollution', name, (NoisepollutionFormulas[name] as (...x: unknown[]) => unknown).bind(NoisepollutionFormulas))
