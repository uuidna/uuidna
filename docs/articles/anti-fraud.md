---
title: "Anti-fraud detection"
description: "Computed from lean/AntiFraud.lean — 8 sealed theorems, every claim citing its proof."
---

# Anti-fraud detection

> THE ANTI-FRAUD DETECTORS — generated, and exhaustive where the wing used to sample. — held by [commission_is_two_per_full_hundred_ten](/theorem/commission_is_two_per_full_hundred_ten) and its 7 siblings below.

**8 theorems**, from [commission_is_two_per_full_hundred_ten](/theorem/commission_is_two_per_full_hundred_ten) onward, each proven `by decide` in [lean/AntiFraud.lean](/lean/AntiFraud.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [commission_is_two_per_full_hundred_ten](/theorem/commission_is_two_per_full_hundred_ten). A boundary stated here is decided, not merely denied.

### THE COMMISSION IS A STEP, NOT A FRACTION: two coins per COMPLETED 110, so 110 pays two, 220 pays four, and 109 pays nothing. A rate that rounded would leak; a floor cannot.
The ledger holds this as [commission_is_two_per_full_hundred_ten](/theorem/commission_is_two_per_full_hundred_ten) — proven `by decide`, sorry-free:

```lean
(commission 110 = 2) ∧ (commission 220 = 4) ∧ (commission 109 = 0)
```

### THE FORGERY DETECTOR IS EXHAUSTIVE over all 81 cited-versus-sealed pairs: it flags exactly the 72 where the two differ and clears exactly the 9 on the diagonal. Every pair walked, so no mismatch has a hiding place.
The ledger holds this as [forgery_flags_every_mismatch](/theorem/forgery_flags_every_mismatch) — proven `by decide`, sorry-free:

```lean
(((List.range 9).flatMap (fun c => (List.range 9).map (fun s => forged c s))).filter (fun x => x == 1)).length = 72 ∧ (((List.range 9).flatMap (fun c => (List.range 9).map (fun s => forged c s))).filter (fun x => x == 0)).length = 9
```

### THE DOUBLE-SPEND DETECTOR, EXHAUSTIVE AT LAST: all 27 length-three claim lists over three theorems are walked, and exactly 21 contain a repeat while 6 do not. The wing formerly sampled four lists by hand — a detector tested on the cases its author imagined is tested against its author, not against fraud.
The ledger holds this as [double_spend_walks_every_list](/theorem/double_spend_walks_every_list) — proven `by decide`, sorry-free:

```lean
(lists.length = 27) ∧ ((lists.filter (fun l => [1,2,3].any (fun t => doubleSpent t l))).length = 21) ∧ ((lists.filter (fun l => !([1,2,3].any (fun t => doubleSpent t l)))).length = 6)
```

### AND IT DOES NOT OVERREACH: a list naming three different theorems flags nothing, so the detector answers to repetition and not to length. Both halves decided — what fires and what must not.
The ledger holds this as [single_claim_never_flags](/theorem/single_claim_never_flags) — proven `by decide`, sorry-free:

```lean
(doubleSpent 1 [1,2,3] = false) ∧ (claimsOf 1 [1,2,3] = 1) ∧ (doubleSpent 3 [3,1,3] = true)
```

### A VOTE PASSES EXACTLY WHEN ITS WEIGHT EQUALS THE COINS PAID, over all sixteen weight-payment pairs up to four: inflation is refused and honest weight is admitted, with no third outcome.
The ledger holds this as [vote_passes_iff_weight_paid](/theorem/vote_passes_iff_weight_paid) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun w => (List.range 4).all (fun c => (voteOk w c == 1) == (w == c)))
```

### THE AUDIT GATE IS A CONJUNCTION: across all eight states of the three detectors it passes on exactly ONE — every detector silent — and fails on the other seven. One flag anywhere drains it, which is what makes it a gate rather than a score.
The ledger holds this as [gate_passes_on_one_state](/theorem/gate_passes_on_one_state) — proven `by decide`, sorry-free:

```lean
(((List.range 2).flatMap (fun f => (List.range 2).flatMap (fun d => (List.range 2).map (fun v => cleanAudit f d v)))).filter (fun x => x == 1)).length = 1
```

### EVERY CLAIM LEAVES WITH ONE VERDICT: verified plus unverified is one at all four evidence states, so no claim escapes without a verdict and none carries two. The trial is total and binary.
The ledger holds this as [fraud_verdict_is_exactly_one](/theorem/fraud_verdict_is_exactly_one) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun c => (List.range 2).all (fun s => verified c s + unverified c s == 1))
```

### A CITATION WITHOUT A SEAL IS UNVERIFIED, never false: citing with nothing sealed behind it leaves the claim open rather than refuted, and only citation AND seal together verify. An open door is not a closed one.
The ledger holds this as [fabricated_cite_stays_unverified](/theorem/fabricated_cite_stays_unverified) — proven `by decide`, sorry-free:

```lean
(unverified 1 0 = 1) ∧ (verified 1 1 = 1) ∧ (verified 1 0 = 0)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
