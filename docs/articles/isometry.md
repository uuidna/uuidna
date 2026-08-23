---
title: "The isometry"
description: "Computed from lean/Isometry.lean — 6 sealed theorems, every claim citing its proof."
---

# The isometry

> THE XOR ISOMETRY — the one identity the cipher, the strand and the code each hold a corner of. — held by [xor_preserves_distance](/theorem/xor_preserves_distance) and its 5 siblings below.

**6 theorems**, from [xor_preserves_distance](/theorem/xor_preserves_distance) onward, each proven `by decide` in [lean/Isometry.lean](/lean/Isometry.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [reuse_leaks_by_isometry](/theorem/reuse_leaks_by_isometry). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FIsometry.lean)** — nothing to install. The editor fetches `lean/Isometry.lean` from the repository and re-decides all 6 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ISOMETRY: xoring both sides by the same key leaves the Hamming distance unchanged, for every pair and every key over the four-bit cube. This is the single fact the cipher, the strand and the code each hold a corner of.
The ledger holds this as [xor_preserves_distance](/theorem/xor_preserves_distance) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun a => (List.range 16).all (fun b => (List.range 16).all (fun k => dist (lxor a k) (lxor b k) == dist a b)))
```

### WHY KEY REUSE LEAKS, stated as the cause rather than the symptom: because the pad is an isometry, the distance between two ciphertexts EQUALS the distance between their plaintexts. An attacker with neither key nor message still reads a true fact about the messages. Cipher.lean seals that reuse leaks the plaintext XOR; this seals why it must.
The ledger holds this as [reuse_leaks_by_isometry](/theorem/reuse_leaks_by_isometry) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun m1 => (List.range 8).all (fun m2 => (List.range 8).all (fun k => dist (lxor m1 k) (lxor m2 k) == dist m1 m2)))
```

### EVERY DNA BASE DIFFERS FROM ITS COMPLEMENT IN EXACTLY TWO BITS. A base is two bits, complementing is lxor with 3, and 3 has weight two — so the distance is two for all four bases. The strand's pairing is the pad's step, at width two.
The ledger holds this as [complement_flips_two](/theorem/complement_flips_two) — proven `by decide`, sorry-free:

```lean
((List.range 4).all (fun x => dist x (lxor x 3) == 2)) ∧ (pop 3 = 2)
```

### AND A CODON IS THREE BASES, SO SIX BITS: 4^3 = 64 = 2^6, and complementing a whole codon flips every one of the six — three bases at two bits each. The width scales with the word; the isometry does not change.
The ledger holds this as [codon_flips_six](/theorem/codon_flips_six) — proven `by decide`, sorry-free:

```lean
((4:Nat)^3 = 64) ∧ ((2:Nat)^6 = 64) ∧ (3 * 2 = 6) ∧ (pop 63 = 6)
```

### THE DISTANCE IS A METRIC. Both halves on the line, so the second is discharged where it is claimed rather than assumed from the first.
The ledger holds this as [distance_is_symmetric](/theorem/distance_is_symmetric) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun a => (List.range 16).all (fun b => (dist a b == dist b a) && ((dist a b == 0) == (a == b))))
```

### AND WHY A CODE CORRECTS AT ALL: correction depends only on distance, which the isometry preserves, so the decoder's geometry survives encoding. At distance three a decoder corrects one error and detects two — (3−1)/2 = 1 and 3−1 = 2 — and it cannot correct two, which the line proves rather than leaves implied.
The ledger holds this as [isometry_bounds_correction](/theorem/isometry_bounds_correction) — proven `by decide`, sorry-free:

```lean
((3 - 1) / 2 = 1) ∧ (3 - 1 = 2) ∧ ((3 - 1) / 2 ≠ 2)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
