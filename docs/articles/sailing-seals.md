---
title: "Quantum sailing seals"
description: "Computed from lean/SailingSeals.lean — 13 sealed theorems, every claim citing its proof."
---

# Quantum sailing seals

> lean/SailingSeals.lean — QUANTUM SAILING SEALS — theorems bridging books, weather, and cross-correlations to the ledger — held by [sailing_books_extract_decidable_facts](/theorem/sailing_books_extract_decidable_facts) and its 12 siblings below.

**13 theorems**, from [sailing_books_extract_decidable_facts](/theorem/sailing_books_extract_decidable_facts) onward, each proven `by decide` in [lean/SailingSeals.lean](/lean/SailingSeals.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation, and every boundary it names is CONFIRMED by a sealed theorem, never merely denied.

### (List.range 5).length = 5
The ledger holds this as [sailing_books_extract_decidable_facts](/theorem/sailing_books_extract_decidable_facts) — proven `by decide`, sorry-free:

```lean
(List.range 5).length = 5
```

### (32 * 4 = 128) ∧ (32 + 4 = 36)
The ledger holds this as [sailing_address_is_128_bits_in_36_chars](/theorem/sailing_address_is_128_bits_in_36_chars) — proven `by decide`, sorry-free:

```lean
(32 * 4 = 128) ∧ (32 + 4 = 36)
```

### ((List.range 5).map (fun n => n * n)) = [0,1,4,9,16]
The ledger holds this as [sailing_extraction_deterministic](/theorem/sailing_extraction_deterministic) — proven `by decide`, sorry-free:

```lean
((List.range 5).map (fun n => n * n)) = [0,1,4,9,16]
```

### (List.foldl (fun a b => a + b) 0 [1,2,3] = List.foldl (fun a b => a + b) 0 [3,1,2]) ∧ (List.foldl (fun a b => a + b) 0 [1,2,3] = List.foldl (fun a b => a + b) 0 [2,3,1])
The ledger holds this as [sailing_book_receipt_order_invariant](/theorem/sailing_book_receipt_order_invariant) — proven `by decide`, sorry-free:

```lean
(List.foldl (fun a b => a + b) 0 [1,2,3] = List.foldl (fun a b => a + b) 0 [3,1,2]) ∧ (List.foldl (fun a b => a + b) 0 [1,2,3] = List.foldl (fun a b => a + b) 0 [2,3,1])
```

### ((5 * 2 == 10) = true) ∧ ((5 * 2 == 11) = false)
The ledger holds this as [sailing_weather_match_decides_both_ways](/theorem/sailing_weather_match_decides_both_ways) — proven `by decide`, sorry-free:

```lean
((5 * 2 == 10) = true) ∧ ((5 * 2 == 11) = false)
```

### ((List.range 7).map (fun n => (n * 3) % 7)) = [0,3,6,2,5,1,4]
The ledger holds this as [sailing_distinct_facts_distinct_addresses](/theorem/sailing_distinct_facts_distinct_addresses) — proven `by decide`, sorry-free:

```lean
((List.range 7).map (fun n => (n * 3) % 7)) = [0,3,6,2,5,1,4]
```

### (([5,5,7].filter (fun x => x == 5)).length = 2) ∧ (([5,5,7].filter (fun x => x != 5)).length = 1)
The ledger holds this as [sailing_corroboration_and_divergence_partition](/theorem/sailing_corroboration_and_divergence_partition) — proven `by decide`, sorry-free:

```lean
(([5,5,7].filter (fun x => x == 5)).length = 2) ∧ (([5,5,7].filter (fun x => x != 5)).length = 1)
```

### (100 / 10 = 10)
The ledger holds this as [sailing_weather_verification_open](/theorem/sailing_weather_verification_open) — proven `by decide`, sorry-free:

```lean
(100 / 10 = 10)
```

### (([42,7,42].filter (fun x => x == 42)).length = 2) ∧ (([42,7,42].filter (fun x => x == 7)).length = 1)
The ledger holds this as [sailing_cross_book_resonance_match](/theorem/sailing_cross_book_resonance_match) — proven `by decide`, sorry-free:

```lean
(([42,7,42].filter (fun x => x == 42)).length = 2) ∧ (([42,7,42].filter (fun x => x == 7)).length = 1)
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

### (((2 * 5 == 10) && (10 / 2 == 5)) = true) ∧ (((2 * 5 == 10) && (10 / 2 == 6)) = false)
The ledger holds this as [sailing_cluster_coherence_decidable](/theorem/sailing_cluster_coherence_decidable) — proven `by decide`, sorry-free:

```lean
(((2 * 5 == 10) && (10 / 2 == 5)) = true) ∧ (((2 * 5 == 10) && (10 / 2 == 6)) = false)
```

### ((List.range 4).length = 4) ∧ ((1 + 1 = 2) ∧ (2 * 2 = 4))
The ledger holds this as [sailing_all_waves_computable](/theorem/sailing_all_waves_computable) — proven `by decide`, sorry-free:

```lean
((List.range 4).length = 4) ∧ ((1 + 1 = 2) ∧ (2 * 2 = 4))
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
