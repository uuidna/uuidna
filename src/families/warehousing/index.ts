import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WAREHOUSING — THE FLOOR AS ARITHMETIC (chosen by the operations registry, not by hand). Running a warehouse is numbers:
 *  how full the racks are, how fast a picker moves, order accuracy, how often inventory turns, dock-door pressure, slot
 *  reachability, daily throughput, and cube fill. Crosses to `logistics` — warehousing is where logistics lands. A measure. */

const PROOF = 'warehousing arithmetic (utilization, pick rate, accuracy, turnover, dock pressure, slotting, throughput, cube fill); an operations domain; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'warehousing', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `warehousing.${name}`, params })

export class WarehousingFormulas {
  /** UTILIZATION: how full the racks are, as a percentage. value ⌊used · 100 / capacity⌋. */
  static utilization(used: number, capacity: number): CrossFormula { return c('warehousing-utilization', 'utilization(used, capacity) = ⌊used · 100 / capacity⌋', capacity > 0 ? Math.floor((used * 100) / capacity) : 0, nat(used, capacity) && capacity > 0 && used <= capacity, 'utilization', [used, capacity]) }
  /** PICK RATE: picks completed over hours worked. value ⌊picks / hours⌋. */
  static pickrate(picks: number, hours: number): CrossFormula { return c('warehousing-pickrate', 'pickrate(picks, hours) = ⌊picks / hours⌋', hours > 0 ? Math.floor(picks / hours) : 0, nat(picks, hours) && hours > 0, 'pickrate', [picks, hours]) }
  /** ORDER ACCURACY as a percentage. value ⌊correct · 100 / orders⌋. */
  static accuracy(correct: number, orders: number): CrossFormula { return c('warehousing-accuracy', 'accuracy(correct, orders) = ⌊correct · 100 / orders⌋', orders > 0 ? Math.floor((correct * 100) / orders) : 0, nat(correct, orders) && orders > 0 && correct <= orders, 'accuracy', [correct, orders]) }
  /** INVENTORY TURNOVER: units shipped over units on hand. value ⌊shipped / inventory⌋. */
  static turnover(shipped: number, inventory: number): CrossFormula { return c('warehousing-turnover', 'turnover(shipped, inventory) = ⌊shipped / inventory⌋', inventory > 0 ? Math.floor(shipped / inventory) : 0, nat(shipped, inventory) && inventory > 0, 'turnover', [shipped, inventory]) }
  /** DOCK PRESSURE: doors per truck, as a percentage. value ⌊doors · 100 / trucks⌋. */
  static dock(doors: number, trucks: number): CrossFormula { return c('warehousing-dock', 'dock(doors, trucks) = ⌊doors · 100 / trucks⌋', trucks > 0 ? Math.floor((doors * 100) / trucks) : 0, nat(doors, trucks) && trucks > 0, 'dock', [doors, trucks]) }
  /** SLOTTING: reachable slots as a percentage of all slots. value ⌊accessible · 100 / total⌋. */
  static slotting(accessible: number, total: number): CrossFormula { return c('warehousing-slotting', 'slotting(accessible, total) = ⌊accessible · 100 / total⌋', total > 0 ? Math.floor((accessible * 100) / total) : 0, nat(accessible, total) && total > 0 && accessible <= total, 'slotting', [accessible, total]) }
  /** THROUGHPUT: units moved over days. value ⌊units / days⌋. */
  static throughput(units: number, days: number): CrossFormula { return c('warehousing-throughput', 'throughput(units, days) = ⌊units / days⌋', days > 0 ? Math.floor(units / days) : 0, nat(units, days) && days > 0, 'throughput', [units, days]) }
  /** CUBE FILL: volume filled as a percentage of space. value ⌊volume · 100 / space⌋. */
  static cube(volume: number, space: number): CrossFormula { return c('warehousing-cube', 'cube(volume, space) = ⌊volume · 100 / space⌋', space > 0 ? Math.floor((volume * 100) / space) : 0, nat(volume, space) && space > 0 && volume <= space, 'cube', [volume, space]) }
}

for (const name of ['accuracy', 'cube', 'dock', 'pickrate', 'slotting', 'throughput', 'turnover', 'utilization'] as const)
  hexRegisterOf('warehousing', name, (WarehousingFormulas[name] as (...x: unknown[]) => unknown).bind(WarehousingFormulas))
