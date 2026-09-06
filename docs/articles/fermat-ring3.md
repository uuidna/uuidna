---
title: "The congruence survey, ring 3"
description: "Computed from lean/FermatRing3.lean — 63 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 3

> THE CONGRUENCE SURVEY, RING 3 OF 21 — moduli 5, 26, 47, 68, 89, 110, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_5](/theorem/unit_group_exponent_mod_5) and its 62 siblings below.

**63 theorems**, from [unit_group_exponent_mod_5](/theorem/unit_group_exponent_mod_5) onward, each proven `by decide` in <a href="/lean/FermatRing3.lean">lean/FermatRing3.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 41 of its 63 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_5](/theorem/unit_group_exponent_mod_5). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing3.lean)** — nothing to install. The editor fetches `lean/FermatRing3.lean` from the repository and re-decides all 63 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 5. The 4 residues coprime to 5 are all killed by the exponent 4 — a^4 = 1 for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent of (Z/5)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_5](/theorem/unit_group_exponent_mod_5) — proven `by decide`, sorry-free:

```lean
([1,2,3,4].all (fun a => pmod a 4 5 == 1)) ∧ ([1,2].all (fun k => !([1,2,3,4].all (fun a => pmod a k 5 == 1))))
```

### NO OBSTRUCTION AT MODULUS 5, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 5), with all three coprime to 5, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_5](/theorem/coprime_sum_open_reduced_1_mod_5) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 5 + pmod 1 1 5) % 5 = pmod 2 1 5
```

### THE IMAGE, PINNED, AT MODULUS 5 AND REDUCED EXPONENT 2. The 4 units raise to exactly the 2 value(s) [1,4] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_5](/theorem/power_image_exact_reduced_2_mod_5) — proven `by decide`, sorry-free:

```lean
([1,2,3,4].all (fun a => [1,4].contains (pmod a 2 5))) ∧ ([1,4].all (fun v => [1,2,3,4].any (fun a => pmod a 2 5 == v)))
```

### AN OBSTRUCTION AT MODULUS 5, REDUCED EXPONENT 2. For every unit a in [1,2,3,4] and every unit b coprime to 5, the sum of their 2-th powers never lands on the 2-th power image [1,4] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 5, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 5 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_5](/theorem/coprime_sum_blocked_reduced_2_mod_5) — proven `by decide`, sorry-free:

```lean
[1,2,3,4].all (fun a => [1,2,3,4].all (fun b => !([1,4].contains ((pmod a 2 5 + pmod b 2 5) % 5))))
```

### THE IMAGE, PINNED, AT MODULUS 5 AND REDUCED EXPONENT 4. The 4 units raise to exactly the 1 value(s) [1] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_5](/theorem/power_image_exact_reduced_4_mod_5) — proven `by decide`, sorry-free:

```lean
([1,2,3,4].all (fun a => [1].contains (pmod a 4 5))) ∧ ([1].all (fun v => [1,2,3,4].any (fun a => pmod a 4 5 == v)))
```

### AN OBSTRUCTION AT MODULUS 5, REDUCED EXPONENT 4. For every unit a in [1,2,3,4] and every unit b coprime to 5, the sum of their 4-th powers never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 5, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 5 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_5](/theorem/coprime_sum_blocked_reduced_4_mod_5) — proven `by decide`, sorry-free:

```lean
[1,2,3,4].all (fun a => [1,2,3,4].all (fun b => !([1].contains ((pmod a 4 5 + pmod b 4 5) % 5))))
```

### THE ORDER STRUCTURE AT MODULUS 26. The 12 residues coprime to 26 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/26)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_26](/theorem/unit_group_exponent_mod_26) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => pmod a 12 26 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => pmod a k 26 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 26 AND REDUCED EXPONENT 1. The 12 units raise to exactly the 12 value(s) [1,3,5,7,9,11,15,17,19,21,23,25] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_26](/theorem/power_image_exact_reduced_1_mod_26) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25].contains (pmod a 1 26))) ∧ ([1,3,5,7,9,11,15,17,19,21,23,25].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25].any (fun a => pmod a 1 26 == v)))
```

