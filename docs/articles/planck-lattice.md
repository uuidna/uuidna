---
title: "THE PLANCK EXPONENT LATTICE"
description: "Computed from lean/PlanckLattice.lean — 10 sealed theorems, every claim citing its proof."
---

# THE PLANCK EXPONENT LATTICE

> THE PLANCK EXPONENT LATTICE — cross formulas that prove each other, in clusters of lattice combinations. Each Planck quantity is a product of powers of four constants, so each is an integer vector of exponents over (hbar, G, c, k); the SQUARES are used, which keeps every exponent an integer and every theorem decidable. A product ADDS the vectors and a ratio SUBTRACTS them, so every combination is a lattice point and the lattice is closed under both — and that closure is what makes these formulas prove each other rather than sit beside each other. THE CLUSTERS ARE NOT CHOSEN, they are what the arithmetic partitions the six pairs into. Every quantity carries hbar to the first power, so hbar vanishes from EVERY ratio; G vanishes only when both quantities carry the same sign of G, which splits the four into two gravity classes, {length, time} at G^+1 and {mass, temperature} at G^-1. Exactly two of six pairs lie inside a class and give the constant-free ratios l/t = c and T/m = c^2/k. A PRODUCT cancels G across the classes instead — four of six pairs, the pure-quantum cluster, l*m = hbar/c and t*m = hbar/c^2. A RATIO across the classes keeps G and loses the quantum: l/m = G/c^2, t/m = G/c^3. Sums and differences therefore do OPPOSITE things to gravity and the same thing to the quantum, and that duality is the finding. WHERE THEY PROVE EACH OTHER: the constant-free l/t is reachable two independent ways — as the ratio of two pure-quantum products, where gravity has already cancelled, and as the ratio of two pure-gravity ratios, where the quantum has — and both routes land on the same vector without either being assumed. The same closure crosses the clusters back to the length: the pure-quantum product times the pure-gravity ratio is (hbar/c)(G/c^2) = hbar G / c^3, which is the squared length exactly. CLAIMED: the lattice arithmetic in full, every identity closed by the Lean 4 kernel over its own finite domain, axiom-free, and every census WALKED over all six pairs rather than sampled — a uniqueness claim written here without enumerating was how the second constant-free pair was missed, and the enumeration is the cure. NOT CLAIMED: that the Planck quantities are physically fundamental, or that anything is measurable at that scale. This is DIMENSIONAL ALGEBRA: the exponents are definitions and the combinations are arithmetic, with no experiment invoked. The experimental record lives in lean/StringTheory.lean and says plainly that one probe of six has ever reached this scale. Only the constants' EXPONENTS appear here, and an exponent is a choice of unit rather than a measurement. — held by [the_quantum_of_action_cancels_on_a_linear_form](/theorem/the_quantum_of_action_cancels_on_a_linear_form) and its 9 siblings below.

**10 theorems** and **54,045 decided cases**, from [the_quantum_of_action_cancels_on_a_linear_form](/theorem/the_quantum_of_action_cancels_on_a_linear_form) onward, each proven `by decide` in <a href="/lean/PlanckLattice.lean">lean/PlanckLattice.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 10 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_quantum_of_action_cancels_on_a_linear_form](/theorem/the_quantum_of_action_cancels_on_a_linear_form). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FPlanckLattice.lean)** — nothing to install. The editor fetches `lean/PlanckLattice.lean` from the repository and re-decides all 10 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### CLAIMED: over all 625 combinations in the box, hbar vanishes from a(l)+b(m)+c(t)+d(T) EXACTLY when a+b+c+d = 0 — cancellation is the kernel of a linear form, not a property found pair by pair.
The ledger holds this as [the_quantum_of_action_cancels_on_a_linear_form](/theorem/the_quantum_of_action_cancels_on_a_linear_form) — proven `by decide`, sorry-free:

```lean
allBox (fun k => ((nthI (combine k) 0) == 0) == (hbarForm k == 0)) = true
```

### CLAIMED: over the same 625 combinations, G vanishes EXACTLY when a−b+c−d = 0 — the second form, and the one whose signs are the two gravity classes.
The ledger holds this as [gravity_cancels_on_a_linear_form](/theorem/gravity_cancels_on_a_linear_form) — proven `by decide`, sorry-free:

```lean
allBox (fun k => ((nthI (combine k) 1) == 0) == (gravForm k == 0)) = true
```

