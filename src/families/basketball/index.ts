import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BASKETBALL — THE GAME AS ARITHMETIC. A box score is numbers: shooting percentages, free throws, efficiency, rebounds
 *  per game, assist-to-turnover ratio, pace, true shooting, and the plus/minus a lineup leaves on the scoreboard. Crosses
 *  to `sports` — basketball is one sport the registry measures. A measure. */

const PROOF = 'basketball arithmetic (field-goal %, free-throw %, efficiency, rebounds per game, assist ratio, pace, true shooting, plus/minus); the box score as formulas; a measure crossed to sports'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'basketball', dst: 'sports', formula, value, proof: PROOF, ...extra }, holds, { name: `basketball.${name}`, params })

export class BasketballFormulas {
  /** FIELD-GOAL PERCENTAGE: shots made over shots attempted. value ⌊made · 100 / attempted⌋. */
  static fieldgoal(made: number, attempted: number): CrossFormula { return c('basketball-fieldgoal', 'fieldgoal(made, attempted) = ⌊made · 100 / attempted⌋', attempted > 0 ? Math.floor((made * 100) / attempted) : 0, nat(made, attempted) && attempted > 0 && made <= attempted, 'fieldgoal', [made, attempted]) }
  /** FREE-THROW PERCENTAGE: free throws made over attempted. value ⌊made · 100 / attempted⌋. */
  static freethrow(made: number, attempted: number): CrossFormula { return c('basketball-freethrow', 'freethrow(made, attempted) = ⌊made · 100 / attempted⌋', attempted > 0 ? Math.floor((made * 100) / attempted) : 0, nat(made, attempted) && attempted > 0 && made <= attempted, 'freethrow', [made, attempted]) }
  /** EFFICIENCY: points scored per shot. value ⌊points · 100 / shots⌋. */
  static efficiency(points: number, shots: number): CrossFormula { return c('basketball-efficiency', 'efficiency(points, shots) = ⌊points · 100 / shots⌋', shots > 0 ? Math.floor((points * 100) / shots) : 0, nat(points, shots) && shots > 0, 'efficiency', [points, shots]) }
  /** REBOUNDS PER GAME: total rebounds over games played. value ⌊total / games⌋. */
  static rebounds(total: number, games: number): CrossFormula { return c('basketball-rebounds', 'rebounds(total, games) = ⌊total / games⌋', games > 0 ? Math.floor(total / games) : 0, nat(total, games) && games > 0, 'rebounds', [total, games]) }
  /** ASSIST RATIO: assists per turnover, as a percentage. value ⌊assists · 100 / turnovers⌋. */
  static assists(assists_: number, turnovers: number): CrossFormula { return c('basketball-assists', 'assists(assists, turnovers) = ⌊assists · 100 / turnovers⌋', turnovers > 0 ? Math.floor((assists_ * 100) / turnovers) : 0, nat(assists_, turnovers) && turnovers > 0, 'assists', [assists_, turnovers]) }
  /** PACE: possessions per minute played. value ⌊possessions / minutes⌋. */
  static pace(possessions: number, minutes: number): CrossFormula { return c('basketball-pace', 'pace(possessions, minutes) = ⌊possessions / minutes⌋', minutes > 0 ? Math.floor(possessions / minutes) : 0, nat(possessions, minutes) && minutes > 0, 'pace', [possessions, minutes]) }
  /** TRUE SHOOTING: points over true-shooting attempts. value ⌊points · 100 / attempts⌋. */
  static truepct(points: number, attempts: number): CrossFormula { return c('basketball-truepct', 'truepct(points, attempts) = ⌊points · 100 / attempts⌋', attempts > 0 ? Math.floor((points * 100) / attempts) : 0, nat(points, attempts) && attempts > 0, 'truepct', [points, attempts]) }
  /** PLUS/MINUS: points scored less points allowed while on court. value scored − allowed (may be negative). */
  static plusminus(scored: number, allowed: number): CrossFormula { return c('basketball-plusminus', 'plusminus(scored, allowed) = scored − allowed', scored - allowed, nat(scored, allowed), 'plusminus', [scored, allowed]) }
}

for (const name of ['assists', 'efficiency', 'fieldgoal', 'freethrow', 'pace', 'plusminus', 'rebounds', 'truepct'] as const)
  hexRegisterOf('basketball', name, (BasketballFormulas[name] as (...x: unknown[]) => unknown).bind(BasketballFormulas))
