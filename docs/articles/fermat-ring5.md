---
title: "The congruence survey, ring 5"
description: "Computed from lean/FermatRing5.lean — 73 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 5

> THE CONGRUENCE SURVEY, RING 5 OF 21 — moduli 7, 28, 49, 70, 91, 112, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_7](/theorem/unit_group_exponent_mod_7) and its 72 siblings below.

**73 theorems**, from [unit_group_exponent_mod_7](/theorem/unit_group_exponent_mod_7) onward, each proven `by decide` in <a href="/lean/FermatRing5.lean">lean/FermatRing5.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 47 of its 73 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_7](/theorem/unit_group_exponent_mod_7). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing5.lean)** — nothing to install. The editor fetches `lean/FermatRing5.lean` from the repository and re-decides all 73 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 7. The 6 residues coprime to 7 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/7)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_7](/theorem/unit_group_exponent_mod_7) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6].all (fun a => pmod a 6 7 == 1)) ∧ ([1,2,3].all (fun k => !([1,2,3,4,5,6].all (fun a => pmod a k 7 == 1))))
```

### NO OBSTRUCTION AT MODULUS 7, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 7), with all three coprime to 7, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_7](/theorem/coprime_sum_open_reduced_1_mod_7) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 7 + pmod 1 1 7) % 7 = pmod 2 1 7
```

### NO OBSTRUCTION AT MODULUS 7, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 3^2 (mod 7), with all three coprime to 7, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_7](/theorem/coprime_sum_open_reduced_2_mod_7) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 7 + pmod 1 2 7) % 7 = pmod 3 2 7
```

### THE IMAGE, PINNED, AT MODULUS 7 AND REDUCED EXPONENT 3. The 6 units raise to exactly the 2 value(s) [1,6] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_7](/theorem/power_image_exact_reduced_3_mod_7) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6].all (fun a => [1,6].contains (pmod a 3 7))) ∧ ([1,6].all (fun v => [1,2,3,4,5,6].any (fun a => pmod a 3 7 == v)))
```

### AN OBSTRUCTION AT MODULUS 7, REDUCED EXPONENT 3. For every unit a in [1,2,3,4,5,6] and every unit b coprime to 7, the sum of their 3-th powers never lands on the 3-th power image [1,6] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 7, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 7 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_7](/theorem/coprime_sum_blocked_reduced_3_mod_7) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6].all (fun a => [1,2,3,4,5,6].all (fun b => !([1,6].contains ((pmod a 3 7 + pmod b 3 7) % 7))))
```

### THE IMAGE, PINNED, AT MODULUS 7 AND REDUCED EXPONENT 6. The 6 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_7](/theorem/power_image_exact_reduced_6_mod_7) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6].all (fun a => [1].contains (pmod a 6 7))) ∧ ([1].all (fun v => [1,2,3,4,5,6].any (fun a => pmod a 6 7 == v)))
```

### AN OBSTRUCTION AT MODULUS 7, REDUCED EXPONENT 6. For every unit a in [1,2,3,4,5,6] and every unit b coprime to 7, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 7, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 7 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_7](/theorem/coprime_sum_blocked_reduced_6_mod_7) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6].all (fun a => [1,2,3,4,5,6].all (fun b => !([1].contains ((pmod a 6 7 + pmod b 6 7) % 7))))
```

### THE ORDER STRUCTURE AT MODULUS 28. The 12 residues coprime to 28 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/28)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_28](/theorem/unit_group_exponent_mod_28) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27].all (fun a => pmod a 6 28 == 1)) ∧ ([1,2,3].all (fun k => !([1,3,5,9,11,13,15,17,19,23,25,27].all (fun a => pmod a k 28 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 28 AND REDUCED EXPONENT 1. The 12 units raise to exactly the 12 value(s) [1,3,5,9,11,13,15,17,19,23,25,27] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_28](/theorem/power_image_exact_reduced_1_mod_28) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27].contains (pmod a 1 28))) ∧ ([1,3,5,9,11,13,15,17,19,23,25,27].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27].any (fun a => pmod a 1 28 == v)))
```

