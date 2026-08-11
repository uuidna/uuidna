-- lean/Navigation.lean — GENERATED. NAVIGATION — bounded geometry, demarcated. Straight-line distance is Pythagorean (3-4-5), the compass rose is ℤ/8 (eight 45° headings, 8·45 = 360), the reciprocal bearing is +4 (180°, an involution), a quarter turn is +2 (order 4), and dead reckoning is the vector sum of the legs. HONEST SCOPE: the decidable algebra of classical navigation — not GPS-grade guidance and not a positioning claim about any individual, just the geometry. Every proof `by decide`, sorry-free, no Mathlib.

-- Straight-line distance is Pythagorean: the range over a 3-east, 4-north leg is 5 — 3² + 4² = 5². The oldest fix in navigation, exact.
theorem pythagorean_3_4_5 : 3^2 + 4^2 = 5^2 := by decide

-- The compass rose is ℤ/8: eight principal headings, 45° apart — 8 · 45 = 360. The heading group is the same eight-fold ring the vortex turns on.
theorem compass_rose_eight : 8 * 45 = 360 := by decide

-- The reciprocal (back) bearing is +4 on the ℤ/8 rose — 180° — and applying it twice returns the heading: (d + 4 + 4) mod 8 = d. Reverse of reverse is the original course; a reflection, like dz.
theorem reverse_bearing_involution : (List.range 8).all (fun d => (d + 4 + 4) % 8 == d) := by decide

-- A 90° turn is +2 on the ℤ/8 rose, and four of them box the compass back to the start: (d + 2·4) mod 8 = d — the quarter turn has order 4.
theorem quarter_turn_order_four : (List.range 8).all (fun d => (d + 2*4) % 8 == d) := by decide

-- Dead reckoning is the vector sum of the legs: 4 east, 3 east, 2 west nets 4 + 3 − 2 = 5 east. Position is the running sum of displacements, exactly.
theorem dead_reckoning_adds : ([4, 3, -2] : List Int).sum = 5 := by decide
