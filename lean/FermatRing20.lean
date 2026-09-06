-- lean/FermatRing20.lean — GENERATED. THE CONGRUENCE SURVEY, RING 20 OF 21 — moduli 22, 43, 64, 85, 106, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- pmod a n m — a^n mod m by SQUARE-AND-MULTIPLY, reducing at every step.
-- Two wrong instruments preceded this one, and both are worth naming because the statement never changed while
-- the cost changed by two orders of magnitude. First a^n % m: correct, and it built the whole power before
-- reducing, so at exponent 23 against modulus 119 the kernel multiplied 49-digit integers to learn a fact about
-- a two-digit one; the wing ran past an hour and was stopped. Then naive repeated multiplication mod m: every
-- intermediate stayed small, but it takes n steps, and lambda(107) = 106 means 106 multiplications per unit
-- across 106 units — 1.19 million of them in one theorem, past Lean's recursion depth. Square-and-multiply
-- takes log2(n) steps: seven instead of a hundred and six. NO WING BUYS ITS OWN CEILING (Colour.lean) — the
-- answer to a limit here is the better algorithm, never a raised maxRecDepth.
-- The fuel argument is what makes it structurally terminating: n halves each step, so n+1 is more than enough
-- and the n == 0 guard stops the reduction as soon as the exponent is exhausted.
def pmodAux (m : Nat) : Nat → Nat → Nat → Nat → Nat
  | 0, _, _, acc => acc
  | Nat.succ f, a, n, acc =>
      if n == 0 then acc
      else pmodAux m f ((a * a) % m) (n / 2) (if n % 2 == 1 then (acc * a) % m else acc)

def pmod (a : Nat) (n : Nat) (m : Nat) : Nat := pmodAux m (n + 1) (a % m) n (1 % m)

-- fermatWindow n — how many (x, y, z) with 1 ≤ x ≤ y < z ≤ 20 satisfy x^n + y^n = z^n.
def fermatWindow (n : Nat) : Nat :=
  ((List.range 21).map (fun z =>
    ((List.range z).map (fun y =>
      (List.range (y+1)).countP (fun x => x != 0 && x^n + y^n == z^n))).sum)).sum

-- cubeNearMiss d — how many (x, y, z) in the SAME window have |x^3 + y^3 − z^3| = d. Nat subtraction truncates,
-- so (a − b) + (b − a) is the absolute difference; d = 0 is exactly fermatWindow 3, which is why the two counts
-- below can be read against each other.
def cubeNearMiss (d : Nat) : Nat :=
  ((List.range 21).map (fun z =>
    ((List.range z).map (fun y =>
      (List.range (y+1)).countP (fun x =>
        x != 0 && ((x^3 + y^3) - z^3) + (z^3 - (x^3 + y^3)) == d))).sum)).sum

