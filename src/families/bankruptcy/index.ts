import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** BANKRUPTCY — INSOLVENCY AS ARITHMETIC. What an estate pays and keeps is numbers: the dividend in cents on the dollar,
 *  the shortfall, the secured creditors' priority, what is left for the unsecured, a voidable preference inside the
 *  look-back, the distributable estate net of exemptions, the discharge, and the solvency ratio. Crosses to `law`, where
 *  the court administers the estate. A measure, not advice. */

const PROOF = 'insolvency arithmetic (dividend, shortfall, secured priority, unsecured residue, voidable preference look-back, distributable estate, discharge, solvency ratio); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const b = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'bankruptcy', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `bankruptcy.${name}`, params })

export class BankruptcyFormulas {
  /** THE DIVIDEND as a percentage — cents on the dollar paid to creditors. value ⌊estate · 100 / claims⌋. */
  static dividend(estate: number, claims: number): CrossFormula { return b('bankruptcy-dividend', 'dividend(estate, claims) = ⌊estate · 100 / claims⌋', claims > 0 ? Math.min(100, Math.floor((estate * 100) / claims)) : 0, nat(estate, claims) && claims > 0, 'dividend', [estate, claims]) }
  /** THE SHORTFALL: claims the estate cannot meet — the claims exceed the estate. value max(0, claims − estate). */
  static shortfall(claims: number, estate: number): CrossFormula { return b('bankruptcy-shortfall', 'shortfall(claims, estate) = max(0, claims − estate)', Math.max(0, claims - estate), nat(claims, estate), 'shortfall', [claims, estate]) }
  /** SECURED PRIORITY: the secured creditors are paid first, up to the estate. value min(secured, estate). */
  static priority(secured: number, estate: number): CrossFormula { return b('bankruptcy-priority', 'priority(secured, estate) = min(secured, estate)', Math.min(secured, estate), nat(secured, estate), 'priority', [secured, estate]) }
  /** THE UNSECURED RESIDUE: what is left after the secured are paid. value max(0, estate − secured). */
  static unsecured(estate: number, secured: number): CrossFormula { return b('bankruptcy-unsecured', 'unsecured(estate, secured) = max(0, estate − secured)', Math.max(0, estate - secured), nat(estate, secured), 'unsecured', [estate, secured]) }
  /** A VOIDABLE PREFERENCE: 1 when a payment fell within the look-back period. value [days ≤ period]. */
  static preference(days: number, period: number): CrossFormula { return b('bankruptcy-preference', 'preference(days, period) = [days ≤ period]', days <= period ? 1 : 0, nat(days, period), 'preference', [days, period]) }
  /** THE DISTRIBUTABLE ESTATE: assets net of exemptions. value max(0, assets − exempt). */
  static estate(assets: number, exempt: number): CrossFormula { return b('bankruptcy-estate', 'estate(assets, exempt) = max(0, assets − exempt)', Math.max(0, assets - exempt), nat(assets, exempt), 'estate', [assets, exempt]) }
  /** THE DISCHARGE: debt extinguished after what was paid. value max(0, debt − paid). */
  static discharge(debt: number, paid: number): CrossFormula { return b('bankruptcy-discharge', 'discharge(debt, paid) = max(0, debt − paid)', Math.max(0, debt - paid), nat(debt, paid), 'discharge', [debt, paid]) }
  /** THE SOLVENCY RATIO as a percentage: assets over liabilities. value ⌊assets · 100 / liabilities⌋. */
  static ratio(assets: number, liabilities: number): CrossFormula { return b('bankruptcy-ratio', 'ratio(assets, liabilities) = ⌊assets · 100 / liabilities⌋', liabilities > 0 ? Math.floor((assets * 100) / liabilities) : 0, nat(assets, liabilities) && liabilities > 0, 'ratio', [assets, liabilities]) }
}

for (const name of ['discharge', 'dividend', 'estate', 'preference', 'priority', 'ratio', 'shortfall', 'unsecured'] as const)
  hexRegisterOf('bankruptcy', name, (BankruptcyFormulas[name] as (...x: unknown[]) => unknown).bind(BankruptcyFormulas))
