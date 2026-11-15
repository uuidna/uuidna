#!/usr/bin/env node
// Automate the Lean layer for the AFFECT TRINITY — feeling, thought and emotion as three corners a turn carries
// round, valence as a flip that acts on every corner at once. The carriers are finite inductives, so every
// universal is decided by checking each constructor; the group the turn and the flip generate is computed in Lean as
// the closure of the identity under both, and its size is read off that closure. Each fact's JS mirror re-decides it
// by walking src/affect-trinity.ts, the module the design matrix draws the trinity from, so the picture on the site
// and the theorem it cites read one source.
import { emit } from './lean-gen.js'
import { CORNERS, VALENCES, trinity, turn, back, flip, onCorner, onValence, states, pow, orderOn, fixedOn, commutes, generated, observer, coordOf } from '../affect-trinity.js'

const T = trinity()
const O = observer()
const eqN = (a: number, b: number): boolean => a === b
const LAZARUS = 'Lazarus 1991, doi 10.1037/0003-066X.46.8.819'
const SCHERER = 'Scherer 2009, doi 10.1080/02699930902928969'
const BARRETT = 'Barrett 2017, doi 10.1093/scan/nsw154'
const RUSSELL = 'Russell 1980, doi 10.1037/h0077714'
const [FEELING, THOUGHT, EMOTION] = CORNERS
const [PLEASANT, UNPLEASANT] = VALENCES
const ctor = (c: number): string => '.' + CORNERS[c]
const vtor = (v: number): string => '.' + VALENCES[v]
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const sup = (n: number): string => [...String(n)].map((d) => SUP[Number(d)]).join('')
const Z = `ℤ/${T.turnOrder} × ℤ/${T.flipOrder}`
const nontrivial = [...Array(T.turnOrder - 1).keys()].map((k) => k + 1)
const turned = (k: number, x: string): string => (k === 0 ? x : 'Corner.turn ' + (k > 1 ? '(' + turned(k - 1, x) + ')' : x))

const DEFS = `/-- a corner of the lens: ${FEELING}, the body's raw affect signal; ${THOUGHT}, the appraisal that reads it; ${EMOTION}, the whole episode, affect joined to a concept -/
inductive Corner where
  | ${CORNERS.join(' | ')}
deriving DecidableEq

/-- valence, the ${PLEASANT}–${UNPLEASANT} axis every corner carries (${RUSSELL}) -/
inductive Valence where
  | ${VALENCES.join(' | ')}
deriving DecidableEq

/-- a state of the lens: one corner carrying one valence -/
structure Affect where
  corner : Corner
  valence : Valence
deriving DecidableEq

/-- a property holds of every corner exactly when it holds of the ${T.corners}, so a universal over corners decides by checking each -/
instance (P : Corner → Prop) [DecidablePred P] : Decidable (∀ c, P c) :=
  decidable_of_iff (${CORNERS.map((c) => 'P .' + c).join(' ∧ ')})
    ⟨fun ⟨${CORNERS.map((_, i) => 'h' + i).join(', ')}⟩ x => by cases x <;> assumption, fun h => ⟨${CORNERS.map(() => 'h _').join(', ')}⟩⟩

/-- the same for the ${T.valences} valences -/
instance (P : Valence → Prop) [DecidablePred P] : Decidable (∀ v, P v) :=
  decidable_of_iff (${VALENCES.map((v) => 'P .' + v).join(' ∧ ')})
    ⟨fun ⟨${VALENCES.map((_, i) => 'h' + i).join(', ')}⟩ x => by cases x <;> assumption, fun h => ⟨${VALENCES.map(() => 'h _').join(', ')}⟩⟩

/-- and for the states: every corner with every valence -/
instance (P : Affect → Prop) [DecidablePred P] : Decidable (∀ a, P a) :=
  decidable_of_iff (∀ c, ∀ v, P ⟨c, v⟩) ⟨fun h a => by cases a; exact h _ _, fun h _ _ => h _⟩

/-- ρ, the turn: ${CORNERS.map((c) => c).join(' → ')} → ${FEELING}, each corner ${T.step}° from the next -/
def Corner.turn : Corner → Corner
${CORNERS.map((_, i) => `  | ${ctor(i)} => ${ctor(turn(i))}`).join('\n')}

/-- ρ⁻¹, the loop run backward -/
def Corner.back : Corner → Corner
${CORNERS.map((_, i) => `  | ${ctor(i)} => ${ctor(back(i))}`).join('\n')}

/-- σ, the valence flip -/
def Valence.flip : Valence → Valence
${VALENCES.map((_, i) => `  | ${vtor(i)} => ${vtor(flip(i))}`).join('\n')}

/-- the turn and the flip lifted to the states: each moves its own coordinate and leaves the other -/
def Affect.turn (a : Affect) : Affect := ⟨a.corner.turn, a.valence⟩
def Affect.flip (a : Affect) : Affect := ⟨a.corner, a.valence.flip⟩

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
${CORNERS.map((_, i) => `  | ${ctor(i)} => (${coordOf(i)[0]}, ${coordOf(i)[1]})`).join('\n')}

/-- the lattice points within ${O.radius} of the centre on both coordinates -/
def span : List Int := (List.range ${2 * O.radius + 1}).map (fun i => Int.ofNat i - ${O.radius})
def box : List (Int × Int) := span.flatMap (fun a => span.map (fun b => (a, b)))

/-- f applied n times -/
def iter {α : Type} (f : α → α) : Nat → α → α
  | 0, a => a
  | n + 1, a => iter f n (f a)

/-- the ${T.states} states, listed -/
def states : List Affect := [${states().map((a) => `⟨${ctor(a.corner)}, ${vtor(a.valence)}⟩`).join(', ')}]

/-- one round of the closure: every table reached so far, carried by the turn and by the flip, kept if new -/
def grow (seen : List (List Affect)) : List (List Affect) :=
  seen.foldl (fun acc t => [t.map Affect.turn, t.map Affect.flip].foldl (fun acc' u => if acc'.contains u then acc' else acc' ++ [u]) acc) seen

/-- the group the turn and the flip generate, as action tables on the states: the identity grown ${T.groupRounds} rounds -/
def generated : List (List Affect) := iter grow ${T.groupRounds} [states]`

