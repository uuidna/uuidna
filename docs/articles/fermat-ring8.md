---
title: "The congruence survey, ring 8"
description: "Computed from lean/FermatRing8.lean — 75 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 8

> THE CONGRUENCE SURVEY, RING 8 OF 21 — moduli 10, 31, 52, 73, 94, 115, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_10](/theorem/unit_group_exponent_mod_10) and its 74 siblings below.

**75 theorems**, from [unit_group_exponent_mod_10](/theorem/unit_group_exponent_mod_10) onward, each proven `by decide` in <a href="/lean/FermatRing8.lean">lean/FermatRing8.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 55 of its 75 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_10](/theorem/unit_group_exponent_mod_10). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing8.lean)** — nothing to install. The editor fetches `lean/FermatRing8.lean` from the repository and re-decides all 75 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 10. The 4 residues coprime to 10 are all killed by the exponent 4 — a^4 = 1 for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent of (Z/10)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_10](/theorem/unit_group_exponent_mod_10) — proven `by decide`, sorry-free:

```lean
([1,3,7,9].all (fun a => pmod a 4 10 == 1)) ∧ ([1,2].all (fun k => !([1,3,7,9].all (fun a => pmod a k 10 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 10 AND REDUCED EXPONENT 1. The 4 units raise to exactly the 4 value(s) [1,3,7,9] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_10](/theorem/power_image_exact_reduced_1_mod_10) — proven `by decide`, sorry-free:

```lean
([1,3,7,9].all (fun a => [1,3,7,9].contains (pmod a 1 10))) ∧ ([1,3,7,9].all (fun v => [1,3,7,9].any (fun a => pmod a 1 10 == v)))
```

### AN OBSTRUCTION AT MODULUS 10, REDUCED EXPONENT 1. For every unit a in [1,3,7,9] and every unit b coprime to 10, the sum of their 1-th powers never lands on the 1-th power image [1,3,7,9] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 10, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 10 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_10](/theorem/coprime_sum_blocked_reduced_1_mod_10) — proven `by decide`, sorry-free:

```lean
[1,3,7,9].all (fun a => [1,3,7,9].all (fun b => !([1,3,7,9].contains ((pmod a 1 10 + pmod b 1 10) % 10))))
```

### THE IMAGE, PINNED, AT MODULUS 10 AND REDUCED EXPONENT 2. The 4 units raise to exactly the 2 value(s) [1,9] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_10](/theorem/power_image_exact_reduced_2_mod_10) — proven `by decide`, sorry-free:

```lean
([1,3,7,9].all (fun a => [1,9].contains (pmod a 2 10))) ∧ ([1,9].all (fun v => [1,3,7,9].any (fun a => pmod a 2 10 == v)))
```

### AN OBSTRUCTION AT MODULUS 10, REDUCED EXPONENT 2. For every unit a in [1,3,7,9] and every unit b coprime to 10, the sum of their 2-th powers never lands on the 2-th power image [1,9] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 10, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 10 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_10](/theorem/coprime_sum_blocked_reduced_2_mod_10) — proven `by decide`, sorry-free:

```lean
[1,3,7,9].all (fun a => [1,3,7,9].all (fun b => !([1,9].contains ((pmod a 2 10 + pmod b 2 10) % 10))))
```

### THE IMAGE, PINNED, AT MODULUS 10 AND REDUCED EXPONENT 4. The 4 units raise to exactly the 1 value(s) [1] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_10](/theorem/power_image_exact_reduced_4_mod_10) — proven `by decide`, sorry-free:

```lean
([1,3,7,9].all (fun a => [1].contains (pmod a 4 10))) ∧ ([1].all (fun v => [1,3,7,9].any (fun a => pmod a 4 10 == v)))
```

### AN OBSTRUCTION AT MODULUS 10, REDUCED EXPONENT 4. For every unit a in [1,3,7,9] and every unit b coprime to 10, the sum of their 4-th powers never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 10, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 10 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_10](/theorem/coprime_sum_blocked_reduced_4_mod_10) — proven `by decide`, sorry-free:

```lean
[1,3,7,9].all (fun a => [1,3,7,9].all (fun b => !([1].contains ((pmod a 4 10 + pmod b 4 10) % 10))))
```

### THE ORDER STRUCTURE AT MODULUS 31. The 30 residues coprime to 31 are all killed by the exponent 30 — a^30 = 1 for every unit a — and no proper divisor of 30 kills them all (all 7 of them checked). So 30 is the exponent of (Z/31)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 30), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_31](/theorem/unit_group_exponent_mod_31) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].all (fun a => pmod a 30 31 == 1)) ∧ ([1,2,3,5,6,10,15].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].all (fun a => pmod a k 31 == 1))))
```

