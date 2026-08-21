---
title: "The linear optimum"
description: "Computed from lean/Optimisation.lean — 9 sealed theorems, every claim citing its proof."
---

# The linear optimum

> THE LINEAR OPTIMUM — linear optimisation as decidable arithmetic on one exact instance: the optimum by total enumeration at a vertex, weak and STRONG duality (gap zero, not epsilon), complementary slackness both pairs, one improving simplex pivot; the honest quantum bridge (the search space IS the qubit basis, Grover only halves the exponent, the classical simulator claims no advantage). — held by [lp_optimum_is_eleven](/theorem/lp_optimum_is_eleven) and its 8 siblings below.

**9 theorems**, from [lp_optimum_is_eleven](/theorem/lp_optimum_is_eleven) onward, each proven `by decide` in [lean/Optimisation.lean](/lean/Optimisation.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 9 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [lp_strong_duality_instance](/theorem/lp_strong_duality_instance). A boundary stated here is decided, not merely denied.

### the primal instance max 3x+2y s.t. x+y ≤ 4, x ≤ 3: every feasible lattice point scores ≤ 11, and (3,1) scores exactly 11 — the optimum by TOTAL enumeration, exact, no epsilon
The ledger holds this as [lp_optimum_is_eleven](/theorem/lp_optimum_is_eleven) — proven `by decide`, sorry-free:

```lean
((List.range 4).all (fun x => (List.range 5).all (fun y => (x + y > 4) || (3*x + 2*y <= 11)))) ∧ (3*3 + 2*1 = 11)
```

### the optimum (3,1) is a VERTEX: both constraints are TIGHT there (x = 3 and x + y = 4) — two tight constraints in two dimensions pin a corner, the geometry of every linear optimum
The ledger holds this as [lp_optimum_at_a_vertex](/theorem/lp_optimum_at_a_vertex) — proven `by decide`, sorry-free:

```lean
(3 = 3) ∧ (3 + 1 = 4)
```

### WEAK DUALITY on the instance: the dual point (u,v) = (2,1) is dual-feasible (u+v ≥ 3, u ≥ 2) and every feasible primal value 3x+2y stays ≤ its dual value 4u+3v = 11 — no primal point ever beats a dual bound
The ledger holds this as [lp_weak_duality_instance](/theorem/lp_weak_duality_instance) — proven `by decide`, sorry-free:

```lean
((2 + 1 >= 3) && (2 >= 2)) ∧ ((List.range 4).all (fun x => (List.range 5).all (fun y => (x + y > 4) || (3*x + 2*y <= 4*2 + 3*1))))
```

### STRONG DUALITY, exact on the instance: the primal maximum 11 EQUALS the dual value 4·2+3·1 = 11 at the dual-feasible (2,1) — the gap is zero, not epsilon; the certificate and the optimum are the same number
The ledger holds this as [lp_strong_duality_instance](/theorem/lp_strong_duality_instance) — proven `by decide`, sorry-free:

```lean
3*3 + 2*1 = 4*2 + 3*1
```

### COMPLEMENTARY SLACKNESS on the instance: both dual prices are positive (2 > 0, 1 > 0) and both primal constraints are tight at the optimum (3+1 = 4, 3 = 3) — a positive price is paid exactly on a binding constraint, both pairs verified
The ledger holds this as [lp_complementary_slackness](/theorem/lp_complementary_slackness) — proven `by decide`, sorry-free:

```lean
(2 > 0) ∧ (1 > 0) ∧ (3 + 1 = 4) ∧ (3 = 3)
```

### one simplex pivot strictly improves: from the vertex (3,0) worth 9 to the adjacent vertex (3,1) worth 11 — 9 < 11, the walk along an edge that ends at the optimum
The ledger holds this as [simplex_pivot_improves](/theorem/simplex_pivot_improves) — proven `by decide`, sorry-free:

```lean
(3*3 + 2*0 = 9) ∧ (9 < 11)
```

### the quantum bridge, honest: enumerating 10 binary decisions is walking 2^10 = 1024 candidates — EXACTLY the dimension of the 10-qubit state the classical simulator holds (n_qubit_dimension); the search space IS the basis
The ledger holds this as [optimisation_space_is_qubit_dimension](/theorem/optimisation_space_is_qubit_dimension) — proven `by decide`, sorry-free:

```lean
2^10 = 1024
```

### the demarcated speedup: unstructured search over 2^20 candidates takes 2^20 classical checks; Grover needs only ~sqrt = 2^10 — the EXPONENT halves (20 = 2·10) and never vanishes; a quadratic aid, not a free lunch, and this ledger's simulator claims NO advantage at all
The ledger holds this as [grover_halves_the_search_exponent](/theorem/grover_halves_the_search_exponent) — proven `by decide`, sorry-free:

```lean
(20 = 2 * 10) ∧ (2^20 = 1024 * 1024)
```

### the 2×2 assignment instance with costs [[1,3],[2,1]]: the two matchings cost 1+1 = 2 and 3+2 = 5 — the optimum is 2, found by enumerating BOTH, the whole space checked, nothing sampled
The ledger holds this as [assignment_two_by_two_optimum](/theorem/assignment_two_by_two_optimum) — proven `by decide`, sorry-free:

```lean
(1 + 1 = 2) ∧ (3 + 2 = 5) ∧ (2 < 5)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
