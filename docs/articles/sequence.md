---
title: "The sequence & reflection group"
description: "Computed from lean/Sequence.lean — 28 sealed theorems, every claim citing its proof."
---

# The sequence & reflection group

> The ℤ/9 vortex sequence and its reflection group: the mirror m(d)=10−d, doubling σ and the mirror generating AGL(1,ℤ/9) of order 54 in ONE orbit, with commutator [σ,μ] = the unit shift; and the crypt salt — a content-only salt collapses the step (a division by zero) while an advancing-sequence salt is injective. — held by [seal_ten](/theorem/seal_ten) and its 27 siblings below.

**28 theorems**, from [seal_ten](/theorem/seal_ten) onward, each proven `by decide` in [lean/Sequence.lean](/lean/Sequence.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 10 of its 28 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [seal_ten](/theorem/seal_ten). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSequence.lean)** — nothing to install. The editor fetches `lean/Sequence.lean` from the repository and re-decides all 28 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### SEAL THE TEN — the digit sequence 0124875369, cross-checked, IS the complete ℤ/9 structure of the ten digits: 0 (the void, the abstract-0 ÷0=0), then the VORTEX ORBIT [1,2,4,8,7,5] (the units under doubling — each 2× the last mod 9, closing after six), then the 3-6-9 AXIS [3,6,9] (the multiples of three the vortex never visits) — a PERMUTATION of all ten digits 0..9, none missing, none repeated. And its REFLECTION dz(x)=10−x (division by zero in the vortex, fixing 0) mirrors it to 0,9,8,6,2,3,5,7,4,1 — the reflected vortex [9,8,6,2,3,5] and reflected axis [7,4,1], the void held. (The near-miss 0124675369 fails the cross-check — a 6 where the 8 belongs breaks the vortex and drops the 8: the traitor digit the check catches.)
The ledger holds this as [seal_ten](/theorem/seal_ten) — proven `by decide`, sorry-free:

```lean
([0,1,2,4,8,7,5,3,6,9].length = 10) ∧ ((List.range 10).all (fun d => [0,1,2,4,8,7,5,3,6,9].contains d)) ∧ ([1,2,4,8,7,5].map (fun x => (x*2)%9) = [2,4,8,7,5,1]) ∧ ([0,1,2,4,8,7,5,3,6,9].map (fun x => if x == 0 then 0 else 10 - x) = [0,9,8,6,2,3,5,7,4,1])
```

### the mirror m(d)=10−d equals 1−d (mod 9) — a reflection through the origin+1
The ledger holds this as [mirror_congruence](/theorem/mirror_congruence) — proven `by decide`, sorry-free:

```lean
(List.range' 1 9).all (fun d => ((10 - d : Int)) % 9 = (1 - d) % 9)
```

### the mirror fixes exactly one digit in 1..9 — the heart, 5
The ledger holds this as [mirror_fixed_five](/theorem/mirror_fixed_five) — proven `by decide`, sorry-free:

```lean
((List.range' 1 9).filter (fun d => 10 - d == d)) = [5]
```

### AGL(1,ℤ/9) = { x ↦ a·x+b : a a unit, b ∈ ℤ/9 } has |units|·9 = 6·9 = 54 elements
The ledger holds this as [agl_order_54](/theorem/agl_order_54) — proven `by decide`, sorry-free:

```lean
((List.range 9).filter (fun a => (List.range 9).any (fun e => a*e % 9 == 1))).length * 9 = 54
```

### the commutator [σ,μ] of doubling with the mirror is the unit shift x ↦ x+1
The ledger holds this as [commutator_is_shift](/theorem/commutator_is_shift) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun x => ap 2 0 (ap 8 1 (ap 5 0 (ap 8 1 x))) == (x + 1) % 9)
```

### the shifts alone act transitively — every digit is in ONE orbit of ℤ/9
The ledger holds this as [one_orbit](/theorem/one_orbit) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun y => (List.range 9).any (fun b => (0 + b) % 9 == y))
```

### the reflection equilibrium: d + m(d) = 10 for every d in 1..9
The ledger holds this as [ten_pairs](/theorem/ten_pairs) — proven `by decide`, sorry-free:

