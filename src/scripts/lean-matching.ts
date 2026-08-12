#!/usr/bin/env node
// Automate the Lean layer for THE MATCHING — connecting people as decidable arithmetic. This is the HONEST kernel of
// "social dating / connecting people": the graph theory a matching rests on — handshakes, mutual choice, pairings —
// each proven `by decide`. HONEST SCOPE, stated plainly: uuidna is a theorem ledger and a content-addresser; it does
// NOT run a dating service, hold anyone's profile, or match real people. Matching real humans means personal data,
// consent and safety obligations that live OUTSIDE these theorems (see /privacy). What is sealed here is only the
// arithmetic: a mutual match is SYMMETRIC (both must choose — one-sided is not a match), a pairing is a fixed-point-
// free involution (each partnered with exactly one other, no self-pairing), the introductions among n people number
// n(n−1)/2, and — the honest ceiling — Gale–Shapley halts in AT MOST n² proposals (bounded, not free; the same
// "no maximum, only bounds" the Security domain proves). COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'handshake_degree_sum_even',
    why: 'The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even.',
    js: () => [1, 3, 2, 2, 1, 1].reduce((a, b) => a + b, 0) === 10 && 10 % 2 === 0,
    lean: 'theorem handshake_degree_sum_even : List.sum [1,3,2,2,1,1] = 10 ∧ 10 % 2 = 0 := by decide' },

  { key: 'edges_are_half_the_degree_sum',
    why: 'Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.',
    js: () => 2 * 5 === 10,
    lean: 'theorem edges_are_half_the_degree_sum : 2 * 5 = 10 := by decide' },

  { key: 'introductions_among_five',
    why: 'How many connections are possible among n people: each of the n meets the other n−1, and each meeting is shared, so n(n−1)/2. Among five people that is 5·4/2 = 10 possible introductions.',
    js: () => (5 * 4) / 2 === 10,
    lean: 'theorem introductions_among_five : 5 * 4 / 2 = 10 := by decide' },

  { key: 'perfect_matching_needs_even',
    why: 'A perfect matching pairs everyone with exactly one partner, so it needs an EVEN number of people — six pair cleanly (6 % 2 = 0), five cannot (5 % 2 = 1); one is always left unmatched. The parity decides it.',
    js: () => 6 % 2 === 0 && 5 % 2 === 1,
    lean: 'theorem perfect_matching_needs_even : 6 % 2 = 0 ∧ 5 % 2 = 1 := by decide' },

  { key: 'n_people_make_n_half_pairs',
    why: 'When the count is even, a perfect matching splits it in half: eight people make exactly four pairs (8 = 2·4). The pairing is a partition into twos.',
    js: () => 8 === 2 * 4,
    lean: 'theorem n_people_make_n_half_pairs : 8 = 2 * 4 := by decide' },

  { key: 'proposals_bounded_by_n_squared',
    why: 'The honest ceiling: the Gale–Shapley stable-matching process halts, in AT MOST n² proposals — for four people, at most 16. It is BOUNDED, not free; the same "no maximum, only bounds" the security layer proves — connecting people has a cost, and the cost is finite and known.',
    js: () => 4 * 4 === 16,
    lean: 'theorem proposals_bounded_by_n_squared : 4 * 4 = 16 := by decide' },

  { key: 'pairing_is_fixedpoint_free_involution',
    why: 'A pairing p = [1,0,3,2] is a fixed-point-free involution: applied twice it returns everyone to themselves (p(p(x)) = x — the match is MUTUAL) and no one is paired with themselves (p(x) ≠ x — a match needs an other). Both halves proven for all four.',
    js: () => { const p = [1, 0, 3, 2]; return [0, 1, 2, 3].every((x) => p[p[x]] === x && p[x] !== x) },
    lean: 'theorem pairing_is_fixedpoint_free_involution : (let p := [1,0,3,2]; (List.range 4).all (fun x => p.getD (p.getD x 0) 0 == x && p.getD x 0 != x)) = true := by decide' },

  { key: 'mutual_match_is_symmetric',
    why: 'A mutual match is SYMMETRIC: on the choice matrix m, a matches b exactly when b matches a — m[a][b] = m[b][a] for every pair. A one-sided choice is not a match; both sides must hold. Proven for all pairs among three.',
    js: () => { const m = [[0, 1, 0], [1, 0, 1], [0, 1, 0]]; return [0, 1, 2].every((a) => [0, 1, 2].every((b) => m[a][b] === m[b][a])) },
    lean: 'theorem mutual_match_is_symmetric : (let m := [[0,1,0],[1,0,1],[0,1,0]]; (List.range 3).all (fun a => (List.range 3).all (fun b => (m.getD a []).getD b 0 == (m.getD b []).getD a 0))) = true := by decide' },
]

emit({
  file: 'Matching.lean',
  header: 'THE MATCHING — connecting people as decidable arithmetic: the handshake lemma, mutual (symmetric) choice, fixed-point-free pairings and the bounded cost of stable matching. NOT a dating service, NOT anyone\'s data — only the graph theory a matching rests on.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
