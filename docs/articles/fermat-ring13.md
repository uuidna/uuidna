---
title: "The congruence survey, ring 13"
description: "Computed from lean/FermatRing13.lean — 66 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 13

> THE CONGRUENCE SURVEY, RING 13 OF 21 — moduli 15, 36, 57, 78, 99, 120, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_15](/theorem/unit_group_exponent_mod_15) and its 65 siblings below.

**66 theorems**, from [unit_group_exponent_mod_15](/theorem/unit_group_exponent_mod_15) onward, each proven `by decide` in <a href="/lean/FermatRing13.lean">lean/FermatRing13.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 41 of its 66 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_15](/theorem/unit_group_exponent_mod_15). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing13.lean)** — nothing to install. The editor fetches `lean/FermatRing13.lean` from the repository and re-decides all 66 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 15. The 8 residues coprime to 15 are all killed by the exponent 4 — a^4 = 1 for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent of (Z/15)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_15](/theorem/unit_group_exponent_mod_15) — proven `by decide`, sorry-free:

```lean
([1,2,4,7,8,11,13,14].all (fun a => pmod a 4 15 == 1)) ∧ ([1,2].all (fun k => !([1,2,4,7,8,11,13,14].all (fun a => pmod a k 15 == 1))))
```

### NO OBSTRUCTION AT MODULUS 15, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 15), with all three coprime to 15, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_15](/theorem/coprime_sum_open_reduced_1_mod_15) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 15 + pmod 1 1 15) % 15 = pmod 2 1 15
```

### THE IMAGE, PINNED, AT MODULUS 15 AND REDUCED EXPONENT 2. The 8 units raise to exactly the 2 value(s) [1,4] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_15](/theorem/power_image_exact_reduced_2_mod_15) — proven `by decide`, sorry-free:

```lean
([1,2,4,7,8,11,13,14].all (fun a => [1,4].contains (pmod a 2 15))) ∧ ([1,4].all (fun v => [1,2,4,7,8,11,13,14].any (fun a => pmod a 2 15 == v)))
```

### AN OBSTRUCTION AT MODULUS 15, REDUCED EXPONENT 2. For every unit a in [1,2,4,7,8,11,13,14] and every unit b coprime to 15, the sum of their 2-th powers never lands on the 2-th power image [1,4] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 15, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 15 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_15](/theorem/coprime_sum_blocked_reduced_2_mod_15) — proven `by decide`, sorry-free:

```lean
[1,2,4,7,8,11,13,14].all (fun a => [1,2,4,7,8,11,13,14].all (fun b => !([1,4].contains ((pmod a 2 15 + pmod b 2 15) % 15))))
```

### THE IMAGE, PINNED, AT MODULUS 15 AND REDUCED EXPONENT 4. The 8 units raise to exactly the 1 value(s) [1] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_15](/theorem/power_image_exact_reduced_4_mod_15) — proven `by decide`, sorry-free:

```lean
([1,2,4,7,8,11,13,14].all (fun a => [1].contains (pmod a 4 15))) ∧ ([1].all (fun v => [1,2,4,7,8,11,13,14].any (fun a => pmod a 4 15 == v)))
```

### AN OBSTRUCTION AT MODULUS 15, REDUCED EXPONENT 4. For every unit a in [1,2,4,7,8,11,13,14] and every unit b coprime to 15, the sum of their 4-th powers never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 15, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 15 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_15](/theorem/coprime_sum_blocked_reduced_4_mod_15) — proven `by decide`, sorry-free:

```lean
[1,2,4,7,8,11,13,14].all (fun a => [1,2,4,7,8,11,13,14].all (fun b => !([1].contains ((pmod a 4 15 + pmod b 4 15) % 15))))
```

### THE ORDER STRUCTURE AT MODULUS 36. The 12 residues coprime to 36 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/36)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_36](/theorem/unit_group_exponent_mod_36) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,19,23,25,29,31,35].all (fun a => pmod a 6 36 == 1)) ∧ ([1,2,3].all (fun k => !([1,5,7,11,13,17,19,23,25,29,31,35].all (fun a => pmod a k 36 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 36 AND REDUCED EXPONENT 1. The 12 units raise to exactly the 12 value(s) [1,5,7,11,13,17,19,23,25,29,31,35] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_36](/theorem/power_image_exact_reduced_1_mod_36) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,19,23,25,29,31,35].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35].contains (pmod a 1 36))) ∧ ([1,5,7,11,13,17,19,23,25,29,31,35].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35].any (fun a => pmod a 1 36 == v)))
```

