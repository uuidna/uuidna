---
title: "The congruence survey, ring 11"
description: "Computed from lean/FermatRing11.lean — 71 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 11

> THE CONGRUENCE SURVEY, RING 11 OF 21 — moduli 13, 34, 55, 76, 97, 118, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_13](/theorem/unit_group_exponent_mod_13) and its 70 siblings below.

**71 theorems**, from [unit_group_exponent_mod_13](/theorem/unit_group_exponent_mod_13) onward, each proven `by decide` in <a href="/lean/FermatRing11.lean">lean/FermatRing11.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 47 of its 71 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_13](/theorem/unit_group_exponent_mod_13). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing11.lean)** — nothing to install. The editor fetches `lean/FermatRing11.lean` from the repository and re-decides all 71 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 13. The 12 residues coprime to 13 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/13)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_13](/theorem/unit_group_exponent_mod_13) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12].all (fun a => pmod a 12 13 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12].all (fun a => pmod a k 13 == 1))))
```

### NO OBSTRUCTION AT MODULUS 13, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 13), with all three coprime to 13, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_13](/theorem/coprime_sum_open_reduced_1_mod_13) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 13 + pmod 1 1 13) % 13 = pmod 2 1 13
```

### NO OBSTRUCTION AT MODULUS 13, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 3^2 = 6^2 (mod 13), with all three coprime to 13, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [10,14,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_13](/theorem/coprime_sum_open_reduced_2_mod_13) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 13 + pmod 3 2 13) % 13 = pmod 6 2 13
```

### THE IMAGE, PINNED, AT MODULUS 13 AND REDUCED EXPONENT 3. The 12 units raise to exactly the 4 value(s) [1,5,8,12] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_13](/theorem/power_image_exact_reduced_3_mod_13) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12].all (fun a => [1,5,8,12].contains (pmod a 3 13))) ∧ ([1,5,8,12].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12].any (fun a => pmod a 3 13 == v)))
```

### AN OBSTRUCTION AT MODULUS 13, REDUCED EXPONENT 3. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12] and every unit b coprime to 13, the sum of their 3-th powers never lands on the 3-th power image [1,5,8,12] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 13, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 13 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_13](/theorem/coprime_sum_blocked_reduced_3_mod_13) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12].all (fun b => !([1,5,8,12].contains ((pmod a 3 13 + pmod b 3 13) % 13))))
```

### THE IMAGE, PINNED, AT MODULUS 13 AND REDUCED EXPONENT 4. The 12 units raise to exactly the 3 value(s) [1,3,9] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_13](/theorem/power_image_exact_reduced_4_mod_13) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12].all (fun a => [1,3,9].contains (pmod a 4 13))) ∧ ([1,3,9].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12].any (fun a => pmod a 4 13 == v)))
```

### AN OBSTRUCTION AT MODULUS 13, REDUCED EXPONENT 4. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12] and every unit b coprime to 13, the sum of their 4-th powers never lands on the 4-th power image [1,3,9] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 13, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 13 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_13](/theorem/coprime_sum_blocked_reduced_4_mod_13) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12].all (fun b => !([1,3,9].contains ((pmod a 4 13 + pmod b 4 13) % 13))))
```

### THE IMAGE, PINNED, AT MODULUS 13 AND REDUCED EXPONENT 6. The 12 units raise to exactly the 2 value(s) [1,12] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_13](/theorem/power_image_exact_reduced_6_mod_13) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12].all (fun a => [1,12].contains (pmod a 6 13))) ∧ ([1,12].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12].any (fun a => pmod a 6 13 == v)))
```

