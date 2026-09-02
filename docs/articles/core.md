---
title: "The 8×8 core"
description: "Computed from lean/Core.lean — 64 sealed theorems, every claim citing its proof."
---

# The 8×8 core

> The 8×8 CORE: the multiplication table of ℤ/9's eight non-zero residues {1..8}. From these 64 theorems the rest COMPUTES — units, inverses, self-inverses {1,8}, nilpotents {3,6}, the vortex orbit and the reflection all read off this table. — held by [mul9_1_1](/theorem/mul9_1_1) and its 63 siblings below.

**64 theorems**, from [mul9_1_1](/theorem/mul9_1_1) onward, each proven `by decide` in [lean/Core.lean](/lean/Core.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCore.lean)** — nothing to install. The editor fetches `lean/Core.lean` from the repository and re-decides all 64 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### 1·1 ≡ 1 (mod 9)
The ledger holds this as [mul9_1_1](/theorem/mul9_1_1) — proven `by decide`, sorry-free:

```lean
(1 * 1) % 9 = 1
```

### 1·2 ≡ 2 (mod 9)
The ledger holds this as [mul9_1_2](/theorem/mul9_1_2) — proven `by decide`, sorry-free:

```lean
(1 * 2) % 9 = 2
```

### 1·3 ≡ 3 (mod 9)
The ledger holds this as [mul9_1_3](/theorem/mul9_1_3) — proven `by decide`, sorry-free:

```lean
(1 * 3) % 9 = 3
```

### 1·4 ≡ 4 (mod 9)
The ledger holds this as [mul9_1_4](/theorem/mul9_1_4) — proven `by decide`, sorry-free:

```lean
(1 * 4) % 9 = 4
```

### 1·5 ≡ 5 (mod 9)
The ledger holds this as [mul9_1_5](/theorem/mul9_1_5) — proven `by decide`, sorry-free:

```lean
(1 * 5) % 9 = 5
```

### 1·6 ≡ 6 (mod 9)
The ledger holds this as [mul9_1_6](/theorem/mul9_1_6) — proven `by decide`, sorry-free:

```lean
(1 * 6) % 9 = 6
```

### 1·7 ≡ 7 (mod 9)
The ledger holds this as [mul9_1_7](/theorem/mul9_1_7) — proven `by decide`, sorry-free:

```lean
(1 * 7) % 9 = 7
```

### 1·8 ≡ 8 (mod 9)
The ledger holds this as [mul9_1_8](/theorem/mul9_1_8) — proven `by decide`, sorry-free:

```lean
(1 * 8) % 9 = 8
```

### 2·1 ≡ 2 (mod 9)
The ledger holds this as [mul9_2_1](/theorem/mul9_2_1) — proven `by decide`, sorry-free:

```lean
(2 * 1) % 9 = 2
```

### 2·2 ≡ 4 (mod 9)
The ledger holds this as [mul9_2_2](/theorem/mul9_2_2) — proven `by decide`, sorry-free:

```lean
(2 * 2) % 9 = 4
```

### 2·3 ≡ 6 (mod 9)
The ledger holds this as [mul9_2_3](/theorem/mul9_2_3) — proven `by decide`, sorry-free:

```lean
(2 * 3) % 9 = 6
```

### 2·4 ≡ 8 (mod 9)
The ledger holds this as [mul9_2_4](/theorem/mul9_2_4) — proven `by decide`, sorry-free:

```lean
(2 * 4) % 9 = 8
```

### 2·5 ≡ 1 (mod 9)
The ledger holds this as [mul9_2_5](/theorem/mul9_2_5) — proven `by decide`, sorry-free:

```lean
(2 * 5) % 9 = 1
```

### 2·6 ≡ 3 (mod 9)
The ledger holds this as [mul9_2_6](/theorem/mul9_2_6) — proven `by decide`, sorry-free:

```lean
(2 * 6) % 9 = 3
```

### 2·7 ≡ 5 (mod 9)
The ledger holds this as [mul9_2_7](/theorem/mul9_2_7) — proven `by decide`, sorry-free:

```lean
(2 * 7) % 9 = 5
```

### 2·8 ≡ 7 (mod 9)
The ledger holds this as [mul9_2_8](/theorem/mul9_2_8) — proven `by decide`, sorry-free:

```lean
(2 * 8) % 9 = 7
```

### 3·1 ≡ 3 (mod 9)
The ledger holds this as [mul9_3_1](/theorem/mul9_3_1) — proven `by decide`, sorry-free:

```lean
(3 * 1) % 9 = 3
```

### 3·2 ≡ 6 (mod 9)
The ledger holds this as [mul9_3_2](/theorem/mul9_3_2) — proven `by decide`, sorry-free:

```lean
(3 * 2) % 9 = 6
```

### 3·3 ≡ 0 (mod 9)
The ledger holds this as [mul9_3_3](/theorem/mul9_3_3) — proven `by decide`, sorry-free:

```lean
(3 * 3) % 9 = 0
```

