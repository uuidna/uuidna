import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ICHTHYOLOGY — THE STUDY OF FISH, AS ARITHMETIC (chosen by the registry, not by hand). A fish is numbers: body
 *  condition, the eggs it carries, how tightly it schools, how much it grew, its buoyancy, the rate its gills beat,
 *  stock mortality, and the trophic level it feeds at. Crosses to `zoology` — fish are what zoology measures. A measure. */

const PROOF = 'ichthyology arithmetic (condition, fecundity, schooling, growth, buoyancy, gill rate, mortality, trophic level); the study of fish as a measure crossed to zoology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'ichthyology', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name: `ichthyology.${name}`, params })

export class IchthyologyFormulas {
  /** CONDITION: Fulton's K proxy — weight over length cubed, scaled. value ⌊weight · 100000 / length³⌋. */
  static condition(weight: number, length: number): CrossFormula { return c('ichthyology-condition', 'condition(weight, length) = ⌊weight · 100000 / length³⌋', length > 0 ? Math.floor((weight * 100000) / (length * length * length)) : 0, nat(weight, length) && length > 0, 'condition', [weight, length]) }
  /** FECUNDITY: eggs carried per unit of body weight. value ⌊eggs / weight⌋. */
  static fecundity(eggs: number, weight: number): CrossFormula { return c('ichthyology-fecundity', 'fecundity(eggs, weight) = ⌊eggs / weight⌋', weight > 0 ? Math.floor(eggs / weight) : 0, nat(eggs, weight) && weight > 0, 'fecundity', [eggs, weight]) }
  /** SCHOOLING: fish packed into a volume of water. value ⌊fish / volume⌋. */
  static schooling(fish: number, volume: number): CrossFormula { return c('ichthyology-schooling', 'schooling(fish, volume) = ⌊fish / volume⌋', volume > 0 ? Math.floor(fish / volume) : 0, nat(fish, volume) && volume > 0, 'schooling', [fish, volume]) }
  /** GROWTH: the increase from initial to final length. value max(0, final − initial). */
  static growth(final: number, initial: number): CrossFormula { return c('ichthyology-growth', 'growth(final, initial) = max(0, final − initial)', Math.max(0, final - initial), nat(final, initial), 'growth', [final, initial]) }
  /** BUOYANCY: swim bladder as a percentage of body. value ⌊bladder · 100 / body⌋. */
  static buoyancy(bladder: number, body: number): CrossFormula { return c('ichthyology-buoyancy', 'buoyancy(bladder, body) = ⌊bladder · 100 / body⌋', body > 0 ? Math.floor((bladder * 100) / body) : 0, nat(bladder, body) && body > 0 && bladder <= body, 'buoyancy', [bladder, body]) }
  /** GILL RATE: opercular beats over the minutes observed. value ⌊beats / minutes⌋. */
  static gillrate(beats: number, minutes: number): CrossFormula { return c('ichthyology-gillrate', 'gillrate(beats, minutes) = ⌊beats / minutes⌋', minutes > 0 ? Math.floor(beats / minutes) : 0, nat(beats, minutes) && minutes > 0, 'gillrate', [beats, minutes]) }
  /** MORTALITY: dead as a percentage of the stock. value ⌊dead · 100 / stock⌋. */
  static mortality(dead: number, stock: number): CrossFormula { return c('ichthyology-mortality', 'mortality(dead, stock) = ⌊dead · 100 / stock⌋', stock > 0 ? Math.floor((dead * 100) / stock) : 0, nat(dead, stock) && stock > 0 && dead <= stock, 'mortality', [dead, stock]) }
  /** TROPHIC LEVEL: where the fish feeds in the food web. value level. */
  static trophic(level: number): CrossFormula { return c('ichthyology-trophic', 'trophic(level) = level', level, nat(level), 'trophic', [level]) }
}

for (const name of ['buoyancy', 'condition', 'fecundity', 'gillrate', 'growth', 'mortality', 'schooling', 'trophic'] as const)
  hexRegisterOf('ichthyology', name, (IchthyologyFormulas[name] as (...x: unknown[]) => unknown).bind(IchthyologyFormulas))
