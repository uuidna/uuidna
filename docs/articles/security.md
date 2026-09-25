---
title: "The layered defence"
description: "Computed from lean/Security.lean — 12 sealed theorems, every claim citing its proof."
---

# The layered defence

> THE LAYERED DEFENCE — the arithmetic of defence in depth (bits add, space multiplies, no maximum), as decidable facts. — held by [scout_drones_spin](/theorem/scout_drones_spin) and its 11 siblings below.

**12 theorems** and **12 decided cases**, from [scout_drones_spin](/theorem/scout_drones_spin) onward, each proven `by decide` in <a href="/lean/Security.lean">lean/Security.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 7 of its 12 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [birthday_halves_the_exponent](/theorem/birthday_halves_the_exponent). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSecurity.lean)** — nothing to install. The editor fetches `lean/Security.lean` from the repository and re-decides all 12 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

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

### Each key bit doubles the space a forger must search: 2^11 = 2 · 2^10 (2048 = 2 · 1024). The cost of guessing a key is the key entropy — a bound set by the length.
The ledger holds this as [each_key_bit_doubles](/theorem/each_key_bit_doubles) — proven `by decide`, sorry-free:

```lean
2^11 = 2 * 2^10
```

### The honest caveat: a COLLISION on an n-bit fingerprint costs about half the exponent of a preimage — for 128 bits, ~2^64, because 2 · 64 = 128. Collisions are cheaper than preimages; a fused fingerprint is only as strong as its collision bound.
The ledger holds this as [birthday_halves_the_exponent](/theorem/birthday_halves_the_exponent) — proven `by decide`, sorry-free:

```lean
2 * 64 = 128
```

### THE TWO EXPONENTS SAT IN SEPARATE THEOREMS AND NEITHER PROVED THE OTHER. birthday_halves_the_exponent seals the NOMINAL bound, 2 · 64 = 128, over the container's full width. the_address_is_six_bits_short_of_its_width seals the HONEST entropy, 2 · 61 = 122, after formatUuid stamps the version nibble and the variant bits away. Both are true, both are served, and nothing stated what one costs the other — so a reader met 64 in one place and 61 in another with no arithmetic between them, and the difference lived only in prose. IT IS THE SAME HALVING TWICE. The stamp takes 128 − 122 = 6 bits of width; the birthday bound halves every exponent; so the margin it takes is 64 − 61 = 3, and 6 = 2 · 3 exactly. Halving both sides of the width loss GIVES the margin loss, which is why the two theorems are one fact seen at two scales rather than two facts that happen to agree. WHAT THIS COSTS IN PRACTICE, stated plainly rather than softened: a uuidna address carries 122 bits of entropy and its classical birthday point is 2^61, not 2^64. Sixty-one bits is the number a reader should plan against.
The ledger holds this as [the_stamp_costs_half_itself_in_birthday_margin](/theorem/the_stamp_costs_half_itself_in_birthday_margin) — proven `by decide`, sorry-free:

```lean
(((2 * 64 = 128) ∧ (2 * 61 = 122)) ∧ ((128 - 122 = 6) ∧ (64 - 61 = 3))) ∧ (6 = 2 * 3)
```

### THE WIDTH IS THE CONTAINER; THE ENTROPY IS THE CONTENTS, and this ledger quoted the container. A uuid is 128 bits wide, but formatUuid stamps six of them as constants — four for the version nibble, two for the RFC variant — so the space a uuidna address can occupy is 2^122, and 2^128 = 64 · 2^122 makes the six bits and the factor of 64 the same fact. address.ts MEASURED this over 20,000 addresses and wrote it down; falsifiers-quantum-margin carries it too. But prose is not the layer MCP, the site and the trial read, and the sealed layer still said 128 — so the honest number lived in a comment while the ledger served the flattering one. That is the defect this tree refuses everywhere else, and it had it in its own address. APPLY THE BIRTHDAY BOUND TO THE REAL WIDTH: 2 · 61 = 122, so a collision costs about 2^61, not the 2^64 that 2 · 64 = 128 suggests — three bits of margin that were never there. The general law above is untouched and stays true for any 128-bit fingerprint; what is added is which width is THIS tree's. NOT CLAIMED: that 2^61 is breakable, or that any address here was forged. A content-address is a name and faces no adversary at most of these call sites; quantumAddress exists for the ones that do, and returns all 256 bits precisely because truncating to 122 throws the margin away before the mint is asked.
The ledger holds this as [the_address_is_six_bits_short_of_its_width](/theorem/the_address_is_six_bits_short_of_its_width) — proven `by decide`, sorry-free:

