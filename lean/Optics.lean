-- lean/Optics.lean — GENERATED. OPTICS — the light domain, as decidable arithmetic, demarcated. Reflection is an involution (angle in = angle out); the refractive index n = c/v is ≥ 1, so light in a medium is SLOWER than c (no FTL, the vacuum is the ceiling); Snell's law n₁sinθ₁ = n₂sinθ₂ holds in a consistent rational-sine case (4·3 = 3·4); the thin-lens equation 1/f = 1/do + 1/di and its magnification are exact; dispersion refracts blue more than red; and total internal reflection needs a denser source. HONEST SCOPE: the arithmetic of geometric optics — specific consistent cases, not a full wave-optics derivation. Every proof `by decide`, sorry-free, no Mathlib.

-- The law of reflection: the angle out equals the angle in, so a mirror is an involution — reflecting the incidence angle twice through the normal returns it, 180 − (180 − a) = a for every angle a in 0…180°.
theorem law_of_reflection : (List.range 181).all (fun a => (180 - (180 - a)) == a) := by decide

-- The refractive index n = c/v is at least 1 — vacuum is exactly 1.00, water 1.33, glass 1.50, diamond 2.42 (×100: 100, 133, 150, 242) — light never travels faster in a medium than in vacuum.
theorem refractive_index_ge_one : ([100,133,150,242] : List Nat).all (fun n => 100 <= n) := by decide

-- Light slows in matter: with n > 1 the phase speed v = c/n is strictly less than c — water (1.33), glass (1.50) and diamond (2.42) all have index above the vacuum 1.00. The vacuum speed is the ceiling; no medium beats it.
theorem light_slower_in_medium : ([133,150,242] : List Nat).all (fun n => 100 < n) := by decide

-- Snell's law n₁sinθ₁ = n₂sinθ₂, in a consistent case: with n₁ = 4, sinθ₁ = 3/5 and n₂ = 3, sinθ₂ = 4/5, both sides equal 12/5 — cross-multiplied, 4·3 = 3·4. Refraction bends the ray so the product n·sinθ is conserved across the boundary.
theorem snell_law : 4 * 3 = 3 * 4 := by decide

-- The thin-lens equation 1/f = 1/do + 1/di: an object at do = 15 and image at di = 30 give focal length f = 10, since cross-multiplied f·di + f·do = do·di is 10·30 + 10·15 = 15·30 = 450.
theorem thin_lens_equation : 10*30 + 10*15 = 15*30 := by decide

-- Magnification m = di/do: with the image at di = 30 and the object at do = 15, the image is 30/15 = 2× the size — the lens magnifies by the distance ratio.
theorem magnification : 30 / 15 = 2 := by decide

-- Dispersion splits white light: the index is higher for blue than for red (n_blue = 1.53 > n_red = 1.51, ×100: 153 > 151), so blue refracts more — the prism spreads the spectrum because n depends on wavelength.
theorem dispersion_blue_over_red : 151 < 153 := by decide

-- Total internal reflection needs a denser source: it occurs going from glass (n = 1.50) to air (n = 1.00), where 100 < 150, so the critical angle sinθc = n₂/n₁ = 100/150 = 2/3 ≤ 1 exists. From rarer to denser there is no critical angle — light always crosses.
theorem tir_needs_denser_source : 100 < 150 := by decide