### AN OBSTRUCTION AT MODULUS 36, REDUCED EXPONENT 1. For every unit a in [1,5,7,11,13,17,19,23,25,29,31,35] and every unit b coprime to 36, the sum of their 1-th powers never lands on the 1-th power image [1,5,7,11,13,17,19,23,25,29,31,35] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 36, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 36 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_36](/theorem/coprime_sum_blocked_reduced_1_mod_36) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,19,23,25,29,31,35].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35].all (fun b => !([1,5,7,11,13,17,19,23,25,29,31,35].contains ((pmod a 1 36 + pmod b 1 36) % 36))))
```

### THE IMAGE, PINNED, AT MODULUS 36 AND REDUCED EXPONENT 2. The 12 units raise to exactly the 3 value(s) [1,13,25] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_36](/theorem/power_image_exact_reduced_2_mod_36) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,19,23,25,29,31,35].all (fun a => [1,13,25].contains (pmod a 2 36))) ∧ ([1,13,25].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35].any (fun a => pmod a 2 36 == v)))
```

### AN OBSTRUCTION AT MODULUS 36, REDUCED EXPONENT 2. For every unit a in [1,5,7,11,13,17,19,23,25,29,31,35] and every unit b coprime to 36, the sum of their 2-th powers never lands on the 2-th power image [1,13,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 36, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 36 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_36](/theorem/coprime_sum_blocked_reduced_2_mod_36) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,19,23,25,29,31,35].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35].all (fun b => !([1,13,25].contains ((pmod a 2 36 + pmod b 2 36) % 36))))
```

### THE IMAGE, PINNED, AT MODULUS 36 AND REDUCED EXPONENT 3. The 12 units raise to exactly the 4 value(s) [1,17,19,35] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_36](/theorem/power_image_exact_reduced_3_mod_36) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,19,23,25,29,31,35].all (fun a => [1,17,19,35].contains (pmod a 3 36))) ∧ ([1,17,19,35].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35].any (fun a => pmod a 3 36 == v)))
```

### AN OBSTRUCTION AT MODULUS 36, REDUCED EXPONENT 3. For every unit a in [1,5,7,11,13,17,19,23,25,29,31,35] and every unit b coprime to 36, the sum of their 3-th powers never lands on the 3-th power image [1,17,19,35] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 36, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 36 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_36](/theorem/coprime_sum_blocked_reduced_3_mod_36) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,19,23,25,29,31,35].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35].all (fun b => !([1,17,19,35].contains ((pmod a 3 36 + pmod b 3 36) % 36))))
```

### THE IMAGE, PINNED, AT MODULUS 36 AND REDUCED EXPONENT 6. The 12 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_36](/theorem/power_image_exact_reduced_6_mod_36) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,19,23,25,29,31,35].all (fun a => [1].contains (pmod a 6 36))) ∧ ([1].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35].any (fun a => pmod a 6 36 == v)))
```

### AN OBSTRUCTION AT MODULUS 36, REDUCED EXPONENT 6. For every unit a in [1,5,7,11,13,17,19,23,25,29,31,35] and every unit b coprime to 36, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 36, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 36 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_36](/theorem/coprime_sum_blocked_reduced_6_mod_36) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,19,23,25,29,31,35].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35].all (fun b => !([1].contains ((pmod a 6 36 + pmod b 6 36) % 36))))
```

### THE ORDER STRUCTURE AT MODULUS 57. The 36 residues coprime to 57 are all killed by the exponent 18 — a^18 = 1 for every unit a — and no proper divisor of 18 kills them all (all 5 of them checked). So 18 is the exponent of (Z/57)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 18), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_57](/theorem/unit_group_exponent_mod_57) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun a => pmod a 18 57 == 1)) ∧ ([1,2,3,6,9].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun a => pmod a k 57 == 1))))
```

