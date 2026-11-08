import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CARBON — ACCOUNTING FOR EMISSIONS, AS ARITHMETIC. The carbon ledger is numbers: the footprint of an activity, what an
 *  offset cancels, what trees sequester, emissions per unit of output, the cost of credits, what a capture plant holds
 *  back, the CO₂-equivalent of a gas, and the budget still left. Crosses to `climate` — carbon is what climate accounts
 *  for. A measure. */

const PROOF = 'carbon arithmetic (footprint, offset, sequestration, intensity, credits, capture, CO₂-equivalent, budget); the carbon ledger as integers; a measure crossed to climate'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'carbon', dst: 'climate', formula, value, proof: PROOF, ...extra }, holds, { name: `carbon.${name}`, params })

export class CarbonFormulas {
  /** FOOTPRINT: an activity amount at an emission factor. value activity · factor. */
  static footprint(activity: number, factor: number): CrossFormula { return c('carbon-footprint', 'footprint(activity, factor) = activity · factor', activity * factor, nat(activity, factor), 'footprint', [activity, factor]) }
  /** OFFSET: emissions left after an offset cancels some. value max(0, emissions − offset). */
  static offset(emissions: number, offset: number): CrossFormula { return c('carbon-offset', 'offset(emissions, offset) = max(0, emissions − offset)', Math.max(0, emissions - offset), nat(emissions, offset), 'offset', [emissions, offset]) }
  /** SEQUESTRATION: trees at a per-tree uptake. value trees · rate. */
  static sequestration(trees: number, rate: number): CrossFormula { return c('carbon-sequestration', 'sequestration(trees, rate) = trees · rate', trees * rate, nat(trees, rate), 'sequestration', [trees, rate]) }
  /** INTENSITY: emissions per unit of output. value ⌊emissions / output⌋. */
  static intensity(emissions: number, output: number): CrossFormula { return c('carbon-intensity', 'intensity(emissions, output) = ⌊emissions / output⌋', output > 0 ? Math.floor(emissions / output) : 0, nat(emissions, output) && output > 0, 'intensity', [emissions, output]) }
  /** CREDITS: tonnes of carbon at a price each. value tonnes · price. */
  static credits(tonnes: number, price: number): CrossFormula { return c('carbon-credits', 'credits(tonnes, price) = tonnes · price', tonnes * price, nat(tonnes, price), 'credits', [tonnes, price]) }
  /** CAPTURE: flue CO₂ held back at an efficiency (percent). value ⌊flue · efficiency / 100⌋. */
  static capture(flue: number, efficiency: number): CrossFormula { return c('carbon-capture', 'capture(flue, efficiency) = ⌊flue · efficiency / 100⌋', Math.floor((flue * efficiency) / 100), nat(flue, efficiency) && efficiency <= 100, 'capture', [flue, efficiency]) }
  /** EQUIVALENT: a gas amount at its global-warming potential. value gas · gwp. */
  static equivalent(gas: number, gwp: number): CrossFormula { return c('carbon-equivalent', 'equivalent(gas, gwp) = gas · gwp', gas * gwp, nat(gas, gwp), 'equivalent', [gas, gwp]) }
  /** BUDGET: the carbon budget still left after what is used. value max(0, total − used). */
  static budget(total: number, used: number): CrossFormula { return c('carbon-budget', 'budget(total, used) = max(0, total − used)', Math.max(0, total - used), nat(total, used), 'budget', [total, used]) }
}

for (const name of ['budget', 'capture', 'credits', 'equivalent', 'footprint', 'intensity', 'offset', 'sequestration'] as const)
  hexRegisterOf('carbon', name, (CarbonFormulas[name] as (...x: unknown[]) => unknown).bind(CarbonFormulas))
