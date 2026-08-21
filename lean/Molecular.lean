-- lean/Molecular.lean — GENERATED. MOLECULAR — the bond domain, as decidable arithmetic, demarcated. Atoms bond toward the octet (4+4=8); a covalent bond of order n shares 2n electrons; bond order (bonding−antibonding)/2 gives N₂ a triple and O₂ a double bond; main-group valence is the group number minus 10; a Lewis structure counts total valence electrons (H₂O: 2·1+6=8); a large electronegativity difference makes a bond ionic (NaCl 21 > 17); molar mass sums the atomic masses (H₂O = 18); and bond strength rises with order. HONEST SCOPE: the arithmetic of bonding bookkeeping — electron and mass counts, exact thresholds — not a full quantum-chemistry derivation, distinct from the DNA base-pairing in BioPhysics and the reactions in Chemistry. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- The octet rule: atoms bond to reach eight valence electrons. Carbon has 4 of its own and shares 4 more, 4 +
    4 = 8 — a full outer shell, the driver of covalent bonding. -/
theorem octet_rule : 4 + 4 = 8 := by decide

/-- A covalent bond of order n shares 2n electrons: single, double and triple bonds share 2, 4 and 6 — [1,2,3] →
    [2,4,6]. The bond IS the shared pair(s). -/
theorem bond_shares_electron_pairs : (([1,2,3] : List Nat).map (fun n => 2 * n)) = [2,4,6] := by decide

/-- Bond order is (bonding − antibonding)/2: N₂ gets (8−2)/2 = 3 (a triple bond) and O₂ gets (8−4)/2 = 2 (a
    double bond). Nitrogen holds three shared pairs, oxygen two. -/
theorem bond_order_n2_o2 : ((8 - 2) / 2 = 3) ∧ ((8 - 4) / 2 = 2) := by decide

/-- Main-group valence electrons are the group number minus 10: carbon (group 14) has 4, oxygen (group 16) has 6
    — 14 − 10 = 4 and 16 − 10 = 6. Valence count sets how many bonds an atom forms. -/
theorem valence_from_group : (14 - 10 = 4) ∧ (16 - 10 = 6) := by decide

/-- A Lewis structure counts total valence electrons: H₂O has 2·1 (the hydrogens) + 6 (oxygen) = 8 electrons —
    four pairs, two bonding and two lone. The dot structure conserves the count. -/
theorem water_lewis_electrons : 2 * 1 + 6 = 8 := by decide

/-- A large electronegativity difference makes a bond ionic: NaCl has |3.0 − 0.9| = 2.1 (×10: 30 − 9 = 21),
    above the ~1.7 (×10: 17) ionic threshold — 21 > 17. The more electronegative atom takes the electron
    outright. -/
theorem ionic_threshold : 30 - 9 > 17 := by decide

/-- Molar mass sums the atomic masses: water is 2·1 (hydrogen) + 16 (oxygen) = 18 g/mol. The molecule weighs
    exactly its parts. -/
theorem molar_mass_water : 2 * 1 + 16 = 18 := by decide

/-- Bond strength rises with order: a triple bond is stronger than a double, a double stronger than a single — 3
    > 2 and 2 > 1. Nitrogen's triple bond is why N₂ is so hard to break. -/
theorem bond_strength_rises_with_order : (3 > 2) ∧ (2 > 1) := by decide
