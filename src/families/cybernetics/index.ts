import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CYBERNETICS — THE SCIENCE OF CONTROL AND COMMUNICATION, AS ARITHMETIC. A system steering itself is numbers: feedback as a
 *  ratio of output to input, open-loop gain, the setpoint error, how bounded the system stays, control-loop delay, the states
 *  it can occupy, the correction rate, and homeostasis. Crosses to `robotics` — cybernetics is what a robot's loop runs on. A measure. */

const PROOF = 'cybernetics arithmetic (feedback, gain, setpoint error, stability, loop latency, entropy, control rate, homeostasis); the science of control as numbers; a measure crossed to robotics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cybernetics', dst: 'robotics', formula, value, proof: PROOF, ...extra }, holds, { name: `cybernetics.${name}`, params })

export class CyberneticsFormulas {
  /** FEEDBACK: output over input as a percentage. value ⌊output · 100 / input⌋. */
  static feedback(output: number, input: number): CrossFormula { return c('cybernetics-feedback', 'feedback(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0, 'feedback', [output, input]) }
  /** GAIN: response over stimulus as a percentage. value ⌊response · 100 / stimulus⌋. */
  static gain(response: number, stimulus: number): CrossFormula { return c('cybernetics-gain', 'gain(response, stimulus) = ⌊response · 100 / stimulus⌋', stimulus > 0 ? Math.floor((response * 100) / stimulus) : 0, nat(response, stimulus) && stimulus > 0, 'gain', [response, stimulus]) }
  /** SETPOINT: the error between target and actual. value max(0, target − actual). */
  static setpoint(target: number, actual: number): CrossFormula { return c('cybernetics-setpoint', 'setpoint(target, actual) = max(0, target − actual)', Math.max(0, target - actual), nat(target, actual), 'setpoint', [target, actual]) }
  /** STABILITY: the bounded share of total as a percentage. value ⌊bounded · 100 / total⌋. */
  static stability(bounded: number, total: number): CrossFormula { return c('cybernetics-stability', 'stability(bounded, total) = ⌊bounded · 100 / total⌋', total > 0 ? Math.floor((bounded * 100) / total) : 0, nat(bounded, total) && total > 0 && bounded <= total, 'stability', [bounded, total]) }
  /** LATENCY: the loop delay per cycle. value ⌊delay / cycles⌋. */
  static latency(delay: number, cycles: number): CrossFormula { return c('cybernetics-latency', 'latency(delay, cycles) = ⌊delay / cycles⌋', cycles > 0 ? Math.floor(delay / cycles) : 0, nat(delay, cycles) && cycles > 0, 'latency', [delay, cycles]) }
  /** ENTROPY: the states the system can occupy. value states. */
  static entropy(states: number): CrossFormula { return c('cybernetics-entropy', 'entropy(states) = states', states, nat(states), 'entropy', [states]) }
  /** CONTROL: corrections over errors as a percentage. value ⌊corrections · 100 / errors⌋. */
  static control(corrections: number, errors: number): CrossFormula { return c('cybernetics-control', 'control(corrections, errors) = ⌊corrections · 100 / errors⌋', errors > 0 ? Math.floor((corrections * 100) / errors) : 0, nat(corrections, errors) && errors > 0, 'control', [corrections, errors]) }
  /** HOMEOSTASIS: the regulated share of a perturbation as a percentage. value ⌊regulated · 100 / perturbation⌋. */
  static homeostasis(regulated: number, perturbation: number): CrossFormula { return c('cybernetics-homeostasis', 'homeostasis(regulated, perturbation) = ⌊regulated · 100 / perturbation⌋', perturbation > 0 ? Math.floor((regulated * 100) / perturbation) : 0, nat(regulated, perturbation) && perturbation > 0, 'homeostasis', [regulated, perturbation]) }
}

for (const name of ['control', 'entropy', 'feedback', 'gain', 'homeostasis', 'latency', 'setpoint', 'stability'] as const)
  hexRegisterOf('cybernetics', name, (CyberneticsFormulas[name] as (...x: unknown[]) => unknown).bind(CyberneticsFormulas))