### NO OBSTRUCTION AT MODULUS 57, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 57), with all three coprime to 57, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_57](/theorem/coprime_sum_open_reduced_1_mod_57) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 57 + pmod 1 1 57) % 57 = pmod 2 1 57
```

### THE IMAGE, PINNED, AT MODULUS 57 AND REDUCED EXPONENT 2. The 36 units raise to exactly the 9 value(s) [1,4,7,16,25,28,43,49,55] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_57](/theorem/power_image_exact_reduced_2_mod_57) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun a => [1,4,7,16,25,28,43,49,55].contains (pmod a 2 57))) ∧ ([1,4,7,16,25,28,43,49,55].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].any (fun a => pmod a 2 57 == v)))
```

### AN OBSTRUCTION AT MODULUS 57, REDUCED EXPONENT 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56] and every unit b coprime to 57, the sum of their 2-th powers never lands on the 2-th power image [1,4,7,16,25,28,43,49,55] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 57, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 57 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_57](/theorem/coprime_sum_blocked_reduced_2_mod_57) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun b => !([1,4,7,16,25,28,43,49,55].contains ((pmod a 2 57 + pmod b 2 57) % 57))))
```

### NO OBSTRUCTION AT MODULUS 57, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 4^3 = 2^3 (mod 57), with all three coprime to 57, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 3 — that is n in [3,15,21] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_3_mod_57](/theorem/coprime_sum_open_reduced_3_mod_57) — proven `by decide`, sorry-free:

```lean
(pmod 1 3 57 + pmod 4 3 57) % 57 = pmod 2 3 57
```

### THE IMAGE, PINNED, AT MODULUS 57 AND REDUCED EXPONENT 6. The 36 units raise to exactly the 3 value(s) [1,7,49] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_57](/theorem/power_image_exact_reduced_6_mod_57) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun a => [1,7,49].contains (pmod a 6 57))) ∧ ([1,7,49].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].any (fun a => pmod a 6 57 == v)))
```

### AN OBSTRUCTION AT MODULUS 57, REDUCED EXPONENT 6. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56] and every unit b coprime to 57, the sum of their 6-th powers never lands on the 6-th power image [1,7,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 57, for EVERY exponent n reducing to 6 — that is n in [6,12] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 57 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_57](/theorem/coprime_sum_blocked_reduced_6_mod_57) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun b => !([1,7,49].contains ((pmod a 6 57 + pmod b 6 57) % 57))))
```

### THE IMAGE, PINNED, AT MODULUS 57 AND REDUCED EXPONENT 9. The 36 units raise to exactly the 4 value(s) [1,20,37,56] — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_9_mod_57](/theorem/power_image_exact_reduced_9_mod_57) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun a => [1,20,37,56].contains (pmod a 9 57))) ∧ ([1,20,37,56].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].any (fun a => pmod a 9 57 == v)))
```

### AN OBSTRUCTION AT MODULUS 57, REDUCED EXPONENT 9. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56] and every unit b coprime to 57, the sum of their 9-th powers never lands on the 9-th power image [1,20,37,56] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 57, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 57 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_9_mod_57](/theorem/coprime_sum_blocked_reduced_9_mod_57) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun b => !([1,20,37,56].contains ((pmod a 9 57 + pmod b 9 57) % 57))))
```

### THE IMAGE, PINNED, AT MODULUS 57 AND REDUCED EXPONENT 18. The 36 units raise to exactly the 1 value(s) [1] — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_18_mod_57](/theorem/power_image_exact_reduced_18_mod_57) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun a => [1].contains (pmod a 18 57))) ∧ ([1].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].any (fun a => pmod a 18 57 == v)))
```

### AN OBSTRUCTION AT MODULUS 57, REDUCED EXPONENT 18. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56] and every unit b coprime to 57, the sum of their 18-th powers never lands on the 18-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 57, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 57 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_18_mod_57](/theorem/coprime_sum_blocked_reduced_18_mod_57) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,20,22,23,25,26,28,29,31,32,34,35,37,40,41,43,44,46,47,49,50,52,53,55,56].all (fun b => !([1].contains ((pmod a 18 57 + pmod b 18 57) % 57))))
```

### THE ORDER STRUCTURE AT MODULUS 78. The 24 residues coprime to 78 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/78)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_78](/theorem/unit_group_exponent_mod_78) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => pmod a 12 78 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => pmod a k 78 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 78 AND REDUCED EXPONENT 1. The 24 units raise to exactly the 24 value(s) [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_78](/theorem/power_image_exact_reduced_1_mod_78) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].contains (pmod a 1 78))) ∧ ([1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun v => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].any (fun a => pmod a 1 78 == v)))
```

