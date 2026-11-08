import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STRAINGAUGE — THE BONDED RESISTANCE STRAIN GAUGE, AS ARITHMETIC. Measuring deformation is numbers: the gauge factor
 *  that ties resistance to strain, the strain from a displacement, the fractional resistance change, the Wheatstone
 *  quarter-bridge output, Hooke's-law stress, strain in microstrain, the load-cell sensitivity, and the thermal output
 *  error. Crosses to `mechanical` — a strain gauge is what reads a mechanical member. A measure. */

const PROOF = 'straingauge arithmetic (gauge factor, strain, resistance change, bridge output, stress, microstrain, sensitivity, temperature error); the transducer that reads deformation; a measure crossed to mechanical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'straingauge', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, { name: `straingauge.${name}`, params })

export class StraingaugeFormulas {
  /** GAUGE FACTOR: the fractional resistance change (ppm) over the strain (µε). value ⌊deltar / strain⌋. */
  static gaugefactor(deltar: number, strain: number): CrossFormula { return c('straingauge-gaugefactor', 'gaugefactor(deltar, strain) = ⌊deltar / strain⌋', strain > 0 ? Math.floor(deltar / strain) : 0, nat(deltar, strain) && strain > 0, 'gaugefactor', [deltar, strain]) }
  /** STRAIN: a displacement over a gauge length, in microstrain. value ⌊deltal · 1000000 / length⌋. */
  static strain(deltal: number, length: number): CrossFormula { return c('straingauge-strain', 'strain(deltal, length) = ⌊deltal · 1000000 / length⌋', length > 0 ? Math.floor((deltal * 1000000) / length) : 0, nat(deltal, length) && length > 0, 'strain', [deltal, length]) }
  /** RESISTANCE CHANGE: the gauge factor times the strain (µε), in ppm. value gf · strain. */
  static resistancechange(gf: number, strain: number): CrossFormula { return c('straingauge-resistancechange', 'resistancechange(gf, strain) = gf · strain', gf * strain, nat(gf, strain), 'resistancechange', [gf, strain]) }
  /** BRIDGE OUTPUT: a Wheatstone quarter-bridge at an excitation (mV) and fractional change (ppm). value ⌊excitation · ratio / 4000⌋. */
  static bridgeoutput(excitation: number, ratio: number): CrossFormula { return c('straingauge-bridgeoutput', 'bridgeoutput(excitation, ratio) = ⌊excitation · ratio / 4000⌋', Math.floor((excitation * ratio) / 4000), nat(excitation, ratio), 'bridgeoutput', [excitation, ratio]) }
  /** STRESS: Hooke's law, the strain (µε) times the elastic modulus. value strain · modulus. */
  static stress(strain: number, modulus: number): CrossFormula { return c('straingauge-stress', 'stress(strain, modulus) = strain · modulus', strain * modulus, nat(strain, modulus), 'stress', [strain, modulus]) }
  /** MICROSTRAIN: the strain a fractional resistance change (ppm) implies at a gauge factor. value ⌊ratio / gf⌋. */
  static microstrain(ratio: number, gf: number): CrossFormula { return c('straingauge-microstrain', 'microstrain(ratio, gf) = ⌊ratio / gf⌋', gf > 0 ? Math.floor(ratio / gf) : 0, nat(ratio, gf) && gf > 0, 'microstrain', [ratio, gf]) }
  /** SENSITIVITY: an output per excitation, in mV per V. value ⌊output · 1000 / excitation⌋. */
  static sensitivity(output: number, excitation: number): CrossFormula { return c('straingauge-sensitivity', 'sensitivity(output, excitation) = ⌊output · 1000 / excitation⌋', excitation > 0 ? Math.floor((output * 1000) / excitation) : 0, nat(output, excitation) && excitation > 0, 'sensitivity', [output, excitation]) }
  /** TEMPERATURE ERROR: thermal output, the temperature coefficient (ppm/°C) over a span. value tcr · deltat. */
  static temperatureerror(tcr: number, deltat: number): CrossFormula { return c('straingauge-temperatureerror', 'temperatureerror(tcr, deltat) = tcr · deltat', tcr * deltat, nat(tcr, deltat), 'temperatureerror', [tcr, deltat]) }
}

for (const name of ['bridgeoutput', 'gaugefactor', 'microstrain', 'resistancechange', 'sensitivity', 'strain', 'stress', 'temperatureerror'] as const)
  hexRegisterOf('straingauge', name, (StraingaugeFormulas[name] as (...x: unknown[]) => unknown).bind(StraingaugeFormulas))