### NO OBSTRUCTION AT MODULUS 31, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 31), with all three coprime to 31, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_31](/theorem/coprime_sum_open_reduced_1_mod_31) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 31 + pmod 1 1 31) % 31 = pmod 2 1 31
```

### NO OBSTRUCTION AT MODULUS 31, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 8^2 (mod 31), with all three coprime to 31, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [4,8,14,16,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_31](/theorem/coprime_sum_open_reduced_2_mod_31) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 31 + pmod 1 2 31) % 31 = pmod 8 2 31
```

### NO OBSTRUCTION AT MODULUS 31, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 1^3 = 4^3 (mod 31), with all three coprime to 31, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 3 — that is n in [3,9,21] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_3_mod_31](/theorem/coprime_sum_open_reduced_3_mod_31) — proven `by decide`, sorry-free:

```lean
(pmod 1 3 31 + pmod 1 3 31) % 31 = pmod 4 3 31
```

### NO OBSTRUCTION AT MODULUS 31, REDUCED EXPONENT 5 — the control, and it fires. 1^5 + 5^5 = 3^5 (mod 31), with all three coprime to 31, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 5 — that is n in [5] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_5_mod_31](/theorem/coprime_sum_open_reduced_5_mod_31) — proven `by decide`, sorry-free:

```lean
(pmod 1 5 31 + pmod 5 5 31) % 31 = pmod 3 5 31
```

### NO OBSTRUCTION AT MODULUS 31, REDUCED EXPONENT 6 — the control, and it fires. 1^6 + 1^6 = 2^6 (mod 31), with all three coprime to 31, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 6 — that is n in [6,12,18] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_6_mod_31](/theorem/coprime_sum_open_reduced_6_mod_31) — proven `by decide`, sorry-free:

```lean
(pmod 1 6 31 + pmod 1 6 31) % 31 = pmod 2 6 31
```

### THE IMAGE, PINNED, AT MODULUS 31 AND REDUCED EXPONENT 10. The 30 units raise to exactly the 3 value(s) [1,5,25] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_31](/theorem/power_image_exact_reduced_10_mod_31) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].all (fun a => [1,5,25].contains (pmod a 10 31))) ∧ ([1,5,25].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].any (fun a => pmod a 10 31 == v)))
```

### AN OBSTRUCTION AT MODULUS 31, REDUCED EXPONENT 10. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30] and every unit b coprime to 31, the sum of their 10-th powers never lands on the 10-th power image [1,5,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 31, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 31 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_31](/theorem/coprime_sum_blocked_reduced_10_mod_31) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].all (fun b => !([1,5,25].contains ((pmod a 10 31 + pmod b 10 31) % 31))))
```

### THE IMAGE, PINNED, AT MODULUS 31 AND REDUCED EXPONENT 15. The 30 units raise to exactly the 2 value(s) [1,30] — every unit's 15-th power is in that list, and every entry of the list is some unit's 15-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_15_mod_31](/theorem/power_image_exact_reduced_15_mod_31) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].all (fun a => [1,30].contains (pmod a 15 31))) ∧ ([1,30].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].any (fun a => pmod a 15 31 == v)))
```

### AN OBSTRUCTION AT MODULUS 31, REDUCED EXPONENT 15. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30] and every unit b coprime to 31, the sum of their 15-th powers never lands on the 15-th power image [1,30] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 31, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 31 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_15_mod_31](/theorem/coprime_sum_blocked_reduced_15_mod_31) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].all (fun b => !([1,30].contains ((pmod a 15 31 + pmod b 15 31) % 31))))
```

