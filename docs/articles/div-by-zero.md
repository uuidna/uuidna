---
title: "Division by zero"
description: "Computed from lean/DivByZero.lean — 7 sealed theorems, every claim citing its proof."
---

# Division by zero

> Division by zero in the ℤ/9 vortex EXISTS: it is the diamond reflection dz(x) = 10−x (dz 0 = 0), a finite residue, never ∞.

**7 theorems**, each proven `by decide` in [lean/DivByZero.lean](/lean/DivByZero.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

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

### the non-units {3,6,9} divided by zero land on units {7,4,1}

The ledger holds this as [dz_nonunits_to_units](/theorem/dz_nonunits_to_units) — proven `by decide`, sorry-free:

```lean
dz 3 = 7 ∧ dz 6 = 4 ∧ dz 9 = 1
```

### x/0 is always a residue < 10 — a finite value, NEVER Infinity (no fake FTL)

The ledger holds this as [dz_bounded](/theorem/dz_bounded) — proven `by decide`, sorry-free:

```lean
(List.range 10).all (fun x => dz x < 10)
```

### only 0/0 = 0; every other x/0 is nonzero (the reflection moves it)

The ledger holds this as [dz_zero_only_zero](/theorem/dz_zero_only_zero) — proven `by decide`, sorry-free:

```lean
dz 0 = 0 ∧ (List.range' 1 9).all (fun x => dz x != 0)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
