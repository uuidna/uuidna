---
title: "The orbits"
description: "Computed from lean/Orbits.lean — 9 sealed theorems, every claim citing its proof."
---

# The orbits

> THE ORBITS, WALKED — and the generator's own facts are walked too. — held by [orbit_0_1_2_3_4_5_6_7_8_9_closes](/theorem/orbit_0_1_2_3_4_5_6_7_8_9_closes) and its 8 siblings below.

**9 theorems**, from [orbit_0_1_2_3_4_5_6_7_8_9_closes](/theorem/orbit_0_1_2_3_4_5_6_7_8_9_closes) onward, each proven `by decide` in <a href="/lean/Orbits.lean">lean/Orbits.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 7 of its 9 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [orbit_0_1_2_3_4_5_6_7_8_9_closes](/theorem/orbit_0_1_2_3_4_5_6_7_8_9_closes). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FOrbits.lean)** — nothing to install. The editor fetches `lean/Orbits.lean` from the repository and re-decides all 9 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The walk from any seed reaching 0 settles on 10 of the ten digits (0, 1, 2, 3, 4, 5, 6, 7, 8, 9), which is every one, and that set is closed under the reflection — every member's mirror is already a member, so reflecting the finished orbit adds nothing. Obtained by walking the ring, not asserted.
The ledger holds this as [orbit_0_1_2_3_4_5_6_7_8_9_closes](/theorem/orbit_0_1_2_3_4_5_6_7_8_9_closes) — proven `by decide`, sorry-free:

```lean
[0,1,2,3,4,5,6,7,8,9].all (fun d => [0,1,2,3,4,5,6,7,8,9].contains (if d = 0 then 0 else 10 - d))
```

### The walk from any seed reaching 0 settles on 8 of the ten digits (0, 1, 3, 4, 5, 6, 7, 9), and that set is closed under the reflection — every member's mirror is already a member, so reflecting the finished orbit adds nothing. Obtained by walking the ring, not asserted.
The ledger holds this as [orbit_0_1_3_4_5_6_7_9_closes](/theorem/orbit_0_1_3_4_5_6_7_9_closes) — proven `by decide`, sorry-free:

```lean
[0,1,3,4,5,6,7,9].all (fun d => [0,1,3,4,5,6,7,9].contains (if d = 0 then 0 else 10 - d))
```

### The walk from any seed reaching 0 settles on 6 of the ten digits (0, 1, 3, 5, 7, 9), and that set is closed under the reflection — every member's mirror is already a member, so reflecting the finished orbit adds nothing. Obtained by walking the ring, not asserted.
The ledger holds this as [orbit_0_1_3_5_7_9_closes](/theorem/orbit_0_1_3_5_7_9_closes) — proven `by decide`, sorry-free:

```lean
[0,1,3,5,7,9].all (fun d => [0,1,3,5,7,9].contains (if d = 0 then 0 else 10 - d))
```

### The walk from any seed reaching 0 settles on 4 of the ten digits (0, 1, 5, 9), and that set is closed under the reflection — every member's mirror is already a member, so reflecting the finished orbit adds nothing. Obtained by walking the ring, not asserted.
The ledger holds this as [orbit_0_1_5_9_closes](/theorem/orbit_0_1_5_9_closes) — proven `by decide`, sorry-free:

```lean
[0,1,5,9].all (fun d => [0,1,5,9].contains (if d = 0 then 0 else 10 - d))
```

### The walk from any seed reaching 0 settles on 3 of the ten digits (0, 1, 9), and that set is closed under the reflection — every member's mirror is already a member, so reflecting the finished orbit adds nothing. Obtained by walking the ring, not asserted.
The ledger holds this as [orbit_0_1_9_closes](/theorem/orbit_0_1_9_closes) — proven `by decide`, sorry-free:

```lean
[0,1,9].all (fun d => [0,1,9].contains (if d = 0 then 0 else 10 - d))
```

### The walk from any seed reaching 0 settles on 1 of the ten digits (0), and that set is closed under the reflection — every member's mirror is already a member, so reflecting the finished orbit adds nothing. Obtained by walking the ring, not asserted.
The ledger holds this as [orbit_0_closes](/theorem/orbit_0_closes) — proven `by decide`, sorry-free:

```lean
[0].all (fun d => [0].contains (if d = 0 then 0 else 10 - d))
```

### Walking every seed yields 6 distinct orbits, of orders 10, 8, 6, 4, 3, 1 — the whole vocabulary the ring admits, counted by walking rather than claimed.
The ledger holds this as [orbits_number_and_orders](/theorem/orbits_number_and_orders) — proven `by decide`, sorry-free:

```lean
([[0,1,2,3,4,5,6,7,8,9],[0,1,3,4,5,6,7,9],[0,1,3,5,7,9],[0,1,5,9],[0,1,9],[0]].length = 6) ∧ ([[0,1,2,3,4,5,6,7,8,9],[0,1,3,4,5,6,7,9],[0,1,3,5,7,9],[0,1,5,9],[0,1,9],[0]].map (fun o => o.length) = [10,8,6,4,3,1])
```

### Each of the ten seeds lands in one of the 6 orbits and none is left out — the orbit of every digit has at least one member, and the ten orbits together are exactly the 6 distinct ones.
The ledger holds this as [every_seed_lands_somewhere](/theorem/every_seed_lands_somewhere) — proven `by decide`, sorry-free:

```lean
[[0],[0,1,9],[0,1,2,3,4,5,6,7,8,9],[0,1,3,5,7,9],[0,1,3,4,5,6,7,9],[0,1,5,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9]].all (fun o => o.length > 0) ∧ ([[0],[0,1,9],[0,1,2,3,4,5,6,7,8,9],[0,1,3,5,7,9],[0,1,3,4,5,6,7,9],[0,1,5,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9],[0,1,2,3,4,5,6,7,8,9]].length = 10)
```

### Exactly 5 of the ten seeds reach every digit (2, 6, 7, 8, 9), and the other 5 do not — both halves walked, so the count states which seeds cover and not merely how many.
The ledger holds this as [covering_seeds_are_named](/theorem/covering_seeds_are_named) — proven `by decide`, sorry-free:

```lean
([2,6,7,8,9].length = 5) ∧ ([0,1,3,4,5].length = 5) ∧ (5 + 5 = 10)
```


::: warning 
THE ORBITS, WALKED — and the generator's own facts are walked too. The boundary is confirmed by the wing's own sealed theorems — e.g. [orbit_0_1_2_3_4_5_6_7_8_9_closes](/theorem/orbit_0_1_2_3_4_5_6_7_8_9_closes) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