### AN OBSTRUCTION AT MODULUS 28, REDUCED EXPONENT 1. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27] and every unit b coprime to 28, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,9,11,13,15,17,19,23,25,27] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 28, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 28 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_28](/theorem/coprime_sum_blocked_reduced_1_mod_28) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27].all (fun b => !([1,3,5,9,11,13,15,17,19,23,25,27].contains ((pmod a 1 28 + pmod b 1 28) % 28))))
```

### THE IMAGE, PINNED, AT MODULUS 28 AND REDUCED EXPONENT 2. The 12 units raise to exactly the 3 value(s) [1,9,25] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_28](/theorem/power_image_exact_reduced_2_mod_28) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27].all (fun a => [1,9,25].contains (pmod a 2 28))) ∧ ([1,9,25].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27].any (fun a => pmod a 2 28 == v)))
```

### AN OBSTRUCTION AT MODULUS 28, REDUCED EXPONENT 2. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27] and every unit b coprime to 28, the sum of their 2-th powers never lands on the 2-th power image [1,9,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 28, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 28 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_28](/theorem/coprime_sum_blocked_reduced_2_mod_28) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27].all (fun b => !([1,9,25].contains ((pmod a 2 28 + pmod b 2 28) % 28))))
```

### THE IMAGE, PINNED, AT MODULUS 28 AND REDUCED EXPONENT 3. The 12 units raise to exactly the 4 value(s) [1,13,15,27] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_28](/theorem/power_image_exact_reduced_3_mod_28) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27].all (fun a => [1,13,15,27].contains (pmod a 3 28))) ∧ ([1,13,15,27].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27].any (fun a => pmod a 3 28 == v)))
```

### AN OBSTRUCTION AT MODULUS 28, REDUCED EXPONENT 3. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27] and every unit b coprime to 28, the sum of their 3-th powers never lands on the 3-th power image [1,13,15,27] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 28, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 28 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_28](/theorem/coprime_sum_blocked_reduced_3_mod_28) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27].all (fun b => !([1,13,15,27].contains ((pmod a 3 28 + pmod b 3 28) % 28))))
```

### THE IMAGE, PINNED, AT MODULUS 28 AND REDUCED EXPONENT 6. The 12 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_28](/theorem/power_image_exact_reduced_6_mod_28) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27].all (fun a => [1].contains (pmod a 6 28))) ∧ ([1].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27].any (fun a => pmod a 6 28 == v)))
```

### AN OBSTRUCTION AT MODULUS 28, REDUCED EXPONENT 6. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27] and every unit b coprime to 28, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 28, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 28 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_28](/theorem/coprime_sum_blocked_reduced_6_mod_28) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27].all (fun b => !([1].contains ((pmod a 6 28 + pmod b 6 28) % 28))))
```

### THE ORDER STRUCTURE AT MODULUS 49. The 42 residues coprime to 49 are all killed by the exponent 42 — a^42 = 1 for every unit a — and no proper divisor of 42 kills them all (all 7 of them checked). So 42 is the exponent of (Z/49)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 42), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_49](/theorem/unit_group_exponent_mod_49) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun a => pmod a 42 49 == 1)) ∧ ([1,2,3,6,7,14,21].all (fun k => !([1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun a => pmod a k 49 == 1))))
```

### NO OBSTRUCTION AT MODULUS 49, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 49), with all three coprime to 49, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_49](/theorem/coprime_sum_open_reduced_1_mod_49) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 49 + pmod 1 1 49) % 49 = pmod 2 1 49
```

### NO OBSTRUCTION AT MODULUS 49, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 10^2 (mod 49), with all three coprime to 49, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [4,8,10,16,20,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_49](/theorem/coprime_sum_open_reduced_2_mod_49) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 49 + pmod 1 2 49) % 49 = pmod 10 2 49
```

