import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AQUAFARMING — RAISING FISH IN TANKS AND PONDS, AS ARITHMETIC. Running a farm is numbers: how densely a tank is stocked,
 *  the standing biomass, the daily feed, the oxygen the stock demands, how many survive to harvest, the water a system turns
 *  over, how fast fish grow, and the weight pulled at harvest. Crosses to `ichthyology` — aquafarming is the fish science
 *  applied. A measure. */

const PROOF = 'aquafarming arithmetic (stocking density, biomass, feed rate, oxygen demand, survival, water exchange, growth, harvest weight); fish husbandry as integers; a measure crossed to ichthyology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'aquafarming', dst: 'ichthyology', formula, value, proof: PROOF, ...extra }, holds, { name: `aquafarming.${name}`, params })

export class AquafarmingFormulas {
  /** STOCKING DENSITY: fish per unit of water volume. value ⌊fish / volume⌋. */
  static stockingdensity(fish: number, volume: number): CrossFormula { return c('aquafarming-stockingdensity', 'stockingdensity(fish, volume) = ⌊fish / volume⌋', volume > 0 ? Math.floor(fish / volume) : 0, nat(fish, volume) && volume > 0, 'stockingdensity', [fish, volume]) }
  /** BIOMASS: the standing weight of the stock. value count · weight. */
  static biomass(count: number, weight: number): CrossFormula { return c('aquafarming-biomass', 'biomass(count, weight) = count · weight', count * weight, nat(count, weight), 'biomass', [count, weight]) }
  /** FEED RATE: a percentage of biomass fed each day. value ⌊biomass · percent / 100⌋. */
  static feedrate(biomass: number, percent: number): CrossFormula { return c('aquafarming-feedrate', 'feedrate(biomass, percent) = ⌊biomass · percent / 100⌋', Math.floor((biomass * percent) / 100), nat(biomass, percent) && percent <= 100, 'feedrate', [biomass, percent]) }
  /** OXYGEN DEMAND: the stock's draw at a per-kg rate. value ⌊biomass · rate / 1000⌋. */
  static oxygendemand(biomass: number, rate: number): CrossFormula { return c('aquafarming-oxygendemand', 'oxygendemand(biomass, rate) = ⌊biomass · rate / 1000⌋', Math.floor((biomass * rate) / 1000), nat(biomass, rate), 'oxygendemand', [biomass, rate]) }
  /** SURVIVAL RATE as a percentage. value ⌊harvested · 100 / stocked⌋. */
  static survivalrate(stocked: number, harvested: number): CrossFormula { return c('aquafarming-survivalrate', 'survivalrate(stocked, harvested) = ⌊harvested · 100 / stocked⌋', stocked > 0 ? Math.floor((harvested * 100) / stocked) : 0, nat(stocked, harvested) && stocked > 0 && harvested <= stocked, 'survivalrate', [stocked, harvested]) }
  /** WATER EXCHANGE: volume turned over per day. value volume · turnovers. */
  static waterexchange(volume: number, turnovers: number): CrossFormula { return c('aquafarming-waterexchange', 'waterexchange(volume, turnovers) = volume · turnovers', volume * turnovers, nat(volume, turnovers), 'waterexchange', [volume, turnovers]) }
  /** GROWTH RATE: weight gained per day over a period. value ⌊(final − initial) / days⌋. */
  static growthrate(final: number, initial: number, days: number): CrossFormula { return c('aquafarming-growthrate', 'growthrate(final, initial, days) = ⌊(final − initial) / days⌋', days > 0 ? Math.floor(Math.max(0, final - initial) / days) : 0, nat(final, initial, days) && days > 0 && final >= initial, 'growthrate', [final, initial, days]) }
  /** HARVEST WEIGHT: the total weight pulled at harvest. value count · avgweight. */
  static harvestweight(count: number, avgweight: number): CrossFormula { return c('aquafarming-harvestweight', 'harvestweight(count, avgweight) = count · avgweight', count * avgweight, nat(count, avgweight), 'harvestweight', [count, avgweight]) }
}

for (const name of ['biomass', 'feedrate', 'growthrate', 'harvestweight', 'oxygendemand', 'stockingdensity', 'survivalrate', 'waterexchange'] as const)
  hexRegisterOf('aquafarming', name, (AquafarmingFormulas[name] as (...x: unknown[]) => unknown).bind(AquafarmingFormulas))
