import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** POLLINATION — THE TRANSFER OF POLLEN, AS ARITHMETIC. Reproduction is numbers: the fruit a flower sets, how often a
 *  pollinator visits, viable pollen, hives over ground, seeds per fruit, cross-pollination pairings, how far a forager
 *  ranges, and the share of yield that depends on it. Crosses to `botany` — pollination is what botany grows from. A measure. */

const PROOF = 'pollination arithmetic (fruit set, visitation rate, pollen viability, hive density, seed set, cross-pollination, forage range, yield dependence); a measure crossed to botany'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'pollination', dst: 'botany', formula, value, proof: PROOF, ...extra }, holds, { name: `pollination.${name}`, params })

export class PollinationFormulas {
  /** FRUIT SET: the percentage of flowers that set fruit. value ⌊fruits · 100 / flowers⌋. */
  static fruitset(fruits: number, flowers: number): CrossFormula { return c('pollination-fruitset', 'fruitset(fruits, flowers) = ⌊fruits · 100 / flowers⌋', flowers > 0 ? Math.floor((fruits * 100) / flowers) : 0, nat(fruits, flowers) && flowers > 0 && fruits <= flowers, 'fruitset', [fruits, flowers]) }
  /** VISITATION RATE: pollinator visits over hours observed. value ⌊visits / hours⌋. */
  static visitationrate(visits: number, hours: number): CrossFormula { return c('pollination-visitationrate', 'visitationrate(visits, hours) = ⌊visits / hours⌋', hours > 0 ? Math.floor(visits / hours) : 0, nat(visits, hours) && hours > 0, 'visitationrate', [visits, hours]) }
  /** POLLEN VIABILITY: the percentage of pollen grains that are viable. value ⌊viable · 100 / total⌋. */
  static pollenviability(viable: number, total: number): CrossFormula { return c('pollination-pollenviability', 'pollenviability(viable, total) = ⌊viable · 100 / total⌋', total > 0 ? Math.floor((viable * 100) / total) : 0, nat(viable, total) && total > 0 && viable <= total, 'pollenviability', [viable, total]) }
  /** HIVE DENSITY: hives over ground (hectares). value ⌊hives / area⌋. */
  static hivedensity(hives: number, area: number): CrossFormula { return c('pollination-hivedensity', 'hivedensity(hives, area) = ⌊hives / area⌋', area > 0 ? Math.floor(hives / area) : 0, nat(hives, area) && area > 0, 'hivedensity', [hives, area]) }
  /** SEED SET: seeds per fruit across the fruits set. value seeds · fruits. */
  static seedset(seeds: number, fruits: number): CrossFormula { return c('pollination-seedset', 'seedset(seeds, fruits) = seeds · fruits', seeds * fruits, nat(seeds, fruits), 'seedset', [seeds, fruits]) }
  /** CROSS-POLLINATION: pollen-transfer pairings between donors and recipients. value donors · recipients. */
  static crosspollination(donors: number, recipients: number): CrossFormula { return c('pollination-crosspollination', 'crosspollination(donors, recipients) = donors · recipients', donors * recipients, nat(donors, recipients), 'crosspollination', [donors, recipients]) }
  /** FORAGE RANGE: the distance a forager covers at a speed over time. value speed · time. */
  static foragerange(speed: number, time: number): CrossFormula { return c('pollination-foragerange', 'foragerange(speed, time) = speed · time', speed * time, nat(speed, time), 'foragerange', [speed, time]) }
  /** YIELD DEPENDENCE: the share of yield attributable to pollination. value ⌊yield · dependence / 100⌋. */
  static yielddependence(yield_: number, dependence: number): CrossFormula { return c('pollination-yielddependence', 'yielddependence(yield, dependence) = ⌊yield · dependence / 100⌋', Math.floor((yield_ * dependence) / 100), nat(yield_, dependence) && dependence <= 100, 'yielddependence', [yield_, dependence]) }
}

for (const name of ['crosspollination', 'foragerange', 'fruitset', 'hivedensity', 'pollenviability', 'seedset', 'visitationrate', 'yielddependence'] as const)
  hexRegisterOf('pollination', name, (PollinationFormulas[name] as (...x: unknown[]) => unknown).bind(PollinationFormulas))
