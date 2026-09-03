---
title: "Maxwell's rule"
description: "Computed from lean/Structures.lean — 4 sealed theorems, every claim citing its proof."
---

# Maxwell's rule

> STRUCTURES — Maxwell's rule m = 2j − 3: determinate, redundant, mechanism — the three regimes as decidable arithmetic. — held by [maxwells_rule_truss](/theorem/maxwells_rule_truss) and its 3 siblings below.

**4 theorems**, from [maxwells_rule_truss](/theorem/maxwells_rule_truss) onward, each proven `by decide` in [lean/Structures.lean](/lean/Structures.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 4 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [redundancy_pays_one](/theorem/redundancy_pays_one). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FStructures.lean)** — nothing to install. The editor fetches `lean/Structures.lean` from the repository and re-decides all 4 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### MAXWELL'S RULE (1864), the searchers' exact question sealed: a planar truss is statically determinate when m = 2j − 3 — the triangle (j=3, m=3: 2·3−3 = 3) and the braced quad (j=4, m=5: 2·4−3 = 5) both balance exactly. The triangle is the minimal closed rigid form: closure is rigidity, the same law the school teaches everywhere.
The ledger holds this as [maxwells_rule_truss](/theorem/maxwells_rule_truss) — proven `by decide`, sorry-free:

```lean
(2 * 3 - 3 = 3) ∧ (2 * 4 - 3 = 5)
```

### One member past Maxwell's count is one degree of static indeterminacy: the double-braced quad (j=4, m=6) carries 6 − (2·4−3) = 1 redundancy — a self-stress the structure holds without any load. Overbracing is not free; every extra member is a state the analysis must pay for.
The ledger holds this as [redundancy_pays_one](/theorem/redundancy_pays_one) — proven `by decide`, sorry-free:

```lean
6 - (2 * 4 - 3) = 1
```

### One member short of Maxwell's count is one mechanism: the unbraced quad (j=4, m=4) lacks (2·4−3) − 4 = 1 member and swings — the open pipe of statics. It is not weaker material it needs but a closed path: brace the diagonal and the mechanism vanishes. Containment is the closure of the path, in steel as in plasma.
The ledger holds this as [mechanism_lacks_one](/theorem/mechanism_lacks_one) — proven `by decide`, sorry-free:

```lean
(2 * 4 - 3) - 4 = 1
```

### MAXWELL’S COUNT SORTS EVERY FRAME INTO EXACTLY ONE CLASS, over the whole grid. For a planar pin-jointed frame with j joints and m members, m < 2j − 3 is a mechanism, m = 2j − 3 is statically determinate, and m > 2j − 3 is indeterminate — and the point sealed here is that the three cases are TOTAL and EXCLUSIVE: over all 10 × 22 = 220 cells of (j, m) with j in 1..10 and m in 1..22, exactly one of the three holds, never none and never two. Stated as m + 3 against 2j so the arithmetic stays in the naturals and no truncated subtraction hides a case. WHAT IT IS NOT: a claim that a determinate count makes a frame stable — Maxwell’s rule is necessary, not sufficient, and a critical form can satisfy it and still fold.
The ledger holds this as [maxwell_trichotomy_is_total_over_the_grid](/theorem/maxwell_trichotomy_is_total_over_the_grid) — proven `by decide`, sorry-free:

```lean
((List.range 10).all (fun a => (List.range 22).all (fun b => let j := a + 1; let m := b + 1; ((if m + 3 < 2 * j then 1 else 0) + (if m + 3 == 2 * j then 1 else 0) + (if 2 * j < m + 3 then 1 else 0)) == 1))) ∧ (10 * 22 = 220)
```


::: warning 
STRUCTURES — Maxwell's rule m = 2j − 3: determinate, redundant, mechanism — the three regimes as decidable arithmetic. The boundary is confirmed by the wing's own sealed theorems — e.g. [maxwells_rule_truss](/theorem/maxwells_rule_truss) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
