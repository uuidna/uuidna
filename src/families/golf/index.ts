import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** GOLF — THE ROUND, AS ARITHMETIC. Playing golf is numbers: the score relative to par (which may run under), a handicap
 *  from scoring differentials, fairways hit, greens in regulation, putts and driving distance per hole, scrambling saves,
 *  and birdies a round. Crosses to `sports` — golf is one of the games sport keeps. A measure. */

const PROOF = 'golf arithmetic (score to par, handicap, fairways, greens in regulation, putts, driving, scrambling, birdies); a measure crossed to sports'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'golf', dst: 'sports', formula, value, proof: PROOF, ...extra }, holds, { name: `golf.${name}`, params })

export class GolfFormulas {
  /** SCORE relative to par — strokes taken less par; may run negative (under par). value strokes − par. */
  static score(strokes: number, par: number): CrossFormula { return c('golf-score', 'score(strokes, par) = strokes − par', strokes - par, nat(strokes, par), 'score', [strokes, par]) }
  /** HANDICAP: the average scoring differential over rounds played. value ⌊differential / rounds⌋. */
  static handicap(differential: number, rounds: number): CrossFormula { return c('golf-handicap', 'handicap(differential, rounds) = ⌊differential / rounds⌋', rounds > 0 ? Math.floor(differential / rounds) : 0, nat(differential, rounds) && rounds > 0, 'handicap', [differential, rounds]) }
  /** FAIRWAYS hit as a percentage of those played. value ⌊hit · 100 / played⌋. */
  static fairways(hit: number, played: number): CrossFormula { return c('golf-fairways', 'fairways(hit, played) = ⌊hit · 100 / played⌋', played > 0 ? Math.floor((hit * 100) / played) : 0, nat(hit, played) && played > 0 && hit <= played, 'fairways', [hit, played]) }
  /** GREENS in regulation as a percentage of holes. value ⌊reached · 100 / holes⌋. */
  static greens(reached: number, holes: number): CrossFormula { return c('golf-greens', 'greens(reached, holes) = ⌊reached · 100 / holes⌋', holes > 0 ? Math.floor((reached * 100) / holes) : 0, nat(reached, holes) && holes > 0 && reached <= holes, 'greens', [reached, holes]) }
  /** PUTTS per hole. value ⌊total / holes⌋. */
  static putts(total: number, holes: number): CrossFormula { return c('golf-putts', 'putts(total, holes) = ⌊total / holes⌋', holes > 0 ? Math.floor(total / holes) : 0, nat(total, holes) && holes > 0, 'putts', [total, holes]) }
  /** DRIVING distance per drive. value ⌊distance / drives⌋. */
  static driving(distance: number, drives: number): CrossFormula { return c('golf-driving', 'driving(distance, drives) = ⌊distance / drives⌋', drives > 0 ? Math.floor(distance / drives) : 0, nat(distance, drives) && drives > 0, 'driving', [distance, drives]) }
  /** SCRAMBLING: pars saved as a percentage of greens missed. value ⌊saved · 100 / missed⌋. */
  static scrambling(saved: number, missed: number): CrossFormula { return c('golf-scrambling', 'scrambling(saved, missed) = ⌊saved · 100 / missed⌋', missed > 0 ? Math.floor((saved * 100) / missed) : 0, nat(saved, missed) && missed > 0 && saved <= missed, 'scrambling', [saved, missed]) }
  /** BIRDIES per round. value ⌊birdies / rounds⌋. */
  static birdies(birdies_: number, rounds: number): CrossFormula { return c('golf-birdies', 'birdies(birdies, rounds) = ⌊birdies / rounds⌋', rounds > 0 ? Math.floor(birdies_ / rounds) : 0, nat(birdies_, rounds) && rounds > 0, 'birdies', [birdies_, rounds]) }
}

for (const name of ['birdies', 'driving', 'fairways', 'greens', 'handicap', 'putts', 'score', 'scrambling'] as const)
  hexRegisterOf('golf', name, (GolfFormulas[name] as (...x: unknown[]) => unknown).bind(GolfFormulas))
