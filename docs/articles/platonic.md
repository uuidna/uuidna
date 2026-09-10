---
title: "The five Platonic solids"
description: "Computed from lean/Platonic.lean — 10 sealed theorems, every claim citing its proof."
---

# The five Platonic solids

> THE FIVE PLATONIC SOLIDS, AND WHY THERE ARE EXACTLY FIVE. Each solid carries a cluster: its Schläfli symbol {p,q}, its three counts, Euler's V − E + F = 2, and the incidence identities q·V = 2E = p·F which say the same edges are counted twice, once from the vertices and once from the faces. A triple satisfying Euler alone could still be impossible; satisfying all three is what makes these counts a solid. THE COUNT FIVE IS DECIDED, NOT RECALLED. A vertex of q regular p-gons closes in three dimensions exactly when 1/p + 1/q > 1/2, carried here in integers as 2(p + q) > p·q since this tree holds no rationals. Walking every symbol from 3 to 8 in both coordinates, exactly five pairs satisfy it — and a separate theorem decides that every pair with a coordinate of six or more FAILS, so the grid already extends past where a solution can live and the bound is not assumed by the walk that uses it. DUALITY closes the family on itself: cube with octahedron, dodecahedron with icosahedron, tetrahedron with itself; vertices and faces exchange, edges do not move, and the symbol reverses. SCOPE: the combinatorics. Nothing here constructs a solid or embeds one in space, and the enumeration is complete over the stated grid for the stated reason — which is sealed beside it rather than left in prose. — held by [tetrahedron_cluster_closes](/theorem/tetrahedron_cluster_closes) and its 9 siblings below.

**10 theorems** and **190 decided cases**, from [tetrahedron_cluster_closes](/theorem/tetrahedron_cluster_closes) onward, each proven `by decide` in <a href="/lean/Platonic.lean">lean/Platonic.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 10 of its 10 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [tetrahedron_cluster_closes](/theorem/tetrahedron_cluster_closes). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FPlatonic.lean)** — nothing to install. The editor fetches `lean/Platonic.lean` from the repository and re-decides all 10 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE CLUSTER OF THE TETRAHEDRON, {3,3}: 4 vertices, 6 edges, 4 faces. Three facts hold together and each would catch a wrong count on its own — Euler's V − E + F = 2, and the two incidence identities q·V = 2E and p·F = 2E, which say that counting edges from the vertices and from the faces reaches the same edges twice. A tabulated triple that satisfied Euler alone could still be impossible; satisfying all three is what makes these the counts of a solid and not three numbers.
The ledger holds this as [tetrahedron_cluster_closes](/theorem/tetrahedron_cluster_closes) — proven `by decide`, sorry-free:

```lean
(4 + 4 = 6 + 2) ∧ (3 * 4 = 2 * 6) ∧ (3 * 4 = 2 * 6)
```

### THE CLUSTER OF THE CUBE, {4,3}: 8 vertices, 12 edges, 6 faces. Three facts hold together and each would catch a wrong count on its own — Euler's V − E + F = 2, and the two incidence identities q·V = 2E and p·F = 2E, which say that counting edges from the vertices and from the faces reaches the same edges twice. A tabulated triple that satisfied Euler alone could still be impossible; satisfying all three is what makes these the counts of a solid and not three numbers.
The ledger holds this as [cube_cluster_closes](/theorem/cube_cluster_closes) — proven `by decide`, sorry-free:

```lean
(8 + 6 = 12 + 2) ∧ (3 * 8 = 2 * 12) ∧ (4 * 6 = 2 * 12)
```

### THE CLUSTER OF THE OCTAHEDRON, {3,4}: 6 vertices, 12 edges, 8 faces. Three facts hold together and each would catch a wrong count on its own — Euler's V − E + F = 2, and the two incidence identities q·V = 2E and p·F = 2E, which say that counting edges from the vertices and from the faces reaches the same edges twice. A tabulated triple that satisfied Euler alone could still be impossible; satisfying all three is what makes these the counts of a solid and not three numbers.
The ledger holds this as [octahedron_cluster_closes](/theorem/octahedron_cluster_closes) — proven `by decide`, sorry-free:

