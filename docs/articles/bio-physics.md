---
title: "Applied structure — the science pairs"
description: "Computed from lean/BioPhysics.lean — 16 sealed theorems, every claim citing its proof."
---

# Applied structure — the science pairs

> The ALGEBRAIC STRUCTURE across the sciences — eight paired structures: blood (Klein four-group), DNA (base-pair involution + codons 4³), sound (432 ladder + octave), chemistry (2n² shells, 4l+2 subshells), music (circle of fifths + tritone in ℤ/12), acid-base (pH reflection through 7), heredity (Mendelian 3:1 + allele-swap involution), colour (ℤ/6 complement wheel). HONEST SCOPE: the combinatorial skeleton only — NOT a medical, genetic, chemical or physical claim about any person or measurement.

**16 theorems**, each proven `by decide` in [lean/BioPhysics.lean](/lean/BioPhysics.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### the ABO blood groups {O,A,B,AB} form a Klein four-group: 2 antigen bits under XOR — closed, commutative, each self-inverse (order ≤ 2)

The ledger holds this as [abo_klein_four](/theorem/abo_klein_four) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun a => (List.range 4).all (fun b => (lxor a b < 4) && (lxor a b == lxor b a)) && (lxor a a == 0))
```

### with the Rh ± bit the blood system is (ℤ/2)³ — exactly 2³ = 8 blood types (A±,B±,AB±,O±)

The ledger holds this as [blood_types_eight](/theorem/blood_types_eight) — proven `by decide`, sorry-free:

```lean
(2:Nat)^3 = 8
```

### DNA base-pairing is a fixed-point-free involution on 4 bases (A↔T, G↔C ≡ b↦b⊕1): self-inverse, no base pairs with itself, 2 complementary pairs

The ledger holds this as [dna_base_pairing_involution](/theorem/dna_base_pairing_involution) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun b => (lxor (lxor b 1) 1 == b) && (lxor b 1 != b))
```

### a codon is 3 bases over a 4-letter alphabet — exactly 4³ = 64 codons

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


::: warning HONEST SCOPE
the combinatorial skeleton only — NOT a medical, genetic, chemical or physical claim about any person or measurement.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