### AN OBSTRUCTION AT MODULUS 13, REDUCED EXPONENT 6. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12] and every unit b coprime to 13, the sum of their 6-th powers never lands on the 6-th power image [1,12] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 13, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 13 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_13](/theorem/coprime_sum_blocked_reduced_6_mod_13) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12].all (fun b => !([1,12].contains ((pmod a 6 13 + pmod b 6 13) % 13))))
```

### THE IMAGE, PINNED, AT MODULUS 13 AND REDUCED EXPONENT 12. The 12 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_13](/theorem/power_image_exact_reduced_12_mod_13) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12].all (fun a => [1].contains (pmod a 12 13))) ∧ ([1].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12].any (fun a => pmod a 12 13 == v)))
```

### AN OBSTRUCTION AT MODULUS 13, REDUCED EXPONENT 12. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12] and every unit b coprime to 13, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 13, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 13 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_13](/theorem/coprime_sum_blocked_reduced_12_mod_13) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12].all (fun b => !([1].contains ((pmod a 12 13 + pmod b 12 13) % 13))))
```

### THE ORDER STRUCTURE AT MODULUS 34. The 16 residues coprime to 34 are all killed by the exponent 16 — a^16 = 1 for every unit a — and no proper divisor of 16 kills them all (all 4 of them checked). So 16 is the exponent of (Z/34)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 16), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_34](/theorem/unit_group_exponent_mod_34) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => pmod a 16 34 == 1)) ∧ ([1,2,4,8].all (fun k => !([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => pmod a k 34 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 34 AND REDUCED EXPONENT 1. The 16 units raise to exactly the 16 value(s) [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_34](/theorem/power_image_exact_reduced_1_mod_34) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].contains (pmod a 1 34))) ∧ ([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun v => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].any (fun a => pmod a 1 34 == v)))
```

### AN OBSTRUCTION AT MODULUS 34, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33] and every unit b coprime to 34, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 34, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 34 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_34](/theorem/coprime_sum_blocked_reduced_1_mod_34) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun b => !([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].contains ((pmod a 1 34 + pmod b 1 34) % 34))))
```

### THE IMAGE, PINNED, AT MODULUS 34 AND REDUCED EXPONENT 2. The 16 units raise to exactly the 8 value(s) [1,9,13,15,19,21,25,33] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_34](/theorem/power_image_exact_reduced_2_mod_34) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => [1,9,13,15,19,21,25,33].contains (pmod a 2 34))) ∧ ([1,9,13,15,19,21,25,33].all (fun v => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].any (fun a => pmod a 2 34 == v)))
```

### AN OBSTRUCTION AT MODULUS 34, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33] and every unit b coprime to 34, the sum of their 2-th powers never lands on the 2-th power image [1,9,13,15,19,21,25,33] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 34, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 34 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_34](/theorem/coprime_sum_blocked_reduced_2_mod_34) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun b => !([1,9,13,15,19,21,25,33].contains ((pmod a 2 34 + pmod b 2 34) % 34))))
```

### THE IMAGE, PINNED, AT MODULUS 34 AND REDUCED EXPONENT 4. The 16 units raise to exactly the 4 value(s) [1,13,21,33] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_34](/theorem/power_image_exact_reduced_4_mod_34) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => [1,13,21,33].contains (pmod a 4 34))) ∧ ([1,13,21,33].all (fun v => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].any (fun a => pmod a 4 34 == v)))
```

### AN OBSTRUCTION AT MODULUS 34, REDUCED EXPONENT 4. For every unit a in [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33] and every unit b coprime to 34, the sum of their 4-th powers never lands on the 4-th power image [1,13,21,33] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 34, for EVERY exponent n reducing to 4 — that is n in [4,12,20] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 34 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_34](/theorem/coprime_sum_blocked_reduced_4_mod_34) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun b => !([1,13,21,33].contains ((pmod a 4 34 + pmod b 4 34) % 34))))
```

### THE IMAGE, PINNED, AT MODULUS 34 AND REDUCED EXPONENT 8. The 16 units raise to exactly the 2 value(s) [1,33] — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_8_mod_34](/theorem/power_image_exact_reduced_8_mod_34) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => [1,33].contains (pmod a 8 34))) ∧ ([1,33].all (fun v => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].any (fun a => pmod a 8 34 == v)))
```

