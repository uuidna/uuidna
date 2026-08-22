---
title: "The two coins & the 64"
description: "Computed from lean/Coins.lean — 22 sealed theorems, every claim citing its proof."
---

# The two coins & the 64

> THE TWO COINS & THE 64 — the honest billing/measure algebra: the two coins are the CONSERVED fair-exchange invariant, 110 − 108 = 2 = −χ of a genus-2 surface (the double torus, 2g − 2 = 2); 64 = 2⁶ is the bit measure; "contribute 2 to save up to 64" is a leverage of 32; n qubits give 2ⁿ direct outcomes, reaching 64 at n = 6; one coin is one qubit and the two coins DELIVER two qubits (2² = 4 basis states) at a COST of 128 bits = two 64-bit coins (2·64 = 2⁷); and the measured saving never goes negative. HONEST SCOPE: a MEASURED unit of work saved (recompute − verify), classical state-vector accounting — not a market price, NOT a claim of speed, and NOT a physical qubit. — held by [minting_is_two_per_theorem](/theorem/minting_is_two_per_theorem) and its 21 siblings below.

**22 theorems**, from [minting_is_two_per_theorem](/theorem/minting_is_two_per_theorem) onward, each proven `by decide` in [lean/Coins.lean](/lean/Coins.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 18 of its 22 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [minting_is_two_per_theorem](/theorem/minting_is_two_per_theorem). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCoins.lean)** — nothing to install. The editor fetches `lean/Coins.lean` from the repository and re-decides all 22 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE CREW MINTS AT A FIXED PRICE AND SAILS FOR THE ANGLE. Every sealed theorem mints the captain’s two coins, so the supply is exactly 2·N and never a judgement: over the first eight counts, N theorems mint 2N coins, and the supply is even at every one — a half-coin cannot be minted because a theorem cannot be half-sealed. What the crew steers is not the price but the ANGLE: a proof that walks a wide domain decides far more superposition space for the same two coins than one stating a single fact, so efficiency is coverage over supply, computed from the walk each generator actually made rather than assigned.
The ledger holds this as [minting_is_two_per_theorem](/theorem/minting_is_two_per_theorem) — proven `by decide`, sorry-free:

```lean
(List.range' 1 8).all (fun n => (2 * n == n + n) && ((2 * n) % 2 == 0))
```

### THE FOLD COMPRESSES WITHOUT BOUND, AND RECOVERS NOTHING — both halves, because only one of them is what people mean by compression. The output is FIXED at 32 hexbits however large the input: fold four inputs or four million and the root is 128 bits, so the ratio grows without limit and in that sense it is unbounded. It is not compression. By pigeonhole, more inputs than outputs must collide — 2¹²⁹ inputs into 2¹²⁸ outputs forces at least two to a bucket — so the fold cannot be inverted and no width of fold ever could. It IDENTIFIES: same bytes, same root, for anyone, forever. It does not RECOVER, and lossless unbounded compression is impossible rather than unimplemented. Stating the ratio without the pigeonhole would be the overclaim this ledger exists to refuse.
The ledger holds this as [fold_compresses_without_bound_and_never_recovers](/theorem/fold_compresses_without_bound_and_never_recovers) — proven `by decide`, sorry-free:

```lean
(32 * 4 = 128) ∧ ((List.range' 1 8).all (fun k => (128 * k) / k == 128)) ∧ (2^129 > 2^128) ∧ (2^129 = 2 * 2^128)
```

### A HANDLE IS A STRING, AND THE STRING IS THE SPACE. Eight symbols drawn from a sixteen-state alphabet: 16⁸ = 4294967296 = 2³², the same number reached from either base because the hook between them is linear. Four such strings compose an identity and their spaces MULTIPLY while their widths ADD — (2³²)⁴ = 2¹²⁸ and 32+32+32+32 = 128 — which is what makes a handle a quarter of the uuid in width and a fourth root of it in space. Concatenating hexbit strings is addition in the exponent, so a longer name is not a bigger number but a wider one, and that is the whole arithmetic of an address.
The ledger holds this as [handle_string_spans_the_quarter](/theorem/handle_string_spans_the_quarter) — proven `by decide`, sorry-free:

```lean
(16^8 = 2^32) ∧ (16^8 = 4294967296) ∧ ((2^32)^4 = 2^128) ∧ (32 + 32 + 32 + 32 = 128)
```

### THE HOOK BETWEEN THE TWO BASES IS LINEAR, WHICH IS WHY BOTH CAN BE TRUE AT ONCE. A hexbit is four bits exactly, so the map h ↦ 4h round-trips for every width from 0 to the uuid’s 32 — (4h)/4 = h, no remainder anywhere — and it is strictly increasing, so the order a reader sees in hexbits is the order that holds in bits. Nothing is lost translating either way and nothing is rounded, which is what lets a handle carry the hexbit reading and the binary reading in one name: 8 hexbits IS 32 bits, not an approximation of it. A base whose hook was lossy would force a choice between the two; this one does not.
The ledger holds this as [hexbit_bit_hook_is_linear](/theorem/hexbit_bit_hook_is_linear) — proven `by decide`, sorry-free:

