-- lean/FermatRing1.lean — GENERATED. THE CONGRUENCE SURVEY, RING 1 OF 21 — moduli 3, 24, 45, 66, 87, 108, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

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

/-- THE ORDER STRUCTURE AT MODULUS 3. The 2 residues coprime to 3 are all killed by the exponent 2 — a^2 = 1 for
    every unit a — and no proper divisor of 2 kills them all (all 1 of them checked). So 2 is the exponent of
    (Z/3)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at
    this modulus actually turns on: an exponent n reaches the group only through gcd(n, 2), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_3 : ([1,2].all (fun a => pmod a 2 3 == 1)) ∧ ([1].all (fun k => !([1,2].all (fun a => pmod a k 3 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 3, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 3), with
    all three coprime to 3, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked. It is sealed for
    the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_3 : (pmod 1 1 3 + pmod 1 1 3) % 3 = pmod 2 1 3 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 3 AND REDUCED EXPONENT 2. The 2 units raise to exactly the 1 value(s) [1] —
    every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_3 : ([1,2].all (fun a => [1].contains (pmod a 2 3))) ∧ ([1].all (fun v => [1,2].any (fun a => pmod a 2 3 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 3, REDUCED EXPONENT 2. For every unit a in [1,2] and every unit b coprime to 3,
    the sum of their 2-th powers never lands on the 2-th power image [1] (pinned exactly by the theorem above).
    So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 3, for EVERY exponent n reducing
    to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked, and every larger n with the same gcd
    against 2. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case
    I — and infinitely many triples sharing a factor with 3 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_3 : [1,2].all (fun a => [1,2].all (fun b => !([1].contains ((pmod a 2 3 + pmod b 2 3) % 3)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 24. The 8 residues coprime to 24 are all killed by the exponent 2 — a^2 = 1
    for every unit a — and no proper divisor of 2 kills them all (all 1 of them checked). So 2 is the exponent
    of (Z/24)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction
    at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 2), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_24 : ([1,5,7,11,13,17,19,23].all (fun a => pmod a 2 24 == 1)) ∧ ([1].all (fun k => !([1,5,7,11,13,17,19,23].all (fun a => pmod a k 24 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 24 AND REDUCED EXPONENT 1. The 8 units raise to exactly the 8 value(s)
    [1,5,7,11,13,17,19,23] — every unit's 1-th power is in that list, and every entry of the list is some unit's
    1-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_24 : ([1,5,7,11,13,17,19,23].all (fun a => [1,5,7,11,13,17,19,23].contains (pmod a 1 24))) ∧ ([1,5,7,11,13,17,19,23].all (fun v => [1,5,7,11,13,17,19,23].any (fun a => pmod a 1 24 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 24, REDUCED EXPONENT 1. For every unit a in [1,5,7,11,13,17,19,23] and every unit
    b coprime to 24, the sum of their 1-th powers never lands on the 1-th power image [1,5,7,11,13,17,19,23]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 24, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range
    walked, and every larger n with the same gcd against 2. An unbounded conclusion from a finite table. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 24
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_24 : [1,5,7,11,13,17,19,23].all (fun a => [1,5,7,11,13,17,19,23].all (fun b => !([1,5,7,11,13,17,19,23].contains ((pmod a 1 24 + pmod b 1 24) % 24)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 24 AND REDUCED EXPONENT 2. The 8 units raise to exactly the 1 value(s) [1] —
    every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_24 : ([1,5,7,11,13,17,19,23].all (fun a => [1].contains (pmod a 2 24))) ∧ ([1].all (fun v => [1,5,7,11,13,17,19,23].any (fun a => pmod a 2 24 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 24, REDUCED EXPONENT 2. For every unit a in [1,5,7,11,13,17,19,23] and every unit
    b coprime to 24, the sum of their 2-th powers never lands on the 2-th power image [1] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 24, for EVERY
    exponent n reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked, and every larger n
    with the same gcd against 2. An unbounded conclusion from a finite table. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 24 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_24 : [1,5,7,11,13,17,19,23].all (fun a => [1,5,7,11,13,17,19,23].all (fun b => !([1].contains ((pmod a 2 24 + pmod b 2 24) % 24)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 45. The 24 residues coprime to 45 are all killed by the exponent 12 — a^12 =
    1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the
    exponent of (Z/45)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_45 : ([1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => pmod a 12 45 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => pmod a k 45 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 45, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 45), with
    all three coprime to 45, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_45 : (pmod 1 1 45 + pmod 1 1 45) % 45 = pmod 2 1 45 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 45 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 6 value(s)
    [1,4,16,19,31,34] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_45 : ([1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => [1,4,16,19,31,34].contains (pmod a 2 45))) ∧ ([1,4,16,19,31,34].all (fun v => [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].any (fun a => pmod a 2 45 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 45, REDUCED EXPONENT 2. For every unit a in
    [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44] and every unit b coprime to 45, the sum
    of their 2-th powers never lands on the 2-th power image [1,4,16,19,31,34] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 45, for EVERY exponent n
    reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against
    12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 45 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_45 : [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun b => !([1,4,16,19,31,34].contains ((pmod a 2 45 + pmod b 2 45) % 45)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 45 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s)
    [1,8,17,19,26,28,37,44] — every unit's 3-th power is in that list, and every entry of the list is some
    unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_45 : ([1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => [1,8,17,19,26,28,37,44].contains (pmod a 3 45))) ∧ ([1,8,17,19,26,28,37,44].all (fun v => [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].any (fun a => pmod a 3 45 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 45, REDUCED EXPONENT 3. For every unit a in
    [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44] and every unit b coprime to 45, the sum
    of their 3-th powers never lands on the 3-th power image [1,8,17,19,26,28,37,44] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 45, for EVERY
    exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same
    gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 45 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_45 : [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun b => !([1,8,17,19,26,28,37,44].contains ((pmod a 3 45 + pmod b 3 45) % 45)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 45 AND REDUCED EXPONENT 4. The 24 units raise to exactly the 3 value(s)
    [1,16,31] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_45 : ([1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => [1,16,31].contains (pmod a 4 45))) ∧ ([1,16,31].all (fun v => [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].any (fun a => pmod a 4 45 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 45, REDUCED EXPONENT 4. For every unit a in
    [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44] and every unit b coprime to 45, the sum
    of their 4-th powers never lands on the 4-th power image [1,16,31] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 45, for EVERY exponent n reducing to
    4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An
    unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 45 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_45 : [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun b => !([1,16,31].contains ((pmod a 4 45 + pmod b 4 45) % 45)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 45 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 2 value(s) [1,19]
    — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_45 : ([1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => [1,19].contains (pmod a 6 45))) ∧ ([1,19].all (fun v => [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].any (fun a => pmod a 6 45 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 45, REDUCED EXPONENT 6. For every unit a in
    [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44] and every unit b coprime to 45, the sum
    of their 6-th powers never lands on the 6-th power image [1,19] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 45, for EVERY exponent n reducing to
    6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 45 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_45 : [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun b => !([1,19].contains ((pmod a 6 45 + pmod b 6 45) % 45)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 45 AND REDUCED EXPONENT 12. The 24 units raise to exactly the 1 value(s) [1] —
    every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_12_mod_45 : ([1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => [1].contains (pmod a 12 45))) ∧ ([1].all (fun v => [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].any (fun a => pmod a 12 45 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 45, REDUCED EXPONENT 12. For every unit a in
    [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44] and every unit b coprime to 45, the sum
    of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n
    + y^n = z^n has NO solution in integers with x, y, z all coprime to 45, for EVERY exponent n reducing to 12
    — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 45 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_45 : [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun a => [1,2,4,7,8,11,13,14,16,17,19,22,23,26,28,29,31,32,34,37,38,41,43,44].all (fun b => !([1].contains ((pmod a 12 45 + pmod b 12 45) % 45)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 66. The 20 residues coprime to 66 are all killed by the exponent 10 — a^10 =
    1 for every unit a — and no proper divisor of 10 kills them all (all 3 of them checked). So 10 is the
    exponent of (Z/66)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 10),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_66 : ([1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun a => pmod a 10 66 == 1)) ∧ ([1,2,5].all (fun k => !([1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun a => pmod a k 66 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 66 AND REDUCED EXPONENT 1. The 20 units raise to exactly the 20 value(s)
    [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65] — every unit's 1-th power is in that list, and
    every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is
    a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_66 : ([1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun a => [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].contains (pmod a 1 66))) ∧ ([1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun v => [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].any (fun a => pmod a 1 66 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 66, REDUCED EXPONENT 1. For every unit a in
    [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65] and every unit b coprime to 66, the sum of their
    1-th powers never lands on the 1-th power image [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 66, for EVERY exponent n reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range
    walked, and every larger n with the same gcd against 10. An unbounded conclusion from a finite table. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 66
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_66 : [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun a => [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun b => !([1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].contains ((pmod a 1 66 + pmod b 1 66) % 66)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 66 AND REDUCED EXPONENT 2. The 20 units raise to exactly the 5 value(s)
    [1,25,31,37,49] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_66 : ([1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun a => [1,25,31,37,49].contains (pmod a 2 66))) ∧ ([1,25,31,37,49].all (fun v => [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].any (fun a => pmod a 2 66 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 66, REDUCED EXPONENT 2. For every unit a in
    [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65] and every unit b coprime to 66, the sum of their
    2-th powers never lands on the 2-th power image [1,25,31,37,49] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 66, for EVERY exponent n reducing to
    2 — that is n in [4,6,8,12,14,16,18,22] of the range walked, and every larger n with the same gcd against
    10. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 66 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_66 : [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun a => [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun b => !([1,25,31,37,49].contains ((pmod a 2 66 + pmod b 2 66) % 66)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 66 AND REDUCED EXPONENT 5. The 20 units raise to exactly the 4 value(s)
    [1,23,43,65] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_66 : ([1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun a => [1,23,43,65].contains (pmod a 5 66))) ∧ ([1,23,43,65].all (fun v => [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].any (fun a => pmod a 5 66 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 66, REDUCED EXPONENT 5. For every unit a in
    [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65] and every unit b coprime to 66, the sum of their
    5-th powers never lands on the 5-th power image [1,23,43,65] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 66, for EVERY exponent n reducing to 5 —
    that is n in [5,15] of the range walked, and every larger n with the same gcd against 10. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 66 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_66 : [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun a => [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun b => !([1,23,43,65].contains ((pmod a 5 66 + pmod b 5 66) % 66)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 66 AND REDUCED EXPONENT 10. The 20 units raise to exactly the 1 value(s) [1] —
    every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_66 : ([1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun a => [1].contains (pmod a 10 66))) ∧ ([1].all (fun v => [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].any (fun a => pmod a 10 66 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 66, REDUCED EXPONENT 10. For every unit a in
    [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65] and every unit b coprime to 66, the sum of their
    10-th powers never lands on the 10-th power image [1] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 66, for EVERY exponent n reducing to 10 — that
    is n in [10,20] of the range walked, and every larger n with the same gcd against 10. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 66 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_66 : [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun a => [1,5,7,13,17,19,23,25,29,31,35,37,41,43,47,49,53,59,61,65].all (fun b => !([1].contains ((pmod a 10 66 + pmod b 10 66) % 66)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 87. The 56 residues coprime to 87 are all killed by the exponent 28 — a^28 =
    1 for every unit a — and no proper divisor of 28 kills them all (all 5 of them checked). So 28 is the
    exponent of (Z/87)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 28),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_87 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun a => pmod a 28 87 == 1)) ∧ ([1,2,4,7,14].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun a => pmod a k 87 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 87, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 87), with
    all three coprime to 87, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,9,11,13,15,17,19,23] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_87 : (pmod 1 1 87 + pmod 1 1 87) % 87 = pmod 2 1 87 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 87 AND REDUCED EXPONENT 2. The 56 units raise to exactly the 14 value(s)
    [1,4,7,13,16,22,25,28,34,49,52,64,67,82] — every unit's 2-th power is in that list, and every entry of the
    list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT
    this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_87 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun a => [1,4,7,13,16,22,25,28,34,49,52,64,67,82].contains (pmod a 2 87))) ∧ ([1,4,7,13,16,22,25,28,34,49,52,64,67,82].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].any (fun a => pmod a 2 87 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 87, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68]
    and every unit b coprime to 87, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,7,13,16,22,25,28,34,49,52,64,67,82] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 87, for EVERY exponent n reducing to 2 — that is n in
    [6,10,18,22] of the range walked, and every larger n with the same gcd against 28. An unbounded conclusion
    from a finite table. The walk is split into 2 parts because phi(87) = 56 puts the full 56-by-56 sweep past
    Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole
    walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 87 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_87_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun b => !([1,4,7,13,16,22,25,28,34,49,52,64,67,82].contains ((pmod a 2 87 + pmod b 2 87) % 87)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 87, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in
    [70,71,73,74,76,77,79,80,82,83,85,86] and every unit b coprime to 87, the sum of their 2-th powers never
    lands on the 2-th power image [1,4,7,13,16,22,25,28,34,49,52,64,67,82] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 87, for EVERY exponent n
    reducing to 2 — that is n in [6,10,18,22] of the range walked, and every larger n with the same gcd against
    28. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(87) = 56 puts
    the full 56-by-56 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the
    parts together are the whole walk over the units. It settles the coprime case only — classically Case I —
    and infinitely many triples sharing a factor with 87 pass through untouched, which is why this is a filter
    and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_87_part2 : [70,71,73,74,76,77,79,80,82,83,85,86].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun b => !([1,4,7,13,16,22,25,28,34,49,52,64,67,82].contains ((pmod a 2 87 + pmod b 2 87) % 87)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 87 AND REDUCED EXPONENT 4. The 56 units raise to exactly the 7 value(s)
    [1,7,16,25,49,52,82] — every unit's 4-th power is in that list, and every entry of the list is some unit's
    4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_87 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun a => [1,7,16,25,49,52,82].contains (pmod a 4 87))) ∧ ([1,7,16,25,49,52,82].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].any (fun a => pmod a 4 87 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 87, REDUCED EXPONENT 4 — part 1 of 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68]
    and every unit b coprime to 87, the sum of their 4-th powers never lands on the 4-th power image
    [1,7,16,25,49,52,82] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 87, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the
    range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table.
    The walk is split into 2 parts because phi(87) = 56 puts the full 56-by-56 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 87 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_87_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun b => !([1,7,16,25,49,52,82].contains ((pmod a 4 87 + pmod b 4 87) % 87)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 87, REDUCED EXPONENT 4 — part 2 of 2. For every unit a in
    [70,71,73,74,76,77,79,80,82,83,85,86] and every unit b coprime to 87, the sum of their 4-th powers never
    lands on the 4-th power image [1,7,16,25,49,52,82] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 87, for EVERY exponent n reducing to 4 — that is n
    in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 28. An unbounded
    conclusion from a finite table. The walk is split into 2 parts because phi(87) = 56 puts the full 56-by-56
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 87 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_87_part2 : [70,71,73,74,76,77,79,80,82,83,85,86].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun b => !([1,7,16,25,49,52,82].contains ((pmod a 4 87 + pmod b 4 87) % 87)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 87 AND REDUCED EXPONENT 7. The 56 units raise to exactly the 8 value(s)
    [1,17,28,41,46,59,70,86] — every unit's 7-th power is in that list, and every entry of the list is some
    unit's 7-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_7_mod_87 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun a => [1,17,28,41,46,59,70,86].contains (pmod a 7 87))) ∧ ([1,17,28,41,46,59,70,86].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].any (fun a => pmod a 7 87 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 87, REDUCED EXPONENT 7 — part 1 of 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68]
    and every unit b coprime to 87, the sum of their 7-th powers never lands on the 7-th power image
    [1,17,28,41,46,59,70,86] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 87, for EVERY exponent n reducing to 7 — that is n in [7,21] of the
    range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table.
    The walk is split into 2 parts because phi(87) = 56 puts the full 56-by-56 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 87 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_87_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun b => !([1,17,28,41,46,59,70,86].contains ((pmod a 7 87 + pmod b 7 87) % 87)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 87, REDUCED EXPONENT 7 — part 2 of 2. For every unit a in
    [70,71,73,74,76,77,79,80,82,83,85,86] and every unit b coprime to 87, the sum of their 7-th powers never
    lands on the 7-th power image [1,17,28,41,46,59,70,86] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 87, for EVERY exponent n reducing to 7 — that is
    n in [7,21] of the range walked, and every larger n with the same gcd against 28. An unbounded conclusion
    from a finite table. The walk is split into 2 parts because phi(87) = 56 puts the full 56-by-56 sweep past
    Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole
    walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 87 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_87_part2 : [70,71,73,74,76,77,79,80,82,83,85,86].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun b => !([1,17,28,41,46,59,70,86].contains ((pmod a 7 87 + pmod b 7 87) % 87)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 87 AND REDUCED EXPONENT 14. The 56 units raise to exactly the 2 value(s)
    [1,28] — every unit's 14-th power is in that list, and every entry of the list is some unit's 14-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_14_mod_87 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun a => [1,28].contains (pmod a 14 87))) ∧ ([1,28].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].any (fun a => pmod a 14 87 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 87, REDUCED EXPONENT 14 — part 1 of 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68]
    and every unit b coprime to 87, the sum of their 14-th powers never lands on the 14-th power image [1,28]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 87, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and every larger
    n with the same gcd against 28. An unbounded conclusion from a finite table. The walk is split into 2 parts
    because phi(87) = 56 puts the full 56-by-56 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 87 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_87_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun b => !([1,28].contains ((pmod a 14 87 + pmod b 14 87) % 87)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 87, REDUCED EXPONENT 14 — part 2 of 2. For every unit a in
    [70,71,73,74,76,77,79,80,82,83,85,86] and every unit b coprime to 87, the sum of their 14-th powers never
    lands on the 14-th power image [1,28] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 87, for EVERY exponent n reducing to 14 — that is n in [14]
    of the range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite
    table. The walk is split into 2 parts because phi(87) = 56 puts the full 56-by-56 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 87 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_87_part2 : [70,71,73,74,76,77,79,80,82,83,85,86].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,82,83,85,86].all (fun b => !([1,28].contains ((pmod a 14 87 + pmod b 14 87) % 87)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 108. The 36 residues coprime to 108 are all killed by the exponent 18 — a^18
    = 1 for every unit a — and no proper divisor of 18 kills them all (all 5 of them checked). So 18 is the
    exponent of (Z/108)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 18),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_108 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => pmod a 18 108 == 1)) ∧ ([1,2,3,6,9].all (fun k => !([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => pmod a k 108 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 108 AND REDUCED EXPONENT 1. The 36 units raise to exactly the 36 value(s)
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107]
    — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_108 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].contains (pmod a 1 108))) ∧ ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].any (fun a => pmod a 1 108 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 108, REDUCED EXPONENT 1. For every unit a in
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107]
    and every unit b coprime to 108, the sum of their 1-th powers never lands on the 1-th power image
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 108, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked,
    and every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 108 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_108 : [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun b => !([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].contains ((pmod a 1 108 + pmod b 1 108) % 108)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 108 AND REDUCED EXPONENT 2. The 36 units raise to exactly the 9 value(s)
    [1,13,25,37,49,61,73,85,97] — every unit's 2-th power is in that list, and every entry of the list is some
    unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_108 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,13,25,37,49,61,73,85,97].contains (pmod a 2 108))) ∧ ([1,13,25,37,49,61,73,85,97].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].any (fun a => pmod a 2 108 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 108, REDUCED EXPONENT 2. For every unit a in
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107]
    and every unit b coprime to 108, the sum of their 2-th powers never lands on the 2-th power image
    [1,13,25,37,49,61,73,85,97] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 108, for EVERY exponent n reducing to 2 — that is n in
    [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against 18. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 108 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_108 : [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun b => !([1,13,25,37,49,61,73,85,97].contains ((pmod a 2 108 + pmod b 2 108) % 108)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 108 AND REDUCED EXPONENT 3. The 36 units raise to exactly the 12 value(s)
    [1,17,19,35,37,53,55,71,73,89,91,107] — every unit's 3-th power is in that list, and every entry of the list
    is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this
    set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_108 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,17,19,35,37,53,55,71,73,89,91,107].contains (pmod a 3 108))) ∧ ([1,17,19,35,37,53,55,71,73,89,91,107].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].any (fun a => pmod a 3 108 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 108, REDUCED EXPONENT 3. For every unit a in
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107]
    and every unit b coprime to 108, the sum of their 3-th powers never lands on the 3-th power image
    [1,17,19,35,37,53,55,71,73,89,91,107] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 108, for EVERY exponent n reducing to 3 — that is n in
    [3,15,21] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from
    a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 108 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_108 : [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun b => !([1,17,19,35,37,53,55,71,73,89,91,107].contains ((pmod a 3 108 + pmod b 3 108) % 108)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 108 AND REDUCED EXPONENT 6. The 36 units raise to exactly the 3 value(s)
    [1,37,73] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_108 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,37,73].contains (pmod a 6 108))) ∧ ([1,37,73].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].any (fun a => pmod a 6 108 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 108, REDUCED EXPONENT 6. For every unit a in
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107]
    and every unit b coprime to 108, the sum of their 6-th powers never lands on the 6-th power image [1,37,73]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 108, for EVERY exponent n reducing to 6 — that is n in [6,12] of the range walked, and every
    larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 108 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_108 : [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun b => !([1,37,73].contains ((pmod a 6 108 + pmod b 6 108) % 108)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 108 AND REDUCED EXPONENT 9. The 36 units raise to exactly the 4 value(s)
    [1,53,55,107] — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_9_mod_108 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,53,55,107].contains (pmod a 9 108))) ∧ ([1,53,55,107].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].any (fun a => pmod a 9 108 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 108, REDUCED EXPONENT 9. For every unit a in
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107]
    and every unit b coprime to 108, the sum of their 9-th powers never lands on the 9-th power image
    [1,53,55,107] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 108, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and
    every larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 108 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_108 : [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun b => !([1,53,55,107].contains ((pmod a 9 108 + pmod b 9 108) % 108)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 108 AND REDUCED EXPONENT 18. The 36 units raise to exactly the 1 value(s) [1]
    — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_18_mod_108 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1].contains (pmod a 18 108))) ∧ ([1].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].any (fun a => pmod a 18 108 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 108, REDUCED EXPONENT 18. For every unit a in
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107]
    and every unit b coprime to 108, the sum of their 18-th powers never lands on the 18-th power image [1]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 108, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every
    larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 108 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_108 : [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,85,89,91,95,97,101,103,107].all (fun b => !([1].contains ((pmod a 18 108 + pmod b 18 108) % 108)))) := by decide
