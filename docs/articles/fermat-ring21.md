---
title: "The congruence survey, ring 21"
description: "Computed from lean/FermatRing21.lean — 46 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 21

> THE CONGRUENCE SURVEY, RING 21 OF 21 — moduli 23, 44, 65, 86, 107, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_23](/theorem/unit_group_exponent_mod_23) and its 45 siblings below.

**46 theorems**, from [unit_group_exponent_mod_23](/theorem/unit_group_exponent_mod_23) onward, each proven `by decide` in <a href="/lean/FermatRing21.lean">lean/FermatRing21.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 28 of its 46 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_23](/theorem/unit_group_exponent_mod_23). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing21.lean)** — nothing to install. The editor fetches `lean/FermatRing21.lean` from the repository and re-decides all 46 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 23. The 22 residues coprime to 23 are all killed by the exponent 22 — a^22 = 1 for every unit a — and no proper divisor of 22 kills them all (all 3 of them checked). So 22 is the exponent of (Z/23)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 22), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_23](/theorem/unit_group_exponent_mod_23) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => pmod a 22 23 == 1)) ∧ ([1,2,11].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => pmod a k 23 == 1))))
```

### NO OBSTRUCTION AT MODULUS 23, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 23), with all three coprime to 23, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,5,7,9,13,15,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_23](/theorem/coprime_sum_open_reduced_1_mod_23) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 23 + pmod 1 1 23) % 23 = pmod 2 1 23
```

### NO OBSTRUCTION AT MODULUS 23, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 5^2 (mod 23), with all three coprime to 23, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_23](/theorem/coprime_sum_open_reduced_2_mod_23) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 23 + pmod 1 2 23) % 23 = pmod 5 2 23
```

### THE IMAGE, PINNED, AT MODULUS 23 AND REDUCED EXPONENT 11. The 22 units raise to exactly the 2 value(s) [1,22] — every unit's 11-th power is in that list, and every entry of the list is some unit's 11-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_11_mod_23](/theorem/power_image_exact_reduced_11_mod_23) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1,22].contains (pmod a 11 23))) ∧ ([1,22].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].any (fun a => pmod a 11 23 == v)))
```

### AN OBSTRUCTION AT MODULUS 23, REDUCED EXPONENT 11. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22] and every unit b coprime to 23, the sum of their 11-th powers never lands on the 11-th power image [1,22] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 23, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 22. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 23 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_23](/theorem/coprime_sum_blocked_reduced_11_mod_23) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun b => !([1,22].contains ((pmod a 11 23 + pmod b 11 23) % 23))))
```

### THE IMAGE, PINNED, AT MODULUS 23 AND REDUCED EXPONENT 22. The 22 units raise to exactly the 1 value(s) [1] — every unit's 22-th power is in that list, and every entry of the list is some unit's 22-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_22_mod_23](/theorem/power_image_exact_reduced_22_mod_23) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1].contains (pmod a 22 23))) ∧ ([1].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].any (fun a => pmod a 22 23 == v)))
```

### AN OBSTRUCTION AT MODULUS 23, REDUCED EXPONENT 22. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22] and every unit b coprime to 23, the sum of their 22-th powers never lands on the 22-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 23, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 22. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 23 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_23](/theorem/coprime_sum_blocked_reduced_22_mod_23) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun b => !([1].contains ((pmod a 22 23 + pmod b 22 23) % 23))))
```

### THE ORDER STRUCTURE AT MODULUS 44. The 20 residues coprime to 44 are all killed by the exponent 10 — a^10 = 1 for every unit a — and no proper divisor of 10 kills them all (all 3 of them checked). So 10 is the exponent of (Z/44)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 10), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_44](/theorem/unit_group_exponent_mod_44) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => pmod a 10 44 == 1)) ∧ ([1,2,5].all (fun k => !([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => pmod a k 44 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 44 AND REDUCED EXPONENT 1. The 20 units raise to exactly the 20 value(s) [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_44](/theorem/power_image_exact_reduced_1_mod_44) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].contains (pmod a 1 44))) ∧ ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].any (fun a => pmod a 1 44 == v)))
```

### AN OBSTRUCTION AT MODULUS 44, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] and every unit b coprime to 44, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 44, for EVERY exponent n reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked, and every larger n with the same gcd against 10. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 44 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_44](/theorem/coprime_sum_blocked_reduced_1_mod_44) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun b => !([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].contains ((pmod a 1 44 + pmod b 1 44) % 44))))
```

### THE IMAGE, PINNED, AT MODULUS 44 AND REDUCED EXPONENT 2. The 20 units raise to exactly the 5 value(s) [1,5,9,25,37] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_44](/theorem/power_image_exact_reduced_2_mod_44) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,5,9,25,37].contains (pmod a 2 44))) ∧ ([1,5,9,25,37].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].any (fun a => pmod a 2 44 == v)))
```

