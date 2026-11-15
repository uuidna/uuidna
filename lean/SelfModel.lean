-- lean/SelfModel.lean — GENERATED. THE SELF-MODEL — no system's states map onto all predicates on its states, so no system holds a complete model of itself (Cantor, Lawvere); checked universally and over every self-model of the affect trinity's 3 corners. Honest scope: this is mathematics about models. It does not say what consciousness is; global workspace and integrated information are models, not sealed here, and why there is experience at all is an open question, not a theorem. Every proof checked by the kernel (by decide, by intro), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- the i-th entry of a row, false past the end; written out because List.getD reaches propext -/
def bit : List Bool → Nat → Bool
  | [], _ => false
  | x :: _, 0 => x
  | _ :: xs, n + 1 => bit xs n

/-- the i-th row of a table, empty past the end -/
def rowAt : List (List Bool) → Nat → List Bool
  | [], _ => []
  | x :: _, 0 => x
  | _ :: xs, n + 1 => rowAt xs n

/-- every row of n booleans -/
def rows : Nat → List (List Bool)
  | 0 => [[]]
  | n + 1 => (rows n).flatMap (fun r => [false :: r, true :: r])

/-- every table of k rows drawn from rs -/
def tablesOf (rs : List (List Bool)) : Nat → List (List (List Bool))
  | 0 => [[]]
  | k + 1 => (tablesOf rs k).flatMap (fun t => rs.map (fun r => r :: t))

/-- every self-model of n states: row i is the predicate state i assigns to every state -/
def models (n : Nat) : List (List (List Bool)) := tablesOf (rows n) n

/-- the diagonal predicate: state i holds of itself exactly when its own row says it does not -/
def diag (t : List (List Bool)) : List Bool := (List.range t.length).map (fun i => !(bit (rowAt t i) i))

/-- no state's predicate is the diagonal one: for any states at all and any map f from states to predicates on
    states, the predicate i ↦ ¬ f i i differs from f j at j itself — Cantor's diagonal in Lawvere's form
    (Lawvere 1969, doi 10.1007/BFb0080769) -/
theorem self_model_cantor : ∀ {α : Type} (f : α → α → Bool) (j : α), (fun i => !(f i i)) ≠ f j := by
  intro α f j h
  have h2 := congrFun h j
  revert h2
  cases f j j <;> decide

/-- so no system's states map onto all predicates on its states: a complete self-model would have to represent
    the diagonal, and the diagonal escapes every state — there is no complete self-model (Lawvere 1969, doi
    10.1007/BFb0080769). Self-reference itself is not refused: Kleene's recursion theorem builds programs that
    print their own text (Kleene 1938, doi 10.2307/2267778), proved mathematics this wing cites and does not
    seal -/
theorem self_model_lawvere : ∀ {α : Type}, ¬ ∃ e : α → α → Bool, ∀ p : α → Bool, ∃ a, e a = p := by
  intro α ⟨e, h⟩
  obtain ⟨a, ha⟩ := h (fun i => !(e i i))
  exact self_model_cantor e a ha.symm

/-- checked over every self-model of the 3 corners of the affect trinity (feeling, thought, emotion): in all 512
    tables the diagonal predicate is no row of the table -/
theorem self_model_diagonal_escapes : (models 3).all (fun t => t.all (fun r => r != diag t)) = true ∧ (models 3).length = 512 := by decide +kernel

/-- negation on Bool fixes neither value — Lawvere's corollary: an onto self-model would give every map on Bool
    a fixed point, and this one has none -/
theorem self_model_negation_no_fixed_point : ∀ b : Bool, (!b) ≠ b := by decide