### THE ORDER STRUCTURE AT MODULUS 52. The 24 residues coprime to 52 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/52)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_52](/theorem/unit_group_exponent_mod_52) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => pmod a 12 52 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => pmod a k 52 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 52 AND REDUCED EXPONENT 1. The 24 units raise to exactly the 24 value(s) [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_52](/theorem/power_image_exact_reduced_1_mod_52) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].contains (pmod a 1 52))) ∧ ([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].any (fun a => pmod a 1 52 == v)))
```

### AN OBSTRUCTION AT MODULUS 52, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51] and every unit b coprime to 52, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 52, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 52 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_52](/theorem/coprime_sum_blocked_reduced_1_mod_52) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun b => !([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].contains ((pmod a 1 52 + pmod b 1 52) % 52))))
```

### THE IMAGE, PINNED, AT MODULUS 52 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 6 value(s) [1,9,17,25,29,49] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_52](/theorem/power_image_exact_reduced_2_mod_52) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,9,17,25,29,49].contains (pmod a 2 52))) ∧ ([1,9,17,25,29,49].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].any (fun a => pmod a 2 52 == v)))
```

### AN OBSTRUCTION AT MODULUS 52, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51] and every unit b coprime to 52, the sum of their 2-th powers never lands on the 2-th power image [1,9,17,25,29,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 52, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 52 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_52](/theorem/coprime_sum_blocked_reduced_2_mod_52) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun b => !([1,9,17,25,29,49].contains ((pmod a 2 52 + pmod b 2 52) % 52))))
```

### THE IMAGE, PINNED, AT MODULUS 52 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s) [1,5,21,25,27,31,47,51] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_52](/theorem/power_image_exact_reduced_3_mod_52) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,5,21,25,27,31,47,51].contains (pmod a 3 52))) ∧ ([1,5,21,25,27,31,47,51].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].any (fun a => pmod a 3 52 == v)))
```

### AN OBSTRUCTION AT MODULUS 52, REDUCED EXPONENT 3. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51] and every unit b coprime to 52, the sum of their 3-th powers never lands on the 3-th power image [1,5,21,25,27,31,47,51] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 52, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 52 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_52](/theorem/coprime_sum_blocked_reduced_3_mod_52) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun b => !([1,5,21,25,27,31,47,51].contains ((pmod a 3 52 + pmod b 3 52) % 52))))
```

### THE IMAGE, PINNED, AT MODULUS 52 AND REDUCED EXPONENT 4. The 24 units raise to exactly the 3 value(s) [1,9,29] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_52](/theorem/power_image_exact_reduced_4_mod_52) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,9,29].contains (pmod a 4 52))) ∧ ([1,9,29].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].any (fun a => pmod a 4 52 == v)))
```

### AN OBSTRUCTION AT MODULUS 52, REDUCED EXPONENT 4. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51] and every unit b coprime to 52, the sum of their 4-th powers never lands on the 4-th power image [1,9,29] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 52, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 52 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_52](/theorem/coprime_sum_blocked_reduced_4_mod_52) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun b => !([1,9,29].contains ((pmod a 4 52 + pmod b 4 52) % 52))))
```

### THE IMAGE, PINNED, AT MODULUS 52 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 2 value(s) [1,25] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_52](/theorem/power_image_exact_reduced_6_mod_52) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,25].contains (pmod a 6 52))) ∧ ([1,25].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].any (fun a => pmod a 6 52 == v)))
```

### AN OBSTRUCTION AT MODULUS 52, REDUCED EXPONENT 6. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51] and every unit b coprime to 52, the sum of their 6-th powers never lands on the 6-th power image [1,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 52, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 52 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_52](/theorem/coprime_sum_blocked_reduced_6_mod_52) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun b => !([1,25].contains ((pmod a 6 52 + pmod b 6 52) % 52))))
```