### AN OBSTRUCTION AT MODULUS 44, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] and every unit b coprime to 44, the sum of their 2-th powers never lands on the 2-th power image [1,5,9,25,37] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 44, for EVERY exponent n reducing to 2 — that is n in [4,6,8,12,14,16,18,22] of the range walked, and every larger n with the same gcd against 10. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 44 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_44](/theorem/coprime_sum_blocked_reduced_2_mod_44) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun b => !([1,5,9,25,37].contains ((pmod a 2 44 + pmod b 2 44) % 44))))
```

### THE IMAGE, PINNED, AT MODULUS 44 AND REDUCED EXPONENT 5. The 20 units raise to exactly the 4 value(s) [1,21,23,43] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_44](/theorem/power_image_exact_reduced_5_mod_44) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,21,23,43].contains (pmod a 5 44))) ∧ ([1,21,23,43].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].any (fun a => pmod a 5 44 == v)))
```

### AN OBSTRUCTION AT MODULUS 44, REDUCED EXPONENT 5. For every unit a in [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] and every unit b coprime to 44, the sum of their 5-th powers never lands on the 5-th power image [1,21,23,43] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 44, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 10. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 44 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_44](/theorem/coprime_sum_blocked_reduced_5_mod_44) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun b => !([1,21,23,43].contains ((pmod a 5 44 + pmod b 5 44) % 44))))
```

### THE IMAGE, PINNED, AT MODULUS 44 AND REDUCED EXPONENT 10. The 20 units raise to exactly the 1 value(s) [1] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_44](/theorem/power_image_exact_reduced_10_mod_44) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1].contains (pmod a 10 44))) ∧ ([1].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].any (fun a => pmod a 10 44 == v)))
```

### AN OBSTRUCTION AT MODULUS 44, REDUCED EXPONENT 10. For every unit a in [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] and every unit b coprime to 44, the sum of their 10-th powers never lands on the 10-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 44, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 10. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 44 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_44](/theorem/coprime_sum_blocked_reduced_10_mod_44) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun b => !([1].contains ((pmod a 10 44 + pmod b 10 44) % 44))))
```

### THE ORDER STRUCTURE AT MODULUS 65. The 48 residues coprime to 65 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/65)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_65](/theorem/unit_group_exponent_mod_65) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => pmod a 12 65 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => pmod a k 65 == 1))))
```

### NO OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 65), with all three coprime to 65, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_65](/theorem/coprime_sum_open_reduced_1_mod_65) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 65 + pmod 1 1 65) % 65 = pmod 2 1 65
```

### THE IMAGE, PINNED, AT MODULUS 65 AND REDUCED EXPONENT 2. The 48 units raise to exactly the 12 value(s) [1,4,9,14,16,29,36,49,51,56,61,64] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_65](/theorem/power_image_exact_reduced_2_mod_65) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,4,9,14,16,29,36,49,51,56,61,64].contains (pmod a 2 65))) ∧ ([1,4,9,14,16,29,36,49,51,56,61,64].all (fun v => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].any (fun a => pmod a 2 65 == v)))
```

### AN OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 2. For every unit a in [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64] and every unit b coprime to 65, the sum of their 2-th powers never lands on the 2-th power image [1,4,9,14,16,29,36,49,51,56,61,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 65, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 65 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_65](/theorem/coprime_sum_blocked_reduced_2_mod_65) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun b => !([1,4,9,14,16,29,36,49,51,56,61,64].contains ((pmod a 2 65 + pmod b 2 65) % 65))))
```

### THE IMAGE, PINNED, AT MODULUS 65 AND REDUCED EXPONENT 3. The 48 units raise to exactly the 16 value(s) [1,8,12,14,18,21,27,31,34,38,44,47,51,53,57,64] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_65](/theorem/power_image_exact_reduced_3_mod_65) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,8,12,14,18,21,27,31,34,38,44,47,51,53,57,64].contains (pmod a 3 65))) ∧ ([1,8,12,14,18,21,27,31,34,38,44,47,51,53,57,64].all (fun v => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].any (fun a => pmod a 3 65 == v)))
```

