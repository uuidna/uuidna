import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TENNIS — THE MATCH AS ARITHMETIC. A point is numbers: first serves landed, aces off serves, break points converted,
 *  winners against errors, rally length, sets dominance, serve speed, return percentage. Crosses to `sports` — tennis is
 *  one game the sports domain scores. A measure. */

const PROOF = 'tennis arithmetic (first-serve %, ace rate, break points, winner/error, rally length, dominance, serve speed, return %); a match as a measure crossed to sports'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'tennis', dst: 'sports', formula, value, proof: PROOF, ...extra }, holds, { name: `tennis.${name}`, params })

export class TennisFormulas {
  /** FIRST SERVE percentage: serves in over serves attempted. value ⌊in · 100 / attempted⌋. */
  static firstserve(in_: number, attempted: number): CrossFormula { return c('tennis-firstserve', 'firstserve(in, attempted) = ⌊in · 100 / attempted⌋', attempted > 0 ? Math.floor((in_ * 100) / attempted) : 0, nat(in_, attempted) && attempted > 0 && in_ <= attempted, 'firstserve', [in_, attempted]) }
  /** ACE RATE: aces over serves. value ⌊aces · 100 / serves⌋. */
  static acerate(aces: number, serves: number): CrossFormula { return c('tennis-acerate', 'acerate(aces, serves) = ⌊aces · 100 / serves⌋', serves > 0 ? Math.floor((aces * 100) / serves) : 0, nat(aces, serves) && serves > 0 && aces <= serves, 'acerate', [aces, serves]) }
  /** BREAK POINTS: converted over chances. value ⌊converted · 100 / chances⌋. */
  static breakpoints(converted: number, chances: number): CrossFormula { return c('tennis-breakpoints', 'breakpoints(converted, chances) = ⌊converted · 100 / chances⌋', chances > 0 ? Math.floor((converted * 100) / chances) : 0, nat(converted, chances) && chances > 0 && converted <= chances, 'breakpoints', [converted, chances]) }
  /** WINNERS against errors. value ⌊winners · 100 / errors⌋. */
  static winners(winners_: number, errors: number): CrossFormula { return c('tennis-winners', 'winners(winners, errors) = ⌊winners · 100 / errors⌋', errors > 0 ? Math.floor((winners_ * 100) / errors) : 0, nat(winners_, errors) && errors > 0, 'winners', [winners_, errors]) }
  /** RALLY length: shots over points. value ⌊shots / points⌋. */
  static rally(shots: number, points: number): CrossFormula { return c('tennis-rally', 'rally(shots, points) = ⌊shots / points⌋', points > 0 ? Math.floor(shots / points) : 0, nat(shots, points) && points > 0, 'rally', [shots, points]) }
  /** DOMINANCE: games won over games played. value ⌊won · 100 / played⌋. */
  static dominance(won: number, played: number): CrossFormula { return c('tennis-dominance', 'dominance(won, played) = ⌊won · 100 / played⌋', played > 0 ? Math.floor((won * 100) / played) : 0, nat(won, played) && played > 0 && won <= played, 'dominance', [won, played]) }
  /** SERVE SPEED in km/h. value kmh. */
  static servespeed(kmh: number): CrossFormula { return c('tennis-servespeed', 'servespeed(kmh) = kmh', kmh, nat(kmh), 'servespeed', [kmh]) }
  /** RETURN percentage: returned over faced. value ⌊returned · 100 / faced⌋. */
  static returnpct(returned: number, faced: number): CrossFormula { return c('tennis-returnpct', 'returnpct(returned, faced) = ⌊returned · 100 / faced⌋', faced > 0 ? Math.floor((returned * 100) / faced) : 0, nat(returned, faced) && faced > 0 && returned <= faced, 'returnpct', [returned, faced]) }
}

for (const name of ['acerate', 'breakpoints', 'dominance', 'firstserve', 'rally', 'returnpct', 'servespeed', 'winners'] as const)
  hexRegisterOf('tennis', name, (TennisFormulas[name] as (...x: unknown[]) => unknown).bind(TennisFormulas))
