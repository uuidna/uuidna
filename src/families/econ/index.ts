import { hexRegisterOf } from '../../quantum/processing/unit/index.js'
import { crossFormulaOf, type CrossFormula } from '../cross/index.js'

/** ECONOMIC DAMAGES — the forensic economist's and actuary's arithmetic. Present and future value at a discount rate
 *  (basis points), the present value of an annuity, the work-life and life expectancy a loss is measured over, and the
 *  nominal lost earnings. These are the numbers a damages report defends; each a formula at a hex address. Develops the
 *  economist, actuary and valuation leads. (Rates are basis points: 500 = 5%.) */

const PROOF = 'time value of money: PV = A / (1 + r)^t, FV = A · (1 + r)^t, annuity PV = P · (1 − (1 + r)^−t) / r; work-life and life-expectancy horizons; nominal lost earnings'
const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
const f = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[], extra: Record<string, unknown> = {}): CrossFormula =>
  crossFormulaOf({ id, src: 'econ', dst: 'cross', formula, value, proof: PROOF, ...extra }, holds, { name: `econ.${name}`, params })
const rate = (bps: number) => 1 + bps / 10000

export class EconFormulas {
  /** The present value of `amount` discounted `years` at `bps` basis points: amount / (1 + r)^years, rounded. */
  static present(amount: number, bps: number, years: number): CrossFormula { return f('econ-present', 'present(amount, bps, years) = amount / (1 + bps/10000)^years', Math.round(amount / rate(bps) ** years), nat(amount, bps, years), 'present', [amount, bps, years]) }
  /** The future value of `amount` grown `years` at `bps`: amount · (1 + r)^years. */
  static future(amount: number, bps: number, years: number): CrossFormula { return f('econ-future', 'future(amount, bps, years) = amount · (1 + bps/10000)^years', Math.round(amount * rate(bps) ** years), nat(amount, bps, years), 'future', [amount, bps, years]) }
  /** The present value of an ordinary annuity of `payment` for `years` at `bps`: P · (1 − (1+r)^−years) / r. */
  static annuity(payment: number, bps: number, years: number): CrossFormula { const r = bps / 10000; return f('econ-annuity', 'annuity(payment, bps, years) = payment · (1 − (1+r)^−years) / r', bps > 0 ? Math.round((payment * (1 - rate(bps) ** -years)) / r) : payment * years, nat(payment, bps, years), 'annuity', [payment, bps, years]) }
  /** Remaining work-life years from `age` to a retirement of 67: max(0, 67 − age). */
  static worklife(age: number): CrossFormula { return f('econ-worklife', 'worklife(age) = max(0, 67 − age)', Math.max(0, 67 - age), nat(age), 'worklife', [age]) }
  /** Remaining life expectancy from `age`, by a flat 80-year horizon (a report uses the jurisdiction's own table): max(0, 80 − age). */
  static life(age: number): CrossFormula { return f('econ-life', 'life(age) ≈ max(0, 80 − age) (replace with the jurisdiction’s life table)', Math.max(0, 80 - age), nat(age), 'life', [age], { approximate: true }) }
  /** Nominal lost earnings: `annual` over `years`. */
  static lost(annual: number, years: number): CrossFormula { return f('econ-lost', 'lost(annual, years) = annual · years', annual * years, nat(annual, years), 'lost', [annual, years]) }
}

for (const name of ['annuity', 'future', 'life', 'lost', 'present', 'worklife'] as const)
  hexRegisterOf('econ', name, (EconFormulas[name] as (...x: unknown[]) => unknown).bind(EconFormulas))
