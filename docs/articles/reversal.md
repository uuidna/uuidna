---
title: "The reversal"
description: "Computed from lean/Reversal.lean — 6 sealed theorems, every claim citing its proof."
---

# The reversal

> REVERSAL — why undoing an INVOLUTION and undoing a PATH are different acts, and where the walk never goes. — held by [reflection_reverses_uniquely](/theorem/reflection_reverses_uniquely) and its 5 siblings below.

**6 theorems**, from [reflection_reverses_uniquely](/theorem/reflection_reverses_uniquely) onward, each proven `by decide` in [lean/Reversal.lean](/lean/Reversal.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [doubling_reverses_ambiguously](/theorem/doubling_reverses_ambiguously). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FReversal.lean)** — nothing to install. The editor fetches `lean/Reversal.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### UNDOING A REFLECTION ALWAYS WORKS AND IS NEVER AMBIGUOUS: every digit has exactly ONE preimage under dz — the census is ten ones — and reflecting twice returns each digit to itself. One way in, one way out, everywhere.
The ledger holds this as [reflection_reverses_uniquely](/theorem/reflection_reverses_uniquely) — proven `by decide`, sorry-free:

```lean
((List.range 10).map (preOf dz) = [1,1,1,1,1,1,1,1,1,1]) ∧ ((List.range 10).all (fun d => dz (dz d) == d))
```

### UNDOING A DOUBLING CAN BE AMBIGUOUS: the digit 0 has TWO preimages, since 0 and 9 both double onto it, so a path arriving at 0 cannot say which digit it came from. That is the first way a path reversal fails where an involution reversal cannot.
The ledger holds this as [doubling_reverses_ambiguously](/theorem/doubling_reverses_ambiguously) — proven `by decide`, sorry-free:

```lean
(preOf dbl 0 = 2) ∧ (dbl 0 = 0) ∧ (dbl 9 = 0) ∧ (preOf dbl 0 ≠ 1)
```

### AND THE UNEXPLORED DIGIT: 9 has ZERO preimages under doubling — nothing doubles onto it, so the forward walk never arrives there and no reversal can leave from it. Nine is not merely hard to reach; it is outside the image, and the line proves the count is zero rather than small.
The ledger holds this as [nine_is_never_reached](/theorem/nine_is_never_reached) — proven `by decide`, sorry-free:

```lean
(preOf dbl 9 = 0) ∧ ((List.range 10).all (fun d => dbl d != 9))
```

### THE TWO MAPS DIFFER IN KIND, and the line exhibits it rather than asserting it: dz's preimage census is ten ones, doubling's is [2,1,1,1,1,1,1,1,1,0], and the two lists are not equal. Both sum to ten — every digit goes somewhere — but only one of them arrives everywhere exactly once.
The ledger holds this as [censuses_differ](/theorem/censuses_differ) — proven `by decide`, sorry-free:

```lean
((List.range 10).map (preOf dz) ≠ (List.range 10).map (preOf dbl)) ∧ ([1,1,1,1,1,1,1,1,1,1].foldl (· + ·) 0 = 10) ∧ ([2,1,1,1,1,1,1,1,1,0].foldl (· + ·) 0 = 10)
```

### REVERSING A PATH IS NOT REVERSING A STEP: undoing dz-then-doubling requires undoing the doubling FIRST and the reflection second, so the path inherits doubling's failures. Where doubling is ambiguous or undefined the path cannot be walked backwards, even though every reflection in it could be undone on its own.
The ledger holds this as [path_reverse_needs_both](/theorem/path_reverse_needs_both) — proven `by decide`, sorry-free:

```lean
(preOf dbl 0 ≠ 1) ∧ (preOf dbl 9 = 0) ∧ ((List.range 10).all (fun d => preOf dz d == 1))
```

### THE REFLECTION LEAVES NOTHING UNEXPLORED: its image is all ten digits, so no digit is outside it, while doubling's image holds nine. Ten against nine — the missing one is the digit no doubling produces.
The ledger holds this as [reflection_explores_all](/theorem/reflection_explores_all) — proven `by decide`, sorry-free:

```lean
(((List.range 10).map dz).eraseDups.length = 10) ∧ (((List.range 10).map dbl).eraseDups.length = 9) ∧ (10 ≠ 9)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