const all = <T>(xs: readonly T[], p: (x: T) => boolean): boolean => xs.every(p)
const turnA = onCorner(turn)
const flipA = onValence(flip)
const group = generated([turnA, flipA])

const FACTS = [
  { key: 'affect_loop_order', why: `the loop runs ${FEELING} → ${THOUGHT} → ${EMOTION} → ${FEELING}: a ${FEELING}, the body's raw affect signal, is read by a ${THOUGHT}, the appraisal (${LAZARUS}; ${SCHERER}), and the reading completes an ${EMOTION}, the whole episode of affect joined to a concept (${BARRETT}), which is felt again`,
    js: () => turn(0) === 1 && turn(1) === 2 && turn(2) === 0,
    lean: `theorem affect_loop_order : ${CORNERS.map((_, i) => `Corner.turn ${ctor(i)} = ${ctor(turn(i))}`).join(' ∧ ')} := by decide` },
  { key: 'affect_turn_closes', why: `${T.turnOrder} turns of ${T.step}° return every corner to itself: ρ${sup(T.turnOrder)} = id, so the loop closes`,
    js: () => T.turnOrder === CORNERS.length && all(CORNERS.map((_, i) => i), (c) => pow(turn, T.turnOrder)(c) === c),
    lean: `theorem affect_turn_closes : ∀ c : Corner, ${turned(T.turnOrder, "c")} = c := by decide` },
  { key: 'affect_turn_fixes_no_corner', why: `no turn short of a full loop (ρ${nontrivial.map(sup).join(", ρ")}) leaves any corner where it was: the observer is the axis the loop turns around, not a fourth corner it lands on`,
    js: () => T.turnFixed === 0 && fixedOn(turn, [0, 1, 2], eqN).length === 0,
    lean: `theorem affect_turn_fixes_no_corner : ∀ c : Corner, ${nontrivial.map((k) => turned(k, "c") + " ≠ c").join(" ∧ ")} := by decide` },
  { key: 'affect_observer_fixed_point', why: `the observer is the fixed point of the turn, not a corner: on the drawn lens the turn moves every corner and leaves only the centre where it is; in the plane, with the corners at 1, ω and ω² in Eisenstein coordinates and the turn multiplication by ω, the corners follow the loop and sum to the centre (1 + ω + ω² = 0), and of the ${O.points} lattice points within ${O.radius} of the centre the rotation fixes exactly one, the centre`,
    js: () => O.centreOnly && O.cornersFollowTurn && O.closes && O.centroid[0] === 0 && O.centroid[1] === 0,
    lean: `theorem affect_observer_fixed_point : (∀ p : Point, Point.turn p = p ↔ p = .centre) ∧ (∀ c : Corner, rot (coord c) = coord (Corner.turn c)) ∧ (${CORNERS.map((c) => '(coord .' + c + ').1').join(' + ')} = 0 ∧ ${CORNERS.map((c) => '(coord .' + c + ').2').join(' + ')} = 0) ∧ box.all (fun p => (rot p == p) == (p == (0, 0))) = true ∧ box.length = ${O.points} := by decide +kernel` },
  { key: 'affect_turn_back', why: `the loop also runs backward: ρ⁻¹ undoes the turn on either side, and running back once is turning forward ${T.turnOrder - 1} times, ρ⁻¹ = ρ${sup(T.turnOrder - 1)}`,
    js: () => T.backIsInverse,
    lean: `theorem affect_turn_back : ∀ c : Corner, Corner.back (Corner.turn c) = c ∧ Corner.turn (Corner.back c) = c ∧ Corner.back c = ${turned(T.turnOrder - 1, "c")} := by decide` },
  { key: 'affect_flip_involution', why: `the valence flip, ${PLEASANT} ↔ ${UNPLEASANT} (${RUSSELL}), undone by itself and fixing neither valence: σ${sup(T.flipOrder)} = id`,
    js: () => T.flipOrder === VALENCES.length && T.flipFixed === 0 && orderOn(flip, [0, 1], eqN) === 2,
    lean: 'theorem affect_flip_involution : ∀ v : Valence, Valence.flip (Valence.flip v) = v ∧ Valence.flip v ≠ v := by decide' },
  { key: 'affect_flip_commutes_turn', why: 'the valence flip acts on every corner at once, leaving each corner where it is, and commutes with the turn: σρ = ρσ on every state',
    js: () => T.commutes && T.flipKeepsCorner && commutes(turnA, flipA),
    lean: 'theorem affect_flip_commutes_turn : ∀ a : Affect, (Affect.turn a).flip = (Affect.flip a).turn ∧ (Affect.flip a).corner = a.corner := by decide' },
  { key: 'affect_group_order_six', why: `the turn and the flip generate a group of exactly ${T.groupOrder} elements, ${T.turnOrder} turns times ${T.flipOrder} flips (${Z}): the closure of the identity under both holds the identity, is closed under each generator, and has ${T.groupOrder} action tables on the ${T.states} states`,
    js: () => T.groupClosed && T.groupOrder === T.turnOrder * T.flipOrder && group.tables.length === T.groupOrder && T.states === CORNERS.length * VALENCES.length,
    lean: `theorem affect_group_order_six : (∀ a : Affect, states.contains a = true) ∧ generated.contains states = true ∧ generated.all (fun t => generated.contains (t.map Affect.turn) && generated.contains (t.map Affect.flip)) = true ∧ generated.length = ${T.groupOrder} := by decide` },
  { key: 'affect_group_cyclic', why: `turning and flipping together has order exactly ${T.twistOrder}, so the ${T.groupOrder}-element group is cyclic: ${Z} ≅ ℤ/${T.groupOrder}, and the lens is abelian, not the triangle's dihedral symmetry`,
    js: () => T.twistOrder === T.groupOrder,
    lean: `theorem affect_group_cyclic : (∀ a : Affect, iter (fun b => (Affect.turn b).flip) ${T.twistOrder} a = a) ∧ (List.range ${T.twistOrder - 1}).all (fun k => states.map (iter (fun b => (Affect.turn b).flip) (k + 1)) != states) = true := by decide` },
]

emit({ file: 'AffectTrinity.lean', skill: 'neuro', defs: DEFS,
  header: `THE AFFECT TRINITY — ${FEELING}, ${THOUGHT} and ${EMOTION} as ${T.corners} corners a turn carries round, ${T.step}° apart, with valence a flip on every corner at once; together a ${T.groupOrder}-element cyclic group. Honest scope, which no theorem here closes: the algebra is exact for the model; whether experience divides into three, and whether a mixed state (bittersweet) breaks the loop, is an open empirical question — a lens, not a proven law of mind.`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
