import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ACTIONPOTENTIAL — THE NERVE IMPULSE, AS ARITHMETIC. The spike a neuron fires is numbers: how fast it conducts, how far
 *  the membrane swings when it depolarizes, how long it cannot fire again — the refractory period of the membrane, the voltage it must reach to trigger, the peak
 *  swing, how often it fires, how long it takes to travel, and how far past threshold it overshoots. Crosses to `neurology`
 *  — the action potential is what neurology measures. A measure. */

const PROOF = 'action-potential arithmetic (conduction velocity, depolarization, refractory period, threshold, amplitude, firing frequency, propagation time, overshoot); the nerve impulse as integers; a measure crossed to neurology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'actionpotential', dst: 'neurology', formula, value, proof: PROOF, ...extra }, holds, { name: `actionpotential.${name}`, params })

export class ActionpotentialFormulas {
  /** AMPLITUDE: the full swing from trough to peak. value max(0, peak − trough). */
  static amplitude(peak: number, trough: number): CrossFormula { return c('actionpotential-amplitude', 'amplitude(peak, trough) = max(0, peak − trough)', Math.max(0, peak - trough), nat(peak, trough), 'amplitude', [peak, trough]) }
  /** CONDUCTION VELOCITY: distance over the time it took. value ⌊distance / time⌋. */
  static conductionvelocity(distance: number, time: number): CrossFormula { return c('actionpotential-conductionvelocity', 'conductionvelocity(distance, time) = ⌊distance / time⌋', time > 0 ? Math.floor(distance / time) : 0, nat(distance, time) && time > 0, 'conductionvelocity', [distance, time]) }
  /** DEPOLARIZATION: the rise from rest to peak. value max(0, peak − rest). */
  static depolarization(peak: number, rest: number): CrossFormula { return c('actionpotential-depolarization', 'depolarization(peak, rest) = max(0, peak − rest)', Math.max(0, peak - rest), nat(peak, rest), 'depolarization', [peak, rest]) }
  /** FIRING FREQUENCY: spikes over seconds. value ⌊spikes / seconds⌋. */
  static frequency(spikes: number, seconds: number): CrossFormula { return c('actionpotential-frequency', 'frequency(spikes, seconds) = ⌊spikes / seconds⌋', seconds > 0 ? Math.floor(spikes / seconds) : 0, nat(spikes, seconds) && seconds > 0, 'frequency', [spikes, seconds]) }
  /** OVERSHOOT: how far the peak rises past threshold. value max(0, peak − threshold). */
  static overshoot(peak: number, threshold: number): CrossFormula { return c('actionpotential-overshoot', 'overshoot(peak, threshold) = max(0, peak − threshold)', Math.max(0, peak - threshold), nat(peak, threshold), 'overshoot', [peak, threshold]) }
  /** PROPAGATION TIME: distance at a conduction velocity. value ⌊distance / velocity⌋. */
  static propagationtime(distance: number, velocity: number): CrossFormula { return c('actionpotential-propagationtime', 'propagationtime(distance, velocity) = ⌊distance / velocity⌋', velocity > 0 ? Math.floor(distance / velocity) : 0, nat(distance, velocity) && velocity > 0, 'propagationtime', [distance, velocity]) }
  /** REFRACTORY PERIOD: absolute plus relative. value absolute + relative. */
  static refractoryperiod(absolute: number, relative: number): CrossFormula { return c('actionpotential-refractoryperiod', 'refractoryperiod(absolute, relative) = absolute + relative', absolute + relative, nat(absolute, relative), 'refractoryperiod', [absolute, relative]) }
  /** THRESHOLD: rest plus the voltage delta needed to trigger. value rest + delta. */
  static threshold(rest: number, delta: number): CrossFormula { return c('actionpotential-threshold', 'threshold(rest, delta) = rest + delta', rest + delta, nat(rest, delta), 'threshold', [rest, delta]) }
}

for (const name of ['amplitude', 'conductionvelocity', 'depolarization', 'frequency', 'overshoot', 'propagationtime', 'refractoryperiod', 'threshold'] as const)
  hexRegisterOf('actionpotential', name, (ActionpotentialFormulas[name] as (...x: unknown[]) => unknown).bind(ActionpotentialFormulas))
