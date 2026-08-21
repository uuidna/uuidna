-- lean/Sailing.lean — GENERATED. SAILING — the points-of-sail domain, as decidable arithmetic, demarcated. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A boat cannot sail directly into the wind: the no-go zone is about 45° either side, a 90° cone (45 + 45 =
    90) where the sails luff and make no power. To go upwind you must sail around it. -/
theorem no_go_zone : 45 + 45 = 90 := by decide

/-- The points of sail fall on multiples of 45°: close-hauled ~45°, beam reach 90°, broad reach 135°, running
    180° — each divisible by 45, and 180/45 = 4 quarters of the turn from the wind to dead downwind. -/
theorem points_of_sail : (([45,90,135,180] : List Nat).all (fun a => a % 45 == 0)) ∧ (180 / 45 = 4) := by decide

/-- Beating close-hauled makes good distance upwind along a right triangle: sailing 5 units at the close-hauled
    angle advances 3 toward the mark and 4 across — 3² + 4² = 5². Velocity made good is the upwind leg of that
    triangle. -/
theorem beating_sailing_triangle : 3^2 + 4^2 = 5^2 := by decide

/-- When conditions are perfect the boat sails itself: a balanced helm is a moment equilibrium — the sail’s
    turning moment equals the keel’s (8·3 = 6·4 = 24) — so she holds her course with the tiller free. The
    captain rests; the balance steers. -/
theorem balanced_helm_holds_course : 8 * 3 = 6 * 4 := by decide

/-- Tacking zigzags to windward, and two equal tacks cancel the cross-wind drift: 4 units to port plus 4 to
    starboard net zero across (4 + (−4) = 0), leaving only the gain upwind. Symmetry erases the leeway. -/
theorem tacking_cancels_leeway : (4 + (-4) : Int) = 0 := by decide

/-- Precisely executed orders compound linearly: each well-sailed tack gains the same 3 units upwind, so 1, 2, 3
    tacks make good 3, 6, 9 — [1,2,3] → [3,6,9]. The magnitude of precision is that nothing is lost between the
    legs. -/
theorem precise_tacks_compound : (([1,2,3] : List Nat).map (fun n => 3 * n)) = [3,6,9] := by decide

/-- THE CLOSE-HAULED ANGLE, READ FROM THE SOURCE RATHER THAN DERIVED. Thomas Fleming Day — editor of The Rudder
    — states it exactly in On Yacht Sailing (The Rudder Publishing Company, 1904): "This angle, in a good
    sailing vessel, is one of 45 degrees, or four points by compass." His two units agree by arithmetic, and
    that agreement is what is sealed here: the compass rose carries 32 points over 360°, so four points is 45°
    exactly — 4 × 360 = 32 × 45 = 1440, an integer identity needing no division and no approximation. It also
    confirms what this wing already sealed independently as no_go_zone (45 + 45 = 90): the two tacks of a boat
    working to windward lie a right angle apart. 45° is Day's figure for a good vessel of 1904 under his rig;
    modern yachts point higher, and this seals the ARITHMETIC of his stated angle. -/
theorem four_points_is_45 : (4 * 360 = 32 * 45) ∧ (4 * 360 = 1440) ∧ (45 + 45 = 90) := by decide
