import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SURGERY — THE OPERATING RECORD, AS ARITHMETIC (chosen by the clinical registry, not by hand). An operation is numbers:
 *  how long it took, the blood lost, the mortality and complication rates, how many recover, the clear margin, the cases
 *  an hour, and whether the attempt succeeded. Crosses to `med` — surgery is what medicine measures. A measure. */

const PROOF = 'surgery arithmetic (duration, blood loss, mortality, complication, recovery, margin, throughput, success); an operating record as rates; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'surgery', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `surgery.${name}`, params })

export class SurgeryFormulas {
  /** DURATION: minutes from start to end, never negative. value max(0, end − start). */
  static duration(start: number, end: number): CrossFormula { return c('surgery-duration', 'duration(start, end) = max(0, end − start)', Math.max(0, end - start), nat(start, end), 'duration', [start, end]) }
  /** BLOOD LOSS: millilitres lost. value ml. */
  static bloodloss(ml: number): CrossFormula { return c('surgery-bloodloss', 'bloodloss(ml) = ml', ml, nat(ml), 'bloodloss', [ml]) }
  /** MORTALITY as a percentage. value ⌊deaths · 100 / operations⌋. */
  static mortality(deaths: number, operations: number): CrossFormula { return c('surgery-mortality', 'mortality(deaths, operations) = ⌊deaths · 100 / operations⌋', operations > 0 ? Math.floor((deaths * 100) / operations) : 0, nat(deaths, operations) && operations > 0 && deaths <= operations, 'mortality', [deaths, operations]) }
  /** COMPLICATION as a percentage. value ⌊events · 100 / cases⌋. */
  static complication(events: number, cases: number): CrossFormula { return c('surgery-complication', 'complication(events, cases) = ⌊events · 100 / cases⌋', cases > 0 ? Math.floor((events * 100) / cases) : 0, nat(events, cases) && cases > 0 && events <= cases, 'complication', [events, cases]) }
  /** RECOVERY as a percentage. value ⌊discharged · 100 / admitted⌋. */
  static recovery(discharged: number, admitted: number): CrossFormula { return c('surgery-recovery', 'recovery(discharged, admitted) = ⌊discharged · 100 / admitted⌋', admitted > 0 ? Math.floor((discharged * 100) / admitted) : 0, nat(discharged, admitted) && admitted > 0 && discharged <= admitted, 'recovery', [discharged, admitted]) }
  /** MARGIN: clear resections as a percentage. value ⌊clear · 100 / total⌋. */
  static margin(clear: number, total: number): CrossFormula { return c('surgery-margin', 'margin(clear, total) = ⌊clear · 100 / total⌋', total > 0 ? Math.floor((clear * 100) / total) : 0, nat(clear, total) && total > 0 && clear <= total, 'margin', [clear, total]) }
  /** THROUGHPUT: cases over hours. value ⌊cases / hours⌋. */
  static throughput(cases: number, hours: number): CrossFormula { return c('surgery-throughput', 'throughput(cases, hours) = ⌊cases / hours⌋', hours > 0 ? Math.floor(cases / hours) : 0, nat(cases, hours) && hours > 0, 'throughput', [cases, hours]) }
  /** SUCCESS as a percentage. value ⌊resolved · 100 / attempted⌋. */
  static success(resolved: number, attempted: number): CrossFormula { return c('surgery-success', 'success(resolved, attempted) = ⌊resolved · 100 / attempted⌋', attempted > 0 ? Math.floor((resolved * 100) / attempted) : 0, nat(resolved, attempted) && attempted > 0 && resolved <= attempted, 'success', [resolved, attempted]) }
}

for (const name of ['bloodloss', 'complication', 'duration', 'margin', 'mortality', 'recovery', 'success', 'throughput'] as const)
  hexRegisterOf('surgery', name, (SurgeryFormulas[name] as (...x: unknown[]) => unknown).bind(SurgeryFormulas))