### AN OBSTRUCTION AT MODULUS 34, REDUCED EXPONENT 8. For every unit a in [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33] and every unit b coprime to 34, the sum of their 8-th powers never lands on the 8-th power image [1,33] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 34, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 34 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_34](/theorem/coprime_sum_blocked_reduced_8_mod_34) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun b => !([1,33].contains ((pmod a 8 34 + pmod b 8 34) % 34))))
```

### THE IMAGE, PINNED, AT MODULUS 34 AND REDUCED EXPONENT 16. The 16 units raise to exactly the 1 value(s) [1] — every unit's 16-th power is in that list, and every entry of the list is some unit's 16-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_16_mod_34](/theorem/power_image_exact_reduced_16_mod_34) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => [1].contains (pmod a 16 34))) ∧ ([1].all (fun v => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].any (fun a => pmod a 16 34 == v)))
```

### AN OBSTRUCTION AT MODULUS 34, REDUCED EXPONENT 16. For every unit a in [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33] and every unit b coprime to 34, the sum of their 16-th powers never lands on the 16-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 34, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 34 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_16_mod_34](/theorem/coprime_sum_blocked_reduced_16_mod_34) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33].all (fun b => !([1].contains ((pmod a 16 34 + pmod b 16 34) % 34))))
```

### THE ORDER STRUCTURE AT MODULUS 55. The 40 residues coprime to 55 are all killed by the exponent 20 — a^20 = 1 for every unit a — and no proper divisor of 20 kills them all (all 5 of them checked). So 20 is the exponent of (Z/55)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 20), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_55](/theorem/unit_group_exponent_mod_55) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => pmod a 20 55 == 1)) ∧ ([1,2,4,5,10].all (fun k => !([1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => pmod a k 55 == 1))))
```

### NO OBSTRUCTION AT MODULUS 55, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 55), with all three coprime to 55, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_55](/theorem/coprime_sum_open_reduced_1_mod_55) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 55 + pmod 1 1 55) % 55 = pmod 2 1 55
```

### THE IMAGE, PINNED, AT MODULUS 55 AND REDUCED EXPONENT 2. The 40 units raise to exactly the 10 value(s) [1,4,9,14,16,26,31,34,36,49] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_55](/theorem/power_image_exact_reduced_2_mod_55) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => [1,4,9,14,16,26,31,34,36,49].contains (pmod a 2 55))) ∧ ([1,4,9,14,16,26,31,34,36,49].all (fun v => [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].any (fun a => pmod a 2 55 == v)))
```

### AN OBSTRUCTION AT MODULUS 55, REDUCED EXPONENT 2. For every unit a in [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54] and every unit b coprime to 55, the sum of their 2-th powers never lands on the 2-th power image [1,4,9,14,16,26,31,34,36,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 55, for EVERY exponent n reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 55 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_55](/theorem/coprime_sum_blocked_reduced_2_mod_55) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun b => !([1,4,9,14,16,26,31,34,36,49].contains ((pmod a 2 55 + pmod b 2 55) % 55))))
```

### THE IMAGE, PINNED, AT MODULUS 55 AND REDUCED EXPONENT 4. The 40 units raise to exactly the 5 value(s) [1,16,26,31,36] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_55](/theorem/power_image_exact_reduced_4_mod_55) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => [1,16,26,31,36].contains (pmod a 4 55))) ∧ ([1,16,26,31,36].all (fun v => [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].any (fun a => pmod a 4 55 == v)))
```

