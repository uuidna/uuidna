import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LEAN — MANUFACTURING FLOW AS ARITHMETIC (the shop floor measured, not narrated). Lean production is numbers: the share of
 *  time that adds value, the waste left over, flow rate, what a pull signal must replenish, the kanban cards a cell needs,
 *  changeover time, overall equipment effectiveness, and the lead time a part sees. Crosses to `manufacturing` — lean is the
 *  discipline manufacturing runs by. A measure. */

const PROOF = 'lean arithmetic (value-add share, waste, flow rate, pull replenishment, kanban cards, changeover, OEE, lead time); the shop floor as integers; a measure crossed to manufacturing'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lean', dst: 'manufacturing', formula, value, proof: PROOF, ...extra }, holds, { name: `lean.${name}`, params })

export class LeanFormulas {
  /** VALUE-ADD SHARE as a percentage of total cycle time. value ⌊valueTime · 100 / totalTime⌋. */
  static valueadd(valueTime: number, totalTime: number): CrossFormula { return c('lean-valueadd', 'valueadd(valueTime, totalTime) = ⌊valueTime · 100 / totalTime⌋', totalTime > 0 ? Math.floor((valueTime * 100) / totalTime) : 0, nat(valueTime, totalTime) && totalTime > 0 && valueTime <= totalTime, 'valueadd', [valueTime, totalTime]) }
  /** WASTE: the non-value time left in a cycle. value max(0, total − value). */
  static waste(total: number, value: number): CrossFormula { return c('lean-waste', 'waste(total, value) = max(0, total − value)', Math.max(0, total - value), nat(total, value), 'waste', [total, value]) }
  /** FLOW RATE: units cleared per day. value ⌊units / days⌋. */
  static flow(units: number, days: number): CrossFormula { return c('lean-flow', 'flow(units, days) = ⌊units / days⌋', days > 0 ? Math.floor(units / days) : 0, nat(units, days) && days > 0, 'flow', [units, days]) }
  /** PULL: the units a pull signal must replenish against on-hand stock. value max(0, demand − onhand). */
  static pull(demand: number, onhand: number): CrossFormula { return c('lean-pull', 'pull(demand, onhand) = max(0, demand − onhand)', Math.max(0, demand - onhand), nat(demand, onhand), 'pull', [demand, onhand]) }
  /** KANBAN: the cards a cell needs for demand over a lead time at a container size. value ⌈demand · lead / container⌉. */
  static kanban(demand: number, lead: number, container: number): CrossFormula { return c('lean-kanban', 'kanban(demand, lead, container) = ⌈demand · lead / container⌉', container > 0 ? Math.ceil((demand * lead) / container) : 0, nat(demand, lead, container) && container > 0, 'kanban', [demand, lead, container]) }
  /** CHANGEOVER: total setup time across the setups in a shift. value setups · minutes. */
  static changeover(setups: number, minutes: number): CrossFormula { return c('lean-changeover', 'changeover(setups, minutes) = setups · minutes', setups * minutes, nat(setups, minutes), 'changeover', [setups, minutes]) }
  /** OEE: availability · performance · quality, each a percentage. value ⌊avail · perf · qual / 10000⌋. */
  static oee(avail: number, perf: number, qual: number): CrossFormula { return c('lean-oee', 'oee(avail, perf, qual) = ⌊avail · perf · qual / 10000⌋', Math.floor((avail * perf * qual) / 10000), nat(avail, perf, qual) && avail <= 100 && perf <= 100 && qual <= 100, 'oee', [avail, perf, qual]) }
  /** LEAD TIME: queue, process and move time summed. value queue + process + move. */
  static leadtime(queue: number, process: number, move: number): CrossFormula { return c('lean-leadtime', 'leadtime(queue, process, move) = queue + process + move', queue + process + move, nat(queue, process, move), 'leadtime', [queue, process, move]) }
}

for (const name of ['changeover', 'flow', 'kanban', 'leadtime', 'oee', 'pull', 'valueadd', 'waste'] as const)
  hexRegisterOf('lean', name, (LeanFormulas[name] as (...x: unknown[]) => unknown).bind(LeanFormulas))
