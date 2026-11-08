import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TECTONICS — PLATE MOTION AS ARITHMETIC (chosen by the registry, not by hand). Moving plates are numbers: how fast a
 *  ridge spreads, strain accumulated over time, total displacement, slip released per event, two plates' convergence,
 *  net elevation after erosion, stress on a fault, and a plate's velocity. Crosses to `seismology` — tectonics is what
 *  seismology records. A measure. */

const PROOF = 'tectonics arithmetic (spreading rate, strain rate, displacement, slip per event, convergence, elevation, fault stress, plate velocity); a plate-motion domain; a measure crossed to seismology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tectonics', dst: 'seismology', formula, value, proof: PROOF, ...extra }, holds, { name: `tectonics.${name}`, params })

export class TectonicsFormulas {
  /** SPREADING RATE: distance opened over the years. value ⌊distance / years⌋. */
  static spreadingrate(distance: number, years: number): CrossFormula { return c('tectonics-spreadingrate', 'spreadingrate(distance, years) = ⌊distance / years⌋', years > 0 ? Math.floor(distance / years) : 0, nat(distance, years) && years > 0, 'spreadingrate', [distance, years]) }
  /** STRAIN RATE: strain accumulated per unit time, scaled by a hundred. value ⌊strain · 100 / time⌋. */
  static straindrate(strain: number, time: number): CrossFormula { return c('tectonics-straindrate', 'straindrate(strain, time) = ⌊strain · 100 / time⌋', time > 0 ? Math.floor((strain * 100) / time) : 0, nat(strain, time) && time > 0, 'straindrate', [strain, time]) }
  /** DISPLACEMENT: a rate held over the years. value rate · years. */
  static displacement(rate: number, years: number): CrossFormula { return c('tectonics-displacement', 'displacement(rate, years) = rate · years', rate * years, nat(rate, years), 'displacement', [rate, years]) }
  /** SLIP: total displacement released per event. value ⌊total / events⌋. */
  static slip(total: number, events: number): CrossFormula { return c('tectonics-slip', 'slip(total, events) = ⌊total / events⌋', events > 0 ? Math.floor(total / events) : 0, nat(total, events) && events > 0, 'slip', [total, events]) }
  /** CONVERGENCE: two plates closing, their rates summed. value plateA + plateB. */
  static convergence(plateA: number, plateB: number): CrossFormula { return c('tectonics-convergence', 'convergence(plateA, plateB) = plateA + plateB', plateA + plateB, nat(plateA, plateB), 'convergence', [plateA, plateB]) }
  /** ELEVATION: net uplift after erosion, never below zero. value max(0, uplift − erosion). */
  static elevation(uplift: number, erosion: number): CrossFormula { return c('tectonics-elevation', 'elevation(uplift, erosion) = max(0, uplift − erosion)', Math.max(0, uplift - erosion), nat(uplift, erosion), 'elevation', [uplift, erosion]) }
  /** STRESS: force borne over the fault area. value ⌊force / area⌋. */
  static stress(force: number, area: number): CrossFormula { return c('tectonics-stress', 'stress(force, area) = ⌊force / area⌋', area > 0 ? Math.floor(force / area) : 0, nat(force, area) && area > 0, 'stress', [force, area]) }
  /** PLATE VELOCITY: distance travelled over the time taken. value ⌊distance / time⌋. */
  static platevelocity(distance: number, time: number): CrossFormula { return c('tectonics-platevelocity', 'platevelocity(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'platevelocity', [distance, time]) }
}

for (const name of ['convergence', 'displacement', 'elevation', 'platevelocity', 'slip', 'spreadingrate', 'straindrate', 'stress'] as const)
  hexRegisterOf('tectonics', name, (TectonicsFormulas[name] as (...x: unknown[]) => unknown).bind(TectonicsFormulas))
