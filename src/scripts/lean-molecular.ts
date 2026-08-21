#!/usr/bin/env node
// Automate the Lean layer for MOLECULAR — the bond domain, as decidable arithmetic, demarcated. Atoms bond toward
// the octet (8 valence electrons); a covalent bond of order n shares 2n electrons; the bond order (bonding −
// antibonding)/2 gives N₂ a triple and O₂ a double bond; main-group valence is the group number minus 10; a Lewis
// structure counts total valence electrons; a large electronegativity difference makes a bond ionic; molar mass
// sums the atomic masses; and bond strength rises with order. the arithmetic of bonding bookkeeping
// — electron and mass counts, exact thresholds — not a full quantum-chemistry derivation, and distinct from the
// DNA base-pairing in BioPhysics and the reactions in Chemistry. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'octet_rule',
    why: 'The octet rule: atoms bond to reach eight valence electrons. Carbon has 4 of its own and shares 4 more, 4 + 4 = 8 — a full outer shell, the driver of covalent bonding.',
    js: () => 4 + 4 === 8,
    lean: 'theorem octet_rule : 4 + 4 = 8 := by decide' },

  { key: 'bond_shares_electron_pairs',
    why: 'A covalent bond of order n shares 2n electrons: single, double and triple bonds share 2, 4 and 6 — [1,2,3] → [2,4,6]. The bond IS the shared pair(s).',
    js: () => JSON.stringify([1, 2, 3].map((n) => 2 * n)) === JSON.stringify([2, 4, 6]),
    lean: 'theorem bond_shares_electron_pairs : (([1,2,3] : List Nat).map (fun n => 2 * n)) = [2,4,6] := by decide' },

  { key: 'bond_order_n2_o2',
    why: 'Bond order is (bonding − antibonding)/2: N₂ gets (8−2)/2 = 3 (a triple bond) and O₂ gets (8−4)/2 = 2 (a double bond). Nitrogen holds three shared pairs, oxygen two.',
    js: () => (8 - 2) / 2 === 3 && (8 - 4) / 2 === 2,
    lean: 'theorem bond_order_n2_o2 : ((8 - 2) / 2 = 3) ∧ ((8 - 4) / 2 = 2) := by decide' },

  { key: 'valence_from_group',
    why: 'Main-group valence electrons are the group number minus 10: carbon (group 14) has 4, oxygen (group 16) has 6 — 14 − 10 = 4 and 16 − 10 = 6. Valence count sets how many bonds an atom forms.',
    js: () => 14 - 10 === 4 && 16 - 10 === 6,
    lean: 'theorem valence_from_group : (14 - 10 = 4) ∧ (16 - 10 = 6) := by decide' },

  { key: 'water_lewis_electrons',
    why: 'A Lewis structure counts total valence electrons: H₂O has 2·1 (the hydrogens) + 6 (oxygen) = 8 electrons — four pairs, two bonding and two lone. The dot structure conserves the count.',
    js: () => 2 * 1 + 6 === 8,
    lean: 'theorem water_lewis_electrons : 2 * 1 + 6 = 8 := by decide' },

  { key: 'ionic_threshold',
    why: 'A large electronegativity difference makes a bond ionic: NaCl has |3.0 − 0.9| = 2.1 (×10: 30 − 9 = 21), above the ~1.7 (×10: 17) ionic threshold — 21 > 17. The more electronegative atom takes the electron outright.',
    js: () => 30 - 9 > 17,
    lean: 'theorem ionic_threshold : 30 - 9 > 17 := by decide' },

  { key: 'molar_mass_water',
    why: 'Molar mass sums the atomic masses: water is 2·1 (hydrogen) + 16 (oxygen) = 18 g/mol. The molecule weighs exactly its parts.',
    js: () => 2 * 1 + 16 === 18,
    lean: 'theorem molar_mass_water : 2 * 1 + 16 = 18 := by decide' },

  { key: 'bond_strength_rises_with_order',
    why: 'Bond strength rises with order: a triple bond is stronger than a double, a double stronger than a single — 3 > 2 and 2 > 1. Nitrogen\'s triple bond is why N₂ is so hard to break.',
    js: () => 3 > 2 && 2 > 1,
    lean: 'theorem bond_strength_rises_with_order : (3 > 2) ∧ (2 > 1) := by decide' },
]

// compute → generate → verify. The bond domain — octet, shared pairs, bond order, valence, Lewis counts, the ionic
// threshold, molar mass, bond strength — decidable bookkeeping, demarcated: not a full quantum-chemistry derivation.
emit({ file: 'Molecular.lean', skill: 'molecular',
  header: 'MOLECULAR — the bond domain, as decidable arithmetic, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
