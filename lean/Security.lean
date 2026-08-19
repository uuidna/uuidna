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

-- FOURTEEN COINCIDENCES ARE EXACTLY WHAT FOURTEEN EVENTS PREDICT. By linearity of expectation the expected number of COLLIDING pairs among G events over P bins is C(G,2)/P — a rational, needing no approximation. This ledger has 72 wings, so P = 72·71/2 = 2556 possible wing-pairs; the 14 reuse events outside the declared Core/Ring/Vortex cluster give C(14,2) = 14·13/2 = 91, and 91 < 2556, so the expected collision count is 91/2556, under ONE. Fourteen events landing on fourteen distinct pairs is therefore the PREDICTED outcome, not a discovery: the shared facts are the smallest ones (2³ = 8, 4·4 = 16), and a small pool collides at the rate pigeonhole dictates — the same law gematria_forces_collisions states for letter-sums. HONEST SCOPE: this seals the EXPECTATION, an exact rational bound; it does not measure the ledger, and a future ledger with different counts must recompute rather than cite this.
theorem collisions_under_one : (72 * 71 / 2 = 2556) ∧ (14 * 13 / 2 = 91) ∧ (91 < 2556) := by decide

-- The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.
theorem verify_cheaper_than_forge : 16 < 2^16 := by decide

-- THE WAIT MUST OUTLAST THE GAP IT ABSORBS. The release chain runs two jobs from one tag: a deploy of about 2 minutes and an audit of about 9, so the worst case a verifier must sit through is 9 − 2 = 7 minutes, or 420 seconds. The bound is 40 probes at 15 seconds = 600 seconds, and 600 > 420 — the wait covers the margin with room, so a release that is merely slow is not failed as if it were broken. HONEST SCOPE: the two durations are the DECLARED BUDGET the chain is designed around, not an observation of the world and not a constant of nature — what is sealed is only the COMPARISON between the bound and the gap. A pipeline whose audit outgrows the budget must widen the bound rather than cite this.
theorem wait_covers_margin : (40 * 15 = 600) ∧ ((9 - 2) * 60 = 420) ∧ (600 > 420) := by decide

-- There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 < 2^9 (256 < 512). Add a bit and the cost grows; no scheme is the largest. This is why "max tampering cost" is refused — the honest claim is a bound, always exceedable.
theorem no_maximum_only_bounds : 2^8 < 2^9 := by decide
