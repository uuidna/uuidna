import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** HAZARD — DANGER AS ARITHMETIC. Risk is likelihood times consequence; exposure, toxicity, probability, mitigation and
 *  spread are shares in hundredths; dilution is parts per million; evacuation is time to clear a distance. Crosses to `med`
 *  — hazard is what medicine guards against. A measure. */

const PROOF = 'hazard arithmetic (risk, exposure, toxicity, probability, mitigation, spread, dilution, evacuation); danger as integer shares; a measure crossed to med'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'hazard', dst: 'med', formula, value, proof: PROOF, ...extra }, holds, { name: `hazard.${name}`, params })

export class HazardFormulas {
  /** RISK: likelihood times consequence. value likelihood · consequence. */
  static risk(likelihood: number, consequence: number): CrossFormula { return c('hazard-risk', 'risk(likelihood, consequence) = likelihood · consequence', likelihood * consequence, nat(likelihood, consequence), 'risk', [likelihood, consequence]) }
  /** EXPOSURE: dose against a threshold, in hundredths. value ⌊dose · 100 / threshold⌋. */
  static exposure(dose: number, threshold: number): CrossFormula { return c('hazard-exposure', 'exposure(dose, threshold) = ⌊dose · 100 / threshold⌋', threshold > 0 ? Math.floor((dose * 100) / threshold) : 0, nat(dose, threshold) && threshold > 0, 'exposure', [dose, threshold]) }
  /** TOXICITY: lethal share of a population, in hundredths. value ⌊lethal · 100 / population⌋. */
  static toxicity(lethal: number, population: number): CrossFormula { return c('hazard-toxicity', 'toxicity(lethal, population) = ⌊lethal · 100 / population⌋', population > 0 ? Math.floor((lethal * 100) / population) : 0, nat(lethal, population) && population > 0 && lethal <= population, 'toxicity', [lethal, population]) }
  /** PROBABILITY: events over trials, in hundredths. value ⌊events · 100 / trials⌋. */
  static probability(events: number, trials: number): CrossFormula { return c('hazard-probability', 'probability(events, trials) = ⌊events · 100 / trials⌋', trials > 0 ? Math.floor((events * 100) / trials) : 0, nat(events, trials) && trials > 0 && events <= trials, 'probability', [events, trials]) }
  /** MITIGATION: reduced against initial, in hundredths. value ⌊reduced · 100 / initial⌋. */
  static mitigation(reduced: number, initial: number): CrossFormula { return c('hazard-mitigation', 'mitigation(reduced, initial) = ⌊reduced · 100 / initial⌋', initial > 0 ? Math.floor((reduced * 100) / initial) : 0, nat(reduced, initial) && initial > 0 && reduced <= initial, 'mitigation', [reduced, initial]) }
  /** SPREAD: affected over contacts, in hundredths. value ⌊affected · 100 / contacts⌋. */
  static spread(affected: number, contacts: number): CrossFormula { return c('hazard-spread', 'spread(affected, contacts) = ⌊affected · 100 / contacts⌋', contacts > 0 ? Math.floor((affected * 100) / contacts) : 0, nat(affected, contacts) && contacts > 0, 'spread', [affected, contacts]) }
  /** DILUTION: contaminant in a volume, parts per million. value ⌊contaminant · 1000000 / volume⌋. */
  static dilution(contaminant: number, volume: number): CrossFormula { return c('hazard-dilution', 'dilution(contaminant, volume) = ⌊contaminant · 1000000 / volume⌋', volume > 0 ? Math.floor((contaminant * 1000000) / volume) : 0, nat(contaminant, volume) && volume > 0, 'dilution', [contaminant, volume]) }
  /** EVACUATION: time to clear a distance at a speed. value ⌊distance / speed⌋. */
  static evacuation(distance: number, speed: number): CrossFormula { return c('hazard-evacuation', 'evacuation(distance, speed) = ⌊distance / speed⌋', speed > 0 ? Math.floor(distance / speed) : 0, nat(distance, speed) && speed > 0, 'evacuation', [distance, speed]) }
}

for (const name of ['dilution', 'evacuation', 'exposure', 'mitigation', 'probability', 'risk', 'spread', 'toxicity'] as const)
  hexRegisterOf('hazard', name, (HazardFormulas[name] as (...x: unknown[]) => unknown).bind(HazardFormulas))
