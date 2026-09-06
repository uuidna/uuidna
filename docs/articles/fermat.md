---
title: "Fermat's equation at a bounded window"
description: "Computed from lean/Fermat.lean — 10 sealed theorems, every claim citing its proof."
---

# Fermat's equation at a bounded window

> FERMAT'S EQUATION AT A BOUNDED WINDOW — the counts, and the refusal. Walked exhaustively over 1 ≤ x ≤ y < z ≤ 20: 100 solutions at n = 1, exactly 6 at n = 2 (the six Pythagorean triples, named), and NONE at n = 3, 4, 5, 6 — with the near-miss that shows why an empty window proves nothing beyond itself (the cube sum never equals a cube here, but lands one away twice: 6³ + 8³ = 9³ − 1 and 9³ + 10³ = 12³ + 1). WHAT IS CLAIMED HERE, IN FULL: the six counts and identities above, each decided by the kernel over its own finite domain, axiom-free. That is the whole of it. WHAT IS NOT CLAIMED, AND IS NOT THIS LEDGER'S TO CLAIM: Fermat's Last Theorem. The theorem — no solution in positive integers for any n > 2 — is Andrew Wiles's, proved in 1995 with the key step joint with Richard Taylor, standing on Frey, Serre, Ribet, Mazur, Langlands, Tunnell, Taniyama, Shimura and Weil. Its first end-to-end machine-checked formalization was completed in Lean in August 2026 and published by Anthropic on 2026-09-04, following the Darmon–Diamond–Taylor exposition of Wiles's argument, adapting 106 files with credit from Kevin Buzzard's Imperial College London FLT project and from flt-regular, built on Mathlib, and run on Prove2Me (Tianyi Peng's group, Columbia University). THE TWO ARE NOT NEIGHBOURS, AND THE DISTANCE IS MEASURABLE. That formalization is 13 million lines of Lean and 29,511 theorems, and it relies on all three of Lean's standard axioms. This wing is six theorems and roughly twelve thousand kernel cases, and relies on none — not even propext. A `by decide` walk cannot reach a statement quantified over all integers, and no amount of widening the window changes that; the window is the honest thing this kernel can say, and the near-miss is why it is said with the bound in the name. NEITHER DIRECTION OF CREDIT IS OPEN, and both are stated so that neither can be read into the silence of the other: this ledger takes no part of the FLT formalization and asserts no priority over it, and that formalization draws nothing from this ledger — its dependencies are the ones named above, and this wing did not exist when it ran. — held by [pmod_is_modular_exponentiation](/theorem/pmod_is_modular_exponentiation) and its 9 siblings below.

**10 theorems**, from [pmod_is_modular_exponentiation](/theorem/pmod_is_modular_exponentiation) onward, each proven `by decide` in <a href="/lean/Fermat.lean">lean/Fermat.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 7 of its 10 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [pmod_is_modular_exponentiation](/theorem/pmod_is_modular_exponentiation). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermat.lean)** — nothing to install. The editor fetches `lean/Fermat.lean` from the repository and re-decides all 10 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE WORKHORSE IS PROVED, NOT TRUSTED. Every obstruction in this wing is stated through pmod, so a wrong pmod would leave sixteen hundred theorems saying something other than what they appear to say — the reader would be trusting an implementation rather than reading a statement. Here the square-and-multiply definition is checked against the thing it stands in for, a^n % m, across every base under 30, every exponent under 30 and every modulus from 3 to 30: 25,200 cases decided by the same kernel that decides the obstructions. Two earlier implementations were replaced on COST, never on meaning — a^n % m built the whole power before reducing, and naive repeated multiplication took n steps where lambda(107) = 106 puts 1.19 million multiplications in one theorem — and this theorem is what makes that substitution auditable instead of a claim in a comment.
The ledger holds this as [pmod_is_modular_exponentiation](/theorem/pmod_is_modular_exponentiation) — proven `by decide`, sorry-free:

```lean
(List.range 30).all (fun a => (List.range 30).all (fun n => (List.range 28).all (fun i => pmod a n (i+3) == (a^n) % (i+3))))
```

### THE FIRST CONTROL. At n = 1 the window 1 <= x <= y < z <= 20 holds exactly 100 solutions of x + y = z — one for every way of splitting a z at or below 20 into an ordered pair. It is stated because an enumerator that returns zero is unreadable until the same enumerator has been shown returning a number on a case where solutions exist. This counts the window, and claims nothing about x + y = z beyond it.
The ledger holds this as [fermat_window_exponent_one_counts_one_hundred](/theorem/fermat_window_exponent_one_counts_one_hundred) — proven `by decide`, sorry-free:

