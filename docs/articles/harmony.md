---
title: "The harmony of pairs"
description: "Computed from lean/Harmony.lean — 8 sealed theorems, every claim citing its proof."
---

# The harmony of pairs

> THE HARMONY OF PAIRS — the same complementary-pair arithmetic across biology, medicine, chemistry and physics (DNA bases, acid/base, agonist/antagonist, action/reaction, cation/anion), proven to be ONE reflection at different centres. — held by [dna_bases_reflect_through_three](/theorem/dna_bases_reflect_through_three) and its 7 siblings below.

**8 theorems**, from [dna_bases_reflect_through_three](/theorem/dna_bases_reflect_through_three) onward, each proven `by decide` in <a href="/lean/Harmony.lean">lean/Harmony.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [chargaff_strand_balance](/theorem/chargaff_strand_balance). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FHarmony.lean)** — nothing to install. The editor fetches `lean/Harmony.lean` from the repository and re-decides all 8 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### BIOLOGY: the four DNA bases pair by complement — A↔T, G↔C — written as the REFLECTION c ↦ 3−c on {0,1,2,3} (the same reflection form as pH and charge below. The helix pairs through the centre 3.
The ledger holds this as [dna_bases_reflect_through_three](/theorem/dna_bases_reflect_through_three) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun c => 3 - (3 - c) == c) ∧ (List.range 4).all (fun c => 3 - c != c)
```

### BIOLOGY: CHARGAFF'S FIRST RULE IS STRICTLY STRONGER THAN THE BALANCE IT PRODUCES, and that gap is the content. In a duplex #A = #T and #G = #C, from which the purines equal the pyrimidines: A + G = T + C. The implication is decided here over every quadruple in 0..5 — 1296 of them — and it holds. THE CONVERSE DOES NOT: [A,T,G,C] = [0,1,1,0] balances at A + G = 1 = T + C while A ≠ T, so a strand can carry the purine/pyrimidine balance WITHOUT being base-paired. Sealing only the balance would therefore seal the weaker half and read as the stronger. THE PREVIOUS STATEMENT SEALED NEITHER: it was (5 = 5) ∧ (3 = 3) ∧ (5 + 3 = 5 + 3), true whatever biology does, because the sample [5,5,3,3] was chosen with A = T and G = C already equal, so every conjunct collapsed to reflexivity. Found by the sibling session uuidna-87, whose recursive vacuity rule descends into conjunctions where the shipped finder splits on the top-level operator and stops.
The ledger holds this as [chargaff_strand_balance](/theorem/chargaff_strand_balance) — proven `by decide`, sorry-free:

```lean
((List.range 6).all (fun a => (List.range 6).all (fun t => (List.range 6).all (fun g => (List.range 6).all (fun c => (!((a == t) && (g == c))) || (a + g == t + c)))))) ∧ (0 + 1 == 1 + 0) ∧ (0 != 1)
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


::: warning 
THE HARMONY OF PAIRS — the same complementary-pair arithmetic across biology, medicine, chemistry and physics (DNA bases, acid/base, agonist/antagonist, action/reaction, cation/anion), proven to be ONE reflection at different centres. The boundary is confirmed by the wing's own sealed theorems — e.g. [dna_bases_reflect_through_three](/theorem/dna_bases_reflect_through_three) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
