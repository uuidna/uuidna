import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CRICKET — THE GAME AS ARITHMETIC (the scorecard, not opinion). Playing is numbers: a batter's average and strike rate, a
 *  bowler's average and economy, the run rate, a partnership, the required rate, and how often the ball reaches the rope.
 *  Crosses to `sports` — cricket is one of the games sport counts. A measure. */

const PROOF = 'cricket arithmetic (batting average, strike rate, bowling average, economy, run rate, partnership, required rate, boundary rate); the scorecard as numbers; a measure crossed to sports'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cricket', dst: 'sports', formula, value, proof: PROOF, ...extra }, holds, { name: `cricket.${name}`, params })

export class CricketFormulas {
  /** BATTING AVERAGE: runs per dismissal. value ⌊runs / dismissals⌋. */
  static battingaverage(runs: number, dismissals: number): CrossFormula { return c('cricket-battingaverage', 'battingaverage(runs, dismissals) = ⌊runs / dismissals⌋', dismissals > 0 ? Math.floor(runs / dismissals) : 0, nat(runs, dismissals) && dismissals > 0, 'battingaverage', [runs, dismissals]) }
  /** STRIKE RATE: runs per hundred balls. value ⌊runs · 100 / balls⌋. */
  static strikerate(runs: number, balls: number): CrossFormula { return c('cricket-strikerate', 'strikerate(runs, balls) = ⌊runs · 100 / balls⌋', balls > 0 ? Math.floor((runs * 100) / balls) : 0, nat(runs, balls) && balls > 0, 'strikerate', [runs, balls]) }
  /** BOWLING AVERAGE: runs conceded per wicket. value ⌊runs / wickets⌋. */
  static bowlingaverage(runs: number, wickets: number): CrossFormula { return c('cricket-bowlingaverage', 'bowlingaverage(runs, wickets) = ⌊runs / wickets⌋', wickets > 0 ? Math.floor(runs / wickets) : 0, nat(runs, wickets) && wickets > 0, 'bowlingaverage', [runs, wickets]) }
  /** ECONOMY: runs conceded per over. value ⌊runs / overs⌋. */
  static economy(runs: number, overs: number): CrossFormula { return c('cricket-economy', 'economy(runs, overs) = ⌊runs / overs⌋', overs > 0 ? Math.floor(runs / overs) : 0, nat(runs, overs) && overs > 0, 'economy', [runs, overs]) }
  /** RUN RATE: runs per over, to the hundredth. value ⌊runs · 100 / overs⌋. */
  static runrate(runs: number, overs: number): CrossFormula { return c('cricket-runrate', 'runrate(runs, overs) = ⌊runs · 100 / overs⌋', overs > 0 ? Math.floor((runs * 100) / overs) : 0, nat(runs, overs) && overs > 0, 'runrate', [runs, overs]) }
  /** PARTNERSHIP: runs per wicket in a stand. value ⌊runs / wickets⌋. */
  static partnership(runs: number, wickets: number): CrossFormula { return c('cricket-partnership', 'partnership(runs, wickets) = ⌊runs / wickets⌋', wickets > 0 ? Math.floor(runs / wickets) : 0, nat(runs, wickets) && wickets > 0, 'partnership', [runs, wickets]) }
  /** REQUIRED RATE: the target chased per over, to the hundredth. value ⌊target · 100 / overs⌋. */
  static required(target: number, overs: number): CrossFormula { return c('cricket-required', 'required(target, overs) = ⌊target · 100 / overs⌋', overs > 0 ? Math.floor((target * 100) / overs) : 0, nat(target, overs) && overs > 0, 'required', [target, overs]) }
  /** BOUNDARY RATE: boundaries per hundred balls. value ⌊boundaries · 100 / balls⌋. */
  static boundary(boundaries: number, balls: number): CrossFormula { return c('cricket-boundary', 'boundary(boundaries, balls) = ⌊boundaries · 100 / balls⌋', balls > 0 ? Math.floor((boundaries * 100) / balls) : 0, nat(boundaries, balls) && balls > 0 && boundaries <= balls, 'boundary', [boundaries, balls]) }
}

for (const name of ['battingaverage', 'boundary', 'bowlingaverage', 'economy', 'partnership', 'required', 'runrate', 'strikerate'] as const)
  hexRegisterOf('cricket', name, (CricketFormulas[name] as (...x: unknown[]) => unknown).bind(CricketFormulas))