### AN OBSTRUCTION AT MODULUS 26, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25] and every unit b coprime to 26, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,15,17,19,21,23,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 26, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 26 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_26](/theorem/coprime_sum_blocked_reduced_1_mod_26) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25].all (fun b => !([1,3,5,7,9,11,15,17,19,21,23,25].contains ((pmod a 1 26 + pmod b 1 26) % 26))))
```

### THE IMAGE, PINNED, AT MODULUS 26 AND REDUCED EXPONENT 2. The 12 units raise to exactly the 6 value(s) [1,3,9,17,23,25] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_26](/theorem/power_image_exact_reduced_2_mod_26) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,3,9,17,23,25].contains (pmod a 2 26))) ∧ ([1,3,9,17,23,25].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25].any (fun a => pmod a 2 26 == v)))
```

### AN OBSTRUCTION AT MODULUS 26, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25] and every unit b coprime to 26, the sum of their 2-th powers never lands on the 2-th power image [1,3,9,17,23,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 26, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 26 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_26](/theorem/coprime_sum_blocked_reduced_2_mod_26) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25].all (fun b => !([1,3,9,17,23,25].contains ((pmod a 2 26 + pmod b 2 26) % 26))))
```

### THE IMAGE, PINNED, AT MODULUS 26 AND REDUCED EXPONENT 3. The 12 units raise to exactly the 4 value(s) [1,5,21,25] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_26](/theorem/power_image_exact_reduced_3_mod_26) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,5,21,25].contains (pmod a 3 26))) ∧ ([1,5,21,25].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25].any (fun a => pmod a 3 26 == v)))
```

### AN OBSTRUCTION AT MODULUS 26, REDUCED EXPONENT 3. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25] and every unit b coprime to 26, the sum of their 3-th powers never lands on the 3-th power image [1,5,21,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 26, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 26 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_26](/theorem/coprime_sum_blocked_reduced_3_mod_26) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25].all (fun b => !([1,5,21,25].contains ((pmod a 3 26 + pmod b 3 26) % 26))))
```

### THE IMAGE, PINNED, AT MODULUS 26 AND REDUCED EXPONENT 4. The 12 units raise to exactly the 3 value(s) [1,3,9] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_26](/theorem/power_image_exact_reduced_4_mod_26) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,3,9].contains (pmod a 4 26))) ∧ ([1,3,9].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25].any (fun a => pmod a 4 26 == v)))
```

### AN OBSTRUCTION AT MODULUS 26, REDUCED EXPONENT 4. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25] and every unit b coprime to 26, the sum of their 4-th powers never lands on the 4-th power image [1,3,9] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 26, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 26 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_26](/theorem/coprime_sum_blocked_reduced_4_mod_26) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25].all (fun b => !([1,3,9].contains ((pmod a 4 26 + pmod b 4 26) % 26))))
```

### THE IMAGE, PINNED, AT MODULUS 26 AND REDUCED EXPONENT 6. The 12 units raise to exactly the 2 value(s) [1,25] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_26](/theorem/power_image_exact_reduced_6_mod_26) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,25].contains (pmod a 6 26))) ∧ ([1,25].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25].any (fun a => pmod a 6 26 == v)))
```

### AN OBSTRUCTION AT MODULUS 26, REDUCED EXPONENT 6. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25] and every unit b coprime to 26, the sum of their 6-th powers never lands on the 6-th power image [1,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 26, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 26 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_26](/theorem/coprime_sum_blocked_reduced_6_mod_26) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25].all (fun b => !([1,25].contains ((pmod a 6 26 + pmod b 6 26) % 26))))
```

### THE IMAGE, PINNED, AT MODULUS 26 AND REDUCED EXPONENT 12. The 12 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_26](/theorem/power_image_exact_reduced_12_mod_26) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1].contains (pmod a 12 26))) ∧ ([1].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25].any (fun a => pmod a 12 26 == v)))
```