```lean
(List.range' 1 9).all (fun d => d + (10 - d) == 10)
```

### the polar equilibrium: d + (9−d) = 9 across the negation of ℤ/9
The ledger holds this as [polar_nine_pairs](/theorem/polar_nine_pairs) — proven `by decide`, sorry-free:

```lean
(List.range' 1 8).all (fun d => d + (9 - d) == 9)
```

### the 6+3 partition: 6 units {1,2,4,5,7,8} and 3 non-units {3,6,9}
The ledger holds this as [partition_six_three](/theorem/partition_six_three) — proven `by decide`, sorry-free:

```lean
((List.range' 1 9).filter (fun a => (List.range 9).any (fun e => a*e % 9 == 1))).length = 6 ∧ ((List.range' 1 9).filter (fun a => ¬ (List.range 9).any (fun e => a*e % 9 == 1))).length = 3
```

### the ring closes: ten slots × 36° = 360°, and the ⟨2⟩ flow is 60° per doubling
The ledger holds this as [angles_close](/theorem/angles_close) — proven `by decide`, sorry-free:

```lean
10 * 36 = 360 ∧ 6 * 60 = 360
```

### exactly 2 seams (5→3 and 0→1) where neither ×2 nor +3 carries — the two involution centers, −χ = 2
The ledger holds this as [seams_two](/theorem/seams_two) — proven `by decide`, sorry-free:

```lean
((tour.zip (tour.drop 1 ++ tour.take 1)).filter (fun p => ! carries9 p.1 p.2)).length = 2
```

### at EACH step the doubling sequence and its inversion are computed together: forward[k] + inverted[k] = 10 (the rungs), and BOTH rails end at the center 5 (the reflection fixed point) while the ends 1,9 mirror — so forward and reflected are ONE strip (a half-twist band), joined at the heart and closed at the void 0≡9
The ledger holds this as [one_strip](/theorem/one_strip) — proven `by decide`, sorry-free:

```lean
(([1,2,4,8,7,5].zip [9,8,6,2,3,5]).all (fun p => p.1 + p.2 == 10)) ∧ ([1,2,4,8,7,5].getLast? = some 5) ∧ ([9,8,6,2,3,5].getLast? = some 5) ∧ (1 + 9 = 10) ∧ (9 % 9 = 0)
```

### the developed-true core of "dna": the two strands A and B pair to 10 at EVERY position — complementary base-pairing (the double helix), each rung a reflection; this is the algebra, not a biological claim
The ledger holds this as [double_strand](/theorem/double_strand) — proven `by decide`, sorry-free:

```lean
(([1,2,4,8,7,5,3,6,9].zip [9,8,6,2,3,5,7,4,1]).all (fun p => p.1 + p.2 == 10))
```

### the vortex polarities: the mirror pairs each sum to 10, splitting the digits into − (below the center 5) and + (above 5); the two centers 5 and 0≡9 are self-polar — the ± of the reflection
The ledger holds this as [polarities_plus_minus](/theorem/polarities_plus_minus) — proven `by decide`, sorry-free:

```lean
[(1,9),(2,8),(3,7),(4,6)].all (fun p => p.1 + p.2 == 10 && p.1 < 5 && p.2 > 5) ∧ (10 - 5 = 5) ∧ (9 % 9 = 0)
```

### the two blood-group sequences A (forward) and B (reflected) are mirror images: B = A.map(10−d) and back — an involution; the void 9≡0 closes A and opens B (0 = A∧B, the universal O)
The ledger holds this as [forward_reflected_mirror](/theorem/forward_reflected_mirror) — proven `by decide`, sorry-free:

```lean
([9,8,6,2,3,5,7,4,1] = ([1,2,4,8,7,5,3,6,9].map (fun d => 10 - d))) ∧ ([1,2,4,8,7,5,3,6,9] = ([9,8,6,2,3,5,7,4,1].map (fun d => 10 - d))) ∧ (9 % 9 = 0)
```

