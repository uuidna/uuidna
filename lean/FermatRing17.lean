-- lean/FermatRing17.lean — GENERATED. THE CONGRUENCE SURVEY, RING 17 OF 21 — moduli 19, 40, 61, 82, 103, 124, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

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

/-- THE ORDER STRUCTURE AT MODULUS 19. The 18 residues coprime to 19 are all killed by the exponent 18 — a^18 =
    1 for every unit a — and no proper divisor of 18 kills them all (all 5 of them checked). So 18 is the
    exponent of (Z/19)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 18),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_19 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun a => pmod a 18 19 == 1)) ∧ ([1,2,3,6,9].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun a => pmod a k 19 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 19, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 19), with
    all three coprime to 19, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_19 : (pmod 1 1 19 + pmod 1 1 19) % 19 = pmod 2 1 19 := by decide

/-- NO OBSTRUCTION AT MODULUS 19, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 2^2 = 9^2 (mod 19), with
    all three coprime to 19, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_19 : (pmod 1 2 19 + pmod 2 2 19) % 19 = pmod 9 2 19 := by decide

/-- NO OBSTRUCTION AT MODULUS 19, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 4^3 = 2^3 (mod 19), with
    all three coprime to 19, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 3 — that is n in [3,15,21] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_3_mod_19 : (pmod 1 3 19 + pmod 4 3 19) % 19 = pmod 2 3 19 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 19 AND REDUCED EXPONENT 6. The 18 units raise to exactly the 3 value(s)
    [1,7,11] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_19 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun a => [1,7,11].contains (pmod a 6 19))) ∧ ([1,7,11].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].any (fun a => pmod a 6 19 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 19, REDUCED EXPONENT 6. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18] and every unit b coprime to 19, the sum of their 6-th powers
    never lands on the 6-th power image [1,7,11] (pinned exactly by the theorem above). So x^n + y^n = z^n has
    NO solution in integers with x, y, z all coprime to 19, for EVERY exponent n reducing to 6 — that is n in
    [6,12] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a
    finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a
    factor with 19 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_19 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun b => !([1,7,11].contains ((pmod a 6 19 + pmod b 6 19) % 19)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 19 AND REDUCED EXPONENT 9. The 18 units raise to exactly the 2 value(s) [1,18]
    — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_9_mod_19 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun a => [1,18].contains (pmod a 9 19))) ∧ ([1,18].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].any (fun a => pmod a 9 19 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 19, REDUCED EXPONENT 9. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18] and every unit b coprime to 19, the sum of their 9-th powers
    never lands on the 9-th power image [1,18] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 19, for EVERY exponent n reducing to 9 — that is n in [9]
    of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite
    table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 19 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_19 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun b => !([1,18].contains ((pmod a 9 19 + pmod b 9 19) % 19)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 19 AND REDUCED EXPONENT 18. The 18 units raise to exactly the 1 value(s) [1] —
    every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_18_mod_19 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun a => [1].contains (pmod a 18 19))) ∧ ([1].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].any (fun a => pmod a 18 19 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 19, REDUCED EXPONENT 18. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18] and every unit b coprime to 19, the sum of their 18-th powers
    never lands on the 18-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 19, for EVERY exponent n reducing to 18 — that is n in [18]
    of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a finite
    table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 19 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_19 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].all (fun b => !([1].contains ((pmod a 18 19 + pmod b 18 19) % 19)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 40. The 16 residues coprime to 40 are all killed by the exponent 4 — a^4 = 1
    for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent
    of (Z/40)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction
    at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_40 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun a => pmod a 4 40 == 1)) ∧ ([1,2].all (fun k => !([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun a => pmod a k 40 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 40 AND REDUCED EXPONENT 1. The 16 units raise to exactly the 16 value(s)
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39] — every unit's 1-th power is in that list, and every entry of
    the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement
    ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_40 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].contains (pmod a 1 40))) ∧ ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].any (fun a => pmod a 1 40 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 40, REDUCED EXPONENT 1. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39] and every unit b coprime to 40, the sum of their 1-th powers
    never lands on the 1-th power image [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 40, for EVERY
    exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger
    n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only
    — classically Case I — and infinitely many triples sharing a factor with 40 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_40 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun b => !([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].contains ((pmod a 1 40 + pmod b 1 40) % 40)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 40 AND REDUCED EXPONENT 2. The 16 units raise to exactly the 2 value(s) [1,9]
    — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_40 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun a => [1,9].contains (pmod a 2 40))) ∧ ([1,9].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].any (fun a => pmod a 2 40 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 40, REDUCED EXPONENT 2. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39] and every unit b coprime to 40, the sum of their 2-th powers
    never lands on the 2-th power image [1,9] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 40, for EVERY exponent n reducing to 2 — that is n in
    [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 40 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_40 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun b => !([1,9].contains ((pmod a 2 40 + pmod b 2 40) % 40)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 40 AND REDUCED EXPONENT 4. The 16 units raise to exactly the 1 value(s) [1] —
    every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_40 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun a => [1].contains (pmod a 4 40))) ∧ ([1].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].any (fun a => pmod a 4 40 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 40, REDUCED EXPONENT 4. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39] and every unit b coprime to 40, the sum of their 4-th powers
    never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 40, for EVERY exponent n reducing to 4 — that is n in
    [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 40 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_40 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39].all (fun b => !([1].contains ((pmod a 4 40 + pmod b 4 40) % 40)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 61. The 60 residues coprime to 61 are all killed by the exponent 60 — a^60 =
    1 for every unit a — and no proper divisor of 60 kills them all (all 11 of them checked). So 60 is the
    exponent of (Z/61)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 60),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_61 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun a => pmod a 60 61 == 1)) ∧ ([1,2,3,4,5,6,10,12,15,20,30].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun a => pmod a k 61 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 61), with
    all three coprime to 61, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [7,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_61 : (pmod 1 1 61 + pmod 1 1 61) % 61 = pmod 2 1 61 := by decide

/-- NO OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 2^2 = 26^2 (mod 61),
    with all three coprime to 61, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [14,22] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_61 : (pmod 1 2 61 + pmod 2 2 61) % 61 = pmod 26 2 61 := by decide

/-- NO OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 2^3 = 16^3 (mod 61),
    with all three coprime to 61, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 3 — that is n in [3,9,21] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_3_mod_61 : (pmod 1 3 61 + pmod 2 3 61) % 61 = pmod 16 3 61 := by decide

/-- NO OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 4 — the control, and it fires. 1^4 + 4^4 = 13^4 (mod 61),
    with all three coprime to 61, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 4 — that is n in [4,8,16] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_4_mod_61 : (pmod 1 4 61 + pmod 4 4 61) % 61 = pmod 13 4 61 := by decide

/-- NO OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 5 — the control, and it fires. 1^5 + 12^5 = 5^5 (mod 61),
    with all three coprime to 61, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 5 — that is n in [5] of the range walked. It is sealed for the same reason the blocked
    cases are: a survey that recorded only its successes would be an argument rather than a census, and the
    blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_5_mod_61 : (pmod 1 5 61 + pmod 12 5 61) % 61 = pmod 5 5 61 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 61 AND REDUCED EXPONENT 6. The 60 units raise to exactly the 10 value(s)
    [1,3,9,20,27,34,41,52,58,60] — every unit's 6-th power is in that list, and every entry of the list is some
    unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_61 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun a => [1,3,9,20,27,34,41,52,58,60].contains (pmod a 6 61))) ∧ ([1,3,9,20,27,34,41,52,58,60].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].any (fun a => pmod a 6 61 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 6 — part 1 of 2. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]
    and every unit b coprime to 61, the sum of their 6-th powers never lands on the 6-th power image
    [1,3,9,20,27,34,41,52,58,60] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 61, for EVERY exponent n reducing to 6 — that is n in [6,18] of the
    range walked, and every larger n with the same gcd against 60. An unbounded conclusion from a finite table.
    The walk is split into 2 parts because phi(61) = 60 puts the full 60-by-60 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 61 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_61_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun b => !([1,3,9,20,27,34,41,52,58,60].contains ((pmod a 6 61 + pmod b 6 61) % 61)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 6 — part 2 of 2. For every unit a in
    [42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60] and every unit b coprime to 61, the sum of their
    6-th powers never lands on the 6-th power image [1,3,9,20,27,34,41,52,58,60] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 61, for EVERY exponent n
    reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 60. An
    unbounded conclusion from a finite table. The walk is split into 2 parts because phi(61) = 60 puts the full
    60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 61 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_61_part2 : [42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun b => !([1,3,9,20,27,34,41,52,58,60].contains ((pmod a 6 61 + pmod b 6 61) % 61)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 10 — the control, and it fires. 1^10 + 4^10 = 2^10 (mod 61),
    with all three coprime to 61, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 10 — that is n in [10] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_10_mod_61 : (pmod 1 10 61 + pmod 4 10 61) % 61 = pmod 2 10 61 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 61 AND REDUCED EXPONENT 12. The 60 units raise to exactly the 5 value(s)
    [1,9,20,34,58] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_12_mod_61 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun a => [1,9,20,34,58].contains (pmod a 12 61))) ∧ ([1,9,20,34,58].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].any (fun a => pmod a 12 61 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 12 — part 1 of 2. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]
    and every unit b coprime to 61, the sum of their 12-th powers never lands on the 12-th power image
    [1,9,20,34,58] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 61, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and
    every larger n with the same gcd against 60. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(61) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 61 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_61_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun b => !([1,9,20,34,58].contains ((pmod a 12 61 + pmod b 12 61) % 61)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 12 — part 2 of 2. For every unit a in
    [42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60] and every unit b coprime to 61, the sum of their
    12-th powers never lands on the 12-th power image [1,9,20,34,58] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 61, for EVERY exponent n reducing to
    12 — that is n in [12] of the range walked, and every larger n with the same gcd against 60. An unbounded
    conclusion from a finite table. The walk is split into 2 parts because phi(61) = 60 puts the full 60-by-60
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 61 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_61_part2 : [42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun b => !([1,9,20,34,58].contains ((pmod a 12 61 + pmod b 12 61) % 61)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 61 AND REDUCED EXPONENT 15. The 60 units raise to exactly the 4 value(s)
    [1,11,50,60] — every unit's 15-th power is in that list, and every entry of the list is some unit's 15-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_15_mod_61 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun a => [1,11,50,60].contains (pmod a 15 61))) ∧ ([1,11,50,60].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].any (fun a => pmod a 15 61 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 15 — part 1 of 2. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]
    and every unit b coprime to 61, the sum of their 15-th powers never lands on the 15-th power image
    [1,11,50,60] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 61, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and
    every larger n with the same gcd against 60. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(61) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 61 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_15_mod_61_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun b => !([1,11,50,60].contains ((pmod a 15 61 + pmod b 15 61) % 61)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 15 — part 2 of 2. For every unit a in
    [42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60] and every unit b coprime to 61, the sum of their
    15-th powers never lands on the 15-th power image [1,11,50,60] (pinned exactly by the theorem above). So x^n
    + y^n = z^n has NO solution in integers with x, y, z all coprime to 61, for EVERY exponent n reducing to 15
    — that is n in [15] of the range walked, and every larger n with the same gcd against 60. An unbounded
    conclusion from a finite table. The walk is split into 2 parts because phi(61) = 60 puts the full 60-by-60
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 61 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_15_mod_61_part2 : [42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun b => !([1,11,50,60].contains ((pmod a 15 61 + pmod b 15 61) % 61)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 61 AND REDUCED EXPONENT 20. The 60 units raise to exactly the 3 value(s)
    [1,13,47] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_20_mod_61 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun a => [1,13,47].contains (pmod a 20 61))) ∧ ([1,13,47].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].any (fun a => pmod a 20 61 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 20 — part 1 of 2. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41]
    and every unit b coprime to 61, the sum of their 20-th powers never lands on the 20-th power image [1,13,47]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 61, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger
    n with the same gcd against 60. An unbounded conclusion from a finite table. The walk is split into 2 parts
    because phi(61) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 61 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_61_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun b => !([1,13,47].contains ((pmod a 20 61 + pmod b 20 61) % 61)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 61, REDUCED EXPONENT 20 — part 2 of 2. For every unit a in
    [42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60] and every unit b coprime to 61, the sum of their
    20-th powers never lands on the 20-th power image [1,13,47] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 61, for EVERY exponent n reducing to 20 —
    that is n in [20] of the range walked, and every larger n with the same gcd against 60. An unbounded
    conclusion from a finite table. The walk is split into 2 parts because phi(61) = 60 puts the full 60-by-60
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 61 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_61_part2 : [42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60].all (fun b => !([1,13,47].contains ((pmod a 20 61 + pmod b 20 61) % 61)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 82. The 40 residues coprime to 82 are all killed by the exponent 40 — a^40 =
    1 for every unit a — and no proper divisor of 40 kills them all (all 7 of them checked). So 40 is the
    exponent of (Z/82)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 40),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_82 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => pmod a 40 82 == 1)) ∧ ([1,2,4,5,8,10,20].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => pmod a k 82 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 82 AND REDUCED EXPONENT 1. The 40 units raise to exactly the 40 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81]
    — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_82 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].contains (pmod a 1 82))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].any (fun a => pmod a 1 82 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 82, REDUCED EXPONENT 1. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81]
    and every unit b coprime to 82, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 82, for EVERY exponent n reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range
    walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 82
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_82 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].contains ((pmod a 1 82 + pmod b 1 82) % 82)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 82 AND REDUCED EXPONENT 2. The 40 units raise to exactly the 20 value(s)
    [1,5,9,21,23,25,31,33,37,39,43,45,49,51,57,59,61,73,77,81] — every unit's 2-th power is in that list, and
    every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is
    a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_82 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,5,9,21,23,25,31,33,37,39,43,45,49,51,57,59,61,73,77,81].contains (pmod a 2 82))) ∧ ([1,5,9,21,23,25,31,33,37,39,43,45,49,51,57,59,61,73,77,81].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].any (fun a => pmod a 2 82 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 82, REDUCED EXPONENT 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81]
    and every unit b coprime to 82, the sum of their 2-th powers never lands on the 2-th power image
    [1,5,9,21,23,25,31,33,37,39,43,45,49,51,57,59,61,73,77,81] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 82, for EVERY exponent n reducing to 2 —
    that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 40. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 82 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_82 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun b => !([1,5,9,21,23,25,31,33,37,39,43,45,49,51,57,59,61,73,77,81].contains ((pmod a 2 82 + pmod b 2 82) % 82)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 82 AND REDUCED EXPONENT 4. The 40 units raise to exactly the 10 value(s)
    [1,23,25,31,37,45,51,57,59,81] — every unit's 4-th power is in that list, and every entry of the list is
    some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set,
    so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_82 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,23,25,31,37,45,51,57,59,81].contains (pmod a 4 82))) ∧ ([1,23,25,31,37,45,51,57,59,81].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].any (fun a => pmod a 4 82 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 82, REDUCED EXPONENT 4. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81]
    and every unit b coprime to 82, the sum of their 4-th powers never lands on the 4-th power image
    [1,23,25,31,37,45,51,57,59,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 82, for EVERY exponent n reducing to 4 — that is n in [4,12] of the
    range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table.
    It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 82
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_82 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun b => !([1,23,25,31,37,45,51,57,59,81].contains ((pmod a 4 82 + pmod b 4 82) % 82)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 82 AND REDUCED EXPONENT 5. The 40 units raise to exactly the 8 value(s)
    [1,3,9,27,55,73,79,81] — every unit's 5-th power is in that list, and every entry of the list is some unit's
    5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_82 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,3,9,27,55,73,79,81].contains (pmod a 5 82))) ∧ ([1,3,9,27,55,73,79,81].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].any (fun a => pmod a 5 82 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 82, REDUCED EXPONENT 5. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81]
    and every unit b coprime to 82, the sum of their 5-th powers never lands on the 5-th power image
    [1,3,9,27,55,73,79,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 82, for EVERY exponent n reducing to 5 — that is n in [5,15] of the range
    walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 82
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_82 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun b => !([1,3,9,27,55,73,79,81].contains ((pmod a 5 82 + pmod b 5 82) % 82)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 82 AND REDUCED EXPONENT 8. The 40 units raise to exactly the 5 value(s)
    [1,37,51,57,59] — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_8_mod_82 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,37,51,57,59].contains (pmod a 8 82))) ∧ ([1,37,51,57,59].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].any (fun a => pmod a 8 82 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 82, REDUCED EXPONENT 8. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81]
    and every unit b coprime to 82, the sum of their 8-th powers never lands on the 8-th power image
    [1,37,51,57,59] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with
    x, y, z all coprime to 82, for EVERY exponent n reducing to 8 — that is n in [8,16] of the range walked, and
    every larger n with the same gcd against 40. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 82 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_82 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun b => !([1,37,51,57,59].contains ((pmod a 8 82 + pmod b 8 82) % 82)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 82 AND REDUCED EXPONENT 10. The 40 units raise to exactly the 4 value(s)
    [1,9,73,81] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_82 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,9,73,81].contains (pmod a 10 82))) ∧ ([1,9,73,81].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].any (fun a => pmod a 10 82 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 82, REDUCED EXPONENT 10. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81]
    and every unit b coprime to 82, the sum of their 10-th powers never lands on the 10-th power image
    [1,9,73,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y,
    z all coprime to 82, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every
    larger n with the same gcd against 40. An unbounded conclusion from a finite table. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 82 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_82 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun b => !([1,9,73,81].contains ((pmod a 10 82 + pmod b 10 82) % 82)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 82 AND REDUCED EXPONENT 20. The 40 units raise to exactly the 2 value(s)
    [1,81] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_20_mod_82 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,81].contains (pmod a 20 82))) ∧ ([1,81].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].any (fun a => pmod a 20 82 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 82, REDUCED EXPONENT 20. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81]
    and every unit b coprime to 82, the sum of their 20-th powers never lands on the 20-th power image [1,81]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 82, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger
    n with the same gcd against 40. An unbounded conclusion from a finite table. It settles the coprime case
    only — classically Case I — and infinitely many triples sharing a factor with 82 pass through untouched,
    which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_82 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81].all (fun b => !([1,81].contains ((pmod a 20 82 + pmod b 20 82) % 82)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 103. The 102 residues coprime to 103 are all killed by the exponent 102 —
    a^102 = 1 for every unit a — and no proper divisor of 102 kills them all (all 7 of them checked). So 102 is
    the exponent of (Z/103)*, the Carmichael lambda, computed here rather than looked up. This is the number
    every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n,
    102), which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_103 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102].all (fun a => pmod a 102 103 == 1)) ∧ ([1,2,3,6,17,34,51].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102].all (fun a => pmod a k 103 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 103, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 103),
    with all three coprime to 103, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,11,13,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_103 : (pmod 1 1 103 + pmod 1 1 103) % 103 = pmod 2 1 103 := by decide

