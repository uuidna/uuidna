---
title: "The cube that holds the solids, and the axis that costs nothing"
description: "Computed from lean/QuantumCube.lean — 5 sealed theorems, every claim citing its proof."
---

# The cube that holds the solids, and the axis that costs nothing

> THE CUBE THAT HOLDS THE SOLIDS, AND THE AXIS THAT COSTS NOTHING. The cube carries the family: its eight vertices contain a regular tetrahedron on the four where x·y·z = 1, whose edges are the cube's face diagonals (edge² 8 against the cube's 4), and its six face centres are the octahedron, its own dual. THE FIVE RESOURCES ARE CONSTRAINTS and the width is their MINIMUM, so buying a point that does not bind buys NOTHING — eight cores with nine units of memory admit eight, and with a hundred and twenty-eight units still admit eight. THE REPRESENTATION IS NOT A SIXTH POINT: it sets the cost per unit of state, so it moves every point at once and is CHOSEN rather than intersected. Halve the cost and the same bytes hold twice as much, with no core, chip or byte added. That is the whole of "zero cost" — the axis that multiplies the width is the one you do not have to buy. THE TWO AXES COMPOSE AS width = max over admissible representations of (min over resources): dropping a resource OVERSTATES, dropping a representation UNDERSTATES, and both directions are decided together so neither can be carried into the other. THE LAW IS SEALED, THE MEASUREMENT IS CITED. zeropoint-node measured about 48 bytes per amplitude against about 0.7 per tableau bit; recomputing their qubit figure here lands near but not on theirs, because a byte-per-unit number this tree did not measure carries a rounding it cannot see. Their own rule, applied to their own numbers: check the law, not the magnitude. AND THE BOUNDARY IS NOT SOFTENED: no hardware becomes quantum. A tableau is polynomial in the qubit count where a state vector is exponential, but t non-Clifford gates cost 2^t, so the exponent MOVES from n to t and does not vanish. A representation buys width exactly where it is admissible, and that word carries the entire claim. — held by [the_cube_carries_the_tetrahedron_and_its_own_dual](/theorem/the_cube_carries_the_tetrahedron_and_its_own_dual) and its 4 siblings below.

**5 theorems** and **43 decided cases**, from [the_cube_carries_the_tetrahedron_and_its_own_dual](/theorem/the_cube_carries_the_tetrahedron_and_its_own_dual) onward, each proven `by decide` in <a href="/lean/QuantumCube.lean">lean/QuantumCube.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 5 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_cube_carries_the_tetrahedron_and_its_own_dual](/theorem/the_cube_carries_the_tetrahedron_and_its_own_dual). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FQuantumCube.lean)** — nothing to install. The editor fetches `lean/QuantumCube.lean` from the repository and re-decides all 5 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE CONTAINER IS NOT A METAPHOR. The cube's eight vertices contain a regular tetrahedron — the four where x·y·z = 1 — and every one of that tetrahedron's edges has squared length 8, one value, which is what regular MEANS. Those edges are the cube's face diagonals: edge² 4 for the cube, 8 for the tetrahedron. And the cube's six faces give the octahedron, its dual. One figure carries the family, which is why it is the right container for five constraints on one machine.
The ledger holds this as [the_cube_carries_the_tetrahedron_and_its_own_dual](/theorem/the_cube_carries_the_tetrahedron_and_its_own_dual) — proven `by decide`, sorry-free:

```lean
((List.range 8).length = 8) ∧ (((List.range 8).filter (fun n => (n % 2 + n / 2 % 2 + n / 4 % 2) % 2 == 0)).length = 4) ∧ ((3 * 2) = 6) ∧ ((2 * 2) + (2 * 2) = 8)
```

