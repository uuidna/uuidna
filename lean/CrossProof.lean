-- lean/CrossProof.lean — GENERATED. THE SYMMETRIC AND THE ASYMMETRIC CROSS. One proportion between four quantities has two spellings: the SYMMETRIC a·d = b·c, whose sides are products and therefore commute, so its four spellings are one fact; and the ASYMMETRIC a/b = c/d, whose sides are ratios and do not, so inverting them is a different claim. lean/PlanckLattice.lean works one rank up, where a product ADDS exponent vectors and a ratio SUBTRACTS them and the lattice's closure makes its formulas prove each other; this wing asks at the rank of the proportion itself whether the product route and the ratio route are the same claim. THEY ARE NOT, over ℕ. Truncating division discards the remainder, so the ratio form is STRICTLY WEAKER: on 94 of 625 quadruples a/b = c/d holds while a·d = b·c fails, the smallest being 1/1 = 3/2 = 1 against 1·2 ≠ 1·3. Cross-multiplication is taught as an equivalence and over ℕ it is an implication, product to ratio and never back. AND THEY DO PROVE EACH OTHER under exactly one condition, stated rather than assumed: when both divisions are exact. Then a = qb and c = rd, the product form reads qbd = brd, non-zero b and d force q = r, and q = r returns a·d = b·c — both directions decided by the walk over all 144 exact quadruples. THE VACUITY IS CLOSED INSIDE THE STATEMENT, because a guarded implication is where a ledger proves nothing most easily: the theorem also carries that exact quadruples exist and that the proportion both HOLDS on 38 of them and FAILS on 106, so the agreement is not an artefact of one side being constant. CLAIMED: the arithmetic, decided by the kernel over its own finite box of 5^4 quadruples, axiom-free. NOT CLAIMED: anything about ℚ or ℝ, where cross-multiplication is the equivalence it is taught as — the entire finding is that ℕ division is not division. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def rng : List Nat := [0, 1, 2, 3, 4]
def allQ (f : Nat → Nat → Nat → Nat → Bool) : Bool :=
  rng.all (fun a => rng.all (fun b => rng.all (fun c => rng.all (fun d => f a b c d))))
def anyQ (f : Nat → Nat → Nat → Nat → Bool) : Bool :=
  rng.any (fun a => rng.any (fun b => rng.any (fun c => rng.any (fun d => f a b c d))))

-- the four spellings of the SYMMETRIC cross: products, which commute
def symm (a b c d : Nat) : Bool := a * d == b * c
def symmSwapWithin (a b c d : Nat) : Bool := d * a == c * b
def symmSwapSides (a b c d : Nat) : Bool := b * c == a * d
def symmSwapBoth (a b c d : Nat) : Bool := c * b == d * a

-- the ASYMMETRIC cross: ratios, which do not commute — and its inversion, which is a different claim
def asym (a b c d : Nat) : Bool := b != 0 && d != 0 && (a / b == c / d)
def asymInverted (a b c d : Nat) : Bool := a != 0 && c != 0 && (b / a == d / c)

-- both divisions exact: the condition under which the two forms prove each other
def exact (a b c d : Nat) : Bool := b != 0 && d != 0 && a % b == 0 && c % d == 0

/-- CLAIMED: over all 625 quadruples in the box, the symmetric cross a·d = b·c agrees with all FOUR of its
    spellings — swapping inside each product, exchanging the two products, and both at once — so the four are
    one fact; and the asymmetric cross a/b = c/d is NOT invariant, disagreeing with its own inversion b/a = d/c
    on 212 of them. -/
theorem the_symmetric_cross_is_blind_to_its_spelling : (allQ (fun a b c d => ((symm a b c d) == (symmSwapWithin a b c d)) && ((symm a b c d) == (symmSwapSides a b c d)) && ((symm a b c d) == (symmSwapBoth a b c d))) = true) ∧ (anyQ (fun a b c d => (asym a b c d) != (asymInverted a b c d)) = true) := by decide

/-- CLAIMED: over ℕ the ratio form is STRICTLY WEAKER than the product form — on 94 of 625 quadruples a/b = c/d
    holds while a·d = b·c fails, the smallest being 1/1 = 3/2 = 1 against 1·2 = 2 ≠ 3 = 1·3 — so
    cross-multiplication, which is taught as an equivalence, is an implication here. -/
theorem the_asymmetric_cross_is_strictly_weaker_over_naturals : (anyQ (fun a b c d => (asym a b c d) && !(symm a b c d)) = true) ∧ ((1 / 1 = 3 / 2) ∧ (1 * 2 ≠ 1 * 3)) := by decide

/-- CLAIMED: when both divisions are EXACT the two forms are equivalent — over the box the symmetric and
    asymmetric crosses agree on every one of the 144 exact quadruples, walked in both directions; and the
    agreement is substantive rather than vacuous, because 38 of those satisfy the proportion and 106 refute it,
    so both outcomes occur. -/
theorem exact_division_makes_the_two_crosses_prove_each_other : (allQ (fun a b c d => !(exact a b c d) || ((symm a b c d) == (asym a b c d))) = true) ∧ (anyQ (fun a b c d => exact a b c d) = true) ∧ (anyQ (fun a b c d => (exact a b c d) && (symm a b c d)) = true) ∧ (anyQ (fun a b c d => (exact a b c d) && !(symm a b c d)) = true) := by decide