### AN OBSTRUCTION AT MODULUS 26, REDUCED EXPONENT 12. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25] and every unit b coprime to 26, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 26, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 26 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_26](/theorem/coprime_sum_blocked_reduced_12_mod_26) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25].all (fun b => !([1].contains ((pmod a 12 26 + pmod b 12 26) % 26))))
```

### THE ORDER STRUCTURE AT MODULUS 47. The 46 residues coprime to 47 are all killed by the exponent 46 — a^46 = 1 for every unit a — and no proper divisor of 46 kills them all (all 3 of them checked). So 46 is the exponent of (Z/47)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 46), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_47](/theorem/unit_group_exponent_mod_47) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46].all (fun a => pmod a 46 47 == 1)) ∧ ([1,2,23].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46].all (fun a => pmod a k 47 == 1))))
```

### NO OBSTRUCTION AT MODULUS 47, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 47), with all three coprime to 47, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_47](/theorem/coprime_sum_open_reduced_1_mod_47) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 47 + pmod 1 1 47) % 47 = pmod 2 1 47
```

### NO OBSTRUCTION AT MODULUS 47, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 7^2 (mod 47), with all three coprime to 47, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_47](/theorem/coprime_sum_open_reduced_2_mod_47) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 47 + pmod 1 2 47) % 47 = pmod 7 2 47
```

### THE IMAGE, PINNED, AT MODULUS 47 AND REDUCED EXPONENT 23. The 46 units raise to exactly the 2 value(s) [1,46] — every unit's 23-th power is in that list, and every entry of the list is some unit's 23-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_23_mod_47](/theorem/power_image_exact_reduced_23_mod_47) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46].all (fun a => [1,46].contains (pmod a 23 47))) ∧ ([1,46].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46].any (fun a => pmod a 23 47 == v)))
```

### AN OBSTRUCTION AT MODULUS 47, REDUCED EXPONENT 23. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46] and every unit b coprime to 47, the sum of their 23-th powers never lands on the 23-th power image [1,46] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 47, for EVERY exponent n reducing to 23 — that is n in [23] of the range walked, and every larger n with the same gcd against 46. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 47 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_23_mod_47](/theorem/coprime_sum_blocked_reduced_23_mod_47) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46].all (fun b => !([1,46].contains ((pmod a 23 47 + pmod b 23 47) % 47))))
```

### THE ORDER STRUCTURE AT MODULUS 68. The 32 residues coprime to 68 are all killed by the exponent 16 — a^16 = 1 for every unit a — and no proper divisor of 16 kills them all (all 4 of them checked). So 16 is the exponent of (Z/68)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 16), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_68](/theorem/unit_group_exponent_mod_68) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => pmod a 16 68 == 1)) ∧ ([1,2,4,8].all (fun k => !([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => pmod a k 68 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 68 AND REDUCED EXPONENT 1. The 32 units raise to exactly the 32 value(s) [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_68](/theorem/power_image_exact_reduced_1_mod_68) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].contains (pmod a 1 68))) ∧ ([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun v => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].any (fun a => pmod a 1 68 == v)))
```

### AN OBSTRUCTION AT MODULUS 68, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67] and every unit b coprime to 68, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 68, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 68 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_68](/theorem/coprime_sum_blocked_reduced_1_mod_68) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun b => !([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].contains ((pmod a 1 68 + pmod b 1 68) % 68))))
```

### THE IMAGE, PINNED, AT MODULUS 68 AND REDUCED EXPONENT 2. The 32 units raise to exactly the 8 value(s) [1,9,13,21,25,33,49,53] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_68](/theorem/power_image_exact_reduced_2_mod_68) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => [1,9,13,21,25,33,49,53].contains (pmod a 2 68))) ∧ ([1,9,13,21,25,33,49,53].all (fun v => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].any (fun a => pmod a 2 68 == v)))
```

### AN OBSTRUCTION AT MODULUS 68, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67] and every unit b coprime to 68, the sum of their 2-th powers never lands on the 2-th power image [1,9,13,21,25,33,49,53] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 68, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 68 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_68](/theorem/coprime_sum_blocked_reduced_2_mod_68) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun b => !([1,9,13,21,25,33,49,53].contains ((pmod a 2 68 + pmod b 2 68) % 68))))
```

