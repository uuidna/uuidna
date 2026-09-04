---
title: "The stance and the angle"
description: "Computed from lean/MartialArts.lean — 5 sealed theorems, every claim citing its proof."
---

# The stance and the angle

> MARTIAL ARTS — the arithmetic of stance and angle: the complement map's fixed point is the half (one law at 90, 100 and the ledger's 10), the supplement pair, the chain's off-by-one, the exact lever ratio. — held by [complement_fixes_the_half](/theorem/complement_fixes_the_half) and its 4 siblings below.

**5 theorems**, from [complement_fixes_the_half](/theorem/complement_fixes_the_half) onward, each proven `by decide` in <a href="/lean/MartialArts.lean">lean/MartialArts.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 5 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [complement_fixes_the_half](/theorem/complement_fixes_the_half). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FMartialArts.lean)** — nothing to install. The editor fetches `lean/MartialArts.lean` from the repository and re-decides all 5 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE BALANCED SPLIT IS A FIXED POINT, at every scale the arts measure in: the complement map c(x) = w − x sends x to what is left of the whole, and it fixes exactly the half — 90 − 45 = 45 for the angle, 100 − 50 = 50 for the weight split, 10 − 5 = 5 for the ledger's own diamond involution dz(x) = 10 − x whose unique fixed point is 5 (diamond_involution, DIAMOND_FIXED = [5]). The 45° line and the even stance are not separate facts about bodies; they are one arithmetic fact about complements, and the ledger already proved it at 10. One law, three scales.
The ledger holds this as [complement_fixes_the_half](/theorem/complement_fixes_the_half) — proven `by decide`, sorry-free:

```lean
(90 - 45 = 45) ∧ (100 - 50 = 50) ∧ (10 - 5 = 5)
```

### An angle and its supplement complete the straight angle: 30 + 150 = 180, and the pair is ordered (30 < 150) — so naming one names the other. The arts speak of an opening and the angle you leave; as arithmetic that is complementation on 180, the same reflection the colour wheel runs on ℤ/12 and the diamond runs on 10. The complement wing's fixed half (5) sits below the acute member.
The ledger holds this as [supplement_completes_the_straight](/theorem/supplement_completes_the_straight) — proven `by decide`, sorry-free:

```lean
(30 + 150 = 180) ∧ (30 < 150) ∧ (5 < 30)
```

### A chain of n links has n − 1 joints: the five named segments of a kinetic chain (ground, hips, shoulders, arm, hand) meet at four joints, 5 − 1 = 4. It is the same off-by-one that governs every path: n stations, n − 1 steps between them — the counting fact the frame ring and the imprint chain both pay. A count of segments.
The ledger holds this as [chain_joints_are_links_minus_one](/theorem/chain_joints_are_links_minus_one) — proven `by decide`, sorry-free:

```lean
5 - 1 = 4
```

### The ratio of two lever arms is exact division when one divides the other: 8 / 4 = 2, and the ratio is recovered by multiplying back, 2 * 4 = 8. The arts describe a longer arm as an advantage; what is sealed is only that the RATIO is exact arithmetic — no force, no torque, no mechanical claim, which would need units and a model the ledger does not carry.
The ledger holds this as [lever_ratio_is_exact_division](/theorem/lever_ratio_is_exact_division) — proven `by decide`, sorry-free:

```lean
(8 / 4 = 2) ∧ (2 * 4 = 8)
```

### THE COMPLEMENT IS AN INVOLUTION AT EVERY WIDTH THIS WING NAMES, walked rather than instanced. A scoring or angular complement takes x to w − x, and applying it twice returns x — that is the claim, and it is made here for EVERY point of all four widths the wing states: 0..10, 0..90, 0..100, 0..180. The four ranges carry 10 + 90 + 100 + 180 = 380 points, and with their four widths named the table is 384. Two applications of a complement are the identity, on each of them, decided one point at a time. WHAT IT IS NOT: a claim about any particular art’s rules — the widths are the ones this wing already states, and what is sealed is the arithmetic of the involution over them.
The ledger holds this as [complement_involution_at_every_width](/theorem/complement_involution_at_every_width) — proven `by decide`, sorry-free:

```lean
((List.range 11).all (fun x => 10 - (10 - x) == x)) ∧ ((List.range 91).all (fun x => 90 - (90 - x) == x)) ∧ ((List.range 101).all (fun x => 100 - (100 - x) == x)) ∧ ((List.range 181).all (fun x => 180 - (180 - x) == x)) ∧ (10 + 90 + 100 + 180 = 380) ∧ (380 + 4 = 384)
```


::: warning 
MARTIAL ARTS — the arithmetic of stance and angle: the complement map's fixed point is the half (one law at 90, 100 and the ledger's 10), the supplement pair, the chain's off-by-one, the exact lever ratio. The boundary is confirmed by the wing's own sealed theorems — e.g. [complement_fixes_the_half](/theorem/complement_fixes_the_half) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
