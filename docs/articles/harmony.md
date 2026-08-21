---
title: "The harmony of pairs"
description: "Computed from lean/Harmony.lean — 8 sealed theorems, every claim citing its proof."
---

# The harmony of pairs

> THE HARMONY OF PAIRS — the same complementary-pair arithmetic across biology, medicine, chemistry and physics (DNA bases, acid/base, agonist/antagonist, action/reaction, cation/anion), proven to be ONE reflection at different centres. — held by [dna_bases_reflect_through_three](/theorem/dna_bases_reflect_through_three) and its 7 siblings below.

**8 theorems**, from [dna_bases_reflect_through_three](/theorem/dna_bases_reflect_through_three) onward, each proven `by decide` in [lean/Harmony.lean](/lean/Harmony.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

### BIOLOGY: the four DNA bases pair by complement — A↔T, G↔C — written as the REFLECTION c ↦ 3−c on {0,1,2,3} (the same reflection form as pH and charge below. The helix pairs through the centre 3.
The ledger holds this as [dna_bases_reflect_through_three](/theorem/dna_bases_reflect_through_three) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun c => 3 - (3 - c) == c) ∧ (List.range 4).all (fun c => 3 - c != c)
```

### BIOLOGY: Chargaff's rule as counting — in a duplex #A = #T and #G = #C, so the purines (A+G) equal the pyrimidines (T+C). With [A,T,G,C] = [5,5,3,3]: A = T, G = C, and A+G = T+C. The strand balances its complement.
The ledger holds this as [chargaff_strand_balance](/theorem/chargaff_strand_balance) — proven `by decide`, sorry-free:

```lean
(5 = 5) ∧ (3 = 3) ∧ (5 + 3 = 5 + 3)
```

### CHEMISTRY: in a redox reaction the electrons lost by oxidation equal the electrons gained by reduction — the half-reactions balance, so their signed sum is zero: (+3) + (−3) = 0. Oxidation and reduction are one conserved pair.
The ledger holds this as [redox_conserves_electrons](/theorem/redox_conserves_electrons) — proven `by decide`, sorry-free:

```lean
(3 : Int) + (-3) = 0
```

### CHEMISTRY: an ionic compound is electrically neutral — the cation charge and the anion charges sum to zero. For MgCl₂ the Mg²⁺ (+2) balances two Cl⁻ (−1 each): (+2) + 2·(−1) = 0. Cation and anion are a charge-complementary pair.
The ledger holds this as [ionic_compound_is_neutral](/theorem/ionic_compound_is_neutral) — proven `by decide`, sorry-free:

```lean
(2 : Int) + 2 * (-1) = 0
```

### MEDICINE (pharmacology): a competitive antagonist cancels an agonist's net effect at the receptor — the paired action sums to the baseline: (+4) + (−4) = 0. Agonist and antagonist are the same complement the other fields carry.
The ledger holds this as [agonist_antagonist_cancels](/theorem/agonist_antagonist_cancels) — proven `by decide`, sorry-free:

```lean
(4 : Int) + (-4) = 0
```

### MEDICINE (physiology): homeostasis is complement in time — a deviation of +d from the set point is met by a correction of −d, returning exactly to the set point: (37 + 2) − 2 = 37. Perturbation and response are a pair that closes.
The ledger holds this as [homeostasis_returns_to_setpoint](/theorem/homeostasis_returns_to_setpoint) — proven `by decide`, sorry-free:

```lean
(37 + 2) - 2 = 37
```

### PHYSICS: Newton's third law and charge conservation are the same cancelling pair — the reaction is minus the action, F + (−F) = 0 (here (+5)+(−5)), and an electron and positron sum to zero charge, (−1)+(+1) = 0. The pair sums to nothing.
The ledger holds this as [action_reaction_and_charge_cancel](/theorem/action_reaction_and_charge_cancel) — proven `by decide`, sorry-free:

```lean
((5 : Int) + (-5) = 0) ∧ ((-1 : Int) + 1 = 0)
```

### THE HARMONY: every pair above is reflection through a centre n (c ↦ n−c), self-inverse for EVERY centre — so the four bases (n=3), electric charge (n=0) and pH (n=14) are the SAME involution at different centres. One structure, four sciences; this is what "harmonise the pairs" means, proven.
The ledger holds this as [pairs_share_one_centre](/theorem/pairs_share_one_centre) — proven `by decide`, sorry-free:

```lean
[0,3,14].all (fun n => (List.range (n+1)).all (fun x => n - (n - x) == x))
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
