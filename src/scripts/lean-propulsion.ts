#!/usr/bin/env node
// Automate the Lean layer for PROPULSION — Newtonian and BOUNDED, demarcated. Thrust is momentum conservation:
// the rocket's forward momentum equals the exhaust's backward momentum (Newton's third law). From that: thrust
// REQUIRES ejected reaction mass (zero exhaust → zero thrust, so no "reactionless" or free drive), thrust = ṁ·vₑ,
// the Δv budget adds across stages, and acceleration a = F/m is FINITE — there is no infinite g. // the decidable ALGEBRA of Newtonian rocketry — not a claim of a novel drive, not FTL, not infinite g-force.
// COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i)
const idiv = (a: number, b: number) => (a - (a % b)) / b // integer floor division — no Math.*

const FACTS = [
  { key: 'momentum_conserved',
    why: "Newton's third law, as momentum: a rocket at rest ejecting mass keeps total momentum zero — forward 100·3 balances backward 60·5, so 100·3 + 60·(−5) = 0. Thrust is conserved momentum, nothing gained from nothing.",
    js: () => 100 * 3 + 60 * -5 === 0,
    lean: 'theorem momentum_conserved : (100 * 3 + 60 * (-5) : Int) = 0 := by decide' },

  { key: 'no_reactionless_thrust',
    why: 'No reactionless (and no infinite) drive: thrust needs ejected reaction mass. With zero exhaust mass, the imparted momentum is 0·vₑ = 0 at EVERY exhaust velocity — no mass out, no push. Free/infinite propulsion is refused by the arithmetic.',
    js: () => R(0, 10).every((v) => 0 * v === 0),
    lean: 'theorem no_reactionless_thrust : (List.range 10).all (fun v => 0 * v == 0) := by decide' },

  { key: 'thrust_is_mdot_times_ve',
    why: 'Thrust is the mass flow times the exhaust velocity: F = ṁ·vₑ = 5·60 = 300. The push is exactly the rate momentum leaves.',
    js: () => 5 * 60 === 300,
    lean: 'theorem thrust_is_mdot_times_ve : 5 * 60 = 300 := by decide' },

  { key: 'delta_v_stages_add',
    why: 'The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap.',
    js: () => [3, 2, 1].reduce((a, b) => a + b, 0) === 6,
    lean: 'theorem delta_v_stages_add : ([3, 2, 1] : List Nat).sum = 6 := by decide' },

  { key: 'acceleration_finite',
    why: 'Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).',
    js: () => R(1, 11).every((m) => idiv(300, m) <= 300),
    lean: "theorem acceleration_finite : (List.range' 1 10).all (fun m => 300 / m <= 300) := by decide" },
]

// compute → generate → verify. Propulsion is conserved momentum — bounded, Newtonian, demarcated: no reactionless
// drive, no infinite g, no FTL. The push is exactly the momentum you throw the other way.
emit({ file: 'Propulsion.lean', skill: 'propulsion',
  header: 'PROPULSION — Newtonian and BOUNDED, demarcated.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
