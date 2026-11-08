import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HYDRO — HYDROPOWER AS ARITHMETIC (chosen by the public registry, not by hand). A dam is numbers: the power a flow at a
 *  head delivers (P = ρgQH), the head a pressure gives, plant capacity factor, turbine efficiency, reservoir storage depth,
 *  turbine work, penstock gradient, and the net reservoir balance. Crosses to `energy` — hydro is energy made from water. A measure. */

const PROOF = 'hydro arithmetic (power P=ρgQH, head, capacity factor, efficiency, storage depth, turbine work, penstock gradient, reservoir balance); a public hydropower domain; a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hydro', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `hydro.${name}`, params })

export class HydroFormulas {
  /** POWER: a flow at a head, P = ρgQH scaled by 981/1000. value ⌊flow · head · 981 / 1000⌋. */
  static power(flow: number, head: number): CrossFormula { return c('hydro-power', 'power(flow, head) = ⌊flow · head · 981 / 1000⌋', Math.floor((flow * head * 981) / 1000), nat(flow, head), 'power', [flow, head]) }
  /** HEAD from a pressure at a density. value ⌊pressure / density⌋. */
  static head(pressure: number, density: number): CrossFormula { return c('hydro-head', 'head(pressure, density) = ⌊pressure / density⌋', density > 0 ? Math.floor(pressure / density) : 0, nat(pressure, density) && density > 0, 'head', [pressure, density]) }
  /** CAPACITY FACTOR: generated over rated, as a percentage. value ⌊generated · 100 / rated⌋. */
  static capacity(generated: number, rated: number): CrossFormula { return c('hydro-capacity', 'capacity(generated, rated) = ⌊generated · 100 / rated⌋', rated > 0 ? Math.floor((generated * 100) / rated) : 0, nat(generated, rated) && rated > 0, 'capacity', [generated, rated]) }
  /** EFFICIENCY: output over input, as a percentage. value ⌊output · 100 / input⌋. */
  static efficiency(output: number, input: number): CrossFormula { return c('hydro-efficiency', 'efficiency(output, input) = ⌊output · 100 / input⌋', input > 0 ? Math.floor((output * 100) / input) : 0, nat(output, input) && input > 0 && output <= input, 'efficiency', [output, input]) }
  /** STORAGE depth: a volume over a surface area. value ⌊volume / area⌋. */
  static storage(volume: number, area: number): CrossFormula { return c('hydro-storage', 'storage(volume, area) = ⌊volume / area⌋', area > 0 ? Math.floor(volume / area) : 0, nat(volume, area) && area > 0, 'storage', [volume, area]) }
  /** TURBINE work: a flow at a speed. value flow · speed. */
  static turbine(flow: number, speed: number): CrossFormula { return c('hydro-turbine', 'turbine(flow, speed) = flow · speed', flow * speed, nat(flow, speed), 'turbine', [flow, speed]) }
  /** PENSTOCK gradient: a head over a length, scaled by 100. value ⌊head · 100 / length⌋. */
  static penstock(head: number, length: number): CrossFormula { return c('hydro-penstock', 'penstock(head, length) = ⌊head · 100 / length⌋', length > 0 ? Math.floor((head * 100) / length) : 0, nat(head, length) && length > 0, 'penstock', [head, length]) }
  /** RESERVOIR balance: inflow less outflow, never negative. value max(0, inflow − outflow). */
  static reservoir(inflow: number, outflow: number): CrossFormula { return c('hydro-reservoir', 'reservoir(inflow, outflow) = max(0, inflow − outflow)', Math.max(0, inflow - outflow), nat(inflow, outflow), 'reservoir', [inflow, outflow]) }
}

for (const name of ['capacity', 'efficiency', 'head', 'penstock', 'power', 'reservoir', 'storage', 'turbine'] as const)
  hexRegisterOf('hydro', name, (HydroFormulas[name] as (...x: unknown[]) => unknown).bind(HydroFormulas))
