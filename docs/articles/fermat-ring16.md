---
title: "The congruence survey, ring 16"
description: "Computed from lean/FermatRing16.lean — 82 sealed theorems, every claim citing its proof."
---

# The congruence survey, ring 16

> THE CONGRUENCE SURVEY, RING 16 OF 21 — moduli 18, 39, 60, 81, 102, 123, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. — held by [unit_group_exponent_mod_18](/theorem/unit_group_exponent_mod_18) and its 81 siblings below.

**82 theorems**, from [unit_group_exponent_mod_18](/theorem/unit_group_exponent_mod_18) onward, each proven `by decide` in <a href="/lean/FermatRing16.lean">lean/FermatRing16.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 54 of its 82 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [unit_group_exponent_mod_18](/theorem/unit_group_exponent_mod_18). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatRing16.lean)** — nothing to install. The editor fetches `lean/FermatRing16.lean` from the repository and re-decides all 82 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ORDER STRUCTURE AT MODULUS 18. The 6 residues coprime to 18 are all killed by the exponent 6 — a^6 = 1 for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent of (Z/18)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_18](/theorem/unit_group_exponent_mod_18) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17].all (fun a => pmod a 6 18 == 1)) ∧ ([1,2,3].all (fun k => !([1,5,7,11,13,17].all (fun a => pmod a k 18 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 18 AND REDUCED EXPONENT 1. The 6 units raise to exactly the 6 value(s) [1,5,7,11,13,17] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_18](/theorem/power_image_exact_reduced_1_mod_18) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17].all (fun a => [1,5,7,11,13,17].contains (pmod a 1 18))) ∧ ([1,5,7,11,13,17].all (fun v => [1,5,7,11,13,17].any (fun a => pmod a 1 18 == v)))
```

### AN OBSTRUCTION AT MODULUS 18, REDUCED EXPONENT 1. For every unit a in [1,5,7,11,13,17] and every unit b coprime to 18, the sum of their 1-th powers never lands on the 1-th power image [1,5,7,11,13,17] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 18, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 18 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_18](/theorem/coprime_sum_blocked_reduced_1_mod_18) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17].all (fun a => [1,5,7,11,13,17].all (fun b => !([1,5,7,11,13,17].contains ((pmod a 1 18 + pmod b 1 18) % 18))))
```

### THE IMAGE, PINNED, AT MODULUS 18 AND REDUCED EXPONENT 2. The 6 units raise to exactly the 3 value(s) [1,7,13] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_18](/theorem/power_image_exact_reduced_2_mod_18) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17].all (fun a => [1,7,13].contains (pmod a 2 18))) ∧ ([1,7,13].all (fun v => [1,5,7,11,13,17].any (fun a => pmod a 2 18 == v)))
```

### AN OBSTRUCTION AT MODULUS 18, REDUCED EXPONENT 2. For every unit a in [1,5,7,11,13,17] and every unit b coprime to 18, the sum of their 2-th powers never lands on the 2-th power image [1,7,13] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 18, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 18 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_18](/theorem/coprime_sum_blocked_reduced_2_mod_18) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17].all (fun a => [1,5,7,11,13,17].all (fun b => !([1,7,13].contains ((pmod a 2 18 + pmod b 2 18) % 18))))
```

### THE IMAGE, PINNED, AT MODULUS 18 AND REDUCED EXPONENT 3. The 6 units raise to exactly the 2 value(s) [1,17] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_18](/theorem/power_image_exact_reduced_3_mod_18) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17].all (fun a => [1,17].contains (pmod a 3 18))) ∧ ([1,17].all (fun v => [1,5,7,11,13,17].any (fun a => pmod a 3 18 == v)))
```

### AN OBSTRUCTION AT MODULUS 18, REDUCED EXPONENT 3. For every unit a in [1,5,7,11,13,17] and every unit b coprime to 18, the sum of their 3-th powers never lands on the 3-th power image [1,17] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 18, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 18 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_18](/theorem/coprime_sum_blocked_reduced_3_mod_18) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17].all (fun a => [1,5,7,11,13,17].all (fun b => !([1,17].contains ((pmod a 3 18 + pmod b 3 18) % 18))))
```

### THE IMAGE, PINNED, AT MODULUS 18 AND REDUCED EXPONENT 6. The 6 units raise to exactly the 1 value(s) [1] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_18](/theorem/power_image_exact_reduced_6_mod_18) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,17].all (fun a => [1].contains (pmod a 6 18))) ∧ ([1].all (fun v => [1,5,7,11,13,17].any (fun a => pmod a 6 18 == v)))
```

### AN OBSTRUCTION AT MODULUS 18, REDUCED EXPONENT 6. For every unit a in [1,5,7,11,13,17] and every unit b coprime to 18, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 18, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 18 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_18](/theorem/coprime_sum_blocked_reduced_6_mod_18) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,17].all (fun a => [1,5,7,11,13,17].all (fun b => !([1].contains ((pmod a 6 18 + pmod b 6 18) % 18))))
```

### THE ORDER STRUCTURE AT MODULUS 39. The 24 residues coprime to 39 are all killed by the exponent 12 — a^12 = 1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the exponent of (Z/39)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_39](/theorem/unit_group_exponent_mod_39) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => pmod a 12 39 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => pmod a k 39 == 1))))
```

### NO OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 39), with all three coprime to 39, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_39](/theorem/coprime_sum_open_reduced_1_mod_39) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 39 + pmod 1 1 39) % 39 = pmod 2 1 39
```

### THE IMAGE, PINNED, AT MODULUS 39 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 6 value(s) [1,4,10,16,22,25] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_39](/theorem/power_image_exact_reduced_2_mod_39) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,4,10,16,22,25].contains (pmod a 2 39))) ∧ ([1,4,10,16,22,25].all (fun v => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].any (fun a => pmod a 2 39 == v)))
```

### AN OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 2. For every unit a in [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38] and every unit b coprime to 39, the sum of their 2-th powers never lands on the 2-th power image [1,4,10,16,22,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 39, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 39 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_39](/theorem/coprime_sum_blocked_reduced_2_mod_39) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun b => !([1,4,10,16,22,25].contains ((pmod a 2 39 + pmod b 2 39) % 39))))
```

### THE IMAGE, PINNED, AT MODULUS 39 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s) [1,5,8,14,25,31,34,38] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_39](/theorem/power_image_exact_reduced_3_mod_39) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,5,8,14,25,31,34,38].contains (pmod a 3 39))) ∧ ([1,5,8,14,25,31,34,38].all (fun v => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].any (fun a => pmod a 3 39 == v)))
```

### AN OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 3. For every unit a in [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38] and every unit b coprime to 39, the sum of their 3-th powers never lands on the 3-th power image [1,5,8,14,25,31,34,38] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 39, for EVERY exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 39 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_39](/theorem/coprime_sum_blocked_reduced_3_mod_39) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun b => !([1,5,8,14,25,31,34,38].contains ((pmod a 3 39 + pmod b 3 39) % 39))))
```

### THE IMAGE, PINNED, AT MODULUS 39 AND REDUCED EXPONENT 4. The 24 units raise to exactly the 3 value(s) [1,16,22] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_39](/theorem/power_image_exact_reduced_4_mod_39) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,16,22].contains (pmod a 4 39))) ∧ ([1,16,22].all (fun v => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].any (fun a => pmod a 4 39 == v)))
```

### AN OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 4. For every unit a in [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38] and every unit b coprime to 39, the sum of their 4-th powers never lands on the 4-th power image [1,16,22] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 39, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 39 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_39](/theorem/coprime_sum_blocked_reduced_4_mod_39) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun b => !([1,16,22].contains ((pmod a 4 39 + pmod b 4 39) % 39))))
```

### THE IMAGE, PINNED, AT MODULUS 39 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 2 value(s) [1,25] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_39](/theorem/power_image_exact_reduced_6_mod_39) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,25].contains (pmod a 6 39))) ∧ ([1,25].all (fun v => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].any (fun a => pmod a 6 39 == v)))
```

### AN OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 6. For every unit a in [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38] and every unit b coprime to 39, the sum of their 6-th powers never lands on the 6-th power image [1,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 39, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 39 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_39](/theorem/coprime_sum_blocked_reduced_6_mod_39) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun b => !([1,25].contains ((pmod a 6 39 + pmod b 6 39) % 39))))
```

### THE IMAGE, PINNED, AT MODULUS 39 AND REDUCED EXPONENT 12. The 24 units raise to exactly the 1 value(s) [1] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_12_mod_39](/theorem/power_image_exact_reduced_12_mod_39) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1].contains (pmod a 12 39))) ∧ ([1].all (fun v => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].any (fun a => pmod a 12 39 == v)))
```

### AN OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 12. For every unit a in [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38] and every unit b coprime to 39, the sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 39, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 39 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_12_mod_39](/theorem/coprime_sum_blocked_reduced_12_mod_39) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun b => !([1].contains ((pmod a 12 39 + pmod b 12 39) % 39))))
```

### THE ORDER STRUCTURE AT MODULUS 60. The 16 residues coprime to 60 are all killed by the exponent 4 — a^4 = 1 for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent of (Z/60)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_60](/theorem/unit_group_exponent_mod_60) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => pmod a 4 60 == 1)) ∧ ([1,2].all (fun k => !([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => pmod a k 60 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 60 AND REDUCED EXPONENT 1. The 16 units raise to exactly the 16 value(s) [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_60](/theorem/power_image_exact_reduced_1_mod_60) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].contains (pmod a 1 60))) ∧ ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].any (fun a => pmod a 1 60 == v)))
```

### AN OBSTRUCTION AT MODULUS 60, REDUCED EXPONENT 1. For every unit a in [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59] and every unit b coprime to 60, the sum of their 1-th powers never lands on the 1-th power image [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 60, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 60 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_60](/theorem/coprime_sum_blocked_reduced_1_mod_60) — proven `by decide`, sorry-free:

```lean
[1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun b => !([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].contains ((pmod a 1 60 + pmod b 1 60) % 60))))
```

### THE IMAGE, PINNED, AT MODULUS 60 AND REDUCED EXPONENT 2. The 16 units raise to exactly the 2 value(s) [1,49] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_60](/theorem/power_image_exact_reduced_2_mod_60) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1,49].contains (pmod a 2 60))) ∧ ([1,49].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].any (fun a => pmod a 2 60 == v)))
```