### AN OBSTRUCTION AT MODULUS 78, REDUCED EXPONENT 1. For every unit a in [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77] and every unit b coprime to 78, the sum of their 1-th powers never lands on the 1-th power image [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 78, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 78 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_78](/theorem/coprime_sum_blocked_reduced_1_mod_78) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun b => !([1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].contains ((pmod a 1 78 + pmod b 1 78) % 78))))
```

### THE IMAGE, PINNED, AT MODULUS 78 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 6 value(s) [1,25,43,49,55,61] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_78](/theorem/power_image_exact_reduced_2_mod_78) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,25,43,49,55,61].contains (pmod a 2 78))) ∧ ([1,25,43,49,55,61].all (fun v => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].any (fun a => pmod a 2 78 == v)))
```

### AN OBSTRUCTION AT MODULUS 78, REDUCED EXPONENT 2. For every unit a in [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77] and every unit b coprime to 78, the sum of their 2-th powers never lands on the 2-th power image [1,25,43,49,55,61] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 78, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 78 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_78](/theorem/coprime_sum_blocked_reduced_2_mod_78) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun b => !([1,25,43,49,55,61].contains ((pmod a 2 78 + pmod b 2 78) % 78))))
```

### THE IMAGE, PINNED, AT MODULUS 78 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s) [1,5,25,31,47,53,73,77] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_78](/theorem/power_image_exact_reduced_3_mod_78) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,5,25,31,47,53,73,77].contains (pmod a 3 78))) ∧ ([1,5,25,31,47,53,73,77].all (fun v => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].any (fun a => pmod a 3 78 == v)))
```

### AN OBSTRUCTION AT MODULUS 78, REDUCED EXPONENT 3. For every unit a in [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77] and every unit b coprime to 78, the sum of their 3-th powers never lands on the 3-th power image [1,5,25,31,47,53,73,77] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 78, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 78 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_78](/theorem/coprime_sum_blocked_reduced_3_mod_78) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun b => !([1,5,25,31,47,53,73,77].contains ((pmod a 3 78 + pmod b 3 78) % 78))))
```

### THE IMAGE, PINNED, AT MODULUS 78 AND REDUCED EXPONENT 4. The 24 units raise to exactly the 3 value(s) [1,55,61] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_78](/theorem/power_image_exact_reduced_4_mod_78) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,55,61].contains (pmod a 4 78))) ∧ ([1,55,61].all (fun v => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].any (fun a => pmod a 4 78 == v)))
```

### AN OBSTRUCTION AT MODULUS 78, REDUCED EXPONENT 4. For every unit a in [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77] and every unit b coprime to 78, the sum of their 4-th powers never lands on the 4-th power image [1,55,61] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 78, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 78 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_78](/theorem/coprime_sum_blocked_reduced_4_mod_78) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun b => !([1,55,61].contains ((pmod a 4 78 + pmod b 4 78) % 78))))
```

### THE IMAGE, PINNED, AT MODULUS 78 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 2 value(s) [1,25] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_78](/theorem/power_image_exact_reduced_6_mod_78) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,25].contains (pmod a 6 78))) ∧ ([1,25].all (fun v => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].any (fun a => pmod a 6 78 == v)))
```

### AN OBSTRUCTION AT MODULUS 78, REDUCED EXPONENT 6. For every unit a in [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77] and every unit b coprime to 78, the sum of their 6-th powers never lands on the 6-th power image [1,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 78, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 78 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_78](/theorem/coprime_sum_blocked_reduced_6_mod_78) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun b => !([1,25].contains ((pmod a 6 78 + pmod b 6 78) % 78))))
```

### THE IMAGE, PINNED, AT MODULUS 78 AND REDUCED EXPONENT 12. The 24 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_78](/theorem/power_image_exact_reduced_12_mod_78) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1].contains (pmod a 12 78))) ∧ ([1].all (fun v => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].any (fun a => pmod a 12 78 == v)))
```

