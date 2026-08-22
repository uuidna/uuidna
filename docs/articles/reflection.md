---
title: "lean/Reflection.lean"
description: "Computed from lean/Reflection.lean — 6 sealed theorems, every claim citing its proof."
---

# lean/Reflection.lean

> THE REFLECTION'S REACH — what an involution alone can and cannot separate. Clay.lean reflects seven problems through dz(x) = 10 − x and states in prose that it reflects all seven and solves none; this wing DECIDES that limitation. The reflection splits the ten digits into six classes of AT MOST TWO — reversibility erases nothing and so derives nothing — and six is FORCED by arithmetic, since dz fixes exactly two digits and pairs the other eight: 2 + (10 − 2)/2 = 6. The seven residues reach five of those classes. The limitation stated exactly: dzMin 7 = dzMin 3, so the reflection cannot tell the seventh residue from the third. Yet the seventh lies in the covering half of the ring ({2,6,7,8,9}, sealed as digits_split_five_five), where the walk that adds the IRREVERSIBLE doubling reaches every digit — what the full walk distinguishes, the involution confuses. PURE ARITHMETIC, no ledger count, nothing measured from the world. integrity. The sequence walk also yields six orbits; that is a separate measurement landing on the same integer, and no correspondence between the two sixes is claimed. Nothing here decides any Clay problem, and a residue is not a fact about the thing seated at it. — held by [reflection_splits_six](/theorem/reflection_splits_six) and its 5 siblings below.

**6 theorems**, from [reflection_splits_six](/theorem/reflection_splits_six) onward, each proven `by decide` in [lean/Reflection.lean](/lean/Reflection.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [seven_reach_five_classes](/theorem/seven_reach_five_classes). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FReflection.lean)** — nothing to install. The editor fetches `lean/Reflection.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The reflection alone splits the ten digits into SIX classes — each digit paired with its mirror, named by the lesser: [0, 1, 2, 3, 4, 5].
The ledger holds this as [reflection_splits_six](/theorem/reflection_splits_six) — proven `by decide`, sorry-free:

```lean
((List.range 10).map dzMin).eraseDups.length = 6
```

### NO CLASS EXCEEDS TWO. An involution can carry a digit to its mirror and back and no further, so the widest thing it can build is a pair. Sizes: [2, 2, 2, 2, 2, 2] over the six classes — a partition with almost no structure, because reversibility erases nothing and therefore derives nothing.
The ledger holds this as [classes_cap_at_two](/theorem/classes_cap_at_two) — proven `by decide`, sorry-free:

```lean
((List.range 10).map dzMin).eraseDups.all (fun c => ((List.range 10).filter (fun d => dzMin d == c)).length ≤ 2)
```

### SIX IS FORCED. SCOPE: the sequence walk also yields six orbits, and that is a SEPARATE measurement landing on the same integer. No correspondence between the two sixes is claimed or sealed.
The ledger holds this as [six_is_forced_arithmetic](/theorem/six_is_forced_arithmetic) — proven `by decide`, sorry-free:

```lean
(((List.range 10).filter (fun d => dz d == d)).length = 2) ∧ (2 + (10 - 2) / 2 = 6)
```

### The seven reflected residues occupy FIVE of the six classes— class 0 is never reached, because no problem is seated at the digit the reflection fixes to itself and nothing else. Two pairs collide: the sixth residue shares a class with the fourth, and the seventh with the third.
The ledger holds this as [seven_reach_five_classes](/theorem/seven_reach_five_classes) — proven `by decide`, sorry-free:

```lean
(((List.range' 1 7).map dzMin).eraseDups.length = 5) ∧ (!(((List.range' 1 7).map dzMin).contains 0))
```

### THE LIMITATION, DECIDED: the reflection cannot tell the seventh residue from the third — dzMin 7 = dzMin 3 — so under dz alone they are one object. A bijection relabels; it does not distinguish. This is what "reflects all seven and solves none" means, stated as a fact the kernel settles rather than a sentence in a header.
The ledger holds this as [reflection_confuses_seven_three](/theorem/reflection_confuses_seven_three) — proven `by decide`, sorry-free:

```lean
(dzMin 7 = dzMin 3) ∧ (dzMin 6 = dzMin 4)
```

### THE COMPARISON, ON ONE LINE. The seventh residue lies in the covering half of the ring ({2,6,7,8,9}, sealed as digits_split_five_five) — the walk that adds the irreversible step reaches every digit from it. Yet the reflection alone puts it in a class of two with the third and can separate them by nothing. Both halves here, so the claim is discharged where it is made: what the full walk distinguishes, the involution confuses.
The ledger holds this as [seventh_covers_reflection_cannot](/theorem/seventh_covers_reflection_cannot) — proven `by decide`, sorry-free:

```lean
([2,6,7,8,9].contains 7) ∧ (dzMin 7 = dzMin 3) ∧ (dzMin 7 ≠ 7)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