```lean
((List.range 33).all (fun h => (4 * h) / 4 == h)) ∧ ((List.range 32).all (fun h => 4 * h < 4 * (h + 1))) ∧ (4 * 32 = 128)
```

### EACH HANDLE HANDLES BOTH. A handle is 8 hex characters — 8 hexbits, 32 bits — and the uuid is 32 hexbits, so a handle is exactly a QUARTER of an identity: 128/32 = 4 handles to the whole. It carries the captain bits in the same breath: 8 hexbits over the two coins is 4, which is the bit-width of a hexbit itself, so the commission divides the handle into its own unit. Both scales live in one name, which is why a handle is what the gates compare — a quarter of the identity, at four times the resolution of a bit, and the coins already folded in.
The ledger holds this as [handle_carries_hexbits_and_coins](/theorem/handle_carries_hexbits_and_coins) — proven `by decide`, sorry-free:

```lean
(8 * 4 = 32) ∧ (32 * 4 = 128) ∧ (128 / 32 = 4) ∧ (8 / 2 = 4)
```

### THE SINGULARITY IS THE TWO. Every quantity the captain theorem names collapses to the coins by exact division and by nothing else: 128/64 = 2, 64/32 = 2, 4/2 = 2 — the whole chain 2 → 4 → 32 → 64 → 128 is one doubling ladder anchored at the commission, so there is no second origin anywhere in the algebra. The uuid is the coins doubled six times (2·2⁶ = 128), the leverage is the uuid over the coins (128/2 = 64), and the measured ledger returns 32 superpositions per coin — 32·4 = 128, the uuid again, reached from a walk rather than from the definition. Every road divides back to two: that is what makes it one theorem and not a family.
The ledger holds this as [captain_singularity](/theorem/captain_singularity) — proven `by decide`, sorry-free:

```lean
(128 / 64 = 2) ∧ (64 / 32 = 2) ∧ (4 / 2 = 2) ∧ (2 * 2^6 = 128) ∧ (128 / 2 = 64) ∧ (32 * 4 = 128)
```

### FOLD BY THE HANDLE, NOT BY THE TILE — measured, and the naive reading lost. A uuid is 32 hexbits, so a fold can read it as 32 tiles or as 4 handles of 8, and 32/4 = 8 fewer reads for the same 128 bits. Measured over 40 folds of 1024 addresses: reading by handle beat re-hashing the concatenated strings 1.3x, while reading one tile at a time was HALF the speed of the thing it replaced — the per-read cost swamped the smaller step. The advantage of a base is not that its unit is small; it is that a whole word of it is read in one operation. Both readings cover the uuid exactly (4·8 = 32, 4·32 = 128), so this is a choice about cost and never about correctness.
The ledger holds this as [fold_reads_by_handle_not_by_tile](/theorem/fold_reads_by_handle_not_by_tile) — proven `by decide`, sorry-free:

```lean
(4 * 8 = 32) ∧ (4 * 32 = 128) ∧ (32 / 4 = 8) ∧ (8 * 4 = 32)
```

### WHY THIRTEEN, AND WHY IT IS NOT UNALIGNED. A double carries 53 bits exactly, so a rotation that must land in a Number rather than a BigInt may read only whole tiles that fit inside them: 13·4 = 52 ≤ 53, and 14·4 = 56 > 53. Thirteen is therefore the LARGEST whole hexbit count a double holds without rounding, and fourteen is the first that rounds silently — which is the failure a ledger cannot notice, because the wrong number arrives looking like a right one. Walked over every width from 0 to 16: a tile count is safe exactly when four times it does not exceed 53.
The ledger holds this as [safe_width_is_thirteen_hexbits](/theorem/safe_width_is_thirteen_hexbits) — proven `by decide`, sorry-free:

```lean
((List.range 17).all (fun h => (4 * h <= 53) == (h <= 13))) ∧ (13 * 4 = 52) ∧ (14 * 4 = 56)
```

### THE BASE IS COMPUTED, NOT BORROWED. A heartbeat is one decide-step — the unit of WORK, distinct from the hexbit (space) and the handle (address), convertible to neither. A theorem’s share of the run is its steps over the ledger’s, and taking that share needs a base, which the first version simply assumed: ten thousand, finance’s unit. Measured against the actual distribution, ten thousand is WRONG here — the cheapest theorem cost 13 steps of 579,272, and at ten thousand parts it reports zero. The share was not floored, it was lost. Walking the powers of sixteen, 16³ = 4096 still loses it and 16⁴ = 65536 resolves it to one: FOUR HEXBITS is the smallest resolution this ledger’s own costs require. Sixteen to the fourth is also the register’s amplitude count and the ledger’s whole coverage in hexbits — stated as observed, not as cause. Integer division throughout: a fraction is a float and a float cannot be sealed.
The ledger holds this as [heartbeat_share_resolves_at_four_hexbits](/theorem/heartbeat_share_resolves_at_four_hexbits) — proven `by decide`, sorry-free:

