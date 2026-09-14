---
title: "The involution of lead 2d552f1f"
description: "Computed from lean/Involution2d552f1f.lean — 2 sealed theorems, every claim citing its proof."
---

# The involution of lead 2d552f1f

> INVOLUTION 2d552f1f: lead 2d552f1f of lean/leads.json (refuted), stated as lead_2d552f1f over the objects its source derives, and involution_2d552f1f, the kernel's proof of its negation. — held by [involution_2d552f1f](/theorem/involution_2d552f1f) and its 1 siblings below.

**2 theorems** and **322 decided cases**, from [involution_2d552f1f](/theorem/involution_2d552f1f) onward, each proven `by decide` in <a href="/lean/Involution2d552f1f.lean">lean/Involution2d552f1f.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 2 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [involution_2d552f1f](/theorem/involution_2d552f1f). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FInvolution2d552f1f.lean)** — nothing to install. The editor fetches `lean/Involution2d552f1f.lean` from the repository and re-decides all 2 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The kernel refutes lead 2d552f1f: the mirror does not keep the stroke budget on every affine row.
The ledger holds this as [involution_2d552f1f](/theorem/involution_2d552f1f) — proven `by decide`, sorry-free:

```lean
¬ lead_2d552f1f
```

### The census the refutation recorded, decided: budget 4,5 on 18 rows, budget 5,4 on 30 rows, budget 6,3 on 6 rows; the mirror keeps the budget on 30 of the 54 rows; row (1, 3) is the first whose reflection moves it.
The ledger holds this as [budget_census_2d552f1f](/theorem/budget_census_2d552f1f) — proven `by decide`, sorry-free:

```lean
famTally (fun a b => budget (arow a b) == (4, 5)) = 18 ∧ famTally (fun a b => budget (arow a b) == (5, 4)) = 30 ∧ famTally (fun a b => budget (arow a b) == (6, 3)) = 6 ∧ famTally (fun a b => budget ((arow a b).map dz) == budget (arow a b)) = 30 ∧ fallingOf (arow 1 3) = 4 ∧ fallingOf ((arow 1 3).map dz) = 5
```


::: warning 
INVOLUTION 2d552f1f: lead 2d552f1f of lean/leads. The boundary is confirmed by the wing's own sealed theorems — e.g. [involution_2d552f1f](/theorem/involution_2d552f1f) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
