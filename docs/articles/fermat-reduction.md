---
title: "The exponent reduction, one table per lambda"
description: "Computed from lean/FermatReduction.lean — 35 sealed theorems, every claim citing its proof."
---

# The exponent reduction, one table per lambda

> THE EXPONENT REDUCTION, ONE TABLE PER DISTINCT LAMBDA — 35 tables covering every modulus 3..126. An exponent n reaches (Z/m)* only through gcd(n, lambda(m)), because the image of x -> x^n over a finite abelian group is G^gcd(n, exp G). The table therefore depends on LAMBDA and on nothing else about the modulus, and moduli sharing a lambda share a table. THIS WING EXISTS BECAUSE THE COLLAPSE WAS MISSED ONE LEVEL UP: the survey was correctly indexed by the reduced exponent and its reduction TABLES were then indexed by modulus, sealing byte-identical statements for every m whose double shares its lambda. The cross-wing check named 20 such pairs. 124 moduli, 35 lambdas. CLAIMED: the tabulated gcds, decided by the kernel. NOT CLAIMED: anything about exponents beyond the range named, or about moduli beyond the range named. — held by [exponent_reduces_at_lambda_2](/theorem/exponent_reduces_at_lambda_2) and its 34 siblings below.

**35 theorems**, from [exponent_reduces_at_lambda_2](/theorem/exponent_reduces_at_lambda_2) onward, each proven `by decide` in <a href="/lean/FermatReduction.lean">lean/FermatReduction.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 35 of its 35 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [exponent_reduces_at_lambda_2](/theorem/exponent_reduces_at_lambda_2). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FFermatReduction.lean)** — nothing to install. The editor fetches `lean/FermatReduction.lean` from the repository and re-decides all 35 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE COLLAPSE AT LAMBDA 2, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 2 only through gcd(n, 2), and the 21 exponents land on just 2 distinct value(s): 1, 2. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 2 — 3, 4, 6, 8, 12, 24 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_2](/theorem/exponent_reduces_at_lambda_2) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,2),(5,1),(6,2),(7,1),(8,2),(9,1),(10,2),(11,1),(12,2),(13,1),(14,2),(15,1),(16,2),(17,1),(18,2),(19,1),(20,2),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 2 == p.2)
```

### THE COLLAPSE AT LAMBDA 4, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 4 only through gcd(n, 4), and the 21 exponents land on just 3 distinct value(s): 1, 2, 4. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 4 — 5, 10, 15, 16, 20, 30, 40, 48, 60, 80, 120 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_4](/theorem/exponent_reduces_at_lambda_4) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,1),(6,2),(7,1),(8,4),(9,1),(10,2),(11,1),(12,4),(13,1),(14,2),(15,1),(16,4),(17,1),(18,2),(19,1),(20,4),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 4 == p.2)
```

### THE COLLAPSE AT LAMBDA 6, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 6 only through gcd(n, 6), and the 21 exponents land on just 4 distinct value(s): 1, 2, 3, 6. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 6 — 7, 9, 14, 18, 21, 28, 36, 42, 56, 63, 72, 84, 126 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_6](/theorem/exponent_reduces_at_lambda_6) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,2),(5,1),(6,6),(7,1),(8,2),(9,3),(10,2),(11,1),(12,6),(13,1),(14,2),(15,3),(16,2),(17,1),(18,6),(19,1),(20,2),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 6 == p.2)
```

### THE COLLAPSE AT LAMBDA 8, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 8 only through gcd(n, 8), and the 21 exponents land on just 4 distinct value(s): 1, 2, 4, 8. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 8 — 32, 96 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_8](/theorem/exponent_reduces_at_lambda_8) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,1),(6,2),(7,1),(8,8),(9,1),(10,2),(11,1),(12,4),(13,1),(14,2),(15,1),(16,8),(17,1),(18,2),(19,1),(20,4),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 8 == p.2)
```

