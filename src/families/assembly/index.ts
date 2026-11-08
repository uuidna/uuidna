import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ASSEMBLY — THE PRODUCTION LINE AS ARITHMETIC (chosen by the manufacturing registry, not by hand). Building a product is
 *  numbers: the takt the demand sets, the cycle a unit takes, the stations the work content needs, how balanced the line is,
 *  units per hour, the work in progress Little's law carries, line efficiency, and first-pass yield. Crosses to `manufacturing`
 *  — assembly is what a plant runs. A measure. */

const PROOF = 'assembly arithmetic (takt, cycle, line balance, workstations, throughput, work in progress, efficiency, yield); the manufacturing registry\'s uncovered line domain; a measure crossed to manufacturing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'assembly', dst: 'manufacturing', formula, value, proof: PROOF, ...extra }, holds, { name: `assembly.${name}`, params })

export class AssemblyFormulas {
  /** TAKT: the available time one unit of demand is allowed. value ⌊time / demand⌋. */
  static takt(time: number, demand: number): CrossFormula { return c('assembly-takt', 'takt(time, demand) = ⌊time / demand⌋', demand > 0 ? Math.floor(time / demand) : 0, nat(time, demand) && demand > 0, 'takt', [time, demand]) }
  /** CYCLE: the average time a unit takes over a run. value ⌊total / units⌋. */
  static cycle(total: number, units: number): CrossFormula { return c('assembly-cycle', 'cycle(total, units) = ⌊total / units⌋', units > 0 ? Math.floor(total / units) : 0, nat(total, units) && units > 0, 'cycle', [total, units]) }
  /** BALANCE: the theoretical minimum stations the work content needs at a cycle. value ⌈task / cycle⌉. */
  static balance(task: number, cycle: number): CrossFormula { return c('assembly-balance', 'balance(task, cycle) = ⌈task / cycle⌉', cycle > 0 ? Math.ceil(task / cycle) : 0, nat(task, cycle) && cycle > 0, 'balance', [task, cycle]) }
  /** STATIONS: the workstations a load needs at a per-station capacity. value ⌈load / capacity⌉. */
  static stations(load: number, capacity: number): CrossFormula { return c('assembly-stations', 'stations(load, capacity) = ⌈load / capacity⌉', capacity > 0 ? Math.ceil(load / capacity) : 0, nat(load, capacity) && capacity > 0, 'stations', [load, capacity]) }
  /** THROUGHPUT: units produced over the hours run. value ⌊units / hours⌋. */
  static throughput(units: number, hours: number): CrossFormula { return c('assembly-throughput', 'throughput(units, hours) = ⌊units / hours⌋', hours > 0 ? Math.floor(units / hours) : 0, nat(units, hours) && hours > 0, 'throughput', [units, hours]) }
  /** WORK IN PROGRESS: Little's law, throughput held over a cycle. value rate · cycle. */
  static wip(rate: number, cycle: number): CrossFormula { return c('assembly-wip', 'wip(rate, cycle) = rate · cycle', rate * cycle, nat(rate, cycle), 'wip', [rate, cycle]) }
  /** EFFICIENCY: useful work over the worked time, as a percentage. value ⌊task · 100 / (task + idle)⌋. */
  static efficiency(task: number, idle: number): CrossFormula { return c('assembly-efficiency', 'efficiency(task, idle) = ⌊task · 100 / (task + idle)⌋', (task + idle) > 0 ? Math.floor((task * 100) / (task + idle)) : 0, nat(task, idle) && (task + idle) > 0, 'efficiency', [task, idle]) }
  /** YIELD: the good units off the line, as a percentage. value ⌊good · 100 / total⌋. */
  static yield(good: number, total: number): CrossFormula { return c('assembly-yield', 'yield(good, total) = ⌊good · 100 / total⌋', total > 0 ? Math.floor((good * 100) / total) : 0, nat(good, total) && total > 0 && good <= total, 'yield', [good, total]) }
}

for (const name of ['balance', 'cycle', 'efficiency', 'stations', 'takt', 'throughput', 'wip', 'yield'] as const)
  hexRegisterOf('assembly', name, (AssemblyFormulas[name] as (...x: unknown[]) => unknown).bind(AssemblyFormulas))
