import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** SECURITIES — INSTRUMENTS AND MARKETS, AS ARITHMETIC. A security is numbers: market capitalization, the price/earnings
 *  ratio, a bond coupon, a dividend, the dilution from an issue, the bid/ask spread, the gain on a holding, and a stock
 *  split. Crosses to `law`, where disclosure and market conduct are regulated. A measure, not advice. */

const PROOF = 'securities arithmetic (market cap, P/E, coupon, dividend, dilution, bid/ask spread, gain, split); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const s = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'securities', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `securities.${name}`, params })

export class SecuritiesFormulas {
  /** MARKET CAPITALIZATION: shares outstanding times price. value shares · price. */
  static marketcap(shares: number, price: number): CrossFormula { return s('securities-marketcap', 'marketcap(shares, price) = shares · price', shares * price, nat(shares, price), 'marketcap', [shares, price]) }
  /** THE PRICE/EARNINGS RATIO (×1): price over earnings per share. value ⌊price / earnings⌋. */
  static pe(price: number, earnings: number): CrossFormula { return s('securities-pe', 'pe(price, earnings) = ⌊price / earnings⌋', earnings > 0 ? Math.floor(price / earnings) : 0, nat(price, earnings) && earnings > 0, 'pe', [price, earnings]) }
  /** A BOND COUPON: `rate`% of the face value. value ⌊face · rate / 100⌋. */
  static coupon(face: number, rate: number): CrossFormula { return s('securities-coupon', 'coupon(face, rate) = ⌊face · rate / 100⌋', Math.floor((face * rate) / 100), nat(face, rate) && rate <= 100, 'coupon', [face, rate]) }
  /** A DIVIDEND: shares held at an amount per share. value shares · perShare. */
  static dividend(shares: number, perShare: number): CrossFormula { return s('securities-dividend', 'dividend(shares, perShare) = shares · perShare', shares * perShare, nat(shares, perShare), 'dividend', [shares, perShare]) }
  /** DILUTION as a percentage: newly issued shares over the enlarged total. value ⌊issued · 100 / (issued + existing)⌋. */
  static dilution(issued: number, existing: number): CrossFormula { return s('securities-dilution', 'dilution(issued, existing) = ⌊issued · 100 / (issued + existing)⌋', issued + existing > 0 ? Math.floor((issued * 100) / (issued + existing)) : 0, nat(issued, existing) && issued + existing > 0, 'dilution', [issued, existing]) }
  /** THE BID/ASK SPREAD. value max(0, ask − bid). */
  static spread(bid: number, ask: number): CrossFormula { return s('securities-spread', 'spread(bid, ask) = max(0, ask − bid)', Math.max(0, ask - bid), nat(bid, ask), 'spread', [bid, ask]) }
  /** THE GAIN on a holding (may be negative — a loss is a valid reading). value (exit − entry) · shares. */
  static gain(entry: number, exit: number, shares: number): CrossFormula { return s('securities-gain', 'gain(entry, exit, shares) = (exit − entry) · shares', (exit - entry) * shares, nat(entry, exit, shares), 'gain', [entry, exit, shares]) }
  /** A STOCK SPLIT: shares multiplied by the split ratio. value shares · ratio. */
  static split(shares: number, ratio: number): CrossFormula { return s('securities-split', 'split(shares, ratio) = shares · ratio', shares * ratio, nat(shares, ratio) && ratio > 0, 'split', [shares, ratio]) }
}

for (const name of ['coupon', 'dilution', 'dividend', 'gain', 'marketcap', 'pe', 'split', 'spread'] as const)
  hexRegisterOf('securities', name, (SecuritiesFormulas[name] as (...x: unknown[]) => unknown).bind(SecuritiesFormulas))
