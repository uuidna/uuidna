import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TRADING — THE ARITHMETIC OF A POSITION, BOOKED TO THE LEDGER. What a trade is worth and what it risks is arithmetic
 *  over price, quantity and capital: the profit or loss, the units a capital affords, the leverage and the margin, the
 *  notional, the risk budget, the stop, the commission. Each crosses to `accounting` — a trade becomes a ledger entry —
 *  so trading, accounting and law develop as one chain (trading → accounting → law). Exact; a measure, not advice. */

const PROOF = 'trading arithmetic (P&L, position size, leverage, margin, notional, risk budget, stop, commission) booked to the ledger: trading → accounting → law. A measure, not financial advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const t = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'trading', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `trading.${name}`, params })

export class TradingFormulas {
  /** PROFIT OR LOSS on a closed position (may be negative — a loss is a valid reading). value (exit − entry) · qty. */
  static pnl(entry: number, exit: number, qty: number): CrossFormula { return t('trading-pnl', 'pnl(entry, exit, qty) = (exit − entry) · qty', (exit - entry) * qty, nat(entry, exit, qty), 'pnl', [entry, exit, qty]) }
  /** POSITION SIZE: the whole units a capital affords at a price. value ⌊capital / price⌋. */
  static position(capital: number, price: number): CrossFormula { return t('trading-position', 'position(capital, price) = ⌊capital / price⌋', price > 0 ? Math.floor(capital / price) : 0, nat(capital, price) && price > 0, 'position', [capital, price]) }
  /** LEVERAGE: exposure over equity. value ⌊exposure / equity⌋. */
  static leverage(exposure: number, equity: number): CrossFormula { return t('trading-leverage', 'leverage(exposure, equity) = ⌊exposure / equity⌋', equity > 0 ? Math.floor(exposure / equity) : 0, nat(exposure, equity) && equity > 0, 'leverage', [exposure, equity]) }
  /** REQUIRED MARGIN at `pct`% of the exposure. value ⌊exposure · pct / 100⌋. */
  static margin(exposure: number, pct: number): CrossFormula { return t('trading-margin', 'margin(exposure, pct) = ⌊exposure · pct / 100⌋', Math.floor((exposure * pct) / 100), nat(exposure, pct) && pct <= 100, 'margin', [exposure, pct]) }
  /** NOTIONAL value of a position. value qty · price. */
  static notional(qty: number, price: number): CrossFormula { return t('trading-notional', 'notional(qty, price) = qty · price', qty * price, nat(qty, price), 'notional', [qty, price]) }
  /** RISK BUDGET per trade: `pct`% of the capital a trader is willing to lose. value ⌊capital · pct / 100⌋. */
  static risk(capital: number, pct: number): CrossFormula { return t('trading-risk', 'risk(capital, pct) = ⌊capital · pct / 100⌋', Math.floor((capital * pct) / 100), nat(capital, pct) && pct <= 100, 'risk', [capital, pct]) }
  /** STOP PRICE for a long: entry less the stop distance in ticks, floored at zero. value max(0, entry − ticks). */
  static stop(entry: number, ticks: number): CrossFormula { return t('trading-stop', 'stop(entry, ticks) = max(0, entry − ticks)', Math.max(0, entry - ticks), nat(entry, ticks), 'stop', [entry, ticks]) }
  /** COMMISSION in basis points of the notional. value ⌊notional · bps / 10000⌋. */
  static fee(notional: number, bps: number): CrossFormula { return t('trading-fee', 'fee(notional, bps) = ⌊notional · bps / 10000⌋', Math.floor((notional * bps) / 10000), nat(notional, bps), 'fee', [notional, bps]) }
}

for (const name of ['fee', 'leverage', 'margin', 'notional', 'pnl', 'position', 'risk', 'stop'] as const)
  hexRegisterOf('trading', name, (TradingFormulas[name] as (...x: unknown[]) => unknown).bind(TradingFormulas))