### AN OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 3. For every unit a in [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64] and every unit b coprime to 65, the sum of their 3-th powers never lands on the 3-th power image [1,8,12,14,18,21,27,31,34,38,44,47,51,53,57,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 65, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 65 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_65](/theorem/coprime_sum_blocked_reduced_3_mod_65) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun b => !([1,8,12,14,18,21,27,31,34,38,44,47,51,53,57,64].contains ((pmod a 3 65 + pmod b 3 65) % 65))))
```

### THE IMAGE, PINNED, AT MODULUS 65 AND REDUCED EXPONENT 4. The 48 units raise to exactly the 3 value(s) [1,16,61] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_65](/theorem/power_image_exact_reduced_4_mod_65) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,16,61].contains (pmod a 4 65))) ∧ ([1,16,61].all (fun v => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].any (fun a => pmod a 4 65 == v)))
```

### AN OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 4. For every unit a in [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64] and every unit b coprime to 65, the sum of their 4-th powers never lands on the 4-th power image [1,16,61] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 65, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 65 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_65](/theorem/coprime_sum_blocked_reduced_4_mod_65) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun b => !([1,16,61].contains ((pmod a 4 65 + pmod b 4 65) % 65))))
```

### THE IMAGE, PINNED, AT MODULUS 65 AND REDUCED EXPONENT 6. The 48 units raise to exactly the 4 value(s) [1,14,51,64] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_65](/theorem/power_image_exact_reduced_6_mod_65) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,14,51,64].contains (pmod a 6 65))) ∧ ([1,14,51,64].all (fun v => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].any (fun a => pmod a 6 65 == v)))
```

### AN OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 6. For every unit a in [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64] and every unit b coprime to 65, the sum of their 6-th powers never lands on the 6-th power image [1,14,51,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 65, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 65 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_65](/theorem/coprime_sum_blocked_reduced_6_mod_65) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun b => !([1,14,51,64].contains ((pmod a 6 65 + pmod b 6 65) % 65))))
```

### THE IMAGE, PINNED, AT MODULUS 65 AND REDUCED EXPONENT 12. The 48 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_65](/theorem/power_image_exact_reduced_12_mod_65) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1].contains (pmod a 12 65))) ∧ ([1].all (fun v => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].any (fun a => pmod a 12 65 == v)))
```

### AN OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 12. For every unit a in [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64] and every unit b coprime to 65, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 65, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 65 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_65](/theorem/coprime_sum_blocked_reduced_12_mod_65) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun b => !([1].contains ((pmod a 12 65 + pmod b 12 65) % 65))))
```

### THE ORDER STRUCTURE AT MODULUS 86. The 42 residues coprime to 86 are all killed by the exponent 42 — a^42 = 1 for every unit a — and no proper divisor of 42 kills them all (all 7 of them checked). So 42 is the exponent of (Z/86)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 42), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_86](/theorem/unit_group_exponent_mod_86) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => pmod a 42 86 == 1)) ∧ ([1,2,3,6,7,14,21].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => pmod a k 86 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 1. The 42 units raise to exactly the 42 value(s) [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_86](/theorem/power_image_exact_reduced_1_mod_86) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].contains (pmod a 1 86))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 1 86 == v)))
```

### AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85] and every unit b coprime to 86, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 86, for EVERY exponent n reducing to 1 — that is n in [5,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 86 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_86](/theorem/coprime_sum_blocked_reduced_1_mod_86) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].contains ((pmod a 1 86 + pmod b 1 86) % 86))))
```

### THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 2. The 42 units raise to exactly the 21 value(s) [1,9,11,13,15,17,21,23,25,31,35,41,47,49,53,57,59,67,79,81,83] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_86](/theorem/power_image_exact_reduced_2_mod_86) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,9,11,13,15,17,21,23,25,31,35,41,47,49,53,57,59,67,79,81,83].contains (pmod a 2 86))) ∧ ([1,9,11,13,15,17,21,23,25,31,35,41,47,49,53,57,59,67,79,81,83].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 2 86 == v)))
```

### AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85] and every unit b coprime to 86, the sum of their 2-th powers never lands on the 2-th power image [1,9,11,13,15,17,21,23,25,31,35,41,47,49,53,57,59,67,79,81,83] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 86, for EVERY exponent n reducing to 2 — that is n in [4,8,10,16,20,22] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 86 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_86](/theorem/coprime_sum_blocked_reduced_2_mod_86) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,9,11,13,15,17,21,23,25,31,35,41,47,49,53,57,59,67,79,81,83].contains ((pmod a 2 86 + pmod b 2 86) % 86))))
```

### THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 3. The 42 units raise to exactly the 14 value(s) [1,11,21,27,35,39,41,45,47,51,59,65,75,85] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_86](/theorem/power_image_exact_reduced_3_mod_86) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,11,21,27,35,39,41,45,47,51,59,65,75,85].contains (pmod a 3 86))) ∧ ([1,11,21,27,35,39,41,45,47,51,59,65,75,85].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 3 86 == v)))
```

### AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 3. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85] and every unit b coprime to 86, the sum of their 3-th powers never lands on the 3-th power image [1,11,21,27,35,39,41,45,47,51,59,65,75,85] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 86, for EVERY exponent n reducing to 3 — that is n in [3,9,15] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 86 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_86](/theorem/coprime_sum_blocked_reduced_3_mod_86) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,11,21,27,35,39,41,45,47,51,59,65,75,85].contains ((pmod a 3 86 + pmod b 3 86) % 86))))
```

### THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 6. The 42 units raise to exactly the 7 value(s) [1,11,21,35,41,47,59] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_86](/theorem/power_image_exact_reduced_6_mod_86) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,11,21,35,41,47,59].contains (pmod a 6 86))) ∧ ([1,11,21,35,41,47,59].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 6 86 == v)))
```

### AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 6. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85] and every unit b coprime to 86, the sum of their 6-th powers never lands on the 6-th power image [1,11,21,35,41,47,59] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 86, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 86 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_86](/theorem/coprime_sum_blocked_reduced_6_mod_86) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,11,21,35,41,47,59].contains ((pmod a 6 86 + pmod b 6 86) % 86))))
```

### THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 7. The 42 units raise to exactly the 6 value(s) [1,7,37,49,79,85] — every unit's 7-th power is in that list, and every entry of the list is some unit's 7-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_7_mod_86](/theorem/power_image_exact_reduced_7_mod_86) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,7,37,49,79,85].contains (pmod a 7 86))) ∧ ([1,7,37,49,79,85].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 7 86 == v)))
```

### AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 7. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85] and every unit b coprime to 86, the sum of their 7-th powers never lands on the 7-th power image [1,7,37,49,79,85] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 86, for EVERY exponent n reducing to 7 — that is n in [7] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 86 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_7_mod_86](/theorem/coprime_sum_blocked_reduced_7_mod_86) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,7,37,49,79,85].contains ((pmod a 7 86 + pmod b 7 86) % 86))))
```

### THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 14. The 42 units raise to exactly the 3 value(s) [1,49,79] — every unit's 14-th power is in that list, and every entry of the list is some unit's 14-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_14_mod_86](/theorem/power_image_exact_reduced_14_mod_86) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,49,79].contains (pmod a 14 86))) ∧ ([1,49,79].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 14 86 == v)))
```

### AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 14. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85] and every unit b coprime to 86, the sum of their 14-th powers never lands on the 14-th power image [1,49,79] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 86, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 86 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_14_mod_86](/theorem/coprime_sum_blocked_reduced_14_mod_86) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,49,79].contains ((pmod a 14 86 + pmod b 14 86) % 86))))
```

### THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 21. The 42 units raise to exactly the 2 value(s) [1,85] — every unit's 21-th power is in that list, and every entry of the list is some unit's 21-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_21_mod_86](/theorem/power_image_exact_reduced_21_mod_86) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,85].contains (pmod a 21 86))) ∧ ([1,85].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 21 86 == v)))
```

### AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 21. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85] and every unit b coprime to 86, the sum of their 21-th powers never lands on the 21-th power image [1,85] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 86, for EVERY exponent n reducing to 21 — that is n in [21] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 86 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_21_mod_86](/theorem/coprime_sum_blocked_reduced_21_mod_86) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,85].contains ((pmod a 21 86 + pmod b 21 86) % 86))))
```

### THE ORDER STRUCTURE AT MODULUS 107. The 106 residues coprime to 107 are all killed by the exponent 106 — a^106 = 1 for every unit a — and no proper divisor of 106 kills them all (all 3 of them checked). So 106 is the exponent of (Z/107)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 106), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_107](/theorem/unit_group_exponent_mod_107) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106].all (fun a => pmod a 106 107 == 1)) ∧ ([1,2,53].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106].all (fun a => pmod a k 107 == 1))))
```

### NO OBSTRUCTION AT MODULUS 107, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 107), with all three coprime to 107, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_107](/theorem/coprime_sum_open_reduced_1_mod_107) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 107 + pmod 1 1 107) % 107 = pmod 2 1 107
```

### NO OBSTRUCTION AT MODULUS 107, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 3^2 = 44^2 (mod 107), with all three coprime to 107, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_107](/theorem/coprime_sum_open_reduced_2_mod_107) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 107 + pmod 3 2 107) % 107 = pmod 44 2 107
```


::: warning 
THE CONGRUENCE SURVEY, RING 21 OF 21 — moduli 23, 44, 65, 86, 107, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_23](/theorem/unit_group_exponent_mod_23) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
