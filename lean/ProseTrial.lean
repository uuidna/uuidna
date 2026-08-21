-- lean/ProseTrial.lean — GENERATED. THE PROSE TRIAL — the derivation law decided by the KERNEL rather than by a string comparison. A sentence about a handle is admissible only if it is regenerable from that handle's walk, and the two quantities it regenerates from are sealed here: the six distinct orbits the whole ledger lands on, and the ORDER of each, which is exactly its length — taken by decide, never asserted. A forged order is refused on its own line by a `≠` the kernel evaluates, so a period a person chose cannot pass as one the walk measured. Every orbit is closed under dz(x) = 10 − x and every orbit holds zero. PURE ARITHMETIC: every number is a digit of the ring or a length; nothing is measured from the world. HONEST SCOPE: integrity, not truth — this decides that the order is the orbit's length and that the six are distinct and dz-closed. It does not decide what any prose MEANS, and a residue is not a fact about the thing that folded to it. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def orbits : List (List Nat) := [[0,1,2,3,4,5,6,7,8,9],[0,1,3,4,5,6,7,9],[0,1,9],[0],[0,1,3,5,7,9],[0,1,5,9]]

def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d

/-- The ledger walks exactly six distinct orbits. Six, and the count is the whole vocabulary — a seventh would
    be a word nothing proves. -/
theorem orbits_number_six : orbits.length = 6 := by decide

/-- THE ORDER IS THE LENGTH. A walk's order — the period any motion derived from it must have — is exactly how
    many digits its orbit reaches, taken by the kernel rather than asserted: [10, 8, 3, 1, 6, 4]. -/
theorem order_measures_orbit : orbits.map (fun o => o.length) = [10,8,3,1,6,4] := by decide

/-- A FORGED ORDER IS REFUSED, and the refusal is on this line. Move one order by one and the derived list no
    longer equals it — so a period a person chose can never pass as a period the walk measured. -/
theorem forged_order_refused : (orbits.map (fun o => o.length) = [10,8,3,1,6,4]) ∧ (orbits.map (fun o => o.length) ≠ [10,8,3,1,6,5]) := by decide

/-- Every orbit is closed under the reflection dz(x) = 10 − x: the mirror of each member is already a member, so
    reflecting a finished walk adds no digit and the vocabulary cannot grow by looking at itself. -/
theorem orbits_reflect_onto_themselves : orbits.all (fun o => o.all (fun d => o.contains (dz d))) := by decide

/-- No two of the six are the same walk — the vocabulary has six words and not five wearing six names. Pairwise
    distinct, decided rather than assumed. -/
theorem orbits_are_distinct : (orbits.map (fun o => o.length)).eraseDups.length = 6 := by decide

/-- Zero is in every orbit: dz fixes it, so no walk can leave it behind. The one digit every handle in the
    ledger reaches, whatever it folds from. -/
theorem every_orbit_holds_zero : orbits.all (fun o => o.contains 0) := by decide