### THE IMAGE, PINNED, AT MODULUS 49 AND REDUCED EXPONENT 3. The 42 units raise to exactly the 14 value(s) [1,6,8,13,15,20,22,27,29,34,36,41,43,48] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_49](/theorem/power_image_exact_reduced_3_mod_49) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun a => [1,6,8,13,15,20,22,27,29,34,36,41,43,48].contains (pmod a 3 49))) ∧ ([1,6,8,13,15,20,22,27,29,34,36,41,43,48].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].any (fun a => pmod a 3 49 == v)))
```

### AN OBSTRUCTION AT MODULUS 49, REDUCED EXPONENT 3. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48] and every unit b coprime to 49, the sum of their 3-th powers never lands on the 3-th power image [1,6,8,13,15,20,22,27,29,34,36,41,43,48] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 49, for EVERY exponent n reducing to 3 — that is n in [3,9,15] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 49 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_49](/theorem/coprime_sum_blocked_reduced_3_mod_49) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun b => !([1,6,8,13,15,20,22,27,29,34,36,41,43,48].contains ((pmod a 3 49 + pmod b 3 49) % 49))))
```

### THE IMAGE, PINNED, AT MODULUS 49 AND REDUCED EXPONENT 6. The 42 units raise to exactly the 7 value(s) [1,8,15,22,29,36,43] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_49](/theorem/power_image_exact_reduced_6_mod_49) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun a => [1,8,15,22,29,36,43].contains (pmod a 6 49))) ∧ ([1,8,15,22,29,36,43].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].any (fun a => pmod a 6 49 == v)))
```

### AN OBSTRUCTION AT MODULUS 49, REDUCED EXPONENT 6. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48] and every unit b coprime to 49, the sum of their 6-th powers never lands on the 6-th power image [1,8,15,22,29,36,43] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 49, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 49 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_49](/theorem/coprime_sum_blocked_reduced_6_mod_49) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun b => !([1,8,15,22,29,36,43].contains ((pmod a 6 49 + pmod b 6 49) % 49))))
```

### NO OBSTRUCTION AT MODULUS 49, REDUCED EXPONENT 7 — the control, and it fires. 1^7 + 2^7 = 3^7 (mod 49), with all three coprime to 49, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 7 — that is n in [7] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_7_mod_49](/theorem/coprime_sum_open_reduced_7_mod_49) — proven `by decide`, sorry-free:

```lean
(pmod 1 7 49 + pmod 2 7 49) % 49 = pmod 3 7 49
```

### THE IMAGE, PINNED, AT MODULUS 49 AND REDUCED EXPONENT 14. The 42 units raise to exactly the 3 value(s) [1,18,30] — every unit's 14-th power is in that list, and every entry of the list is some unit's 14-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_14_mod_49](/theorem/power_image_exact_reduced_14_mod_49) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun a => [1,18,30].contains (pmod a 14 49))) ∧ ([1,18,30].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].any (fun a => pmod a 14 49 == v)))
```

### AN OBSTRUCTION AT MODULUS 49, REDUCED EXPONENT 14. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48] and every unit b coprime to 49, the sum of their 14-th powers never lands on the 14-th power image [1,18,30] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 49, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 49 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_14_mod_49](/theorem/coprime_sum_blocked_reduced_14_mod_49) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun b => !([1,18,30].contains ((pmod a 14 49 + pmod b 14 49) % 49))))
```

