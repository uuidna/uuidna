-- lean/FamiliesY.lean — GENERATED. THE FAMILIES, Y — each family's formulas sealed at the witnesses its own test states: the formula's right-hand side as exact integer arithmetic at the test's arguments, equal to the test's value, and equal to what the family's method returns. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def fmax (a b : Int) : Int := if a ≤ b then b else a

/-- yield: couponrate(80, 1000) = 8; current(500, 10000) = 5; dividendyield(250, 10000) = 2; effective(2, 4) =
    8; nominal(60, 1000) = 6; realyield(7, 3) = 4; realyield(2, 5) = 0; taxequivalent(4, 20) = 5;
    yieldtomaturity(50, 10, 1000) = 6 -/
theorem fam_yield : ((((80 : Int) * (100 : Int)) / (1000 : Int)) = (8 : Int)) ∧ ((((500 : Int) * (100 : Int)) / (10000 : Int)) = (5 : Int)) ∧ ((((250 : Int) * (100 : Int)) / (10000 : Int)) = (2 : Int)) ∧ (((2 : Int) * (4 : Int)) = (8 : Int)) ∧ ((((60 : Int) * (100 : Int)) / (1000 : Int)) = (6 : Int)) ∧ ((fmax (0 : Int) ((7 : Int) - (3 : Int))) = (4 : Int)) ∧ ((fmax (0 : Int) ((2 : Int) - (5 : Int))) = (0 : Int)) ∧ ((((4 : Int) * (100 : Int)) / ((100 : Int) - (20 : Int))) = (5 : Int)) ∧ (((((50 : Int) + (10 : Int)) * (100 : Int)) / (1000 : Int)) = (6 : Int)) := by decide
