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

/-- arousal, the calm–charged axis of the body's signal -/
inductive Arousal where
  | calm | charged
deriving DecidableEq

/-- the same decision for the 2 arousals -/
instance (P : Arousal → Prop) [DecidablePred P] : Decidable (∀ x, P x) :=
  decidable_of_iff (P .calm ∧ P .charged)
    ⟨fun ⟨h0, h1⟩ x => by cases x <;> assumption, fun h => ⟨h _, h _⟩⟩

/-- a feeling, the body's raw affect signal: core affect, one valence and one arousal (Russell 2003, doi 10.1037/0033-295X.110.1.145) -/
structure Feel where
  valence : Valence
  arousal : Arousal
deriving DecidableEq

/-- a property holds of every feeling exactly when it holds of every valence with every arousal -/
instance (P : Feel → Prop) [DecidablePred P] : Decidable (∀ f, P f) :=
  decidable_of_iff (∀ v, ∀ a, P ⟨v, a⟩) ⟨fun h f => by cases f; exact h _ _, fun h _ _ => h _⟩

/-- an episode: the corner it stands at, and the feeling it began from -/
structure Episode where
  corner : Corner
  feel : Feel
deriving DecidableEq

/-- a property holds of every episode exactly when it holds of every corner with every feeling -/
instance (P : Episode → Prop) [DecidablePred P] : Decidable (∀ e, P e) :=
  decidable_of_iff (∀ c, ∀ f, P ⟨c, f⟩) ⟨fun h e => by cases e; exact h _ _, fun h _ _ => h _⟩

/-- feel f: the episode a feeling begins, standing at the feeling corner -/
def feel (f : Feel) : Episode := ⟨.feeling, f⟩

/-- the turn on episodes carries the feeling to the next corner; the valence flip turns the feeling's valence and keeps its arousal and corner -/
def Episode.turn (e : Episode) : Episode := ⟨e.corner.turn, e.feel⟩
def Episode.flip (e : Episode) : Episode := ⟨e.corner, ⟨e.feel.valence.flip, e.feel.arousal⟩⟩

/-- the 4 feelings, listed -/
def feels : List Feel := [⟨.pleasant, .calm⟩, ⟨.pleasant, .charged⟩, ⟨.unpleasant, .calm⟩, ⟨.unpleasant, .charged⟩]

/-- a point of the drawn lens: one of the corners, or the centre they turn around -/
inductive Point where
  | corner (c : Corner)
  | centre
deriving DecidableEq

/-- a property holds of every point exactly when it holds of every corner and of the centre -/
instance (P : Point → Prop) [DecidablePred P] : Decidable (∀ p, P p) :=
  decidable_of_iff ((∀ c, P (.corner c)) ∧ P .centre)
    ⟨fun ⟨h, h'⟩ p => by cases p <;> first | exact h _ | exact h', fun h => ⟨fun _ => h _, h _⟩⟩

/-- the turn on points: each corner to the next, the centre to itself -/
def Point.turn : Point → Point
  | .corner c => .corner c.turn
  | .centre => .centre

/-- the plane in Eisenstein coordinates: (a, b) is a + bω, ω a primitive cube root of unity; the turn is multiplication by ω, exact on integers -/
def rot (p : Int × Int) : Int × Int := (-p.2, p.1 - p.2)

/-- each corner drawn at ω to the power of its place in the loop -/
def coord : Corner → Int × Int
  | .feeling => (1, 0)
  | .thought => (0, 1)
  | .emotion => (-1, -1)

/-- the lattice points within 3 of the centre on both coordinates -/
def span : List Int := (List.range 7).map (fun i => Int.ofNat i - 3)
def box : List (Int × Int) := span.flatMap (fun a => span.map (fun b => (a, b)))

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

/-- the observer is the fixed point of the turn, not a corner: on the drawn lens the turn moves every corner and
    leaves only the centre where it is; in the plane, with the corners at 1, ω and ω² in Eisenstein coordinates
    and the turn multiplication by ω, the corners follow the loop and sum to the centre (1 + ω + ω² = 0), and of
    the 49 lattice points within 3 of the centre the rotation fixes exactly one, the centre -/
theorem affect_observer_fixed_point : (∀ p : Point, Point.turn p = p ↔ p = .centre) ∧ (∀ c : Corner, rot (coord c) = coord (Corner.turn c)) ∧ ((coord .feeling).1 + (coord .thought).1 + (coord .emotion).1 = 0 ∧ (coord .feeling).2 + (coord .thought).2 + (coord .emotion).2 = 0) ∧ box.all (fun p => (rot p == p) == (p == (0, 0))) = true ∧ box.length = 49 := by decide +kernel

/-- feel is defined: a feeling is exactly one valence and one arousal, core affect (Russell 2003, doi
    10.1037/0033-295X.110.1.145), so there are 4 feelings, 2 valences by 2 arousals, and feel f is the episode
    that feeling begins at the feeling corner -/
theorem affect_feel_defined : (∀ f : Feel, feels.contains f = true) ∧ feels.length = 4 ∧ (∀ f : Feel, (feel f).corner = .feeling ∧ (feel f).feel = f) := by decide

/-- what a feeling turns into: feel f, turned, is a thought reading the same feeling, turned again an emotion
    completing it, and turned 3 times it is the feeling again -/
theorem affect_feel_turns_into : ∀ f : Feel, Episode.turn (feel f) = ⟨.thought, f⟩ ∧ Episode.turn (Episode.turn (feel f)) = ⟨.emotion, f⟩ ∧ Episode.turn (Episode.turn (Episode.turn (feel f))) = feel f := by decide

/-- the turn carries the feeling and loses none of it: two feelings that are the same after the turn were the
    same feeling -/
theorem affect_feel_carried : ∀ f : Feel, ∀ g : Feel, Episode.turn (feel f) = Episode.turn (feel g) → f = g := by decide

/-- flipping a feeling's valence keeps its arousal and its corner, undoes itself, and commutes with the turn on
    every episode -/
theorem affect_feel_flip : ∀ e : Episode, (Episode.turn e).flip = Episode.turn (Episode.flip e) ∧ Episode.flip (Episode.flip e) = e ∧ (Episode.flip e).feel.arousal = e.feel.arousal ∧ (Episode.flip e).corner = e.corner := by decide

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
