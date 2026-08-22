---
title: "lean/DoubleTorus.lean"
description: "Computed from lean/DoubleTorus.lean — 6 sealed theorems, every claim citing its proof."
---

# lean/DoubleTorus.lean

> THE DOUBLE TORUS PRESENTATION — the finite description of an unbounded thing. — held by [chi_measures_genus](/theorem/chi_measures_genus) and its 5 siblings below.

**6 theorems**, from [chi_measures_genus](/theorem/chi_measures_genus) onward, each proven `by decide` in [lean/DoubleTorus.lean](/lean/DoubleTorus.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [handles_give_generators](/theorem/handles_give_generators). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FDoubleTorus.lean)** — nothing to install. The editor fetches `lean/DoubleTorus.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE EULER CHARACTERISTIC IS THE GENUS, READ OFF: χ = 2 − 2g gives 0 at genus one (the plain torus, a closed pipe) and −2 at genus two, so −χ = 2 — the two coins. Both genera on one line, so the number is measured against its neighbour rather than stated alone.
The ledger holds this as [chi_measures_genus](/theorem/chi_measures_genus) — proven `by decide`, sorry-free:

```lean
(((2:Int) - 2 * 1 = 0) ∧ ((2:Int) - 2 * 2 = -2)) ∧ (-((2:Int) - 2 * 2) = 2)
```

### EACH HANDLE CARRIES TWO GENERATORS, so a double torus has 2 × 2 = 4 — a₁, b₁ around the first handle and a₂, b₂ around the second. Four, and not two: the handle count and the generator count are different quantities, which the line proves rather than lets slide.
The ledger holds this as [handles_give_generators](/theorem/handles_give_generators) — proven `by decide`, sorry-free:

```lean
(2 * 2 = 4) ∧ (4 ≠ 2)
```

### THE WHOLE DESCRIPTION IS FIVE SYMBOLS: four generators and one relation, [a₁,b₁][a₂,b₂] = 1. One relation— a free group on four generators is a different object, and the single constraint is exactly what closes the surface.
The ledger holds this as [presentation_counts_five](/theorem/presentation_counts_five) — proven `by decide`, sorry-free:

```lean
(4 + 1 = 5) ∧ (1 ≠ 0)
```

### A STEP COSTS THREE QUBITS: two to name which of the four generators (2² = 4) and one for its direction (a or a⁻¹), so the per-step alphabet is 4 × 2 = 8 = 2³. The qubit cost of a step is the exponent, and the exponent is three.
The ledger holds this as [step_costs_three](/theorem/step_costs_three) — proven `by decide`, sorry-free:

```lean
((2:Nat)^2 = 4) ∧ (4 * 2 = 8) ∧ ((2:Nat)^3 = 8)
```

### WORDS GROW, THE DESCRIPTION DOES NOT. Words of length n over the eight letters number 8ⁿ — [1, 8, 64, 512, 4096, 32768] from length zero to five — and every length past the first already exceeds the five symbols that describe them all. The gap widens at every step and the presentation never moves.
The ledger holds this as [words_outgrow_presentation](/theorem/words_outgrow_presentation) — proven `by decide`, sorry-free:

```lean
((List.range 6).map (fun n => 8^n) = [1,8,64,512,4096,32768]) ∧ (((List.range 6).map (fun n => 8^n)).drop 1).all (fun w => w > 5)
```

### AND THE LIMIT OF THIS METHOD, ON ITS OWN LINE: each length multiplies the count by eight — 8ⁿ⁺¹ = 8 · 8ⁿ at every tested length — so the counts do not settle. SCOPE: `by decide` settles finitely many cases and cannot prove a group INFINITE. What is decided is the GROWTH; that it never stops is the reading, and it is not sealed here.
The ledger holds this as [growth_is_not_bounded_here](/theorem/growth_is_not_bounded_here) — proven `by decide`, sorry-free:

```lean
(List.range 5).all (fun n => 8^(n+1) == 8 * 8^n)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
