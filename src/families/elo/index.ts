import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ELO — RATINGS AS ARITHMETIC. A player's strength is a number, and every move of that number is integer arithmetic:
 *  the score you are expected to take from a rating gap, the points an outcome moves you, the raw gap, the K-factor a
 *  player earns, a tournament performance rating, a win chance as a percent, the games left before you are established,
 *  and the decay of an idle rating. Crosses to `statistics` — a rating is an estimate, and this is its arithmetic. */

const PROOF = 'elo arithmetic (expected score, rating update, rating gap, K-factor, performance rating, win probability, provisional games, decay); ratings as integers; an estimate crossed to statistics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'elo', dst: 'statistics', formula, value, proof: PROOF, ...extra }, holds, { name: `elo.${name}`, params })

export class EloFormulas {
  /** EXPECTED SCORE: a percent proxy from the rating gap via a bounded integer map (no 10^x). value ⌊50 + (ra − rb)/20⌋ clamped to [0, 100]. */
  static expectedscore(ra: number, rb: number): CrossFormula { return c('elo-expectedscore', 'expectedscore(ra, rb) = clamp₀¹⁰⁰(50 + ⌊(ra − rb) / 20⌋)', Math.max(0, Math.min(100, 50 + Math.floor((ra - rb) / 20))), nat(ra, rb), 'expectedscore', [ra, rb]) }
  /** RATING UPDATE: the points an outcome moves you, k times the score surplus (percent). value ⌊k · max(0, actual − expected) / 100⌋. */
  static update(k: number, actual: number, expected: number): CrossFormula { return c('elo-update', 'update(k, actual, expected) = ⌊k · max(0, actual − expected) / 100⌋', Math.floor((k * Math.max(0, actual - expected)) / 100), nat(k, actual, expected) && actual <= 100 && expected <= 100, 'update', [k, actual, expected]) }
  /** RATING GAP: the raw difference between two ratings, floored at 0. value max(0, ra − rb). */
  static ratingdiff(ra: number, rb: number): CrossFormula { return c('elo-ratingdiff', 'ratingdiff(ra, rb) = max(0, ra − rb)', Math.max(0, ra - rb), nat(ra, rb), 'ratingdiff', [ra, rb]) }
  /** K-FACTOR: a bounded map — 40 while provisional (< 30 games), 10 for masters (≥ 2400), else 20. value the earned K. */
  static kfactor(games: number, rating: number): CrossFormula { return c('elo-kfactor', 'kfactor(games, rating) = games < 30 ? 40 : rating ≥ 2400 ? 10 : 20', games < 30 ? 40 : (rating >= 2400 ? 10 : 20), nat(games, rating), 'kfactor', [games, rating]) }
  /** PERFORMANCE RATING: opponents' average plus 400 points per net win over the games. value max(0, oppavg + ⌊400 · (wins − losses) / (wins + losses)⌋). */
  static performance(oppavg: number, wins: number, losses: number): CrossFormula { return c('elo-performance', 'performance(oppavg, wins, losses) = max(0, oppavg + ⌊400 · (wins − losses) / (wins + losses)⌋)', wins + losses > 0 ? Math.max(0, oppavg + Math.floor((400 * (wins - losses)) / (wins + losses))) : oppavg, nat(oppavg, wins, losses), 'performance', [oppavg, wins, losses]) }
  /** WIN PROBABILITY: a percent from the gap via a bounded integer map at a slope. value min(100, 50 + ⌊diff / scale⌋). */
  static winprobability(diff: number, scale: number): CrossFormula { return c('elo-winprobability', 'winprobability(diff, scale) = min(100, 50 + ⌊diff / scale⌋)', scale > 0 ? Math.min(100, 50 + Math.floor(diff / scale)) : 50, nat(diff, scale) && scale > 0, 'winprobability', [diff, scale]) }
  /** PROVISIONAL: the games still to play before a rating is established. value max(0, threshold − games). */
  static provisional(games: number, threshold: number): CrossFormula { return c('elo-provisional', 'provisional(games, threshold) = max(0, threshold − games)', Math.max(0, threshold - games), nat(games, threshold), 'provisional', [games, threshold]) }
  /** DECAY: an idle rating loses a rate of points per month, floored at 0. value max(0, rating − months · rate). */
  static decay(rating: number, months: number, rate: number): CrossFormula { return c('elo-decay', 'decay(rating, months, rate) = max(0, rating − months · rate)', Math.max(0, rating - months * rate), nat(rating, months, rate), 'decay', [rating, months, rate]) }
}

for (const name of ['decay', 'expectedscore', 'kfactor', 'performance', 'provisional', 'ratingdiff', 'update', 'winprobability'] as const)
  hexRegisterOf('elo', name, (EloFormulas[name] as (...x: unknown[]) => unknown).bind(EloFormulas))