### THE IMAGE, PINNED, AT MODULUS 52 AND REDUCED EXPONENT 12. The 24 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_52](/theorem/power_image_exact_reduced_12_mod_52) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1].contains (pmod a 12 52))) ∧ ([1].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].any (fun a => pmod a 12 52 == v)))
```

### AN OBSTRUCTION AT MODULUS 52, REDUCED EXPONENT 12. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51] and every unit b coprime to 52, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 52, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 52 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_52](/theorem/coprime_sum_blocked_reduced_12_mod_52) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51].all (fun b => !([1].contains ((pmod a 12 52 + pmod b 12 52) % 52))))
```

### THE ORDER STRUCTURE AT MODULUS 73. The 72 residues coprime to 73 are all killed by the exponent 72 — a^72 = 1 for every unit a — and no proper divisor of 72 kills them all (all 11 of them checked). So 72 is the exponent of (Z/73)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 72), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_73](/theorem/unit_group_exponent_mod_73) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].all (fun a => pmod a 72 73 == 1)) ∧ ([1,2,3,4,6,8,9,12,18,24,36].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].all (fun a => pmod a k 73 == 1))))
```

### NO OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 73), with all three coprime to 73, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_73](/theorem/coprime_sum_open_reduced_1_mod_73) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 73 + pmod 1 1 73) % 73 = pmod 2 1 73
```

### NO OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 32^2 (mod 73), with all three coprime to 73, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [10,14,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_73](/theorem/coprime_sum_open_reduced_2_mod_73) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 73 + pmod 1 2 73) % 73 = pmod 32 2 73
```

### NO OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 2^3 = 36^3 (mod 73), with all three coprime to 73, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 3 — that is n in [3,15,21] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_3_mod_73](/theorem/coprime_sum_open_reduced_3_mod_73) — proven `by decide`, sorry-free:

```lean
(pmod 1 3 73 + pmod 2 3 73) % 73 = pmod 36 3 73
```

### NO OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 4 — the control, and it fires. 1^4 + 1^4 = 18^4 (mod 73), with all three coprime to 73, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 4 — that is n in [4,20] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_4_mod_73](/theorem/coprime_sum_open_reduced_4_mod_73) — proven `by decide`, sorry-free:

```lean
(pmod 1 4 73 + pmod 1 4 73) % 73 = pmod 18 4 73
```

### NO OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 6 — the control, and it fires. 1^6 + 2^6 = 12^6 (mod 73), with all three coprime to 73, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 6 — that is n in [6] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_6_mod_73](/theorem/coprime_sum_open_reduced_6_mod_73) — proven `by decide`, sorry-free:

```lean
(pmod 1 6 73 + pmod 2 6 73) % 73 = pmod 12 6 73
```

### NO OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 8 — the control, and it fires. 1^8 + 1^8 = 5^8 (mod 73), with all three coprime to 73, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 8 — that is n in [8,16] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_8_mod_73](/theorem/coprime_sum_open_reduced_8_mod_73) — proven `by decide`, sorry-free:

```lean
(pmod 1 8 73 + pmod 1 8 73) % 73 = pmod 5 8 73
```

### THE IMAGE, PINNED, AT MODULUS 73 AND REDUCED EXPONENT 9. The 72 units raise to exactly the 8 value(s) [1,10,22,27,46,51,63,72] — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_9_mod_73](/theorem/power_image_exact_reduced_9_mod_73) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].all (fun a => [1,10,22,27,46,51,63,72].contains (pmod a 9 73))) ∧ ([1,10,22,27,46,51,63,72].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].any (fun a => pmod a 9 73 == v)))
```