### AN OBSTRUCTION AT MODULUS 78, REDUCED EXPONENT 12. For every unit a in [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77] and every unit b coprime to 78, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 78, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 78 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_78](/theorem/coprime_sum_blocked_reduced_12_mod_78) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun a => [1,5,7,11,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,67,71,73,77].all (fun b => !([1].contains ((pmod a 12 78 + pmod b 12 78) % 78))))
```

### THE ORDER STRUCTURE AT MODULUS 99. The 60 residues coprime to 99 are all killed by the exponent 30 — a^30 = 1 for every unit a — and no proper divisor of 30 kills them all (all 7 of them checked). So 30 is the exponent of (Z/99)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 30), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_99](/theorem/unit_group_exponent_mod_99) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => pmod a 30 99 == 1)) ∧ ([1,2,3,5,6,10,15].all (fun k => !([1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => pmod a k 99 == 1))))
```

### NO OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 99), with all three coprime to 99, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_99](/theorem/coprime_sum_open_reduced_1_mod_99) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 99 + pmod 1 1 99) % 99 = pmod 2 1 99
```

### THE IMAGE, PINNED, AT MODULUS 99 AND REDUCED EXPONENT 2. The 60 units raise to exactly the 15 value(s) [1,4,16,25,31,34,37,49,58,64,67,70,82,91,97] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_99](/theorem/power_image_exact_reduced_2_mod_99) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,4,16,25,31,34,37,49,58,64,67,70,82,91,97].contains (pmod a 2 99))) ∧ ([1,4,16,25,31,34,37,49,58,64,67,70,82,91,97].all (fun v => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].any (fun a => pmod a 2 99 == v)))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67] and every unit b coprime to 99, the sum of their 2-th powers never lands on the 2-th power image [1,4,16,25,31,34,37,49,58,64,67,70,82,91,97] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 2 — that is n in [4,8,14,16,22] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_99_part1](/theorem/coprime_sum_blocked_reduced_2_mod_99_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,4,16,25,31,34,37,49,58,64,67,70,82,91,97].contains ((pmod a 2 99 + pmod b 2 99) % 99))))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in [68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98] and every unit b coprime to 99, the sum of their 2-th powers never lands on the 2-th power image [1,4,16,25,31,34,37,49,58,64,67,70,82,91,97] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 2 — that is n in [4,8,14,16,22] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_99_part2](/theorem/coprime_sum_blocked_reduced_2_mod_99_part2) — proven `by decide`, sorry-free:

```lean
[68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,4,16,25,31,34,37,49,58,64,67,70,82,91,97].contains ((pmod a 2 99 + pmod b 2 99) % 99))))
```

### THE IMAGE, PINNED, AT MODULUS 99 AND REDUCED EXPONENT 3. The 60 units raise to exactly the 20 value(s) [1,8,10,17,19,26,28,35,37,46,53,62,64,71,73,80,82,89,91,98] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_99](/theorem/power_image_exact_reduced_3_mod_99) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,8,10,17,19,26,28,35,37,46,53,62,64,71,73,80,82,89,91,98].contains (pmod a 3 99))) ∧ ([1,8,10,17,19,26,28,35,37,46,53,62,64,71,73,80,82,89,91,98].all (fun v => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].any (fun a => pmod a 3 99 == v)))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 3 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67] and every unit b coprime to 99, the sum of their 3-th powers never lands on the 3-th power image [1,8,10,17,19,26,28,35,37,46,53,62,64,71,73,80,82,89,91,98] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 3 — that is n in [3,9,21] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_99_part1](/theorem/coprime_sum_blocked_reduced_3_mod_99_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,8,10,17,19,26,28,35,37,46,53,62,64,71,73,80,82,89,91,98].contains ((pmod a 3 99 + pmod b 3 99) % 99))))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 3 — part 2 of 2. For every unit a in [68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98] and every unit b coprime to 99, the sum of their 3-th powers never lands on the 3-th power image [1,8,10,17,19,26,28,35,37,46,53,62,64,71,73,80,82,89,91,98] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 3 — that is n in [3,9,21] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_99_part2](/theorem/coprime_sum_blocked_reduced_3_mod_99_part2) — proven `by decide`, sorry-free:

```lean
[68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,8,10,17,19,26,28,35,37,46,53,62,64,71,73,80,82,89,91,98].contains ((pmod a 3 99 + pmod b 3 99) % 99))))
```

### THE IMAGE, PINNED, AT MODULUS 99 AND REDUCED EXPONENT 5. The 60 units raise to exactly the 12 value(s) [1,10,23,32,34,43,56,65,67,76,89,98] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_99](/theorem/power_image_exact_reduced_5_mod_99) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,10,23,32,34,43,56,65,67,76,89,98].contains (pmod a 5 99))) ∧ ([1,10,23,32,34,43,56,65,67,76,89,98].all (fun v => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].any (fun a => pmod a 5 99 == v)))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 5 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67] and every unit b coprime to 99, the sum of their 5-th powers never lands on the 5-th power image [1,10,23,32,34,43,56,65,67,76,89,98] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 5 — that is n in [5] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_99_part1](/theorem/coprime_sum_blocked_reduced_5_mod_99_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,10,23,32,34,43,56,65,67,76,89,98].contains ((pmod a 5 99 + pmod b 5 99) % 99))))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 5 — part 2 of 2. For every unit a in [68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98] and every unit b coprime to 99, the sum of their 5-th powers never lands on the 5-th power image [1,10,23,32,34,43,56,65,67,76,89,98] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 5 — that is n in [5] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_99_part2](/theorem/coprime_sum_blocked_reduced_5_mod_99_part2) — proven `by decide`, sorry-free:

```lean
[68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,10,23,32,34,43,56,65,67,76,89,98].contains ((pmod a 5 99 + pmod b 5 99) % 99))))
```

### THE IMAGE, PINNED, AT MODULUS 99 AND REDUCED EXPONENT 6. The 60 units raise to exactly the 5 value(s) [1,37,64,82,91] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_99](/theorem/power_image_exact_reduced_6_mod_99) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,37,64,82,91].contains (pmod a 6 99))) ∧ ([1,37,64,82,91].all (fun v => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].any (fun a => pmod a 6 99 == v)))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 6 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67] and every unit b coprime to 99, the sum of their 6-th powers never lands on the 6-th power image [1,37,64,82,91] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_99_part1](/theorem/coprime_sum_blocked_reduced_6_mod_99_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,37,64,82,91].contains ((pmod a 6 99 + pmod b 6 99) % 99))))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 6 — part 2 of 2. For every unit a in [68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98] and every unit b coprime to 99, the sum of their 6-th powers never lands on the 6-th power image [1,37,64,82,91] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_99_part2](/theorem/coprime_sum_blocked_reduced_6_mod_99_part2) — proven `by decide`, sorry-free:

```lean
[68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,37,64,82,91].contains ((pmod a 6 99 + pmod b 6 99) % 99))))
```

### THE IMAGE, PINNED, AT MODULUS 99 AND REDUCED EXPONENT 10. The 60 units raise to exactly the 3 value(s) [1,34,67] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_99](/theorem/power_image_exact_reduced_10_mod_99) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,34,67].contains (pmod a 10 99))) ∧ ([1,34,67].all (fun v => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].any (fun a => pmod a 10 99 == v)))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 10 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67] and every unit b coprime to 99, the sum of their 10-th powers never lands on the 10-th power image [1,34,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_99_part1](/theorem/coprime_sum_blocked_reduced_10_mod_99_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,34,67].contains ((pmod a 10 99 + pmod b 10 99) % 99))))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 10 — part 2 of 2. For every unit a in [68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98] and every unit b coprime to 99, the sum of their 10-th powers never lands on the 10-th power image [1,34,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_99_part2](/theorem/coprime_sum_blocked_reduced_10_mod_99_part2) — proven `by decide`, sorry-free:

```lean
[68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,34,67].contains ((pmod a 10 99 + pmod b 10 99) % 99))))
```

### THE IMAGE, PINNED, AT MODULUS 99 AND REDUCED EXPONENT 15. The 60 units raise to exactly the 4 value(s) [1,10,89,98] — every unit's 15-th power is in that list, and every entry of the list is some unit's 15-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_15_mod_99](/theorem/power_image_exact_reduced_15_mod_99) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,10,89,98].contains (pmod a 15 99))) ∧ ([1,10,89,98].all (fun v => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].any (fun a => pmod a 15 99 == v)))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 15 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67] and every unit b coprime to 99, the sum of their 15-th powers never lands on the 15-th power image [1,10,89,98] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_15_mod_99_part1](/theorem/coprime_sum_blocked_reduced_15_mod_99_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,10,89,98].contains ((pmod a 15 99 + pmod b 15 99) % 99))))
```

