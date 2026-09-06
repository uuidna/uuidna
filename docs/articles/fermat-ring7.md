---
title: "The congruence survey, ring 7"
description: "Computed from lean/FermatRing7.lean — 63 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 7

> THE CONGRUENCE SURVEY, RING 7 OF 21 — moduli 9, 30, 51, 72, 93, 114, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_9](/theorem/unit_group_exponent_mod_9) and its 62 siblings below.

**63 theorems**, from [unit_group_exponent_mod_9](/theorem/unit_group_exponent_mod_9) onward, each proven `by decide` in <a href="/lean/FermatRing7.lean">lean/FermatRing7.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 39 of its 63 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_9](/theorem/unit_group_exponent_mod_9). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing7.lean)** — nothing to install. The editor fetches `lean/FermatRing7.lean` from the repository and re-decides all 63 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 9. The 6 residues coprime to 9 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/9)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_9](/theorem/unit_group_exponent_mod_9) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8].all (fun a => pmod a 6 9 == 1)) ∧ ([1,2,3].all (fun k => !([1,2,4,5,7,8].all (fun a => pmod a k 9 == 1))))
```

### NO OBSTRUCTION AT MODULUS 9, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 9), with all three coprime to 9, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_9](/theorem/coprime_sum_open_reduced_1_mod_9) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 9 + pmod 1 1 9) % 9 = pmod 2 1 9
```

### THE IMAGE, PINNED, AT MODULUS 9 AND REDUCED EXPONENT 2. The 6 units raise to exactly the 3 value(s) [1,4,7] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_9](/theorem/power_image_exact_reduced_2_mod_9) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8].all (fun a => [1,4,7].contains (pmod a 2 9))) ∧ ([1,4,7].all (fun v => [1,2,4,5,7,8].any (fun a => pmod a 2 9 == v)))
```

### AN OBSTRUCTION AT MODULUS 9, REDUCED EXPONENT 2. For every unit a in [1,2,4,5,7,8] and every unit b coprime to 9, the sum of their 2-th powers never lands on the 2-th power image [1,4,7] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 9, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 9 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_9](/theorem/coprime_sum_blocked_reduced_2_mod_9) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8].all (fun a => [1,2,4,5,7,8].all (fun b => !([1,4,7].contains ((pmod a 2 9 + pmod b 2 9) % 9))))
```

### THE IMAGE, PINNED, AT MODULUS 9 AND REDUCED EXPONENT 3. The 6 units raise to exactly the 2 value(s) [1,8] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_9](/theorem/power_image_exact_reduced_3_mod_9) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8].all (fun a => [1,8].contains (pmod a 3 9))) ∧ ([1,8].all (fun v => [1,2,4,5,7,8].any (fun a => pmod a 3 9 == v)))
```

### AN OBSTRUCTION AT MODULUS 9, REDUCED EXPONENT 3. For every unit a in [1,2,4,5,7,8] and every unit b coprime to 9, the sum of their 3-th powers never lands on the 3-th power image [1,8] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 9, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 9 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_9](/theorem/coprime_sum_blocked_reduced_3_mod_9) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8].all (fun a => [1,2,4,5,7,8].all (fun b => !([1,8].contains ((pmod a 3 9 + pmod b 3 9) % 9))))
```

### THE IMAGE, PINNED, AT MODULUS 9 AND REDUCED EXPONENT 6. The 6 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_9](/theorem/power_image_exact_reduced_6_mod_9) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8].all (fun a => [1].contains (pmod a 6 9))) ∧ ([1].all (fun v => [1,2,4,5,7,8].any (fun a => pmod a 6 9 == v)))
```

### AN OBSTRUCTION AT MODULUS 9, REDUCED EXPONENT 6. For every unit a in [1,2,4,5,7,8] and every unit b coprime to 9, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 9, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 9 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_9](/theorem/coprime_sum_blocked_reduced_6_mod_9) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8].all (fun a => [1,2,4,5,7,8].all (fun b => !([1].contains ((pmod a 6 9 + pmod b 6 9) % 9))))
```

