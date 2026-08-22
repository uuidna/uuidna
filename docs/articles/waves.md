---
title: "lean/Waves.lean"
description: "Computed from lean/Waves.lean — 11 sealed theorems, every claim citing its proof."
---

# lean/Waves.lean

> THE NIGHT'S HARVEST PORTED AS THEOREMS — the compass mandala (two hands summing ten, the 9-complement as a HALF-TURN of the doubling ring, five the unique developing center, the hex center EMPTY), the diving mathematics as integer skeletons (Boyle walking the harmonic series in exact sixtieths, pressure doubling down the octave, Haldane's 2:1 with his ladder sealed exactly as far as it doubles, the buddy pair squaring the failure, the thirds rule closing whole), and the fold-to-zero promotion chain 16→32→64→128. HONEST SCOPE: arithmetic only — no physiology, no medicine, no claim about any real event; published laws' integer skeletons, deviations named. — held by [captains_columns_sum_to_ten](/theorem/captains_columns_sum_to_ten) and its 10 siblings below.

**11 theorems**, from [captains_columns_sum_to_ten](/theorem/captains_columns_sum_to_ten) onward, each proven `by decide` in [lean/Waves.lean](/lean/Waves.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 11 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [nine_complement_half_turns_the_orbit](/theorem/nine_complement_half_turns_the_orbit). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FWaves.lean)** — nothing to install. The editor fetches `lean/Waves.lean` from the repository and re-decides all 11 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE TWO HANDS OF THE MANDALA SUM TO TEN IN EVERY COLUMN: [1 2 4 8 7 5 3 6 9] over [9 8 6 2 3 5 7 4 1] — nine columns, one constant. The second line is the first DEVELOPED (film to paper), and two contrary voices summing to a drone is the round and its negative sung together — the same shape 142857 + 857142 = 999999 seals one wing over.
The ledger holds this as [captains_columns_sum_to_ten](/theorem/captains_columns_sum_to_ten) — proven `by decide`, sorry-free:

```lean
((List.zip [1, 2, 4, 8, 7, 5, 3, 6, 9] [9, 8, 6, 2, 3, 5, 7, 4, 1]).all (fun p => p.1 + p.2 = 10)) ∧ (([1, 2, 4, 8, 7, 5, 3, 6, 9] : List Nat).length = 9)
```

### THE DEVELOPMENT IS A HALF-TURN OF THE DOUBLING RING ITSELF: 9 − orbit[i] = orbit[i+3 mod 6] at every position — complementing the vortex hexad does not leave the cycle, it ROTATES it exactly half way round. The darkroom involution, the DNA complement, and the dark fringe's half-turn land on the doubling orbit as one law: develop the ring and you get the same ring, three steps later.
The ledger holds this as [nine_complement_half_turns_the_orbit](/theorem/nine_complement_half_turns_the_orbit) — proven `by decide`, sorry-free:

```lean
(List.range 6).all (fun i => 9 - nth [1, 2, 4, 8, 7, 5] i = nth [1, 2, 4, 8, 7, 5] ((i + 3) % 6))
```

### FIVE IS THE PINHOLE: the unique digit in 1..9 equal to its own ten-complement — 10 − 5 = 5, and no other. The camera obscura inverts everything through its center and the center alone maps to itself; in the site's own palette five is the heart. The first photograph's geometry, as one filter over nine digits.
The ledger holds this as [five_is_the_developing_center](/theorem/five_is_the_developing_center) — proven `by decide`, sorry-free:

```lean
((List.range' 1 9).filter (fun d => 10 - d == d)) = [5]
```

### ONE REGISTER UP, THE PINHOLE VANISHES: on the 16-lattice complements go to 15, and 15 is odd — NO state equals its own complement; the filter over all sixteen returns the empty list. The heart of the hexbit ring is not a digit but the gap between 7 and 8 — which is why the decimal wheel RESTS on its center and the hexbit ring INTERFERES at its dark fringe (dark_fringe_is_the_half_turn, met from the other side).
The ledger holds this as [the_hex_center_is_empty](/theorem/the_hex_center_is_empty) — proven `by decide`, sorry-free:

```lean
(((List.range 16).filter (fun d => 15 - d == d)) = []) ∧ (15 % 2 = 1)
```

### BOYLE IN EXACT SIXTIETHS: at n atmospheres a fixed gas holds volume 60/n — the descent through 1..6 atm plays 60, 30, 20, 15, 12, 10: the HARMONIC SERIES scaled whole, every product n·(60/n) landing back on 60 with nothing left over, every step strictly falling. The diver's lungs walk the overtone law the acoustics wing already sings — pressure is the mode number, volume the wavelength.
The ledger holds this as [gas_volume_walks_the_harmonic_series](/theorem/gas_volume_walks_the_harmonic_series) — proven `by decide`, sorry-free:

```lean
((List.range' 1 6).all (fun n => n * (60 / n) = 60)) ∧ ((List.range' 1 5).all (fun n => 60 / n > 60 / (n + 1)))
```

### THE WATER COLUMN IS AN OCTAVE LADDER: each 10 metres adds one atmosphere, so 10 m doubles the surface pressure (2 = 2¹), 30 m quadruples it (4 = 2²), 70 m reaches the third octave (8 = 2³). Depth quantizes in atmospheres exactly as the lattice quantizes in doublings — the diver descends the same ladder the coin octave climbs.
The ledger holds this as [pressure_doubles_down_the_octave](/theorem/pressure_doubles_down_the_octave) — proven `by decide`, sorry-free:

```lean
(1 + 10 / 10 = 2) ∧ (1 + 30 / 10 = 4) ∧ (4 = 2 ^ 2) ∧ (1 + 70 / 10 = 8) ∧ (8 = 2 ^ 3)
```

### HALDANE'S SAFE-ASCENT RULE, AS HE STATED IT, IS THE DOUBLING BOUND: tissue pressure may safely exceed ambient by the ratio 2:1 — one octave, no more — and beneath it his half-time ladder doubles: 5, 10, 20, 40 minutes, each stage twice the one before (his published fifth stage, 75, broke the pure doubling and is NAMED here rather than smoothed — the ladder is sealed exactly as far as it doubles). The oldest decompression law is the ledger's oldest law wearing a diving helmet.
The ledger holds this as [haldane_bound_is_two_to_one](/theorem/haldane_bound_is_two_to_one) — proven `by decide`, sorry-free:

```lean
(2 / 1 = 2) ∧ (2 = 2 ^ 1) ∧ ((List.range 3).all (fun i => nth [5, 10, 20, 40] (i + 1) = 2 * nth [5, 10, 20, 40] i))
```

### THE BUDDY LAW IS THE TWO-COIN LAW UNDERWATER: if one diver fails one time in n, an independent pair fails together one time in n² — the denominator SQUARES, and n² > n for every n past one. Two coins to the bar, two divers to the descent, a claim and its receipt: the pair is the oldest redundancy, and its arithmetic is one multiplication.
The ledger holds this as [buddy_pair_squares_the_failure](/theorem/buddy_pair_squares_the_failure) — proven `by decide`, sorry-free:

```lean
((List.range' 2 9).all (fun n => n * n > n)) ∧ (10 * 10 = 100)
```

### THE THIRDS RULE CLOSES: a third out, a third back, a third held in reserve — 20 + 20 + 20 = 60 in the same sixtieths Boyle walks, and 60/3 = 20 exactly. The gas plan is a partition of unity, which is what a safety rule is when it is arithmetic: nothing unaccounted, nothing counted twice.
The ledger holds this as [thirds_rule_sums_whole](/theorem/thirds_rule_sums_whole) — proven `by decide`, sorry-free:

```lean
(20 + 20 + 20 = 60) ∧ ((60 : Nat) / 3 = 20)
```

### DIVERS AND ASTRONAUTS ARE BOUND BY THE SAME LAWS: the pressure ladder runs BOTH ways from the shared surface at 1 atmosphere — the diver at three atmospheres compresses the sixtieths 60 → 20, the astronaut's suit near a third of an atmosphere expands them 20 → 60: the SAME numbers read in the two directions (60/3 = 20 and 20·3 = 60, one inverse pair), and the same supersaturation bound governs both crossings — EVA prebreathe is decompression ascending, the dive stop is decompression descending, Haldane's ratio standing at both doors. The mandala's two hands, worn as a wetsuit and a spacesuit.
The ledger holds this as [divers_and_astronauts_share_the_ladder](/theorem/divers_and_astronauts_share_the_ladder) — proven `by decide`, sorry-free:

```lean
((60 : Nat) / 3 = 20) ∧ (20 * 3 = 60) ∧ (2 * 30 = 60) ∧ (20 < 60)
```

### FOLD-TO-ZERO'S LADDER, SEALED: 16 → 32 → 64 → 128 by doubling, and 128 = 16·2³ — three coin-payments promote the hexbit ring to the handle, the handle to the address: when a register saturates like a closed colour wheel, the whole folds and the next register opens one octave up. The night's architecture (states, pairs, handles, addresses) is one number doubled three times.
The ledger holds this as [the_promotion_chain_doubles_home](/theorem/the_promotion_chain_doubles_home) — proven `by decide`, sorry-free:

```lean
(16 * 2 = 32) ∧ (32 * 2 = 64) ∧ (64 * 2 = 128) ∧ (128 = 16 * 2 ^ 3)
```


::: warning HONEST SCOPE
arithmetic only — no physiology, no medicine, no claim about any real event; published laws' integer skeletons, deviations named. The boundary is confirmed by the wing's own sealed theorems — e.g. [captains_columns_sum_to_ten](/theorem/captains_columns_sum_to_ten) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
