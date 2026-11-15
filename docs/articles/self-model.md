---
title: "The self-model"
description: "Computed from lean/SelfModel.lean — 4 sealed theorems, every claim citing its proof."
---

# The self-model

> THE SELF-MODEL — no system's states map onto all predicates on its states, so no system holds a complete model of itself (Cantor, Lawvere); checked universally and over every self-model of the affect trinity's 3 corners. Honest scope: this is mathematics about models. It does not say what consciousness is; global workspace and integrated information are models, not sealed here, and why there is experience at all is an open question, not a theorem. — held by [self_model_cantor](/theorem/self_model_cantor) and its 3 siblings below.

**4 theorems** and **9,009 decided cases**, from [self_model_cantor](/theorem/self_model_cantor) onward, each checked by the kernel in <a href="/lean/SelfModel.lean">lean/SelfModel.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 4 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [self_model_lawvere](/theorem/self_model_lawvere). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSelfModel.lean)** — nothing to install. The editor fetches `lean/SelfModel.lean` from the repository and re-decides all 4 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### no state's predicate is the diagonal one: for any states at all and any map f from states to predicates on states, the predicate i ↦ ¬ f i i differs from f j at j itself — Cantor's diagonal in Lawvere's form (Lawvere 1969, doi 10.1007/BFb0080769)
The ledger holds this as [self_model_cantor](/theorem/self_model_cantor) — proven `by intro`, sorry-free:

```lean
∀ {α : Type} (f : α → α → Bool) (j : α), (fun i => !(f i i)) ≠ f j
```

### so no system's states map onto all predicates on its states: a complete self-model would have to represent the diagonal, and the diagonal escapes every state — there is no complete self-model (Lawvere 1969, doi 10.1007/BFb0080769). Self-reference itself is not refused: Kleene's recursion theorem builds programs that print their own text (Kleene 1938, doi 10.2307/2267778), proved mathematics this wing cites and does not seal
The ledger holds this as [self_model_lawvere](/theorem/self_model_lawvere) — proven `by intro`, sorry-free:

```lean
∀ {α : Type}, ¬ ∃ e : α → α → Bool, ∀ p : α → Bool, ∃ a, e a = p
```

### checked over every self-model of the 3 corners of the affect trinity (feeling, thought, emotion): in all 512 tables the diagonal predicate is no row of the table
The ledger holds this as [self_model_diagonal_escapes](/theorem/self_model_diagonal_escapes) — proven `by decide`, sorry-free:

```lean
(models 3).all (fun t => t.all (fun r => r != diag t)) = true ∧ (models 3).length = 512
```

### negation on Bool fixes neither value — Lawvere's corollary: an onto self-model would give every map on Bool a fixed point, and this one has none
The ledger holds this as [self_model_negation_no_fixed_point](/theorem/self_model_negation_no_fixed_point) — proven `by decide`, sorry-free:

```lean
∀ b : Bool, (!b) ≠ b
```


::: warning 
THE SELF-MODEL — no system's states map onto all predicates on its states, so no system holds a complete model of itself (Cantor, Lawvere); checked universally and over every self-model of the affect trinity's 3 corners. The boundary is confirmed by the wing's own sealed theorems — e.g. [self_model_cantor](/theorem/self_model_cantor) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
