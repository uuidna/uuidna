---
title: "The congruence survey, ring 12"
description: "Computed from lean/FermatRing12.lean — 96 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 12

> THE CONGRUENCE SURVEY, RING 12 OF 21 — moduli 14, 35, 56, 77, 98, 119, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_14](/theorem/unit_group_exponent_mod_14) and its 95 siblings below.

**96 theorems**, from [unit_group_exponent_mod_14](/theorem/unit_group_exponent_mod_14) onward, each proven `by decide` in <a href="/lean/FermatRing12.lean">lean/FermatRing12.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 65 of its 96 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_14](/theorem/unit_group_exponent_mod_14). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing12.lean)** — nothing to install. The editor fetches `lean/FermatRing12.lean` from the repository and re-decides all 96 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 14. The 6 residues coprime to 14 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/14)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_14](/theorem/unit_group_exponent_mod_14) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13].all (fun a => pmod a 6 14 == 1)) ∧ ([1,2,3].all (fun k => !([1,3,5,9,11,13].all (fun a => pmod a k 14 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 14 AND REDUCED EXPONENT 1. The 6 units raise to exactly the 6 value(s) [1,3,5,9,11,13] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_14](/theorem/power_image_exact_reduced_1_mod_14) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13].all (fun a => [1,3,5,9,11,13].contains (pmod a 1 14))) ∧ ([1,3,5,9,11,13].all (fun v => [1,3,5,9,11,13].any (fun a => pmod a 1 14 == v)))
```

### AN OBSTRUCTION AT MODULUS 14, REDUCED EXPONENT 1. For every unit a in [1,3,5,9,11,13] and every unit b coprime to 14, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,9,11,13] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 14, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 14 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_14](/theorem/coprime_sum_blocked_reduced_1_mod_14) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13].all (fun a => [1,3,5,9,11,13].all (fun b => !([1,3,5,9,11,13].contains ((pmod a 1 14 + pmod b 1 14) % 14))))
```

### THE IMAGE, PINNED, AT MODULUS 14 AND REDUCED EXPONENT 2. The 6 units raise to exactly the 3 value(s) [1,9,11] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_14](/theorem/power_image_exact_reduced_2_mod_14) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13].all (fun a => [1,9,11].contains (pmod a 2 14))) ∧ ([1,9,11].all (fun v => [1,3,5,9,11,13].any (fun a => pmod a 2 14 == v)))
```

### AN OBSTRUCTION AT MODULUS 14, REDUCED EXPONENT 2. For every unit a in [1,3,5,9,11,13] and every unit b coprime to 14, the sum of their 2-th powers never lands on the 2-th power image [1,9,11] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 14, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 14 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_14](/theorem/coprime_sum_blocked_reduced_2_mod_14) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13].all (fun a => [1,3,5,9,11,13].all (fun b => !([1,9,11].contains ((pmod a 2 14 + pmod b 2 14) % 14))))
```

### THE IMAGE, PINNED, AT MODULUS 14 AND REDUCED EXPONENT 3. The 6 units raise to exactly the 2 value(s) [1,13] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_14](/theorem/power_image_exact_reduced_3_mod_14) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13].all (fun a => [1,13].contains (pmod a 3 14))) ∧ ([1,13].all (fun v => [1,3,5,9,11,13].any (fun a => pmod a 3 14 == v)))
```

### AN OBSTRUCTION AT MODULUS 14, REDUCED EXPONENT 3. For every unit a in [1,3,5,9,11,13] and every unit b coprime to 14, the sum of their 3-th powers never lands on the 3-th power image [1,13] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 14, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 14 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_14](/theorem/coprime_sum_blocked_reduced_3_mod_14) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13].all (fun a => [1,3,5,9,11,13].all (fun b => !([1,13].contains ((pmod a 3 14 + pmod b 3 14) % 14))))
```

### THE IMAGE, PINNED, AT MODULUS 14 AND REDUCED EXPONENT 6. The 6 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_14](/theorem/power_image_exact_reduced_6_mod_14) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13].all (fun a => [1].contains (pmod a 6 14))) ∧ ([1].all (fun v => [1,3,5,9,11,13].any (fun a => pmod a 6 14 == v)))
```

### AN OBSTRUCTION AT MODULUS 14, REDUCED EXPONENT 6. For every unit a in [1,3,5,9,11,13] and every unit b coprime to 14, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 14, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 14 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_14](/theorem/coprime_sum_blocked_reduced_6_mod_14) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13].all (fun a => [1,3,5,9,11,13].all (fun b => !([1].contains ((pmod a 6 14 + pmod b 6 14) % 14))))
```

### THE ORDER STRUCTURE AT MODULUS 35. The 24 residues coprime to 35 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/35)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_35](/theorem/unit_group_exponent_mod_35) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => pmod a 12 35 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => pmod a k 35 == 1))))
```

### NO OBSTRUCTION AT MODULUS 35, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 35), with all three coprime to 35, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_35](/theorem/coprime_sum_open_reduced_1_mod_35) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 35 + pmod 1 1 35) % 35 = pmod 2 1 35
```

### THE IMAGE, PINNED, AT MODULUS 35 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 6 value(s) [1,4,9,11,16,29] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_35](/theorem/power_image_exact_reduced_2_mod_35) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => [1,4,9,11,16,29].contains (pmod a 2 35))) ∧ ([1,4,9,11,16,29].all (fun v => [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].any (fun a => pmod a 2 35 == v)))
```

### AN OBSTRUCTION AT MODULUS 35, REDUCED EXPONENT 2. For every unit a in [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34] and every unit b coprime to 35, the sum of their 2-th powers never lands on the 2-th power image [1,4,9,11,16,29] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 35, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 35 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_35](/theorem/coprime_sum_blocked_reduced_2_mod_35) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun b => !([1,4,9,11,16,29].contains ((pmod a 2 35 + pmod b 2 35) % 35))))
```

### THE IMAGE, PINNED, AT MODULUS 35 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s) [1,6,8,13,22,27,29,34] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_35](/theorem/power_image_exact_reduced_3_mod_35) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => [1,6,8,13,22,27,29,34].contains (pmod a 3 35))) ∧ ([1,6,8,13,22,27,29,34].all (fun v => [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].any (fun a => pmod a 3 35 == v)))
```

### AN OBSTRUCTION AT MODULUS 35, REDUCED EXPONENT 3. For every unit a in [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34] and every unit b coprime to 35, the sum of their 3-th powers never lands on the 3-th power image [1,6,8,13,22,27,29,34] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 35, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 35 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_35](/theorem/coprime_sum_blocked_reduced_3_mod_35) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun b => !([1,6,8,13,22,27,29,34].contains ((pmod a 3 35 + pmod b 3 35) % 35))))
```

### THE IMAGE, PINNED, AT MODULUS 35 AND REDUCED EXPONENT 4. The 24 units raise to exactly the 3 value(s) [1,11,16] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_35](/theorem/power_image_exact_reduced_4_mod_35) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => [1,11,16].contains (pmod a 4 35))) ∧ ([1,11,16].all (fun v => [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].any (fun a => pmod a 4 35 == v)))
```

### AN OBSTRUCTION AT MODULUS 35, REDUCED EXPONENT 4. For every unit a in [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34] and every unit b coprime to 35, the sum of their 4-th powers never lands on the 4-th power image [1,11,16] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 35, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 35 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_35](/theorem/coprime_sum_blocked_reduced_4_mod_35) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun b => !([1,11,16].contains ((pmod a 4 35 + pmod b 4 35) % 35))))
```

### THE IMAGE, PINNED, AT MODULUS 35 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 2 value(s) [1,29] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_35](/theorem/power_image_exact_reduced_6_mod_35) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => [1,29].contains (pmod a 6 35))) ∧ ([1,29].all (fun v => [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].any (fun a => pmod a 6 35 == v)))
```

### AN OBSTRUCTION AT MODULUS 35, REDUCED EXPONENT 6. For every unit a in [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34] and every unit b coprime to 35, the sum of their 6-th powers never lands on the 6-th power image [1,29] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 35, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 35 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_35](/theorem/coprime_sum_blocked_reduced_6_mod_35) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun b => !([1,29].contains ((pmod a 6 35 + pmod b 6 35) % 35))))
```

### THE IMAGE, PINNED, AT MODULUS 35 AND REDUCED EXPONENT 12. The 24 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_35](/theorem/power_image_exact_reduced_12_mod_35) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => [1].contains (pmod a 12 35))) ∧ ([1].all (fun v => [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].any (fun a => pmod a 12 35 == v)))
```

### AN OBSTRUCTION AT MODULUS 35, REDUCED EXPONENT 12. For every unit a in [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34] and every unit b coprime to 35, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 35, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 35 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_35](/theorem/coprime_sum_blocked_reduced_12_mod_35) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun a => [1,2,3,4,6,8,9,11,12,13,16,17,18,19,22,23,24,26,27,29,31,32,33,34].all (fun b => !([1].contains ((pmod a 12 35 + pmod b 12 35) % 35))))
```

### THE ORDER STRUCTURE AT MODULUS 56. The 24 residues coprime to 56 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/56)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_56](/theorem/unit_group_exponent_mod_56) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun a => pmod a 6 56 == 1)) ∧ ([1,2,3].all (fun k => !([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun a => pmod a k 56 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 56 AND REDUCED EXPONENT 1. The 24 units raise to exactly the 24 value(s) [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_56](/theorem/power_image_exact_reduced_1_mod_56) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].contains (pmod a 1 56))) ∧ ([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].any (fun a => pmod a 1 56 == v)))
```

### AN OBSTRUCTION AT MODULUS 56, REDUCED EXPONENT 1. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55] and every unit b coprime to 56, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 56, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 56 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_56](/theorem/coprime_sum_blocked_reduced_1_mod_56) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun b => !([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].contains ((pmod a 1 56 + pmod b 1 56) % 56))))
```

### THE IMAGE, PINNED, AT MODULUS 56 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 3 value(s) [1,9,25] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_56](/theorem/power_image_exact_reduced_2_mod_56) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun a => [1,9,25].contains (pmod a 2 56))) ∧ ([1,9,25].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].any (fun a => pmod a 2 56 == v)))
```

### AN OBSTRUCTION AT MODULUS 56, REDUCED EXPONENT 2. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55] and every unit b coprime to 56, the sum of their 2-th powers never lands on the 2-th power image [1,9,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 56, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 56 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_56](/theorem/coprime_sum_blocked_reduced_2_mod_56) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun b => !([1,9,25].contains ((pmod a 2 56 + pmod b 2 56) % 56))))
```

### THE IMAGE, PINNED, AT MODULUS 56 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s) [1,13,15,27,29,41,43,55] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_56](/theorem/power_image_exact_reduced_3_mod_56) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun a => [1,13,15,27,29,41,43,55].contains (pmod a 3 56))) ∧ ([1,13,15,27,29,41,43,55].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].any (fun a => pmod a 3 56 == v)))
```

### AN OBSTRUCTION AT MODULUS 56, REDUCED EXPONENT 3. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55] and every unit b coprime to 56, the sum of their 3-th powers never lands on the 3-th power image [1,13,15,27,29,41,43,55] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 56, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 56 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_56](/theorem/coprime_sum_blocked_reduced_3_mod_56) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun b => !([1,13,15,27,29,41,43,55].contains ((pmod a 3 56 + pmod b 3 56) % 56))))
```

### THE IMAGE, PINNED, AT MODULUS 56 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_56](/theorem/power_image_exact_reduced_6_mod_56) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun a => [1].contains (pmod a 6 56))) ∧ ([1].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].any (fun a => pmod a 6 56 == v)))
```

### AN OBSTRUCTION AT MODULUS 56, REDUCED EXPONENT 6. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55] and every unit b coprime to 56, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 56, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 56 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_56](/theorem/coprime_sum_blocked_reduced_6_mod_56) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55].all (fun b => !([1].contains ((pmod a 6 56 + pmod b 6 56) % 56))))
```

### THE ORDER STRUCTURE AT MODULUS 77. The 60 residues coprime to 77 are all killed by the exponent 30 — a^30 = 1 for every unit a — and no proper divisor of 30 kills them all (all 7 of them checked). So 30 is the exponent of (Z/77)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 30), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_77](/theorem/unit_group_exponent_mod_77) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => pmod a 30 77 == 1)) ∧ ([1,2,3,5,6,10,15].all (fun k => !([1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => pmod a k 77 == 1))))
```

### NO OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 77), with all three coprime to 77, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_77](/theorem/coprime_sum_open_reduced_1_mod_77) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 77 + pmod 1 1 77) % 77 = pmod 2 1 77
```

### NO OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 6^2 = 24^2 (mod 77), with all three coprime to 77, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [4,8,14,16,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_77](/theorem/coprime_sum_open_reduced_2_mod_77) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 77 + pmod 6 2 77) % 77 = pmod 24 2 77
```

### THE IMAGE, PINNED, AT MODULUS 77 AND REDUCED EXPONENT 3. The 60 units raise to exactly the 20 value(s) [1,6,8,13,15,20,27,29,34,36,41,43,48,50,57,62,64,69,71,76] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_77](/theorem/power_image_exact_reduced_3_mod_77) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => [1,6,8,13,15,20,27,29,34,36,41,43,48,50,57,62,64,69,71,76].contains (pmod a 3 77))) ∧ ([1,6,8,13,15,20,27,29,34,36,41,43,48,50,57,62,64,69,71,76].all (fun v => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].any (fun a => pmod a 3 77 == v)))
```

### AN OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 3 — part 1 of 2. For every unit a in [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52] and every unit b coprime to 77, the sum of their 3-th powers never lands on the 3-th power image [1,6,8,13,15,20,27,29,34,36,41,43,48,50,57,62,64,69,71,76] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 77, for EVERY exponent n reducing to 3 — that is n in [3,9,21] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(77) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 77 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_77_part1](/theorem/coprime_sum_blocked_reduced_3_mod_77_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52].all (fun a => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun b => !([1,6,8,13,15,20,27,29,34,36,41,43,48,50,57,62,64,69,71,76].contains ((pmod a 3 77 + pmod b 3 77) % 77))))
```

### AN OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 3 — part 2 of 2. For every unit a in [53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76] and every unit b coprime to 77, the sum of their 3-th powers never lands on the 3-th power image [1,6,8,13,15,20,27,29,34,36,41,43,48,50,57,62,64,69,71,76] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 77, for EVERY exponent n reducing to 3 — that is n in [3,9,21] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(77) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 77 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_77_part2](/theorem/coprime_sum_blocked_reduced_3_mod_77_part2) — proven `by decide`, sorry-free:

```lean
[53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun b => !([1,6,8,13,15,20,27,29,34,36,41,43,48,50,57,62,64,69,71,76].contains ((pmod a 3 77 + pmod b 3 77) % 77))))
```

### THE IMAGE, PINNED, AT MODULUS 77 AND REDUCED EXPONENT 5. The 60 units raise to exactly the 12 value(s) [1,10,12,23,32,34,43,45,54,65,67,76] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_77](/theorem/power_image_exact_reduced_5_mod_77) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => [1,10,12,23,32,34,43,45,54,65,67,76].contains (pmod a 5 77))) ∧ ([1,10,12,23,32,34,43,45,54,65,67,76].all (fun v => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].any (fun a => pmod a 5 77 == v)))
```

