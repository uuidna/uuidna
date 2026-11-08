import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PSU — THE POWER SUPPLY UNIT, AS ARITHMETIC. A supply is numbers by the book: watts from volts and amps, conversion
 *  efficiency, the headroom above the load, the rails and their current, load as a percentage of the rating, the heat it
 *  dissipates, the current it draws at a voltage, redundant spares in an N+ scheme, output ripple, and the peak a
 *  continuous rating covers. Deterministic integer identities, standard power-supply arithmetic and Ohm's law. Crosses to
 *  `hardware`. A measure, not advice. */

const PROOF = 'PSU arithmetic by the book (watts = volts · amps, efficiency = ⌊outputW · 100 / inputW⌋, headroom = ratedW − loadW, rails = count · per-rail amps, load percent, dissipation = inputW − outputW as heat, current = ⌊watts / volts⌋, redundancy = supplies − needed, ripple in mV, peak = continuousW · factor); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const p = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'psu', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `psu.${name}`, params })

export class PsuFormulas {
  /** WATTS — power delivered: volts times amps. value volts · amps. */
  static watts(volts: number, amps: number): CrossFormula { return p('psu-watts', 'watts(volts, amps) = volts · amps', volts * amps, nat(volts, amps), 'watts', [volts, amps]) }
  /** EFFICIENCY — output power as a percentage of input drawn. value ⌊outputW · 100 / inputW⌋; holds inputW > 0, outputW ≤ inputW. */
  static efficiency(outputW: number, inputW: number): CrossFormula { return p('psu-efficiency', 'efficiency(outputW, inputW) = ⌊outputW · 100 / inputW⌋', inputW > 0 ? Math.floor((outputW * 100) / inputW) : 0, nat(outputW, inputW) && inputW > 0 && outputW <= inputW, 'efficiency', [outputW, inputW]) }
  /** HEADROOM — the rated watts left above the load. value ratedW − loadW; holds loadW ≤ ratedW. */
  static headroom(ratedW: number, loadW: number): CrossFormula { return p('psu-headroom', 'headroom(ratedW, loadW) = ratedW − loadW', ratedW - loadW, nat(ratedW, loadW) && loadW <= ratedW, 'headroom', [ratedW, loadW]) }
  /** RAILS — total rail current: the rails times the amps each carries. value count · perRailA. */
  static rails(count: number, perRailA: number): CrossFormula { return p('psu-rails', 'rails(count, perRailA) = count · perRailA', count * perRailA, nat(count, perRailA), 'rails', [count, perRailA]) }
  /** LOADPERCENT — the load as a percentage of the rated watts. value ⌊loadW · 100 / ratedW⌋; holds ratedW > 0. */
  static loadpercent(loadW: number, ratedW: number): CrossFormula { return p('psu-loadpercent', 'loadpercent(loadW, ratedW) = ⌊loadW · 100 / ratedW⌋', ratedW > 0 ? Math.floor((loadW * 100) / ratedW) : 0, nat(loadW, ratedW) && ratedW > 0, 'loadpercent', [loadW, ratedW]) }
  /** DISSIPATION — the heat lost in conversion: input minus output. value inputW − outputW; holds outputW ≤ inputW. */
  static dissipation(inputW: number, outputW: number): CrossFormula { return p('psu-dissipation', 'dissipation(inputW, outputW) = inputW − outputW (heat)', inputW - outputW, nat(inputW, outputW) && outputW <= inputW, 'dissipation', [inputW, outputW]) }
  /** CURRENT — the current drawn at a voltage for a wattage. value ⌊watts / volts⌋; holds volts > 0. */
  static current(watts: number, volts: number): CrossFormula { return p('psu-current', 'current(watts, volts) = ⌊watts / volts⌋', volts > 0 ? Math.floor(watts / volts) : 0, nat(watts, volts) && volts > 0, 'current', [watts, volts]) }
  /** REDUNDANCY — the spare supplies in an N+ scheme: present minus needed. value supplies − needed; holds needed ≤ supplies. */
  static redundancy(supplies: number, needed: number): CrossFormula { return p('psu-redundancy', 'redundancy(supplies, needed) = supplies − needed (N+ spares)', supplies - needed, nat(supplies, needed) && needed <= supplies, 'redundancy', [supplies, needed]) }
  /** RIPPLE — the output ripple, in millivolts. value mv. */
  static ripple(mv: number): CrossFormula { return p('psu-ripple', 'ripple(mv) = mv (output ripple, mV)', mv, nat(mv), 'ripple', [mv]) }
  /** PEAK — the peak a continuous rating covers: continuous watts times the factor. value continuousW · factor. */
  static peak(continuousW: number, factor: number): CrossFormula { return p('psu-peak', 'peak(continuousW, factor) = continuousW · factor', continuousW * factor, nat(continuousW, factor), 'peak', [continuousW, factor]) }
}

for (const name of ['current', 'dissipation', 'efficiency', 'headroom', 'loadpercent', 'peak', 'rails', 'redundancy', 'ripple', 'watts'] as const)
  hexRegisterOf('psu', name, (PsuFormulas[name] as (...x: unknown[]) => unknown).bind(PsuFormulas))
