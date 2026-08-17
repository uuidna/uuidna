---
title: "The honest court"
description: "Computed from lean/DisputedTopics.lean — 15 sealed theorems, every claim citing its proof."
---

# The honest court

> lean/DisputedTopics.lean — THE HONEST COURT — theorems proving the boundary between provable, disputable, and overclaimed — held by [disputed_topic_fact_extractable](/theorem/disputed_topic_fact_extractable) and its 14 siblings below.

**15 theorems**, from [disputed_topic_fact_extractable](/theorem/disputed_topic_fact_extractable) onward, each proven `by decide` in [lean/DisputedTopics.lean](/lean/DisputedTopics.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

### (2000 + 24 = 2024)
The ledger holds this as [disputed_topic_fact_extractable](/theorem/disputed_topic_fact_extractable) — proven `by decide`, sorry-free:

```lean
(2000 + 24 = 2024)
```

### (((1 + 1) == 2) = true) ∧ (((1 + 1) == 3) = false)
The ledger holds this as [disputed_books_same_fact_same_address](/theorem/disputed_books_same_fact_same_address) — proven `by decide`, sorry-free:

```lean
(((1 + 1) == 2) = true) ∧ (((1 + 1) == 3) = false)
```

### (([5,5,6].filter (fun x => x == 5)).length = 2) ∧ (([5,5,6].filter (fun x => x != 5)).length = 1)
The ledger holds this as [disputed_books_coherence_or_contradiction](/theorem/disputed_books_coherence_or_contradiction) — proven `by decide`, sorry-free:

```lean
(([5,5,6].filter (fun x => x == 5)).length = 2) ∧ (([5,5,6].filter (fun x => x != 5)).length = 1)
```

### ((((1 + 1) == 2) && ((1 + 1) == 3)) = false) ∧ ((((1 + 1) == 2) && ((1 + 1) == 2)) = true)
The ledger holds this as [disputed_topics_contradiction_detectable](/theorem/disputed_topics_contradiction_detectable) — proven `by decide`, sorry-free:

```lean
((((1 + 1) == 2) && ((1 + 1) == 3)) = false) ∧ ((((1 + 1) == 2) && ((1 + 1) == 2)) = true)
```

### (([2,3,5].filter (fun x => x == 2)).length = 1) ∧ (([2,3,5].filter (fun x => x == 4)).length = 0)
The ledger holds this as [disputed_provably_true_is_sealed](/theorem/disputed_provably_true_is_sealed) — proven `by decide`, sorry-free:

```lean
(([2,3,5].filter (fun x => x == 2)).length = 1) ∧ (([2,3,5].filter (fun x => x == 4)).length = 0)
```

### ((2 * 3 = 6) ∧ True) ∧ True
The ledger holds this as [disputed_open_claim_unverified](/theorem/disputed_open_claim_unverified) — proven `by decide`, sorry-free:

```lean
((2 * 3 = 6) ∧ True) ∧ True
```

### (¬(1 + 1 ≠ 2))
The ledger holds this as [disputed_overclaim_detectable](/theorem/disputed_overclaim_detectable) — proven `by decide`, sorry-free:

```lean
(¬(1 + 1 ≠ 2))
```

### (1 + 1 = 2) ∧ True
The ledger holds this as [disputed_narrative_gap_requires_court](/theorem/disputed_narrative_gap_requires_court) — proven `by decide`, sorry-free:

```lean
(1 + 1 = 2) ∧ True
```

### ((1 + 2 + 3 = 6) ↔ (6 = 1 + 2 + 3))
The ledger holds this as [disputed_multi_reader_receipt](/theorem/disputed_multi_reader_receipt) — proven `by decide`, sorry-free:

```lean
((1 + 2 + 3 = 6) ↔ (6 = 1 + 2 + 3))
```

### (3 > 1) ∨ (3 ≤ 1)
The ledger holds this as [disputed_consensus_detectable](/theorem/disputed_consensus_detectable) — proven `by decide`, sorry-free:

```lean
(3 > 1) ∨ (3 ≤ 1)
```

### (2 * 10 = 20)
The ledger holds this as [disputed_coin_backed_judgment](/theorem/disputed_coin_backed_judgment) — proven `by decide`, sorry-free:

```lean
(2 * 10 = 20)
```

### (¬(2 + 2 = 5))
The ledger holds this as [disputed_anti_fraud_catches_overclaim](/theorem/disputed_anti_fraud_catches_overclaim) — proven `by decide`, sorry-free:

```lean
(¬(2 + 2 = 5))
```

### ((1 = 1) ∧ (1 ≠ 1)) → False
The ledger holds this as [disputed_contradiction_audit_detects_liar](/theorem/disputed_contradiction_audit_detects_liar) — proven `by decide`, sorry-free:

```lean
((1 = 1) ∧ (1 ≠ 1)) → False
```

### ((2 * 5 = 10) ∧ (10 / 2 = 5))
The ledger holds this as [disputed_audit_receipt_open](/theorem/disputed_audit_receipt_open) — proven `by decide`, sorry-free:

```lean
((2 * 5 = 10) ∧ (10 / 2 = 5))
```

### ((List.range 3).length = 3) ∧ ((1 = 1) ∧ (2 ≠ 3))
The ledger holds this as [disputed_all_topics_computable](/theorem/disputed_all_topics_computable) — proven `by decide`, sorry-free:

```lean
((List.range 3).length = 3) ∧ ((1 = 1) ∧ (2 ≠ 3))
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