### THE IMAGE, PINNED, AT MODULUS 49 AND REDUCED EXPONENT 21. The 42 units raise to exactly the 2 value(s) [1,48] — every unit's 21-th power is in that list, and every entry of the list is some unit's 21-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_21_mod_49](/theorem/power_image_exact_reduced_21_mod_49) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun a => [1,48].contains (pmod a 21 49))) ∧ ([1,48].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].any (fun a => pmod a 21 49 == v)))
```

### AN OBSTRUCTION AT MODULUS 49, REDUCED EXPONENT 21. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48] and every unit b coprime to 49, the sum of their 21-th powers never lands on the 21-th power image [1,48] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 49, for EVERY exponent n reducing to 21 — that is n in [21] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 49 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_21_mod_49](/theorem/coprime_sum_blocked_reduced_21_mod_49) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,13,15,16,17,18,19,20,22,23,24,25,26,27,29,30,31,32,33,34,36,37,38,39,40,41,43,44,45,46,47,48].all (fun b => !([1,48].contains ((pmod a 21 49 + pmod b 21 49) % 49))))
```

### THE ORDER STRUCTURE AT MODULUS 70. The 24 residues coprime to 70 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/70)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_70](/theorem/unit_group_exponent_mod_70) — proven `by decide`, sorry-free:

```lean
([1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => pmod a 12 70 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => pmod a k 70 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 70 AND REDUCED EXPONENT 1. The 24 units raise to exactly the 24 value(s) [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_70](/theorem/power_image_exact_reduced_1_mod_70) — proven `by decide`, sorry-free:

```lean
([1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].contains (pmod a 1 70))) ∧ ([1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun v => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].any (fun a => pmod a 1 70 == v)))
```

### AN OBSTRUCTION AT MODULUS 70, REDUCED EXPONENT 1. For every unit a in [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69] and every unit b coprime to 70, the sum of their 1-th powers never lands on the 1-th power image [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 70, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 70 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_70](/theorem/coprime_sum_blocked_reduced_1_mod_70) — proven `by decide`, sorry-free:

```lean
[1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun b => !([1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].contains ((pmod a 1 70 + pmod b 1 70) % 70))))
```

### THE IMAGE, PINNED, AT MODULUS 70 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 6 value(s) [1,9,11,29,39,51] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_70](/theorem/power_image_exact_reduced_2_mod_70) — proven `by decide`, sorry-free:

```lean
([1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,9,11,29,39,51].contains (pmod a 2 70))) ∧ ([1,9,11,29,39,51].all (fun v => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].any (fun a => pmod a 2 70 == v)))
```

### AN OBSTRUCTION AT MODULUS 70, REDUCED EXPONENT 2. For every unit a in [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69] and every unit b coprime to 70, the sum of their 2-th powers never lands on the 2-th power image [1,9,11,29,39,51] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 70, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 70 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_70](/theorem/coprime_sum_blocked_reduced_2_mod_70) — proven `by decide`, sorry-free:

```lean
[1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun b => !([1,9,11,29,39,51].contains ((pmod a 2 70 + pmod b 2 70) % 70))))
```

### THE IMAGE, PINNED, AT MODULUS 70 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s) [1,13,27,29,41,43,57,69] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_70](/theorem/power_image_exact_reduced_3_mod_70) — proven `by decide`, sorry-free:

```lean
([1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,13,27,29,41,43,57,69].contains (pmod a 3 70))) ∧ ([1,13,27,29,41,43,57,69].all (fun v => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].any (fun a => pmod a 3 70 == v)))
```

### AN OBSTRUCTION AT MODULUS 70, REDUCED EXPONENT 3. For every unit a in [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69] and every unit b coprime to 70, the sum of their 3-th powers never lands on the 3-th power image [1,13,27,29,41,43,57,69] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 70, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 70 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_70](/theorem/coprime_sum_blocked_reduced_3_mod_70) — proven `by decide`, sorry-free:

```lean
[1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun b => !([1,13,27,29,41,43,57,69].contains ((pmod a 3 70 + pmod b 3 70) % 70))))
```

### THE IMAGE, PINNED, AT MODULUS 70 AND REDUCED EXPONENT 4. The 24 units raise to exactly the 3 value(s) [1,11,51] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_70](/theorem/power_image_exact_reduced_4_mod_70) — proven `by decide`, sorry-free:

```lean
([1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,11,51].contains (pmod a 4 70))) ∧ ([1,11,51].all (fun v => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].any (fun a => pmod a 4 70 == v)))
```

### AN OBSTRUCTION AT MODULUS 70, REDUCED EXPONENT 4. For every unit a in [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69] and every unit b coprime to 70, the sum of their 4-th powers never lands on the 4-th power image [1,11,51] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 70, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 70 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_70](/theorem/coprime_sum_blocked_reduced_4_mod_70) — proven `by decide`, sorry-free:

```lean
[1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun b => !([1,11,51].contains ((pmod a 4 70 + pmod b 4 70) % 70))))
```

### THE IMAGE, PINNED, AT MODULUS 70 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 2 value(s) [1,29] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_70](/theorem/power_image_exact_reduced_6_mod_70) — proven `by decide`, sorry-free:

```lean
([1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,29].contains (pmod a 6 70))) ∧ ([1,29].all (fun v => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].any (fun a => pmod a 6 70 == v)))
```

### AN OBSTRUCTION AT MODULUS 70, REDUCED EXPONENT 6. For every unit a in [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69] and every unit b coprime to 70, the sum of their 6-th powers never lands on the 6-th power image [1,29] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 70, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 70 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_70](/theorem/coprime_sum_blocked_reduced_6_mod_70) — proven `by decide`, sorry-free:

```lean
[1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun b => !([1,29].contains ((pmod a 6 70 + pmod b 6 70) % 70))))
```

### THE IMAGE, PINNED, AT MODULUS 70 AND REDUCED EXPONENT 12. The 24 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_70](/theorem/power_image_exact_reduced_12_mod_70) — proven `by decide`, sorry-free:

```lean
([1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1].contains (pmod a 12 70))) ∧ ([1].all (fun v => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].any (fun a => pmod a 12 70 == v)))
```

### AN OBSTRUCTION AT MODULUS 70, REDUCED EXPONENT 12. For every unit a in [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69] and every unit b coprime to 70, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 70, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 70 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_70](/theorem/coprime_sum_blocked_reduced_12_mod_70) — proven `by decide`, sorry-free:

```lean
[1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun a => [1,3,9,11,13,17,19,23,27,29,31,33,37,39,41,43,47,51,53,57,59,61,67,69].all (fun b => !([1].contains ((pmod a 12 70 + pmod b 12 70) % 70))))
```

### THE ORDER STRUCTURE AT MODULUS 91. The 72 residues coprime to 91 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/91)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_91](/theorem/unit_group_exponent_mod_91) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun a => pmod a 12 91 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun a => pmod a k 91 == 1))))
```