### THE IMAGE, PINNED, AT MODULUS 68 AND REDUCED EXPONENT 4. The 32 units raise to exactly the 4 value(s) [1,13,21,33] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_68](/theorem/power_image_exact_reduced_4_mod_68) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => [1,13,21,33].contains (pmod a 4 68))) ∧ ([1,13,21,33].all (fun v => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].any (fun a => pmod a 4 68 == v)))
```

### AN OBSTRUCTION AT MODULUS 68, REDUCED EXPONENT 4. For every unit a in [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67] and every unit b coprime to 68, the sum of their 4-th powers never lands on the 4-th power image [1,13,21,33] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 68, for EVERY exponent n reducing to 4 — that is n in [4,12,20] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 68 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_68](/theorem/coprime_sum_blocked_reduced_4_mod_68) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun b => !([1,13,21,33].contains ((pmod a 4 68 + pmod b 4 68) % 68))))
```

### THE IMAGE, PINNED, AT MODULUS 68 AND REDUCED EXPONENT 8. The 32 units raise to exactly the 2 value(s) [1,33] — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_8_mod_68](/theorem/power_image_exact_reduced_8_mod_68) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => [1,33].contains (pmod a 8 68))) ∧ ([1,33].all (fun v => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].any (fun a => pmod a 8 68 == v)))
```

### AN OBSTRUCTION AT MODULUS 68, REDUCED EXPONENT 8. For every unit a in [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67] and every unit b coprime to 68, the sum of their 8-th powers never lands on the 8-th power image [1,33] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 68, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 68 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_68](/theorem/coprime_sum_blocked_reduced_8_mod_68) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun b => !([1,33].contains ((pmod a 8 68 + pmod b 8 68) % 68))))
```

### THE IMAGE, PINNED, AT MODULUS 68 AND REDUCED EXPONENT 16. The 32 units raise to exactly the 1 value(s) [1] — every unit's 16-th power is in that list, and every entry of the list is some unit's 16-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_16_mod_68](/theorem/power_image_exact_reduced_16_mod_68) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => [1].contains (pmod a 16 68))) ∧ ([1].all (fun v => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].any (fun a => pmod a 16 68 == v)))
```

### AN OBSTRUCTION AT MODULUS 68, REDUCED EXPONENT 16. For every unit a in [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67] and every unit b coprime to 68, the sum of their 16-th powers never lands on the 16-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 68, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 68 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_16_mod_68](/theorem/coprime_sum_blocked_reduced_16_mod_68) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun a => [1,3,5,7,9,11,13,15,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,53,55,57,59,61,63,65,67].all (fun b => !([1].contains ((pmod a 16 68 + pmod b 16 68) % 68))))
```

### THE ORDER STRUCTURE AT MODULUS 89. The 88 residues coprime to 89 are all killed by the exponent 88 — a^88 = 1 for every unit a — and no proper divisor of 88 kills them all (all 7 of them checked). So 88 is the exponent of (Z/89)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 88), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_89](/theorem/unit_group_exponent_mod_89) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun a => pmod a 88 89 == 1)) ∧ ([1,2,4,8,11,22,44].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun a => pmod a k 89 == 1))))
```

### NO OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 89), with all three coprime to 89, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,5,7,9,13,15,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_89](/theorem/coprime_sum_open_reduced_1_mod_89) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 89 + pmod 1 1 89) % 89 = pmod 2 1 89
```