### THE ORDER STRUCTURE AT MODULUS 30. The 8 residues coprime to 30 are all killed by the exponent 4 — a^4 = 1 for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent of (Z/30)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_30](/theorem/unit_group_exponent_mod_30) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29].all (fun a => pmod a 4 30 == 1)) ∧ ([1,2].all (fun k => !([1,7,11,13,17,19,23,29].all (fun a => pmod a k 30 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 30 AND REDUCED EXPONENT 1. The 8 units raise to exactly the 8 value(s) [1,7,11,13,17,19,23,29] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_30](/theorem/power_image_exact_reduced_1_mod_30) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29].all (fun a => [1,7,11,13,17,19,23,29].contains (pmod a 1 30))) ∧ ([1,7,11,13,17,19,23,29].all (fun v => [1,7,11,13,17,19,23,29].any (fun a => pmod a 1 30 == v)))
```

### AN OBSTRUCTION AT MODULUS 30, REDUCED EXPONENT 1. For every unit a in [1,7,11,13,17,19,23,29] and every unit b coprime to 30, the sum of their 1-th powers never lands on the 1-th power image [1,7,11,13,17,19,23,29] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 30, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 30 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_30](/theorem/coprime_sum_blocked_reduced_1_mod_30) — proven `by decide`, sorry-free:

```lean
[1,7,11,13,17,19,23,29].all (fun a => [1,7,11,13,17,19,23,29].all (fun b => !([1,7,11,13,17,19,23,29].contains ((pmod a 1 30 + pmod b 1 30) % 30))))
```

### THE IMAGE, PINNED, AT MODULUS 30 AND REDUCED EXPONENT 2. The 8 units raise to exactly the 2 value(s) [1,19] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_30](/theorem/power_image_exact_reduced_2_mod_30) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29].all (fun a => [1,19].contains (pmod a 2 30))) ∧ ([1,19].all (fun v => [1,7,11,13,17,19,23,29].any (fun a => pmod a 2 30 == v)))
```

### AN OBSTRUCTION AT MODULUS 30, REDUCED EXPONENT 2. For every unit a in [1,7,11,13,17,19,23,29] and every unit b coprime to 30, the sum of their 2-th powers never lands on the 2-th power image [1,19] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 30, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 30 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_30](/theorem/coprime_sum_blocked_reduced_2_mod_30) — proven `by decide`, sorry-free:

```lean
[1,7,11,13,17,19,23,29].all (fun a => [1,7,11,13,17,19,23,29].all (fun b => !([1,19].contains ((pmod a 2 30 + pmod b 2 30) % 30))))
```

### THE IMAGE, PINNED, AT MODULUS 30 AND REDUCED EXPONENT 4. The 8 units raise to exactly the 1 value(s) [1] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_30](/theorem/power_image_exact_reduced_4_mod_30) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29].all (fun a => [1].contains (pmod a 4 30))) ∧ ([1].all (fun v => [1,7,11,13,17,19,23,29].any (fun a => pmod a 4 30 == v)))
```

### AN OBSTRUCTION AT MODULUS 30, REDUCED EXPONENT 4. For every unit a in [1,7,11,13,17,19,23,29] and every unit b coprime to 30, the sum of their 4-th powers never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 30, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 30 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_30](/theorem/coprime_sum_blocked_reduced_4_mod_30) — proven `by decide`, sorry-free:

```lean
[1,7,11,13,17,19,23,29].all (fun a => [1,7,11,13,17,19,23,29].all (fun b => !([1].contains ((pmod a 4 30 + pmod b 4 30) % 30))))
```

### THE ORDER STRUCTURE AT MODULUS 51. The 32 residues coprime to 51 are all killed by the exponent 16 — a^16 = 1 for every unit a — and no proper divisor of 16 kills them all (all 4 of them checked). So 16 is the exponent of (Z/51)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 16), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_51](/theorem/unit_group_exponent_mod_51) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun a => pmod a 16 51 == 1)) ∧ ([1,2,4,8].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun a => pmod a k 51 == 1))))
```