### AN OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 5 — part 1 of 2. For every unit a in [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52] and every unit b coprime to 77, the sum of their 5-th powers never lands on the 5-th power image [1,10,12,23,32,34,43,45,54,65,67,76] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 77, for EVERY exponent n reducing to 5 — that is n in [5] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(77) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 77 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_77_part1](/theorem/coprime_sum_blocked_reduced_5_mod_77_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52].all (fun a => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun b => !([1,10,12,23,32,34,43,45,54,65,67,76].contains ((pmod a 5 77 + pmod b 5 77) % 77))))
```

### AN OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 5 — part 2 of 2. For every unit a in [53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76] and every unit b coprime to 77, the sum of their 5-th powers never lands on the 5-th power image [1,10,12,23,32,34,43,45,54,65,67,76] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 77, for EVERY exponent n reducing to 5 — that is n in [5] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(77) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 77 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_77_part2](/theorem/coprime_sum_blocked_reduced_5_mod_77_part2) — proven `by decide`, sorry-free:

```lean
[53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun b => !([1,10,12,23,32,34,43,45,54,65,67,76].contains ((pmod a 5 77 + pmod b 5 77) % 77))))
```

### THE IMAGE, PINNED, AT MODULUS 77 AND REDUCED EXPONENT 6. The 60 units raise to exactly the 5 value(s) [1,15,36,64,71] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_77](/theorem/power_image_exact_reduced_6_mod_77) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => [1,15,36,64,71].contains (pmod a 6 77))) ∧ ([1,15,36,64,71].all (fun v => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].any (fun a => pmod a 6 77 == v)))
```

