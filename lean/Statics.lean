-- lean/Statics.lean — GENERATED. STATICS — the structures domain, as decidable arithmetic, demarcated. A body in equilibrium has forces summing to zero (10−6−4=0) and moments balancing (6·2=4·3); a lever gives mechanical advantage (100·1=20·5); the centre of mass is the weighted average (1·0+1·10=2·5); a simply-supported beam splits a central load evenly (50+50=100); a rigid planar truss obeys Maxwell's rule m=2j−3 (2·3−3=3); stress is force over area (100/4=25); and Hooke's law is linear. HONEST SCOPE: the arithmetic of equilibrium — sums, balances and exact ratios — not a full structural-analysis or finite-element derivation. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- A body in equilibrium has its forces summing to zero (ΣF = 0): a 10 N upward support balances 6 N + 4 N of downward load — 10 − 6 − 4 = 0. Nothing accelerates when the forces cancel.
theorem force_equilibrium : (10 - 6 - 4 : Int) = 0 := by decide

-- Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match.
theorem moment_balance : 6 * 2 = 4 * 3 := by decide

-- A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.
theorem mechanical_advantage : 100 * 1 = 20 * 5 := by decide

-- The centre of mass is the weighted average of positions: two equal masses at 0 and 10 balance at 5 — 1·0 + 1·10 = 2·5. The system pivots freely about that point.
theorem center_of_mass : 1*0 + 1*10 = 2 * 5 := by decide

-- A simply-supported beam splits a central load evenly between its two supports: a 100 N load gives each reaction 50 N — 50 + 50 = 100. Symmetry shares the burden.
theorem beam_reactions : 50 + 50 = 100 := by decide

-- A rigid, statically determinate planar truss obeys Maxwell's rule m = 2j − 3: the simplest one, a triangle, has 3 members and 3 joints — 2·3 − 3 = 3. The triangle is the atom of stable structure.
theorem truss_maxwell_rule : 2*3 - 3 = 3 := by decide

-- Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder.
theorem stress_is_force_over_area : 100 / 4 = 25 := by decide

-- Hooke's law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.
theorem hookes_law : (([1,2,3] : List Nat).map (fun x => 5 * x)) = [5,10,15] := by decide
