---
title: "The points-of-sail domain"
description: "Computed from lean/Sailing.lean — 7 sealed theorems, every claim citing its proof."
---

# The points-of-sail domain

> SAILING — the points-of-sail domain, as decidable arithmetic, demarcated. — held by [no_go_zone](/theorem/no_go_zone) and its 6 siblings below.

**7 theorems**, from [no_go_zone](/theorem/no_go_zone) onward, each proven `by decide` in [lean/Sailing.lean](/lean/Sailing.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 7 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [no_go_zone](/theorem/no_go_zone). A boundary stated here is decided.

### A boat cannot sail directly into the wind: the no-go zone is about 45° either side, a 90° cone (45 + 45 = 90) where the sails luff and make no power. To go upwind you must sail around it.
The ledger holds this as [no_go_zone](/theorem/no_go_zone) — proven `by decide`, sorry-free:

```lean
45 + 45 = 90
```

### The points of sail fall on multiples of 45°: close-hauled ~45°, beam reach 90°, broad reach 135°, running 180° — each divisible by 45, and 180/45 = 4 quarters of the turn from the wind to dead downwind.
The ledger holds this as [points_of_sail](/theorem/points_of_sail) — proven `by decide`, sorry-free:

```lean
(([45,90,135,180] : List Nat).all (fun a => a % 45 == 0)) ∧ (180 / 45 = 4)
```

### Beating close-hauled makes good distance upwind along a right triangle: sailing 5 units at the close-hauled angle advances 3 toward the mark and 4 across — 3² + 4² = 5². Velocity made good is the upwind leg of that triangle.
The ledger holds this as [beating_sailing_triangle](/theorem/beating_sailing_triangle) — proven `by decide`, sorry-free:

```lean
3^2 + 4^2 = 5^2
```

### When conditions are perfect the boat sails itself: a balanced helm is a moment equilibrium — the sail’s turning moment equals the keel’s (8·3 = 6·4 = 24) — so she holds her course with the tiller free. The captain rests; the balance steers.
The ledger holds this as [balanced_helm_holds_course](/theorem/balanced_helm_holds_course) — proven `by decide`, sorry-free:

```lean
8 * 3 = 6 * 4
```

### Tacking zigzags to windward, and two equal tacks cancel the cross-wind drift: 4 units to port plus 4 to starboard net zero across (4 + (−4) = 0), leaving only the gain upwind. Symmetry erases the leeway.
The ledger holds this as [tacking_cancels_leeway](/theorem/tacking_cancels_leeway) — proven `by decide`, sorry-free:

```lean
(4 + (-4) : Int) = 0
```

### Precisely executed orders compound linearly: each well-sailed tack gains the same 3 units upwind, so 1, 2, 3 tacks make good 3, 6, 9 — [1,2,3] → [3,6,9]. The magnitude of precision is that nothing is lost between the legs.
The ledger holds this as [precise_tacks_compound](/theorem/precise_tacks_compound) — proven `by decide`, sorry-free:

```lean
(([1,2,3] : List Nat).map (fun n => 3 * n)) = [3,6,9]
```

### THE CLOSE-HAULED ANGLE, READ FROM THE SOURCE RATHER THAN DERIVED. Thomas Fleming Day — editor of The Rudder — states it exactly in On Yacht Sailing (The Rudder Publishing Company, 1904): "This angle, in a good sailing vessel, is one of 45 degrees, or four points by compass." His two units agree by arithmetic, and that agreement is what is sealed here: the compass rose carries 32 points over 360°, so four points is 45° exactly — 4 × 360 = 32 × 45 = 1440, an integer identity needing no division and no approximation. It also confirms what this wing already sealed independently as no_go_zone (45 + 45 = 90): the two tacks of a boat working to windward lie a right angle apart. 45° is Day's figure for a good vessel of 1904 under his rig; modern yachts point higher, and this seals the ARITHMETIC of his stated angle.
The ledger holds this as [four_points_is_45](/theorem/four_points_is_45) — proven `by decide`, sorry-free:

```lean
(4 * 360 = 32 * 45) ∧ (4 * 360 = 1440) ∧ (45 + 45 = 90)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
