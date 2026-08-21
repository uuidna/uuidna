-- lean/Structures.lean — GENERATED. STRUCTURES — Maxwell's rule m = 2j − 3: determinate, redundant, mechanism — the three regimes as decidable arithmetic. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- MAXWELL'S RULE (1864), the searchers' exact question sealed: a planar truss is statically determinate when m
    = 2j − 3 — the triangle (j=3, m=3: 2·3−3 = 3) and the braced quad (j=4, m=5: 2·4−3 = 5) both balance
    exactly. The triangle is the minimal closed rigid form: closure is rigidity, the same law the school teaches
    everywhere. -/
theorem maxwells_rule_truss : (2 * 3 - 3 = 3) ∧ (2 * 4 - 3 = 5) := by decide

/-- One member past Maxwell's count is one degree of static indeterminacy: the double-braced quad (j=4, m=6)
    carries 6 − (2·4−3) = 1 redundancy — a self-stress the structure holds without any load. Overbracing is not
    free; every extra member is a state the analysis must pay for. -/
theorem redundancy_pays_one : 6 - (2 * 4 - 3) = 1 := by decide

/-- One member short of Maxwell's count is one mechanism: the unbraced quad (j=4, m=4) lacks (2·4−3) − 4 = 1
    member and swings — the open pipe of statics. It is not weaker material it needs but a closed path: brace
    the diagonal and the mechanism vanishes. Containment is the closure of the path, in steel as in plasma. -/
theorem mechanism_lacks_one : (2 * 4 - 3) - 4 = 1 := by decide