### AN OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 9 — part 1 of 3. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34] and every unit b coprime to 73, the sum of their 9-th powers never lands on the 9-th power image [1,10,22,27,46,51,63,72] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 73, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and every larger n with the same gcd against 72. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(73) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 73 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_9_mod_73_part1](/theorem/coprime_sum_blocked_reduced_9_mod_73_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].all (fun b => !([1,10,22,27,46,51,63,72].contains ((pmod a 9 73 + pmod b 9 73) % 73))))
```

### AN OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 9 — part 2 of 3. For every unit a in [35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68] and every unit b coprime to 73, the sum of their 9-th powers never lands on the 9-th power image [1,10,22,27,46,51,63,72] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 73, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and every larger n with the same gcd against 72. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(73) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 73 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_9_mod_73_part2](/theorem/coprime_sum_blocked_reduced_9_mod_73_part2) — proven `by decide`, sorry-free:

```lean
[35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].all (fun b => !([1,10,22,27,46,51,63,72].contains ((pmod a 9 73 + pmod b 9 73) % 73))))
```

### AN OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 9 — part 3 of 3. For every unit a in [69,70,71,72] and every unit b coprime to 73, the sum of their 9-th powers never lands on the 9-th power image [1,10,22,27,46,51,63,72] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 73, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and every larger n with the same gcd against 72. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(73) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 73 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_9_mod_73_part3](/theorem/coprime_sum_blocked_reduced_9_mod_73_part3) — proven `by decide`, sorry-free:

```lean
[69,70,71,72].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].all (fun b => !([1,10,22,27,46,51,63,72].contains ((pmod a 9 73 + pmod b 9 73) % 73))))
```

### NO OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 12 — the control, and it fires. 1^12 + 2^12 = 5^12 (mod 73), with all three coprime to 73, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 12 — that is n in [12] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_12_mod_73](/theorem/coprime_sum_open_reduced_12_mod_73) — proven `by decide`, sorry-free:

```lean
(pmod 1 12 73 + pmod 2 12 73) % 73 = pmod 5 12 73
```

### THE IMAGE, PINNED, AT MODULUS 73 AND REDUCED EXPONENT 18. The 72 units raise to exactly the 4 value(s) [1,27,46,72] — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_18_mod_73](/theorem/power_image_exact_reduced_18_mod_73) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].all (fun a => [1,27,46,72].contains (pmod a 18 73))) ∧ ([1,27,46,72].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].any (fun a => pmod a 18 73 == v)))
```

### AN OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 18 — part 1 of 3. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34] and every unit b coprime to 73, the sum of their 18-th powers never lands on the 18-th power image [1,27,46,72] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 73, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the same gcd against 72. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(73) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 73 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_18_mod_73_part1](/theorem/coprime_sum_blocked_reduced_18_mod_73_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].all (fun b => !([1,27,46,72].contains ((pmod a 18 73 + pmod b 18 73) % 73))))
```

### AN OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 18 — part 2 of 3. For every unit a in [35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68] and every unit b coprime to 73, the sum of their 18-th powers never lands on the 18-th power image [1,27,46,72] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 73, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the same gcd against 72. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(73) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 73 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_18_mod_73_part2](/theorem/coprime_sum_blocked_reduced_18_mod_73_part2) — proven `by decide`, sorry-free:

```lean
[35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].all (fun b => !([1,27,46,72].contains ((pmod a 18 73 + pmod b 18 73) % 73))))
```

### AN OBSTRUCTION AT MODULUS 73, REDUCED EXPONENT 18 — part 3 of 3. For every unit a in [69,70,71,72] and every unit b coprime to 73, the sum of their 18-th powers never lands on the 18-th power image [1,27,46,72] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 73, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the same gcd against 72. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(73) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 73 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_18_mod_73_part3](/theorem/coprime_sum_blocked_reduced_18_mod_73_part3) — proven `by decide`, sorry-free:

```lean
[69,70,71,72].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].all (fun b => !([1,27,46,72].contains ((pmod a 18 73 + pmod b 18 73) % 73))))
```

### THE ORDER STRUCTURE AT MODULUS 94. The 46 residues coprime to 94 are all killed by the exponent 46 — a^46 = 1 for every unit a — and no proper divisor of 46 kills them all (all 3 of them checked). So 46 is the exponent of (Z/94)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 46), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_94](/theorem/unit_group_exponent_mod_94) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun a => pmod a 46 94 == 1)) ∧ ([1,2,23].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun a => pmod a k 94 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 94 AND REDUCED EXPONENT 1. The 46 units raise to exactly the 46 value(s) [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_94](/theorem/power_image_exact_reduced_1_mod_94) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].contains (pmod a 1 94))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].any (fun a => pmod a 1 94 == v)))
```