### 3·4 ≡ 3 (mod 9)
The ledger holds this as [mul9_3_4](/theorem/mul9_3_4) — proven `by decide`, sorry-free:

```lean
(3 * 4) % 9 = 3
```

### 3·5 ≡ 6 (mod 9)
The ledger holds this as [mul9_3_5](/theorem/mul9_3_5) — proven `by decide`, sorry-free:

```lean
(3 * 5) % 9 = 6
```

### 3·6 ≡ 0 (mod 9)
The ledger holds this as [mul9_3_6](/theorem/mul9_3_6) — proven `by decide`, sorry-free:

```lean
(3 * 6) % 9 = 0
```

### 3·7 ≡ 3 (mod 9)
The ledger holds this as [mul9_3_7](/theorem/mul9_3_7) — proven `by decide`, sorry-free:

```lean
(3 * 7) % 9 = 3
```

### 3·8 ≡ 6 (mod 9)
The ledger holds this as [mul9_3_8](/theorem/mul9_3_8) — proven `by decide`, sorry-free:

```lean
(3 * 8) % 9 = 6
```

### 4·1 ≡ 4 (mod 9)
The ledger holds this as [mul9_4_1](/theorem/mul9_4_1) — proven `by decide`, sorry-free:

```lean
(4 * 1) % 9 = 4
```

### 4·2 ≡ 8 (mod 9)
The ledger holds this as [mul9_4_2](/theorem/mul9_4_2) — proven `by decide`, sorry-free:

```lean
(4 * 2) % 9 = 8
```

### 4·3 ≡ 3 (mod 9)
The ledger holds this as [mul9_4_3](/theorem/mul9_4_3) — proven `by decide`, sorry-free:

```lean
(4 * 3) % 9 = 3
```

### 4·4 ≡ 7 (mod 9)
The ledger holds this as [mul9_4_4](/theorem/mul9_4_4) — proven `by decide`, sorry-free:

```lean
(4 * 4) % 9 = 7
```

### 4·5 ≡ 2 (mod 9)
The ledger holds this as [mul9_4_5](/theorem/mul9_4_5) — proven `by decide`, sorry-free:

```lean
(4 * 5) % 9 = 2
```

### 4·6 ≡ 6 (mod 9)
The ledger holds this as [mul9_4_6](/theorem/mul9_4_6) — proven `by decide`, sorry-free:

```lean
(4 * 6) % 9 = 6
```

### 4·7 ≡ 1 (mod 9)
The ledger holds this as [mul9_4_7](/theorem/mul9_4_7) — proven `by decide`, sorry-free:

```lean
(4 * 7) % 9 = 1
```

### 4·8 ≡ 5 (mod 9)
The ledger holds this as [mul9_4_8](/theorem/mul9_4_8) — proven `by decide`, sorry-free:

```lean
(4 * 8) % 9 = 5
```

### 5·1 ≡ 5 (mod 9)
The ledger holds this as [mul9_5_1](/theorem/mul9_5_1) — proven `by decide`, sorry-free:

```lean
(5 * 1) % 9 = 5
```

### 5·2 ≡ 1 (mod 9)
The ledger holds this as [mul9_5_2](/theorem/mul9_5_2) — proven `by decide`, sorry-free:

```lean
(5 * 2) % 9 = 1
```

### 5·3 ≡ 6 (mod 9)
The ledger holds this as [mul9_5_3](/theorem/mul9_5_3) — proven `by decide`, sorry-free:

```lean
(5 * 3) % 9 = 6
```

### 5·4 ≡ 2 (mod 9)
The ledger holds this as [mul9_5_4](/theorem/mul9_5_4) — proven `by decide`, sorry-free:

```lean
(5 * 4) % 9 = 2
```

### 5·5 ≡ 7 (mod 9)
The ledger holds this as [mul9_5_5](/theorem/mul9_5_5) — proven `by decide`, sorry-free:

```lean
(5 * 5) % 9 = 7
```

### 5·6 ≡ 3 (mod 9)
The ledger holds this as [mul9_5_6](/theorem/mul9_5_6) — proven `by decide`, sorry-free:

```lean
(5 * 6) % 9 = 3
```

### 5·7 ≡ 8 (mod 9)
The ledger holds this as [mul9_5_7](/theorem/mul9_5_7) — proven `by decide`, sorry-free:

```lean
(5 * 7) % 9 = 8
```

### 5·8 ≡ 4 (mod 9)
The ledger holds this as [mul9_5_8](/theorem/mul9_5_8) — proven `by decide`, sorry-free:

```lean
(5 * 8) % 9 = 4
```

### 6·1 ≡ 6 (mod 9)
The ledger holds this as [mul9_6_1](/theorem/mul9_6_1) — proven `by decide`, sorry-free:

```lean
(6 * 1) % 9 = 6
```

### 6·2 ≡ 3 (mod 9)
The ledger holds this as [mul9_6_2](/theorem/mul9_6_2) — proven `by decide`, sorry-free:

```lean
(6 * 2) % 9 = 3
```