/-- NO OBSTRUCTION AT MODULUS 103, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 38^2 (mod 103),
    with all three coprime to 103, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_103 : (pmod 1 2 103 + pmod 1 2 103) % 103 = pmod 38 2 103 := by decide

/-- NO OBSTRUCTION AT MODULUS 103, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 2^3 = 60^3 (mod 103),
    with all three coprime to 103, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 3 — that is n in [3,9,15,21] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_3_mod_103 : (pmod 1 3 103 + pmod 2 3 103) % 103 = pmod 60 3 103 := by decide

/-- NO OBSTRUCTION AT MODULUS 103, REDUCED EXPONENT 6 — the control, and it fires. 1^6 + 3^6 = 8^6 (mod 103),
    with all three coprime to 103, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 6 — that is n in [6,12,18] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_6_mod_103 : (pmod 1 6 103 + pmod 3 6 103) % 103 = pmod 8 6 103 := by decide

/-- NO OBSTRUCTION AT MODULUS 103, REDUCED EXPONENT 17 — the control, and it fires. 1^17 + 2^17 = 5^17 (mod
    103), with all three coprime to 103, so this modulus admits a solution-shaped triple and rules nothing out
    for any exponent reducing to 17 — that is n in [17] of the range walked. It is sealed for the same reason
    the blocked cases are: a survey that recorded only its successes would be an argument rather than a census,
    and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_17_mod_103 : (pmod 1 17 103 + pmod 2 17 103) % 103 = pmod 5 17 103 := by decide

