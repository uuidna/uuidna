import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** AUCTION — THE MARKET, AS ARITHMETIC (chosen by the public-API registry, not by hand). A sale is numbers: the next bid
 *  increment, the buyer's premium on the hammer, the reserve a bid clears, how many bidders chase each lot, the sell-through
 *  of a sale, how a hammer lands against the low estimate, the headroom left on a proxy bid, and the clearing of demand over
 *  supply. Crosses to `trading` — an auction is a market that settles. A measure. */

const PROOF = 'auction arithmetic (bid increment, buyer\'s premium, reserve, competition, sell-through, estimate, proxy headroom, clearing); a measure crossed to trading'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'auction', dst: 'trading', formula, value, proof: PROOF, ...extra }, holds, { name: `auction.${name}`, params })

export class AuctionFormulas {
  /** CLEARING: demand as a percentage of supply. value ⌊demand · 100 / supply⌋. */
  static clearing(demand: number, supply: number): CrossFormula { return c('auction-clearing', 'clearing(demand, supply) = ⌊demand · 100 / supply⌋', supply > 0 ? Math.floor((demand * 100) / supply) : 0, nat(demand, supply) && supply > 0, 'clearing', [demand, supply]) }
  /** COMPETITION: bidders per lot. value ⌊bidders / lots⌋. */
  static competition(bidders: number, lots: number): CrossFormula { return c('auction-competition', 'competition(bidders, lots) = ⌊bidders / lots⌋', lots > 0 ? Math.floor(bidders / lots) : 0, nat(bidders, lots) && lots > 0, 'competition', [bidders, lots]) }
  /** ESTIMATE: the hammer as a percentage of the low estimate. value ⌊hammer · 100 / low⌋. */
  static estimate(hammer: number, low: number): CrossFormula { return c('auction-estimate', 'estimate(hammer, low) = ⌊hammer · 100 / low⌋', low > 0 ? Math.floor((hammer * 100) / low) : 0, nat(hammer, low) && low > 0, 'estimate', [hammer, low]) }
  /** INCREMENT: the next bid step at a rate on the current bid. value ⌊current · rate / 100⌋. */
  static increment(current: number, rate: number): CrossFormula { return c('auction-increment', 'increment(current, rate) = ⌊current · rate / 100⌋', Math.floor((current * rate) / 100), nat(current, rate), 'increment', [current, rate]) }
  /** PREMIUM: the buyer's premium at a rate on the hammer. value ⌊hammer · rate / 100⌋. */
  static premium(hammer: number, rate: number): CrossFormula { return c('auction-premium', 'premium(hammer, rate) = ⌊hammer · rate / 100⌋', Math.floor((hammer * rate) / 100), nat(hammer, rate), 'premium', [hammer, rate]) }
  /** PROXY: the headroom left on a maximum proxy bid above the current. value max(0, maximum − current). */
  static proxy(maximum: number, current: number): CrossFormula { return c('auction-proxy', 'proxy(maximum, current) = max(0, maximum − current)', Math.max(0, maximum - current), nat(maximum, current), 'proxy', [maximum, current]) }
  /** RESERVE: the amount a bid clears over the floor. value max(0, bid − floor). */
  static reserve(bid: number, floor_: number): CrossFormula { return c('auction-reserve', 'reserve(bid, floor) = max(0, bid − floor)', Math.max(0, bid - floor_), nat(bid, floor_), 'reserve', [bid, floor_]) }
  /** SELL-THROUGH: lots sold as a percentage of lots offered. value ⌊sold · 100 / offered⌋. */
  static selltrough(sold: number, offered: number): CrossFormula { return c('auction-selltrough', 'selltrough(sold, offered) = ⌊sold · 100 / offered⌋', offered > 0 ? Math.floor((sold * 100) / offered) : 0, nat(sold, offered) && offered > 0 && sold <= offered, 'selltrough', [sold, offered]) }
}

for (const name of ['clearing', 'competition', 'estimate', 'increment', 'premium', 'proxy', 'reserve', 'selltrough'] as const)
  hexRegisterOf('auction', name, (AuctionFormulas[name] as (...x: unknown[]) => unknown).bind(AuctionFormulas))
