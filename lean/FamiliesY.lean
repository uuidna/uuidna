-- lean/FamiliesY.lean — GENERATED. THE FAMILIES, Y — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as Nat arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Nat) : Nat := if a ≤ b then b else a

/-- yield: couponrate(80, 1000) = 8 — YIELD — WHAT AN INVESTMENT RETURNS, AS ARITHMETIC (chosen by the finance
    registry, not by hand). Return is numbers: the current yield on a price, the nominal coupon yield, the
    effective yield over periods, the dividend yield, an approximate yield to maturity, the coupon rate, the
    real yield after inflation, and the tax-equivalent yield. Crosses to `accounting` — yield is what accounting
    books as return. A measure. */ const PROOF = 'yield arithmetic (current, nominal, effective, dividend,
    yield-to-maturity, coupon rate, real, tax-equivalent); the registry\'s uncovered return domain; a measure
    crossed to accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'yield', dst: 'accounting',
    formula, value, proof: PROOF, ...extra }, holds, { name: `yield.${name}`, params }) export class
    YieldFormulas { /** COUPON RATE: annual coupon over face value, as a percentage. value ⌊coupon · 100 /
    face⌋. -/
theorem fam_yield_couponrate_1 : ((80 * 100) / 1000) = 8 := by decide

/-- yield: current(500, 10000) = 5 — CURRENT YIELD: annual income over the price paid, as a percentage. value
    ⌊income · 100 / price⌋. -/
theorem fam_yield_current_1 : ((500 * 100) / 10000) = 5 := by decide

/-- yield: dividendyield(250, 10000) = 2 — DIVIDEND YIELD: annual dividend over the share price, as a
    percentage. value ⌊dividend · 100 / price⌋. -/
theorem fam_yield_dividendyield_1 : ((250 * 100) / 10000) = 2 := by decide

/-- yield: effective(2, 4) = 8 — EFFECTIVE YIELD: a per-period rate compounded across the periods. value rate ·
    periods. -/
theorem fam_yield_effective_1 : (2 * 4) = 8 := by decide

/-- yield: nominal(60, 1000) = 6 — NOMINAL YIELD: the annual coupon over face value, as a percentage. value
    ⌊coupon · 100 / face⌋. -/
theorem fam_yield_nominal_1 : ((60 * 100) / 1000) = 6 := by decide

/-- yield: realyield(7, 3) = 4 — REAL YIELD: the nominal yield less inflation, never below zero. value max(0,
    nominal − inflation). -/
theorem fam_yield_realyield_1 : (fmax 0 (7 - 3)) = 4 := by decide

/-- yield: realyield(2, 5) = 0 — REAL YIELD: the nominal yield less inflation, never below zero. value max(0,
    nominal − inflation). -/
theorem fam_yield_realyield_2 : (fmax 0 (2 - 5)) = 0 := by decide

/-- yield: taxequivalent(4, 20) = 5 — TAX-EQUIVALENT YIELD: a tax-free yield grossed up for a tax rate
    (percent). value ⌊muni · 100 / (100 − taxrate)⌋. -/
theorem fam_yield_taxequivalent_1 : ((4 * 100) / (100 - 20)) = 5 := by decide

/-- yield: yieldtomaturity(50, 10, 1000) = 6 — YIELD TO MATURITY: coupon plus amortized gain over face value, as
    a percentage. value ⌊(coupon + gain) · 100 / face⌋. -/
theorem fam_yield_yieldtomaturity_1 : (((50 + 10) * 100) / 1000) = 6 := by decide