### AN OBSTRUCTION AT MODULUS 60, REDUCED EXPONENT 2. For every unit a in [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59] and every unit b coprime to 60, the sum of their 2-th powers never lands on the 2-th power image [1,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 60, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 60 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_60](/theorem/coprime_sum_blocked_reduced_2_mod_60) — proven `by decide`, sorry-free:

```lean
[1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun b => !([1,49].contains ((pmod a 2 60 + pmod b 2 60) % 60))))
```

### THE IMAGE, PINNED, AT MODULUS 60 AND REDUCED EXPONENT 4. The 16 units raise to exactly the 1 value(s) [1] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_60](/theorem/power_image_exact_reduced_4_mod_60) — proven `by decide`, sorry-free:

```lean
([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1].contains (pmod a 4 60))) ∧ ([1].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].any (fun a => pmod a 4 60 == v)))
```

### AN OBSTRUCTION AT MODULUS 60, REDUCED EXPONENT 4. For every unit a in [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59] and every unit b coprime to 60, the sum of their 4-th powers never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 60, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 60 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_60](/theorem/coprime_sum_blocked_reduced_4_mod_60) — proven `by decide`, sorry-free:

```lean
[1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun b => !([1].contains ((pmod a 4 60 + pmod b 4 60) % 60))))
```

