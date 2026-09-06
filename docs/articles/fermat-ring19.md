---
title: "The congruence survey, ring 19"
description: "Computed from lean/FermatRing19.lean — 55 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 19

> THE CONGRUENCE SURVEY, RING 19 OF 21 — moduli 21, 42, 63, 84, 105, 126, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_21](/theorem/unit_group_exponent_mod_21) and its 54 siblings below.

**55 theorems**, from [unit_group_exponent_mod_21](/theorem/unit_group_exponent_mod_21) onward, each proven `by decide` in <a href="/lean/FermatRing19.lean">lean/FermatRing19.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 32 of its 55 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_21](/theorem/unit_group_exponent_mod_21). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing19.lean)** — nothing to install. The editor fetches `lean/FermatRing19.lean` from the repository and re-decides all 55 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 21. The 12 residues coprime to 21 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/21)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_21](/theorem/unit_group_exponent_mod_21) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,8,10,11,13,16,17,19,20].all (fun a => pmod a 6 21 == 1)) ∧ ([1,2,3].all (fun k => !([1,2,4,5,8,10,11,13,16,17,19,20].all (fun a => pmod a k 21 == 1))))
```

### NO OBSTRUCTION AT MODULUS 21, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 21), with all three coprime to 21, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_21](/theorem/coprime_sum_open_reduced_1_mod_21) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 21 + pmod 1 1 21) % 21 = pmod 2 1 21
```

### THE IMAGE, PINNED, AT MODULUS 21 AND REDUCED EXPONENT 2. The 12 units raise to exactly the 3 value(s) [1,4,16] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_21](/theorem/power_image_exact_reduced_2_mod_21) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,8,10,11,13,16,17,19,20].all (fun a => [1,4,16].contains (pmod a 2 21))) ∧ ([1,4,16].all (fun v => [1,2,4,5,8,10,11,13,16,17,19,20].any (fun a => pmod a 2 21 == v)))
```

### AN OBSTRUCTION AT MODULUS 21, REDUCED EXPONENT 2. For every unit a in [1,2,4,5,8,10,11,13,16,17,19,20] and every unit b coprime to 21, the sum of their 2-th powers never lands on the 2-th power image [1,4,16] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 21, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 21 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_21](/theorem/coprime_sum_blocked_reduced_2_mod_21) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,8,10,11,13,16,17,19,20].all (fun a => [1,2,4,5,8,10,11,13,16,17,19,20].all (fun b => !([1,4,16].contains ((pmod a 2 21 + pmod b 2 21) % 21))))
```

### THE IMAGE, PINNED, AT MODULUS 21 AND REDUCED EXPONENT 3. The 12 units raise to exactly the 4 value(s) [1,8,13,20] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_21](/theorem/power_image_exact_reduced_3_mod_21) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,8,10,11,13,16,17,19,20].all (fun a => [1,8,13,20].contains (pmod a 3 21))) ∧ ([1,8,13,20].all (fun v => [1,2,4,5,8,10,11,13,16,17,19,20].any (fun a => pmod a 3 21 == v)))
```

### AN OBSTRUCTION AT MODULUS 21, REDUCED EXPONENT 3. For every unit a in [1,2,4,5,8,10,11,13,16,17,19,20] and every unit b coprime to 21, the sum of their 3-th powers never lands on the 3-th power image [1,8,13,20] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 21, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 21 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_21](/theorem/coprime_sum_blocked_reduced_3_mod_21) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,8,10,11,13,16,17,19,20].all (fun a => [1,2,4,5,8,10,11,13,16,17,19,20].all (fun b => !([1,8,13,20].contains ((pmod a 3 21 + pmod b 3 21) % 21))))
```