### AN OBSTRUCTION AT MODULUS 55, REDUCED EXPONENT 4. For every unit a in [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54] and every unit b coprime to 55, the sum of their 4-th powers never lands on the 4-th power image [1,16,26,31,36] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 55, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 55 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_55](/theorem/coprime_sum_blocked_reduced_4_mod_55) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun b => !([1,16,26,31,36].contains ((pmod a 4 55 + pmod b 4 55) % 55))))
```

### THE IMAGE, PINNED, AT MODULUS 55 AND REDUCED EXPONENT 5. The 40 units raise to exactly the 8 value(s) [1,12,21,23,32,34,43,54] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_55](/theorem/power_image_exact_reduced_5_mod_55) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => [1,12,21,23,32,34,43,54].contains (pmod a 5 55))) ∧ ([1,12,21,23,32,34,43,54].all (fun v => [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].any (fun a => pmod a 5 55 == v)))
```

### AN OBSTRUCTION AT MODULUS 55, REDUCED EXPONENT 5. For every unit a in [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54] and every unit b coprime to 55, the sum of their 5-th powers never lands on the 5-th power image [1,12,21,23,32,34,43,54] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 55, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 55 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_55](/theorem/coprime_sum_blocked_reduced_5_mod_55) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun b => !([1,12,21,23,32,34,43,54].contains ((pmod a 5 55 + pmod b 5 55) % 55))))
```

### THE IMAGE, PINNED, AT MODULUS 55 AND REDUCED EXPONENT 10. The 40 units raise to exactly the 2 value(s) [1,34] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_55](/theorem/power_image_exact_reduced_10_mod_55) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => [1,34].contains (pmod a 10 55))) ∧ ([1,34].all (fun v => [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].any (fun a => pmod a 10 55 == v)))
```

### AN OBSTRUCTION AT MODULUS 55, REDUCED EXPONENT 10. For every unit a in [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54] and every unit b coprime to 55, the sum of their 10-th powers never lands on the 10-th power image [1,34] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 55, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 55 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_55](/theorem/coprime_sum_blocked_reduced_10_mod_55) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun b => !([1,34].contains ((pmod a 10 55 + pmod b 10 55) % 55))))
```

### THE IMAGE, PINNED, AT MODULUS 55 AND REDUCED EXPONENT 20. The 40 units raise to exactly the 1 value(s) [1] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_20_mod_55](/theorem/power_image_exact_reduced_20_mod_55) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => [1].contains (pmod a 20 55))) ∧ ([1].all (fun v => [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].any (fun a => pmod a 20 55 == v)))
```

### AN OBSTRUCTION AT MODULUS 55, REDUCED EXPONENT 20. For every unit a in [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54] and every unit b coprime to 55, the sum of their 20-th powers never lands on the 20-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 55, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 55 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_55](/theorem/coprime_sum_blocked_reduced_20_mod_55) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun a => [1,2,3,4,6,7,8,9,12,13,14,16,17,18,19,21,23,24,26,27,28,29,31,32,34,36,37,38,39,41,42,43,46,47,48,49,51,52,53,54].all (fun b => !([1].contains ((pmod a 20 55 + pmod b 20 55) % 55))))
```

### THE ORDER STRUCTURE AT MODULUS 76. The 36 residues coprime to 76 are all killed by the exponent 18 — a^18 = 1 for every unit a — and no proper divisor of 18 kills them all (all 5 of them checked). So 18 is the exponent of (Z/76)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 18), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_76](/theorem/unit_group_exponent_mod_76) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => pmod a 18 76 == 1)) ∧ ([1,2,3,6,9].all (fun k => !([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => pmod a k 76 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 76 AND REDUCED EXPONENT 1. The 36 units raise to exactly the 36 value(s) [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_76](/theorem/power_image_exact_reduced_1_mod_76) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].contains (pmod a 1 76))) ∧ ([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].any (fun a => pmod a 1 76 == v)))
```

### AN OBSTRUCTION AT MODULUS 76, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75] and every unit b coprime to 76, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 76, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 76 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_76](/theorem/coprime_sum_blocked_reduced_1_mod_76) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun b => !([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].contains ((pmod a 1 76 + pmod b 1 76) % 76))))
```

### THE IMAGE, PINNED, AT MODULUS 76 AND REDUCED EXPONENT 2. The 36 units raise to exactly the 9 value(s) [1,5,9,17,25,45,49,61,73] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_76](/theorem/power_image_exact_reduced_2_mod_76) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,5,9,17,25,45,49,61,73].contains (pmod a 2 76))) ∧ ([1,5,9,17,25,45,49,61,73].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].any (fun a => pmod a 2 76 == v)))
```

