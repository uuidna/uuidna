---
title: "The grid"
description: "Computed from lean/Grid.lean — 6 sealed theorems, every claim citing its proof."
---

# The grid

> THE GRID RULE, BASE-AGNOSTIC — the growth law stated so it does not depend on how numbers are written. — held by [decimal_asks_three](/theorem/decimal_asks_three) and its 5 siblings below.

**6 theorems**, from [decimal_asks_three](/theorem/decimal_asks_three) onward, each proven `by decide` in [lean/Grid.lean](/lean/Grid.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [fifteen_satisfies_both](/theorem/fifteen_satisfies_both). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FGrid.lean)** — nothing to install. The editor fetches `lean/Grid.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE BASE-TEN RULE: 6w carries digital root nine exactly when w is a multiple of three, since the decimal digit-sum invariant is mod 9 and gcd(6,9) = 3. Wings three at a time — a consequence of writing in ten.
The ledger holds this as [decimal_asks_three](/theorem/decimal_asks_three) — proven `by decide`, sorry-free:

```lean
((List.range 40).all (fun w => ((6 * w) % 9 == 0) == (w % 3 == 0))) ∧ ((6 * 91) % 9 ≠ 0)
```

### THE BASE-SIXTEEN RULE: the hexadecimal digit-sum invariant is mod 15 (since 16 = 1 mod 15), so 6w vanishes there exactly when w is a multiple of FIVE. The same grid, the same six rays, a different demand — and the addresses this ledger computes are written in sixteen.
The ledger holds this as [hexadecimal_asks_five](/theorem/hexadecimal_asks_five) — proven `by decide`, sorry-free:

```lean
((List.range 40).all (fun w => ((6 * w) % 15 == 0) == (w % 5 == 0))) ∧ ((6 * 72) % 15 ≠ 0)
```

### AND THE SEALED WIDTH SATISFIES ONE BASE ONLY: 6 x 72 = 432 leaves 0 mod 9 and 12 mod 15. The count the grid was fitted to is harmonic in decimal and unremarkable in hexadecimal, which the line proves rather than leaves to be noticed.
The ledger holds this as [seventytwo_is_decimal_only](/theorem/seventytwo_is_decimal_only) — proven `by decide`, sorry-free:

```lean
(6 * 72 = 432) ∧ (432 % 9 = 0) ∧ (432 % 15 = 12) ∧ (432 % 15 ≠ 0)
```

### THE FUSION IS DECIMAL SPELLING, shown in the base the addresses use: 72 is 0x48, its hex reversal is 0x84 = 132, and 16 x 132 = 2112 rather than 432. The identity that fused the two factorisations holds for one spelling in one base and nowhere else.
The ledger holds this as [reversal_fails_in_hexadecimal](/theorem/reversal_fails_in_hexadecimal) — proven `by decide`, sorry-free:

```lean
(16 * 27 = 432) ∧ (16 * 132 = 2112) ∧ (16 * 132 ≠ 432)
```

### THE BASE-AGNOSTIC RULE: a wing count divisible by FIFTEEN satisfies decimal and hexadecimal at once, because lcm(3,5) = 15. Such a rule holds whatever base a reader writes in, which is the only kind worth gating on — and 90 is the first count in range that meets it.
The ledger holds this as [fifteen_satisfies_both](/theorem/fifteen_satisfies_both) — proven `by decide`, sorry-free:

```lean
((List.range 40).all (fun w => (w % 15 == 0) == (((6 * w) % 9 == 0) && ((6 * w) % 15 == 0)))) ∧ (90 % 15 = 0) ∧ (91 % 15 ≠ 0)
```

### AND WHAT SURVIVES UNTOUCHED: the six is derived. Seven dimensions less the identity ray, because projecting a wing into the language it is already written in computes nothing — 7 x 72 - 72 = 432 = 6 x 72. The multiplier was never the problem; only the constant it was multiplied to.
The ledger holds this as [six_rays_stay_derived](/theorem/six_rays_stay_derived) — proven `by decide`, sorry-free:

```lean
(7 * 72 - 72 = 432) ∧ (6 * 72 = 432) ∧ (7 - 1 = 6)
```


::: warning 
THE GRID RULE, BASE-AGNOSTIC — the growth law stated so it does not depend on how numbers are written. The boundary is confirmed by the wing's own sealed theorems — e.g. [decimal_asks_three](/theorem/decimal_asks_three) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