### THE IMAGE, PINNED, AT MODULUS 21 AND REDUCED EXPONENT 6. The 12 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_21](/theorem/power_image_exact_reduced_6_mod_21) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,8,10,11,13,16,17,19,20].all (fun a => [1].contains (pmod a 6 21))) ∧ ([1].all (fun v => [1,2,4,5,8,10,11,13,16,17,19,20].any (fun a => pmod a 6 21 == v)))
```

### AN OBSTRUCTION AT MODULUS 21, REDUCED EXPONENT 6. For every unit a in [1,2,4,5,8,10,11,13,16,17,19,20] and every unit b coprime to 21, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 21, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 21 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_21](/theorem/coprime_sum_blocked_reduced_6_mod_21) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,8,10,11,13,16,17,19,20].all (fun a => [1,2,4,5,8,10,11,13,16,17,19,20].all (fun b => !([1].contains ((pmod a 6 21 + pmod b 6 21) % 21))))
```

### THE ORDER STRUCTURE AT MODULUS 42. The 12 residues coprime to 42 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/42)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_42](/theorem/unit_group_exponent_mod_42) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41].all (fun a => pmod a 6 42 == 1)) ∧ ([1,2,3].all (fun k => !([1,5,11,13,17,19,23,25,29,31,37,41].all (fun a => pmod a k 42 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 42 AND REDUCED EXPONENT 1. The 12 units raise to exactly the 12 value(s) [1,5,11,13,17,19,23,25,29,31,37,41] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_42](/theorem/power_image_exact_reduced_1_mod_42) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41].contains (pmod a 1 42))) ∧ ([1,5,11,13,17,19,23,25,29,31,37,41].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41].any (fun a => pmod a 1 42 == v)))
```

### AN OBSTRUCTION AT MODULUS 42, REDUCED EXPONENT 1. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41] and every unit b coprime to 42, the sum of their 1-th powers never lands on the 1-th power image [1,5,11,13,17,19,23,25,29,31,37,41] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 42, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 42 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_42](/theorem/coprime_sum_blocked_reduced_1_mod_42) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41].all (fun b => !([1,5,11,13,17,19,23,25,29,31,37,41].contains ((pmod a 1 42 + pmod b 1 42) % 42))))
```

### THE IMAGE, PINNED, AT MODULUS 42 AND REDUCED EXPONENT 2. The 12 units raise to exactly the 3 value(s) [1,25,37] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_42](/theorem/power_image_exact_reduced_2_mod_42) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41].all (fun a => [1,25,37].contains (pmod a 2 42))) ∧ ([1,25,37].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41].any (fun a => pmod a 2 42 == v)))
```

### AN OBSTRUCTION AT MODULUS 42, REDUCED EXPONENT 2. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41] and every unit b coprime to 42, the sum of their 2-th powers never lands on the 2-th power image [1,25,37] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 42, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 42 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_42](/theorem/coprime_sum_blocked_reduced_2_mod_42) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41].all (fun b => !([1,25,37].contains ((pmod a 2 42 + pmod b 2 42) % 42))))
```

### THE IMAGE, PINNED, AT MODULUS 42 AND REDUCED EXPONENT 3. The 12 units raise to exactly the 4 value(s) [1,13,29,41] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_42](/theorem/power_image_exact_reduced_3_mod_42) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41].all (fun a => [1,13,29,41].contains (pmod a 3 42))) ∧ ([1,13,29,41].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41].any (fun a => pmod a 3 42 == v)))
```

### AN OBSTRUCTION AT MODULUS 42, REDUCED EXPONENT 3. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41] and every unit b coprime to 42, the sum of their 3-th powers never lands on the 3-th power image [1,13,29,41] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 42, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 42 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_42](/theorem/coprime_sum_blocked_reduced_3_mod_42) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41].all (fun b => !([1,13,29,41].contains ((pmod a 3 42 + pmod b 3 42) % 42))))
```

### THE IMAGE, PINNED, AT MODULUS 42 AND REDUCED EXPONENT 6. The 12 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_42](/theorem/power_image_exact_reduced_6_mod_42) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41].all (fun a => [1].contains (pmod a 6 42))) ∧ ([1].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41].any (fun a => pmod a 6 42 == v)))
```

### AN OBSTRUCTION AT MODULUS 42, REDUCED EXPONENT 6. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41] and every unit b coprime to 42, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 42, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 42 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_42](/theorem/coprime_sum_blocked_reduced_6_mod_42) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41].all (fun b => !([1].contains ((pmod a 6 42 + pmod b 6 42) % 42))))
```