### AN OBSTRUCTION AT MODULUS 94, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93] and every unit b coprime to 94, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 94, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21] of the range walked, and every larger n with the same gcd against 46. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 94 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_94](/theorem/coprime_sum_blocked_reduced_1_mod_94) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].contains ((pmod a 1 94 + pmod b 1 94) % 94))))
```

### THE IMAGE, PINNED, AT MODULUS 94 AND REDUCED EXPONENT 2. The 46 units raise to exactly the 23 value(s) [1,3,7,9,17,21,25,27,37,49,51,53,55,59,61,63,65,71,75,79,81,83,89] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_94](/theorem/power_image_exact_reduced_2_mod_94) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun a => [1,3,7,9,17,21,25,27,37,49,51,53,55,59,61,63,65,71,75,79,81,83,89].contains (pmod a 2 94))) ∧ ([1,3,7,9,17,21,25,27,37,49,51,53,55,59,61,63,65,71,75,79,81,83,89].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].any (fun a => pmod a 2 94 == v)))
```

### AN OBSTRUCTION AT MODULUS 94, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93] and every unit b coprime to 94, the sum of their 2-th powers never lands on the 2-th power image [1,3,7,9,17,21,25,27,37,49,51,53,55,59,61,63,65,71,75,79,81,83,89] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 94, for EVERY exponent n reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked, and every larger n with the same gcd against 46. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 94 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_94](/theorem/coprime_sum_blocked_reduced_2_mod_94) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun b => !([1,3,7,9,17,21,25,27,37,49,51,53,55,59,61,63,65,71,75,79,81,83,89].contains ((pmod a 2 94 + pmod b 2 94) % 94))))
```

### THE IMAGE, PINNED, AT MODULUS 94 AND REDUCED EXPONENT 23. The 46 units raise to exactly the 2 value(s) [1,93] — every unit's 23-th power is in that list, and every entry of the list is some unit's 23-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_23_mod_94](/theorem/power_image_exact_reduced_23_mod_94) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun a => [1,93].contains (pmod a 23 94))) ∧ ([1,93].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].any (fun a => pmod a 23 94 == v)))
```

### AN OBSTRUCTION AT MODULUS 94, REDUCED EXPONENT 23. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93] and every unit b coprime to 94, the sum of their 23-th powers never lands on the 23-th power image [1,93] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 94, for EVERY exponent n reducing to 23 — that is n in [23] of the range walked, and every larger n with the same gcd against 46. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 94 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_23_mod_94](/theorem/coprime_sum_blocked_reduced_23_mod_94) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93].all (fun b => !([1,93].contains ((pmod a 23 94 + pmod b 23 94) % 94))))
```

### THE ORDER STRUCTURE AT MODULUS 115. The 88 residues coprime to 115 are all killed by the exponent 44 — a^44 = 1 for every unit a — and no proper divisor of 44 kills them all (all 5 of them checked). So 44 is the exponent of (Z/115)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 44), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_115](/theorem/unit_group_exponent_mod_115) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun a => pmod a 44 115 == 1)) ∧ ([1,2,4,11,22].all (fun k => !([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun a => pmod a k 115 == 1))))
```

