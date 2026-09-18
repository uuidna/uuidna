-- lean/Involution83b7cc65.lean — GENERATED. INVOLUTION 83b7cc65: lead 83b7cc65 of lean/leads.json (refuted), stated in the row's own lean field as lead_83b7cc65, and involution_83b7cc65, the kernel's proof of its negation, accepted at the door for the text addressed 32f8f877-738a-84e7-8ab6-5c616f847d70. Every proof checked by the kernel (by unfold), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lean/leads.json refuted#33 · handle 83b7cc65
-- LEAD: "6x7 and 7x6 counter-rotate (the ORDER is the rotation)"
-- The lead asserts that swapping the order of the two coordinates changes the result:
-- either the plain product differs, or the two rotations x |-> 6*x and x |-> 7*x on the
-- nine-residue clock fail to commute at some point of that clock.

/-- 6x7 and 7x6 counter-rotate (the ORDER is the rotation) -/
def lead_83b7cc65 : Prop :=
  6 * 7 ≠ 7 * 6 ∨
  ((List.range 9).any (fun x => decide ((6 * (7 * x)) % 9 ≠ (7 * (6 * x)) % 9)) = true)

/-- The kernel refutes lead 83b7cc65: 6x7 and 7x6 counter-rotate (the ORDER is the rotation). -/
theorem involution_83b7cc65 : ¬ lead_83b7cc65 := by
  unfold lead_83b7cc65
  decide
