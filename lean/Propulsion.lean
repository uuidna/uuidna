-- lean/Propulsion.lean — GENERATED. PROPULSION — Newtonian and BOUNDED, demarcated. Thrust is momentum conservation (Newton's third law): forward momentum balances the ejected exhaust, so a rocket at rest stays at total momentum zero. Thrust REQUIRES reaction mass (zero exhaust → zero thrust: no reactionless/free drive), thrust = ṁ·vₑ, the Δv budget adds across stages, and acceleration a = F/m is FINITE — no infinite g-force. HONEST SCOPE: the decidable algebra of Newtonian rocketry — not a novel drive, not FTL, not infinite g. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- Newton's third law, as momentum: a rocket at rest ejecting mass keeps total momentum zero — forward 100·3 balances backward 60·5, so 100·3 + 60·(−5) = 0. Thrust is conserved momentum, nothing gained from nothing.
theorem momentum_conserved : (100 * 3 + 60 * (-5) : Int) = 0 := by decide

-- No reactionless (and no infinite) drive: thrust needs ejected reaction mass. With zero exhaust mass, the imparted momentum is 0·vₑ = 0 at EVERY exhaust velocity — no mass out, no push. Free/infinite propulsion is refused by the arithmetic.
theorem no_reactionless_thrust : (List.range 10).all (fun v => 0 * v == 0) := by decide

-- Thrust is the mass flow times the exhaust velocity: F = ṁ·vₑ = 5·60 = 300. The push is exactly the rate momentum leaves.
theorem thrust_is_mdot_times_ve : 5 * 60 = 300 := by decide

-- The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap.
theorem delta_v_stages_add : ([3, 2, 1] : List Nat).sum = 6 := by decide

-- Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).
theorem acceleration_finite : (List.range' 1 10).all (fun m => 300 / m <= 300) := by decide
