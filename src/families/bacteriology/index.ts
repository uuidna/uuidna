import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BACTERIOLOGY — GROWING CULTURES, AS ARITHMETIC (chosen by the registry, not by hand). A culture is numbers: how long a
 *  generation takes, colony-forming units, serial dilution, the divisions per hour, the minimum inhibitory concentration,
 *  biofilm biomass, viability, and the population after whole doublings. Crosses to `microbiology` — bacteriology is the
 *  counting microbiology watches. A measure. */

const PROOF = 'bacteriology arithmetic (generation time, CFU, dilution, growth rate, MIC, biofilm, viability, doublings); a registry domain; a measure crossed to microbiology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bacteriology', dst: 'microbiology', formula, value, proof: PROOF, ...extra }, holds, { name: `bacteriology.${name}`, params })

export class BacteriologyFormulas {
  /** GENERATION TIME: minutes over the divisions observed. value ⌊minutes / divisions⌋. */
  static generationtime(minutes: number, divisions: number): CrossFormula { return c('bacteriology-generationtime', 'generationtime(minutes, divisions) = ⌊minutes / divisions⌋', divisions > 0 ? Math.floor(minutes / divisions) : 0, nat(minutes, divisions) && divisions > 0, 'generationtime', [minutes, divisions]) }
  /** COLONY-FORMING UNITS: counted colonies times the dilution factor. value colonies · dilution. */
  static cfu(colonies: number, dilution: number): CrossFormula { return c('bacteriology-cfu', 'cfu(colonies, dilution) = colonies · dilution', colonies * dilution, nat(colonies, dilution), 'cfu', [colonies, dilution]) }
  /** SERIAL DILUTION: a volume divided down by a factor. value ⌊volume / factor⌋. */
  static dilution(volume: number, factor: number): CrossFormula { return c('bacteriology-dilution', 'dilution(volume, factor) = ⌊volume / factor⌋', factor > 0 ? Math.floor(volume / factor) : 0, nat(volume, factor) && factor > 0, 'dilution', [volume, factor]) }
  /** GROWTH RATE: divisions over the hours they took. value ⌊divisions / hours⌋. */
  static growthrate(divisions: number, hours: number): CrossFormula { return c('bacteriology-growthrate', 'growthrate(divisions, hours) = ⌊divisions / hours⌋', hours > 0 ? Math.floor(divisions / hours) : 0, nat(divisions, hours) && hours > 0, 'growthrate', [divisions, hours]) }
  /** MINIMUM INHIBITORY CONCENTRATION: a stock stepped down a dilution factor. value ⌊stock / factor⌋. */
  static mic(stock: number, factor: number): CrossFormula { return c('bacteriology-mic', 'mic(stock, factor) = ⌊stock / factor⌋', factor > 0 ? Math.floor(stock / factor) : 0, nat(stock, factor) && factor > 0, 'mic', [stock, factor]) }
  /** BIOFILM BIOMASS: cells across its layers. value cells · layers. */
  static biofilm(cells: number, layers: number): CrossFormula { return c('bacteriology-biofilm', 'biofilm(cells, layers) = cells · layers', cells * layers, nat(cells, layers), 'biofilm', [cells, layers]) }
  /** VIABILITY as a percentage. value ⌊live · 100 / total⌋. */
  static viability(live: number, total: number): CrossFormula { return c('bacteriology-viability', 'viability(live, total) = ⌊live · 100 / total⌋', total > 0 ? Math.floor((live * 100) / total) : 0, nat(live, total) && total > 0 && live <= total, 'viability', [live, total]) }
  /** DOUBLINGS: an initial population after whole generations. value initial · 2^generations. */
  static doublings(initial: number, generations: number): CrossFormula { return c('bacteriology-doublings', 'doublings(initial, generations) = initial · 2^generations', initial * (2 ** generations), nat(initial, generations), 'doublings', [initial, generations]) }
}

for (const name of ['biofilm', 'cfu', 'dilution', 'doublings', 'generationtime', 'growthrate', 'mic', 'viability'] as const)
  hexRegisterOf('bacteriology', name, (BacteriologyFormulas[name] as (...x: unknown[]) => unknown).bind(BacteriologyFormulas))
