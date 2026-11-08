import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** MANUFACTURING — MAKING THINGS, AS ARITHMETIC (chosen by the registry, not by hand). A production line is numbers:
 *  units per hour, overall equipment effectiveness, the defect rate, cycle time, yield, takt, work-in-progress turns, and
 *  the capacity of the machines. Crosses to `econ` — manufacturing is what the economy measures as output. A measure. */

const PROOF = 'manufacturing arithmetic (throughput, OEE, defects, cycle time, yield, takt, inventory turns, capacity); a production domain; a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'manufacturing', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `manufacturing.${name}`, params })

export class ManufacturingFormulas {
  /** THROUGHPUT: units produced over hours run. value ⌊units / hours⌋. */
  static throughput(units: number, hours: number): CrossFormula { return c('manufacturing-throughput', 'throughput(units, hours) = ⌊units / hours⌋', hours > 0 ? Math.floor(units / hours) : 0, nat(units, hours) && hours > 0, 'throughput', [units, hours]) }
  /** OEE: two percentages combined — availability by performance. value ⌊availability · performance / 100⌋. */
  static oee(availability: number, performance: number): CrossFormula { return c('manufacturing-oee', 'oee(availability, performance) = ⌊availability · performance / 100⌋', Math.floor((availability * performance) / 100), nat(availability, performance), 'oee', [availability, performance]) }
  /** DEFECT RATE as a percentage. value ⌊bad · 100 / total⌋. */
  static defects(bad: number, total: number): CrossFormula { return c('manufacturing-defects', 'defects(bad, total) = ⌊bad · 100 / total⌋', total > 0 ? Math.floor((bad * 100) / total) : 0, nat(bad, total) && total > 0 && bad <= total, 'defects', [bad, total]) }
  /** CYCLE TIME: time over the units made. value ⌊time / units⌋. */
  static cycletime(time: number, units: number): CrossFormula { return c('manufacturing-cycletime', 'cycletime(time, units) = ⌊time / units⌋', units > 0 ? Math.floor(time / units) : 0, nat(time, units) && units > 0, 'cycletime', [time, units]) }
  /** YIELD as a percentage. value ⌊good · 100 / total⌋. */
  static yield(good: number, total: number): CrossFormula { return c('manufacturing-yield', 'yield(good, total) = ⌊good · 100 / total⌋', total > 0 ? Math.floor((good * 100) / total) : 0, nat(good, total) && total > 0 && good <= total, 'yield', [good, total]) }
  /** TAKT TIME: available time over demand. value ⌊available / demand⌋. */
  static takt(available: number, demand: number): CrossFormula { return c('manufacturing-takt', 'takt(available, demand) = ⌊available / demand⌋', demand > 0 ? Math.floor(available / demand) : 0, nat(available, demand) && demand > 0, 'takt', [available, demand]) }
  /** INVENTORY TURNS: work-in-progress over the consumption rate. value ⌊wip / rate⌋. */
  static inventory(wip: number, rate: number): CrossFormula { return c('manufacturing-inventory', 'inventory(wip, rate) = ⌊wip / rate⌋', rate > 0 ? Math.floor(wip / rate) : 0, nat(wip, rate) && rate > 0, 'inventory', [wip, rate]) }
  /** CAPACITY: machines at a per-machine rate. value machines · rate. */
  static capacity(machines: number, rate: number): CrossFormula { return c('manufacturing-capacity', 'capacity(machines, rate) = machines · rate', machines * rate, nat(machines, rate), 'capacity', [machines, rate]) }
}

for (const name of ['capacity', 'cycletime', 'defects', 'inventory', 'oee', 'takt', 'throughput', 'yield'] as const)
  hexRegisterOf('manufacturing', name, (ManufacturingFormulas[name] as (...x: unknown[]) => unknown).bind(ManufacturingFormulas))
