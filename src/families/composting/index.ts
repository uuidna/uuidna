import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** COMPOSTING — TURNING ORGANIC MATTER, AS ARITHMETIC (the pile is numbers, not opinion). The carbon-to-nitrogen ratio,
 *  moisture, the core temperature a thermophilic pile reaches, whether it has cured, the pile's volume, how many turns it
 *  needs, aeration per unit mass, and how far it has decomposed. Crosses to `ecology` — composting is the nutrient cycle
 *  closed by hand. A measure. */

const PROOF = 'composting arithmetic (C:N ratio, moisture, core temperature, maturity, volume, turnover, aeration, decomposition); the nutrient cycle as numbers; a measure crossed to ecology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'composting', dst: 'ecology', formula, value, proof: PROOF, ...extra }, holds, { name: `composting.${name}`, params })

export class CompostingFormulas {
  /** C:N RATIO: parts carbon per part nitrogen. value ⌊carbon / nitrogen⌋. */
  static cnratio(carbon: number, nitrogen: number): CrossFormula { return c('composting-cnratio', 'cnratio(carbon, nitrogen) = ⌊carbon / nitrogen⌋', nitrogen > 0 ? Math.floor(carbon / nitrogen) : 0, nat(carbon, nitrogen) && nitrogen > 0, 'cnratio', [carbon, nitrogen]) }
  /** MOISTURE as a percentage of total mass. value ⌊water · 100 / total⌋. */
  static moisture(water: number, total: number): CrossFormula { return c('composting-moisture', 'moisture(water, total) = ⌊water · 100 / total⌋', total > 0 ? Math.floor((water * 100) / total) : 0, nat(water, total) && total > 0 && water <= total, 'moisture', [water, total]) }
  /** CORE TEMPERATURE: ambient plus the thermophilic rise. value ambient + rise. */
  static temperature(ambient: number, rise: number): CrossFormula { return c('composting-temperature', 'temperature(ambient, rise) = ambient + rise', ambient + rise, nat(ambient, rise), 'temperature', [ambient, rise]) }
  /** MATURITY: 1 when the pile has cured for at least the target days. value [days ≥ target]. */
  static maturity(days: number, target: number): CrossFormula { return c('composting-maturity', 'maturity(days, target) = [days ≥ target]', days >= target ? 1 : 0, nat(days, target), 'maturity', [days, target]) }
  /** VOLUME of the pile. value length · width · height. */
  static volume(length: number, width: number, height: number): CrossFormula { return c('composting-volume', 'volume(length, width, height) = length · width · height', length * width * height, nat(length, width, height), 'volume', [length, width, height]) }
  /** TURNOVER: the turns a volume needs at a per-turn capacity. value ⌈volume / perTurn⌉. */
  static turnover(volume: number, perTurn: number): CrossFormula { return c('composting-turnover', 'turnover(volume, perTurn) = ⌈volume / perTurn⌉', perTurn > 0 ? Math.ceil(volume / perTurn) : 0, nat(volume, perTurn) && perTurn > 0, 'turnover', [volume, perTurn]) }
  /** AERATION: airflow per unit mass. value ⌊airflow / mass⌋. */
  static aeration(airflow: number, mass: number): CrossFormula { return c('composting-aeration', 'aeration(airflow, mass) = ⌊airflow / mass⌋', mass > 0 ? Math.floor(airflow / mass) : 0, nat(airflow, mass) && mass > 0, 'aeration', [airflow, mass]) }
  /** DECOMPOSITION: the percentage of the starting mass that has broken down. value ⌊max(0, initial − remaining) · 100 / initial⌋. */
  static decomposition(initial: number, remaining: number): CrossFormula { return c('composting-decomposition', 'decomposition(initial, remaining) = ⌊max(0, initial − remaining) · 100 / initial⌋', initial > 0 ? Math.floor((Math.max(0, initial - remaining) * 100) / initial) : 0, nat(initial, remaining) && initial > 0 && remaining <= initial, 'decomposition', [initial, remaining]) }
}

for (const name of ['aeration', 'cnratio', 'decomposition', 'maturity', 'moisture', 'temperature', 'turnover', 'volume'] as const)
  hexRegisterOf('composting', name, (CompostingFormulas[name] as (...x: unknown[]) => unknown).bind(CompostingFormulas))
