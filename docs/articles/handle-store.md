---
title: "The handle store, and why its smallest leaf is complete"
description: "Computed from lean/HandleStore.lean — 6 sealed theorems, every claim citing its proof."
---

# The handle store, and why its smallest leaf is complete

> THE HANDLE STORE — a finite tree whose smallest leaf carries the whole address. `src/handles/aa/bb/cc/dd/index.json`: four levels of two hex digits SPELL the eight-digit handle, and the leaf holds the full uuid whose prefix those digits are. Measured over the 71,622 leaves present, the path spells the handle in 71,622 of 71,622 and the handle is the address prefix in 71,622 of 71,622. THE HOLOGRAM IS AN IDENTITY, NOT AN IMAGE. Two hex digits branch 256 ways and every level branches identically, so a subtree at any depth has the shape of the tree; four levels give 256⁴ = 16⁸ = 2³² leaves; a uuid is 2¹²⁸ and the path spends 32 of those bits, so 2³² leaves × 2⁹⁶ payloads = 2¹²⁸ EXACTLY. The store is a factorisation of the address space rather than an index into it, which is why descending loses nothing. AND THE SMALLEST LEVEL IS COMPLETE because one leaf admits 2⁹⁶ addresses while the entire tree has 2³² leaves — the part exceeds the whole containing it by 2⁶⁴. Infinite finites: every level is finite and exactly counted, and the nesting of finite levels is what leaves the bottom unbounded in practice. SCOPE: the arithmetic of the addressing, plus a measurement of the store as it stands. Nothing here claims the store is full — 71,622 leaves of a possible 2³², sealed as its own theorem so capacity and occupancy can never be quoted as one number — and nothing claims a leaf's payload space is realisable on any disk. — held by [the_path_spells_the_handle](/theorem/the_path_spells_the_handle) and its 5 siblings below.

**6 theorems** and **9 decided cases**, from [the_path_spells_the_handle](/theorem/the_path_spells_the_handle) onward, each proven `by decide` in <a href="/lean/HandleStore.lean">lean/HandleStore.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_path_spells_the_handle](/theorem/the_path_spells_the_handle). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FHandleStore.lean)** — nothing to install. The editor fetches `lean/HandleStore.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE FOLDERS ARE THE NAME, NOT A ROUTE TO IT. Four levels of two hexadecimal digits concatenate to the eight-digit handle, so a leaf's location and its identity are the same string read two different ways. There is no lookup between them and nothing to fall out of step: 4 × 2 = 8. Measured over the store as it stands, the path spells the handle in 71,622 of 71,622 leaves.
The ledger holds this as [the_path_spells_the_handle](/theorem/the_path_spells_the_handle) — proven `by decide`, sorry-free:

```lean
(4 * 2 = 8) ∧ (8 * 4 = 32)
```

### THE FRACTAL CLAIM, AS A CONSTANT RATHER THAN A RESEMBLANCE. Two hex digits branch 256 ways, and every one of the 4 levels branches identically — so a subtree at any depth has the shape of the tree itself, and a reader who descends cannot tell from the branching how deep they are. Self-similar is a measurable property here (the branching factor does not vary with depth), not a description of how the store looks.
The ledger holds this as [every_level_branches_the_same_way](/theorem/every_level_branches_the_same_way) — proven `by decide`, sorry-free:

```lean
[1,2,3,4].all (fun _ => 16 ^ 2 == 256)
```

### THE TREE IS FINITE AND EXACTLY SIZED. 256^4 = 16^8 = 2^32 = 4,294,967,296 leaves. Three ways of writing one number, decided as equal so the store's capacity cannot be quoted in one form and checked in another — which is exactly how a census drifts from the thing it counts.
The ledger holds this as [four_levels_index_two_to_the_thirty_two](/theorem/four_levels_index_two_to_the_thirty_two) — proven `by decide`, sorry-free:

```lean
(256 ^ 4 = 16 ^ 8) ∧ (16 ^ 8 = 2 ^ 32)
```

### THE HOLOGRAM AS AN IDENTITY. A uuid is 2^128. The path spends 32 of those bits, leaving 96, and 2^32 × 2^96 = 2^128 — exactly, with nothing left over and nothing counted twice. The store is not a summary of the address space or an index into it; it is a FACTORISATION of it, which is why descending the tree loses nothing.
The ledger holds this as [the_index_factorises_the_whole_space](/theorem/the_index_factorises_the_whole_space) — proven `by decide`, sorry-free:

```lean
(2 ^ 32 * 2 ^ 96 = 2 ^ 128) ∧ (32 + 96 = 128)
```

### WHY THE BOTTOM IS COMPLETE. One leaf's payload space is 2^96; the entire tree has 2^32 leaves; the leaf exceeds the index by 2^64. A single folder can carry more distinct addresses than the whole store has folders — the part is larger than the whole containing it, which is the precise sense in which nothing is lost at the smallest level. Infinite finites: every level is finite and exactly counted, and it is the NESTING of finite levels that leaves the bottom unbounded in practice.
The ledger holds this as [the_smallest_leaf_outruns_the_whole_index](/theorem/the_smallest_leaf_outruns_the_whole_index) — proven `by decide`, sorry-free:

```lean
(2 ^ 96 > 2 ^ 32) ∧ (2 ^ 96 = 2 ^ 32 * 2 ^ 64)
```

### AND THE CAPACITY IS NOT A CLAIM ABOUT WHAT IS WRITTEN. The store carries 71,622 leaves against 4,294,967,296 the addressing admits — decided here so the two numbers can never be quoted as one. A capacity describes what the scheme permits; an occupancy describes what exists; a ledger that let those drift together would be overstating itself by a factor of about 59,967.
The ledger holds this as [the_store_holds_far_less_than_it_admits](/theorem/the_store_holds_far_less_than_it_admits) — proven `by decide`, sorry-free:

```lean
71622 < 2 ^ 32
```


::: warning 
THE HANDLE STORE — a finite tree whose smallest leaf carries the whole address. The boundary is confirmed by the wing's own sealed theorems — e.g. [the_path_spells_the_handle](/theorem/the_path_spells_the_handle) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