### THE ORDER STRUCTURE AT MODULUS 63. The 36 residues coprime to 63 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/63)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_63](/theorem/unit_group_exponent_mod_63) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun a => pmod a 6 63 == 1)) ∧ ([1,2,3].all (fun k => !([1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun a => pmod a k 63 == 1))))
```

### NO OBSTRUCTION AT MODULUS 63, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 63), with all three coprime to 63, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_63](/theorem/coprime_sum_open_reduced_1_mod_63) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 63 + pmod 1 1 63) % 63 = pmod 2 1 63
```

### THE IMAGE, PINNED, AT MODULUS 63 AND REDUCED EXPONENT 2. The 36 units raise to exactly the 9 value(s) [1,4,16,22,25,37,43,46,58] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_63](/theorem/power_image_exact_reduced_2_mod_63) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun a => [1,4,16,22,25,37,43,46,58].contains (pmod a 2 63))) ∧ ([1,4,16,22,25,37,43,46,58].all (fun v => [1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].any (fun a => pmod a 2 63 == v)))
```

### AN OBSTRUCTION AT MODULUS 63, REDUCED EXPONENT 2. For every unit a in [1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62] and every unit b coprime to 63, the sum of their 2-th powers never lands on the 2-th power image [1,4,16,22,25,37,43,46,58] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 63, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 63 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_63](/theorem/coprime_sum_blocked_reduced_2_mod_63) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun a => [1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun b => !([1,4,16,22,25,37,43,46,58].contains ((pmod a 2 63 + pmod b 2 63) % 63))))
```

### THE IMAGE, PINNED, AT MODULUS 63 AND REDUCED EXPONENT 3. The 36 units raise to exactly the 4 value(s) [1,8,55,62] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_63](/theorem/power_image_exact_reduced_3_mod_63) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun a => [1,8,55,62].contains (pmod a 3 63))) ∧ ([1,8,55,62].all (fun v => [1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].any (fun a => pmod a 3 63 == v)))
```

### AN OBSTRUCTION AT MODULUS 63, REDUCED EXPONENT 3. For every unit a in [1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62] and every unit b coprime to 63, the sum of their 3-th powers never lands on the 3-th power image [1,8,55,62] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 63, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 63 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_63](/theorem/coprime_sum_blocked_reduced_3_mod_63) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun a => [1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun b => !([1,8,55,62].contains ((pmod a 3 63 + pmod b 3 63) % 63))))
```

### THE IMAGE, PINNED, AT MODULUS 63 AND REDUCED EXPONENT 6. The 36 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_63](/theorem/power_image_exact_reduced_6_mod_63) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun a => [1].contains (pmod a 6 63))) ∧ ([1].all (fun v => [1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].any (fun a => pmod a 6 63 == v)))
```

### AN OBSTRUCTION AT MODULUS 63, REDUCED EXPONENT 6. For every unit a in [1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62] and every unit b coprime to 63, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 63, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 63 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_63](/theorem/coprime_sum_blocked_reduced_6_mod_63) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun a => [1,2,4,5,8,10,11,13,16,17,19,20,22,23,25,26,29,31,32,34,37,38,40,41,43,44,46,47,50,52,53,55,58,59,61,62].all (fun b => !([1].contains ((pmod a 6 63 + pmod b 6 63) % 63))))
```

### THE ORDER STRUCTURE AT MODULUS 84. The 24 residues coprime to 84 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/84)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_84](/theorem/unit_group_exponent_mod_84) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun a => pmod a 6 84 == 1)) ∧ ([1,2,3].all (fun k => !([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun a => pmod a k 84 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 84 AND REDUCED EXPONENT 1. The 24 units raise to exactly the 24 value(s) [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_84](/theorem/power_image_exact_reduced_1_mod_84) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].contains (pmod a 1 84))) ∧ ([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].any (fun a => pmod a 1 84 == v)))
```

### AN OBSTRUCTION AT MODULUS 84, REDUCED EXPONENT 1. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83] and every unit b coprime to 84, the sum of their 1-th powers never lands on the 1-th power image [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 84, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 84 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_84](/theorem/coprime_sum_blocked_reduced_1_mod_84) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun b => !([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].contains ((pmod a 1 84 + pmod b 1 84) % 84))))
```

