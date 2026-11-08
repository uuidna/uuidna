import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** STAFFING — PUTTING PEOPLE ON THE WORK, AS ARITHMETIC (chosen by the public-API registry, not by hand). A workforce is
 *  numbers: heads across sites, how much of the schedule is covered, shifts a crew needs, the span of control, work per day,
 *  total staff-hours allocated, overtime past the standard, and open seats. Crosses to `logistics` — staffing is the hands
 *  logistics moves the work through. A measure. */

const PROOF = 'staffing arithmetic (headcount, coverage, shifts, span ratio, daily demand, allocation, overtime, vacancy); the registry\'s people domain; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'staffing', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `staffing.${name}`, params })

export class StaffingFormulas {
  /** HEADCOUNT: workers per site across the sites. value perSite · sites. */
  static headcount(perSite: number, sites: number): CrossFormula { return c('staffing-headcount', 'headcount(perSite, sites) = perSite · sites', perSite * sites, nat(perSite, sites), 'headcount', [perSite, sites]) }
  /** COVERAGE: scheduled hours as a percentage of what the schedule requires. value ⌊scheduled · 100 / required⌋. */
  static coverage(scheduled: number, required: number): CrossFormula { return c('staffing-coverage', 'coverage(scheduled, required) = ⌊scheduled · 100 / required⌋', required > 0 ? Math.floor((scheduled * 100) / required) : 0, nat(scheduled, required) && required > 0 && scheduled <= required, 'coverage', [scheduled, required]) }
  /** SHIFTS: the shifts a crew needs at a per-shift capacity. value ⌈workers / perShift⌉. */
  static shift(workers: number, perShift: number): CrossFormula { return c('staffing-shift', 'shift(workers, perShift) = ⌈workers / perShift⌉', perShift > 0 ? Math.ceil(workers / perShift) : 0, nat(workers, perShift) && perShift > 0, 'shift', [workers, perShift]) }
  /** RATIO: the span of control — staff per manager. value ⌊staff / managers⌋. */
  static ratio(staff: number, managers: number): CrossFormula { return c('staffing-ratio', 'ratio(staff, managers) = ⌊staff / managers⌋', managers > 0 ? Math.floor(staff / managers) : 0, nat(staff, managers) && managers > 0, 'ratio', [staff, managers]) }
  /** DEMAND: tasks over the days worked. value ⌊tasks / days⌋. */
  static demand(tasks: number, days: number): CrossFormula { return c('staffing-demand', 'demand(tasks, days) = ⌊tasks / days⌋', days > 0 ? Math.floor(tasks / days) : 0, nat(tasks, days) && days > 0, 'demand', [tasks, days]) }
  /** ALLOCATION: total staff-hours — workers at the hours each. value workers · hoursEach. */
  static allocation(workers: number, hoursEach: number): CrossFormula { return c('staffing-allocation', 'allocation(workers, hoursEach) = workers · hoursEach', workers * hoursEach, nat(workers, hoursEach), 'allocation', [workers, hoursEach]) }
  /** OVERTIME: hours worked past the standard, never below zero. value max(0, worked − standard). */
  static overtime(worked: number, standard: number): CrossFormula { return c('staffing-overtime', 'overtime(worked, standard) = max(0, worked − standard)', Math.max(0, worked - standard), nat(worked, standard), 'overtime', [worked, standard]) }
  /** VACANCY: budgeted seats still unfilled, never below zero. value max(0, budgeted − filled). */
  static vacancy(budgeted: number, filled: number): CrossFormula { return c('staffing-vacancy', 'vacancy(budgeted, filled) = max(0, budgeted − filled)', Math.max(0, budgeted - filled), nat(budgeted, filled), 'vacancy', [budgeted, filled]) }
}

for (const name of ['allocation', 'coverage', 'demand', 'headcount', 'overtime', 'ratio', 'shift', 'vacancy'] as const)
  hexRegisterOf('staffing', name, (StaffingFormulas[name] as (...x: unknown[]) => unknown).bind(StaffingFormulas))
