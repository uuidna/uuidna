import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ESTIMATING — A CONSTRUCTION ESTIMATE, AS ARITHMETIC (what a cost estimator computes before a job is built). Pricing a
 *  job is numbers: the quantity taken off the drawings, labor at an hourly rate, material at a unit price, overhead as a
 *  share of direct cost, the price with markup, a contingency reserve, the cost per unit, and the summed bid. Crosses to
 *  `construction` — estimating is what construction is priced from. A measure. */

const PROOF = 'estimating arithmetic (quantity takeoff, labor cost, material cost, overhead, markup, contingency, unit cost, summed bid); a measure crossed to construction'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'estimating', dst: 'construction', formula, value, proof: PROOF, ...extra }, holds, { name: `estimating.${name}`, params })

export class EstimatingFormulas {
  /** TAKEOFF: the quantity taken off the drawings — count at a measure each. value units · perUnit. */
  static takeoff(units: number, perUnit: number): CrossFormula { return c('estimating-takeoff', 'takeoff(units, perUnit) = units · perUnit', units * perUnit, nat(units, perUnit), 'takeoff', [units, perUnit]) }
  /** LABOR COST: crew-hours at an hourly rate. value hours · rate. */
  static labor(hours: number, rate: number): CrossFormula { return c('estimating-labor', 'labor(hours, rate) = hours · rate', hours * rate, nat(hours, rate), 'labor', [hours, rate]) }
  /** MATERIAL COST: quantity at a unit price. value qty · price. */
  static material(qty: number, price: number): CrossFormula { return c('estimating-material', 'material(qty, price) = qty · price', qty * price, nat(qty, price), 'material', [qty, price]) }
  /** OVERHEAD: a share of direct cost. value ⌊direct · pct / 100⌋. */
  static overhead(direct: number, pct: number): CrossFormula { return c('estimating-overhead', 'overhead(direct, pct) = ⌊direct · pct / 100⌋', Math.floor((direct * pct) / 100), nat(direct, pct), 'overhead', [direct, pct]) }
  /** MARKUP: the price with markup added. value cost + ⌊cost · pct / 100⌋. */
  static markup(cost: number, pct: number): CrossFormula { return c('estimating-markup', 'markup(cost, pct) = cost + ⌊cost · pct / 100⌋', cost + Math.floor((cost * pct) / 100), nat(cost, pct), 'markup', [cost, pct]) }
  /** CONTINGENCY: a reserve as a share of cost. value ⌊cost · pct / 100⌋. */
  static contingency(cost: number, pct: number): CrossFormula { return c('estimating-contingency', 'contingency(cost, pct) = ⌊cost · pct / 100⌋', Math.floor((cost * pct) / 100), nat(cost, pct), 'contingency', [cost, pct]) }
  /** UNIT COST: total cost over the units produced. value ⌊total / units⌋. */
  static unitcost(total: number, units: number): CrossFormula { return c('estimating-unitcost', 'unitcost(total, units) = ⌊total / units⌋', units > 0 ? Math.floor(total / units) : 0, nat(total, units) && units > 0, 'unitcost', [total, units]) }
  /** THE BID: labor, material, and overhead summed into the price offered. value labor + material + overhead. */
  static bid(labor: number, material: number, overhead: number): CrossFormula { return c('estimating-bid', 'bid(labor, material, overhead) = labor + material + overhead', labor + material + overhead, nat(labor, material, overhead), 'bid', [labor, material, overhead]) }
}

for (const name of ['bid', 'contingency', 'labor', 'markup', 'material', 'overhead', 'takeoff', 'unitcost'] as const)
  hexRegisterOf('estimating', name, (EstimatingFormulas[name] as (...x: unknown[]) => unknown).bind(EstimatingFormulas))