### THE IMAGE, PINNED, AT MODULUS 84 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 3 value(s) [1,25,37] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_84](/theorem/power_image_exact_reduced_2_mod_84) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun a => [1,25,37].contains (pmod a 2 84))) ∧ ([1,25,37].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].any (fun a => pmod a 2 84 == v)))
```

### AN OBSTRUCTION AT MODULUS 84, REDUCED EXPONENT 2. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83] and every unit b coprime to 84, the sum of their 2-th powers never lands on the 2-th power image [1,25,37] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 84, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 84 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_84](/theorem/coprime_sum_blocked_reduced_2_mod_84) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun b => !([1,25,37].contains ((pmod a 2 84 + pmod b 2 84) % 84))))
```

### THE IMAGE, PINNED, AT MODULUS 84 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s) [1,13,29,41,43,55,71,83] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_84](/theorem/power_image_exact_reduced_3_mod_84) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun a => [1,13,29,41,43,55,71,83].contains (pmod a 3 84))) ∧ ([1,13,29,41,43,55,71,83].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].any (fun a => pmod a 3 84 == v)))
```

### AN OBSTRUCTION AT MODULUS 84, REDUCED EXPONENT 3. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83] and every unit b coprime to 84, the sum of their 3-th powers never lands on the 3-th power image [1,13,29,41,43,55,71,83] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 84, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 84 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_84](/theorem/coprime_sum_blocked_reduced_3_mod_84) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun b => !([1,13,29,41,43,55,71,83].contains ((pmod a 3 84 + pmod b 3 84) % 84))))
```

### THE IMAGE, PINNED, AT MODULUS 84 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_84](/theorem/power_image_exact_reduced_6_mod_84) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun a => [1].contains (pmod a 6 84))) ∧ ([1].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].any (fun a => pmod a 6 84 == v)))
```

### AN OBSTRUCTION AT MODULUS 84, REDUCED EXPONENT 6. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83] and every unit b coprime to 84, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 84, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 84 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_84](/theorem/coprime_sum_blocked_reduced_6_mod_84) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83].all (fun b => !([1].contains ((pmod a 6 84 + pmod b 6 84) % 84))))
```

### THE ORDER STRUCTURE AT MODULUS 105. The 48 residues coprime to 105 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/105)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_105](/theorem/unit_group_exponent_mod_105) — proven `by decide`, sorry-free:

```lean
([1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => pmod a 12 105 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => pmod a k 105 == 1))))
```

