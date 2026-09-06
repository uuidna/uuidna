-- lean/FermatRing9.lean — GENERATED. THE CONGRUENCE SURVEY, RING 9 OF 21 — moduli 11, 32, 53, 74, 95, 116, each carrying its unit-group exponent lambda(m), its exponent-reduction table, and one obstruction per DISTINCT reduced exponent. BLOCKING DEPENDS ON THE ORDER, NOT ON THE EXPONENT. For a finite abelian group the image of x -> x^n is G^gcd(n, exp G), so at modulus m an exponent n reaches (Z/m)* only through d = gcd(n, lambda(m)), and two exponents sharing a d are the same obstruction. Sealed per d, so nothing here is stated twice; the reduction table names which n reach which d. A blocked case says: no integers coprime to m satisfy x^n + y^n = z^n, for every n reducing to that d — an unbounded conclusion involuted through a finite table, since the direct statement cannot even be asked of by-decide. An open case exhibits a witness triple and rules nothing out. Both are sealed, so the survey carries its own denominator. WHAT IT DOES NOT REACH: the case where m shares a factor with xyz. Faithful on the coprime half (classically Case I), silent on the other, and no number of moduli exhausts it — which is why Case I fell to tables in 1823 and Fermat's Last Theorem waited for Wiles until 1995. This wing claims its own tables and nothing beyond them. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

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

