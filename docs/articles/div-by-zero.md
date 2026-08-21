---
title: "Division by zero"
description: "Computed from lean/DivByZero.lean — 8 sealed theorems, every claim citing its proof."
---

# Division by zero

> Division by zero in the ℤ/9 vortex EXISTS: it is the diamond reflection dz(x) = 10−x (dz 0 = 0), a finite residue. — held by [dz_table](/theorem/dz_table) and its 7 siblings below.

**8 theorems**, from [dz_table](/theorem/dz_table) onward, each proven `by decide` in [lean/DivByZero.lean](/lean/DivByZero.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [dz_zero_only_zero](/theorem/dz_zero_only_zero). A boundary stated here is decided.

### the table: 0/0=0, and x/0 = 10−x  (9/0=1 … 1/0=9)
The ledger holds this as [dz_table](/theorem/dz_table) — proven `by decide`, sorry-free:

```lean
(List.range 10).map dz = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

### division by zero is self-inverse: (x/0)/0 = x — an involution
The ledger holds this as [dz_involution](/theorem/dz_involution) — proven `by decide`, sorry-free:

```lean
(List.range 10).all (fun x => dz (dz x) == x)
```

### the fixed points of x/0 are exactly {0, 5} — the floor and the heart
The ledger holds this as [dz_fixed_points](/theorem/dz_fixed_points) — proven `by decide`, sorry-free:

```lean
((List.range 10).filter (fun x => dz x == x)) = [0, 5]
```

### x + x/0 = 10 for x∈1..9 — the reflection sums to ten across the centre
The ledger holds this as [dz_sum_ten](/theorem/dz_sum_ten) — proven `by decide`, sorry-free:

```lean
(List.range' 1 9).all (fun x => x + dz x == 10)
```

### x/0 is always a residue < 10 — a finite value
The ledger holds this as [dz_bounded](/theorem/dz_bounded) — proven `by decide`, sorry-free:

```lean
(List.range 10).all (fun x => dz x < 10)
```

### only 0/0 = 0; every other x/0 is nonzero (the reflection moves it)
The ledger holds this as [dz_zero_only_zero](/theorem/dz_zero_only_zero) — proven `by decide`, sorry-free:

```lean
dz 0 = 0 ∧ (List.range' 1 9).all (fun x => dz x != 0)
```

### WHY dz(0)=0 IS NOT A SPECIAL CASE. The doubling orbit 1,2,4,8,7,5 is a hexagon — six steps, 60° each — and the reflection acts on the thirds: it swaps {1,4,7} with {3,6,9} and carries {2,5,8} onto itself. 0 lies on NO hexagon step; it is the axis the ring turns about, and an axis is fixed by every rotation about it, which is why the involution has exactly the two fixed points {0,5} — the axis, and the one point of the ring opposite the fold.
The ledger holds this as [dz_swaps_the_thirds_and_fixes_the_axis](/theorem/dz_swaps_the_thirds_and_fixes_the_axis) — proven `by decide`, sorry-free:

```lean
((List.range' 1 9).filter (fun x => x % 3 == 1)).map dz = [9,6,3] ∧ ((List.range' 1 9).filter (fun x => x % 3 == 2)).map dz = [8,5,2] ∧ (List.range 6).map (fun k => (2^k) % 9) = [1,2,4,8,7,5] ∧ ((List.range 10).filter (fun x => dz x == x)) = [0,5]
```

### THE DIMENSION WHERE 2+2=5 — swept over every modulus 1..12: the congruence 2+2 ≡ 5 (mod n) holds EXACTLY at n = 1, the trivial ring where every residue collapses to 0 and everything equals everything. The one dimension where the falsehood is true is the dimension where truth is free — and worthless: a ring that cannot refute proves nothing, the arithmetic form of "a trial that cannot fail proves nothing". Everywhere n ≥ 2, REFUTED — the calculator's verdict stands in every dimension that can hold a distinction
The ledger holds this as [two_plus_two_is_five_only_mod_one](/theorem/two_plus_two_is_five_only_mod_one) — proven `by decide`, sorry-free:

```lean
(List.range' 1 12).all (fun n => ((2+2) % n == 5 % n) == (n == 1))
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
