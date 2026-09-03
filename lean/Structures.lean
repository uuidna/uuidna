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

/-- MAXWELL’S COUNT SORTS EVERY FRAME INTO EXACTLY ONE CLASS, over the whole grid. For a planar pin-jointed
    frame with j joints and m members, m < 2j − 3 is a mechanism, m = 2j − 3 is statically determinate, and m >
    2j − 3 is indeterminate — and the point sealed here is that the three cases are TOTAL and EXCLUSIVE: over
    all 10 × 22 = 220 cells of (j, m) with j in 1..10 and m in 1..22, exactly one of the three holds, never none
    and never two. Stated as m + 3 against 2j so the arithmetic stays in the naturals and no truncated
    subtraction hides a case. WHAT IT IS NOT: a claim that a determinate count makes a frame stable — Maxwell’s
    rule is necessary, not sufficient, and a critical form can satisfy it and still fold. -/
theorem maxwell_trichotomy_is_total_over_the_grid : ((List.range 10).all (fun a => (List.range 22).all (fun b => let j := a + 1; let m := b + 1; ((if m + 3 < 2 * j then 1 else 0) + (if m + 3 == 2 * j then 1 else 0) + (if 2 * j < m + 3 then 1 else 0)) == 1))) ∧ (10 * 22 = 220) := by decide
