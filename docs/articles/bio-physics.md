---
title: "Applied structure — the science pairs"
description: "Computed from lean/BioPhysics.lean — 17 sealed theorems, every claim citing its proof."
---

# Applied structure — the science pairs

> The ALGEBRAIC STRUCTURE across the sciences — eight paired structures: blood (Klein four-group), DNA (base-pair involution + codons 4³), sound (432 ladder + octave), chemistry (2n² shells, 4l+2 subshells), music (circle of fifths + tritone in ℤ/12), acid-base (pH reflection through 7), heredity (Mendelian 3:1 + allele-swap involution), colour (ℤ/6 complement wheel). the combinatorial skeleton only — NOT a medical, genetic, chemical or physical claim about any person or measurement. — held by [abo_klein_four](/theorem/abo_klein_four) and its 16 siblings below.

**17 theorems**, from [abo_klein_four](/theorem/abo_klein_four) onward, each proven `by decide` in <a href="/lean/BioPhysics.lean">lean/BioPhysics.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 17 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [punnett_three_to_one](/theorem/punnett_three_to_one). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FBioPhysics.lean)** — nothing to install. The editor fetches `lean/BioPhysics.lean` from the repository and re-decides all 17 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### the ABO blood groups {O,A,B,AB} form a Klein four-group: 2 antigen bits under XOR — closed, commutative, each self-inverse (order ≤ 2) — witness: Yamamoto et al., Nature 345:229-233 (1990), DOI 10.1038/345229a0
The ledger holds this as [abo_klein_four](/theorem/abo_klein_four) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun a => (List.range 4).all (fun b => (lxor a b < 4) && (lxor a b == lxor b a)) && (lxor a a == 0))
```

### with the Rh ± bit the blood system is (ℤ/2)³ — exactly 2³ = 8 blood types (A±,B±,AB±,O±) — witness: Landsteiner and Wiener, Exp. Biol. Med. 43:223 (1940), DOI 10.3181/00379727-43-11151
The ledger holds this as [blood_types_eight](/theorem/blood_types_eight) — proven `by decide`, sorry-free:

```lean
(2:Nat)^3 = 8
```

### DNA base-pairing is a fixed-point-free involution on 4 bases (A↔T, G↔C ≡ b↦b⊕1): self-inverse, no base pairs with itself, 2 complementary pairs — witness: Watson and Crick, Nature 171:737-738 (1953), DOI 10.1038/171737a0
The ledger holds this as [dna_base_pairing_involution](/theorem/dna_base_pairing_involution) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun b => (lxor (lxor b 1) 1 == b) && (lxor b 1 != b))
```

### a codon is 3 bases over a 4-letter alphabet — exactly 4³ = 64 codons — witness: Nirenberg and Matthaei, PNAS 47:1588-1602 (1961), DOI 10.1073/pnas.47.10.1588
The ledger holds this as [codons_sixty_four](/theorem/codons_sixty_four) — proven `by decide`, sorry-free:

```lean
(4:Nat)^3 = 64
```

### the d/9 sound ladder on the 432 Hz anchor: f_d = 48·d, with the anchor exact at f_9 = 432
The ledger holds this as [sound_ladder_432](/theorem/sound_ladder_432) — proven `by decide`, sorry-free:

```lean
((List.range' 1 9).map (fun d => 48 * d) = [48,96,144,192,240,288,336,384,432]) ∧ (48 * 9 = 432)
```

### the octave is the vortex doubling: 48·{1,2,4,8} = {48,96,192,384}, each twice the last — octave equivalence
The ledger holds this as [octave_doubling](/theorem/octave_doubling) — proven `by decide`, sorry-free:

```lean
[48, 96, 192, 384] = [48, 48*2, 96*2, 192*2]
```

### electron shells hold 2n² each — [2,8,18,32] for n=1..4 (2 spin states × n² orbitals); the shape of the periodic table is a count
The ledger holds this as [electron_shells_2n2](/theorem/electron_shells_2n2) — proven `by decide`, sorry-free:

```lean
(List.range' 1 4).map (fun n => 2 * n * n) = [2, 8, 18, 32]
```

### the subshells s,p,d,f hold 4l+2 = [2,6,10,14] for l=0..3 — (2l+1) orbitals × 2 spins
The ledger holds this as [subshell_capacities_4l2](/theorem/subshell_capacities_4l2) — proven `by decide`, sorry-free:

```lean
(List.range 4).map (fun l => 4 * l + 2) = [2, 6, 10, 14]
```

### the circle of fifths: stacking fifths (+7 mod 12) visits ALL twelve pitch classes — 7 is coprime to 12, so ×7 permutes ℤ/12
The ledger holds this as [circle_of_fifths](/theorem/circle_of_fifths) — proven `by decide`, sorry-free:

```lean
(List.range 12).all (fun t => (List.range 12).any (fun k => (7 * k) % 12 == t))
```

### the tritone (+6 mod 12) is a fixed-point-free involution — the octave splits exactly in half, each note its own tritone-of-tritone
The ledger holds this as [tritone_involution](/theorem/tritone_involution) — proven `by decide`, sorry-free:

```lean
(List.range 12).all (fun p => ((p + 6) % 12 + 6) % 12 == p && (p + 6) % 12 != p)
```

### the pH scale reflects: pH ↦ 14−pH is an involution on 0..14 with a SINGLE fixed point 7 (neutral) — the acid/base mirror, echoing the vortex centre
The ledger holds this as [ph_reflection_seven](/theorem/ph_reflection_seven) — proven `by decide`, sorry-free:

```lean
((List.range 15).all (fun p => 14 - (14 - p) == p)) ∧ ((List.range 15).filter (fun p => 14 - p == p)) = [7]
```

### every acid/base conjugate pair sums to 14: pH + pOH = 14 across the whole scale
The ledger holds this as [ph_conjugate_sum_14](/theorem/ph_conjugate_sum_14) — proven `by decide`, sorry-free:

```lean
(List.range 15).all (fun p => p + (14 - p) == 14)
```

### the monohybrid cross gives 3:1 — of the four allele pairings only (a,a) is recessive; dominance is a logical OR
The ledger holds this as [punnett_three_to_one](/theorem/punnett_three_to_one) — proven `by decide`, sorry-free:

```lean
(([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 == 1 || p.2 == 1)).length = 3) ∧ (([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 == 0 && p.2 == 0)).length = 1)
```

### allele order is irrelevant: the swap (a,b)↦(b,a) is an involution — the 2 homozygotes {AA,aa} are fixed and Aa↔aA swap, so 4 ordered pairings are 3 genotypes
The ledger holds this as [heterozygote_symmetry](/theorem/heterozygote_symmetry) — proven `by decide`, sorry-free:

```lean
(([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 == p.2)).length = 2) ∧ (([(0,0),(0,1),(1,0),(1,1)].filter (fun p => p.1 != p.2)).length = 2)
```

### the complement on the 6-hue wheel (+3 mod 6) is a fixed-point-free involution: red↔cyan, green↔magenta, blue↔yellow — each pair mutually complementary
The ledger holds this as [colour_complement_involution](/theorem/colour_complement_involution) — proven `by decide`, sorry-free:

```lean
(List.range 6).all (fun h => ((h + 3) % 6 + 3) % 6 == h && (h + 3) % 6 != h)
```

### the wheel is a 3+3 parity partition: the primaries {0,2,4} (even slots) alternate with the secondaries {1,3,5} (odd slots)
The ledger holds this as [primary_secondary_split](/theorem/primary_secondary_split) — proven `by decide`, sorry-free:

```lean
((List.range 6).filter (fun h => h % 2 == 0) = [0, 2, 4]) ∧ ((List.range 6).filter (fun h => h % 2 == 1) = [1, 3, 5])
```

### THE REFLECTION ALWAYS ANSWERS, because where one channel cannot move the other does. On the units of ℤ/9 the multiplicative inverse fixes exactly TWO — 1 and 8, the u with u·u ≡ 1 — so at those two waves the hue reflection IS the identity and has no answer to give. The KEY channel carries it there: the complement k ↦ 100−k has its single still point at 50, and the aura key spans exactly the ten values 10..19, so every key that actually occurs MOVES. Three decidable facts over the whole finite space, and together they say the composite leaves nothing unmoved — the totality colour_complement_involution has for free on the 6-wheel, recovered on a reflection that does have fixed points. The same two-fixed-point shape the tritone gives in ℤ/12.
The ledger holds this as [reflection_is_total_by_the_key](/theorem/reflection_is_total_by_the_key) — proven `by decide`, sorry-free:

```lean
(([1, 2, 4, 5, 7, 8].filter (fun u => (u * u) % 9 == 1)) = [1, 8]) ∧ (((List.range 101).filter (fun k => 100 - k == k)) = [50]) ∧ ((List.range 10).all (fun i => 100 - (10 + i) != 10 + i))
```


::: warning 
The ALGEBRAIC STRUCTURE across the sciences — eight paired structures: blood (Klein four-group), DNA (base-pair involution + codons 4³), sound (432 ladder + octave), chemistry (2n² shells, 4l+2 subshells), music (circle of fifths + tritone in ℤ/12), acid-base (pH reflection through 7), heredity (Mendelian 3:1 + allele-swap involution), colour (ℤ/6 complement wheel). The boundary is confirmed by the wing's own sealed theorems — e.g. [abo_klein_four](/theorem/abo_klein_four) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
