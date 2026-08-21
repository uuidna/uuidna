#!/usr/bin/env node
// Automate the Lean layer for STATICS — the structures domain, as decidable arithmetic, demarcated. A body in
// equilibrium has its forces summing to zero and its moments balancing; a lever trades force for distance
// (mechanical advantage); the centre of mass is the weighted average of positions; a simply-supported beam splits
// a central load evenly; a rigid planar truss obeys Maxwell's rule m = 2j − 3; stress is force over area; and
// Hooke's law is linear. the arithmetic of equilibrium — sums, balances and exact ratios — not a
// full structural-analysis or finite-element derivation. COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'force_equilibrium',
    why: 'A body in equilibrium has its forces summing to zero (ΣF = 0): a 10 N upward support balances 6 N + 4 N of downward load — 10 − 6 − 4 = 0. Nothing accelerates when the forces cancel.',
    js: () => 10 - 6 - 4 === 0,
    lean: 'theorem force_equilibrium : (10 - 6 - 4 : Int) = 0 := by decide' },

  { key: 'moment_balance',
    why: 'Moments balance about a pivot (Στ = 0): a 6 N force at 2 m balances a 4 N force at 3 m — 6·2 = 4·3 = 12 N·m. Torque is force times lever arm, and a seesaw settles when they match.',
    js: () => 6 * 2 === 4 * 3,
    lean: 'theorem moment_balance : 6 * 2 = 4 * 3 := by decide' },

  { key: 'mechanical_advantage',
    why: 'A lever trades force for distance: a 100 N load at 1 m from the pivot is held by only 20 N of effort at 5 m — 100·1 = 20·5, a mechanical advantage of 5. Give up distance, gain force.',
    js: () => 100 * 1 === 20 * 5,
    lean: 'theorem mechanical_advantage : 100 * 1 = 20 * 5 := by decide' },

  { key: 'center_of_mass',
    why: 'The centre of mass is the weighted average of positions: two equal masses at 0 and 10 balance at 5 — 1·0 + 1·10 = 2·5. The system pivots freely about that point.',
    js: () => 1 * 0 + 1 * 10 === 2 * 5,
    lean: 'theorem center_of_mass : 1*0 + 1*10 = 2 * 5 := by decide' },

  { key: 'beam_reactions',
    why: 'A simply-supported beam splits a central load evenly between its two supports: a 100 N load gives each reaction 50 N — 50 + 50 = 100. Symmetry shares the burden.',
    js: () => 50 + 50 === 100,
    lean: 'theorem beam_reactions : 50 + 50 = 100 := by decide' },

  { key: 'truss_maxwell_rule',
    why: "A rigid, statically determinate planar truss obeys Maxwell's rule m = 2j − 3: the simplest one, a triangle, has 3 members and 3 joints — 2·3 − 3 = 3. The triangle is the atom of stable structure.",
    js: () => 2 * 3 - 3 === 3,
    lean: 'theorem truss_maxwell_rule : 2*3 - 3 = 3 := by decide' },

  { key: 'stress_is_force_over_area',
    why: 'Stress is force spread over area (σ = F/A): 100 N over 4 units of area is 25 units of stress — 100 / 4 = 25. The same force on less area bites harder.',
    js: () => 100 / 4 === 25,
    lean: 'theorem stress_is_force_over_area : 100 / 4 = 25 := by decide' },

  { key: 'hookes_law',
    why: 'Hooke\'s law is linear (F = k·x): with stiffness k = 5 the restoring force scales with the stretch — extensions [1,2,3] give forces [5,10,15]. Twice the stretch, twice the pull, within the elastic limit.',
    js: () => JSON.stringify([1, 2, 3].map((x) => 5 * x)) === JSON.stringify([5, 10, 15]),
    lean: 'theorem hookes_law : (([1,2,3] : List Nat).map (fun x => 5 * x)) = [5,10,15] := by decide' },
]

// compute → generate → verify. The structures domain — equilibrium, moments, the lever, centre of mass, beam
// reactions, truss rigidity, stress, Hooke — decidable statics arithmetic, demarcated: not a full FEA derivation.
emit({ file: 'Statics.lean', skill: 'statics',
  header: 'STATICS — the structures domain, as decidable arithmetic, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
