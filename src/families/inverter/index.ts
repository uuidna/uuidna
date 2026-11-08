import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** INVERTER — DC→AC POWER CONVERSION, AS ARITHMETIC (chosen by the hardware registry, not by hand). A power inverter is
 *  numbers: how efficiently it turns DC into AC, the AC power it delivers, the distortion it adds, the DC it draws, how
 *  hard it clips a peak, its apparent rating, the power it loses as heat, and its power factor. Crosses to `electrical` —
 *  an inverter is an electrical machine. A measure. */

const PROOF = 'inverter arithmetic (efficiency, AC power, THD, DC→AC conversion, clipping, VA rating, loss, power factor); a hardware domain crossed to electrical; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'inverter', dst: 'electrical', formula, value, proof: PROOF, ...extra }, holds, { name: `inverter.${name}`, params })

export class InverterFormulas {
  /** EFFICIENCY: AC output over DC input, as a percentage. value ⌊out · 100 / inp⌋. */
  static efficiency(out: number, inp: number): CrossFormula { return c('inverter-efficiency', 'efficiency(out, inp) = ⌊out · 100 / inp⌋', inp > 0 ? Math.floor((out * 100) / inp) : 0, nat(out, inp) && inp > 0 && out <= inp, 'efficiency', [out, inp]) }
  /** AC POWER: voltage times current. value voltage · current. */
  static power(voltage: number, current: number): CrossFormula { return c('inverter-power', 'power(voltage, current) = voltage · current', voltage * current, nat(voltage, current), 'power', [voltage, current]) }
  /** TOTAL HARMONIC DISTORTION: harmonic content over the fundamental, as a percentage. value ⌊harmonics · 100 / fundamental⌋. */
  static thd(harmonics: number, fundamental: number): CrossFormula { return c('inverter-thd', 'thd(harmonics, fundamental) = ⌊harmonics · 100 / fundamental⌋', fundamental > 0 ? Math.floor((harmonics * 100) / fundamental) : 0, nat(harmonics, fundamental) && fundamental > 0, 'thd', [harmonics, fundamental]) }
  /** DC→AC CONVERSION: AC power delivered from DC at an efficiency. value ⌊dc · eff / 100⌋. */
  static dcac(dc: number, eff: number): CrossFormula { return c('inverter-dcac', 'dcac(dc, eff) = ⌊dc · eff / 100⌋', Math.floor((dc * eff) / 100), nat(dc, eff) && eff <= 100, 'dcac', [dc, eff]) }
  /** CLIPPING: how far a peak exceeds the rail. value max(0, peak − max). */
  static clipping(peak: number, max: number): CrossFormula { return c('inverter-clipping', 'clipping(peak, max) = max(0, peak − max)', Math.max(0, peak - max), nat(peak, max), 'clipping', [peak, max]) }
  /** VA RATING: real power from apparent power at a power factor (percent). value ⌊va · pf / 100⌋. */
  static rating(va: number, pf: number): CrossFormula { return c('inverter-rating', 'rating(va, pf) = ⌊va · pf / 100⌋', Math.floor((va * pf) / 100), nat(va, pf) && pf <= 100, 'rating', [va, pf]) }
  /** LOSS: the power lost as heat, input minus output. value max(0, inp − out). */
  static loss(inp: number, out: number): CrossFormula { return c('inverter-loss', 'loss(inp, out) = max(0, inp − out)', Math.max(0, inp - out), nat(inp, out), 'loss', [inp, out]) }
  /** POWER FACTOR: real power over apparent power, as a percentage. value ⌊real · 100 / apparent⌋. */
  static powerfactor(real: number, apparent: number): CrossFormula { return c('inverter-powerfactor', 'powerfactor(real, apparent) = ⌊real · 100 / apparent⌋', apparent > 0 ? Math.floor((real * 100) / apparent) : 0, nat(real, apparent) && apparent > 0 && real <= apparent, 'powerfactor', [real, apparent]) }
}

for (const name of ['clipping', 'dcac', 'efficiency', 'loss', 'power', 'powerfactor', 'rating', 'thd'] as const)
  hexRegisterOf('inverter', name, (InverterFormulas[name] as (...x: unknown[]) => unknown).bind(InverterFormulas))