### NO OBSTRUCTION AT MODULUS 51, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 51), with all three coprime to 51, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_51](/theorem/coprime_sum_open_reduced_1_mod_51) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 51 + pmod 1 1 51) % 51 = pmod 2 1 51
```

### THE IMAGE, PINNED, AT MODULUS 51 AND REDUCED EXPONENT 2. The 32 units raise to exactly the 8 value(s) [1,4,13,16,19,25,43,49] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_51](/theorem/power_image_exact_reduced_2_mod_51) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun a => [1,4,13,16,19,25,43,49].contains (pmod a 2 51))) ∧ ([1,4,13,16,19,25,43,49].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].any (fun a => pmod a 2 51 == v)))
```

### AN OBSTRUCTION AT MODULUS 51, REDUCED EXPONENT 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50] and every unit b coprime to 51, the sum of their 2-th powers never lands on the 2-th power image [1,4,13,16,19,25,43,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 51, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 51 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_51](/theorem/coprime_sum_blocked_reduced_2_mod_51) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun b => !([1,4,13,16,19,25,43,49].contains ((pmod a 2 51 + pmod b 2 51) % 51))))
```

### THE IMAGE, PINNED, AT MODULUS 51 AND REDUCED EXPONENT 4. The 32 units raise to exactly the 4 value(s) [1,4,13,16] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_51](/theorem/power_image_exact_reduced_4_mod_51) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun a => [1,4,13,16].contains (pmod a 4 51))) ∧ ([1,4,13,16].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].any (fun a => pmod a 4 51 == v)))
```

### AN OBSTRUCTION AT MODULUS 51, REDUCED EXPONENT 4. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50] and every unit b coprime to 51, the sum of their 4-th powers never lands on the 4-th power image [1,4,13,16] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 51, for EVERY exponent n reducing to 4 — that is n in [4,12,20] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 51 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_51](/theorem/coprime_sum_blocked_reduced_4_mod_51) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun b => !([1,4,13,16].contains ((pmod a 4 51 + pmod b 4 51) % 51))))
```

### THE IMAGE, PINNED, AT MODULUS 51 AND REDUCED EXPONENT 8. The 32 units raise to exactly the 2 value(s) [1,16] — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_8_mod_51](/theorem/power_image_exact_reduced_8_mod_51) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun a => [1,16].contains (pmod a 8 51))) ∧ ([1,16].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].any (fun a => pmod a 8 51 == v)))
```

### AN OBSTRUCTION AT MODULUS 51, REDUCED EXPONENT 8. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50] and every unit b coprime to 51, the sum of their 8-th powers never lands on the 8-th power image [1,16] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 51, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 51 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_51](/theorem/coprime_sum_blocked_reduced_8_mod_51) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun b => !([1,16].contains ((pmod a 8 51 + pmod b 8 51) % 51))))
```

### THE IMAGE, PINNED, AT MODULUS 51 AND REDUCED EXPONENT 16. The 32 units raise to exactly the 1 value(s) [1] — every unit's 16-th power is in that list, and every entry of the list is some unit's 16-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_16_mod_51](/theorem/power_image_exact_reduced_16_mod_51) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun a => [1].contains (pmod a 16 51))) ∧ ([1].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].any (fun a => pmod a 16 51 == v)))
```

### AN OBSTRUCTION AT MODULUS 51, REDUCED EXPONENT 16. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50] and every unit b coprime to 51, the sum of their 16-th powers never lands on the 16-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 51, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 51 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_16_mod_51](/theorem/coprime_sum_blocked_reduced_16_mod_51) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,19,20,22,23,25,26,28,29,31,32,35,37,38,40,41,43,44,46,47,49,50].all (fun b => !([1].contains ((pmod a 16 51 + pmod b 16 51) % 51))))
```

### THE ORDER STRUCTURE AT MODULUS 72. The 24 residues coprime to 72 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/72)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_72](/theorem/unit_group_exponent_mod_72) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun a => pmod a 6 72 == 1)) ∧ ([1,2,3].all (fun k => !([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun a => pmod a k 72 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 72 AND REDUCED EXPONENT 1. The 24 units raise to exactly the 24 value(s) [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_72](/theorem/power_image_exact_reduced_1_mod_72) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].contains (pmod a 1 72))) ∧ ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].any (fun a => pmod a 1 72 == v)))
```