### THE COLLAPSE AT LAMBDA 10, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 10 only through gcd(n, 10), and the 21 exponents land on just 4 distinct value(s): 1, 2, 5, 10. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 10 — 11, 22, 33, 44, 66, 88 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_10](/theorem/exponent_reduces_at_lambda_10) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,2),(5,5),(6,2),(7,1),(8,2),(9,1),(10,10),(11,1),(12,2),(13,1),(14,2),(15,5),(16,2),(17,1),(18,2),(19,1),(20,10),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 10 == p.2)
```

### THE COLLAPSE AT LAMBDA 12, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 12 only through gcd(n, 12), and the 21 exponents land on just 6 distinct value(s): 1, 2, 3, 4, 6, 12. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 12 — 13, 26, 35, 39, 45, 52, 65, 70, 78, 90, 91, 104, 105, 112, 117 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_12](/theorem/exponent_reduces_at_lambda_12) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,4),(5,1),(6,6),(7,1),(8,4),(9,3),(10,2),(11,1),(12,12),(13,1),(14,2),(15,3),(16,4),(17,1),(18,6),(19,1),(20,4),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 12 == p.2)
```

### THE COLLAPSE AT LAMBDA 16, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 16 only through gcd(n, 16), and the 21 exponents land on just 5 distinct value(s): 1, 2, 4, 8, 16. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 16 — 17, 34, 51, 64, 68, 85, 102 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_16](/theorem/exponent_reduces_at_lambda_16) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,1),(6,2),(7,1),(8,8),(9,1),(10,2),(11,1),(12,4),(13,1),(14,2),(15,1),(16,16),(17,1),(18,2),(19,1),(20,4),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 16 == p.2)
```

### THE COLLAPSE AT LAMBDA 18, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 18 only through gcd(n, 18), and the 21 exponents land on just 6 distinct value(s): 1, 2, 3, 6, 9, 18. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 18 — 19, 27, 38, 54, 57, 76, 108, 114 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_18](/theorem/exponent_reduces_at_lambda_18) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,2),(5,1),(6,6),(7,1),(8,2),(9,9),(10,2),(11,1),(12,6),(13,1),(14,2),(15,3),(16,2),(17,1),(18,18),(19,1),(20,2),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 18 == p.2)
```

### THE COLLAPSE AT LAMBDA 20, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 20 only through gcd(n, 20), and the 21 exponents land on just 6 distinct value(s): 1, 2, 4, 5, 10, 20. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 20 — 25, 50, 55, 75, 100, 110 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_20](/theorem/exponent_reduces_at_lambda_20) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,5),(6,2),(7,1),(8,4),(9,1),(10,10),(11,1),(12,4),(13,1),(14,2),(15,5),(16,4),(17,1),(18,2),(19,1),(20,20),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 20 == p.2)
```

### THE COLLAPSE AT LAMBDA 22, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 22 only through gcd(n, 22), and the 21 exponents land on just 4 distinct value(s): 1, 2, 11, 22. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 22 — 23, 46, 69, 92 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_22](/theorem/exponent_reduces_at_lambda_22) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,2),(5,1),(6,2),(7,1),(8,2),(9,1),(10,2),(11,11),(12,2),(13,1),(14,2),(15,1),(16,2),(17,1),(18,2),(19,1),(20,2),(21,1),(22,22),(23,1)].all (fun p => Nat.gcd p.1 22 == p.2)
```

### THE COLLAPSE AT LAMBDA 28, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 28 only through gcd(n, 28), and the 21 exponents land on just 5 distinct value(s): 1, 2, 4, 7, 14. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 28 — 29, 58, 87, 116 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_28](/theorem/exponent_reduces_at_lambda_28) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,1),(6,2),(7,7),(8,4),(9,1),(10,2),(11,1),(12,4),(13,1),(14,14),(15,1),(16,4),(17,1),(18,2),(19,1),(20,4),(21,7),(22,2),(23,1)].all (fun p => Nat.gcd p.1 28 == p.2)
```

### THE COLLAPSE AT LAMBDA 30, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 30 only through gcd(n, 30), and the 21 exponents land on just 7 distinct value(s): 1, 2, 3, 5, 6, 10, 15. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 30 — 31, 62, 77, 93, 99, 124 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_30](/theorem/exponent_reduces_at_lambda_30) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,2),(5,5),(6,6),(7,1),(8,2),(9,3),(10,10),(11,1),(12,6),(13,1),(14,2),(15,15),(16,2),(17,1),(18,6),(19,1),(20,10),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 30 == p.2)
```

