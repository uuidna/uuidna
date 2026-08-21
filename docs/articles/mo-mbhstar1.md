---
title: "The paper on trial"
description: "Computed from lean/MoMBHStar1.lean — 17 sealed theorems, every claim citing its proof."
---

# The paper on trial

> THE PAPER ON TRIAL — "A gas-enshrouded and gas-reddened black hole at cosmic dawn" (DOI 10.1038/s41586-026-10846-4, data 10.5281/zenodo.15059214): the letter's published numbers as decidable arithmetic (measurements ×10/×100/×1000 into Nat), the press-vs-paper delta refuted by the paper's own tables, and the Balmer break derived from Rydberg arithmetic. n=1, one fiducial of ~1e6 models, 0 solved — arithmetic witnesses of the PUBLISHED numbers, never astrophysics re-derived — held by [mombh_balmer_break_exceeds_stellar_ceiling](/theorem/mombh_balmer_break_exceeds_stellar_ceiling) and its 16 siblings below.

**17 theorems**, from [mombh_balmer_break_exceeds_stellar_ceiling](/theorem/mombh_balmer_break_exceeds_stellar_ceiling) onward, each proven `by decide` in [lean/MoMBHStar1.lean](/lean/MoMBHStar1.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 17 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [mombh_hbeta_oiii_ratio_central_over_ten_lower_under](/theorem/mombh_hbeta_oiii_ratio_central_over_ten_lower_under). A boundary stated here is decided, not merely denied.

### Break 7.7 (−1.4) lower bound 6.3 > A-star ceiling 5 > Chabrier ceiling 3 (×10). SCOPE: ceilings are model inputs.
The ledger holds this as [mombh_balmer_break_exceeds_stellar_ceiling](/theorem/mombh_balmer_break_exceeds_stellar_ceiling) — proven `by decide`, sorry-free:

```lean
(77 - 14 = 63) ∧ (63 > 50) ∧ (50 > 30)
```

### +2.3 above vs −1.4 below (×10); blue window SNR 3 < 5.
The ledger holds this as [mombh_break_error_asymmetric_blue_faint](/theorem/mombh_break_error_asymmetric_blue_faint) — proven `by decide`, sorry-free:

```lean
(23 > 14) ∧ (30 < 50)
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

### 3.5σ < 5σ (×10).
The ledger holds this as [mombh_oiii_is_tentative](/theorem/mombh_oiii_is_tentative) — proven `by decide`, sorry-free:

```lean
(35 < 50)
```

### 95% <100 pc, 99% <117 pc.
The ledger holds this as [mombh_size_limits_ordered](/theorem/mombh_size_limits_ordered) — proven `by decide`, sorry-free:

```lean
(100 < 117)
```

### log nH 11 ≥ 9; log NH ×10 258 > 241 (Compton-thick). SCOPE: one model of ~1e6, filtered not sampled.
The ledger holds this as [mombh_fiducial_gas_dense_and_compton_thick](/theorem/mombh_fiducial_gas_dense_and_compton_thick) — proven `by decide`, sorry-free:

```lean
(11 >= 9) ∧ (258 > 241)
```

### A_V 0.15 vs 2–3 (×100).
The ledger holds this as [mombh_fiducial_is_dust_free](/theorem/mombh_fiducial_is_dust_free) — proven `by decide`, sorry-free:

```lean
(15 < 200) ∧ (15 < 300)
```

### 0.18 by scaling, ~5 by alternative (×100): straddle 1. NOT PROVEN which.
The ledger holds this as [mombh_eddington_two_answers_straddle_one](/theorem/mombh_eddington_two_answers_straddle_one) — proven `by decide`, sorry-free:

```lean
(18 < 100) ∧ (100 < 500)
```

### REFUTED: "super-Eddington confirmed" vs the paper's own 0.18.
The ledger holds this as [mombh_press_confirmed_is_refuted](/theorem/mombh_press_confirmed_is_refuted) — proven `by decide`, sorry-free:

```lean
(¬ (18 >= 100))
```

### 10^6.0 .. 10^8.3 (log ×10): 23 > 20.
The ledger holds this as [mombh_black_hole_mass_spans_over_two_dex](/theorem/mombh_black_hole_mass_spans_over_two_dex) — proven `by decide`, sorry-free:

```lean
(83 - 60 = 23) ∧ (23 > 20)
```

### n = 1.
The ledger holds this as [mombh_sample_is_one](/theorem/mombh_sample_is_one) — proven `by decide`, sorry-free:

```lean
(1 < 2)
```

### 3 measured, 1 simplistic model, 0 solved.
The ledger holds this as [mombh_verified_ne_solved](/theorem/mombh_verified_ne_solved) — proven `by decide`, sorry-free:

```lean
(3 >= 1) ∧ (0 < 1)
```

### QUANTUM: E(n=2→∞) = 13.6/4 = 3.4 eV (×10: 136/4 = 34); λ = 12398/3.4 = 3646 Å (12398/34 = 364, ×10). The break sits at the n=2 ionisation edge.
The ledger holds this as [mombh_quantum_balmer_edge_is_rydberg_quarter](/theorem/mombh_quantum_balmer_edge_is_rydberg_quarter) — proven `by decide`, sorry-free:

```lean
(136 / 4 = 34) ∧ (12398 / 34 = 364)
```

### QUANTUM: 3646 Å × (1+z)=8.757 → 31927 Å = 3.19 μm (×1000: 3646·8757/10000 = 3192); F277W ends ~3.1 μm, F356W starts ~3.1 μm: 3100 < 3192 < 3560. The colour selection is a Rydberg fraction.
The ledger holds this as [mombh_quantum_edge_redshifts_into_filter_gap](/theorem/mombh_quantum_edge_redshifts_into_filter_gap) — proven `by decide`, sorry-free:

```lean
(3646 * 8757 / 10000 = 3192) ∧ (3100 < 3192) ∧ (3192 < 3560)
```

### QUANTUM: Hβ 1/4−1/16=3/16 → 12398·16/(3·13.6): 12398·160 − 4860·408 = 800 (<0.05%). Hγ 1/4−1/25=21/100 → 12398·100/(13.6·21): 12398·1000 − 4339·136·21 = 5816 (<0.05%). The absorbed lines are Rydberg differences with n=2 as the lower level.
The ledger holds this as [mombh_quantum_hbeta_hgamma_are_balmer_lines](/theorem/mombh_quantum_hbeta_hgamma_are_balmer_lines) — proven `by decide`, sorry-free:

```lean
(12398 * 160 - 4860 * 408 = 800) ∧ (800 < 1000) ∧ (12398 * 1000 - 4339 * 136 * 21 = 5816) ∧ (5816 < 12398)
```

### QUANTUM: at 1e4 K, n2/n1 = 4·exp(−10.2/0.86) ≈ 3e−5 (×1e6: 29 < 100). Thermal population of n=2 is negligible; only collisions at nH ≥ 1e9 fill it. Density is forced by a level population, not chosen.
The ledger holds this as [mombh_quantum_n2_population_needs_density](/theorem/mombh_quantum_n2_population_needs_density) — proven `by decide`, sorry-free:

```lean
(29 < 100) ∧ (9 <= 11)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
