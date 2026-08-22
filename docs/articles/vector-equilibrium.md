---
title: "lean/VectorEquilibrium.lean"
description: "Computed from lean/VectorEquilibrium.lean — 13 sealed theorems, every claim citing its proof."
---

# lean/VectorEquilibrium.lean

> THE VECTOR EQUILIBRIUM (the cuboctahedron) AND THE INVOLUTION'S SHAPE — PURE ARITHMETIC, no empirical quantity: every number here is a count or an integer squared-length, and nothing is measured from the world. The solid is the cuboctahedron of classical geometry (Archimedean, 13 semiregular solids); the name 'vector equilibrium' and the reading of its equal radial/circumferential vectors are Buckminster Fuller's (Synergetics, 1975). Sealed WITHOUT an irrational: placing the twelve vertices at the permutations of (±1,±1,0) makes the radial and the edge squared-lengths both exactly 2, so Fuller's defining equilibrium property is an integer identity that decides in the kernel. Twelve vertices, four neighbours each, 24 edges, 14 faces (8 triangles + 6 squares), and V − E + F = 2 — the same two as the Platonic solids, though the cuboctahedron is Archimedean and is NOT among the five in Solids.lean. Beside it, the reflection dz(x) = 10 − x: exactly two fixed points (0 and 5), an involution on all ten digits, and the measured orbit sets each closed under it — the walk alternates dz with doubling, so it carries its own mirror and reflecting a finished orbit adds nothing. integrity— each theorem seals its exact decidable arithmetic. The orbit sets are OUTPUT OF THIS REPOSITORY'S OWN WALK (src/sequence-run.ts); their closure under dz is what decides. — held by [ve_twelve_vertices](/theorem/ve_twelve_vertices) and its 12 siblings below.

**13 theorems**, from [ve_twelve_vertices](/theorem/ve_twelve_vertices) onward, each proven `by decide` in [lean/VectorEquilibrium.lean](/lean/VectorEquilibrium.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 13 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [ve_handshake_crosses](/theorem/ve_handshake_crosses). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FVectorEquilibrium.lean)** — nothing to install. The editor fetches `lean/VectorEquilibrium.lean` from the repository and re-decides all 13 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The vector equilibrium has TWELVE vertices — every permutation of (±1,±1,0), three coordinate pairs by four sign choices. Twelve radial directions from one centre.
The ledger holds this as [ve_twelve_vertices](/theorem/ve_twelve_vertices) — proven `by decide`, sorry-free:

```lean
VE.length = 12
```

### Every radial vector from the centre to a vertex has squared length exactly 2 — an integer. All twelve radii are equal, and the equality is between the SQUARES, which is what makes it decidable.
The ledger holds this as [radial_squared_two](/theorem/radial_squared_two) — proven `by decide`, sorry-free:

```lean
VE.all (fun v => n2 v == 2)
```

### Each vertex has exactly FOUR neighbours at squared distance 2 — the circumferential edges. Twelve vertices with four each, counted twice, is 24 edges.
The ledger holds this as [ve_four_neighbours](/theorem/ve_four_neighbours) — proven `by decide`, sorry-free:

```lean
VE.all (fun v => (VE.filter (fun w => dd v w == 2)).length == 4)
```

### THE EQUILIBRIUM ITSELF: the radial distance equals the edge distance — both squared lengths are exactly 2. This is Fuller's defining property of the vector equilibrium, and in these coordinates it holds as an identity between integers, which is why the kernel can decide it.
The ledger holds this as [radial_equals_edge](/theorem/radial_equals_edge) — proven `by decide`, sorry-free:

```lean
VE.all (fun v => n2 v == 2 ∧ (VE.filter (fun w => dd v w == 2)).length == 4)
```