### CLAIMED: a combination loses BOTH constants exactly when c = −a and d = −b — so it is a(l/t) + b(T/m), a rank-two sublattice whose basis is the two constant-free ratios themselves.
The ledger holds this as [the_constant_free_combinations_are_a_rank_two_sublattice](/theorem/the_constant_free_combinations_are_a_rank_two_sublattice) — proven `by decide`, sorry-free:

```lean
allBox (fun k => (((nthI (combine k) 0) == 0) && ((nthI (combine k) 1) == 0)) == (((nthI k 2) == -(nthI k 0)) && ((nthI k 3) == -(nthI k 1)))) = true
```

### CLAIMED: a Planck combination with prescribed exponents (h, g) on hbar and G EXISTS exactly when h and g share parity — checked over all 25 targets against 81 combinations, both directions.
The ledger holds this as [a_combination_exists_exactly_when_its_exponents_share_parity](/theorem/a_combination_exists_exactly_when_its_exponents_share_parity) — proven `by decide`, sorry-free:

```lean
allTargets (fun t => (anySmallBox (fun k => (hbarForm k == nthI t 0) && (gravForm k == nthI t 1))) == (((nthI t 0) - (nthI t 1)) % 2 == 0)) = true
```

### CLAIMED: all four Planck quantities carry the quantum of action to the same power, so hbar vanishes from every one of the 6 pairwise ratios — walked over all six, not sampled.
The ledger holds this as [every_planck_ratio_cancels_the_quantum_of_action](/theorem/every_planck_ratio_cancels_the_quantum_of_action) — proven `by decide`, sorry-free:

```lean
planckPairs.all (fun p => (ratio p.1 p.2).headD 0 == 0) = true
```

### CLAIMED: the gravitational exponents are +1 for length and time and -1 for mass and temperature — two classes of two, which is the partition every other fact here turns on.
The ledger holds this as [the_lattice_splits_into_two_gravity_classes](/theorem/the_lattice_splits_into_two_gravity_classes) — proven `by decide`, sorry-free:

```lean
(planckVectors.map (fun v => (v.drop 1).headD 0) = [1, -1, 1, -1]) ∧ (planckVectors.all (fun v => v.length == planckAxes.length) = true)
```

### CLAIMED: of the 6 pairwise ratios exactly 2 lose BOTH constants — and they are precisely the two pairs inside a gravity class: length over time, and temperature over mass.
The ledger holds this as [both_constants_cancel_exactly_inside_a_gravity_class](/theorem/both_constants_cancel_exactly_inside_a_gravity_class) — proven `by decide`, sorry-free:

```lean
(planckPairs.filter (fun p => freeOfBoth p.1 p.2)).length = 2
```

### CLAIMED: a PRODUCT loses G exactly when its two quantities sit in opposite gravity classes — 4 of the 6 pairs, against the 2 that lose it under a ratio. Sums and differences do opposite things to gravity.
The ledger holds this as [a_product_cancels_gravity_exactly_across_the_classes](/theorem/a_product_cancels_gravity_exactly_across_the_classes) — proven `by decide`, sorry-free:

```lean
((planckPairs.filter (fun p => freeOfGravity p.1 p.2)).length = 4) ∧ ((planckPairs.filter (fun p => freeOfGravity p.1 p.2)).length ≠ (planckPairs.filter (fun p => freeOfBoth p.1 p.2)).length)
```

### CLAIMED: the pure-quantum product times the pure-gravity ratio returns the squared length exactly — (hbar/c)(G/c^2) = hbar G / c^3 — so the two clusters are not separate results, each is the other divided into the length.
The ledger holds this as [the_quantum_and_gravity_clusters_cross_to_the_length](/theorem/the_quantum_and_gravity_clusters_cross_to_the_length) — proven `by decide`, sorry-free:

```lean
product (product planckLength planckMass) (ratio planckLength planckMass) = product planckLength planckLength
```

### CLAIMED: the constant-free ratio is reachable through the quantum cluster and through the gravity cluster, and both routes land on [0, 0, 2, 0] — c^2 — with neither route assumed.
The ledger holds this as [both_routes_to_light_speed_agree](/theorem/both_routes_to_light_speed_agree) — proven `by decide`, sorry-free:

```lean
(ratio (product planckLength planckMass) (product planckTime planckMass) = [0, 0, 2, 0]) ∧ (ratio (ratio planckLength planckMass) (ratio planckTime planckMass) = [0, 0, 2, 0])
```


::: warning 
THE PLANCK EXPONENT LATTICE — cross formulas that prove each other, in clusters of lattice combinations. The boundary is confirmed by the wing's own sealed theorems — e.g. [the_quantum_of_action_cancels_on_a_linear_form](/theorem/the_quantum_of_action_cancels_on_a_linear_form) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