/-- THE ORDER STRUCTURE AT MODULUS 22. The 10 residues coprime to 22 are all killed by the exponent 10 — a^10 =
    1 for every unit a — and no proper divisor of 10 kills them all (all 3 of them checked). So 10 is the
    exponent of (Z/22)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 10),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_22 : ([1,3,5,7,9,13,15,17,19,21].all (fun a => pmod a 10 22 == 1)) ∧ ([1,2,5].all (fun k => !([1,3,5,7,9,13,15,17,19,21].all (fun a => pmod a k 22 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 22 AND REDUCED EXPONENT 1. The 10 units raise to exactly the 10 value(s)
    [1,3,5,7,9,13,15,17,19,21] — every unit's 1-th power is in that list, and every entry of the list is some
    unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_22 : ([1,3,5,7,9,13,15,17,19,21].all (fun a => [1,3,5,7,9,13,15,17,19,21].contains (pmod a 1 22))) ∧ ([1,3,5,7,9,13,15,17,19,21].all (fun v => [1,3,5,7,9,13,15,17,19,21].any (fun a => pmod a 1 22 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 22, REDUCED EXPONENT 1. For every unit a in [1,3,5,7,9,13,15,17,19,21] and every
    unit b coprime to 22, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,13,15,17,19,21] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 22, for EVERY exponent n reducing to 1 — that is n in
    [3,7,9,11,13,17,19,21,23] of the range walked, and every larger n with the same gcd against 10. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 22 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_22 : [1,3,5,7,9,13,15,17,19,21].all (fun a => [1,3,5,7,9,13,15,17,19,21].all (fun b => !([1,3,5,7,9,13,15,17,19,21].contains ((pmod a 1 22 + pmod b 1 22) % 22)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 22 AND REDUCED EXPONENT 2. The 10 units raise to exactly the 5 value(s)
    [1,3,5,9,15] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_22 : ([1,3,5,7,9,13,15,17,19,21].all (fun a => [1,3,5,9,15].contains (pmod a 2 22))) ∧ ([1,3,5,9,15].all (fun v => [1,3,5,7,9,13,15,17,19,21].any (fun a => pmod a 2 22 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 22, REDUCED EXPONENT 2. For every unit a in [1,3,5,7,9,13,15,17,19,21] and every
    unit b coprime to 22, the sum of their 2-th powers never lands on the 2-th power image [1,3,5,9,15] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    22, for EVERY exponent n reducing to 2 — that is n in [4,6,8,12,14,16,18,22] of the range walked, and every
    larger n with the same gcd against 10. An unbounded conclusion from a finite table. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 22 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_22 : [1,3,5,7,9,13,15,17,19,21].all (fun a => [1,3,5,7,9,13,15,17,19,21].all (fun b => !([1,3,5,9,15].contains ((pmod a 2 22 + pmod b 2 22) % 22)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 22 AND REDUCED EXPONENT 5. The 10 units raise to exactly the 2 value(s) [1,21]
    — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_22 : ([1,3,5,7,9,13,15,17,19,21].all (fun a => [1,21].contains (pmod a 5 22))) ∧ ([1,21].all (fun v => [1,3,5,7,9,13,15,17,19,21].any (fun a => pmod a 5 22 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 22, REDUCED EXPONENT 5. For every unit a in [1,3,5,7,9,13,15,17,19,21] and every
    unit b coprime to 22, the sum of their 5-th powers never lands on the 5-th power image [1,21] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    22, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with
    the same gcd against 10. An unbounded conclusion from a finite table. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 22 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_22 : [1,3,5,7,9,13,15,17,19,21].all (fun a => [1,3,5,7,9,13,15,17,19,21].all (fun b => !([1,21].contains ((pmod a 5 22 + pmod b 5 22) % 22)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 22 AND REDUCED EXPONENT 10. The 10 units raise to exactly the 1 value(s) [1] —
    every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_22 : ([1,3,5,7,9,13,15,17,19,21].all (fun a => [1].contains (pmod a 10 22))) ∧ ([1].all (fun v => [1,3,5,7,9,13,15,17,19,21].any (fun a => pmod a 10 22 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 22, REDUCED EXPONENT 10. For every unit a in [1,3,5,7,9,13,15,17,19,21] and every
    unit b coprime to 22, the sum of their 10-th powers never lands on the 10-th power image [1] (pinned exactly
    by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 22, for
    EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same
    gcd against 10. An unbounded conclusion from a finite table. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 22 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_22 : [1,3,5,7,9,13,15,17,19,21].all (fun a => [1,3,5,7,9,13,15,17,19,21].all (fun b => !([1].contains ((pmod a 10 22 + pmod b 10 22) % 22)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 43. The 42 residues coprime to 43 are all killed by the exponent 42 — a^42 =
    1 for every unit a — and no proper divisor of 42 kills them all (all 7 of them checked). So 42 is the
    exponent of (Z/43)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 42),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_43 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun a => pmod a 42 43 == 1)) ∧ ([1,2,3,6,7,14,21].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun a => pmod a k 43 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 43, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 43), with
    all three coprime to 43, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_43 : (pmod 1 1 43 + pmod 1 1 43) % 43 = pmod 2 1 43 := by decide

/-- NO OBSTRUCTION AT MODULUS 43, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 3^2 = 15^2 (mod 43),
    with all three coprime to 43, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [4,8,10,16,20,22] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_43 : (pmod 1 2 43 + pmod 3 2 43) % 43 = pmod 15 2 43 := by decide

/-- NO OBSTRUCTION AT MODULUS 43, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 1^3 = 20^3 (mod 43),
    with all three coprime to 43, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 3 — that is n in [3,9,15] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_3_mod_43 : (pmod 1 3 43 + pmod 1 3 43) % 43 = pmod 20 3 43 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 43 AND REDUCED EXPONENT 6. The 42 units raise to exactly the 7 value(s)
    [1,4,11,16,21,35,41] — every unit's 6-th power is in that list, and every entry of the list is some unit's
    6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_43 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun a => [1,4,11,16,21,35,41].contains (pmod a 6 43))) ∧ ([1,4,11,16,21,35,41].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].any (fun a => pmod a 6 43 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 43, REDUCED EXPONENT 6. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]
    and every unit b coprime to 43, the sum of their 6-th powers never lands on the 6-th power image
    [1,4,11,16,21,35,41] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 43, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range
    walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 43
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_43 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun b => !([1,4,11,16,21,35,41].contains ((pmod a 6 43 + pmod b 6 43) % 43)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 43, REDUCED EXPONENT 7 — the control, and it fires. 1^7 + 6^7 = 7^7 (mod 43), with
    all three coprime to 43, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 7 — that is n in [7] of the range walked. It is sealed for the same reason the blocked
    cases are: a survey that recorded only its successes would be an argument rather than a census, and the
    blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_7_mod_43 : (pmod 1 7 43 + pmod 6 7 43) % 43 = pmod 7 7 43 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 43 AND REDUCED EXPONENT 14. The 42 units raise to exactly the 3 value(s)
    [1,6,36] — every unit's 14-th power is in that list, and every entry of the list is some unit's 14-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_14_mod_43 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun a => [1,6,36].contains (pmod a 14 43))) ∧ ([1,6,36].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].any (fun a => pmod a 14 43 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 43, REDUCED EXPONENT 14. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]
    and every unit b coprime to 43, the sum of their 14-th powers never lands on the 14-th power image [1,6,36]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 43, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and every larger
    n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case
    only — classically Case I — and infinitely many triples sharing a factor with 43 pass through untouched,
    which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_43 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun b => !([1,6,36].contains ((pmod a 14 43 + pmod b 14 43) % 43)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 43 AND REDUCED EXPONENT 21. The 42 units raise to exactly the 2 value(s)
    [1,42] — every unit's 21-th power is in that list, and every entry of the list is some unit's 21-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_21_mod_43 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun a => [1,42].contains (pmod a 21 43))) ∧ ([1,42].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].any (fun a => pmod a 21 43 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 43, REDUCED EXPONENT 21. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42]
    and every unit b coprime to 43, the sum of their 21-th powers never lands on the 21-th power image [1,42]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 43, for EVERY exponent n reducing to 21 — that is n in [21] of the range walked, and every larger
    n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case
    only — classically Case I — and infinitely many triples sharing a factor with 43 pass through untouched,
    which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_21_mod_43 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42].all (fun b => !([1,42].contains ((pmod a 21 43 + pmod b 21 43) % 43)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 64. The 32 residues coprime to 64 are all killed by the exponent 16 — a^16 =
    1 for every unit a — and no proper divisor of 16 kills them all (all 4 of them checked). So 16 is the
    exponent of (Z/64)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 16),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_64 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => pmod a 16 64 == 1)) ∧ ([1,2,4,8].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => pmod a k 64 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 64 AND REDUCED EXPONENT 1. The 32 units raise to exactly the 32 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63] — every unit's
    1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing
    spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than
    asserted inside it. -/
theorem power_image_exact_reduced_1_mod_64 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].contains (pmod a 1 64))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].any (fun a => pmod a 1 64 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 64, REDUCED EXPONENT 1. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63] and every unit
    b coprime to 64, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63] (pinned exactly
    by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 64, for
    EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every
    larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 64 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_64 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].contains ((pmod a 1 64 + pmod b 1 64) % 64)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 64 AND REDUCED EXPONENT 2. The 32 units raise to exactly the 8 value(s)
    [1,9,17,25,33,41,49,57] — every unit's 2-th power is in that list, and every entry of the list is some
    unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_64 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => [1,9,17,25,33,41,49,57].contains (pmod a 2 64))) ∧ ([1,9,17,25,33,41,49,57].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].any (fun a => pmod a 2 64 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 64, REDUCED EXPONENT 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63] and every unit
    b coprime to 64, the sum of their 2-th powers never lands on the 2-th power image [1,9,17,25,33,41,49,57]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 64, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and
    every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 64 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_64 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun b => !([1,9,17,25,33,41,49,57].contains ((pmod a 2 64 + pmod b 2 64) % 64)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 64 AND REDUCED EXPONENT 4. The 32 units raise to exactly the 4 value(s)
    [1,17,33,49] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_64 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => [1,17,33,49].contains (pmod a 4 64))) ∧ ([1,17,33,49].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].any (fun a => pmod a 4 64 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 64, REDUCED EXPONENT 4. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63] and every unit
    b coprime to 64, the sum of their 4-th powers never lands on the 4-th power image [1,17,33,49] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    64, for EVERY exponent n reducing to 4 — that is n in [4,12,20] of the range walked, and every larger n with
    the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 64 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_64 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun b => !([1,17,33,49].contains ((pmod a 4 64 + pmod b 4 64) % 64)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 64 AND REDUCED EXPONENT 8. The 32 units raise to exactly the 2 value(s) [1,33]
    — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_8_mod_64 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => [1,33].contains (pmod a 8 64))) ∧ ([1,33].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].any (fun a => pmod a 8 64 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 64, REDUCED EXPONENT 8. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63] and every unit
    b coprime to 64, the sum of their 8-th powers never lands on the 8-th power image [1,33] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 64, for EVERY
    exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd
    against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case
    I — and infinitely many triples sharing a factor with 64 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_64 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun b => !([1,33].contains ((pmod a 8 64 + pmod b 8 64) % 64)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 64 AND REDUCED EXPONENT 16. The 32 units raise to exactly the 1 value(s) [1] —
    every unit's 16-th power is in that list, and every entry of the list is some unit's 16-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_16_mod_64 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => [1].contains (pmod a 16 64))) ∧ ([1].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].any (fun a => pmod a 16 64 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 64, REDUCED EXPONENT 16. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63] and every unit
    b coprime to 64, the sum of their 16-th powers never lands on the 16-th power image [1] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 64, for EVERY
    exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd
    against 16. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case
    I — and infinitely many triples sharing a factor with 64 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_64 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63].all (fun b => !([1].contains ((pmod a 16 64 + pmod b 16 64) % 64)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 85. The 64 residues coprime to 85 are all killed by the exponent 16 — a^16 =
    1 for every unit a — and no proper divisor of 16 kills them all (all 4 of them checked). So 16 is the
    exponent of (Z/85)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 16),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_85 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun a => pmod a 16 85 == 1)) ∧ ([1,2,4,8].all (fun k => !([1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun a => pmod a k 85 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 85, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 85), with
    all three coprime to 85, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked. It is sealed for
    the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_85 : (pmod 1 1 85 + pmod 1 1 85) % 85 = pmod 2 1 85 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 85 AND REDUCED EXPONENT 2. The 64 units raise to exactly the 16 value(s)
    [1,4,9,16,19,21,26,36,49,59,64,66,69,76,81,84] — every unit's 2-th power is in that list, and every entry of
    the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement
    ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_85 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun a => [1,4,9,16,19,21,26,36,49,59,64,66,69,76,81,84].contains (pmod a 2 85))) ∧ ([1,4,9,16,19,21,26,36,49,59,64,66,69,76,81,84].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].any (fun a => pmod a 2 85 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 85, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52]
    and every unit b coprime to 85, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,9,16,19,21,26,36,49,59,64,66,69,76,81,84] (pinned exactly by the theorem above). So x^n + y^n = z^n has
    NO solution in integers with x, y, z all coprime to 85, for EVERY exponent n reducing to 2 — that is n in
    [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 16. An unbounded
    conclusion from a finite table. The walk is split into 2 parts because phi(85) = 64 puts the full 64-by-64
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 85 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_85_part1 : [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun b => !([1,4,9,16,19,21,26,36,49,59,64,66,69,76,81,84].contains ((pmod a 2 85 + pmod b 2 85) % 85)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 85, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in
    [53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84] and every unit b coprime to 85,
    the sum of their 2-th powers never lands on the 2-th power image
    [1,4,9,16,19,21,26,36,49,59,64,66,69,76,81,84] (pinned exactly by the theorem above). So x^n + y^n = z^n has
    NO solution in integers with x, y, z all coprime to 85, for EVERY exponent n reducing to 2 — that is n in
    [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 16. An unbounded
    conclusion from a finite table. The walk is split into 2 parts because phi(85) = 64 puts the full 64-by-64
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 85 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_85_part2 : [53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun b => !([1,4,9,16,19,21,26,36,49,59,64,66,69,76,81,84].contains ((pmod a 2 85 + pmod b 2 85) % 85)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 85 AND REDUCED EXPONENT 4. The 64 units raise to exactly the 4 value(s)
    [1,16,21,81] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_85 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun a => [1,16,21,81].contains (pmod a 4 85))) ∧ ([1,16,21,81].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].any (fun a => pmod a 4 85 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 85, REDUCED EXPONENT 4 — part 1 of 2. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52]
    and every unit b coprime to 85, the sum of their 4-th powers never lands on the 4-th power image
    [1,16,21,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 85, for EVERY exponent n reducing to 4 — that is n in [4,12,20] of the range walked, and
    every larger n with the same gcd against 16. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(85) = 64 puts the full 64-by-64 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 85 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_85_part1 : [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun b => !([1,16,21,81].contains ((pmod a 4 85 + pmod b 4 85) % 85)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 85, REDUCED EXPONENT 4 — part 2 of 2. For every unit a in
    [53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84] and every unit b coprime to 85,
    the sum of their 4-th powers never lands on the 4-th power image [1,16,21,81] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 85, for EVERY exponent n
    reducing to 4 — that is n in [4,12,20] of the range walked, and every larger n with the same gcd against 16.
    An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(85) = 64 puts the
    full 64-by-64 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the
    parts together are the whole walk over the units. It settles the coprime case only — classically Case I —
    and infinitely many triples sharing a factor with 85 pass through untouched, which is why this is a filter
    and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_85_part2 : [53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun b => !([1,16,21,81].contains ((pmod a 4 85 + pmod b 4 85) % 85)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 85 AND REDUCED EXPONENT 8. The 64 units raise to exactly the 2 value(s) [1,16]
    — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_8_mod_85 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun a => [1,16].contains (pmod a 8 85))) ∧ ([1,16].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].any (fun a => pmod a 8 85 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 85, REDUCED EXPONENT 8 — part 1 of 2. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52]
    and every unit b coprime to 85, the sum of their 8-th powers never lands on the 8-th power image [1,16]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 85, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n
    with the same gcd against 16. An unbounded conclusion from a finite table. The walk is split into 2 parts
    because phi(85) = 64 puts the full 64-by-64 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 85 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_85_part1 : [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun b => !([1,16].contains ((pmod a 8 85 + pmod b 8 85) % 85)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 85, REDUCED EXPONENT 8 — part 2 of 2. For every unit a in
    [53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84] and every unit b coprime to 85,
    the sum of their 8-th powers never lands on the 8-th power image [1,16] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 85, for EVERY exponent n
    reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd against 16. An
    unbounded conclusion from a finite table. The walk is split into 2 parts because phi(85) = 64 puts the full
    64-by-64 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 85 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_85_part2 : [53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun b => !([1,16].contains ((pmod a 8 85 + pmod b 8 85) % 85)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 85 AND REDUCED EXPONENT 16. The 64 units raise to exactly the 1 value(s) [1] —
    every unit's 16-th power is in that list, and every entry of the list is some unit's 16-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_16_mod_85 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun a => [1].contains (pmod a 16 85))) ∧ ([1].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].any (fun a => pmod a 16 85 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 85, REDUCED EXPONENT 16 — part 1 of 2. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52]
    and every unit b coprime to 85, the sum of their 16-th powers never lands on the 16-th power image [1]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 85, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger
    n with the same gcd against 16. An unbounded conclusion from a finite table. The walk is split into 2 parts
    because phi(85) = 64 puts the full 64-by-64 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 85 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_85_part1 : [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun b => !([1].contains ((pmod a 16 85 + pmod b 16 85) % 85)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 85, REDUCED EXPONENT 16 — part 2 of 2. For every unit a in
    [53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84] and every unit b coprime to 85,
    the sum of their 16-th powers never lands on the 16-th power image [1] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 85, for EVERY exponent n
    reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd against 16. An
    unbounded conclusion from a finite table. The walk is split into 2 parts because phi(85) = 64 puts the full
    64-by-64 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 85 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_85_part2 : [53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,18,19,21,22,23,24,26,27,28,29,31,32,33,36,37,38,39,41,42,43,44,46,47,48,49,52,53,54,56,57,58,59,61,62,63,64,66,67,69,71,72,73,74,76,77,78,79,81,82,83,84].all (fun b => !([1].contains ((pmod a 16 85 + pmod b 16 85) % 85)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 106. The 52 residues coprime to 106 are all killed by the exponent 52 — a^52
    = 1 for every unit a — and no proper divisor of 52 kills them all (all 5 of them checked). So 52 is the
    exponent of (Z/106)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 52),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_106 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun a => pmod a 52 106 == 1)) ∧ ([1,2,4,13,26].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun a => pmod a k 106 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 106 AND REDUCED EXPONENT 1. The 52 units raise to exactly the 52 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105]
    — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_106 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].contains (pmod a 1 106))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].any (fun a => pmod a 1 106 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 106, REDUCED EXPONENT 1 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97]
    and every unit b coprime to 106, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 106, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,15,17,19,21,23] of the range
    walked, and every larger n with the same gcd against 52. An unbounded conclusion from a finite table. The
    walk is split into 2 parts because phi(106) = 52 puts the full 52-by-52 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 106 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_106_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].contains ((pmod a 1 106 + pmod b 1 106) % 106)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 106, REDUCED EXPONENT 1 — part 2 of 2. For every unit a in [99,101,103,105] and
    every unit b coprime to 106, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 106, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,15,17,19,21,23] of the range
    walked, and every larger n with the same gcd against 52. An unbounded conclusion from a finite table. The
    walk is split into 2 parts because phi(106) = 52 puts the full 52-by-52 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 106 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_106_part2 : [99,101,103,105].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].contains ((pmod a 1 106 + pmod b 1 106) % 106)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 106 AND REDUCED EXPONENT 2. The 52 units raise to exactly the 26 value(s)
    [1,7,9,11,13,15,17,25,29,37,43,47,49,57,59,63,69,77,81,89,91,93,95,97,99,105] — every unit's 2-th power is
    in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The
    obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside
    it. -/
theorem power_image_exact_reduced_2_mod_106 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun a => [1,7,9,11,13,15,17,25,29,37,43,47,49,57,59,63,69,77,81,89,91,93,95,97,99,105].contains (pmod a 2 106))) ∧ ([1,7,9,11,13,15,17,25,29,37,43,47,49,57,59,63,69,77,81,89,91,93,95,97,99,105].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].any (fun a => pmod a 2 106 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 106, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97]
    and every unit b coprime to 106, the sum of their 2-th powers never lands on the 2-th power image
    [1,7,9,11,13,15,17,25,29,37,43,47,49,57,59,63,69,77,81,89,91,93,95,97,99,105] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 106, for EVERY exponent n
    reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd
    against 52. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(106) =
    52 puts the full 52-by-52 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping,
    and the parts together are the whole walk over the units. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 106 pass through untouched, which is why this is
    a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_106_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun b => !([1,7,9,11,13,15,17,25,29,37,43,47,49,57,59,63,69,77,81,89,91,93,95,97,99,105].contains ((pmod a 2 106 + pmod b 2 106) % 106)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 106, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in [99,101,103,105] and
    every unit b coprime to 106, the sum of their 2-th powers never lands on the 2-th power image
    [1,7,9,11,13,15,17,25,29,37,43,47,49,57,59,63,69,77,81,89,91,93,95,97,99,105] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 106, for EVERY exponent n
    reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger n with the same gcd
    against 52. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(106) =
    52 puts the full 52-by-52 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping,
    and the parts together are the whole walk over the units. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 106 pass through untouched, which is why this is
    a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_106_part2 : [99,101,103,105].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun b => !([1,7,9,11,13,15,17,25,29,37,43,47,49,57,59,63,69,77,81,89,91,93,95,97,99,105].contains ((pmod a 2 106 + pmod b 2 106) % 106)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 106 AND REDUCED EXPONENT 4. The 52 units raise to exactly the 13 value(s)
    [1,13,15,47,49,63,69,77,81,89,95,97,99] — every unit's 4-th power is in that list, and every entry of the
    list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT
    this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_106 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun a => [1,13,15,47,49,63,69,77,81,89,95,97,99].contains (pmod a 4 106))) ∧ ([1,13,15,47,49,63,69,77,81,89,95,97,99].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].any (fun a => pmod a 4 106 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 106, REDUCED EXPONENT 4 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97]
    and every unit b coprime to 106, the sum of their 4-th powers never lands on the 4-th power image
    [1,13,15,47,49,63,69,77,81,89,95,97,99] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 106, for EVERY exponent n reducing to 4 — that is n in
    [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 52. An unbounded conclusion
    from a finite table. The walk is split into 2 parts because phi(106) = 52 puts the full 52-by-52 sweep past
    Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole
    walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 106 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_106_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun b => !([1,13,15,47,49,63,69,77,81,89,95,97,99].contains ((pmod a 4 106 + pmod b 4 106) % 106)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 106, REDUCED EXPONENT 4 — part 2 of 2. For every unit a in [99,101,103,105] and
    every unit b coprime to 106, the sum of their 4-th powers never lands on the 4-th power image
    [1,13,15,47,49,63,69,77,81,89,95,97,99] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 106, for EVERY exponent n reducing to 4 — that is n in
    [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 52. An unbounded conclusion
    from a finite table. The walk is split into 2 parts because phi(106) = 52 puts the full 52-by-52 sweep past
    Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole
    walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 106 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_106_part2 : [99,101,103,105].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun b => !([1,13,15,47,49,63,69,77,81,89,95,97,99].contains ((pmod a 4 106 + pmod b 4 106) % 106)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 106 AND REDUCED EXPONENT 13. The 52 units raise to exactly the 4 value(s)
    [1,23,83,105] — every unit's 13-th power is in that list, and every entry of the list is some unit's 13-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_13_mod_106 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun a => [1,23,83,105].contains (pmod a 13 106))) ∧ ([1,23,83,105].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].any (fun a => pmod a 13 106 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 106, REDUCED EXPONENT 13 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97]
    and every unit b coprime to 106, the sum of their 13-th powers never lands on the 13-th power image
    [1,23,83,105] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 106, for EVERY exponent n reducing to 13 — that is n in [13] of the range walked, and
    every larger n with the same gcd against 52. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(106) = 52 puts the full 52-by-52 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 106 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_13_mod_106_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun b => !([1,23,83,105].contains ((pmod a 13 106 + pmod b 13 106) % 106)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 106, REDUCED EXPONENT 13 — part 2 of 2. For every unit a in [99,101,103,105] and
    every unit b coprime to 106, the sum of their 13-th powers never lands on the 13-th power image
    [1,23,83,105] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 106, for EVERY exponent n reducing to 13 — that is n in [13] of the range walked, and
    every larger n with the same gcd against 52. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(106) = 52 puts the full 52-by-52 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 106 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_13_mod_106_part2 : [99,101,103,105].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105].all (fun b => !([1,23,83,105].contains ((pmod a 13 106 + pmod b 13 106) % 106)))) := by decide
