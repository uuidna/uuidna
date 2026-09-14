---
title: "The six-cube translation by 20"
description: "Computed from lean/EquilibriumXor21.lean — 1 sealed theorems, every claim citing its proof."
---

# The six-cube translation by 20

> THE XOR TRANSLATION BY 20 IS AN AUTOMORPHISM, FILE 21 OF 64 — one theorem to a file, the smallest wing that changes no statement: a file is the unit the kernel compiles and saves, so each translation compiles alone, is saved as its own result, and every later step imports it instead of re-computing it. Same 64 claims as before the split; the claim is not narrowed. Backed by the chunk law this tree already seals for walk depth (Recursion.lean), applied to walk work. — held by [xor_translation_preserves_adjacency_20](/theorem/xor_translation_preserves_adjacency_20) and its 0 siblings below.

**1 theorems** and **4,160 decided cases**, from [xor_translation_preserves_adjacency_20](/theorem/xor_translation_preserves_adjacency_20) onward, each proven `by decide` in <a href="/lean/EquilibriumXor21.lean">lean/EquilibriumXor21.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FEquilibriumXor21.lean)** — nothing to install. The editor fetches `lean/EquilibriumXor21.lean` from the repository and re-decides all 1 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 20: translating both ends of a pair by the same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on the undoubled graph already.
The ledger holds this as [xor_translation_preserves_adjacency_20](/theorem/xor_translation_preserves_adjacency_20) — proven `by decide`, sorry-free:

```lean
(List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 20) (lxor d 20) == lxor c d))
```


::: warning 
THE XOR TRANSLATION BY 20 IS AN AUTOMORPHISM, FILE 21 OF 64 — one theorem to a file, the smallest wing that changes no statement: a file is the unit the kernel compiles and saves, so each translation compiles alone, is saved as its own result, and every later step imports it instead of re-computing it. The boundary is confirmed by the wing's own sealed theorems — e.g. [xor_translation_preserves_adjacency_20](/theorem/xor_translation_preserves_adjacency_20) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
