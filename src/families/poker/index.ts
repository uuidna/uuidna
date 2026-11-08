import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** POKER — NO-LIMIT HOLD'EM AS ARITHMETIC. A hand is numbers: the pot odds a call is priced at, the outs still live, the
 *  equity those outs buy by the rule of outs, the expected value of a spot, implied odds with money still behind, the fold
 *  equity of a bet, the stack-to-pot ratio, and the rake the house takes. Crosses to `probability` — poker is probability
 *  with chips on it. A measure. */

const PROOF = 'poker arithmetic (pot odds, live outs, rule-of-outs equity, expected value, implied odds, fold equity, stack-to-pot ratio, rake); a measure crossed to probability'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'poker', dst: 'probability', formula, value, proof: PROOF, ...extra }, holds, { name: `poker.${name}`, params })

export class PokerFormulas {
  /** POT ODDS as a percent: the call priced against the pot it wins. value ⌊bet · 100 / (pot + bet)⌋. */
  static potodds(pot: number, bet: number): CrossFormula { return c('poker-potodds', 'potodds(pot, bet) = ⌊bet · 100 / (pot + bet)⌋', (pot + bet) > 0 ? Math.floor((bet * 100) / (pot + bet)) : 0, nat(pot, bet) && (pot + bet) > 0, 'potodds', [pot, bet]) }
  /** OUTS still live: the cards that help, minus the ones already dead. value max(0, total − dead). */
  static outs(total: number, dead: number): CrossFormula { return c('poker-outs', 'outs(total, dead) = max(0, total − dead)', Math.max(0, total - dead), nat(total, dead), 'outs', [total, dead]) }
  /** EQUITY by the rule of outs: each out is ~2% per street to come. value outs · streets · 2. */
  static equity(outs: number, streets: number): CrossFormula { return c('poker-equity', 'equity(outs, streets) = outs · streets · 2', outs * streets * 2, nat(outs, streets) && streets <= 2, 'equity', [outs, streets]) }
  /** EXPECTED VALUE of a spot in chips: win-weighted gain less loss-weighted cost. value ⌊max(0, prob · win − (100 − prob) · lose) / 100⌋. */
  static expectedvalue(prob: number, win: number, lose: number): CrossFormula { return c('poker-expectedvalue', 'expectedvalue(prob, win, lose) = ⌊max(0, prob · win − (100 − prob) · lose) / 100⌋', Math.floor(Math.max(0, prob * win - (100 - prob) * lose) / 100), nat(prob, win, lose) && prob <= 100, 'expectedvalue', [prob, win, lose]) }
  /** IMPLIED ODDS as a percent: the call priced against the pot plus money still to come. value ⌊bet · 100 / (pot + bet + future)⌋. */
  static impliedodds(pot: number, bet: number, future: number): CrossFormula { return c('poker-impliedodds', 'impliedodds(pot, bet, future) = ⌊bet · 100 / (pot + bet + future)⌋', (pot + bet + future) > 0 ? Math.floor((bet * 100) / (pot + bet + future)) : 0, nat(pot, bet, future) && (pot + bet + future) > 0, 'impliedodds', [pot, bet, future]) }
  /** FOLD EQUITY as a percent: the share of opponents expected to fold. value ⌊max(0, total − continues) · 100 / total⌋. */
  static fold(continues: number, total: number): CrossFormula { return c('poker-fold', 'fold(continues, total) = ⌊max(0, total − continues) · 100 / total⌋', total > 0 ? Math.floor((Math.max(0, total - continues) * 100) / total) : 0, nat(continues, total) && total > 0 && continues <= total, 'fold', [continues, total]) }
  /** STACK-TO-POT RATIO: the effective stack measured in pots. value ⌊stack / pot⌋. */
  static stackratio(stack: number, pot: number): CrossFormula { return c('poker-stackratio', 'stackratio(stack, pot) = ⌊stack / pot⌋', pot > 0 ? Math.floor(stack / pot) : 0, nat(stack, pot) && pot > 0, 'stackratio', [stack, pot]) }
  /** RAKE the house takes from a pot at a percent. value ⌊pot · percent / 100⌋. */
  static rake(pot: number, percent: number): CrossFormula { return c('poker-rake', 'rake(pot, percent) = ⌊pot · percent / 100⌋', Math.floor((pot * percent) / 100), nat(pot, percent) && percent <= 100, 'rake', [pot, percent]) }
}

for (const name of ['equity', 'expectedvalue', 'fold', 'impliedodds', 'outs', 'potodds', 'rake', 'stackratio'] as const)
  hexRegisterOf('poker', name, (PokerFormulas[name] as (...x: unknown[]) => unknown).bind(PokerFormulas))
