---
title: "The contribution"
description: "Computed from lean/Contribution.lean — 5 sealed theorems, every claim citing its proof."
---

# The contribution

> THE CONTRIBUTION — what the address becomes once the coins are paid. — held by [contribution_leaves_one_twentysix](/theorem/contribution_leaves_one_twentysix) and its 4 siblings below.

**5 theorems**, from [contribution_leaves_one_twentysix](/theorem/contribution_leaves_one_twentysix) onward, each proven `by decide` in [lean/Contribution.lean](/lean/Contribution.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 5 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [contribution_leaves_one_twentysix](/theorem/contribution_leaves_one_twentysix). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FContribution.lean)** — nothing to install. The editor fetches `lean/Contribution.lean` from the repository and re-decides all 5 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE DERIVATION: the address is 2^7 = 128 bits, the commission is two, and paying it leaves 126. One subtraction, one answer — 126 is the residue of a contribution and not a number selected for its shape.
The ledger holds this as [contribution_leaves_one_twentysix](/theorem/contribution_leaves_one_twentysix) — proven `by decide`, sorry-free:

```lean
((2:Nat)^7 = 128) ∧ (128 - 2 = 126) ∧ (126 + 2 = 128)
```

### THE PAIR GRID IS FORTY-TWO: seven dimensions give 7 x 7 ordered pairs, less the seven self-pairs, so 42 directions remain. And 6 x 7 = 7 x 6 exactly — the two coordinates COMMUTE, which the line proves, since a reading that they counter-rotate was refuted by this ledger before.
The ledger holds this as [directions_number_fortytwo](/theorem/directions_number_fortytwo) — proven `by decide`, sorry-free:

```lean
(7 * 7 - 7 = 42) ∧ (6 * 7 = 42) ∧ (7 * 6 = 42) ∧ (6 * 7 = 7 * 6)
```

### READ AS THREE PAIR GRIDS, the residue fits exactly: 3 x 42 = 126, the same 126 the contribution leaves. The identity is exact and the line proves it — what it does not establish is that three is the right divisor, which the next theorem states plainly.
The ledger holds this as [residue_holds_three_grids](/theorem/residue_holds_three_grids) — proven `by decide`, sorry-free:

```lean
(3 * 42 = 126) ∧ (128 - 2 = 3 * 42)
```

### AND THE 126 factors SIX ways — 1x126, 2x63, 3x42, 6x21, 7x18, 9x14 — and the arithmetic privileges none of them. That 3 x 42 meets the pair grid is a READING the subtraction does not supply; 9 x 14 and 7 x 18 are equally exact. SCOPE: what this wing derives is the 126, from the contribution. Which factor pair carries meaning is not decided here, and no line pretends otherwise.
The ledger holds this as [six_factorisations_compete](/theorem/six_factorisations_compete) — proven `by decide`, sorry-free:

```lean
(((List.range' 1 126).filter (fun d => 126 % d == 0)).length = 12) ∧ (3 * 42 = 126) ∧ (9 * 14 = 126) ∧ (7 * 18 = 126)
```

### THE ORDER IS THE LAW: contribute first, then take. Taking 126 without paying leaves 128 untouched, and 128 is not 126 — so a ledger that skipped the contribution would carry a different number, which the line proves rather than trusts. The two coins are spent.
The ledger holds this as [taking_before_paying_differs](/theorem/taking_before_paying_differs) — proven `by decide`, sorry-free:

```lean
(128 - 2 = 126) ∧ ((128:Nat) ≠ 126) ∧ (126 < 128)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
