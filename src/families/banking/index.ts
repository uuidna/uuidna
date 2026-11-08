import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BANKING — THE BALANCE SHEET OF A BANK, AS ARITHMETIC. A bank is numbers over its deposits and capital: the reserve
 *  requirement, the lendable balance, the capital-adequacy charge, the liquidity coverage, the net interest spread, an
 *  effective APR, the available credit, and the money multiplier. Crosses to `accounting` — a bank is a ledger with a
 *  licence. A measure, not advice. */

const PROOF = 'banking arithmetic (reserve requirement, lendable balance, capital adequacy, liquidity coverage, net interest spread, APR, available credit, money multiplier); a measure crossed to accounting, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const b = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'banking', dst: 'accounting', formula, value, proof: PROOF, ...extra }, holds, { name: `banking.${name}`, params })

export class BankingFormulas {
  /** THE RESERVE REQUIREMENT: `ratio`% of deposits held back. value ⌊deposits · ratio / 100⌋. */
  static reserve(deposits: number, ratio: number): CrossFormula { return b('banking-reserve', 'reserve(deposits, ratio) = ⌊deposits · ratio / 100⌋', Math.floor((deposits * ratio) / 100), nat(deposits, ratio) && ratio <= 100, 'reserve', [deposits, ratio]) }
  /** THE LENDABLE BALANCE: deposits less the reserve held. value max(0, deposits − reserve). */
  static loan(deposits: number, reserve: number): CrossFormula { return b('banking-loan', 'loan(deposits, reserve) = max(0, deposits − reserve)', Math.max(0, deposits - reserve), nat(deposits, reserve), 'loan', [deposits, reserve]) }
  /** CAPITAL ADEQUACY: `ratio`% of risk-weighted assets a bank must hold as capital. value ⌊assets · ratio / 100⌋. */
  static capital(assets: number, ratio: number): CrossFormula { return b('banking-capital', 'capital(assets, ratio) = ⌊assets · ratio / 100⌋', Math.floor((assets * ratio) / 100), nat(assets, ratio) && ratio <= 100, 'capital', [assets, ratio]) }
  /** LIQUIDITY COVERAGE as a percentage: liquid assets over near obligations. value ⌊liquid · 100 / obligations⌋. */
  static liquidity(liquid: number, obligations: number): CrossFormula { return b('banking-liquidity', 'liquidity(liquid, obligations) = ⌊liquid · 100 / obligations⌋', obligations > 0 ? Math.floor((liquid * 100) / obligations) : 0, nat(liquid, obligations) && obligations > 0, 'liquidity', [liquid, obligations]) }
  /** THE NET INTEREST SPREAD: the lending rate less the deposit rate (basis points). value max(0, lending − deposit). */
  static spread(lending: number, deposit: number): CrossFormula { return b('banking-spread', 'spread(lending, deposit) = max(0, lending − deposit)', Math.max(0, lending - deposit), nat(lending, deposit), 'spread', [lending, deposit]) }
  /** THE EFFECTIVE APR as a percentage: fees over the principal. value ⌊fee · 100 / principal⌋. */
  static apr(fee: number, principal: number): CrossFormula { return b('banking-apr', 'apr(fee, principal) = ⌊fee · 100 / principal⌋', principal > 0 ? Math.floor((fee * 100) / principal) : 0, nat(fee, principal) && principal > 0, 'apr', [fee, principal]) }
  /** AVAILABLE CREDIT: the limit less what is used. value max(0, limit − used). */
  static credit(limit: number, used: number): CrossFormula { return b('banking-credit', 'credit(limit, used) = max(0, limit − used)', Math.max(0, limit - used), nat(limit, used), 'credit', [limit, used]) }
  /** THE MONEY MULTIPLIER: the inverse of the reserve ratio (×1). value ⌊100 / ratio⌋. */
  static multiplier(ratio: number): CrossFormula { return b('banking-multiplier', 'multiplier(ratio) = ⌊100 / ratio⌋', ratio > 0 ? Math.floor(100 / ratio) : 0, nat(ratio) && ratio > 0 && ratio <= 100, 'multiplier', [ratio]) }
}

for (const name of ['apr', 'capital', 'credit', 'liquidity', 'loan', 'multiplier', 'reserve', 'spread'] as const)
  hexRegisterOf('banking', name, (BankingFormulas[name] as (...x: unknown[]) => unknown).bind(BankingFormulas))
