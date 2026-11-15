---
title: "Crosslinks: the addressing is the floor"
description: "Computed from lean/Crosslink.lean — 6 sealed theorems, every claim citing its proof."
---

# Crosslinks: the addressing is the floor

> CROSSLINKS — the addressing is the floor, and the graph is what stands on it. HandleStore.lean seals the NAMES: 2³² leaves × 2⁹⁶ payloads = 2¹²⁸ exactly. This seals what the same leaves admit in the way of RELATIONS, which is where the structure lives — a tree over n leaves carries only n − 1 links, the sparsest connected shape there is, while the same leaves admit n(n − 1)/2 pairs. MEASURED, NOT QUOTED: the store holds 76,199 leaves with 76,198 parent links against 2,903,105,701 pairs available — the tree uses one link for every 38,099 pairs its own leaves permit. Its leaves are folders and not single uuids (749 with 0 keys, 74,167 with 1 key, 611 with 2 keys, 222 with 3 keys, 114 with 4 keys, 74 with 5 keys, 55 with 6 keys, 34 with 7 keys, 23 with 8 keys, 11 with 9 keys, 13 with 10 keys, 12 with 11 keys, 8 with 12 keys, 11 with 13 keys, 16 with 14 keys, 6 with 15 keys, 11 with 16 keys, 5 with 17 keys, 2 with 18 keys, 4 with 19 keys, 3 with 20 keys, 4 with 21 keys, 2 with 22 keys, 5 with 23 keys, 1 with 25 keys, 1 with 26 keys, 3 with 27 keys, 3 with 28 keys, 4 with 31 keys, 1 with 32 keys, 1 with 34 keys, 1 with 35 keys, 1 with 36 keys, 5 with 37 keys, 1 with 39 keys, 1 with 41 keys, 1 with 43 keys, 2 with 45 keys, 1 with 46 keys, 1 with 47 keys, 1 with 49 keys, 1 with 52 keys, 1 with 53 keys, 1 with 56 keys, 1 with 59 keys, 1 with 62 keys, 1 with 64 keys, 1 with 84 keys, 1 with 138 keys) across 3 kinds (75,450 chunks, 456 pages, 293 publications), each partition summing exactly. THE CLAIM: E possible edges admit 2^E graphs, so the graph space passes the 2¹²⁸ address space exactly when E > 128 — which happens at SEVENTEEN leaves, where the pairs reach 136. A crosslink graph on seventeen folders already admits more configurations than the whole uuid space holds addresses, with 2³² folders available. Decided as a comparison of EXPONENTS, since a base-2 power is monotone in its exponent and stating 2^(2⁶³) directly would be a number no kernel can check — a claim wearing arithmetic rather than doing it. SCOPE: what the addressing ADMITS in relations, plus a measurement of the store as it stands. No crosslink graph is built here and none is claimed to exist — the leaves carry a handle, an address, a kind, keys, a statement and files, and no edge to another leaf. This wing seals the room, not the furniture. — held by [a_tree_uses_one_link_per_leaf_and_no_more](/theorem/a_tree_uses_one_link_per_leaf_and_no_more) and its 5 siblings below.