### NO OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 25^2 (mod 89), with all three coprime to 89, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [6,10,14,18] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_89](/theorem/coprime_sum_open_reduced_2_mod_89) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 89 + pmod 1 2 89) % 89 = pmod 25 2 89
```

### NO OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 4 — the control, and it fires. 1^4 + 1^4 = 5^4 (mod 89), with all three coprime to 89, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 4 — that is n in [4,12,20] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_4_mod_89](/theorem/coprime_sum_open_reduced_4_mod_89) — proven `by decide`, sorry-free:

```lean
(pmod 1 4 89 + pmod 1 4 89) % 89 = pmod 5 4 89
```

### NO OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 8 — the control, and it fires. 1^8 + 1^8 = 9^8 (mod 89), with all three coprime to 89, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 8 — that is n in [8,16] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_8_mod_89](/theorem/coprime_sum_open_reduced_8_mod_89) — proven `by decide`, sorry-free:

```lean
(pmod 1 8 89 + pmod 1 8 89) % 89 = pmod 9 8 89
```

### THE IMAGE, PINNED, AT MODULUS 89 AND REDUCED EXPONENT 11. The 88 units raise to exactly the 8 value(s) [1,12,34,37,52,55,77,88] — every unit's 11-th power is in that list, and every entry of the list is some unit's 11-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_11_mod_89](/theorem/power_image_exact_reduced_11_mod_89) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun a => [1,12,34,37,52,55,77,88].contains (pmod a 11 89))) ∧ ([1,12,34,37,52,55,77,88].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].any (fun a => pmod a 11 89 == v)))
```

### AN OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 11 — part 1 of 4. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28] and every unit b coprime to 89, the sum of their 11-th powers never lands on the 11-th power image [1,12,34,37,52,55,77,88] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 89, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 88. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(89) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 89 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_89_part1](/theorem/coprime_sum_blocked_reduced_11_mod_89_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun b => !([1,12,34,37,52,55,77,88].contains ((pmod a 11 89 + pmod b 11 89) % 89))))
```

### AN OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 11 — part 2 of 4. For every unit a in [29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56] and every unit b coprime to 89, the sum of their 11-th powers never lands on the 11-th power image [1,12,34,37,52,55,77,88] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 89, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 88. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(89) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 89 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_89_part2](/theorem/coprime_sum_blocked_reduced_11_mod_89_part2) — proven `by decide`, sorry-free:

```lean
[29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun b => !([1,12,34,37,52,55,77,88].contains ((pmod a 11 89 + pmod b 11 89) % 89))))
```

### AN OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 11 — part 3 of 4. For every unit a in [57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84] and every unit b coprime to 89, the sum of their 11-th powers never lands on the 11-th power image [1,12,34,37,52,55,77,88] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 89, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 88. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(89) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 89 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_89_part3](/theorem/coprime_sum_blocked_reduced_11_mod_89_part3) — proven `by decide`, sorry-free:

```lean
[57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun b => !([1,12,34,37,52,55,77,88].contains ((pmod a 11 89 + pmod b 11 89) % 89))))
```

### AN OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 11 — part 4 of 4. For every unit a in [85,86,87,88] and every unit b coprime to 89, the sum of their 11-th powers never lands on the 11-th power image [1,12,34,37,52,55,77,88] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 89, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and every larger n with the same gcd against 88. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(89) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 89 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_11_mod_89_part4](/theorem/coprime_sum_blocked_reduced_11_mod_89_part4) — proven `by decide`, sorry-free:

```lean
[85,86,87,88].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun b => !([1,12,34,37,52,55,77,88].contains ((pmod a 11 89 + pmod b 11 89) % 89))))
```

### THE IMAGE, PINNED, AT MODULUS 89 AND REDUCED EXPONENT 22. The 88 units raise to exactly the 4 value(s) [1,34,55,88] — every unit's 22-th power is in that list, and every entry of the list is some unit's 22-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_22_mod_89](/theorem/power_image_exact_reduced_22_mod_89) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun a => [1,34,55,88].contains (pmod a 22 89))) ∧ ([1,34,55,88].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].any (fun a => pmod a 22 89 == v)))
```

