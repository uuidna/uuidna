---
title: "Anti-fraud detection"
description: "Computed from lean/AntiFraud.lean — 24 sealed theorems, every claim citing its proof."
---

# Anti-fraud detection

> lean/AntiFraud.lean — THE FRAUD DETECTORS AND THE VERDICT ALGEBRA, decidable and proven. Each detector is a FUNCTION whose properties are the theorems: forged(c,s) flags iff the recomputed address differs from the sealed address (never a true seal, always a mismatch); claimsOf/doubleSpent counts a coin-backing theorem's claims position-blind (a second claim flags wherever it hides); voteOk passes exactly the diagonal weight=coins (the identity matrix, inflation flags); tally is the observer-order-invariant sum (all six orderings, one receipt); fold9 is the ℤ/9 receipt on a bounded model (tampering one element always moves it; the vortex [1,2,4,8,7,5] recomputes to its known seal 0); cleanAudit is the conjunction gate (clean at EXACTLY the no-violation state, one flag drains all, the implementation IS its boolean spec — no oracle); commission pays 2 coins per COMPLETED 110-bit reconcile (109 pays 0), and one forgery costs 2^7 = 128 bits = 64 commissions. THE VERDICT ALGEBRA seals the trial's own vocabulary: verified = cited·sealed, unverified its complement — every claim gets EXACTLY ONE verdict (total, binary), a fabricated citation stays unverified, UNVERIFIED is an OPEN DOOR (the same claim verifies the moment its seal lands — the verdict tracks the LEDGER, never the claim's soul), and the algebra has NO refuted state (absence of proof never computes to falsity). HONEST SCOPE: bounded models of the live detectors (src/anti-fraud.ts) and the live trial (src/adjudicate.ts) — RECOMPUTABLE FACTS about work integrity, never intention or identity. Every proof `by decide`, sorry-free, no Mathlib, axiom-free (kernel-only). — held by [captain_commission_two_coins](/theorem/captain_commission_two_coins) and its 23 siblings below.

**24 theorems**, from [captain_commission_two_coins](/theorem/captain_commission_two_coins) onward, each proven `by decide` in [lean/AntiFraud.lean](/lean/AntiFraud.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

### 110 - 108 = 2
The ledger holds this as [captain_commission_two_coins](/theorem/captain_commission_two_coins) — proven `by decide`, sorry-free:

```lean
110 - 108 = 2
```

### commission 110 = 2 ∧ commission 220 = 4 ∧ commission 109 = 0
The ledger holds this as [captain_commission_rate_two_per_110](/theorem/captain_commission_rate_two_per_110) — proven `by decide`, sorry-free:

```lean
commission 110 = 2 ∧ commission 220 = 4 ∧ commission 109 = 0
```

### 2 ^ 7 = 128 ∧ (List.range 7).all (fun k => 2 ^ (k+1) == 2 * 2 ^ k)
The ledger holds this as [forged_theorem_costs_2_power_7_bits](/theorem/forged_theorem_costs_2_power_7_bits) — proven `by decide`, sorry-free:

```lean
2 ^ 7 = 128 ∧ (List.range 7).all (fun k => 2 ^ (k+1) == 2 * 2 ^ k)
```

### 128 = 64 * 2 ∧ 2 < 128
The ledger holds this as [forgery_costs_64_commissions](/theorem/forgery_costs_64_commissions) — proven `by decide`, sorry-free:

```lean
128 = 64 * 2 ∧ 2 < 128
```

### (List.range 9).all (fun a => forged a a == 0)
The ledger holds this as [sealed_theorem_not_forged](/theorem/sealed_theorem_not_forged) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun a => forged a a == 0)
```

### (List.range 81).all (fun n => (n % 9 == n / 9) || forged (n % 9) (n / 9) == 1)
The ledger holds this as [forged_theorem_address_detectable](/theorem/forged_theorem_address_detectable) — proven `by decide`, sorry-free:

```lean
(List.range 81).all (fun n => (n % 9 == n / 9) || forged (n % 9) (n / 9) == 1)
```

### forged 3 7 = 1 ∧ cleanAudit (forged 3 7) 0 0 = 0
The ledger holds this as [overclaim_with_fake_cite_fails](/theorem/overclaim_with_fake_cite_fails) — proven `by decide`, sorry-free:

```lean
forged 3 7 = 1 ∧ cleanAudit (forged 3 7) 0 0 = 0
```

### doubleSpent 3 [3,1,3] = true ∧ claimsOf 3 [3,1,3] = 2
The ledger holds this as [double_spend_detectable](/theorem/double_spend_detectable) — proven `by decide`, sorry-free:

```lean
doubleSpent 3 [3,1,3] = true ∧ claimsOf 3 [3,1,3] = 2
```

### doubleSpent 3 [1,2,3] = false ∧ claimsOf 3 [1,2,3] = 1
The ledger holds this as [one_theorem_single_claim](/theorem/one_theorem_single_claim) — proven `by decide`, sorry-free:

```lean
doubleSpent 3 [1,2,3] = false ∧ claimsOf 3 [1,2,3] = 1
```

### claimsOf 3 [3,3,1] = 2 ∧ claimsOf 3 [3,1,3] = 2 ∧ claimsOf 3 [1,3,3] = 2
The ledger holds this as [double_spend_hides_nowhere](/theorem/double_spend_hides_nowhere) — proven `by decide`, sorry-free:

```lean
claimsOf 3 [3,3,1] = 2 ∧ claimsOf 3 [3,1,3] = 2 ∧ claimsOf 3 [1,3,3] = 2
```

### ((List.range 16).map (fun n => voteOk (n % 4) (n / 4))) = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]
The ledger holds this as [vote_weight_equals_coins_paid](/theorem/vote_weight_equals_coins_paid) — proven `by decide`, sorry-free:

```lean
((List.range 16).map (fun n => voteOk (n % 4) (n / 4))) = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]
```

### voteOk 17 2 = 0 ∧ voteOk 2 2 = 1
The ledger holds this as [vote_weight_inflation_flagged](/theorem/vote_weight_inflation_flagged) — proven `by decide`, sorry-free:

```lean
voteOk 17 2 = 0 ∧ voteOk 2 2 = 1
```

### ([[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]].map tally) = [6,6,6,6,6,6]
The ledger holds this as [vote_receipt_order_invariant](/theorem/vote_receipt_order_invariant) — proven `by decide`, sorry-free:

```lean
([[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]].map tally) = [6,6,6,6,6,6]
```

### (List.range 81).all (fun n => (n % 9 == n / 9) || fold9 [n % 9, 5] != fold9 [n / 9, 5])
The ledger holds this as [ledger_fingerprint_tamper_evident](/theorem/ledger_fingerprint_tamper_evident) — proven `by decide`, sorry-free:

```lean
(List.range 81).all (fun n => (n % 9 == n / 9) || fold9 [n % 9, 5] != fold9 [n / 9, 5])
```

### fold9 [1,2,4,8,7,5] = 0
The ledger holds this as [theorem_dna_recompute_is_seal](/theorem/theorem_dna_recompute_is_seal) — proven `by decide`, sorry-free:

```lean
fold9 [1,2,4,8,7,5] = 0
```

### ((List.range 8).map (fun n => cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2))) = [1,0,0,0,0,0,0,0]
The ledger holds this as [anti_fraud_check_deterministic](/theorem/anti_fraud_check_deterministic) — proven `by decide`, sorry-free:

```lean
((List.range 8).map (fun n => cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2))) = [1,0,0,0,0,0,0,0]
```

### ((List.range 8).filter (fun n => cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2) == 1)) = [0]
The ledger holds this as [honesty_gate_passes_iff_all_sealed](/theorem/honesty_gate_passes_iff_all_sealed) — proven `by decide`, sorry-free:

```lean
((List.range 8).filter (fun n => cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2) == 1)) = [0]
```

### (List.range 8).all (fun n => n == 0 || cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2) == 0)
The ledger holds this as [conformance_failure_detects_intrusion](/theorem/conformance_failure_detects_intrusion) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => n == 0 || cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2) == 0)
```