```lean
fermatWindow 1 = 100
```

### THE SECOND CONTROL, and the one that matters: at n = 2 the same walk finds exactly 6 solutions. Squares are where the equation is generous — Pythagoras had these, and there are infinitely many, of which this window sees 6. The contrast with the higher exponents is therefore a reading of the EQUATION and not a property of the instrument, since the instrument is the same three nested ranges in both cases.
The ledger holds this as [fermat_window_exponent_two_counts_six](/theorem/fermat_window_exponent_two_counts_six) — proven `by decide`, sorry-free:

```lean
fermatWindow 2 = 6
```

### The 6 are NAMED, not merely counted: (3,4,5), (6,8,10), (5,12,13), (9,12,15), (8,15,17), (12,16,20), each verified to satisfy x^2 + y^2 = z^2. A count says how many the walk found; this says which, so the previous theorem can be checked by hand against six triples rather than trusted. Four are the 3-4-5 and its multiples; two, (5,12,13) and (8,15,17), are primitive and new at this size.
The ledger holds this as [fermat_window_names_its_six_pythagorean_triples](/theorem/fermat_window_names_its_six_pythagorean_triples) — proven `by decide`, sorry-free:

```lean
([(3,4,5), (6,8,10), (5,12,13), (9,12,15), (8,15,17), (12,16,20)] : List (Nat × Nat × Nat)).all (fun t => t.1^2 + t.2.1^2 == t.2.2^2)
```

### THE SEARCH ITSELF. For every exponent in [3,4,5,6], the window 1 <= x <= y < z <= 20 contains NO solution of x^n + y^n = z^n — four exhaustive walks, every triple decided by the kernel. WHAT THIS IS NOT: it is not Fermat's Last Theorem, and it is not evidence for it. A finite window is silent about every triple outside it, and the near-miss below is why that silence must be taken seriously rather than waved through.
The ledger holds this as [fermat_window_exponents_three_to_six_are_empty](/theorem/fermat_window_exponents_three_to_six_are_empty) — proven `by decide`, sorry-free:

```lean
[3,4,5,6].all (fun n => fermatWindow n == 0)
```

### WHY A BOUNDED SEARCH IS NOT A PROOF, stated as arithmetic instead of as a caveat. The first clause is the CLOSED WALK the word "never" owes: every z <= 20, every y < z, every x <= y with x >= 1, and not one has x^3 + y^3 = z^3. The second says the same window comes within ONE of a cube exactly 2 times. A search whose margin of failure is a single unit has told you about its window and nothing else. The universal is written out rather than folded into cubeNearMiss because a name that says "never" must be answerable from the proposition — one step is not a walk.
The ledger holds this as [cube_window_never_lands_but_misses_by_one_twice](/theorem/cube_window_never_lands_but_misses_by_one_twice) — proven `by decide`, sorry-free:

```lean
((List.range 21).all (fun z => (List.range z).all (fun y => (List.range (y+1)).all (fun x => x == 0 || !(x^3 + y^3 == z^3))))) ∧ cubeNearMiss 1 = 2
```

### The two near-misses, named. 6^3 + 8^3 = 728 = 9^3 - 1, and 9^3 + 10^3 = 1729 = 12^3 + 1 — the second being Ramanujan's taxicab number, famous for being two cubes two ways and here for a different reason: it sits one above 12^3. Both are exhibited rather than described, so the previous theorem's count of 2 can be read off two lines of arithmetic.
The ledger holds this as [cube_near_misses_are_the_taxicab_and_its_neighbour](/theorem/cube_near_misses_are_the_taxicab_and_its_neighbour) — proven `by decide`, sorry-free:

```lean
6^3 + 8^3 + 1 = 9^3 ∧ 9^3 + 10^3 = 12^3 + 1 ∧ 9^3 + 10^3 = 1729
```