### NO OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 115), with all three coprime to 115, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,5,7,9,13,15,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_115](/theorem/coprime_sum_open_reduced_1_mod_115) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 115 + pmod 1 1 115) % 115 = pmod 2 1 115
```

### THE IMAGE, PINNED, AT MODULUS 115 AND REDUCED EXPONENT 2. The 88 units raise to exactly the 22 value(s) [1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_115](/theorem/power_image_exact_reduced_2_mod_115) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun a => [1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104].contains (pmod a 2 115))) ∧ ([1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].any (fun a => pmod a 2 115 == v)))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 2 — part 1 of 4. For every unit a in [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36] and every unit b coprime to 115, the sum of their 2-th powers never lands on the 2-th power image [1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_115_part1](/theorem/coprime_sum_blocked_reduced_2_mod_115_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104].contains ((pmod a 2 115 + pmod b 2 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 2 — part 2 of 4. For every unit a in [37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73] and every unit b coprime to 115, the sum of their 2-th powers never lands on the 2-th power image [1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_115_part2](/theorem/coprime_sum_blocked_reduced_2_mod_115_part2) — proven `by decide`, sorry-free:

```lean
[37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104].contains ((pmod a 2 115 + pmod b 2 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 2 — part 3 of 4. For every unit a in [74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109] and every unit b coprime to 115, the sum of their 2-th powers never lands on the 2-th power image [1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_115_part3](/theorem/coprime_sum_blocked_reduced_2_mod_115_part3) — proven `by decide`, sorry-free:

```lean
[74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104].contains ((pmod a 2 115 + pmod b 2 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 2 — part 4 of 4. For every unit a in [111,112,113,114] and every unit b coprime to 115, the sum of their 2-th powers never lands on the 2-th power image [1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_115_part4](/theorem/coprime_sum_blocked_reduced_2_mod_115_part4) — proven `by decide`, sorry-free:

```lean
[111,112,113,114].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,4,6,9,16,24,26,29,31,36,39,41,49,54,59,64,71,81,94,96,101,104].contains ((pmod a 2 115 + pmod b 2 115) % 115))))
```

### THE IMAGE, PINNED, AT MODULUS 115 AND REDUCED EXPONENT 4. The 88 units raise to exactly the 11 value(s) [1,6,16,26,31,36,41,71,81,96,101] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_115](/theorem/power_image_exact_reduced_4_mod_115) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun a => [1,6,16,26,31,36,41,71,81,96,101].contains (pmod a 4 115))) ∧ ([1,6,16,26,31,36,41,71,81,96,101].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].any (fun a => pmod a 4 115 == v)))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 4 — part 1 of 4. For every unit a in [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36] and every unit b coprime to 115, the sum of their 4-th powers never lands on the 4-th power image [1,6,16,26,31,36,41,71,81,96,101] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_115_part1](/theorem/coprime_sum_blocked_reduced_4_mod_115_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,6,16,26,31,36,41,71,81,96,101].contains ((pmod a 4 115 + pmod b 4 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 4 — part 2 of 4. For every unit a in [37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73] and every unit b coprime to 115, the sum of their 4-th powers never lands on the 4-th power image [1,6,16,26,31,36,41,71,81,96,101] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_115_part2](/theorem/coprime_sum_blocked_reduced_4_mod_115_part2) — proven `by decide`, sorry-free:

```lean
[37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,6,16,26,31,36,41,71,81,96,101].contains ((pmod a 4 115 + pmod b 4 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 4 — part 3 of 4. For every unit a in [74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109] and every unit b coprime to 115, the sum of their 4-th powers never lands on the 4-th power image [1,6,16,26,31,36,41,71,81,96,101] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_115_part3](/theorem/coprime_sum_blocked_reduced_4_mod_115_part3) — proven `by decide`, sorry-free:

```lean
[74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,6,16,26,31,36,41,71,81,96,101].contains ((pmod a 4 115 + pmod b 4 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 4 — part 4 of 4. For every unit a in [111,112,113,114] and every unit b coprime to 115, the sum of their 4-th powers never lands on the 4-th power image [1,6,16,26,31,36,41,71,81,96,101] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_115_part4](/theorem/coprime_sum_blocked_reduced_4_mod_115_part4) — proven `by decide`, sorry-free:

```lean
[111,112,113,114].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,6,16,26,31,36,41,71,81,96,101].contains ((pmod a 4 115 + pmod b 4 115) % 115))))
```

### THE IMAGE, PINNED, AT MODULUS 115 AND REDUCED EXPONENT 11. The 88 units raise to exactly the 8 value(s) [1,22,24,47,68,91,93,114] — every unit's 11-th power is in that list, and every entry of the list is some unit's 11-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_11_mod_115](/theorem/power_image_exact_reduced_11_mod_115) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun a => [1,22,24,47,68,91,93,114].contains (pmod a 11 115))) ∧ ([1,22,24,47,68,91,93,114].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].any (fun a => pmod a 11 115 == v)))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 11 — part 1 of 4. For every unit a in [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36] and every unit b coprime to 115, the sum of their 11-th powers never lands on the 11-th power image [1,22,24,47,68,91,93,114] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_115_part1](/theorem/coprime_sum_blocked_reduced_11_mod_115_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,22,24,47,68,91,93,114].contains ((pmod a 11 115 + pmod b 11 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 11 — part 2 of 4. For every unit a in [37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73] and every unit b coprime to 115, the sum of their 11-th powers never lands on the 11-th power image [1,22,24,47,68,91,93,114] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_115_part2](/theorem/coprime_sum_blocked_reduced_11_mod_115_part2) — proven `by decide`, sorry-free:

```lean
[37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,22,24,47,68,91,93,114].contains ((pmod a 11 115 + pmod b 11 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 11 — part 3 of 4. For every unit a in [74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109] and every unit b coprime to 115, the sum of their 11-th powers never lands on the 11-th power image [1,22,24,47,68,91,93,114] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_115_part3](/theorem/coprime_sum_blocked_reduced_11_mod_115_part3) — proven `by decide`, sorry-free:

```lean
[74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,22,24,47,68,91,93,114].contains ((pmod a 11 115 + pmod b 11 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 11 — part 4 of 4. For every unit a in [111,112,113,114] and every unit b coprime to 115, the sum of their 11-th powers never lands on the 11-th power image [1,22,24,47,68,91,93,114] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_115_part4](/theorem/coprime_sum_blocked_reduced_11_mod_115_part4) — proven `by decide`, sorry-free:

```lean
[111,112,113,114].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,22,24,47,68,91,93,114].contains ((pmod a 11 115 + pmod b 11 115) % 115))))
```

### THE IMAGE, PINNED, AT MODULUS 115 AND REDUCED EXPONENT 22. The 88 units raise to exactly the 2 value(s) [1,24] — every unit's 22-th power is in that list, and every entry of the list is some unit's 22-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_22_mod_115](/theorem/power_image_exact_reduced_22_mod_115) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun a => [1,24].contains (pmod a 22 115))) ∧ ([1,24].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].any (fun a => pmod a 22 115 == v)))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 22 — part 1 of 4. For every unit a in [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36] and every unit b coprime to 115, the sum of their 22-th powers never lands on the 22-th power image [1,24] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_115_part1](/theorem/coprime_sum_blocked_reduced_22_mod_115_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,24].contains ((pmod a 22 115 + pmod b 22 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 22 — part 2 of 4. For every unit a in [37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73] and every unit b coprime to 115, the sum of their 22-th powers never lands on the 22-th power image [1,24] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_115_part2](/theorem/coprime_sum_blocked_reduced_22_mod_115_part2) — proven `by decide`, sorry-free:

```lean
[37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,24].contains ((pmod a 22 115 + pmod b 22 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 22 — part 3 of 4. For every unit a in [74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109] and every unit b coprime to 115, the sum of their 22-th powers never lands on the 22-th power image [1,24] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_115_part3](/theorem/coprime_sum_blocked_reduced_22_mod_115_part3) — proven `by decide`, sorry-free:

```lean
[74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,24].contains ((pmod a 22 115 + pmod b 22 115) % 115))))
```

### AN OBSTRUCTION AT MODULUS 115, REDUCED EXPONENT 22 — part 4 of 4. For every unit a in [111,112,113,114] and every unit b coprime to 115, the sum of their 22-th powers never lands on the 22-th power image [1,24] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 115, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 44. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(115) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 115 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_115_part4](/theorem/coprime_sum_blocked_reduced_22_mod_115_part4) — proven `by decide`, sorry-free:

```lean
[111,112,113,114].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114].all (fun b => !([1,24].contains ((pmod a 22 115 + pmod b 22 115) % 115))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 8 OF 21 — moduli 10, 31, 52, 73, 94, 115, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_10](/theorem/unit_group_exponent_mod_10) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