### THE ORDER STRUCTURE AT MODULUS 81. The 54 residues coprime to 81 are all killed by the exponent 54 — a^54 = 1 for every unit a — and no proper divisor of 54 kills them all (all 7 of them checked). So 54 is the exponent of (Z/81)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 54), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_81](/theorem/unit_group_exponent_mod_81) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => pmod a 54 81 == 1)) ∧ ([1,2,3,6,9,18,27].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => pmod a k 81 == 1))))
```

### NO OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 81), with all three coprime to 81, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_81](/theorem/coprime_sum_open_reduced_1_mod_81) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 81 + pmod 1 1 81) % 81 = pmod 2 1 81
```

### THE IMAGE, PINNED, AT MODULUS 81 AND REDUCED EXPONENT 2. The 54 units raise to exactly the 27 value(s) [1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_81](/theorem/power_image_exact_reduced_2_mod_81) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => [1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79].contains (pmod a 2 81))) ∧ ([1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].any (fun a => pmod a 2 81 == v)))
```

### AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68] and every unit b coprime to 81, the sum of their 2-th powers never lands on the 2-th power image [1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_81_part1](/theorem/coprime_sum_blocked_reduced_2_mod_81_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79].contains ((pmod a 2 81 + pmod b 2 81) % 81))))
```

### AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in [70,71,73,74,76,77,79,80] and every unit b coprime to 81, the sum of their 2-th powers never lands on the 2-th power image [1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_81_part2](/theorem/coprime_sum_blocked_reduced_2_mod_81_part2) — proven `by decide`, sorry-free:

```lean
[70,71,73,74,76,77,79,80].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79].contains ((pmod a 2 81 + pmod b 2 81) % 81))))
```

### THE IMAGE, PINNED, AT MODULUS 81 AND REDUCED EXPONENT 3. The 54 units raise to exactly the 18 value(s) [1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_3_mod_81](/theorem/power_image_exact_reduced_3_mod_81) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => [1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80].contains (pmod a 3 81))) ∧ ([1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].any (fun a => pmod a 3 81 == v)))
```

### AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 3 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68] and every unit b coprime to 81, the sum of their 3-th powers never lands on the 3-th power image [1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 3 — that is n in [3,15,21] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_81_part1](/theorem/coprime_sum_blocked_reduced_3_mod_81_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80].contains ((pmod a 3 81 + pmod b 3 81) % 81))))
```

### AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 3 — part 2 of 2. For every unit a in [70,71,73,74,76,77,79,80] and every unit b coprime to 81, the sum of their 3-th powers never lands on the 3-th power image [1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 3 — that is n in [3,15,21] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_3_mod_81_part2](/theorem/coprime_sum_blocked_reduced_3_mod_81_part2) — proven `by decide`, sorry-free:

```lean
[70,71,73,74,76,77,79,80].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80].contains ((pmod a 3 81 + pmod b 3 81) % 81))))
```

### THE IMAGE, PINNED, AT MODULUS 81 AND REDUCED EXPONENT 6. The 54 units raise to exactly the 9 value(s) [1,10,19,28,37,46,55,64,73] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_6_mod_81](/theorem/power_image_exact_reduced_6_mod_81) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => [1,10,19,28,37,46,55,64,73].contains (pmod a 6 81))) ∧ ([1,10,19,28,37,46,55,64,73].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].any (fun a => pmod a 6 81 == v)))
```

### AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 6 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68] and every unit b coprime to 81, the sum of their 6-th powers never lands on the 6-th power image [1,10,19,28,37,46,55,64,73] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 6 — that is n in [6,12] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_81_part1](/theorem/coprime_sum_blocked_reduced_6_mod_81_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,10,19,28,37,46,55,64,73].contains ((pmod a 6 81 + pmod b 6 81) % 81))))
```

### AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 6 — part 2 of 2. For every unit a in [70,71,73,74,76,77,79,80] and every unit b coprime to 81, the sum of their 6-th powers never lands on the 6-th power image [1,10,19,28,37,46,55,64,73] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 6 — that is n in [6,12] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_6_mod_81_part2](/theorem/coprime_sum_blocked_reduced_6_mod_81_part2) — proven `by decide`, sorry-free:

```lean
[70,71,73,74,76,77,79,80].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,10,19,28,37,46,55,64,73].contains ((pmod a 6 81 + pmod b 6 81) % 81))))
```

### THE IMAGE, PINNED, AT MODULUS 81 AND REDUCED EXPONENT 9. The 54 units raise to exactly the 6 value(s) [1,26,28,53,55,80] — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_9_mod_81](/theorem/power_image_exact_reduced_9_mod_81) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => [1,26,28,53,55,80].contains (pmod a 9 81))) ∧ ([1,26,28,53,55,80].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].any (fun a => pmod a 9 81 == v)))
```

### AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 9 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68] and every unit b coprime to 81, the sum of their 9-th powers never lands on the 9-th power image [1,26,28,53,55,80] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_9_mod_81_part1](/theorem/coprime_sum_blocked_reduced_9_mod_81_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,26,28,53,55,80].contains ((pmod a 9 81 + pmod b 9 81) % 81))))
```

### AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 9 — part 2 of 2. For every unit a in [70,71,73,74,76,77,79,80] and every unit b coprime to 81, the sum of their 9-th powers never lands on the 9-th power image [1,26,28,53,55,80] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_9_mod_81_part2](/theorem/coprime_sum_blocked_reduced_9_mod_81_part2) — proven `by decide`, sorry-free:

```lean
[70,71,73,74,76,77,79,80].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,26,28,53,55,80].contains ((pmod a 9 81 + pmod b 9 81) % 81))))
```

### THE IMAGE, PINNED, AT MODULUS 81 AND REDUCED EXPONENT 18. The 54 units raise to exactly the 3 value(s) [1,28,55] — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_18_mod_81](/theorem/power_image_exact_reduced_18_mod_81) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => [1,28,55].contains (pmod a 18 81))) ∧ ([1,28,55].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].any (fun a => pmod a 18 81 == v)))
```

### AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 18 — part 1 of 2. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68] and every unit b coprime to 81, the sum of their 18-th powers never lands on the 18-th power image [1,28,55] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_18_mod_81_part1](/theorem/coprime_sum_blocked_reduced_18_mod_81_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,28,55].contains ((pmod a 18 81 + pmod b 18 81) % 81))))
```

### AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 18 — part 2 of 2. For every unit a in [70,71,73,74,76,77,79,80] and every unit b coprime to 81, the sum of their 18-th powers never lands on the 18-th power image [1,28,55] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_18_mod_81_part2](/theorem/coprime_sum_blocked_reduced_18_mod_81_part2) — proven `by decide`, sorry-free:

```lean
[70,71,73,74,76,77,79,80].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,28,55].contains ((pmod a 18 81 + pmod b 18 81) % 81))))
```

### THE ORDER STRUCTURE AT MODULUS 102. The 32 residues coprime to 102 are all killed by the exponent 16 — a^16 = 1 for every unit a — and no proper divisor of 16 kills them all (all 4 of them checked). So 16 is the exponent of (Z/102)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 16), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_102](/theorem/unit_group_exponent_mod_102) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => pmod a 16 102 == 1)) ∧ ([1,2,4,8].all (fun k => !([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => pmod a k 102 == 1))))
```

### THE IMAGE, PINNED, AT MODULUS 102 AND REDUCED EXPONENT 1. The 32 units raise to exactly the 32 value(s) [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_1_mod_102](/theorem/power_image_exact_reduced_1_mod_102) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].contains (pmod a 1 102))) ∧ ([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun v => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].any (fun a => pmod a 1 102 == v)))
```

### AN OBSTRUCTION AT MODULUS 102, REDUCED EXPONENT 1. For every unit a in [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] and every unit b coprime to 102, the sum of their 1-th powers never lands on the 1-th power image [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 102, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 102 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_1_mod_102](/theorem/coprime_sum_blocked_reduced_1_mod_102) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun b => !([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].contains ((pmod a 1 102 + pmod b 1 102) % 102))))
```

### THE IMAGE, PINNED, AT MODULUS 102 AND REDUCED EXPONENT 2. The 32 units raise to exactly the 8 value(s) [1,13,19,25,43,49,55,67] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_102](/theorem/power_image_exact_reduced_2_mod_102) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,13,19,25,43,49,55,67].contains (pmod a 2 102))) ∧ ([1,13,19,25,43,49,55,67].all (fun v => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].any (fun a => pmod a 2 102 == v)))
```

