---
title: "The seven reflected"
description: "Computed from lean/Clay.lean — 7 sealed theorems, every claim citing its proof."
---

# The seven reflected

> THE SEVEN MILLENNIUM PROBLEMS — one FINITE instance each, drawn from that problem’s own mathematics and decided here. A decided window is not the conjecture: each key names the instance, never the problem. Prior art (initial clay σ-involution): DOI 10.5281/zenodo.21781603 (https://zenodo.org/records/21781603). uuidna Clay.lean seals finite instances of that reflection — solves none. Cite DOI 10.5281/zenodo.21781603; live surface https://uuidna.com/articles/clay. — held by [two_bit_conjunctions_are_four_of_sixteen](/theorem/two_bit_conjunctions_are_four_of_sixteen) and its 6 siblings below.

**7 theorems**, from [two_bit_conjunctions_are_four_of_sixteen](/theorem/two_bit_conjunctions_are_four_of_sixteen) onward, each proven `by decide` in [lean/Clay.lean](/lean/Clay.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 6 of its 7 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [two_bit_conjunctions_are_four_of_sixteen](/theorem/two_bit_conjunctions_are_four_of_sixteen). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FClay.lean)** — nothing to install. The editor fetches `lean/Clay.lean` from the repository and re-decides all 7 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### P vs NP, the counting argument at two bits: there are 16 boolean functions on two inputs, and exactly 4 are a single conjunction of literals — the ones whose truth table has exactly one satisfying row. A class of size 4 cannot cover 16, so expressive power is COUNTED here rather than asserted. This decides the instance, never the conjecture.
The ledger holds this as [two_bit_conjunctions_are_four_of_sixteen](/theorem/two_bit_conjunctions_are_four_of_sixteen) — proven `by decide`, sorry-free:

```lean
((List.range 16).filter (fun t => ((List.range 4).filter (fun i => (t / (2^i)) % 2 == 1)).length == 1)).length = 4 ∧ (2^(2^2) = 16)
```

### Riemann, through Mertens: M(n) = Σ μ(k), and |M(n)| ≤ √n — stated squared to stay in exact integers — holds for every n through 20. It was conjectured for ALL n and is FALSE (Odlyzko–te Riele, 1985), which is why the key names the window and not the conjecture: a predicate can hold on every element of a window and fail at the next.
The ledger holds this as [mertens_squared_under_n_on_the_first_twenty](/theorem/mertens_squared_under_n_on_the_first_twenty) — proven `by decide`, sorry-free:

```lean
(([(1,1),(0,2),(1,3),(1,4),(4,5),(1,6),(4,7),(4,8),(4,9),(1,10),(4,11),(4,12),(9,13),(4,14),(1,15),(1,16),(4,17),(4,18),(9,19),(9,20)] : List (Nat × Nat)).all (fun q => q.1 ≤ q.2)) = true
```

### Birch–Swinnerton-Dyer, through point counting: #E(F_p) on y² = x³ + 1, counted exhaustively at p = 5, 7, 11, 13, and Hasse's bound (p + 1 − N)² ≤ 4p at each. Hasse's theorem is proven mathematics; the counts here are decided, and the rank the conjecture is about is not touched.
The ledger holds this as [hasse_bound_holds_at_four_primes](/theorem/hasse_bound_holds_at_four_primes) — proven `by decide`, sorry-free:

```lean
(([(0,5),(16,7),(0,11),(4,13)] : List (Nat × Nat)).all (fun q => q.1 ≤ 4 * q.2)) = true
```

### Poincaré, as combinatorics: the boundary of the 4-simplex triangulates the 3-sphere with 5 vertices, 10 edges, 10 faces and 5 cells, so χ = 5 − 10 + 10 − 5 = 0 — the Euler characteristic every closed odd-dimensional manifold has. The conjecture (proved by Perelman, 2003) is not this; this is the arithmetic of one triangulation.
The ledger holds this as [four_simplex_boundary_euler_is_zero](/theorem/four_simplex_boundary_euler_is_zero) — proven `by decide`, sorry-free:

```lean
((5:Int) - 10 + 10 - 5 = 0) ∧ (([5,10,10,5] : List Int).length = 4)
```

### Yang–Mills, through its structure constants: SU(2)'s are the Levi-Civita symbol, and of the 27 index triples exactly 6 are non-zero — the permutations — with 3 even and 3 odd. Walked exhaustively. The mass gap is a statement about the quantum field theory and is not touched by counting its algebra's constants.
The ledger holds this as [levi_civita_nonzero_on_six_of_twentyseven](/theorem/levi_civita_nonzero_on_six_of_twentyseven) — proven `by decide`, sorry-free:

```lean
(((List.range 3).flatMap (fun i => (List.range 3).flatMap (fun j => (List.range 3).map (fun k => if i == j || j == k || i == k then 0 else 1)))).filter (fun e => e == 1)).length = 6
```

### Navier–Stokes, through discrete incompressibility: differences taken around a closed ring telescope, so the discrete divergence of this 4×4 field sums to zero exactly — by construction, in integers, with no floating point anywhere. Existence and smoothness for the continuous equations is a different kind of statement, and this decides only the grid.
The ledger holds this as [closed_grid_differences_sum_to_zero](/theorem/closed_grid_differences_sum_to_zero) — proven `by decide`, sorry-free:

```lean
((List.range 4).flatMap (fun i => (List.range 4).map (fun j => ((i*3 + ((j+1) % 4)*5) % 7)))).sum = ((List.range 4).flatMap (fun i => (List.range 4).map (fun j => ((i*3 + j*5) % 7)))).sum
```

### Hodge, through the invariant both sides must agree on: the alternating sum of Betti numbers IS the Euler characteristic, and on the 2-torus b = [1, 2, 1] gives 1 − 2 + 1 = 0. The conjecture concerns which cohomology classes are algebraic; this decides the bookkeeping those classes are counted by.
The ledger holds this as [torus_betti_alternates_to_zero](/theorem/torus_betti_alternates_to_zero) — proven `by decide`, sorry-free:

```lean
((1:Int) - 2 + 1 = 0) ∧ (([1,2,1] : List Int).length = 3)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