### AN OBSTRUCTION AT MODULUS 99, REDUCED EXPONENT 15 — part 2 of 2. For every unit a in [68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98] and every unit b coprime to 99, the sum of their 15-th powers never lands on the 15-th power image [1,10,89,98] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 99, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(99) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 99 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_15_mod_99_part2](/theorem/coprime_sum_blocked_reduced_15_mod_99_part2) — proven `by decide`, sorry-free:

```lean
[68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun a => [1,2,4,5,7,8,10,13,14,16,17,19,20,23,25,26,28,29,31,32,34,35,37,38,40,41,43,46,47,49,50,52,53,56,58,59,61,62,64,65,67,68,70,71,73,74,76,79,80,82,83,85,86,89,91,92,94,95,97,98].all (fun b => !([1,10,89,98].contains ((pmod a 15 99 + pmod b 15 99) % 99))))
```

### THE ORDER STRUCTURE AT MODULUS 120. The 32 residues coprime to 120 are all killed by the exponent 4 — a^4 = 1 for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent of (Z/120)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_120](/theorem/unit_group_exponent_mod_120) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun a => pmod a 4 120 == 1)) ∧ ([1,2].all (fun k => !([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun a => pmod a k 120 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 120 AND REDUCED EXPONENT 1. The 32 units raise to exactly the 32 value(s) [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_120](/theorem/power_image_exact_reduced_1_mod_120) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].contains (pmod a 1 120))) ∧ ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].any (fun a => pmod a 1 120 == v)))
```

### AN OBSTRUCTION AT MODULUS 120, REDUCED EXPONENT 1. For every unit a in [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119] and every unit b coprime to 120, the sum of their 1-th powers never lands on the 1-th power image [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 120, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 120 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_120](/theorem/coprime_sum_blocked_reduced_1_mod_120) — proven `by decide`, sorry-free:

```lean
[1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun b => !([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].contains ((pmod a 1 120 + pmod b 1 120) % 120))))
```

### THE IMAGE, PINNED, AT MODULUS 120 AND REDUCED EXPONENT 2. The 32 units raise to exactly the 2 value(s) [1,49] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_120](/theorem/power_image_exact_reduced_2_mod_120) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun a => [1,49].contains (pmod a 2 120))) ∧ ([1,49].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].any (fun a => pmod a 2 120 == v)))
```

