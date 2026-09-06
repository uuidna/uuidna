-- lean/FermatRing6.lean — GENERATED. THE CONGRUENCE SURVEY, RING 6 OF 21 — moduli 8, 29, 50, 71, 92, 113, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

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

/-- THE ORDER STRUCTURE AT MODULUS 8. The 4 residues coprime to 8 are all killed by the exponent 2 — a^2 = 1 for
    every unit a — and no proper divisor of 2 kills them all (all 1 of them checked). So 2 is the exponent of
    (Z/8)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at
    this modulus actually turns on: an exponent n reaches the group only through gcd(n, 2), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_8 : ([1,3,5,7].all (fun a => pmod a 2 8 == 1)) ∧ ([1].all (fun k => !([1,3,5,7].all (fun a => pmod a k 8 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 8 AND REDUCED EXPONENT 1. The 4 units raise to exactly the 4 value(s)
    [1,3,5,7] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_8 : ([1,3,5,7].all (fun a => [1,3,5,7].contains (pmod a 1 8))) ∧ ([1,3,5,7].all (fun v => [1,3,5,7].any (fun a => pmod a 1 8 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 8, REDUCED EXPONENT 1. For every unit a in [1,3,5,7] and every unit b coprime to
    8, the sum of their 1-th powers never lands on the 1-th power image [1,3,5,7] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 8, for EVERY exponent n
    reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the
    same gcd against 2. An unbounded conclusion from a finite table. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 8 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_8 : [1,3,5,7].all (fun a => [1,3,5,7].all (fun b => !([1,3,5,7].contains ((pmod a 1 8 + pmod b 1 8) % 8)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 8 AND REDUCED EXPONENT 2. The 4 units raise to exactly the 1 value(s) [1] —
    every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_8 : ([1,3,5,7].all (fun a => [1].contains (pmod a 2 8))) ∧ ([1].all (fun v => [1,3,5,7].any (fun a => pmod a 2 8 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 8, REDUCED EXPONENT 2. For every unit a in [1,3,5,7] and every unit b coprime to
    8, the sum of their 2-th powers never lands on the 2-th power image [1] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 8, for EVERY exponent n
    reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked, and every larger n with the
    same gcd against 2. An unbounded conclusion from a finite table. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 8 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_8 : [1,3,5,7].all (fun a => [1,3,5,7].all (fun b => !([1].contains ((pmod a 2 8 + pmod b 2 8) % 8)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 29. The 28 residues coprime to 29 are all killed by the exponent 28 — a^28 =
    1 for every unit a — and no proper divisor of 28 kills them all (all 5 of them checked). So 28 is the
    exponent of (Z/29)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 28),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_29 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].all (fun a => pmod a 28 29 == 1)) ∧ ([1,2,4,7,14].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].all (fun a => pmod a k 29 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 29, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 29), with
    all three coprime to 29, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,9,11,13,15,17,19,23] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_29 : (pmod 1 1 29 + pmod 1 1 29) % 29 = pmod 2 1 29 := by decide

/-- NO OBSTRUCTION AT MODULUS 29, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 2^2 = 11^2 (mod 29),
    with all three coprime to 29, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [6,10,18,22] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_29 : (pmod 1 2 29 + pmod 2 2 29) % 29 = pmod 11 2 29 := by decide

/-- NO OBSTRUCTION AT MODULUS 29, REDUCED EXPONENT 4 — the control, and it fires. 1^4 + 3^4 = 4^4 (mod 29), with
    all three coprime to 29, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 4 — that is n in [4,8,12,16,20] of the range walked. It is sealed for the same reason
    the blocked cases are: a survey that recorded only its successes would be an argument rather than a census,
    and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_4_mod_29 : (pmod 1 4 29 + pmod 3 4 29) % 29 = pmod 4 4 29 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 29 AND REDUCED EXPONENT 7. The 28 units raise to exactly the 4 value(s)
    [1,12,17,28] — every unit's 7-th power is in that list, and every entry of the list is some unit's 7-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_7_mod_29 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].all (fun a => [1,12,17,28].contains (pmod a 7 29))) ∧ ([1,12,17,28].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].any (fun a => pmod a 7 29 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 29, REDUCED EXPONENT 7. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28] and every unit b coprime to 29,
    the sum of their 7-th powers never lands on the 7-th power image [1,12,17,28] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 29, for EVERY exponent n
    reducing to 7 — that is n in [7,21] of the range walked, and every larger n with the same gcd against 28. An
    unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 29 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_29 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].all (fun b => !([1,12,17,28].contains ((pmod a 7 29 + pmod b 7 29) % 29)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 29 AND REDUCED EXPONENT 14. The 28 units raise to exactly the 2 value(s)
    [1,28] — every unit's 14-th power is in that list, and every entry of the list is some unit's 14-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_14_mod_29 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].all (fun a => [1,28].contains (pmod a 14 29))) ∧ ([1,28].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].any (fun a => pmod a 14 29 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 29, REDUCED EXPONENT 14. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28] and every unit b coprime to 29,
    the sum of their 14-th powers never lands on the 14-th power image [1,28] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 29, for EVERY exponent n
    reducing to 14 — that is n in [14] of the range walked, and every larger n with the same gcd against 28. An
    unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 29 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_29 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28].all (fun b => !([1,28].contains ((pmod a 14 29 + pmod b 14 29) % 29)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 50. The 20 residues coprime to 50 are all killed by the exponent 20 — a^20 =
    1 for every unit a — and no proper divisor of 20 kills them all (all 5 of them checked). So 20 is the
    exponent of (Z/50)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 20),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_50 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => pmod a 20 50 == 1)) ∧ ([1,2,4,5,10].all (fun k => !([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => pmod a k 50 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 50 AND REDUCED EXPONENT 1. The 20 units raise to exactly the 20 value(s)
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49] — every unit's 1-th power is in that list, and
    every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is
    a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_50 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].contains (pmod a 1 50))) ∧ ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].any (fun a => pmod a 1 50 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 50, REDUCED EXPONENT 1. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49] and every unit b coprime to 50, the sum of their
    1-th powers never lands on the 1-th power image [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 50, for EVERY exponent n reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range
    walked, and every larger n with the same gcd against 20. An unbounded conclusion from a finite table. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 50
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_50 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun b => !([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].contains ((pmod a 1 50 + pmod b 1 50) % 50)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 50 AND REDUCED EXPONENT 2. The 20 units raise to exactly the 10 value(s)
    [1,9,11,19,21,29,31,39,41,49] — every unit's 2-th power is in that list, and every entry of the list is some
    unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_50 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,9,11,19,21,29,31,39,41,49].contains (pmod a 2 50))) ∧ ([1,9,11,19,21,29,31,39,41,49].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].any (fun a => pmod a 2 50 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 50, REDUCED EXPONENT 2. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49] and every unit b coprime to 50, the sum of their
    2-th powers never lands on the 2-th power image [1,9,11,19,21,29,31,39,41,49] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 50, for EVERY exponent n
    reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against
    20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 50 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_50 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun b => !([1,9,11,19,21,29,31,39,41,49].contains ((pmod a 2 50 + pmod b 2 50) % 50)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 50 AND REDUCED EXPONENT 4. The 20 units raise to exactly the 5 value(s)
    [1,11,21,31,41] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_50 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,11,21,31,41].contains (pmod a 4 50))) ∧ ([1,11,21,31,41].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].any (fun a => pmod a 4 50 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 50, REDUCED EXPONENT 4. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49] and every unit b coprime to 50, the sum of their
    4-th powers never lands on the 4-th power image [1,11,21,31,41] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 50, for EVERY exponent n reducing to
    4 — that is n in [4,8,12,16] of the range walked, and every larger n with the same gcd against 20. An
    unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 50 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_50 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun b => !([1,11,21,31,41].contains ((pmod a 4 50 + pmod b 4 50) % 50)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 50 AND REDUCED EXPONENT 5. The 20 units raise to exactly the 4 value(s)
    [1,7,43,49] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_50 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,7,43,49].contains (pmod a 5 50))) ∧ ([1,7,43,49].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].any (fun a => pmod a 5 50 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 50, REDUCED EXPONENT 5. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49] and every unit b coprime to 50, the sum of their
    5-th powers never lands on the 5-th power image [1,7,43,49] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 50, for EVERY exponent n reducing to 5 —
    that is n in [5,15] of the range walked, and every larger n with the same gcd against 20. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 50 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_50 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun b => !([1,7,43,49].contains ((pmod a 5 50 + pmod b 5 50) % 50)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 50 AND REDUCED EXPONENT 10. The 20 units raise to exactly the 2 value(s)
    [1,49] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_50 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,49].contains (pmod a 10 50))) ∧ ([1,49].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].any (fun a => pmod a 10 50 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 50, REDUCED EXPONENT 10. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49] and every unit b coprime to 50, the sum of their
    10-th powers never lands on the 10-th power image [1,49] (pinned exactly by the theorem above). So x^n + y^n
    = z^n has NO solution in integers with x, y, z all coprime to 50, for EVERY exponent n reducing to 10 — that
    is n in [10] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 50 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_50 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun b => !([1,49].contains ((pmod a 10 50 + pmod b 10 50) % 50)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 50 AND REDUCED EXPONENT 20. The 20 units raise to exactly the 1 value(s) [1] —
    every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_20_mod_50 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1].contains (pmod a 20 50))) ∧ ([1].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].any (fun a => pmod a 20 50 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 50, REDUCED EXPONENT 20. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49] and every unit b coprime to 50, the sum of their
    20-th powers never lands on the 20-th power image [1] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 50, for EVERY exponent n reducing to 20 — that
    is n in [20] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 50 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_50 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49].all (fun b => !([1].contains ((pmod a 20 50 + pmod b 20 50) % 50)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 71. The 70 residues coprime to 71 are all killed by the exponent 70 — a^70 =
    1 for every unit a — and no proper divisor of 70 kills them all (all 7 of them checked). So 70 is the
    exponent of (Z/71)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 70),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_71 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun a => pmod a 70 71 == 1)) ∧ ([1,2,5,7,10,14,35].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun a => pmod a k 71 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 71, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 71), with
    all three coprime to 71, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,9,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_71 : (pmod 1 1 71 + pmod 1 1 71) % 71 = pmod 2 1 71 := by decide

