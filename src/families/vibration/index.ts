import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** VIBRATION — MECHANICAL OSCILLATION AS ARITHMETIC. A vibrating structure is numbers: the natural frequency set by
 *  stiffness over mass, the static amplitude force makes against stiffness, the damping ratio, the resonant harmonics,
 *  the period per cycle, the acceleration a mode carries, how much motion transmits, and the shape a mode draws.
 *  Crosses to `mechanical` — vibration is the mechanical body in motion. A measure. */

const PROOF = 'vibration arithmetic (natural frequency, amplitude, damping ratio, resonance, period, acceleration, transmissibility, mode shape); mechanical oscillation as integers; a measure crossed to mechanical'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'vibration', dst: 'mechanical', formula, value, proof: PROOF, ...extra }, holds, { name: `vibration.${name}`, params })

export class VibrationFormulas {
  /** NATURAL FREQUENCY: stiffness over mass (ω² = k / m). value ⌊stiffness / mass⌋. */
  static naturalfrequency(stiffness: number, mass: number): CrossFormula { return c('vibration-naturalfrequency', 'naturalfrequency(stiffness, mass) = ⌊stiffness / mass⌋', mass > 0 ? Math.floor(stiffness / mass) : 0, nat(stiffness, mass) && mass > 0, 'naturalfrequency', [stiffness, mass]) }
  /** AMPLITUDE: static deflection, force against stiffness (x = F / k). value ⌊force / stiffness⌋. */
  static amplitude(force: number, stiffness: number): CrossFormula { return c('vibration-amplitude', 'amplitude(force, stiffness) = ⌊force / stiffness⌋', stiffness > 0 ? Math.floor(force / stiffness) : 0, nat(force, stiffness) && stiffness > 0, 'amplitude', [force, stiffness]) }
  /** DAMPING RATIO as a percentage of critical (ζ = c / c_c). value ⌊damping · 100 / critical⌋. */
  static dampingratio(damping: number, critical: number): CrossFormula { return c('vibration-dampingratio', 'dampingratio(damping, critical) = ⌊damping · 100 / critical⌋', critical > 0 ? Math.floor((damping * 100) / critical) : 0, nat(damping, critical) && critical > 0 && damping <= critical, 'dampingratio', [damping, critical]) }
  /** RESONANCE: a harmonic multiple of the base frequency. value frequency · harmonic. */
  static resonance(frequency: number, harmonic: number): CrossFormula { return c('vibration-resonance', 'resonance(frequency, harmonic) = frequency · harmonic', frequency * harmonic, nat(frequency, harmonic), 'resonance', [frequency, harmonic]) }
  /** PERIOD: time per cycle. value ⌊time / cycles⌋. */
  static period(time: number, cycles: number): CrossFormula { return c('vibration-period', 'period(time, cycles) = ⌊time / cycles⌋', cycles > 0 ? Math.floor(time / cycles) : 0, nat(time, cycles) && cycles > 0, 'period', [time, cycles]) }
  /** ACCELERATION a mode carries (a = ω² · x). value amplitude · freqsq. */
  static acceleration(amplitude: number, freqsq: number): CrossFormula { return c('vibration-acceleration', 'acceleration(amplitude, freqsq) = amplitude · freqsq', amplitude * freqsq, nat(amplitude, freqsq), 'acceleration', [amplitude, freqsq]) }
  /** TRANSMISSIBILITY: output motion over input, as a percentage. value ⌊output · 100 / input⌋. */
  static transmissibility(output: number, input: number): CrossFormula { return c('vibration-transmissibility', 'transmissibility(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0, 'transmissibility', [output, input]) }
  /** MODE SHAPE: the span a mode draws over a length. value mode · length. */
  static modeshape(mode: number, length: number): CrossFormula { return c('vibration-modeshape', 'modeshape(mode, length) = mode · length', mode * length, nat(mode, length), 'modeshape', [mode, length]) }
}

for (const name of ['acceleration', 'amplitude', 'dampingratio', 'modeshape', 'naturalfrequency', 'period', 'resonance', 'transmissibility'] as const)
  hexRegisterOf('vibration', name, (VibrationFormulas[name] as (...x: unknown[]) => unknown).bind(VibrationFormulas))