### NO OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 91), with all three coprime to 91, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_91](/theorem/coprime_sum_open_reduced_1_mod_91) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 91 + pmod 1 1 91) % 91 = pmod 2 1 91
```

### NO OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 22^2 = 11^2 (mod 91), with all three coprime to 91, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [10,14,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_91](/theorem/coprime_sum_open_reduced_2_mod_91) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 91 + pmod 22 2 91) % 91 = pmod 11 2 91
```

### THE IMAGE, PINNED, AT MODULUS 91 AND REDUCED EXPONENT 3. The 72 units raise to exactly the 8 value(s) [1,8,27,34,57,64,83,90] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_91](/theorem/power_image_exact_reduced_3_mod_91) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun a => [1,8,27,34,57,64,83,90].contains (pmod a 3 91))) ∧ ([1,8,27,34,57,64,83,90].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].any (fun a => pmod a 3 91 == v)))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 3 — part 1 of 3. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43] and every unit b coprime to 91, the sum of their 3-th powers never lands on the 3-th power image [1,8,27,34,57,64,83,90] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_91_part1](/theorem/coprime_sum_blocked_reduced_3_mod_91_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1,8,27,34,57,64,83,90].contains ((pmod a 3 91 + pmod b 3 91) % 91))))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 3 — part 2 of 3. For every unit a in [44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86] and every unit b coprime to 91, the sum of their 3-th powers never lands on the 3-th power image [1,8,27,34,57,64,83,90] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_91_part2](/theorem/coprime_sum_blocked_reduced_3_mod_91_part2) — proven `by decide`, sorry-free:

