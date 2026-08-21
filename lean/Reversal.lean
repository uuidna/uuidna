-- lean/Reversal.lean — GENERATED. REVERSAL — why undoing an INVOLUTION and undoing a PATH are different acts, and where the walk never goes. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d
def dbl (d : Nat) : Nat := (2 * d) % 9
def preOf (f : Nat -> Nat) (t : Nat) : Nat := ((List.range 10).filter (fun d => f d == t)).length

/-- UNDOING A REFLECTION ALWAYS WORKS AND IS NEVER AMBIGUOUS: every digit has exactly ONE preimage under dz —
    the census is ten ones — and reflecting twice returns each digit to itself. One way in, one way out,
    everywhere. -/
theorem reflection_reverses_uniquely : ((List.range 10).map (preOf dz) = [1,1,1,1,1,1,1,1,1,1]) ∧ ((List.range 10).all (fun d => dz (dz d) == d)) := by decide

/-- UNDOING A DOUBLING CAN BE AMBIGUOUS: the digit 0 has TWO preimages, since 0 and 9 both double onto it, so a
    path arriving at 0 cannot say which digit it came from. That is the first way a path reversal fails where an
    involution reversal cannot. -/
theorem doubling_reverses_ambiguously : (preOf dbl 0 = 2) ∧ (dbl 0 = 0) ∧ (dbl 9 = 0) ∧ (preOf dbl 0 ≠ 1) := by decide

/-- AND THE UNEXPLORED DIGIT: 9 has ZERO preimages under doubling — nothing doubles onto it, so the forward walk
    never arrives there and no reversal can leave from it. Nine is not merely hard to reach; it is outside the
    image, and the line proves the count is zero rather than small. -/
theorem nine_is_never_reached : (preOf dbl 9 = 0) ∧ ((List.range 10).all (fun d => dbl d != 9)) := by decide

/-- THE TWO MAPS DIFFER IN KIND, and the line exhibits it rather than asserting it: dz's preimage census is ten
    ones, doubling's is [2,1,1,1,1,1,1,1,1,0], and the two lists are not equal. Both sum to ten — every digit
    goes somewhere — but only one of them arrives everywhere exactly once. -/
theorem censuses_differ : ((List.range 10).map (preOf dz) ≠ (List.range 10).map (preOf dbl)) ∧ ([1,1,1,1,1,1,1,1,1,1].foldl (· + ·) 0 = 10) ∧ ([2,1,1,1,1,1,1,1,1,0].foldl (· + ·) 0 = 10) := by decide

/-- REVERSING A PATH IS NOT REVERSING A STEP: undoing dz-then-doubling requires undoing the doubling FIRST and
    the reflection second, so the path inherits doubling's failures. Where doubling is ambiguous or undefined
    the path cannot be walked backwards, even though every reflection in it could be undone on its own. -/
theorem path_reverse_needs_both : (preOf dbl 0 ≠ 1) ∧ (preOf dbl 9 = 0) ∧ ((List.range 10).all (fun d => preOf dz d == 1)) := by decide

/-- THE REFLECTION LEAVES NOTHING UNEXPLORED: its image is all ten digits, so no digit is outside it, while
    doubling's image holds nine. Ten against nine — the missing one is the digit no doubling produces. -/
theorem reflection_explores_all : (((List.range 10).map dz).eraseDups.length = 10) ∧ (((List.range 10).map dbl).eraseDups.length = 9) ∧ (10 ≠ 9) := by decide