### AN OBSTRUCTION AT MODULUS 72, REDUCED EXPONENT 1. For every unit a in [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71] and every unit b coprime to 72, the sum of their 1-th powers never lands on the 1-th power image [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 72, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 72 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_72](/theorem/coprime_sum_blocked_reduced_1_mod_72) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun b => !([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].contains ((pmod a 1 72 + pmod b 1 72) % 72))))
```

### THE IMAGE, PINNED, AT MODULUS 72 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 3 value(s) [1,25,49] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_72](/theorem/power_image_exact_reduced_2_mod_72) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun a => [1,25,49].contains (pmod a 2 72))) ∧ ([1,25,49].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].any (fun a => pmod a 2 72 == v)))
```

### AN OBSTRUCTION AT MODULUS 72, REDUCED EXPONENT 2. For every unit a in [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71] and every unit b coprime to 72, the sum of their 2-th powers never lands on the 2-th power image [1,25,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 72, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 72 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_72](/theorem/coprime_sum_blocked_reduced_2_mod_72) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun b => !([1,25,49].contains ((pmod a 2 72 + pmod b 2 72) % 72))))
```

### THE IMAGE, PINNED, AT MODULUS 72 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s) [1,17,19,35,37,53,55,71] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_72](/theorem/power_image_exact_reduced_3_mod_72) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun a => [1,17,19,35,37,53,55,71].contains (pmod a 3 72))) ∧ ([1,17,19,35,37,53,55,71].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].any (fun a => pmod a 3 72 == v)))
```

### AN OBSTRUCTION AT MODULUS 72, REDUCED EXPONENT 3. For every unit a in [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71] and every unit b coprime to 72, the sum of their 3-th powers never lands on the 3-th power image [1,17,19,35,37,53,55,71] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 72, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 72 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_72](/theorem/coprime_sum_blocked_reduced_3_mod_72) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun b => !([1,17,19,35,37,53,55,71].contains ((pmod a 3 72 + pmod b 3 72) % 72))))
```

### THE IMAGE, PINNED, AT MODULUS 72 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_72](/theorem/power_image_exact_reduced_6_mod_72) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun a => [1].contains (pmod a 6 72))) ∧ ([1].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].any (fun a => pmod a 6 72 == v)))
```

### AN OBSTRUCTION AT MODULUS 72, REDUCED EXPONENT 6. For every unit a in [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71] and every unit b coprime to 72, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 72, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 72 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_72](/theorem/coprime_sum_blocked_reduced_6_mod_72) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71].all (fun b => !([1].contains ((pmod a 6 72 + pmod b 6 72) % 72))))
```

### THE ORDER STRUCTURE AT MODULUS 93. The 60 residues coprime to 93 are all killed by the exponent 30 — a^30 = 1 for every unit a — and no proper divisor of 30 kills them all (all 7 of them checked). So 30 is the exponent of (Z/93)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 30), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_93](/theorem/unit_group_exponent_mod_93) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun a => pmod a 30 93 == 1)) ∧ ([1,2,3,5,6,10,15].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun a => pmod a k 93 == 1))))
```

### NO OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 93), with all three coprime to 93, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_93](/theorem/coprime_sum_open_reduced_1_mod_93) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 93 + pmod 1 1 93) % 93 = pmod 2 1 93
```

### THE IMAGE, PINNED, AT MODULUS 93 AND REDUCED EXPONENT 2. The 60 units raise to exactly the 15 value(s) [1,4,7,10,16,19,25,28,40,49,64,67,70,76,82] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_93](/theorem/power_image_exact_reduced_2_mod_93) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun a => [1,4,7,10,16,19,25,28,40,49,64,67,70,76,82].contains (pmod a 2 93))) ∧ ([1,4,7,10,16,19,25,28,40,49,64,67,70,76,82].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].any (fun a => pmod a 2 93 == v)))
```

