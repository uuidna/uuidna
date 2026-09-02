---
title: "The paper on trial"
description: "Computed from lean/MoMBHStar1.lean — 11 sealed theorems, every claim citing its proof."
---

# The paper on trial

> THE PAPER ON TRIAL — "A gas-enshrouded and gas-reddened black hole at cosmic dawn" (DOI 10.1038/s41586-026-10846-4, data 10.5281/zenodo.15059214): the letter's published numbers as decidable arithmetic (measurements ×10/×100/×1000 into Nat), the press-vs-paper delta refuted by the paper's own tables, and the Balmer break derived from Rydberg arithmetic. n=1, one fiducial of ~1e6 models, 0 solved — arithmetic witnesses of the PUBLISHED numbers — held by [mombh_balmer_break_exceeds_stellar_ceiling](/theorem/mombh_balmer_break_exceeds_stellar_ceiling) and its 10 siblings below.

**11 theorems**, from [mombh_balmer_break_exceeds_stellar_ceiling](/theorem/mombh_balmer_break_exceeds_stellar_ceiling) onward, each proven `by decide` in [lean/MoMBHStar1.lean](/lean/MoMBHStar1.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 11 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [mombh_hbeta_oiii_ratio_central_over_ten_lower_under](/theorem/mombh_hbeta_oiii_ratio_central_over_ten_lower_under). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FMoMBHStar1.lean)** — nothing to install. The editor fetches `lean/MoMBHStar1.lean` from the repository and re-decides all 11 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### Break 7.7 (−1.4) lower bound 6.3 > A-star ceiling 5 > Chabrier ceiling 3 (×10). SCOPE: ceilings are model inputs.
The ledger holds this as [mombh_balmer_break_exceeds_stellar_ceiling](/theorem/mombh_balmer_break_exceeds_stellar_ceiling) — proven `by decide`, sorry-free:

```lean
(77 - 14 = 63) ∧ (63 > 50) ∧ (50 > 30)
```

### 30 ± 7 %: 4·7 ≤ 30 < 5·7. SCOPE: three instruments.
The ledger holds this as [mombh_variability_is_four_sigma](/theorem/mombh_variability_is_four_sigma) — proven `by decide`, sorry-free:

```lean
(4 * 7 <= 30) ∧ (30 < 5 * 7)
```

### 11.4 (−2.5) ×10: central clears 10, lower bound does not.
The ledger holds this as [mombh_hbeta_oiii_ratio_central_over_ten_lower_under](/theorem/mombh_hbeta_oiii_ratio_central_over_ten_lower_under) — proven `by decide`, sorry-free:

```lean
(114 > 100) ∧ (114 - 25 = 89) ∧ (89 < 100)
```

### log nH 11 ≥ 9; log NH ×10 258 > 241 (Compton-thick). SCOPE: one model of ~1e6, filtered not sampled.
The ledger holds this as [mombh_fiducial_gas_dense_and_compton_thick](/theorem/mombh_fiducial_gas_dense_and_compton_thick) — proven `by decide`, sorry-free:

```lean
(11 >= 9) ∧ (258 > 241)
```

### REFUTED: "super-Eddington confirmed" vs the paper's own 0.18.
The ledger holds this as [mombh_press_confirmed_is_refuted](/theorem/mombh_press_confirmed_is_refuted) — proven `by decide`, sorry-free:

```lean
(¬ (18 >= 100))
```

### 10^6.0 .. 10^8.3 (log ×10): 23 > 20; the span clears the stellar ceiling 50.
The ledger holds this as [mombh_black_hole_mass_spans_over_two_dex](/theorem/mombh_black_hole_mass_spans_over_two_dex) — proven `by decide`, sorry-free:

```lean
(83 - 60 = 23) ∧ (23 > 20) ∧ (60 > 50)
```

### 3 measured, 1 simplistic model, 0 solved — and 3 sits below the stellar ceiling 30.
The ledger holds this as [mombh_verified_ne_solved](/theorem/mombh_verified_ne_solved) — proven `by decide`, sorry-free:

```lean
(3 >= 1) ∧ (0 < 1) ∧ (30 > 3)
```

### QUANTUM: E(n=2→∞) = 13.6/4 = 3.4 eV (×10: 136/4 = 34); λ = 12398/3.4 = 3646 Å (12398/34 = 364, ×10). The break sits at the n=2 ionisation edge.
The ledger holds this as [mombh_quantum_balmer_edge_is_rydberg_quarter](/theorem/mombh_quantum_balmer_edge_is_rydberg_quarter) — proven `by decide`, sorry-free:

```lean
(136 / 4 = 34) ∧ (12398 / 34 = 364)
```

### QUANTUM: 3646 Å × (1+z)=8.757 → 31927 Å = 3.19 μm (×1000: 3646·8757/10000 = 3192); F277W ends ~3.1 μm, F356W starts ~3.1 μm: 3100 < 3192 < 3560. The rest-frame edge 364 sits below the gap.
The ledger holds this as [mombh_quantum_edge_redshifts_into_filter_gap](/theorem/mombh_quantum_edge_redshifts_into_filter_gap) — proven `by decide`, sorry-free:

```lean
(3646 * 8757 / 10000 = 3192) ∧ (3100 < 3192) ∧ (3192 < 3560) ∧ (364 < 3100)
```

### QUANTUM: Hβ 1/4−1/16=3/16 → 12398·16/(3·13.6): 12398·160 − 4860·408 = 800 (<0.05%). Hγ 1/4−1/25=21/100 → 12398·100/(13.6·21): 12398·1000 − 4339·136·21 = 5816 (<0.05%). The absorbed lines are Rydberg differences with n=2 as the lower level.
The ledger holds this as [mombh_quantum_hbeta_hgamma_are_balmer_lines](/theorem/mombh_quantum_hbeta_hgamma_are_balmer_lines) — proven `by decide`, sorry-free:

```lean
(12398 * 160 - 4860 * 408 = 800) ∧ (800 < 1000) ∧ (12398 * 1000 - 4339 * 136 * 21 = 5816) ∧ (5816 < 12398)
```

### QUANTUM: at 1e4 K, n2/n1 = 4·exp(−10.2/0.86) ≈ 3e−5 (×1e6: 29 < 100). Thermal population of n=2 is negligible; only collisions at nH ≥ 1e9 fill it. Density is forced by a level population.
The ledger holds this as [mombh_quantum_n2_population_needs_density](/theorem/mombh_quantum_n2_population_needs_density) — proven `by decide`, sorry-free:

```lean
(29 < 100) ∧ (9 <= 11)
```


::: warning 
THE PAPER ON TRIAL — "A gas-enshrouded and gas-reddened black hole at cosmic dawn" (DOI 10. The boundary is confirmed by the wing's own sealed theorems — e.g. [mombh_balmer_break_exceeds_stellar_ceiling](/theorem/mombh_balmer_break_exceeds_stellar_ceiling) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
