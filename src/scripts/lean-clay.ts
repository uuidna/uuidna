#!/usr/bin/env node
// Automate the Lean layer for THE SEVEN MILLENNIUM PROBLEMS — as ordinary theorems, with no special treatment.
// The wing that stood here proved dz k = 10 − k and dz (dz k) = k, single points of an involution DivByZero
// already seals for every digit, with the problem living in the KEY. This one states, for each problem, a FINITE
// instance drawn from that problem's own mathematics: a counting argument, a bound, a character sum. Every fact
// is computed in JS, generated as `by decide`, and verified sorry-free — the same pipeline as every other wing.
//
// WHAT THE NAMES MAY SAY. A decided window is not the problem: Infinity.lean seals that a predicate can hold on
// every element of a window and fail at the very next value. So each key names the INSTANCE it decides — the
// counting, the bound, the window — and never the conjecture. uuidna solves none of the seven, and nothing here
// claims otherwise, because nothing here is named as though it did.
import { emit, range } from './lean-gen.js'
import { CLAY_INVOLUTION_CITE, CLAY_INVOLUTION_DOI } from '../clay-involution.js'

const R = range

// ── P vs NP — the counting argument, at two bits. Of the 16 boolean functions on 2 inputs, exactly 4 are a
//    single conjunction of literals (their truth table has exactly one satisfying row). Expressive power is
//    counted, not asserted: a class of size 4 cannot cover 16.
const popcount = (t: number): number => R(4).filter((i) => (t >> i) & 1).length

// ── Riemann — Mertens. M(n) = Σ μ(k), and |M(n)| ≤ √n was CONJECTURED for all n and is false (Odlyzko–te Riele,
//    1985). It holds on this window, which is exactly the honest shape: decided here, not beyond.
const mu = (n: number): number => {
  let m = n, primes = 0
  for (let p = 2; p * p <= m; p++) if (m % p === 0) { m /= p; primes++; if (m % p === 0) return 0 }
  if (m > 1) primes++
  return primes % 2 === 0 ? 1 : -1
}
const mertens = (n: number): number => R(n).reduce((a, k) => a + mu(k + 1), 0)
const MERT = R(20).map((i) => mertens(i + 1))

// ── Birch–Swinnerton-Dyer — point counting. #E(F_p) on y² = x³ + 1, and Hasse's bound (p + 1 − N)² ≤ 4p, which
//    is a theorem (Hasse, 1936) and decidable at each p by counting.
const countE = (p: number): number => {
  let n = 1 // the point at infinity
  for (let x = 0; x < p; x++) for (let y = 0; y < p; y++) if ((y * y - x * x * x - 1) % p === 0) n++
  return n
}
const PS = [5, 7, 11, 13]

// ── Poincaré — the 3-sphere as the boundary of the 4-simplex: 5 vertices, 10 edges, 10 faces, 5 cells, χ = 0.
// ── Yang–Mills — the SU(2) structure constants are the Levi-Civita symbol: of 27 index triples, 6 are non-zero.
const eps = (i: number, j: number, k: number): number =>
  (i === j || j === k || i === k) ? 0 : ((j - i) * (k - j) * (k - i) > 0 ? 1 : -1)
const NONZERO = R(3).flatMap((i) => R(3).flatMap((j) => R(3).map((k) => eps(i, j, k)))).filter((e) => e !== 0)

// ── Navier–Stokes — discrete incompressibility: a divergence computed by differences over a closed grid
//    telescopes to zero, so the discrete field is divergence-free by construction, at this size.
const FIELD = R(4).map((i) => R(4).map((j) => (i * 3 + j * 5) % 7))
const divSum = FIELD.flatMap((row, i) => row.map((_, j) => FIELD[i]![(j + 1) % 4]! - FIELD[i]![j]!)).reduce((a, b) => a + b, 0)

// ── Hodge — the alternating sum of Betti numbers IS the Euler characteristic, on a complex where both are known:
//    the 2-torus, b = [1, 2, 1], χ = 1 − 2 + 1 = 0.
const BETTI = [1, 2, 1]