### NO OBSTRUCTION AT MODULUS 105, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 105), with all three coprime to 105, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_105](/theorem/coprime_sum_open_reduced_1_mod_105) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 105 + pmod 1 1 105) % 105 = pmod 2 1 105
```

### THE IMAGE, PINNED, AT MODULUS 105 AND REDUCED EXPONENT 2. The 48 units raise to exactly the 6 value(s) [1,4,16,46,64,79] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_105](/theorem/power_image_exact_reduced_2_mod_105) — proven `by decide`, sorry-free:

```lean
([1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => [1,4,16,46,64,79].contains (pmod a 2 105))) ∧ ([1,4,16,46,64,79].all (fun v => [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].any (fun a => pmod a 2 105 == v)))
```

### AN OBSTRUCTION AT MODULUS 105, REDUCED EXPONENT 2. For every unit a in [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104] and every unit b coprime to 105, the sum of their 2-th powers never lands on the 2-th power image [1,4,16,46,64,79] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 105, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 105 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_105](/theorem/coprime_sum_blocked_reduced_2_mod_105) — proven `by decide`, sorry-free:

```lean
[1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun b => !([1,4,16,46,64,79].contains ((pmod a 2 105 + pmod b 2 105) % 105))))
```

### THE IMAGE, PINNED, AT MODULUS 105 AND REDUCED EXPONENT 3. The 48 units raise to exactly the 16 value(s) [1,8,13,22,29,34,41,43,62,64,71,76,83,92,97,104] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_105](/theorem/power_image_exact_reduced_3_mod_105) — proven `by decide`, sorry-free:

```lean
([1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => [1,8,13,22,29,34,41,43,62,64,71,76,83,92,97,104].contains (pmod a 3 105))) ∧ ([1,8,13,22,29,34,41,43,62,64,71,76,83,92,97,104].all (fun v => [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].any (fun a => pmod a 3 105 == v)))
```

### AN OBSTRUCTION AT MODULUS 105, REDUCED EXPONENT 3. For every unit a in [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104] and every unit b coprime to 105, the sum of their 3-th powers never lands on the 3-th power image [1,8,13,22,29,34,41,43,62,64,71,76,83,92,97,104] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 105, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 105 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_105](/theorem/coprime_sum_blocked_reduced_3_mod_105) — proven `by decide`, sorry-free:

```lean
[1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun b => !([1,8,13,22,29,34,41,43,62,64,71,76,83,92,97,104].contains ((pmod a 3 105 + pmod b 3 105) % 105))))
```

### THE IMAGE, PINNED, AT MODULUS 105 AND REDUCED EXPONENT 4. The 48 units raise to exactly the 3 value(s) [1,16,46] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_105](/theorem/power_image_exact_reduced_4_mod_105) — proven `by decide`, sorry-free:

```lean
([1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => [1,16,46].contains (pmod a 4 105))) ∧ ([1,16,46].all (fun v => [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].any (fun a => pmod a 4 105 == v)))
```

### AN OBSTRUCTION AT MODULUS 105, REDUCED EXPONENT 4. For every unit a in [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104] and every unit b coprime to 105, the sum of their 4-th powers never lands on the 4-th power image [1,16,46] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 105, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 105 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_105](/theorem/coprime_sum_blocked_reduced_4_mod_105) — proven `by decide`, sorry-free:

```lean
[1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun b => !([1,16,46].contains ((pmod a 4 105 + pmod b 4 105) % 105))))
```

### THE IMAGE, PINNED, AT MODULUS 105 AND REDUCED EXPONENT 6. The 48 units raise to exactly the 2 value(s) [1,64] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_105](/theorem/power_image_exact_reduced_6_mod_105) — proven `by decide`, sorry-free:

```lean
([1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => [1,64].contains (pmod a 6 105))) ∧ ([1,64].all (fun v => [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].any (fun a => pmod a 6 105 == v)))
```

### AN OBSTRUCTION AT MODULUS 105, REDUCED EXPONENT 6. For every unit a in [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104] and every unit b coprime to 105, the sum of their 6-th powers never lands on the 6-th power image [1,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 105, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 105 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_105](/theorem/coprime_sum_blocked_reduced_6_mod_105) — proven `by decide`, sorry-free:

```lean
[1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun b => !([1,64].contains ((pmod a 6 105 + pmod b 6 105) % 105))))
```

### THE IMAGE, PINNED, AT MODULUS 105 AND REDUCED EXPONENT 12. The 48 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_105](/theorem/power_image_exact_reduced_12_mod_105) — proven `by decide`, sorry-free:

```lean
([1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => [1].contains (pmod a 12 105))) ∧ ([1].all (fun v => [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].any (fun a => pmod a 12 105 == v)))
```

### AN OBSTRUCTION AT MODULUS 105, REDUCED EXPONENT 12. For every unit a in [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104] and every unit b coprime to 105, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 105, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 105 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_105](/theorem/coprime_sum_blocked_reduced_12_mod_105) — proven `by decide`, sorry-free:

```lean
[1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun a => [1,2,4,8,11,13,16,17,19,22,23,26,29,31,32,34,37,38,41,43,44,46,47,52,53,58,59,61,62,64,67,68,71,73,74,76,79,82,83,86,88,89,92,94,97,101,103,104].all (fun b => !([1].contains ((pmod a 12 105 + pmod b 12 105) % 105))))
```

### THE ORDER STRUCTURE AT MODULUS 126. The 36 residues coprime to 126 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/126)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_126](/theorem/unit_group_exponent_mod_126) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun a => pmod a 6 126 == 1)) ∧ ([1,2,3].all (fun k => !([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun a => pmod a k 126 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 126 AND REDUCED EXPONENT 1. The 36 units raise to exactly the 36 value(s) [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_126](/theorem/power_image_exact_reduced_1_mod_126) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].contains (pmod a 1 126))) ∧ ([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].any (fun a => pmod a 1 126 == v)))
```

