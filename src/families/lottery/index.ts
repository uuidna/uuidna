import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** LOTTERY — DRAWING ODDS AS ARITHMETIC. A lottery is counting: how many ways the balls fall, the one-in-N odds of a line,
 *  the value of a ticket against the jackpot, each winner's share, what the lines cost, the fraction of the pool they cover,
 *  what rolls into the next draw, and the house's cut. Crosses to `combinatorics` — the draw is a choice of k from n. A count. */

const PROOF = 'lottery arithmetic (combinations, odds denominator, expected value, jackpot share, ticket cost, coverage, rollover, house edge); the draw is a choice of k from n; a count crossed to combinatorics'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'lottery', dst: 'combinatorics', formula, value, proof: PROOF, ...extra }, holds, { name: `lottery.${name}`, params })

/** C(n, k) by the multiplicative method: every partial product is an integer, so the result is exact. 0 when k is out of range. */
const choose = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0
  k = Math.min(k, n - k)
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}

export class LotteryFormulas {
  /** COMBINATIONS: the ways to draw k balls from n. value C(n, k). */
  static combinations(n: number, k: number): CrossFormula { return c('lottery-combinations', 'combinations(n, k) = C(n, k)', choose(n, k), nat(n, k) && k <= n, 'combinations', [n, k]) }
  /** COVERAGE: the percent of all lines a batch of tickets covers. value ⌊tickets · 100 / total⌋. */
  static coverage(tickets: number, total: number): CrossFormula { return c('lottery-coverage', 'coverage(tickets, total) = ⌊tickets · 100 / total⌋', total > 0 ? Math.floor((tickets * 100) / total) : 0, nat(tickets, total) && total > 0 && tickets <= total, 'coverage', [tickets, total]) }
  /** EXPECTED VALUE: the jackpot spread over the one-in-N odds. value ⌊jackpot / odds⌋. */
  static expectedvalue(jackpot: number, odds: number): CrossFormula { return c('lottery-expectedvalue', 'expectedvalue(jackpot, odds) = ⌊jackpot / odds⌋', odds > 0 ? Math.floor(jackpot / odds) : 0, nat(jackpot, odds) && odds > 0, 'expectedvalue', [jackpot, odds]) }
  /** HOUSE EDGE: the percent of revenue the house keeps after payout. value ⌊(revenue − payout) · 100 / revenue⌋. */
  static houseedge(revenue: number, payout: number): CrossFormula { return c('lottery-houseedge', 'houseedge(revenue, payout) = ⌊(revenue − payout) · 100 / revenue⌋', revenue > 0 ? Math.floor((Math.max(0, revenue - payout) * 100) / revenue) : 0, nat(revenue, payout) && revenue > 0 && payout <= revenue, 'houseedge', [revenue, payout]) }
  /** JACKPOT SHARE: the jackpot split among the winners. value ⌊jackpot / winners⌋. */
  static jackpotshare(jackpot: number, winners: number): CrossFormula { return c('lottery-jackpotshare', 'jackpotshare(jackpot, winners) = ⌊jackpot / winners⌋', winners > 0 ? Math.floor(jackpot / winners) : 0, nat(jackpot, winners) && winners > 0, 'jackpotshare', [jackpot, winners]) }
  /** ODDS DENOMINATOR: the one-in-N of a line, the main-pool combinations times the bonus pool. value C(n, k) · bonus. */
  static oddsdenominator(n: number, k: number, bonus: number): CrossFormula { return c('lottery-oddsdenominator', 'oddsdenominator(n, k, bonus) = C(n, k) · bonus', choose(n, k) * bonus, nat(n, k, bonus) && k <= n, 'oddsdenominator', [n, k, bonus]) }
  /** ROLLOVER: the jackpot carried into the next draw plus the added pool. value jackpot + add. */
  static rollover(jackpot: number, add: number): CrossFormula { return c('lottery-rollover', 'rollover(jackpot, add) = jackpot + add', jackpot + add, nat(jackpot, add), 'rollover', [jackpot, add]) }
  /** TICKET COST: tickets at a price each. value tickets · price. */
  static ticketcost(tickets: number, price: number): CrossFormula { return c('lottery-ticketcost', 'ticketcost(tickets, price) = tickets · price', tickets * price, nat(tickets, price), 'ticketcost', [tickets, price]) }
}

for (const name of ['combinations', 'coverage', 'expectedvalue', 'houseedge', 'jackpotshare', 'oddsdenominator', 'rollover', 'ticketcost'] as const)
  hexRegisterOf('lottery', name, (LotteryFormulas[name] as (...x: unknown[]) => unknown).bind(LotteryFormulas))
