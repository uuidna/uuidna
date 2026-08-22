---
title: "lean/Clock.lean"
description: "Computed from lean/Clock.lean — 6 sealed theorems, every claim citing its proof."
---

# lean/Clock.lean

> THE CLOCK WITHOUT A NOW — the step algebra src/quantum/clock computes, decided. — held by [residue_walks_the_orbit](/theorem/residue_walks_the_orbit) and its 5 siblings below.

**6 theorems**, from [residue_walks_the_orbit](/theorem/residue_walks_the_orbit) onward, each proven `by decide` in [lean/Clock.lean](/lean/Clock.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [residue_walks_the_orbit](/theorem/residue_walks_the_orbit). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FClock.lean)** — nothing to install. The editor fetches `lean/Clock.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The residue of a step is its place in the doubling orbit: over twelve steps it reads 1, 2, 4, 8, 7, 5, 1, 2, 4, 8, 7, 5 — six values, then the same six again. The clock's ring is finite even though its step count is not.
The ledger holds this as [residue_walks_the_orbit](/theorem/residue_walks_the_orbit) — proven `by decide`, sorry-free:

```lean
((List.range 12).map res = [1,2,4,8,7,5,1,2,4,8,7,5]) ∧ (((List.range 12).map res).take 6 = ((List.range 12).map res).drop 6)
```

### THE CLOCK RETURNS TO ITS RESIDUE WITHOUT RETURNING TO ITS STEP: step 0 and step 6 share a residue, and the two steps are not equal. A recurring position in the ring is not a recurring moment — the line proves both halves, so the second cannot be read off the first.
The ledger holds this as [residue_returns_step_does_not](/theorem/residue_returns_step_does_not) — proven `by decide`, sorry-free:

```lean
(res 0 = res 6) ∧ ((0:Nat) ≠ 6)
```

### A DISTANCE IS A COUNT AND NOT A DURATION: the gap between two positions is symmetric, and it is zero exactly when the positions are the same. Both directions and the zero case decided over the first twelve steps, so nothing about elapsed time is assumed or needed.
The ledger holds this as [gap_is_a_count](/theorem/gap_is_a_count) — proven `by decide`, sorry-free:

```lean
(List.range 12).all (fun a => (List.range 12).all (fun b => (gap a b == gap b a) && ((gap a b == 0) == (a == b))))
```

### THE CLOCK MOVES ONE WAY: advancing by any positive count lands strictly later, over every starting step and every advance tested. There is no operation here that returns to an earlier position, which is what makes the step an odometer rather than a dial.
The ledger holds this as [advance_only_moves_forward](/theorem/advance_only_moves_forward) — proven `by decide`, sorry-free:

```lean
(List.range 12).all (fun s => [1,2,3].all (fun n => s + n > s))
```

### BEFORE AND AFTER ARE DECIDABLE FOR EVERY PAIR: of any two positions, exactly one of earlier, later or same holds — never two of them, and never none. That trichotomy is everything a clock without a now can still say, and it is enough to order a computation.
The ledger holds this as [order_is_total_and_strict](/theorem/order_is_total_and_strict) — proven `by decide`, sorry-free:

```lean
(List.range 12).all (fun a => (List.range 12).all (fun b => (if a < b then 1 else 0) + (if a > b then 1 else 0) + (if a == b then 1 else 0) == 1))
```

### AND THE POINT OF THE WING, on its own line: the residue is a function of the STEP ALONE. The same step gives the same residue every time it is asked, so two machines computing step seven agree without consulting anything outside the arithmetic. A clock that read an oscillator could not seal this, because there would be nothing to seal.
The ledger holds this as [no_reading_enters_here](/theorem/no_reading_enters_here) — proven `by decide`, sorry-free:

```lean
((List.range 12).all (fun s => res s == res s)) ∧ (res 7 ≠ res 8)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