### 6·3 ≡ 0 (mod 9)
The ledger holds this as [mul9_6_3](/theorem/mul9_6_3) — proven `by decide`, sorry-free:

```lean
(6 * 3) % 9 = 0
```

### 6·4 ≡ 6 (mod 9)
The ledger holds this as [mul9_6_4](/theorem/mul9_6_4) — proven `by decide`, sorry-free:

```lean
(6 * 4) % 9 = 6
```

### 6·5 ≡ 3 (mod 9)
The ledger holds this as [mul9_6_5](/theorem/mul9_6_5) — proven `by decide`, sorry-free:

```lean
(6 * 5) % 9 = 3
```

### 6·6 ≡ 0 (mod 9)
The ledger holds this as [mul9_6_6](/theorem/mul9_6_6) — proven `by decide`, sorry-free:

```lean
(6 * 6) % 9 = 0
```

### 6·7 ≡ 6 (mod 9)
The ledger holds this as [mul9_6_7](/theorem/mul9_6_7) — proven `by decide`, sorry-free:

```lean
(6 * 7) % 9 = 6
```

### 6·8 ≡ 3 (mod 9)
The ledger holds this as [mul9_6_8](/theorem/mul9_6_8) — proven `by decide`, sorry-free:

```lean
(6 * 8) % 9 = 3
```

### 7·1 ≡ 7 (mod 9)
The ledger holds this as [mul9_7_1](/theorem/mul9_7_1) — proven `by decide`, sorry-free:

```lean
(7 * 1) % 9 = 7
```

### 7·2 ≡ 5 (mod 9)
The ledger holds this as [mul9_7_2](/theorem/mul9_7_2) — proven `by decide`, sorry-free:

```lean
(7 * 2) % 9 = 5
```

### 7·3 ≡ 3 (mod 9)
The ledger holds this as [mul9_7_3](/theorem/mul9_7_3) — proven `by decide`, sorry-free:

```lean
(7 * 3) % 9 = 3
```

### 7·4 ≡ 1 (mod 9)
The ledger holds this as [mul9_7_4](/theorem/mul9_7_4) — proven `by decide`, sorry-free:

```lean
(7 * 4) % 9 = 1
```

### 7·5 ≡ 8 (mod 9)
The ledger holds this as [mul9_7_5](/theorem/mul9_7_5) — proven `by decide`, sorry-free:

```lean
(7 * 5) % 9 = 8
```

### 7·6 ≡ 6 (mod 9)
The ledger holds this as [mul9_7_6](/theorem/mul9_7_6) — proven `by decide`, sorry-free:

```lean
(7 * 6) % 9 = 6
```

### 7·7 ≡ 4 (mod 9)
The ledger holds this as [mul9_7_7](/theorem/mul9_7_7) — proven `by decide`, sorry-free:

```lean
(7 * 7) % 9 = 4
```

### 7·8 ≡ 2 (mod 9)
The ledger holds this as [mul9_7_8](/theorem/mul9_7_8) — proven `by decide`, sorry-free:

```lean
(7 * 8) % 9 = 2
```

### 8·1 ≡ 8 (mod 9)
The ledger holds this as [mul9_8_1](/theorem/mul9_8_1) — proven `by decide`, sorry-free:

```lean
(8 * 1) % 9 = 8
```

### 8·2 ≡ 7 (mod 9)
The ledger holds this as [mul9_8_2](/theorem/mul9_8_2) — proven `by decide`, sorry-free:

```lean
(8 * 2) % 9 = 7
```

### 8·3 ≡ 6 (mod 9)
The ledger holds this as [mul9_8_3](/theorem/mul9_8_3) — proven `by decide`, sorry-free:

```lean
(8 * 3) % 9 = 6
```

### 8·4 ≡ 5 (mod 9)
The ledger holds this as [mul9_8_4](/theorem/mul9_8_4) — proven `by decide`, sorry-free:

```lean
(8 * 4) % 9 = 5
```

### 8·5 ≡ 4 (mod 9)
The ledger holds this as [mul9_8_5](/theorem/mul9_8_5) — proven `by decide`, sorry-free:

```lean
(8 * 5) % 9 = 4
```

### 8·6 ≡ 3 (mod 9)
The ledger holds this as [mul9_8_6](/theorem/mul9_8_6) — proven `by decide`, sorry-free:

```lean
(8 * 6) % 9 = 3
```

### 8·7 ≡ 2 (mod 9)
The ledger holds this as [mul9_8_7](/theorem/mul9_8_7) — proven `by decide`, sorry-free:

```lean
(8 * 7) % 9 = 2
```

### 8·8 ≡ 1 (mod 9)
The ledger holds this as [mul9_8_8](/theorem/mul9_8_8) — proven `by decide`, sorry-free:

```lean
(8 * 8) % 9 = 1
```


::: warning 
The 8×8 CORE: the multiplication table of ℤ/9's eight non-zero residues {1. The boundary is confirmed by the wing's own sealed theorems — e.g. [mul9_1_1](/theorem/mul9_1_1) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
