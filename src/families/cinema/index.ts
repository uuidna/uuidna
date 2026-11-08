import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** CINEMA — MOVING PICTURES AS ARITHMETIC (chosen by the public-API registry, not by hand). Making and showing films is
 *  numbers: box office from tickets, return on budget, runtime from scenes, the aspect ratio, cuts per minute, an average
 *  rating, a house's occupancy, and the frames a clip holds. Crosses to `content` — cinema is content people watch. A measure. */

const PROOF = 'cinema arithmetic (box office, ROI, runtime, aspect ratio, shots per minute, rating, occupancy, frames); a public-API domain; a measure crossed to content'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'cinema', dst: 'content', formula, value, proof: PROOF, ...extra }, holds, { name: `cinema.${name}`, params })

export class CinemaFormulas {
  /** BOX OFFICE: tickets sold at a ticket price. value tickets · price. */
  static boxoffice(tickets: number, price: number): CrossFormula { return c('cinema-boxoffice', 'boxoffice(tickets, price) = tickets · price', tickets * price, nat(tickets, price), 'boxoffice', [tickets, price]) }
  /** RETURN ON INVESTMENT as a percentage. value ⌊revenue · 100 / budget⌋. */
  static roi(revenue: number, budget: number): CrossFormula { return c('cinema-roi', 'roi(revenue, budget) = ⌊revenue · 100 / budget⌋', budget > 0 ? Math.floor((revenue * 100) / budget) : 0, nat(revenue, budget) && budget > 0, 'roi', [revenue, budget]) }
  /** RUNTIME: scenes at an average length each. value scenes · average. */
  static runtime(scenes: number, average: number): CrossFormula { return c('cinema-runtime', 'runtime(scenes, average) = scenes · average', scenes * average, nat(scenes, average), 'runtime', [scenes, average]) }
  /** ASPECT RATIO as a scaled percentage. value ⌊width · 100 / height⌋. */
  static aspect(width: number, height: number): CrossFormula { return c('cinema-aspect', 'aspect(width, height) = ⌊width · 100 / height⌋', height > 0 ? Math.floor((width * 100) / height) : 0, nat(width, height) && height > 0, 'aspect', [width, height]) }
  /** SHOTS: cuts over the minutes they span. value ⌊cuts / minutes⌋. */
  static shots(cuts: number, minutes: number): CrossFormula { return c('cinema-shots', 'shots(cuts, minutes) = ⌊cuts / minutes⌋', minutes > 0 ? Math.floor(cuts / minutes) : 0, nat(cuts, minutes) && minutes > 0, 'shots', [cuts, minutes]) }
  /** RATING: total score over the votes cast. value ⌊score / votes⌋. */
  static rating(score: number, votes: number): CrossFormula { return c('cinema-rating', 'rating(score, votes) = ⌊score / votes⌋', votes > 0 ? Math.floor(score / votes) : 0, nat(score, votes) && votes > 0, 'rating', [score, votes]) }
  /** OCCUPANCY: seats sold against the house, as a percentage. value ⌊sold · 100 / seats⌋. */
  static occupancy(sold: number, seats: number): CrossFormula { return c('cinema-occupancy', 'occupancy(sold, seats) = ⌊sold · 100 / seats⌋', seats > 0 ? Math.floor((sold * 100) / seats) : 0, nat(sold, seats) && seats > 0 && sold <= seats, 'occupancy', [sold, seats]) }
  /** FRAMES: seconds at a frame rate. value seconds · fps. */
  static frames(seconds: number, fps: number): CrossFormula { return c('cinema-frames', 'frames(seconds, fps) = seconds · fps', seconds * fps, nat(seconds, fps), 'frames', [seconds, fps]) }
}

for (const name of ['aspect', 'boxoffice', 'frames', 'occupancy', 'rating', 'roi', 'runtime', 'shots'] as const)
  hexRegisterOf('cinema', name, (CinemaFormulas[name] as (...x: unknown[]) => unknown).bind(CinemaFormulas))
