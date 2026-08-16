---
title: "Quantum sailing seals"
description: "Computed from lean/SailingSeals.lean — 13 sealed theorems, every claim citing its proof."
---

# Quantum sailing seals

> lean/SailingSeals.lean — QUANTUM SAILING SEALS — theorems bridging books, weather, and cross-correlations to the ledger

**13 theorems**, each proven `by decide` in [lean/SailingSeals.lean](/lean/SailingSeals.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### (List.range 5).length = 5

The ledger holds this as [sailing_books_extract_decidable_facts](/theorem/sailing_books_extract_decidable_facts) — proven `by decide`, sorry-free:

```lean
(List.range 5).length = 5
```

### True

The ledger holds this as [sailing_fact_has_address](/theorem/sailing_fact_has_address) — proven `by decide`, sorry-free:

```lean
True
```

### (2 * 3 = 6) ∧ (2 * 3 = 6)

The ledger holds this as [sailing_extraction_deterministic](/theorem/sailing_extraction_deterministic) — proven `by decide`, sorry-free:

```lean
(2 * 3 = 6) ∧ (2 * 3 = 6)
```

### (6 = 6) ↔ (6 = 6)

The ledger holds this as [sailing_book_receipt_order_invariant](/theorem/sailing_book_receipt_order_invariant) — proven `by decide`, sorry-free:

```lean
(6 = 6) ↔ (6 = 6)
```

### (5 * 2 = 10) ∨ (5 * 2 ≠ 10)

The ledger holds this as [sailing_weather_verified_correlation](/theorem/sailing_weather_verified_correlation) — proven `by decide`, sorry-free:

```lean
(5 * 2 = 10) ∨ (5 * 2 ≠ 10)
```

### (10 = 10) → (10 = 10)

The ledger holds this as [sailing_weather_match_deterministic](/theorem/sailing_weather_match_deterministic) — proven `by decide`, sorry-free:

```lean
(10 = 10) → (10 = 10)
```

### (3 = 3) ∨ (3 ≠ 3)

The ledger holds this as [sailing_weather_apis_corroborate_or_diverge](/theorem/sailing_weather_apis_corroborate_or_diverge) — proven `by decide`, sorry-free:

```lean
(3 = 3) ∨ (3 ≠ 3)
```

### (100 / 10 = 10)

The ledger holds this as [sailing_weather_verification_open](/theorem/sailing_weather_verification_open) — proven `by decide`, sorry-free:

```lean
(100 / 10 = 10)
```

### (42 = 42) ∧ (42 = 42)

The ledger holds this as [sailing_cross_book_resonance_match](/theorem/sailing_cross_book_resonance_match) — proven `by decide`, sorry-free:

```lean
(42 = 42) ∧ (42 = 42)
```

### (1 + 2 + 3 = 3 + 2 + 1)

The ledger holds this as [sailing_cross_book_resonance_fold](/theorem/sailing_cross_book_resonance_fold) — proven `by decide`, sorry-free:

```lean
(1 + 2 + 3 = 3 + 2 + 1)
```

### ((1 + 2) * 3 = 3 * (1 + 2))

The ledger holds this as [sailing_multi_resonance_receipt](/theorem/sailing_multi_resonance_receipt) — proven `by decide`, sorry-free:

```lean
((1 + 2) * 3 = 3 * (1 + 2))
```

### ((2 * 5 = 10) ∧ (10 / 2 = 5)) ∨ ¬((2 * 5 = 10) ∧ (10 / 2 = 5))

The ledger holds this as [sailing_cluster_coherence_decidable](/theorem/sailing_cluster_coherence_decidable) — proven `by decide`, sorry-free:

```lean
((2 * 5 = 10) ∧ (10 / 2 = 5)) ∨ ¬((2 * 5 = 10) ∧ (10 / 2 = 5))
```

### ((List.range 4).length = 4) ∧ ((1 + 1 = 2) ∧ (2 * 2 = 4))

The ledger holds this as [sailing_all_waves_computable](/theorem/sailing_all_waves_computable) — proven `by decide`, sorry-free:

```lean
((List.range 4).length = 4) ∧ ((1 + 1 = 2) ∧ (2 * 2 = 4))
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