### AN OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 22 — part 1 of 4. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28] and every unit b coprime to 89, the sum of their 22-th powers never lands on the 22-th power image [1,34,55,88] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 89, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 88. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(89) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 89 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_89_part1](/theorem/coprime_sum_blocked_reduced_22_mod_89_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun b => !([1,34,55,88].contains ((pmod a 22 89 + pmod b 22 89) % 89))))
```

### AN OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 22 — part 2 of 4. For every unit a in [29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56] and every unit b coprime to 89, the sum of their 22-th powers never lands on the 22-th power image [1,34,55,88] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 89, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 88. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(89) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 89 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_89_part2](/theorem/coprime_sum_blocked_reduced_22_mod_89_part2) — proven `by decide`, sorry-free:

```lean
[29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun b => !([1,34,55,88].contains ((pmod a 22 89 + pmod b 22 89) % 89))))
```

### AN OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 22 — part 3 of 4. For every unit a in [57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84] and every unit b coprime to 89, the sum of their 22-th powers never lands on the 22-th power image [1,34,55,88] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 89, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 88. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(89) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 89 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_89_part3](/theorem/coprime_sum_blocked_reduced_22_mod_89_part3) — proven `by decide`, sorry-free:

```lean
[57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun b => !([1,34,55,88].contains ((pmod a 22 89 + pmod b 22 89) % 89))))
```

### AN OBSTRUCTION AT MODULUS 89, REDUCED EXPONENT 22 — part 4 of 4. For every unit a in [85,86,87,88] and every unit b coprime to 89, the sum of their 22-th powers never lands on the 22-th power image [1,34,55,88] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 89, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same gcd against 88. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(89) = 88 puts the full 88-by-88 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 89 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_22_mod_89_part4](/theorem/coprime_sum_blocked_reduced_22_mod_89_part4) — proven `by decide`, sorry-free:

```lean
[85,86,87,88].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun b => !([1,34,55,88].contains ((pmod a 22 89 + pmod b 22 89) % 89))))
```

### THE ORDER STRUCTURE AT MODULUS 110. The 40 residues coprime to 110 are all killed by the exponent 20 — a^20 = 1 for every unit a — and no proper divisor of 20 kills them all (all 5 of them checked). So 20 is the exponent of (Z/110)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 20), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_110](/theorem/unit_group_exponent_mod_110) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => pmod a 20 110 == 1)) ∧ ([1,2,4,5,10].all (fun k => !([1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => pmod a k 110 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 110 AND REDUCED EXPONENT 1. The 40 units raise to exactly the 40 value(s) [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_110](/theorem/power_image_exact_reduced_1_mod_110) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].contains (pmod a 1 110))) ∧ ([1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun v => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].any (fun a => pmod a 1 110 == v)))
```

### AN OBSTRUCTION AT MODULUS 110, REDUCED EXPONENT 1. For every unit a in [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109] and every unit b coprime to 110, the sum of their 1-th powers never lands on the 1-th power image [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 110, for EVERY exponent n reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 110 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_110](/theorem/coprime_sum_blocked_reduced_1_mod_110) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun b => !([1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].contains ((pmod a 1 110 + pmod b 1 110) % 110))))
```

### THE IMAGE, PINNED, AT MODULUS 110 AND REDUCED EXPONENT 2. The 40 units raise to exactly the 10 value(s) [1,9,31,49,59,69,71,81,89,91] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_110](/theorem/power_image_exact_reduced_2_mod_110) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,9,31,49,59,69,71,81,89,91].contains (pmod a 2 110))) ∧ ([1,9,31,49,59,69,71,81,89,91].all (fun v => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].any (fun a => pmod a 2 110 == v)))
```

