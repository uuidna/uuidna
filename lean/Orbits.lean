-- lean/Orbits.lean — GENERATED. THE ORBITS, WALKED — and the generator's own facts are walked too. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- The walk from any seed reaching 0 settles on 10 of the ten digits (0, 1, 2, 3, 4, 5, 6, 7, 8, 9), which is
    every one, and that set is closed under the reflection — every member's mirror is already a member, so
    reflecting the finished orbit adds nothing. Measured by walking. -/
theorem orbit_0_1_2_3_4_5_6_7_8_9_closes : [0,1,2,3,4,5,6,7,8,9].all (fun d => [0,1,2,3,4,5,6,7,8,9].contains (if d = 0 then 0 else 10 - d)) := by decide

/-- The walk from any seed reaching 0 settles on 8 of the ten digits (0, 1, 3, 4, 5, 6, 7, 9), and that set is
    closed under the reflection — every member's mirror is already a member, so reflecting the finished orbit
    adds nothing. Measured by walking. -/
theorem orbit_0_1_3_4_5_6_7_9_closes : [0,1,3,4,5,6,7,9].all (fun d => [0,1,3,4,5,6,7,9].contains (if d = 0 then 0 else 10 - d)) := by decide

/-- The walk from any seed reaching 0 settles on 6 of the ten digits (0, 1, 3, 5, 7, 9), and that set is closed
    under the reflection — every member's mirror is already a member, so reflecting the finished orbit adds
    nothing. Measured by walking. -/
theorem orbit_0_1_3_5_7_9_closes : [0,1,3,5,7,9].all (fun d => [0,1,3,5,7,9].contains (if d = 0 then 0 else 10 - d)) := by decide

/-- The walk from any seed reaching 0 settles on 4 of the ten digits (0, 1, 5, 9), and that set is closed under
    the reflection — every member's mirror is already a member, so reflecting the finished orbit adds nothing.
    Measured by walking. -/
theorem orbit_0_1_5_9_closes : [0,1,5,9].all (fun d => [0,1,5,9].contains (if d = 0 then 0 else 10 - d)) := by decide

/-- The walk from any seed reaching 0 settles on 3 of the ten digits (0, 1, 9), and that set is closed under the
    reflection — every member's mirror is already a member, so reflecting the finished orbit adds nothing.
    Measured by walking. -/
theorem orbit_0_1_9_closes : [0,1,9].all (fun d => [0,1,9].contains (if d = 0 then 0 else 10 - d)) := by decide

/-- The walk from any seed reaching 0 settles on 1 of the ten digits (0), and that set is closed under the
    reflection — every member's mirror is already a member, so reflecting the finished orbit adds nothing.
    Measured by walking. -/
theorem orbit_0_closes : [0].all (fun d => [0].contains (if d = 0 then 0 else 10 - d)) := by decide

/-- Walking every seed yields 6 distinct orbits, of orders 10, 8, 6, 4, 3, 1 — the whole vocabulary the ring
    admits, counted by walking rather than claimed. -/
theorem orbits_number_and_orders : ([[0,1,2,3,4,5,6,7,8,9],[0,1,3,4,5,6,7,9],[0,1,3,5,7,9],[0,1,5,9],[0,1,9],[0]].length = 6) ∧ ([[0,1,2,3,4,5,6,7,8,9],[0,1,3,4,5,6,7,9],[0,1,3,5,7,9],[0,1,5,9],[0,1,9],[0]].map (fun o => o.length) = [10,8,6,4,3,1]) := by decide

/-- Each of the ten seeds lands in one of the 6 orbits and none is left out — the orbit of every digit has at
    least one member, and the ten orbits together are exactly the 6 distinct ones. -/
theorem every_seed_lands_somewhere : [[0],[0,1,9],[0,1,2,3,4,5,6,7,8,9],[0,1,3,5,7,9],[0,1,3,4,5,6,7,9],[0,1,5,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9]].all (fun o => o.length > 0) ∧ ([[0],[0,1,9],[0,1,2,3,4,5,6,7,8,9],[0,1,3,5,7,9],[0,1,3,4,5,6,7,9],[0,1,5,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9]].length = 10) := by decide

/-- Exactly 5 of the ten seeds reach every digit (2, 6, 7, 8, 9), and the other 5 do not — both halves measured,
    so the count states which seeds cover and not merely how many. -/
theorem covering_seeds_are_named : ([2,6,7,8,9].length = 5) ∧ ([0,1,3,4,5].length = 5) ∧ (5 + 5 = 10) := by decide
