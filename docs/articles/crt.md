---
title: "The fused ring"
description: "Computed from lean/Crt.lean — 11 sealed theorems, every claim citing its proof."
---

# The fused ring

> THE FUSED RING — the rosette (Z/7) and the vortex (Z/9) are coprime, so by the Chinese Remainder Theorem they are ONE ring of 63 states, and its arithmetic explains the captain measure: the two coins buy 64 = 63 + 1, the whole fused structure plus the unit that closes it (63 = 111111, saturated in six bits; 64 = 1000000, the first bit beyond). The hexagram width 6 is the unit-group order of both tongues and the stride that totals the rosetta while partitioning the Glagolitic nine. — held by [captain_theorem_the_coins_buy_the_ring_and_one](/theorem/captain_theorem_the_coins_buy_the_ring_and_one) and its 10 siblings below.

**11 theorems**, from [captain_theorem_the_coins_buy_the_ring_and_one](/theorem/captain_theorem_the_coins_buy_the_ring_and_one) onward, each proven `by decide` in <a href="/lean/Crt.lean">lean/Crt.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 11 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [hexagram_width_closes_rosetta_and_glagolitic](/theorem/hexagram_width_closes_rosetta_and_glagolitic). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCrt.lean)** — nothing to install. The editor fetches `lean/Crt.lean` from the repository and re-decides all 11 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### captain_theorem_the_coins_buy_the_ring_and_one
The ledger holds this as [captain_theorem_the_coins_buy_the_ring_and_one](/theorem/captain_theorem_the_coins_buy_the_ring_and_one) — proven `by decide`, sorry-free:

```lean
(7 * 9 = 63) ∧ (2 * 32 = 64) ∧ (63 + 1 = 64) ∧ (2^6 = 64) ∧ (2^6 - 1 = 63)
```

### rosette_and_vortex_are_coprime
The ledger holds this as [rosette_and_vortex_are_coprime](/theorem/rosette_and_vortex_are_coprime) — proven `by decide`, sorry-free:

```lean
(Nat.gcd 7 9 = 1) ∧ (Nat.gcd 7 14 = 7) ∧ (Nat.gcd 9 6 = 3)
```

### axes_stride_coprime
The ledger holds this as [axes_stride_coprime](/theorem/axes_stride_coprime) — proven `by decide`, sorry-free:

```lean
(3 + 3 + 1 = 7) ∧ (Nat.gcd 7 9 = 1) ∧ (7 * 9 = 63) ∧ (63 = 2^6 - 1) ∧ (Nat.gcd 2 8 = 2)
```

### CLAIMED by walking all 256 ordered pairs from the sixteen hex digits: the two residues (mod 6, mod 9) identify a digit uniquely — no two of the sixteen share both — and the pair space is 18, two larger than the sixteen it must separate.
The ledger holds this as [residues_identify_digit](/theorem/residues_identify_digit) — proven `by decide`, sorry-free:

```lean
((List.range 16).all (fun a => (List.range 16).all (fun b => (!((a % 6 == b % 6) && (a % 9 == b % 9))) || (a == b)))) ∧ (2 * 9 = 18) ∧ (18 % 6 = 0) ∧ (18 % 9 = 0) ∧ (18 - 16 = 2)
```

### CLAIMED over every one of the 63 residues: x ↦ (x mod 7, x mod 9) yields 63 distinct pairs, so the correspondence is a bijection and no residue collides with another.
The ledger holds this as [crt_pairs_are_a_bijection](/theorem/crt_pairs_are_a_bijection) — proven `by decide`, sorry-free:

```lean
(((List.range 63).map (fun x => (x % 7) * 9 + (x % 9))).eraseDups.length = 63)
```

### CLAIMED by counting units across all 63 residues: the fused ring has exactly 36 units, which is 6·6 — the vortex orbit length times the rosette orbit length, each of those six counted over its own whole ring.
The ledger holds this as [fused_units_are_the_orbit_squared](/theorem/fused_units_are_the_orbit_squared) — proven `by decide`, sorry-free:

```lean
(((List.range 63).filter (fun a => a > 0 && Nat.gcd a 63 == 1)).length = 36) ∧ (6 * 6 = 36) ∧ (((List.range 9).filter (fun a => a > 0 && Nat.gcd a 9 == 1)).length = 6) ∧ (((List.range 7).filter (fun a => a > 0 && Nat.gcd a 7 == 1)).length = 6)
```

### the_coin_keeps_its_order_in_the_fused_ring
The ledger holds this as [the_coin_keeps_its_order_in_the_fused_ring](/theorem/the_coin_keeps_its_order_in_the_fused_ring) — proven `by decide`, sorry-free:

```lean
((2^6) % 63 = 1) ∧ ((2^6) % 9 = 1) ∧ ((2^3) % 7 = 1) ∧ ((5^6) % 63 = 1)
```

