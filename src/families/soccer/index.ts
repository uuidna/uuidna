import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SOCCER — THE MATCH AS ARITHMETIC. Playing the game is numbers: ball possession, how chances become goals, how passes
 *  land, expected goals from chance quality, clean sheets kept, goal difference, ground covered per minute, and league
 *  points earned. Crosses to `sports` — soccer is one sport the registry measures. A measure. */

const PROOF = 'soccer arithmetic (possession, conversion, pass accuracy, expected goals, clean sheets, goal difference, distance, points); the match as integers; a measure crossed to sports'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'soccer', dst: 'sports', formula, value, proof: PROOF, ...extra }, holds, { name: `soccer.${name}`, params })

export class SoccerFormulas {
  /** POSSESSION as a percentage. value ⌊held · 100 / total⌋. */
  static possession(held: number, total: number): CrossFormula { return c('soccer-possession', 'possession(held, total) = ⌊held · 100 / total⌋', total > 0 ? Math.floor((held * 100) / total) : 0, nat(held, total) && total > 0 && held <= total, 'possession', [held, total]) }
  /** CONVERSION: goals from shots, as a percentage. value ⌊goals · 100 / shots⌋. */
  static conversion(goals: number, shots: number): CrossFormula { return c('soccer-conversion', 'conversion(goals, shots) = ⌊goals · 100 / shots⌋', shots > 0 ? Math.floor((goals * 100) / shots) : 0, nat(goals, shots) && shots > 0 && goals <= shots, 'conversion', [goals, shots]) }
  /** PASS ACCURACY: completed over attempted, as a percentage. value ⌊completed · 100 / attempted⌋. */
  static passaccuracy(completed: number, attempted: number): CrossFormula { return c('soccer-passaccuracy', 'passaccuracy(completed, attempted) = ⌊completed · 100 / attempted⌋', attempted > 0 ? Math.floor((completed * 100) / attempted) : 0, nat(completed, attempted) && attempted > 0 && completed <= attempted, 'passaccuracy', [completed, attempted]) }
  /** EXPECTED GOALS: chances weighted by quality. value ⌊chances · quality / 100⌋. */
  static xg(chances: number, quality: number): CrossFormula { return c('soccer-xg', 'xg(chances, quality) = ⌊chances · quality / 100⌋', Math.floor((chances * quality) / 100), nat(chances, quality), 'xg', [chances, quality]) }
  /** CLEAN SHEETS as a percentage of matches. value ⌊clean · 100 / matches⌋. */
  static cleansheets(clean: number, matches: number): CrossFormula { return c('soccer-cleansheets', 'cleansheets(clean, matches) = ⌊clean · 100 / matches⌋', matches > 0 ? Math.floor((clean * 100) / matches) : 0, nat(clean, matches) && matches > 0 && clean <= matches, 'cleansheets', [clean, matches]) }
  /** GOAL DIFFERENCE: scored less conceded; may be negative. value scored − conceded. */
  static goaldiff(scored: number, conceded: number): CrossFormula { return c('soccer-goaldiff', 'goaldiff(scored, conceded) = scored − conceded', scored - conceded, nat(scored, conceded), 'goaldiff', [scored, conceded]) }
  /** DISTANCE: metres covered per minute. value ⌊meters / minutes⌋. */
  static distance(meters: number, minutes: number): CrossFormula { return c('soccer-distance', 'distance(meters, minutes) = ⌊meters / minutes⌋', minutes > 0 ? Math.floor(meters / minutes) : 0, nat(meters, minutes) && minutes > 0, 'distance', [meters, minutes]) }
  /** LEAGUE POINTS: three a win, one a draw. value wins · 3 + draws. */
  static points(wins: number, draws: number): CrossFormula { return c('soccer-points', 'points(wins, draws) = wins · 3 + draws', wins * 3 + draws, nat(wins, draws), 'points', [wins, draws]) }
}

for (const name of ['cleansheets', 'conversion', 'distance', 'goaldiff', 'passaccuracy', 'points', 'possession', 'xg'] as const)
  hexRegisterOf('soccer', name, (SoccerFormulas[name] as (...x: unknown[]) => unknown).bind(SoccerFormulas))
