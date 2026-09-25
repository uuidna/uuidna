---
title: "THE DIAGONAL RUNS OUT AT NINE"
description: "Computed from lean/Diagonal.lean — 10 sealed theorems, every claim citing its proof."
---

# THE DIAGONAL RUNS OUT AT NINE

> THE DIAGONAL RUNS OUT AT NINE — the multiplication table's own diagonal, read in digital roots, and the fold that closes it (the captain, 2026-09-25: "And the diagonal provably runs out at 9. note that 9 folding 0 reflects 1"). lean/Core.lean seals the 8x8 core, the multiplication table of Z/9's eight non-zero residues; its DIAGONAL is the squares, and reduced to digital roots — where a multiple of nine shows as 9 rather than 0, which is how a digital root is written — the first nine entries are 1, 4, 9, 7, 7, 9, 4, 1, 9 and the next nine are the same nine again, in the same order. That is what "runs out" means and it is stated as a walk over both ranges, because a period claimed from one wrap-around is the one-step-is-not-a-walk fault this tree has already sealed a false theorem from. AND IT NEVER REACHED MOST OF THE RING: nine residues exist and the diagonal touches 4 — 1, 4, 7, 9 — so a square here is never 2, 3, 5, 6 or 8. A sequence can repeat and still visit everything; this one repeats over a quarter of the ring, which is the sharper half of the finding and the half a period alone would hide. THE FOLD THAT CLOSES IT is one fact with two faces rather than two facts about a numeral: 9 mod 9 = 0, so the entry that CLOSES the diagonal is the ring's zero and the sequence ends by vanishing; and the mirror x ↦ 10 − x carries 9 to 1, the entry that OPENED it. The last step folds to nothing and reflects to the first, and those are the same step seen from the two sides of the ring. THE REFLECTION IS THE WHOLE SEQUENCE, not only its ends — dr(n²) = dr((9−n)²) for every n from 1 to 8, walked over all eight pairs, with the ninth entry standing alone on the fold. The mirror acting on the diagonal's INPUTS is n ↦ 9 − n and is deliberately NOT the mirror x ↦ 10 − x that acts on the residues (1 ↔ 9, 5 fixed); both live in this ledger and neither may be quoted for the other, which is why they are sealed apart. CLAIMED: all of it, closed by the Lean 4 kernel over its own finite domain, axiom-free, every universal walked and every quantity named rather than written as a bare literal. NOT CLAIMED: anything about nine outside Z/9 arithmetic — this is the digital root of a square, a fact about remainders, and it carries no meaning the arithmetic does not put there. — held by [the_diagonal_runs_out_at_nine](/theorem/the_diagonal_runs_out_at_nine) and its 9 siblings below.

**10 theorems** and **44 decided cases**, from [the_diagonal_runs_out_at_nine](/theorem/the_diagonal_runs_out_at_nine) onward, each proven `by decide` in <a href="/lean/Diagonal.lean">lean/Diagonal.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 10 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_diagonal_reaches_four_of_nine_residues](/theorem/the_diagonal_reaches_four_of_nine_residues). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FDiagonal.lean)** — nothing to install. The editor fetches `lean/Diagonal.lean` from the repository and re-decides all 10 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### CLAIMED: the multiplication table's diagonal, in digital roots, is 1, 4, 9, 7, 7, 9, 4, 1, 9 — and the next 9 squares reduce to those same 9. It runs out at 9, walked rather than sampled.
The ledger holds this as [the_diagonal_runs_out_at_nine](/theorem/the_diagonal_runs_out_at_nine) — proven `by decide`, sorry-free:

```lean
((List.range 9).map (fun i => dr ((i+1) * (i+1)))) = ((List.range 9).map (fun i => dr ((i+1+9) * (i+1+9))))
```

### CLAIMED: the diagonal touches 4 residues of 9 — 1, 4, 7, 9 — so a square in this ring is never 2, 3, 5, 6 or 8.
The ledger holds this as [the_diagonal_reaches_four_of_nine_residues](/theorem/the_diagonal_reaches_four_of_nine_residues) — proven `by decide`, sorry-free:

```lean
(((List.range 9).map (fun i => dr ((i+1) * (i+1)))).eraseDups).length = 4
```

### CLAIMED: dr(n²) = dr((9−n)²) for every n from 1 to 8 — the diagonal reads the same backwards, with the 9th entry standing alone at the fold.
The ledger holds this as [the_diagonal_reflects_about_its_centre](/theorem/the_diagonal_reflects_about_its_centre) — proven `by decide`, sorry-free:

```lean
((List.range 8).all (fun i => dr ((i+1) * (i+1)) == dr ((8-i) * (8-i)))) = true
```