```lean
[44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1,8,27,34,57,64,83,90].contains ((pmod a 3 91 + pmod b 3 91) % 91))))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 3 — part 3 of 3. For every unit a in [87,88,89,90] and every unit b coprime to 91, the sum of their 3-th powers never lands on the 3-th power image [1,8,27,34,57,64,83,90] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_91_part3](/theorem/coprime_sum_blocked_reduced_3_mod_91_part3) — proven `by decide`, sorry-free:

```lean
[87,88,89,90].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1,8,27,34,57,64,83,90].contains ((pmod a 3 91 + pmod b 3 91) % 91))))
```

### THE IMAGE, PINNED, AT MODULUS 91 AND REDUCED EXPONENT 4. The 72 units raise to exactly the 9 value(s) [1,9,16,22,29,53,74,79,81] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_91](/theorem/power_image_exact_reduced_4_mod_91) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun a => [1,9,16,22,29,53,74,79,81].contains (pmod a 4 91))) ∧ ([1,9,16,22,29,53,74,79,81].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].any (fun a => pmod a 4 91 == v)))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 4 — part 1 of 3. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43] and every unit b coprime to 91, the sum of their 4-th powers never lands on the 4-th power image [1,9,16,22,29,53,74,79,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_91_part1](/theorem/coprime_sum_blocked_reduced_4_mod_91_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1,9,16,22,29,53,74,79,81].contains ((pmod a 4 91 + pmod b 4 91) % 91))))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 4 — part 2 of 3. For every unit a in [44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86] and every unit b coprime to 91, the sum of their 4-th powers never lands on the 4-th power image [1,9,16,22,29,53,74,79,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_91_part2](/theorem/coprime_sum_blocked_reduced_4_mod_91_part2) — proven `by decide`, sorry-free:

```lean
[44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1,9,16,22,29,53,74,79,81].contains ((pmod a 4 91 + pmod b 4 91) % 91))))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 4 — part 3 of 3. For every unit a in [87,88,89,90] and every unit b coprime to 91, the sum of their 4-th powers never lands on the 4-th power image [1,9,16,22,29,53,74,79,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_91_part3](/theorem/coprime_sum_blocked_reduced_4_mod_91_part3) — proven `by decide`, sorry-free:

```lean
[87,88,89,90].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1,9,16,22,29,53,74,79,81].contains ((pmod a 4 91 + pmod b 4 91) % 91))))
```

### THE IMAGE, PINNED, AT MODULUS 91 AND REDUCED EXPONENT 6. The 72 units raise to exactly the 2 value(s) [1,64] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_91](/theorem/power_image_exact_reduced_6_mod_91) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun a => [1,64].contains (pmod a 6 91))) ∧ ([1,64].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].any (fun a => pmod a 6 91 == v)))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 6 — part 1 of 3. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43] and every unit b coprime to 91, the sum of their 6-th powers never lands on the 6-th power image [1,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_91_part1](/theorem/coprime_sum_blocked_reduced_6_mod_91_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1,64].contains ((pmod a 6 91 + pmod b 6 91) % 91))))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 6 — part 2 of 3. For every unit a in [44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86] and every unit b coprime to 91, the sum of their 6-th powers never lands on the 6-th power image [1,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_91_part2](/theorem/coprime_sum_blocked_reduced_6_mod_91_part2) — proven `by decide`, sorry-free:

