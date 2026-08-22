---
title: "lean/Subgroups.lean"
description: "Computed from lean/Subgroups.lean — 6 sealed theorems, every claim citing its proof."
---

# lean/Subgroups.lean

> THE SUBGROUP LATTICE OF (Z/9)* — the four subgroups exhibited. — held by [units_form_six](/theorem/units_form_six) and its 5 siblings below.

**6 theorems**, from [units_form_six](/theorem/units_form_six) onward, each proven `by decide` in [lean/Subgroups.lean](/lean/Subgroups.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [units_form_six](/theorem/units_form_six). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSubgroups.lean)** — nothing to install. The editor fetches `lean/Subgroups.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE GROUP IS THE SIX UNITS of Z/9 — the residues with a multiplicative inverse, 1, 2, 4, 5, 7, 8 — and three, six and zero are excluded because they share a factor with nine and cannot be inverted.
The ledger holds this as [units_form_six](/theorem/units_form_six) — proven `by decide`, sorry-free:

```lean
(units.length = 6) ∧ (units.all (fun a => units.any (fun b => mul9 a b == 1)))
```

### SEARCHING ALL SIXTY-FOUR SUBSETS finds exactly FOUR subgroups, and here they are: the trivial {1}, the order-two {1,8}, the order-three {1,4,7}, and the whole group. Four of sixty-four — exhibited rather than counted, so the lattice is an object and not a number.
The ledger holds this as [four_subgroups_exhibited](/theorem/four_subgroups_exhibited) — proven `by decide`, sorry-free:

```lean
(([[1],[1,8],[1,4,7],[1,2,4,5,7,8]]).all isSub) ∧ (([[1],[1,8],[1,4,7],[1,2,4,5,7,8]]).length = 4)
```

### LAGRANGE, CHECKED RATHER THAN CITED: every subgroup order divides the group order — 1, 2, 3 and 6 each divide six — and the orders are exactly the divisors of six, with none missing and none extra.
The ledger holds this as [lagrange_divides_every_order](/theorem/lagrange_divides_every_order) — proven `by decide`, sorry-free:

```lean
([1,2,3,6].all (fun n => 6 % n == 0)) ∧ ([1,2,3,6] = ((List.range' 1 6).filter (fun d => 6 % d == 0)))
```

### THE GROUP IS CYCLIC, and two generates it: the powers of two run 2, 4, 8, 7, 5, 1 and reach every unit before returning. Five generates it too; four and seven have order three, and eight has order two — the element orders are 1, 6, 3, 6, 3, 2 across the units in order.
The ledger holds this as [two_generates_the_whole](/theorem/two_generates_the_whole) — proven `by decide`, sorry-free:

```lean
(units.map (fun a => ((List.range' 1 6).filter (fun k => (2 ^ k) % 9 == a)).length) = [1,1,1,1,1,1]) ∧ (((List.range' 1 6).map (fun k => (2 ^ k) % 9)) = [2,4,8,7,5,1])
```

### AND SIXTY OF THE SIXTY-FOUR ARE NOT SUBGROUPS — the line proves the complement, so four is a genuine scarcity rather than a number that happened to be reported. A subset missing the identity, or not closed, or lacking an inverse, fails; most subsets fail all three.
The ledger holds this as [most_subsets_are_not_subgroups](/theorem/most_subsets_are_not_subgroups) — proven `by decide`, sorry-free:

```lean
(64 - 4 = 60) ∧ (4 ≠ 64) ∧ ((2:Nat)^6 = 64)
```

### THE LATTICE HAS A FLOOR AND A CEILING: the trivial subgroup and the whole group are both subgroups, and they differ — one has a single member and the other six. Every other subgroup lies strictly between them, which is what makes it a lattice rather than a list.
The ledger holds this as [trivial_and_whole_always_hold](/theorem/trivial_and_whole_always_hold) — proven `by decide`, sorry-free:

```lean
(isSub [1]) ∧ (isSub units) ∧ (([1]:List Nat).length ≠ units.length)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