### AN OBSTRUCTION AT MODULUS 76, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75] and every unit b coprime to 76, the sum of their 2-th powers never lands on the 2-th power image [1,5,9,17,25,45,49,61,73] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 76, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 76 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_76](/theorem/coprime_sum_blocked_reduced_2_mod_76) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun b => !([1,5,9,17,25,45,49,61,73].contains ((pmod a 2 76 + pmod b 2 76) % 76))))
```

### THE IMAGE, PINNED, AT MODULUS 76 AND REDUCED EXPONENT 3. The 36 units raise to exactly the 12 value(s) [1,7,11,27,31,37,39,45,49,65,69,75] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_76](/theorem/power_image_exact_reduced_3_mod_76) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,7,11,27,31,37,39,45,49,65,69,75].contains (pmod a 3 76))) ∧ ([1,7,11,27,31,37,39,45,49,65,69,75].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].any (fun a => pmod a 3 76 == v)))
```

### AN OBSTRUCTION AT MODULUS 76, REDUCED EXPONENT 3. For every unit a in [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75] and every unit b coprime to 76, the sum of their 3-th powers never lands on the 3-th power image [1,7,11,27,31,37,39,45,49,65,69,75] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 76, for EVERY exponent n reducing to 3 — that is n in [3,15,21] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 76 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_76](/theorem/coprime_sum_blocked_reduced_3_mod_76) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun b => !([1,7,11,27,31,37,39,45,49,65,69,75].contains ((pmod a 3 76 + pmod b 3 76) % 76))))
```

### THE IMAGE, PINNED, AT MODULUS 76 AND REDUCED EXPONENT 6. The 36 units raise to exactly the 3 value(s) [1,45,49] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_76](/theorem/power_image_exact_reduced_6_mod_76) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,45,49].contains (pmod a 6 76))) ∧ ([1,45,49].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].any (fun a => pmod a 6 76 == v)))
```

### AN OBSTRUCTION AT MODULUS 76, REDUCED EXPONENT 6. For every unit a in [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75] and every unit b coprime to 76, the sum of their 6-th powers never lands on the 6-th power image [1,45,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 76, for EVERY exponent n reducing to 6 — that is n in [6,12] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 76 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_76](/theorem/coprime_sum_blocked_reduced_6_mod_76) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun b => !([1,45,49].contains ((pmod a 6 76 + pmod b 6 76) % 76))))
```

### THE IMAGE, PINNED, AT MODULUS 76 AND REDUCED EXPONENT 9. The 36 units raise to exactly the 4 value(s) [1,37,39,75] — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_9_mod_76](/theorem/power_image_exact_reduced_9_mod_76) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,37,39,75].contains (pmod a 9 76))) ∧ ([1,37,39,75].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].any (fun a => pmod a 9 76 == v)))
```

### AN OBSTRUCTION AT MODULUS 76, REDUCED EXPONENT 9. For every unit a in [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75] and every unit b coprime to 76, the sum of their 9-th powers never lands on the 9-th power image [1,37,39,75] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 76, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 76 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_9_mod_76](/theorem/coprime_sum_blocked_reduced_9_mod_76) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun b => !([1,37,39,75].contains ((pmod a 9 76 + pmod b 9 76) % 76))))
```

### THE IMAGE, PINNED, AT MODULUS 76 AND REDUCED EXPONENT 18. The 36 units raise to exactly the 1 value(s) [1] — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_18_mod_76](/theorem/power_image_exact_reduced_18_mod_76) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1].contains (pmod a 18 76))) ∧ ([1].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].any (fun a => pmod a 18 76 == v)))
```

