import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SPORTS — SPORTS ANALYTICS, AS ARITHMETIC. A season is numbers: win percentage, points per game, point differential,
 *  possession share, shooting rating, standings, pace, and the current streak. Crosses to `analytics` — sports is a
 *  measure that analytics reads. A measure. */

const PROOF = 'sports arithmetic (win %, points per game, differential, possession, rating, standings, pace, streak); a measure crossed to analytics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'sports', dst: 'analytics', formula, value, proof: PROOF, ...extra }, holds, { name: `sports.${name}`, params })

export class SportsFormulas {
  /** WIN PERCENTAGE: wins over games played. value ⌊wins · 100 / games⌋. */
  static win(wins: number, games: number): CrossFormula { return c('sports-win', 'win(wins, games) = ⌊wins · 100 / games⌋', games > 0 ? Math.floor((wins * 100) / games) : 0, nat(wins, games) && games > 0 && wins <= games, 'win', [wins, games]) }
  /** POINTS PER GAME: points over games played. value ⌊points / games⌋. */
  static average(points: number, games: number): CrossFormula { return c('sports-average', 'average(points, games) = ⌊points / games⌋', games > 0 ? Math.floor(points / games) : 0, nat(points, games) && games > 0, 'average', [points, games]) }
  /** POINT DIFFERENTIAL: points scored less points allowed. value scored − allowed (may be negative). */
  static differential(scored: number, allowed: number): CrossFormula { return c('sports-differential', 'differential(scored, allowed) = scored − allowed', scored - allowed, nat(scored, allowed), 'differential', [scored, allowed]) }
  /** POSSESSION SHARE: time held over total time. value ⌊held · 100 / total⌋. */
  static possession(held: number, total: number): CrossFormula { return c('sports-possession', 'possession(held, total) = ⌊held · 100 / total⌋', total > 0 ? Math.floor((held * 100) / total) : 0, nat(held, total) && total > 0 && held <= total, 'possession', [held, total]) }
  /** SHOOTING RATING: made over attempts. value ⌊made · 100 / attempts⌋. */
  static rating(made: number, attempts: number): CrossFormula { return c('sports-rating', 'rating(made, attempts) = ⌊made · 100 / attempts⌋', attempts > 0 ? Math.floor((made * 100) / attempts) : 0, nat(made, attempts) && attempts > 0 && made <= attempts, 'rating', [made, attempts]) }
  /** STANDINGS: wins less losses. value wins − losses (may be negative). */
  static standings(wins: number, losses: number): CrossFormula { return c('sports-standings', 'standings(wins, losses) = wins − losses', wins - losses, nat(wins, losses), 'standings', [wins, losses]) }
  /** PACE: time over distance. value ⌊time / distance⌋. */
  static pace(distance: number, time: number): CrossFormula { return c('sports-pace', 'pace(distance, time) = ⌊time / distance⌋', distance > 0 ? Math.floor(time / distance) : 0, nat(distance, time) && distance > 0, 'pace', [distance, time]) }
  /** STREAK: the current run of results. value current. */
  static streak(current: number): CrossFormula { return c('sports-streak', 'streak(current) = current', current, nat(current), 'streak', [current]) }
}

for (const name of ['average', 'differential', 'pace', 'possession', 'rating', 'standings', 'streak', 'win'] as const)
  hexRegisterOf('sports', name, (SportsFormulas[name] as (...x: unknown[]) => unknown).bind(SportsFormulas))