### THE COLLAPSE AT LAMBDA 36, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 36 only through gcd(n, 36), and the 21 exponents land on just 8 distinct value(s): 1, 2, 3, 4, 6, 9, 12, 18. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 36 — 37, 74, 95, 111 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_36](/theorem/exponent_reduces_at_lambda_36) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,4),(5,1),(6,6),(7,1),(8,4),(9,9),(10,2),(11,1),(12,12),(13,1),(14,2),(15,3),(16,4),(17,1),(18,18),(19,1),(20,4),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 36 == p.2)
```

### THE COLLAPSE AT LAMBDA 40, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 40 only through gcd(n, 40), and the 21 exponents land on just 7 distinct value(s): 1, 2, 4, 5, 8, 10, 20. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 40 — 41, 82, 123 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_40](/theorem/exponent_reduces_at_lambda_40) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,5),(6,2),(7,1),(8,8),(9,1),(10,10),(11,1),(12,4),(13,1),(14,2),(15,5),(16,8),(17,1),(18,2),(19,1),(20,20),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 40 == p.2)
```

### THE COLLAPSE AT LAMBDA 42, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 42 only through gcd(n, 42), and the 21 exponents land on just 7 distinct value(s): 1, 2, 3, 6, 7, 14, 21. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 42 — 43, 49, 86, 98 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_42](/theorem/exponent_reduces_at_lambda_42) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,2),(5,1),(6,6),(7,7),(8,2),(9,3),(10,2),(11,1),(12,6),(13,1),(14,14),(15,3),(16,2),(17,1),(18,6),(19,1),(20,2),(21,21),(22,2),(23,1)].all (fun p => Nat.gcd p.1 42 == p.2)
```

### THE COLLAPSE AT LAMBDA 44, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 44 only through gcd(n, 44), and the 21 exponents land on just 5 distinct value(s): 1, 2, 4, 11, 22. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 44 — 115 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_44](/theorem/exponent_reduces_at_lambda_44) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,1),(6,2),(7,1),(8,4),(9,1),(10,2),(11,11),(12,4),(13,1),(14,2),(15,1),(16,4),(17,1),(18,2),(19,1),(20,4),(21,1),(22,22),(23,1)].all (fun p => Nat.gcd p.1 44 == p.2)
```

### THE COLLAPSE AT LAMBDA 46, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 46 only through gcd(n, 46), and the 21 exponents land on just 3 distinct value(s): 1, 2, 23. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 46 — 47, 94 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_46](/theorem/exponent_reduces_at_lambda_46) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,2),(5,1),(6,2),(7,1),(8,2),(9,1),(10,2),(11,1),(12,2),(13,1),(14,2),(15,1),(16,2),(17,1),(18,2),(19,1),(20,2),(21,1),(22,2),(23,23)].all (fun p => Nat.gcd p.1 46 == p.2)
```

### THE COLLAPSE AT LAMBDA 48, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 48 only through gcd(n, 48), and the 21 exponents land on just 8 distinct value(s): 1, 2, 3, 4, 6, 8, 12, 16. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 48 — 119 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_48](/theorem/exponent_reduces_at_lambda_48) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,4),(5,1),(6,6),(7,1),(8,8),(9,3),(10,2),(11,1),(12,12),(13,1),(14,2),(15,3),(16,16),(17,1),(18,6),(19,1),(20,4),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 48 == p.2)
```

### THE COLLAPSE AT LAMBDA 52, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 52 only through gcd(n, 52), and the 21 exponents land on just 4 distinct value(s): 1, 2, 4, 13. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 52 — 53, 106 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_52](/theorem/exponent_reduces_at_lambda_52) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,1),(6,2),(7,1),(8,4),(9,1),(10,2),(11,1),(12,4),(13,13),(14,2),(15,1),(16,4),(17,1),(18,2),(19,1),(20,4),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 52 == p.2)
```

### THE COLLAPSE AT LAMBDA 54, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 54 only through gcd(n, 54), and the 21 exponents land on just 6 distinct value(s): 1, 2, 3, 6, 9, 18. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 54 — 81 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_54](/theorem/exponent_reduces_at_lambda_54) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,2),(5,1),(6,6),(7,1),(8,2),(9,9),(10,2),(11,1),(12,6),(13,1),(14,2),(15,3),(16,2),(17,1),(18,18),(19,1),(20,2),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 54 == p.2)
```