const FACTS = [
  { key: 'two_bit_conjunctions_are_four_of_sixteen',
    why: 'P vs NP, the counting argument at two bits: there are 16 boolean functions on two inputs, and exactly 4 are a single conjunction of literals — the ones whose truth table has exactly one satisfying row. A class of size 4 cannot cover 16, so expressive power is COUNTED here rather than asserted. This decides the instance, never the conjecture.',
    js: () => R(16).filter((t) => popcount(t) === 1).length === 4 && 2 ** (2 ** 2) === 16,
    lean: 'theorem two_bit_conjunctions_are_four_of_sixteen : ((List.range 16).filter (fun t => ((List.range 4).filter (fun i => (t / (2^i)) % 2 == 1)).length == 1)).length = 4 ∧ (2^(2^2) = 16) := by decide' },

  { key: 'mertens_squared_under_n_on_the_first_twenty',
    why: `Riemann, through Mertens: M(n) = Σ μ(k), and |M(n)| ≤ √n — stated squared to stay in exact integers — holds for every n through 20. It was conjectured for ALL n and is FALSE (Odlyzko–te Riele, 1985), which is why the key names the window and not the conjecture: a predicate can hold on every element of a window and fail at the next.`,
    js: () => R(20).every((i) => mertens(i + 1) ** 2 <= i + 1),
    lean: `theorem mertens_squared_under_n_on_the_first_twenty : ((${JSON.stringify(MERT.map((m, i) => [m * m, i + 1])).replace(/\[/g, '(').replace(/\]/g, ')').replace(/^\(/, '[').replace(/\)$/, ']')} : List (Nat \u00d7 Nat)).all (fun q => q.1 \u2264 q.2)) = true := by decide` },

  { key: 'hasse_bound_holds_at_four_primes',
    why: `Birch–Swinnerton-Dyer, through point counting: #E(F_p) on y² = x³ + 1, counted exhaustively at p = 5, 7, 11, 13, and Hasse's bound (p + 1 − N)² ≤ 4p at each. Hasse's theorem is proven mathematics; the counts here are decided, and the rank the conjecture is about is not touched.`,
    js: () => R(PS.length).every((i) => (PS[i]! + 1 - countE(PS[i]!)) ** 2 <= 4 * PS[i]!),
    lean: `theorem hasse_bound_holds_at_four_primes : ((${JSON.stringify(PS.map((p) => [(p + 1 - countE(p)) ** 2, p])).replace(/\[/g, '(').replace(/\]/g, ')').replace(/^\(/, '[').replace(/\)$/, ']')} : List (Nat \u00d7 Nat)).all (fun q => q.1 \u2264 4 * q.2)) = true := by decide` },

  { key: 'four_simplex_boundary_euler_is_zero',
    why: 'Poincaré, as combinatorics: the boundary of the 4-simplex triangulates the 3-sphere with 5 vertices, 10 edges, 10 faces and 5 cells, so χ = 5 − 10 + 10 − 5 = 0 — the Euler characteristic every closed odd-dimensional manifold has. The conjecture (proved by Perelman, 2003) is not this; this is the arithmetic of one triangulation.',
    js: () => R(4).reduce((a, i) => a + (i % 2 === 0 ? [5, 10, 10, 5][i]! : -[5, 10, 10, 5][i]!), 0) === 0,
    lean: 'theorem four_simplex_boundary_euler_is_zero : ((5:Int) - 10 + 10 - 5 = 0) ∧ (([5,10,10,5] : List Int).length = 4) := by decide' },

  { key: 'levi_civita_nonzero_on_six_of_twentyseven',
    why: `Yang–Mills, through its structure constants: SU(2)'s are the Levi-Civita symbol, and of the 27 index triples exactly 6 are non-zero — the permutations — with 3 even and 3 odd. Walked exhaustively. The mass gap is a statement about the quantum field theory and is not touched by counting its algebra's constants.`,
    js: () => R(3).flatMap((i) => R(3).flatMap((j) => R(3).map((k) => eps(i, j, k)))).filter((e) => e !== 0).length === 6,
    lean: 'theorem levi_civita_nonzero_on_six_of_twentyseven : (((List.range 3).flatMap (fun i => (List.range 3).flatMap (fun j => (List.range 3).map (fun k => if i == j || j == k || i == k then 0 else 1)))).filter (fun e => e == 1)).length = 6 := by decide' },

  { key: 'closed_grid_differences_sum_to_zero',
    why: 'Navier–Stokes, through discrete incompressibility: differences taken around a closed ring telescope, so the discrete divergence of this 4×4 field sums to zero exactly — by construction, in integers, with no floating point anywhere. Existence and smoothness for the continuous equations is a different kind of statement, and this decides only the grid.',
    js: () => R(4).flatMap((i) => R(4).map((j) => FIELD[i]![(j + 1) % 4]! - FIELD[i]![j]!)).reduce((a, b) => a + b, 0) === 0,
    lean: 'theorem closed_grid_differences_sum_to_zero : ((List.range 4).flatMap (fun i => (List.range 4).map (fun j => ((i*3 + ((j+1) % 4)*5) % 7)))).sum = ((List.range 4).flatMap (fun i => (List.range 4).map (fun j => ((i*3 + j*5) % 7)))).sum := by decide' },

  { key: 'torus_betti_alternates_to_zero',
    why: 'Hodge, through the invariant both sides must agree on: the alternating sum of Betti numbers IS the Euler characteristic, and on the 2-torus b = [1, 2, 1] gives 1 − 2 + 1 = 0. The conjecture concerns which cohomology classes are algebraic; this decides the bookkeeping those classes are counted by.',
    js: () => R(3).reduce((a, i) => a + (i % 2 === 0 ? BETTI[i]! : -BETTI[i]!), 0) === 0,
    lean: 'theorem torus_betti_alternates_to_zero : ((1:Int) - 2 + 1 = 0) ∧ (([1,2,1] : List Int).length = 3) := by decide' },
]

emit({ file: 'Clay.lean', skill: 'clay',
  header: 'THE SEVEN MILLENNIUM PROBLEMS — one FINITE instance each, drawn from that problem’s own mathematics and decided here. A decided window is not the conjecture: each key names the instance, never the problem. ' + CLAY_INVOLUTION_CITE + ` Cite DOI ${CLAY_INVOLUTION_DOI}; live surface https://uuidna.com/articles/clay.`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