**6 theorems** and **101 decided cases**, from [a_tree_uses_one_link_per_leaf_and_no_more](/theorem/a_tree_uses_one_link_per_leaf_and_no_more) onward, each proven `by decide` in <a href="/lean/Crosslink.lean">lean/Crosslink.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [a_tree_uses_one_link_per_leaf_and_no_more](/theorem/a_tree_uses_one_link_per_leaf_and_no_more). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCrosslink.lean)** — nothing to install. The editor fetches `lean/Crosslink.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE SPARSEST CONNECTED SHAPE THERE IS. A tree over n leaves carries exactly n − 1 links — one per child, none spare — while the same n leaves admit n(n − 1)/2 pairs. Decided across leaf counts from 4 to 1024: the tree's link count never reaches the pair count once n exceeds three, and the gap widens quadratically. The tree is not a small graph, it is the smallest one that still connects.
The ledger holds this as [a_tree_uses_one_link_per_leaf_and_no_more](/theorem/a_tree_uses_one_link_per_leaf_and_no_more) — proven `by decide`, sorry-free:

```lean
[4,8,16,17,20,32,64,128,256,1024].all (fun n => (n - 1 <= (n * (n - 1)) / 2) && ((n <= 3) || (n - 1 < (n * (n - 1)) / 2)))
```

### THE STORE AS IT STANDS, WALKED RATHER THAN QUOTED. 76,199 leaves, 76,198 parent links, 2,903,105,701 pairs available — the tree uses one link for every 38,099 pairs its own leaves already permit. Stated as an inequality with a factor rather than a percentage, because a percentage rounds and this ledger decides: the available pairs exceed the tree's links by more than two thousand times.
The ledger holds this as [the_measured_store_uses_a_vanishing_share](/theorem/the_measured_store_uses_a_vanishing_share) — proven `by decide`, sorry-free:

```lean
(2903105701 = (76199 * (76199 - 1)) / 2) ∧ (2903105701 > 2000 * 76198)
```

### THE CLAIM THE CAPTAIN NAMED, DECIDED AS A COMPARISON OF EXPONENTS. E possible edges admit 2^E graphs, and the address space is 2^128. So the graph space exceeds the address space exactly when E > 128, and E = n(n − 1)/2 passes 128 at n = 17 — seventeen leaves. Decided for every tabulated n from 17 upward. A base-2 power is monotone in its exponent, so comparing exponents settles the powers; stating 2^(2^63) directly would be a number no kernel can check, which is a claim wearing arithmetic rather than doing it.
The ledger holds this as [crosslinking_outgrows_the_address_space](/theorem/crosslinking_outgrows_the_address_space) — proven `by decide`, sorry-free:

```lean
([17,20,32,64,128,256,1024].all (fun n => (n * (n - 1)) / 2 > 128)) ∧ ((16 * 15) / 2 <= 128)
```

### THE THRESHOLD IS SEVENTEEN, AND IT IS EXACT. At sixteen leaves the pairs number 120, which is under 128; at seventeen they number 136, which is over. So a crosslink graph on SEVENTEEN handle folders already admits more configurations than the entire uuid space holds addresses — with 2³² folders available. The address space is the floor of this structure and not its ceiling, and the floor is passed before a store has eighteen entries.
The ledger holds this as [seventeen_leaves_already_pass_the_whole_uuid](/theorem/seventeen_leaves_already_pass_the_whole_uuid) — proven `by decide`, sorry-free:

```lean
((16 * 15) / 2 = 120) ∧ ((17 * 16) / 2 = 136) ∧ (120 <= 128) ∧ (136 > 128)
```

### AND THE FILES INSIDE ARE PLURAL, MEASURED. Of 76,199 leaves, 749 carry no theorem key, 74,167 carry 1 key, 611 carry 2 keys, 222 carry 3 keys, 114 carry 4 keys, 74 carry 5 keys, 55 carry 6 keys, 34 carry 7 keys, 23 carry 8 keys, 11 carry 9 keys, 13 carry 10 keys, 12 carry 11 keys, 8 carry 12 keys, 11 carry 13 keys, 16 carry 14 keys, 6 carry 15 keys, 11 carry 16 keys, 5 carry 17 keys, 2 carry 18 keys, 4 carry 19 keys, 3 carry 20 keys, 4 carry 21 keys, 2 carry 22 keys, 5 carry 23 keys, 1 carry 25 keys, 1 carry 26 keys, 3 carry 27 keys, 3 carry 28 keys, 4 carry 31 keys, 1 carry 32 keys, 1 carry 34 keys, 1 carry 35 keys, 1 carry 36 keys, 5 carry 37 keys, 1 carry 39 keys, 1 carry 41 keys, 1 carry 43 keys, 2 carry 45 keys, 1 carry 46 keys, 1 carry 47 keys, 1 carry 49 keys, 1 carry 52 keys, 1 carry 53 keys, 1 carry 56 keys, 1 carry 59 keys, 1 carry 62 keys, 1 carry 64 keys, 1 carry 84 keys, 1 carry 138 keys — 1,283 carry more than one, so a handle folder is a folder and not a synonym for a single uuid, and the counts sum to the leaf total exactly. A store where every leaf held exactly one thing would have no interior to crosslink; this one does.
The ledger holds this as [the_leaf_is_not_one_uuid_but_a_folder](/theorem/the_leaf_is_not_one_uuid_but_a_folder) — proven `by decide`, sorry-free:

```lean
(749 + 74167 + 611 + 222 + 114 + 74 + 55 + 34 + 23 + 11 + 13 + 12 + 8 + 11 + 16 + 6 + 11 + 5 + 2 + 4 + 3 + 4 + 2 + 5 + 1 + 1 + 3 + 3 + 4 + 1 + 1 + 1 + 1 + 5 + 1 + 1 + 1 + 2 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 1 = 76199) ∧ (1283 > 0)
```

### THE FOLDERS ARE NOT ALL THE SAME THING EITHER: 75450 chunk, 456 page, 293 publication, summing to 76,199 exactly — no leaf counted twice and none left out. A crosslink graph over a store with kinds is a graph with typed nodes, which is a different and larger object than a graph over one kind; sealing the partition first is what makes that statement meaningful rather than decorative.
The ledger holds this as [three_kinds_partition_the_store](/theorem/three_kinds_partition_the_store) — proven `by decide`, sorry-free:

```lean
75450 + 456 + 293 = 76199
```


::: warning 
CROSSLINKS — the addressing is the floor, and the graph is what stands on it. The boundary is confirmed by the wing's own sealed theorems — e.g. [a_tree_uses_one_link_per_leaf_and_no_more](/theorem/a_tree_uses_one_link_per_leaf_and_no_more) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