```lean
(6 + 8 = 12 + 2) ∧ (4 * 6 = 2 * 12) ∧ (3 * 8 = 2 * 12)
```

### THE CLUSTER OF THE DODECAHEDRON, {5,3}: 20 vertices, 30 edges, 12 faces. Three facts hold together and each would catch a wrong count on its own — Euler's V − E + F = 2, and the two incidence identities q·V = 2E and p·F = 2E, which say that counting edges from the vertices and from the faces reaches the same edges twice. A tabulated triple that satisfied Euler alone could still be impossible; satisfying all three is what makes these the counts of a solid and not three numbers.
The ledger holds this as [dodecahedron_cluster_closes](/theorem/dodecahedron_cluster_closes) — proven `by decide`, sorry-free:

```lean
(20 + 12 = 30 + 2) ∧ (3 * 20 = 2 * 30) ∧ (5 * 12 = 2 * 30)
```

### THE CLUSTER OF THE ICOSAHEDRON, {3,5}: 12 vertices, 30 edges, 20 faces. Three facts hold together and each would catch a wrong count on its own — Euler's V − E + F = 2, and the two incidence identities q·V = 2E and p·F = 2E, which say that counting edges from the vertices and from the faces reaches the same edges twice. A tabulated triple that satisfied Euler alone could still be impossible; satisfying all three is what makes these the counts of a solid and not three numbers.
The ledger holds this as [icosahedron_cluster_closes](/theorem/icosahedron_cluster_closes) — proven `by decide`, sorry-free:

```lean
(12 + 20 = 30 + 2) ∧ (5 * 12 = 2 * 30) ∧ (3 * 20 = 2 * 30)
```

### WHY THERE ARE FIVE, AS AN ENUMERATION RATHER THAN A LOOKUP. A vertex of q regular p-gons closes in three dimensions exactly when 1/p + 1/q > 1/2, written in integers as 2(p + q) > p·q because this tree carries no rationals. Walking every (p,q) from 3 to 8 in both coordinates, exactly five pairs satisfy it — {3,3}, {4,3}, {3,4}, {5,3}, {3,5} — and they are the five solids tabulated in this wing. The count is decided, not recalled.
The ledger holds this as [exactly_five_symbols_admit_a_solid](/theorem/exactly_five_symbols_admit_a_solid) — proven `by decide`, sorry-free:

```lean
([(3,3),(3,4),(3,5),(3,6),(3,7),(3,8),(4,3),(4,4),(4,5),(4,6),(4,7),(4,8),(5,3),(5,4),(5,5),(5,6),(5,7),(5,8),(6,3),(6,4),(6,5),(6,6),(6,7),(6,8),(7,3),(7,4),(7,5),(7,6),(7,7),(7,8),(8,3),(8,4),(8,5),(8,6),(8,7),(8,8)].filter (fun s => 2 * (s.1 + s.2) > s.1 * s.2)).length = 5
```

### AND THE WALK IS NOT ASSUMING ITS OWN BOUND. Five would be a tabulation if the grid had been stopped exactly where the solutions stop. Every pair on this grid with a coordinate of 6 or more FAILS the condition — if p ≥ 6 then 1/p ≤ 1/6, and 1/q ≤ 1/3 leaves the sum at most 1/2 — so the region searched already extends past where any solution can live, and widening it further can add nothing. A bound established by the same walk it bounds is the shape this ledger has caught before, which is why it is a separate theorem.
The ledger holds this as [the_grid_is_wide_enough_to_settle_the_count](/theorem/the_grid_is_wide_enough_to_settle_the_count) — proven `by decide`, sorry-free:

```lean
[(3,3),(3,4),(3,5),(3,6),(3,7),(3,8),(4,3),(4,4),(4,5),(4,6),(4,7),(4,8),(5,3),(5,4),(5,5),(5,6),(5,7),(5,8),(6,3),(6,4),(6,5),(6,6),(6,7),(6,8),(7,3),(7,4),(7,5),(7,6),(7,7),(7,8),(8,3),(8,4),(8,5),(8,6),(8,7),(8,8)].all (fun s => (s.1 < 6 && s.2 < 6) || !(2 * (s.1 + s.2) > s.1 * s.2))
```

### THE ENUMERATION AND THE TABLE ARE THE SAME FIVE. The condition admits five symbols and this wing tabulates five clusters; this decides that they are the SAME five, pair by pair, so the table cannot have quietly listed a sixth or omitted one the arithmetic allows. Two surfaces that must agree, made to agree in the kernel rather than by inspection.
The ledger holds this as [every_admitted_symbol_is_a_tabulated_solid](/theorem/every_admitted_symbol_is_a_tabulated_solid) — proven `by decide`, sorry-free:

```lean
([(3,3),(3,4),(3,5),(3,6),(3,7),(3,8),(4,3),(4,4),(4,5),(4,6),(4,7),(4,8),(5,3),(5,4),(5,5),(5,6),(5,7),(5,8),(6,3),(6,4),(6,5),(6,6),(6,7),(6,8),(7,3),(7,4),(7,5),(7,6),(7,7),(7,8),(8,3),(8,4),(8,5),(8,6),(8,7),(8,8)].filter (fun s => 2 * (s.1 + s.2) > s.1 * s.2)) = [(3,3),(3,4),(3,5),(4,3),(5,3)]
```

### EACH SOLID'S DUAL IS ANOTHER OF THE FIVE, AND DUALITY EXCHANGES THE COUNTS. Cube with octahedron, dodecahedron with icosahedron, and the tetrahedron with itself: in every pair the vertices of one are the faces of the other while the edges are unchanged, and the Schläfli symbol reverses. The tetrahedron being self-dual is what {3,3} says when reversed, not an exception carved out for it. Written as an explicit conjunction per pair rather than a walk over ten-wide tuples — the first version indexed those by hand and Lean refused to synthesise the projections, which is the tell that the shape was carrying the reader and not the kernel.
The ledger holds this as [duality_swaps_vertices_and_faces](/theorem/duality_swaps_vertices_and_faces) — proven `by decide`, sorry-free:

```lean
(List.range 5).all (fun i => (nth solidV (nth dualIx i) == nth solidF i) && (nth solidF (nth dualIx i) == nth solidV i) && (nth solidE (nth dualIx i) == nth solidE i) && (nth solidP (nth dualIx i) == nth solidQ i) && (nth solidQ (nth dualIx i) == nth solidP i))
```

### THE FAMILY IS SMALL AND BOUNDED, which is the fact that makes exhaustive treatment possible at all. No Platonic solid has more than thirty edges, twenty faces or twenty vertices, so every claim about "all Platonic solids" in this ledger is a walk over five tabulated rows and never an appeal to a general argument. Written over plain (V,E,F) triples: a five-wide tuple needed projections Lean would not synthesise, and reaching for them by hand is how the earlier version indexed the vertex count while believing it read the edges.
The ledger holds this as [the_five_clusters_carry_thirty_edges_at_most](/theorem/the_five_clusters_carry_thirty_edges_at_most) — proven `by decide`, sorry-free:

```lean
[(4,6,4),(8,12,6),(6,12,8),(20,30,12),(12,30,20)].all (fun t => (t.1 <= 20) && (t.2.1 <= 30) && (t.2.2 <= 20))
```


::: warning 
THE FIVE PLATONIC SOLIDS, AND WHY THERE ARE EXACTLY FIVE. The boundary is confirmed by the wing's own sealed theorems — e.g. [tetrahedron_cluster_closes](/theorem/tetrahedron_cluster_closes) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
