-- lean/FermatRing4.lean — GENERATED. THE CONGRUENCE SURVEY, RING 4 OF 21 — moduli 6, 27, 48, 69, 90, 111, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

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

/-- THE ORDER STRUCTURE AT MODULUS 6. The 2 residues coprime to 6 are all killed by the exponent 2 — a^2 = 1 for
    every unit a — and no proper divisor of 2 kills them all (all 1 of them checked). So 2 is the exponent of
    (Z/6)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction at
    this modulus actually turns on: an exponent n reaches the group only through gcd(n, 2), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_6 : ([1,5].all (fun a => pmod a 2 6 == 1)) ∧ ([1].all (fun k => !([1,5].all (fun a => pmod a k 6 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 6 AND REDUCED EXPONENT 1. The 2 units raise to exactly the 2 value(s) [1,5] —
    every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_6 : ([1,5].all (fun a => [1,5].contains (pmod a 1 6))) ∧ ([1,5].all (fun v => [1,5].any (fun a => pmod a 1 6 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 6, REDUCED EXPONENT 1. For every unit a in [1,5] and every unit b coprime to 6,
    the sum of their 1-th powers never lands on the 1-th power image [1,5] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 6, for EVERY exponent n
    reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger n with the
    same gcd against 2. An unbounded conclusion from a finite table. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 6 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_6 : [1,5].all (fun a => [1,5].all (fun b => !([1,5].contains ((pmod a 1 6 + pmod b 1 6) % 6)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 6 AND REDUCED EXPONENT 2. The 2 units raise to exactly the 1 value(s) [1] —
    every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_6 : ([1,5].all (fun a => [1].contains (pmod a 2 6))) ∧ ([1].all (fun v => [1,5].any (fun a => pmod a 2 6 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 6, REDUCED EXPONENT 2. For every unit a in [1,5] and every unit b coprime to 6,
    the sum of their 2-th powers never lands on the 2-th power image [1] (pinned exactly by the theorem above).
    So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 6, for EVERY exponent n reducing
    to 2 — that is n in [4,6,8,10,12,14,16,18,20,22] of the range walked, and every larger n with the same gcd
    against 2. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case
    I — and infinitely many triples sharing a factor with 6 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_6 : [1,5].all (fun a => [1,5].all (fun b => !([1].contains ((pmod a 2 6 + pmod b 2 6) % 6)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 27. The 18 residues coprime to 27 are all killed by the exponent 18 — a^18 =
    1 for every unit a — and no proper divisor of 18 kills them all (all 5 of them checked). So 18 is the
    exponent of (Z/27)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 18),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_27 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => pmod a 18 27 == 1)) ∧ ([1,2,3,6,9].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => pmod a k 27 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 27, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 27), with
    all three coprime to 27, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_27 : (pmod 1 1 27 + pmod 1 1 27) % 27 = pmod 2 1 27 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 27 AND REDUCED EXPONENT 2. The 18 units raise to exactly the 9 value(s)
    [1,4,7,10,13,16,19,22,25] — every unit's 2-th power is in that list, and every entry of the list is some
    unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_27 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => [1,4,7,10,13,16,19,22,25].contains (pmod a 2 27))) ∧ ([1,4,7,10,13,16,19,22,25].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].any (fun a => pmod a 2 27 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 27, REDUCED EXPONENT 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26] and every unit b coprime to 27, the sum of their 2-th
    powers never lands on the 2-th power image [1,4,7,10,13,16,19,22,25] (pinned exactly by the theorem above).
    So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 27, for EVERY exponent n reducing
    to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with the same gcd against
    18. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 27 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_27 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun b => !([1,4,7,10,13,16,19,22,25].contains ((pmod a 2 27 + pmod b 2 27) % 27)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 27 AND REDUCED EXPONENT 3. The 18 units raise to exactly the 6 value(s)
    [1,8,10,17,19,26] — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_27 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => [1,8,10,17,19,26].contains (pmod a 3 27))) ∧ ([1,8,10,17,19,26].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].any (fun a => pmod a 3 27 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 27, REDUCED EXPONENT 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26] and every unit b coprime to 27, the sum of their 3-th
    powers never lands on the 3-th power image [1,8,10,17,19,26] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 27, for EVERY exponent n reducing to 3 —
    that is n in [3,15,21] of the range walked, and every larger n with the same gcd against 18. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 27 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_27 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun b => !([1,8,10,17,19,26].contains ((pmod a 3 27 + pmod b 3 27) % 27)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 27 AND REDUCED EXPONENT 6. The 18 units raise to exactly the 3 value(s)
    [1,10,19] — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_27 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => [1,10,19].contains (pmod a 6 27))) ∧ ([1,10,19].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].any (fun a => pmod a 6 27 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 27, REDUCED EXPONENT 6. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26] and every unit b coprime to 27, the sum of their 6-th
    powers never lands on the 6-th power image [1,10,19] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 27, for EVERY exponent n reducing to 6 — that is
    n in [6,12] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 27 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_27 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun b => !([1,10,19].contains ((pmod a 6 27 + pmod b 6 27) % 27)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 27 AND REDUCED EXPONENT 9. The 18 units raise to exactly the 2 value(s) [1,26]
    — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_9_mod_27 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => [1,26].contains (pmod a 9 27))) ∧ ([1,26].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].any (fun a => pmod a 9 27 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 27, REDUCED EXPONENT 9. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26] and every unit b coprime to 27, the sum of their 9-th
    powers never lands on the 9-th power image [1,26] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 27, for EVERY exponent n reducing to 9 — that is n
    in [9] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a
    finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a
    factor with 27 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_27 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun b => !([1,26].contains ((pmod a 9 27 + pmod b 9 27) % 27)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 27 AND REDUCED EXPONENT 18. The 18 units raise to exactly the 1 value(s) [1] —
    every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_18_mod_27 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => [1].contains (pmod a 18 27))) ∧ ([1].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].any (fun a => pmod a 18 27 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 27, REDUCED EXPONENT 18. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26] and every unit b coprime to 27, the sum of their 18-th
    powers never lands on the 18-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 27, for EVERY exponent n reducing to 18 — that is n
    in [18] of the range walked, and every larger n with the same gcd against 18. An unbounded conclusion from a
    finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a
    factor with 27 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_27 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26].all (fun b => !([1].contains ((pmod a 18 27 + pmod b 18 27) % 27)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 48. The 16 residues coprime to 48 are all killed by the exponent 4 — a^4 = 1
    for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent
    of (Z/48)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction
    at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_48 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun a => pmod a 4 48 == 1)) ∧ ([1,2].all (fun k => !([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun a => pmod a k 48 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 48 AND REDUCED EXPONENT 1. The 16 units raise to exactly the 16 value(s)
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47] — every unit's 1-th power is in that list, and every entry of
    the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement
    ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_48 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].contains (pmod a 1 48))) ∧ ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].any (fun a => pmod a 1 48 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 48, REDUCED EXPONENT 1. For every unit a in
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47] and every unit b coprime to 48, the sum of their 1-th powers
    never lands on the 1-th power image [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 48, for EVERY
    exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger
    n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only
    — classically Case I — and infinitely many triples sharing a factor with 48 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_48 : [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun b => !([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].contains ((pmod a 1 48 + pmod b 1 48) % 48)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 48 AND REDUCED EXPONENT 2. The 16 units raise to exactly the 2 value(s) [1,25]
    — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_48 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun a => [1,25].contains (pmod a 2 48))) ∧ ([1,25].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].any (fun a => pmod a 2 48 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 48, REDUCED EXPONENT 2. For every unit a in
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47] and every unit b coprime to 48, the sum of their 2-th powers
    never lands on the 2-th power image [1,25] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 48, for EVERY exponent n reducing to 2 — that is n in
    [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 48 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_48 : [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun b => !([1,25].contains ((pmod a 2 48 + pmod b 2 48) % 48)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 48 AND REDUCED EXPONENT 4. The 16 units raise to exactly the 1 value(s) [1] —
    every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_48 : ([1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun a => [1].contains (pmod a 4 48))) ∧ ([1].all (fun v => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].any (fun a => pmod a 4 48 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 48, REDUCED EXPONENT 4. For every unit a in
    [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47] and every unit b coprime to 48, the sum of their 4-th powers
    never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 48, for EVERY exponent n reducing to 4 — that is n in
    [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 48 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_48 : [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun a => [1,5,7,11,13,17,19,23,25,29,31,35,37,41,43,47].all (fun b => !([1].contains ((pmod a 4 48 + pmod b 4 48) % 48)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 69. The 44 residues coprime to 69 are all killed by the exponent 22 — a^22 =
    1 for every unit a — and no proper divisor of 22 kills them all (all 3 of them checked). So 22 is the
    exponent of (Z/69)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 22),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_69 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => pmod a 22 69 == 1)) ∧ ([1,2,11].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => pmod a k 69 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 69, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 69), with
    all three coprime to 69, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,7,9,13,15,17,19,21,23] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_69 : (pmod 1 1 69 + pmod 1 1 69) % 69 = pmod 2 1 69 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 69 AND REDUCED EXPONENT 2. The 44 units raise to exactly the 11 value(s)
    [1,4,13,16,25,31,49,52,55,58,64] — every unit's 2-th power is in that list, and every entry of the list is
    some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set,
    so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_69 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,4,13,16,25,31,49,52,55,58,64].contains (pmod a 2 69))) ∧ ([1,4,13,16,25,31,49,52,55,58,64].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].any (fun a => pmod a 2 69 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 69, REDUCED EXPONENT 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68]
    and every unit b coprime to 69, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,13,16,25,31,49,52,55,58,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution
    in integers with x, y, z all coprime to 69, for EVERY exponent n reducing to 2 — that is n in
    [4,6,8,10,12,14,16,18,20] of the range walked, and every larger n with the same gcd against 22. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 69 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_69 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun b => !([1,4,13,16,25,31,49,52,55,58,64].contains ((pmod a 2 69 + pmod b 2 69) % 69)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 69 AND REDUCED EXPONENT 11. The 44 units raise to exactly the 4 value(s)
    [1,22,47,68] — every unit's 11-th power is in that list, and every entry of the list is some unit's 11-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_11_mod_69 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,22,47,68].contains (pmod a 11 69))) ∧ ([1,22,47,68].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].any (fun a => pmod a 11 69 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 69, REDUCED EXPONENT 11. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68]
    and every unit b coprime to 69, the sum of their 11-th powers never lands on the 11-th power image
    [1,22,47,68] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 69, for EVERY exponent n reducing to 11 — that is n in [11] of the range walked, and
    every larger n with the same gcd against 22. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 69 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_11_mod_69 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun b => !([1,22,47,68].contains ((pmod a 11 69 + pmod b 11 69) % 69)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 69 AND REDUCED EXPONENT 22. The 44 units raise to exactly the 1 value(s) [1] —
    every unit's 22-th power is in that list, and every entry of the list is some unit's 22-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_22_mod_69 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1].contains (pmod a 22 69))) ∧ ([1].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].any (fun a => pmod a 22 69 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 69, REDUCED EXPONENT 22. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68]
    and every unit b coprime to 69, the sum of their 22-th powers never lands on the 22-th power image [1]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 69, for EVERY exponent n reducing to 22 — that is n in [22] of the range walked, and every larger
    n with the same gcd against 22. An unbounded conclusion from a finite table. It settles the coprime case
    only — classically Case I — and infinitely many triples sharing a factor with 69 pass through untouched,
    which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_22_mod_69 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,25,26,28,29,31,32,34,35,37,38,40,41,43,44,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun b => !([1].contains ((pmod a 22 69 + pmod b 22 69) % 69)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 90. The 24 residues coprime to 90 are all killed by the exponent 12 — a^12 =
    1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the
    exponent of (Z/90)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_90 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => pmod a 12 90 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => pmod a k 90 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 90 AND REDUCED EXPONENT 1. The 24 units raise to exactly the 24 value(s)
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89] — every unit's 1-th power is in that
    list, and every entry of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction
    below is a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_90 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].contains (pmod a 1 90))) ∧ ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].any (fun a => pmod a 1 90 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 90, REDUCED EXPONENT 1. For every unit a in
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89] and every unit b coprime to 90, the
    sum of their 1-th powers never lands on the 1-th power image
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 90, for EVERY exponent n
    reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every larger n with the same gcd
    against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case
    I — and infinitely many triples sharing a factor with 90 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_90 : [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun b => !([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].contains ((pmod a 1 90 + pmod b 1 90) % 90)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 90 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 6 value(s)
    [1,19,31,49,61,79] — every unit's 2-th power is in that list, and every entry of the list is some unit's
    2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_90 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,19,31,49,61,79].contains (pmod a 2 90))) ∧ ([1,19,31,49,61,79].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].any (fun a => pmod a 2 90 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 90, REDUCED EXPONENT 2. For every unit a in
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89] and every unit b coprime to 90, the
    sum of their 2-th powers never lands on the 2-th power image [1,19,31,49,61,79] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 90, for EVERY
    exponent n reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd
    against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case
    I — and infinitely many triples sharing a factor with 90 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_90 : [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun b => !([1,19,31,49,61,79].contains ((pmod a 2 90 + pmod b 2 90) % 90)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 90 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s)
    [1,17,19,37,53,71,73,89] — every unit's 3-th power is in that list, and every entry of the list is some
    unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_90 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,17,19,37,53,71,73,89].contains (pmod a 3 90))) ∧ ([1,17,19,37,53,71,73,89].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].any (fun a => pmod a 3 90 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 90, REDUCED EXPONENT 3. For every unit a in
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89] and every unit b coprime to 90, the
    sum of their 3-th powers never lands on the 3-th power image [1,17,19,37,53,71,73,89] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 90, for EVERY
    exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same
    gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 90 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_90 : [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun b => !([1,17,19,37,53,71,73,89].contains ((pmod a 3 90 + pmod b 3 90) % 90)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 90 AND REDUCED EXPONENT 4. The 24 units raise to exactly the 3 value(s)
    [1,31,61] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_90 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,31,61].contains (pmod a 4 90))) ∧ ([1,31,61].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].any (fun a => pmod a 4 90 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 90, REDUCED EXPONENT 4. For every unit a in
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89] and every unit b coprime to 90, the
    sum of their 4-th powers never lands on the 4-th power image [1,31,61] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 90, for EVERY exponent n
    reducing to 4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against
    12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 90 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_90 : [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun b => !([1,31,61].contains ((pmod a 4 90 + pmod b 4 90) % 90)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 90 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 2 value(s) [1,19]
    — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_90 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,19].contains (pmod a 6 90))) ∧ ([1,19].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].any (fun a => pmod a 6 90 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 90, REDUCED EXPONENT 6. For every unit a in
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89] and every unit b coprime to 90, the
    sum of their 6-th powers never lands on the 6-th power image [1,19] (pinned exactly by the theorem above).
    So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 90, for EVERY exponent n reducing
    to 6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An
    unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 90 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_90 : [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun b => !([1,19].contains ((pmod a 6 90 + pmod b 6 90) % 90)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 90 AND REDUCED EXPONENT 12. The 24 units raise to exactly the 1 value(s) [1] —
    every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_12_mod_90 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1].contains (pmod a 12 90))) ∧ ([1].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].any (fun a => pmod a 12 90 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 90, REDUCED EXPONENT 12. For every unit a in
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89] and every unit b coprime to 90, the
    sum of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 90, for EVERY exponent n reducing to
    12 — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 90 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_90 : [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59,61,67,71,73,77,79,83,89].all (fun b => !([1].contains ((pmod a 12 90 + pmod b 12 90) % 90)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 111. The 72 residues coprime to 111 are all killed by the exponent 36 — a^36
    = 1 for every unit a — and no proper divisor of 36 kills them all (all 8 of them checked). So 36 is the
    exponent of (Z/111)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 36),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_111 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun a => pmod a 36 111 == 1)) ∧ ([1,2,3,4,6,9,12,18].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun a => pmod a k 111 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 111),
    with all three coprime to 111, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_111 : (pmod 1 1 111 + pmod 1 1 111) % 111 = pmod 2 1 111 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 111 AND REDUCED EXPONENT 2. The 72 units raise to exactly the 18 value(s)
    [1,4,7,10,16,25,28,34,40,46,49,58,64,67,70,73,85,100] — every unit's 2-th power is in that list, and every
    entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a
    statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_111 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun a => [1,4,7,10,16,25,28,34,40,46,49,58,64,67,70,73,85,100].contains (pmod a 2 111))) ∧ ([1,4,7,10,16,25,28,34,40,46,49,58,64,67,70,73,85,100].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].any (fun a => pmod a 2 111 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 2 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52] and every
    unit b coprime to 111, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,7,10,16,25,28,34,40,46,49,58,64,67,70,73,85,100] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 111, for EVERY exponent n reducing to 2 — that
    is n in [10,14,22] of the range walked, and every larger n with the same gcd against 36. An unbounded
    conclusion from a finite table. The walk is split into 3 parts because phi(111) = 72 puts the full 72-by-72
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 111 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_111_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,4,7,10,16,25,28,34,40,46,49,58,64,67,70,73,85,100].contains ((pmod a 2 111 + pmod b 2 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 2 — part 2 of 3. For every unit a in
    [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104]
    and every unit b coprime to 111, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,7,10,16,25,28,34,40,46,49,58,64,67,70,73,85,100] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 111, for EVERY exponent n reducing to 2 — that
    is n in [10,14,22] of the range walked, and every larger n with the same gcd against 36. An unbounded
    conclusion from a finite table. The walk is split into 3 parts because phi(111) = 72 puts the full 72-by-72
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 111 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_111_part2 : [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,4,7,10,16,25,28,34,40,46,49,58,64,67,70,73,85,100].contains ((pmod a 2 111 + pmod b 2 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 2 — part 3 of 3. For every unit a in [106,107,109,110] and
    every unit b coprime to 111, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,7,10,16,25,28,34,40,46,49,58,64,67,70,73,85,100] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 111, for EVERY exponent n reducing to 2 — that
    is n in [10,14,22] of the range walked, and every larger n with the same gcd against 36. An unbounded
    conclusion from a finite table. The walk is split into 3 parts because phi(111) = 72 puts the full 72-by-72
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 111 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_111_part3 : [106,107,109,110].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,4,7,10,16,25,28,34,40,46,49,58,64,67,70,73,85,100].contains ((pmod a 2 111 + pmod b 2 111) % 111)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 7^3 = 62^3 (mod 111),
    with all three coprime to 111, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 3 — that is n in [3,15,21] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_3_mod_111 : (pmod 1 3 111 + pmod 7 3 111) % 111 = pmod 62 3 111 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 111 AND REDUCED EXPONENT 4. The 72 units raise to exactly the 9 value(s)
    [1,7,10,16,34,46,49,70,100] — every unit's 4-th power is in that list, and every entry of the list is some
    unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_111 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun a => [1,7,10,16,34,46,49,70,100].contains (pmod a 4 111))) ∧ ([1,7,10,16,34,46,49,70,100].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].any (fun a => pmod a 4 111 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 4 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52] and every
    unit b coprime to 111, the sum of their 4-th powers never lands on the 4-th power image
    [1,7,10,16,34,46,49,70,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 111, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of
    the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite
    table. The walk is split into 3 parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 111 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_111_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,7,10,16,34,46,49,70,100].contains ((pmod a 4 111 + pmod b 4 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 4 — part 2 of 3. For every unit a in
    [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104]
    and every unit b coprime to 111, the sum of their 4-th powers never lands on the 4-th power image
    [1,7,10,16,34,46,49,70,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 111, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of
    the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite
    table. The walk is split into 3 parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 111 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_111_part2 : [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,7,10,16,34,46,49,70,100].contains ((pmod a 4 111 + pmod b 4 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 4 — part 3 of 3. For every unit a in [106,107,109,110] and
    every unit b coprime to 111, the sum of their 4-th powers never lands on the 4-th power image
    [1,7,10,16,34,46,49,70,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 111, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of
    the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite
    table. The walk is split into 3 parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 111 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_111_part3 : [106,107,109,110].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,7,10,16,34,46,49,70,100].contains ((pmod a 4 111 + pmod b 4 111) % 111)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 111 AND REDUCED EXPONENT 6. The 72 units raise to exactly the 6 value(s)
    [1,10,64,73,85,100] — every unit's 6-th power is in that list, and every entry of the list is some unit's
    6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_111 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun a => [1,10,64,73,85,100].contains (pmod a 6 111))) ∧ ([1,10,64,73,85,100].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].any (fun a => pmod a 6 111 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 6 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52] and every
    unit b coprime to 111, the sum of their 6-th powers never lands on the 6-th power image [1,10,64,73,85,100]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 111, for EVERY exponent n reducing to 6 — that is n in [6] of the range walked, and every larger
    n with the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts
    because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 111 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_111_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,10,64,73,85,100].contains ((pmod a 6 111 + pmod b 6 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 6 — part 2 of 3. For every unit a in
    [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104]
    and every unit b coprime to 111, the sum of their 6-th powers never lands on the 6-th power image
    [1,10,64,73,85,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 111, for EVERY exponent n reducing to 6 — that is n in [6] of the range walked,
    and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. The walk is
    split into 3 parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 111
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_111_part2 : [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,10,64,73,85,100].contains ((pmod a 6 111 + pmod b 6 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 6 — part 3 of 3. For every unit a in [106,107,109,110] and
    every unit b coprime to 111, the sum of their 6-th powers never lands on the 6-th power image
    [1,10,64,73,85,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 111, for EVERY exponent n reducing to 6 — that is n in [6] of the range walked,
    and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. The walk is
    split into 3 parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 111
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_111_part3 : [106,107,109,110].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,10,64,73,85,100].contains ((pmod a 6 111 + pmod b 6 111) % 111)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 111 AND REDUCED EXPONENT 9. The 72 units raise to exactly the 8 value(s)
    [1,31,38,43,68,73,80,110] — every unit's 9-th power is in that list, and every entry of the list is some
    unit's 9-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_9_mod_111 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun a => [1,31,38,43,68,73,80,110].contains (pmod a 9 111))) ∧ ([1,31,38,43,68,73,80,110].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].any (fun a => pmod a 9 111 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 9 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52] and every
    unit b coprime to 111, the sum of their 9-th powers never lands on the 9-th power image
    [1,31,38,43,68,73,80,110] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 111, for EVERY exponent n reducing to 9 — that is n in [9] of the range
    walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. The
    walk is split into 3 parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 111 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_111_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,31,38,43,68,73,80,110].contains ((pmod a 9 111 + pmod b 9 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 9 — part 2 of 3. For every unit a in
    [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104]
    and every unit b coprime to 111, the sum of their 9-th powers never lands on the 9-th power image
    [1,31,38,43,68,73,80,110] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 111, for EVERY exponent n reducing to 9 — that is n in [9] of the range
    walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. The
    walk is split into 3 parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 111 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_111_part2 : [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,31,38,43,68,73,80,110].contains ((pmod a 9 111 + pmod b 9 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 9 — part 3 of 3. For every unit a in [106,107,109,110] and
    every unit b coprime to 111, the sum of their 9-th powers never lands on the 9-th power image
    [1,31,38,43,68,73,80,110] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 111, for EVERY exponent n reducing to 9 — that is n in [9] of the range
    walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. The
    walk is split into 3 parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 111 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_111_part3 : [106,107,109,110].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,31,38,43,68,73,80,110].contains ((pmod a 9 111 + pmod b 9 111) % 111)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 111 AND REDUCED EXPONENT 12. The 72 units raise to exactly the 3 value(s)
    [1,10,100] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_12_mod_111 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun a => [1,10,100].contains (pmod a 12 111))) ∧ ([1,10,100].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].any (fun a => pmod a 12 111 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 12 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52] and every
    unit b coprime to 111, the sum of their 12-th powers never lands on the 12-th power image [1,10,100] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    111, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with
    the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts because
    phi(111) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 111 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_111_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,10,100].contains ((pmod a 12 111 + pmod b 12 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 12 — part 2 of 3. For every unit a in
    [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104]
    and every unit b coprime to 111, the sum of their 12-th powers never lands on the 12-th power image
    [1,10,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y,
    z all coprime to 111, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every
    larger n with the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3
    parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split
    is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 111 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_111_part2 : [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,10,100].contains ((pmod a 12 111 + pmod b 12 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 12 — part 3 of 3. For every unit a in [106,107,109,110] and
    every unit b coprime to 111, the sum of their 12-th powers never lands on the 12-th power image [1,10,100]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 111, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every
    larger n with the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3
    parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split
    is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 111 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_111_part3 : [106,107,109,110].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,10,100].contains ((pmod a 12 111 + pmod b 12 111) % 111)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 111 AND REDUCED EXPONENT 18. The 72 units raise to exactly the 2 value(s)
    [1,73] — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_18_mod_111 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun a => [1,73].contains (pmod a 18 111))) ∧ ([1,73].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].any (fun a => pmod a 18 111 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 18 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52] and every
    unit b coprime to 111, the sum of their 18-th powers never lands on the 18-th power image [1,73] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    111, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with
    the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts because
    phi(111) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 111 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_111_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,73].contains ((pmod a 18 111 + pmod b 18 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 18 — part 2 of 3. For every unit a in
    [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104]
    and every unit b coprime to 111, the sum of their 18-th powers never lands on the 18-th power image [1,73]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 111, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every
    larger n with the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3
    parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split
    is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 111 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_111_part2 : [53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,73].contains ((pmod a 18 111 + pmod b 18 111) % 111)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 111, REDUCED EXPONENT 18 — part 3 of 3. For every unit a in [106,107,109,110] and
    every unit b coprime to 111, the sum of their 18-th powers never lands on the 18-th power image [1,73]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 111, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every
    larger n with the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3
    parts because phi(111) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split
    is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 111 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_111_part3 : [106,107,109,110].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,76,77,79,80,82,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110].all (fun b => !([1,73].contains ((pmod a 18 111 + pmod b 18 111) % 111)))) := by decide