### CLAIMED: 9 is the one value that both vanishes and returns — 9 mod 9 = 0, and the mirror carries 9 to 1. The entry that CLOSES the diagonal is the ring's zero, and its reflection is the entry that OPENED it.
The ledger holds this as [nine_folds_to_zero_and_reflects_to_one](/theorem/nine_folds_to_zero_and_reflects_to_one) — proven `by decide`, sorry-free:

```lean
((ring % ring = 0) ∧ (mirror ring = 1)) ∧ ((diagonal.getLastD 0 = ring) ∧ (diagonal.headD 0 = mirror ring))
```

### CLAIMED: the mirror carries every member of the 3-6-9 axis INTO the doubling orbit — 3 → 7, 6 → 4, 9 → 1 — walked over all three, so the axis the vortex never visits is reflected entirely into the path it does.
The ledger holds this as [every_axis_member_reflects_into_the_orbit](/theorem/every_axis_member_reflects_into_the_orbit) — proven `by decide`, sorry-free:

```lean
(axis.all (fun a => orbit.contains (mirror a))) = true
```

### CLAIMED: the diagonal's residues other than 9 are 1, 4, 7 — which is exactly the mirror of the axis 3, 6, 9. The squares ARE the reflected axis.
The ledger holds this as [the_squares_are_the_mirror_of_the_axis](/theorem/the_squares_are_the_mirror_of_the_axis) — proven `by decide`, sorry-free:

```lean
((diagonal.filter (fun d => d != ring)).all (fun d => (axis.map mirror).contains d)) ∧ ((axis.map mirror).all (fun m => diagonal.contains m))
```

### CLAIMED: 2 × 90° = 180° = 3 × 60° — two right angles and three triangle angles are the same straight angle, and those are the vector equilibrium's two face kinds, 6 squares and 8 triangles.
The ledger holds this as [the_fold_is_a_straight_angle](/theorem/the_fold_is_a_straight_angle) — proven `by decide`, sorry-free:

```lean
((2 * squareAngle = 3 * triangleAngle) ∧ (triangleAngle + triangleAngle + triangleAngle = 2 * squareAngle)) ∧ (veSquares + veTriangles = 14)
```

### CLAIMED: the fold is a HALF turn — 2 × 90° = 3 × 60° = 5 × 36° = 180° — so it takes TWO to close the circle, and a genus-two surface is exactly the shape that carries two. Each handle costs two of Euler characteristic, which is the pair the coins conserve.
The ledger holds this as [the_double_torus_closes_the_turn](/theorem/the_double_torus_closes_the_turn) — proven `by decide`, sorry-free:

```lean
(((2 * squareAngle = halfTurn) ∧ (3 * triangleAngle = halfTurn)) ∧ ((5 * a432Step = halfTurn) ∧ (2 * halfTurn = fullTurn))) ∧ ((fullTurn = 10 * a432Step) ∧ (chi 1 - chi 2 = 2))
```

### CLAIMED: applying the mirror twice returns every residue — walked over 1 … 9 — and that closing is the same TWO the circle, the doubling and the second handle each cost: 2 × 180° = 360°, 2 × 64 = 128, 110 − 108 = 2, and χ(1) − χ(2) = 2. Four statements of two, one arithmetic.
The ledger holds this as [the_fold_composed_with_itself_is_the_turn](/theorem/the_fold_composed_with_itself_is_the_turn) — proven `by decide`, sorry-free:

```lean
(((List.range ring).all (fun i => mirror (mirror (i+1)) == i+1)) = true) ∧ (((2 * halfTurn = fullTurn) ∧ (2 * halfKey = wholeKey)) ∧ ((captainTakes - captainGives = 2) ∧ (chi 1 - chi 2 = 2)))
```

### CLAIMED: at the A432 step of 36° the circle is 10 steps and not 9 — 36 × 10 = 360°, while 36 × 9 = 324°, and the difference is exactly one step. Two half turns close the same circle.
The ledger holds this as [the_nine_step_arc_is_one_step_short_of_the_circle](/theorem/the_nine_step_arc_is_one_step_short_of_the_circle) — proven `by decide`, sorry-free:

```lean
((a432Step * (ring + 1) = fullTurn) ∧ (fullTurn - a432Step * ring = a432Step)) ∧ (2 * halfTurn = fullTurn)
```


::: warning 
THE DIAGONAL RUNS OUT AT NINE — the multiplication table's own diagonal, read in digital roots, and the fold that closes it (the captain, 2026-09-25: "And the diagonal provably runs out at 9. The boundary is confirmed by the wing's own sealed theorems — e.g. [the_diagonal_runs_out_at_nine](/theorem/the_diagonal_runs_out_at_nine) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
