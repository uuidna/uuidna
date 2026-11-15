-- lean/AffectTrinity.lean — GENERATED. THE AFFECT TRINITY — feeling, thought and emotion as 3 corners a turn carries round, 120° apart, with valence a flip on every corner at once; together a 6-element cyclic group. Honest scope, which no theorem here closes: the algebra is exact for the model; whether experience divides into three, and whether a mixed state (bittersweet) breaks the loop, is an open empirical question — a lens, not a proven law of mind. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- a corner of the lens: feeling, the body's raw affect signal; thought, the appraisal that reads it; emotion, the whole episode, affect joined to a concept -/
inductive Corner where
  | feeling | thought | emotion
deriving DecidableEq

/-- valence, the pleasant–unpleasant axis every corner carries (Russell 1980, doi 10.1037/h0077714) -/
inductive Valence where
  | pleasant | unpleasant
deriving DecidableEq

/-- a state of the lens: one corner carrying one valence -/
structure Affect where
  corner : Corner
  valence : Valence
deriving DecidableEq

/-- a property holds of every corner exactly when it holds of the 3, so a universal over corners decides by checking each -/
instance (P : Corner → Prop) [DecidablePred P] : Decidable (∀ c, P c) :=
  decidable_of_iff (P .feeling ∧ P .thought ∧ P .emotion)
    ⟨fun ⟨h0, h1, h2⟩ x => by cases x <;> assumption, fun h => ⟨h _, h _, h _⟩⟩

/-- the same for the 2 valences -/
instance (P : Valence → Prop) [DecidablePred P] : Decidable (∀ v, P v) :=
  decidable_of_iff (P .pleasant ∧ P .unpleasant)
    ⟨fun ⟨h0, h1⟩ x => by cases x <;> assumption, fun h => ⟨h _, h _⟩⟩

/-- and for the states: every corner with every valence -/
instance (P : Affect → Prop) [DecidablePred P] : Decidable (∀ a, P a) :=
  decidable_of_iff (∀ c, ∀ v, P ⟨c, v⟩) ⟨fun h a => by cases a; exact h _ _, fun h _ _ => h _⟩

/-- ρ, the turn: feeling → thought → emotion → feeling, each corner 120° from the next -/
def Corner.turn : Corner → Corner
  | .feeling => .thought
  | .thought => .emotion
  | .emotion => .feeling

/-- ρ⁻¹, the loop run backward -/
def Corner.back : Corner → Corner
  | .feeling => .emotion
  | .thought => .feeling
  | .emotion => .thought

/-- σ, the valence flip -/
def Valence.flip : Valence → Valence
  | .pleasant => .unpleasant
  | .unpleasant => .pleasant

/-- the turn and the flip lifted to the states: each moves its own coordinate and leaves the other -/
def Affect.turn (a : Affect) : Affect := ⟨a.corner.turn, a.valence⟩
def Affect.flip (a : Affect) : Affect := ⟨a.corner, a.valence.flip⟩

/-- f applied n times -/
def iter {α : Type} (f : α → α) : Nat → α → α
  | 0, a => a
  | n + 1, a => iter f n (f a)

/-- the 6 states, listed -/
def states : List Affect := [⟨.feeling, .pleasant⟩, ⟨.feeling, .unpleasant⟩, ⟨.thought, .pleasant⟩, ⟨.thought, .unpleasant⟩, ⟨.emotion, .pleasant⟩, ⟨.emotion, .unpleasant⟩]

/-- one round of the closure: every table reached so far, carried by the turn and by the flip, kept if new -/
def grow (seen : List (List Affect)) : List (List Affect) :=
  seen.foldl (fun acc t => [t.map Affect.turn, t.map Affect.flip].foldl (fun acc' u => if acc'.contains u then acc' else acc' ++ [u]) acc) seen

/-- the group the turn and the flip generate, as action tables on the states: the identity grown 3 rounds -/
def generated : List (List Affect) := iter grow 3 [states]

/-- the loop runs feeling → thought → emotion → feeling: a feeling, the body's raw affect signal, is read by a
    thought, the appraisal (Lazarus 1991, doi 10.1037/0003-066X.46.8.819; Scherer 2009, doi
    10.1080/02699930902928969), and the reading completes an emotion, the whole episode of affect joined to a
    concept (Barrett 2017, doi 10.1093/scan/nsw154), which is felt again -/
theorem affect_loop_order : Corner.turn .feeling = .thought ∧ Corner.turn .thought = .emotion ∧ Corner.turn .emotion = .feeling := by decide

/-- 3 turns of 120° return every corner to itself: ρ³ = id, so the loop closes -/
theorem affect_turn_closes : ∀ c : Corner, Corner.turn (Corner.turn (Corner.turn c)) = c := by decide

/-- no turn short of a full loop (ρ¹, ρ²) leaves any corner where it was: the observer is the axis the loop
    turns around, not a fourth corner it lands on -/
theorem affect_turn_fixes_no_corner : ∀ c : Corner, Corner.turn c ≠ c ∧ Corner.turn (Corner.turn c) ≠ c := by decide

/-- the loop also runs backward: ρ⁻¹ undoes the turn on either side, and running back once is turning forward 2
    times, ρ⁻¹ = ρ² -/
theorem affect_turn_back : ∀ c : Corner, Corner.back (Corner.turn c) = c ∧ Corner.turn (Corner.back c) = c ∧ Corner.back c = Corner.turn (Corner.turn c) := by decide

/-- the valence flip, pleasant ↔ unpleasant (Russell 1980, doi 10.1037/h0077714), undone by itself and fixing
    neither valence: σ² = id -/
theorem affect_flip_involution : ∀ v : Valence, Valence.flip (Valence.flip v) = v ∧ Valence.flip v ≠ v := by decide

/-- the valence flip acts on every corner at once, leaving each corner where it is, and commutes with the turn:
    σρ = ρσ on every state -/
theorem affect_flip_commutes_turn : ∀ a : Affect, (Affect.turn a).flip = (Affect.flip a).turn ∧ (Affect.flip a).corner = a.corner := by decide

/-- the turn and the flip generate a group of exactly 6 elements, 3 turns times 2 flips (ℤ/3 × ℤ/2): the closure
    of the identity under both holds the identity, is closed under each generator, and has 6 action tables on
    the 6 states -/
theorem affect_group_order_six : (∀ a : Affect, states.contains a = true) ∧ generated.contains states = true ∧ generated.all (fun t => generated.contains (t.map Affect.turn) && generated.contains (t.map Affect.flip)) = true ∧ generated.length = 6 := by decide

/-- turning and flipping together has order exactly 6, so the 6-element group is cyclic: ℤ/3 × ℤ/2 ≅ ℤ/6, and
    the lens is abelian, not the triangle's dihedral symmetry -/
theorem affect_group_cyclic : (∀ a : Affect, iter (fun b => (Affect.turn b).flip) 6 a = a) ∧ (List.range 5).all (fun k => states.map (iter (fun b => (Affect.turn b).flip) (k + 1)) != states) = true := by decide
