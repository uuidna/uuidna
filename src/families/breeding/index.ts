import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BREEDING — SELECTIVE BREEDING AS ARITHMETIC (chosen by the registry, not by hand). Improving a population is numbers:
 *  heritability, inbreeding accumulated over generations, the superiority of the selected parents, the gain that selection
 *  returns, an estimated breeding value, the effective population, the conception rate, and the surviving progeny. Crosses
 *  to `zoology` — breeding is what zoology measures in a living population. A measure. */

const PROOF = 'breeding arithmetic (heritability, inbreeding, selection differential, genetic gain, breeding value, effective population, conception rate, progeny count); a measure crossed to zoology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'breeding', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name: `breeding.${name}`, params })

export class BreedingFormulas {
  /** HERITABILITY: genetic variance over phenotypic variance, as a percentage. value ⌊vg · 100 / vp⌋. */
  static heritability(vg: number, vp: number): CrossFormula { return c('breeding-heritability', 'heritability(vg, vp) = ⌊vg · 100 / vp⌋', vp > 0 ? Math.floor((vg * 100) / vp) : 0, nat(vg, vp) && vp > 0 && vg <= vp, 'heritability', [vg, vp]) }
  /** INBREEDING: coefficient accumulated over generations, in permille, at effective population ne. value ⌊gen · 1000 / (2 · ne)⌋. */
  static inbreeding(gen: number, ne: number): CrossFormula { return c('breeding-inbreeding', 'inbreeding(gen, ne) = ⌊gen · 1000 / (2 · ne)⌋', ne > 0 ? Math.floor((gen * 1000) / (2 * ne)) : 0, nat(gen, ne) && ne > 0, 'inbreeding', [gen, ne]) }
  /** SELECTION DIFFERENTIAL: superiority of the selected parents over the population mean. value max(0, selected − mean). */
  static selectiondifferential(selected: number, mean: number): CrossFormula { return c('breeding-selectiondifferential', 'selectiondifferential(selected, mean) = max(0, selected − mean)', Math.max(0, selected - mean), nat(selected, mean), 'selectiondifferential', [selected, mean]) }
  /** GENETIC GAIN: response to selection R = h² · S, with heritability h2 as a percentage. value ⌊h2 · sd / 100⌋. */
  static geneticgain(h2: number, sd: number): CrossFormula { return c('breeding-geneticgain', 'geneticgain(h2, sd) = ⌊h2 · sd / 100⌋', Math.floor((h2 * sd) / 100), nat(h2, sd) && h2 <= 100, 'geneticgain', [h2, sd]) }
  /** BREEDING VALUE: an EBV weighted by its reliability, reliability as a percentage. value ⌊reliability · ebv / 100⌋. */
  static breedingvalue(reliability: number, ebv: number): CrossFormula { return c('breeding-breedingvalue', 'breedingvalue(reliability, ebv) = ⌊reliability · ebv / 100⌋', Math.floor((reliability * ebv) / 100), nat(reliability, ebv) && reliability <= 100, 'breedingvalue', [reliability, ebv]) }
  /** EFFECTIVE POPULATION: Ne from the breeding males and females. value ⌊4 · males · females / (males + females)⌋. */
  static effectivepopulation(males: number, females: number): CrossFormula { return c('breeding-effectivepopulation', 'effectivepopulation(males, females) = ⌊4 · males · females / (males + females)⌋', (males + females) > 0 ? Math.floor((4 * males * females) / (males + females)) : 0, nat(males, females) && (males + females) > 0, 'effectivepopulation', [males, females]) }
  /** CONCEPTION RATE: pregnancies over females bred, as a percentage. value ⌊pregnant · 100 / bred⌋. */
  static conceptionrate(pregnant: number, bred: number): CrossFormula { return c('breeding-conceptionrate', 'conceptionrate(pregnant, bred) = ⌊pregnant · 100 / bred⌋', bred > 0 ? Math.floor((pregnant * 100) / bred) : 0, nat(pregnant, bred) && bred > 0 && pregnant <= bred, 'conceptionrate', [pregnant, bred]) }
  /** PROGENY COUNT: surviving offspring from the females, each litter, at a survival percentage. value ⌊females · perFemale · survival / 100⌋. */
  static progenycount(females: number, perFemale: number, survival: number): CrossFormula { return c('breeding-progenycount', 'progenycount(females, perFemale, survival) = ⌊females · perFemale · survival / 100⌋', Math.floor((females * perFemale * survival) / 100), nat(females, perFemale, survival) && survival <= 100, 'progenycount', [females, perFemale, survival]) }
}

for (const name of ['breedingvalue', 'conceptionrate', 'effectivepopulation', 'geneticgain', 'heritability', 'inbreeding', 'progenycount', 'selectiondifferential'] as const)
  hexRegisterOf('breeding', name, (BreedingFormulas[name] as (...x: unknown[]) => unknown).bind(BreedingFormulas))
