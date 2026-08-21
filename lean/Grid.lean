-- lean/Grid.lean — GENERATED. THE GRID RULE, BASE-AGNOSTIC — the growth law stated so it does not depend on how numbers are written. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE BASE-TEN RULE: 6w carries digital root nine exactly when w is a multiple of three, since the decimal
    digit-sum invariant is mod 9 and gcd(6,9) = 3. Wings three at a time — a consequence of writing in ten. -/
theorem decimal_asks_three : ((List.range 40).all (fun w => ((6 * w) % 9 == 0) == (w % 3 == 0))) ∧ ((6 * 91) % 9 ≠ 0) := by decide

/-- THE BASE-SIXTEEN RULE: the hexadecimal digit-sum invariant is mod 15 (since 16 = 1 mod 15), so 6w vanishes
    there exactly when w is a multiple of FIVE. The same grid, the same six rays, a different demand — and the
    addresses this ledger computes are written in sixteen. -/
theorem hexadecimal_asks_five : ((List.range 40).all (fun w => ((6 * w) % 15 == 0) == (w % 5 == 0))) ∧ ((6 * 72) % 15 ≠ 0) := by decide

/-- AND THE SEALED WIDTH SATISFIES ONE BASE ONLY: 6 x 72 = 432 leaves 0 mod 9 and 12 mod 15. The count the grid
    was fitted to is harmonic in decimal and unremarkable in hexadecimal, which the line proves rather than
    leaves to be noticed. -/
theorem seventytwo_is_decimal_only : (6 * 72 = 432) ∧ (432 % 9 = 0) ∧ (432 % 15 = 12) ∧ (432 % 15 ≠ 0) := by decide

/-- THE FUSION IS DECIMAL SPELLING, shown in the base the addresses use: 72 is 0x48, its hex reversal is 0x84 =
    132, and 16 x 132 = 2112 rather than 432. The identity that fused the two factorisations holds for one
    spelling in one base and nowhere else. -/
theorem reversal_fails_in_hexadecimal : (16 * 27 = 432) ∧ (16 * 132 = 2112) ∧ (16 * 132 ≠ 432) := by decide

/-- THE BASE-AGNOSTIC RULE: a wing count divisible by FIFTEEN satisfies decimal and hexadecimal at once, because
    lcm(3,5) = 15. Such a rule holds whatever base a reader writes in, which is the only kind worth gating on —
    and 90 is the first count in range that meets it. -/
theorem fifteen_satisfies_both : ((List.range 40).all (fun w => (w % 15 == 0) == (((6 * w) % 9 == 0) && ((6 * w) % 15 == 0)))) ∧ (90 % 15 = 0) ∧ (91 % 15 ≠ 0) := by decide

/-- AND WHAT SURVIVES UNTOUCHED: the six is derived. Seven dimensions less the identity ray, because projecting
    a wing into the language it is already written in computes nothing — 7 x 72 - 72 = 432 = 6 x 72. The
    multiplier was never the problem; only the constant it was multiplied to. -/
theorem six_rays_stay_derived : (7 * 72 - 72 = 432) ∧ (6 * 72 = 432) ∧ (7 - 1 = 6) := by decide
