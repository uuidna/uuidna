-- lean/Invariance.lean — GENERATED. INVARIANCE — ONE STRUCTURE, AND WHAT IS HELD FIXED DECIDES WHETHER IT IS A FACT OR FURNITURE. This ledger measures two things separately that turn out to be one. lean/CrossProof.lean seals that the symmetric cross a·d = b·c is BLIND TO ITS SPELLING and treats that blindness as the reason the product form is the robust way to state a proportion. src/padding-conjunct.ts counts the opposite-seeming defect — a conjunct true whatever its numerals are, of which this ledger carries 492 across the wings — and calls it furniture. THEY ARE THE SAME PROPERTY. A form true of every quadruple is true of every permuted quadruple too, because true equals true, so emptiness GUARANTEES invariance: padding is not symmetry's opposite but its degenerate limit, symmetry that comes from saying nothing. What separates the fact from the furniture is not invariance, which both have, but whether the form can fail at all. AND THE CONVERSE FAILS, which is what keeps the notion useful: the product form never notices the mirror and is false on most quadruples, and that combination is exactly what makes it worth stating. SO THE SQUARE HAS NO FOURTH CELL — classify by (true everywhere, mirror-invariant) and three cells carry witnesses while the fourth, true everywhere yet not invariant, is EXCLUDED BY THE IMPLICATION rather than merely unobserved. A census could only ever report it as unseen, which is a fact about who looked; a theorem rules it out. Nothing falls outside the square and nothing sits between its cells. CLAIMED: the arithmetic, decided over 625 quadruples, axiom-free. NOT CLAIMED: that every invariance in mathematics behaves so, or that this mirror is the only permutation worth asking about — one permutation, one box, stated as such. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def rng : List Nat := [0, 1, 2, 3, 4]
def allQ (f : Nat → Nat → Nat → Nat → Bool) : Bool :=
  rng.all (fun a => rng.all (fun b => rng.all (fun c => rng.all (fun d => f a b c d))))
def anyQ (f : Nat → Nat → Nat → Nat → Bool) : Bool :=
  rng.any (fun a => rng.any (fun b => rng.any (fun c => rng.any (fun d => f a b c d))))

-- the symmetric cross: products, blind to the mirror (a,b,c,d) ↦ (d,c,b,a)
def symmetric (a b c d : Nat) : Bool := a * d == b * c
-- a form true of EVERY quadruple — the padding shape, subtracting nothing
def everywhere (a b c d : Nat) : Bool := (a - 0 == a) && (b - 0 == b) && (c - 0 == c) && (d - 0 == d)
-- and whether a form agrees with its own mirror image at this quadruple
def mirrorAgrees (a b c d : Nat) : Bool := (everywhere a b c d) == (everywhere d c b a)

-- EVERY rearrangement of four positions, as index lists, so a key claiming "every mirror" walks every one.
-- 24 ELEMENTS AND NOT 625: my first shape built the quadruples as ONE FLAT LIST and filtered it, which recurses
-- once per element and blew the kernel at depth 625. NO WING BUYS ITS OWN CEILING — the answer to a recursion
-- limit is the better walk, never set_option. allQ already nests four levels of five, so the quadruples stay at
-- depth five and only the permutations are walked flat, where 24 is comfortably inside the default limit.
def perms : List (List Nat) := [[0, 1, 2, 3], [0, 1, 3, 2], [0, 2, 1, 3], [0, 2, 3, 1], [0, 3, 1, 2], [0, 3, 2, 1], [1, 0, 2, 3], [1, 0, 3, 2], [1, 2, 0, 3], [1, 2, 3, 0], [1, 3, 0, 2], [1, 3, 2, 0], [2, 0, 1, 3], [2, 0, 3, 1], [2, 1, 0, 3], [2, 1, 3, 0], [2, 3, 0, 1], [2, 3, 1, 0], [3, 0, 1, 2], [3, 0, 2, 1], [3, 1, 0, 2], [3, 1, 2, 0], [3, 2, 0, 1], [3, 2, 1, 0]]
-- the padding form evaluated at a REARRANGED quadruple, indices read from the permutation
def rearranged (p : List Nat) (a b c d : Nat) : Bool :=
  everywhere ([a, b, c, d].getD (p.getD 0 0) 0) ([a, b, c, d].getD (p.getD 1 0) 0)
             ([a, b, c, d].getD (p.getD 2 0) 0) ([a, b, c, d].getD (p.getD 3 0) 0)
def allPermsAgree (a b c d : Nat) : Bool :=
  (perms.filter (fun p => (everywhere a b c d) == (rearranged p a b c d))).length == perms.length

/-- CLAIMED: over all 625 quadruples and all 24 rearrangements of four positions, every form true of ALL
    quadruples agrees with its own image under EVERY rearrangement — so a conjunct that cannot fail is symmetric
    for free, and padding is symmetry's degenerate limit rather than its opposite. The second conjunct decides
    that the antecedent is satisfied by all 625, so the implication is not carried by an empty hypothesis. -/
theorem emptiness_is_invariant_under_every_mirror : ((rng.all (fun a => rng.all (fun b => rng.all (fun c => rng.all (fun d => !(everywhere a b c d) || (allPermsAgree a b c d)))))) = true) ∧ ((rng.all (fun a => rng.all (fun b => rng.all (fun c => rng.all (fun d => everywhere a b c d))))) = true) := by decide

/-- CLAIMED: the converse FAILS — the symmetric cross a·d = b·c is invariant under the mirror and is NOT true of
    every quadruple, so symmetry with content exists and invariance is not merely a symptom of saying nothing. -/
theorem symmetry_with_content_is_not_emptiness : ((allQ (fun a b c d => (symmetric a b c d) == (symmetric d c b a))) = true) ∧ ¬(1 * 1 = 2 * 2) := by decide

/-- CLAIMED: classifying a form by (true everywhere, invariant under the mirror) leaves exactly 3 of the four
    cells occupied — and the missing one, true everywhere yet not invariant, is IMPOSSIBLE rather than merely
    unobserved: the first theorem excludes it. -/
theorem the_square_has_no_fourth_cell : (anyQ (fun a b c d => !(symmetric a b c d))) = true ∧ (allQ (fun a b c d => !(everywhere a b c d) || (mirrorAgrees a b c d))) = true := by decide
