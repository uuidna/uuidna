---
title: "Maxwell's rule"
description: "Computed from lean/Structures.lean — 3 sealed theorems, every claim citing its proof."
---

# Maxwell's rule

> STRUCTURES — Maxwell's rule m = 2j − 3: determinate, redundant, mechanism — the three regimes as decidable arithmetic. — held by [maxwells_rule_truss](/theorem/maxwells_rule_truss) and its 2 siblings below.

**3 theorems**, from [maxwells_rule_truss](/theorem/maxwells_rule_truss) onward, each proven `by decide` in [lean/Structures.lean](/lean/Structures.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 3 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [redundancy_pays_one](/theorem/redundancy_pays_one). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FStructures.lean)** — nothing to install. The editor fetches `lean/Structures.lean` from the repository and re-decides all 3 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

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


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
