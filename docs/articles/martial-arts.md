---
title: "The stance and the angle"
description: "Computed from lean/MartialArts.lean — 4 sealed theorems, every claim citing its proof."
---

# The stance and the angle

> MARTIAL ARTS — the arithmetic of stance and angle: the complement map's fixed point is the half (one law at 90, 100 and the ledger's 10), the supplement pair, the chain's off-by-one, the exact lever ratio. Facts about NUMBERS: nothing here claims anything about technique, force, physiology or effectiveness. — held by [complement_fixes_the_half](/theorem/complement_fixes_the_half) and its 3 siblings below.

**4 theorems**, from [complement_fixes_the_half](/theorem/complement_fixes_the_half) onward, each proven `by decide` in [lean/MartialArts.lean](/lean/MartialArts.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

### THE BALANCED SPLIT IS A FIXED POINT, at every scale the arts measure in: the complement map c(x) = w − x sends x to what is left of the whole, and it fixes exactly the half — 90 − 45 = 45 for the angle, 100 − 50 = 50 for the weight split, 10 − 5 = 5 for the ledger's own diamond involution dz(x) = 10 − x whose unique fixed point is 5 (diamond_involution, DIAMOND_FIXED = [5]). The 45° line and the even stance are not separate facts about bodies; they are one arithmetic fact about complements, and the ledger already proved it at 10. One law, three scales.
The ledger holds this as [complement_fixes_the_half](/theorem/complement_fixes_the_half) — proven `by decide`, sorry-free:

```lean
(90 - 45 = 45) ∧ (100 - 50 = 50) ∧ (10 - 5 = 5)
```

### An angle and its supplement complete the straight angle: 30 + 150 = 180, and the pair is ordered (30 < 150) — so naming one names the other. The arts speak of an opening and the angle you leave; as arithmetic that is complementation on 180, the same reflection the colour wheel runs on ℤ/12 and the diamond runs on 10. Geometry of the pair, not a claim about escaping anything.
The ledger holds this as [supplement_completes_the_straight](/theorem/supplement_completes_the_straight) — proven `by decide`, sorry-free:

```lean
(30 + 150 = 180) ∧ (30 < 150)
```

### A chain of n links has n − 1 joints: the five named segments of a kinetic chain (ground, hips, shoulders, arm, hand) meet at four joints, 5 − 1 = 4. It is the same off-by-one that governs every path: n stations, n − 1 steps between them — the counting fact the frame ring and the imprint chain both pay. A count of segments, never a claim about power.
The ledger holds this as [chain_joints_are_links_minus_one](/theorem/chain_joints_are_links_minus_one) — proven `by decide`, sorry-free:

```lean
5 - 1 = 4
```

### The ratio of two lever arms is exact division when one divides the other: 8 / 4 = 2, and the ratio is recovered by multiplying back, 2 * 4 = 8. The arts describe a longer arm as an advantage; what is sealed is only that the RATIO is exact arithmetic — no force, no torque, no mechanical claim, which would need units and a model the ledger does not carry.
The ledger holds this as [lever_ratio_is_exact_division](/theorem/lever_ratio_is_exact_division) — proven `by decide`, sorry-free:

```lean
(8 / 4 = 2) ∧ (2 * 4 = 8)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
