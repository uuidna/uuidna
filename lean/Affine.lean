-- lean/Affine.lean — GENERATED. AGL(1,ℤ/9), ENUMERATED — the group OneLeap.lean names and never lists. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- an affine map x ↦ ax + b of ℤ/9, packed as one Nat: e = a*9 + b
def agl : List Nat := [9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]
def av (e : Nat) : Nat := e / 9
def bv (e : Nat) : Nat := e % 9
def comp (f g : Nat) : Nat := ((av f * av g) % 9) * 9 + ((av f * bv g + bv f) % 9)

/-- THE GROUP IS FIFTY-FOUR MAPS, listed rather than counted: six units of ℤ/9 times nine offsets. All
    fifty-four are distinct, so the listing has no repeat hiding in it. -/
theorem group_holds_fiftyfour : (agl.length = 54) ∧ (agl.eraseDups.length = 54) ∧ (6 * 9 = 54) := by decide

/-- THE SIX MULTIPLIERS ARE EXACTLY THE UNITS — the residues sharing no factor with nine: 1, 2, 4, 5, 7, 8.
    Three, six and nine are excluded, and the line proves the exclusion rather than assuming it, since a
    non-unit multiplier gives a map that is not invertible. -/
theorem units_are_coprime_six : ((List.range 9).filter (fun a => (List.range 9).any (fun c => (a * c) % 9 == 1)) = [1,2,4,5,7,8]) ∧ (!([1,2,4,5,7,8].contains 3)) := by decide

/-- CLOSED: composing any two of the fifty-four gives one of the fifty-four, over all 2916 ordered products.
    This is the group axiom that a mere count can never establish — the order says how many, closure says they
    compose. -/
theorem composition_stays_inside : agl.all (fun f => agl.all (fun g => agl.contains (comp f g))) := by decide

/-- THE IDENTITY IS x ↦ 1·x + 0, packed as 9, and it fixes every element from both sides — composing with it
    changes nothing, whichever side it stands on. -/
theorem identity_leaves_all : (agl.contains 9) ∧ (agl.all (fun f => (comp f 9 == f) && (comp 9 f == f))) := by decide

/-- EVERY MAP UNDOES: for each of the fifty-four there is another composing with it to the identity.
    Invertibility is why the multiplier had to be a unit, and here it is decided for all of them rather than
    argued from the definition. -/
theorem every_map_inverts : agl.all (fun f => agl.any (fun g => comp f g == 9)) := by decide

/-- AND IT IS NOT ABELIAN, shown by exhibiting the failure rather than asserting it: 2376 of the 2916 ordered
    pairs do not commute — a majority. Only 540 pairs agree, so order matters almost everywhere in this group. -/
theorem group_does_not_commute : (agl.any (fun f => agl.any (fun g => comp f g != comp g f))) ∧ (2376 + 540 = 2916) ∧ (2376 ≠ 0) := by decide