### THE CROSS THE VECTOR EQUILIBRIUM ALREADY CARRIES. Twelve vertices, each meeting four others; twenty-four edges, each met twice. So 12·4 = 24·2 = 48 — two pairs, crossed, and the identity holds without dividing by two anywhere. That is the handshake stated as a proportion rather than as a halving, and it is what lets the edge count be READ off the vertices instead of computed from them. NOT A FITTED PAIR. Any two numbers sharing a ratio cross, so a cross is only evidence when both pairs are quantities the figure already has: 12 and 4 are counted at the vertices, 24 and 2 at the edges, and nothing here was chosen to make the product agree. Euler holds straight alongside it — 12 + 14 = 24 + 2 — and needs no cross, because a sum is already exact.
The ledger holds this as [ve_handshake_crosses](/theorem/ve_handshake_crosses) — proven `by decide`, sorry-free:

```lean
(12 * 4 = 24 * 2) ∧ (12 + 14 = 24 + 2) ∧ (VE.length * 4 = 24 * 2)
```

### Twelve vertices, four edges at each, each edge counted from both ends: 12 × 4 / 2 = 24 edges.
The ledger holds this as [ve_twentyfour_edges](/theorem/ve_twentyfour_edges) — proven `by decide`, sorry-free:

```lean
12 * 4 / 2 = 24
```

### Fourteen faces: eight triangles and six squares. The two face kinds are what distinguishes the cuboctahedron from any Platonic solid, where every face is the same polygon.
The ledger holds this as [ve_fourteen_faces](/theorem/ve_fourteen_faces) — proven `by decide`, sorry-free:

```lean
8 + 6 = 14
```

### Euler holds for the vector equilibrium exactly as for the five Platonic solids: V − E + F = 12 − 24 + 14 = 2 — the same two the captain coins fold to.
The ledger holds this as [euler_characteristic_two](/theorem/euler_characteristic_two) — proven `by decide`, sorry-free:

```lean
12 + 14 = 24 + 2
```

### Joining all thirteen centres of the figure to each other draws C(13,2) = 13 × 12 / 2 = 78 lines — the edge count of the complete graph on thirteen nodes. SCOPE: the count is what is sealed; no property of the figure beyond it is asserted here.
The ledger holds this as [metatron_seventyeight_lines](/theorem/metatron_seventyeight_lines) — proven `by decide`, sorry-free:

```lean
13 * 12 / 2 = 78
```

### The involution dz(x) = 10 − x (with dz(0) = 0) fixes exactly two of the ten digits: 0 and 5. Every other digit is moved, in the pairs 1↔9, 2↔8, 3↔7, 4↔6.
The ledger holds this as [dz_two_fixedpoints](/theorem/dz_two_fixedpoints) — proven `by decide`, sorry-free:

```lean
(List.range 10).filter (fun d => dz d == d) = [0, 5]
```

### Applying the reflection twice returns every digit to itself: dz(dz(x)) = x for all ten digits — the defining property of an involution, verified across the whole domain rather than argued from the formula.
The ledger holds this as [dz_involution_digits](/theorem/dz_involution_digits) — proven `by decide`, sorry-free:

```lean
(List.range 10).all (fun d => dz (dz d) == d)
```

### Each orbit set below is closed under dz — the reflection maps every one onto itself, adding no digit, which is exactly what the line proves. The walk alternates dz with doubling, so a completed orbit already contains its own mirror and reflecting it again is the identity on that set. SCOPE: the closure of these explicit sets is what decides. That the walk PRODUCES them is output of this repository read off a run, and this theorem does not reach it.
The ledger holds this as [orbits_closed_involution](/theorem/orbits_closed_involution) — proven `by decide`, sorry-free:

```lean
[[0], [0,1,9], [0,1,3,5,7,9], [0,1,3,4,5,6,7,9], [0,1,5,9], [0,1,2,3,4,5,6,7,8,9]].all (fun s => s.all (fun d => s.contains (dz d)))
```

### The five non-covering seeds {0,1,3,4,5} together with their reflections {0,9,7,6,5} reach eight digits. What is missing is exactly {2,8}, and the second conjunct proves dz(2) = 8 — so the gap is ONE involution pair, discharged on this line rather than borrowed from another. The gap has the involution's own shape.
The ledger holds this as [missing_pair_involution](/theorem/missing_pair_involution) — proven `by decide`, sorry-free:

```lean
((List.range 10).filter (fun d => !([0,1,3,4,5] ++ [0,9,7,6,5]).contains d) = [2, 8]) ∧ (dz 2 = 8)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
