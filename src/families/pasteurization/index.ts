import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PASTEURIZATION — HEAT APPLIED TO CONTROL MICROBIAL LOAD, AS ARITHMETIC (chosen by the process registry, not by hand).
 *  A thermal process is numbers: the hold time a volume needs, the final temperature, lethality units, the D-value and
 *  z-value, the log reductions achieved, throughput, and the cooling delta. Crosses to `chemistry` — the thermal kinetics
 *  (Arrhenius, D/z) that pasteurization applies are chemistry. A measure. */

const PROOF = 'pasteurization arithmetic (hold time, final temperature, lethality units, D-value, z-value, log reduction, throughput, cooling); a heat process chosen by the registry; a measure crossed to chemistry'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pasteurization', dst: 'chemistry', formula, value, proof: PROOF, ...extra }, holds, { name: `pasteurization.${name}`, params })

export class PasteurizationFormulas {
  /** HOLD TIME: the seconds a volume takes to clear the holding tube at a flow rate. value ⌊volume / flowrate⌋. */
  static holdtime(volume: number, flowrate: number): CrossFormula { return c('pasteurization-holdtime', 'holdtime(volume, flowrate) = ⌊volume / flowrate⌋', flowrate > 0 ? Math.floor(volume / flowrate) : 0, nat(volume, flowrate) && flowrate > 0, 'holdtime', [volume, flowrate]) }
  /** FINAL TEMPERATURE: a base temperature plus the rise the heater adds. value base + rise. */
  static temperature(base: number, rise: number): CrossFormula { return c('pasteurization-temperature', 'temperature(base, rise) = base + rise', base + rise, nat(base, rise), 'temperature', [base, rise]) }
  /** LETHALITY: pasteurization units accrued at a rate over the minutes held. value rate · minutes. */
  static lethality(rate: number, minutes: number): CrossFormula { return c('pasteurization-lethality', 'lethality(rate, minutes) = rate · minutes', rate * minutes, nat(rate, minutes), 'lethality', [rate, minutes]) }
  /** D-VALUE: the seconds to cut the population by one log, from the time taken over the logs removed. value ⌊time / logs⌋. */
  static dvalue(time: number, logs: number): CrossFormula { return c('pasteurization-dvalue', 'dvalue(time, logs) = ⌊time / logs⌋', logs > 0 ? Math.floor(time / logs) : 0, nat(time, logs) && logs > 0, 'dvalue', [time, logs]) }
  /** Z-VALUE: the degrees between two reference temperatures. value max(0, tempHigh − tempLow). */
  static zvalue(tempHigh: number, tempLow: number): CrossFormula { return c('pasteurization-zvalue', 'zvalue(tempHigh, tempLow) = max(0, tempHigh − tempLow)', Math.max(0, tempHigh - tempLow), nat(tempHigh, tempLow) && tempHigh >= tempLow, 'zvalue', [tempHigh, tempLow]) }
  /** LOG REDUCTION: the log cuts a treatment achieves, its time over the D-value. value ⌊time / dvalue⌋. */
  static reduction(time: number, dvalue: number): CrossFormula { return c('pasteurization-reduction', 'reduction(time, dvalue) = ⌊time / dvalue⌋', dvalue > 0 ? Math.floor(time / dvalue) : 0, nat(time, dvalue) && dvalue > 0, 'reduction', [time, dvalue]) }
  /** THROUGHPUT: the litres processed across the batches run. value litres · batches. */
  static throughput(litres: number, batches: number): CrossFormula { return c('pasteurization-throughput', 'throughput(litres, batches) = litres · batches', litres * batches, nat(litres, batches), 'throughput', [litres, batches]) }
  /** COOLING: the degrees the product drops from hot to cold. value max(0, hot − cold). */
  static cooling(hot: number, cold: number): CrossFormula { return c('pasteurization-cooling', 'cooling(hot, cold) = max(0, hot − cold)', Math.max(0, hot - cold), nat(hot, cold) && hot >= cold, 'cooling', [hot, cold]) }
}

for (const name of ['cooling', 'dvalue', 'holdtime', 'lethality', 'reduction', 'temperature', 'throughput', 'zvalue'] as const)
  hexRegisterOf('pasteurization', name, (PasteurizationFormulas[name] as (...x: unknown[]) => unknown).bind(PasteurizationFormulas))
