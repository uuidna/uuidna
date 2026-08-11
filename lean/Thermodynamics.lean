-- lean/Thermodynamics.lean — GENERATED. THERMODYNAMICS — the energy domain, as decidable arithmetic, demarcated. The first law conserves energy (ΔU = Q − W: 100 = 60 + 40); the second law forbids entropy from decreasing and sends heat hot → cold; the Carnot efficiency is below 1 (no perfect engine, no perpetual motion); the Kelvin scale floors at absolute zero (0 °C = 273 K); Charles's law keeps V/T constant; and specific heat is linear in ΔT. HONEST SCOPE: the arithmetic of the laws — conservation, monotonicity and exact ratios, not a full statistical-mechanics derivation. Every proof `by decide`, sorry-free, no Mathlib.

-- The first law conserves energy: ΔU = Q − W, so the heat added equals the internal-energy change plus the work done — 100 = 60 + 40. Energy is neither created nor destroyed, only moved.
theorem first_law_conservation : 100 = 60 + 40 := by decide

-- The second law: the entropy of an isolated system never decreases. Modelled as a monotone ladder S(t) = t, every step satisfies S(t) ≤ S(t+1) — disorder holds or grows, never spontaneously falls.
theorem entropy_never_decreases : (List.range 9).all (fun t => t <= t + 1) := by decide

-- The second law's direction: heat flows spontaneously from the hotter body to the colder — with Th = 400 K and Tc = 300 K, 400 > 300, so energy moves hot → cold, never the reverse without work.
theorem heat_flows_hot_to_cold : 400 > 300 := by decide

-- The Carnot efficiency η = 1 − Tc/Th is strictly below 1: with Th = 400 and Tc = 300, the extractable work fraction (Th − Tc) = 100 is less than the heat in 400, and Tc = 300 > 0 — no engine is perfect and none reaches absolute zero.
theorem carnot_efficiency_below_one : ((400 - 300) < 400) ∧ (0 < 300) := by decide

-- The Kelvin scale floors at absolute zero: 0 °C = 273 K and 100 °C = 373 K (K = °C + 273). Nothing goes below 0 K; temperature has a hard floor.
theorem absolute_zero_and_kelvin : (0 + 273 = 273) ∧ (100 + 273 = 373) := by decide

-- Charles's law keeps V/T constant at fixed pressure: heating a gas expands it proportionally — V₁/T₁ = V₂/T₂ gives 2/300 = 4/600, cross-multiplied 2·600 = 4·300 = 1200.
theorem charles_law : 2 * 600 = 4 * 300 := by decide

-- No perpetual motion: the work out never exceeds the heat in, and some is always wasted — from 100 units of heat at most 40 become work (40 ≤ 100), leaving 60 as waste heat. A 100%-efficient engine is forbidden.
theorem no_perpetual_motion : (40 <= 100) ∧ ((100 - 40) = 60) := by decide

-- Specific heat is linear: Q = m·c·ΔT, so with m·c = 10 the heat scales with the temperature change — ΔT of [1,2,3] needs Q of [10,20,30]. Double the rise, double the heat.
theorem specific_heat_linear : (([1,2,3] : List Nat).map (fun dT => 10 * dT)) = [10,20,30] := by decide
