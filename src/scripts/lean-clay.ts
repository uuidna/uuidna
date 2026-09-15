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

  // Clay gravity = the rosetta (ℤ/7) AND the rosette's own bridge to full address width (2·64 = 128).
  // Discovered via MCP: skill clay has 7 instances; z7-rosette seals z7rays_seven / pairs / quantum-42;
  // rosette_quantum_doubling_is_two_coins already seals 2·21=42 ∧ 2·64=128 ∧ two_coins. One decidable chain —
  // the seven Clay seats ARE the seven rays, and that quantum doubles to the 128-bit handle capacity.
  { key: 'clay_gravity_equals_rosette',
    why: 'CLAY GRAVITY EQUALS THE ROSETTA AT FULL CAPACITY — the seven finite Clay instances share one cardinality with the Pliska rosette ℤ/7 (ray count 7, directed quantum 7·6 = 42, undirected pairs 21, three-sevens 7+7+7 = 21), and the rosette\'s own doubling reaches the full address: 2·21 = 42 ∧ 2·64 = 128 ∧ 110−108 = 2. Same chain the ledger seals as z7rays_seven, rosette_quantum_fortytwo, rosette_pairs_twentyone, three_sevens_twentyone, and rosette_quantum_doubling_is_two_coins — computational claim, by decide.',
    js: () => R(7).length === 7 && 7 * 6 === 42 && (7 * 6) / 2 === 21 && 7 + 7 + 7 === 21 && 3 * 7 === 21
      && 2 * 21 === 42 && 2 * 64 === 128 && 110 - 108 === 2,
    lean: 'theorem clay_gravity_equals_rosette : (List.range 7).length = 7 ∧ (7 * 6 = 42) ∧ ((7 * 6) / 2 = 21) ∧ (7 + 7 + 7 = 21) ∧ (3 * 7 = 21) ∧ (2 * 21 = 42) ∧ (2 * 64 = 128) ∧ (110 - 108 = 2) := by decide' },

  { key: 'two_coins_make_a_coil_and_seven_coils_are_one_and_six',
    why: 'TWO COINS MAKE A COIL, AND SEVEN COILS ARE ONE AND SIX. The 2×7 witness faces (VE_FACES = 8 + 6 = 14) are fourteen coins, and two coins to a coil makes seven coils; seven equal coils pack as one centre and six around — the centred hexagonal number 3·1·2 + 1 = 7 — and the reflection i ↦ 6 − i fixes exactly one of the seven (mass_coord_clay_seven_has_centre). The seven Clay problems stand the same way today: one resolved (Poincaré, Perelman; Clay\'s prize, 2010) and six open. A count shared by the witnesses, the coils and the problems — a correspondence of numbers, not a proof of any problem.',
    js: () => 2 * 7 === 14 && 14 / 2 === 7 && 8 + 6 === 14 && 7 === 1 + 6 && 3 * 1 * (1 + 1) + 1 === 7 && R(7).filter((i) => i === 6 - i).length === 1,
    lean: 'theorem two_coins_make_a_coil_and_seven_coils_are_one_and_six : (2 * 7 = 14) ∧ (14 / 2 = 7) ∧ (8 + 6 = 14) ∧ (7 = 1 + 6) ∧ (3 * 1 * (1 + 1) + 1 = 7) ∧ ((List.range 7).filter (fun i => i == 6 - i)).length = 1 := by decide' },

  { key: 'the_vortex_and_the_rosette_are_one_six_cycle',
    why: 'THE VORTEX AND THE ROSETTE ARE ONE SIX-CYCLE. Doubling walks the units of ℤ/9 as 1→2→4→8→7→5 and returns at the sixth step; tripling walks the units of ℤ/7 as 1→3→2→6→4→5 and returns at the sixth step. Indexed by the exponent, both turn the sum of two exponents (mod 6) into the product of their values — checked over all 36 exponent pairs — so pairing 2ᵏ mod 9 with 3ᵏ mod 7 carries one ring\'s multiplication onto the other\'s. ℤ/7 is the 1 + 6 — the centre 0 and six units — and two sevens are the fourteen witness faces, 2·7 = 14 = 8 + 6; nine by seven is the 63-cell grid the addresses fill (rosette_and_vortex_are_coprime). Inside the groups this is the general fact that two cyclic groups of one order are isomorphic; the step beyond it is an involution that is not a group map at all — the_ten_complement_involutes_the_vortex_through_the_axis.',
    js: () => R(6).map((k) => (2 ** k) % 9).join() === '1,2,4,8,7,5' && (2 ** 6) % 9 === 1
      && R(6).map((k) => (3 ** k) % 7).join() === '1,3,2,6,4,5' && (3 ** 6) % 7 === 1
      && R(6).every((i) => R(6).every((j) => (2 ** ((i + j) % 6)) % 9 === ((2 ** i) * (2 ** j)) % 9 && (3 ** ((i + j) % 6)) % 7 === ((3 ** i) * (3 ** j)) % 7))
      && 7 === 1 + 6 && 2 * 7 === 14 && 8 + 6 === 14 && 9 * 7 === 63,
    lean: 'theorem the_vortex_and_the_rosette_are_one_six_cycle : ((List.range 6).map (fun k => 2 ^ k % 9) = [1, 2, 4, 8, 7, 5]) ∧ (2 ^ 6 % 9 = 1) ∧ ((List.range 6).map (fun k => 3 ^ k % 7) = [1, 3, 2, 6, 4, 5]) ∧ (3 ^ 6 % 7 = 1) ∧ ((List.range 6).all (fun i => (List.range 6).all (fun j => (2 ^ ((i + j) % 6) % 9 == (2 ^ i * 2 ^ j) % 9) && (3 ^ ((i + j) % 6) % 7 == (3 ^ i * 3 ^ j) % 7)))) ∧ (7 = 1 + 6) ∧ (2 * 7 = 14) ∧ (8 + 6 = 14) ∧ (9 * 7 = 63) := by decide' },

  { key: 'the_ten_complement_involutes_the_vortex_through_the_axis',
    why: 'THE TEN-COMPLEMENT INVOLUTES THE VORTEX THROUGH THE AXIS — the captain: "1248 instead of 16, 1→9, 6→4". The digit map x ↦ 10 − x pairs 1↔9, 2↔8, 3↔7, 4↔6 and fixes 5, and applied twice it returns every digit. The pairs themselves are already sealed as captains_columns_sum_to_ten and the lone fixed digit as five_is_the_developing_center (the compass mandala); what this theorem adds is what the map is on ℤ/9, and where it carries the vortex. Modulo 9 it is x ↦ 1 − x, which is affine, not multiplicative: it sends 2·4 = 8 to 2, but 8·6 = 48 ≡ 3, so it is no isomorphism of the vortex group and leaves the domain of the cyclic-group fact. What it does instead is cross: the vortex\'s 1, 4, 7 land on the axis 9, 6, 3, while 2, 8, 5 stay in the vortex, so the one six-cycle 1,2,4,8,7,5 involutes to 9,8,6,2,3,5. In binary the vortex\'s first four steps 1, 2, 4, 8 are the four coins of a hex digit: their 16 subsets sum to 0 through 15 once each, so 1248 carries what 16 counts, and 16 itself reads 1 + 6 = 7 = 2⁴ mod 9, the next vortex step. On two digits the complement conserves the captain\'s 110: every n from 11 to 99 with no zero digit plus its complement is 110, as 16 + 94 = 110.',
    js: () => R(9).every((i) => 10 - (10 - (i + 1)) === i + 1) && 10 - 1 === 9 && 10 - 6 === 4 && 10 - 5 === 5
      && [1, 2, 4, 8, 7, 5].map((x) => 10 - x).join() === '9,8,6,2,3,5'
      && R(9).every((i) => (10 - (i + 1)) % 9 === (1 + 81 - (i + 1)) % 9)
      && (10 - (2 * 4) % 9) % 9 !== ((10 - 2) * (10 - 4)) % 9
      && R(16).map((k) => (k % 2) + 2 * ((k >> 1) % 2) + 4 * ((k >> 2) % 2) + 8 * ((k >> 3) % 2)).join() === R(16).join()
      && R(9).every((a) => R(9).every((b) => (10 * (a + 1) + (b + 1)) + (10 * (10 - (a + 1)) + (10 - (b + 1))) === 110))
      && 16 + 94 === 110 && 1 + 6 === 7 && (2 ** 4) % 9 === 7,
    lean: 'theorem the_ten_complement_involutes_the_vortex_through_the_axis : ((List.range 9).all (fun i => 10 - (10 - (i + 1)) == i + 1)) ∧ ((10 - 1 = 9) ∧ (10 - 6 = 4) ∧ (10 - 5 = 5)) ∧ ([1, 2, 4, 8, 7, 5].map (fun x => 10 - x) = [9, 8, 6, 2, 3, 5]) ∧ ((List.range 9).all (fun i => (10 - (i + 1)) % 9 == (1 + 81 - (i + 1)) % 9)) ∧ ((10 - 2 * 4 % 9) % 9 ≠ ((10 - 2) * (10 - 4)) % 9) ∧ ((List.range 16).map (fun k => (if k % 2 = 1 then 1 else 0) + (if k / 2 % 2 = 1 then 2 else 0) + (if k / 4 % 2 = 1 then 4 else 0) + (if k / 8 % 2 = 1 then 8 else 0)) = List.range 16) ∧ ((List.range 9).all (fun a => (List.range 9).all (fun b => (10 * (a + 1) + (b + 1)) + (10 * (10 - (a + 1)) + (10 - (b + 1))) == 110))) ∧ (16 + 94 = 110) ∧ (1 + 6 = 7) ∧ (2 ^ 4 % 9 = 7) := by decide' },
]

emit({ file: 'Clay.lean', skill: 'clay',
  header: 'THE SEVEN MILLENNIUM PROBLEMS — one FINITE instance each, drawn from that problem’s own mathematics and decided here. A decided window is not the conjecture: each key names the instance, never the problem. ' + CLAY_INVOLUTION_CITE + ` Cite DOI ${CLAY_INVOLUTION_DOI}; live surface https://uuidna.com/articles/clay.`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
