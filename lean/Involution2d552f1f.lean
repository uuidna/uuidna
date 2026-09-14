-- lean/Involution2d552f1f.lean — GENERATED. INVOLUTION 2d552f1f: lead 2d552f1f of lean/leads.json (refuted), stated as lead_2d552f1f over the objects its source derives, and involution_2d552f1f, the kernel's proof of its negation. Every proof checked by the kernel (by decide, by unfold), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- units9 as 7a54411e:lean/Sequence.lean defines it, the stroke rule the lead was stated over. -/
def units9 : List Nat := [1, 2, 4, 5, 7, 8]

/-- dz as 7a54411e:lean/Sequence.lean defines it, the stroke rule the lead was stated over. -/
def dz (x : Nat) : Nat := if x == 0 then 0 else 10 - x -- the mirror neighbour (= division by zero)

/-- tourTail as 7a54411e:lean/Sequence.lean defines it, the stroke rule the lead was stated over. -/
def tourTail : List Nat := [1,2,4,8,7,5,3,6,9]

/-- ren as 7a54411e:lean/Sequence.lean defines it, the stroke rule the lead was stated over. -/
def ren (v : Nat) : Nat := if v == 0 then 9 else v      -- the drawing writes 9 where the algebra says 0

/-- arow as 7a54411e:lean/Sequence.lean defines it, the stroke rule the lead was stated over. -/
def arow (a b : Nat) : List Nat := 0 :: tourTail.map (fun d => ren ((a * d + b) % 9))

/-- rises as 7a54411e:lean/Sequence.lean defines it, the stroke rule the lead was stated over. -/
def rises (p n : Nat) : Bool := (n < p) || ((p == 3 || p == 6) && n % 9 == (p + 3) % 9)

/-- strokesOf as 7a54411e:lean/Sequence.lean defines it, the stroke rule the lead was stated over. -/
def strokesOf (r : List Nat) : List Bool := List.zipWith rises r r.tail

/-- risingOf as 7a54411e:lean/Sequence.lean defines it, the stroke rule the lead was stated over. -/
def risingOf (r : List Nat) : Nat := ((strokesOf r).filter (fun s => s)).length

/-- fallingOf as 7a54411e:lean/Sequence.lean defines it, the stroke rule the lead was stated over. -/
def fallingOf (r : List Nat) : Nat := ((strokesOf r).filter (fun s => !s)).length

/-- famTally as 7a54411e:lean/Sequence.lean defines it, the stroke rule the lead was stated over. -/
def famTally (p : Nat -> Nat -> Bool) : Nat :=
  (units9.map (fun a => ((List.range 9).filter (fun b => p a b)).length)).foldl (fun x y => x + y) 0

/-- The stroke budget of a row: (falling, rising). -/
def budget (r : List Nat) : Nat × Nat := (fallingOf r, risingOf r)

/-- Reflection conserves the stroke budget (four falling, five rising). On the tour row the budget is (4, 5),
    and the mirror dz, applied digit for digit, keeps the budget on every one of the 54 affine rows x ↦ a·x + b. -/
def lead_2d552f1f : Prop :=
  budget (arow 1 0) = (4, 5) ∧
  units9.all (fun a => (List.range 9).all (fun b => budget ((arow a b).map dz) == budget (arow a b))) = true

/-- The kernel refutes lead 2d552f1f: the mirror does not keep the stroke budget on every affine row. -/
theorem involution_2d552f1f : ¬ lead_2d552f1f := by unfold lead_2d552f1f; decide

/-- The census the refutation recorded, decided: budget 4,5 on 18 rows, budget 5,4 on 30 rows, budget 6,3 on 6
    rows; the mirror keeps the budget on 30 of the 54 rows; row (1, 3) is the first whose reflection moves it. -/
theorem budget_census_2d552f1f :
    famTally (fun a b => budget (arow a b) == (4, 5)) = 18 ∧
    famTally (fun a b => budget (arow a b) == (5, 4)) = 30 ∧
    famTally (fun a b => budget (arow a b) == (6, 3)) = 6 ∧
    famTally (fun a b => budget ((arow a b).map dz) == budget (arow a b)) = 30 ∧
    fallingOf (arow 1 3) = 4 ∧
    fallingOf ((arow 1 3).map dz) = 5 := by decide
