-- lean/Proofde5612a2.lean — GENERATED. PROOF de5612a2: lead de5612a2 of lean/leads.json (trial), stated in the row's own lean field as lead_de5612a2, and proof_de5612a2, the kernel's proof of it, accepted at the door for the text addressed 5c293fc3-79ab-8789-8f76-24255a17230b. Every proof checked by the kernel (by unfold), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- The walk's two rings: doubling in Z/9 and stepping by two in Z/7, with their inverses (5 is the inverse of 2
-- mod 9, and adding 5 is subtracting 2 mod 7), each a bijection of its ring.
def dbl (x : Nat) : Nat := 2 * x % 9
def half (x : Nat) : Nat := 5 * x % 9
def up2 (y : Nat) : Nat := (y + 2) % 7
def down2 (y : Nat) : Nat := (y + 5) % 7
def iter (f : Nat → Nat) : Nat → Nat → Nat
  | 0, x => x
  | n + 1, x => f (iter f n x)
-- the forward and the inverse paired walk, both from (1, 1)
def fwd (k : Nat) : Nat × Nat := (iter dbl k 1, iter up2 k 1)
def inv (k : Nat) : Nat × Nat := (iter half k 1, iter down2 k 1)

/-- The 42-state paired walk: doubling in Z/9 (period 6) against stepping by two in Z/7 (period 7). Coprime, so
    the pair has period exactly 42 and visits all 42 states before returning. Forward and inverse walks meet at
    step 21 (8,1) and step 42 (1,1) — two contact points per revolution. -/
def lead_de5612a2 : Prop :=
  (iter dbl 6 1 = 1 ∧ (List.range 5).all (fun j => iter dbl (j + 1) 1 != 1) = true) ∧
  (iter up2 7 1 = 1 ∧ (List.range 6).all (fun j => iter up2 (j + 1) 1 != 1) = true) ∧
  Nat.gcd 6 7 = 1 ∧
  (List.range 9).all (fun x => half (dbl x) == x && dbl (half x) == x) = true ∧
  (List.range 7).all (fun y => down2 (up2 y) == y && up2 (down2 y) == y) = true ∧
  (fwd 42 = fwd 0 ∧ (List.range 41).all (fun j => fwd (j + 1) != fwd 0) = true) ∧
  ((List.range 42).map fwd).eraseDups.length = 42 ∧
  fwd 21 = inv 21 ∧ fwd 21 = (8, 1) ∧ fwd 42 = inv 42 ∧ fwd 42 = (1, 1) ∧
  ((List.range 42).map (· + 1)).filter (fun k => fwd k == inv k) = [21, 42]

/-- The kernel proves lead de5612a2: The 42-state paired walk: doubling in Z/9 (period 6) against stepping by
    two in Z/7 (period 7). Coprime, so the pair has period exactly 42 and visits all 42 states before returning.
    Forward and inverse walks meet at step 21 (8,1) and step 42 (1,1) — two contact points per revolution. -/
theorem proof_de5612a2 : lead_de5612a2 := by unfold lead_de5612a2; decide