### AN OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64] and every unit b coprime to 93, the sum of their 2-th powers never lands on the 2-th power image [1,4,7,10,16,19,25,28,40,49,64,67,70,76,82] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 93, for EVERY exponent n reducing to 2 — that is n in [4,8,14,16,22] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(93) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 93 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_93_part1](/theorem/coprime_sum_blocked_reduced_2_mod_93_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun b => !([1,4,7,10,16,19,25,28,40,49,64,67,70,76,82].contains ((pmod a 2 93 + pmod b 2 93) % 93))))
```

### AN OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in [65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92] and every unit b coprime to 93, the sum of their 2-th powers never lands on the 2-th power image [1,4,7,10,16,19,25,28,40,49,64,67,70,76,82] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 93, for EVERY exponent n reducing to 2 — that is n in [4,8,14,16,22] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(93) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 93 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_93_part2](/theorem/coprime_sum_blocked_reduced_2_mod_93_part2) — proven `by decide`, sorry-free:

```lean
[65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun b => !([1,4,7,10,16,19,25,28,40,49,64,67,70,76,82].contains ((pmod a 2 93 + pmod b 2 93) % 93))))
```

### NO OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 1^3 = 20^3 (mod 93), with all three coprime to 93, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 3 — that is n in [3,9,21] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_3_mod_93](/theorem/coprime_sum_open_reduced_3_mod_93) — proven `by decide`, sorry-free:

```lean
(pmod 1 3 93 + pmod 1 3 93) % 93 = pmod 20 3 93
```

### NO OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 5 — the control, and it fires. 1^5 + 7^5 = 11^5 (mod 93), with all three coprime to 93, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 5 — that is n in [5] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_5_mod_93](/theorem/coprime_sum_open_reduced_5_mod_93) — proven `by decide`, sorry-free:

```lean
(pmod 1 5 93 + pmod 7 5 93) % 93 = pmod 11 5 93
```

### THE IMAGE, PINNED, AT MODULUS 93 AND REDUCED EXPONENT 6. The 60 units raise to exactly the 5 value(s) [1,4,16,64,70] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_93](/theorem/power_image_exact_reduced_6_mod_93) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun a => [1,4,16,64,70].contains (pmod a 6 93))) ∧ ([1,4,16,64,70].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].any (fun a => pmod a 6 93 == v)))
```

### AN OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 6 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64] and every unit b coprime to 93, the sum of their 6-th powers never lands on the 6-th power image [1,4,16,64,70] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 93, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(93) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 93 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_93_part1](/theorem/coprime_sum_blocked_reduced_6_mod_93_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun b => !([1,4,16,64,70].contains ((pmod a 6 93 + pmod b 6 93) % 93))))
```

### AN OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 6 — part 2 of 2. For every unit a in [65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92] and every unit b coprime to 93, the sum of their 6-th powers never lands on the 6-th power image [1,4,16,64,70] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 93, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(93) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 93 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_93_part2](/theorem/coprime_sum_blocked_reduced_6_mod_93_part2) — proven `by decide`, sorry-free:

```lean
[65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun b => !([1,4,16,64,70].contains ((pmod a 6 93 + pmod b 6 93) % 93))))
```

### THE IMAGE, PINNED, AT MODULUS 93 AND REDUCED EXPONENT 10. The 60 units raise to exactly the 3 value(s) [1,25,67] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_93](/theorem/power_image_exact_reduced_10_mod_93) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun a => [1,25,67].contains (pmod a 10 93))) ∧ ([1,25,67].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].any (fun a => pmod a 10 93 == v)))
```

