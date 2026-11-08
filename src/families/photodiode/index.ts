import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PHOTODIODE — LIGHT TURNED INTO CURRENT, AS ARITHMETIC. A photodiode is numbers: how much current each watt of light
 *  makes (responsivity), the current a given power yields (photocurrent), the fraction of photons that become carriers
 *  (quantum efficiency), the leakage in the dark (dark current), the signal over the noise, how fast it responds (rise
 *  time), the shunt resistance from its I–V slope, and whether the photocurrent has saturated. Crosses to `optics` — the
 *  photodiode is where optics becomes electronics. A measure. */

const PROOF = 'photodiode arithmetic (responsivity, photocurrent, quantum efficiency, dark current, SNR, rise time, shunt resistance, saturation); light turned into current; a measure crossed to optics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'photodiode', dst: 'optics', formula, value, proof: PROOF, ...extra }, holds, { name: `photodiode.${name}`, params })

export class PhotodiodeFormulas {
  /** RESPONSIVITY: photocurrent per unit optical power. value ⌊current / power⌋. */
  static responsivity(current: number, power: number): CrossFormula { return c('photodiode-responsivity', 'responsivity(current, power) = ⌊current / power⌋', power > 0 ? Math.floor(current / power) : 0, nat(current, power) && power > 0, 'responsivity', [current, power]) }
  /** PHOTOCURRENT: responsivity times the incident power. value responsivity · power. */
  static photocurrent(responsivity: number, power: number): CrossFormula { return c('photodiode-photocurrent', 'photocurrent(responsivity, power) = responsivity · power', responsivity * power, nat(responsivity, power), 'photocurrent', [responsivity, power]) }
  /** QUANTUM EFFICIENCY: carriers collected per incident photon, as a percentage. value ⌊electrons · 100 / photons⌋. */
  static quantumefficiency(electrons: number, photons: number): CrossFormula { return c('photodiode-quantumefficiency', 'quantumefficiency(electrons, photons) = ⌊electrons · 100 / photons⌋', photons > 0 ? Math.floor((electrons * 100) / photons) : 0, nat(electrons, photons) && photons > 0 && electrons <= photons, 'quantumefficiency', [electrons, photons]) }
  /** DARK CURRENT: leakage density over the junction area. value density · area. */
  static darkcurrent(density: number, area: number): CrossFormula { return c('photodiode-darkcurrent', 'darkcurrent(density, area) = density · area', density * area, nat(density, area), 'darkcurrent', [density, area]) }
  /** SIGNAL-TO-NOISE RATIO: signal current over noise current. value ⌊signal / noise⌋. */
  static snr(signal: number, noise: number): CrossFormula { return c('photodiode-snr', 'snr(signal, noise) = ⌊signal / noise⌋', noise > 0 ? Math.floor(signal / noise) : 0, nat(signal, noise) && noise > 0, 'snr', [signal, noise]) }
  /** RISE TIME: 2.2 RC of the junction. value ⌊22 · resistance · capacitance / 10⌋. */
  static risetime(resistance: number, capacitance: number): CrossFormula { return c('photodiode-risetime', 'risetime(resistance, capacitance) = ⌊22 · resistance · capacitance / 10⌋', Math.floor((22 * resistance * capacitance) / 10), nat(resistance, capacitance), 'risetime', [resistance, capacitance]) }
  /** SHUNT RESISTANCE: the I–V slope near zero bias. value ⌊voltage / current⌋. */
  static shuntresistance(voltage: number, current: number): CrossFormula { return c('photodiode-shuntresistance', 'shuntresistance(voltage, current) = ⌊voltage / current⌋', current > 0 ? Math.floor(voltage / current) : 0, nat(voltage, current) && current > 0, 'shuntresistance', [voltage, current]) }
  /** SATURATION: 1 when the photocurrent meets its maximum. value [current ≥ max]. */
  static saturation(current: number, max: number): CrossFormula { return c('photodiode-saturation', 'saturation(current, max) = [current ≥ max]', current >= max ? 1 : 0, nat(current, max), 'saturation', [current, max]) }
}

for (const name of ['darkcurrent', 'photocurrent', 'quantumefficiency', 'responsivity', 'risetime', 'saturation', 'shuntresistance', 'snr'] as const)
  hexRegisterOf('photodiode', name, (PhotodiodeFormulas[name] as (...x: unknown[]) => unknown).bind(PhotodiodeFormulas))
