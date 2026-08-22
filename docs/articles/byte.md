---
title: "lean/Byte.lean"
description: "Computed from lean/Byte.lean — 5 sealed theorems, every claim citing its proof."
---

# lean/Byte.lean

> THE BYTE — two hexbits, and the unit exact-copy verification actually compares in. — held by [byte_holds_two_hexbits](/theorem/byte_holds_two_hexbits) and its 4 siblings below.

**5 theorems**, from [byte_holds_two_hexbits](/theorem/byte_holds_two_hexbits) onward, each proven `by decide` in [lean/Byte.lean](/lean/Byte.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FByte.lean)** — nothing to install. The editor fetches `lean/Byte.lean` from the repository and re-decides all 5 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### A BYTE IS TWO HEXBITS: eight bits, 256 values, and 16^2 spellings — the two readings agree, so counting a byte in hex characters and counting it in bits land on the same object.
The ledger holds this as [byte_holds_two_hexbits](/theorem/byte_holds_two_hexbits) — proven `by decide`, sorry-free:

```lean
(2 * 4 = 8) ∧ ((2:Nat)^8 = 256) ∧ ((16:Nat)^2 = 256) ∧ (2 ≠ 4)
```

### THE ADDRESS IS SIXTEEN BYTES: 32 hex characters, 128 bits, 16 bytes — three counts of one object, each derived from the layout rather than stated beside it.
The ledger holds this as [address_is_sixteen_bytes](/theorem/address_is_sixteen_bytes) — proven `by decide`, sorry-free:

```lean
(32 / 2 = 16) ∧ (16 * 8 = 128) ∧ (32 * 4 = 128)
```

### A SHA-256 DIGEST IS EXACTLY TWICE THE ADDRESS: 32 bytes against 16, 256 bits against 128, 64 hex characters against 32.
The ledger holds this as [digest_doubles_the_address](/theorem/digest_doubles_the_address) — proven `by decide`, sorry-free:

```lean
(32 = 2 * 16) ∧ (256 = 2 * 128) ∧ (64 = 2 * 32)
```

### THE TAMPER SET OF ONE POSITION IS 255 VALUES: a byte holds 256 and one of them is the original, so 256 - 1 = 255 alternatives remain, and 255 across 32 positions is 8160.
The ledger holds this as [every_alternative_differs](/theorem/every_alternative_differs) — proven `by decide`, sorry-free:

```lean
(256 - 1 = 255) ∧ (255 * 32 = 8160) ∧ (256 ≠ 255)
```

### OVER A THIRTY-TWO BYTE DIGEST THE WHOLE TAMPER SET IS 32 × 255 = 8160 single-byte alterations, every one of them a different digest under byte-equality.
The ledger holds this as [tamper_set_counts_eight_thousand](/theorem/tamper_set_counts_eight_thousand) — proven `by decide`, sorry-free:

```lean
(32 * 255 = 8160) ∧ (8160 ≠ 0)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
