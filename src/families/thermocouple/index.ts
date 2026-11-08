import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THERMOCOUPLE — A SENSOR, AS ARITHMETIC (chosen by the public-API registry, not by hand). A junction of two metals is a
 *  voltage: the Seebeck emf for a temperature difference, the temperature read back from that emf, the cold-junction offset,
 *  sensitivity, a linear fit, quantiser resolution, drift compensation, and the measured span. Crosses to `electronics` —
 *  a thermocouple is what an electronics front-end reads. A measure. */

const PROOF = 'thermocouple arithmetic (Seebeck emf, temperature, cold-junction, sensitivity, linearization, resolution, drift, range span); a sensor chosen by the public-API registry; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'thermocouple', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `thermocouple.${name}`, params })

export class ThermocoupleFormulas {
  /** SEEBECK EMF: the Seebeck coefficient over a temperature difference. value seebeck · deltaT. */
  static emf(seebeck: number, deltaT: number): CrossFormula { return c('thermocouple-emf', 'emf(seebeck, deltaT) = seebeck · deltaT', seebeck * deltaT, nat(seebeck, deltaT), 'emf', [seebeck, deltaT]) }
  /** TEMPERATURE: the temperature read back from an emf at a coefficient. value ⌊emf / seebeck⌋. */
  static temperature(emf: number, seebeck: number): CrossFormula { return c('thermocouple-temperature', 'temperature(emf, seebeck) = ⌊emf / seebeck⌋', seebeck > 0 ? Math.floor(emf / seebeck) : 0, nat(emf, seebeck) && seebeck > 0, 'temperature', [emf, seebeck]) }
  /** COLD JUNCTION: the hot-minus-cold compensation offset. value max(0, hot − cold). */
  static coldjunction(hot: number, cold: number): CrossFormula { return c('thermocouple-coldjunction', 'coldjunction(hot, cold) = max(0, hot − cold)', Math.max(0, hot - cold), nat(hot, cold), 'coldjunction', [hot, cold]) }
  /** SENSITIVITY: change in emf over change in temperature. value ⌊deltaEmf / deltaT⌋. */
  static sensitivity(deltaEmf: number, deltaT: number): CrossFormula { return c('thermocouple-sensitivity', 'sensitivity(deltaEmf, deltaT) = ⌊deltaEmf / deltaT⌋', deltaT > 0 ? Math.floor(deltaEmf / deltaT) : 0, nat(deltaEmf, deltaT) && deltaT > 0, 'sensitivity', [deltaEmf, deltaT]) }
  /** LINEARIZATION: a first-order fit, slope · x plus offset. value a · x + b. */
  static linearization(a: number, x: number, b: number): CrossFormula { return c('thermocouple-linearization', 'linearization(a, x, b) = a · x + b', a * x + b, nat(a, x, b), 'linearization', [a, x, b]) }
  /** RESOLUTION: the measured range split over the quantiser levels. value ⌊range / levels⌋. */
  static resolution(range: number, levels: number): CrossFormula { return c('thermocouple-resolution', 'resolution(range, levels) = ⌊range / levels⌋', levels > 0 ? Math.floor(range / levels) : 0, nat(range, levels) && levels > 0, 'resolution', [range, levels]) }
  /** DRIFT COMPENSATION: the measured value less its drift. value max(0, measured − drift). */
  static driftcompensation(measured: number, drift: number): CrossFormula { return c('thermocouple-driftcompensation', 'driftcompensation(measured, drift) = max(0, measured − drift)', Math.max(0, measured - drift), nat(measured, drift), 'driftcompensation', [measured, drift]) }
  /** RANGE SPAN: the span between the maximum and minimum of the range. value max(0, max − min). */
  static rangespan(max: number, min: number): CrossFormula { return c('thermocouple-rangespan', 'rangespan(max, min) = max(0, max − min)', Math.max(0, max - min), nat(max, min), 'rangespan', [max, min]) }
}

for (const name of ['coldjunction', 'driftcompensation', 'emf', 'linearization', 'rangespan', 'resolution', 'sensitivity', 'temperature'] as const)
  hexRegisterOf('thermocouple', name, (ThermocoupleFormulas[name] as (...x: unknown[]) => unknown).bind(ThermocoupleFormulas))
