import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AMPLIFIERS — SIGNAL AMPLIFICATION AS ARITHMETIC (chosen by the component registry, not by hand). An amplifier is numbers:
 *  the gain it applies, its ratio in decibels (an integer proxy, not a log), the bandwidth it passes, how fast it slews,
 *  the input impedance it presents, the output power it delivers, its efficiency, and its common-mode rejection. Crosses to
 *  `electronics` — an amplifier is an electronic circuit measured by these. A measure. */

const PROOF = 'amplifiers arithmetic (voltage gain, decibel ratio proxy, bandwidth, slew rate, input impedance, output power, efficiency, CMRR); a signal-chain domain; a measure crossed to electronics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'amplifiers', dst: 'electronics', formula, value, proof: PROOF, ...extra }, holds, { name: `amplifiers.${name}`, params })

export class AmplifiersFormulas {
  /** VOLTAGE GAIN: output over input. value ⌊vout / vin⌋. */
  static gain(vout: number, vin: number): CrossFormula { return c('amplifiers-gain', 'gain(vout, vin) = ⌊vout / vin⌋', vin > 0 ? Math.floor(vout / vin) : 0, nat(vout, vin) && vin > 0, 'gain', [vout, vin]) }
  /** DECIBELS as an integer ratio proxy (ten times the power ratio, not a log). value ⌊pout · 10 / pin⌋. */
  static decibels(pout: number, pin: number): CrossFormula { return c('amplifiers-decibels', 'decibels(pout, pin) = ⌊pout · 10 / pin⌋', pin > 0 ? Math.floor((pout * 10) / pin) : 0, nat(pout, pin) && pin > 0, 'decibels', [pout, pin]) }
  /** BANDWIDTH: the span between upper and lower cutoff. value max(0, fhigh − flow). */
  static bandwidth(fhigh: number, flow: number): CrossFormula { return c('amplifiers-bandwidth', 'bandwidth(fhigh, flow) = max(0, fhigh − flow)', Math.max(0, fhigh - flow), nat(fhigh, flow) && fhigh >= flow, 'bandwidth', [fhigh, flow]) }
  /** SLEW RATE: volts of swing per unit time. value ⌊voltage / time⌋. */
  static slewrate(voltage: number, time: number): CrossFormula { return c('amplifiers-slewrate', 'slewrate(voltage, time) = ⌊voltage / time⌋', time > 0 ? Math.floor(voltage / time) : 0, nat(voltage, time) && time > 0, 'slewrate', [voltage, time]) }
  /** INPUT IMPEDANCE: the resistance the input presents, voltage over current. value ⌊voltage / current⌋. */
  static inputimpedance(voltage: number, current: number): CrossFormula { return c('amplifiers-inputimpedance', 'inputimpedance(voltage, current) = ⌊voltage / current⌋', current > 0 ? Math.floor(voltage / current) : 0, nat(voltage, current) && current > 0, 'inputimpedance', [voltage, current]) }
  /** OUTPUT POWER: voltage times current at the load. value voltage · current. */
  static outputpower(voltage: number, current: number): CrossFormula { return c('amplifiers-outputpower', 'outputpower(voltage, current) = voltage · current', voltage * current, nat(voltage, current), 'outputpower', [voltage, current]) }
  /** EFFICIENCY: output power as a percentage of input power. value ⌊output · 100 / input⌋. */
  static efficiency(output: number, input: number): CrossFormula { return c('amplifiers-efficiency', 'efficiency(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0, 'efficiency', [output, input]) }
  /** CMRR: common-mode rejection, differential gain over common-mode gain. value ⌊differential / commonmode⌋. */
  static cmrr(differential: number, commonmode: number): CrossFormula { return c('amplifiers-cmrr', 'cmrr(differential, commonmode) = ⌊differential / commonmode⌋', commonmode > 0 ? Math.floor(differential / commonmode) : 0, nat(differential, commonmode) && commonmode > 0, 'cmrr', [differential, commonmode]) }
}

for (const name of ['bandwidth', 'cmrr', 'decibels', 'efficiency', 'gain', 'inputimpedance', 'outputpower', 'slewrate'] as const)
  hexRegisterOf('amplifiers', name, (AmplifiersFormulas[name] as (...x: unknown[]) => unknown).bind(AmplifiersFormulas))
