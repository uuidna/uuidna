import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ELECTIONS — COUNTING THE VOTE, AS ARITHMETIC (chosen by the public registry, not by hand). A ballot is numbers: turnout
 *  as a share of the roll, the margin between first and second, seats from a quota, the swing between rounds, a party's
 *  threshold share, apportionment by a divisor, spoiled-ballot rate, and seats won against votes won. Crosses to
 *  `demographics` — an election is a measure of the people. A measure. */

const PROOF = 'elections arithmetic (turnout, margin, seats, swing, threshold, apportionment, spoilage, proportionality); a measure of the roll crossed to demographics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'elections', dst: 'demographics', formula, value, proof: PROOF, ...extra }, holds, { name: `elections.${name}`, params })

export class ElectionsFormulas {
  /** TURNOUT as a percentage of the roll. value ⌊voted · 100 / registered⌋. */
  static turnout(voted: number, registered: number): CrossFormula { return c('elections-turnout', 'turnout(voted, registered) = ⌊voted · 100 / registered⌋', registered > 0 ? Math.floor((voted * 100) / registered) : 0, nat(voted, registered) && registered > 0 && voted <= registered, 'turnout', [voted, registered]) }
  /** MARGIN: the lead of the winner over the runner-up. value max(0, winner − runnerup). */
  static margin(winner: number, runnerup: number): CrossFormula { return c('elections-margin', 'margin(winner, runnerup) = max(0, winner − runnerup)', Math.max(0, winner - runnerup), nat(winner, runnerup), 'margin', [winner, runnerup]) }
  /** SEATS from a quota. value ⌊votes / quota⌋. */
  static seats(votes: number, quota: number): CrossFormula { return c('elections-seats', 'seats(votes, quota) = ⌊votes / quota⌋', quota > 0 ? Math.floor(votes / quota) : 0, nat(votes, quota) && quota > 0, 'seats', [votes, quota]) }
  /** SWING between rounds. value max(0, current − previous). */
  static swing(current: number, previous: number): CrossFormula { return c('elections-swing', 'swing(current, previous) = max(0, current − previous)', Math.max(0, current - previous), nat(current, previous), 'swing', [current, previous]) }
  /** THRESHOLD: a party's share of the total. value ⌊votes · 100 / total⌋. */
  static threshold(votes: number, total: number): CrossFormula { return c('elections-threshold', 'threshold(votes, total) = ⌊votes · 100 / total⌋', total > 0 ? Math.floor((votes * 100) / total) : 0, nat(votes, total) && total > 0 && votes <= total, 'threshold', [votes, total]) }
  /** APPORTIONMENT: seats from a population by a divisor. value ⌊population / divisor⌋. */
  static apportionment(population: number, divisor: number): CrossFormula { return c('elections-apportionment', 'apportionment(population, divisor) = ⌊population / divisor⌋', divisor > 0 ? Math.floor(population / divisor) : 0, nat(population, divisor) && divisor > 0, 'apportionment', [population, divisor]) }
  /** SPOILAGE: invalid ballots as a share of those cast. value ⌊invalid · 100 / cast⌋. */
  static spoilage(invalid: number, cast: number): CrossFormula { return c('elections-spoilage', 'spoilage(invalid, cast) = ⌊invalid · 100 / cast⌋', cast > 0 ? Math.floor((invalid * 100) / cast) : 0, nat(invalid, cast) && cast > 0 && invalid <= cast, 'spoilage', [invalid, cast]) }
  /** PROPORTIONALITY: seats won against votes won. value ⌊seats · 100 / votes⌋. */
  static proportionality(seats_: number, votes: number): CrossFormula { return c('elections-proportionality', 'proportionality(seats_, votes) = ⌊seats_ · 100 / votes⌋', votes > 0 ? Math.floor((seats_ * 100) / votes) : 0, nat(seats_, votes) && votes > 0, 'proportionality', [seats_, votes]) }
}

for (const name of ['apportionment', 'margin', 'proportionality', 'seats', 'spoilage', 'swing', 'threshold', 'turnout'] as const)
  hexRegisterOf('elections', name, (ElectionsFormulas[name] as (...x: unknown[]) => unknown).bind(ElectionsFormulas))