### EULER'S ENGINE FOR n = 3, and the ledger's own ring. Every cube is 0, 1 or 8 modulo 9 — nine residues checked, three values reached — because lambda(9) = 6 and gcd(3,6) = 3 collapses the six units onto two. A cube coprime to 3 is therefore ±1 mod 9, and ±1 ± 1 never returns to ±1. Credited to Euler, whose 1770 argument for the cubic case rests on it; sealed here as the arithmetic, not as the descent that follows it.
The ledger holds this as [cube_residues_mod_nine_are_zero_one_eight](/theorem/cube_residues_mod_nine_are_zero_one_eight) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun a => [0,1,8].contains ((a^3) % 9))
```

### THE ENGINE FOR n = 4. Every fourth power is 0 or 1 modulo 16 — sixteen residues checked, two values reached. An odd fourth power is therefore 1, and 1 + 1 = 2 is neither, which is the whole of the coprime case at exponent four. Fermat proved the full n = 4 case by infinite descent, which this does not reproduce and does not replace; the table is the finite part.
The ledger holds this as [fourth_power_residues_mod_sixteen_are_zero_or_one](/theorem/fourth_power_residues_mod_sixteen_are_zero_or_one) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun a => [0,1].contains ((a^4) % 16))
```

### SOPHIE GERMAIN'S PRIMES BELOW 100: 2, 3, 5, 11, 23, 29, 41, 53, 83, 89 — each p prime with 2p + 1 also prime, both halves decided by trial division rather than asserted. Germain proved in 1823 that for such a p the coprime case at exponent p is impossible, and the mechanism is exactly the reduction this wing is built on: modulo q = 2p + 1 we have lambda(q) = 2p, so gcd(p, 2p) = p collapses the p-th powers onto {0, 1, q - 1} and leaves no room for a sum. The theorem is hers; the list is a decidable fact about small integers.
The ledger holds this as [sophie_germain_primes_below_one_hundred](/theorem/sophie_germain_primes_below_one_hundred) — proven `by decide`, sorry-free:

```lean
[2,3,5,11,23,29,41,53,83,89].all (fun p => (List.range p).all (fun d => d < 2 || p % d != 0 || d * d > p) && (List.range (2*p+1)).all (fun d => d < 2 || (2*p+1) % d != 0 || d * d > (2*p+1)))
```


## References

The external work this wing stands on. These are not sealed theorems and this ledger claims none of them — each is somebody else's result, cited by the DOI its own prose carries and resolved from the registry of record.

1. Ribet, K. A. (1990). On modular representations of $$(\bar Q/Q)$$ arising from modular forms. Inventiones Mathematicae. [https://doi.org/10.1007/BF01231195](https://doi.org/10.1007/BF01231195)
1. Mazur, Barry. (1977). Modular curves and the Eisenstein ideal. Publications Mathématiques de l'IHÉS. [https://doi.org/10.1007/BF02684339](https://doi.org/10.1007/BF02684339)
1. Laubenbacher, Reinhard; Pengelley, David. (2010). “Voici ce que j’ai trouvé:” Sophie Germain’s grand plan to prove Fermat’s Last Theorem. Historia Mathematica. [https://doi.org/10.1016/j.hm.2009.12.002](https://doi.org/10.1016/j.hm.2009.12.002)
1. Tunnell, Jerrold. (1981). Artin’s conjecture for representations of octahedral type. Bulletin of the American Mathematical Society. [https://doi.org/10.1090/S0273-0979-1981-14936-3](https://doi.org/10.1090/S0273-0979-1981-14936-3)
1. Serre, Jean-Pierre. (1987). Sur les représentations modulaires de degré 2 de Gal(Q¯/Q). Duke Mathematical Journal. [https://doi.org/10.1215/S0012-7094-87-05413-5](https://doi.org/10.1215/S0012-7094-87-05413-5)
1. Wiles, Andrew. (1995). Modular Elliptic Curves and Fermat's Last Theorem. The Annals of Mathematics. [https://doi.org/10.2307/2118559](https://doi.org/10.2307/2118559)
1. Taylor, Richard; Wiles, Andrew. (1995). Ring-Theoretic Properties of Certain Hecke Algebras. The Annals of Mathematics. [https://doi.org/10.2307/2118560](https://doi.org/10.2307/2118560)
1. Darmon, H.; Diamond, F.; Taylor, R. (1995). Fermat’s Last Theorem. Current Developments in Mathematics. [https://doi.org/10.4310/CDM.1995.v1995.n1.a1](https://doi.org/10.4310/CDM.1995.v1995.n1.a1)

::: warning 
FERMAT'S EQUATION AT A BOUNDED WINDOW — the counts, and the refusal. The boundary is confirmed by the wing's own sealed theorems — e.g. [pmod_is_modular_exponentiation](/theorem/pmod_is_modular_exponentiation) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
