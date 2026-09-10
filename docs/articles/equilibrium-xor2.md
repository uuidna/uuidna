---
title: "The six-cube translations, file 2 of 8"
description: "Computed from lean/EquilibriumXor2.lean — 8 sealed theorems, every claim citing its proof."
---

# The six-cube translations, file 2 of 8

> THE XOR TRANSLATIONS ARE AUTOMORPHISMS, FILE 2 OF 8 — translations 8 to 15 of the six-cube, one theorem each, eight to a file so that lean-all's lanes prove the family in parallel: a wing is proved per FILE, and one file of sixty-four near-cap theorems held the whole landing behind a single kernel while every other lane idled. Same sixty-four claims as before the split; the claim is not narrowed, the chunk is sized to a lane. Backed by the chunk law this tree already seals for walk depth (Recursion.lean), applied to walk work. — held by [xor_translation_preserves_adjacency_8](/theorem/xor_translation_preserves_adjacency_8) and its 7 siblings below.

**8 theorems** and **33,280 decided cases**, from [xor_translation_preserves_adjacency_8](/theorem/xor_translation_preserves_adjacency_8) onward, each proven `by decide` in <a href="/lean/EquilibriumXor2.lean">lean/EquilibriumXor2.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FEquilibriumXor2.lean)** — nothing to install. The editor fetches `lean/EquilibriumXor2.lean` from the repository and re-decides all 8 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 8: translating both ends of a pair by the same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on the undoubled graph already.
The ledger holds this as [xor_translation_preserves_adjacency_8](/theorem/xor_translation_preserves_adjacency_8) — proven `by decide`, sorry-free:

```lean
(List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 8) (lxor d 8) == lxor c d))
```

### AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 9: translating both ends of a pair by the same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on the undoubled graph already.
The ledger holds this as [xor_translation_preserves_adjacency_9](/theorem/xor_translation_preserves_adjacency_9) — proven `by decide`, sorry-free:

```lean
(List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 9) (lxor d 9) == lxor c d))
```

### AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 10: translating both ends of a pair by the same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on the undoubled graph already.
The ledger holds this as [xor_translation_preserves_adjacency_10](/theorem/xor_translation_preserves_adjacency_10) — proven `by decide`, sorry-free:

```lean
(List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 10) (lxor d 10) == lxor c d))
```

### AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 11: translating both ends of a pair by the same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on the undoubled graph already.
The ledger holds this as [xor_translation_preserves_adjacency_11](/theorem/xor_translation_preserves_adjacency_11) — proven `by decide`, sorry-free:

```lean
(List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 11) (lxor d 11) == lxor c d))
```

### AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 12: translating both ends of a pair by the same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on the undoubled graph already.
The ledger holds this as [xor_translation_preserves_adjacency_12](/theorem/xor_translation_preserves_adjacency_12) — proven `by decide`, sorry-free:

```lean
(List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 12) (lxor d 12) == lxor c d))
```

### AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 13: translating both ends of a pair by the same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on the undoubled graph already.
The ledger holds this as [xor_translation_preserves_adjacency_13](/theorem/xor_translation_preserves_adjacency_13) — proven `by decide`, sorry-free:

```lean
(List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 13) (lxor d 13) == lxor c d))
```

### AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 14: translating both ends of a pair by the same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on the undoubled graph already.
The ledger holds this as [xor_translation_preserves_adjacency_14](/theorem/xor_translation_preserves_adjacency_14) — proven `by decide`, sorry-free:

```lean
(List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 14) (lxor d 14) == lxor c d))
```

### AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 15: translating both ends of a pair by the same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on the undoubled graph already.
The ledger holds this as [xor_translation_preserves_adjacency_15](/theorem/xor_translation_preserves_adjacency_15) — proven `by decide`, sorry-free:

```lean
(List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 15) (lxor d 15) == lxor c d))
```


::: warning 
THE XOR TRANSLATIONS ARE AUTOMORPHISMS, FILE 2 OF 8 — translations 8 to 15 of the six-cube, one theorem each, eight to a file so that lean-all's lanes prove the family in parallel: a wing is proved per FILE, and one file of sixty-four near-cap theorems held the whole landing behind a single kernel while every other lane idled. The boundary is confirmed by the wing's own sealed theorems — e.g. [xor_translation_preserves_adjacency_8](/theorem/xor_translation_preserves_adjacency_8) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
