import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PRIMATOLOGY — PRIMATE FIELD DATA AS ARITHMETIC (chosen by the registry, not by hand). A troop is numbers: the brain
 *  against the body (an EQ proxy), the troop split into groups, grooming spread over individuals, dominance from contests
 *  won, calories foraged per hour, age at maturity, kinship across the troop, and tool use across observations. Crosses to
 *  `zoology` — primatology is the primate corner of it. A measure. */

const PROOF = 'primatology arithmetic (encephalization, troop, grooming, dominance, foraging, maturity, kinship, tool use); a registry domain; a measure crossed to zoology'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'primatology', dst: 'zoology', formula, value, proof: PROOF, ...extra }, holds, { name: `primatology.${name}`, params })

export class PrimatologyFormulas {
  /** ENCEPHALIZATION: brain against body, an EQ proxy. value ⌊brain · 1000 / body⌋. */
  static encephalization(brain: number, body: number): CrossFormula { return c('primatology-encephalization', 'encephalization(brain, body) = ⌊brain · 1000 / body⌋', body > 0 ? Math.floor((brain * 1000) / body) : 0, nat(brain, body) && body > 0, 'encephalization', [brain, body]) }
  /** TROOP: members split into groups. value ⌊members / groups⌋. */
  static troop(members: number, groups: number): CrossFormula { return c('primatology-troop', 'troop(members, groups) = ⌊members / groups⌋', groups > 0 ? Math.floor(members / groups) : 0, nat(members, groups) && groups > 0, 'troop', [members, groups]) }
  /** GROOMING: interactions spread over individuals. value ⌊interactions / individuals⌋. */
  static grooming(interactions: number, individuals: number): CrossFormula { return c('primatology-grooming', 'grooming(interactions, individuals) = ⌊interactions / individuals⌋', individuals > 0 ? Math.floor(interactions / individuals) : 0, nat(interactions, individuals) && individuals > 0, 'grooming', [interactions, individuals]) }
  /** DOMINANCE: contests won, as a percentage. value ⌊wins · 100 / contests⌋. */
  static dominance(wins: number, contests: number): CrossFormula { return c('primatology-dominance', 'dominance(wins, contests) = ⌊wins · 100 / contests⌋', contests > 0 ? Math.floor((wins * 100) / contests) : 0, nat(wins, contests) && contests > 0 && wins <= contests, 'dominance', [wins, contests]) }
  /** FORAGING: calories over hours. value ⌊calories / hours⌋. */
  static foraging(calories: number, hours: number): CrossFormula { return c('primatology-foraging', 'foraging(calories, hours) = ⌊calories / hours⌋', hours > 0 ? Math.floor(calories / hours) : 0, nat(calories, hours) && hours > 0, 'foraging', [calories, hours]) }
  /** MATURITY: age at maturity, in years. value years. */
  static maturity(years: number): CrossFormula { return c('primatology-maturity', 'maturity(years) = years', years, nat(years), 'maturity', [years]) }
  /** KINSHIP: related across the troop, as a percentage. value ⌊related · 100 / troop⌋. */
  static kinship(related: number, troop_: number): CrossFormula { return c('primatology-kinship', 'kinship(related, troop) = ⌊related · 100 / troop⌋', troop_ > 0 ? Math.floor((related * 100) / troop_) : 0, nat(related, troop_) && troop_ > 0 && related <= troop_, 'kinship', [related, troop_]) }
  /** TOOL USE: events across observations, as a percentage. value ⌊events · 100 / observations⌋. */
  static tooluse(events: number, observations: number): CrossFormula { return c('primatology-tooluse', 'tooluse(events, observations) = ⌊events · 100 / observations⌋', observations > 0 ? Math.floor((events * 100) / observations) : 0, nat(events, observations) && observations > 0 && events <= observations, 'tooluse', [events, observations]) }
}

for (const name of ['dominance', 'encephalization', 'foraging', 'grooming', 'kinship', 'maturity', 'tooluse', 'troop'] as const)
  hexRegisterOf('primatology', name, (PrimatologyFormulas[name] as (...x: unknown[]) => unknown).bind(PrimatologyFormulas))