### AN OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 6 — part 1 of 2. For every unit a in [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52] and every unit b coprime to 77, the sum of their 6-th powers never lands on the 6-th power image [1,15,36,64,71] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 77, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(77) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 77 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_77_part1](/theorem/coprime_sum_blocked_reduced_6_mod_77_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52].all (fun a => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun b => !([1,15,36,64,71].contains ((pmod a 6 77 + pmod b 6 77) % 77))))
```

### AN OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 6 — part 2 of 2. For every unit a in [53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76] and every unit b coprime to 77, the sum of their 6-th powers never lands on the 6-th power image [1,15,36,64,71] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 77, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(77) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 77 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_77_part2](/theorem/coprime_sum_blocked_reduced_6_mod_77_part2) — proven `by decide`, sorry-free:

```lean
[53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun b => !([1,15,36,64,71].contains ((pmod a 6 77 + pmod b 6 77) % 77))))
```

### THE IMAGE, PINNED, AT MODULUS 77 AND REDUCED EXPONENT 10. The 60 units raise to exactly the 3 value(s) [1,23,67] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_77](/theorem/power_image_exact_reduced_10_mod_77) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => [1,23,67].contains (pmod a 10 77))) ∧ ([1,23,67].all (fun v => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].any (fun a => pmod a 10 77 == v)))
```

