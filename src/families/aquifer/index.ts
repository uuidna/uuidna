import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AQUIFER — GROUNDWATER AS ARITHMETIC. The subsurface is numbers: how fast a formation transmits water, how much it stores,
 *  how far the water table falls under pumping, how permeable the rock is, how much of it is pore, how much water it will
 *  yield, how fast it recharges, and what a well delivers. Crosses to `hydrology` — the aquifer is what hydrology measures.
 *  A measure. */

const PROOF = 'aquifer arithmetic (transmissivity, storativity, drawdown, hydraulic conductivity, porosity, specific yield, recharge rate, well yield); groundwater as integer measure crossed to hydrology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'aquifer', dst: 'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `aquifer.${name}`, params })

export class AquiferFormulas {
  /** TRANSMISSIVITY: hydraulic conductivity over the saturated thickness. value k · thickness. */
  static transmissivity(k: number, thickness: number): CrossFormula { return c('aquifer-transmissivity', 'transmissivity(k, thickness) = k · thickness', k * thickness, nat(k, thickness), 'transmissivity', [k, thickness]) }
  /** STORATIVITY: specific storage over the saturated thickness. value specific · thickness. */
  static storativity(specific: number, thickness: number): CrossFormula { return c('aquifer-storativity', 'storativity(specific, thickness) = specific · thickness', specific * thickness, nat(specific, thickness), 'storativity', [specific, thickness]) }
  /** DRAWDOWN: the pumping rate felt against transmissivity. value ⌊rate / trans⌋. */
  static drawdown(rate: number, trans: number): CrossFormula { return c('aquifer-drawdown', 'drawdown(rate, trans) = ⌊rate / trans⌋', trans > 0 ? Math.floor(rate / trans) : 0, nat(rate, trans) && trans > 0, 'drawdown', [rate, trans]) }
  /** HYDRAULIC CONDUCTIVITY: flow over the hydraulic gradient. value ⌊flow / gradient⌋. */
  static hydraulicconductivity(flow: number, gradient: number): CrossFormula { return c('aquifer-hydraulicconductivity', 'hydraulicconductivity(flow, gradient) = ⌊flow / gradient⌋', gradient > 0 ? Math.floor(flow / gradient) : 0, nat(flow, gradient) && gradient > 0, 'hydraulicconductivity', [flow, gradient]) }
  /** POROSITY as a percentage: void volume over total. value ⌊voids · 100 / total⌋. */
  static porosity(voids: number, total: number): CrossFormula { return c('aquifer-porosity', 'porosity(voids, total) = ⌊voids · 100 / total⌋', total > 0 ? Math.floor((voids * 100) / total) : 0, nat(voids, total) && total > 0 && voids <= total, 'porosity', [voids, total]) }
  /** SPECIFIC YIELD as a percentage: drainable volume over total. value ⌊drained · 100 / total⌋. */
  static specificyield(drained: number, total: number): CrossFormula { return c('aquifer-specificyield', 'specificyield(drained, total) = ⌊drained · 100 / total⌋', total > 0 ? Math.floor((drained * 100) / total) : 0, nat(drained, total) && total > 0 && drained <= total, 'specificyield', [drained, total]) }
  /** RECHARGE RATE: the recharge volume over the years it accrued. value ⌊volume / years⌋. */
  static rechargerate(volume: number, years: number): CrossFormula { return c('aquifer-rechargerate', 'rechargerate(volume, years) = ⌊volume / years⌋', years > 0 ? Math.floor(volume / years) : 0, nat(volume, years) && years > 0, 'rechargerate', [volume, years]) }
  /** WELL YIELD: specific capacity delivered over the available drawdown. value drawdown · capacity. */
  static wellyield(drawdown: number, capacity: number): CrossFormula { return c('aquifer-wellyield', 'wellyield(drawdown, capacity) = drawdown · capacity', drawdown * capacity, nat(drawdown, capacity), 'wellyield', [drawdown, capacity]) }
}

for (const name of ['drawdown', 'hydraulicconductivity', 'porosity', 'rechargerate', 'specificyield', 'storativity', 'transmissivity', 'wellyield'] as const)
  hexRegisterOf('aquifer', name, (AquiferFormulas[name] as (...x: unknown[]) => unknown).bind(AquiferFormulas))