/-- NO OBSTRUCTION AT MODULUS 71, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 12^2 (mod 71),
    with all three coprime to 71, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [4,6,8,12,16,18,22] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_71 : (pmod 1 2 71 + pmod 1 2 71) % 71 = pmod 12 2 71 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 71 AND REDUCED EXPONENT 5. The 70 units raise to exactly the 14 value(s)
    [1,20,23,26,30,32,34,37,39,41,45,48,51,70] — every unit's 5-th power is in that list, and every entry of the
    list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT
    this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_71 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun a => [1,20,23,26,30,32,34,37,39,41,45,48,51,70].contains (pmod a 5 71))) ∧ ([1,20,23,26,30,32,34,37,39,41,45,48,51,70].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].any (fun a => pmod a 5 71 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 71, REDUCED EXPONENT 5 — part 1 of 2. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35] and every
    unit b coprime to 71, the sum of their 5-th powers never lands on the 5-th power image
    [1,20,23,26,30,32,34,37,39,41,45,48,51,70] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 71, for EVERY exponent n reducing to 5 — that is n in
    [5,15] of the range walked, and every larger n with the same gcd against 70. An unbounded conclusion from a
    finite table. The walk is split into 2 parts because phi(71) = 70 puts the full 70-by-70 sweep past Lean's
    default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk
    over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 71 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_71_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun b => !([1,20,23,26,30,32,34,37,39,41,45,48,51,70].contains ((pmod a 5 71 + pmod b 5 71) % 71)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 71, REDUCED EXPONENT 5 — part 2 of 2. For every unit a in
    [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]
    and every unit b coprime to 71, the sum of their 5-th powers never lands on the 5-th power image
    [1,20,23,26,30,32,34,37,39,41,45,48,51,70] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 71, for EVERY exponent n reducing to 5 — that is n in
    [5,15] of the range walked, and every larger n with the same gcd against 70. An unbounded conclusion from a
    finite table. The walk is split into 2 parts because phi(71) = 70 puts the full 70-by-70 sweep past Lean's
    default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk
    over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 71 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_71_part2 : [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun b => !([1,20,23,26,30,32,34,37,39,41,45,48,51,70].contains ((pmod a 5 71 + pmod b 5 71) % 71)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 71 AND REDUCED EXPONENT 7. The 70 units raise to exactly the 10 value(s)
    [1,5,14,17,25,46,54,57,66,70] — every unit's 7-th power is in that list, and every entry of the list is some
    unit's 7-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_7_mod_71 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun a => [1,5,14,17,25,46,54,57,66,70].contains (pmod a 7 71))) ∧ ([1,5,14,17,25,46,54,57,66,70].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].any (fun a => pmod a 7 71 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 71, REDUCED EXPONENT 7 — part 1 of 2. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35] and every
    unit b coprime to 71, the sum of their 7-th powers never lands on the 7-th power image
    [1,5,14,17,25,46,54,57,66,70] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 71, for EVERY exponent n reducing to 7 — that is n in [7,21] of the
    range walked, and every larger n with the same gcd against 70. An unbounded conclusion from a finite table.
    The walk is split into 2 parts because phi(71) = 70 puts the full 70-by-70 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 71 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_71_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun b => !([1,5,14,17,25,46,54,57,66,70].contains ((pmod a 7 71 + pmod b 7 71) % 71)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 71, REDUCED EXPONENT 7 — part 2 of 2. For every unit a in
    [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]
    and every unit b coprime to 71, the sum of their 7-th powers never lands on the 7-th power image
    [1,5,14,17,25,46,54,57,66,70] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 71, for EVERY exponent n reducing to 7 — that is n in [7,21] of the
    range walked, and every larger n with the same gcd against 70. An unbounded conclusion from a finite table.
    The walk is split into 2 parts because phi(71) = 70 puts the full 70-by-70 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 71 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_71_part2 : [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun b => !([1,5,14,17,25,46,54,57,66,70].contains ((pmod a 7 71 + pmod b 7 71) % 71)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 71 AND REDUCED EXPONENT 10. The 70 units raise to exactly the 7 value(s)
    [1,20,30,32,37,45,48] — every unit's 10-th power is in that list, and every entry of the list is some unit's
    10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_71 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun a => [1,20,30,32,37,45,48].contains (pmod a 10 71))) ∧ ([1,20,30,32,37,45,48].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].any (fun a => pmod a 10 71 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 71, REDUCED EXPONENT 10 — part 1 of 2. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35] and every
    unit b coprime to 71, the sum of their 10-th powers never lands on the 10-th power image
    [1,20,30,32,37,45,48] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 71, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range
    walked, and every larger n with the same gcd against 70. An unbounded conclusion from a finite table. The
    walk is split into 2 parts because phi(71) = 70 puts the full 70-by-70 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 71
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_71_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun b => !([1,20,30,32,37,45,48].contains ((pmod a 10 71 + pmod b 10 71) % 71)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 71, REDUCED EXPONENT 10 — part 2 of 2. For every unit a in
    [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]
    and every unit b coprime to 71, the sum of their 10-th powers never lands on the 10-th power image
    [1,20,30,32,37,45,48] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 71, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range
    walked, and every larger n with the same gcd against 70. An unbounded conclusion from a finite table. The
    walk is split into 2 parts because phi(71) = 70 puts the full 70-by-70 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 71
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_71_part2 : [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun b => !([1,20,30,32,37,45,48].contains ((pmod a 10 71 + pmod b 10 71) % 71)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 71 AND REDUCED EXPONENT 14. The 70 units raise to exactly the 5 value(s)
    [1,5,25,54,57] — every unit's 14-th power is in that list, and every entry of the list is some unit's 14-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_14_mod_71 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun a => [1,5,25,54,57].contains (pmod a 14 71))) ∧ ([1,5,25,54,57].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].any (fun a => pmod a 14 71 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 71, REDUCED EXPONENT 14 — part 1 of 2. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35] and every
    unit b coprime to 71, the sum of their 14-th powers never lands on the 14-th power image [1,5,25,54,57]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 71, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and every larger
    n with the same gcd against 70. An unbounded conclusion from a finite table. The walk is split into 2 parts
    because phi(71) = 70 puts the full 70-by-70 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 71 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_71_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun b => !([1,5,25,54,57].contains ((pmod a 14 71 + pmod b 14 71) % 71)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 71, REDUCED EXPONENT 14 — part 2 of 2. For every unit a in
    [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]
    and every unit b coprime to 71, the sum of their 14-th powers never lands on the 14-th power image
    [1,5,25,54,57] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 71, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and
    every larger n with the same gcd against 70. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(71) = 70 puts the full 70-by-70 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 71 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_71_part2 : [36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70].all (fun b => !([1,5,25,54,57].contains ((pmod a 14 71 + pmod b 14 71) % 71)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 92. The 44 residues coprime to 92 are all killed by the exponent 22 — a^22 =
    1 for every unit a — and no proper divisor of 22 kills them all (all 3 of them checked). So 22 is the
    exponent of (Z/92)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 22),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_92 : ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun a => pmod a 22 92 == 1)) ∧ ([1,2,11].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun a => pmod a k 92 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 92 AND REDUCED EXPONENT 1. The 44 units raise to exactly the 44 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91]
    — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_92 : ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].contains (pmod a 1 92))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].any (fun a => pmod a 1 92 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 92, REDUCED EXPONENT 1. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91]
    and every unit b coprime to 92, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 92, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,13,15,17,19,21,23] of the range
    walked, and every larger n with the same gcd against 22. An unbounded conclusion from a finite table. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 92
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_92 : [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].contains ((pmod a 1 92 + pmod b 1 92) % 92)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 92 AND REDUCED EXPONENT 2. The 44 units raise to exactly the 11 value(s)
    [1,9,13,25,29,41,49,73,77,81,85] — every unit's 2-th power is in that list, and every entry of the list is
    some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set,
    so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_92 : ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun a => [1,9,13,25,29,41,49,73,77,81,85].contains (pmod a 2 92))) ∧ ([1,9,13,25,29,41,49,73,77,81,85].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].any (fun a => pmod a 2 92 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 92, REDUCED EXPONENT 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91]
    and every unit b coprime to 92, the sum of their 2-th powers never lands on the 2-th power image
    [1,9,13,25,29,41,49,73,77,81,85] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution
    in integers with x, y, z all coprime to 92, for EVERY exponent n reducing to 2 — that is n in
    [4,6,8,10,12,14,16,18,20] of the range walked, and every larger n with the same gcd against 22. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 92 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_92 : [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun b => !([1,9,13,25,29,41,49,73,77,81,85].contains ((pmod a 2 92 + pmod b 2 92) % 92)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 92 AND REDUCED EXPONENT 11. The 44 units raise to exactly the 4 value(s)
    [1,45,47,91] — every unit's 11-th power is in that list, and every entry of the list is some unit's 11-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_11_mod_92 : ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun a => [1,45,47,91].contains (pmod a 11 92))) ∧ ([1,45,47,91].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].any (fun a => pmod a 11 92 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 92, REDUCED EXPONENT 11. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91]
    and every unit b coprime to 92, the sum of their 11-th powers never lands on the 11-th power image
    [1,45,47,91] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 92, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and
    every larger n with the same gcd against 22. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 92 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_11_mod_92 : [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun b => !([1,45,47,91].contains ((pmod a 11 92 + pmod b 11 92) % 92)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 92 AND REDUCED EXPONENT 22. The 44 units raise to exactly the 1 value(s) [1] —
    every unit's 22-th power is in that list, and every entry of the list is some unit's 22-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_22_mod_92 : ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun a => [1].contains (pmod a 22 92))) ∧ ([1].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].any (fun a => pmod a 22 92 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 92, REDUCED EXPONENT 22. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91]
    and every unit b coprime to 92, the sum of their 22-th powers never lands on the 22-th power image [1]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 92, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger
    n with the same gcd against 22. An unbounded conclusion from a finite table. It settles the coprime case
    only — classically Case I — and infinitely many triples sharing a factor with 92 pass through untouched,
    which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_22_mod_92 : [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,71,73,75,77,79,81,83,85,87,89,91].all (fun b => !([1].contains ((pmod a 22 92 + pmod b 22 92) % 92)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 113. The 112 residues coprime to 113 are all killed by the exponent 112 —
    a^112 = 1 for every unit a — and no proper divisor of 112 kills them all (all 9 of them checked). So 112 is
    the exponent of (Z/113)*, the Carmichael lambda, computed here rather than looked up. This is the number
    every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n,
    112), which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_113 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun a => pmod a 112 113 == 1)) ∧ ([1,2,4,7,8,14,16,28,56].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun a => pmod a k 113 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 113),
    with all three coprime to 113, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,9,11,13,15,17,19,23] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_113 : (pmod 1 1 113 + pmod 1 1 113) % 113 = pmod 2 1 113 := by decide

