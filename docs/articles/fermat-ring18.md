---
title: "The congruence survey, ring 18"
description: "Computed from lean/FermatRing18.lean — 78 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 18

> THE CONGRUENCE SURVEY, RING 18 OF 21 — moduli 20, 41, 62, 83, 104, 125, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_20](/theorem/unit_group_exponent_mod_20) and its 77 siblings below.

**78 theorems**, from [unit_group_exponent_mod_20](/theorem/unit_group_exponent_mod_20) onward, each proven `by decide` in <a href="/lean/FermatRing18.lean">lean/FermatRing18.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 52 of its 78 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_20](/theorem/unit_group_exponent_mod_20). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing18.lean)** — nothing to install. The editor fetches `lean/FermatRing18.lean` from the repository and re-decides all 78 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 20. The 8 residues coprime to 20 are all killed by the exponent 4 — a^4 = 1 for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent of (Z/20)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_20](/theorem/unit_group_exponent_mod_20) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19].all (fun a => pmod a 4 20 == 1)) ∧ ([1,2].all (fun k => !([1,3,7,9,11,13,17,19].all (fun a => pmod a k 20 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 20 AND REDUCED EXPONENT 1. The 8 units raise to exactly the 8 value(s) [1,3,7,9,11,13,17,19] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_20](/theorem/power_image_exact_reduced_1_mod_20) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19].all (fun a => [1,3,7,9,11,13,17,19].contains (pmod a 1 20))) ∧ ([1,3,7,9,11,13,17,19].all (fun v => [1,3,7,9,11,13,17,19].any (fun a => pmod a 1 20 == v)))
```

### AN OBSTRUCTION AT MODULUS 20, REDUCED EXPONENT 1. For every unit a in [1,3,7,9,11,13,17,19] and every unit b coprime to 20, the sum of their 1-th powers never lands on the 1-th power image [1,3,7,9,11,13,17,19] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 20, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 20 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_20](/theorem/coprime_sum_blocked_reduced_1_mod_20) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,11,13,17,19].all (fun a => [1,3,7,9,11,13,17,19].all (fun b => !([1,3,7,9,11,13,17,19].contains ((pmod a 1 20 + pmod b 1 20) % 20))))
```

### THE IMAGE, PINNED, AT MODULUS 20 AND REDUCED EXPONENT 2. The 8 units raise to exactly the 2 value(s) [1,9] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_20](/theorem/power_image_exact_reduced_2_mod_20) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19].all (fun a => [1,9].contains (pmod a 2 20))) ∧ ([1,9].all (fun v => [1,3,7,9,11,13,17,19].any (fun a => pmod a 2 20 == v)))
```

### AN OBSTRUCTION AT MODULUS 20, REDUCED EXPONENT 2. For every unit a in [1,3,7,9,11,13,17,19] and every unit b coprime to 20, the sum of their 2-th powers never lands on the 2-th power image [1,9] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 20, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 20 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_20](/theorem/coprime_sum_blocked_reduced_2_mod_20) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,11,13,17,19].all (fun a => [1,3,7,9,11,13,17,19].all (fun b => !([1,9].contains ((pmod a 2 20 + pmod b 2 20) % 20))))
```

### THE IMAGE, PINNED, AT MODULUS 20 AND REDUCED EXPONENT 4. The 8 units raise to exactly the 1 value(s) [1] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_20](/theorem/power_image_exact_reduced_4_mod_20) — proven `by decide`, sorry-free:

```lean
([1,3,7,9,11,13,17,19].all (fun a => [1].contains (pmod a 4 20))) ∧ ([1].all (fun v => [1,3,7,9,11,13,17,19].any (fun a => pmod a 4 20 == v)))
```

### AN OBSTRUCTION AT MODULUS 20, REDUCED EXPONENT 4. For every unit a in [1,3,7,9,11,13,17,19] and every unit b coprime to 20, the sum of their 4-th powers never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 20, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 20 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_20](/theorem/coprime_sum_blocked_reduced_4_mod_20) — proven `by decide`, sorry-free:

```lean
[1,3,7,9,11,13,17,19].all (fun a => [1,3,7,9,11,13,17,19].all (fun b => !([1].contains ((pmod a 4 20 + pmod b 4 20) % 20))))
```

### THE ORDER STRUCTURE AT MODULUS 41. The 40 residues coprime to 41 are all killed by the exponent 40 — a^40 = 1 for every unit a — and no proper divisor of 40 kills them all (all 7 of them checked). So 40 is the exponent of (Z/41)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 40), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_41](/theorem/unit_group_exponent_mod_41) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => pmod a 40 41 == 1)) ∧ ([1,2,4,5,8,10,20].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => pmod a k 41 == 1))))
```

### NO OBSTRUCTION AT MODULUS 41, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 41), with all three coprime to 41, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_41](/theorem/coprime_sum_open_reduced_1_mod_41) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 41 + pmod 1 1 41) % 41 = pmod 2 1 41
```

### NO OBSTRUCTION AT MODULUS 41, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 17^2 (mod 41), with all three coprime to 41, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [6,14,18,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_41](/theorem/coprime_sum_open_reduced_2_mod_41) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 41 + pmod 1 2 41) % 41 = pmod 17 2 41
```

### THE IMAGE, PINNED, AT MODULUS 41 AND REDUCED EXPONENT 4. The 40 units raise to exactly the 10 value(s) [1,4,10,16,18,23,25,31,37,40] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_41](/theorem/power_image_exact_reduced_4_mod_41) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => [1,4,10,16,18,23,25,31,37,40].contains (pmod a 4 41))) ∧ ([1,4,10,16,18,23,25,31,37,40].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].any (fun a => pmod a 4 41 == v)))
```

### AN OBSTRUCTION AT MODULUS 41, REDUCED EXPONENT 4. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40] and every unit b coprime to 41, the sum of their 4-th powers never lands on the 4-th power image [1,4,10,16,18,23,25,31,37,40] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 41, for EVERY exponent n reducing to 4 — that is n in [4,12] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 41 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_41](/theorem/coprime_sum_blocked_reduced_4_mod_41) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun b => !([1,4,10,16,18,23,25,31,37,40].contains ((pmod a 4 41 + pmod b 4 41) % 41))))
```

### THE IMAGE, PINNED, AT MODULUS 41 AND REDUCED EXPONENT 5. The 40 units raise to exactly the 8 value(s) [1,3,9,14,27,32,38,40] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_41](/theorem/power_image_exact_reduced_5_mod_41) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => [1,3,9,14,27,32,38,40].contains (pmod a 5 41))) ∧ ([1,3,9,14,27,32,38,40].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].any (fun a => pmod a 5 41 == v)))
```

### AN OBSTRUCTION AT MODULUS 41, REDUCED EXPONENT 5. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40] and every unit b coprime to 41, the sum of their 5-th powers never lands on the 5-th power image [1,3,9,14,27,32,38,40] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 41, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 41 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_41](/theorem/coprime_sum_blocked_reduced_5_mod_41) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun b => !([1,3,9,14,27,32,38,40].contains ((pmod a 5 41 + pmod b 5 41) % 41))))
```

### THE IMAGE, PINNED, AT MODULUS 41 AND REDUCED EXPONENT 8. The 40 units raise to exactly the 5 value(s) [1,10,16,18,37] — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_8_mod_41](/theorem/power_image_exact_reduced_8_mod_41) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => [1,10,16,18,37].contains (pmod a 8 41))) ∧ ([1,10,16,18,37].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].any (fun a => pmod a 8 41 == v)))
```

### AN OBSTRUCTION AT MODULUS 41, REDUCED EXPONENT 8. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40] and every unit b coprime to 41, the sum of their 8-th powers never lands on the 8-th power image [1,10,16,18,37] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 41, for EVERY exponent n reducing to 8 — that is n in [8,16] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 41 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_41](/theorem/coprime_sum_blocked_reduced_8_mod_41) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun b => !([1,10,16,18,37].contains ((pmod a 8 41 + pmod b 8 41) % 41))))
```

### THE IMAGE, PINNED, AT MODULUS 41 AND REDUCED EXPONENT 10. The 40 units raise to exactly the 4 value(s) [1,9,32,40] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_41](/theorem/power_image_exact_reduced_10_mod_41) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => [1,9,32,40].contains (pmod a 10 41))) ∧ ([1,9,32,40].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].any (fun a => pmod a 10 41 == v)))
```

### AN OBSTRUCTION AT MODULUS 41, REDUCED EXPONENT 10. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40] and every unit b coprime to 41, the sum of their 10-th powers never lands on the 10-th power image [1,9,32,40] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 41, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 41 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_41](/theorem/coprime_sum_blocked_reduced_10_mod_41) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun b => !([1,9,32,40].contains ((pmod a 10 41 + pmod b 10 41) % 41))))
```

### THE IMAGE, PINNED, AT MODULUS 41 AND REDUCED EXPONENT 20. The 40 units raise to exactly the 2 value(s) [1,40] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_20_mod_41](/theorem/power_image_exact_reduced_20_mod_41) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => [1,40].contains (pmod a 20 41))) ∧ ([1,40].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].any (fun a => pmod a 20 41 == v)))
```

### AN OBSTRUCTION AT MODULUS 41, REDUCED EXPONENT 20. For every unit a in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40] and every unit b coprime to 41, the sum of their 20-th powers never lands on the 20-th power image [1,40] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 41, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 41 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_41](/theorem/coprime_sum_blocked_reduced_20_mod_41) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40].all (fun b => !([1,40].contains ((pmod a 20 41 + pmod b 20 41) % 41))))
```

### THE ORDER STRUCTURE AT MODULUS 62. The 30 residues coprime to 62 are all killed by the exponent 30 — a^30 = 1 for every unit a — and no proper divisor of 30 kills them all (all 7 of them checked). So 30 is the exponent of (Z/62)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 30), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_62](/theorem/unit_group_exponent_mod_62) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => pmod a 30 62 == 1)) ∧ ([1,2,3,5,6,10,15].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => pmod a k 62 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 62 AND REDUCED EXPONENT 1. The 30 units raise to exactly the 30 value(s) [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_62](/theorem/power_image_exact_reduced_1_mod_62) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].contains (pmod a 1 62))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].any (fun a => pmod a 1 62 == v)))
```

### AN OBSTRUCTION AT MODULUS 62, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61] and every unit b coprime to 62, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 62, for EVERY exponent n reducing to 1 — that is n in [7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 62 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_62](/theorem/coprime_sum_blocked_reduced_1_mod_62) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].contains ((pmod a 1 62 + pmod b 1 62) % 62))))
```

### THE IMAGE, PINNED, AT MODULUS 62 AND REDUCED EXPONENT 2. The 30 units raise to exactly the 15 value(s) [1,5,7,9,19,25,33,35,39,41,45,47,49,51,59] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_62](/theorem/power_image_exact_reduced_2_mod_62) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,5,7,9,19,25,33,35,39,41,45,47,49,51,59].contains (pmod a 2 62))) ∧ ([1,5,7,9,19,25,33,35,39,41,45,47,49,51,59].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].any (fun a => pmod a 2 62 == v)))
```

### AN OBSTRUCTION AT MODULUS 62, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61] and every unit b coprime to 62, the sum of their 2-th powers never lands on the 2-th power image [1,5,7,9,19,25,33,35,39,41,45,47,49,51,59] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 62, for EVERY exponent n reducing to 2 — that is n in [4,8,14,16,22] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 62 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_62](/theorem/coprime_sum_blocked_reduced_2_mod_62) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun b => !([1,5,7,9,19,25,33,35,39,41,45,47,49,51,59].contains ((pmod a 2 62 + pmod b 2 62) % 62))))
```

### THE IMAGE, PINNED, AT MODULUS 62 AND REDUCED EXPONENT 3. The 30 units raise to exactly the 10 value(s) [1,15,23,27,29,33,35,39,47,61] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_62](/theorem/power_image_exact_reduced_3_mod_62) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,15,23,27,29,33,35,39,47,61].contains (pmod a 3 62))) ∧ ([1,15,23,27,29,33,35,39,47,61].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].any (fun a => pmod a 3 62 == v)))
```

### AN OBSTRUCTION AT MODULUS 62, REDUCED EXPONENT 3. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61] and every unit b coprime to 62, the sum of their 3-th powers never lands on the 3-th power image [1,15,23,27,29,33,35,39,47,61] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 62, for EVERY exponent n reducing to 3 — that is n in [3,9,21] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 62 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_62](/theorem/coprime_sum_blocked_reduced_3_mod_62) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun b => !([1,15,23,27,29,33,35,39,47,61].contains ((pmod a 3 62 + pmod b 3 62) % 62))))
```

### THE IMAGE, PINNED, AT MODULUS 62 AND REDUCED EXPONENT 5. The 30 units raise to exactly the 6 value(s) [1,5,25,37,57,61] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_62](/theorem/power_image_exact_reduced_5_mod_62) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,5,25,37,57,61].contains (pmod a 5 62))) ∧ ([1,5,25,37,57,61].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].any (fun a => pmod a 5 62 == v)))
```

### AN OBSTRUCTION AT MODULUS 62, REDUCED EXPONENT 5. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61] and every unit b coprime to 62, the sum of their 5-th powers never lands on the 5-th power image [1,5,25,37,57,61] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 62, for EVERY exponent n reducing to 5 — that is n in [5] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 62 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_62](/theorem/coprime_sum_blocked_reduced_5_mod_62) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun b => !([1,5,25,37,57,61].contains ((pmod a 5 62 + pmod b 5 62) % 62))))
```

### THE IMAGE, PINNED, AT MODULUS 62 AND REDUCED EXPONENT 6. The 30 units raise to exactly the 5 value(s) [1,33,35,39,47] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_62](/theorem/power_image_exact_reduced_6_mod_62) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,33,35,39,47].contains (pmod a 6 62))) ∧ ([1,33,35,39,47].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].any (fun a => pmod a 6 62 == v)))
```

### AN OBSTRUCTION AT MODULUS 62, REDUCED EXPONENT 6. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61] and every unit b coprime to 62, the sum of their 6-th powers never lands on the 6-th power image [1,33,35,39,47] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 62, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 62 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_62](/theorem/coprime_sum_blocked_reduced_6_mod_62) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun b => !([1,33,35,39,47].contains ((pmod a 6 62 + pmod b 6 62) % 62))))
```

### THE IMAGE, PINNED, AT MODULUS 62 AND REDUCED EXPONENT 10. The 30 units raise to exactly the 3 value(s) [1,5,25] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_62](/theorem/power_image_exact_reduced_10_mod_62) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,5,25].contains (pmod a 10 62))) ∧ ([1,5,25].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].any (fun a => pmod a 10 62 == v)))
```

### AN OBSTRUCTION AT MODULUS 62, REDUCED EXPONENT 10. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61] and every unit b coprime to 62, the sum of their 10-th powers never lands on the 10-th power image [1,5,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 62, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 62 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_62](/theorem/coprime_sum_blocked_reduced_10_mod_62) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun b => !([1,5,25].contains ((pmod a 10 62 + pmod b 10 62) % 62))))
```

### THE IMAGE, PINNED, AT MODULUS 62 AND REDUCED EXPONENT 15. The 30 units raise to exactly the 2 value(s) [1,61] — every unit's 15-th power is in that list, and every entry of the list is some unit's 15-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_15_mod_62](/theorem/power_image_exact_reduced_15_mod_62) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,61].contains (pmod a 15 62))) ∧ ([1,61].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].any (fun a => pmod a 15 62 == v)))
```

### AN OBSTRUCTION AT MODULUS 62, REDUCED EXPONENT 15. For every unit a in [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61] and every unit b coprime to 62, the sum of their 15-th powers never lands on the 15-th power image [1,61] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 62, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 62 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_15_mod_62](/theorem/coprime_sum_blocked_reduced_15_mod_62) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61].all (fun b => !([1,61].contains ((pmod a 15 62 + pmod b 15 62) % 62))))
```

### THE ORDER STRUCTURE AT MODULUS 83. The 82 residues coprime to 83 are all killed by the exponent 82 — a^82 = 1 for every unit a — and no proper divisor of 82 kills them all (all 3 of them checked). So 82 is the exponent of (Z/83)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 82), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_83](/theorem/unit_group_exponent_mod_83) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82].all (fun a => pmod a 82 83 == 1)) ∧ ([1,2,41].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82].all (fun a => pmod a k 83 == 1))))
```

### NO OBSTRUCTION AT MODULUS 83, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 83), with all three coprime to 83, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_83](/theorem/coprime_sum_open_reduced_1_mod_83) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 83 + pmod 1 1 83) % 83 = pmod 2 1 83
```

### NO OBSTRUCTION AT MODULUS 83, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 3^2 = 33^2 (mod 83), with all three coprime to 83, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_2_mod_83](/theorem/coprime_sum_open_reduced_2_mod_83) — proven `by decide`, sorry-free:

```lean
(pmod 1 2 83 + pmod 3 2 83) % 83 = pmod 33 2 83
```

### THE ORDER STRUCTURE AT MODULUS 104. The 48 residues coprime to 104 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/104)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_104](/theorem/unit_group_exponent_mod_104) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => pmod a 12 104 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => pmod a k 104 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 104 AND REDUCED EXPONENT 1. The 48 units raise to exactly the 48 value(s) [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_104](/theorem/power_image_exact_reduced_1_mod_104) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].contains (pmod a 1 104))) ∧ ([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].any (fun a => pmod a 1 104 == v)))
```

### AN OBSTRUCTION AT MODULUS 104, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103] and every unit b coprime to 104, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 104, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 104 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_104](/theorem/coprime_sum_blocked_reduced_1_mod_104) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun b => !([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].contains ((pmod a 1 104 + pmod b 1 104) % 104))))
```

### THE IMAGE, PINNED, AT MODULUS 104 AND REDUCED EXPONENT 2. The 48 units raise to exactly the 6 value(s) [1,9,17,25,49,81] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_104](/theorem/power_image_exact_reduced_2_mod_104) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,9,17,25,49,81].contains (pmod a 2 104))) ∧ ([1,9,17,25,49,81].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].any (fun a => pmod a 2 104 == v)))
```

### AN OBSTRUCTION AT MODULUS 104, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103] and every unit b coprime to 104, the sum of their 2-th powers never lands on the 2-th power image [1,9,17,25,49,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 104, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 104 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_104](/theorem/coprime_sum_blocked_reduced_2_mod_104) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun b => !([1,9,17,25,49,81].contains ((pmod a 2 104 + pmod b 2 104) % 104))))
```

### THE IMAGE, PINNED, AT MODULUS 104 AND REDUCED EXPONENT 3. The 48 units raise to exactly the 16 value(s) [1,5,21,25,27,31,47,51,53,57,73,77,79,83,99,103] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_104](/theorem/power_image_exact_reduced_3_mod_104) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,5,21,25,27,31,47,51,53,57,73,77,79,83,99,103].contains (pmod a 3 104))) ∧ ([1,5,21,25,27,31,47,51,53,57,73,77,79,83,99,103].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].any (fun a => pmod a 3 104 == v)))
```

### AN OBSTRUCTION AT MODULUS 104, REDUCED EXPONENT 3. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103] and every unit b coprime to 104, the sum of their 3-th powers never lands on the 3-th power image [1,5,21,25,27,31,47,51,53,57,73,77,79,83,99,103] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 104, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 104 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_104](/theorem/coprime_sum_blocked_reduced_3_mod_104) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun b => !([1,5,21,25,27,31,47,51,53,57,73,77,79,83,99,103].contains ((pmod a 3 104 + pmod b 3 104) % 104))))
```

### THE IMAGE, PINNED, AT MODULUS 104 AND REDUCED EXPONENT 4. The 48 units raise to exactly the 3 value(s) [1,9,81] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_104](/theorem/power_image_exact_reduced_4_mod_104) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,9,81].contains (pmod a 4 104))) ∧ ([1,9,81].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].any (fun a => pmod a 4 104 == v)))
```

### AN OBSTRUCTION AT MODULUS 104, REDUCED EXPONENT 4. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103] and every unit b coprime to 104, the sum of their 4-th powers never lands on the 4-th power image [1,9,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 104, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 104 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_104](/theorem/coprime_sum_blocked_reduced_4_mod_104) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun b => !([1,9,81].contains ((pmod a 4 104 + pmod b 4 104) % 104))))
```

### THE IMAGE, PINNED, AT MODULUS 104 AND REDUCED EXPONENT 6. The 48 units raise to exactly the 2 value(s) [1,25] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_104](/theorem/power_image_exact_reduced_6_mod_104) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,25].contains (pmod a 6 104))) ∧ ([1,25].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].any (fun a => pmod a 6 104 == v)))
```

### AN OBSTRUCTION AT MODULUS 104, REDUCED EXPONENT 6. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103] and every unit b coprime to 104, the sum of their 6-th powers never lands on the 6-th power image [1,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 104, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 104 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_104](/theorem/coprime_sum_blocked_reduced_6_mod_104) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun b => !([1,25].contains ((pmod a 6 104 + pmod b 6 104) % 104))))
```

### THE IMAGE, PINNED, AT MODULUS 104 AND REDUCED EXPONENT 12. The 48 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_104](/theorem/power_image_exact_reduced_12_mod_104) — proven `by decide`, sorry-free:

```lean
([1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1].contains (pmod a 12 104))) ∧ ([1].all (fun v => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].any (fun a => pmod a 12 104 == v)))
```

### AN OBSTRUCTION AT MODULUS 104, REDUCED EXPONENT 12. For every unit a in [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103] and every unit b coprime to 104, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 104, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 104 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_104](/theorem/coprime_sum_blocked_reduced_12_mod_104) — proven `by decide`, sorry-free:

```lean
[1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun a => [1,3,5,7,9,11,15,17,19,21,23,25,27,29,31,33,35,37,41,43,45,47,49,51,53,55,57,59,61,63,67,69,71,73,75,77,79,81,83,85,87,89,93,95,97,99,101,103].all (fun b => !([1].contains ((pmod a 12 104 + pmod b 12 104) % 104))))
```

### THE ORDER STRUCTURE AT MODULUS 125. The 100 residues coprime to 125 are all killed by the exponent 100 — a^100 = 1 for every unit a — and no proper divisor of 100 kills them all (all 8 of them checked). So 100 is the exponent of (Z/125)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 100), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_125](/theorem/unit_group_exponent_mod_125) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => pmod a 100 125 == 1)) ∧ ([1,2,4,5,10,20,25,50].all (fun k => !([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => pmod a k 125 == 1))))
```

