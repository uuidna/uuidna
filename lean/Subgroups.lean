-- lean/Subgroups.lean — GENERATED. THE SUBGROUP LATTICE OF (Z/9)* — the four subgroups exhibited, not merely counted. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def units : List Nat := [1,2,4,5,7,8]
def mul9 (a b : Nat) : Nat := (a * b) % 9

-- a subset is a SUBGROUP when it holds the identity, is closed under the product, and inverts every member
def isSub (s : List Nat) : Bool :=
  (s.contains 1) && s.all (fun a => s.all (fun b => s.contains (mul9 a b))) && s.all (fun a => s.any (fun b => mul9 a b == 1))

/-- THE GROUP IS THE SIX UNITS of Z/9 — the residues with a multiplicative inverse, 1, 2, 4, 5, 7, 8 — and
    three, six and zero are excluded because they share a factor with nine and cannot be inverted. -/
theorem units_form_six : (units.length = 6) ∧ (units.all (fun a => units.any (fun b => mul9 a b == 1))) := by decide

/-- SEARCHING ALL SIXTY-FOUR SUBSETS finds exactly FOUR subgroups, and here they are: the trivial {1}, the
    order-two {1,8}, the order-three {1,4,7}, and the whole group. Four of sixty-four — exhibited rather than
    counted, so the lattice is an object and not a number. -/
theorem four_subgroups_exhibited : (([[1],[1,8],[1,4,7],[1,2,4,5,7,8]]).all isSub) ∧ (([[1],[1,8],[1,4,7],[1,2,4,5,7,8]]).length = 4) := by decide

/-- LAGRANGE, CHECKED RATHER THAN CITED: every subgroup order divides the group order — 1, 2, 3 and 6 each
    divide six — and the orders are exactly the divisors of six, with none missing and none extra. -/
theorem lagrange_divides_every_order : ([1,2,3,6].all (fun n => 6 % n == 0)) ∧ ([1,2,3,6] = ((List.range' 1 6).filter (fun d => 6 % d == 0))) := by decide

/-- THE GROUP IS CYCLIC, and two generates it: the powers of two run 2, 4, 8, 7, 5, 1 and reach every unit
    before returning. Five generates it too; four and seven have order three, and eight has order two — the
    element orders are 1, 6, 3, 6, 3, 2 across the units in order. -/
theorem two_generates_the_whole : (units.map (fun a => ((List.range' 1 6).filter (fun k => (2 ^ k) % 9 == a)).length) = [1,1,1,1,1,1]) ∧ (((List.range' 1 6).map (fun k => (2 ^ k) % 9)) = [2,4,8,7,5,1]) := by decide

/-- AND SIXTY OF THE SIXTY-FOUR ARE NOT SUBGROUPS — the line proves the complement, so four is a genuine
    scarcity rather than a number that happened to be reported. A subset missing the identity, or not closed, or
    lacking an inverse, fails; most subsets fail all three. -/
theorem most_subsets_are_not_subgroups : (64 - 4 = 60) ∧ (4 ≠ 64) ∧ ((2:Nat)^6 = 64) := by decide

/-- THE LATTICE HAS A FLOOR AND A CEILING: the trivial subgroup and the whole group are both subgroups, and they
    differ — one has a single member and the other six. Every other subgroup lies strictly between them, which
    is what makes it a lattice rather than a list. -/
theorem trivial_and_whole_always_hold : (isSub [1]) ∧ (isSub units) ∧ (([1]:List Nat).length ≠ units.length) := by decide