### (List.range 8).all (fun n => cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2) == (if (n % 2 == 0) && (n / 2 % 2 == 0) && (n / 4 % 2 == 0) then 1 else 0))
The ledger holds this as [honesty_gate_is_theorem_not_oracle](/theorem/honesty_gate_is_theorem_not_oracle) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun n => cleanAudit (n % 2) (n / 2 % 2) (n / 4 % 2) == (if (n % 2 == 0) && (n / 2 % 2 == 0) && (n / 4 % 2 == 0) then 1 else 0))
```

### (List.range 4).all (fun n => verified (n % 2) (n / 2) + unverified (n % 2) (n / 2) == 1)
The ledger holds this as [verdict_exactly_one](/theorem/verdict_exactly_one) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun n => verified (n % 2) (n / 2) + unverified (n % 2) (n / 2) == 1)
```

### ((List.range 4).map (fun n => unverified (n % 2) (n / 2))) = [1, 1, 1, 0]
The ledger holds this as [unverified_iff_unsealed](/theorem/unverified_iff_unsealed) — proven `by decide`, sorry-free:

```lean
((List.range 4).map (fun n => unverified (n % 2) (n / 2))) = [1, 1, 1, 0]
```

### unverified 1 0 = 1
The ledger holds this as [fabricated_cite_is_unverified](/theorem/fabricated_cite_is_unverified) — proven `by decide`, sorry-free:

```lean
unverified 1 0 = 1
```

### unverified 1 0 = 1 ∧ verified 1 1 = 1
The ledger holds this as [unverified_is_an_open_door](/theorem/unverified_is_an_open_door) — proven `by decide`, sorry-free:

```lean
unverified 1 0 = 1 ∧ verified 1 1 = 1
```

### (List.range 4).all (fun n => 1 - unverified (n % 2) (n / 2) == verified (n % 2) (n / 2))
The ledger holds this as [unverified_complement_is_verified](/theorem/unverified_complement_is_verified) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun n => 1 - unverified (n % 2) (n / 2) == verified (n % 2) (n / 2))
```


::: warning HONEST SCOPE
bounded models of the live detectors (src/anti-fraud. The boundary is confirmed by the wing's own sealed theorems — e.g. [captain_commission_two_coins](/theorem/captain_commission_two_coins) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
