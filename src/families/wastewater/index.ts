import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WASTEWATER — TREATMENT AS ARITHMETIC. A plant is numbers: the BOD mass a flow carries, COD read off BOD by a ratio,
 *  the percent an aerobic stage removes, how long water is held, how hard a surface is loaded, the sludge a stage lays down,
 *  the blowers aeration needs, and the rate a clarifier overflows. Crosses to `hydrology` — wastewater is water accounted for
 *  on its way back to the cycle. A measure. */

const PROOF = 'wastewater arithmetic (BOD load, COD ratio, removal efficiency, retention time, surface loading, sludge, aeration blowers, clarifier overflow); treatment as integers; a measure crossed to hydrology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'wastewater', dst: 'hydrology', formula, value, proof: PROOF, ...extra }, holds, { name: `wastewater.${name}`, params })

export class WastewaterFormulas {
  /** AERATION: blowers a demand needs at a per-blower rate. value ⌈demand / rate⌉. */
  static aeration(demand: number, rate: number): CrossFormula { return c('wastewater-aeration', 'aeration(demand, rate) = ⌈demand / rate⌉', rate > 0 ? Math.ceil(demand / rate) : 0, nat(demand, rate) && rate > 0, 'aeration', [demand, rate]) }
  /** BOD LOAD: a flow carrying a concentration. value flow · conc. */
  static bod(flow: number, conc: number): CrossFormula { return c('wastewater-bod', 'bod(flow, conc) = flow · conc', flow * conc, nat(flow, conc), 'bod', [flow, conc]) }
  /** CLARIFIER OVERFLOW: a flow spread over the surface area. value ⌊flow / area⌋. */
  static clarifier(flow: number, area: number): CrossFormula { return c('wastewater-clarifier', 'clarifier(flow, area) = ⌊flow / area⌋', area > 0 ? Math.floor(flow / area) : 0, nat(flow, area) && area > 0, 'clarifier', [flow, area]) }
  /** COD from BOD by a ratio. value bod · ratio. */
  static cod(bod: number, ratio: number): CrossFormula { return c('wastewater-cod', 'cod(bod, ratio) = bod · ratio', bod * ratio, nat(bod, ratio), 'cod', [bod, ratio]) }
  /** SURFACE LOADING: a mass over the area it loads. value ⌊mass / area⌋. */
  static loading(mass: number, area: number): CrossFormula { return c('wastewater-loading', 'loading(mass, area) = ⌊mass / area⌋', area > 0 ? Math.floor(mass / area) : 0, nat(mass, area) && area > 0, 'loading', [mass, area]) }
  /** REMOVAL EFFICIENCY as a percentage. value ⌊(in − out) · 100 / in⌋. */
  static removal(inp: number, out: number): CrossFormula { return c('wastewater-removal', 'removal(in, out) = ⌊(in − out) · 100 / in⌋', inp > 0 ? Math.floor((Math.max(0, inp - out) * 100) / inp) : 0, nat(inp, out) && inp > 0 && out <= inp, 'removal', [inp, out]) }
  /** RETENTION: how long a volume is held at a flow. value ⌊volume / flow⌋. */
  static retention(volume: number, flow: number): CrossFormula { return c('wastewater-retention', 'retention(volume, flow) = ⌊volume / flow⌋', flow > 0 ? Math.floor(volume / flow) : 0, nat(volume, flow) && flow > 0, 'retention', [volume, flow]) }
  /** SLUDGE: solids laid down over days. value solids · days. */
  static sludge(solids: number, days: number): CrossFormula { return c('wastewater-sludge', 'sludge(solids, days) = solids · days', solids * days, nat(solids, days), 'sludge', [solids, days]) }
}

for (const name of ['aeration', 'bod', 'clarifier', 'cod', 'loading', 'removal', 'retention', 'sludge'] as const)
  hexRegisterOf('wastewater', name, (WastewaterFormulas[name] as (...x: unknown[]) => unknown).bind(WastewaterFormulas))
