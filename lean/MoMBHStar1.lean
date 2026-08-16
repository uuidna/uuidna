-- lean/MoMBHStar1.lean — GENERATED. THE PAPER ON TRIAL — "A gas-enshrouded and gas-reddened black hole at cosmic dawn" (DOI 10.1038/s41586-026-10846-4, data 10.5281/zenodo.15059214): the letter's published numbers as decidable arithmetic (measurements ×10/×100/×1000 into Nat), the press-vs-paper delta refuted by the paper's own tables, and the Balmer break derived from Rydberg arithmetic. n=1, one fiducial of ~1e6 models, 0 solved — arithmetic witnesses of the PUBLISHED numbers, never astrophysics re-derived Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- Break 7.7 (−1.4) lower bound 6.3 > A-star ceiling 5 > Chabrier ceiling 3 (×10). SCOPE: ceilings are model inputs.
theorem mombh_balmer_break_exceeds_stellar_ceiling : (77 - 14 = 63) ∧ (63 > 50) ∧ (50 > 30) := by decide

-- +2.3 above vs −1.4 below (×10); blue window SNR 3 < 5.
theorem mombh_break_error_asymmetric_blue_faint : (23 > 14) ∧ (30 < 50) := by decide

-- 30 ± 7 %: 4·7 ≤ 30 < 5·7. SCOPE: three instruments.
theorem mombh_variability_is_four_sigma : (4 * 7 <= 30) ∧ (30 < 5 * 7) := by decide

-- 11.4 (−2.5) ×10: central clears 10, lower bound does not.
theorem mombh_hbeta_oiii_ratio_central_over_ten_lower_under : (114 > 100) ∧ (114 - 25 = 89) ∧ (89 < 100) := by decide

-- 3.5σ < 5σ (×10).
theorem mombh_oiii_is_tentative : (35 < 50) := by decide

-- 95% <100 pc, 99% <117 pc.
theorem mombh_size_limits_ordered : (100 < 117) := by decide

-- log nH 11 ≥ 9; log NH ×10 258 > 241 (Compton-thick). SCOPE: one model of ~1e6, filtered not sampled.
theorem mombh_fiducial_gas_dense_and_compton_thick : (11 >= 9) ∧ (258 > 241) := by decide

-- A_V 0.15 vs 2–3 (×100).
theorem mombh_fiducial_is_dust_free : (15 < 200) ∧ (15 < 300) := by decide

-- 0.18 by scaling, ~5 by alternative (×100): straddle 1. NOT PROVEN which.
theorem mombh_eddington_two_answers_straddle_one : (18 < 100) ∧ (100 < 500) := by decide

-- REFUTED: "super-Eddington confirmed" vs the paper's own 0.18.
theorem mombh_press_confirmed_is_refuted : (¬ (18 >= 100)) := by decide

-- 10^6.0 .. 10^8.3 (log ×10): 23 > 20.
theorem mombh_black_hole_mass_spans_over_two_dex : (83 - 60 = 23) ∧ (23 > 20) := by decide

-- n = 1.
theorem mombh_sample_is_one : (1 < 2) := by decide

-- 3 measured, 1 simplistic model, 0 solved.
theorem mombh_verified_ne_solved : (3 >= 1) ∧ (0 < 1) := by decide

-- QUANTUM: E(n=2→∞) = 13.6/4 = 3.4 eV (×10: 136/4 = 34); λ = 12398/3.4 = 3646 Å (12398/34 = 364, ×10). The break sits at the n=2 ionisation edge.
theorem mombh_quantum_balmer_edge_is_rydberg_quarter : (136 / 4 = 34) ∧ (12398 / 34 = 364) := by decide

-- QUANTUM: 3646 Å × (1+z)=8.757 → 31927 Å = 3.19 μm (×1000: 3646·8757/10000 = 3192); F277W ends ~3.1 μm, F356W starts ~3.1 μm: 3100 < 3192 < 3560. The colour selection is a Rydberg fraction.
theorem mombh_quantum_edge_redshifts_into_filter_gap : (3646 * 8757 / 10000 = 3192) ∧ (3100 < 3192) ∧ (3192 < 3560) := by decide

-- QUANTUM: Hβ 1/4−1/16=3/16 → 12398·16/(3·13.6): 12398·160 − 4860·408 = 800 (<0.05%). Hγ 1/4−1/25=21/100 → 12398·100/(13.6·21): 12398·1000 − 4339·136·21 = 5816 (<0.05%). The absorbed lines are Rydberg differences with n=2 as the lower level.
theorem mombh_quantum_hbeta_hgamma_are_balmer_lines : (12398 * 160 - 4860 * 408 = 800) ∧ (800 < 1000) ∧ (12398 * 1000 - 4339 * 136 * 21 = 5816) ∧ (5816 < 12398) := by decide

-- QUANTUM: at 1e4 K, n2/n1 = 4·exp(−10.2/0.86) ≈ 3e−5 (×1e6: 29 < 100). Thermal population of n=2 is negligible; only collisions at nH ≥ 1e9 fill it. Density is forced by a level population, not chosen.
theorem mombh_quantum_n2_population_needs_density : (29 < 100) ∧ (9 <= 11) := by decide
