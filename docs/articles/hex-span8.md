---
title: "The four-hex span, part 8"
description: "Computed from lean/HexSpan8.lean — 4096 sealed theorems, every claim citing its proof."
---

# The four-hex span, part 8

> THE FOUR-HEX SPAN, PART 8 — addresses 7000…7fff of 65536. Each surface decides two facts about ONE address, both computed by the kernel: the address reassembles from its own four nibbles, and its nibble sum is congruent to it modulo 15 (casting out fifteens, the base-16 analogue of casting out nines). The span is 2^16 because that is the square root of the 2^32 an eight-hex handle addresses — the BIRTHDAY POINT of this tree's identity scheme, the count at which two different contents begin sharing an address as often as not. Filling it populates the capacity with the objects the capacity exists for. The naming is taken from the axiom families rather than invented: every statement here classifies as ENUMERATION under familyOf, and the name is that family plus the address, so the address IS the identity and no two names can collide. Emitted in lane-sized files because a flat walk of this width exceeds Lean's recursion depth — 128 passes, 256 fails, measured — and one enormous file would hold a lane while the others idle. — held by [enumeration_hex4_7000](/theorem/enumeration_hex4_7000) and its 4095 siblings below.

**4096 theorems** and **4,096 decided cases**, from [enumeration_hex4_7000](/theorem/enumeration_hex4_7000) onward, each proven `by decide` in <a href="/lean/HexSpan8.lean">lean/HexSpan8.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FHexSpan8.lean)** — nothing to install. The editor fetches `lean/HexSpan8.lean` from the repository and re-decides all 4096 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### 4,096 stations, one statement each
Every theorem in lean/HexSpan8.lean is this statement at its own station n — the number its key ends in, read as hex — checked against all 4,096 when this article was generated, so this is the exact set, not a sample:

```lean
reassembles n = true ∧ castsFifteens n = true
```

They run from [enumeration_hex4_7000](/theorem/enumeration_hex4_7000) to [enumeration_hex4_7fff](/theorem/enumeration_hex4_7fff). The site builds no page per station — a page list spread into one call overflows V8's argument limit near 2^16, the span's own size — so the Worker renders each at `/theorem/enumeration_hex4_<hex>` from the ledger, and `uuidna_theorem` answers any of them.


::: warning 
THE FOUR-HEX SPAN, PART 8 — addresses 7000…7fff of 65536. The boundary is confirmed by the wing's own sealed theorems — e.g. [enumeration_hex4_7000](/theorem/enumeration_hex4_7000) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
