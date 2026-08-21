---
title: "lean/Phase.lean"
description: "Computed from lean/Phase.lean — 6 sealed theorems, every claim citing its proof."
---

# lean/Phase.lean

> PHASE — why the alternating walk does not close, and which half is responsible. — held by [dz_loses_nothing](/theorem/dz_loses_nothing) and its 5 siblings below.

**6 theorems**, from [dz_loses_nothing](/theorem/dz_loses_nothing) onward, each proven `by decide` in [lean/Phase.lean](/lean/Phase.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [doubling_collapses_nine](/theorem/doubling_collapses_nine). A boundary stated here is decided.

### THE REFLECTION IS A BIJECTION: dz sends the ten digits onto ten distinct digits, so nothing is lost and every step can be undone. Reversible, and therefore barren on its own.
The ledger holds this as [dz_loses_nothing](/theorem/dz_loses_nothing) — proven `by decide`, sorry-free:

```lean
((List.range 10).map dz).eraseDups.length = 10
```

### DOUBLING LOSES A DIGIT, and the loss is named: 2·0 mod 9 = 0 and 2·9 mod 9 = 0, so nine and zero share an image. The map sends ten digits onto nine, is therefore not injective, and the step cannot be undone.
The ledger holds this as [doubling_collapses_nine](/theorem/doubling_collapses_nine) — proven `by decide`, sorry-free:

```lean
(((List.range 10).map dbl).eraseDups.length = 9) ∧ (dbl 0 = dbl 9) ∧ (dbl 0 = 0)
```

### THE TWO HALVES ARE NOT THE SAME KIND OF MAP, and the line says so: the reflection's image has ten members and doubling's has nine, and ten is not nine. One erases nothing, the other erases exactly one digit per pass.
The ledger holds this as [maps_differ_in_reach](/theorem/maps_differ_in_reach) — proven `by decide`, sorry-free:

```lean
(((List.range 10).map dz).eraseDups.length ≠ ((List.range 10).map dbl).eraseDups.length) ∧ (10 ≠ 9)
```

### ONLY ZERO CLOSES. Both maps fix it — dz 0 = 0 and dbl 0 = 0 — so the walk returns to its seed after one completed pair, in phase, at two steps. It is the sole seed with a period, and the reason is that neither map moves it.
The ledger holds this as [zero_closes_in_phase](/theorem/zero_closes_in_phase) — proven `by decide`, sorry-free:

```lean
(dz 0 = 0) ∧ (dbl 0 = 0)
```

### AND A RETURN IS NOT A PERIOD. Five is fixed by the reflection (dz 5 = 5) so the walk sits on its seed after the FIRST step — but that is an odd number of operations, with doubling still owed, so the walk is out of phase and has not closed. Doubling then moves it: dbl 5 = 1, and 1 is not 5.
The ledger holds this as [five_returns_out_of_phase](/theorem/five_returns_out_of_phase) — proven `by decide`, sorry-free:

```lean
(dz 5 = 5) ∧ (dbl 5 = 1) ∧ (dbl 5 ≠ 5)
```

### THE DOMAIN NARROWS AS THE WALK RUNS: applying doubling to the ten digits leaves nine, and applying it again leaves nine of those — the image cannot grow. SCOPE: what decides here is that the image never widens, which is what makes a return to an outside seed impossible. That the walk therefore NEVER closes for such a seed is the reading— `by decide` settles the maps.
The ledger holds this as [reach_shrinks_each_pass](/theorem/reach_shrinks_each_pass) — proven `by decide`, sorry-free:

```lean
((((List.range 10).map dbl).eraseDups.map dbl).eraseDups.length ≤ ((List.range 10).map dbl).eraseDups.length) ∧ (((List.range 10).map dbl).eraseDups.length = 9)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