### the_fused_ring_is_all_ones
The ledger holds this as [the_fused_ring_is_all_ones](/theorem/the_fused_ring_is_all_ones) — proven `by decide`, sorry-free:

```lean
(63 = 32 + 16 + 8 + 4 + 2 + 1) ∧ (64 = 2^6) ∧ (63 < 64)
```

### THE HEXAGRAM WIDTH IS WHY THE TWO TONGUES ARE ONE RING. Six binary lines — Fu Xi / Leibniz, 2^6 = 64 gates, the same width payload_aligns_where_the_name_does_not already names; not King Wen names, meaning stays null — close BOTH windows at once: 2^6 ≡ 1 (mod 9), the Glagolitic vortex (two_order_six), and 2^6 ≡ 1 (mod 7), Fermat on the Pliska rosette (z7fermat). Both multiplicative groups have exactly six units, φ(9) = φ(7) = 6, so the hexagram's line count IS the unit-group order of each tongue. Coprime moduli 7 and 9 fuse to 63 = 2^6 − 1: the hexagram saturated, which captain_theorem_the_coins_buy_the_ring_and_one already buys with one to spare. THE SEAM, named rather than smoothed: 6 is the ORDER of 2 only on ℤ/9; on ℤ/7 the order is 3 (the_coin_keeps_its_order_in_the_fused_ring) and 6 is two periods — Fermat's exponent, not a second order. cardinality and orders. It does not claim the I Ching describes a person, that Glagolitic letters are hexagrams, or that the rosette was built to encode six lines.
The ledger holds this as [hexagram_width_closes_rosetta_and_glagolitic](/theorem/hexagram_width_closes_rosetta_and_glagolitic) — proven `by decide`, sorry-free:

```lean
(2^6 = 64) ∧ ((2^6) % 9 = 1) ∧ ((2^6) % 7 = 1) ∧ (Nat.gcd 7 9 = 1) ∧ (7 * 9 = 63) ∧ (63 = 2^6 - 1) ∧ (((List.range 9).filter (fun a => a > 0 && Nat.gcd a 9 == 1)).length = 6) ∧ (((List.range 7).filter (fun a => a > 0 && Nat.gcd a 7 == 1)).length = 6)
```

### THE SAME SIX BEHAVES DIFFERENTLY IN THE TWO DIMENSIONS. A stride of the hexagram width on the seven rosetta rays is a TOTAL walk: gcd(6, 7) = 1, so k ↦ 6k (mod 7) hits every ray — the seven discovery axes (axes_stride_coprime) are completely traversable at hexagram pace. The same stride on the Glagolitic nine is NOT total: gcd(6, 9) = 3, so k ↦ 6k (mod 9) has exactly three residues {0, 3, 6} — three orbits, the factor residues_identify_digit already named when it refused CRT for 6 and 9. One width, two moduli, two geometries: the rosetta is generated; the vortex is partitioned. residue orbits of multiplication by 6. It does not claim a hexagram "means" a dimension, or that walking theorems at stride 6 is a ritual.
The ledger holds this as [hexagram_stride_totals_the_rosetta](/theorem/hexagram_stride_totals_the_rosetta) — proven `by decide`, sorry-free:

```lean
(Nat.gcd 6 7 = 1) ∧ (Nat.gcd 6 9 = 3) ∧ ((List.range 7).map (fun k => (k * 6) % 7)).eraseDups.length = 7 ∧ ((List.range 9).map (fun k => (k * 6) % 9)).eraseDups.length = 3
```

### CLAIMED by walking all 1296 cells of the 36×36 Cayley table over the 63 residues: every product of two units is a unit, and every row is a permutation of the 36 — the group closes and no row repeats a value.
The ledger holds this as [units_of_sixty_three_close_their_product_table](/theorem/units_of_sixty_three_close_their_product_table) — proven `by decide`, sorry-free:

```lean
(let u := (List.range 63).filter (fun k => Nat.gcd k 63 == 1); (u.length == 36) ∧ (u.all (fun a => u.all (fun b => Nat.gcd (a * b % 63) 63 == 1))) ∧ (u.all (fun a => ((u.map (fun b => a * b % 63)).eraseDups.length == 36)))) ∧ (63 = 7 * 9) ∧ (6 * 6 = 36)
```


::: warning 
THE FUSED RING — the rosette (Z/7) and the vortex (Z/9) are coprime, so by the Chinese Remainder Theorem they are ONE ring of 63 states, and its arithmetic explains the captain measure: the two coins buy 64 = 63 + 1, the whole fused structure plus the unit that closes it (63 = 111111, saturated in six bits; 64 = 1000000, the first bit beyond). The boundary is confirmed by the wing's own sealed theorems — e.g. [captain_theorem_the_coins_buy_the_ring_and_one](/theorem/captain_theorem_the_coins_buy_the_ring_and_one) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
