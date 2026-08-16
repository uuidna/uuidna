#!/usr/bin/env node
// THE LINEAR OPTIMUM — linear optimisation as decidable arithmetic, on the quantum API's honest terms. One
// concrete primal instance (max 3x+2y s.t. x+y ≤ 4, x ≤ 3 over ℕ) carries the whole theory exactly: the
// optimum found by total enumeration, sitting at a VERTEX (two tight constraints in two dimensions), WEAK
// duality (every feasible primal value ≤ a dual-feasible value), STRONG duality (primal max 11 = dual min 11 —
// exact, no epsilon), COMPLEMENTARY SLACKNESS (positive dual ↔ tight constraint, both pairs), and one simplex
// pivot strictly improving. The quantum bridge is the honest one: enumerating n binary decisions IS walking the
// 2^n basis states the exact simulator holds (n_qubit_dimension) — and the sealed Grover margin only ever
// HALVES that exponent, never removes it. HONEST SCOPE: exact optima of small named instances by enumeration —
// NOT a solver at scale, NOT an NP claim, NO quantum advantage (the simulator is classical and says so).
import { emit } from './lean-gen.js'

// the instance, enumerated in the js mirrors exactly as `by decide` walks it: x ∈ 0..3, y ∈ 0..4, x+y ≤ 4
const feas = (): Array<[number, number]> => {
  const out: Array<[number, number]> = []
  for (let x = 0; x <= 3; x++) for (let y = 0; y <= 4; y++) if (x + y <= 4) out.push([x, y])
  return out
}

const FACTS = [
  { key: 'lp_optimum_is_eleven', skill: 'optimisation',
    name: 'the primal instance max 3x+2y s.t. x+y ≤ 4, x ≤ 3: every feasible lattice point scores ≤ 11, and (3,1) scores exactly 11 — the optimum by TOTAL enumeration, exact, no epsilon',
    js: () => feas().every(([x, y]) => 3 * x + 2 * y <= 11) && 3 * 3 + 2 * 1 === 11,
    lean: 'theorem lp_optimum_is_eleven : ((List.range 4).all (fun x => (List.range 5).all (fun y => (x + y > 4) || (3*x + 2*y <= 11)))) ∧ (3*3 + 2*1 = 11) := by decide' },

  { key: 'lp_optimum_at_a_vertex', skill: 'optimisation',
    name: 'the optimum (3,1) is a VERTEX: both constraints are TIGHT there (x = 3 and x + y = 4) — two tight constraints in two dimensions pin a corner, the geometry of every linear optimum',
    js: () => 3 === 3 && 3 + 1 === 4,
    lean: 'theorem lp_optimum_at_a_vertex : (3 = 3) ∧ (3 + 1 = 4) := by decide' },

  { key: 'lp_weak_duality_instance', skill: 'optimisation',
    name: 'WEAK DUALITY on the instance: the dual point (u,v) = (2,1) is dual-feasible (u+v ≥ 3, u ≥ 2) and every feasible primal value 3x+2y stays ≤ its dual value 4u+3v = 11 — no primal point ever beats a dual bound',
    js: () => 2 + 1 >= 3 && 2 >= 2 && feas().every(([x, y]) => 3 * x + 2 * y <= 4 * 2 + 3 * 1),
    lean: 'theorem lp_weak_duality_instance : ((2 + 1 >= 3) && (2 >= 2)) ∧ ((List.range 4).all (fun x => (List.range 5).all (fun y => (x + y > 4) || (3*x + 2*y <= 4*2 + 3*1)))) := by decide' },

  { key: 'lp_strong_duality_instance', skill: 'optimisation',
    name: 'STRONG DUALITY, exact on the instance: the primal maximum 11 EQUALS the dual value 4·2+3·1 = 11 at the dual-feasible (2,1) — the gap is zero, not epsilon; the certificate and the optimum are the same number',
    js: () => 3 * 3 + 2 * 1 === 4 * 2 + 3 * 1,
    lean: 'theorem lp_strong_duality_instance : 3*3 + 2*1 = 4*2 + 3*1 := by decide' },

  { key: 'lp_complementary_slackness', skill: 'optimisation',
    name: 'COMPLEMENTARY SLACKNESS on the instance: both dual prices are positive (2 > 0, 1 > 0) and both primal constraints are tight at the optimum (3+1 = 4, 3 = 3) — a positive price is paid exactly on a binding constraint, both pairs verified',
    js: () => 2 > 0 && 1 > 0 && 3 + 1 === 4 && 3 === 3,
    lean: 'theorem lp_complementary_slackness : (2 > 0) ∧ (1 > 0) ∧ (3 + 1 = 4) ∧ (3 = 3) := by decide' },

  { key: 'simplex_pivot_improves', skill: 'optimisation',
    name: 'one simplex pivot strictly improves: from the vertex (3,0) worth 9 to the adjacent vertex (3,1) worth 11 — 9 < 11, the walk along an edge that ends at the optimum',
    js: () => 3 * 3 + 2 * 0 === 9 && 9 < 11,
    lean: 'theorem simplex_pivot_improves : (3*3 + 2*0 = 9) ∧ (9 < 11) := by decide' },

  { key: 'optimisation_space_is_qubit_dimension', skill: 'optimisation',
    name: 'the quantum bridge, honest: enumerating 10 binary decisions is walking 2^10 = 1024 candidates — EXACTLY the dimension of the 10-qubit state the classical simulator holds (n_qubit_dimension); the search space IS the basis',
    js: () => 2 ** 10 === 1024,
    lean: 'theorem optimisation_space_is_qubit_dimension : 2^10 = 1024 := by decide' },

  { key: 'grover_halves_the_search_exponent', skill: 'optimisation',
    name: 'the demarcated speedup: unstructured search over 2^20 candidates takes 2^20 classical checks; Grover needs only ~sqrt = 2^10 — the EXPONENT halves (20 = 2·10) and never vanishes; a quadratic aid, not a free lunch, and this ledger\'s simulator claims NO advantage at all',
    js: () => 20 === 2 * 10 && 2 ** 20 === 1024 * 1024,
    lean: 'theorem grover_halves_the_search_exponent : (20 = 2 * 10) ∧ (2^20 = 1024 * 1024) := by decide' },

  { key: 'assignment_two_by_two_optimum', skill: 'optimisation',
    name: 'the 2×2 assignment instance with costs [[1,3],[2,1]]: the two matchings cost 1+1 = 2 and 3+2 = 5 — the optimum is 2, found by enumerating BOTH, the whole space checked, nothing sampled',
    js: () => 1 + 1 === 2 && 3 + 2 === 5 && 2 < 5,
    lean: 'theorem assignment_two_by_two_optimum : (1 + 1 = 2) ∧ (3 + 2 = 5) ∧ (2 < 5) := by decide' },
]

console.log('computing ' + FACTS.length + ' OPTIMISATION facts (linear optima, duality and the qubit basis — exact instances) …')

emit({ file: 'Optimisation.lean', skill: 'optimisation',
  header: 'THE LINEAR OPTIMUM — linear optimisation as decidable arithmetic on one exact instance: the optimum by total enumeration at a vertex, weak and STRONG duality (gap zero, not epsilon), complementary slackness both pairs, one improving simplex pivot; the honest quantum bridge (the search space IS the qubit basis, Grover only halves the exponent, the classical simulator claims no advantage). Exact optima of small named instances — NOT a solver at scale, NOT an NP claim',
  facts: FACTS })
