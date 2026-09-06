-- lean/FermatRing2.lean — GENERATED. THE CONGRUENCE SURVEY, RING 2 OF 21 — moduli 4, 25, 46, 67, 88, 109, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

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

/-- THE ORDER STRUCTURE AT MODULUS 4. The 2 residues coprime to 4 are all killed by the exponent 2 — a^2 = 1 for
    every unit a — and no proper divisor of 2 kills them all (all 1 of them checked). So 2 is the exponent of
    (Z/4)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at
    this modulus actually turns on: an exponent n reaches the group only through gcd(n, 2), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_4 : ([1,3].all (fun a => pmod a 2 4 == 1)) ∧ ([1].all (fun k => !([1,3].all (fun a => pmod a k 4 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 4 AND REDUCED EXPONENT 1. The 2 units raise to exactly the 2 value(s) [1,3] —
    every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_4 : ([1,3].all (fun a => [1,3].contains (pmod a 1 4))) ∧ ([1,3].all (fun v => [1,3].any (fun a => pmod a 1 4 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 4, REDUCED EXPONENT 1. For every unit a in [1,3] and every unit b coprime to 4,
    the sum of their 1-th powers never lands on the 1-th power image [1,3] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 4, for EVERY exponent n
    reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the
    same gcd against 2. An unbounded conclusion from a finite table. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 4 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_4 : [1,3].all (fun a => [1,3].all (fun b => !([1,3].contains ((pmod a 1 4 + pmod b 1 4) % 4)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 4 AND REDUCED EXPONENT 2. The 2 units raise to exactly the 1 value(s) [1] —
    every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_4 : ([1,3].all (fun a => [1].contains (pmod a 2 4))) ∧ ([1].all (fun v => [1,3].any (fun a => pmod a 2 4 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 4, REDUCED EXPONENT 2. For every unit a in [1,3] and every unit b coprime to 4,
    the sum of their 2-th powers never lands on the 2-th power image [1] (pinned exactly by the theorem above).
    So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 4, for EVERY exponent n reducing
    to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked, and every larger n with the same gcd
    against 2. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case
    I — and infinitely many triples sharing a factor with 4 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_4 : [1,3].all (fun a => [1,3].all (fun b => !([1].contains ((pmod a 2 4 + pmod b 2 4) % 4)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 25. The 20 residues coprime to 25 are all killed by the exponent 20 — a^20 =
    1 for every unit a — and no proper divisor of 20 kills them all (all 5 of them checked). So 20 is the
    exponent of (Z/25)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 20),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_25 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => pmod a 20 25 == 1)) ∧ ([1,2,4,5,10].all (fun k => !([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => pmod a k 25 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 25, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 25), with
    all three coprime to 25, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_25 : (pmod 1 1 25 + pmod 1 1 25) % 25 = pmod 2 1 25 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 25 AND REDUCED EXPONENT 2. The 20 units raise to exactly the 10 value(s)
    [1,4,6,9,11,14,16,19,21,24] — every unit's 2-th power is in that list, and every entry of the list is some
    unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_25 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => [1,4,6,9,11,14,16,19,21,24].contains (pmod a 2 25))) ∧ ([1,4,6,9,11,14,16,19,21,24].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].any (fun a => pmod a 2 25 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 25, REDUCED EXPONENT 2. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24] and every unit b coprime to 25, the sum of their 2-th
    powers never lands on the 2-th power image [1,4,6,9,11,14,16,19,21,24] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 25, for EVERY exponent n
    reducing to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against
    20. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 25 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_25 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun b => !([1,4,6,9,11,14,16,19,21,24].contains ((pmod a 2 25 + pmod b 2 25) % 25)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 25 AND REDUCED EXPONENT 4. The 20 units raise to exactly the 5 value(s)
    [1,6,11,16,21] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_25 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => [1,6,11,16,21].contains (pmod a 4 25))) ∧ ([1,6,11,16,21].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].any (fun a => pmod a 4 25 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 25, REDUCED EXPONENT 4. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24] and every unit b coprime to 25, the sum of their 4-th
    powers never lands on the 4-th power image [1,6,11,16,21] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 25, for EVERY exponent n reducing to 4 —
    that is n in [4,8,12,16] of the range walked, and every larger n with the same gcd against 20. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 25 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_25 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun b => !([1,6,11,16,21].contains ((pmod a 4 25 + pmod b 4 25) % 25)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 25 AND REDUCED EXPONENT 5. The 20 units raise to exactly the 4 value(s)
    [1,7,18,24] — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_25 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => [1,7,18,24].contains (pmod a 5 25))) ∧ ([1,7,18,24].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].any (fun a => pmod a 5 25 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 25, REDUCED EXPONENT 5. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24] and every unit b coprime to 25, the sum of their 5-th
    powers never lands on the 5-th power image [1,7,18,24] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 25, for EVERY exponent n reducing to 5 — that is
    n in [5,15] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 25 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_25 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun b => !([1,7,18,24].contains ((pmod a 5 25 + pmod b 5 25) % 25)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 25 AND REDUCED EXPONENT 10. The 20 units raise to exactly the 2 value(s)
    [1,24] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_25 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => [1,24].contains (pmod a 10 25))) ∧ ([1,24].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].any (fun a => pmod a 10 25 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 25, REDUCED EXPONENT 10. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24] and every unit b coprime to 25, the sum of their 10-th
    powers never lands on the 10-th power image [1,24] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 25, for EVERY exponent n reducing to 10 — that is n
    in [10] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a
    finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a
    factor with 25 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_25 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun b => !([1,24].contains ((pmod a 10 25 + pmod b 10 25) % 25)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 25 AND REDUCED EXPONENT 20. The 20 units raise to exactly the 1 value(s) [1] —
    every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_20_mod_25 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => [1].contains (pmod a 20 25))) ∧ ([1].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].any (fun a => pmod a 20 25 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 25, REDUCED EXPONENT 20. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24] and every unit b coprime to 25, the sum of their 20-th
    powers never lands on the 20-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 25, for EVERY exponent n reducing to 20 — that is n
    in [20] of the range walked, and every larger n with the same gcd against 20. An unbounded conclusion from a
    finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a
    factor with 25 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_25 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24].all (fun b => !([1].contains ((pmod a 20 25 + pmod b 20 25) % 25)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 46. The 22 residues coprime to 46 are all killed by the exponent 22 — a^22 =
    1 for every unit a — and no proper divisor of 22 kills them all (all 3 of them checked). So 22 is the
    exponent of (Z/46)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 22),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_46 : ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun a => pmod a 22 46 == 1)) ∧ ([1,2,11].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun a => pmod a k 46 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 46 AND REDUCED EXPONENT 1. The 22 units raise to exactly the 22 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45] — every unit's 1-th power is in that list,
    and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below
    is a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_46 : ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].contains (pmod a 1 46))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].any (fun a => pmod a 1 46 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 46, REDUCED EXPONENT 1. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45] and every unit b coprime to 46, the sum of
    their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45] (pinned exactly by the theorem above). So x^n
    + y^n = z^n has NO solution in integers with x, y, z all coprime to 46, for EVERY exponent n reducing to 1 —
    that is n in [3,5,7,9,13,15,17,19,21,23] of the range walked, and every larger n with the same gcd against
    22. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 46 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_46 : [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].contains ((pmod a 1 46 + pmod b 1 46) % 46)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 46 AND REDUCED EXPONENT 2. The 22 units raise to exactly the 11 value(s)
    [1,3,9,13,25,27,29,31,35,39,41] — every unit's 2-th power is in that list, and every entry of the list is
    some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set,
    so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_46 : ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun a => [1,3,9,13,25,27,29,31,35,39,41].contains (pmod a 2 46))) ∧ ([1,3,9,13,25,27,29,31,35,39,41].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].any (fun a => pmod a 2 46 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 46, REDUCED EXPONENT 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45] and every unit b coprime to 46, the sum of
    their 2-th powers never lands on the 2-th power image [1,3,9,13,25,27,29,31,35,39,41] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 46, for EVERY
    exponent n reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20] of the range walked, and every larger n
    with the same gcd against 22. An unbounded conclusion from a finite table. It settles the coprime case only
    — classically Case I — and infinitely many triples sharing a factor with 46 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_46 : [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun b => !([1,3,9,13,25,27,29,31,35,39,41].contains ((pmod a 2 46 + pmod b 2 46) % 46)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 46 AND REDUCED EXPONENT 11. The 22 units raise to exactly the 2 value(s)
    [1,45] — every unit's 11-th power is in that list, and every entry of the list is some unit's 11-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_11_mod_46 : ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun a => [1,45].contains (pmod a 11 46))) ∧ ([1,45].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].any (fun a => pmod a 11 46 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 46, REDUCED EXPONENT 11. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45] and every unit b coprime to 46, the sum of
    their 11-th powers never lands on the 11-th power image [1,45] (pinned exactly by the theorem above). So x^n
    + y^n = z^n has NO solution in integers with x, y, z all coprime to 46, for EVERY exponent n reducing to 11
    — that is n in [11] of the range walked, and every larger n with the same gcd against 22. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 46 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_11_mod_46 : [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun b => !([1,45].contains ((pmod a 11 46 + pmod b 11 46) % 46)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 46 AND REDUCED EXPONENT 22. The 22 units raise to exactly the 1 value(s) [1] —
    every unit's 22-th power is in that list, and every entry of the list is some unit's 22-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_22_mod_46 : ([1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun a => [1].contains (pmod a 22 46))) ∧ ([1].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].any (fun a => pmod a 22 46 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 46, REDUCED EXPONENT 22. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45] and every unit b coprime to 46, the sum of
    their 22-th powers never lands on the 22-th power image [1] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 46, for EVERY exponent n reducing to 22 —
    that is n in [22] of the range walked, and every larger n with the same gcd against 22. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 46 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_22_mod_46 : [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,25,27,29,31,33,35,37,39,41,43,45].all (fun b => !([1].contains ((pmod a 22 46 + pmod b 22 46) % 46)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 67. The 66 residues coprime to 67 are all killed by the exponent 66 — a^66 =
    1 for every unit a — and no proper divisor of 66 kills them all (all 7 of them checked). So 66 is the
    exponent of (Z/67)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 66),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_67 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].all (fun a => pmod a 66 67 == 1)) ∧ ([1,2,3,6,11,22,33].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].all (fun a => pmod a k 67 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 67, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 67), with
    all three coprime to 67, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_67 : (pmod 1 1 67 + pmod 1 1 67) % 67 = pmod 2 1 67 := by decide

/-- NO OBSTRUCTION AT MODULUS 67, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 3^2 = 12^2 (mod 67),
    with all three coprime to 67, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [4,8,10,14,16,20] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_67 : (pmod 1 2 67 + pmod 3 2 67) % 67 = pmod 12 2 67 := by decide

/-- NO OBSTRUCTION AT MODULUS 67, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 2^3 = 16^3 (mod 67),
    with all three coprime to 67, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 3 — that is n in [3,9,15,21] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_3_mod_67 : (pmod 1 3 67 + pmod 2 3 67) % 67 = pmod 16 3 67 := by decide

/-- NO OBSTRUCTION AT MODULUS 67, REDUCED EXPONENT 6 — the control, and it fires. 1^6 + 5^6 = 17^6 (mod 67),
    with all three coprime to 67, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 6 — that is n in [6,12,18] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_6_mod_67 : (pmod 1 6 67 + pmod 5 6 67) % 67 = pmod 17 6 67 := by decide

/-- NO OBSTRUCTION AT MODULUS 67, REDUCED EXPONENT 11 — the control, and it fires. 1^11 + 4^11 = 2^11 (mod 67),
    with all three coprime to 67, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 11 — that is n in [11] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_11_mod_67 : (pmod 1 11 67 + pmod 4 11 67) % 67 = pmod 2 11 67 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 67 AND REDUCED EXPONENT 22. The 66 units raise to exactly the 3 value(s)
    [1,29,37] — every unit's 22-th power is in that list, and every entry of the list is some unit's 22-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_22_mod_67 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].all (fun a => [1,29,37].contains (pmod a 22 67))) ∧ ([1,29,37].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].any (fun a => pmod a 22 67 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 67, REDUCED EXPONENT 22 — part 1 of 2. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37] and
    every unit b coprime to 67, the sum of their 22-th powers never lands on the 22-th power image [1,29,37]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 67, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger
    n with the same gcd against 66. An unbounded conclusion from a finite table. The walk is split into 2 parts
    because phi(67) = 66 puts the full 66-by-66 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 67 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_22_mod_67_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].all (fun b => !([1,29,37].contains ((pmod a 22 67 + pmod b 22 67) % 67)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 67, REDUCED EXPONENT 22 — part 2 of 2. For every unit a in
    [38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66] and every unit b
    coprime to 67, the sum of their 22-th powers never lands on the 22-th power image [1,29,37] (pinned exactly
    by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 67, for
    EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger n with the same
    gcd against 66. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(67)
    = 66 puts the full 66-by-66 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 67 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_22_mod_67_part2 : [38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66].all (fun b => !([1,29,37].contains ((pmod a 22 67 + pmod b 22 67) % 67)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 88. The 40 residues coprime to 88 are all killed by the exponent 10 — a^10 =
    1 for every unit a — and no proper divisor of 10 kills them all (all 3 of them checked). So 10 is the
    exponent of (Z/88)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 10),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_88 : ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun a => pmod a 10 88 == 1)) ∧ ([1,2,5].all (fun k => !([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun a => pmod a k 88 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 88 AND REDUCED EXPONENT 1. The 40 units raise to exactly the 40 value(s)
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87]
    — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_88 : ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].contains (pmod a 1 88))) ∧ ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].any (fun a => pmod a 1 88 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 88, REDUCED EXPONENT 1. For every unit a in
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87]
    and every unit b coprime to 88, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 88, for EVERY exponent n reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range
    walked, and every larger n with the same gcd against 10. An unbounded conclusion from a finite table. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 88
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_88 : [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun b => !([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].contains ((pmod a 1 88 + pmod b 1 88) % 88)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 88 AND REDUCED EXPONENT 2. The 40 units raise to exactly the 5 value(s)
    [1,9,25,49,81] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_88 : ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun a => [1,9,25,49,81].contains (pmod a 2 88))) ∧ ([1,9,25,49,81].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].any (fun a => pmod a 2 88 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 88, REDUCED EXPONENT 2. For every unit a in
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87]
    and every unit b coprime to 88, the sum of their 2-th powers never lands on the 2-th power image
    [1,9,25,49,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 88, for EVERY exponent n reducing to 2 — that is n in [4,6,8,12,14,16,18,22] of the
    range walked, and every larger n with the same gcd against 10. An unbounded conclusion from a finite table.
    It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 88
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_88 : [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun b => !([1,9,25,49,81].contains ((pmod a 2 88 + pmod b 2 88) % 88)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 88 AND REDUCED EXPONENT 5. The 40 units raise to exactly the 8 value(s)
    [1,21,23,43,45,65,67,87] — every unit's 5-th power is in that list, and every entry of the list is some
    unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_88 : ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun a => [1,21,23,43,45,65,67,87].contains (pmod a 5 88))) ∧ ([1,21,23,43,45,65,67,87].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].any (fun a => pmod a 5 88 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 88, REDUCED EXPONENT 5. For every unit a in
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87]
    and every unit b coprime to 88, the sum of their 5-th powers never lands on the 5-th power image
    [1,21,23,43,45,65,67,87] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 88, for EVERY exponent n reducing to 5 — that is n in [5,15] of the
    range walked, and every larger n with the same gcd against 10. An unbounded conclusion from a finite table.
    It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 88
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_88 : [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun b => !([1,21,23,43,45,65,67,87].contains ((pmod a 5 88 + pmod b 5 88) % 88)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 88 AND REDUCED EXPONENT 10. The 40 units raise to exactly the 1 value(s) [1] —
    every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_88 : ([1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun a => [1].contains (pmod a 10 88))) ∧ ([1].all (fun v => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].any (fun a => pmod a 10 88 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 88, REDUCED EXPONENT 10. For every unit a in
    [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87]
    and every unit b coprime to 88, the sum of their 10-th powers never lands on the 10-th power image [1]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 88, for EVERY exponent n reducing to 10 — that is n in [10,20] of the range walked, and every
    larger n with the same gcd against 10. An unbounded conclusion from a finite table. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 88 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_88 : [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun a => [1,3,5,7,9,13,15,17,19,21,23,25,27,29,31,35,37,39,41,43,45,47,49,51,53,57,59,61,63,65,67,69,71,73,75,79,81,83,85,87].all (fun b => !([1].contains ((pmod a 10 88 + pmod b 10 88) % 88)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 109. The 108 residues coprime to 109 are all killed by the exponent 108 —
    a^108 = 1 for every unit a — and no proper divisor of 108 kills them all (all 11 of them checked). So 108 is
    the exponent of (Z/109)*, the Carmichael lambda, computed here rather than looked up. This is the number
    every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n,
    108), which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_109 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108].all (fun a => pmod a 108 109 == 1)) ∧ ([1,2,3,4,6,9,12,18,27,36,54].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108].all (fun a => pmod a k 109 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 109),
    with all three coprime to 109, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_109 : (pmod 1 1 109 + pmod 1 1 109) % 109 = pmod 2 1 109 := by decide

/-- NO OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 2^2 = 21^2 (mod 109),
    with all three coprime to 109, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [10,14,22] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_109 : (pmod 1 2 109 + pmod 2 2 109) % 109 = pmod 21 2 109 := by decide

/-- NO OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 1^3 = 57^3 (mod 109),
    with all three coprime to 109, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 3 — that is n in [3,15,21] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_3_mod_109 : (pmod 1 3 109 + pmod 1 3 109) % 109 = pmod 57 3 109 := by decide

/-- NO OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 4 — the control, and it fires. 1^4 + 5^4 = 3^4 (mod 109),
    with all three coprime to 109, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 4 — that is n in [4,8,16,20] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_4_mod_109 : (pmod 1 4 109 + pmod 5 4 109) % 109 = pmod 3 4 109 := by decide

/-- NO OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 6 — the control, and it fires. 1^6 + 4^6 = 2^6 (mod 109),
    with all three coprime to 109, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 6 — that is n in [6] of the range walked. It is sealed for the same reason the blocked
    cases are: a survey that recorded only its successes would be an argument rather than a census, and the
    blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_6_mod_109 : (pmod 1 6 109 + pmod 4 6 109) % 109 = pmod 2 6 109 := by decide

/-- NO OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 9 — the control, and it fires. 1^9 + 3^9 = 31^9 (mod 109),
    with all three coprime to 109, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 9 — that is n in [9] of the range walked. It is sealed for the same reason the blocked
    cases are: a survey that recorded only its successes would be an argument rather than a census, and the
    blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_9_mod_109 : (pmod 1 9 109 + pmod 3 9 109) % 109 = pmod 31 9 109 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 109 AND REDUCED EXPONENT 12. The 108 units raise to exactly the 9 value(s)
    [1,16,27,38,45,63,66,75,105] — every unit's 12-th power is in that list, and every entry of the list is some
    unit's 12-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_12_mod_109 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108].all (fun a => [1,16,27,38,45,63,66,75,105].contains (pmod a 12 109))) ∧ ([1,16,27,38,45,63,66,75,105].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108].any (fun a => pmod a 12 109 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 12 — part 1 of 5. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23] and every unit b coprime to 109, the sum of
    their 12-th powers never lands on the 12-th power image [1,16,27,38,45,63,66,75,105] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 109, for EVERY
    exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd
    against 108. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(109) =
    108 puts the full 108-by-108 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 109 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_109_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108].all (fun b => !([1,16,27,38,45,63,66,75,105].contains ((pmod a 12 109 + pmod b 12 109) % 109)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 12 — part 2 of 5. For every unit a in
    [24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46] and every unit b coprime to 109, the
    sum of their 12-th powers never lands on the 12-th power image [1,16,27,38,45,63,66,75,105] (pinned exactly
    by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 109, for
    EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same
    gcd against 108. An unbounded conclusion from a finite table. The walk is split into 5 parts because
    phi(109) = 108 puts the full 108-by-108 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 109 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_109_part2 : [24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108].all (fun b => !([1,16,27,38,45,63,66,75,105].contains ((pmod a 12 109 + pmod b 12 109) % 109)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 12 — part 3 of 5. For every unit a in
    [47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69] and every unit b coprime to 109, the
    sum of their 12-th powers never lands on the 12-th power image [1,16,27,38,45,63,66,75,105] (pinned exactly
    by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 109, for
    EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same
    gcd against 108. An unbounded conclusion from a finite table. The walk is split into 5 parts because
    phi(109) = 108 puts the full 108-by-108 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 109 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_109_part3 : [47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108].all (fun b => !([1,16,27,38,45,63,66,75,105].contains ((pmod a 12 109 + pmod b 12 109) % 109)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 12 — part 4 of 5. For every unit a in
    [70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92] and every unit b coprime to 109, the
    sum of their 12-th powers never lands on the 12-th power image [1,16,27,38,45,63,66,75,105] (pinned exactly
    by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 109, for
    EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same
    gcd against 108. An unbounded conclusion from a finite table. The walk is split into 5 parts because
    phi(109) = 108 puts the full 108-by-108 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 109 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_109_part4 : [70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108].all (fun b => !([1,16,27,38,45,63,66,75,105].contains ((pmod a 12 109 + pmod b 12 109) % 109)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 12 — part 5 of 5. For every unit a in
    [93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108] and every unit b coprime to 109, the sum of their
    12-th powers never lands on the 12-th power image [1,16,27,38,45,63,66,75,105] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 109, for EVERY
    exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd
    against 108. An unbounded conclusion from a finite table. The walk is split into 5 parts because phi(109) =
    108 puts the full 108-by-108 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 109 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_109_part5 : [93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108].all (fun b => !([1,16,27,38,45,63,66,75,105].contains ((pmod a 12 109 + pmod b 12 109) % 109)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 109, REDUCED EXPONENT 18 — the control, and it fires. 1^18 + 3^18 = 11^18 (mod
    109), with all three coprime to 109, so this modulus admits a solution-shaped triple and rules nothing out
    for any exponent reducing to 18 — that is n in [18] of the range walked. It is sealed for the same reason
    the blocked cases are: a survey that recorded only its successes would be an argument rather than a census,
    and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_18_mod_109 : (pmod 1 18 109 + pmod 3 18 109) % 109 = pmod 11 18 109 := by decide
