import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ZONING — LAND-USE LAW AS ARITHMETIC (chosen by the public-planning registry, not by hand). A parcel is numbers: the
 *  floor-area ratio a building reaches, how much of the lot it covers, the buildable depth left after setbacks, dwelling
 *  density, stories within a height cap, required parking, the open space that must remain, and how many lots a parcel
 *  yields. Crosses to `governance` — zoning is what governance enacts and enforces. A measure. */

const PROOF = 'zoning arithmetic (floor-area ratio, lot coverage, setback depth, density, height stories, parking, open space, lot yield); land-use law as a measure crossed to governance'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'zoning', dst: 'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `zoning.${name}`, params })

export class ZoningFormulas {
  /** FLOOR-AREA RATIO as a percentage: total floor area over lot area. value ⌊floor · 100 / lot⌋. */
  static far(floor: number, lot: number): CrossFormula { return c('zoning-far', 'far(floor, lot) = ⌊floor · 100 / lot⌋', lot > 0 ? Math.floor((floor * 100) / lot) : 0, nat(floor, lot) && lot > 0, 'far', [floor, lot]) }
  /** LOT COVERAGE as a percentage: building footprint over lot area. value ⌊footprint · 100 / lot⌋. */
  static coverage(footprint: number, lot: number): CrossFormula { return c('zoning-coverage', 'coverage(footprint, lot) = ⌊footprint · 100 / lot⌋', lot > 0 ? Math.floor((footprint * 100) / lot) : 0, nat(footprint, lot) && lot > 0, 'coverage', [footprint, lot]) }
  /** SETBACK: buildable depth left after the front and rear setbacks. value max(0, depth − front − rear). */
  static setback(depth: number, front: number, rear: number): CrossFormula { return c('zoning-setback', 'setback(depth, front, rear) = max(0, depth − front − rear)', Math.max(0, depth - front - rear), nat(depth, front, rear), 'setback', [depth, front, rear]) }
  /** DENSITY: dwelling units per acre. value ⌊units / acres⌋. */
  static density(units: number, acres: number): CrossFormula { return c('zoning-density', 'density(units, acres) = ⌊units / acres⌋', acres > 0 ? Math.floor(units / acres) : 0, nat(units, acres) && acres > 0, 'density', [units, acres]) }
  /** HEIGHT: stories within a total height cap at a per-floor height. value ⌊total / perFloor⌋. */
  static height(total: number, perFloor: number): CrossFormula { return c('zoning-height', 'height(total, perFloor) = ⌊total / perFloor⌋', perFloor > 0 ? Math.floor(total / perFloor) : 0, nat(total, perFloor) && perFloor > 0, 'height', [total, perFloor]) }
  /** PARKING: required spaces at a ratio per unit. value units · perUnit. */
  static parking(units: number, perUnit: number): CrossFormula { return c('zoning-parking', 'parking(units, perUnit) = units · perUnit', units * perUnit, nat(units, perUnit), 'parking', [units, perUnit]) }
  /** OPEN SPACE: the lot area that must remain after the footprint. value max(0, lot − footprint). */
  static openspace(lot: number, footprint: number): CrossFormula { return c('zoning-openspace', 'openspace(lot, footprint) = max(0, lot − footprint)', Math.max(0, lot - footprint), nat(lot, footprint), 'openspace', [lot, footprint]) }
  /** LOT YIELD: lots a parcel yields at a minimum lot size. value ⌊parcel / minLot⌋. */
  static lotsize(parcel: number, minLot: number): CrossFormula { return c('zoning-lotsize', 'lotsize(parcel, minLot) = ⌊parcel / minLot⌋', minLot > 0 ? Math.floor(parcel / minLot) : 0, nat(parcel, minLot) && minLot > 0, 'lotsize', [parcel, minLot]) }
}

for (const name of ['coverage', 'density', 'far', 'height', 'lotsize', 'openspace', 'parking', 'setback'] as const)
  hexRegisterOf('zoning', name, (ZoningFormulas[name] as (...x: unknown[]) => unknown).bind(ZoningFormulas))
