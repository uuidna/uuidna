import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LASERS — COHERENT LIGHT, AS ARITHMETIC. A laser is numbers: the amplifier gain, the average power from the pulse train,
 *  the energy carried by one pulse, how often it fires, how fast the beam spreads, how far it stays coherent, the energy
 *  dumped on an area, and the colour it emits. Crosses to `optics` — a laser is what optics shapes. A measure. */

const PROOF = 'lasers arithmetic (gain, average power, pulse energy, repetition rate, beam divergence, coherence length, fluence, wavelength); coherent light as a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lasers', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `lasers.${name}`, params })

export class LasersFormulas {
  /** GAIN: the amplifier ratio of output power to input power. value ⌊pout / pin⌋. */
  static gain(pout: number, pin: number): CrossFormula { return c('lasers-gain', 'gain(pout, pin) = ⌊pout / pin⌋', pin > 0 ? Math.floor(pout / pin) : 0, nat(pout, pin) && pin > 0, 'gain', [pout, pin]) }
  /** AVERAGE POWER: pulse energy times how often it fires. value energy · rate. */
  static power(energy: number, rate: number): CrossFormula { return c('lasers-power', 'power(energy, rate) = energy · rate', energy * rate, nat(energy, rate), 'power', [energy, rate]) }
  /** PULSE ENERGY: average power shared across the pulses per second. value ⌊power / rate⌋. */
  static pulseenergy(power: number, rate: number): CrossFormula { return c('lasers-pulseenergy', 'pulseenergy(power, rate) = ⌊power / rate⌋', rate > 0 ? Math.floor(power / rate) : 0, nat(power, rate) && rate > 0, 'pulseenergy', [power, rate]) }
  /** REPETITION RATE: pulses over seconds. value ⌊pulses / seconds⌋. */
  static repetitionrate(pulses: number, seconds: number): CrossFormula { return c('lasers-repetitionrate', 'repetitionrate(pulses, seconds) = ⌊pulses / seconds⌋', seconds > 0 ? Math.floor(pulses / seconds) : 0, nat(pulses, seconds) && seconds > 0, 'repetitionrate', [pulses, seconds]) }
  /** BEAM DIVERGENCE: the spread per distance, in milliradians. value ⌊spread · 1000 / distance⌋. */
  static beamdivergence(spread: number, distance: number): CrossFormula { return c('lasers-beamdivergence', 'beamdivergence(spread, distance) = ⌊spread · 1000 / distance⌋', distance > 0 ? Math.floor((spread * 1000) / distance) : 0, nat(spread, distance) && distance > 0, 'beamdivergence', [spread, distance]) }
  /** COHERENCE LENGTH: how far the wave stays in step, speed over bandwidth. value ⌊speed / bandwidth⌋. */
  static coherencelength(speed: number, bandwidth: number): CrossFormula { return c('lasers-coherencelength', 'coherencelength(speed, bandwidth) = ⌊speed / bandwidth⌋', bandwidth > 0 ? Math.floor(speed / bandwidth) : 0, nat(speed, bandwidth) && bandwidth > 0, 'coherencelength', [speed, bandwidth]) }
  /** FLUENCE: pulse energy spread over the spot area. value ⌊energy / area⌋. */
  static fluence(energy: number, area: number): CrossFormula { return c('lasers-fluence', 'fluence(energy, area) = ⌊energy / area⌋', area > 0 ? Math.floor(energy / area) : 0, nat(energy, area) && area > 0, 'fluence', [energy, area]) }
  /** WAVELENGTH: the colour emitted, speed over frequency. value ⌊speed / frequency⌋. */
  static wavelength(speed: number, frequency: number): CrossFormula { return c('lasers-wavelength', 'wavelength(speed, frequency) = ⌊speed / frequency⌋', frequency > 0 ? Math.floor(speed / frequency) : 0, nat(speed, frequency) && frequency > 0, 'wavelength', [speed, frequency]) }
}

for (const name of ['beamdivergence', 'coherencelength', 'fluence', 'gain', 'power', 'pulseenergy', 'repetitionrate', 'wavelength'] as const)
  hexRegisterOf('lasers', name, (LasersFormulas[name] as (...x: unknown[]) => unknown).bind(LasersFormulas))
