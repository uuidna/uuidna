import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COOLING — THERMAL MANAGEMENT, AS ARITHMETIC. A cooling solution is numbers by the book: the watts a thermal resistance
 *  removes for a temperature drop, the rise a power load drives across that resistance, total airflow from the fans, the
 *  junction-to-ambient resistance, fan power, the headroom below Tjmax, heatsink capacity, fan duty cycle, liquid-loop
 *  flow, and the thermal margin after the rise. Deterministic integer identities, standard heat-transfer and thermal-
 *  resistance arithmetic. Crosses to `hardware`. A measure, not advice. */

const PROOF = 'Cooling arithmetic by the book (watts removed = ⌊deltaT / resistance⌋, temperature rise = powerW · resistance, airflow = fans · cfm-each, thermal resistance = ⌊deltaT / powerW⌋, fan power = fans · watts-each, headroom = tjmax − tcurrent, heatsink = area · coeff, fan duty = ⌊rpm · 100 / maxRpm⌋, liquid flow = pumps · lpm-each, margin = tjmax − tambient − rise); deterministic integer identities crossed to hardware; a measure'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cooling', dst: 'hardware', formula, value, proof: PROOF, ...extra }, holds, { name: `cooling.${name}`, params })

export class CoolingFormulas {
  /** DISSIPATION — the watts a thermal resistance removes for a temperature drop. value ⌊deltaT / resistance⌋; holds resistance > 0. */
  static dissipation(deltaT: number, resistance: number): CrossFormula { return c('cooling-dissipation', 'dissipation(deltaT, resistance) = ⌊deltaT / resistance⌋ (watts removed)', resistance > 0 ? Math.floor(deltaT / resistance) : 0, nat(deltaT, resistance) && resistance > 0, 'dissipation', [deltaT, resistance]) }
  /** DELTAT — the temperature rise a power load drives across a thermal resistance. value powerW · resistance. */
  static deltat(powerW: number, resistance: number): CrossFormula { return c('cooling-deltat', 'deltat(powerW, resistance) = powerW · resistance (°C rise)', powerW * resistance, nat(powerW, resistance), 'deltat', [powerW, resistance]) }
  /** AIRFLOW — total airflow: the fans times the CFM each moves. value fans · cfmEach. */
  static airflow(fans: number, cfmEach: number): CrossFormula { return c('cooling-airflow', 'airflow(fans, cfmEach) = fans · cfmEach', fans * cfmEach, nat(fans, cfmEach), 'airflow', [fans, cfmEach]) }
  /** THERMALRESISTANCE — the junction-to-ambient resistance from a drop over a power. value ⌊deltaT / powerW⌋; holds powerW > 0. */
  static thermalresistance(deltaT: number, powerW: number): CrossFormula { return c('cooling-thermalresistance', 'thermalresistance(deltaT, powerW) = ⌊deltaT / powerW⌋ (°C/W)', powerW > 0 ? Math.floor(deltaT / powerW) : 0, nat(deltaT, powerW) && powerW > 0, 'thermalresistance', [deltaT, powerW]) }
  /** FANPOWER — total fan power: the fans times the watts each draws. value fans · wattsEach. */
  static fanpower(fans: number, wattsEach: number): CrossFormula { return c('cooling-fanpower', 'fanpower(fans, wattsEach) = fans · wattsEach', fans * wattsEach, nat(fans, wattsEach), 'fanpower', [fans, wattsEach]) }
  /** HEADROOM — the degrees below Tjmax at the current temperature. value tjmax − tcurrent; holds tcurrent ≤ tjmax. */
  static headroom(tjmax: number, tcurrent: number): CrossFormula { return c('cooling-headroom', 'headroom(tjmax, tcurrent) = tjmax − tcurrent', tjmax - tcurrent, nat(tjmax, tcurrent) && tcurrent <= tjmax, 'headroom', [tjmax, tcurrent]) }
  /** HEATSINK — heatsink dissipation capacity: fin area times the transfer coefficient. value area · coeff. */
  static heatsink(area: number, coeff: number): CrossFormula { return c('cooling-heatsink', 'heatsink(area, coeff) = area · coeff', area * coeff, nat(area, coeff), 'heatsink', [area, coeff]) }
  /** DUTY — fan duty cycle: current RPM as a percentage of the maximum. value ⌊rpm · 100 / maxRpm⌋; holds maxRpm > 0. */
  static duty(rpm: number, maxRpm: number): CrossFormula { return c('cooling-duty', 'duty(rpm, maxRpm) = ⌊rpm · 100 / maxRpm⌋', maxRpm > 0 ? Math.floor((rpm * 100) / maxRpm) : 0, nat(rpm, maxRpm) && maxRpm > 0, 'duty', [rpm, maxRpm]) }
  /** LIQUIDFLOW — total liquid-loop flow: the pumps times the litres-per-minute each moves. value pumps · lpmEach. */
  static liquidflow(pumps: number, lpmEach: number): CrossFormula { return c('cooling-liquidflow', 'liquidflow(pumps, lpmEach) = pumps · lpmEach', pumps * lpmEach, nat(pumps, lpmEach), 'liquidflow', [pumps, lpmEach]) }
  /** MARGIN — the thermal margin: Tjmax less the ambient and the rise. value tjmax − tambient − rise; holds tjmax ≥ tambient + rise. */
  static margin(tjmax: number, tambient: number, rise: number): CrossFormula { return c('cooling-margin', 'margin(tjmax, tambient, rise) = tjmax − tambient − rise', tjmax - tambient - rise, nat(tjmax, tambient, rise) && tjmax >= tambient + rise, 'margin', [tjmax, tambient, rise]) }
}

for (const name of ['airflow', 'deltat', 'dissipation', 'duty', 'fanpower', 'headroom', 'heatsink', 'liquidflow', 'margin', 'thermalresistance'] as const)
  hexRegisterOf('cooling', name, (CoolingFormulas[name] as (...x: unknown[]) => unknown).bind(CoolingFormulas))