### AN OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 10 — part 1 of 2. For every unit a in [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52] and every unit b coprime to 77, the sum of their 10-th powers never lands on the 10-th power image [1,23,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 77, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(77) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 77 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_77_part1](/theorem/coprime_sum_blocked_reduced_10_mod_77_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52].all (fun a => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun b => !([1,23,67].contains ((pmod a 10 77 + pmod b 10 77) % 77))))
```

### AN OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 10 — part 2 of 2. For every unit a in [53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76] and every unit b coprime to 77, the sum of their 10-th powers never lands on the 10-th power image [1,23,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 77, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(77) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 77 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_77_part2](/theorem/coprime_sum_blocked_reduced_10_mod_77_part2) — proven `by decide`, sorry-free:

```lean
[53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun b => !([1,23,67].contains ((pmod a 10 77 + pmod b 10 77) % 77))))
```

### THE IMAGE, PINNED, AT MODULUS 77 AND REDUCED EXPONENT 15. The 60 units raise to exactly the 4 value(s) [1,34,43,76] — every unit's 15-th power is in that list, and every entry of the list is some unit's 15-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_15_mod_77](/theorem/power_image_exact_reduced_15_mod_77) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => [1,34,43,76].contains (pmod a 15 77))) ∧ ([1,34,43,76].all (fun v => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].any (fun a => pmod a 15 77 == v)))
```

### AN OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 15 — part 1 of 2. For every unit a in [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52] and every unit b coprime to 77, the sum of their 15-th powers never lands on the 15-th power image [1,34,43,76] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 77, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(77) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 77 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_15_mod_77_part1](/theorem/coprime_sum_blocked_reduced_15_mod_77_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52].all (fun a => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun b => !([1,34,43,76].contains ((pmod a 15 77 + pmod b 15 77) % 77))))
```

### AN OBSTRUCTION AT MODULUS 77, REDUCED EXPONENT 15 — part 2 of 2. For every unit a in [53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76] and every unit b coprime to 77, the sum of their 15-th powers never lands on the 15-th power image [1,34,43,76] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 77, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(77) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 77 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_15_mod_77_part2](/theorem/coprime_sum_blocked_reduced_15_mod_77_part2) — proven `by decide`, sorry-free:

```lean
[53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun a => [1,2,3,4,5,6,8,9,10,12,13,15,16,17,18,19,20,23,24,25,26,27,29,30,31,32,34,36,37,38,39,40,41,43,45,46,47,48,50,51,52,53,54,57,58,59,60,61,62,64,65,67,68,69,71,72,73,74,75,76].all (fun b => !([1,34,43,76].contains ((pmod a 15 77 + pmod b 15 77) % 77))))
```

### THE ORDER STRUCTURE AT MODULUS 98. The 42 residues coprime to 98 are all killed by the exponent 42 — a^42 = 1 for every unit a — and no proper divisor of 42 kills them all (all 7 of them checked). So 42 is the exponent of (Z/98)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 42), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_98](/theorem/unit_group_exponent_mod_98) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => pmod a 42 98 == 1)) ∧ ([1,2,3,6,7,14,21].all (fun k => !([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => pmod a k 98 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 98 AND REDUCED EXPONENT 1. The 42 units raise to exactly the 42 value(s) [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_98](/theorem/power_image_exact_reduced_1_mod_98) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].contains (pmod a 1 98))) ∧ ([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].any (fun a => pmod a 1 98 == v)))
```

