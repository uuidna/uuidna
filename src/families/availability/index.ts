import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AVAILABILITY — SERVICE RELIABILITY AS ARITHMETIC (chosen by the public-API registry, not by hand). Keeping a service up is
 *  numbers: uptime as a percentage, downtime left, the nines of availability, the SLA error budget, mean time to repair, mean
 *  time between failures, the steady-state availability of a repairable system, and what an outage costs. Crosses to `statistics`
 *  — availability is a reliability statistic. A measure. */

const PROOF = 'availability arithmetic (uptime percent, downtime, nines, SLA error budget, MTTR, MTBF, steady-state availability, outage cost); a reliability measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'availability', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `availability.${name}`, params })

export class AvailabilityFormulas {
  /** UPTIME as a percentage. value ⌊up · 100 / total⌋. */
  static uptimepercent(up: number, total: number): CrossFormula { return c('availability-uptimepercent', 'uptimepercent(up, total) = ⌊up · 100 / total⌋', total > 0 ? Math.floor((up * 100) / total) : 0, nat(up, total) && total > 0 && up <= total, 'uptimepercent', [up, total]) }
  /** DOWNTIME: the minutes left once the up minutes are taken from the total. value max(0, total − up). */
  static downtime(total: number, up: number): CrossFormula { return c('availability-downtime', 'downtime(total, up) = max(0, total − up)', Math.max(0, total - up), nat(total, up) && up <= total, 'downtime', [total, up]) }
  /** NINES: availability in parts per thousand (999 ‰ is the three-nines line). value ⌊up · 1000 / total⌋. */
  static nines(up: number, total: number): CrossFormula { return c('availability-nines', 'nines(up, total) = ⌊up · 1000 / total⌋', total > 0 ? Math.floor((up * 1000) / total) : 0, nat(up, total) && total > 0 && up <= total, 'nines', [up, total]) }
  /** SLA ERROR BUDGET: the downtime a target allows over a window. value ⌊total · (100 − target) / 100⌋. */
  static slabudget(target: number, total: number): CrossFormula { return c('availability-slabudget', 'slabudget(target, total) = ⌊total · (100 − target) / 100⌋', target <= 100 ? Math.floor((total * Math.max(0, 100 - target)) / 100) : 0, nat(target, total) && target <= 100, 'slabudget', [target, total]) }
  /** MTTR: mean time to repair, downtime over the incidents that caused it. value ⌊downtime / incidents⌋. */
  static mttr(downtime: number, incidents: number): CrossFormula { return c('availability-mttr', 'mttr(downtime, incidents) = ⌊downtime / incidents⌋', incidents > 0 ? Math.floor(downtime / incidents) : 0, nat(downtime, incidents) && incidents > 0, 'mttr', [downtime, incidents]) }
  /** MTBF: mean time between failures, uptime over the failures seen. value ⌊uptime / failures⌋. */
  static mtbf(uptime: number, failures: number): CrossFormula { return c('availability-mtbf', 'mtbf(uptime, failures) = ⌊uptime / failures⌋', failures > 0 ? Math.floor(uptime / failures) : 0, nat(uptime, failures) && failures > 0, 'mtbf', [uptime, failures]) }
  /** STEADY-STATE availability of a repairable system as a percentage. value ⌊mtbf · 100 / (mtbf + mttr)⌋. */
  static steadystate(mtbf: number, mttr: number): CrossFormula { return c('availability-steadystate', 'steadystate(mtbf, mttr) = ⌊mtbf · 100 / (mtbf + mttr)⌋', mtbf + mttr > 0 ? Math.floor((mtbf * 100) / (mtbf + mttr)) : 0, nat(mtbf, mttr) && mtbf + mttr > 0, 'steadystate', [mtbf, mttr]) }
  /** OUTAGE COST: downtime minutes at a cost per minute. value minutes · rate. */
  static outagecost(minutes: number, rate: number): CrossFormula { return c('availability-outagecost', 'outagecost(minutes, rate) = minutes · rate', minutes * rate, nat(minutes, rate), 'outagecost', [minutes, rate]) }
}

for (const name of ['downtime', 'mtbf', 'mttr', 'nines', 'outagecost', 'slabudget', 'steadystate', 'uptimepercent'] as const)
  hexRegisterOf('availability', name, (AvailabilityFormulas[name] as (...x: unknown[]) => unknown).bind(AvailabilityFormulas))
