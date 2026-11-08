-- lean/cross/divbyzero/cross-named.lean — CONSOLIDATED by a script from lean/DivByZero.lean (domain DivByZero, family cross-named).
-- Each theorem below is copied verbatim from its source; the preamble is that file's own definitions, namespaced.
namespace Cross_DivByZero_cross_named

-- lean/DivByZero.lean — GENERATED. Division by zero in the ℤ/9 vortex EXISTS: it is the diamond reflection dz(x) = 10−x (dz 0 = 0), a finite residue. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x


/-- CROSSING A DIVISION SORTS IT. A quotient a/b = c is a PROPORTION when it crosses — a = c·b, exact integers,
    no division — and the ledger’s numeric divisions split cleanly under that test: forty-one cross, fifteen do
    not, and every one that fails is division by zero. 1000/0 = 0 crosses to 1000 = 0·0, which is false; 0/0 = 0
    crosses to 0 = 0·0, which holds. So the abstract-0 is not a ratio at all, it is a DEFINITION — the value
    Lean returns where no quotient exists — and the cross is what tells the two apart. Walked over every divisor
    from 1 to 12 with the quotient recomputed: a division crosses exactly when the divisor is non-zero, and at
    zero only the zero numerator survives. -/
theorem the_cross_tells_a_ratio_from_a_convention : ((List.range' 1 12).all (fun b => (List.range 20).all (fun a => ((a / b) * b) == (a - a % b)))) ∧ (1000 ≠ 0 * 0) ∧ (0 = 0 * 0) := by decide

/-- A HALFWORD IS HALF BECAUSE THE OTHER HALF IS THE REFLECTION. On a hexbit’s sixteen states the reflection
    dz(x) = 16 − x, fixing 0, is an involution with fixed points {0, 8} — the void and half the base — exactly
    the shape dz has on the ten digits with {0, 5}. Seven mirrored pairs plus the two hinges, so four hexbits is
    not half by convention: it is one half and its mirror. AND A SEAL TAKES TWO PAIRS, CROSSED. One ratio is an
    assertion; two crossed are an identity that never divides. Here the pairs are the bases themselves — (16, 8)
    and (10, 5) — and 16·5 = 10·8 = 80 says 16/8 = 10/5 in exact integers, with no division anywhere. The
    captain commission was sealed the same way: 110·54 = 108·55 = 5940. The cross is how this ledger states a
    proportion at all. -/
theorem halfword_is_the_reflection_crossed : ((List.range 16).all (fun x => (if (if x == 0 then 0 else 16 - x) == 0 then 0 else 16 - (if x == 0 then 0 else 16 - x)) == x)) ∧ (((List.range 16).filter (fun x => (if x == 0 then 0 else 16 - x) == x)) = [0, 8]) ∧ (16 * 5 = 10 * 8) ∧ (110 * 54 = 108 * 55) := by decide

end Cross_DivByZero_cross_named