### AN OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 10 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64] and every unit b coprime to 93, the sum of their 10-th powers never lands on the 10-th power image [1,25,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 93, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(93) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 93 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_93_part1](/theorem/coprime_sum_blocked_reduced_10_mod_93_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun b => !([1,25,67].contains ((pmod a 10 93 + pmod b 10 93) % 93))))
```

### AN OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 10 — part 2 of 2. For every unit a in [65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92] and every unit b coprime to 93, the sum of their 10-th powers never lands on the 10-th power image [1,25,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 93, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(93) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 93 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_93_part2](/theorem/coprime_sum_blocked_reduced_10_mod_93_part2) — proven `by decide`, sorry-free:

```lean
[65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun b => !([1,25,67].contains ((pmod a 10 93 + pmod b 10 93) % 93))))
```

### THE IMAGE, PINNED, AT MODULUS 93 AND REDUCED EXPONENT 15. The 60 units raise to exactly the 4 value(s) [1,32,61,92] — every unit's 15-th power is in that list, and every entry of the list is some unit's 15-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_15_mod_93](/theorem/power_image_exact_reduced_15_mod_93) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun a => [1,32,61,92].contains (pmod a 15 93))) ∧ ([1,32,61,92].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].any (fun a => pmod a 15 93 == v)))
```

### AN OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 15 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64] and every unit b coprime to 93, the sum of their 15-th powers never lands on the 15-th power image [1,32,61,92] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 93, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(93) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 93 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_15_mod_93_part1](/theorem/coprime_sum_blocked_reduced_15_mod_93_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun b => !([1,32,61,92].contains ((pmod a 15 93 + pmod b 15 93) % 93))))
```

### AN OBSTRUCTION AT MODULUS 93, REDUCED EXPONENT 15 — part 2 of 2. For every unit a in [65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92] and every unit b coprime to 93, the sum of their 15-th powers never lands on the 15-th power image [1,32,61,92] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 93, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(93) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 93 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_15_mod_93_part2](/theorem/coprime_sum_blocked_reduced_15_mod_93_part2) — proven `by decide`, sorry-free:

```lean
[65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86,88,89,91,92].all (fun b => !([1,32,61,92].contains ((pmod a 15 93 + pmod b 15 93) % 93))))
```

### THE ORDER STRUCTURE AT MODULUS 114. The 36 residues coprime to 114 are all killed by the exponent 18 — a^18 = 1 for every unit a — and no proper divisor of 18 kills them all (all 5 of them checked). So 18 is the exponent of (Z/114)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 18), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_114](/theorem/unit_group_exponent_mod_114) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => pmod a 18 114 == 1)) ∧ ([1,2,3,6,9].all (fun k => !([1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => pmod a k 114 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 114 AND REDUCED EXPONENT 1. The 36 units raise to exactly the 36 value(s) [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_114](/theorem/power_image_exact_reduced_1_mod_114) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].contains (pmod a 1 114))) ∧ ([1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun v => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].any (fun a => pmod a 1 114 == v)))
```

### AN OBSTRUCTION AT MODULUS 114, REDUCED EXPONENT 1. For every unit a in [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113] and every unit b coprime to 114, the sum of their 1-th powers never lands on the 1-th power image [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 114, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 114 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_114](/theorem/coprime_sum_blocked_reduced_1_mod_114) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun b => !([1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].contains ((pmod a 1 114 + pmod b 1 114) % 114))))
```

### THE IMAGE, PINNED, AT MODULUS 114 AND REDUCED EXPONENT 2. The 36 units raise to exactly the 9 value(s) [1,7,25,43,49,55,61,73,85] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_114](/theorem/power_image_exact_reduced_2_mod_114) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,7,25,43,49,55,61,73,85].contains (pmod a 2 114))) ∧ ([1,7,25,43,49,55,61,73,85].all (fun v => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].any (fun a => pmod a 2 114 == v)))
```

