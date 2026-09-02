---
title: "Navigation — bounded geometry"
description: "Computed from lean/Navigation.lean — 5 sealed theorems, every claim citing its proof."
---

# Navigation — bounded geometry

> NAVIGATION — bounded geometry, demarcated. — held by [pythagorean_3_4_5](/theorem/pythagorean_3_4_5) and its 4 siblings below.

**5 theorems**, from [pythagorean_3_4_5](/theorem/pythagorean_3_4_5) onward, each proven `by decide` in [lean/Navigation.lean](/lean/Navigation.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FNavigation.lean)** — nothing to install. The editor fetches `lean/Navigation.lean` from the repository and re-decides all 5 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### Straight-line distance is Pythagorean: the range over a 3-east, 4-north leg is 5 — 3² + 4² = 5². The oldest fix in navigation, exact.
The ledger holds this as [pythagorean_3_4_5](/theorem/pythagorean_3_4_5) — proven `by decide`, sorry-free:

```lean
3^2 + 4^2 = 5^2
```

### The compass rose is ℤ/8: eight principal headings, 45° apart — 8 · 45 = 360. The heading group is the same eight-fold ring the vortex turns on.
The ledger holds this as [compass_rose_eight](/theorem/compass_rose_eight) — proven `by decide`, sorry-free:

```lean
8 * 45 = 360
```

### The reciprocal (back) bearing is +4 on the ℤ/8 rose — 180° — and applying it twice returns the heading: (d + 4 + 4) mod 8 = d. Reverse of reverse is the original course; a reflection, like dz.
The ledger holds this as [reverse_bearing_involution](/theorem/reverse_bearing_involution) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun d => (d + 4 + 4) % 8 == d)
```

### A 90° turn is +2 on the ℤ/8 rose, and four of them box the compass back to the start: (d + 2·4) mod 8 = d — the quarter turn has order 4.
The ledger holds this as [quarter_turn_order_four](/theorem/quarter_turn_order_four) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun d => (d + 2*4) % 8 == d)
```

### Dead reckoning is the vector sum of the legs: 4 east, 3 east, 2 west nets 4 + 3 − 2 = 5 east. Position is the running sum of displacements, exactly.
The ledger holds this as [dead_reckoning_adds](/theorem/dead_reckoning_adds) — proven `by decide`, sorry-free:

```lean
([4, 3, -2] : List Int).sum = 5
```


::: warning 
NAVIGATION — bounded geometry, demarcated. The boundary is confirmed by the wing's own sealed theorems — e.g. [pythagorean_3_4_5](/theorem/pythagorean_3_4_5) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
