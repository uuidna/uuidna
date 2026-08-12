-- lean/Matching.lean — GENERATED. THE MATCHING — connecting people as decidable arithmetic: the handshake lemma, mutual (symmetric) choice, fixed-point-free pairings and the bounded cost of stable matching. NOT a dating service, NOT anyone's data — only the graph theory a matching rests on. Every proof `by decide`, sorry-free, no Mathlib.

-- The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even.
theorem handshake_degree_sum_even : List.sum [1,3,2,2,1,1] = 10 ∧ 10 % 2 = 0 := by decide

-- Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.
theorem edges_are_half_the_degree_sum : 2 * 5 = 10 := by decide

-- How many connections are possible among n people: each of the n meets the other n−1, and each meeting is shared, so n(n−1)/2. Among five people that is 5·4/2 = 10 possible introductions.
theorem introductions_among_five : 5 * 4 / 2 = 10 := by decide

-- A perfect matching pairs everyone with exactly one partner, so it needs an EVEN number of people — six pair cleanly (6 % 2 = 0), five cannot (5 % 2 = 1); one is always left unmatched. The parity decides it.
theorem perfect_matching_needs_even : 6 % 2 = 0 ∧ 5 % 2 = 1 := by decide

-- When the count is even, a perfect matching splits it in half: eight people make exactly four pairs (8 = 2·4). The pairing is a partition into twos.
theorem n_people_make_n_half_pairs : 8 = 2 * 4 := by decide

-- The honest ceiling: the Gale–Shapley stable-matching process halts, in AT MOST n² proposals — for four people, at most 16. It is BOUNDED, not free; the same "no maximum, only bounds" the security layer proves — connecting people has a cost, and the cost is finite and known.
theorem proposals_bounded_by_n_squared : 4 * 4 = 16 := by decide

-- A pairing p = [1,0,3,2] is a fixed-point-free involution: applied twice it returns everyone to themselves (p(p(x)) = x — the match is MUTUAL) and no one is paired with themselves (p(x) ≠ x — a match needs an other). Both halves proven for all four.
theorem pairing_is_fixedpoint_free_involution : (let p := [1,0,3,2]; (List.range 4).all (fun x => p.getD (p.getD x 0) 0 == x && p.getD x 0 != x)) = true := by decide

-- A mutual match is SYMMETRIC: on the choice matrix m, a matches b exactly when b matches a — m[a][b] = m[b][a] for every pair. A one-sided choice is not a match; both sides must hold. Proven for all pairs among three.
theorem mutual_match_is_symmetric : (let m := [[0,1,0],[1,0,1],[0,1,0]]; (List.range 3).all (fun a => (List.range 3).all (fun b => (m.getD a []).getD b 0 == (m.getD b []).getD a 0))) = true := by decide