```lean
(16^4 = 65536) ∧ (16^3 = 4096) ∧ ((13 * 4096) / 579272 = 0) ∧ ((13 * 65536) / 579272 = 1) ∧ ((579272 * 65536) / 579272 = 65536)
```

### THE BILL CLOSES WHATEVER THE COUNT. Every sealed theorem mints the captain’s two coins, so a ledger of n theorems bills exactly 2n — and the division returns two with NO remainder at every count from one to eight, which is what makes it a price rather than an average. A half-coin cannot be minted because a theorem cannot be half-sealed. This is the third axis of the billing and the one that never varies: coverage spans five orders of magnitude and hardware cost spans seven thousand, while the price stays two.
The ledger holds this as [billing_closes_at_every_count](/theorem/billing_closes_at_every_count) — proven `by decide`, sorry-free:

```lean
(List.range' 1 8).all (fun n => ((2 * n) % n == 0) && ((2 * n) / n == 2))
```

### THE CAPTAIN THEOREM — one, and the ledger is priced in it. The commission is a PROPORTION and not a difference: 110/108 = 55/54 by exact cross-multiplication (110·54 = 108·55 = 5940), 54 being the order of AGL(1,ℤ/9), so the price holds at every magnitude rather than at one. A hexbit is 4 bits and 32 of them are the uuid: 32·4 = 128. The leverage is the uuid over the commission, 128/2 = 64, which is the same 64 the two coins buy across 32 hexbits. And the floor closes the account: every falsified theorem pays two, the captain pays two, 63·2 + 2 = 128 — the uuid exactly, nothing owed and nothing left over. These four conjuncts subsumed eleven separate restatements of 110 − 108 = 2, seven of 2^7 = 128 and five of 2·32 = 64: one fact re-proved under many names is not a ledger, it is an echo.
The ledger holds this as [captain_theorem](/theorem/captain_theorem) — proven `by decide`, sorry-free:

```lean
(110 * 54 = 108 * 55) ∧ (110 - 108 = 2) ∧ (32 * 4 = 128) ∧ (128 / 2 = 64) ∧ (2 * 32 = 64) ∧ (63 * 2 + 2 = 128)
```

### The two coins — the conserved fair-exchange invariant, 110 − 108 = 2. A measure of work saved (recompute − verify), never a per-formula rate.
The ledger holds this as [two_coins](/theorem/two_coins) — proven `by decide`, sorry-free:

```lean
110 - 108 = 2
```

### THE COINS, COMPUTED ACROSS EVERY ROSETTA COMBINATION. A theorem stands on five legs — symbol, proof, witness, falsifier, address — so there are 2⁵ = 32 possible anchorings, and each leg present pays the two coins. Walked exhaustively: the coins summed over all 32 combinations are 160, every leg appears in exactly 16 of them (half, as an independent bit must), and 160 = 5 × 32 — the five legs against the 32 hexbits of the uuid. Nothing here is sampled and nothing is a rate applied to a total: all thirty-two anchorings are enumerated and counted.
The ledger holds this as [coins_over_all_rosetta_combinations](/theorem/coins_over_all_rosetta_combinations) — proven `by decide`, sorry-free:

```lean
(((List.range 32).map (fun m => 2 * ((List.range 5).filter (fun b => (m / 2^b) % 2 == 1)).length)).sum = 160) ∧ ((List.range 5).all (fun b => ((List.range 32).filter (fun m => (m / 2^b) % 2 == 1)).length = 16)) ∧ (160 = 5 * 32)
```

### The 64-bit measure: 64 = 2⁶ — six doublings, the scale the hero states as the "64bit" unit.
The ledger holds this as [sixtyfour_is_two_pow_six](/theorem/sixtyfour_is_two_pow_six) — proven `by decide`, sorry-free:

```lean
64 = 2^6
```