/-- THE ORDER STRUCTURE AT MODULUS 11. The 10 residues coprime to 11 are all killed by the exponent 10 — a^10 =
    1 for every unit a — and no proper divisor of 10 kills them all (all 3 of them checked). So 10 is the
    exponent of (Z/11)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 10),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_11 : ([1,2,3,4,5,6,7,8,9,10].all (fun a => pmod a 10 11 == 1)) ∧ ([1,2,5].all (fun k => !([1,2,3,4,5,6,7,8,9,10].all (fun a => pmod a k 11 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 11, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 11), with
    all three coprime to 11, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,7,9,11,13,17,19,21,23] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_11 : (pmod 1 1 11 + pmod 1 1 11) % 11 = pmod 2 1 11 := by decide

/-- NO OBSTRUCTION AT MODULUS 11, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 2^2 = 4^2 (mod 11), with
    all three coprime to 11, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [4,6,8,12,14,16,18,22] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_11 : (pmod 1 2 11 + pmod 2 2 11) % 11 = pmod 4 2 11 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 11 AND REDUCED EXPONENT 5. The 10 units raise to exactly the 2 value(s) [1,10]
    — every unit's 5-th power is in that list, and every entry of the list is some unit's 5-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_5_mod_11 : ([1,2,3,4,5,6,7,8,9,10].all (fun a => [1,10].contains (pmod a 5 11))) ∧ ([1,10].all (fun v => [1,2,3,4,5,6,7,8,9,10].any (fun a => pmod a 5 11 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 11, REDUCED EXPONENT 5. For every unit a in [1,2,3,4,5,6,7,8,9,10] and every unit
    b coprime to 11, the sum of their 5-th powers never lands on the 5-th power image [1,10] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 11, for EVERY
    exponent n reducing to 5 — that is n in [5,15] of the range walked, and every larger n with the same gcd
    against 10. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case
    I — and infinitely many triples sharing a factor with 11 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_5_mod_11 : [1,2,3,4,5,6,7,8,9,10].all (fun a => [1,2,3,4,5,6,7,8,9,10].all (fun b => !([1,10].contains ((pmod a 5 11 + pmod b 5 11) % 11)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 11 AND REDUCED EXPONENT 10. The 10 units raise to exactly the 1 value(s) [1] —
    every unit's 10-th power is in that list, and every entry of the list is some unit's 10-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_10_mod_11 : ([1,2,3,4,5,6,7,8,9,10].all (fun a => [1].contains (pmod a 10 11))) ∧ ([1].all (fun v => [1,2,3,4,5,6,7,8,9,10].any (fun a => pmod a 10 11 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 11, REDUCED EXPONENT 10. For every unit a in [1,2,3,4,5,6,7,8,9,10] and every unit
    b coprime to 11, the sum of their 10-th powers never lands on the 10-th power image [1] (pinned exactly by
    the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 11, for EVERY
    exponent n reducing to 10 — that is n in [10,20] of the range walked, and every larger n with the same gcd
    against 10. An unbounded conclusion from a finite table. It settles the coprime case only — classically Case
    I — and infinitely many triples sharing a factor with 11 pass through untouched, which is why this is a
    filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_10_mod_11 : [1,2,3,4,5,6,7,8,9,10].all (fun a => [1,2,3,4,5,6,7,8,9,10].all (fun b => !([1].contains ((pmod a 10 11 + pmod b 10 11) % 11)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 32. The 16 residues coprime to 32 are all killed by the exponent 8 — a^8 = 1
    for every unit a — and no proper divisor of 8 kills them all (all 3 of them checked). So 8 is the exponent
    of (Z/32)*, the Carmichael lambda, computed here rather than looked up. This is the number every obstruction
    at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 8), which is why the
    survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_32 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun a => pmod a 8 32 == 1)) ∧ ([1,2,4].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun a => pmod a k 32 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 32 AND REDUCED EXPONENT 1. The 16 units raise to exactly the 16 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31] — every unit's 1-th power is in that list, and every entry of
    the list is some unit's 1-th power. Nothing missing, nothing spare. The obstruction below is a statement
    ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_32 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].contains (pmod a 1 32))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].any (fun a => pmod a 1 32 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 32, REDUCED EXPONENT 1. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31] and every unit b coprime to 32, the sum of their 1-th powers
    never lands on the 1-th power image [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31] (pinned exactly by the
    theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 32, for EVERY
    exponent n reducing to 1 — that is n in [3,5,7,9,11,13,15,17,19,21,23] of the range walked, and every larger
    n with the same gcd against 8. An unbounded conclusion from a finite table. It settles the coprime case only
    — classically Case I — and infinitely many triples sharing a factor with 32 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_32 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].contains ((pmod a 1 32 + pmod b 1 32) % 32)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 32 AND REDUCED EXPONENT 2. The 16 units raise to exactly the 4 value(s)
    [1,9,17,25] — every unit's 2-th power is in that list, and every entry of the list is some unit's 2-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_32 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun a => [1,9,17,25].contains (pmod a 2 32))) ∧ ([1,9,17,25].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].any (fun a => pmod a 2 32 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 32, REDUCED EXPONENT 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31] and every unit b coprime to 32, the sum of their 2-th powers
    never lands on the 2-th power image [1,9,17,25] (pinned exactly by the theorem above). So x^n + y^n = z^n
    has NO solution in integers with x, y, z all coprime to 32, for EVERY exponent n reducing to 2 — that is n
    in [6,10,14,18,22] of the range walked, and every larger n with the same gcd against 8. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 32 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_32 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun b => !([1,9,17,25].contains ((pmod a 2 32 + pmod b 2 32) % 32)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 32 AND REDUCED EXPONENT 4. The 16 units raise to exactly the 2 value(s) [1,17]
    — every unit's 4-th power is in that list, and every entry of the list is some unit's 4-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_32 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun a => [1,17].contains (pmod a 4 32))) ∧ ([1,17].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].any (fun a => pmod a 4 32 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 32, REDUCED EXPONENT 4. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31] and every unit b coprime to 32, the sum of their 4-th powers
    never lands on the 4-th power image [1,17] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 32, for EVERY exponent n reducing to 4 — that is n in
    [4,12,20] of the range walked, and every larger n with the same gcd against 8. An unbounded conclusion from
    a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 32 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_32 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun b => !([1,17].contains ((pmod a 4 32 + pmod b 4 32) % 32)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 32 AND REDUCED EXPONENT 8. The 16 units raise to exactly the 1 value(s) [1] —
    every unit's 8-th power is in that list, and every entry of the list is some unit's 8-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_8_mod_32 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun a => [1].contains (pmod a 8 32))) ∧ ([1].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].any (fun a => pmod a 8 32 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 32, REDUCED EXPONENT 8. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31] and every unit b coprime to 32, the sum of their 8-th powers
    never lands on the 8-th power image [1] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 32, for EVERY exponent n reducing to 8 — that is n in
    [8,16] of the range walked, and every larger n with the same gcd against 8. An unbounded conclusion from a
    finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a
    factor with 32 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_8_mod_32 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31].all (fun b => !([1].contains ((pmod a 8 32 + pmod b 8 32) % 32)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 53. The 52 residues coprime to 53 are all killed by the exponent 52 — a^52 =
    1 for every unit a — and no proper divisor of 52 kills them all (all 5 of them checked). So 52 is the
    exponent of (Z/53)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 52),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_53 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52].all (fun a => pmod a 52 53 == 1)) ∧ ([1,2,4,13,26].all (fun k => !([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52].all (fun a => pmod a k 53 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 53, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 53), with
    all three coprime to 53, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [3,5,7,9,11,15,17,19,21,23] of the range walked. It is sealed for the
    same reason the blocked cases are: a survey that recorded only its successes would be an argument rather
    than a census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_53 : (pmod 1 1 53 + pmod 1 1 53) % 53 = pmod 2 1 53 := by decide

/-- NO OBSTRUCTION AT MODULUS 53, REDUCED EXPONENT 2 — the control, and it fires. 1^2 + 3^2 = 13^2 (mod 53),
    with all three coprime to 53, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 2 — that is n in [6,10,14,18,22] of the range walked. It is sealed for the same reason
    the blocked cases are: a survey that recorded only its successes would be an argument rather than a census,
    and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_2_mod_53 : (pmod 1 2 53 + pmod 3 2 53) % 53 = pmod 13 2 53 := by decide

/-- NO OBSTRUCTION AT MODULUS 53, REDUCED EXPONENT 4 — the control, and it fires. 1^4 + 8^4 = 2^4 (mod 53), with
    all three coprime to 53, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 4 — that is n in [4,8,12,16,20] of the range walked. It is sealed for the same reason
    the blocked cases are: a survey that recorded only its successes would be an argument rather than a census,
    and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_4_mod_53 : (pmod 1 4 53 + pmod 8 4 53) % 53 = pmod 2 4 53 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 53 AND REDUCED EXPONENT 13. The 52 units raise to exactly the 4 value(s)
    [1,23,30,52] — every unit's 13-th power is in that list, and every entry of the list is some unit's 13-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_13_mod_53 : ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52].all (fun a => [1,23,30,52].contains (pmod a 13 53))) ∧ ([1,23,30,52].all (fun v => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52].any (fun a => pmod a 13 53 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 53, REDUCED EXPONENT 13 — part 1 of 2. For every unit a in
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48]
    and every unit b coprime to 53, the sum of their 13-th powers never lands on the 13-th power image
    [1,23,30,52] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x,
    y, z all coprime to 53, for EVERY exponent n reducing to 13 — that is n in [13] of the range walked, and
    every larger n with the same gcd against 52. An unbounded conclusion from a finite table. The walk is split
    into 2 parts because phi(53) = 52 puts the full 52-by-52 sweep past Lean's default elaboration budget; the
    split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 53 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_13_mod_53_part1 : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52].all (fun b => !([1,23,30,52].contains ((pmod a 13 53 + pmod b 13 53) % 53)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 53, REDUCED EXPONENT 13 — part 2 of 2. For every unit a in [49,50,51,52] and every
    unit b coprime to 53, the sum of their 13-th powers never lands on the 13-th power image [1,23,30,52]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 53, for EVERY exponent n reducing to 13 — that is n in [13] of the range walked, and every larger
    n with the same gcd against 52. An unbounded conclusion from a finite table. The walk is split into 2 parts
    because phi(53) = 52 puts the full 52-by-52 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 53 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_13_mod_53_part2 : [49,50,51,52].all (fun a => [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52].all (fun b => !([1,23,30,52].contains ((pmod a 13 53 + pmod b 13 53) % 53)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 74. The 36 residues coprime to 74 are all killed by the exponent 36 — a^36 =
    1 for every unit a — and no proper divisor of 36 kills them all (all 8 of them checked). So 36 is the
    exponent of (Z/74)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 36),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_74 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => pmod a 36 74 == 1)) ∧ ([1,2,3,4,6,9,12,18].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => pmod a k 74 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 74 AND REDUCED EXPONENT 1. The 36 units raise to exactly the 36 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73] —
    every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_74 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].contains (pmod a 1 74))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].any (fun a => pmod a 1 74 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 74, REDUCED EXPONENT 1. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73] and
    every unit b coprime to 74, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 74, for EVERY exponent n reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked,
    and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 74 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_74 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].contains ((pmod a 1 74 + pmod b 1 74) % 74)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 74 AND REDUCED EXPONENT 2. The 36 units raise to exactly the 18 value(s)
    [1,3,7,9,11,21,25,27,33,41,47,49,53,63,65,67,71,73] — every unit's 2-th power is in that list, and every
    entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a
    statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_74 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,3,7,9,11,21,25,27,33,41,47,49,53,63,65,67,71,73].contains (pmod a 2 74))) ∧ ([1,3,7,9,11,21,25,27,33,41,47,49,53,63,65,67,71,73].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].any (fun a => pmod a 2 74 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 74, REDUCED EXPONENT 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73] and
    every unit b coprime to 74, the sum of their 2-th powers never lands on the 2-th power image
    [1,3,7,9,11,21,25,27,33,41,47,49,53,63,65,67,71,73] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 74, for EVERY exponent n reducing to 2 — that is
    n in [10,14,22] of the range walked, and every larger n with the same gcd against 36. An unbounded
    conclusion from a finite table. It settles the coprime case only — classically Case I — and infinitely many
    triples sharing a factor with 74 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_74 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun b => !([1,3,7,9,11,21,25,27,33,41,47,49,53,63,65,67,71,73].contains ((pmod a 2 74 + pmod b 2 74) % 74)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 74 AND REDUCED EXPONENT 3. The 36 units raise to exactly the 12 value(s)
    [1,11,23,27,29,31,43,45,47,51,63,73] — every unit's 3-th power is in that list, and every entry of the list
    is some unit's 3-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this
    set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_3_mod_74 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,11,23,27,29,31,43,45,47,51,63,73].contains (pmod a 3 74))) ∧ ([1,11,23,27,29,31,43,45,47,51,63,73].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].any (fun a => pmod a 3 74 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 74, REDUCED EXPONENT 3. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73] and
    every unit b coprime to 74, the sum of their 3-th powers never lands on the 3-th power image
    [1,11,23,27,29,31,43,45,47,51,63,73] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 74, for EVERY exponent n reducing to 3 — that is n in
    [3,15,21] of the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from
    a finite table. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 74 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_3_mod_74 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun b => !([1,11,23,27,29,31,43,45,47,51,63,73].contains ((pmod a 3 74 + pmod b 3 74) % 74)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 74 AND REDUCED EXPONENT 4. The 36 units raise to exactly the 9 value(s)
    [1,7,9,33,47,49,53,63,71] — every unit's 4-th power is in that list, and every entry of the list is some
    unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_74 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,7,9,33,47,49,53,63,71].contains (pmod a 4 74))) ∧ ([1,7,9,33,47,49,53,63,71].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].any (fun a => pmod a 4 74 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 74, REDUCED EXPONENT 4. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73] and
    every unit b coprime to 74, the sum of their 4-th powers never lands on the 4-th power image
    [1,7,9,33,47,49,53,63,71] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 74, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of
    the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite
    table. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 74 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_74 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun b => !([1,7,9,33,47,49,53,63,71].contains ((pmod a 4 74 + pmod b 4 74) % 74)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 74 AND REDUCED EXPONENT 6. The 36 units raise to exactly the 6 value(s)
    [1,11,27,47,63,73] — every unit's 6-th power is in that list, and every entry of the list is some unit's
    6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_74 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,11,27,47,63,73].contains (pmod a 6 74))) ∧ ([1,11,27,47,63,73].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].any (fun a => pmod a 6 74 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 74, REDUCED EXPONENT 6. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73] and
    every unit b coprime to 74, the sum of their 6-th powers never lands on the 6-th power image
    [1,11,27,47,63,73] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 74, for EVERY exponent n reducing to 6 — that is n in [6] of the range walked,
    and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. It settles the
    coprime case only — classically Case I — and infinitely many triples sharing a factor with 74 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_74 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun b => !([1,11,27,47,63,73].contains ((pmod a 6 74 + pmod b 6 74) % 74)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 74 AND REDUCED EXPONENT 9. The 36 units raise to exactly the 4 value(s)
    [1,31,43,73] — every unit's 9-th power is in that list, and every entry of the list is some unit's 9-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_9_mod_74 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,31,43,73].contains (pmod a 9 74))) ∧ ([1,31,43,73].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].any (fun a => pmod a 9 74 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 74, REDUCED EXPONENT 9. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73] and
    every unit b coprime to 74, the sum of their 9-th powers never lands on the 9-th power image [1,31,43,73]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 74, for EVERY exponent n reducing to 9 — that is n in [9] of the range walked, and every larger n
    with the same gcd against 36. An unbounded conclusion from a finite table. It settles the coprime case only
    — classically Case I — and infinitely many triples sharing a factor with 74 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_74 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun b => !([1,31,43,73].contains ((pmod a 9 74 + pmod b 9 74) % 74)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 74 AND REDUCED EXPONENT 12. The 36 units raise to exactly the 3 value(s)
    [1,47,63] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_12_mod_74 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,47,63].contains (pmod a 12 74))) ∧ ([1,47,63].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].any (fun a => pmod a 12 74 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 74, REDUCED EXPONENT 12. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73] and
    every unit b coprime to 74, the sum of their 12-th powers never lands on the 12-th power image [1,47,63]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 74, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger
    n with the same gcd against 36. An unbounded conclusion from a finite table. It settles the coprime case
    only — classically Case I — and infinitely many triples sharing a factor with 74 pass through untouched,
    which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_74 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun b => !([1,47,63].contains ((pmod a 12 74 + pmod b 12 74) % 74)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 74 AND REDUCED EXPONENT 18. The 36 units raise to exactly the 2 value(s)
    [1,73] — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_18_mod_74 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,73].contains (pmod a 18 74))) ∧ ([1,73].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].any (fun a => pmod a 18 74 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 74, REDUCED EXPONENT 18. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73] and
    every unit b coprime to 74, the sum of their 18-th powers never lands on the 18-th power image [1,73]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 74, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger
    n with the same gcd against 36. An unbounded conclusion from a finite table. It settles the coprime case
    only — classically Case I — and infinitely many triples sharing a factor with 74 pass through untouched,
    which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_74 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73].all (fun b => !([1,73].contains ((pmod a 18 74 + pmod b 18 74) % 74)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 95. The 72 residues coprime to 95 are all killed by the exponent 36 — a^36 =
    1 for every unit a — and no proper divisor of 36 kills them all (all 8 of them checked). So 36 is the
    exponent of (Z/95)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 36),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_95 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun a => pmod a 36 95 == 1)) ∧ ([1,2,3,4,6,9,12,18].all (fun k => !([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun a => pmod a k 95 == 1)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 1 — the control, and it fires. 1^1 + 1^1 = 2^1 (mod 95), with
    all three coprime to 95, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 1 — that is n in [5,7,11,13,17,19,23] of the range walked. It is sealed for the same
    reason the blocked cases are: a survey that recorded only its successes would be an argument rather than a
    census, and the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_1_mod_95 : (pmod 1 1 95 + pmod 1 1 95) % 95 = pmod 2 1 95 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 95 AND REDUCED EXPONENT 2. The 72 units raise to exactly the 18 value(s)
    [1,4,6,9,11,16,24,26,36,39,44,49,54,61,64,66,74,81] — every unit's 2-th power is in that list, and every
    entry of the list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a
    statement ABOUT this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_95 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun a => [1,4,6,9,11,16,24,26,36,39,44,49,54,61,64,66,74,81].contains (pmod a 2 95))) ∧ ([1,4,6,9,11,16,24,26,36,39,44,49,54,61,64,66,74,81].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].any (fun a => pmod a 2 95 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 2 — part 1 of 3. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44] and every
    unit b coprime to 95, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,6,9,11,16,24,26,36,39,44,49,54,61,64,66,74,81] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 95, for EVERY exponent n reducing to 2 — that is
    n in [10,14,22] of the range walked, and every larger n with the same gcd against 36. An unbounded
    conclusion from a finite table. The walk is split into 3 parts because phi(95) = 72 puts the full 72-by-72
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 95 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_95_part1 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,4,6,9,11,16,24,26,36,39,44,49,54,61,64,66,74,81].contains ((pmod a 2 95 + pmod b 2 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 2 — part 2 of 3. For every unit a in
    [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89] and
    every unit b coprime to 95, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,6,9,11,16,24,26,36,39,44,49,54,61,64,66,74,81] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 95, for EVERY exponent n reducing to 2 — that is
    n in [10,14,22] of the range walked, and every larger n with the same gcd against 36. An unbounded
    conclusion from a finite table. The walk is split into 3 parts because phi(95) = 72 puts the full 72-by-72
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 95 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_95_part2 : [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,4,6,9,11,16,24,26,36,39,44,49,54,61,64,66,74,81].contains ((pmod a 2 95 + pmod b 2 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 2 — part 3 of 3. For every unit a in [91,92,93,94] and every
    unit b coprime to 95, the sum of their 2-th powers never lands on the 2-th power image
    [1,4,6,9,11,16,24,26,36,39,44,49,54,61,64,66,74,81] (pinned exactly by the theorem above). So x^n + y^n =
    z^n has NO solution in integers with x, y, z all coprime to 95, for EVERY exponent n reducing to 2 — that is
    n in [10,14,22] of the range walked, and every larger n with the same gcd against 36. An unbounded
    conclusion from a finite table. The walk is split into 3 parts because phi(95) = 72 puts the full 72-by-72
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 95 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_95_part3 : [91,92,93,94].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,4,6,9,11,16,24,26,36,39,44,49,54,61,64,66,74,81].contains ((pmod a 2 95 + pmod b 2 95) % 95)))) := by decide

