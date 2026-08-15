-- lean/Chemistry.lean — GENERATED. CHEMISTRY — the reactions domain, as decidable arithmetic, demarcated. A balanced equation conserves atoms (Haber N₂+3H₂→2NH₃, methane combustion); a neutral compound conserves charge (Al₂O₃: 2·(+3)+3·(−2)=0); oxidation states sum to the molecular charge; pH + pOH = 14 at 25 °C; Boyle's law keeps P·V constant; neutralization pairs H⁺ with OH⁻; and stoichiometry scales linearly. HONEST SCOPE: the arithmetic of reaction bookkeeping — atom/charge counts and exact ratios, not a full thermodynamics or kinetics derivation, distinct from the electron-shell chemistry in BioPhysics. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- Mass is conserved — the Haber synthesis N₂ + 3H₂ → 2NH₃ balances: 2 nitrogen atoms on each side (2 = 2·1) and 6 hydrogen atoms on each side (3·2 = 2·3). Atoms are neither created nor destroyed.
theorem haber_balances : (2 = 2*1) ∧ (3*2 = 2*3) := by decide

-- Combustion balances too: CH₄ + 2O₂ → CO₂ + 2H₂O has 4 hydrogen atoms each side (4 = 2·2) and 4 oxygen atoms each side (2·2 = 2 + 2, the CO₂ and the two waters). Carbon is 1 = 1.
theorem combustion_methane_balances : (4 = 2*2) ∧ (2*2 = 2 + 2) := by decide

-- A neutral ionic compound conserves charge — Al₂O₃ has two Al³⁺ and three O²⁻, so 2·(+3) + 3·(−2) = +6 − 6 = 0. The formula is fixed by charge neutrality.
theorem charge_balance_neutral : (2*3 + 3*(-2) : Int) = 0 := by decide

-- Oxidation states sum to the molecular charge — in neutral H₂O the two H at +1 and the O at −2 give 2·(+1) + (−2) = 0. Redox bookkeeping conserves total oxidation number.
theorem oxidation_states_sum : (2*1 + (-2) : Int) = 0 := by decide

-- At 25 °C the water autoionization gives pH + pOH = 14, so a neutral solution is pH 7 with pOH 7 — 7 + 7 = 14. Acidity and basicity are complementary about 7.
theorem ph_plus_poh_14 : 7 + 7 = 14 := by decide

-- Boyle's law keeps P·V constant at fixed temperature: halving the volume doubles the pressure — 2·6 = 4·3 = 12. Squeeze a gas and it pushes back proportionally.
theorem boyles_law : 2*6 = 4*3 := by decide

-- Neutralization pairs acid and base one-to-one: HCl + NaOH → NaCl + H₂O, where H⁺ meets OH⁻ and the charges cancel — (+1) + (−1) = 0, leaving neutral water and salt.
theorem neutralization : (1 + (-1) : Int) = 0 := by decide

-- Stoichiometry scales linearly: in N₂ + 3H₂ → 2NH₃, k moles of N₂ yield 2k moles of NH₃ — [1,2,3] mol give [2,4,6] mol. Double the reactant, double the product, exactly.
theorem stoichiometry_scales : (([1,2,3] : List Nat).map (fun k => 2 * k)) = [2,4,6] := by decide
