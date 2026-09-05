-- lean/Statics.lean — GENERATED. STATICS — the structures domain, as decidable arithmetic, demarcated. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- MAXWELL'S RULE WALKED, not stated. This wing named m = 2j − 3 in its header and never enumerated it, which
    is the difference between a claim about trusses and a claim that decides. Over joints 3..12 and members
    0..40 — 829 cases — three things are decided. EXACTLY ONE member count per joint count is statically
    determinate: for each j precisely one m in range satisfies m + 3 = 2j, so the rule picks a point and not a
    region. THE COST OF A JOINT IS EXACTLY TWO MEMBERS: the determinate m rises by 2 for each joint added, which
    is why a planar truss grows by triangles. AND THE MECHANISMS ARE COUNTED: below the determinate point sit
    exactly 2j − 3 under-braced configurations, each of which moves. THE THIRD CLAUSE IS THE ONE THAT
    DISCRIMINATES and it was checked rather than assumed — under a wrong rule (m = 2j − 2) the first clause
    STILL HOLDS, because "exactly one m per j" is a property of the shape rather than of the constant, while the
    mechanism count is false. A conjunct that survives the wrong rule is decoration; the count is the content.
    SCOPE: planar pin-jointed trusses as counting. It decides the arithmetic of determinacy, NOT whether a given
    structure stands — a determinate truss can still fail on member strength, buckling or a support that is not
    what the count assumed. -/
theorem truss_determinacy_partitions_the_joint_member_grid : ((List.range' 3 10).all (fun j => ((List.range 41).filter (fun m => m + 3 == 2 * j)).length == 1)) ∧ ((List.range' 3 9).all (fun j => (2 * (j + 1) - 3) - (2 * j - 3) == 2)) ∧ ((List.range' 3 10).all (fun j => ((List.range 41).filter (fun m => m + 3 < 2 * j)).length == 2 * j - 3)) := by decide

/-- A body in equilibrium has its forces summing to zero (ΣF = 0): a 10 N upward support balances 6 N + 4 N of
    downward load — 10 − 6 − 4 = 0. Nothing accelerates when the forces cancel. -/
theorem force_equilibrium : (10 - 6 - 4 : Int) = 0 := by decide

/-- Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m.
    Torque is force times lever arm, and a seesaw settles when they match. -/
theorem moment_balance : 6 * 2 = 4 * 3 := by decide

/-- A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m
    — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force. -/
theorem mechanical_advantage : 100 * 1 = 20 * 5 := by decide

/-- The centre of mass is the weighted average of positions: two equal masses at 0 and 10 balance at 5 — 1·0 +
    1·10 = 2·5. The system pivots freely about that point. -/
theorem center_of_mass : 1*0 + 1*10 = 2 * 5 := by decide

/-- A simply-supported beam splits a central load evenly between its two supports: a 100 N load gives each
    reaction 50 N — 50 + 50 = 100. Symmetry shares the burden. -/
theorem beam_reactions : 50 + 50 = 100 := by decide

/-- A rigid, statically determinate planar truss obeys Maxwell's rule m = 2j − 3: the simplest one, a triangle,
    has 3 members and 3 joints — 2·3 − 3 = 3. The triangle is the atom of stable structure. -/
theorem truss_maxwell_rule : 2*3 - 3 = 3 := by decide

/-- Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25.
    The same force on less area bites harder. -/
theorem stress_is_force_over_area : 100 / 4 = 25 := by decide

/-- Hooke's law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch —
    extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit. -/
theorem hookes_law : (([1,2,3] : List Nat).map (fun x => 5 * x)) = [5,10,15] := by decide