/-- NO OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 3 — the control, and it fires. 1^3 + 6^3 = 3^3 (mod 95), with
    all three coprime to 95, so this modulus admits a solution-shaped triple and rules nothing out for any
    exponent reducing to 3 — that is n in [3,15,21] of the range walked. It is sealed for the same reason the
    blocked cases are: a survey that recorded only its successes would be an argument rather than a census, and
    the blocked results are only readable against the ones that failed. -/
theorem coprime_sum_open_reduced_3_mod_95 : (pmod 1 3 95 + pmod 6 3 95) % 95 = pmod 3 3 95 := by decide

/-- THE IMAGE, PINNED, AT MODULUS 95 AND REDUCED EXPONENT 4. The 72 units raise to exactly the 9 value(s)
    [1,6,11,16,26,36,61,66,81] — every unit's 4-th power is in that list, and every entry of the list is some
    unit's 4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_95 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun a => [1,6,11,16,26,36,61,66,81].contains (pmod a 4 95))) ∧ ([1,6,11,16,26,36,61,66,81].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].any (fun a => pmod a 4 95 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 4 — part 1 of 3. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44] and every
    unit b coprime to 95, the sum of their 4-th powers never lands on the 4-th power image
    [1,6,11,16,26,36,61,66,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 95, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of
    the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite
    table. The walk is split into 3 parts because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 95 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_95_part1 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,6,11,16,26,36,61,66,81].contains ((pmod a 4 95 + pmod b 4 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 4 — part 2 of 3. For every unit a in
    [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89] and
    every unit b coprime to 95, the sum of their 4-th powers never lands on the 4-th power image
    [1,6,11,16,26,36,61,66,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 95, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of
    the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite
    table. The walk is split into 3 parts because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 95 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_95_part2 : [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,6,11,16,26,36,61,66,81].contains ((pmod a 4 95 + pmod b 4 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 4 — part 3 of 3. For every unit a in [91,92,93,94] and every
    unit b coprime to 95, the sum of their 4-th powers never lands on the 4-th power image
    [1,6,11,16,26,36,61,66,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 95, for EVERY exponent n reducing to 4 — that is n in [4,8,16,20] of
    the range walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite
    table. The walk is split into 3 parts because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 95 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_95_part3 : [91,92,93,94].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,6,11,16,26,36,61,66,81].contains ((pmod a 4 95 + pmod b 4 95) % 95)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 95 AND REDUCED EXPONENT 6. The 72 units raise to exactly the 6 value(s)
    [1,11,26,39,49,64] — every unit's 6-th power is in that list, and every entry of the list is some unit's
    6-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_6_mod_95 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun a => [1,11,26,39,49,64].contains (pmod a 6 95))) ∧ ([1,11,26,39,49,64].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].any (fun a => pmod a 6 95 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 6 — part 1 of 3. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44] and every
    unit b coprime to 95, the sum of their 6-th powers never lands on the 6-th power image [1,11,26,39,49,64]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 95, for EVERY exponent n reducing to 6 — that is n in [6] of the range walked, and every larger n
    with the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts
    because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 95 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_95_part1 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,11,26,39,49,64].contains ((pmod a 6 95 + pmod b 6 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 6 — part 2 of 3. For every unit a in
    [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89] and
    every unit b coprime to 95, the sum of their 6-th powers never lands on the 6-th power image
    [1,11,26,39,49,64] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 95, for EVERY exponent n reducing to 6 — that is n in [6] of the range walked,
    and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. The walk is
    split into 3 parts because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget;
    the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles
    the coprime case only — classically Case I — and infinitely many triples sharing a factor with 95 pass
    through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_95_part2 : [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,11,26,39,49,64].contains ((pmod a 6 95 + pmod b 6 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 6 — part 3 of 3. For every unit a in [91,92,93,94] and every
    unit b coprime to 95, the sum of their 6-th powers never lands on the 6-th power image [1,11,26,39,49,64]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 95, for EVERY exponent n reducing to 6 — that is n in [6] of the range walked, and every larger n
    with the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts
    because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 95 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_6_mod_95_part3 : [91,92,93,94].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,11,26,39,49,64].contains ((pmod a 6 95 + pmod b 6 95) % 95)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 95 AND REDUCED EXPONENT 9. The 72 units raise to exactly the 8 value(s)
    [1,18,37,39,56,58,77,94] — every unit's 9-th power is in that list, and every entry of the list is some
    unit's 9-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_9_mod_95 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun a => [1,18,37,39,56,58,77,94].contains (pmod a 9 95))) ∧ ([1,18,37,39,56,58,77,94].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].any (fun a => pmod a 9 95 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 9 — part 1 of 3. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44] and every
    unit b coprime to 95, the sum of their 9-th powers never lands on the 9-th power image
    [1,18,37,39,56,58,77,94] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 95, for EVERY exponent n reducing to 9 — that is n in [9] of the range
    walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. The
    walk is split into 3 parts because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 95
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_95_part1 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,18,37,39,56,58,77,94].contains ((pmod a 9 95 + pmod b 9 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 9 — part 2 of 3. For every unit a in
    [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89] and
    every unit b coprime to 95, the sum of their 9-th powers never lands on the 9-th power image
    [1,18,37,39,56,58,77,94] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 95, for EVERY exponent n reducing to 9 — that is n in [9] of the range
    walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. The
    walk is split into 3 parts because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 95
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_95_part2 : [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,18,37,39,56,58,77,94].contains ((pmod a 9 95 + pmod b 9 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 9 — part 3 of 3. For every unit a in [91,92,93,94] and every
    unit b coprime to 95, the sum of their 9-th powers never lands on the 9-th power image
    [1,18,37,39,56,58,77,94] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 95, for EVERY exponent n reducing to 9 — that is n in [9] of the range
    walked, and every larger n with the same gcd against 36. An unbounded conclusion from a finite table. The
    walk is split into 3 parts because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration
    budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the units. It
    settles the coprime case only — classically Case I — and infinitely many triples sharing a factor with 95
    pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_9_mod_95_part3 : [91,92,93,94].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,18,37,39,56,58,77,94].contains ((pmod a 9 95 + pmod b 9 95) % 95)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 95 AND REDUCED EXPONENT 12. The 72 units raise to exactly the 3 value(s)
    [1,11,26] — every unit's 12-th power is in that list, and every entry of the list is some unit's 12-th
    power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_12_mod_95 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun a => [1,11,26].contains (pmod a 12 95))) ∧ ([1,11,26].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].any (fun a => pmod a 12 95 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 12 — part 1 of 3. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44] and every
    unit b coprime to 95, the sum of their 12-th powers never lands on the 12-th power image [1,11,26] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    95, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the
    same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts because
    phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 95 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_95_part1 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,11,26].contains ((pmod a 12 95 + pmod b 12 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 12 — part 2 of 3. For every unit a in
    [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89] and
    every unit b coprime to 95, the sum of their 12-th powers never lands on the 12-th power image [1,11,26]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 95, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger
    n with the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts
    because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 95 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_95_part2 : [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,11,26].contains ((pmod a 12 95 + pmod b 12 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 12 — part 3 of 3. For every unit a in [91,92,93,94] and every
    unit b coprime to 95, the sum of their 12-th powers never lands on the 12-th power image [1,11,26] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    95, for EVERY exponent n reducing to 12 — that is n in [12] of the range walked, and every larger n with the
    same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts because
    phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 95 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_12_mod_95_part3 : [91,92,93,94].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,11,26].contains ((pmod a 12 95 + pmod b 12 95) % 95)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 95 AND REDUCED EXPONENT 18. The 72 units raise to exactly the 2 value(s)
    [1,39] — every unit's 18-th power is in that list, and every entry of the list is some unit's 18-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_18_mod_95 : ([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun a => [1,39].contains (pmod a 18 95))) ∧ ([1,39].all (fun v => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].any (fun a => pmod a 18 95 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 18 — part 1 of 3. For every unit a in
    [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44] and every
    unit b coprime to 95, the sum of their 18-th powers never lands on the 18-th power image [1,39] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    95, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the
    same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts because
    phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 95 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_95_part1 : [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,39].contains ((pmod a 18 95 + pmod b 18 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 18 — part 2 of 3. For every unit a in
    [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89] and
    every unit b coprime to 95, the sum of their 18-th powers never lands on the 18-th power image [1,39]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 95, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger
    n with the same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts
    because phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is
    arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 95 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_95_part2 : [46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,39].contains ((pmod a 18 95 + pmod b 18 95) % 95)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 95, REDUCED EXPONENT 18 — part 3 of 3. For every unit a in [91,92,93,94] and every
    unit b coprime to 95, the sum of their 18-th powers never lands on the 18-th power image [1,39] (pinned
    exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to
    95, for EVERY exponent n reducing to 18 — that is n in [18] of the range walked, and every larger n with the
    same gcd against 36. An unbounded conclusion from a finite table. The walk is split into 3 parts because
    phi(95) = 72 puts the full 72-by-72 sweep past Lean's default elaboration budget; the split is arithmetic
    bookkeeping, and the parts together are the whole walk over the units. It settles the coprime case only —
    classically Case I — and infinitely many triples sharing a factor with 95 pass through untouched, which is
    why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_18_mod_95_part3 : [91,92,93,94].all (fun a => [1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,21,22,23,24,26,27,28,29,31,32,33,34,36,37,39,41,42,43,44,46,47,48,49,51,52,53,54,56,58,59,61,62,63,64,66,67,68,69,71,72,73,74,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94].all (fun b => !([1,39].contains ((pmod a 18 95 + pmod b 18 95) % 95)))) := by decide

/-- THE ORDER STRUCTURE AT MODULUS 116. The 56 residues coprime to 116 are all killed by the exponent 28 — a^28
    = 1 for every unit a — and no proper divisor of 28 kills them all (all 5 of them checked). So 28 is the
    exponent of (Z/116)*, the Carmichael lambda, computed here rather than looked up. This is the number every
    obstruction at this modulus actually turns on: an exponent n reaches the group only through gcd(n, 28),
    which is why the survey below is indexed by that and not by n. -/
theorem unit_group_exponent_mod_116 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => pmod a 28 116 == 1)) ∧ ([1,2,4,7,14].all (fun k => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => pmod a k 116 == 1)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 116 AND REDUCED EXPONENT 1. The 56 units raise to exactly the 56 value(s)
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115]
    — every unit's 1-th power is in that list, and every entry of the list is some unit's 1-th power. Nothing
    missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is established first
    rather than asserted inside it. -/
theorem power_image_exact_reduced_1_mod_116 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].contains (pmod a 1 116))) ∧ ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].any (fun a => pmod a 1 116 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 116, REDUCED EXPONENT 1 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91]
    and every unit b coprime to 116, the sum of their 1-th powers never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 116, for EVERY exponent n reducing to 1 — that is n in [3,5,9,11,13,15,17,19,23] of the range
    walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table. The
    walk is split into 2 parts because phi(116) = 56 puts the full 56-by-56 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 116 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_116_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].contains ((pmod a 1 116 + pmod b 1 116) % 116)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 116, REDUCED EXPONENT 1 — part 2 of 2. For every unit a in
    [93,95,97,99,101,103,105,107,109,111,113,115] and every unit b coprime to 116, the sum of their 1-th powers
    never lands on the 1-th power image
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 116, for EVERY exponent n reducing to 1 — that is n in [3,5,9,11,13,15,17,19,23] of the range
    walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table. The
    walk is split into 2 parts because phi(116) = 56 puts the full 56-by-56 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 116 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_1_mod_116_part2 : [93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun b => !([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].contains ((pmod a 1 116 + pmod b 1 116) % 116)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 116 AND REDUCED EXPONENT 2. The 56 units raise to exactly the 14 value(s)
    [1,5,9,13,25,33,45,49,53,57,65,81,93,109] — every unit's 2-th power is in that list, and every entry of the
    list is some unit's 2-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT
    this set, so the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_2_mod_116 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => [1,5,9,13,25,33,45,49,53,57,65,81,93,109].contains (pmod a 2 116))) ∧ ([1,5,9,13,25,33,45,49,53,57,65,81,93,109].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].any (fun a => pmod a 2 116 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 116, REDUCED EXPONENT 2 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91]
    and every unit b coprime to 116, the sum of their 2-th powers never lands on the 2-th power image
    [1,5,9,13,25,33,45,49,53,57,65,81,93,109] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 116, for EVERY exponent n reducing to 2 — that is n in
    [6,10,18,22] of the range walked, and every larger n with the same gcd against 28. An unbounded conclusion
    from a finite table. The walk is split into 2 parts because phi(116) = 56 puts the full 56-by-56 sweep past
    Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole
    walk over the units. It settles the coprime case only — classically Case I — and infinitely many triples
    sharing a factor with 116 pass through untouched, which is why this is a filter and never a proof of
    Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_116_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun b => !([1,5,9,13,25,33,45,49,53,57,65,81,93,109].contains ((pmod a 2 116 + pmod b 2 116) % 116)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 116, REDUCED EXPONENT 2 — part 2 of 2. For every unit a in
    [93,95,97,99,101,103,105,107,109,111,113,115] and every unit b coprime to 116, the sum of their 2-th powers
    never lands on the 2-th power image [1,5,9,13,25,33,45,49,53,57,65,81,93,109] (pinned exactly by the theorem
    above). So x^n + y^n = z^n has NO solution in integers with x, y, z all coprime to 116, for EVERY exponent n
    reducing to 2 — that is n in [6,10,18,22] of the range walked, and every larger n with the same gcd against
    28. An unbounded conclusion from a finite table. The walk is split into 2 parts because phi(116) = 56 puts
    the full 56-by-56 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the
    parts together are the whole walk over the units. It settles the coprime case only — classically Case I —
    and infinitely many triples sharing a factor with 116 pass through untouched, which is why this is a filter
    and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_2_mod_116_part2 : [93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun b => !([1,5,9,13,25,33,45,49,53,57,65,81,93,109].contains ((pmod a 2 116 + pmod b 2 116) % 116)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 116 AND REDUCED EXPONENT 4. The 56 units raise to exactly the 7 value(s)
    [1,25,45,49,53,65,81] — every unit's 4-th power is in that list, and every entry of the list is some unit's
    4-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set
    is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_4_mod_116 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => [1,25,45,49,53,65,81].contains (pmod a 4 116))) ∧ ([1,25,45,49,53,65,81].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].any (fun a => pmod a 4 116 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 116, REDUCED EXPONENT 4 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91]
    and every unit b coprime to 116, the sum of their 4-th powers never lands on the 4-th power image
    [1,25,45,49,53,65,81] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers
    with x, y, z all coprime to 116, for EVERY exponent n reducing to 4 — that is n in [4,8,12,16,20] of the
    range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table.
    The walk is split into 2 parts because phi(116) = 56 puts the full 56-by-56 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 116 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_116_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun b => !([1,25,45,49,53,65,81].contains ((pmod a 4 116 + pmod b 4 116) % 116)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 116, REDUCED EXPONENT 4 — part 2 of 2. For every unit a in
    [93,95,97,99,101,103,105,107,109,111,113,115] and every unit b coprime to 116, the sum of their 4-th powers
    never lands on the 4-th power image [1,25,45,49,53,65,81] (pinned exactly by the theorem above). So x^n +
    y^n = z^n has NO solution in integers with x, y, z all coprime to 116, for EVERY exponent n reducing to 4 —
    that is n in [4,8,12,16,20] of the range walked, and every larger n with the same gcd against 28. An
    unbounded conclusion from a finite table. The walk is split into 2 parts because phi(116) = 56 puts the full
    56-by-56 sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts
    together are the whole walk over the units. It settles the coprime case only — classically Case I — and
    infinitely many triples sharing a factor with 116 pass through untouched, which is why this is a filter and
    never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_4_mod_116_part2 : [93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun b => !([1,25,45,49,53,65,81].contains ((pmod a 4 116 + pmod b 4 116) % 116)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 116 AND REDUCED EXPONENT 7. The 56 units raise to exactly the 8 value(s)
    [1,17,41,57,59,75,99,115] — every unit's 7-th power is in that list, and every entry of the list is some
    unit's 7-th power. Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so
    the set is established first rather than asserted inside it. -/
theorem power_image_exact_reduced_7_mod_116 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => [1,17,41,57,59,75,99,115].contains (pmod a 7 116))) ∧ ([1,17,41,57,59,75,99,115].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].any (fun a => pmod a 7 116 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 116, REDUCED EXPONENT 7 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91]
    and every unit b coprime to 116, the sum of their 7-th powers never lands on the 7-th power image
    [1,17,41,57,59,75,99,115] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in
    integers with x, y, z all coprime to 116, for EVERY exponent n reducing to 7 — that is n in [7,21] of the
    range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a finite table.
    The walk is split into 2 parts because phi(116) = 56 puts the full 56-by-56 sweep past Lean's default
    elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk over the
    units. It settles the coprime case only — classically Case I — and infinitely many triples sharing a factor
    with 116 pass through untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_116_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun b => !([1,17,41,57,59,75,99,115].contains ((pmod a 7 116 + pmod b 7 116) % 116)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 116, REDUCED EXPONENT 7 — part 2 of 2. For every unit a in
    [93,95,97,99,101,103,105,107,109,111,113,115] and every unit b coprime to 116, the sum of their 7-th powers
    never lands on the 7-th power image [1,17,41,57,59,75,99,115] (pinned exactly by the theorem above). So x^n
    + y^n = z^n has NO solution in integers with x, y, z all coprime to 116, for EVERY exponent n reducing to 7
    — that is n in [7,21] of the range walked, and every larger n with the same gcd against 28. An unbounded
    conclusion from a finite table. The walk is split into 2 parts because phi(116) = 56 puts the full 56-by-56
    sweep past Lean's default elaboration budget; the split is arithmetic bookkeeping, and the parts together
    are the whole walk over the units. It settles the coprime case only — classically Case I — and infinitely
    many triples sharing a factor with 116 pass through untouched, which is why this is a filter and never a
    proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_7_mod_116_part2 : [93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun b => !([1,17,41,57,59,75,99,115].contains ((pmod a 7 116 + pmod b 7 116) % 116)))) := by decide

/-- THE IMAGE, PINNED, AT MODULUS 116 AND REDUCED EXPONENT 14. The 56 units raise to exactly the 2 value(s)
    [1,57] — every unit's 14-th power is in that list, and every entry of the list is some unit's 14-th power.
    Nothing missing, nothing spare. The obstruction below is a statement ABOUT this set, so the set is
    established first rather than asserted inside it. -/
theorem power_image_exact_reduced_14_mod_116 : ([1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => [1,57].contains (pmod a 14 116))) ∧ ([1,57].all (fun v => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].any (fun a => pmod a 14 116 == v))) := by decide

/-- AN OBSTRUCTION AT MODULUS 116, REDUCED EXPONENT 14 — part 1 of 2. For every unit a in
    [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91]
    and every unit b coprime to 116, the sum of their 14-th powers never lands on the 14-th power image [1,57]
    (pinned exactly by the theorem above). So x^n + y^n = z^n has NO solution in integers with x, y, z all
    coprime to 116, for EVERY exponent n reducing to 14 — that is n in [14] of the range walked, and every
    larger n with the same gcd against 28. An unbounded conclusion from a finite table. The walk is split into 2
    parts because phi(116) = 56 puts the full 56-by-56 sweep past Lean's default elaboration budget; the split
    is arithmetic bookkeeping, and the parts together are the whole walk over the units. It settles the coprime
    case only — classically Case I — and infinitely many triples sharing a factor with 116 pass through
    untouched, which is why this is a filter and never a proof of Fermat's Last Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_116_part1 : [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun b => !([1,57].contains ((pmod a 14 116 + pmod b 14 116) % 116)))) := by decide

/-- AN OBSTRUCTION AT MODULUS 116, REDUCED EXPONENT 14 — part 2 of 2. For every unit a in
    [93,95,97,99,101,103,105,107,109,111,113,115] and every unit b coprime to 116, the sum of their 14-th powers
    never lands on the 14-th power image [1,57] (pinned exactly by the theorem above). So x^n + y^n = z^n has NO
    solution in integers with x, y, z all coprime to 116, for EVERY exponent n reducing to 14 — that is n in
    [14] of the range walked, and every larger n with the same gcd against 28. An unbounded conclusion from a
    finite table. The walk is split into 2 parts because phi(116) = 56 puts the full 56-by-56 sweep past Lean's
    default elaboration budget; the split is arithmetic bookkeeping, and the parts together are the whole walk
    over the units. It settles the coprime case only — classically Case I — and infinitely many triples sharing
    a factor with 116 pass through untouched, which is why this is a filter and never a proof of Fermat's Last
    Theorem. -/
theorem coprime_sum_blocked_reduced_14_mod_116_part2 : [93,95,97,99,101,103,105,107,109,111,113,115].all (fun a => [1,3,5,7,9,11,13,15,17,19,21,23,25,27,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,89,91,93,95,97,99,101,103,105,107,109,111,113,115].all (fun b => !([1,57].contains ((pmod a 14 116 + pmod b 14 116) % 116)))) := by decide