### AN OBSTRUCTION AT MODULUS 76, REDUCED EXPONENT 18. For every unit a in [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75] and every unit b coprime to 76, the sum of their 18-th powers never lands on the 18-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 76, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 76 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_18_mod_76](/theorem/coprime_sum_blocked_reduced_18_mod_76) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,59,61,63,65,67,69,71,73,75].all (fun b => !([1].contains ((pmod a 18 76 + pmod b 18 76) % 76))))
```

### THE ORDER STRUCTURE AT MODULUS 97. The 96 residues coprime to 97 are all killed by the exponent 96 — a^96 = 1 for every unit a — and no proper divisor of 96 kills them all (all 11 of them checked). So 96 is the exponent of (Z/97)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 96), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_97](/theorem/unit_group_exponent_mod_97) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun a => pmod a 96 97 == 1)) ∧ ([1,2,3,4,6,8,12,16,24,32,48].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun a => pmod a k 97 == 1))))
```

### NO OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 97), with all three coprime to 97, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_97](/theorem/coprime_sum_open_reduced_1_mod_97) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 97 + pmod 1 1 97) % 97 = pmod 2 1 97
```

### NO OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 14^2 (mod 97), with all three coprime to 97, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [10,14,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_97](/theorem/coprime_sum_open_reduced_2_mod_97) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 97 + pmod 1 2 97) % 97 = pmod 14 2 97
```

### NO OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 3^3 = 5^3 (mod 97), with all three coprime to 97, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 3 — that is n in [3,9,15,21] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_3_mod_97](/theorem/coprime_sum_open_reduced_3_mod_97) — proven `by decide`, sorry-free:

```lean
(pmod 1 3 97 + pmod 3 3 97) % 97 = pmod 5 3 97
```

### NO OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 4 — the control, and it fires. 1^4 + 6^4 = 24^4 (mod 97), with all three coprime to 97, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 4 — that is n in [4,20] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_4_mod_97](/theorem/coprime_sum_open_reduced_4_mod_97) — proven `by decide`, sorry-free:

```lean
(pmod 1 4 97 + pmod 6 4 97) % 97 = pmod 24 4 97
```

### THE IMAGE, PINNED, AT MODULUS 97 AND REDUCED EXPONENT 6. The 96 units raise to exactly the 16 value(s) [1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_97](/theorem/power_image_exact_reduced_6_mod_97) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun a => [1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96].contains (pmod a 6 97))) ∧ ([1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].any (fun a => pmod a 6 97 == v)))
```

### AN OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 6 — part 1 of 4. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26] and every unit b coprime to 97, the sum of their 6-th powers never lands on the 6-th power image [1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 97, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 96. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(97) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 97 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_97_part1](/theorem/coprime_sum_blocked_reduced_6_mod_97_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun b => !([1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96].contains ((pmod a 6 97 + pmod b 6 97) % 97))))
```

### AN OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 6 — part 2 of 4. For every unit a in [27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52] and every unit b coprime to 97, the sum of their 6-th powers never lands on the 6-th power image [1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 97, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 96. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(97) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 97 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_97_part2](/theorem/coprime_sum_blocked_reduced_6_mod_97_part2) — proven `by decide`, sorry-free:

```lean
[27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun b => !([1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96].contains ((pmod a 6 97 + pmod b 6 97) % 97))))
```

### AN OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 6 — part 3 of 4. For every unit a in [53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78] and every unit b coprime to 97, the sum of their 6-th powers never lands on the 6-th power image [1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 97, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 96. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(97) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 97 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_97_part3](/theorem/coprime_sum_blocked_reduced_6_mod_97_part3) — proven `by decide`, sorry-free:

```lean
[53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun b => !([1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96].contains ((pmod a 6 97 + pmod b 6 97) % 97))))
```

### AN OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 6 — part 4 of 4. For every unit a in [79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96] and every unit b coprime to 97, the sum of their 6-th powers never lands on the 6-th power image [1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 97, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 96. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(97) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 97 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_97_part4](/theorem/coprime_sum_blocked_reduced_6_mod_97_part4) — proven `by decide`, sorry-free:

