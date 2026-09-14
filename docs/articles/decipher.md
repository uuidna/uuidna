---
title: "The substitution invariants"
description: "Computed from lean/Decipher.lean — 2 sealed theorems, every claim citing its proof."
---

# The substitution invariants

> DECIPHER — the substitution invariants every letter-for-letter reading meets, with the control that can fail. — held by [relabel3_preserves_bigram_collisions](/theorem/relabel3_preserves_bigram_collisions) and its 1 siblings below.

**2 theorems** and **2,155 decided cases**, from [relabel3_preserves_bigram_collisions](/theorem/relabel3_preserves_bigram_collisions) onward, each proven `by decide` in <a href="/lean/Decipher.lean">lean/Decipher.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 2 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [relabel3_preserves_bigram_collisions](/theorem/relabel3_preserves_bigram_collisions). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FDecipher.lean)** — nothing to install. The editor fetches `lean/Decipher.lean` from the repository and re-decides all 2 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### A SUBSTITUTION CANNOT MOVE THE STATISTICS. Every relabeling of a three-letter alphabet, all six, leaves the sum over adjacent letter pairs of how often each recurs (Σ c² = 15 here) exactly where it was on this twelve-letter text, because a bijection sends equal pairs to equal pairs and unequal to unequal. That is why a letter-for-letter "decipherment" of the Voynich manuscript cannot rescue its low letter entropy: the claimed plaintext inherits it, and must be compared to real text in the claimed language. Decided for this text and alphabet; the general reason is the bijection.
The ledger holds this as [relabel3_preserves_bigram_collisions](/theorem/relabel3_preserves_bigram_collisions) — proven `by decide`, sorry-free:

```lean
∀ p ∈ ([(0,1,2),(0,2,1),(1,0,2),(1,2,0),(2,0,1),(2,1,0)] : List (Nat × Nat × Nat)), ((([0,1,2,2,1,0,1,1,2,0,0,2].map (fun c => match c with | 0 => p.1 | 1 => p.2.1 | _ => p.2.2)).zip ([0,1,2,2,1,0,1,1,2,0,0,2].map (fun c => match c with | 0 => p.1 | 1 => p.2.1 | _ => p.2.2)).tail).map (fun b => (([0,1,2,2,1,0,1,1,2,0,0,2].map (fun c => match c with | 0 => p.1 | 1 => p.2.1 | _ => p.2.2)).zip ([0,1,2,2,1,0,1,1,2,0,0,2].map (fun c => match c with | 0 => p.1 | 1 => p.2.1 | _ => p.2.2)).tail).count b)).foldl (· + ·) 0 = ((([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).zip ([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).tail).map (fun b => (([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).zip ([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).tail).count b)).foldl (· + ·) 0
```

### THE CONTROL FIRES. The same twelve letters, the same four of each, sorted instead of mixed, give Σ c² = 29 where the mixed text gives 15: letter order does move the count, so the invariance beside this is a fact about substitution, not a count nothing can change. It is the letter-shuffle control of the decipherment bench, decided.
The ledger holds this as [letter_order_moves_bigram_collisions](/theorem/letter_order_moves_bigram_collisions) — proven `by decide`, sorry-free:

```lean
([0,0,0,0,1,1,1,1,2,2,2,2] : List Nat).count 0 = ([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).count 0 ∧ ([0,0,0,0,1,1,1,1,2,2,2,2] : List Nat).count 1 = ([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).count 1 ∧ ([0,0,0,0,1,1,1,1,2,2,2,2] : List Nat).count 2 = ([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).count 2 ∧ ((([0,0,0,0,1,1,1,1,2,2,2,2] : List Nat).zip ([0,0,0,0,1,1,1,1,2,2,2,2] : List Nat).tail).map (fun b => (([0,0,0,0,1,1,1,1,2,2,2,2] : List Nat).zip ([0,0,0,0,1,1,1,1,2,2,2,2] : List Nat).tail).count b)).foldl (· + ·) 0 = 29 ∧ ((([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).zip ([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).tail).map (fun b => (([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).zip ([0,1,2,2,1,0,1,1,2,0,0,2] : List Nat).tail).count b)).foldl (· + ·) 0 = 15
```


::: warning 
DECIPHER — the substitution invariants every letter-for-letter reading meets, with the control that can fail. The boundary is confirmed by the wing's own sealed theorems — e.g. [relabel3_preserves_bigram_collisions](/theorem/relabel3_preserves_bigram_collisions) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
