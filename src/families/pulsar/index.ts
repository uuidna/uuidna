import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PULSAR — A NEUTRON STAR'S CLOCK, AS ARITHMETIC (chosen by the registry, not by hand). A spinning magnetised star is
 *  numbers: how fast it turns, how fast it slows, how old that makes it, the field that brakes it, the energy it sheds,
 *  the electrons the pulse crosses, the braking law it obeys, and how wide the beam sweeps. Crosses to `astrophysics` —
 *  a pulsar is what astrophysics measures. A measure. */

const PROOF = 'pulsar arithmetic (spin frequency, period derivative, characteristic age, magnetic field, spin-down luminosity, dispersion measure, braking index, pulse width); integer proxies; a measure crossed to astrophysics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pulsar', dst: 'astrophysics', formula, value, proof: PROOF, ...extra }, holds, { name: `pulsar.${name}`, params })

export class PulsarFormulas {
  /** SPIN FREQUENCY: rotations counted over seconds. value ⌊rotations / seconds⌋. */
  static spinfrequency(rotations: number, seconds: number): CrossFormula { return c('pulsar-spinfrequency', 'spinfrequency(rotations, seconds) = ⌊rotations / seconds⌋', seconds > 0 ? Math.floor(rotations / seconds) : 0, nat(rotations, seconds) && seconds > 0, 'spinfrequency', [rotations, seconds]) }
  /** PERIOD DERIVATIVE: the period's drift over the years observed. value ⌊deltaP / years⌋. */
  static perioddderivative(deltaP: number, years: number): CrossFormula { return c('pulsar-perioddderivative', 'perioddderivative(deltaP, years) = ⌊deltaP / years⌋', years > 0 ? Math.floor(deltaP / years) : 0, nat(deltaP, years) && years > 0, 'perioddderivative', [deltaP, years]) }
  /** CHARACTERISTIC AGE: τ = P / (2·Ṗ). value ⌊period / (2 · pdot)⌋. */
  static characteristicage(period: number, pdot: number): CrossFormula { return c('pulsar-characteristicage', 'characteristicage(period, pdot) = ⌊period / (2 · pdot)⌋', pdot > 0 ? Math.floor(period / (2 * pdot)) : 0, nat(period, pdot) && pdot > 0, 'characteristicage', [period, pdot]) }
  /** MAGNETIC FIELD: B ∝ √(P·Ṗ). value ⌊√(period · pdot)⌋. */
  static magneticfield(period: number, pdot: number): CrossFormula { return c('pulsar-magneticfield', 'magneticfield(period, pdot) = ⌊√(period · pdot)⌋', Math.floor(Math.sqrt(period * pdot)), nat(period, pdot), 'magneticfield', [period, pdot]) }
  /** SPIN-DOWN LUMINOSITY: Ė ∝ I·f·ḟ. value inertia · freq · freqdot. */
  static spindownluminosity(inertia: number, freq: number, freqdot: number): CrossFormula { return c('pulsar-spindownluminosity', 'spindownluminosity(inertia, freq, freqdot) = inertia · freq · freqdot', inertia * freq * freqdot, nat(inertia, freq, freqdot), 'spindownluminosity', [inertia, freq, freqdot]) }
  /** DISPERSION MEASURE: DM = nₑ · d, electrons along the line of sight. value density · distance. */
  static dispersionmeasure(density: number, distance: number): CrossFormula { return c('pulsar-dispersionmeasure', 'dispersionmeasure(density, distance) = density · distance', density * distance, nat(density, distance), 'dispersionmeasure', [density, distance]) }
  /** BRAKING INDEX: n = f·f̈ / ḟ². value ⌊freq · freqddot / freqdot²⌋. */
  static braking(freq: number, freqdot: number, freqddot: number): CrossFormula { return c('pulsar-braking', 'braking(freq, freqdot, freqddot) = ⌊freq · freqddot / freqdot²⌋', freqdot > 0 ? Math.floor((freq * freqddot) / (freqdot * freqdot)) : 0, nat(freq, freqdot, freqddot) && freqdot > 0, 'braking', [freq, freqdot, freqddot]) }
  /** PULSE WIDTH: the beam's duty cycle as a slice of the period. value ⌊period · duty / 100⌋. */
  static pulsewidth(period: number, duty: number): CrossFormula { return c('pulsar-pulsewidth', 'pulsewidth(period, duty) = ⌊period · duty / 100⌋', Math.floor((period * duty) / 100), nat(period, duty) && duty <= 100, 'pulsewidth', [period, duty]) }
}

for (const name of ['braking', 'characteristicage', 'dispersionmeasure', 'magneticfield', 'perioddderivative', 'pulsewidth', 'spindownluminosity', 'spinfrequency'] as const)
  hexRegisterOf('pulsar', name, (PulsarFormulas[name] as (...x: unknown[]) => unknown).bind(PulsarFormulas))
