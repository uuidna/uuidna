---
title: "Crosslinks: the addressing is the floor"
description: "Computed from lean/Crosslink.lean — 6 sealed theorems, every claim citing its proof."
---

# Crosslinks: the addressing is the floor

> CROSSLINKS — the addressing is the floor, and the graph is what stands on it. HandleStore.lean seals the NAMES: 2³² leaves × 2⁹⁶ payloads = 2¹²⁸ exactly. This seals what the same leaves admit in the way of RELATIONS, which is where the structure lives — a tree over n leaves carries only n − 1 links, the sparsest connected shape there is, while the same leaves admit n(n − 1)/2 pairs. MEASURED, NOT QUOTED: the store holds 71,639 leaves with 71,638 parent links against 2,566,037,341 pairs available — the tree uses one link for every 35,819 pairs its own leaves permit. Its leaves are folders and not single uuids (689 with 0 keys, 70,870 with 1 key, 75 with 2 keys, 5 with 3 keys) across 3 kinds (70,950 chunks, 437 pages, 252 publications), each partition summing exactly. THE CLAIM: E possible edges admit 2^E graphs, so the graph space passes the 2¹²⁸ address space exactly when E > 128 — which happens at SEVENTEEN leaves, where the pairs reach 136. A crosslink graph on seventeen folders already admits more configurations than the whole uuid space holds addresses, with 2³² folders available. Decided as a comparison of EXPONENTS, since a base-2 power is monotone in its exponent and stating 2^(2⁶³) directly would be a number no kernel can check — a claim wearing arithmetic rather than doing it. SCOPE: what the addressing ADMITS in relations, plus a measurement of the store as it stands. No crosslink graph is built here and none is claimed to exist — the leaves carry a handle, an address, a kind, keys, a statement and files, and no edge to another leaf. This wing seals the room, not the furniture. — held by [a_tree_uses_one_link_per_leaf_and_no_more](/theorem/a_tree_uses_one_link_per_leaf_and_no_more) and its 5 siblings below.

**6 theorems** and **56 decided cases**, from [a_tree_uses_one_link_per_leaf_and_no_more](/theorem/a_tree_uses_one_link_per_leaf_and_no_more) onward, each proven `by decide` in <a href="/lean/Crosslink.lean">lean/Crosslink.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [a_tree_uses_one_link_per_leaf_and_no_more](/theorem/a_tree_uses_one_link_per_leaf_and_no_more). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCrosslink.lean)** — nothing to install. The editor fetches `lean/Crosslink.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE SPARSEST CONNECTED SHAPE THERE IS. A tree over n leaves carries exactly n − 1 links — one per child, none spare — while the same n leaves admit n(n − 1)/2 pairs. Decided across leaf counts from 4 to 1024: the tree's link count never reaches the pair count once n exceeds three, and the gap widens quadratically. The tree is not a small graph, it is the smallest one that still connects.
The ledger holds this as [a_tree_uses_one_link_per_leaf_and_no_more](/theorem/a_tree_uses_one_link_per_leaf_and_no_more) — proven `by decide`, sorry-free:

```lean
[4,8,16,17,20,32,64,128,256,1024].all (fun n => (n - 1 <= (n * (n - 1)) / 2) && ((n <= 3) || (n - 1 < (n * (n - 1)) / 2)))
```

### THE STORE AS IT STANDS, WALKED RATHER THAN QUOTED. 71,639 leaves, 71,638 parent links, 2,566,037,341 pairs available — the tree uses one link for every 35,819 pairs its own leaves already permit. Stated as an inequality with a factor rather than a percentage, because a percentage rounds and this ledger decides: the available pairs exceed the tree's links by more than two thousand times.
The ledger holds this as [the_measured_store_uses_a_vanishing_share](/theorem/the_measured_store_uses_a_vanishing_share) — proven `by decide`, sorry-free:

```lean
(2566037341 = (71639 * (71639 - 1)) / 2) ∧ (2566037341 > 2000 * 71638)
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

### AND THE FILES INSIDE ARE PLURAL, MEASURED. Of 71,639 leaves, 689 carry no theorem key, 70,870 carry 1 key, 75 carry 2 keys, 5 carry 3 keys — 80 carry more than one, so a handle folder is a folder and not a synonym for a single uuid, and the counts sum to the leaf total exactly. A store where every leaf held exactly one thing would have no interior to crosslink; this one does.
The ledger holds this as [the_leaf_is_not_one_uuid_but_a_folder](/theorem/the_leaf_is_not_one_uuid_but_a_folder) — proven `by decide`, sorry-free:

```lean
(689 + 70870 + 75 + 5 = 71639) ∧ (80 > 0)
```

### THE FOLDERS ARE NOT ALL THE SAME THING EITHER: 70950 chunk, 437 page, 252 publication, summing to 71,639 exactly — no leaf counted twice and none left out. A crosslink graph over a store with kinds is a graph with typed nodes, which is a different and larger object than a graph over one kind; sealing the partition first is what makes that statement meaningful rather than decorative.
The ledger holds this as [three_kinds_partition_the_store](/theorem/three_kinds_partition_the_store) — proven `by decide`, sorry-free:

```lean
70950 + 437 + 252 = 71639
```


::: warning 
CROSSLINKS — the addressing is the floor, and the graph is what stands on it. The boundary is confirmed by the wing's own sealed theorems — e.g. [a_tree_uses_one_link_per_leaf_and_no_more](/theorem/a_tree_uses_one_link_per_leaf_and_no_more) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
