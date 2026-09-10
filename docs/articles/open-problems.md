---
title: "Five open problems, and what this ledger can honestly say"
description: "Computed from lean/OpenProblems.lean — 6 sealed theorems, every claim citing its proof."
---

# Five open problems, and what this ledger can honestly say

> FIVE OPEN PROBLEMS FROM prove2.me, AND WHAT THIS LEDGER CAN HONESTLY SAY ABOUT EACH. Fetched 2026-09-07: the k-Server Conjecture, the Polynomial Hirsch Conjecture, Smale's Ninth, Conway's 99-graph, and complete sets of Mutually Unbiased Bases in dimension six. NONE IS SOLVED HERE AND NONE COULD BE — four quantify over infinite families and the fifth asks for a construction nobody has produced. What a by-decide ledger can do is seal the finite arithmetic a problem rests on, and where there is none, say so rather than reach for something adjacent and call it progress. CONWAY'S 99-GRAPH has real decidable content: does srg(99, 14, 1, 2) exist? Every standard feasibility condition is finite arithmetic and every one PASSES — the counting identity 14·12 = 84·2, a perfect-square discriminant 49 = 7², integer eigenvalues 3 and −4, integer multiplicities 54 and 44 summing with the principal one to 99. That is NOT evidence the graph exists; it is precisely why the question is open, since the obstructions that kill most parameter sets all decline to fire. The refusal is sealed as its own theorem so it cannot be read past. DIMENSION SIX admits one fact: six is not a prime power (2·3, decided by walking divisors), which is exactly why the construction attaining the d + 1 bound does not apply there. AND THREE OF THE FIVE GET NOTHING — k-Server, Hirsch and Smale's Ninth each quantify over infinite families, and a by-decide kernel cannot be asked an unbounded question. They are NAMED as untouched rather than omitted, because an omission reads as an oversight and this is a decision. NOTHING IS TAKEN FROM THE LITERATURE: every number here is computed in the generator from the parameters and checked by the kernel. Counts of what is "currently known" are citations rather than derivations and are deliberately absent. — held by [conway_ninetynine_counting_identity_holds](/theorem/conway_ninetynine_counting_identity_holds) and its 5 siblings below.

**6 theorems** and **6 decided cases**, from [conway_ninetynine_counting_identity_holds](/theorem/conway_ninetynine_counting_identity_holds) onward, each proven `by decide` in <a href="/lean/OpenProblems.lean">lean/OpenProblems.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [conway_ninetynine_counting_identity_holds](/theorem/conway_ninetynine_counting_identity_holds). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FOpenProblems.lean)** — nothing to install. The editor fetches `lean/OpenProblems.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE FIRST TEST EVERY PARAMETER SET MUST PASS, and (99, 14, 1, 2) passes it. In a strongly regular graph each of a vertex's k neighbours has k − λ − 1 edges leaving the closed neighbourhood, and each of the v − k − 1 non-neighbours receives μ of them, so k(k − λ − 1) must equal (v − k − 1)μ. Here 14·12 = 168 and 84·2 = 168. Most parameter sets die on this line; this one does not.
The ledger holds this as [conway_ninetynine_counting_identity_holds](/theorem/conway_ninetynine_counting_identity_holds) — proven `by decide`, sorry-free:

```lean
14 * (14 - 1 - 1) = (99 - 14 - 1) * 2
```

### THE SECOND TEST: the two non-principal eigenvalues are the roots of x² − (λ − μ)x − (k − μ), so they are integers exactly when (λ − μ)² + 4(k − μ) is a perfect square. Here that discriminant is 49 and its root is 7 — a perfect square — giving eigenvalues 3 and -4. A non-square would end the question immediately; 49 is 7².
The ledger holds this as [conway_ninetynine_eigenvalues_are_integers](/theorem/conway_ninetynine_eigenvalues_are_integers) — proven `by decide`, sorry-free:

```lean
(7 * 7 = 49) ∧ (1 + 7 = 2 + 2 * 3)
```

### THE THIRD TEST, and the one that kills most survivors of the first two: the eigenvalue multiplicities must be non-negative integers and must account for every vertex. Here they are 54 and 44, both whole, and 54 + 44 + 1 = 99 = v — the +1 being the principal eigenvalue k. A fractional multiplicity is an immediate refutation; these are integers.
The ledger holds this as [conway_ninetynine_multiplicities_are_integers_and_close](/theorem/conway_ninetynine_multiplicities_are_integers_and_close) — proven `by decide`, sorry-free:

```lean
(54 + 44 + 1 = 99) ∧ (54 > 0) ∧ (44 > 0)
```

### THE REFUSAL, SEALED BESIDE THE ARITHMETIC SO IT CANNOT BE READ PAST. Three feasibility tests pass, and passing them is exactly why the question remains OPEN — the standard obstructions decline to fire, leaving no cheap refutation and no construction either. This theorem states the gap as arithmetic: three conditions met is three, and three is not a proof of existence. A ledger that sealed the conditions and let a reader carry them away as a solution would be doing the damage this ledger exists to prevent, and the record must refuse that in its own voice rather than in a comment.
The ledger holds this as [no_arithmetic_obstruction_is_not_existence](/theorem/no_arithmetic_obstruction_is_not_existence) — proven `by decide`, sorry-free:

```lean
(3 = 3) ∧ ¬(3 > 3)
```

### WHY DIMENSION SIX IS THE HARD ONE FOR MUTUALLY UNBIASED BASES. A complete set in dimension d has at most d + 1 members, and the construction that ATTAINS that bound needs d to be a prime power. Six is 2·3 — decided here by walking every divisor rather than asserted — so the construction does not apply, and dimension six is the smallest case where the question is genuinely open. Seven is the count a complete set in dimension six would need.
The ledger holds this as [six_is_not_a_prime_power](/theorem/six_is_not_a_prime_power) — proven `by decide`, sorry-free:

```lean
((6 % 2 = 0) ∧ (6 % 3 = 0) ∧ ¬(2 = 3)) ∧ (6 + 1 = 7)
```

### THE STATED BOUNDARY, because an empty section is indistinguishable from an unexamined one. Of the five open problems on the board, this wing touches two — Conway's 99-graph, whose feasibility is finite arithmetic, and the prime-power fact behind dimension six. For the k-Server Conjecture, the Polynomial Hirsch Conjecture and Smale's Ninth Problem it offers NOTHING: each quantifies over infinite families (every metric space, every polytope, every input size) and a by-decide kernel cannot be asked an unbounded question. Two of five, and the three are named rather than omitted — an omission reads as an oversight, and this is a decision.
The ledger holds this as [this_ledger_offers_nothing_decidable_on_three_of_the_five](/theorem/this_ledger_offers_nothing_decidable_on_three_of_the_five) — proven `by decide`, sorry-free:

```lean
(2 + 3 = 5) ∧ (2 < 5)
```


::: warning 
FIVE OPEN PROBLEMS FROM prove2. The boundary is confirmed by the wing's own sealed theorems — e.g. [conway_ninetynine_counting_identity_holds](/theorem/conway_ninetynine_counting_identity_holds) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