### AN OBSTRUCTION AT MODULUS 126, REDUCED EXPONENT 1. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125] and every unit b coprime to 126, the sum of their 1-th powers never lands on the 1-th power image [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 126, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 126 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_126](/theorem/coprime_sum_blocked_reduced_1_mod_126) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun b => !([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].contains ((pmod a 1 126 + pmod b 1 126) % 126))))
```

### THE IMAGE, PINNED, AT MODULUS 126 AND REDUCED EXPONENT 2. The 36 units raise to exactly the 9 value(s) [1,25,37,43,67,79,85,109,121] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_126](/theorem/power_image_exact_reduced_2_mod_126) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun a => [1,25,37,43,67,79,85,109,121].contains (pmod a 2 126))) ∧ ([1,25,37,43,67,79,85,109,121].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].any (fun a => pmod a 2 126 == v)))
```

### AN OBSTRUCTION AT MODULUS 126, REDUCED EXPONENT 2. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125] and every unit b coprime to 126, the sum of their 2-th powers never lands on the 2-th power image [1,25,37,43,67,79,85,109,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 126, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 126 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_126](/theorem/coprime_sum_blocked_reduced_2_mod_126) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun b => !([1,25,37,43,67,79,85,109,121].contains ((pmod a 2 126 + pmod b 2 126) % 126))))
```

### THE IMAGE, PINNED, AT MODULUS 126 AND REDUCED EXPONENT 3. The 36 units raise to exactly the 4 value(s) [1,55,71,125] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_126](/theorem/power_image_exact_reduced_3_mod_126) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun a => [1,55,71,125].contains (pmod a 3 126))) ∧ ([1,55,71,125].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].any (fun a => pmod a 3 126 == v)))
```

### AN OBSTRUCTION AT MODULUS 126, REDUCED EXPONENT 3. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125] and every unit b coprime to 126, the sum of their 3-th powers never lands on the 3-th power image [1,55,71,125] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 126, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 126 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_126](/theorem/coprime_sum_blocked_reduced_3_mod_126) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun b => !([1,55,71,125].contains ((pmod a 3 126 + pmod b 3 126) % 126))))
```

### THE IMAGE, PINNED, AT MODULUS 126 AND REDUCED EXPONENT 6. The 36 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_126](/theorem/power_image_exact_reduced_6_mod_126) — proven `by decide`, sorry-free:

```lean
([1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun a => [1].contains (pmod a 6 126))) ∧ ([1].all (fun v => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].any (fun a => pmod a 6 126 == v)))
```

### AN OBSTRUCTION AT MODULUS 126, REDUCED EXPONENT 6. For every unit a in [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125] and every unit b coprime to 126, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 126, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 126 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_126](/theorem/coprime_sum_blocked_reduced_6_mod_126) — proven `by decide`, sorry-free:

```lean
[1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun a => [1,5,11,13,17,19,23,25,29,31,37,41,43,47,53,55,59,61,65,67,71,73,79,83,85,89,95,97,101,103,107,109,113,115,121,125].all (fun b => !([1].contains ((pmod a 6 126 + pmod b 6 126) % 126))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 19 OF 21 — moduli 21, 42, 63, 84, 105, 126, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_21](/theorem/unit_group_exponent_mod_21) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