```lean
[44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1,64].contains ((pmod a 6 91 + pmod b 6 91) % 91))))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 6 — part 3 of 3. For every unit a in [87,88,89,90] and every unit b coprime to 91, the sum of their 6-th powers never lands on the 6-th power image [1,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_91_part3](/theorem/coprime_sum_blocked_reduced_6_mod_91_part3) — proven `by decide`, sorry-free:

```lean
[87,88,89,90].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1,64].contains ((pmod a 6 91 + pmod b 6 91) % 91))))
```

### THE IMAGE, PINNED, AT MODULUS 91 AND REDUCED EXPONENT 12. The 72 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_91](/theorem/power_image_exact_reduced_12_mod_91) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun a => [1].contains (pmod a 12 91))) ∧ ([1].all (fun v => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].any (fun a => pmod a 12 91 == v)))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 12 — part 1 of 3. For every unit a in [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43] and every unit b coprime to 91, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_91_part1](/theorem/coprime_sum_blocked_reduced_12_mod_91_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1].contains ((pmod a 12 91 + pmod b 12 91) % 91))))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 12 — part 2 of 3. For every unit a in [44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86] and every unit b coprime to 91, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_91_part2](/theorem/coprime_sum_blocked_reduced_12_mod_91_part2) — proven `by decide`, sorry-free:

```lean
[44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1].contains ((pmod a 12 91 + pmod b 12 91) % 91))))
```

### AN OBSTRUCTION AT MODULUS 91, REDUCED EXPONENT 12 — part 3 of 3. For every unit a in [87,88,89,90] and every unit b coprime to 91, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 91, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(91) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 91 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_91_part3](/theorem/coprime_sum_blocked_reduced_12_mod_91_part3) — proven `by decide`, sorry-free:

```lean
[87,88,89,90].all (fun a => [1,2,3,4,5,6,8,9,10,11,12,15,16,17,18,19,20,22,23,24,25,27,29,30,31,32,33,34,36,37,38,40,41,43,44,45,46,47,48,50,51,53,54,55,57,58,59,60,61,62,64,66,67,68,69,71,72,73,74,75,76,79,80,81,82,83,85,86,87,88,89,90].all (fun b => !([1].contains ((pmod a 12 91 + pmod b 12 91) % 91))))
```

### THE ORDER STRUCTURE AT MODULUS 112. The 48 residues coprime to 112 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/112)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_112](/theorem/unit_group_exponent_mod_112) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => pmod a 12 112 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => pmod a k 112 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 112 AND REDUCED EXPONENT 1. The 48 units raise to exactly the 48 value(s) [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_112](/theorem/power_image_exact_reduced_1_mod_112) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].contains (pmod a 1 112))) ∧ ([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].any (fun a => pmod a 1 112 == v)))
```

### AN OBSTRUCTION AT MODULUS 112, REDUCED EXPONENT 1. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111] and every unit b coprime to 112, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 112, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 112 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_112](/theorem/coprime_sum_blocked_reduced_1_mod_112) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun b => !([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].contains ((pmod a 1 112 + pmod b 1 112) % 112))))
```

### THE IMAGE, PINNED, AT MODULUS 112 AND REDUCED EXPONENT 2. The 48 units raise to exactly the 6 value(s) [1,9,25,57,65,81] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_112](/theorem/power_image_exact_reduced_2_mod_112) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,9,25,57,65,81].contains (pmod a 2 112))) ∧ ([1,9,25,57,65,81].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].any (fun a => pmod a 2 112 == v)))
```