### AN OBSTRUCTION AT MODULUS 98, REDUCED EXPONENT 1. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97] and every unit b coprime to 98, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 98, for EVERY exponent n reducing to 1 — that is n in [5,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 98 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_98](/theorem/coprime_sum_blocked_reduced_1_mod_98) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun b => !([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].contains ((pmod a 1 98 + pmod b 1 98) % 98))))
```

### THE IMAGE, PINNED, AT MODULUS 98 AND REDUCED EXPONENT 2. The 42 units raise to exactly the 21 value(s) [1,9,11,15,23,25,29,37,39,43,51,53,57,65,67,71,79,81,85,93,95] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_98](/theorem/power_image_exact_reduced_2_mod_98) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,9,11,15,23,25,29,37,39,43,51,53,57,65,67,71,79,81,85,93,95].contains (pmod a 2 98))) ∧ ([1,9,11,15,23,25,29,37,39,43,51,53,57,65,67,71,79,81,85,93,95].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].any (fun a => pmod a 2 98 == v)))
```

### AN OBSTRUCTION AT MODULUS 98, REDUCED EXPONENT 2. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97] and every unit b coprime to 98, the sum of their 2-th powers never lands on the 2-th power image [1,9,11,15,23,25,29,37,39,43,51,53,57,65,67,71,79,81,85,93,95] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 98, for EVERY exponent n reducing to 2 — that is n in [4,8,10,16,20,22] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 98 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_98](/theorem/coprime_sum_blocked_reduced_2_mod_98) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun b => !([1,9,11,15,23,25,29,37,39,43,51,53,57,65,67,71,79,81,85,93,95].contains ((pmod a 2 98 + pmod b 2 98) % 98))))
```

### THE IMAGE, PINNED, AT MODULUS 98 AND REDUCED EXPONENT 3. The 42 units raise to exactly the 14 value(s) [1,13,15,27,29,41,43,55,57,69,71,83,85,97] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_98](/theorem/power_image_exact_reduced_3_mod_98) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,13,15,27,29,41,43,55,57,69,71,83,85,97].contains (pmod a 3 98))) ∧ ([1,13,15,27,29,41,43,55,57,69,71,83,85,97].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].any (fun a => pmod a 3 98 == v)))
```

### AN OBSTRUCTION AT MODULUS 98, REDUCED EXPONENT 3. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97] and every unit b coprime to 98, the sum of their 3-th powers never lands on the 3-th power image [1,13,15,27,29,41,43,55,57,69,71,83,85,97] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 98, for EVERY exponent n reducing to 3 — that is n in [3,9,15] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 98 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_98](/theorem/coprime_sum_blocked_reduced_3_mod_98) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun b => !([1,13,15,27,29,41,43,55,57,69,71,83,85,97].contains ((pmod a 3 98 + pmod b 3 98) % 98))))
```

### THE IMAGE, PINNED, AT MODULUS 98 AND REDUCED EXPONENT 6. The 42 units raise to exactly the 7 value(s) [1,15,29,43,57,71,85] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_98](/theorem/power_image_exact_reduced_6_mod_98) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,15,29,43,57,71,85].contains (pmod a 6 98))) ∧ ([1,15,29,43,57,71,85].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].any (fun a => pmod a 6 98 == v)))
```

### AN OBSTRUCTION AT MODULUS 98, REDUCED EXPONENT 6. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97] and every unit b coprime to 98, the sum of their 6-th powers never lands on the 6-th power image [1,15,29,43,57,71,85] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 98, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 98 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_98](/theorem/coprime_sum_blocked_reduced_6_mod_98) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun b => !([1,15,29,43,57,71,85].contains ((pmod a 6 98 + pmod b 6 98) % 98))))
```

### THE IMAGE, PINNED, AT MODULUS 98 AND REDUCED EXPONENT 7. The 42 units raise to exactly the 6 value(s) [1,19,31,67,79,97] — every unit's 7-th power is in that list, and every entry of the list is some unit's 7-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_7_mod_98](/theorem/power_image_exact_reduced_7_mod_98) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,19,31,67,79,97].contains (pmod a 7 98))) ∧ ([1,19,31,67,79,97].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].any (fun a => pmod a 7 98 == v)))
```

