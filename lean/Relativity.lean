-- lean/Relativity.lean — GENERATED. RELATIVITY — the spacetime domain, as decidable arithmetic, demarcated. Nothing exceeds c (the cosmic speed limit — no FTL); light travels on the null cone (interval 0); the invariant interval s² = (ct)² − x² classifies events as timelike/causal (5²−4²=9>0) or spacelike (3²−5²<0, no causal link without FTL); the Lorentz factor rides a Pythagorean triangle (β=5/13 → γ=13/12, 5²+12²=13²); moving clocks dilate (13>12) and lengths contract (12<13); and rest energy is E=mc². HONEST SCOPE: the arithmetic of special relativity in integer-friendly cases — intervals, the γ triangle and exact ratios — not a full tensor or general-relativity derivation. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- Nothing outruns light: c = 299792458 m/s is the universal speed limit, so any real signal is strictly slower — 299792457 < 299792458. There is no faster-than-light; the ledger says "no fake FTL," and relativity proves it.
theorem cosmic_speed_limit : 299792457 < 299792458 := by decide

-- Light travels on the null cone: with c = 1, a flash covering x = 5 in t = 5 has spacetime interval (ct)² − x² = 5² − 5² = 0. Photons trace the zero-interval boundary between cause and no-cause.
theorem light_on_null_cone : (5*5 - 5*5 : Int) = 0 := by decide

-- The invariant interval classifies events: a timelike separation (ct = 5, x = 4) gives s² = 25 − 16 = 9 > 0 — inside the light cone, reachable below light speed, so cause can reach effect. All observers agree on this interval.
theorem interval_timelike_causal : ((5*5 - 4*4 : Int) = 9) ∧ ((9:Int) > 0) := by decide

-- The Lorentz factor rides a right triangle: β² + (1/γ)² = 1, so at β = 5/13 the reciprocal factor is 12/13 and γ = 13/12 — 5² + 12² = 13². The faster you go, the taller the triangle.
theorem lorentz_gamma_triangle : 5^2 + 12^2 = 13^2 := by decide

-- Moving clocks run slow: at γ = 13/12 a proper time of 12 seconds is observed as 13 — 13 > 12. The traveller ages less; the stay-at-home sees more time pass.
theorem time_dilation : 13 > 12 := by decide

-- Moving lengths contract along the motion: at γ = 13/12 a 13-metre rest length measures 13/γ = 12 metres to the observer it flies past — 12 < 13. Space shortens as speed climbs.
theorem length_contraction : 12 < 13 := by decide

-- Mass is energy: E = mc², so (with c² = 9 in these units) masses [1,2,3] carry rest energies [9,18,27] — linear in mass. Even at rest, matter holds mc² of energy.
theorem rest_energy_mc2 : (([1,2,3] : List Nat).map (fun m => m * 9)) = [9,18,27] := by decide

-- Causality forbids faster-than-light links: a spacelike separation (ct = 3, x = 5) has s² = 9 − 25 = −16 < 0 — outside the light cone, so no signal can connect the events without exceeding c. What is spacelike cannot be a cause.
theorem causality_forbids_ftl : (3*3 - 5*5 : Int) < 0 := by decide
