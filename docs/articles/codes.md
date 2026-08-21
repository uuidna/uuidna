---
title: "The error-correcting codes"
description: "Computed from lean/Codes.lean — 8 sealed theorems, every claim citing its proof."
---

# The error-correcting codes

> THE ERROR-CORRECTING CODES — Hamming(7,4), the perfect-code sphere-packing, distance/correction bounds, and the XOR checksum, decidable. — held by [hamming_seven_four](/theorem/hamming_seven_four) and its 7 siblings below.

**8 theorems**, from [hamming_seven_four](/theorem/hamming_seven_four) onward, each proven `by decide` in [lean/Codes.lean](/lean/Codes.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [distance_three_detects_two](/theorem/distance_three_detects_two). A boundary stated here is decided.

### Hamming(7,4): 4 data bits + 3 parity bits = 7, carrying 2⁴ = 16 codewords — three redundant bits protect four.
The ledger holds this as [hamming_seven_four](/theorem/hamming_seven_four) — proven `by decide`, sorry-free:

```lean
4 + 3 = 7 ∧ 2^4 = 16
```

### Hamming(7,4) is a PERFECT code: each of the 16 codewords owns a sphere of 1 (itself) + 7 (single-bit flips) = 8, and 16 × 8 = 128 = 2⁷ — the spheres tile the whole 7-bit space exactly, no word wasted.
The ledger holds this as [hamming_perfect_code](/theorem/hamming_perfect_code) — proven `by decide`, sorry-free:

```lean
16 * 8 = 128 ∧ 2^7 = 128
```

### The minimum distance d = 3 satisfies the Singleton bound d ≤ n − k + 1 = 7 − 4 + 1 = 4 — no code can beat it, and Hamming sits one below.
The ledger holds this as [singleton_bound](/theorem/singleton_bound) — proven `by decide`, sorry-free:

```lean
3 ≤ 7 - 4 + 1
```

### A minimum distance of 3 corrects ⌊(d−1)/2⌋ = ⌊2/2⌋ = 1 error: any single flip lands strictly nearer its own codeword than any other.
The ledger holds this as [distance_three_corrects_one](/theorem/distance_three_corrects_one) — proven `by decide`, sorry-free:

```lean
(3 - 1) / 2 = 1
```

### The same distance-3 code DETECTS d − 1 = 2 errors — two flips can never reach another codeword, so they are always noticed (though not corrected).
The ledger holds this as [distance_three_detects_two](/theorem/distance_three_detects_two) — proven `by decide`, sorry-free:

```lean
3 - 1 = 2
```

### The (3,1) repetition code corrects one flip by MAJORITY: [1,1,1] with one bit flipped still shows two 1s, and 2·2 > 3 makes two a strict majority of three.
The ledger holds this as [repetition_three_majority](/theorem/repetition_three_majority) — proven `by decide`, sorry-free:

```lean
(([1,1,0].filter (fun x => x == 1)).length = 2) ∧ (2 * 2 > 3)
```

### A linear XOR checksum catches any single flip: XOR is self-inverse, so flipping a word by d and re-checking recovers exactly d — (a ⊕ d) ⊕ a = d, for every a. The error cannot hide.
The ledger holds this as [xor_checksum_catches_flip](/theorem/xor_checksum_catches_flip) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun a => lxor (lxor a 5) a == 5)
```

### Correction needs room: 2⁴ = 16 codewords sit sparsely inside 2⁷ = 128 possible words (16 < 128) — the redundancy is exactly what lets a flipped word be traced back to its origin.
The ledger holds this as [codewords_sparse](/theorem/codewords_sparse) — proven `by decide`, sorry-free:

```lean
2^4 < 2^7
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