```lean
[79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun b => !([1,8,12,18,22,27,33,47,50,64,70,75,79,85,89,96].contains ((pmod a 6 97 + pmod b 6 97) % 97))))
```

### NO OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 8 — the control, and it fires. 1^8 + 4^8 = 2^8 (mod 97), with all three coprime to 97, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 8 — that is n in [8] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_8_mod_97](/theorem/coprime_sum_open_reduced_8_mod_97) — proven `by decide`, sorry-free:

```lean
(pmod 1 8 97 + pmod 4 8 97) % 97 = pmod 2 8 97
```

### THE IMAGE, PINNED, AT MODULUS 97 AND REDUCED EXPONENT 12. The 96 units raise to exactly the 8 value(s) [1,22,33,47,50,64,75,96] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_97](/theorem/power_image_exact_reduced_12_mod_97) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun a => [1,22,33,47,50,64,75,96].contains (pmod a 12 97))) ∧ ([1,22,33,47,50,64,75,96].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].any (fun a => pmod a 12 97 == v)))
```

### AN OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 12 — part 1 of 4. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26] and every unit b coprime to 97, the sum of their 12-th powers never lands on the 12-th power image [1,22,33,47,50,64,75,96] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 97, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 96. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(97) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 97 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_97_part1](/theorem/coprime_sum_blocked_reduced_12_mod_97_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun b => !([1,22,33,47,50,64,75,96].contains ((pmod a 12 97 + pmod b 12 97) % 97))))
```

### AN OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 12 — part 2 of 4. For every unit a in [27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52] and every unit b coprime to 97, the sum of their 12-th powers never lands on the 12-th power image [1,22,33,47,50,64,75,96] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 97, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 96. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(97) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 97 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_97_part2](/theorem/coprime_sum_blocked_reduced_12_mod_97_part2) — proven `by decide`, sorry-free:

```lean
[27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun b => !([1,22,33,47,50,64,75,96].contains ((pmod a 12 97 + pmod b 12 97) % 97))))
```

### AN OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 12 — part 3 of 4. For every unit a in [53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78] and every unit b coprime to 97, the sum of their 12-th powers never lands on the 12-th power image [1,22,33,47,50,64,75,96] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 97, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 96. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(97) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 97 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_97_part3](/theorem/coprime_sum_blocked_reduced_12_mod_97_part3) — proven `by decide`, sorry-free:

```lean
[53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun b => !([1,22,33,47,50,64,75,96].contains ((pmod a 12 97 + pmod b 12 97) % 97))))
```

### AN OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 12 — part 4 of 4. For every unit a in [79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96] and every unit b coprime to 97, the sum of their 12-th powers never lands on the 12-th power image [1,22,33,47,50,64,75,96] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 97, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 96. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(97) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 97 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_97_part4](/theorem/coprime_sum_blocked_reduced_12_mod_97_part4) — proven `by decide`, sorry-free:

```lean
[79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].all (fun b => !([1,22,33,47,50,64,75,96].contains ((pmod a 12 97 + pmod b 12 97) % 97))))
```

### NO OBSTRUCTION AT MODULUS 97, REDUCED EXPONENT 16 — the control, and it fires. 1^16 + 2^16 = 10^16 (mod 97), with all three coprime to 97, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 16 — that is n in [16] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_16_mod_97](/theorem/coprime_sum_open_reduced_16_mod_97) — proven `by decide`, sorry-free:

```lean
(pmod 1 16 97 + pmod 2 16 97) % 97 = pmod 10 16 97
```