### AN OBSTRUCTION AT MODULUS 98, REDUCED EXPONENT 7. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97] and every unit b coprime to 98, the sum of their 7-th powers never lands on the 7-th power image [1,19,31,67,79,97] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 98, for EVERY exponent n reducing to 7 — that is n in [7] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 98 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_7_mod_98](/theorem/coprime_sum_blocked_reduced_7_mod_98) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun b => !([1,19,31,67,79,97].contains ((pmod a 7 98 + pmod b 7 98) % 98))))
```

### THE IMAGE, PINNED, AT MODULUS 98 AND REDUCED EXPONENT 14. The 42 units raise to exactly the 3 value(s) [1,67,79] — every unit's 14-th power is in that list, and every entry of the list is some unit's 14-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_14_mod_98](/theorem/power_image_exact_reduced_14_mod_98) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,67,79].contains (pmod a 14 98))) ∧ ([1,67,79].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].any (fun a => pmod a 14 98 == v)))
```

### AN OBSTRUCTION AT MODULUS 98, REDUCED EXPONENT 14. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97] and every unit b coprime to 98, the sum of their 14-th powers never lands on the 14-th power image [1,67,79] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 98, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 98 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_14_mod_98](/theorem/coprime_sum_blocked_reduced_14_mod_98) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun b => !([1,67,79].contains ((pmod a 14 98 + pmod b 14 98) % 98))))
```

### THE IMAGE, PINNED, AT MODULUS 98 AND REDUCED EXPONENT 21. The 42 units raise to exactly the 2 value(s) [1,97] — every unit's 21-th power is in that list, and every entry of the list is some unit's 21-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_21_mod_98](/theorem/power_image_exact_reduced_21_mod_98) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,97].contains (pmod a 21 98))) ∧ ([1,97].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].any (fun a => pmod a 21 98 == v)))
```

### AN OBSTRUCTION AT MODULUS 98, REDUCED EXPONENT 21. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97] and every unit b coprime to 98, the sum of their 21-th powers never lands on the 21-th power image [1,97] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 98, for EVERY exponent n reducing to 21 — that is n in [21] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 98 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_21_mod_98](/theorem/coprime_sum_blocked_reduced_21_mod_98) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97].all (fun b => !([1,97].contains ((pmod a 21 98 + pmod b 21 98) % 98))))
```

### THE ORDER STRUCTURE AT MODULUS 119. The 96 residues coprime to 119 are all killed by the exponent 48 — a^48 = 1 for every unit a — and no proper divisor of 48 kills them all (all 9 of them checked). So 48 is the exponent of (Z/119)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 48), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_119](/theorem/unit_group_exponent_mod_119) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => pmod a 48 119 == 1)) ∧ ([1,2,3,4,6,8,12,16,24].all (fun k => !([1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => pmod a k 119 == 1))))
```

### NO OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 119), with all three coprime to 119, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_119](/theorem/coprime_sum_open_reduced_1_mod_119) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 119 + pmod 1 1 119) % 119 = pmod 2 1 119
```

### NO OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 11^2 (mod 119), with all three coprime to 119, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [10,14,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_119](/theorem/coprime_sum_open_reduced_2_mod_119) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 119 + pmod 1 2 119) % 119 = pmod 11 2 119
```

### THE IMAGE, PINNED, AT MODULUS 119 AND REDUCED EXPONENT 3. The 96 units raise to exactly the 32 value(s) [1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_119](/theorem/power_image_exact_reduced_3_mod_119) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118].contains (pmod a 3 119))) ∧ ([1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].any (fun a => pmod a 3 119 == v)))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 3 — part 1 of 4. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31] and every unit b coprime to 119, the sum of their 3-th powers never lands on the 3-th power image [1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_119_part1](/theorem/coprime_sum_blocked_reduced_3_mod_119_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118].contains ((pmod a 3 119 + pmod b 3 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 3 — part 2 of 4. For every unit a in [32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64] and every unit b coprime to 119, the sum of their 3-th powers never lands on the 3-th power image [1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_119_part2](/theorem/coprime_sum_blocked_reduced_3_mod_119_part2) — proven `by decide`, sorry-free:

```lean
[32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118].contains ((pmod a 3 119 + pmod b 3 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 3 — part 3 of 4. For every unit a in [65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96] and every unit b coprime to 119, the sum of their 3-th powers never lands on the 3-th power image [1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_119_part3](/theorem/coprime_sum_blocked_reduced_3_mod_119_part3) — proven `by decide`, sorry-free:

```lean
[65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118].contains ((pmod a 3 119 + pmod b 3 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 3 — part 4 of 4. For every unit a in [97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118] and every unit b coprime to 119, the sum of their 3-th powers never lands on the 3-th power image [1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_119_part4](/theorem/coprime_sum_blocked_reduced_3_mod_119_part4) — proven `by decide`, sorry-free:

```lean
[97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,6,8,13,15,20,22,27,29,36,41,43,48,50,55,57,62,64,69,71,76,78,83,90,92,97,99,104,106,111,113,118].contains ((pmod a 3 119 + pmod b 3 119) % 119))))
```

### THE IMAGE, PINNED, AT MODULUS 119 AND REDUCED EXPONENT 4. The 96 units raise to exactly the 12 value(s) [1,4,16,18,30,50,64,67,72,81,86,106] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_119](/theorem/power_image_exact_reduced_4_mod_119) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,4,16,18,30,50,64,67,72,81,86,106].contains (pmod a 4 119))) ∧ ([1,4,16,18,30,50,64,67,72,81,86,106].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].any (fun a => pmod a 4 119 == v)))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 4 — part 1 of 4. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31] and every unit b coprime to 119, the sum of their 4-th powers never lands on the 4-th power image [1,4,16,18,30,50,64,67,72,81,86,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 4 — that is n in [4,20] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_119_part1](/theorem/coprime_sum_blocked_reduced_4_mod_119_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,4,16,18,30,50,64,67,72,81,86,106].contains ((pmod a 4 119 + pmod b 4 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 4 — part 2 of 4. For every unit a in [32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64] and every unit b coprime to 119, the sum of their 4-th powers never lands on the 4-th power image [1,4,16,18,30,50,64,67,72,81,86,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 4 — that is n in [4,20] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_119_part2](/theorem/coprime_sum_blocked_reduced_4_mod_119_part2) — proven `by decide`, sorry-free:

```lean
[32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,4,16,18,30,50,64,67,72,81,86,106].contains ((pmod a 4 119 + pmod b 4 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 4 — part 3 of 4. For every unit a in [65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96] and every unit b coprime to 119, the sum of their 4-th powers never lands on the 4-th power image [1,4,16,18,30,50,64,67,72,81,86,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 4 — that is n in [4,20] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_119_part3](/theorem/coprime_sum_blocked_reduced_4_mod_119_part3) — proven `by decide`, sorry-free:

```lean
[65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,4,16,18,30,50,64,67,72,81,86,106].contains ((pmod a 4 119 + pmod b 4 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 4 — part 4 of 4. For every unit a in [97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118] and every unit b coprime to 119, the sum of their 4-th powers never lands on the 4-th power image [1,4,16,18,30,50,64,67,72,81,86,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 4 — that is n in [4,20] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_119_part4](/theorem/coprime_sum_blocked_reduced_4_mod_119_part4) — proven `by decide`, sorry-free:

```lean
[97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,4,16,18,30,50,64,67,72,81,86,106].contains ((pmod a 4 119 + pmod b 4 119) % 119))))
```

### THE IMAGE, PINNED, AT MODULUS 119 AND REDUCED EXPONENT 6. The 96 units raise to exactly the 8 value(s) [1,8,15,36,43,50,64,106] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_119](/theorem/power_image_exact_reduced_6_mod_119) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,8,15,36,43,50,64,106].contains (pmod a 6 119))) ∧ ([1,8,15,36,43,50,64,106].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].any (fun a => pmod a 6 119 == v)))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 6 — part 1 of 4. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31] and every unit b coprime to 119, the sum of their 6-th powers never lands on the 6-th power image [1,8,15,36,43,50,64,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_119_part1](/theorem/coprime_sum_blocked_reduced_6_mod_119_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,8,15,36,43,50,64,106].contains ((pmod a 6 119 + pmod b 6 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 6 — part 2 of 4. For every unit a in [32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64] and every unit b coprime to 119, the sum of their 6-th powers never lands on the 6-th power image [1,8,15,36,43,50,64,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_119_part2](/theorem/coprime_sum_blocked_reduced_6_mod_119_part2) — proven `by decide`, sorry-free:

```lean
[32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,8,15,36,43,50,64,106].contains ((pmod a 6 119 + pmod b 6 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 6 — part 3 of 4. For every unit a in [65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96] and every unit b coprime to 119, the sum of their 6-th powers never lands on the 6-th power image [1,8,15,36,43,50,64,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_119_part3](/theorem/coprime_sum_blocked_reduced_6_mod_119_part3) — proven `by decide`, sorry-free:

```lean
[65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,8,15,36,43,50,64,106].contains ((pmod a 6 119 + pmod b 6 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 6 — part 4 of 4. For every unit a in [97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118] and every unit b coprime to 119, the sum of their 6-th powers never lands on the 6-th power image [1,8,15,36,43,50,64,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_119_part4](/theorem/coprime_sum_blocked_reduced_6_mod_119_part4) — proven `by decide`, sorry-free:

```lean
[97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,8,15,36,43,50,64,106].contains ((pmod a 6 119 + pmod b 6 119) % 119))))
```

### THE IMAGE, PINNED, AT MODULUS 119 AND REDUCED EXPONENT 8. The 96 units raise to exactly the 6 value(s) [1,16,18,50,67,86] — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_8_mod_119](/theorem/power_image_exact_reduced_8_mod_119) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,16,18,50,67,86].contains (pmod a 8 119))) ∧ ([1,16,18,50,67,86].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].any (fun a => pmod a 8 119 == v)))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 8 — part 1 of 4. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31] and every unit b coprime to 119, the sum of their 8-th powers never lands on the 8-th power image [1,16,18,50,67,86] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_119_part1](/theorem/coprime_sum_blocked_reduced_8_mod_119_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,16,18,50,67,86].contains ((pmod a 8 119 + pmod b 8 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 8 — part 2 of 4. For every unit a in [32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64] and every unit b coprime to 119, the sum of their 8-th powers never lands on the 8-th power image [1,16,18,50,67,86] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_119_part2](/theorem/coprime_sum_blocked_reduced_8_mod_119_part2) — proven `by decide`, sorry-free:

```lean
[32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,16,18,50,67,86].contains ((pmod a 8 119 + pmod b 8 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 8 — part 3 of 4. For every unit a in [65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96] and every unit b coprime to 119, the sum of their 8-th powers never lands on the 8-th power image [1,16,18,50,67,86] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_119_part3](/theorem/coprime_sum_blocked_reduced_8_mod_119_part3) — proven `by decide`, sorry-free:

```lean
[65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,16,18,50,67,86].contains ((pmod a 8 119 + pmod b 8 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 8 — part 4 of 4. For every unit a in [97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118] and every unit b coprime to 119, the sum of their 8-th powers never lands on the 8-th power image [1,16,18,50,67,86] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_119_part4](/theorem/coprime_sum_blocked_reduced_8_mod_119_part4) — proven `by decide`, sorry-free:

```lean
[97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,16,18,50,67,86].contains ((pmod a 8 119 + pmod b 8 119) % 119))))
```

### THE IMAGE, PINNED, AT MODULUS 119 AND REDUCED EXPONENT 12. The 96 units raise to exactly the 4 value(s) [1,50,64,106] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_119](/theorem/power_image_exact_reduced_12_mod_119) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,50,64,106].contains (pmod a 12 119))) ∧ ([1,50,64,106].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].any (fun a => pmod a 12 119 == v)))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 12 — part 1 of 4. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31] and every unit b coprime to 119, the sum of their 12-th powers never lands on the 12-th power image [1,50,64,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_119_part1](/theorem/coprime_sum_blocked_reduced_12_mod_119_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,50,64,106].contains ((pmod a 12 119 + pmod b 12 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 12 — part 2 of 4. For every unit a in [32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64] and every unit b coprime to 119, the sum of their 12-th powers never lands on the 12-th power image [1,50,64,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_119_part2](/theorem/coprime_sum_blocked_reduced_12_mod_119_part2) — proven `by decide`, sorry-free:

```lean
[32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,50,64,106].contains ((pmod a 12 119 + pmod b 12 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 12 — part 3 of 4. For every unit a in [65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96] and every unit b coprime to 119, the sum of their 12-th powers never lands on the 12-th power image [1,50,64,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_119_part3](/theorem/coprime_sum_blocked_reduced_12_mod_119_part3) — proven `by decide`, sorry-free:

```lean
[65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,50,64,106].contains ((pmod a 12 119 + pmod b 12 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 12 — part 4 of 4. For every unit a in [97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118] and every unit b coprime to 119, the sum of their 12-th powers never lands on the 12-th power image [1,50,64,106] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_119_part4](/theorem/coprime_sum_blocked_reduced_12_mod_119_part4) — proven `by decide`, sorry-free:

```lean
[97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,50,64,106].contains ((pmod a 12 119 + pmod b 12 119) % 119))))
```

### THE IMAGE, PINNED, AT MODULUS 119 AND REDUCED EXPONENT 16. The 96 units raise to exactly the 3 value(s) [1,18,86] — every unit's 16-th power is in that list, and every entry of the list is some unit's 16-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_16_mod_119](/theorem/power_image_exact_reduced_16_mod_119) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,18,86].contains (pmod a 16 119))) ∧ ([1,18,86].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].any (fun a => pmod a 16 119 == v)))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 16 — part 1 of 4. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31] and every unit b coprime to 119, the sum of their 16-th powers never lands on the 16-th power image [1,18,86] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_16_mod_119_part1](/theorem/coprime_sum_blocked_reduced_16_mod_119_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,18,86].contains ((pmod a 16 119 + pmod b 16 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 16 — part 2 of 4. For every unit a in [32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64] and every unit b coprime to 119, the sum of their 16-th powers never lands on the 16-th power image [1,18,86] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_16_mod_119_part2](/theorem/coprime_sum_blocked_reduced_16_mod_119_part2) — proven `by decide`, sorry-free:

```lean
[32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,18,86].contains ((pmod a 16 119 + pmod b 16 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 16 — part 3 of 4. For every unit a in [65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96] and every unit b coprime to 119, the sum of their 16-th powers never lands on the 16-th power image [1,18,86] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_16_mod_119_part3](/theorem/coprime_sum_blocked_reduced_16_mod_119_part3) — proven `by decide`, sorry-free:

```lean
[65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,18,86].contains ((pmod a 16 119 + pmod b 16 119) % 119))))
```

### AN OBSTRUCTION AT MODULUS 119, REDUCED EXPONENT 16 — part 4 of 4. For every unit a in [97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118] and every unit b coprime to 119, the sum of their 16-th powers never lands on the 16-th power image [1,18,86] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 119, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd against 48. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(119) = 96 puts the full 96-by-96 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 119 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_16_mod_119_part4](/theorem/coprime_sum_blocked_reduced_16_mod_119_part4) — proven `by decide`, sorry-free:

```lean
[97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,18,19,20,22,23,24,25,26,27,29,30,31,32,33,36,37,38,39,40,41,43,44,45,46,47,48,50,52,53,54,55,57,58,59,60,61,62,64,65,66,67,69,71,72,73,74,75,76,78,79,80,81,82,83,86,87,88,89,90,92,93,94,95,96,97,99,100,101,103,104,106,107,108,109,110,111,113,114,115,116,117,118].all (fun b => !([1,18,86].contains ((pmod a 16 119 + pmod b 16 119) % 119))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 12 OF 21 — moduli 14, 35, 56, 77, 98, 119, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_14](/theorem/unit_group_exponent_mod_14) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
