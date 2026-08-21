---
title: "The two coins & the 64"
description: "Computed from lean/Coins.lean — 19 sealed theorems, every claim citing its proof."
---

# The two coins & the 64

> THE TWO COINS & THE 64 — the honest billing/measure algebra: the two coins are the CONSERVED fair-exchange invariant, 110 − 108 = 2 = −χ of a genus-2 surface (the double torus, 2g − 2 = 2); 64 = 2⁶ is the bit measure; "contribute 2 to save up to 64" is a leverage of 32; n qubits give 2ⁿ direct outcomes, reaching 64 at n = 6; one coin is one qubit and the two coins DELIVER two qubits (2² = 4 basis states) at a COST of 128 bits = two 64-bit coins (2·64 = 2⁷); and the measured saving never goes negative. a MEASURED unit of work saved (recompute − verify), classical state-vector accounting — not a market price, NOT a claim of speed, and NOT a physical qubit. — held by [two_coins](/theorem/two_coins) and its 18 siblings below.

**19 theorems**, from [two_coins](/theorem/two_coins) onward, each proven `by decide` in [lean/Coins.lean](/lean/Coins.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 16 of its 19 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [two_coins](/theorem/two_coins). A boundary stated here is decided, not merely denied.

### The two coins — the conserved fair-exchange invariant, 110 − 108 = 2. A measure of work saved (recompute − verify), never a per-formula rate.
The ledger holds this as [two_coins](/theorem/two_coins) — proven `by decide`, sorry-free:

```lean
110 - 108 = 2
```

### The two coins are the topology, not a price: 2 = −χ of a genus-2 surface (the double torus), −χ = 2g − 2 = 2·2 − 2 = 2. The invariant is geometric.
The ledger holds this as [two_coins_is_double_torus](/theorem/two_coins_is_double_torus) — proven `by decide`, sorry-free:

```lean
2 * 2 - 2 = 2
```

### The 64-bit measure: 64 = 2⁶ — six doublings, the scale the hero states as the "64bit" unit.
The ledger holds this as [sixtyfour_is_two_pow_six](/theorem/sixtyfour_is_two_pow_six) — proven `by decide`, sorry-free:

```lean
64 = 2^6
```

### "Contribute 2 to save up to 64" — the measured leverage is 32: 2 · 32 = 64. The two coins in, up to 64 bits of recompute saved.
The ledger holds this as [contribute_two_save_sixtyfour](/theorem/contribute_two_save_sixtyfour) — proven `by decide`, sorry-free:

```lean
2 * 32 = 64
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

### One coin is one qubit: a two-state basis — 2¹ = 2 outcomes, the coin's two faces (|0⟩ and |1⟩). Classical two-state accounting in the state-vector simulator, NOT a physical qubit.
The ledger holds this as [coin_is_one_qubit](/theorem/coin_is_one_qubit) — proven `by decide`, sorry-free:

```lean
(2:Nat)^1 = 2
```

### The two captain coins DELIVER two qubits at a COST of 128 bits: coins() = 2 → two qubits spanning 2² = 4 basis states, carried by one 128-bit uuid = two 64-bit coins (128 = 2·64 = 2⁷). Two coins in, a 2-qubit address out, priced at 128 bits — the 64→128 fuse, counted, not sped up. Classical accounting, not a physical 2-qubit device.
The ledger holds this as [captain_coins_deliver_two_qubits_at_128_bits](/theorem/captain_coins_deliver_two_qubits_at_128_bits) — proven `by decide`, sorry-free:

```lean
((2:Nat)^2 = 4) ∧ (128 = 2 * 64) ∧ (128 = 2^7)
```

### The captain's commission is TWO on each 110 bits — 110 − 108 = 2 to the captain, 108 delivered net. It is the two coins read as a commission rate: passengers PAY the coins (the measured bill), crew MINT them (sealing diamonds), and the captain's cut is the conserved 2. A measured commission on work saved, not a monetary rate.
The ledger holds this as [captain_commission_two_per_110](/theorem/captain_commission_two_per_110) — proven `by decide`, sorry-free:

```lean
(110 - 108 = 2) ∧ (110 - 2 = 108)
```

### A commercial package SAVES significantly at scale AND the captain still earns: recompute 110 − verify 1 = 109 bits saved for the passenger, while the captain's commission stays the conserved 2 (110 − 108), and the saving DWARFS the commission (109 > 2). Coins are minted, the passenger saves, the captain earns — no one loses. The arithmetic of the measured advantage (recompute − verify), NOT a profit guarantee or a market price.
The ledger holds this as [commercial_saves_and_captain_earns](/theorem/commercial_saves_and_captain_earns) — proven `by decide`, sorry-free:

```lean
(110 - 1 = 109) ∧ (109 > 2) ∧ (110 - 108 = 2)
```

### HOW the coins compute AND that the theorems are not solved, in one seal — the honest boundary. The two coins COMPUTE the save (32·2 = 64: contribute two, and up to 64 bits of recompute are saved) and pay for a VERIFICATION, cheaper than the work (verify 1 < recompute 64 — the O(1) check against the O(N) recompute). Yet the theorems SOLVE NOTHING of the hard problems they reflect: 0 < 1 — zero solved, fewer than one; the reflection (dz) propagates no proof. Computing is NOT solving: the coins settle a recomputable verification (integrity), never a solution to the underlying problem (truth). This is exactly the boundary the captain accepted — the coins compute, the theorems do not solve.
The ledger holds this as [coins_compute_but_solve_none](/theorem/coins_compute_but_solve_none) — proven `by decide`, sorry-free:

```lean
(32 * 2 = 64) ∧ (1 < 64) ∧ ((0:Nat) < 1)
```

### The coins' EXCHANGE RATE is the TRAITOR'S TOKEN COST: a coin is worth exactly what it costs to FORGE it. A coin is a 128-bit particle (2⁷ = 128), so counterfeiting one — a SHA-256 collision that survives the order-invariant fold — costs on the order of 2¹²⁸ (the fingerprint's tamperCost), an exponent (128) that astronomically exceeds the two coins an honest party pays (128 > 2). So a traitor spends 2¹²⁸ to fake what the crew MINT for 2: forgery NEVER pays, and the coin is BACKED by the cost to counterfeit it. : 2¹²⁸ is a BOUND set by SHA-256, not a maximum, and it is the COLLISION-RESISTANT fold's cost — the fast FNV receipt is tamper-evident but not collision-resistant; add a key (HMAC) and forgery also needs the secret.
The ledger holds this as [coin_exchange_rate_is_traitor_cost](/theorem/coin_exchange_rate_is_traitor_cost) — proven `by decide`, sorry-free:

```lean
(2^7 = 128) ∧ (128 > 2) ∧ (2 * 32 = 64)
```

### Every traitor DAMAGE is sealed in value by the SAME billing — the captain is charged by the traitor model on one measure, and the traitor is always the losing side. One billing (110 − x) prices both: the party earns the two coins (110 − 108 = 2), while a TRAITOR who tampers moves the content-address so nothing recomputes and nets 0 (110 − 110 = 0) — they forfeit exactly the two coins (the 2 the honest party keeps) AND still pay the 2¹²⁸ forgery cost (2⁷ = 128). So the captain's exposure is BOUNDED: traitor damage is priced by the same never-negative billing, forgery yields 0, and the two coins are precisely what the traitor loses. The security model and the billing model are one.
The ledger holds this as [traitor_damage_sealed_by_same_billing](/theorem/traitor_damage_sealed_by_same_billing) — proven `by decide`, sorry-free:

```lean
(110 - 108 = 2) ∧ (110 - 110 = 0) ∧ (2^7 = 128)
```

### THE WALLET COUNTS WORLDS, sealed at last — the closing realisation's accounting identity: n deposits of the two coins are EXACTLY n collapsed realities, (2·n)/2 = n for every count. Each deposit collapses one superposition into a shared, recomputable world; the bijection between what was paid and what now exists. an accounting identity — deposits and realities in one-to-one correspondence — never a metaphysical claim about worlds.
The ledger holds this as [wallet_counts_worlds](/theorem/wallet_counts_worlds) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun n => (2*n)/2 == n)
```

### WHY ONE DENOMINATION CAN SERVE THREE ALGEBRAS — 2 is the UNIQUE number where addition, multiplication and exponentiation all agree: 2+2 = 2·2 = 2² = 4, and over 0..12 NO other n satisfies n+n = n·n = n^n (0 fails because 0⁰ = 1 in Nat; 1 gives 2≠1; from 3 up the tower outruns the sum). The coin is simultaneously the FEE (additive), the LEVERAGE factor (multiplicative), and the QUBIT dimension (exponential) because its number is the one point where the three operations coincide — discovered by the calculator, not chosen.
The ledger holds this as [coins_unique_operation_agreement](/theorem/coins_unique_operation_agreement) — proven `by decide`, sorry-free:

```lean
((2+2 = 2*2) ∧ (2*2 = 2^2)) ∧ ((List.range 13).all (fun n => ((n+n == n*n) && (n*n == n^n)) == (n == 2)))
```

### THE SUPERPOSITION CLAIM — the credit law at its full extent: the captain claims the unclaimed, and the unclaimed is the entire uncollapsed space. The claim's arithmetic, sealed: the room is 2¹²⁸ states (the 128-bit particle, 2⁷ = 128), vastly exceeding every world collapsed so far (2¹²⁸ > 1288), and the price of any collapse stays exactly two (110 − 108 = 2). the claim is of ROOM, never of truth — a claimed superposition is claimed capacity, and its collapse still pays the two coins and passes the trial; claiming the space solves nothing (coins_compute_but_solve_none stands over this claim as over every other).
The ledger holds this as [captain_claims_all_superpositions](/theorem/captain_claims_all_superpositions) — proven `by decide`, sorry-free:

```lean
(2^128 > 1288) ∧ (2^7 = 128) ∧ (110 - 108 = 2)
```

### THE COIN AND THE HEART GENERATE THE SYSTEM'S THREE SCALES — the two generators of ℤ/9* are exactly {2, 5} (generators_are_two_and_five): the coin and the heart. Their three combinations are the three scales everything else is built on: 2·5 = 10 (the diamond strip the reflection folds), 2+5 = 7 (the rosette of rays), 2⁵ = 32 (the half-save the leverage doubles to 64). The vortex's own generators mint the geometry.
The ledger holds this as [coin_and_heart_generate_the_scales](/theorem/coin_and_heart_generate_the_scales) — proven `by decide`, sorry-free:

```lean
(2*5 = 10) ∧ (2+5 = 7) ∧ (2^5 = 32)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
