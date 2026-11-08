import { hexRegisterOf, gibbsFreeOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** THERMODYNAMICS — RUNNING HEAT AS ARITHMETIC. The physics of engines and flow is numbers: Carnot efficiency from the two
 *  reservoirs, pressure-volume work, the efficiency of any output over its input, entropy as heat over temperature, heat
 *  flow by conductivity and gradient, a heat pump's coefficient of performance, thermal expansion, and the first law's
 *  change in internal energy. Crosses to `heat` — the unit that prices erasure by Landauer at the core temperature. A measure. */

const PROOF = 'thermodynamics arithmetic (carnot efficiency, pv work, efficiency, entropy, heat flow, cop, expansion, first-law internal energy, gibbs free energy); a measure crossed to heat'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'thermodynamics', dst: 'heat', formula, value, proof: PROOF, ...extra }, holds, { name: `thermodynamics.${name}`, params })

export class ThermodynamicsFormulas {
  /** CARNOT EFFICIENCY: the ceiling set by the two reservoirs, as a percentage. value ⌊(hot − cold) · 100 / hot⌋. */
  static carnot(hot: number, cold: number): CrossFormula { return c('thermodynamics-carnot', 'carnot(hot, cold) = ⌊(hot − cold) · 100 / hot⌋', hot > 0 ? Math.floor(((hot - cold) * 100) / hot) : 0, nat(hot, cold) && hot > 0 && cold <= hot, 'carnot', [hot, cold]) }
  /** WORK: pressure through a volume. value pressure · volume. */
  static work(pressure: number, volume: number): CrossFormula { return c('thermodynamics-work', 'work(pressure, volume) = pressure · volume', pressure * volume, nat(pressure, volume), 'work', [pressure, volume]) }
  /** EFFICIENCY: output over input, as a percentage. value ⌊output · 100 / input⌋. */
  static efficiency(output: number, input: number): CrossFormula { return c('thermodynamics-efficiency', 'efficiency(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0 && output <= input, 'efficiency', [output, input]) }
  /** ENTROPY: heat over temperature. value ⌊heat / temperature⌋. */
  static entropy(heat: number, temperature: number): CrossFormula { return c('thermodynamics-entropy', 'entropy(heat, temperature) = ⌊heat / temperature⌋', temperature > 0 ? Math.floor(heat / temperature) : 0, nat(heat, temperature) && temperature > 0, 'entropy', [heat, temperature]) }
  /** HEAT FLOW: conductivity across a gradient. value conductivity · gradient. */
  static heatflow(conductivity: number, gradient: number): CrossFormula { return c('thermodynamics-heatflow', 'heatflow(conductivity, gradient) = conductivity · gradient', conductivity * gradient, nat(conductivity, gradient), 'heatflow', [conductivity, gradient]) }
  /** COEFFICIENT OF PERFORMANCE: heat moved per unit work, ×100. value ⌊heat · 100 / work⌋. */
  static cop(heat: number, work_: number): CrossFormula { return c('thermodynamics-cop', 'cop(heat, work) = ⌊heat · 100 / work⌋', work_ > 0 ? Math.floor((heat * 100) / work_) : 0, nat(heat, work_) && work_ > 0, 'cop', [heat, work_]) }
  /** THERMAL EXPANSION: an initial length grown by a delta. value initial + delta. */
  static expansion(initial: number, delta: number): CrossFormula { return c('thermodynamics-expansion', 'expansion(initial, delta) = initial + delta', initial + delta, nat(initial, delta), 'expansion', [initial, delta]) }
  /** FIRST LAW: the change in internal energy, ΔU = Q − W, floored at zero. value max(0, heat − work). */
  static internal(heat: number, work_: number): CrossFormula { return c('thermodynamics-internal', 'internal(heat, work) = max(0, heat − work)', Math.max(0, heat - work_), nat(heat, work_), 'internal', [heat, work_]) }
  /** GIBBS FREE ENERGY: the work left once the bound heat is taken from the enthalpy, max(0, enthalpy − heat) — the same
   *  ledger the recognition keeps, where the enthalpy is the document and the heat is the reply it dissipates (gibbsFreeOf). */
  static gibbs(enthalpy: number, heat: number): CrossFormula { return c('thermodynamics-gibbs', 'gibbs(enthalpy, heat) = max(0, enthalpy − heat)', gibbsFreeOf(enthalpy, heat), nat(enthalpy, heat), 'gibbs', [enthalpy, heat]) }
}

for (const name of ['carnot', 'cop', 'efficiency', 'entropy', 'expansion', 'gibbs', 'heatflow', 'internal', 'work'] as const)
  hexRegisterOf('thermodynamics', name, (ThermodynamicsFormulas[name] as (...x: unknown[]) => unknown).bind(ThermodynamicsFormulas))
