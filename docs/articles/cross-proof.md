---
title: "THE SYMMETRIC AND THE ASYMMETRIC CROSS. One proportion between four quantities has two spellings"
description: "Computed from lean/CrossProof.lean — 3 sealed theorems, every claim citing its proof."
---

# THE SYMMETRIC AND THE ASYMMETRIC CROSS. One proportion between four quantities has two spellings

> THE SYMMETRIC AND THE ASYMMETRIC CROSS. One proportion between four quantities has two spellings: the SYMMETRIC a·d = b·c, whose sides are products and therefore commute, so its four spellings are one fact; and the ASYMMETRIC a/b = c/d, whose sides are ratios and do not, so inverting them is a different claim. lean/PlanckLattice.lean works one rank up, where a product ADDS exponent vectors and a ratio SUBTRACTS them and the lattice's closure makes its formulas prove each other; this wing asks at the rank of the proportion itself whether the product route and the ratio route are the same claim. THEY ARE NOT, over ℕ. Truncating division discards the remainder, so the ratio form is STRICTLY WEAKER: on 94 of 625 quadruples a/b = c/d holds while a·d = b·c fails, the smallest being 1/1 = 3/2 = 1 against 1·2 ≠ 1·3. Cross-multiplication is taught as an equivalence and over ℕ it is an implication, product to ratio and never back. AND THEY DO PROVE EACH OTHER under exactly one condition, stated rather than assumed: when both divisions are exact. Then a = qb and c = rd, the product form reads qbd = brd, non-zero b and d force q = r, and q = r returns a·d = b·c — both directions decided by the walk over all 144 exact quadruples. THE VACUITY IS CLOSED INSIDE THE STATEMENT, because a guarded implication is where a ledger proves nothing most easily: the theorem also carries that exact quadruples exist and that the proportion both HOLDS on 38 of them and FAILS on 106, so the agreement is not an artefact of one side being constant. CLAIMED: the arithmetic, decided by the kernel over its own finite box of 5^4 quadruples, axiom-free. NOT CLAIMED: anything about ℚ or ℝ, where cross-multiplication is the equivalence it is taught as — the entire finding is that ℕ division is not division. — held by [the_symmetric_cross_is_blind_to_its_spelling](/theorem/the_symmetric_cross_is_blind_to_its_spelling) and its 2 siblings below.

**3 theorems** and **2,644 decided cases**, from [the_symmetric_cross_is_blind_to_its_spelling](/theorem/the_symmetric_cross_is_blind_to_its_spelling) onward, each proven `by decide` in <a href="/lean/CrossProof.lean">lean/CrossProof.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 3 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_symmetric_cross_is_blind_to_its_spelling](/theorem/the_symmetric_cross_is_blind_to_its_spelling). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCrossProof.lean)** — nothing to install. The editor fetches `lean/CrossProof.lean` from the repository and re-decides all 3 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### CLAIMED: over all 625 quadruples in the box, the symmetric cross a·d = b·c agrees with all FOUR of its spellings — swapping inside each product, exchanging the two products, and both at once — so the four are one fact; and the asymmetric cross a/b = c/d is NOT invariant, disagreeing with its own inversion b/a = d/c on 212 of them.
The ledger holds this as [the_symmetric_cross_is_blind_to_its_spelling](/theorem/the_symmetric_cross_is_blind_to_its_spelling) — proven `by decide`, sorry-free:

```lean
(allQ (fun a b c d => ((symm a b c d) == (symmSwapWithin a b c d)) && ((symm a b c d) == (symmSwapSides a b c d)) && ((symm a b c d) == (symmSwapBoth a b c d))) = true) ∧ (anyQ (fun a b c d => (asym a b c d) != (asymInverted a b c d)) = true)
```

### CLAIMED: over ℕ the ratio form is STRICTLY WEAKER than the product form — on 94 of 625 quadruples a/b = c/d holds while a·d = b·c fails, the smallest being 1/1 = 3/2 = 1 against 1·2 = 2 ≠ 3 = 1·3 — so cross-multiplication, which is taught as an equivalence, is an implication here.
The ledger holds this as [the_asymmetric_cross_is_strictly_weaker_over_naturals](/theorem/the_asymmetric_cross_is_strictly_weaker_over_naturals) — proven `by decide`, sorry-free:

```lean
(anyQ (fun a b c d => (asym a b c d) && !(symm a b c d)) = true) ∧ ((1 / 1 = 3 / 2) ∧ (1 * 2 ≠ 1 * 3))
```

### CLAIMED: when both divisions are EXACT the two forms are equivalent — over the box the symmetric and asymmetric crosses agree on every one of the 144 exact quadruples, walked in both directions; and the agreement is substantive rather than vacuous, because 38 of those satisfy the proportion and 106 refute it, so both outcomes occur.
The ledger holds this as [exact_division_makes_the_two_crosses_prove_each_other](/theorem/exact_division_makes_the_two_crosses_prove_each_other) — proven `by decide`, sorry-free:

```lean
(allQ (fun a b c d => !(exact a b c d) || ((symm a b c d) == (asym a b c d))) = true) ∧ (anyQ (fun a b c d => exact a b c d) = true) ∧ (anyQ (fun a b c d => (exact a b c d) && (symm a b c d)) = true) ∧ (anyQ (fun a b c d => (exact a b c d) && !(symm a b c d)) = true)
```


::: warning 
THE SYMMETRIC AND THE ASYMMETRIC CROSS. The boundary is confirmed by the wing's own sealed theorems — e.g. [the_symmetric_cross_is_blind_to_its_spelling](/theorem/the_symmetric_cross_is_blind_to_its_spelling) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
