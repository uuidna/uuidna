---
title: "The involution of lead ef58b583"
description: "Computed from lean/Involutionef58b583.lean — 3 sealed theorems, every claim citing its proof."
---

# The involution of lead ef58b583

> INVOLUTION ef58b583: lead ef58b583 of lean/leads.json (refuted), stated in the row's own lean field as lead_ef58b583, and involution_ef58b583, the kernel's proof of its negation, accepted at the door for the text addressed e0ba48ac-d52f-8171-b981-9b8f129c466e. — held by [altWalk_zero](/theorem/altWalk_zero) and its 2 siblings below.

**3 theorems** and **3 decided cases**, from [altWalk_zero](/theorem/altWalk_zero) onward, each checked by the kernel in <a href="/lean/Involutionef58b583.lean">lean/Involutionef58b583.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FInvolutionef58b583.lean)** — nothing to install. The editor fetches `lean/Involutionef58b583.lean` from the repository and re-decides all 3 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### a supporting theorem the row states for lead ef58b583, decided by the kernel with its verdict
The ledger holds this as [altWalk_zero](/theorem/altWalk_zero) — proven `by intro`, sorry-free:

```lean
∀ (d : Bool) (n : Nat), altWalk d n 0 = 0
```

### a supporting theorem the row states for lead ef58b583, decided by the kernel with its verdict
The ledger holds this as [alternation_misses_from_zero](/theorem/alternation_misses_from_zero) — proven `by exact`, sorry-free:

```lean
¬ (∀ s, s < 10 → ∃ dzFirst : Bool, ∀ t, t < 10 → ∃ n, altWalk dzFirst n s = t)
```

### The kernel refutes lead ef58b583: An involution alone is barren: dz reaches exactly two states from any seed, alternating with doubling reaches all ten. The productive partner is the IRREVERSIBLE one — dz is reversible and free, doubling collapses.
The ledger holds this as [involution_ef58b583](/theorem/involution_ef58b583) — proven `by intro`, sorry-free:

```lean
¬ lead_ef58b583
```


::: warning 
INVOLUTION ef58b583: lead ef58b583 of lean/leads. The boundary is confirmed by the wing's own sealed theorems — e.g. [altWalk_zero](/theorem/altWalk_zero) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