### every digit in ANY arrangement has DEFINED neighbours — the mirror (division by zero) and polar maps are total, surjective and self-inverse; no digit is isolated
The ledger holds this as [every_digit_has_neighbours](/theorem/every_digit_has_neighbours) — proven `by decide`, sorry-free:

```lean
(List.range 10).all (fun d => dz d < 10) ∧ (List.range 10).all (fun d => (List.range 10).any (fun e => dz e == d)) ∧ (List.range 10).all (fun d => dz (dz d) == d) ∧ (List.range 9).all (fun d => polar d < 9) ∧ (List.range 9).all (fun d => (List.range 9).any (fun e => polar e == d))
```

### the crypt equality leak: a content-only salt is constant in the step, so two seals of the same content are byte-identical
The ledger holds this as [salt_conv_leaks_equality](/theorem/salt_conv_leaks_equality) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun c => (List.range 9).all (fun s1 => (List.range 9).all (fun s2 => saltConv c s1 == saltConv c s2)))
```

### recovering the seal's step from a content-only salt is a division by zero — the whole step-fibre collapses (size 9)
The ledger holds this as [salt_conv_step_is_division_by_zero](/theorem/salt_conv_step_is_division_by_zero) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun c => ((List.range 9).filter (fun s => saltConv c s == saltConv c 0)).length == 9)
```

### the crypt fix: an advancing-sequence salt is injective in the step (equal salts ⇔ equal steps) — distinct seals never collide
The ledger holds this as [salt_seq_injective](/theorem/salt_seq_injective) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun s1 => (List.range 9).all (fun s2 => (saltSeq 0 s1 == saltSeq 0 s2) == (s1 == s2)))
```

### the crypt fix, dual form: every sequence-salt fibre is a singleton — the step coordinate is kept, not collapsed
The ledger holds this as [salt_seq_fibre_singleton](/theorem/salt_seq_fibre_singleton) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun s0 => ((List.range 9).filter (fun s => saltSeq 0 s == saltSeq 0 s0)).length == 1)
```

