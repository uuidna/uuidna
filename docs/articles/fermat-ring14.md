---
title: "The congruence survey, ring 14"
description: "Computed from lean/FermatRing14.lean — 76 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 14

> THE CONGRUENCE SURVEY, RING 14 OF 21 — moduli 16, 37, 58, 79, 100, 121, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_16](/theorem/unit_group_exponent_mod_16) and its 75 siblings below.

**76 theorems**, from [unit_group_exponent_mod_16](/theorem/unit_group_exponent_mod_16) onward, each proven `by decide` in <a href="/lean/FermatRing14.lean">lean/FermatRing14.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 55 of its 76 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_16](/theorem/unit_group_exponent_mod_16). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing14.lean)** — nothing to install. The editor fetches `lean/FermatRing14.lean` from the repository and re-decides all 76 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 16. The 8 residues coprime to 16 are all killed by the exponent 4 — a^4 = 1 for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent of (Z/16)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_16](/theorem/unit_group_exponent_mod_16) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15].all (fun a => pmod a 4 16 == 1)) ∧ ([1,2].all (fun k => !([1,3,5,7,9,11,13,15].all (fun a => pmod a k 16 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 16 AND REDUCED EXPONENT 1. The 8 units raise to exactly the 8 value(s) [1,3,5,7,9,11,13,15] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_16](/theorem/power_image_exact_reduced_1_mod_16) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15].all (fun a => [1,3,5,7,9,11,13,15].contains (pmod a 1 16))) ∧ ([1,3,5,7,9,11,13,15].all (fun v => [1,3,5,7,9,11,13,15].any (fun a => pmod a 1 16 == v)))
```

### AN OBSTRUCTION AT MODULUS 16, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,13,15] and every unit b coprime to 16, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,13,15] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 16, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 16 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_16](/theorem/coprime_sum_blocked_reduced_1_mod_16) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15].all (fun a => [1,3,5,7,9,11,13,15].all (fun b => !([1,3,5,7,9,11,13,15].contains ((pmod a 1 16 + pmod b 1 16) % 16))))
```

### THE IMAGE, PINNED, AT MODULUS 16 AND REDUCED EXPONENT 2. The 8 units raise to exactly the 2 value(s) [1,9] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_16](/theorem/power_image_exact_reduced_2_mod_16) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15].all (fun a => [1,9].contains (pmod a 2 16))) ∧ ([1,9].all (fun v => [1,3,5,7,9,11,13,15].any (fun a => pmod a 2 16 == v)))
```

### AN OBSTRUCTION AT MODULUS 16, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,13,15] and every unit b coprime to 16, the sum of their 2-th powers never lands on the 2-th power image [1,9] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 16, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 16 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_16](/theorem/coprime_sum_blocked_reduced_2_mod_16) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15].all (fun a => [1,3,5,7,9,11,13,15].all (fun b => !([1,9].contains ((pmod a 2 16 + pmod b 2 16) % 16))))
```

### THE IMAGE, PINNED, AT MODULUS 16 AND REDUCED EXPONENT 4. The 8 units raise to exactly the 1 value(s) [1] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_16](/theorem/power_image_exact_reduced_4_mod_16) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15].all (fun a => [1].contains (pmod a 4 16))) ∧ ([1].all (fun v => [1,3,5,7,9,11,13,15].any (fun a => pmod a 4 16 == v)))
```

### AN OBSTRUCTION AT MODULUS 16, REDUCED EXPONENT 4. For every unit a in [1,3,5,7,9,11,13,15] and every unit b coprime to 16, the sum of their 4-th powers never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 16, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 16 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_16](/theorem/coprime_sum_blocked_reduced_4_mod_16) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15].all (fun a => [1,3,5,7,9,11,13,15].all (fun b => !([1].contains ((pmod a 4 16 + pmod b 4 16) % 16))))
```

### THE ORDER STRUCTURE AT MODULUS 37. The 36 residues coprime to 37 are all killed by the exponent 36 — a^36 = 1 for every unit a — and no proper divisor of 36 kills them all (all 8 of them checked). So 36 is the exponent of (Z/37)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 36), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_37](/theorem/unit_group_exponent_mod_37) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun a => pmod a 36 37 == 1)) ∧ ([1,2,3,4,6,9,12,18].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun a => pmod a k 37 == 1))))
```

### NO OBSTRUCTION AT MODULUS 37, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 37), with all three coprime to 37, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_37](/theorem/coprime_sum_open_reduced_1_mod_37) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 37 + pmod 1 1 37) % 37 = pmod 2 1 37
```

### NO OBSTRUCTION AT MODULUS 37, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 3^2 = 11^2 (mod 37), with all three coprime to 37, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [10,14,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_37](/theorem/coprime_sum_open_reduced_2_mod_37) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 37 + pmod 3 2 37) % 37 = pmod 11 2 37
```

### NO OBSTRUCTION AT MODULUS 37, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 7^3 = 21^3 (mod 37), with all three coprime to 37, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 3 — that is n in [3,15,21] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_3_mod_37](/theorem/coprime_sum_open_reduced_3_mod_37) — proven `by decide`, sorry-free:

```lean
(pmod 1 3 37 + pmod 7 3 37) % 37 = pmod 21 3 37
```

### NO OBSTRUCTION AT MODULUS 37, REDUCED EXPONENT 4 — the control, and it fires. 1^4 + 5^4 = 4^4 (mod 37), with all three coprime to 37, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 4 — that is n in [4,8,16,20] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_4_mod_37](/theorem/coprime_sum_open_reduced_4_mod_37) — proven `by decide`, sorry-free:

```lean
(pmod 1 4 37 + pmod 5 4 37) % 37 = pmod 4 4 37
```

### NO OBSTRUCTION AT MODULUS 37, REDUCED EXPONENT 6 — the control, and it fires. 1^6 + 3^6 = 2^6 (mod 37), with all three coprime to 37, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 6 — that is n in [6] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_6_mod_37](/theorem/coprime_sum_open_reduced_6_mod_37) — proven `by decide`, sorry-free:

```lean
(pmod 1 6 37 + pmod 3 6 37) % 37 = pmod 2 6 37
```

### THE IMAGE, PINNED, AT MODULUS 37 AND REDUCED EXPONENT 9. The 36 units raise to exactly the 4 value(s) [1,6,31,36] — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_9_mod_37](/theorem/power_image_exact_reduced_9_mod_37) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun a => [1,6,31,36].contains (pmod a 9 37))) ∧ ([1,6,31,36].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].any (fun a => pmod a 9 37 == v)))
```

### AN OBSTRUCTION AT MODULUS 37, REDUCED EXPONENT 9. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36] and every unit b coprime to 37, the sum of their 9-th powers never lands on the 9-th power image [1,6,31,36] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 37, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 37 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_9_mod_37](/theorem/coprime_sum_blocked_reduced_9_mod_37) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun b => !([1,6,31,36].contains ((pmod a 9 37 + pmod b 9 37) % 37))))
```

### THE IMAGE, PINNED, AT MODULUS 37 AND REDUCED EXPONENT 12. The 36 units raise to exactly the 3 value(s) [1,10,26] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_37](/theorem/power_image_exact_reduced_12_mod_37) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun a => [1,10,26].contains (pmod a 12 37))) ∧ ([1,10,26].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].any (fun a => pmod a 12 37 == v)))
```

### AN OBSTRUCTION AT MODULUS 37, REDUCED EXPONENT 12. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36] and every unit b coprime to 37, the sum of their 12-th powers never lands on the 12-th power image [1,10,26] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 37, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 37 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_37](/theorem/coprime_sum_blocked_reduced_12_mod_37) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun b => !([1,10,26].contains ((pmod a 12 37 + pmod b 12 37) % 37))))
```

### THE IMAGE, PINNED, AT MODULUS 37 AND REDUCED EXPONENT 18. The 36 units raise to exactly the 2 value(s) [1,36] — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_18_mod_37](/theorem/power_image_exact_reduced_18_mod_37) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun a => [1,36].contains (pmod a 18 37))) ∧ ([1,36].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].any (fun a => pmod a 18 37 == v)))
```

### AN OBSTRUCTION AT MODULUS 37, REDUCED EXPONENT 18. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36] and every unit b coprime to 37, the sum of their 18-th powers never lands on the 18-th power image [1,36] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 37, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 37 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_18_mod_37](/theorem/coprime_sum_blocked_reduced_18_mod_37) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36].all (fun b => !([1,36].contains ((pmod a 18 37 + pmod b 18 37) % 37))))
```

### THE ORDER STRUCTURE AT MODULUS 58. The 28 residues coprime to 58 are all killed by the exponent 28 — a^28 = 1 for every unit a — and no proper divisor of 28 kills them all (all 5 of them checked). So 28 is the exponent of (Z/58)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 28), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_58](/theorem/unit_group_exponent_mod_58) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => pmod a 28 58 == 1)) ∧ ([1,2,4,7,14].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => pmod a k 58 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 58 AND REDUCED EXPONENT 1. The 28 units raise to exactly the 28 value(s) [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_58](/theorem/power_image_exact_reduced_1_mod_58) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].contains (pmod a 1 58))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].any (fun a => pmod a 1 58 == v)))
```

### AN OBSTRUCTION AT MODULUS 58, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57] and every unit b coprime to 58, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 58, for EVERY exponent n reducing to 1 — that is n in [3,5,9,11,13,15,17,19,23] of the range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 58 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_58](/theorem/coprime_sum_blocked_reduced_1_mod_58) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].contains ((pmod a 1 58 + pmod b 1 58) % 58))))
```

### THE IMAGE, PINNED, AT MODULUS 58 AND REDUCED EXPONENT 2. The 28 units raise to exactly the 14 value(s) [1,5,7,9,13,23,25,33,35,45,49,51,53,57] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_58](/theorem/power_image_exact_reduced_2_mod_58) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => [1,5,7,9,13,23,25,33,35,45,49,51,53,57].contains (pmod a 2 58))) ∧ ([1,5,7,9,13,23,25,33,35,45,49,51,53,57].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].any (fun a => pmod a 2 58 == v)))
```

### AN OBSTRUCTION AT MODULUS 58, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57] and every unit b coprime to 58, the sum of their 2-th powers never lands on the 2-th power image [1,5,7,9,13,23,25,33,35,45,49,51,53,57] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 58, for EVERY exponent n reducing to 2 — that is n in [6,10,18,22] of the range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 58 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_58](/theorem/coprime_sum_blocked_reduced_2_mod_58) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun b => !([1,5,7,9,13,23,25,33,35,45,49,51,53,57].contains ((pmod a 2 58 + pmod b 2 58) % 58))))
```

### THE IMAGE, PINNED, AT MODULUS 58 AND REDUCED EXPONENT 4. The 28 units raise to exactly the 7 value(s) [1,7,23,25,45,49,53] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_58](/theorem/power_image_exact_reduced_4_mod_58) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => [1,7,23,25,45,49,53].contains (pmod a 4 58))) ∧ ([1,7,23,25,45,49,53].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].any (fun a => pmod a 4 58 == v)))
```

### AN OBSTRUCTION AT MODULUS 58, REDUCED EXPONENT 4. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57] and every unit b coprime to 58, the sum of their 4-th powers never lands on the 4-th power image [1,7,23,25,45,49,53] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 58, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 58 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_58](/theorem/coprime_sum_blocked_reduced_4_mod_58) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun b => !([1,7,23,25,45,49,53].contains ((pmod a 4 58 + pmod b 4 58) % 58))))
```

### THE IMAGE, PINNED, AT MODULUS 58 AND REDUCED EXPONENT 7. The 28 units raise to exactly the 4 value(s) [1,17,41,57] — every unit's 7-th power is in that list, and every entry of the list is some unit's 7-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_7_mod_58](/theorem/power_image_exact_reduced_7_mod_58) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => [1,17,41,57].contains (pmod a 7 58))) ∧ ([1,17,41,57].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].any (fun a => pmod a 7 58 == v)))
```

### AN OBSTRUCTION AT MODULUS 58, REDUCED EXPONENT 7. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57] and every unit b coprime to 58, the sum of their 7-th powers never lands on the 7-th power image [1,17,41,57] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 58, for EVERY exponent n reducing to 7 — that is n in [7,21] of the range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 58 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_7_mod_58](/theorem/coprime_sum_blocked_reduced_7_mod_58) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun b => !([1,17,41,57].contains ((pmod a 7 58 + pmod b 7 58) % 58))))
```

### THE IMAGE, PINNED, AT MODULUS 58 AND REDUCED EXPONENT 14. The 28 units raise to exactly the 2 value(s) [1,57] — every unit's 14-th power is in that list, and every entry of the list is some unit's 14-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_14_mod_58](/theorem/power_image_exact_reduced_14_mod_58) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => [1,57].contains (pmod a 14 58))) ∧ ([1,57].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].any (fun a => pmod a 14 58 == v)))
```

### AN OBSTRUCTION AT MODULUS 58, REDUCED EXPONENT 14. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57] and every unit b coprime to 58, the sum of their 14-th powers never lands on the 14-th power image [1,57] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 58, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 58 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_14_mod_58](/theorem/coprime_sum_blocked_reduced_14_mod_58) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57].all (fun b => !([1,57].contains ((pmod a 14 58 + pmod b 14 58) % 58))))
```

### THE ORDER STRUCTURE AT MODULUS 79. The 78 residues coprime to 79 are all killed by the exponent 78 — a^78 = 1 for every unit a — and no proper divisor of 78 kills them all (all 7 of them checked). So 78 is the exponent of (Z/79)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 78), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_79](/theorem/unit_group_exponent_mod_79) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78].all (fun a => pmod a 78 79 == 1)) ∧ ([1,2,3,6,13,26,39].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78].all (fun a => pmod a k 79 == 1))))
```

### NO OBSTRUCTION AT MODULUS 79, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 79), with all three coprime to 79, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_79](/theorem/coprime_sum_open_reduced_1_mod_79) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 79 + pmod 1 1 79) % 79 = pmod 2 1 79
```

### NO OBSTRUCTION AT MODULUS 79, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 9^2 (mod 79), with all three coprime to 79, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_79](/theorem/coprime_sum_open_reduced_2_mod_79) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 79 + pmod 1 2 79) % 79 = pmod 9 2 79
```

### NO OBSTRUCTION AT MODULUS 79, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 4^3 = 18^3 (mod 79), with all three coprime to 79, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 3 — that is n in [3,9,15,21] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_3_mod_79](/theorem/coprime_sum_open_reduced_3_mod_79) — proven `by decide`, sorry-free:

```lean
(pmod 1 3 79 + pmod 4 3 79) % 79 = pmod 18 3 79
```

### NO OBSTRUCTION AT MODULUS 79, REDUCED EXPONENT 6 — the control, and it fires. 1^6 + 2^6 = 11^6 (mod 79), with all three coprime to 79, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 6 — that is n in [6,12,18] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_6_mod_79](/theorem/coprime_sum_open_reduced_6_mod_79) — proven `by decide`, sorry-free:

```lean
(pmod 1 6 79 + pmod 2 6 79) % 79 = pmod 11 6 79
```

### NO OBSTRUCTION AT MODULUS 79, REDUCED EXPONENT 13 — the control, and it fires. 1^13 + 2^13 = 6^13 (mod 79), with all three coprime to 79, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 13 — that is n in [13] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_13_mod_79](/theorem/coprime_sum_open_reduced_13_mod_79) — proven `by decide`, sorry-free:

```lean
(pmod 1 13 79 + pmod 2 13 79) % 79 = pmod 6 13 79
```

### THE ORDER STRUCTURE AT MODULUS 100. The 40 residues coprime to 100 are all killed by the exponent 20 — a^20 = 1 for every unit a — and no proper divisor of 20 kills them all (all 5 of them checked). So 20 is the exponent of (Z/100)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 20), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_100](/theorem/unit_group_exponent_mod_100) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => pmod a 20 100 == 1)) ∧ ([1,2,4,5,10].all (fun k => !([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => pmod a k 100 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 100 AND REDUCED EXPONENT 1. The 40 units raise to exactly the 40 value(s) [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_100](/theorem/power_image_exact_reduced_1_mod_100) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].contains (pmod a 1 100))) ∧ ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].any (fun a => pmod a 1 100 == v)))
```

### AN OBSTRUCTION AT MODULUS 100, REDUCED EXPONENT 1. For every unit a in [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99] and every unit b coprime to 100, the sum of their 1-th powers never lands on the 1-th power image [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 100, for EVERY exponent n reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 100 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_100](/theorem/coprime_sum_blocked_reduced_1_mod_100) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun b => !([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].contains ((pmod a 1 100 + pmod b 1 100) % 100))))
```

### THE IMAGE, PINNED, AT MODULUS 100 AND REDUCED EXPONENT 2. The 40 units raise to exactly the 10 value(s) [1,9,21,29,41,49,61,69,81,89] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_100](/theorem/power_image_exact_reduced_2_mod_100) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,9,21,29,41,49,61,69,81,89].contains (pmod a 2 100))) ∧ ([1,9,21,29,41,49,61,69,81,89].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].any (fun a => pmod a 2 100 == v)))
```

### AN OBSTRUCTION AT MODULUS 100, REDUCED EXPONENT 2. For every unit a in [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99] and every unit b coprime to 100, the sum of their 2-th powers never lands on the 2-th power image [1,9,21,29,41,49,61,69,81,89] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 100, for EVERY exponent n reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 100 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_100](/theorem/coprime_sum_blocked_reduced_2_mod_100) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun b => !([1,9,21,29,41,49,61,69,81,89].contains ((pmod a 2 100 + pmod b 2 100) % 100))))
```

### THE IMAGE, PINNED, AT MODULUS 100 AND REDUCED EXPONENT 4. The 40 units raise to exactly the 5 value(s) [1,21,41,61,81] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_100](/theorem/power_image_exact_reduced_4_mod_100) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,21,41,61,81].contains (pmod a 4 100))) ∧ ([1,21,41,61,81].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].any (fun a => pmod a 4 100 == v)))
```

### AN OBSTRUCTION AT MODULUS 100, REDUCED EXPONENT 4. For every unit a in [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99] and every unit b coprime to 100, the sum of their 4-th powers never lands on the 4-th power image [1,21,41,61,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 100, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 100 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_100](/theorem/coprime_sum_blocked_reduced_4_mod_100) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun b => !([1,21,41,61,81].contains ((pmod a 4 100 + pmod b 4 100) % 100))))
```

### THE IMAGE, PINNED, AT MODULUS 100 AND REDUCED EXPONENT 5. The 40 units raise to exactly the 8 value(s) [1,7,43,49,51,57,93,99] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_100](/theorem/power_image_exact_reduced_5_mod_100) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,7,43,49,51,57,93,99].contains (pmod a 5 100))) ∧ ([1,7,43,49,51,57,93,99].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].any (fun a => pmod a 5 100 == v)))
```

### AN OBSTRUCTION AT MODULUS 100, REDUCED EXPONENT 5. For every unit a in [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99] and every unit b coprime to 100, the sum of their 5-th powers never lands on the 5-th power image [1,7,43,49,51,57,93,99] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 100, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 100 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_100](/theorem/coprime_sum_blocked_reduced_5_mod_100) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun b => !([1,7,43,49,51,57,93,99].contains ((pmod a 5 100 + pmod b 5 100) % 100))))
```

### THE IMAGE, PINNED, AT MODULUS 100 AND REDUCED EXPONENT 10. The 40 units raise to exactly the 2 value(s) [1,49] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_100](/theorem/power_image_exact_reduced_10_mod_100) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,49].contains (pmod a 10 100))) ∧ ([1,49].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].any (fun a => pmod a 10 100 == v)))
```

### AN OBSTRUCTION AT MODULUS 100, REDUCED EXPONENT 10. For every unit a in [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99] and every unit b coprime to 100, the sum of their 10-th powers never lands on the 10-th power image [1,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 100, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 100 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_100](/theorem/coprime_sum_blocked_reduced_10_mod_100) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun b => !([1,49].contains ((pmod a 10 100 + pmod b 10 100) % 100))))
```

### THE IMAGE, PINNED, AT MODULUS 100 AND REDUCED EXPONENT 20. The 40 units raise to exactly the 1 value(s) [1] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_20_mod_100](/theorem/power_image_exact_reduced_20_mod_100) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1].contains (pmod a 20 100))) ∧ ([1].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].any (fun a => pmod a 20 100 == v)))
```

### AN OBSTRUCTION AT MODULUS 100, REDUCED EXPONENT 20. For every unit a in [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99] and every unit b coprime to 100, the sum of their 20-th powers never lands on the 20-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 100, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 100 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_100](/theorem/coprime_sum_blocked_reduced_20_mod_100) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79,81,83,87,89,91,93,97,99].all (fun b => !([1].contains ((pmod a 20 100 + pmod b 20 100) % 100))))
```

### THE ORDER STRUCTURE AT MODULUS 121. The 110 residues coprime to 121 are all killed by the exponent 110 — a^110 = 1 for every unit a — and no proper divisor of 110 kills them all (all 7 of them checked). So 110 is the exponent of (Z/121)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 110), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_121](/theorem/unit_group_exponent_mod_121) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun a => pmod a 110 121 == 1)) ∧ ([1,2,5,10,11,22,55].all (fun k => !([1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun a => pmod a k 121 == 1))))
```

### NO OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 121), with all three coprime to 121, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,7,9,13,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_121](/theorem/coprime_sum_open_reduced_1_mod_121) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 121 + pmod 1 1 121) % 121 = pmod 2 1 121
```

### NO OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 2^2 = 48^2 (mod 121), with all three coprime to 121, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [4,6,8,12,14,16,18] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_121](/theorem/coprime_sum_open_reduced_2_mod_121) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 121 + pmod 2 2 121) % 121 = pmod 48 2 121
```

### THE IMAGE, PINNED, AT MODULUS 121 AND REDUCED EXPONENT 5. The 110 units raise to exactly the 22 value(s) [1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_121](/theorem/power_image_exact_reduced_5_mod_121) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun a => [1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120].contains (pmod a 5 121))) ∧ ([1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120].all (fun v => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].any (fun a => pmod a 5 121 == v)))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 5 — part 1 of 5. For every unit a in [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24] and every unit b coprime to 121, the sum of their 5-th powers never lands on the 5-th power image [1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_121_part1](/theorem/coprime_sum_blocked_reduced_5_mod_121_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120].contains ((pmod a 5 121 + pmod b 5 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 5 — part 2 of 5. For every unit a in [25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48] and every unit b coprime to 121, the sum of their 5-th powers never lands on the 5-th power image [1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_121_part2](/theorem/coprime_sum_blocked_reduced_5_mod_121_part2) — proven `by decide`, sorry-free:

```lean
[25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120].contains ((pmod a 5 121 + pmod b 5 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 5 — part 3 of 5. For every unit a in [49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72] and every unit b coprime to 121, the sum of their 5-th powers never lands on the 5-th power image [1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_121_part3](/theorem/coprime_sum_blocked_reduced_5_mod_121_part3) — proven `by decide`, sorry-free:

```lean
[49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120].contains ((pmod a 5 121 + pmod b 5 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 5 — part 4 of 5. For every unit a in [73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96] and every unit b coprime to 121, the sum of their 5-th powers never lands on the 5-th power image [1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_121_part4](/theorem/coprime_sum_blocked_reduced_5_mod_121_part4) — proven `by decide`, sorry-free:

```lean
[73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120].contains ((pmod a 5 121 + pmod b 5 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 5 — part 5 of 5. For every unit a in [97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120] and every unit b coprime to 121, the sum of their 5-th powers never lands on the 5-th power image [1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_121_part5](/theorem/coprime_sum_blocked_reduced_5_mod_121_part5) — proven `by decide`, sorry-free:

```lean
[97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,10,12,21,23,32,34,43,45,54,56,65,67,76,78,87,89,98,100,109,111,120].contains ((pmod a 5 121 + pmod b 5 121) % 121))))
```

### THE IMAGE, PINNED, AT MODULUS 121 AND REDUCED EXPONENT 10. The 110 units raise to exactly the 11 value(s) [1,12,23,34,45,56,67,78,89,100,111] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_121](/theorem/power_image_exact_reduced_10_mod_121) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun a => [1,12,23,34,45,56,67,78,89,100,111].contains (pmod a 10 121))) ∧ ([1,12,23,34,45,56,67,78,89,100,111].all (fun v => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].any (fun a => pmod a 10 121 == v)))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 10 — part 1 of 5. For every unit a in [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24] and every unit b coprime to 121, the sum of their 10-th powers never lands on the 10-th power image [1,12,23,34,45,56,67,78,89,100,111] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_121_part1](/theorem/coprime_sum_blocked_reduced_10_mod_121_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,12,23,34,45,56,67,78,89,100,111].contains ((pmod a 10 121 + pmod b 10 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 10 — part 2 of 5. For every unit a in [25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48] and every unit b coprime to 121, the sum of their 10-th powers never lands on the 10-th power image [1,12,23,34,45,56,67,78,89,100,111] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_121_part2](/theorem/coprime_sum_blocked_reduced_10_mod_121_part2) — proven `by decide`, sorry-free:

```lean
[25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,12,23,34,45,56,67,78,89,100,111].contains ((pmod a 10 121 + pmod b 10 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 10 — part 3 of 5. For every unit a in [49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72] and every unit b coprime to 121, the sum of their 10-th powers never lands on the 10-th power image [1,12,23,34,45,56,67,78,89,100,111] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_121_part3](/theorem/coprime_sum_blocked_reduced_10_mod_121_part3) — proven `by decide`, sorry-free:

```lean
[49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,12,23,34,45,56,67,78,89,100,111].contains ((pmod a 10 121 + pmod b 10 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 10 — part 4 of 5. For every unit a in [73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96] and every unit b coprime to 121, the sum of their 10-th powers never lands on the 10-th power image [1,12,23,34,45,56,67,78,89,100,111] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_121_part4](/theorem/coprime_sum_blocked_reduced_10_mod_121_part4) — proven `by decide`, sorry-free:

```lean
[73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,12,23,34,45,56,67,78,89,100,111].contains ((pmod a 10 121 + pmod b 10 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 10 — part 5 of 5. For every unit a in [97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120] and every unit b coprime to 121, the sum of their 10-th powers never lands on the 10-th power image [1,12,23,34,45,56,67,78,89,100,111] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_121_part5](/theorem/coprime_sum_blocked_reduced_10_mod_121_part5) — proven `by decide`, sorry-free:

```lean
[97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,12,23,34,45,56,67,78,89,100,111].contains ((pmod a 10 121 + pmod b 10 121) % 121))))
```

### THE IMAGE, PINNED, AT MODULUS 121 AND REDUCED EXPONENT 11. The 110 units raise to exactly the 10 value(s) [1,3,9,27,40,81,94,112,118,120] — every unit's 11-th power is in that list, and every entry of the list is some unit's 11-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_11_mod_121](/theorem/power_image_exact_reduced_11_mod_121) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun a => [1,3,9,27,40,81,94,112,118,120].contains (pmod a 11 121))) ∧ ([1,3,9,27,40,81,94,112,118,120].all (fun v => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].any (fun a => pmod a 11 121 == v)))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 11 — part 1 of 5. For every unit a in [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24] and every unit b coprime to 121, the sum of their 11-th powers never lands on the 11-th power image [1,3,9,27,40,81,94,112,118,120] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_121_part1](/theorem/coprime_sum_blocked_reduced_11_mod_121_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,3,9,27,40,81,94,112,118,120].contains ((pmod a 11 121 + pmod b 11 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 11 — part 2 of 5. For every unit a in [25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48] and every unit b coprime to 121, the sum of their 11-th powers never lands on the 11-th power image [1,3,9,27,40,81,94,112,118,120] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_121_part2](/theorem/coprime_sum_blocked_reduced_11_mod_121_part2) — proven `by decide`, sorry-free:

```lean
[25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,3,9,27,40,81,94,112,118,120].contains ((pmod a 11 121 + pmod b 11 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 11 — part 3 of 5. For every unit a in [49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72] and every unit b coprime to 121, the sum of their 11-th powers never lands on the 11-th power image [1,3,9,27,40,81,94,112,118,120] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_121_part3](/theorem/coprime_sum_blocked_reduced_11_mod_121_part3) — proven `by decide`, sorry-free:

```lean
[49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,3,9,27,40,81,94,112,118,120].contains ((pmod a 11 121 + pmod b 11 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 11 — part 4 of 5. For every unit a in [73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96] and every unit b coprime to 121, the sum of their 11-th powers never lands on the 11-th power image [1,3,9,27,40,81,94,112,118,120] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_121_part4](/theorem/coprime_sum_blocked_reduced_11_mod_121_part4) — proven `by decide`, sorry-free:

```lean
[73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,3,9,27,40,81,94,112,118,120].contains ((pmod a 11 121 + pmod b 11 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 11 — part 5 of 5. For every unit a in [97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120] and every unit b coprime to 121, the sum of their 11-th powers never lands on the 11-th power image [1,3,9,27,40,81,94,112,118,120] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_121_part5](/theorem/coprime_sum_blocked_reduced_11_mod_121_part5) — proven `by decide`, sorry-free:

```lean
[97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,3,9,27,40,81,94,112,118,120].contains ((pmod a 11 121 + pmod b 11 121) % 121))))
```

### THE IMAGE, PINNED, AT MODULUS 121 AND REDUCED EXPONENT 22. The 110 units raise to exactly the 5 value(s) [1,3,9,27,81] — every unit's 22-th power is in that list, and every entry of the list is some unit's 22-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_22_mod_121](/theorem/power_image_exact_reduced_22_mod_121) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun a => [1,3,9,27,81].contains (pmod a 22 121))) ∧ ([1,3,9,27,81].all (fun v => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].any (fun a => pmod a 22 121 == v)))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 22 — part 1 of 5. For every unit a in [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24] and every unit b coprime to 121, the sum of their 22-th powers never lands on the 22-th power image [1,3,9,27,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_121_part1](/theorem/coprime_sum_blocked_reduced_22_mod_121_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,3,9,27,81].contains ((pmod a 22 121 + pmod b 22 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 22 — part 2 of 5. For every unit a in [25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48] and every unit b coprime to 121, the sum of their 22-th powers never lands on the 22-th power image [1,3,9,27,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_121_part2](/theorem/coprime_sum_blocked_reduced_22_mod_121_part2) — proven `by decide`, sorry-free:

```lean
[25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,3,9,27,81].contains ((pmod a 22 121 + pmod b 22 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 22 — part 3 of 5. For every unit a in [49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72] and every unit b coprime to 121, the sum of their 22-th powers never lands on the 22-th power image [1,3,9,27,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_121_part3](/theorem/coprime_sum_blocked_reduced_22_mod_121_part3) — proven `by decide`, sorry-free:

```lean
[49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,3,9,27,81].contains ((pmod a 22 121 + pmod b 22 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 22 — part 4 of 5. For every unit a in [73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96] and every unit b coprime to 121, the sum of their 22-th powers never lands on the 22-th power image [1,3,9,27,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_121_part4](/theorem/coprime_sum_blocked_reduced_22_mod_121_part4) — proven `by decide`, sorry-free:

```lean
[73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,3,9,27,81].contains ((pmod a 22 121 + pmod b 22 121) % 121))))
```

### AN OBSTRUCTION AT MODULUS 121, REDUCED EXPONENT 22 — part 5 of 5. For every unit a in [97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120] and every unit b coprime to 121, the sum of their 22-th powers never lands on the 22-th power image [1,3,9,27,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 121, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 110. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(121) = 110 puts the full 110-by-110 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 121 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_121_part5](/theorem/coprime_sum_blocked_reduced_22_mod_121_part5) — proven `by decide`, sorry-free:

```lean
[97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun a => [1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,67,68,69,70,71,72,73,74,75,76,78,79,80,81,82,83,84,85,86,87,89,90,91,92,93,94,95,96,97,98,100,101,102,103,104,105,106,107,108,109,111,112,113,114,115,116,117,118,119,120].all (fun b => !([1,3,9,27,81].contains ((pmod a 22 121 + pmod b 22 121) % 121))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 14 OF 21 — moduli 16, 37, 58, 79, 100, 121, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_16](/theorem/unit_group_exponent_mod_16) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