### THE ORDER STRUCTURE AT MODULUS 118. The 58 residues coprime to 118 are all killed by the exponent 58 — a^58 = 1 for every unit a — and no proper divisor of 58 kills them all (all 3 of them checked). So 58 is the exponent of (Z/118)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 58), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_118](/theorem/unit_group_exponent_mod_118) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun a => pmod a 58 118 == 1)) ∧ ([1,2,29].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun a => pmod a k 118 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 118 AND REDUCED EXPONENT 1. The 58 units raise to exactly the 58 value(s) [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_118](/theorem/power_image_exact_reduced_1_mod_118) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].contains (pmod a 1 118))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].any (fun a => pmod a 1 118 == v)))
```

### AN OBSTRUCTION AT MODULUS 118, REDUCED EXPONENT 1 — part 1 of 2. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87] and every unit b coprime to 118, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 118, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 58. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(118) = 58 puts the full 58-by-58 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 118 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_118_part1](/theorem/coprime_sum_blocked_reduced_1_mod_118_part1) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].contains ((pmod a 1 118 + pmod b 1 118) % 118))))
```

### AN OBSTRUCTION AT MODULUS 118, REDUCED EXPONENT 1 — part 2 of 2. For every unit a in [89,91,93,95,97,99,101,103,105,107,109,111,113,115,117] and every unit b coprime to 118, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 118, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 58. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(118) = 58 puts the full 58-by-58 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 118 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_118_part2](/theorem/coprime_sum_blocked_reduced_1_mod_118_part2) — proven `by decide`, sorry-free:

```lean
[89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].contains ((pmod a 1 118 + pmod b 1 118) % 118))))
```

### THE IMAGE, PINNED, AT MODULUS 118 AND REDUCED EXPONENT 2. The 58 units raise to exactly the 29 value(s) [1,3,5,7,9,15,17,19,21,25,27,29,35,41,45,49,51,53,57,63,71,75,79,81,85,87,95,105,107] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_118](/theorem/power_image_exact_reduced_2_mod_118) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun a => [1,3,5,7,9,15,17,19,21,25,27,29,35,41,45,49,51,53,57,63,71,75,79,81,85,87,95,105,107].contains (pmod a 2 118))) ∧ ([1,3,5,7,9,15,17,19,21,25,27,29,35,41,45,49,51,53,57,63,71,75,79,81,85,87,95,105,107].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].any (fun a => pmod a 2 118 == v)))
```

### AN OBSTRUCTION AT MODULUS 118, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87] and every unit b coprime to 118, the sum of their 2-th powers never lands on the 2-th power image [1,3,5,7,9,15,17,19,21,25,27,29,35,41,45,49,51,53,57,63,71,75,79,81,85,87,95,105,107] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 118, for EVERY exponent n reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked, and every larger n with the same gcd against 58. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(118) = 58 puts the full 58-by-58 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 118 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_118_part1](/theorem/coprime_sum_blocked_reduced_2_mod_118_part1) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun b => !([1,3,5,7,9,15,17,19,21,25,27,29,35,41,45,49,51,53,57,63,71,75,79,81,85,87,95,105,107].contains ((pmod a 2 118 + pmod b 2 118) % 118))))
```

### AN OBSTRUCTION AT MODULUS 118, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in [89,91,93,95,97,99,101,103,105,107,109,111,113,115,117] and every unit b coprime to 118, the sum of their 2-th powers never lands on the 2-th power image [1,3,5,7,9,15,17,19,21,25,27,29,35,41,45,49,51,53,57,63,71,75,79,81,85,87,95,105,107] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 118, for EVERY exponent n reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked, and every larger n with the same gcd against 58. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(118) = 58 puts the full 58-by-58 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 118 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_118_part2](/theorem/coprime_sum_blocked_reduced_2_mod_118_part2) — proven `by decide`, sorry-free:

```lean
[89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117].all (fun b => !([1,3,5,7,9,15,17,19,21,25,27,29,35,41,45,49,51,53,57,63,71,75,79,81,85,87,95,105,107].contains ((pmod a 2 118 + pmod b 2 118) % 118))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 11 OF 21 — moduli 13, 34, 55, 76, 97, 118, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_13](/theorem/unit_group_exponent_mod_13) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
