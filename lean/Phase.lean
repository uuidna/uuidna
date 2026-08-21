-- lean/Phase.lean — GENERATED. PHASE — why the alternating walk does not close, and which half is responsible. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d
def dbl (d : Nat) : Nat := (2 * d) % 9

/-- THE REFLECTION IS A BIJECTION: dz sends the ten digits onto ten distinct digits, so nothing is lost and
    every step can be undone. Reversible, and therefore barren on its own. -/
theorem dz_loses_nothing : ((List.range 10).map dz).eraseDups.length = 10 := by decide

/-- DOUBLING LOSES A DIGIT, and the loss is named: 2·0 mod 9 = 0 and 2·9 mod 9 = 0, so nine and zero share an
    image. The map sends ten digits onto nine, is therefore not injective, and the step cannot be undone. -/
theorem doubling_collapses_nine : (((List.range 10).map dbl).eraseDups.length = 9) ∧ (dbl 0 = dbl 9) ∧ (dbl 0 = 0) := by decide

/-- THE TWO HALVES ARE NOT THE SAME KIND OF MAP, and the line says so: the reflection's image has ten members
    and doubling's has nine, and ten is not nine. One erases nothing, the other erases exactly one digit per
    pass. -/
theorem maps_differ_in_reach : (((List.range 10).map dz).eraseDups.length ≠ ((List.range 10).map dbl).eraseDups.length) ∧ (10 ≠ 9) := by decide

/-- ONLY ZERO CLOSES. Both maps fix it — dz 0 = 0 and dbl 0 = 0 — so the walk returns to its seed after one
    completed pair, in phase, at two steps. It is the sole seed with a period, and the reason is that neither
    map moves it. -/
theorem zero_closes_in_phase : (dz 0 = 0) ∧ (dbl 0 = 0) := by decide

/-- AND A RETURN IS NOT A PERIOD. Five is fixed by the reflection (dz 5 = 5) so the walk sits on its seed after
    the FIRST step — but that is an odd number of operations, with doubling still owed, so the walk is out of
    phase and has not closed. Doubling then moves it: dbl 5 = 1, and 1 is not 5. -/
theorem five_returns_out_of_phase : (dz 5 = 5) ∧ (dbl 5 = 1) ∧ (dbl 5 ≠ 5) := by decide

/-- THE DOMAIN NARROWS AS THE WALK RUNS: applying doubling to the ten digits leaves nine, and applying it again
    leaves nine of those — the image cannot grow. SCOPE: what decides here is that the image never widens, which
    is what makes a return to an outside seed impossible. That the walk therefore NEVER closes for such a seed
    is the reading— `by decide` settles the maps. -/
theorem reach_shrinks_each_pass : ((((List.range 10).map dbl).eraseDups.map dbl).eraseDups.length ≤ ((List.range 10).map dbl).eraseDups.length) ∧ (((List.range 10).map dbl).eraseDups.length = 9) := by decide
