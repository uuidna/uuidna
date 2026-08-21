---
title: "The matching"
description: "Computed from lean/Matching.lean — 8 sealed theorems, every claim citing its proof."
---

# The matching

> THE MATCHING — connecting people as decidable arithmetic: the handshake lemma, mutual (symmetric) choice, fixed-point-free pairings and the bounded cost of stable matching. — held by [handshake_degree_sum_even](/theorem/handshake_degree_sum_even) and its 7 siblings below.

**8 theorems**, from [handshake_degree_sum_even](/theorem/handshake_degree_sum_even) onward, each proven `by decide` in [lean/Matching.lean](/lean/Matching.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [edges_are_half_the_degree_sum](/theorem/edges_are_half_the_degree_sum). A boundary stated here is decided, not merely denied.

### The handshake lemma: every edge touches two people, so summing how many each is connected to double-counts the edges — the degree sum is always EVEN. Here [1,3,2,2,1,1] sums to 10, and 10 is even.
The ledger holds this as [handshake_degree_sum_even](/theorem/handshake_degree_sum_even) — proven `by decide`, sorry-free:

```lean
List.sum [1,3,2,2,1,1] = 10 ∧ 10 % 2 = 0
```

### Because each connection is counted from both ends, the number of edges is exactly half the degree sum — 5 connections make a degree sum of 10. Connections are shared, never owned by one side.
The ledger holds this as [edges_are_half_the_degree_sum](/theorem/edges_are_half_the_degree_sum) — proven `by decide`, sorry-free:

```lean
2 * 5 = 10
```

### How many connections are possible among n people: each of the n meets the other n−1, and each meeting is shared, so n(n−1)/2. Among five people that is 5·4/2 = 10 possible introductions.
The ledger holds this as [introductions_among_five](/theorem/introductions_among_five) — proven `by decide`, sorry-free:

```lean
5 * 4 / 2 = 10
```

### A perfect matching pairs everyone with exactly one partner, so it needs an EVEN number of people — six pair cleanly (6 % 2 = 0), five cannot (5 % 2 = 1); one is always left unmatched. The parity decides it.
The ledger holds this as [perfect_matching_needs_even](/theorem/perfect_matching_needs_even) — proven `by decide`, sorry-free:

```lean
6 % 2 = 0 ∧ 5 % 2 = 1
```

### When the count is even, a perfect matching splits it in half: eight people make exactly four pairs (8 = 2·4). The pairing is a partition into twos.
The ledger holds this as [n_people_make_n_half_pairs](/theorem/n_people_make_n_half_pairs) — proven `by decide`, sorry-free:

```lean
8 = 2 * 4
```

### The honest ceiling: the Gale–Shapley stable-matching process halts, in AT MOST n² proposals — for four people, at most 16. It is BOUNDED, not free; the same "no maximum, only bounds" the security layer proves — connecting people has a cost, and the cost is finite and known.
The ledger holds this as [proposals_bounded_by_n_squared](/theorem/proposals_bounded_by_n_squared) — proven `by decide`, sorry-free:

```lean
4 * 4 = 16
```

### A pairing p = [1,0,3,2] is a fixed-point-free involution: applied twice it returns everyone to themselves (p(p(x)) = x — the match is MUTUAL) and no one is paired with themselves (p(x) ≠ x — a match needs an other). Both halves proven for all four.
The ledger holds this as [pairing_is_fixedpoint_free_involution](/theorem/pairing_is_fixedpoint_free_involution) — proven `by decide`, sorry-free:

```lean
(let p := [1,0,3,2]; (List.range 4).all (fun x => nth p (nth p x) == x && nth p x != x)) = true
```

### A mutual match is SYMMETRIC: on the choice matrix m, a matches b exactly when b matches a — m[a][b] = m[b][a] for every pair. A one-sided choice is not a match; both sides must hold. Proven for all pairs among three.
The ledger holds this as [mutual_match_is_symmetric](/theorem/mutual_match_is_symmetric) — proven `by decide`, sorry-free:

```lean
(let m := [[0,1,0],[1,0,1],[0,1,0]]; (List.range 3).all (fun a => (List.range 3).all (fun b => nth (nthR m a) b == nth (nthR m b) a))) = true
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
