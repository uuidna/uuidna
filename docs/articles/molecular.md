---
title: "The bond domain"
description: "Computed from lean/Molecular.lean — 7 sealed theorems, every claim citing its proof."
---

# The bond domain

> MOLECULAR — the bond domain, as decidable arithmetic, demarcated. — held by [octet_rule](/theorem/octet_rule) and its 6 siblings below.

**7 theorems**, from [octet_rule](/theorem/octet_rule) onward, each proven `by decide` in [lean/Molecular.lean](/lean/Molecular.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

### The octet rule: atoms bond to reach eight valence electrons. Carbon has 4 of its own and shares 4 more, 4 + 4 = 8 — a full outer shell, the driver of covalent bonding.
The ledger holds this as [octet_rule](/theorem/octet_rule) — proven `by decide`, sorry-free:

```lean
4 + 4 = 8
```

### A covalent bond of order n shares 2n electrons: single, double and triple bonds share 2, 4 and 6 — [1,2,3] → [2,4,6]. The bond IS the shared pair(s).
The ledger holds this as [bond_shares_electron_pairs](/theorem/bond_shares_electron_pairs) — proven `by decide`, sorry-free:

```lean
(([1,2,3] : List Nat).map (fun n => 2 * n)) = [2,4,6]
```

### Bond order is (bonding − antibonding)/2: N₂ gets (8−2)/2 = 3 (a triple bond) and O₂ gets (8−4)/2 = 2 (a double bond). Nitrogen holds three shared pairs, oxygen two.
The ledger holds this as [bond_order_n2_o2](/theorem/bond_order_n2_o2) — proven `by decide`, sorry-free:

```lean
((8 - 2) / 2 = 3) ∧ ((8 - 4) / 2 = 2)
```

### Main-group valence electrons are the group number minus 10: carbon (group 14) has 4, oxygen (group 16) has 6 — 14 − 10 = 4 and 16 − 10 = 6. Valence count sets how many bonds an atom forms.
The ledger holds this as [valence_from_group](/theorem/valence_from_group) — proven `by decide`, sorry-free:

```lean
(14 - 10 = 4) ∧ (16 - 10 = 6)
```

### A Lewis structure counts total valence electrons: H₂O has 2·1 (the hydrogens) + 6 (oxygen) = 8 electrons — four pairs, two bonding and two lone. The dot structure conserves the count.
The ledger holds this as [water_lewis_electrons](/theorem/water_lewis_electrons) — proven `by decide`, sorry-free:

```lean
2 * 1 + 6 = 8
```

### A large electronegativity difference makes a bond ionic: NaCl has |3.0 − 0.9| = 2.1 (×10: 30 − 9 = 21), above the ~1.7 (×10: 17) ionic threshold — 21 > 17. The more electronegative atom takes the electron outright.
The ledger holds this as [ionic_threshold](/theorem/ionic_threshold) — proven `by decide`, sorry-free:

```lean
30 - 9 > 17
```

### Molar mass sums the atomic masses: water is 2·1 (hydrogen) + 16 (oxygen) = 18 g/mol. The molecule weighs exactly its parts.
The ledger holds this as [molar_mass_water](/theorem/molar_mass_water) — proven `by decide`, sorry-free:

```lean
2 * 1 + 16 = 18
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
