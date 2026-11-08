import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** FAMILY — FAMILY LAW AS ARITHMETIC. A matter is numbers the jurisdiction's guidelines set: child support as a share of
 *  income, support scaled by the number of children, the division of property, arrears, spousal maintenance on the income
 *  gap, imputed income, the custody share in overnights, and whether it is a majority. Crosses to `law`, where the court
 *  orders. A measure, not advice. */

const PROOF = 'family-law arithmetic (child support, support by children, property division, arrears, spousal maintenance on the income gap, imputed income, custody overnights, majority); a measure crossed to law, not advice'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const y = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'family', dst: 'law', formula, value, proof: PROOF, ...extra }, holds, { name: `family.${name}`, params })

export class FamilyFormulas {
  /** CHILD SUPPORT as `pct`% of the payor's income. value ⌊income · pct / 100⌋. */
  static support(income: number, pct: number): CrossFormula { return y('family-support', 'support(income, pct) = ⌊income · pct / 100⌋', Math.floor((income * pct) / 100), nat(income, pct) && pct <= 100, 'support', [income, pct]) }
  /** SUPPORT scaled by the number of children at a per-child amount. value perChild · children. */
  static children(perChild: number, children: number): CrossFormula { return y('family-children', 'children(perChild, children) = perChild · children', perChild * children, nat(perChild, children), 'children', [perChild, children]) }
  /** PROPERTY DIVISION: a party's `pct`% share of the marital assets. value ⌊assets · pct / 100⌋. */
  static division(assets: number, pct: number): CrossFormula { return y('family-division', 'division(assets, pct) = ⌊assets · pct / 100⌋', Math.floor((assets * pct) / 100), nat(assets, pct) && pct <= 100, 'division', [assets, pct]) }
  /** ARREARS: support due less support paid. value max(0, due − paid). */
  static arrears(due: number, paid: number): CrossFormula { return y('family-arrears', 'arrears(due, paid) = max(0, due − paid)', Math.max(0, due - paid), nat(due, paid), 'arrears', [due, paid]) }
  /** SPOUSAL MAINTENANCE: `pct`% of the gap between the parties' incomes. value ⌊max(0, payor − recipient) · pct / 100⌋. */
  static maintenance(payor: number, recipient: number, pct: number): CrossFormula { return y('family-maintenance', 'maintenance(payor, recipient, pct) = ⌊max(0, payor − recipient) · pct / 100⌋', Math.floor((Math.max(0, payor - recipient) * pct) / 100), nat(payor, recipient, pct) && pct <= 100, 'maintenance', [payor, recipient, pct]) }
  /** IMPUTED INCOME: the greater of earning capacity and actual income. value max(capacity, actual). */
  static imputed(capacity: number, actual: number): CrossFormula { return y('family-imputed', 'imputed(capacity, actual) = max(capacity, actual)', Math.max(capacity, actual), nat(capacity, actual), 'imputed', [capacity, actual]) }
  /** THE CUSTODY SHARE as a percentage of the year's overnights. value ⌊with · 100 / total⌋. */
  static overnights(withParent: number, total: number): CrossFormula { return y('family-overnights', 'overnights(with, total) = ⌊with · 100 / total⌋', total > 0 ? Math.floor((withParent * 100) / total) : 0, nat(withParent, total) && total > 0 && withParent <= total, 'overnights', [withParent, total]) }
  /** MAJORITY CUSTODY: 1 when a parent has more than half the overnights in a 365-night year. value [nights ≥ 183]. */
  static majority(nights: number): CrossFormula { return y('family-majority', 'majority(nights) = [nights ≥ 183]', nights >= 183 ? 1 : 0, nat(nights) && nights <= 365, 'majority', [nights]) }
}

for (const name of ['arrears', 'children', 'division', 'imputed', 'maintenance', 'majority', 'overnights', 'support'] as const)
  hexRegisterOf('family', name, (FamilyFormulas[name] as (...x: unknown[]) => unknown).bind(FamilyFormulas))
