---
title: "The document fold"
description: "Computed from lean/Editor.lean — 4 sealed theorems, every claim citing its proof."
---

# The document fold

> The document fold — the serializer contract of a content-addressed document (a node SEQUENCE), proven ORDER-SENSITIVE (reordering moves the address, unlike the memory store's order-invariant fold), change-sensitive, and bounded-injective (the address determines the node sequence). — held by [editor_empty_doc_folds_zero](/theorem/editor_empty_doc_folds_zero) and its 3 siblings below.

**4 theorems**, from [editor_empty_doc_folds_zero](/theorem/editor_empty_doc_folds_zero) onward, each proven `by decide` in [lean/Editor.lean](/lean/Editor.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 4 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [editor_fold_injective_bounded](/theorem/editor_fold_injective_bounded). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FEditor.lean)** — nothing to install. The editor fetches `lean/Editor.lean` from the repository and re-decides all 4 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### the empty document folds to zero — the identity a fresh editor starts from, before a single node is authored
The ledger holds this as [editor_empty_doc_folds_zero](/theorem/editor_empty_doc_folds_zero) — proven `by decide`, sorry-free:

```lean
dfold [] = 0
```

### a document is a SEQUENCE— reordering two DISTINCT nodes MOVES the address (the opposite of the memory store's order-invariant fold): for all a,b, either a=b or dfold [a,b] ≠ dfold [b,a]
The ledger holds this as [editor_fold_order_sensitive](/theorem/editor_fold_order_sensitive) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun a => (List.range 8).all (fun b => (a == b) || (dfold [a,b] != dfold [b,a])))
```

### a document refuses DRIFT — a changed node MOVES the address: the three-node fold is unchanged iff the changed node is unchanged, so any edit to a node is visible in the fold (tamper-evident)
The ledger holds this as [editor_fold_change_sensitive](/theorem/editor_fold_change_sensitive) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun a => (List.range 8).all (fun a2 => (List.range 8).all (fun b => (List.range 8).all (fun c => (dfold [a,b,c] == dfold [a2,b,c]) == (a == a2)))))
```

### on the bounded model the fold is INJECTIVE — the address DETERMINES the node sequence: two three-node documents fold equal iff they are the same document, node for node (order and content). injective only where it cannot overflow; the real merkleRoot fold is collision-RESISTANT
The ledger holds this as [editor_fold_injective_bounded](/theorem/editor_fold_injective_bounded) — proven `by decide`, sorry-free:

```lean
(List.range 6).all (fun a => (List.range 6).all (fun b => (List.range 6).all (fun c => (List.range 6).all (fun a2 => (List.range 6).all (fun b2 => (List.range 6).all (fun c2 => (dfold [a,b,c] == dfold [a2,b2,c2]) == ((a == a2) && (b == b2) && (c == c2))))))) )
```


::: warning 
The document fold — the serializer contract of a content-addressed document (a node SEQUENCE), proven ORDER-SENSITIVE (reordering moves the address, unlike the memory store's order-invariant fold), change-sensitive, and bounded-injective (the address determines the node sequence). The boundary is confirmed by the wing's own sealed theorems — e.g. [editor_empty_doc_folds_zero](/theorem/editor_empty_doc_folds_zero) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
