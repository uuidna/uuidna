import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** PORTFOLIO — HOLDING A BOOK OF ASSETS, AS ARITHMETIC. An asset's weight in the book, the Sharpe ratio, how diversified
 *  the holdings are across sectors, how far a position has drifted past its rebalance threshold, the stock/bond
 *  allocation, beta to the market, the drawdown from a peak, and the yield on invested value. Crosses to `trading` —
 *  a portfolio is what trading moves. A measure. */

const PROOF = 'portfolio arithmetic (asset weight, Sharpe ratio, diversification, rebalance drift, allocation, beta, drawdown, yield); a measure crossed to trading'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'portfolio', dst: 'trading', formula, value, proof: PROOF, ...extra }, holds, { name: `portfolio.${name}`, params })

export class PortfolioFormulas {
  /** ALLOCATION: the stock share of the stock+bond book, as a percentage. value ⌊stocks · 100 / (stocks + bonds)⌋. */
  static allocation(stocks: number, bonds: number): CrossFormula { return c('portfolio-allocation', 'allocation(stocks, bonds) = ⌊stocks · 100 / (stocks + bonds)⌋', (stocks + bonds) > 0 ? Math.floor((stocks * 100) / (stocks + bonds)) : 0, nat(stocks, bonds) && (stocks + bonds) > 0, 'allocation', [stocks, bonds]) }
  /** BETA: an asset's return against the market's, as a percentage. value ⌊assetreturn · 100 / marketreturn⌋. */
  static beta(assetreturn: number, marketreturn: number): CrossFormula { return c('portfolio-beta', 'beta(assetreturn, marketreturn) = ⌊assetreturn · 100 / marketreturn⌋', marketreturn > 0 ? Math.floor((assetreturn * 100) / marketreturn) : 0, nat(assetreturn, marketreturn) && marketreturn > 0, 'beta', [assetreturn, marketreturn]) }
  /** DIVERSIFICATION: holdings spread across sectors. value ⌊holdings / sectors⌋. */
  static diversification(holdings: number, sectors: number): CrossFormula { return c('portfolio-diversification', 'diversification(holdings, sectors) = ⌊holdings / sectors⌋', sectors > 0 ? Math.floor(holdings / sectors) : 0, nat(holdings, sectors) && sectors > 0, 'diversification', [holdings, sectors]) }
  /** DRAWDOWN: the fall from a peak to a trough, as a percentage. value ⌊(peak − trough) · 100 / peak⌋. */
  static drawdown(peak: number, trough: number): CrossFormula { return c('portfolio-drawdown', 'drawdown(peak, trough) = ⌊(peak − trough) · 100 / peak⌋', peak > 0 ? Math.floor(((peak - trough) * 100) / peak) : 0, nat(peak, trough) && peak > 0 && trough <= peak, 'drawdown', [peak, trough]) }
  /** YIELD: income over invested value, as a percentage. value ⌊income · 100 / value⌋. */
  static income(income: number, value: number): CrossFormula { return c('portfolio-income', 'income(income, value) = ⌊income · 100 / value⌋', value > 0 ? Math.floor((income * 100) / value) : 0, nat(income, value) && value > 0, 'income', [income, value]) }
  /** REBALANCE: how far a position's drift exceeds its threshold. value max(0, drift − threshold). */
  static rebalance(drift: number, threshold: number): CrossFormula { return c('portfolio-rebalance', 'rebalance(drift, threshold) = max(0, drift − threshold)', Math.max(0, drift - threshold), nat(drift, threshold), 'rebalance', [drift, threshold]) }
  /** SHARPE: excess return over volatility, as a percentage. value ⌊excess · 100 / volatility⌋. */
  static sharpe(excess: number, volatility: number): CrossFormula { return c('portfolio-sharpe', 'sharpe(excess, volatility) = ⌊excess · 100 / volatility⌋', volatility > 0 ? Math.floor((excess * 100) / volatility) : 0, nat(excess, volatility) && volatility > 0, 'sharpe', [excess, volatility]) }
  /** WEIGHT: an asset's share of the total book, as a percentage. value ⌊asset · 100 / total⌋. */
  static weight(asset: number, total: number): CrossFormula { return c('portfolio-weight', 'weight(asset, total) = ⌊asset · 100 / total⌋', total > 0 ? Math.floor((asset * 100) / total) : 0, nat(asset, total) && total > 0 && asset <= total, 'weight', [asset, total]) }
}

for (const name of ['allocation', 'beta', 'diversification', 'drawdown', 'income', 'rebalance', 'sharpe', 'weight'] as const)
  hexRegisterOf('portfolio', name, (PortfolioFormulas[name] as (...x: unknown[]) => unknown).bind(PortfolioFormulas))