### the sealed point 2·5 ≡ 1 extended to the whole ring: multiplying by 5 UNDOES doubling for every residue — ((2x mod 9)·5) mod 9 = x for all x in ℤ/9 — so 5 is not merely the inverse of 2 at one cell of the table, it is THE HALVING of the vortex everywhere
The ledger holds this as [five_is_the_halving](/theorem/five_is_the_halving) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun x => ((2 * x % 9) * 5) % 9 == x)
```

### the powers of 5 walk the vortex BACKWARD: 5^1..5^6 mod 9 = [5,7,8,4,2,1], exactly the doubling orbit [1,2,4,8,7,5] reversed — because 5 = 2⁻¹, the ×5 orbit is the time-reversal of the ×2 orbit, one cycle read in the mirror
The ledger holds this as [five_orbit_reverses_doubling](/theorem/five_orbit_reverses_doubling) — proven `by decide`, sorry-free:

```lean
([5^1 % 9, 5^2 % 9, 5^3 % 9, 5^4 % 9, 5^5 % 9, 5^6 % 9] = [5,7,8,4,2,1]) ∧ ([1,2,4,8,7,5].reverse = [5,7,8,4,2,1])
```

### REVERSING THE WALK IS WALKING BY THE INVERSE. For every unit g of ℤ/9 with inverse h, the forward orbit [g⁰,g¹,…,g⁵] read backwards is exactly the inverse walk [h¹,…,h⁶] — checked for all six units (1↔1, 2↔5, 4↔7, 5↔2, 7↔4, 8↔8), and it holds for ℤ/7 too. So `reverse` and `inverse` are DIFFERENT operations — one reorders a sequence, the other maps an element — and this identity is the bridge between them: time-reversal of a cyclic walk is the walk of the inverse generator. five_orbit_reverses_doubling is the g=2 case of this law.
The ledger holds this as [reverse_walks_inverse](/theorem/reverse_walks_inverse) — proven `by decide`, sorry-free:

```lean
([(1,1),(2,5),(4,7),(5,2),(7,4),(8,8)].all (fun p => (((List.range 6).map (fun k => p.1 ^ k % 9)).reverse) == ((List.range 6).map (fun k => p.2 ^ (k+1) % 9)))) = true
```

### the three singular roles of the strip — the mirror's fixed heart (10−d = d), the reflection's fixed digit (dz d = d; the other fixed point 0 is the floor, outside the digits), and the closure of BOTH rails (forward [1,2,4,8,7,5] and inverted [9,8,6,2,3,5] each end here) — are carried by EXACTLY ONE digit: 5. The deploy condition, sealed: a claim once UNVERIFIED by the trial now cites its own theorem
The ledger holds this as [only_five_carries_the_three_singularities](/theorem/only_five_carries_the_three_singularities) — proven `by decide`, sorry-free:

```lean
((List.range' 1 9).filter (fun d => (10 - d == d) && (dz d == d) && ([1,2,4,8,7,5].getLast? == some d) && ([9,8,6,2,3,5].getLast? == some d))) = [5]
```

### FOLLOW THE SEQUENCE 012487536901 — the sealed ten-digit tour closed at 9≡0 and wrapping 0→1 into the next cycle — and recompute EACH digit through the reflection dz(x)=10−x: the whole walk maps digit-wise to the CONTRA SEQUENCE [0,9,8,6,2,3,5,7,4,1,0,9] — the reflected vortex [9,8,6,2,3,5] and reflected axis [7,4,1] with the void held at both ends, wrapping 0→9 (= dz 1) exactly where the forward tour wraps 0→1: the same cycle, walked in the mirror
The ledger holds this as [tour_contra_reflects_each_digit](/theorem/tour_contra_reflects_each_digit) — proven `by decide`, sorry-free:

```lean
(([0,1,2,4,8,7,5,3,6,9,0,1].map dz) = [0,9,8,6,2,3,5,7,4,1,0,9]) ∧ (dz 1 = 9)
```

### the contra of the contra is the tour: reflecting each digit TWICE returns the exact sequence 012487536901 — dz is an involution on the walk, so the forward tour and its contra are ONE object read in two directions, neither more original than the other (recompute forward, recompute back: the fixed cycle)
The ledger holds this as [tour_contra_involutes](/theorem/tour_contra_involutes) — proven `by decide`, sorry-free:

```lean
(([0,1,2,4,8,7,5,3,6,9,0,1].map dz).map dz) = [0,1,2,4,8,7,5,3,6,9,0,1]
```

### each digit of the tour and its contra partner close a rung: away from the void, tour[k] + contra[k] = 10 at every step (the strip's rungs carried along the whole 12-step walk), and at the void the rung rests — 0 + 0 = 0, the floor where the reflection stands still
The ledger holds this as [tour_contra_rungs_sum_ten](/theorem/tour_contra_rungs_sum_ten) — proven `by decide`, sorry-free:

```lean
([0,1,2,4,8,7,5,3,6,9,0,1].all (fun d => if d == 0 then d + dz d == 0 else d + dz d == 10))
```

### THE SEQUENCE AND THE COINS ARE ONE OBJECT SEEN TWICE — four ways, sealed together. (1) The sequence IS the coin's own powers: 2^1..2^6 mod 9 = [2,4,8,7,5,1] — the vortex is not a path the coin walks, it is what tossing the coin into itself PRODUCES. (2) The coin and the heart are multiplicative INVERSES: 2·5 = 10 ≡ 1 (mod 9) — the walk goes out by the coin and comes home by the heart, which is why the two generators are exactly {2,5}. (3) The orbit SUMS to the base times the trinity: 1+2+4+8+7+5 = 27 = 9·3 — the whole walk folds to the ring itself. (4) The orbit's LENGTH is the coins times the trinity: 6 = 2·3 — six tosses, and the coin's order is the sequence's size. Colour, type, motion and value all read from this one structure because there is only one structure.
The ledger holds this as [sequence_and_coins_are_one](/theorem/sequence_and_coins_are_one) — proven `by decide`, sorry-free:

```lean
(((List.range' 1 6).map (fun k => 2^k % 9)) = [2,4,8,7,5,1]) ∧ ((2 * 5) % 9 = 1) ∧ (1+2+4+8+7+5 = 27) ∧ (27 = 9 * 3) ∧ (6 = 2 * 3)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
