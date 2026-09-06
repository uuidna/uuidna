-- lean/FermatRing21.lean — GENERATED. THE CONGRUENCE SURVEY, RING 21 OF 21 — moduli 23, 44, 65, 86, 107, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

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

/-- THE ORDER STRUCTURE AT MODULUS 23. The 22 residues coprime to 23 are all killed by the exponent 22 — a^22 =
    1 for every unit a — and no proper divisor of 22 kills them all (all 3 of them checked). So 22 is the
    exponent of (Z/23)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 22),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_23 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => pmod a 22 23 == 1)) ∧ ([1,2,11].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => pmod a k 23 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 23, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 23), with
    all three coprime to 23, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,7,9,13,15,17,19,21,23] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_23 : (pmod 1 1 23 + pmod 1 1 23) % 23 = pmod 2 1 23 := by decide

/-- NO OBSTRUCTION AT MODULUS 23, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 5^2 (mod 23), with
    all three coprime to 23, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_23 : (pmod 1 2 23 + pmod 1 2 23) % 23 = pmod 5 2 23 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 23 AND REDUCED EXPONENT 11. The 22 units raise to exactly the 2 value(s)
    [1,22] — every unit's 11-th power is in that list, and every entry of the list is some unit's 11-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_11_mod_23 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1,22].contains (pmod a 11 23))) ∧ ([1,22].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].any (fun a => pmod a 11 23 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 23, REDUCED EXPONENT 11. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22] and every unit b coprime to 23, the sum of their
    11-th powers never lands on the 11-th power image [1,22] (pinned exactly by the theorem above). So x^n + y^n
    = z^n has NO solution in integers with x, y, z all coprime to 23, for EVERY exponent n reducing to 11 — that
    is n in [11] of the range walked, and every larger n with the same gcd against 22. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 23 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_11_mod_23 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun b => !([1,22].contains ((pmod a 11 23 + pmod b 11 23) % 23)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 23 AND REDUCED EXPONENT 22. The 22 units raise to exactly the 1 value(s) [1] —
    every unit's 22-th power is in that list, and every entry of the list is some unit's 22-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_22_mod_23 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1].contains (pmod a 22 23))) ∧ ([1].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].any (fun a => pmod a 22 23 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 23, REDUCED EXPONENT 22. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22] and every unit b coprime to 23, the sum of their
    22-th powers never lands on the 22-th power image [1] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 23, for EVERY exponent n reducing to 22 — that
    is n in [22] of the range walked, and every larger n with the same gcd against 22. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 23 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_22_mod_23 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].all (fun b => !([1].contains ((pmod a 22 23 + pmod b 22 23) % 23)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 44. The 20 residues coprime to 44 are all killed by the exponent 10 — a^10 =
    1 for every unit a — and no proper divisor of 10 kills them all (all 3 of them checked). So 10 is the
    exponent of (Z/44)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 10),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_44 : ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => pmod a 10 44 == 1)) ∧ ([1,2,5].all (fun k => !([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => pmod a k 44 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 44 AND REDUCED EXPONENT 1. The 20 units raise to exactly the 20 value(s)
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] — every unit's 1-th power is in that list, and
    every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is
    a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_44 : ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].contains (pmod a 1 44))) ∧ ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].any (fun a => pmod a 1 44 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 44, REDUCED EXPONENT 1. For every unit a in
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] and every unit b coprime to 44, the sum of their
    1-th powers never lands on the 1-th power image [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 44, for EVERY exponent n reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range
    walked, and every larger n with the same gcd against 10. An unbounded conclusion from a finite table. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 44
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_44 : [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun b => !([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].contains ((pmod a 1 44 + pmod b 1 44) % 44)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 44 AND REDUCED EXPONENT 2. The 20 units raise to exactly the 5 value(s)
    [1,5,9,25,37] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_44 : ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,5,9,25,37].contains (pmod a 2 44))) ∧ ([1,5,9,25,37].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].any (fun a => pmod a 2 44 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 44, REDUCED EXPONENT 2. For every unit a in
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] and every unit b coprime to 44, the sum of their
    2-th powers never lands on the 2-th power image [1,5,9,25,37] (pinned exactly by the theorem above). So x^n
    + y^n = z^n has NO solution in integers with x, y, z all coprime to 44, for EVERY exponent n reducing to 2 —
    that is n in [4,6,8,12,14,16,18,22] of the range walked, and every larger n with the same gcd against 10. An
    unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 44 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_44 : [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun b => !([1,5,9,25,37].contains ((pmod a 2 44 + pmod b 2 44) % 44)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 44 AND REDUCED EXPONENT 5. The 20 units raise to exactly the 4 value(s)
    [1,21,23,43] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_44 : ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,21,23,43].contains (pmod a 5 44))) ∧ ([1,21,23,43].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].any (fun a => pmod a 5 44 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 44, REDUCED EXPONENT 5. For every unit a in
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] and every unit b coprime to 44, the sum of their
    5-th powers never lands on the 5-th power image [1,21,23,43] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 44, for EVERY exponent n reducing to 5 —
    that is n in [5,15] of the range walked, and every larger n with the same gcd against 10. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 44 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_44 : [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun b => !([1,21,23,43].contains ((pmod a 5 44 + pmod b 5 44) % 44)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 44 AND REDUCED EXPONENT 10. The 20 units raise to exactly the 1 value(s) [1] —
    every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_44 : ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1].contains (pmod a 10 44))) ∧ ([1].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].any (fun a => pmod a 10 44 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 44, REDUCED EXPONENT 10. For every unit a in
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43] and every unit b coprime to 44, the sum of their
    10-th powers never lands on the 10-th power image [1] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 44, for EVERY exponent n reducing to 10 — that
    is n in [10,20] of the range walked, and every larger n with the same gcd against 10. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 44 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_44 : [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43].all (fun b => !([1].contains ((pmod a 10 44 + pmod b 10 44) % 44)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 65. The 48 residues coprime to 65 are all killed by the exponent 12 — a^12 =
    1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the
    exponent of (Z/65)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_65 : ([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => pmod a 12 65 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => pmod a k 65 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 65), with
    all three coprime to 65, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_65 : (pmod 1 1 65 + pmod 1 1 65) % 65 = pmod 2 1 65 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 65 AND REDUCED EXPONENT 2. The 48 units raise to exactly the 12 value(s)
    [1,4,9,14,16,29,36,49,51,56,61,64] — every unit's 2-th power is in that list, and every entry of the list is
    some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set,
    so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_65 : ([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,4,9,14,16,29,36,49,51,56,61,64].contains (pmod a 2 65))) ∧ ([1,4,9,14,16,29,36,49,51,56,61,64].all (fun v => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].any (fun a => pmod a 2 65 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 2. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64]
    and every unit b coprime to 65, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,9,14,16,29,36,49,51,56,61,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution
    in integers with x, y, z all coprime to 65, for EVERY exponent n reducing to 2 — that is n in [10,14,22] of
    the range walked, and every larger n with the same gcd against 12. An unbounded conclusion from a finite
    table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 65 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_65 : [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun b => !([1,4,9,14,16,29,36,49,51,56,61,64].contains ((pmod a 2 65 + pmod b 2 65) % 65)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 65 AND REDUCED EXPONENT 3. The 48 units raise to exactly the 16 value(s)
    [1,8,12,14,18,21,27,31,34,38,44,47,51,53,57,64] — every unit's 3-th power is in that list, and every entry
    of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement
    ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_65 : ([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,8,12,14,18,21,27,31,34,38,44,47,51,53,57,64].contains (pmod a 3 65))) ∧ ([1,8,12,14,18,21,27,31,34,38,44,47,51,53,57,64].all (fun v => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].any (fun a => pmod a 3 65 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 3. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64]
    and every unit b coprime to 65, the sum of their 3-th powers never lands on the 3-th power image
    [1,8,12,14,18,21,27,31,34,38,44,47,51,53,57,64] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 65, for EVERY exponent n reducing to 3 — that is n
    in [3,9,15,21] of the range walked, and every larger n with the same gcd against 12. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 65 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_65 : [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun b => !([1,8,12,14,18,21,27,31,34,38,44,47,51,53,57,64].contains ((pmod a 3 65 + pmod b 3 65) % 65)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 65 AND REDUCED EXPONENT 4. The 48 units raise to exactly the 3 value(s)
    [1,16,61] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_65 : ([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,16,61].contains (pmod a 4 65))) ∧ ([1,16,61].all (fun v => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].any (fun a => pmod a 4 65 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 4. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64]
    and every unit b coprime to 65, the sum of their 4-th powers never lands on the 4-th power image [1,16,61]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 65, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of the range walked, and every
    larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 65 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_65 : [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun b => !([1,16,61].contains ((pmod a 4 65 + pmod b 4 65) % 65)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 65 AND REDUCED EXPONENT 6. The 48 units raise to exactly the 4 value(s)
    [1,14,51,64] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_65 : ([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,14,51,64].contains (pmod a 6 65))) ∧ ([1,14,51,64].all (fun v => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].any (fun a => pmod a 6 65 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 6. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64]
    and every unit b coprime to 65, the sum of their 6-th powers never lands on the 6-th power image
    [1,14,51,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 65, for EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and
    every larger n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 65 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_65 : [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun b => !([1,14,51,64].contains ((pmod a 6 65 + pmod b 6 65) % 65)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 65 AND REDUCED EXPONENT 12. The 48 units raise to exactly the 1 value(s) [1] —
    every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_12_mod_65 : ([1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1].contains (pmod a 12 65))) ∧ ([1].all (fun v => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].any (fun a => pmod a 12 65 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 65, REDUCED EXPONENT 12. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64]
    and every unit b coprime to 65, the sum of their 12-th powers never lands on the 12-th power image [1]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 65, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger
    n with the same gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case
    only — classically Case I — and infinitely many triples sharing a factor with 65 pass through untouched,
    which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_65 : [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun a => [1,2,3,4,6,7,8,9,11,12,14,16,17,18,19,21,22,23,24,27,28,29,31,32,33,34,36,37,38,41,42,43,44,46,47,48,49,51,53,54,56,57,58,59,61,62,63,64].all (fun b => !([1].contains ((pmod a 12 65 + pmod b 12 65) % 65)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 86. The 42 residues coprime to 86 are all killed by the exponent 42 — a^42 =
    1 for every unit a — and no proper divisor of 42 kills them all (all 7 of them checked). So 42 is the
    exponent of (Z/86)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 42),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_86 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => pmod a 42 86 == 1)) ∧ ([1,2,3,6,7,14,21].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => pmod a k 86 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 1. The 42 units raise to exactly the 42 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85]
    — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_86 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].contains (pmod a 1 86))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 1 86 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 1. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85]
    and every unit b coprime to 86, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 86, for EVERY exponent n reducing to 1 — that is n in [5,11,13,17,19,23] of the range walked, and
    every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 86 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_86 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].contains ((pmod a 1 86 + pmod b 1 86) % 86)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 2. The 42 units raise to exactly the 21 value(s)
    [1,9,11,13,15,17,21,23,25,31,35,41,47,49,53,57,59,67,79,81,83] — every unit's 2-th power is in that list,
    and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below
    is a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_86 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,9,11,13,15,17,21,23,25,31,35,41,47,49,53,57,59,67,79,81,83].contains (pmod a 2 86))) ∧ ([1,9,11,13,15,17,21,23,25,31,35,41,47,49,53,57,59,67,79,81,83].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 2 86 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85]
    and every unit b coprime to 86, the sum of their 2-th powers never lands on the 2-th power image
    [1,9,11,13,15,17,21,23,25,31,35,41,47,49,53,57,59,67,79,81,83] (pinned exactly by the theorem above). So x^n
    + y^n = z^n has NO solution in integers with x, y, z all coprime to 86, for EVERY exponent n reducing to 2 —
    that is n in [4,8,10,16,20,22] of the range walked, and every larger n with the same gcd against 42. An
    unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 86 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_86 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,9,11,13,15,17,21,23,25,31,35,41,47,49,53,57,59,67,79,81,83].contains ((pmod a 2 86 + pmod b 2 86) % 86)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 3. The 42 units raise to exactly the 14 value(s)
    [1,11,21,27,35,39,41,45,47,51,59,65,75,85] — every unit's 3-th power is in that list, and every entry of the
    list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT
    this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_86 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,11,21,27,35,39,41,45,47,51,59,65,75,85].contains (pmod a 3 86))) ∧ ([1,11,21,27,35,39,41,45,47,51,59,65,75,85].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 3 86 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 3. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85]
    and every unit b coprime to 86, the sum of their 3-th powers never lands on the 3-th power image
    [1,11,21,27,35,39,41,45,47,51,59,65,75,85] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 86, for EVERY exponent n reducing to 3 — that is n in
    [3,9,15] of the range walked, and every larger n with the same gcd against 42. An unbounded conclusion from
    a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 86 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_86 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,11,21,27,35,39,41,45,47,51,59,65,75,85].contains ((pmod a 3 86 + pmod b 3 86) % 86)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 6. The 42 units raise to exactly the 7 value(s)
    [1,11,21,35,41,47,59] — every unit's 6-th power is in that list, and every entry of the list is some unit's
    6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_86 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,11,21,35,41,47,59].contains (pmod a 6 86))) ∧ ([1,11,21,35,41,47,59].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 6 86 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 6. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85]
    and every unit b coprime to 86, the sum of their 6-th powers never lands on the 6-th power image
    [1,11,21,35,41,47,59] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 86, for EVERY exponent n reducing to 6 — that is n in [6,12,18] of the range
    walked, and every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 86
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_86 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,11,21,35,41,47,59].contains ((pmod a 6 86 + pmod b 6 86) % 86)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 7. The 42 units raise to exactly the 6 value(s)
    [1,7,37,49,79,85] — every unit's 7-th power is in that list, and every entry of the list is some unit's 7-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_7_mod_86 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,7,37,49,79,85].contains (pmod a 7 86))) ∧ ([1,7,37,49,79,85].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 7 86 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 7. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85]
    and every unit b coprime to 86, the sum of their 7-th powers never lands on the 7-th power image
    [1,7,37,49,79,85] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with
    x, y, z all coprime to 86, for EVERY exponent n reducing to 7 — that is n in [7] of the range walked, and
    every larger n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 86 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_86 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,7,37,49,79,85].contains ((pmod a 7 86 + pmod b 7 86) % 86)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 14. The 42 units raise to exactly the 3 value(s)
    [1,49,79] — every unit's 14-th power is in that list, and every entry of the list is some unit's 14-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_14_mod_86 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,49,79].contains (pmod a 14 86))) ∧ ([1,49,79].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 14 86 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 14. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85]
    and every unit b coprime to 86, the sum of their 14-th powers never lands on the 14-th power image [1,49,79]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 86, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and every larger
    n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case
    only — classically Case I — and infinitely many triples sharing a factor with 86 pass through untouched,
    which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_86 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,49,79].contains ((pmod a 14 86 + pmod b 14 86) % 86)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 86 AND REDUCED EXPONENT 21. The 42 units raise to exactly the 2 value(s)
    [1,85] — every unit's 21-th power is in that list, and every entry of the list is some unit's 21-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_21_mod_86 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,85].contains (pmod a 21 86))) ∧ ([1,85].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].any (fun a => pmod a 21 86 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 86, REDUCED EXPONENT 21. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85]
    and every unit b coprime to 86, the sum of their 21-th powers never lands on the 21-th power image [1,85]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 86, for EVERY exponent n reducing to 21 — that is n in [21] of the range walked, and every larger
    n with the same gcd against 42. An unbounded conclusion from a finite table. It settles the coprime case
    only — classically Case I — and infinitely many triples sharing a factor with 86 pass through untouched,
    which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_21_mod_86 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85].all (fun b => !([1,85].contains ((pmod a 21 86 + pmod b 21 86) % 86)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 107. The 106 residues coprime to 107 are all killed by the exponent 106 —
    a^106 = 1 for every unit a — and no proper divisor of 106 kills them all (all 3 of them checked). So 106 is
    the exponent of (Z/107)*, the Carmichael lambda, computed here rather than looked up. This is the number
    every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n,
    106), which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_107 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106].all (fun a => pmod a 106 107 == 1)) ∧ ([1,2,53].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106].all (fun a => pmod a k 107 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 107, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 107),
    with all three coprime to 107, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked. It is sealed for
    the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_107 : (pmod 1 1 107 + pmod 1 1 107) % 107 = pmod 2 1 107 := by decide

/-- NO OBSTRUCTION AT MODULUS 107, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 3^2 = 44^2 (mod 107),
    with all three coprime to 107, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_107 : (pmod 1 2 107 + pmod 3 2 107) % 107 = pmod 44 2 107 := by decide
