#!/usr/bin/env node
// Automate the Lean layer for THE SELF-MODEL — no system's states map onto every predicate on its states, so no
// system holds a complete model of itself: Cantor's diagonal in the form Lawvere gave it. Two of the facts are
// universal (any type of states at all), proved by the kernel from the diagonal; one is decided over every
// self-model of the affect trinity's three corners; and one is Lawvere's corollary that negation on Bool fixes
// nothing. Each fact's JS mirror re-decides it by enumerating src/self-model.ts. This wing is mathematics about
// models; it says nothing about what any mind experiences.
import { emit } from './lean-gen.js'
import { CORNERS } from '../affect-trinity.js'
import { models, escapes, boolFixed, diagonal, represented } from '../self-model.js'

const N = CORNERS.length
const E = escapes(N)
const LAWVERE = 'Lawvere 1969, doi 10.1007/BFb0080769'
const KLEENE = 'Kleene 1938, doi 10.2307/2267778'

const DEFS = `/-- the i-th entry of a row, false past the end; written out because List.getD reaches propext -/
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
def diag (t : List (List Bool)) : List Bool := (List.range t.length).map (fun i => !(bit (rowAt t i) i))`

const FACTS = [
  { key: 'self_model_cantor', why: `no state's predicate is the diagonal one: for any states at all and any map f from states to predicates on states, the predicate i ↦ ¬ f i i differs from f j at j itself — Cantor's diagonal in Lawvere's form (${LAWVERE})`,
    js: () => models(2).every((t) => t.every((row, j) => diagonal(t)[j] !== row[j])),
    lean: 'theorem self_model_cantor : ∀ {α : Type} (f : α → α → Bool) (j : α), (fun i => !(f i i)) ≠ f j := by\n  intro α f j h\n  have h2 := congrFun h j\n  revert h2\n  cases f j j <;> decide' },
  { key: 'self_model_lawvere', why: `so no system's states map onto all predicates on its states: a complete self-model would have to represent the diagonal, and the diagonal escapes every state — there is no complete self-model (${LAWVERE}). Self-reference itself is not refused: Kleene's recursion theorem builds programs that print their own text (${KLEENE}), proved mathematics this wing cites and does not seal`,
    js: () => E.escaped === E.tables,
    lean: 'theorem self_model_lawvere : ∀ {α : Type}, ¬ ∃ e : α → α → Bool, ∀ p : α → Bool, ∃ a, e a = p := by\n  intro α ⟨e, h⟩\n  obtain ⟨a, ha⟩ := h (fun i => !(e i i))\n  exact self_model_cantor e a ha.symm' },
  { key: 'self_model_diagonal_escapes', why: `checked over every self-model of the ${N} corners of the affect trinity (feeling, thought, emotion): in all ${E.tables} tables the diagonal predicate is no row of the table`,
    js: () => E.tables === 2 ** (N * N) && E.escaped === E.tables && models(N).every((t) => !represented(t, diagonal(t))),
    lean: `theorem self_model_diagonal_escapes : (models ${N}).all (fun t => t.all (fun r => r != diag t)) = true ∧ (models ${N}).length = ${E.tables} := by decide +kernel` },
  { key: 'self_model_negation_no_fixed_point', why: 'negation on Bool fixes neither value — Lawvere\'s corollary: an onto self-model would give every map on Bool a fixed point, and this one has none',
    js: () => boolFixed((b) => !b).length === 0,
    lean: 'theorem self_model_negation_no_fixed_point : ∀ b : Bool, (!b) ≠ b := by decide' },
]

emit({ file: 'SelfModel.lean', skill: 'reasoning', defs: DEFS,
  header: `THE SELF-MODEL — no system's states map onto all predicates on its states, so no system holds a complete model of itself (Cantor, Lawvere); checked universally and over every self-model of the affect trinity's ${N} corners. Honest scope: this is mathematics about models. It does not say what consciousness is; global workspace and integrated information are models, not sealed here, and why there is experience at all is an open question, not a theorem.`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
