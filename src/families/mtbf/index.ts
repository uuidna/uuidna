import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MTBF — RELIABILITY AS ARITHMETIC. Running hardware is numbers: mean time between failures, the failure rate per million
 *  hours, mean time to repair, availability, the hazard rate over a fleet, cumulative device-hours, failures-in-time, and
 *  the life a part has left. Crosses to `statistics` — reliability is statistics on time-to-failure. A measure. */

const PROOF = 'mtbf arithmetic (mean time between failures, failure rate, mttr, availability, hazard rate, cumulative device-hours, FIT, remaining life); reliability as statistics on time-to-failure; a measure crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'mtbf', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `mtbf.${name}`, params })

export class MtbfFormulas {
  /** MEAN TIME BETWEEN FAILURES: operating hours over the failures seen. value ⌊hours / failures⌋. */
  static meantime(hours: number, failures: number): CrossFormula { return c('mtbf-meantime', 'meantime(hours, failures) = ⌊hours / failures⌋', failures > 0 ? Math.floor(hours / failures) : 0, nat(hours, failures) && failures > 0, 'meantime', [hours, failures]) }
  /** FAILURE RATE per million hours. value ⌊failures · 1000000 / hours⌋. */
  static failurerate(failures: number, hours: number): CrossFormula { return c('mtbf-failurerate', 'failurerate(failures, hours) = ⌊failures · 1000000 / hours⌋', hours > 0 ? Math.floor((failures * 1000000) / hours) : 0, nat(failures, hours) && hours > 0, 'failurerate', [failures, hours]) }
  /** MEAN TIME TO REPAIR: repair hours over the repairs made. value ⌊repairhours / repairs⌋. */
  static mttr(repairhours: number, repairs: number): CrossFormula { return c('mtbf-mttr', 'mttr(repairhours, repairs) = ⌊repairhours / repairs⌋', repairs > 0 ? Math.floor(repairhours / repairs) : 0, nat(repairhours, repairs) && repairs > 0, 'mttr', [repairhours, repairs]) }
  /** AVAILABILITY as a percentage. value ⌊mtbf · 100 / (mtbf + mttr)⌋. */
  static uptime(mtbf: number, mttr: number): CrossFormula { return c('mtbf-uptime', 'uptime(mtbf, mttr) = ⌊mtbf · 100 / (mtbf + mttr)⌋', (mtbf + mttr) > 0 ? Math.floor((mtbf * 100) / (mtbf + mttr)) : 0, nat(mtbf, mttr) && (mtbf + mttr) > 0, 'uptime', [mtbf, mttr]) }
  /** HAZARD RATE per million hours over a fleet. value ⌊failures · 1000000 / (units · hours)⌋. */
  static hazardrate(failures: number, units: number, hours: number): CrossFormula { return c('mtbf-hazardrate', 'hazardrate(failures, units, hours) = ⌊failures · 1000000 / (units · hours)⌋', (units * hours) > 0 ? Math.floor((failures * 1000000) / (units * hours)) : 0, nat(failures, units, hours) && units > 0 && hours > 0, 'hazardrate', [failures, units, hours]) }
  /** CUMULATIVE DEVICE-HOURS: units each running for hours. value units · hours. */
  static cumulativehours(units: number, hours: number): CrossFormula { return c('mtbf-cumulativehours', 'cumulativehours(units, hours) = units · hours', units * hours, nat(units, hours), 'cumulativehours', [units, hours]) }
  /** FAILURES IN TIME: failures per billion hours. value ⌊failures · 1000000000 / hours⌋. */
  static fits(failures: number, hours: number): CrossFormula { return c('mtbf-fits', 'fits(failures, hours) = ⌊failures · 1000000000 / hours⌋', hours > 0 ? Math.floor((failures * 1000000000) / hours) : 0, nat(failures, hours) && hours > 0, 'fits', [failures, hours]) }
  /** REMAINING OPERATING LIFE: design hours less the hours already used. value max(0, designhours − usedhours). */
  static operatinglife(designhours: number, usedhours: number): CrossFormula { return c('mtbf-operatinglife', 'operatinglife(designhours, usedhours) = max(0, designhours − usedhours)', Math.max(0, designhours - usedhours), nat(designhours, usedhours), 'operatinglife', [designhours, usedhours]) }
}

for (const name of ['cumulativehours', 'failurerate', 'fits', 'hazardrate', 'meantime', 'mttr', 'operatinglife', 'uptime'] as const)
  hexRegisterOf('mtbf', name, (MtbfFormulas[name] as (...x: unknown[]) => unknown).bind(MtbfFormulas))