### NO OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 125), with all three coprime to 125, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_125](/theorem/coprime_sum_open_reduced_1_mod_125) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 125 + pmod 1 1 125) % 125 = pmod 2 1 125
```

### THE IMAGE, PINNED, AT MODULUS 125 AND REDUCED EXPONENT 2. The 100 units raise to exactly the 50 value(s) [1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_125](/theorem/power_image_exact_reduced_2_mod_125) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => [1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124].contains (pmod a 2 125))) ∧ ([1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].any (fun a => pmod a 2 125 == v)))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 2 — part 1 of 4. For every unit a in [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31] and every unit b coprime to 125, the sum of their 2-th powers never lands on the 2-th power image [1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_125_part1](/theorem/coprime_sum_blocked_reduced_2_mod_125_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124].contains ((pmod a 2 125 + pmod b 2 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 2 — part 2 of 4. For every unit a in [32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62] and every unit b coprime to 125, the sum of their 2-th powers never lands on the 2-th power image [1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_125_part2](/theorem/coprime_sum_blocked_reduced_2_mod_125_part2) — proven `by decide`, sorry-free:

```lean
[32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124].contains ((pmod a 2 125 + pmod b 2 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 2 — part 3 of 4. For every unit a in [63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93] and every unit b coprime to 125, the sum of their 2-th powers never lands on the 2-th power image [1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_125_part3](/theorem/coprime_sum_blocked_reduced_2_mod_125_part3) — proven `by decide`, sorry-free:

```lean
[63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124].contains ((pmod a 2 125 + pmod b 2 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 2 — part 4 of 4. For every unit a in [94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124] and every unit b coprime to 125, the sum of their 2-th powers never lands on the 2-th power image [1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_125_part4](/theorem/coprime_sum_blocked_reduced_2_mod_125_part4) — proven `by decide`, sorry-free:

```lean
[94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,4,6,9,11,14,16,19,21,24,26,29,31,34,36,39,41,44,46,49,51,54,56,59,61,64,66,69,71,74,76,79,81,84,86,89,91,94,96,99,101,104,106,109,111,114,116,119,121,124].contains ((pmod a 2 125 + pmod b 2 125) % 125))))
```

### THE IMAGE, PINNED, AT MODULUS 125 AND REDUCED EXPONENT 4. The 100 units raise to exactly the 25 value(s) [1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_125](/theorem/power_image_exact_reduced_4_mod_125) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => [1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121].contains (pmod a 4 125))) ∧ ([1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].any (fun a => pmod a 4 125 == v)))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 4 — part 1 of 4. For every unit a in [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31] and every unit b coprime to 125, the sum of their 4-th powers never lands on the 4-th power image [1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_125_part1](/theorem/coprime_sum_blocked_reduced_4_mod_125_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121].contains ((pmod a 4 125 + pmod b 4 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 4 — part 2 of 4. For every unit a in [32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62] and every unit b coprime to 125, the sum of their 4-th powers never lands on the 4-th power image [1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_125_part2](/theorem/coprime_sum_blocked_reduced_4_mod_125_part2) — proven `by decide`, sorry-free:

```lean
[32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121].contains ((pmod a 4 125 + pmod b 4 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 4 — part 3 of 4. For every unit a in [63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93] and every unit b coprime to 125, the sum of their 4-th powers never lands on the 4-th power image [1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_125_part3](/theorem/coprime_sum_blocked_reduced_4_mod_125_part3) — proven `by decide`, sorry-free:

```lean
[63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121].contains ((pmod a 4 125 + pmod b 4 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 4 — part 4 of 4. For every unit a in [94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124] and every unit b coprime to 125, the sum of their 4-th powers never lands on the 4-th power image [1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_125_part4](/theorem/coprime_sum_blocked_reduced_4_mod_125_part4) — proven `by decide`, sorry-free:

```lean
[94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,6,11,16,21,26,31,36,41,46,51,56,61,66,71,76,81,86,91,96,101,106,111,116,121].contains ((pmod a 4 125 + pmod b 4 125) % 125))))
```

### THE IMAGE, PINNED, AT MODULUS 125 AND REDUCED EXPONENT 5. The 100 units raise to exactly the 20 value(s) [1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_125](/theorem/power_image_exact_reduced_5_mod_125) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => [1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124].contains (pmod a 5 125))) ∧ ([1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].any (fun a => pmod a 5 125 == v)))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 5 — part 1 of 4. For every unit a in [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31] and every unit b coprime to 125, the sum of their 5-th powers never lands on the 5-th power image [1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_125_part1](/theorem/coprime_sum_blocked_reduced_5_mod_125_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124].contains ((pmod a 5 125 + pmod b 5 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 5 — part 2 of 4. For every unit a in [32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62] and every unit b coprime to 125, the sum of their 5-th powers never lands on the 5-th power image [1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_125_part2](/theorem/coprime_sum_blocked_reduced_5_mod_125_part2) — proven `by decide`, sorry-free:

```lean
[32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124].contains ((pmod a 5 125 + pmod b 5 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 5 — part 3 of 4. For every unit a in [63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93] and every unit b coprime to 125, the sum of their 5-th powers never lands on the 5-th power image [1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_125_part3](/theorem/coprime_sum_blocked_reduced_5_mod_125_part3) — proven `by decide`, sorry-free:

```lean
[63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124].contains ((pmod a 5 125 + pmod b 5 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 5 — part 4 of 4. For every unit a in [94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124] and every unit b coprime to 125, the sum of their 5-th powers never lands on the 5-th power image [1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_125_part4](/theorem/coprime_sum_blocked_reduced_5_mod_125_part4) — proven `by decide`, sorry-free:

```lean
[94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,7,18,24,26,32,43,49,51,57,68,74,76,82,93,99,101,107,118,124].contains ((pmod a 5 125 + pmod b 5 125) % 125))))
```

### THE IMAGE, PINNED, AT MODULUS 125 AND REDUCED EXPONENT 10. The 100 units raise to exactly the 10 value(s) [1,24,26,49,51,74,76,99,101,124] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_125](/theorem/power_image_exact_reduced_10_mod_125) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => [1,24,26,49,51,74,76,99,101,124].contains (pmod a 10 125))) ∧ ([1,24,26,49,51,74,76,99,101,124].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].any (fun a => pmod a 10 125 == v)))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 10 — part 1 of 4. For every unit a in [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31] and every unit b coprime to 125, the sum of their 10-th powers never lands on the 10-th power image [1,24,26,49,51,74,76,99,101,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_125_part1](/theorem/coprime_sum_blocked_reduced_10_mod_125_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,24,26,49,51,74,76,99,101,124].contains ((pmod a 10 125 + pmod b 10 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 10 — part 2 of 4. For every unit a in [32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62] and every unit b coprime to 125, the sum of their 10-th powers never lands on the 10-th power image [1,24,26,49,51,74,76,99,101,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_125_part2](/theorem/coprime_sum_blocked_reduced_10_mod_125_part2) — proven `by decide`, sorry-free:

```lean
[32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,24,26,49,51,74,76,99,101,124].contains ((pmod a 10 125 + pmod b 10 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 10 — part 3 of 4. For every unit a in [63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93] and every unit b coprime to 125, the sum of their 10-th powers never lands on the 10-th power image [1,24,26,49,51,74,76,99,101,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_125_part3](/theorem/coprime_sum_blocked_reduced_10_mod_125_part3) — proven `by decide`, sorry-free:

```lean
[63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,24,26,49,51,74,76,99,101,124].contains ((pmod a 10 125 + pmod b 10 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 10 — part 4 of 4. For every unit a in [94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124] and every unit b coprime to 125, the sum of their 10-th powers never lands on the 10-th power image [1,24,26,49,51,74,76,99,101,124] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_125_part4](/theorem/coprime_sum_blocked_reduced_10_mod_125_part4) — proven `by decide`, sorry-free:

```lean
[94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,24,26,49,51,74,76,99,101,124].contains ((pmod a 10 125 + pmod b 10 125) % 125))))
```

### THE IMAGE, PINNED, AT MODULUS 125 AND REDUCED EXPONENT 20. The 100 units raise to exactly the 5 value(s) [1,26,51,76,101] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_20_mod_125](/theorem/power_image_exact_reduced_20_mod_125) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => [1,26,51,76,101].contains (pmod a 20 125))) ∧ ([1,26,51,76,101].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].any (fun a => pmod a 20 125 == v)))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 20 — part 1 of 4. For every unit a in [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31] and every unit b coprime to 125, the sum of their 20-th powers never lands on the 20-th power image [1,26,51,76,101] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_125_part1](/theorem/coprime_sum_blocked_reduced_20_mod_125_part1) — proven `by decide`, sorry-free:

```lean
[1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,26,51,76,101].contains ((pmod a 20 125 + pmod b 20 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 20 — part 2 of 4. For every unit a in [32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62] and every unit b coprime to 125, the sum of their 20-th powers never lands on the 20-th power image [1,26,51,76,101] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_125_part2](/theorem/coprime_sum_blocked_reduced_20_mod_125_part2) — proven `by decide`, sorry-free:

```lean
[32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,26,51,76,101].contains ((pmod a 20 125 + pmod b 20 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 20 — part 3 of 4. For every unit a in [63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93] and every unit b coprime to 125, the sum of their 20-th powers never lands on the 20-th power image [1,26,51,76,101] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_125_part3](/theorem/coprime_sum_blocked_reduced_20_mod_125_part3) — proven `by decide`, sorry-free:

```lean
[63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,26,51,76,101].contains ((pmod a 20 125 + pmod b 20 125) % 125))))
```

### AN OBSTRUCTION AT MODULUS 125, REDUCED EXPONENT 20 — part 4 of 4. For every unit a in [94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124] and every unit b coprime to 125, the sum of their 20-th powers never lands on the 20-th power image [1,26,51,76,101] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 125, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because phi(125) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 125 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_125_part4](/theorem/coprime_sum_blocked_reduced_20_mod_125_part4) — proven `by decide`, sorry-free:

```lean
[94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59,61,62,63,64,66,67,68,69,71,72,73,74,76,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,96,97,98,99,101,102,103,104,106,107,108,109,111,112,113,114,116,117,118,119,121,122,123,124].all (fun b => !([1,26,51,76,101].contains ((pmod a 20 125 + pmod b 20 125) % 125))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 18 OF 21 — moduli 20, 41, 62, 83, 104, 125, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_20](/theorem/unit_group_exponent_mod_20) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
