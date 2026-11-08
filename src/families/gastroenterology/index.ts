import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GASTROENTEROLOGY — THE GUT, AS ARITHMETIC. Moving, absorbing and clearing is numbers: transit speed, the fraction
 *  absorbed, acidity, motility, body mass, bleeding share, enzyme concentration and the clearance fraction. Crosses to
 *  `med` — gastroenterology is a measure medicine reads. A measure. */

const PROOF = 'gastroenterology arithmetic (transit, absorption, pH, motility, BMI, bleeding, enzyme, clearance); the gut as a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'gastroenterology', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `gastroenterology.${name}`, params })

export class GastroenterologyFormulas {
  /** TRANSIT: distance travelled per hour. value ⌊distance / hours⌋. */
  static transit(distance: number, hours: number): CrossFormula { return c('gastroenterology-transit', 'transit(distance, hours) = ⌊distance / hours⌋', hours > 0 ? Math.floor(distance / hours) : 0, nat(distance, hours) && hours > 0, 'transit', [distance, hours]) }
  /** ABSORPTION as a percentage of what was ingested. value ⌊absorbed · 100 / ingested⌋. */
  static absorption(absorbed: number, ingested: number): CrossFormula { return c('gastroenterology-absorption', 'absorption(absorbed, ingested) = ⌊absorbed · 100 / ingested⌋', ingested > 0 ? Math.floor((absorbed * 100) / ingested) : 0, nat(absorbed, ingested) && ingested > 0 && absorbed <= ingested, 'absorption', [absorbed, ingested]) }
  /** PH as a scaled acid-to-base ratio. value ⌊acid · 100 / base⌋. */
  static ph(acid: number, base: number): CrossFormula { return c('gastroenterology-ph', 'ph(acid, base) = ⌊acid · 100 / base⌋', base > 0 ? Math.floor((acid * 100) / base) : 0, nat(acid, base) && base > 0, 'ph', [acid, base]) }
  /** MOTILITY: contractions per minute. value ⌊contractions / minutes⌋. */
  static motility(contractions: number, minutes: number): CrossFormula { return c('gastroenterology-motility', 'motility(contractions, minutes) = ⌊contractions / minutes⌋', minutes > 0 ? Math.floor(contractions / minutes) : 0, nat(contractions, minutes) && minutes > 0, 'motility', [contractions, minutes]) }
  /** BMI: weight over height squared, scaled. value ⌊weight · 10000 / (heightcm · heightcm)⌋. */
  static bmi(weight: number, heightcm: number): CrossFormula { return c('gastroenterology-bmi', 'bmi(weight, heightcm) = ⌊weight · 10000 / (heightcm · heightcm)⌋', heightcm > 0 ? Math.floor((weight * 10000) / (heightcm * heightcm)) : 0, nat(weight, heightcm) && heightcm > 0, 'bmi', [weight, heightcm]) }
  /** BLEEDING as a percentage of blood volume. value ⌊lost · 100 / volume⌋. */
  static bleeding(lost: number, volume: number): CrossFormula { return c('gastroenterology-bleeding', 'bleeding(lost, volume) = ⌊lost · 100 / volume⌋', volume > 0 ? Math.floor((lost * 100) / volume) : 0, nat(lost, volume) && volume > 0 && lost <= volume, 'bleeding', [lost, volume]) }
  /** ENZYME concentration: units per volume. value ⌊units / volume⌋. */
  static enzyme(units: number, volume: number): CrossFormula { return c('gastroenterology-enzyme', 'enzyme(units, volume) = ⌊units / volume⌋', volume > 0 ? Math.floor(units / volume) : 0, nat(units, volume) && volume > 0, 'enzyme', [units, volume]) }
  /** CLEARANCE as a percentage of the load removed. value ⌊removed · 100 / load⌋. */
  static clearance(removed: number, load: number): CrossFormula { return c('gastroenterology-clearance', 'clearance(removed, load) = ⌊removed · 100 / load⌋', load > 0 ? Math.floor((removed * 100) / load) : 0, nat(removed, load) && load > 0 && removed <= load, 'clearance', [removed, load]) }
}

for (const name of ['absorption', 'bleeding', 'bmi', 'clearance', 'enzyme', 'motility', 'ph', 'transit'] as const)
  hexRegisterOf('gastroenterology', name, (GastroenterologyFormulas[name] as (...x: unknown[]) => unknown).bind(GastroenterologyFormulas))
