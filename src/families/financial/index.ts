import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FINANCIAL — CORPORATE FINANCE, AS ARITHMETIC (chosen by the registry; stored, not skipped). A business is numbers:
 *  break-even units, the payback period, return on investment, gross margin, operating leverage, the monthly burn, the
 *  runway, and compound growth over periods. Crosses to `accounting`. A measure. */

const PROOF = 'corporate-finance arithmetic (break-even, payback, ROI, gross margin, operating leverage, burn, runway, compound growth); a measure crossed to accounting'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'financial', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `financial.${name}`, params })

export class FinancialFormulas {
  /** BREAK-EVEN units: fixed costs over the contribution margin per unit. value ⌈fixed / margin⌉. */
  static breakeven(fixed: number, margin: number): CrossFormula { return f('financial-breakeven', 'breakeven(fixed, margin) = ⌈fixed / margin⌉', margin > 0 ? Math.ceil(fixed / margin) : 0, nat(fixed, margin) && margin > 0, 'breakeven', [fixed, margin]) }
  /** THE PAYBACK PERIOD: the investment over the periodic cash flow. value ⌈investment / cashflow⌉. */
  static payback(investment: number, cashflow: number): CrossFormula { return f('financial-payback', 'payback(investment, cashflow) = ⌈investment / cashflow⌉', cashflow > 0 ? Math.ceil(investment / cashflow) : 0, nat(investment, cashflow) && cashflow > 0, 'payback', [investment, cashflow]) }
  /** RETURN ON INVESTMENT as a percentage (may be negative). value ⌊(gain − cost) · 100 / cost⌋. */
  static roi(gain: number, cost: number): CrossFormula { return f('financial-roi', 'roi(gain, cost) = ⌊(gain − cost) · 100 / cost⌋', cost > 0 ? Math.floor(((gain - cost) * 100) / cost) : 0, nat(gain, cost) && cost > 0, 'roi', [gain, cost]) }
  /** GROSS MARGIN as a percentage: (revenue − cogs) over revenue. value ⌊(revenue − cogs) · 100 / revenue⌋. */
  static margin(revenue: number, cogs: number): CrossFormula { return f('financial-margin', 'margin(revenue, cogs) = ⌊(revenue − cogs) · 100 / revenue⌋', revenue > 0 ? Math.floor(((revenue - cogs) * 100) / revenue) : 0, nat(revenue, cogs) && revenue > 0, 'margin', [revenue, cogs]) }
  /** OPERATING LEVERAGE: the contribution over operating income (×1). value ⌊contribution / income⌋. */
  static leverage(contribution: number, income: number): CrossFormula { return f('financial-leverage', 'leverage(contribution, income) = ⌊contribution / income⌋', income > 0 ? Math.floor(contribution / income) : 0, nat(contribution, income) && income > 0, 'leverage', [contribution, income]) }
  /** THE MONTHLY BURN: spend less revenue (0 when profitable). value max(0, spend − revenue). */
  static burn(spend: number, revenue: number): CrossFormula { return f('financial-burn', 'burn(spend, revenue) = max(0, spend − revenue)', Math.max(0, spend - revenue), nat(spend, revenue), 'burn', [spend, revenue]) }
  /** THE RUNWAY in months: cash on hand over the monthly burn. value ⌊cash / burn⌋. */
  static runway(cash: number, burn: number): CrossFormula { return f('financial-runway', 'runway(cash, burn) = ⌊cash / burn⌋', burn > 0 ? Math.floor(cash / burn) : 0, nat(cash, burn) && burn > 0, 'runway', [cash, burn]) }
  /** COMPOUND GROWTH: a principal grown by `rate`% for `periods`, exactly in integer arithmetic. value ⌊principal · (100+rate)^periods / 100^periods⌋. */
  static compound(principal: number, rate: number, periods: number): CrossFormula { return f('financial-compound', 'compound(principal, rate, periods) = ⌊principal · (100 + rate)^periods / 100^periods⌋', Math.floor((principal * (100 + rate) ** periods) / 100 ** periods), nat(principal, rate, periods) && periods <= 10, 'compound', [principal, rate, periods]) }
}

for (const name of ['breakeven', 'burn', 'compound', 'leverage', 'margin', 'payback', 'roi', 'runway'] as const)
  hexRegisterOf('financial', name, (FinancialFormulas[name] as (...x: unknown[]) => unknown).bind(FinancialFormulas))
