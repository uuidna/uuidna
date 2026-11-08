import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** TREASURY — CORPORATE FINANCE AS ARITHMETIC (chosen by the registry, not by hand). Holding money is numbers:
 *  the current ratio, working capital, cash flow, interest accrued, days to maturity, the hedge ratio, the reserve
 *  ratio, and the cash-conversion rate. Crosses to `accounting` — treasury is what the books account for. A measure. */

const PROOF = 'treasury arithmetic (liquidity, working capital, cash flow, interest, maturity, hedge, reserve, conversion); a corporate-finance measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'treasury', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `treasury.${name}`, params })

export class TreasuryFormulas {
  /** CURRENT RATIO: current assets against liabilities, as a percentage. value ⌊current · 100 / liabilities⌋. */
  static liquidity(current: number, liabilities: number): CrossFormula { return c('treasury-liquidity', 'liquidity(current, liabilities) = ⌊current · 100 / liabilities⌋', liabilities > 0 ? Math.floor((current * 100) / liabilities) : 0, nat(current, liabilities) && liabilities > 0, 'liquidity', [current, liabilities]) }
  /** WORKING CAPITAL: assets less liabilities, never below zero. value max(0, assets − liabilities). */
  static workingcapital(assets: number, liabilities: number): CrossFormula { return c('treasury-workingcapital', 'workingcapital(assets, liabilities) = max(0, assets − liabilities)', Math.max(0, assets - liabilities), nat(assets, liabilities), 'workingcapital', [assets, liabilities]) }
  /** CASH FLOW: inflow less outflow; may be negative. value inflow − outflow. */
  static cashflow(inflow: number, outflow: number): CrossFormula { return c('treasury-cashflow', 'cashflow(inflow, outflow) = inflow − outflow', inflow - outflow, nat(inflow, outflow), 'cashflow', [inflow, outflow]) }
  /** INTEREST: principal at a percentage rate. value ⌊principal · rate / 100⌋. */
  static interest(principal: number, rate: number): CrossFormula { return c('treasury-interest', 'interest(principal, rate) = ⌊principal · rate / 100⌋', Math.floor((principal * rate) / 100), nat(principal, rate), 'interest', [principal, rate]) }
  /** MATURITY: the days a holding runs. value days. */
  static maturity(days: number): CrossFormula { return c('treasury-maturity', 'maturity(days) = days', days, nat(days), 'maturity', [days]) }
  /** HEDGE RATIO: the hedged position against the exposure, as a percentage. value ⌊hedged · 100 / exposure⌋. */
  static hedge(hedged: number, exposure: number): CrossFormula { return c('treasury-hedge', 'hedge(hedged, exposure) = ⌊hedged · 100 / exposure⌋', exposure > 0 ? Math.floor((hedged * 100) / exposure) : 0, nat(hedged, exposure) && exposure > 0 && hedged <= exposure, 'hedge', [hedged, exposure]) }
  /** RESERVE RATIO: reserves held against those required, as a percentage. value ⌊held · 100 / required⌋. */
  static reserve(held: number, required: number): CrossFormula { return c('treasury-reserve', 'reserve(held, required) = ⌊held · 100 / required⌋', required > 0 ? Math.floor((held * 100) / required) : 0, nat(held, required) && required > 0, 'reserve', [held, required]) }
  /** CASH CONVERSION: receivables converted to cash, as a percentage. value ⌊converted · 100 / receivables⌋. */
  static conversion(converted: number, receivables: number): CrossFormula { return c('treasury-conversion', 'conversion(converted, receivables) = ⌊converted · 100 / receivables⌋', receivables > 0 ? Math.floor((converted * 100) / receivables) : 0, nat(converted, receivables) && receivables > 0 && converted <= receivables, 'conversion', [converted, receivables]) }
}

for (const name of ['cashflow', 'conversion', 'hedge', 'interest', 'liquidity', 'maturity', 'reserve', 'workingcapital'] as const)
  hexRegisterOf('treasury', name, (TreasuryFormulas[name] as (...x: unknown[]) => unknown).bind(TreasuryFormulas))
