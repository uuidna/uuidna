import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOILSCIENCE — THE GROUND AS ARITHMETIC. What a soil is, is numbers: pore space, how heavy it packs, the water it holds,
 *  the cations it can trade, its organic fraction, how fast water sinks in, how salty it runs, and the clay left after sand
 *  and silt. Crosses to `ecology` — soil is the substrate ecology grows from. A measure. */

const PROOF = 'soilscience arithmetic (porosity, bulk density, field capacity, cation exchange, organic matter, infiltration, salinity, texture); the ground a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'soilscience', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `soilscience.${name}`, params })

export class SoilscienceFormulas {
  /** POROSITY as a percentage: pore space left by the packing against the particle density. value ⌊(particle − bulk) · 100 / particle⌋. */
  static porosity(bulk: number, particle: number): CrossFormula { return c('soilscience-porosity', 'porosity(bulk, particle) = ⌊(particle − bulk) · 100 / particle⌋', particle > 0 ? Math.floor((Math.max(0, particle - bulk) * 100) / particle) : 0, nat(bulk, particle) && particle > 0 && bulk <= particle, 'porosity', [bulk, particle]) }
  /** BULK DENSITY: oven-dry mass over the bulk volume. value ⌊mass / volume⌋. */
  static bulkdensity(mass: number, volume: number): CrossFormula { return c('soilscience-bulkdensity', 'bulkdensity(mass, volume) = ⌊mass / volume⌋', volume > 0 ? Math.floor(mass / volume) : 0, nat(mass, volume) && volume > 0, 'bulkdensity', [mass, volume]) }
  /** FIELD CAPACITY: the plant-available water, field capacity above the wilting point. value max(0, fc − wilt). */
  static fieldcapacity(fc: number, wilt: number): CrossFormula { return c('soilscience-fieldcapacity', 'fieldcapacity(fc, wilt) = max(0, fc − wilt)', Math.max(0, fc - wilt), nat(fc, wilt) && wilt <= fc, 'fieldcapacity', [fc, wilt]) }
  /** CATION EXCHANGE CAPACITY: exchange sites at a charge each. value sites · charge. */
  static cationexchange(sites: number, charge: number): CrossFormula { return c('soilscience-cationexchange', 'cationexchange(sites, charge) = sites · charge', sites * charge, nat(sites, charge), 'cationexchange', [sites, charge]) }
  /** ORGANIC MATTER from organic carbon by the Van Bemmelen factor. value ⌊carbon · 1724 / 1000⌋. */
  static organicmatter(carbon: number): CrossFormula { return c('soilscience-organicmatter', 'organicmatter(carbon) = ⌊carbon · 1724 / 1000⌋', Math.floor((carbon * 1724) / 1000), nat(carbon), 'organicmatter', [carbon]) }
  /** INFILTRATION: depth of water sunk in over the time taken. value ⌊depth / time⌋. */
  static infiltration(depth: number, time: number): CrossFormula { return c('soilscience-infiltration', 'infiltration(depth, time) = ⌊depth / time⌋', time > 0 ? Math.floor(depth / time) : 0, nat(depth, time) && time > 0, 'infiltration', [depth, time]) }
  /** SALINITY: dissolved salts from electrical conductivity at the standard 640 factor. value ec · 640. */
  static salinity(ec: number): CrossFormula { return c('soilscience-salinity', 'salinity(ec) = ec · 640', ec * 640, nat(ec), 'salinity', [ec]) }
  /** TEXTURE: the clay fraction left after sand and silt. value max(0, 100 − sand − silt). */
  static texture(sand: number, silt: number): CrossFormula { return c('soilscience-texture', 'texture(sand, silt) = max(0, 100 − sand − silt)', Math.max(0, 100 - sand - silt), nat(sand, silt) && sand + silt <= 100, 'texture', [sand, silt]) }
}

for (const name of ['bulkdensity', 'cationexchange', 'fieldcapacity', 'infiltration', 'organicmatter', 'porosity', 'salinity', 'texture'] as const)
  hexRegisterOf('soilscience', name, (SoilscienceFormulas[name] as (...x: unknown[]) => unknown).bind(SoilscienceFormulas))
