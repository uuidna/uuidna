import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HYDROLOGY — WATER SCIENCE, AS ARITHMETIC. Water on the land is numbers: the discharge a channel carries, the runoff a
 *  storm sheds, the volume a reservoir holds, the fraction that infiltrates, the area a watershed drains, the retention a
 *  basin keeps, the groundwater it recharges, and the deficit of a drought. Crosses to `environment` — hydrology is the
 *  water the environment runs on. A measure. */

const PROOF = 'hydrology arithmetic (discharge, runoff, reservoir volume, infiltration, watershed, retention, recharge, drought); water science as a measure crossed to environment'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hydrology', dst: 'environment', formula, value, proof: PROOF, ...extra }, holds, { name: `hydrology.${name}`, params })

export class HydrologyFormulas {
  /** DISCHARGE: the flow a channel carries, cross-section area at a velocity. value area · velocity. */
  static flow(area: number, velocity: number): CrossFormula { return c('hydrology-flow', 'flow(area, velocity) = area · velocity', area * velocity, nat(area, velocity), 'flow', [area, velocity]) }
  /** RUNOFF: the rain a surface sheds at a runoff coefficient (percent). value ⌊rain · coeff / 100⌋. */
  static runoff(rain: number, coeff: number): CrossFormula { return c('hydrology-runoff', 'runoff(rain, coeff) = ⌊rain · coeff / 100⌋', Math.floor((rain * coeff) / 100), nat(rain, coeff), 'runoff', [rain, coeff]) }
  /** RESERVOIR VOLUME: surface area at a depth. value area · depth. */
  static volume(area: number, depth: number): CrossFormula { return c('hydrology-volume', 'volume(area, depth) = area · depth', area * depth, nat(area, depth), 'volume', [area, depth]) }
  /** INFILTRATION as a percentage of rainfall absorbed. value ⌊absorbed · 100 / rain⌋. */
  static infiltration(absorbed: number, rain: number): CrossFormula { return c('hydrology-infiltration', 'infiltration(absorbed, rain) = ⌊absorbed · 100 / rain⌋', rain > 0 ? Math.floor((absorbed * 100) / rain) : 0, nat(absorbed, rain) && rain > 0 && absorbed <= rain, 'infiltration', [absorbed, rain]) }
  /** WATERSHED: the sub-basins it drains at an area each. value sub · each. */
  static watershed(sub: number, each: number): CrossFormula { return c('hydrology-watershed', 'watershed(sub, each) = sub · each', sub * each, nat(sub, each), 'watershed', [sub, each]) }
  /** RETENTION as a percentage of basin capacity in use. value ⌊stored · 100 / capacity⌋. */
  static retention(stored: number, capacity: number): CrossFormula { return c('hydrology-retention', 'retention(stored, capacity) = ⌊stored · 100 / capacity⌋', capacity > 0 ? Math.floor((stored * 100) / capacity) : 0, nat(stored, capacity) && capacity > 0 && stored <= capacity, 'retention', [stored, capacity]) }
  /** RECHARGE: groundwater replenished, infiltration depth over an area. value infiltration · area. */
  static recharge(infiltration: number, area: number): CrossFormula { return c('hydrology-recharge', 'recharge(infiltration, area) = infiltration · area', infiltration * area, nat(infiltration, area), 'recharge', [infiltration, area]) }
  /** DROUGHT: the deficit as a percentage of a normal year. value ⌊deficit · 100 / normal⌋. */
  static drought(deficit: number, normal: number): CrossFormula { return c('hydrology-drought', 'drought(deficit, normal) = ⌊deficit · 100 / normal⌋', normal > 0 ? Math.floor((deficit * 100) / normal) : 0, nat(deficit, normal) && normal > 0, 'drought', [deficit, normal]) }
}

for (const name of ['drought', 'flow', 'infiltration', 'recharge', 'retention', 'runoff', 'volume', 'watershed'] as const)
  hexRegisterOf('hydrology', name, (HydrologyFormulas[name] as (...x: unknown[]) => unknown).bind(HydrologyFormulas))
