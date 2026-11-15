-- lean/FamiliesY.lean — GENERATED. THE FAMILIES, Y — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a

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
theorem fam_yield_couponrate_1 : (((80 : Int) * (100 : Int)) / (1000 : Int)) = (8 : Int) := by decide

/-- yield: current(500, 10000) = 5 — YIELD — WHAT AN INVESTMENT RETURNS, AS ARITHMETIC (chosen by the finance
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
    face⌋. */ static couponrate(coupon: number, face: number): CrossFormula { return c('yield-couponrate',
    'couponrate(coupon, face) = ⌊coupon · 100 / face⌋', face > 0 ? Math.floor((coupon * 100) / face) : 0,
    nat(coupon, face) && face > 0, 'couponrate', [coupon, face]) } /** CURRENT YIELD: annual income over the
    price paid, as a percentage. value ⌊income · 100 / price⌋. -/
theorem fam_yield_current_1 : (((500 : Int) * (100 : Int)) / (10000 : Int)) = (5 : Int) := by decide

/-- yield: dividendyield(250, 10000) = 2 — YIELD — WHAT AN INVESTMENT RETURNS, AS ARITHMETIC (chosen by the
    finance registry, not by hand). Return is numbers: the current yield on a price, the nominal coupon yield,
    the effective yield over periods, the dividend yield, an approximate yield to maturity, the coupon rate, the
    real yield after inflation, and the tax-equivalent yield. Crosses to `accounting` — yield is what accounting
    books as return. A measure. */ const PROOF = 'yield arithmetic (current, nominal, effective, dividend,
    yield-to-maturity, coupon rate, real, tax-equivalent); the registry\'s uncovered return domain; a measure
    crossed to accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'yield', dst: 'accounting',
    formula, value, proof: PROOF, ...extra }, holds, { name: `yield.${name}`, params }) export class
    YieldFormulas { /** COUPON RATE: annual coupon over face value, as a percentage. value ⌊coupon · 100 /
    face⌋. */ static couponrate(coupon: number, face: number): CrossFormula { return c('yield-couponrate',
    'couponrate(coupon, face) = ⌊coupon · 100 / face⌋', face > 0 ? Math.floor((coupon * 100) / face) : 0,
    nat(coupon, face) && face > 0, 'couponrate', [coupon, face]) } /** CURRENT YIELD: annual income over the
    price paid, as a percentage. value ⌊income · 100 / price⌋. */ static current(income: number, price: number):
    CrossFormula { return c('yield-current', 'current(income, price) = ⌊income · 100 / price⌋', price > 0 ?
    Math.floor((income * 100) / price) : 0, nat(income, price) && price > 0, 'current', [income, price]) } /**
    DIVIDEND YIELD: annual dividend over the share price, as a percentage. value ⌊dividend · 100 / price⌋. -/
theorem fam_yield_dividendyield_1 : (((250 : Int) * (100 : Int)) / (10000 : Int)) = (2 : Int) := by decide

/-- yield: effective(2, 4) = 8 — YIELD — WHAT AN INVESTMENT RETURNS, AS ARITHMETIC (chosen by the finance
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
    face⌋. */ static couponrate(coupon: number, face: number): CrossFormula { return c('yield-couponrate',
    'couponrate(coupon, face) = ⌊coupon · 100 / face⌋', face > 0 ? Math.floor((coupon * 100) / face) : 0,
    nat(coupon, face) && face > 0, 'couponrate', [coupon, face]) } /** CURRENT YIELD: annual income over the
    price paid, as a percentage. value ⌊income · 100 / price⌋. */ static current(income: number, price: number):
    CrossFormula { return c('yield-current', 'current(income, price) = ⌊income · 100 / price⌋', price > 0 ?
    Math.floor((income * 100) / price) : 0, nat(income, price) && price > 0, 'current', [income, price]) } /**
    DIVIDEND YIELD: annual dividend over the share price, as a percentage. value ⌊dividend · 100 / price⌋. */
    static dividendyield(dividend: number, price: number): CrossFormula { return c('yield-dividendyield',
    'dividendyield(dividend, price) = ⌊dividend · 100 / price⌋', price > 0 ? Math.floor((dividend * 100) /
    price) : 0, nat(dividend, price) && price > 0, 'dividendyield', [dividend, price]) } /** EFFECTIVE YIELD: a
    per-period rate compounded across the periods. value rate · periods. -/
theorem fam_yield_effective_1 : ((2 : Int) * (4 : Int)) = (8 : Int) := by decide

/-- yield: nominal(60, 1000) = 6 — YIELD — WHAT AN INVESTMENT RETURNS, AS ARITHMETIC (chosen by the finance
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
    face⌋. */ static couponrate(coupon: number, face: number): CrossFormula { return c('yield-couponrate',
    'couponrate(coupon, face) = ⌊coupon · 100 / face⌋', face > 0 ? Math.floor((coupon * 100) / face) : 0,
    nat(coupon, face) && face > 0, 'couponrate', [coupon, face]) } /** CURRENT YIELD: annual income over the
    price paid, as a percentage. value ⌊income · 100 / price⌋. */ static current(income: number, price: number):
    CrossFormula { return c('yield-current', 'current(income, price) = ⌊income · 100 / price⌋', price > 0 ?
    Math.floor((income * 100) / price) : 0, nat(income, price) && price > 0, 'current', [income, price]) } /**
    DIVIDEND YIELD: annual dividend over the share price, as a percentage. value ⌊dividend · 100 / price⌋. */
    static dividendyield(dividend: number, price: number): CrossFormula { return c('yield-dividendyield',
    'dividendyield(dividend, price) = ⌊dividend · 100 / price⌋', price > 0 ? Math.floor((dividend * 100) /
    price) : 0, nat(dividend, price) && price > 0, 'dividendyield', [dividend, price]) } /** EFFECTIVE YIELD: a
    per-period rate compounded across the periods. value rate · periods. */ static effective(rate: number,
    periods: number): CrossFormula { return c('yield-effective', 'effective(rate, periods) = rate · periods',
    rate * periods, nat(rate, periods), 'effective', [rate, periods]) } /** NOMINAL YIELD: the annual coupon
    over face value, as a percentage. value ⌊coupon · 100 / face⌋. -/
theorem fam_yield_nominal_1 : (((60 : Int) * (100 : Int)) / (1000 : Int)) = (6 : Int) := by decide

/-- yield: realyield(7, 3) = 4 — YIELD — WHAT AN INVESTMENT RETURNS, AS ARITHMETIC (chosen by the finance
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
    face⌋. */ static couponrate(coupon: number, face: number): CrossFormula { return c('yield-couponrate',
    'couponrate(coupon, face) = ⌊coupon · 100 / face⌋', face > 0 ? Math.floor((coupon * 100) / face) : 0,
    nat(coupon, face) && face > 0, 'couponrate', [coupon, face]) } /** CURRENT YIELD: annual income over the
    price paid, as a percentage. value ⌊income · 100 / price⌋. */ static current(income: number, price: number):
    CrossFormula { return c('yield-current', 'current(income, price) = ⌊income · 100 / price⌋', price > 0 ?
    Math.floor((income * 100) / price) : 0, nat(income, price) && price > 0, 'current', [income, price]) } /**
    DIVIDEND YIELD: annual dividend over the share price, as a percentage. value ⌊dividend · 100 / price⌋. */
    static dividendyield(dividend: number, price: number): CrossFormula { return c('yield-dividendyield',
    'dividendyield(dividend, price) = ⌊dividend · 100 / price⌋', price > 0 ? Math.floor((dividend * 100) /
    price) : 0, nat(dividend, price) && price > 0, 'dividendyield', [dividend, price]) } /** EFFECTIVE YIELD: a
    per-period rate compounded across the periods. value rate · periods. */ static effective(rate: number,
    periods: number): CrossFormula { return c('yield-effective', 'effective(rate, periods) = rate · periods',
    rate * periods, nat(rate, periods), 'effective', [rate, periods]) } /** NOMINAL YIELD: the annual coupon
    over face value, as a percentage. value ⌊coupon · 100 / face⌋. */ static nominal(coupon: number, face:
    number): CrossFormula { return c('yield-nominal', 'nominal(coupon, face) = ⌊coupon · 100 / face⌋', face > 0
    ? Math.floor((coupon * 100) / face) : 0, nat(coupon, face) && face > 0, 'nominal', [coupon, face]) } /**
    REAL YIELD: the nominal yield less inflation, never below zero. value max(0, nominal − inflation). -/
theorem fam_yield_realyield_1 : (fmax (0 : Int) ((7 : Int) - (3 : Int))) = (4 : Int) := by decide

/-- yield: realyield(2, 5) = 0 — YIELD — WHAT AN INVESTMENT RETURNS, AS ARITHMETIC (chosen by the finance
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
    face⌋. */ static couponrate(coupon: number, face: number): CrossFormula { return c('yield-couponrate',
    'couponrate(coupon, face) = ⌊coupon · 100 / face⌋', face > 0 ? Math.floor((coupon * 100) / face) : 0,
    nat(coupon, face) && face > 0, 'couponrate', [coupon, face]) } /** CURRENT YIELD: annual income over the
    price paid, as a percentage. value ⌊income · 100 / price⌋. */ static current(income: number, price: number):
    CrossFormula { return c('yield-current', 'current(income, price) = ⌊income · 100 / price⌋', price > 0 ?
    Math.floor((income * 100) / price) : 0, nat(income, price) && price > 0, 'current', [income, price]) } /**
    DIVIDEND YIELD: annual dividend over the share price, as a percentage. value ⌊dividend · 100 / price⌋. */
    static dividendyield(dividend: number, price: number): CrossFormula { return c('yield-dividendyield',
    'dividendyield(dividend, price) = ⌊dividend · 100 / price⌋', price > 0 ? Math.floor((dividend * 100) /
    price) : 0, nat(dividend, price) && price > 0, 'dividendyield', [dividend, price]) } /** EFFECTIVE YIELD: a
    per-period rate compounded across the periods. value rate · periods. */ static effective(rate: number,
    periods: number): CrossFormula { return c('yield-effective', 'effective(rate, periods) = rate · periods',
    rate * periods, nat(rate, periods), 'effective', [rate, periods]) } /** NOMINAL YIELD: the annual coupon
    over face value, as a percentage. value ⌊coupon · 100 / face⌋. */ static nominal(coupon: number, face:
    number): CrossFormula { return c('yield-nominal', 'nominal(coupon, face) = ⌊coupon · 100 / face⌋', face > 0
    ? Math.floor((coupon * 100) / face) : 0, nat(coupon, face) && face > 0, 'nominal', [coupon, face]) } /**
    REAL YIELD: the nominal yield less inflation, never below zero. value max(0, nominal − inflation). -/
theorem fam_yield_realyield_2 : (fmax (0 : Int) ((2 : Int) - (5 : Int))) = (0 : Int) := by decide

/-- yield: taxequivalent(4, 20) = 5 — YIELD — WHAT AN INVESTMENT RETURNS, AS ARITHMETIC (chosen by the finance
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
    face⌋. */ static couponrate(coupon: number, face: number): CrossFormula { return c('yield-couponrate',
    'couponrate(coupon, face) = ⌊coupon · 100 / face⌋', face > 0 ? Math.floor((coupon * 100) / face) : 0,
    nat(coupon, face) && face > 0, 'couponrate', [coupon, face]) } /** CURRENT YIELD: annual income over the
    price paid, as a percentage. value ⌊income · 100 / price⌋. */ static current(income: number, price: number):
    CrossFormula { return c('yield-current', 'current(income, price) = ⌊income · 100 / price⌋', price > 0 ?
    Math.floor((income * 100) / price) : 0, nat(income, price) && price > 0, 'current', [income, price]) } /**
    DIVIDEND YIELD: annual dividend over the share price, as a percentage. value ⌊dividend · 100 / price⌋. */
    static dividendyield(dividend: number, price: number): CrossFormula { return c('yield-dividendyield',
    'dividendyield(dividend, price) = ⌊dividend · 100 / price⌋', price > 0 ? Math.floor((dividend * 100) /
    price) : 0, nat(dividend, price) && price > 0, 'dividendyield', [dividend, price]) } /** EFFECTIVE YIELD: a
    per-period rate compounded across the periods. value rate · periods. */ static effective(rate: number,
    periods: number): CrossFormula { return c('yield-effective', 'effective(rate, periods) = rate · periods',
    rate * periods, nat(rate, periods), 'effective', [rate, periods]) } /** NOMINAL YIELD: the annual coupon
    over face value, as a percentage. value ⌊coupon · 100 / face⌋. */ static nominal(coupon: number, face:
    number): CrossFormula { return c('yield-nominal', 'nominal(coupon, face) = ⌊coupon · 100 / face⌋', face > 0
    ? Math.floor((coupon * 100) / face) : 0, nat(coupon, face) && face > 0, 'nominal', [coupon, face]) } /**
    REAL YIELD: the nominal yield less inflation, never below zero. value max(0, nominal − inflation). */ static
    realyield(nominal: number, inflation: number): CrossFormula { return c('yield-realyield',
    'realyield(nominal, inflation) = max(0, nominal − inflation)', Math.max(0, nominal - inflation),
    nat(nominal, inflation), 'realyield', [nominal, inflation]) } /** TAX-EQUIVALENT YIELD: a tax-free yield
    grossed up for a tax rate (percent). value ⌊muni · 100 / (100 − taxrate)⌋. -/
theorem fam_yield_taxequivalent_1 : (((4 : Int) * (100 : Int)) / ((100 : Int) - (20 : Int))) = (5 : Int) := by decide

/-- yield: yieldtomaturity(50, 10, 1000) = 6 — YIELD — WHAT AN INVESTMENT RETURNS, AS ARITHMETIC (chosen by the
    finance registry, not by hand). Return is numbers: the current yield on a price, the nominal coupon yield,
    the effective yield over periods, the dividend yield, an approximate yield to maturity, the coupon rate, the
    real yield after inflation, and the tax-equivalent yield. Crosses to `accounting` — yield is what accounting
    books as return. A measure. */ const PROOF = 'yield arithmetic (current, nominal, effective, dividend,
    yield-to-maturity, coupon rate, real, tax-equivalent); the registry\'s uncovered return domain; a measure
    crossed to accounting' const nat = (...xs: number[]) => xs.every((x) => Number.isSafeInteger(x) && x >= 0)
    const c = (id: string, formula: string, value: number, holds: boolean, name: string, params: number[],
    extra: Record<string, unknown> = {}): CrossFormula => crossFormulaOf({ id, src: 'yield', dst: 'accounting',
    formula, value, proof: PROOF, ...extra }, holds, { name: `yield.${name}`, params }) export class
    YieldFormulas { /** COUPON RATE: annual coupon over face value, as a percentage. value ⌊coupon · 100 /
    face⌋. */ static couponrate(coupon: number, face: number): CrossFormula { return c('yield-couponrate',
    'couponrate(coupon, face) = ⌊coupon · 100 / face⌋', face > 0 ? Math.floor((coupon * 100) / face) : 0,
    nat(coupon, face) && face > 0, 'couponrate', [coupon, face]) } /** CURRENT YIELD: annual income over the
    price paid, as a percentage. value ⌊income · 100 / price⌋. */ static current(income: number, price: number):
    CrossFormula { return c('yield-current', 'current(income, price) = ⌊income · 100 / price⌋', price > 0 ?
    Math.floor((income * 100) / price) : 0, nat(income, price) && price > 0, 'current', [income, price]) } /**
    DIVIDEND YIELD: annual dividend over the share price, as a percentage. value ⌊dividend · 100 / price⌋. */
    static dividendyield(dividend: number, price: number): CrossFormula { return c('yield-dividendyield',
    'dividendyield(dividend, price) = ⌊dividend · 100 / price⌋', price > 0 ? Math.floor((dividend * 100) /
    price) : 0, nat(dividend, price) && price > 0, 'dividendyield', [dividend, price]) } /** EFFECTIVE YIELD: a
    per-period rate compounded across the periods. value rate · periods. */ static effective(rate: number,
    periods: number): CrossFormula { return c('yield-effective', 'effective(rate, periods) = rate · periods',
    rate * periods, nat(rate, periods), 'effective', [rate, periods]) } /** NOMINAL YIELD: the annual coupon
    over face value, as a percentage. value ⌊coupon · 100 / face⌋. */ static nominal(coupon: number, face:
    number): CrossFormula { return c('yield-nominal', 'nominal(coupon, face) = ⌊coupon · 100 / face⌋', face > 0
    ? Math.floor((coupon * 100) / face) : 0, nat(coupon, face) && face > 0, 'nominal', [coupon, face]) } /**
    REAL YIELD: the nominal yield less inflation, never below zero. value max(0, nominal − inflation). */ static
    realyield(nominal: number, inflation: number): CrossFormula { return c('yield-realyield',
    'realyield(nominal, inflation) = max(0, nominal − inflation)', Math.max(0, nominal - inflation),
    nat(nominal, inflation), 'realyield', [nominal, inflation]) } /** TAX-EQUIVALENT YIELD: a tax-free yield
    grossed up for a tax rate (percent). value ⌊muni · 100 / (100 − taxrate)⌋. */ static taxequivalent(muni:
    number, taxrate: number): CrossFormula { return c('yield-taxequivalent', 'taxequivalent(muni, taxrate) =
    ⌊muni · 100 / (100 − taxrate)⌋', 100 - taxrate > 0 ? Math.floor((muni * 100) / (100 - taxrate)) : 0,
    nat(muni, taxrate) && taxrate < 100, 'taxequivalent', [muni, taxrate]) } /** YIELD TO MATURITY: coupon plus
    amortized gain over face value, as a percentage. value ⌊(coupon + gain) · 100 / face⌋. -/
theorem fam_yield_yieldtomaturity_1 : ((((50 : Int) + (10 : Int)) * (100 : Int)) / (1000 : Int)) = (6 : Int) := by decide
