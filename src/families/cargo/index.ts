import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CARGO — MOVING FREIGHT, AS ARITHMETIC (chosen by the shipping registry, not by hand). Hauling goods is numbers:
 *  the TEU a box count comes to, how full a hold is, stowed volume, deadweight carried, manifest weight, the pallets a
 *  carton run needs, the containers a unit run needs, and the load factor. Crosses to `logistics` — cargo is what
 *  logistics plans and routes. A measure. */

const PROOF = 'cargo arithmetic (TEU, utilization, stowage volume, deadweight, manifest weight, palletize, containers, load factor); the registry\'s uncovered freight domain; a measure crossed to logistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cargo', dst: 'logistics', formula, value, proof: PROOF, ...extra }, holds, { name: `cargo.${name}`, params })

export class CargoFormulas {
  /** TEU: twenty-foot equivalent units, forties counting double. value twenties + forties · 2. */
  static teu(twenties: number, forties: number): CrossFormula { return c('cargo-teu', 'teu(twenties, forties) = twenties + forties · 2', twenties + forties * 2, nat(twenties, forties), 'teu', [twenties, forties]) }
  /** UTILIZATION of the hold as a percentage. value ⌊used · 100 / capacity⌋. */
  static utilization(used: number, capacity: number): CrossFormula { return c('cargo-utilization', 'utilization(used, capacity) = ⌊used · 100 / capacity⌋', capacity > 0 ? Math.floor((used * 100) / capacity) : 0, nat(used, capacity) && capacity > 0 && used <= capacity, 'utilization', [used, capacity]) }
  /** STOWAGE: stowed volume, boxes at a volume each. value boxes · volume. */
  static stowage(boxes: number, volume: number): CrossFormula { return c('cargo-stowage', 'stowage(boxes, volume) = boxes · volume', boxes * volume, nat(boxes, volume), 'stowage', [boxes, volume]) }
  /** DEADWEIGHT: the tonnage carried — cargo, fuel and ballast. value cargo + fuel + ballast. */
  static deadweight(cargo: number, fuel: number, ballast: number): CrossFormula { return c('cargo-deadweight', 'deadweight(cargo, fuel, ballast) = cargo + fuel + ballast', cargo + fuel + ballast, nat(cargo, fuel, ballast), 'deadweight', [cargo, fuel, ballast]) }
  /** MANIFEST: total weight, items at a weight each. value items · weight. */
  static manifest(items: number, weight: number): CrossFormula { return c('cargo-manifest', 'manifest(items, weight) = items · weight', items * weight, nat(items, weight), 'manifest', [items, weight]) }
  /** PALLETIZE: the pallets a carton run needs at a per-pallet count. value ⌈cartons / perPallet⌉. */
  static palletize(cartons: number, perPallet: number): CrossFormula { return c('cargo-palletize', 'palletize(cartons, perPallet) = ⌈cartons / perPallet⌉', perPallet > 0 ? Math.ceil(cartons / perPallet) : 0, nat(cartons, perPallet) && perPallet > 0, 'palletize', [cartons, perPallet]) }
  /** CONTAINERS: the containers a unit run needs at a per-container count. value ⌈units / perContainer⌉. */
  static containers(units: number, perContainer: number): CrossFormula { return c('cargo-containers', 'containers(units, perContainer) = ⌈units / perContainer⌉', perContainer > 0 ? Math.ceil(units / perContainer) : 0, nat(units, perContainer) && perContainer > 0, 'containers', [units, perContainer]) }
  /** LOAD FACTOR: the load carried against capacity, as a percentage. value ⌊load · 100 / capacity⌋. */
  static loadfactor(load: number, capacity: number): CrossFormula { return c('cargo-loadfactor', 'loadfactor(load, capacity) = ⌊load · 100 / capacity⌋', capacity > 0 ? Math.floor((load * 100) / capacity) : 0, nat(load, capacity) && capacity > 0, 'loadfactor', [load, capacity]) }
}

for (const name of ['containers', 'deadweight', 'loadfactor', 'manifest', 'palletize', 'stowage', 'teu', 'utilization'] as const)
  hexRegisterOf('cargo', name, (CargoFormulas[name] as (...x: unknown[]) => unknown).bind(CargoFormulas))
