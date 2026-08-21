---
title: "The fused ring"
description: "Computed from lean/Crt.lean — 8 sealed theorems, every claim citing its proof."
---

# The fused ring

> THE FUSED RING — the rosette (Z/7) and the vortex (Z/9) are coprime, so by the Chinese Remainder Theorem they are ONE ring of 63 states, and its arithmetic explains the captain measure: the two coins buy 64 = 63 + 1, the whole fused structure plus the unit that closes it (63 = 111111, saturated in six bits; 64 = 1000000, the first bit beyond). — held by [captain_theorem_the_coins_buy_the_ring_and_one](/theorem/captain_theorem_the_coins_buy_the_ring_and_one) and its 7 siblings below.

**8 theorems**, from [captain_theorem_the_coins_buy_the_ring_and_one](/theorem/captain_theorem_the_coins_buy_the_ring_and_one) onward, each proven `by decide` in [lean/Crt.lean](/lean/Crt.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

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

### residues_identify_digit
The ledger holds this as [residues_identify_digit](/theorem/residues_identify_digit) — proven `by decide`, sorry-free:

```lean
((List.range 16).all (fun a => (List.range 16).all (fun b => (!((a % 6 == b % 6) && (a % 9 == b % 9))) || (a == b)))) ∧ (2 * 9 = 18) ∧ (18 % 6 = 0) ∧ (18 % 9 = 0) ∧ (18 - 16 = 2)
```

### crt_pairs_are_a_bijection
The ledger holds this as [crt_pairs_are_a_bijection](/theorem/crt_pairs_are_a_bijection) — proven `by decide`, sorry-free:

```lean
(((List.range 63).map (fun x => (x % 7) * 9 + (x % 9))).eraseDups.length = 63)
```

### fused_units_are_the_orbit_squared
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


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