/-- NO OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 51^2 (mod 113),
    with all three coprime to 113, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [6,10,18,22] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_113 : (pmod 1 2 113 + pmod 1 2 113) % 113 = pmod 51 2 113 := by decide

/-- NO OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 4 — the control, and it fires. 1^4 + 1^4 = 27^4 (mod 113),
    with all three coprime to 113, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 4 — that is n in [4,12,20] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_4_mod_113 : (pmod 1 4 113 + pmod 1 4 113) % 113 = pmod 27 4 113 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 113 AND REDUCED EXPONENT 7. The 112 units raise to exactly the 16 value(s)
    [1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112] — every unit's 7-th power is in that list, and every entry
    of the list is some unit's 7-th power. Nothing missing, nothing spare. The obstruction below is a statement
    ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_7_mod_113 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun a => [1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112].contains (pmod a 7 113))) ∧ ([1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].any (fun a => pmod a 7 113 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 7 — part 1 of 6. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22] and every unit b coprime to 113, the sum of their
    7-th powers never lands on the 7-th power image [1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    113, for EVERY exponent n reducing to 7 — that is n in [7,21] of the range walked, and every larger n with
    the same gcd against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts
    because phi(113) = 112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 113 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_113_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112].contains ((pmod a 7 113 + pmod b 7 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 7 — part 2 of 6. For every unit a in
    [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44] and every unit b coprime to 113, the sum
    of their 7-th powers never lands on the 7-th power image [1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 113, for EVERY exponent n reducing to 7 — that is n in [7,21] of the range walked, and every
    larger n with the same gcd against 112. An unbounded conclusion from a finite table. The walk is split into
    6 parts because phi(113) = 112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 113 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_113_part2 : [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112].contains ((pmod a 7 113 + pmod b 7 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 7 — part 3 of 6. For every unit a in
    [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66] and every unit b coprime to 113, the sum
    of their 7-th powers never lands on the 7-th power image [1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 113, for EVERY exponent n reducing to 7 — that is n in [7,21] of the range walked, and every
    larger n with the same gcd against 112. An unbounded conclusion from a finite table. The walk is split into
    6 parts because phi(113) = 112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 113 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_113_part3 : [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112].contains ((pmod a 7 113 + pmod b 7 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 7 — part 4 of 6. For every unit a in
    [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88] and every unit b coprime to 113, the sum
    of their 7-th powers never lands on the 7-th power image [1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 113, for EVERY exponent n reducing to 7 — that is n in [7,21] of the range walked, and every
    larger n with the same gcd against 112. An unbounded conclusion from a finite table. The walk is split into
    6 parts because phi(113) = 112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 113 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_113_part4 : [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112].contains ((pmod a 7 113 + pmod b 7 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 7 — part 5 of 6. For every unit a in
    [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110] and every unit b coprime to
    113, the sum of their 7-th powers never lands on the 7-th power image
    [1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 113, for EVERY exponent n reducing to 7 — that is n
    in [7,21] of the range walked, and every larger n with the same gcd against 112. An unbounded conclusion
    from a finite table. The walk is split into 6 parts because phi(113) = 112 puts the full 112-by-112 sweep
    past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the
    whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 113 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_113_part5 : [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112].contains ((pmod a 7 113 + pmod b 7 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 7 — part 6 of 6. For every unit a in [111,112] and every
    unit b coprime to 113, the sum of their 7-th powers never lands on the 7-th power image
    [1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 113, for EVERY exponent n reducing to 7 — that is n
    in [7,21] of the range walked, and every larger n with the same gcd against 112. An unbounded conclusion
    from a finite table. The walk is split into 6 parts because phi(113) = 112 puts the full 112-by-112 sweep
    past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the
    whole walk over the units. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 113 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_113_part6 : [111,112].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,35,40,42,44,48,65,69,71,73,78,95,98,112].contains ((pmod a 7 113 + pmod b 7 113) % 113)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 113 AND REDUCED EXPONENT 8. The 112 units raise to exactly the 14 value(s)
    [1,4,7,16,28,30,49,64,83,85,97,106,109,112] — every unit's 8-th power is in that list, and every entry of
    the list is some unit's 8-th power. Nothing missing, nothing spare. The obstruction below is a statement
    ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_8_mod_113 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun a => [1,4,7,16,28,30,49,64,83,85,97,106,109,112].contains (pmod a 8 113))) ∧ ([1,4,7,16,28,30,49,64,83,85,97,106,109,112].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].any (fun a => pmod a 8 113 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 8 — part 1 of 6. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22] and every unit b coprime to 113, the sum of their
    8-th powers never lands on the 8-th power image [1,4,7,16,28,30,49,64,83,85,97,106,109,112] (pinned exactly
    by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 113, for
    EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the same gcd
    against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts because phi(113) =
    112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 113 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_113_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,4,7,16,28,30,49,64,83,85,97,106,109,112].contains ((pmod a 8 113 + pmod b 8 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 8 — part 2 of 6. For every unit a in
    [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44] and every unit b coprime to 113, the sum
    of their 8-th powers never lands on the 8-th power image [1,4,7,16,28,30,49,64,83,85,97,106,109,112] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    113, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the
    same gcd against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts because
    phi(113) = 112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 113 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_113_part2 : [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,4,7,16,28,30,49,64,83,85,97,106,109,112].contains ((pmod a 8 113 + pmod b 8 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 8 — part 3 of 6. For every unit a in
    [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66] and every unit b coprime to 113, the sum
    of their 8-th powers never lands on the 8-th power image [1,4,7,16,28,30,49,64,83,85,97,106,109,112] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    113, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the
    same gcd against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts because
    phi(113) = 112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 113 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_113_part3 : [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,4,7,16,28,30,49,64,83,85,97,106,109,112].contains ((pmod a 8 113 + pmod b 8 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 8 — part 4 of 6. For every unit a in
    [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88] and every unit b coprime to 113, the sum
    of their 8-th powers never lands on the 8-th power image [1,4,7,16,28,30,49,64,83,85,97,106,109,112] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    113, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the
    same gcd against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts because
    phi(113) = 112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 113 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_113_part4 : [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,4,7,16,28,30,49,64,83,85,97,106,109,112].contains ((pmod a 8 113 + pmod b 8 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 8 — part 5 of 6. For every unit a in
    [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110] and every unit b coprime to
    113, the sum of their 8-th powers never lands on the 8-th power image
    [1,4,7,16,28,30,49,64,83,85,97,106,109,112] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 113, for EVERY exponent n reducing to 8 — that is n in [8]
    of the range walked, and every larger n with the same gcd against 112. An unbounded conclusion from a finite
    table. The walk is split into 6 parts because phi(113) = 112 puts the full 112-by-112 sweep past Lean's
    default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk
    over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 113 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_113_part5 : [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,4,7,16,28,30,49,64,83,85,97,106,109,112].contains ((pmod a 8 113 + pmod b 8 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 8 — part 6 of 6. For every unit a in [111,112] and every
    unit b coprime to 113, the sum of their 8-th powers never lands on the 8-th power image
    [1,4,7,16,28,30,49,64,83,85,97,106,109,112] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 113, for EVERY exponent n reducing to 8 — that is n in [8]
    of the range walked, and every larger n with the same gcd against 112. An unbounded conclusion from a finite
    table. The walk is split into 6 parts because phi(113) = 112 puts the full 112-by-112 sweep past Lean's
    default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk
    over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 113 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_113_part6 : [111,112].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,4,7,16,28,30,49,64,83,85,97,106,109,112].contains ((pmod a 8 113 + pmod b 8 113) % 113)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 113 AND REDUCED EXPONENT 14. The 112 units raise to exactly the 8 value(s)
    [1,15,18,44,69,95,98,112] — every unit's 14-th power is in that list, and every entry of the list is some
    unit's 14-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_14_mod_113 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun a => [1,15,18,44,69,95,98,112].contains (pmod a 14 113))) ∧ ([1,15,18,44,69,95,98,112].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].any (fun a => pmod a 14 113 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 14 — part 1 of 6. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22] and every unit b coprime to 113, the sum of their
    14-th powers never lands on the 14-th power image [1,15,18,44,69,95,98,112] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 113, for EVERY exponent n
    reducing to 14 — that is n in [14] of the range walked, and every larger n with the same gcd against 112. An
    unbounded conclusion from a finite table. The walk is split into 6 parts because phi(113) = 112 puts the
    full 112-by-112 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the
    parts together are the whole walk over the units. It settles the coprime case only — classically Case I —
    and infinitely many triples sharing a factor with 113 pass through untouched, which is why this is a filter
    and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_113_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,44,69,95,98,112].contains ((pmod a 14 113 + pmod b 14 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 14 — part 2 of 6. For every unit a in
    [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44] and every unit b coprime to 113, the sum
    of their 14-th powers never lands on the 14-th power image [1,15,18,44,69,95,98,112] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 113, for EVERY
    exponent n reducing to 14 — that is n in [14] of the range walked, and every larger n with the same gcd
    against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts because phi(113) =
    112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 113 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_113_part2 : [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,44,69,95,98,112].contains ((pmod a 14 113 + pmod b 14 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 14 — part 3 of 6. For every unit a in
    [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66] and every unit b coprime to 113, the sum
    of their 14-th powers never lands on the 14-th power image [1,15,18,44,69,95,98,112] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 113, for EVERY
    exponent n reducing to 14 — that is n in [14] of the range walked, and every larger n with the same gcd
    against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts because phi(113) =
    112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 113 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_113_part3 : [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,44,69,95,98,112].contains ((pmod a 14 113 + pmod b 14 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 14 — part 4 of 6. For every unit a in
    [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88] and every unit b coprime to 113, the sum
    of their 14-th powers never lands on the 14-th power image [1,15,18,44,69,95,98,112] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 113, for EVERY
    exponent n reducing to 14 — that is n in [14] of the range walked, and every larger n with the same gcd
    against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts because phi(113) =
    112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 113 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_113_part4 : [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,44,69,95,98,112].contains ((pmod a 14 113 + pmod b 14 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 14 — part 5 of 6. For every unit a in
    [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110] and every unit b coprime to
    113, the sum of their 14-th powers never lands on the 14-th power image [1,15,18,44,69,95,98,112] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    113, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and every larger n with
    the same gcd against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts
    because phi(113) = 112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 113 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_113_part5 : [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,44,69,95,98,112].contains ((pmod a 14 113 + pmod b 14 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 14 — part 6 of 6. For every unit a in [111,112] and every
    unit b coprime to 113, the sum of their 14-th powers never lands on the 14-th power image
    [1,15,18,44,69,95,98,112] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 113, for EVERY exponent n reducing to 14 — that is n in [14] of the
    range walked, and every larger n with the same gcd against 112. An unbounded conclusion from a finite table.
    The walk is split into 6 parts because phi(113) = 112 puts the full 112-by-112 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 113 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_113_part6 : [111,112].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,15,18,44,69,95,98,112].contains ((pmod a 14 113 + pmod b 14 113) % 113)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 113 AND REDUCED EXPONENT 16. The 112 units raise to exactly the 7 value(s)
    [1,16,28,30,49,106,109] — every unit's 16-th power is in that list, and every entry of the list is some
    unit's 16-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_16_mod_113 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun a => [1,16,28,30,49,106,109].contains (pmod a 16 113))) ∧ ([1,16,28,30,49,106,109].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].any (fun a => pmod a 16 113 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 16 — part 1 of 6. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22] and every unit b coprime to 113, the sum of their
    16-th powers never lands on the 16-th power image [1,16,28,30,49,106,109] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 113, for EVERY exponent n
    reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd against 112. An
    unbounded conclusion from a finite table. The walk is split into 6 parts because phi(113) = 112 puts the
    full 112-by-112 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the
    parts together are the whole walk over the units. It settles the coprime case only — classically Case I —
    and infinitely many triples sharing a factor with 113 pass through untouched, which is why this is a filter
    and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_113_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,16,28,30,49,106,109].contains ((pmod a 16 113 + pmod b 16 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 16 — part 2 of 6. For every unit a in
    [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44] and every unit b coprime to 113, the sum
    of their 16-th powers never lands on the 16-th power image [1,16,28,30,49,106,109] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 113, for EVERY
    exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd
    against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts because phi(113) =
    112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 113 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_113_part2 : [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,16,28,30,49,106,109].contains ((pmod a 16 113 + pmod b 16 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 16 — part 3 of 6. For every unit a in
    [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66] and every unit b coprime to 113, the sum
    of their 16-th powers never lands on the 16-th power image [1,16,28,30,49,106,109] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 113, for EVERY
    exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd
    against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts because phi(113) =
    112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 113 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_113_part3 : [45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,16,28,30,49,106,109].contains ((pmod a 16 113 + pmod b 16 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 16 — part 4 of 6. For every unit a in
    [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88] and every unit b coprime to 113, the sum
    of their 16-th powers never lands on the 16-th power image [1,16,28,30,49,106,109] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 113, for EVERY
    exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with the same gcd
    against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts because phi(113) =
    112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 113 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_113_part4 : [67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,16,28,30,49,106,109].contains ((pmod a 16 113 + pmod b 16 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 16 — part 5 of 6. For every unit a in
    [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110] and every unit b coprime to
    113, the sum of their 16-th powers never lands on the 16-th power image [1,16,28,30,49,106,109] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    113, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with
    the same gcd against 112. An unbounded conclusion from a finite table. The walk is split into 6 parts
    because phi(113) = 112 puts the full 112-by-112 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 113 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_113_part5 : [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,16,28,30,49,106,109].contains ((pmod a 16 113 + pmod b 16 113) % 113)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 113, REDUCED EXPONENT 16 — part 6 of 6. For every unit a in [111,112] and every
    unit b coprime to 113, the sum of their 16-th powers never lands on the 16-th power image
    [1,16,28,30,49,106,109] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 113, for EVERY exponent n reducing to 16 — that is n in [16] of the
    range walked, and every larger n with the same gcd against 112. An unbounded conclusion from a finite table.
    The walk is split into 6 parts because phi(113) = 112 puts the full 112-by-112 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 113 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_113_part6 : [111,112].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112].all (fun b => !([1,16,28,30,49,106,109].contains ((pmod a 16 113 + pmod b 16 113) % 113)))) := by decide