/-- THE ORDER STRUCTURE AT MODULUS 124. The 60 residues coprime to 124 are all killed by the exponent 30 — a^30
    = 1 for every unit a — and no proper divisor of 30 kills them all (all 7 of them checked). So 30 is the
    exponent of (Z/124)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 30),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_124 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => pmod a 30 124 == 1)) ∧ ([1,2,3,5,6,10,15].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => pmod a k 124 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 124 AND REDUCED EXPONENT 1. The 60 units raise to exactly the 60 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123]
    — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_124 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].contains (pmod a 1 124))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].any (fun a => pmod a 1 124 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 1 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 124, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 124, for EVERY exponent n reducing to 1 — that is n in [7,11,13,17,19,23] of the range walked,
    and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is
    split into 2 parts because phi(124) = 60 puts the full 60-by-60 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 124
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_124_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].contains ((pmod a 1 124 + pmod b 1 124) % 124)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 1 — part 2 of 2. For every unit a in
    [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123] and every unit b coprime to 124, the
    sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 124, for EVERY exponent n reducing to 1 — that is n in [7,11,13,17,19,23] of the range walked,
    and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is
    split into 2 parts because phi(124) = 60 puts the full 60-by-60 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 124
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_124_part2 : [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].contains ((pmod a 1 124 + pmod b 1 124) % 124)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 124 AND REDUCED EXPONENT 2. The 60 units raise to exactly the 15 value(s)
    [1,5,9,25,33,41,45,49,69,81,97,101,109,113,121] — every unit's 2-th power is in that list, and every entry
    of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement
    ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_124 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,5,9,25,33,41,45,49,69,81,97,101,109,113,121].contains (pmod a 2 124))) ∧ ([1,5,9,25,33,41,45,49,69,81,97,101,109,113,121].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].any (fun a => pmod a 2 124 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 124, the sum of their 2-th powers never lands on the 2-th power image
    [1,5,9,25,33,41,45,49,69,81,97,101,109,113,121] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 124, for EVERY exponent n reducing to 2 — that is n
    in [4,8,14,16,22] of the range walked, and every larger n with the same gcd against 30. An unbounded
    conclusion from a finite table. The walk is split into 2 parts because phi(124) = 60 puts the full 60-by-60
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 124 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_124_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,5,9,25,33,41,45,49,69,81,97,101,109,113,121].contains ((pmod a 2 124 + pmod b 2 124) % 124)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in
    [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123] and every unit b coprime to 124, the
    sum of their 2-th powers never lands on the 2-th power image [1,5,9,25,33,41,45,49,69,81,97,101,109,113,121]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 124, for EVERY exponent n reducing to 2 — that is n in [4,8,14,16,22] of the range walked, and
    every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(124) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 124 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_124_part2 : [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,5,9,25,33,41,45,49,69,81,97,101,109,113,121].contains ((pmod a 2 124 + pmod b 2 124) % 124)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 124 AND REDUCED EXPONENT 3. The 60 units raise to exactly the 20 value(s)
    [1,15,23,27,29,33,35,39,47,61,63,77,85,89,91,95,97,101,109,123] — every unit's 3-th power is in that list,
    and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below
    is a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_124 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,15,23,27,29,33,35,39,47,61,63,77,85,89,91,95,97,101,109,123].contains (pmod a 3 124))) ∧ ([1,15,23,27,29,33,35,39,47,61,63,77,85,89,91,95,97,101,109,123].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].any (fun a => pmod a 3 124 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 3 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 124, the sum of their 3-th powers never lands on the 3-th power image
    [1,15,23,27,29,33,35,39,47,61,63,77,85,89,91,95,97,101,109,123] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 124, for EVERY exponent n reducing
    to 3 — that is n in [3,9,21] of the range walked, and every larger n with the same gcd against 30. An
    unbounded conclusion from a finite table. The walk is split into 2 parts because phi(124) = 60 puts the full
    60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 124 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_124_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,15,23,27,29,33,35,39,47,61,63,77,85,89,91,95,97,101,109,123].contains ((pmod a 3 124 + pmod b 3 124) % 124)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 3 — part 2 of 2. For every unit a in
    [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123] and every unit b coprime to 124, the
    sum of their 3-th powers never lands on the 3-th power image
    [1,15,23,27,29,33,35,39,47,61,63,77,85,89,91,95,97,101,109,123] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 124, for EVERY exponent n reducing
    to 3 — that is n in [3,9,21] of the range walked, and every larger n with the same gcd against 30. An
    unbounded conclusion from a finite table. The walk is split into 2 parts because phi(124) = 60 puts the full
    60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 124 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_124_part2 : [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,15,23,27,29,33,35,39,47,61,63,77,85,89,91,95,97,101,109,123].contains ((pmod a 3 124 + pmod b 3 124) % 124)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 124 AND REDUCED EXPONENT 5. The 60 units raise to exactly the 12 value(s)
    [1,5,25,37,57,61,63,67,87,99,119,123] — every unit's 5-th power is in that list, and every entry of the list
    is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this
    set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_124 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,5,25,37,57,61,63,67,87,99,119,123].contains (pmod a 5 124))) ∧ ([1,5,25,37,57,61,63,67,87,99,119,123].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].any (fun a => pmod a 5 124 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 5 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 124, the sum of their 5-th powers never lands on the 5-th power image
    [1,5,25,37,57,61,63,67,87,99,119,123] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 124, for EVERY exponent n reducing to 5 — that is n in [5]
    of the range walked, and every larger n with the same gcd against 30. An unbounded conclusion from a finite
    table. The walk is split into 2 parts because phi(124) = 60 puts the full 60-by-60 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 124 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_124_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,5,25,37,57,61,63,67,87,99,119,123].contains ((pmod a 5 124 + pmod b 5 124) % 124)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 5 — part 2 of 2. For every unit a in
    [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123] and every unit b coprime to 124, the
    sum of their 5-th powers never lands on the 5-th power image [1,5,25,37,57,61,63,67,87,99,119,123] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    124, for EVERY exponent n reducing to 5 — that is n in [5] of the range walked, and every larger n with the
    same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because
    phi(124) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 124 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_124_part2 : [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,5,25,37,57,61,63,67,87,99,119,123].contains ((pmod a 5 124 + pmod b 5 124) % 124)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 124 AND REDUCED EXPONENT 6. The 60 units raise to exactly the 5 value(s)
    [1,33,97,101,109] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_124 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,33,97,101,109].contains (pmod a 6 124))) ∧ ([1,33,97,101,109].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].any (fun a => pmod a 6 124 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 6 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 124, the sum of their 6-th powers never lands on the 6-th power image
    [1,33,97,101,109] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with
    x, y, z all coprime to 124, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range walked,
    and every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is
    split into 2 parts because phi(124) = 60 puts the full 60-by-60 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 124
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_124_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,33,97,101,109].contains ((pmod a 6 124 + pmod b 6 124) % 124)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 6 — part 2 of 2. For every unit a in
    [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123] and every unit b coprime to 124, the
    sum of their 6-th powers never lands on the 6-th power image [1,33,97,101,109] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 124, for EVERY
    exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd
    against 30. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(124) =
    60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping,
    and the parts together are the whole walk over the units. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 124 pass through untouched, which is why this is
    a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_124_part2 : [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,33,97,101,109].contains ((pmod a 6 124 + pmod b 6 124) % 124)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 124 AND REDUCED EXPONENT 10. The 60 units raise to exactly the 3 value(s)
    [1,5,25] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_124 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,5,25].contains (pmod a 10 124))) ∧ ([1,5,25].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].any (fun a => pmod a 10 124 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 10 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 124, the sum of their 10-th powers never lands on the 10-th power image [1,5,25]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 124, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every
    larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split into 2
    parts because phi(124) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split
    is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 124 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_124_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,5,25].contains ((pmod a 10 124 + pmod b 10 124) % 124)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 10 — part 2 of 2. For every unit a in
    [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123] and every unit b coprime to 124, the
    sum of their 10-th powers never lands on the 10-th power image [1,5,25] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 124, for EVERY exponent n
    reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd against 30.
    An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(124) = 60 puts the
    full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the
    parts together are the whole walk over the units. It settles the coprime case only — classically Case I —
    and infinitely many triples sharing a factor with 124 pass through untouched, which is why this is a filter
    and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_124_part2 : [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,5,25].contains ((pmod a 10 124 + pmod b 10 124) % 124)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 124 AND REDUCED EXPONENT 15. The 60 units raise to exactly the 4 value(s)
    [1,61,63,123] — every unit's 15-th power is in that list, and every entry of the list is some unit's 15-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_15_mod_124 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,61,63,123].contains (pmod a 15 124))) ∧ ([1,61,63,123].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].any (fun a => pmod a 15 124 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 15 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 124, the sum of their 15-th powers never lands on the 15-th power image
    [1,61,63,123] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 124, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and
    every larger n with the same gcd against 30. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(124) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 124 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_15_mod_124_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,61,63,123].contains ((pmod a 15 124 + pmod b 15 124) % 124)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 124, REDUCED EXPONENT 15 — part 2 of 2. For every unit a in
    [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123] and every unit b coprime to 124, the
    sum of their 15-th powers never lands on the 15-th power image [1,61,63,123] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 124, for EVERY exponent n
    reducing to 15 — that is n in [15] of the range walked, and every larger n with the same gcd against 30. An
    unbounded conclusion from a finite table. The walk is split into 2 parts because phi(124) = 60 puts the full
    60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 124 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_15_mod_124_part2 : [85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123].all (fun b => !([1,61,63,123].contains ((pmod a 15 124 + pmod b 15 124) % 124)))) := by decide
