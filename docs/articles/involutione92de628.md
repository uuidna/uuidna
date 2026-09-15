---
title: "The involution of lead e92de628"
description: "Computed from lean/Involutione92de628.lean — 3 sealed theorems, every claim citing its proof."
---

# The involution of lead e92de628

> INVOLUTION e92de628: lead e92de628 of lean/leads.json (refuted), stated as lead_e92de628 over the objects its source derives, and involution_e92de628, the kernel's proof of its negation. — held by [not_dvd_of_bound_e92de628](/theorem/not_dvd_of_bound_e92de628) and its 2 siblings below.

**3 theorems** and **3 decided cases**, from [not_dvd_of_bound_e92de628](/theorem/not_dvd_of_bound_e92de628) onward, each checked by the kernel in <a href="/lean/Involutione92de628.lean">lean/Involutione92de628.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 3 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [not_dvd_of_bound_e92de628](/theorem/not_dvd_of_bound_e92de628). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FInvolutione92de628.lean)** — nothing to install. The editor fetches `lean/Involutione92de628.lean` from the repository and re-decides all 3 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### Non-divisibility from a bounded search: if no multiplier below n / d + 1 reaches n, and that bound already overshoots n, then d does not divide n. Core's decision for ∣ borrows propext, so the bound is argued here instead.
The ledger holds this as [not_dvd_of_bound_e92de628](/theorem/not_dvd_of_bound_e92de628) — proven `by intro`, sorry-free:

```lean
∀ d n : Nat, (∀ j, j < n / d + 1 → d * j ≠ n) → ¬ d * (n / d + 1) ≤ n → ¬ d ∣ n
```

### The kernel refutes lead e92de628: the pair grid does not divide the full grid at the claim's 72 wings.
The ledger holds this as [involution_e92de628](/theorem/involution_e92de628) — proven `by exact`, sorry-free:

```lean
¬ lead_e92de628
```

### Where the two widths part: the pair grid is 42 and the full grid 432, their greatest common divisor is the 6 projected rays, and the 7 dimensions do not divide the 72 wings.
The ledger holds this as [anatomy_e92de628](/theorem/anatomy_e92de628) — proven `by exact`, sorry-free:

```lean
pairGrid = 42 ∧ fullGrid historicalWings = 432 ∧ Nat.gcd pairGrid (fullGrid historicalWings) = projected.length ∧ ¬ (dimensions.length ∣ historicalWings)
```


::: warning 
INVOLUTION e92de628: lead e92de628 of lean/leads. The boundary is confirmed by the wing's own sealed theorems — e.g. [not_dvd_of_bound_e92de628](/theorem/not_dvd_of_bound_e92de628) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