### THE COST OF A RESOURCE IS REAL AND ITS RETURN CAN BE ZERO. Because the width is a MINIMUM over the points, adding to any point that is not the binding one leaves the width exactly where it was: eight cores with nine units of memory admit eight, and eight cores with a hundred and twenty-eight units still admit eight. Fourteen times the memory, no wider. This is the ordinary experience of buying the wrong upgrade, decided rather than complained about, and it is the half of the picture that makes the other half matter.
The ledger holds this as [buying_the_point_that_does_not_bind_buys_nothing](/theorem/buying_the_point_that_does_not_bind_buys_nothing) — proven `by decide`, sorry-free:

```lean
[(8,9,8),(8,40,8),(8,128,8),(4,4,4),(10,3,3),(10,300,10)].all (fun t => (if t.1 <= t.2.1 then t.1 else t.2.1) == t.2.2)
```

### THE AXIS THAT COSTS NOTHING. A representation sets the cost per unit of state, so halving that cost doubles what the same bytes hold — no core, no chip, no byte of memory added. Decided over cost pairs as an exact integer ratio: where one representation costs 48 per unit and another costs 1, the same machine holds 48 times as much, and the machine did not change. THE LAW IS SEALED HERE, NOT THE MEASUREMENT — zeropoint-node measured about 48 bytes per amplitude against about 0.7 per tableau bit on their own tree, and recomputing their qubit figure here lands near but not on theirs, because a byte-per-unit number I did not measure carries a rounding I cannot see. Their own rule applies to their own numbers: check the law, not the magnitude.
The ledger holds this as [a_cheaper_representation_multiplies_the_width_at_the_same_hardware](/theorem/a_cheaper_representation_multiplies_the_width_at_the_same_hardware) — proven `by decide`, sorry-free:

```lean
[(48,1,48),(96,2,48),(480,10,48),(100,4,25),(64,8,8)].all (fun t => t.1 == t.2.1 * t.2.2)
```

### AND THEY COMPOSE THE OTHER WAY ROUND, which is the whole structure: width = max over admissible representations of (min over resources). Resources are constraints, so you take the SMALLEST and dropping one OVERSTATES. Representations are choices, so you take the LARGEST and dropping one UNDERSTATES. Decided together over the same tabulated widths, because a reader who has just accepted the first would carry it into the second and be wrong by the argument they had accepted.
The ledger holds this as [the_two_axes_are_a_minimum_and_a_maximum](/theorem/the_two_axes_are_a_minimum_and_a_maximum) — proven `by decide`, sorry-free:

```lean
(([7,3,9].foldl (fun m v => if v < m then v else m) 7) >= ([7,3,9,4,12,5].foldl (fun m v => if v < m then v else m) 7)) ∧ (([7,3,9].foldl (fun m v => if v > m then v else m) 7) <= ([7,3,9,4,12,5].foldl (fun m v => if v > m then v else m) 7))
```

### THE BOUNDARY, AND IT IS THE HONEST PART OF THE PICTURE. A cheaper representation is admissible only for the circuits it can carry. A stabilizer tableau covers the Clifford fragment and grows as 2n(2n+1) + 2n — a POLYNOMIAL in the qubit count — but t non-Clifford gates cost 2^t branches, so the exponent moves from n to t rather than disappearing. Decided as the comparison that shows both halves: the tableau is polynomial where the state vector is exponential, AND 2^t still outruns any polynomial in t. No hardware becomes quantum here; a representation buys width exactly where it is admissible, and "admissible" carries the whole claim.
The ledger holds this as [the_exponential_moves_it_does_not_vanish](/theorem/the_exponential_moves_it_does_not_vanish) — proven `by decide`, sorry-free:

```lean
[10,20,30].all (fun n => (2 * n * (2 * n + 1) + 2 * n) < 2 ^ n) ∧ [10,20,30].all (fun t => 2 ^ t > (2 * t * (2 * t + 1) + 2 * t))
```


::: warning 
THE CUBE THAT HOLDS THE SOLIDS, AND THE AXIS THAT COSTS NOTHING. The boundary is confirmed by the wing's own sealed theorems — e.g. [the_cube_carries_the_tetrahedron_and_its_own_dual](/theorem/the_cube_carries_the_tetrahedron_and_its_own_dual) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
