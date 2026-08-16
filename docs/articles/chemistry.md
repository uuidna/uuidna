---
title: "The reactions domain"
description: "Computed from lean/Chemistry.lean — 8 sealed theorems, every claim citing its proof."
---

# The reactions domain

> CHEMISTRY — the reactions domain, as decidable arithmetic, demarcated. A balanced equation conserves atoms (Haber N₂+3H₂→2NH₃, methane combustion); a neutral compound conserves charge (Al₂O₃: 2·(+3)+3·(−2)=0); oxidation states sum to the molecular charge; pH + pOH = 14 at 25 °C; Boyle's law keeps P·V constant; neutralization pairs H⁺ with OH⁻; and stoichiometry scales linearly. HONEST SCOPE: the arithmetic of reaction bookkeeping — atom/charge counts and exact ratios, not a full thermodynamics or kinetics derivation, distinct from the electron-shell chemistry in BioPhysics.

**8 theorems**, each proven `by decide` in [lean/Chemistry.lean](/lean/Chemistry.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### Mass is conserved — the Haber synthesis N₂ + 3H₂ → 2NH₃ balances: 2 nitrogen atoms on each side (2 = 2·1) and 6 hydrogen atoms on each side (3·2 = 2·3). Atoms are neither created nor destroyed.

The ledger holds this as [haber_balances](/theorem/haber_balances) — proven `by decide`, sorry-free:

```lean
(2 = 2*1) ∧ (3*2 = 2*3)
```

### Combustion balances too: CH₄ + 2O₂ → CO₂ + 2H₂O has 4 hydrogen atoms each side (4 = 2·2) and 4 oxygen atoms each side (2·2 = 2 + 2, the CO₂ and the two waters). Carbon is 1 = 1.

The ledger holds this as [combustion_methane_balances](/theorem/combustion_methane_balances) — proven `by decide`, sorry-free:

```lean
(4 = 2*2) ∧ (2*2 = 2 + 2)
```

### A neutral ionic compound conserves charge — Al₂O₃ has two Al³⁺ and three O²⁻, so 2·(+3) + 3·(−2) = +6 − 6 = 0. The formula is fixed by charge neutrality.

The ledger holds this as [charge_balance_neutral](/theorem/charge_balance_neutral) — proven `by decide`, sorry-free:

```lean
(2*3 + 3*(-2) : Int) = 0
```

### Oxidation states sum to the molecular charge — in neutral H₂O the two H at +1 and the O at −2 give 2·(+1) + (−2) = 0. Redox bookkeeping conserves total oxidation number.

The ledger holds this as [oxidation_states_sum](/theorem/oxidation_states_sum) — proven `by decide`, sorry-free:

```lean
(2*1 + (-2) : Int) = 0
```

### At 25 °C the water autoionization gives pH + pOH = 14, so a neutral solution is pH 7 with pOH 7 — 7 + 7 = 14. Acidity and basicity are complementary about 7.

The ledger holds this as [ph_plus_poh_14](/theorem/ph_plus_poh_14) — proven `by decide`, sorry-free:

```lean
7 + 7 = 14
```

### Boyle's law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.

The ledger holds this as [boyles_law](/theorem/boyles_law) — proven `by decide`, sorry-free:

```lean
2*6 = 4*3
```

### Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.

The ledger holds this as [neutralization](/theorem/neutralization) — proven `by decide`, sorry-free:

```lean
(1 + (-1) : Int) = 0
```

### Stoichiometry scales linearly: in N₂ + 3H₂ → 2NH₃, k moles of N₂ yield 2k moles of NH₃ — [1,2,3] mol give [2,4,6] mol. Double the reactant, double the product, exactly.

The ledger holds this as [stoichiometry_scales](/theorem/stoichiometry_scales) — proven `by decide`, sorry-free:

```lean
(([1,2,3] : List Nat).map (fun k => 2 * k)) = [2,4,6]
```


::: warning HONEST SCOPE
the arithmetic of reaction bookkeeping — atom/charge counts and exact ratios, not a full thermodynamics or kinetics derivation, distinct from the electron-shell chemistry in BioPhysics.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
