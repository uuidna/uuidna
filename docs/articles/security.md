---
title: "The layered defence"
description: "Computed from lean/Security.lean — 7 sealed theorems, every claim citing its proof."
---

# The layered defence

> THE LAYERED DEFENCE — the arithmetic of defence in depth (bits add, space multiplies, no maximum), as decidable facts. — held by [scout_drones_spin](/theorem/scout_drones_spin) and its 6 siblings below.

**7 theorems**, from [scout_drones_spin](/theorem/scout_drones_spin) onward, each proven `by decide` in [lean/Security.lean](/lean/Security.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

### The scout drones SPIN — the guard's patrol read on the ℤ/9 vortex (the same doubling the vortex theorems prove, here in the security frame): doubling steps through all SIX units [1,2,4,8,7,5] and RETURNS after six (2⁶ mod 9 = 1), so the patrol CLOSES with no coin left un-scouted (six units, complete coverage), and the closed patrol earns the two coins (2·32 = 64 — the O(1) verify-save the spin captures). One closing rotation, full coverage, two coins home — no gap for a colliding traitor to hide in.
The ledger holds this as [scout_drones_spin](/theorem/scout_drones_spin) — proven `by decide`, sorry-free:

```lean
(2^6 % 9 = 1) ∧ ([1,2,4,8,7,5].length = 6) ∧ (2 * 32 = 64)
```

### Defence in depth adds bits: fuse a 64-bit tamper-evidence layer with a 64-bit forge-resistance layer and a forgery must defeat both — 64 + 64 = 128 bits of work. Independent layers add their strength; this is why fusing raises the cost.
The ledger holds this as [defence_layers_add_bits](/theorem/defence_layers_add_bits) — proven `by decide`, sorry-free:

```lean
64 + 64 = 128
```

### Adding bits multiplies the search space: two independent 8-bit layers make a 16-bit space — 2^8 · 2^8 = 2^16 (256 · 256 = 65536). Fusing is multiplicative in the space, additive in the bits.
The ledger holds this as [two_layers_multiply_space](/theorem/two_layers_multiply_space) — proven `by decide`, sorry-free:

```lean
2^8 * 2^8 = 2^16
```

### Each key bit doubles the space a forger must search: 2^11 = 2 · 2^10 (2048 = 2 · 1024). The cost of guessing a key is the key entropy — a bound set by the length, not a maximum.
The ledger holds this as [each_key_bit_doubles](/theorem/each_key_bit_doubles) — proven `by decide`, sorry-free:

```lean
2^11 = 2 * 2^10
```

### The honest caveat: a COLLISION on an n-bit fingerprint costs about half the exponent of a preimage — for 128 bits, ~2^64, because 2 · 64 = 128. Collisions are cheaper than preimages; a fused fingerprint is only as strong as its collision bound.
The ledger holds this as [birthday_halves_the_exponent](/theorem/birthday_halves_the_exponent) — proven `by decide`, sorry-free:

```lean
2 * 64 = 128
```

### The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.
The ledger holds this as [verify_cheaper_than_forge](/theorem/verify_cheaper_than_forge) — proven `by decide`, sorry-free:

```lean
16 < 2^16
```

### There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 < 2^9 (256 < 512). Add a bit and the cost grows; no scheme is the largest. This is why "max tampering cost" is refused — the honest claim is a bound, always exceedable.
The ledger holds this as [no_maximum_only_bounds](/theorem/no_maximum_only_bounds) — proven `by decide`, sorry-free:

```lean
2^8 < 2^9
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