### AN OBSTRUCTION AT MODULUS 102, REDUCED EXPONENT 2. For every unit a in [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] and every unit b coprime to 102, the sum of their 2-th powers never lands on the 2-th power image [1,13,19,25,43,49,55,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 102, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 102 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_102](/theorem/coprime_sum_blocked_reduced_2_mod_102) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun b => !([1,13,19,25,43,49,55,67].contains ((pmod a 2 102 + pmod b 2 102) % 102))))
```

### THE IMAGE, PINNED, AT MODULUS 102 AND REDUCED EXPONENT 4. The 32 units raise to exactly the 4 value(s) [1,13,55,67] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_102](/theorem/power_image_exact_reduced_4_mod_102) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,13,55,67].contains (pmod a 4 102))) ∧ ([1,13,55,67].all (fun v => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].any (fun a => pmod a 4 102 == v)))
```

### AN OBSTRUCTION AT MODULUS 102, REDUCED EXPONENT 4. For every unit a in [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] and every unit b coprime to 102, the sum of their 4-th powers never lands on the 4-th power image [1,13,55,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 102, for EVERY exponent n reducing to 4 — that is n in [4,12,20] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 102 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_102](/theorem/coprime_sum_blocked_reduced_4_mod_102) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun b => !([1,13,55,67].contains ((pmod a 4 102 + pmod b 4 102) % 102))))
```

### THE IMAGE, PINNED, AT MODULUS 102 AND REDUCED EXPONENT 8. The 32 units raise to exactly the 2 value(s) [1,67] — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_8_mod_102](/theorem/power_image_exact_reduced_8_mod_102) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,67].contains (pmod a 8 102))) ∧ ([1,67].all (fun v => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].any (fun a => pmod a 8 102 == v)))
```

### AN OBSTRUCTION AT MODULUS 102, REDUCED EXPONENT 8. For every unit a in [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] and every unit b coprime to 102, the sum of their 8-th powers never lands on the 8-th power image [1,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 102, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 102 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_102](/theorem/coprime_sum_blocked_reduced_8_mod_102) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun b => !([1,67].contains ((pmod a 8 102 + pmod b 8 102) % 102))))
```

### THE IMAGE, PINNED, AT MODULUS 102 AND REDUCED EXPONENT 16. The 32 units raise to exactly the 1 value(s) [1] — every unit's 16-th power is in that list, and every entry of the list is some unit's 16-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_16_mod_102](/theorem/power_image_exact_reduced_16_mod_102) — proven `by decide`, sorry-free:

```lean
([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1].contains (pmod a 16 102))) ∧ ([1].all (fun v => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].any (fun a => pmod a 16 102 == v)))
```

### AN OBSTRUCTION AT MODULUS 102, REDUCED EXPONENT 16. For every unit a in [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] and every unit b coprime to 102, the sum of their 16-th powers never lands on the 16-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 102, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 102 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_16_mod_102](/theorem/coprime_sum_blocked_reduced_16_mod_102) — proven `by decide`, sorry-free:

```lean
[1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun b => !([1].contains ((pmod a 16 102 + pmod b 16 102) % 102))))
```

### THE ORDER STRUCTURE AT MODULUS 123. The 80 residues coprime to 123 are all killed by the exponent 40 — a^40 = 1 for every unit a — and no proper divisor of 40 kills them all (all 7 of them checked). So 40 is the exponent of (Z/123)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 40), which is why the survey below is indexed by that and not by n.
The ledger holds this as [unit_group_exponent_mod_123](/theorem/unit_group_exponent_mod_123) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => pmod a 40 123 == 1)) ∧ ([1,2,4,5,8,10,20].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => pmod a k 123 == 1))))
```

### NO OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 123), with all three coprime to 123, so this modulus admits a solution-shaped triple and rules nothing out for any exponent reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked. It is sealed for the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and the blocked results are only readable against the ones that failed.
The ledger holds this as [coprime_sum_open_reduced_1_mod_123](/theorem/coprime_sum_open_reduced_1_mod_123) — proven `by decide`, sorry-free:

```lean
(pmod 1 1 123 + pmod 1 1 123) % 123 = pmod 2 1 123
```

### THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 2. The 80 units raise to exactly the 20 value(s) [1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_2_mod_123](/theorem/power_image_exact_reduced_2_mod_123) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121].contains (pmod a 2 123))) ∧ ([1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 2 123 == v)))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 2 — part 1 of 3. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b coprime to 123, the sum of their 2-th powers never lands on the 2-th power image [1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_123_part1](/theorem/coprime_sum_blocked_reduced_2_mod_123_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121].contains ((pmod a 2 123 + pmod b 2 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 2 — part 2 of 3. For every unit a in [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every unit b coprime to 123, the sum of their 2-th powers never lands on the 2-th power image [1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_123_part2](/theorem/coprime_sum_blocked_reduced_2_mod_123_part2) — proven `by decide`, sorry-free:

```lean
[49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121].contains ((pmod a 2 123 + pmod b 2 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 2 — part 3 of 3. For every unit a in [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the sum of their 2-th powers never lands on the 2-th power image [1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_2_mod_123_part3](/theorem/coprime_sum_blocked_reduced_2_mod_123_part3) — proven `by decide`, sorry-free:

```lean
[97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121].contains ((pmod a 2 123 + pmod b 2 123) % 123))))
```

### THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 4. The 80 units raise to exactly the 10 value(s) [1,4,10,16,25,31,37,40,64,100] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_4_mod_123](/theorem/power_image_exact_reduced_4_mod_123) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,4,10,16,25,31,37,40,64,100].contains (pmod a 4 123))) ∧ ([1,4,10,16,25,31,37,40,64,100].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 4 123 == v)))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 4 — part 1 of 3. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b coprime to 123, the sum of their 4-th powers never lands on the 4-th power image [1,4,10,16,25,31,37,40,64,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 4 — that is n in [4,12] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_123_part1](/theorem/coprime_sum_blocked_reduced_4_mod_123_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,64,100].contains ((pmod a 4 123 + pmod b 4 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 4 — part 2 of 3. For every unit a in [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every unit b coprime to 123, the sum of their 4-th powers never lands on the 4-th power image [1,4,10,16,25,31,37,40,64,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 4 — that is n in [4,12] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_123_part2](/theorem/coprime_sum_blocked_reduced_4_mod_123_part2) — proven `by decide`, sorry-free:

```lean
[49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,64,100].contains ((pmod a 4 123 + pmod b 4 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 4 — part 3 of 3. For every unit a in [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the sum of their 4-th powers never lands on the 4-th power image [1,4,10,16,25,31,37,40,64,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 4 — that is n in [4,12] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_4_mod_123_part3](/theorem/coprime_sum_blocked_reduced_4_mod_123_part3) — proven `by decide`, sorry-free:

```lean
[97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,64,100].contains ((pmod a 4 123 + pmod b 4 123) % 123))))
```

### THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 5. The 80 units raise to exactly the 16 value(s) [1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_5_mod_123](/theorem/power_image_exact_reduced_5_mod_123) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122].contains (pmod a 5 123))) ∧ ([1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 5 123 == v)))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 5 — part 1 of 3. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b coprime to 123, the sum of their 5-th powers never lands on the 5-th power image [1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_123_part1](/theorem/coprime_sum_blocked_reduced_5_mod_123_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122].contains ((pmod a 5 123 + pmod b 5 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 5 — part 2 of 3. For every unit a in [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every unit b coprime to 123, the sum of their 5-th powers never lands on the 5-th power image [1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_123_part2](/theorem/coprime_sum_blocked_reduced_5_mod_123_part2) — proven `by decide`, sorry-free:

```lean
[49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122].contains ((pmod a 5 123 + pmod b 5 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 5 — part 3 of 3. For every unit a in [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the sum of their 5-th powers never lands on the 5-th power image [1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_5_mod_123_part3](/theorem/coprime_sum_blocked_reduced_5_mod_123_part3) — proven `by decide`, sorry-free:

```lean
[97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122].contains ((pmod a 5 123 + pmod b 5 123) % 123))))
```

### THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 8. The 80 units raise to exactly the 5 value(s) [1,10,16,37,100] — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_8_mod_123](/theorem/power_image_exact_reduced_8_mod_123) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,10,16,37,100].contains (pmod a 8 123))) ∧ ([1,10,16,37,100].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 8 123 == v)))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 8 — part 1 of 3. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b coprime to 123, the sum of their 8-th powers never lands on the 8-th power image [1,10,16,37,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 8 — that is n in [8,16] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_123_part1](/theorem/coprime_sum_blocked_reduced_8_mod_123_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,10,16,37,100].contains ((pmod a 8 123 + pmod b 8 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 8 — part 2 of 3. For every unit a in [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every unit b coprime to 123, the sum of their 8-th powers never lands on the 8-th power image [1,10,16,37,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 8 — that is n in [8,16] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_123_part2](/theorem/coprime_sum_blocked_reduced_8_mod_123_part2) — proven `by decide`, sorry-free:

```lean
[49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,10,16,37,100].contains ((pmod a 8 123 + pmod b 8 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 8 — part 3 of 3. For every unit a in [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the sum of their 8-th powers never lands on the 8-th power image [1,10,16,37,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 8 — that is n in [8,16] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_8_mod_123_part3](/theorem/coprime_sum_blocked_reduced_8_mod_123_part3) — proven `by decide`, sorry-free:

```lean
[97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,10,16,37,100].contains ((pmod a 8 123 + pmod b 8 123) % 123))))
```

### THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 10. The 80 units raise to exactly the 4 value(s) [1,40,73,91] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_10_mod_123](/theorem/power_image_exact_reduced_10_mod_123) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,40,73,91].contains (pmod a 10 123))) ∧ ([1,40,73,91].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 10 123 == v)))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 10 — part 1 of 3. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b coprime to 123, the sum of their 10-th powers never lands on the 10-th power image [1,40,73,91] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_123_part1](/theorem/coprime_sum_blocked_reduced_10_mod_123_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40,73,91].contains ((pmod a 10 123 + pmod b 10 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 10 — part 2 of 3. For every unit a in [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every unit b coprime to 123, the sum of their 10-th powers never lands on the 10-th power image [1,40,73,91] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_123_part2](/theorem/coprime_sum_blocked_reduced_10_mod_123_part2) — proven `by decide`, sorry-free:

```lean
[49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40,73,91].contains ((pmod a 10 123 + pmod b 10 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 10 — part 3 of 3. For every unit a in [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the sum of their 10-th powers never lands on the 10-th power image [1,40,73,91] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_10_mod_123_part3](/theorem/coprime_sum_blocked_reduced_10_mod_123_part3) — proven `by decide`, sorry-free:

```lean
[97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40,73,91].contains ((pmod a 10 123 + pmod b 10 123) % 123))))
```

### THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 20. The 80 units raise to exactly the 2 value(s) [1,40] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside it.
The ledger holds this as [power_image_exact_reduced_20_mod_123](/theorem/power_image_exact_reduced_20_mod_123) — proven `by decide`, sorry-free:

```lean
([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,40].contains (pmod a 20 123))) ∧ ([1,40].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 20 123 == v)))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 20 — part 1 of 3. For every unit a in [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b coprime to 123, the sum of their 20-th powers never lands on the 20-th power image [1,40] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_123_part1](/theorem/coprime_sum_blocked_reduced_20_mod_123_part1) — proven `by decide`, sorry-free:

```lean
[1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40].contains ((pmod a 20 123 + pmod b 20 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 20 — part 2 of 3. For every unit a in [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every unit b coprime to 123, the sum of their 20-th powers never lands on the 20-th power image [1,40] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_123_part2](/theorem/coprime_sum_blocked_reduced_20_mod_123_part2) — proven `by decide`, sorry-free:

```lean
[49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40].contains ((pmod a 20 123 + pmod b 20 123) % 123))))
```

### AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 20 — part 3 of 3. For every unit a in [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the sum of their 20-th powers never lands on the 20-th power image [1,40] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem.
The ledger holds this as [coprime_sum_blocked_reduced_20_mod_123_part3](/theorem/coprime_sum_blocked_reduced_20_mod_123_part3) — proven `by decide`, sorry-free:

```lean
[97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40].contains ((pmod a 20 123 + pmod b 20 123) % 123))))
```


::: warning 
THE CONGRUENCE SURVEY, RING 16 OF 21 — moduli 18, 39, 60, 81, 102, 123, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. The boundary is confirmed by the wing's own sealed theorems — e.g. [unit_group_exponent_mod_18](/theorem/unit_group_exponent_mod_18) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