### AN OBSTRUCTION AT MODULUS 110, REDUCED EXPONENT 2. For every unit a in [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109] and every unit b coprime to 110, the sum of their 2-th powers never lands on the 2-th power image [1,9,31,49,59,69,71,81,89,91] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 110, for EVERY exponent n reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 110 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_110](/theorem/coprime_sum_blocked_reduced_2_mod_110) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun b => !([1,9,31,49,59,69,71,81,89,91].contains ((pmod a 2 110 + pmod b 2 110) % 110))))
```

### THE IMAGE, PINNED, AT MODULUS 110 AND REDUCED EXPONENT 4. The 40 units raise to exactly the 5 value(s) [1,31,71,81,91] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_110](/theorem/power_image_exact_reduced_4_mod_110) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,31,71,81,91].contains (pmod a 4 110))) ∧ ([1,31,71,81,91].all (fun v => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].any (fun a => pmod a 4 110 == v)))
```

### AN OBSTRUCTION AT MODULUS 110, REDUCED EXPONENT 4. For every unit a in [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109] and every unit b coprime to 110, the sum of their 4-th powers never lands on the 4-th power image [1,31,71,81,91] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 110, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 110 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_110](/theorem/coprime_sum_blocked_reduced_4_mod_110) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun b => !([1,31,71,81,91].contains ((pmod a 4 110 + pmod b 4 110) % 110))))
```

### THE IMAGE, PINNED, AT MODULUS 110 AND REDUCED EXPONENT 5. The 40 units raise to exactly the 8 value(s) [1,21,23,43,67,87,89,109] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_110](/theorem/power_image_exact_reduced_5_mod_110) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,21,23,43,67,87,89,109].contains (pmod a 5 110))) ∧ ([1,21,23,43,67,87,89,109].all (fun v => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].any (fun a => pmod a 5 110 == v)))
```

### AN OBSTRUCTION AT MODULUS 110, REDUCED EXPONENT 5. For every unit a in [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109] and every unit b coprime to 110, the sum of their 5-th powers never lands on the 5-th power image [1,21,23,43,67,87,89,109] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 110, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 110 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_110](/theorem/coprime_sum_blocked_reduced_5_mod_110) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun b => !([1,21,23,43,67,87,89,109].contains ((pmod a 5 110 + pmod b 5 110) % 110))))
```

### THE IMAGE, PINNED, AT MODULUS 110 AND REDUCED EXPONENT 10. The 40 units raise to exactly the 2 value(s) [1,89] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_110](/theorem/power_image_exact_reduced_10_mod_110) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,89].contains (pmod a 10 110))) ∧ ([1,89].all (fun v => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].any (fun a => pmod a 10 110 == v)))
```

### AN OBSTRUCTION AT MODULUS 110, REDUCED EXPONENT 10. For every unit a in [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109] and every unit b coprime to 110, the sum of their 10-th powers never lands on the 10-th power image [1,89] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 110, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 110 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_110](/theorem/coprime_sum_blocked_reduced_10_mod_110) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun b => !([1,89].contains ((pmod a 10 110 + pmod b 10 110) % 110))))
```

### THE IMAGE, PINNED, AT MODULUS 110 AND REDUCED EXPONENT 20. The 40 units raise to exactly the 1 value(s) [1] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_20_mod_110](/theorem/power_image_exact_reduced_20_mod_110) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1].contains (pmod a 20 110))) ∧ ([1].all (fun v => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].any (fun a => pmod a 20 110 == v)))
```

### AN OBSTRUCTION AT MODULUS 110, REDUCED EXPONENT 20. For every unit a in [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109] and every unit b coprime to 110, the sum of their 20-th powers never lands on the 20-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 110, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 110 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_110](/theorem/coprime_sum_blocked_reduced_20_mod_110) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun a => [1,3,7,9,13,17,19,21,23,27,29,31,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,79,81,83,87,89,91,93,97,101,103,107,109].all (fun b => !([1].contains ((pmod a 20 110 + pmod b 20 110) % 110))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 3 OF 21 — moduli 5, 26, 47, 68, 89, 110, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_5](/theorem/unit_group_exponent_mod_5) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