### THE COLLAPSE AT LAMBDA 58, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 58 only through gcd(n, 58), and the 21 exponents land on just 2 distinct value(s): 1, 2. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 58 — 59, 118 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_58](/theorem/exponent_reduces_at_lambda_58) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,2),(5,1),(6,2),(7,1),(8,2),(9,1),(10,2),(11,1),(12,2),(13,1),(14,2),(15,1),(16,2),(17,1),(18,2),(19,1),(20,2),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 58 == p.2)
```

### THE COLLAPSE AT LAMBDA 60, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 60 only through gcd(n, 60), and the 21 exponents land on just 10 distinct value(s): 1, 2, 3, 4, 5, 6, 10, 12, 15, 20. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 60 — 61, 122 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_60](/theorem/exponent_reduces_at_lambda_60) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,4),(5,5),(6,6),(7,1),(8,4),(9,3),(10,10),(11,1),(12,12),(13,1),(14,2),(15,15),(16,4),(17,1),(18,6),(19,1),(20,20),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 60 == p.2)
```

### THE COLLAPSE AT LAMBDA 66, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 66 only through gcd(n, 66), and the 21 exponents land on just 6 distinct value(s): 1, 2, 3, 6, 11, 22. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 66 — 67 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_66](/theorem/exponent_reduces_at_lambda_66) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,2),(5,1),(6,6),(7,1),(8,2),(9,3),(10,2),(11,11),(12,6),(13,1),(14,2),(15,3),(16,2),(17,1),(18,6),(19,1),(20,2),(21,3),(22,22),(23,1)].all (fun p => Nat.gcd p.1 66 == p.2)
```

### THE COLLAPSE AT LAMBDA 70, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 70 only through gcd(n, 70), and the 21 exponents land on just 6 distinct value(s): 1, 2, 5, 7, 10, 14. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 70 — 71 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_70](/theorem/exponent_reduces_at_lambda_70) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,2),(5,5),(6,2),(7,7),(8,2),(9,1),(10,10),(11,1),(12,2),(13,1),(14,14),(15,5),(16,2),(17,1),(18,2),(19,1),(20,10),(21,7),(22,2),(23,1)].all (fun p => Nat.gcd p.1 70 == p.2)
```

### THE COLLAPSE AT LAMBDA 72, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 72 only through gcd(n, 72), and the 21 exponents land on just 9 distinct value(s): 1, 2, 3, 4, 6, 8, 9, 12, 18. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 72 — 73 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_72](/theorem/exponent_reduces_at_lambda_72) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,4),(5,1),(6,6),(7,1),(8,8),(9,9),(10,2),(11,1),(12,12),(13,1),(14,2),(15,3),(16,8),(17,1),(18,18),(19,1),(20,4),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 72 == p.2)
```

### THE COLLAPSE AT LAMBDA 78, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 78 only through gcd(n, 78), and the 21 exponents land on just 5 distinct value(s): 1, 2, 3, 6, 13. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 78 — 79 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_78](/theorem/exponent_reduces_at_lambda_78) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,2),(5,1),(6,6),(7,1),(8,2),(9,3),(10,2),(11,1),(12,6),(13,13),(14,2),(15,3),(16,2),(17,1),(18,6),(19,1),(20,2),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 78 == p.2)
```

### THE COLLAPSE AT LAMBDA 82, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 82 only through gcd(n, 82), and the 21 exponents land on just 2 distinct value(s): 1, 2. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 82 — 83 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_82](/theorem/exponent_reduces_at_lambda_82) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,2),(5,1),(6,2),(7,1),(8,2),(9,1),(10,2),(11,1),(12,2),(13,1),(14,2),(15,1),(16,2),(17,1),(18,2),(19,1),(20,2),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 82 == p.2)
```

### THE COLLAPSE AT LAMBDA 88, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 88 only through gcd(n, 88), and the 21 exponents land on just 6 distinct value(s): 1, 2, 4, 8, 11, 22. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 88 — 89 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_88](/theorem/exponent_reduces_at_lambda_88) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,1),(6,2),(7,1),(8,8),(9,1),(10,2),(11,11),(12,4),(13,1),(14,2),(15,1),(16,8),(17,1),(18,2),(19,1),(20,4),(21,1),(22,22),(23,1)].all (fun p => Nat.gcd p.1 88 == p.2)
```