### AN OBSTRUCTION AT MODULUS 120, REDUCED EXPONENT 2. For every unit a in [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119] and every unit b coprime to 120, the sum of their 2-th powers never lands on the 2-th power image [1,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 120, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 120 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_120](/theorem/coprime_sum_blocked_reduced_2_mod_120) — proven `by decide`, sorry-free:

```lean
[1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun b => !([1,49].contains ((pmod a 2 120 + pmod b 2 120) % 120))))
```

### THE IMAGE, PINNED, AT MODULUS 120 AND REDUCED EXPONENT 4. The 32 units raise to exactly the 1 value(s) [1] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_120](/theorem/power_image_exact_reduced_4_mod_120) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun a => [1].contains (pmod a 4 120))) ∧ ([1].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].any (fun a => pmod a 4 120 == v)))
```

### AN OBSTRUCTION AT MODULUS 120, REDUCED EXPONENT 4. For every unit a in [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119] and every unit b coprime to 120, the sum of their 4-th powers never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 120, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 120 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_120](/theorem/coprime_sum_blocked_reduced_4_mod_120) — proven `by decide`, sorry-free:

```lean
[1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89,91,97,101,103,107,109,113,119].all (fun b => !([1].contains ((pmod a 4 120 + pmod b 4 120) % 120))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 13 OF 21 — moduli 15, 36, 57, 78, 99, 120, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_15](/theorem/unit_group_exponent_mod_15) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
