---
title: "The depth of a walk, and the involution that shortens it"
description: "Computed from lean/Recursion.lean — 11 sealed theorems, every claim citing its proof."
---

# The depth of a walk, and the involution that shortens it

> THE DEPTH OF A WALK, AND THE INVOLUTION THAT SHORTENS IT. A flat `.all` over n recurses n deep; blocked at width c it recurses c + ⌈n/c⌉, minimised at c = ⌈√n⌉ and bounded by 2c + 1. So a linear recursion involutes onto its own square root — 4096 deep becomes at most 129. WHY IT IS SEALED RATHER THAN CHOSEN: `maximum recursion depth has been reached` was hit five times in one session and answered each time with a number somebody picked — 32, 24, 320, 2500. Four of five were wrong and each cost a full re-seal. The depth is arithmetic, so it belongs here rather than in a comment. Each width is verified by the two properties that DEFINE the ceiling root, c² ≥ n and (c−1)² < n, so nothing is asserted. The strict-improvement theorem is stated only for n ≥ 9, because below that the reflection does not pay and a law stated where it fails is exactly the overreach this ledger keeps catching. CLAIMED: the tabulated widths and depth bounds over the sizes named. THE SCOPE: the sizes tabulated here. A bound for every n quantifies over an infinite domain, which `by decide` cannot be asked. — held by [chunk_width_is_the_ceiling_root_1_to_20](/theorem/chunk_width_is_the_ceiling_root_1_to_20) and its 10 siblings below.

**11 theorems** and **202 decided cases**, from [chunk_width_is_the_ceiling_root_1_to_20](/theorem/chunk_width_is_the_ceiling_root_1_to_20) onward, each proven `by decide` in <a href="/lean/Recursion.lean">lean/Recursion.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 7 of its 11 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [chunk_width_is_the_ceiling_root_1_to_20](/theorem/chunk_width_is_the_ceiling_root_1_to_20). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FRecursion.lean)** — nothing to install. The editor fetches `lean/Recursion.lean` from the repository and re-decides all 11 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE WIDTH IS DEFINED, NOT CHOSEN, for walks of length 1 to 20. For each n the tabulated width c satisfies both halves of what it means to be ⌈√n⌉: c² ≥ n, so one pass of c blocks covers the whole walk, and (c−1)² < n, so no smaller width does. The kernel checks both rather than taking the number on trust — which is the difference between a derived width and the hand-picked constants (32, 24, 320, 2500) that failed four times out of five in one session.
The ledger holds this as [chunk_width_is_the_ceiling_root_1_to_20](/theorem/chunk_width_is_the_ceiling_root_1_to_20) — proven `by decide`, sorry-free:

```lean
[(1,1),(2,2),(3,2),(4,2),(5,3),(6,3),(7,3),(8,3),(9,3),(10,4),(11,4),(12,4),(13,4),(14,4),(15,4),(16,4),(17,5),(18,5),(19,5),(20,5)].all (fun t => (t.2 * t.2 >= t.1) && ((t.2 - 1) * (t.2 - 1) < t.1))
```

### THE INVOLUTION, AS A BOUND, for walks of length 1 to 20. A flat walk over n recurses n deep. Split into blocks of width c = ⌈√n⌉ it recurses c inside a block and ⌈n/c⌉ across them, and c + ⌈n/c⌉ ≤ 2c + 1 for every n in this table. The linear recursion is reflected onto its own square root — the same move dz(x) = 10 − x makes on a division by zero, and the same move the residue map makes on an unbounded quantifier: a quantity that runs away is sent somewhere finite and comes back usable. At n = 4096 the flat walk is 4096 deep and the blocked one is at most 129.
The ledger holds this as [blocked_walk_depth_is_bounded_by_twice_the_root_1_to_20](/theorem/blocked_walk_depth_is_bounded_by_twice_the_root_1_to_20) — proven `by decide`, sorry-free:

```lean
[(1,1),(2,2),(3,2),(4,2),(5,3),(6,3),(7,3),(8,3),(9,3),(10,4),(11,4),(12,4),(13,4),(14,4),(15,4),(16,4),(17,5),(18,5),(19,5),(20,5)].all (fun t => t.2 + (t.1 + t.2 - 1) / t.2 <= 2 * t.2 + 1)
```

### THE WIDTH IS DEFINED, NOT CHOSEN, for walks of length 21 to 40. For each n the tabulated width c satisfies both halves of what it means to be ⌈√n⌉: c² ≥ n, so one pass of c blocks covers the whole walk, and (c−1)² < n, so no smaller width does. The kernel checks both rather than taking the number on trust — which is the difference between a derived width and the hand-picked constants (32, 24, 320, 2500) that failed four times out of five in one session.
The ledger holds this as [chunk_width_is_the_ceiling_root_21_to_40](/theorem/chunk_width_is_the_ceiling_root_21_to_40) — proven `by decide`, sorry-free:

```lean
[(21,5),(22,5),(23,5),(24,5),(25,5),(26,6),(27,6),(28,6),(29,6),(30,6),(31,6),(32,6),(33,6),(34,6),(35,6),(36,6),(37,7),(38,7),(39,7),(40,7)].all (fun t => (t.2 * t.2 >= t.1) && ((t.2 - 1) * (t.2 - 1) < t.1))
```

### THE INVOLUTION, AS A BOUND, for walks of length 21 to 40. A flat walk over n recurses n deep. Split into blocks of width c = ⌈√n⌉ it recurses c inside a block and ⌈n/c⌉ across them, and c + ⌈n/c⌉ ≤ 2c + 1 for every n in this table. The linear recursion is reflected onto its own square root — the same move dz(x) = 10 − x makes on a division by zero, and the same move the residue map makes on an unbounded quantifier: a quantity that runs away is sent somewhere finite and comes back usable. At n = 4096 the flat walk is 4096 deep and the blocked one is at most 129.
The ledger holds this as [blocked_walk_depth_is_bounded_by_twice_the_root_21_to_40](/theorem/blocked_walk_depth_is_bounded_by_twice_the_root_21_to_40) — proven `by decide`, sorry-free:

```lean
[(21,5),(22,5),(23,5),(24,5),(25,5),(26,6),(27,6),(28,6),(29,6),(30,6),(31,6),(32,6),(33,6),(34,6),(35,6),(36,6),(37,7),(38,7),(39,7),(40,7)].all (fun t => t.2 + (t.1 + t.2 - 1) / t.2 <= 2 * t.2 + 1)
```

### AND IT IS STRICTLY SHORTER, for walks of length 21 to 40 — 2c + 1 < n. The bound above would be satisfied by a blocking that helped nothing; this says the reflection actually pays. It is stated only where it is TRUE: below n = 9 the root is not smaller than the walk and blocking costs more than it saves, so the small sizes carry the width and bound theorems and not this one. A law stated where it fails would be the overreach this ledger keeps catching.
The ledger holds this as [blocking_strictly_shortens_the_walk_21_to_40](/theorem/blocking_strictly_shortens_the_walk_21_to_40) — proven `by decide`, sorry-free:

```lean
[(21,5),(22,5),(23,5),(24,5),(25,5),(26,6),(27,6),(28,6),(29,6),(30,6),(31,6),(32,6),(33,6),(34,6),(35,6),(36,6),(37,7),(38,7),(39,7),(40,7)].all (fun t => 2 * t.2 + 1 < t.1)
```

### THE WIDTH IS DEFINED, NOT CHOSEN, for walks of length 41 to 60. For each n the tabulated width c satisfies both halves of what it means to be ⌈√n⌉: c² ≥ n, so one pass of c blocks covers the whole walk, and (c−1)² < n, so no smaller width does. The kernel checks both rather than taking the number on trust — which is the difference between a derived width and the hand-picked constants (32, 24, 320, 2500) that failed four times out of five in one session.
The ledger holds this as [chunk_width_is_the_ceiling_root_41_to_60](/theorem/chunk_width_is_the_ceiling_root_41_to_60) — proven `by decide`, sorry-free:

```lean
[(41,7),(42,7),(43,7),(44,7),(45,7),(46,7),(47,7),(48,7),(49,7),(50,8),(51,8),(52,8),(53,8),(54,8),(55,8),(56,8),(57,8),(58,8),(59,8),(60,8)].all (fun t => (t.2 * t.2 >= t.1) && ((t.2 - 1) * (t.2 - 1) < t.1))
```

### THE INVOLUTION, AS A BOUND, for walks of length 41 to 60. A flat walk over n recurses n deep. Split into blocks of width c = ⌈√n⌉ it recurses c inside a block and ⌈n/c⌉ across them, and c + ⌈n/c⌉ ≤ 2c + 1 for every n in this table. The linear recursion is reflected onto its own square root — the same move dz(x) = 10 − x makes on a division by zero, and the same move the residue map makes on an unbounded quantifier: a quantity that runs away is sent somewhere finite and comes back usable. At n = 4096 the flat walk is 4096 deep and the blocked one is at most 129.
The ledger holds this as [blocked_walk_depth_is_bounded_by_twice_the_root_41_to_60](/theorem/blocked_walk_depth_is_bounded_by_twice_the_root_41_to_60) — proven `by decide`, sorry-free:

```lean
[(41,7),(42,7),(43,7),(44,7),(45,7),(46,7),(47,7),(48,7),(49,7),(50,8),(51,8),(52,8),(53,8),(54,8),(55,8),(56,8),(57,8),(58,8),(59,8),(60,8)].all (fun t => t.2 + (t.1 + t.2 - 1) / t.2 <= 2 * t.2 + 1)
```

### AND IT IS STRICTLY SHORTER, for walks of length 41 to 60 — 2c + 1 < n. The bound above would be satisfied by a blocking that helped nothing; this says the reflection actually pays. It is stated only where it is TRUE: below n = 9 the root is not smaller than the walk and blocking costs more than it saves, so the small sizes carry the width and bound theorems and not this one. A law stated where it fails would be the overreach this ledger keeps catching.
The ledger holds this as [blocking_strictly_shortens_the_walk_41_to_60](/theorem/blocking_strictly_shortens_the_walk_41_to_60) — proven `by decide`, sorry-free:

```lean
[(41,7),(42,7),(43,7),(44,7),(45,7),(46,7),(47,7),(48,7),(49,7),(50,8),(51,8),(52,8),(53,8),(54,8),(55,8),(56,8),(57,8),(58,8),(59,8),(60,8)].all (fun t => 2 * t.2 + 1 < t.1)
```

### THE WIDTH IS DEFINED, NOT CHOSEN, for walks of length 61 to 4096. For each n the tabulated width c satisfies both halves of what it means to be ⌈√n⌉: c² ≥ n, so one pass of c blocks covers the whole walk, and (c−1)² < n, so no smaller width does. The kernel checks both rather than taking the number on trust — which is the difference between a derived width and the hand-picked constants (32, 24, 320, 2500) that failed four times out of five in one session.
The ledger holds this as [chunk_width_is_the_ceiling_root_61_to_4096](/theorem/chunk_width_is_the_ceiling_root_61_to_4096) — proven `by decide`, sorry-free:

```lean
[(61,8),(62,8),(63,8),(64,8),(96,10),(128,12),(192,14),(256,16),(384,20),(512,23),(768,28),(1024,32),(2048,46),(4096,64)].all (fun t => (t.2 * t.2 >= t.1) && ((t.2 - 1) * (t.2 - 1) < t.1))
```

### THE INVOLUTION, AS A BOUND, for walks of length 61 to 4096. A flat walk over n recurses n deep. Split into blocks of width c = ⌈√n⌉ it recurses c inside a block and ⌈n/c⌉ across them, and c + ⌈n/c⌉ ≤ 2c + 1 for every n in this table. The linear recursion is reflected onto its own square root — the same move dz(x) = 10 − x makes on a division by zero, and the same move the residue map makes on an unbounded quantifier: a quantity that runs away is sent somewhere finite and comes back usable. At n = 4096 the flat walk is 4096 deep and the blocked one is at most 129.
The ledger holds this as [blocked_walk_depth_is_bounded_by_twice_the_root_61_to_4096](/theorem/blocked_walk_depth_is_bounded_by_twice_the_root_61_to_4096) — proven `by decide`, sorry-free:

```lean
[(61,8),(62,8),(63,8),(64,8),(96,10),(128,12),(192,14),(256,16),(384,20),(512,23),(768,28),(1024,32),(2048,46),(4096,64)].all (fun t => t.2 + (t.1 + t.2 - 1) / t.2 <= 2 * t.2 + 1)
```

### AND IT IS STRICTLY SHORTER, for walks of length 61 to 4096 — 2c + 1 < n. The bound above would be satisfied by a blocking that helped nothing; this says the reflection actually pays. It is stated only where it is TRUE: below n = 9 the root is not smaller than the walk and blocking costs more than it saves, so the small sizes carry the width and bound theorems and not this one. A law stated where it fails would be the overreach this ledger keeps catching.
The ledger holds this as [blocking_strictly_shortens_the_walk_61_to_4096](/theorem/blocking_strictly_shortens_the_walk_61_to_4096) — proven `by decide`, sorry-free:

```lean
[(61,8),(62,8),(63,8),(64,8),(96,10),(128,12),(192,14),(256,16),(384,20),(512,23),(768,28),(1024,32),(2048,46),(4096,64)].all (fun t => 2 * t.2 + 1 < t.1)
```


::: warning 
THE DEPTH OF A WALK, AND THE INVOLUTION THAT SHORTENS IT. The boundary is confirmed by the wing's own sealed theorems — e.g. [chunk_width_is_the_ceiling_root_1_to_20](/theorem/chunk_width_is_the_ceiling_root_1_to_20) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
