import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GEOPOLITICS — STATES AND BLOCS AS ARITHMETIC (purely quantitative, neutral indices; no advice). Standing between
 *  states is numbers: a composite power index, the weight of an alliance, how much trade one side depends on, border
 *  tension per day, an influence score, the measured impact of sanctions, the balance between two blocs, and whether a
 *  stability target is met. Crosses to `governance` — geopolitics is what governance accounts for. A measure. */

const PROOF = 'geopolitics arithmetic (power index, alliance weight, trade dependency, border tension, influence, sanction impact, balance of power, stability); neutral quantitative indices; a measure crossed to governance'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'geopolitics', dst: 'governance', formula, value, proof: PROOF, ...extra }, holds, { name: `geopolitics.${name}`, params })

export class GeopoliticsFormulas {
  /** POWER INDEX: a composite of three capability scores. value military + economy + population. */
  static powerindex(military: number, economy: number, population: number): CrossFormula { return c('geopolitics-powerindex', 'powerindex(military, economy, population) = military + economy + population', military + economy + population, nat(military, economy, population), 'powerindex', [military, economy, population]) }
  /** ALLIANCE WEIGHT: members at a per-member strength. value members · strength. */
  static allianceweight(members: number, strength: number): CrossFormula { return c('geopolitics-allianceweight', 'allianceweight(members, strength) = members · strength', members * strength, nat(members, strength), 'allianceweight', [members, strength]) }
  /** TRADE DEPENDENCY: imports as a percentage of total trade. value ⌊imports · 100 / total⌋. */
  static tradedependency(imports: number, total: number): CrossFormula { return c('geopolitics-tradedependency', 'tradedependency(imports, total) = ⌊imports · 100 / total⌋', total > 0 ? Math.floor((imports * 100) / total) : 0, nat(imports, total) && total > 0 && imports <= total, 'tradedependency', [imports, total]) }
  /** BORDER TENSION: incidents averaged over days. value ⌊incidents / days⌋. */
  static bordertension(incidents: number, days: number): CrossFormula { return c('geopolitics-bordertension', 'bordertension(incidents, days) = ⌊incidents / days⌋', days > 0 ? Math.floor(incidents / days) : 0, nat(incidents, days) && days > 0, 'bordertension', [incidents, days]) }
  /** INFLUENCE SCORE: allies weighted by votes each carries. value allies · votes. */
  static influencescore(allies: number, votes: number): CrossFormula { return c('geopolitics-influencescore', 'influencescore(allies, votes) = allies · votes', allies * votes, nat(allies, votes), 'influencescore', [allies, votes]) }
  /** SANCTION IMPACT: baseline trade less the restricted portion. value max(0, baseline − restricted). */
  static sanctionimpact(baseline: number, restricted: number): CrossFormula { return c('geopolitics-sanctionimpact', 'sanctionimpact(baseline, restricted) = max(0, baseline − restricted)', Math.max(0, baseline - restricted), nat(baseline, restricted), 'sanctionimpact', [baseline, restricted]) }
  /** BALANCE OF POWER: one bloc measured against another. value ⌊blocA · 100 / blocB⌋. */
  static balanceofpower(blocA: number, blocB: number): CrossFormula { return c('geopolitics-balanceofpower', 'balanceofpower(blocA, blocB) = ⌊blocA · 100 / blocB⌋', blocB > 0 ? Math.floor((blocA * 100) / blocB) : 0, nat(blocA, blocB) && blocB > 0, 'balanceofpower', [blocA, blocB]) }
  /** STABILITY INDEX: 1 when measured stability meets the target. value [actual ≥ target]. */
  static stabilityindex(target: number, actual: number): CrossFormula { return c('geopolitics-stabilityindex', 'stabilityindex(target, actual) = [actual ≥ target]', actual >= target ? 1 : 0, nat(target, actual), 'stabilityindex', [target, actual]) }
}

for (const name of ['allianceweight', 'balanceofpower', 'bordertension', 'influencescore', 'powerindex', 'sanctionimpact', 'stabilityindex', 'tradedependency'] as const)
  hexRegisterOf('geopolitics', name, (GeopoliticsFormulas[name] as (...x: unknown[]) => unknown).bind(GeopoliticsFormulas))