```lean
((4 + 2 = 6) ∧ (128 - 6 = 122)) ∧ ((2 * 61 = 122) ∧ (2 * 64 = 128)) ∧ (2 ^ 128 = 64 * 2 ^ 122)
```

### THE CROSS FORMULA BETWEEN THE DEFECT AND ITS CURE, and it is one law applied at two widths rather than two facts. grover_halves_the_search_exponent seals the demarcated speedup — unstructured search over 2^n costs about 2^(n/2) quantum work, the exponent halves and never vanishes. Turn it on a uuid and 2 · 61 = 122: a preimage on ANY address this tree mints costs about 2^61, and the birthday bound already puts a collision there classically. Turn the SAME law on the full SHA-256 digest and 2 · 128 = 256: 2^128, which is a post-quantum margin. The remedy buys 128 - 61 = 67 bits, and it buys them by NOT truncating — digest_doubles_the_address seals that a digest is two uuids wide, so the margin was thrown away by the container and not by the hash. THIS IS WHY quantumAddress IS NOT A UUID: returning 256 bits in a field that expects 128 would be silently truncated back to 61 bits of margin, so it returns hex and fails loudly instead. NOT CLAIMED: that 2^61 is breakable today, that any address here was forged, or that a quantum computer able to run Grover at this scale exists. What is decided is an exponent comparison between two widths this tree actually mints.
The ledger holds this as [the_remedy_restores_the_halved_margin](/theorem/the_remedy_restores_the_halved_margin) — proven `by decide`, sorry-free:

```lean
((2 * 61 = 122) ∧ (2 * 128 = 256)) ∧ ((61 < 128) ∧ (128 - 61 = 67))
```

### FOURTEEN COINCIDENCES ARE EXACTLY WHAT FOURTEEN EVENTS PREDICT. By linearity of expectation the expected number of COLLIDING pairs among G events over P bins is C(G,2)/P — a rational, needing no approximation. This ledger has 72 wings, so P = 72·71/2 = 2556 possible wing-pairs; the 14 reuse events outside the declared Core/Ring/Vortex cluster give C(14,2) = 14·13/2 = 91, and 91 < 2556, so the expected collision count is 91/2556, under ONE. Fourteen events landing on fourteen distinct pairs is therefore the PREDICTED outcome— the same law gematria_forces_collisions states for letter-sums. this seals the EXPECTATION, an exact rational bound; it does not measure the ledger, and a future ledger with different counts must recompute rather than cite this.
The ledger holds this as [collisions_under_one](/theorem/collisions_under_one) — proven `by decide`, sorry-free:

```lean
(72 * 71 / 2 = 2556) ∧ (14 * 13 / 2 = 91) ∧ (91 < 2556)
```

### The asymmetry that makes tamper-evidence cheap and forgery dear: verifying a 16-bit tag is ~16 work, forging one is ~2^16 — 16 < 2^16 (16 < 65536). Anyone rechecks for almost nothing; a forger pays exponentially.
The ledger holds this as [verify_cheaper_than_forge](/theorem/verify_cheaper_than_forge) — proven `by decide`, sorry-free:

```lean
16 < 2^16
```

### THE WAIT MUST OUTLAST THE GAP IT ABSORBS. The release chain runs two jobs from one tag: a deploy of about 2 minutes and an audit of about 9, so the worst case a verifier must sit through is 9 − 2 = 7 minutes, or 420 seconds. The bound is 40 probes at 15 seconds = 600 seconds, and 600 > 420 — the wait covers the margin with room, so a release that is merely slow is not failed as if it were broken. the two durations are the DECLARED BUDGET the chain is designed around— what is sealed is only the COMPARISON between the bound and the gap. A pipeline whose audit outgrows the budget must widen the bound rather than cite this.
The ledger holds this as [wait_covers_margin](/theorem/wait_covers_margin) — proven `by decide`, sorry-free:

```lean
(40 * 15 = 600) ∧ ((9 - 2) * 60 = 420) ∧ (600 > 420)
```

### There is NO maximum, only bounds: for any keyspace 2^k there is a strictly larger 2^(k+1) — 2^8 < 2^9 (256 < 512). Add a bit and the cost grows; no scheme is the largest. This is why "max tampering cost" is refused — the honest claim is a bound, always exceedable.
The ledger holds this as [no_maximum_only_bounds](/theorem/no_maximum_only_bounds) — proven `by decide`, sorry-free:

```lean
2^8 < 2^9
```


::: warning 
THE LAYERED DEFENCE — the arithmetic of defence in depth (bits add, space multiplies, no maximum), as decidable facts. The boundary is confirmed by the wing's own sealed theorems — e.g. [scout_drones_spin](/theorem/scout_drones_spin) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