### AN OBSTRUCTION AT MODULUS 114, REDUCED EXPONENT 2. For every unit a in [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113] and every unit b coprime to 114, the sum of their 2-th powers never lands on the 2-th power image [1,7,25,43,49,55,61,73,85] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 114, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 114 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_114](/theorem/coprime_sum_blocked_reduced_2_mod_114) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun b => !([1,7,25,43,49,55,61,73,85].contains ((pmod a 2 114 + pmod b 2 114) % 114))))
```

### THE IMAGE, PINNED, AT MODULUS 114 AND REDUCED EXPONENT 3. The 36 units raise to exactly the 12 value(s) [1,7,11,31,37,49,65,77,83,103,107,113] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_114](/theorem/power_image_exact_reduced_3_mod_114) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,7,11,31,37,49,65,77,83,103,107,113].contains (pmod a 3 114))) ∧ ([1,7,11,31,37,49,65,77,83,103,107,113].all (fun v => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].any (fun a => pmod a 3 114 == v)))
```

### AN OBSTRUCTION AT MODULUS 114, REDUCED EXPONENT 3. For every unit a in [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113] and every unit b coprime to 114, the sum of their 3-th powers never lands on the 3-th power image [1,7,11,31,37,49,65,77,83,103,107,113] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 114, for EVERY exponent n reducing to 3 — that is n in [3,15,21] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 114 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_114](/theorem/coprime_sum_blocked_reduced_3_mod_114) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun b => !([1,7,11,31,37,49,65,77,83,103,107,113].contains ((pmod a 3 114 + pmod b 3 114) % 114))))
```

### THE IMAGE, PINNED, AT MODULUS 114 AND REDUCED EXPONENT 6. The 36 units raise to exactly the 3 value(s) [1,7,49] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_114](/theorem/power_image_exact_reduced_6_mod_114) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,7,49].contains (pmod a 6 114))) ∧ ([1,7,49].all (fun v => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].any (fun a => pmod a 6 114 == v)))
```

### AN OBSTRUCTION AT MODULUS 114, REDUCED EXPONENT 6. For every unit a in [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113] and every unit b coprime to 114, the sum of their 6-th powers never lands on the 6-th power image [1,7,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 114, for EVERY exponent n reducing to 6 — that is n in [6,12] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 114 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_114](/theorem/coprime_sum_blocked_reduced_6_mod_114) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun b => !([1,7,49].contains ((pmod a 6 114 + pmod b 6 114) % 114))))
```

### THE IMAGE, PINNED, AT MODULUS 114 AND REDUCED EXPONENT 9. The 36 units raise to exactly the 4 value(s) [1,37,77,113] — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_9_mod_114](/theorem/power_image_exact_reduced_9_mod_114) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,37,77,113].contains (pmod a 9 114))) ∧ ([1,37,77,113].all (fun v => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].any (fun a => pmod a 9 114 == v)))
```

### AN OBSTRUCTION AT MODULUS 114, REDUCED EXPONENT 9. For every unit a in [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113] and every unit b coprime to 114, the sum of their 9-th powers never lands on the 9-th power image [1,37,77,113] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 114, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 114 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_9_mod_114](/theorem/coprime_sum_blocked_reduced_9_mod_114) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun b => !([1,37,77,113].contains ((pmod a 9 114 + pmod b 9 114) % 114))))
```

### THE IMAGE, PINNED, AT MODULUS 114 AND REDUCED EXPONENT 18. The 36 units raise to exactly the 1 value(s) [1] — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_18_mod_114](/theorem/power_image_exact_reduced_18_mod_114) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1].contains (pmod a 18 114))) ∧ ([1].all (fun v => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].any (fun a => pmod a 18 114 == v)))
```

### AN OBSTRUCTION AT MODULUS 114, REDUCED EXPONENT 18. For every unit a in [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113] and every unit b coprime to 114, the sum of their 18-th powers never lands on the 18-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 114, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 114 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_18_mod_114](/theorem/coprime_sum_blocked_reduced_18_mod_114) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun a => [1,5,7,11,13,17,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,97,101,103,107,109,113].all (fun b => !([1].contains ((pmod a 18 114 + pmod b 18 114) % 114))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 7 OF 21 — moduli 9, 30, 51, 72, 93, 114, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_9](/theorem/unit_group_exponent_mod_9) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
