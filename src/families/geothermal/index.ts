import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEOTHERMAL — THE HEAT UNDER THE GROUND, AS ARITHMETIC. A well is numbers: the gradient with depth, the power a flow
 *  carries, conversion efficiency, the heat-pump COP, how much of the rated plant runs, metres drilled a day, the share
 *  reinjected, and the enthalpy a temperature holds. Crosses to `energy` — geothermal is energy from the Earth. A measure. */

const PROOF = 'geothermal arithmetic (gradient, extracted power, efficiency, heat-pump COP, capacity factor, drilling rate, reinjection share, enthalpy); heat from the Earth; a measure crossed to energy'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'geothermal', dst: 'energy', formula, value, proof: PROOF, ...extra }, holds, { name: `geothermal.${name}`, params })

export class GeothermalFormulas {
  /** GRADIENT: temperature rise per kilometre of depth. value ⌊temperature · 1000 / depth⌋. */
  static gradient(temperature: number, depth: number): CrossFormula { return c('geothermal-gradient', 'gradient(temperature, depth) = ⌊temperature · 1000 / depth⌋', depth > 0 ? Math.floor((temperature * 1000) / depth) : 0, nat(temperature, depth) && depth > 0, 'gradient', [temperature, depth]) }
  /** POWER: heat a flow carries at a temperature difference. value flow · deltat. */
  static power(flow: number, deltat: number): CrossFormula { return c('geothermal-power', 'power(flow, deltat) = flow · deltat', flow * deltat, nat(flow, deltat), 'power', [flow, deltat]) }
  /** EFFICIENCY: useful output over heat in, as a percentage. value ⌊output · 100 / heat⌋. */
  static efficiency(output: number, heat: number): CrossFormula { return c('geothermal-efficiency', 'efficiency(output, heat) = ⌊output · 100 / heat⌋', heat > 0 ? Math.floor((output * 100) / heat) : 0, nat(output, heat) && heat > 0 && output <= heat, 'efficiency', [output, heat]) }
  /** COP: heat-pump coefficient of performance, heat over work, x100. value ⌊heat · 100 / work⌋. */
  static cop(heat: number, work_: number): CrossFormula { return c('geothermal-cop', 'cop(heat, work_) = ⌊heat · 100 / work_⌋', work_ > 0 ? Math.floor((heat * 100) / work_) : 0, nat(heat, work_) && work_ > 0, 'cop', [heat, work_]) }
  /** CAPACITY FACTOR: generated over rated, as a percentage. value ⌊generated · 100 / rated⌋. */
  static capacity(generated: number, rated: number): CrossFormula { return c('geothermal-capacity', 'capacity(generated, rated) = ⌊generated · 100 / rated⌋', rated > 0 ? Math.floor((generated * 100) / rated) : 0, nat(generated, rated) && rated > 0, 'capacity', [generated, rated]) }
  /** DRILLING: metres drilled per day. value ⌊depth / days⌋. */
  static drilling(depth: number, days: number): CrossFormula { return c('geothermal-drilling', 'drilling(depth, days) = ⌊depth / days⌋', days > 0 ? Math.floor(depth / days) : 0, nat(depth, days) && days > 0, 'drilling', [depth, days]) }
  /** REINJECTION: share of extracted fluid put back, as a percentage. value ⌊injected · 100 / extracted⌋. */
  static reinjection(injected: number, extracted: number): CrossFormula { return c('geothermal-reinjection', 'reinjection(injected, extracted) = ⌊injected · 100 / extracted⌋', extracted > 0 ? Math.floor((injected * 100) / extracted) : 0, nat(injected, extracted) && extracted > 0 && injected <= extracted, 'reinjection', [injected, extracted]) }
  /** ENTHALPY: the heat a temperature holds. value temperature. */
  static enthalpy(temperature: number): CrossFormula { return c('geothermal-enthalpy', 'enthalpy(temperature) = temperature', temperature, nat(temperature), 'enthalpy', [temperature]) }
}

for (const name of ['capacity', 'cop', 'drilling', 'efficiency', 'enthalpy', 'gradient', 'power', 'reinjection'] as const)
  hexRegisterOf('geothermal', name, (GeothermalFormulas[name] as (...x: unknown[]) => unknown).bind(GeothermalFormulas))
