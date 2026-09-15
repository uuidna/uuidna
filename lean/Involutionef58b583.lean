-- lean/Involutionef58b583.lean — GENERATED. INVOLUTION ef58b583: lead ef58b583 of lean/leads.json (refuted), stated in the row's own lean field as lead_ef58b583, and involution_ef58b583, the kernel's proof of its negation, accepted at the door for the text addressed e0ba48ac-d52f-8171-b981-9b8f129c466e. Every proof checked by the kernel (by decide, by exact, by intro), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

def dz (d : Nat) : Nat := if d = 0 then 0 else 10 - d
def dbl (d : Nat) : Nat := (2 * d) % 9
/-- the alternation: step i applies dz on even i when `dzFirst`, doubling otherwise -/
def altStep (dzFirst : Bool) (i s : Nat) : Nat :=
  if (i % 2 == 0) == dzFirst then dz s else dbl s
def altWalk (dzFirst : Bool) : Nat → Nat → Nat
  | 0, s => s
  | n + 1, s => altStep dzFirst n (altWalk dzFirst n s)

/-- An involution alone is barren: dz reaches exactly two states from any seed, alternating with doubling
    reaches all ten. The productive partner is the IRREVERSIBLE one — dz is reversible and free, doubling
    collapses. -/
def lead_ef58b583 : Prop :=
  -- an involution alone is barren: dz reaches exactly two states from any seed
  (List.range 10).all (fun s => ([s, dz s]).eraseDups.length == 2) = true ∧
  -- alternating with doubling reaches all ten (from any seed, in either order of alternation)
  (∀ s, s < 10 → ∃ dzFirst : Bool, ∀ t, t < 10 → ∃ n, altWalk dzFirst n s = t) ∧
  -- dz is reversible
  (List.range 10).all (fun s => dz (dz s) == s) = true ∧
  -- doubling collapses (is not injective on the ten digits)
  ((List.range 10).map dbl).eraseDups.length < 10
-- second failing conjunct, universally: seed 0 is fixed by both maps, so no alternation leaves it

/-- a supporting theorem the row states for lead ef58b583, decided by the kernel with its verdict -/
theorem altWalk_zero : ∀ (d : Bool) (n : Nat), altWalk d n 0 = 0 := by
  intro d n
  induction n with
  | zero => rfl
  | succ n ih =>
    show altStep d n (altWalk d n 0) = 0
    rw [ih]
    unfold altStep
    cases (n % 2 == 0) == d <;> rfl

/-- a supporting theorem the row states for lead ef58b583, decided by the kernel with its verdict -/
theorem alternation_misses_from_zero : ¬ (∀ s, s < 10 → ∃ dzFirst : Bool, ∀ t, t < 10 → ∃ n, altWalk dzFirst n s = t) := by
  exact fun h => match h 0 (by decide) with
  | ⟨d, hd⟩ => match hd 1 (by decide) with
    | ⟨n, hn⟩ => absurd ((altWalk_zero d n).symm.trans hn) (by decide)

/-- The kernel refutes lead ef58b583: An involution alone is barren: dz reaches exactly two states from any
    seed, alternating with doubling reaches all ten. The productive partner is the IRREVERSIBLE one — dz is
    reversible and free, doubling collapses. -/
theorem involution_ef58b583 : ¬ lead_ef58b583 := by
  intro ⟨h, _⟩; exact absurd h (by decide)
