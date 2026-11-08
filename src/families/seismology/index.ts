import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SEISMOLOGY — EARTHQUAKE SCIENCE, AS ARITHMETIC. A quake is numbers: the Richter magnitude of an amplitude, the log-energy it
 *  releases, the S-P distance to the source, the felt intensity at a depth, the Omori aftershock decay, the triangulated
 *  epicenter, the recurrence frequency over years, and the seismic moment. Crosses to `cern` — the earth read as a detector.
 *  A measure. */

const PROOF = 'seismology arithmetic (magnitude, energy, distance, intensity, aftershocks, epicenter, frequency, moment); earthquake science as integer measure crossed to cern'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'seismology', dst: 'cern', formula, value, proof: PROOF, ...extra }, holds, { name: `seismology.${name}`, params })

export class SeismologyFormulas {
  /** MAGNITUDE: a Richter proxy from recorded amplitude. value ⌊amplitude / 100⌋. */
  static magnitude(amplitude: number): CrossFormula { return c('seismology-magnitude', 'magnitude(amplitude) = ⌊amplitude / 100⌋', Math.floor(amplitude / 100), nat(amplitude), 'magnitude', [amplitude]) }
  /** ENERGY: a log-energy proxy of a magnitude. value magnitude · magnitude. */
  static energy(magnitude: number): CrossFormula { return c('seismology-energy', 'energy(magnitude) = magnitude · magnitude', magnitude * magnitude, nat(magnitude), 'energy', [magnitude]) }
  /** DISTANCE: S-P travel at a velocity over a time. value time · velocity. */
  static distance(time: number, velocity: number): CrossFormula { return c('seismology-distance', 'distance(time, velocity) = time · velocity', time * velocity, nat(time, velocity), 'distance', [time, velocity]) }
  /** INTENSITY: felt intensity of a magnitude at a depth. value ⌊magnitude · 100 / depth⌋. */
  static intensity(magnitude: number, depth: number): CrossFormula { return c('seismology-intensity', 'intensity(magnitude, depth) = ⌊magnitude · 100 / depth⌋', depth > 0 ? Math.floor((magnitude * 100) / depth) : 0, nat(magnitude, depth) && depth > 0, 'intensity', [magnitude, depth]) }
  /** AFTERSHOCKS: Omori decay of a main shock over days. value ⌊main · 10 / days⌋. */
  static aftershocks(main: number, days: number): CrossFormula { return c('seismology-aftershocks', 'aftershocks(main, days) = ⌊main · 10 / days⌋', days > 0 ? Math.floor((main * 10) / days) : 0, nat(main, days) && days > 0, 'aftershocks', [main, days]) }
  /** EPICENTER: triangulation proxy, the sum of two bearings. value a + b. */
  static epicenter(a: number, b: number): CrossFormula { return c('seismology-epicenter', 'epicenter(a, b) = a + b', a + b, nat(a, b), 'epicenter', [a, b]) }
  /** FREQUENCY: recurrence, a count of quakes over years. value ⌊count / years⌋. */
  static frequency(count: number, years: number): CrossFormula { return c('seismology-frequency', 'frequency(count, years) = ⌊count / years⌋', years > 0 ? Math.floor(count / years) : 0, nat(count, years) && years > 0, 'frequency', [count, years]) }
  /** MOMENT: seismic moment, the slip over a rupture area. value area · slip. */
  static moment(area: number, slip: number): CrossFormula { return c('seismology-moment', 'moment(area, slip) = area · slip', area * slip, nat(area, slip), 'moment', [area, slip]) }
}

for (const name of ['aftershocks', 'distance', 'energy', 'epicenter', 'frequency', 'intensity', 'magnitude', 'moment'] as const)
  hexRegisterOf('seismology', name, (SeismologyFormulas[name] as (...x: unknown[]) => unknown).bind(SeismologyFormulas))
