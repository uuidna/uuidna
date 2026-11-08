import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FREIGHT — MOVING GOODS, AS ARITHMETIC (what a carrier bills and loads). Shipping is numbers: the rate over a distance, the
 *  weight of a load, the volume of a box, its density, the chargeable weight a carrier actually bills, tonnage, the distance a
 *  lane runs over its trips, and the fuel surcharge on a base. Crosses to `logistics` — freight is what logistics moves. A measure. */

const PROOF = 'freight arithmetic (rate, weight, volume, density, chargeable weight, tonnage, lane distance, fuel surcharge); hex-addressable integer formulas; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'freight', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `freight.${name}`, params })

export class FreightFormulas {
  /** RATE: a freight rate over a distance at a per-unit charge. value distance · perKm. */
  static rate(distance: number, perKm: number): CrossFormula { return c('freight-rate', 'rate(distance, perKm) = distance · perKm', distance * perKm, nat(distance, perKm), 'rate', [distance, perKm]) }
  /** WEIGHT: a load of units at a unit weight. value units · unit. */
  static weight(units: number, unit: number): CrossFormula { return c('freight-weight', 'weight(units, unit) = units · unit', units * unit, nat(units, unit), 'weight', [units, unit]) }
  /** VOLUME: a box at length · width · height. value length · width · height. */
  static volume(length: number, width: number, height: number): CrossFormula { return c('freight-volume', 'volume(length, width, height) = length · width · height', length * width * height, nat(length, width, height), 'volume', [length, width, height]) }
  /** DENSITY: weight over volume. value ⌊weight / volume⌋. */
  static density(weight: number, volume: number): CrossFormula { return c('freight-density', 'density(weight, volume) = ⌊weight / volume⌋', volume > 0 ? Math.floor(weight / volume) : 0, nat(weight, volume) && volume > 0, 'density', [weight, volume]) }
  /** CHARGEABLE WEIGHT: the greater of actual and volumetric weight, what a carrier bills. value max(actual, volumetric). */
  static chargeable(actual: number, volumetric: number): CrossFormula { return c('freight-chargeable', 'chargeable(actual, volumetric) = max(actual, volumetric)', Math.max(actual, volumetric), nat(actual, volumetric), 'chargeable', [actual, volumetric]) }
  /** TONNAGE: kilograms as whole tonnes. value ⌊kg / 1000⌋. */
  static ton(kg: number): CrossFormula { return c('freight-ton', 'ton(kg) = ⌊kg / 1000⌋', Math.floor(kg / 1000), nat(kg), 'ton', [kg]) }
  /** LANE: the distance a lane runs over its trips. value distance · trips. */
  static lane(distance: number, trips: number): CrossFormula { return c('freight-lane', 'lane(distance, trips) = distance · trips', distance * trips, nat(distance, trips), 'lane', [distance, trips]) }
  /** FUEL SURCHARGE: a percentage of a base rate. value ⌊base · pct / 100⌋. */
  static surcharge(base: number, pct: number): CrossFormula { return c('freight-surcharge', 'surcharge(base, pct) = ⌊base · pct / 100⌋', Math.floor((base * pct) / 100), nat(base, pct) && pct <= 100, 'surcharge', [base, pct]) }
}

for (const name of ['chargeable', 'density', 'lane', 'rate', 'surcharge', 'ton', 'volume', 'weight'] as const)
  hexRegisterOf('freight', name, (FreightFormulas[name] as (...x: unknown[]) => unknown).bind(FreightFormulas))