### THE COLLAPSE AT LAMBDA 96, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 96 only through gcd(n, 96), and the 21 exponents land on just 8 distinct value(s): 1, 2, 3, 4, 6, 8, 12, 16. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 96 — 97 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_96](/theorem/exponent_reduces_at_lambda_96) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,4),(5,1),(6,6),(7,1),(8,8),(9,3),(10,2),(11,1),(12,12),(13,1),(14,2),(15,3),(16,16),(17,1),(18,6),(19,1),(20,4),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 96 == p.2)
```

### THE COLLAPSE AT LAMBDA 100, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 100 only through gcd(n, 100), and the 21 exponents land on just 6 distinct value(s): 1, 2, 4, 5, 10, 20. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 100 — 101, 125 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_100](/theorem/exponent_reduces_at_lambda_100) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,5),(6,2),(7,1),(8,4),(9,1),(10,10),(11,1),(12,4),(13,1),(14,2),(15,5),(16,4),(17,1),(18,2),(19,1),(20,20),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 100 == p.2)
```

### THE COLLAPSE AT LAMBDA 102, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 102 only through gcd(n, 102), and the 21 exponents land on just 5 distinct value(s): 1, 2, 3, 6, 17. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 102 — 103 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_102](/theorem/exponent_reduces_at_lambda_102) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,2),(5,1),(6,6),(7,1),(8,2),(9,3),(10,2),(11,1),(12,6),(13,1),(14,2),(15,3),(16,2),(17,17),(18,6),(19,1),(20,2),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 102 == p.2)
```

### THE COLLAPSE AT LAMBDA 106, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 106 only through gcd(n, 106), and the 21 exponents land on just 2 distinct value(s): 1, 2. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 106 — 107 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_106](/theorem/exponent_reduces_at_lambda_106) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,2),(5,1),(6,2),(7,1),(8,2),(9,1),(10,2),(11,1),(12,2),(13,1),(14,2),(15,1),(16,2),(17,1),(18,2),(19,1),(20,2),(21,1),(22,2),(23,1)].all (fun p => Nat.gcd p.1 106 == p.2)
```

### THE COLLAPSE AT LAMBDA 108, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 108 only through gcd(n, 108), and the 21 exponents land on just 8 distinct value(s): 1, 2, 3, 4, 6, 9, 12, 18. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 108 — 109 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_108](/theorem/exponent_reduces_at_lambda_108) — proven `by decide`, sorry-free:

```lean
[(3,3),(4,4),(5,1),(6,6),(7,1),(8,4),(9,9),(10,2),(11,1),(12,12),(13,1),(14,2),(15,3),(16,4),(17,1),(18,18),(19,1),(20,4),(21,3),(22,2),(23,1)].all (fun p => Nat.gcd p.1 108 == p.2)
```

### THE COLLAPSE AT LAMBDA 110, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 110 only through gcd(n, 110), and the 21 exponents land on just 6 distinct value(s): 1, 2, 5, 10, 11, 22. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 110 — 121 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_110](/theorem/exponent_reduces_at_lambda_110) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,2),(5,5),(6,2),(7,1),(8,2),(9,1),(10,10),(11,11),(12,2),(13,1),(14,2),(15,5),(16,2),(17,1),(18,2),(19,1),(20,10),(21,1),(22,22),(23,1)].all (fun p => Nat.gcd p.1 110 == p.2)
```

### THE COLLAPSE AT LAMBDA 112, as arithmetic. Every exponent from 3 to 23 reaches a unit group of exponent 112 only through gcd(n, 112), and the 21 exponents land on just 7 distinct value(s): 1, 2, 4, 7, 8, 14, 16. The kernel computes each gcd rather than trusting a table. This serves every modulus whose unit group has exponent 112 — 113 — because the reduction depends on lambda and on nothing else about the modulus. Indexing it per modulus instead sealed the same statement twice for every m whose double shares its lambda, which the tree's own cross-wing check caught: 124 moduli, 35 lambdas, 89 restatements avoided.
The ledger holds this as [exponent_reduces_at_lambda_112](/theorem/exponent_reduces_at_lambda_112) — proven `by decide`, sorry-free:

```lean
[(3,1),(4,4),(5,1),(6,2),(7,7),(8,8),(9,1),(10,2),(11,1),(12,4),(13,1),(14,14),(15,1),(16,16),(17,1),(18,2),(19,1),(20,4),(21,7),(22,2),(23,1)].all (fun p => Nat.gcd p.1 112 == p.2)
```


::: warning 
THE EXPONENT REDUCTION, ONE TABLE PER DISTINCT LAMBDA — 35 tables covering every modulus 3. The boundary is confirmed by the wing's own sealed theorems — e.g. [exponent_reduces_at_lambda_2](/theorem/exponent_reduces_at_lambda_2) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
