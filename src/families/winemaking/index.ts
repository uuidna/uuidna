import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** WINEMAKING — THE CELLAR AS ARITHMETIC (chosen by the registry, not by hand). Turning grapes into wine is numbers:
 *  alcohol from the sugar drop, the must's sugar (°Brix), titratable acidity, the sulfite a tank needs, the litres a
 *  harvest yields, juice extracted from the crush, the daily pace of fermentation, and a three-varietal blend. Crosses to
 *  `cuisine` — wine is what the table is set around. A measure. */

const PROOF = 'winemaking arithmetic (abv from the sugar drop, °Brix, titratable acidity, sulfite dose, harvest yield, extraction, fermentation pace, three-varietal blend); a registry domain; a measure crossed to cuisine'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'winemaking', dst: 'cuisine', formula, value, proof: PROOF, ...extra }, holds, { name: `winemaking.${name}`, params })

export class WinemakingFormulas {
  /** ALCOHOL BY VOLUME from the °Brix drop. value ⌊(start − final) · 55 / 100⌋. */
  static abv(start: number, final: number): CrossFormula { return c('winemaking-abv', 'abv(start, final) = ⌊(start − final) · 55 / 100⌋', Math.floor((Math.max(0, start - final) * 55) / 100), nat(start, final) && start >= final, 'abv', [start, final]) }
  /** °BRIX: grams of sugar per 100 of must. value ⌊sugar · 100 / volume⌋. */
  static brix(sugar: number, volume: number): CrossFormula { return c('winemaking-brix', 'brix(sugar, volume) = ⌊sugar · 100 / volume⌋', volume > 0 ? Math.floor((sugar * 100) / volume) : 0, nat(sugar, volume) && volume > 0, 'brix', [sugar, volume]) }
  /** TITRATABLE ACIDITY in grams per litre. value ⌊acid · 1000 / volume⌋. */
  static acidity(acid: number, volume: number): CrossFormula { return c('winemaking-acidity', 'acidity(acid, volume) = ⌊acid · 1000 / volume⌋', volume > 0 ? Math.floor((acid * 1000) / volume) : 0, nat(acid, volume) && volume > 0, 'acidity', [acid, volume]) }
  /** SULFITE: the SO₂ a tank needs, litres at a dose in ppm. value volume · ppm. */
  static sulfite(volume: number, ppm: number): CrossFormula { return c('winemaking-sulfite', 'sulfite(volume, ppm) = volume · ppm', volume * ppm, nat(volume, ppm), 'sulfite', [volume, ppm]) }
  /** YIELD: litres from a harvest, kilograms at litres per tonne. value ⌊grapes · perTon / 1000⌋. */
  static yield(grapes: number, perTon: number): CrossFormula { return c('winemaking-yield', 'yield(grapes, perTon) = ⌊grapes · perTon / 1000⌋', Math.floor((grapes * perTon) / 1000), nat(grapes, perTon), 'yield', [grapes, perTon]) }
  /** EXTRACTION: juice from the crush at a percentage rate. value ⌊mass · rate / 100⌋. */
  static extraction(mass: number, rate: number): CrossFormula { return c('winemaking-extraction', 'extraction(mass, rate) = ⌊mass · rate / 100⌋', Math.floor((mass * rate) / 100), nat(mass, rate), 'extraction', [mass, rate]) }
  /** FERMENTATION: the daily °Brix drop over the days it took. value ⌊(start − final) / days⌋. */
  static fermentation(start: number, final: number, days: number): CrossFormula { return c('winemaking-fermentation', 'fermentation(start, final, days) = ⌊(start − final) / days⌋', days > 0 ? Math.floor(Math.max(0, start - final) / days) : 0, nat(start, final, days) && days > 0 && start >= final, 'fermentation', [start, final, days]) }
  /** BLEND: a three-varietal cuvée, the parts summed. value a + b + c. */
  static blend(a: number, b: number, c2: number): CrossFormula { return c('winemaking-blend', 'blend(a, b, c) = a + b + c', a + b + c2, nat(a, b, c2), 'blend', [a, b, c2]) }
}

for (const name of ['abv', 'acidity', 'blend', 'brix', 'extraction', 'fermentation', 'sulfite', 'yield'] as const)
  hexRegisterOf('winemaking', name, (WinemakingFormulas[name] as (...x: unknown[]) => unknown).bind(WinemakingFormulas))
