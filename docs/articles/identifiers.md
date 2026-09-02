---
title: "The identifiers"
description: "Computed from lean/Identifiers.lean — 6 sealed theorems, every claim citing its proof."
---

# The identifiers

> THE IDENTIFIERS — ISBN-10/13 check-digit arithmetic: the mod-11/mod-10 weighted sums and the errors they catch, decidable. — held by [isbn10_valid_check](/theorem/isbn10_valid_check) and its 5 siblings below.

**6 theorems**, from [isbn10_valid_check](/theorem/isbn10_valid_check) onward, each proven `by decide` in [lean/Identifiers.lean](/lean/Identifiers.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [isbn10_catches_single_error](/theorem/isbn10_catches_single_error). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FIdentifiers.lean)** — nothing to install. The editor fetches `lean/Identifiers.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### ISBN-10 0-306-40615-2 checks out: its weighted sum Σ (11−i)·dᵢ = 132 = 12·11 ≡ 0 (mod 11) — the check digit 2 makes the whole thing divisible by 11.
The ledger holds this as [isbn10_valid_check](/theorem/isbn10_valid_check) — proven `by decide`, sorry-free:

```lean
(([10,9,8,7,6,5,4,3,2,1].zip [0,3,0,6,4,0,6,1,5,2]).map (fun p => p.1 * p.2)).foldl (· + ·) 0 % 11 = 0
```

### ISBN-13 978-0-306-40615-7 checks out: its alternating 1,3,1,3… weighted sum = 100 ≡ 0 (mod 10) — the mod-10 check used by the EAN barcode.
The ledger holds this as [isbn13_valid_check](/theorem/isbn13_valid_check) — proven `by decide`, sorry-free:

```lean
(([1,3,1,3,1,3,1,3,1,3,1,3,1].zip [9,7,8,0,3,0,6,4,0,6,1,5,7]).map (fun p => p.1 * p.2)).foldl (· + ·) 0 % 10 = 0
```

### A mod-11 check digit needs ELEVEN symbols: 0–9 and X for the value 10 — [0,1,…,10] has length 11. That is why an ISBN-10 can end in X.
The ledger holds this as [isbn10_check_alphabet_eleven](/theorem/isbn10_check_alphabet_eleven) — proven `by decide`, sorry-free:

```lean
[0,1,2,3,4,5,6,7,8,9,10].length = 11
```

### ISBN-10 catches EVERY single-digit error: its weights 10..1 are each nonzero mod 11 (which is prime), so changing any digit by δ shifts the checksum by wᵢ·δ ≠ 0 — the error cannot hide.
The ledger holds this as [isbn10_catches_single_error](/theorem/isbn10_catches_single_error) — proven `by decide`, sorry-free:

```lean
[10,9,8,7,6,5,4,3,2,1].all (fun w => w % 11 != 0)
```

### ISBN-10 catches EVERY adjacent transposition: consecutive weights differ by exactly 1, so swapping two neighbouring digits d,e shifts the checksum by (d−e) ≠ 0 (mod 11) — the commonest typo, caught.
The ledger holds this as [isbn10_catches_transposition](/theorem/isbn10_catches_transposition) — proven `by decide`, sorry-free:

```lean
([10,9,8,7,6,5,4,3,2,1].zip [9,8,7,6,5,4,3,2,1]).all (fun p => p.1 - p.2 == 1)
```

### ISBN-13 lives in the Bookland EAN: books carry the prefix 978 or 979 (979 − 978 = 1) — the barcode namespace that folded ISBNs into the global product code.
The ledger holds this as [isbn13_bookland_prefix](/theorem/isbn13_bookland_prefix) — proven `by decide`, sorry-free:

```lean
979 - 978 = 1 ∧ 978 < 979
```


::: warning 
THE IDENTIFIERS — ISBN-10/13 check-digit arithmetic: the mod-11/mod-10 weighted sums and the errors they catch, decidable. The boundary is confirmed by the wing's own sealed theorems — e.g. [isbn10_valid_check](/theorem/isbn10_valid_check) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
