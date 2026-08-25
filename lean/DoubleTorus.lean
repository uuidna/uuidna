-- lean/DoubleTorus.lean — GENERATED. THE DOUBLE TORUS PRESENTATION — the finite description of an unbounded thing. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- THE EULER CHARACTERISTIC IS THE GENUS, READ OFF: χ = 2 − 2g gives 0 at genus one (the plain torus, a closed
    pipe) and −2 at genus two, so −χ = 2 — the two coins. Both genera on one line, so the number is CHECKED
    against its neighbour rather than stated alone. -/
theorem chi_measures_genus : (((2:Int) - 2 * 1 = 0) ∧ ((2:Int) - 2 * 2 = -2)) ∧ (-((2:Int) - 2 * 2) = 2) := by decide

/-- EACH HANDLE CARRIES TWO GENERATORS, so a double torus has 2 × 2 = 4 — a₁, b₁ around the first handle and a₂,
    b₂ around the second. Four, and not two: the handle count and the generator count are different quantities,
    which the line proves rather than lets slide. -/
theorem handles_give_generators : (2 * 2 = 4) ∧ (4 ≠ 2) := by decide

/-- THE WHOLE DESCRIPTION IS FIVE SYMBOLS: four generators and one relation, [a₁,b₁][a₂,b₂] = 1. One relation— a
    free group on four generators is a different object, and the single constraint is exactly what closes the
    surface. -/
theorem presentation_counts_five : (4 + 1 = 5) ∧ (1 ≠ 0) := by decide

/-- A STEP COSTS THREE QUBITS: two to name which of the four generators (2² = 4) and one for its direction (a or
    a⁻¹), so the per-step alphabet is 4 × 2 = 8 = 2³. The qubit cost of a step is the exponent, and the exponent
    is three. -/
theorem step_costs_three : ((2:Nat)^2 = 4) ∧ (4 * 2 = 8) ∧ ((2:Nat)^3 = 8) := by decide

/-- WORDS GROW, THE DESCRIPTION DOES NOT. Words of length n over the eight letters number 8ⁿ — [1, 8, 64, 512,
    4096, 32768] from length zero to five — and every length past the first already exceeds the five symbols
    that describe them all. The gap widens at every step and the presentation never moves. -/
theorem words_outgrow_presentation : ((List.range 6).map (fun n => 8^n) = [1,8,64,512,4096,32768]) ∧ (((List.range 6).map (fun n => 8^n)).drop 1).all (fun w => w > 5) := by decide

/-- AND THE LIMIT OF THIS METHOD, ON ITS OWN LINE: each length multiplies the count by eight — 8ⁿ⁺¹ = 8 · 8ⁿ at
    every tested length — so the counts do not settle. SCOPE: `by decide` settles finitely many cases and cannot
    prove a group INFINITE. What is decided is the GROWTH; that it never stops is the reading, and it is not
    sealed here. -/
theorem growth_is_not_bounded_here : (List.range 5).all (fun n => 8^(n+1) == 8 * 8^n) := by decide
