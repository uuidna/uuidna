-- lean/FermatRing15.lean — GENERATED. THE CONGRUENCE SURVEY, RING 15 OF 21 — moduli 17, 38, 59, 80, 101, 122, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

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

/-- THE ORDER STRUCTURE AT MODULUS 17. The 16 residues coprime to 17 are all killed by the exponent 16 — a^16 =
    1 for every unit a — and no proper divisor of 16 kills them all (all 4 of them checked). So 16 is the
    exponent of (Z/17)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 16),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_17 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun a => pmod a 16 17 == 1)) ∧ ([1,2,4,8].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun a => pmod a k 17 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 17, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 17), with
    all three coprime to 17, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked. It is sealed for
    the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_17 : (pmod 1 1 17 + pmod 1 1 17) % 17 = pmod 2 1 17 := by decide

/-- NO OBSTRUCTION AT MODULUS 17, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 1^2 = 6^2 (mod 17), with
    all three coprime to 17, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [6,10,14,18,22] of the range walked. It is sealed for the same reason
    the blocked cases are: a survey that recorded only its successes would be an argument rather than a census,
    and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_17 : (pmod 1 2 17 + pmod 1 2 17) % 17 = pmod 6 2 17 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 17 AND REDUCED EXPONENT 4. The 16 units raise to exactly the 4 value(s)
    [1,4,13,16] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_17 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun a => [1,4,13,16].contains (pmod a 4 17))) ∧ ([1,4,13,16].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].any (fun a => pmod a 4 17 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 17, REDUCED EXPONENT 4. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] and every unit b coprime to 17, the sum of their 4-th powers never
    lands on the 4-th power image [1,4,13,16] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 17, for EVERY exponent n reducing to 4 — that is n in
    [4,12,20] of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from
    a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 17 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_17 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun b => !([1,4,13,16].contains ((pmod a 4 17 + pmod b 4 17) % 17)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 17 AND REDUCED EXPONENT 8. The 16 units raise to exactly the 2 value(s) [1,16]
    — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_8_mod_17 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun a => [1,16].contains (pmod a 8 17))) ∧ ([1,16].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].any (fun a => pmod a 8 17 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 17, REDUCED EXPONENT 8. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] and every unit b coprime to 17, the sum of their 8-th powers never
    lands on the 8-th power image [1,16] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 17, for EVERY exponent n reducing to 8 — that is n in [8]
    of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite
    table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 17 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_17 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun b => !([1,16].contains ((pmod a 8 17 + pmod b 8 17) % 17)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 17 AND REDUCED EXPONENT 16. The 16 units raise to exactly the 1 value(s) [1] —
    every unit's 16-th power is in that list, and every entry of the list is some unit's 16-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_16_mod_17 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun a => [1].contains (pmod a 16 17))) ∧ ([1].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].any (fun a => pmod a 16 17 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 17, REDUCED EXPONENT 16. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16] and every unit b coprime to 17, the sum of their 16-th powers never
    lands on the 16-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution
    in integers with x, y, z all coprime to 17, for EVERY exponent n reducing to 16 — that is n in [16] of the
    range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite table.
    It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 17
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_17 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].all (fun b => !([1].contains ((pmod a 16 17 + pmod b 16 17) % 17)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 38. The 18 residues coprime to 38 are all killed by the exponent 18 — a^18 =
    1 for every unit a — and no proper divisor of 18 kills them all (all 5 of them checked). So 18 is the
    exponent of (Z/38)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 18),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_38 : ([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => pmod a 18 38 == 1)) ∧ ([1,2,3,6,9].all (fun k => !([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => pmod a k 38 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 38 AND REDUCED EXPONENT 1. The 18 units raise to exactly the 18 value(s)
    [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37] — every unit's 1-th power is in that list, and every
    entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a
    statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_38 : ([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].contains (pmod a 1 38))) ∧ ([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].any (fun a => pmod a 1 38 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 38, REDUCED EXPONENT 1. For every unit a in
    [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37] and every unit b coprime to 38, the sum of their 1-th
    powers never lands on the 1-th power image [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    38, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every
    larger n with the same gcd against 18. An unbounded conclusion from a finite table. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 38 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_38 : [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun b => !([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].contains ((pmod a 1 38 + pmod b 1 38) % 38)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 38 AND REDUCED EXPONENT 2. The 18 units raise to exactly the 9 value(s)
    [1,5,7,9,11,17,23,25,35] — every unit's 2-th power is in that list, and every entry of the list is some
    unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_38 : ([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,5,7,9,11,17,23,25,35].contains (pmod a 2 38))) ∧ ([1,5,7,9,11,17,23,25,35].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].any (fun a => pmod a 2 38 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 38, REDUCED EXPONENT 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37] and every unit b coprime to 38, the sum of their 2-th
    powers never lands on the 2-th power image [1,5,7,9,11,17,23,25,35] (pinned exactly by the theorem above).
    So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 38, for EVERY exponent n reducing
    to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against
    18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 38 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_38 : [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun b => !([1,5,7,9,11,17,23,25,35].contains ((pmod a 2 38 + pmod b 2 38) % 38)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 38 AND REDUCED EXPONENT 3. The 18 units raise to exactly the 6 value(s)
    [1,7,11,27,31,37] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_38 : ([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,7,11,27,31,37].contains (pmod a 3 38))) ∧ ([1,7,11,27,31,37].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].any (fun a => pmod a 3 38 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 38, REDUCED EXPONENT 3. For every unit a in
    [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37] and every unit b coprime to 38, the sum of their 3-th
    powers never lands on the 3-th power image [1,7,11,27,31,37] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 38, for EVERY exponent n reducing to 3 —
    that is n in [3,15,21] of the range walked, and every larger n with the same gcd against 18. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 38 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_38 : [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun b => !([1,7,11,27,31,37].contains ((pmod a 3 38 + pmod b 3 38) % 38)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 38 AND REDUCED EXPONENT 6. The 18 units raise to exactly the 3 value(s)
    [1,7,11] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_38 : ([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,7,11].contains (pmod a 6 38))) ∧ ([1,7,11].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].any (fun a => pmod a 6 38 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 38, REDUCED EXPONENT 6. For every unit a in
    [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37] and every unit b coprime to 38, the sum of their 6-th
    powers never lands on the 6-th power image [1,7,11] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 38, for EVERY exponent n reducing to 6 — that is
    n in [6,12] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 38 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_38 : [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun b => !([1,7,11].contains ((pmod a 6 38 + pmod b 6 38) % 38)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 38 AND REDUCED EXPONENT 9. The 18 units raise to exactly the 2 value(s) [1,37]
    — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_9_mod_38 : ([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,37].contains (pmod a 9 38))) ∧ ([1,37].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].any (fun a => pmod a 9 38 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 38, REDUCED EXPONENT 9. For every unit a in
    [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37] and every unit b coprime to 38, the sum of their 9-th
    powers never lands on the 9-th power image [1,37] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 38, for EVERY exponent n reducing to 9 — that is n
    in [9] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a
    finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a
    factor with 38 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_38 : [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun b => !([1,37].contains ((pmod a 9 38 + pmod b 9 38) % 38)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 38 AND REDUCED EXPONENT 18. The 18 units raise to exactly the 1 value(s) [1] —
    every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_18_mod_38 : ([1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1].contains (pmod a 18 38))) ∧ ([1].all (fun v => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].any (fun a => pmod a 18 38 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 38, REDUCED EXPONENT 18. For every unit a in
    [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37] and every unit b coprime to 38, the sum of their 18-th
    powers never lands on the 18-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 38, for EVERY exponent n reducing to 18 — that is n
    in [18] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a
    finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a
    factor with 38 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_38 : [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun a => [1,3,5,7,9,11,13,15,17,21,23,25,27,29,31,33,35,37].all (fun b => !([1].contains ((pmod a 18 38 + pmod b 18 38) % 38)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 59. The 58 residues coprime to 59 are all killed by the exponent 58 — a^58 =
    1 for every unit a — and no proper divisor of 58 kills them all (all 3 of them checked). So 58 is the
    exponent of (Z/59)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 58),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_59 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58].all (fun a => pmod a 58 59 == 1)) ∧ ([1,2,29].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58].all (fun a => pmod a k 59 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 59, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 59), with
    all three coprime to 59, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked. It is sealed for
    the same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_59 : (pmod 1 1 59 + pmod 1 1 59) % 59 = pmod 2 1 59 := by decide

/-- NO OBSTRUCTION AT MODULUS 59, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 2^2 = 8^2 (mod 59), with
    all three coprime to 59, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_59 : (pmod 1 2 59 + pmod 2 2 59) % 59 = pmod 8 2 59 := by decide

/-- THE ORDER STRUCTURE AT MODULUS 80. The 32 residues coprime to 80 are all killed by the exponent 4 — a^4 = 1
    for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent
    of (Z/80)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction
    at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_80 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun a => pmod a 4 80 == 1)) ∧ ([1,2].all (fun k => !([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun a => pmod a k 80 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 80 AND REDUCED EXPONENT 1. The 32 units raise to exactly the 32 value(s)
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79] — every unit's
    1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing
    spare. The obstruction below is a statement ABOUT this set, so the set is established first rather than
    asserted inside it. -/
theorem power_image_exact_reduced_1_mod_80 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].contains (pmod a 1 80))) ∧ ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].any (fun a => pmod a 1 80 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 80, REDUCED EXPONENT 1. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79] and every unit
    b coprime to 80, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    80, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked,
    and every larger n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 80 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_80 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun b => !([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].contains ((pmod a 1 80 + pmod b 1 80) % 80)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 80 AND REDUCED EXPONENT 2. The 32 units raise to exactly the 4 value(s)
    [1,9,41,49] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_80 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun a => [1,9,41,49].contains (pmod a 2 80))) ∧ ([1,9,41,49].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].any (fun a => pmod a 2 80 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 80, REDUCED EXPONENT 2. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79] and every unit
    b coprime to 80, the sum of their 2-th powers never lands on the 2-th power image [1,9,41,49] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    80, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22] of the range walked, and every larger
    n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only
    — classically Case I — and infinitely many triples sharing a factor with 80 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_80 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun b => !([1,9,41,49].contains ((pmod a 2 80 + pmod b 2 80) % 80)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 80 AND REDUCED EXPONENT 4. The 32 units raise to exactly the 1 value(s) [1] —
    every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_80 : ([1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun a => [1].contains (pmod a 4 80))) ∧ ([1].all (fun v => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].any (fun a => pmod a 4 80 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 80, REDUCED EXPONENT 4. For every unit a in
    [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79] and every unit
    b coprime to 80, the sum of their 4-th powers never lands on the 4-th power image [1] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 80, for EVERY
    exponent n reducing to 4 — that is n in [4,8,12,16,20] of the range walked, and every larger n with the same
    gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 80 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_80 : [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun a => [1,3,7,9,11,13,17,19,21,23,27,29,31,33,37,39,41,43,47,49,51,53,57,59,61,63,67,69,71,73,77,79].all (fun b => !([1].contains ((pmod a 4 80 + pmod b 4 80) % 80)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 101. The 100 residues coprime to 101 are all killed by the exponent 100 —
    a^100 = 1 for every unit a — and no proper divisor of 100 kills them all (all 8 of them checked). So 100 is
    the exponent of (Z/101)*, the Carmichael lambda, computed here rather than looked up. This is the number
    every obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n,
    100), which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_101 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun a => pmod a 100 101 == 1)) ∧ ([1,2,4,5,10,20,25,50].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun a => pmod a k 101 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 101),
    with all three coprime to 101, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_101 : (pmod 1 1 101 + pmod 1 1 101) % 101 = pmod 2 1 101 := by decide

/-- NO OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 2^2 = 45^2 (mod 101),
    with all three coprime to 101, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [6,14,18,22] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_101 : (pmod 1 2 101 + pmod 2 2 101) % 101 = pmod 45 2 101 := by decide

/-- NO OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 4 — the control, and it fires. 1^4 + 7^4 = 13^4 (mod 101),
    with all three coprime to 101, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 4 — that is n in [4,8,12,16] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_4_mod_101 : (pmod 1 4 101 + pmod 7 4 101) % 101 = pmod 13 4 101 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 101 AND REDUCED EXPONENT 5. The 100 units raise to exactly the 20 value(s)
    [1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100] — every unit's 5-th power is in that list, and
    every entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is
    a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_101 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun a => [1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100].contains (pmod a 5 101))) ∧ ([1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].any (fun a => pmod a 5 101 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 5 — part 1 of 4. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25] and every unit b coprime to 101, the sum
    of their 5-th powers never lands on the 5-th power image
    [1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 101, for EVERY exponent n reducing to 5 —
    that is n in [5,15] of the range walked, and every larger n with the same gcd against 100. An unbounded
    conclusion from a finite table. The walk is split into 4 parts because phi(101) = 100 puts the full
    100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 101 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_101_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100].contains ((pmod a 5 101 + pmod b 5 101) % 101)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 5 — part 2 of 4. For every unit a in
    [26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50] and every unit b coprime to
    101, the sum of their 5-th powers never lands on the 5-th power image
    [1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 101, for EVERY exponent n reducing to 5 —
    that is n in [5,15] of the range walked, and every larger n with the same gcd against 100. An unbounded
    conclusion from a finite table. The walk is split into 4 parts because phi(101) = 100 puts the full
    100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 101 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_101_part2 : [26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100].contains ((pmod a 5 101 + pmod b 5 101) % 101)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 5 — part 3 of 4. For every unit a in
    [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75] and every unit b coprime to
    101, the sum of their 5-th powers never lands on the 5-th power image
    [1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 101, for EVERY exponent n reducing to 5 —
    that is n in [5,15] of the range walked, and every larger n with the same gcd against 100. An unbounded
    conclusion from a finite table. The walk is split into 4 parts because phi(101) = 100 puts the full
    100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 101 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_101_part3 : [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100].contains ((pmod a 5 101 + pmod b 5 101) % 101)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 5 — part 4 of 4. For every unit a in
    [76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100] and every unit b coprime to
    101, the sum of their 5-th powers never lands on the 5-th power image
    [1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 101, for EVERY exponent n reducing to 5 —
    that is n in [5,15] of the range walked, and every larger n with the same gcd against 100. An unbounded
    conclusion from a finite table. The walk is split into 4 parts because phi(101) = 100 puts the full
    100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 101 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_101_part4 : [76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,6,10,14,17,32,36,39,41,44,57,60,62,65,69,84,87,91,95,100].contains ((pmod a 5 101 + pmod b 5 101) % 101)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 101 AND REDUCED EXPONENT 10. The 100 units raise to exactly the 10 value(s)
    [1,6,14,17,36,65,84,87,95,100] — every unit's 10-th power is in that list, and every entry of the list is
    some unit's 10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this
    set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_101 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun a => [1,6,14,17,36,65,84,87,95,100].contains (pmod a 10 101))) ∧ ([1,6,14,17,36,65,84,87,95,100].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].any (fun a => pmod a 10 101 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 10 — part 1 of 4. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25] and every unit b coprime to 101, the sum
    of their 10-th powers never lands on the 10-th power image [1,6,14,17,36,65,84,87,95,100] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 101, for
    EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same
    gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because
    phi(101) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 101 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_101_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,6,14,17,36,65,84,87,95,100].contains ((pmod a 10 101 + pmod b 10 101) % 101)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 10 — part 2 of 4. For every unit a in
    [26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50] and every unit b coprime to
    101, the sum of their 10-th powers never lands on the 10-th power image [1,6,14,17,36,65,84,87,95,100]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 101, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every
    larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into
    4 parts because phi(101) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 101 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_101_part2 : [26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,6,14,17,36,65,84,87,95,100].contains ((pmod a 10 101 + pmod b 10 101) % 101)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 10 — part 3 of 4. For every unit a in
    [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75] and every unit b coprime to
    101, the sum of their 10-th powers never lands on the 10-th power image [1,6,14,17,36,65,84,87,95,100]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 101, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every
    larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into
    4 parts because phi(101) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 101 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_101_part3 : [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,6,14,17,36,65,84,87,95,100].contains ((pmod a 10 101 + pmod b 10 101) % 101)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 10 — part 4 of 4. For every unit a in
    [76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100] and every unit b coprime to
    101, the sum of their 10-th powers never lands on the 10-th power image [1,6,14,17,36,65,84,87,95,100]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 101, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every
    larger n with the same gcd against 100. An unbounded conclusion from a finite table. The walk is split into
    4 parts because phi(101) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 101 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_101_part4 : [76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,6,14,17,36,65,84,87,95,100].contains ((pmod a 10 101 + pmod b 10 101) % 101)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 101 AND REDUCED EXPONENT 20. The 100 units raise to exactly the 5 value(s)
    [1,36,84,87,95] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_20_mod_101 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun a => [1,36,84,87,95].contains (pmod a 20 101))) ∧ ([1,36,84,87,95].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].any (fun a => pmod a 20 101 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 20 — part 1 of 4. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25] and every unit b coprime to 101, the sum
    of their 20-th powers never lands on the 20-th power image [1,36,84,87,95] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 101, for EVERY exponent n
    reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 100. An
    unbounded conclusion from a finite table. The walk is split into 4 parts because phi(101) = 100 puts the
    full 100-by-100 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the
    parts together are the whole walk over the units. It settles the coprime case only — classically Case I —
    and infinitely many triples sharing a factor with 101 pass through untouched, which is why this is a filter
    and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_101_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,36,84,87,95].contains ((pmod a 20 101 + pmod b 20 101) % 101)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 20 — part 2 of 4. For every unit a in
    [26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50] and every unit b coprime to
    101, the sum of their 20-th powers never lands on the 20-th power image [1,36,84,87,95] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 101, for
    EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same
    gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because
    phi(101) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 101 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_101_part2 : [26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,36,84,87,95].contains ((pmod a 20 101 + pmod b 20 101) % 101)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 20 — part 3 of 4. For every unit a in
    [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75] and every unit b coprime to
    101, the sum of their 20-th powers never lands on the 20-th power image [1,36,84,87,95] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 101, for
    EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same
    gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because
    phi(101) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 101 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_101_part3 : [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,36,84,87,95].contains ((pmod a 20 101 + pmod b 20 101) % 101)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 101, REDUCED EXPONENT 20 — part 4 of 4. For every unit a in
    [76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100] and every unit b coprime to
    101, the sum of their 20-th powers never lands on the 20-th power image [1,36,84,87,95] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 101, for
    EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same
    gcd against 100. An unbounded conclusion from a finite table. The walk is split into 4 parts because
    phi(101) = 100 puts the full 100-by-100 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 101 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_101_part4 : [76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].all (fun b => !([1,36,84,87,95].contains ((pmod a 20 101 + pmod b 20 101) % 101)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 122. The 60 residues coprime to 122 are all killed by the exponent 60 — a^60
    = 1 for every unit a — and no proper divisor of 60 kills them all (all 11 of them checked). So 60 is the
    exponent of (Z/122)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 60),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => pmod a 60 122 == 1)) ∧ ([1,2,3,4,5,6,10,12,15,20,30].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => pmod a k 122 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 122 AND REDUCED EXPONENT 1. The 60 units raise to exactly the 60 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121]
    — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].contains (pmod a 1 122))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].any (fun a => pmod a 1 122 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 1 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 122, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 122, for EVERY exponent n reducing to 1 — that is n in [7,11,13,17,19,23] of the range walked,
    and every larger n with the same gcd against 60. An unbounded conclusion from a finite table. The walk is
    split into 2 parts because phi(122) = 60 puts the full 60-by-60 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 122
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_122_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].contains ((pmod a 1 122 + pmod b 1 122) % 122)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 1 — part 2 of 2. For every unit a in
    [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121] and every unit b coprime to 122, the
    sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 122, for EVERY exponent n reducing to 1 — that is n in [7,11,13,17,19,23] of the range walked,
    and every larger n with the same gcd against 60. An unbounded conclusion from a finite table. The walk is
    split into 2 parts because phi(122) = 60 puts the full 60-by-60 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 122
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_122_part2 : [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].contains ((pmod a 1 122 + pmod b 1 122) % 122)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 122 AND REDUCED EXPONENT 2. The 60 units raise to exactly the 30 value(s)
    [1,3,5,9,13,15,19,25,27,39,41,45,47,49,57,65,73,75,77,81,83,95,97,103,107,109,113,117,119,121] — every
    unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing missing,
    nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather
    than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,9,13,15,19,25,27,39,41,45,47,49,57,65,73,75,77,81,83,95,97,103,107,109,113,117,119,121].contains (pmod a 2 122))) ∧ ([1,3,5,9,13,15,19,25,27,39,41,45,47,49,57,65,73,75,77,81,83,95,97,103,107,109,113,117,119,121].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].any (fun a => pmod a 2 122 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 122, the sum of their 2-th powers never lands on the 2-th power image
    [1,3,5,9,13,15,19,25,27,39,41,45,47,49,57,65,73,75,77,81,83,95,97,103,107,109,113,117,119,121] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    122, for EVERY exponent n reducing to 2 — that is n in [14,22] of the range walked, and every larger n with
    the same gcd against 60. An unbounded conclusion from a finite table. The walk is split into 2 parts because
    phi(122) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 122 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_122_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,3,5,9,13,15,19,25,27,39,41,45,47,49,57,65,73,75,77,81,83,95,97,103,107,109,113,117,119,121].contains ((pmod a 2 122 + pmod b 2 122) % 122)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in
    [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121] and every unit b coprime to 122, the
    sum of their 2-th powers never lands on the 2-th power image
    [1,3,5,9,13,15,19,25,27,39,41,45,47,49,57,65,73,75,77,81,83,95,97,103,107,109,113,117,119,121] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    122, for EVERY exponent n reducing to 2 — that is n in [14,22] of the range walked, and every larger n with
    the same gcd against 60. An unbounded conclusion from a finite table. The walk is split into 2 parts because
    phi(122) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 122 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_122_part2 : [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,3,5,9,13,15,19,25,27,39,41,45,47,49,57,65,73,75,77,81,83,95,97,103,107,109,113,117,119,121].contains ((pmod a 2 122 + pmod b 2 122) % 122)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 122 AND REDUCED EXPONENT 3. The 60 units raise to exactly the 20 value(s)
    [1,3,9,11,23,27,33,37,41,53,69,81,85,89,95,99,111,113,119,121] — every unit's 3-th power is in that list,
    and every entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below
    is a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,9,11,23,27,33,37,41,53,69,81,85,89,95,99,111,113,119,121].contains (pmod a 3 122))) ∧ ([1,3,9,11,23,27,33,37,41,53,69,81,85,89,95,99,111,113,119,121].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].any (fun a => pmod a 3 122 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 3 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 122, the sum of their 3-th powers never lands on the 3-th power image
    [1,3,9,11,23,27,33,37,41,53,69,81,85,89,95,99,111,113,119,121] (pinned exactly by the theorem above). So x^n
    + y^n = z^n has NO solution in integers with x, y, z all coprime to 122, for EVERY exponent n reducing to 3
    — that is n in [3,9,21] of the range walked, and every larger n with the same gcd against 60. An unbounded
    conclusion from a finite table. The walk is split into 2 parts because phi(122) = 60 puts the full 60-by-60
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 122 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_122_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,3,9,11,23,27,33,37,41,53,69,81,85,89,95,99,111,113,119,121].contains ((pmod a 3 122 + pmod b 3 122) % 122)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 3 — part 2 of 2. For every unit a in
    [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121] and every unit b coprime to 122, the
    sum of their 3-th powers never lands on the 3-th power image
    [1,3,9,11,23,27,33,37,41,53,69,81,85,89,95,99,111,113,119,121] (pinned exactly by the theorem above). So x^n
    + y^n = z^n has NO solution in integers with x, y, z all coprime to 122, for EVERY exponent n reducing to 3
    — that is n in [3,9,21] of the range walked, and every larger n with the same gcd against 60. An unbounded
    conclusion from a finite table. The walk is split into 2 parts because phi(122) = 60 puts the full 60-by-60
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 122 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_122_part2 : [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,3,9,11,23,27,33,37,41,53,69,81,85,89,95,99,111,113,119,121].contains ((pmod a 3 122 + pmod b 3 122) % 122)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 122 AND REDUCED EXPONENT 4. The 60 units raise to exactly the 15 value(s)
    [1,9,13,15,25,47,57,73,77,81,83,95,103,117,119] — every unit's 4-th power is in that list, and every entry
    of the list is some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement
    ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,9,13,15,25,47,57,73,77,81,83,95,103,117,119].contains (pmod a 4 122))) ∧ ([1,9,13,15,25,47,57,73,77,81,83,95,103,117,119].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].any (fun a => pmod a 4 122 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 4 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 122, the sum of their 4-th powers never lands on the 4-th power image
    [1,9,13,15,25,47,57,73,77,81,83,95,103,117,119] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 122, for EVERY exponent n reducing to 4 — that is n
    in [4,8,16] of the range walked, and every larger n with the same gcd against 60. An unbounded conclusion
    from a finite table. The walk is split into 2 parts because phi(122) = 60 puts the full 60-by-60 sweep past
    Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole
    walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 122 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_122_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,9,13,15,25,47,57,73,77,81,83,95,103,117,119].contains ((pmod a 4 122 + pmod b 4 122) % 122)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 4 — part 2 of 2. For every unit a in
    [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121] and every unit b coprime to 122, the
    sum of their 4-th powers never lands on the 4-th power image [1,9,13,15,25,47,57,73,77,81,83,95,103,117,119]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 122, for EVERY exponent n reducing to 4 — that is n in [4,8,16] of the range walked, and every
    larger n with the same gcd against 60. An unbounded conclusion from a finite table. The walk is split into 2
    parts because phi(122) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split
    is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 122 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_122_part2 : [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,9,13,15,25,47,57,73,77,81,83,95,103,117,119].contains ((pmod a 4 122 + pmod b 4 122) % 122)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 122 AND REDUCED EXPONENT 5. The 60 units raise to exactly the 12 value(s)
    [1,11,13,21,29,47,75,93,101,109,111,121] — every unit's 5-th power is in that list, and every entry of the
    list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT
    this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,11,13,21,29,47,75,93,101,109,111,121].contains (pmod a 5 122))) ∧ ([1,11,13,21,29,47,75,93,101,109,111,121].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].any (fun a => pmod a 5 122 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 5 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 122, the sum of their 5-th powers never lands on the 5-th power image
    [1,11,13,21,29,47,75,93,101,109,111,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 122, for EVERY exponent n reducing to 5 — that is n in [5]
    of the range walked, and every larger n with the same gcd against 60. An unbounded conclusion from a finite
    table. The walk is split into 2 parts because phi(122) = 60 puts the full 60-by-60 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 122 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_122_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,11,13,21,29,47,75,93,101,109,111,121].contains ((pmod a 5 122 + pmod b 5 122) % 122)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 5 — part 2 of 2. For every unit a in
    [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121] and every unit b coprime to 122, the
    sum of their 5-th powers never lands on the 5-th power image [1,11,13,21,29,47,75,93,101,109,111,121]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 122, for EVERY exponent n reducing to 5 — that is n in [5] of the range walked, and every larger
    n with the same gcd against 60. An unbounded conclusion from a finite table. The walk is split into 2 parts
    because phi(122) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 122 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_122_part2 : [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,11,13,21,29,47,75,93,101,109,111,121].contains ((pmod a 5 122 + pmod b 5 122) % 122)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 122 AND REDUCED EXPONENT 6. The 60 units raise to exactly the 10 value(s)
    [1,3,9,27,41,81,95,113,119,121] — every unit's 6-th power is in that list, and every entry of the list is
    some unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set,
    so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,9,27,41,81,95,113,119,121].contains (pmod a 6 122))) ∧ ([1,3,9,27,41,81,95,113,119,121].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].any (fun a => pmod a 6 122 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 6 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 122, the sum of their 6-th powers never lands on the 6-th power image
    [1,3,9,27,41,81,95,113,119,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 122, for EVERY exponent n reducing to 6 — that is n in [6,18] of the
    range walked, and every larger n with the same gcd against 60. An unbounded conclusion from a finite table.
    The walk is split into 2 parts because phi(122) = 60 puts the full 60-by-60 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 122 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_122_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,3,9,27,41,81,95,113,119,121].contains ((pmod a 6 122 + pmod b 6 122) % 122)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 6 — part 2 of 2. For every unit a in
    [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121] and every unit b coprime to 122, the
    sum of their 6-th powers never lands on the 6-th power image [1,3,9,27,41,81,95,113,119,121] (pinned exactly
    by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 122, for
    EVERY exponent n reducing to 6 — that is n in [6,18] of the range walked, and every larger n with the same
    gcd against 60. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(122)
    = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 122 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_122_part2 : [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,3,9,27,41,81,95,113,119,121].contains ((pmod a 6 122 + pmod b 6 122) % 122)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 122 AND REDUCED EXPONENT 10. The 60 units raise to exactly the 6 value(s)
    [1,13,47,75,109,121] — every unit's 10-th power is in that list, and every entry of the list is some unit's
    10-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,13,47,75,109,121].contains (pmod a 10 122))) ∧ ([1,13,47,75,109,121].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].any (fun a => pmod a 10 122 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 10 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 122, the sum of their 10-th powers never lands on the 10-th power image
    [1,13,47,75,109,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 122, for EVERY exponent n reducing to 10 — that is n in [10] of the range
    walked, and every larger n with the same gcd against 60. An unbounded conclusion from a finite table. The
    walk is split into 2 parts because phi(122) = 60 puts the full 60-by-60 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 122 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_122_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,13,47,75,109,121].contains ((pmod a 10 122 + pmod b 10 122) % 122)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 10 — part 2 of 2. For every unit a in
    [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121] and every unit b coprime to 122, the
    sum of their 10-th powers never lands on the 10-th power image [1,13,47,75,109,121] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 122, for EVERY
    exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd
    against 60. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(122) =
    60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping,
    and the parts together are the whole walk over the units. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 122 pass through untouched, which is why this is
    a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_122_part2 : [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,13,47,75,109,121].contains ((pmod a 10 122 + pmod b 10 122) % 122)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 122 AND REDUCED EXPONENT 12. The 60 units raise to exactly the 5 value(s)
    [1,9,81,95,119] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_12_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,9,81,95,119].contains (pmod a 12 122))) ∧ ([1,9,81,95,119].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].any (fun a => pmod a 12 122 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 12 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 122, the sum of their 12-th powers never lands on the 12-th power image
    [1,9,81,95,119] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with
    x, y, z all coprime to 122, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and
    every larger n with the same gcd against 60. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(122) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 122 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_122_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,9,81,95,119].contains ((pmod a 12 122 + pmod b 12 122) % 122)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 12 — part 2 of 2. For every unit a in
    [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121] and every unit b coprime to 122, the
    sum of their 12-th powers never lands on the 12-th power image [1,9,81,95,119] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 122, for EVERY
    exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the same gcd
    against 60. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(122) =
    60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping,
    and the parts together are the whole walk over the units. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 122 pass through untouched, which is why this is
    a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_122_part2 : [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,9,81,95,119].contains ((pmod a 12 122 + pmod b 12 122) % 122)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 122 AND REDUCED EXPONENT 15. The 60 units raise to exactly the 4 value(s)
    [1,11,111,121] — every unit's 15-th power is in that list, and every entry of the list is some unit's 15-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_15_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,11,111,121].contains (pmod a 15 122))) ∧ ([1,11,111,121].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].any (fun a => pmod a 15 122 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 15 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 122, the sum of their 15-th powers never lands on the 15-th power image
    [1,11,111,121] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 122, for EVERY exponent n reducing to 15 — that is n in [15] of the range walked, and
    every larger n with the same gcd against 60. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(122) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 122 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_15_mod_122_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,11,111,121].contains ((pmod a 15 122 + pmod b 15 122) % 122)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 15 — part 2 of 2. For every unit a in
    [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121] and every unit b coprime to 122, the
    sum of their 15-th powers never lands on the 15-th power image [1,11,111,121] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 122, for EVERY exponent n
    reducing to 15 — that is n in [15] of the range walked, and every larger n with the same gcd against 60. An
    unbounded conclusion from a finite table. The walk is split into 2 parts because phi(122) = 60 puts the full
    60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 122 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_15_mod_122_part2 : [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,11,111,121].contains ((pmod a 15 122 + pmod b 15 122) % 122)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 122 AND REDUCED EXPONENT 20. The 60 units raise to exactly the 3 value(s)
    [1,13,47] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_20_mod_122 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,13,47].contains (pmod a 20 122))) ∧ ([1,13,47].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].any (fun a => pmod a 20 122 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 20 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83]
    and every unit b coprime to 122, the sum of their 20-th powers never lands on the 20-th power image
    [1,13,47] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z
    all coprime to 122, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every
    larger n with the same gcd against 60. An unbounded conclusion from a finite table. The walk is split into 2
    parts because phi(122) = 60 puts the full 60-by-60 sweep past Lean's default elaboration budget; the split
    is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 122 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_122_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,13,47].contains ((pmod a 20 122 + pmod b 20 122) % 122)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 122, REDUCED EXPONENT 20 — part 2 of 2. For every unit a in
    [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121] and every unit b coprime to 122, the
    sum of their 20-th powers never lands on the 20-th power image [1,13,47] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 122, for EVERY exponent n
    reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 60. An
    unbounded conclusion from a finite table. The walk is split into 2 parts because phi(122) = 60 puts the full
    60-by-60 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 122 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_122_part2 : [85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121].all (fun b => !([1,13,47].contains ((pmod a 20 122 + pmod b 20 122) % 122)))) := by decide
