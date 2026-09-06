-- lean/FermatRing16.lean — GENERATED. THE CONGRUENCE SURVEY, RING 16 OF 21 — moduli 18, 39, 60, 81, 102, 123, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

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

/-- THE ORDER STRUCTURE AT MODULUS 18. The 6 residues coprime to 18 are all killed by the exponent 6 — a^6 = 1
    for every unit a — and no proper divisor of 6 kills them all (all 3 of them checked). So 6 is the exponent
    of (Z/18)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction
    at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 6), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_18 : ([1,5,7,11,13,17].all (fun a => pmod a 6 18 == 1)) ∧ ([1,2,3].all (fun k => !([1,5,7,11,13,17].all (fun a => pmod a k 18 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 18 AND REDUCED EXPONENT 1. The 6 units raise to exactly the 6 value(s)
    [1,5,7,11,13,17] — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_18 : ([1,5,7,11,13,17].all (fun a => [1,5,7,11,13,17].contains (pmod a 1 18))) ∧ ([1,5,7,11,13,17].all (fun v => [1,5,7,11,13,17].any (fun a => pmod a 1 18 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 18, REDUCED EXPONENT 1. For every unit a in [1,5,7,11,13,17] and every unit b
    coprime to 18, the sum of their 1-th powers never lands on the 1-th power image [1,5,7,11,13,17] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    18, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked, and every
    larger n with the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 18 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_18 : [1,5,7,11,13,17].all (fun a => [1,5,7,11,13,17].all (fun b => !([1,5,7,11,13,17].contains ((pmod a 1 18 + pmod b 1 18) % 18)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 18 AND REDUCED EXPONENT 2. The 6 units raise to exactly the 3 value(s)
    [1,7,13] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_18 : ([1,5,7,11,13,17].all (fun a => [1,7,13].contains (pmod a 2 18))) ∧ ([1,7,13].all (fun v => [1,5,7,11,13,17].any (fun a => pmod a 2 18 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 18, REDUCED EXPONENT 2. For every unit a in [1,5,7,11,13,17] and every unit b
    coprime to 18, the sum of their 2-th powers never lands on the 2-th power image [1,7,13] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 18, for EVERY
    exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with
    the same gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 18 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_18 : [1,5,7,11,13,17].all (fun a => [1,5,7,11,13,17].all (fun b => !([1,7,13].contains ((pmod a 2 18 + pmod b 2 18) % 18)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 18 AND REDUCED EXPONENT 3. The 6 units raise to exactly the 2 value(s) [1,17]
    — every unit's 3-th power is in that list, and every entry of the list is some unit's 3-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_18 : ([1,5,7,11,13,17].all (fun a => [1,17].contains (pmod a 3 18))) ∧ ([1,17].all (fun v => [1,5,7,11,13,17].any (fun a => pmod a 3 18 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 18, REDUCED EXPONENT 3. For every unit a in [1,5,7,11,13,17] and every unit b
    coprime to 18, the sum of their 3-th powers never lands on the 3-th power image [1,17] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 18, for EVERY
    exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same
    gcd against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 18 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_18 : [1,5,7,11,13,17].all (fun a => [1,5,7,11,13,17].all (fun b => !([1,17].contains ((pmod a 3 18 + pmod b 3 18) % 18)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 18 AND REDUCED EXPONENT 6. The 6 units raise to exactly the 1 value(s) [1] —
    every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_18 : ([1,5,7,11,13,17].all (fun a => [1].contains (pmod a 6 18))) ∧ ([1].all (fun v => [1,5,7,11,13,17].any (fun a => pmod a 6 18 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 18, REDUCED EXPONENT 6. For every unit a in [1,5,7,11,13,17] and every unit b
    coprime to 18, the sum of their 6-th powers never lands on the 6-th power image [1] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 18, for EVERY
    exponent n reducing to 6 — that is n in [6,12,18] of the range walked, and every larger n with the same gcd
    against 6. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case
    I — and infinitely many triples sharing a factor with 18 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_18 : [1,5,7,11,13,17].all (fun a => [1,5,7,11,13,17].all (fun b => !([1].contains ((pmod a 6 18 + pmod b 6 18) % 18)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 39. The 24 residues coprime to 39 are all killed by the exponent 12 — a^12 =
    1 for every unit a — and no proper divisor of 12 kills them all (all 5 of them checked). So 12 is the
    exponent of (Z/39)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 12),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_39 : ([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => pmod a 12 39 == 1)) ∧ ([1,2,3,4,6].all (fun k => !([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => pmod a k 39 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 39), with
    all three coprime to 39, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_39 : (pmod 1 1 39 + pmod 1 1 39) % 39 = pmod 2 1 39 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 39 AND REDUCED EXPONENT 2. The 24 units raise to exactly the 6 value(s)
    [1,4,10,16,22,25] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_39 : ([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,4,10,16,22,25].contains (pmod a 2 39))) ∧ ([1,4,10,16,22,25].all (fun v => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].any (fun a => pmod a 2 39 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 2. For every unit a in
    [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38] and every unit b coprime to 39, the sum
    of their 2-th powers never lands on the 2-th power image [1,4,10,16,22,25] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 39, for EVERY exponent n
    reducing to 2 — that is n in [10,14,22] of the range walked, and every larger n with the same gcd against
    12. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 39 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_39 : [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun b => !([1,4,10,16,22,25].contains ((pmod a 2 39 + pmod b 2 39) % 39)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 39 AND REDUCED EXPONENT 3. The 24 units raise to exactly the 8 value(s)
    [1,5,8,14,25,31,34,38] — every unit's 3-th power is in that list, and every entry of the list is some unit's
    3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_39 : ([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,5,8,14,25,31,34,38].contains (pmod a 3 39))) ∧ ([1,5,8,14,25,31,34,38].all (fun v => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].any (fun a => pmod a 3 39 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 3. For every unit a in
    [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38] and every unit b coprime to 39, the sum
    of their 3-th powers never lands on the 3-th power image [1,5,8,14,25,31,34,38] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 39, for EVERY
    exponent n reducing to 3 — that is n in [3,9,15,21] of the range walked, and every larger n with the same
    gcd against 12. An unbounded conclusion from a finite table. It settles the coprime case only — classically
    Case I — and infinitely many triples sharing a factor with 39 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_39 : [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun b => !([1,5,8,14,25,31,34,38].contains ((pmod a 3 39 + pmod b 3 39) % 39)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 39 AND REDUCED EXPONENT 4. The 24 units raise to exactly the 3 value(s)
    [1,16,22] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_39 : ([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,16,22].contains (pmod a 4 39))) ∧ ([1,16,22].all (fun v => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].any (fun a => pmod a 4 39 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 4. For every unit a in
    [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38] and every unit b coprime to 39, the sum
    of their 4-th powers never lands on the 4-th power image [1,16,22] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 39, for EVERY exponent n reducing to
    4 — that is n in [4,8,16,20] of the range walked, and every larger n with the same gcd against 12. An
    unbounded conclusion from a finite table. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 39 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_39 : [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun b => !([1,16,22].contains ((pmod a 4 39 + pmod b 4 39) % 39)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 39 AND REDUCED EXPONENT 6. The 24 units raise to exactly the 2 value(s) [1,25]
    — every unit's 6-th power is in that list, and every entry of the list is some unit's 6-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_39 : ([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,25].contains (pmod a 6 39))) ∧ ([1,25].all (fun v => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].any (fun a => pmod a 6 39 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 6. For every unit a in
    [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38] and every unit b coprime to 39, the sum
    of their 6-th powers never lands on the 6-th power image [1,25] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 39, for EVERY exponent n reducing to
    6 — that is n in [6,18] of the range walked, and every larger n with the same gcd against 12. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 39 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_39 : [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun b => !([1,25].contains ((pmod a 6 39 + pmod b 6 39) % 39)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 39 AND REDUCED EXPONENT 12. The 24 units raise to exactly the 1 value(s) [1] —
    every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_12_mod_39 : ([1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1].contains (pmod a 12 39))) ∧ ([1].all (fun v => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].any (fun a => pmod a 12 39 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 39, REDUCED EXPONENT 12. For every unit a in
    [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38] and every unit b coprime to 39, the sum
    of their 12-th powers never lands on the 12-th power image [1] (pinned exactly by the theorem above). So x^n
    + y^n = z^n has NO solution in integers with x, y, z all coprime to 39, for EVERY exponent n reducing to 12
    — that is n in [12] of the range walked, and every larger n with the same gcd against 12. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 39 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_39 : [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun a => [1,2,4,5,7,8,10,11,14,16,17,19,20,22,23,25,28,29,31,32,34,35,37,38].all (fun b => !([1].contains ((pmod a 12 39 + pmod b 12 39) % 39)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 60. The 16 residues coprime to 60 are all killed by the exponent 4 — a^4 = 1
    for every unit a — and no proper divisor of 4 kills them all (all 2 of them checked). So 4 is the exponent
    of (Z/60)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction
    at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 4), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_60 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => pmod a 4 60 == 1)) ∧ ([1,2].all (fun k => !([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => pmod a k 60 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 60 AND REDUCED EXPONENT 1. The 16 units raise to exactly the 16 value(s)
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59] — every unit's 1-th power is in that list, and every entry
    of the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement
    ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_60 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].contains (pmod a 1 60))) ∧ ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].any (fun a => pmod a 1 60 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 60, REDUCED EXPONENT 1. For every unit a in
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59] and every unit b coprime to 60, the sum of their 1-th powers
    never lands on the 1-th power image [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 60, for EVERY
    exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger
    n with the same gcd against 4. An unbounded conclusion from a finite table. It settles the coprime case only
    — classically Case I — and infinitely many triples sharing a factor with 60 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_60 : [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun b => !([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].contains ((pmod a 1 60 + pmod b 1 60) % 60)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 60 AND REDUCED EXPONENT 2. The 16 units raise to exactly the 2 value(s) [1,49]
    — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_60 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1,49].contains (pmod a 2 60))) ∧ ([1,49].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].any (fun a => pmod a 2 60 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 60, REDUCED EXPONENT 2. For every unit a in
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59] and every unit b coprime to 60, the sum of their 2-th powers
    never lands on the 2-th power image [1,49] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 60, for EVERY exponent n reducing to 2 — that is n in
    [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 60 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_60 : [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun b => !([1,49].contains ((pmod a 2 60 + pmod b 2 60) % 60)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 60 AND REDUCED EXPONENT 4. The 16 units raise to exactly the 1 value(s) [1] —
    every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_60 : ([1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1].contains (pmod a 4 60))) ∧ ([1].all (fun v => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].any (fun a => pmod a 4 60 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 60, REDUCED EXPONENT 4. For every unit a in
    [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59] and every unit b coprime to 60, the sum of their 4-th powers
    never lands on the 4-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 60, for EVERY exponent n reducing to 4 — that is n in
    [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 4. An unbounded conclusion
    from a finite table. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 60 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_60 : [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun a => [1,7,11,13,17,19,23,29,31,37,41,43,47,49,53,59].all (fun b => !([1].contains ((pmod a 4 60 + pmod b 4 60) % 60)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 81. The 54 residues coprime to 81 are all killed by the exponent 54 — a^54 =
    1 for every unit a — and no proper divisor of 54 kills them all (all 7 of them checked). So 54 is the
    exponent of (Z/81)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 54),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_81 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => pmod a 54 81 == 1)) ∧ ([1,2,3,6,9,18,27].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => pmod a k 81 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 81), with
    all three coprime to 81, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_81 : (pmod 1 1 81 + pmod 1 1 81) % 81 = pmod 2 1 81 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 81 AND REDUCED EXPONENT 2. The 54 units raise to exactly the 27 value(s)
    [1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79] — every unit's 2-th power is
    in that list, and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The
    obstruction below is a statement ABOUT this set, so the set is established first rather than asserted inside
    it. -/
theorem power_image_exact_reduced_2_mod_81 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => [1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79].contains (pmod a 2 81))) ∧ ([1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].any (fun a => pmod a 2 81 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68]
    and every unit b coprime to 81, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY
    exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every larger n with
    the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts because
    phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 81 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_81_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79].contains ((pmod a 2 81 + pmod b 2 81) % 81)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in
    [70,71,73,74,76,77,79,80] and every unit b coprime to 81, the sum of their 2-th powers never lands on the
    2-th power image [1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    81, for EVERY exponent n reducing to 2 — that is n in [4,8,10,14,16,20,22] of the range walked, and every
    larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2
    parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_81_part2 : [70,71,73,74,76,77,79,80].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,4,7,10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79].contains ((pmod a 2 81 + pmod b 2 81) % 81)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 81 AND REDUCED EXPONENT 3. The 54 units raise to exactly the 18 value(s)
    [1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80] — every unit's 3-th power is in that list, and every
    entry of the list is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a
    statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_81 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => [1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80].contains (pmod a 3 81))) ∧ ([1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].any (fun a => pmod a 3 81 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 3 — part 1 of 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68]
    and every unit b coprime to 81, the sum of their 3-th powers never lands on the 3-th power image
    [1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 3 — that is
    n in [3,15,21] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion
    from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past
    Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole
    walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's
    Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_81_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80].contains ((pmod a 3 81 + pmod b 3 81) % 81)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 3 — part 2 of 2. For every unit a in
    [70,71,73,74,76,77,79,80] and every unit b coprime to 81, the sum of their 3-th powers never lands on the
    3-th power image [1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n
    reducing to 3 — that is n in [3,15,21] of the range walked, and every larger n with the same gcd against 54.
    An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(81) = 54 puts the
    full 54-by-54 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the
    parts together are the whole walk over the units. It settles the coprime case only — classically Case I —
    and infinitely many triples sharing a factor with 81 pass through untouched, which is why this is a filter
    and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_81_part2 : [70,71,73,74,76,77,79,80].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,8,10,17,19,26,28,35,37,44,46,53,55,62,64,71,73,80].contains ((pmod a 3 81 + pmod b 3 81) % 81)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 81 AND REDUCED EXPONENT 6. The 54 units raise to exactly the 9 value(s)
    [1,10,19,28,37,46,55,64,73] — every unit's 6-th power is in that list, and every entry of the list is some
    unit's 6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_81 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => [1,10,19,28,37,46,55,64,73].contains (pmod a 6 81))) ∧ ([1,10,19,28,37,46,55,64,73].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].any (fun a => pmod a 6 81 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 6 — part 1 of 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68]
    and every unit b coprime to 81, the sum of their 6-th powers never lands on the 6-th power image
    [1,10,19,28,37,46,55,64,73] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 6 — that is n in [6,12] of the
    range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table.
    The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_81_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,10,19,28,37,46,55,64,73].contains ((pmod a 6 81 + pmod b 6 81) % 81)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 6 — part 2 of 2. For every unit a in
    [70,71,73,74,76,77,79,80] and every unit b coprime to 81, the sum of their 6-th powers never lands on the
    6-th power image [1,10,19,28,37,46,55,64,73] (pinned exactly by the theorem above). So x^n + y^n = z^n has
    NO solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 6 — that is n in
    [6,12] of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a
    finite table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's
    default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk
    over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_81_part2 : [70,71,73,74,76,77,79,80].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,10,19,28,37,46,55,64,73].contains ((pmod a 6 81 + pmod b 6 81) % 81)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 81 AND REDUCED EXPONENT 9. The 54 units raise to exactly the 6 value(s)
    [1,26,28,53,55,80] — every unit's 9-th power is in that list, and every entry of the list is some unit's
    9-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_9_mod_81 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => [1,26,28,53,55,80].contains (pmod a 9 81))) ∧ ([1,26,28,53,55,80].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].any (fun a => pmod a 9 81 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 9 — part 1 of 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68]
    and every unit b coprime to 81, the sum of their 9-th powers never lands on the 9-th power image
    [1,26,28,53,55,80] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 81, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked,
    and every larger n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is
    split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget;
    the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles
    the coprime case only — classically Case I — and infinitely many triples sharing a factor with 81 pass
    through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_81_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,26,28,53,55,80].contains ((pmod a 9 81 + pmod b 9 81) % 81)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 9 — part 2 of 2. For every unit a in
    [70,71,73,74,76,77,79,80] and every unit b coprime to 81, the sum of their 9-th powers never lands on the
    9-th power image [1,26,28,53,55,80] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 9 — that is n in [9]
    of the range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite
    table. The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_81_part2 : [70,71,73,74,76,77,79,80].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,26,28,53,55,80].contains ((pmod a 9 81 + pmod b 9 81) % 81)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 81 AND REDUCED EXPONENT 18. The 54 units raise to exactly the 3 value(s)
    [1,28,55] — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_18_mod_81 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun a => [1,28,55].contains (pmod a 18 81))) ∧ ([1,28,55].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].any (fun a => pmod a 18 81 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 18 — part 1 of 2. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68]
    and every unit b coprime to 81, the sum of their 18-th powers never lands on the 18-th power image [1,28,55]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 81, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger
    n with the same gcd against 54. An unbounded conclusion from a finite table. The walk is split into 2 parts
    because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 81 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_81_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,28,55].contains ((pmod a 18 81 + pmod b 18 81) % 81)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 81, REDUCED EXPONENT 18 — part 2 of 2. For every unit a in
    [70,71,73,74,76,77,79,80] and every unit b coprime to 81, the sum of their 18-th powers never lands on the
    18-th power image [1,28,55] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 81, for EVERY exponent n reducing to 18 — that is n in [18] of the
    range walked, and every larger n with the same gcd against 54. An unbounded conclusion from a finite table.
    The walk is split into 2 parts because phi(81) = 54 puts the full 54-by-54 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 81 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_81_part2 : [70,71,73,74,76,77,79,80].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,41,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80].all (fun b => !([1,28,55].contains ((pmod a 18 81 + pmod b 18 81) % 81)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 102. The 32 residues coprime to 102 are all killed by the exponent 16 — a^16
    = 1 for every unit a — and no proper divisor of 16 kills them all (all 4 of them checked). So 16 is the
    exponent of (Z/102)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 16),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_102 : ([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => pmod a 16 102 == 1)) ∧ ([1,2,4,8].all (fun k => !([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => pmod a k 102 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 102 AND REDUCED EXPONENT 1. The 32 units raise to exactly the 32 value(s)
    [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] — every
    unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing missing,
    nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first rather
    than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_102 : ([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].contains (pmod a 1 102))) ∧ ([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun v => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].any (fun a => pmod a 1 102 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 102, REDUCED EXPONENT 1. For every unit a in
    [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] and every
    unit b coprime to 102, the sum of their 1-th powers never lands on the 1-th power image
    [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    102, for EVERY exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked,
    and every larger n with the same gcd against 16. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 102 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_102 : [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun b => !([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].contains ((pmod a 1 102 + pmod b 1 102) % 102)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 102 AND REDUCED EXPONENT 2. The 32 units raise to exactly the 8 value(s)
    [1,13,19,25,43,49,55,67] — every unit's 2-th power is in that list, and every entry of the list is some
    unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_102 : ([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,13,19,25,43,49,55,67].contains (pmod a 2 102))) ∧ ([1,13,19,25,43,49,55,67].all (fun v => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].any (fun a => pmod a 2 102 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 102, REDUCED EXPONENT 2. For every unit a in
    [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] and every
    unit b coprime to 102, the sum of their 2-th powers never lands on the 2-th power image
    [1,13,19,25,43,49,55,67] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 102, for EVERY exponent n reducing to 2 — that is n in [6,10,14,18,22]
    of the range walked, and every larger n with the same gcd against 16. An unbounded conclusion from a finite
    table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 102 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_102 : [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun b => !([1,13,19,25,43,49,55,67].contains ((pmod a 2 102 + pmod b 2 102) % 102)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 102 AND REDUCED EXPONENT 4. The 32 units raise to exactly the 4 value(s)
    [1,13,55,67] — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_102 : ([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,13,55,67].contains (pmod a 4 102))) ∧ ([1,13,55,67].all (fun v => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].any (fun a => pmod a 4 102 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 102, REDUCED EXPONENT 4. For every unit a in
    [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] and every
    unit b coprime to 102, the sum of their 4-th powers never lands on the 4-th power image [1,13,55,67] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    102, for EVERY exponent n reducing to 4 — that is n in [4,12,20] of the range walked, and every larger n
    with the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only
    — classically Case I — and infinitely many triples sharing a factor with 102 pass through untouched, which
    is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_102 : [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun b => !([1,13,55,67].contains ((pmod a 4 102 + pmod b 4 102) % 102)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 102 AND REDUCED EXPONENT 8. The 32 units raise to exactly the 2 value(s)
    [1,67] — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_8_mod_102 : ([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,67].contains (pmod a 8 102))) ∧ ([1,67].all (fun v => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].any (fun a => pmod a 8 102 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 102, REDUCED EXPONENT 8. For every unit a in
    [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] and every
    unit b coprime to 102, the sum of their 8-th powers never lands on the 8-th power image [1,67] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    102, for EVERY exponent n reducing to 8 — that is n in [8] of the range walked, and every larger n with the
    same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 102 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_102 : [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun b => !([1,67].contains ((pmod a 8 102 + pmod b 8 102) % 102)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 102 AND REDUCED EXPONENT 16. The 32 units raise to exactly the 1 value(s) [1]
    — every unit's 16-th power is in that list, and every entry of the list is some unit's 16-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_16_mod_102 : ([1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1].contains (pmod a 16 102))) ∧ ([1].all (fun v => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].any (fun a => pmod a 16 102 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 102, REDUCED EXPONENT 16. For every unit a in
    [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101] and every
    unit b coprime to 102, the sum of their 16-th powers never lands on the 16-th power image [1] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    102, for EVERY exponent n reducing to 16 — that is n in [16] of the range walked, and every larger n with
    the same gcd against 16. An unbounded conclusion from a finite table. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 102 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_16_mod_102 : [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun a => [1,5,7,11,13,19,23,25,29,31,35,37,41,43,47,49,53,55,59,61,65,67,71,73,77,79,83,89,91,95,97,101].all (fun b => !([1].contains ((pmod a 16 102 + pmod b 16 102) % 102)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 123. The 80 residues coprime to 123 are all killed by the exponent 40 — a^40
    = 1 for every unit a — and no proper divisor of 40 kills them all (all 7 of them checked). So 40 is the
    exponent of (Z/123)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 40),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_123 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => pmod a 40 123 == 1)) ∧ ([1,2,4,5,8,10,20].all (fun k => !([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => pmod a k 123 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 123),
    with all three coprime to 123, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_123 : (pmod 1 1 123 + pmod 1 1 123) % 123 = pmod 2 1 123 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 2. The 80 units raise to exactly the 20 value(s)
    [1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121] — every unit's 2-th power is in that list,
    and every entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below
    is a statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_123 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121].contains (pmod a 2 123))) ∧ ([1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 2 123 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 2 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b
    coprime to 123, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing
    to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 40. An
    unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full
    80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_123_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121].contains ((pmod a 2 123 + pmod b 2 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 2 — part 2 of 3. For every unit a in
    [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every
    unit b coprime to 123, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing
    to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 40. An
    unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full
    80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_123_part2 : [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121].contains ((pmod a 2 123 + pmod b 2 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 2 — part 3 of 3. For every unit a in
    [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the
    sum of their 2-th powers never lands on the 2-th power image
    [1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121] (pinned exactly by the theorem above). So
    x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing
    to 2 — that is n in [6,14,18,22] of the range walked, and every larger n with the same gcd against 40. An
    unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full
    80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_123_part3 : [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,43,46,49,61,64,73,91,100,103,115,118,121].contains ((pmod a 2 123 + pmod b 2 123) % 123)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 4. The 80 units raise to exactly the 10 value(s)
    [1,4,10,16,25,31,37,40,64,100] — every unit's 4-th power is in that list, and every entry of the list is
    some unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set,
    so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_123 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,4,10,16,25,31,37,40,64,100].contains (pmod a 4 123))) ∧ ([1,4,10,16,25,31,37,40,64,100].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 4 123 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 4 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b
    coprime to 123, the sum of their 4-th powers never lands on the 4-th power image
    [1,4,10,16,25,31,37,40,64,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 4 — that is n in [4,12] of the
    range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table.
    The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_123_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,64,100].contains ((pmod a 4 123 + pmod b 4 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 4 — part 2 of 3. For every unit a in
    [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every
    unit b coprime to 123, the sum of their 4-th powers never lands on the 4-th power image
    [1,4,10,16,25,31,37,40,64,100] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 4 — that is n in [4,12] of the
    range walked, and every larger n with the same gcd against 40. An unbounded conclusion from a finite table.
    The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 123 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_123_part2 : [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,64,100].contains ((pmod a 4 123 + pmod b 4 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 4 — part 3 of 3. For every unit a in
    [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the
    sum of their 4-th powers never lands on the 4-th power image [1,4,10,16,25,31,37,40,64,100] (pinned exactly
    by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for
    EVERY exponent n reducing to 4 — that is n in [4,12] of the range walked, and every larger n with the same
    gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123)
    = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_123_part3 : [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,4,10,16,25,31,37,40,64,100].contains ((pmod a 4 123 + pmod b 4 123) % 123)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 5. The 80 units raise to exactly the 16 value(s)
    [1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122] — every unit's 5-th power is in that list, and every
    entry of the list is some unit's 5-th power. Nothing missing, nothing spare. The obstruction below is a
    statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_123 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122].contains (pmod a 5 123))) ∧ ([1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 5 123 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 5 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b
    coprime to 123, the sum of their 5-th powers never lands on the 5-th power image
    [1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 5 — that is n
    in [5,15] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from
    a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past
    Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole
    walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_123_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122].contains ((pmod a 5 123 + pmod b 5 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 5 — part 2 of 3. For every unit a in
    [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every
    unit b coprime to 123, the sum of their 5-th powers never lands on the 5-th power image
    [1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 5 — that is n
    in [5,15] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from
    a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past
    Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole
    walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_123_part2 : [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122].contains ((pmod a 5 123 + pmod b 5 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 5 — part 3 of 3. For every unit a in
    [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the
    sum of their 5-th powers never lands on the 5-th power image
    [1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n reducing to 5 — that is n
    in [5,15] of the range walked, and every larger n with the same gcd against 40. An unbounded conclusion from
    a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full 80-by-80 sweep past
    Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole
    walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 123 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_123_part3 : [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,14,32,38,40,44,50,55,68,73,79,83,85,91,109,122].contains ((pmod a 5 123 + pmod b 5 123) % 123)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 8. The 80 units raise to exactly the 5 value(s)
    [1,10,16,37,100] — every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_8_mod_123 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,10,16,37,100].contains (pmod a 8 123))) ∧ ([1,10,16,37,100].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 8 123 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 8 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b
    coprime to 123, the sum of their 8-th powers never lands on the 8-th power image [1,10,16,37,100] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    123, for EVERY exponent n reducing to 8 — that is n in [8,16] of the range walked, and every larger n with
    the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because
    phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_123_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,10,16,37,100].contains ((pmod a 8 123 + pmod b 8 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 8 — part 2 of 3. For every unit a in
    [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every
    unit b coprime to 123, the sum of their 8-th powers never lands on the 8-th power image [1,10,16,37,100]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 123, for EVERY exponent n reducing to 8 — that is n in [8,16] of the range walked, and every
    larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3
    parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split
    is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_123_part2 : [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,10,16,37,100].contains ((pmod a 8 123 + pmod b 8 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 8 — part 3 of 3. For every unit a in
    [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the
    sum of their 8-th powers never lands on the 8-th power image [1,10,16,37,100] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n
    reducing to 8 — that is n in [8,16] of the range walked, and every larger n with the same gcd against 40. An
    unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full
    80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_123_part3 : [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,10,16,37,100].contains ((pmod a 8 123 + pmod b 8 123) % 123)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 10. The 80 units raise to exactly the 4 value(s)
    [1,40,73,91] — every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_123 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,40,73,91].contains (pmod a 10 123))) ∧ ([1,40,73,91].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 10 123 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 10 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b
    coprime to 123, the sum of their 10-th powers never lands on the 10-th power image [1,40,73,91] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    123, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every larger n with
    the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because
    phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_123_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40,73,91].contains ((pmod a 10 123 + pmod b 10 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 10 — part 2 of 3. For every unit a in
    [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every
    unit b coprime to 123, the sum of their 10-th powers never lands on the 10-th power image [1,40,73,91]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 123, for EVERY exponent n reducing to 10 — that is n in [10] of the range walked, and every
    larger n with the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3
    parts because phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split
    is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 123 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_123_part2 : [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40,73,91].contains ((pmod a 10 123 + pmod b 10 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 10 — part 3 of 3. For every unit a in
    [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the
    sum of their 10-th powers never lands on the 10-th power image [1,40,73,91] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n
    reducing to 10 — that is n in [10] of the range walked, and every larger n with the same gcd against 40. An
    unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full
    80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_123_part3 : [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40,73,91].contains ((pmod a 10 123 + pmod b 10 123) % 123)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 123 AND REDUCED EXPONENT 20. The 80 units raise to exactly the 2 value(s)
    [1,40] — every unit's 20-th power is in that list, and every entry of the list is some unit's 20-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_20_mod_123 : ([1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,40].contains (pmod a 20 123))) ∧ ([1,40].all (fun v => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].any (fun a => pmod a 20 123 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 20 — part 1 of 3. For every unit a in
    [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47] and every unit b
    coprime to 123, the sum of their 20-th powers never lands on the 20-th power image [1,40] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for
    EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with the same
    gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123)
    = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_123_part1 : [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40].contains ((pmod a 20 123 + pmod b 20 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 20 — part 2 of 3. For every unit a in
    [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95] and every
    unit b coprime to 123, the sum of their 20-th powers never lands on the 20-th power image [1,40] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    123, for EVERY exponent n reducing to 20 — that is n in [20] of the range walked, and every larger n with
    the same gcd against 40. An unbounded conclusion from a finite table. The walk is split into 3 parts because
    phi(123) = 80 puts the full 80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 123 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_123_part2 : [49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40].contains ((pmod a 20 123 + pmod b 20 123) % 123)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 123, REDUCED EXPONENT 20 — part 3 of 3. For every unit a in
    [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122] and every unit b coprime to 123, the
    sum of their 20-th powers never lands on the 20-th power image [1,40] (pinned exactly by the theorem above).
    So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 123, for EVERY exponent n
    reducing to 20 — that is n in [20] of the range walked, and every larger n with the same gcd against 40. An
    unbounded conclusion from a finite table. The walk is split into 3 parts because phi(123) = 80 puts the full
    80-by-80 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 123 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_20_mod_123_part3 : [97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun a => [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26,28,29,31,32,34,35,37,38,40,43,44,46,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,83,85,86,88,89,91,92,94,95,97,98,100,101,103,104,106,107,109,110,112,113,115,116,118,119,121,122].all (fun b => !([1,40].contains ((pmod a 20 123 + pmod b 20 123) % 123)))) := by decide