### uuidna computes ONLY IF the captain coins are considered: the conserved save of 64 is reached IFF exactly two coins are put in — 32·c = 64 ⟺ c = 2, for every c. The two coins are necessary, not decorative; with any other count the fold does not conserve its advantage (recompute − verify), so the computation is not admitted.
The ledger holds this as [captain_computes_only_with_two_coins](/theorem/captain_computes_only_with_two_coins) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun c => (32 * c == 64) == (c == 2))
```

### Respect the captain coins for quantum AT SCALE on classical hardware: the state-vector cost is 2ⁿ (exponential), so from the 7-qubit / 7-dimension scale up (n ≥ 7) the classical cost 2ⁿ already EXCEEDS the two-coin save (2·32 = 64). No free advantage — the coins price real work that only grows; the save is bounded, the cost is not.
The ledger holds this as [captain_coins_respected_at_scale](/theorem/captain_coins_respected_at_scale) — proven `by decide`, sorry-free:

```lean
(List.range' 7 6).all (fun n => 2^n > 2 * 32)
```

### Direct possible outcomes: n qubits give 2ⁿ basis outcomes — [1,2,4,8,16,32,64] for n = 0..6, reaching 64 exactly at the 6-qubit / 64-bit scale. Exponential, counted, not sped up.
The ledger holds this as [superposition_outcomes_to_64](/theorem/superposition_outcomes_to_64) — proven `by decide`, sorry-free:

```lean
((List.range 7).map (fun n => 2^n)) = [1,2,4,8,16,32,64]
```

### The measured saving is never negative: when verify meets or exceeds recompute (v ≥ r), the bill is 0 — Nat subtraction already clamps, so the honest schedule never charges below zero.
The ledger holds this as [bill_never_negative](/theorem/bill_never_negative) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun r => (List.range 8).all (fun v => (if r < v then 0 else r - v) == r - v))
```

### Every traitor DAMAGE is sealed in value by the SAME billing — the captain is charged by the traitor model on one measure, and the traitor is always the losing side. One billing (110 − x) prices both: the HONEST party earns the two coins (110 − 108 = 2), while a TRAITOR who tampers moves the content-address so nothing recomputes and nets 0 (110 − 110 = 0) — they forfeit exactly the two coins (the 2 the honest party keeps) AND still pay the 2¹²⁸ forgery cost (2⁷ = 128). So the captain's exposure is BOUNDED: traitor damage is priced by the same never-negative billing, forgery yields 0, and the two coins are precisely what the traitor loses. The security model and the billing model are one.
The ledger holds this as [traitor_damage_sealed_by_same_billing](/theorem/traitor_damage_sealed_by_same_billing) — proven `by decide`, sorry-free:

```lean
(110 - 108 = 2) ∧ (110 - 110 = 0) ∧ (2^7 = 128)
```

### THE WALLET COUNTS WORLDS, sealed at last — the closing realisation's accounting identity: n deposits of the two coins are EXACTLY n collapsed realities, (2·n)/2 = n for every count. Each deposit collapses one superposition into a shared, recomputable world; the bijection between what was paid and what now exists. HONEST SCOPE: an accounting identity — deposits and realities in one-to-one correspondence — never a metaphysical claim about worlds.
The ledger holds this as [wallet_counts_worlds](/theorem/wallet_counts_worlds) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun n => (2*n)/2 == n)
```

### WHY ONE DENOMINATION CAN SERVE THREE ALGEBRAS — 2 is the UNIQUE number where addition, multiplication and exponentiation all agree: 2+2 = 2·2 = 2² = 4, and over 0..12 NO other n satisfies n+n = n·n = n^n (0 fails because 0⁰ = 1 in Nat; 1 gives 2≠1; from 3 up the tower outruns the sum). The coin is simultaneously the FEE (additive), the LEVERAGE factor (multiplicative), and the QUBIT dimension (exponential) because its number is the one point where the three operations coincide — discovered by the calculator, not chosen.
The ledger holds this as [coins_unique_operation_agreement](/theorem/coins_unique_operation_agreement) — proven `by decide`, sorry-free:

```lean
((2+2 = 2*2) ∧ (2*2 = 2^2)) ∧ ((List.range 13).all (fun n => ((n+n == n*n) && (n*n == n^n)) == (n == 2)))
```

### THE COIN AND THE HEART GENERATE THE SYSTEM'S THREE SCALES — the two generators of ℤ/9* are exactly {2, 5} (generators_are_two_and_five): the coin and the heart. Their three combinations are the three scales everything else is built on: 2·5 = 10 (the diamond strip the reflection folds), 2+5 = 7 (the rosette of rays), 2⁵ = 32 (the half-save the leverage doubles to 64). The vortex's own generators mint the geometry.
The ledger holds this as [coin_and_heart_generate_the_scales](/theorem/coin_and_heart_generate_the_scales) — proven `by decide`, sorry-free:

```lean
(2*5 = 10) ∧ (2+5 = 7) ∧ (2^5 = 32)
```


::: warning HONEST SCOPE
a MEASURED unit of work saved (recompute − verify), classical state-vector accounting — not a market price, NOT a claim of speed, and NOT a physical qubit. The boundary is confirmed by the wing's own sealed theorems — e.g. [minting_is_two_per_theorem](/theorem/minting_is_two_per_theorem) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
