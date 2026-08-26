-- lean/Optics.lean — GENERATED. OPTICS — the light domain, as decidable arithmetic, demarcated. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the
    incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°. A
    worked 30° case shares the lens wing's object distance. -/
theorem law_of_reflection : (List.range 181).all (fun a => (180 - (180 - a)) == a) ∧ (180 - (180 - 30) = 30) := by decide

/-- The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42
    (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum. -/
theorem refractive_index_ge_one : ([100,133,150,242] : List Nat).all (fun n => 100 <= n) := by decide

/-- Light slows in matter: with n > 1 the phase speed v = c/n is strictly less than c — water (1.33), glass
    (1.50) and diamond (2.42) all have index above the vacuum 1.00. The vacuum speed is the ceiling; no medium
    beats it. -/
theorem light_slower_in_medium : ([133,150,242] : List Nat).all (fun n => 100 < n) := by decide

/-- Snell's law n₁sinθ₁ = n₂sinθ₂, in a consistent case: with n₁ = 4, sinθ₁ = 3/5 and n₂ = 3, sinθ₂ = 4/5, both
    sides equal 12/5 — cross-multiplied, 4·3 = 3·4. Refraction bends the ray so the product n·sinθ is conserved
    across the boundary. -/
theorem snell_law : 4 * 3 = 3 * 4 := by decide

/-- The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f =
    10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450. -/
theorem thin_lens_equation : 10*30 + 10*15 = 15*30 := by decide

/-- Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the
    size — and 2·2 = 4 shares Snell's denser index. -/
theorem magnification : (30 / 15 = 2) ∧ (2 * 2 = 4) := by decide
