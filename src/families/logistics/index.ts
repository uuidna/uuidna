import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOGISTICS — SUPPLY CHAIN & SHIPPING, AS ARITHMETIC. Moving goods is numbers: time to arrive, what a carrier holds, how
 *  full it runs, cost by distance, stock after demand, the lead time of an order, the share of an order shipped, and the
 *  stops a route makes. Crosses to `econ` — logistics is what the economy carries. A measure. */

const PROOF = 'logistics arithmetic (eta, capacity, utilization, cost, inventory, leadtime, fillrate, route); supply chain & shipping as a measure crossed to econ'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'logistics', dst: 'econ', formula, value, proof: PROOF, ...extra }, holds, { name: `logistics.${name}`, params })

export class LogisticsFormulas {
  /** ETA: the hours to cover a distance at a speed. value ⌈distance / speed⌉. */
  static eta(distance: number, speed: number): CrossFormula { return c('logistics-eta', 'eta(distance, speed) = ⌈distance / speed⌉', speed > 0 ? Math.ceil(distance / speed) : 0, nat(distance, speed) && speed > 0, 'eta', [distance, speed]) }
  /** CAPACITY: the units a volume holds at a per-unit size. value ⌊volume / perUnit⌋. */
  static capacity(volume: number, perUnit: number): CrossFormula { return c('logistics-capacity', 'capacity(volume, perUnit) = ⌊volume / perUnit⌋', perUnit > 0 ? Math.floor(volume / perUnit) : 0, nat(volume, perUnit) && perUnit > 0, 'capacity', [volume, perUnit]) }
  /** UTILIZATION as a percentage. value ⌊used · 100 / total⌋. */
  static utilization(used: number, total: number): CrossFormula { return c('logistics-utilization', 'utilization(used, total) = ⌊used · 100 / total⌋', total > 0 ? Math.floor((used * 100) / total) : 0, nat(used, total) && total > 0 && used <= total, 'utilization', [used, total]) }
  /** COST: distance at a rate. value distance · rate. */
  static cost(distance: number, rate: number): CrossFormula { return c('logistics-cost', 'cost(distance, rate) = distance · rate', distance * rate, nat(distance, rate), 'cost', [distance, rate]) }
  /** INVENTORY left after demand. value max(0, stock − demand). */
  static inventory(stock: number, demand: number): CrossFormula { return c('logistics-inventory', 'inventory(stock, demand) = max(0, stock − demand)', Math.max(0, stock - demand), nat(stock, demand), 'inventory', [stock, demand]) }
  /** LEAD TIME: from ordered to received. value max(0, received − ordered). */
  static leadtime(ordered: number, received: number): CrossFormula { return c('logistics-leadtime', 'leadtime(ordered, received) = max(0, received − ordered)', Math.max(0, received - ordered), nat(ordered, received), 'leadtime', [ordered, received]) }
  /** FILL RATE: the share of an order shipped, as a percentage. value ⌊shipped · 100 / ordered⌋. */
  static fillrate(shipped: number, ordered: number): CrossFormula { return c('logistics-fillrate', 'fillrate(shipped, ordered) = ⌊shipped · 100 / ordered⌋', ordered > 0 ? Math.floor((shipped * 100) / ordered) : 0, nat(shipped, ordered) && ordered > 0 && shipped <= ordered, 'fillrate', [shipped, ordered]) }
  /** ROUTE: the distance of stops at a per-stop leg. value stops · perStop. */
  static route(stops: number, perStop: number): CrossFormula { return c('logistics-route', 'route(stops, perStop) = stops · perStop', stops * perStop, nat(stops, perStop), 'route', [stops, perStop]) }
}

for (const name of ['capacity', 'cost', 'eta', 'fillrate', 'inventory', 'leadtime', 'route', 'utilization'] as const)
  hexRegisterOf('logistics', name, (LogisticsFormulas[name] as (...x: unknown[]) => unknown).bind(LogisticsFormulas))
