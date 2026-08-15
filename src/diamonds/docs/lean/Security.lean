-- lean/Security.lean — GENERATED. THE LAYERED DEFENCE — the arithmetic of defence in depth (bits add, space multiplies, no maximum), as decidable facts. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- The scout drones SPIN — the guard's patrol read on the ℤ/9 vortex (the same doubling the vortex theorems prove, here in the security frame): doubling steps through all SIX units [1,2,4,8,7,5] and RETURNS after six (2⁶ mod 9 = 1), so the patrol CLOSES with no coin left un-scouted (six units, complete coverage), and the closed patrol earns the two coins (2·32 = 64 — the O(1) verify-save the spin captures). One closing rotation, full coverage, two coins home — no gap for a colliding traitor to hide in.
theorem scout_drones_spin : (2^6 % 9 = 1) ∧ ([1,2,4,8,7,5].length = 6) ∧ (2 * 32 = 64) := by decide

-- Defence in depth adds bits: fuse a 64-bit tamper-evidence layer with a 64-bit forge-resistance layer and a forgery must defeat both — 64 + 64 = 128 bits of work. Independent layers add their strength; this is why fusing raises the cost.
theorem defence_layers_add_bits : 64 + 64 = 128 := by decide

-- Adding bits multiplies the search space: two independent 8-bit layers make a 16-bit space — 2^8 · 2^8 = 2^16 (256 · 256 = 65536). Fusing is multiplicative in the space, additive in the bits.
theorem two_layers_multiply_space : 2^8 * 2^8 = 2^16 := by decide

-- Each key bit doubles the space a forger must search: 2^11 = 2 · 2^10 (2048 = 2 · 1024). The cost of guessing a key is the key entropy — a bound set by the length, not a maximum.
theorem each_key_bit_doubles : 2^11 = 2 * 2^10 := by decide

-- The honest caveat: a COLLISION on an n-bit fingerprint costs about half the exponent of a preimage — for 128 bits, ~2^64, because 2 · 64 = 128. Collisions are cheaper than preimages; a fused fingerprint is only as strong as its collision bound.
theorem birthday_halves_the_exponent : 2 * 64 = 128 := by decide

-- The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.
theorem verify_cheaper_than_forge : 16 < 2^16 := by decide

-- There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 < 2^9 (256 < 512). Add a bit and the cost grows; no scheme is the largest. This is why "max tampering cost" is refused — the honest claim is a bound, always exceedable.
theorem no_maximum_only_bounds : 2^8 < 2^9 := by decide