### AN OBSTRUCTION AT MODULUS 112, REDUCED EXPONENT 2. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111] and every unit b coprime to 112, the sum of their 2-th powers never lands on the 2-th power image [1,9,25,57,65,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 112, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 112 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_112](/theorem/coprime_sum_blocked_reduced_2_mod_112) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun b => !([1,9,25,57,65,81].contains ((pmod a 2 112 + pmod b 2 112) % 112))))
```

### THE IMAGE, PINNED, AT MODULUS 112 AND REDUCED EXPONENT 3. The 48 units raise to exactly the 16 value(s) [1,13,15,27,29,41,43,55,57,69,71,83,85,97,99,111] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_112](/theorem/power_image_exact_reduced_3_mod_112) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,13,15,27,29,41,43,55,57,69,71,83,85,97,99,111].contains (pmod a 3 112))) ∧ ([1,13,15,27,29,41,43,55,57,69,71,83,85,97,99,111].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].any (fun a => pmod a 3 112 == v)))
```

### AN OBSTRUCTION AT MODULUS 112, REDUCED EXPONENT 3. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111] and every unit b coprime to 112, the sum of their 3-th powers never lands on the 3-th power image [1,13,15,27,29,41,43,55,57,69,71,83,85,97,99,111] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 112, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 112 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_112](/theorem/coprime_sum_blocked_reduced_3_mod_112) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun b => !([1,13,15,27,29,41,43,55,57,69,71,83,85,97,99,111].contains ((pmod a 3 112 + pmod b 3 112) % 112))))
```

### THE IMAGE, PINNED, AT MODULUS 112 AND REDUCED EXPONENT 4. The 48 units raise to exactly the 3 value(s) [1,65,81] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_112](/theorem/power_image_exact_reduced_4_mod_112) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,65,81].contains (pmod a 4 112))) ∧ ([1,65,81].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].any (fun a => pmod a 4 112 == v)))
```

### AN OBSTRUCTION AT MODULUS 112, REDUCED EXPONENT 4. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111] and every unit b coprime to 112, the sum of their 4-th powers never lands on the 4-th power image [1,65,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 112, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 112 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_112](/theorem/coprime_sum_blocked_reduced_4_mod_112) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun b => !([1,65,81].contains ((pmod a 4 112 + pmod b 4 112) % 112))))
```

### THE IMAGE, PINNED, AT MODULUS 112 AND REDUCED EXPONENT 6. The 48 units raise to exactly the 2 value(s) [1,57] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_112](/theorem/power_image_exact_reduced_6_mod_112) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,57].contains (pmod a 6 112))) ∧ ([1,57].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].any (fun a => pmod a 6 112 == v)))
```

### AN OBSTRUCTION AT MODULUS 112, REDUCED EXPONENT 6. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111] and every unit b coprime to 112, the sum of their 6-th powers never lands on the 6-th power image [1,57] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 112, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 112 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_112](/theorem/coprime_sum_blocked_reduced_6_mod_112) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun b => !([1,57].contains ((pmod a 6 112 + pmod b 6 112) % 112))))
```

### THE IMAGE, PINNED, AT MODULUS 112 AND REDUCED EXPONENT 12. The 48 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_112](/theorem/power_image_exact_reduced_12_mod_112) — proven `by decide`, sorry-free:

```lean
([1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1].contains (pmod a 12 112))) ∧ ([1].all (fun v => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].any (fun a => pmod a 12 112 == v)))
```

### AN OBSTRUCTION AT MODULUS 112, REDUCED EXPONENT 12. For every unit a in [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111] and every unit b coprime to 112, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 112, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 112 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_112](/theorem/coprime_sum_blocked_reduced_12_mod_112) — proven `by decide`, sorry-free:

```lean
[1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun a => [1,3,5,9,11,13,15,17,19,23,25,27,29,31,33,37,39,41,43,45,47,51,53,55,57,59,61,65,67,69,71,73,75,79,81,83,85,87,89,93,95,97,99,101,103,107,109,111].all (fun b => !([1].contains ((pmod a 12 112 + pmod b 12 112) % 112))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 5 OF 21 — moduli 7, 28, 49, 70, 91, 112, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_7](/theorem/unit_group_exponent_mod_7) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
