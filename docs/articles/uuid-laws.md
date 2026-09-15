---
title: "The uuid laws"
description: "Computed from lean/UuidLaws.lean — 9 sealed theorems, every claim citing its proof."
---

# The uuid laws

> The uuid laws — what the version-8 stamp keeps and fixes, and why an address never determines its payload; proved by ceccec, re-judged on this host — held by [version_stamp](/theorem/version_stamp) and its 8 siblings below.

**9 theorems** and **17,927 decided cases**, from [version_stamp](/theorem/version_stamp) onward, each checked by the kernel in <a href="/lean/UuidLaws.lean">lean/UuidLaws.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FUuidLaws.lean)** — nothing to install. The editor fetches `lean/UuidLaws.lean` from the repository and re-decides all 9 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### every one of the 256 bytes keeps its low nibble under the version stamp
The ledger holds this as [version_stamp](/theorem/version_stamp) — proven `by decide`, sorry-free:

```lean
allBytes (fun b => or8 (and8 b 15) 128 == 128 + b % 16) = true
```

### every one of the 256 bytes keeps its low six bits under the variant stamp
The ledger holds this as [variant_stamp](/theorem/variant_stamp) — proven `by decide`, sorry-free:

```lean
allBytes (fun b => or8 (and8 b 63) 128 == 128 + b % 64) = true
```

### every one of the 256 stamped bytes carries the high nibble 8
The ledger holds this as [version_high_nibble_is_eight](/theorem/version_high_nibble_is_eight) — proven `by decide`, sorry-free:

```lean
allBytes (fun b => versionStamp b / 16 == 8) = true
```

### every one of the 256 stamped bytes carries the high bits 10
The ledger holds this as [variant_high_two_are_one_zero](/theorem/variant_high_two_are_one_zero) — proven `by decide`, sorry-free:

```lean
allBytes (fun b => variantStamp b / 64 == 2) = true
```

### of the 8 bit positions, the stamps fix exactly 4 and 2, measured over all 256 bytes
The ledger holds this as [fixed_positions_exact](/theorem/fixed_positions_exact) — proven `by decide`, sorry-free:

```lean
fixedPositions versionStamp = [4, 5, 6, 7] ∧ fixedPositions variantStamp = [6, 7]
```

### the 128 bits of a UUID keep 122 free once the 4 + 2 measured stamp bits are fixed
The ledger holds this as [free_bits_122](/theorem/free_bits_122) — proven `by rw`, sorry-free:

```lean
16 * 8 - ((fixedPositions versionStamp).length + (fixedPositions variantStamp).length) = 122
```

### for every map, value and bound, a search either finds the value or shows no input up to the bound has it
The ledger holds this as [bounded_search_finds_or_refutes](/theorem/bounded_search_finds_or_refutes) — proven `by intro`, sorry-free:

```lean
∀ (f : Nat → Nat) (v n : Nat), (∃ x, x ≤ n ∧ f x = v) ∨ (∀ x, x ≤ n → f x ≠ v)
```

### for every size n, any map of the n + 1 inputs into n values sends two of them to the same value
The ledger holds this as [pigeonhole_for_every_size](/theorem/pigeonhole_for_every_size) — proven `by intro`, sorry-free:

```lean
∀ (n : Nat) (f : Nat → Nat), (∀ x, x ≤ n → f x < n) → ∃ x y, x < y ∧ y ≤ n ∧ f x = f y
```

### for every width k, any k-bit address of the 2^k + 1 inputs 0 … 2^k gives two of them the same address
The ledger holds this as [address_never_determines_payload](/theorem/address_never_determines_payload) — proven `by exact`, sorry-free:

```lean
∀ (k : Nat) (f : Nat → Nat), (∀ x, f x < 2 ^ k) → ∃ x y, x < y ∧ y ≤ 2 ^ k ∧ f x = f y
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
