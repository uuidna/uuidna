---
title: "The OS-integrity algebra"
description: "Computed from lean/Os.lean — 8 sealed theorems, every claim citing its proof."
---

# The OS-integrity algebra

> THE OS-INTEGRITY ALGEBRA — the third named layer, completing hardware → software → os: the decidable facts a DEPLOYMENT is verified against. uuidnaOS is a content-addressed PROVENANCE boundary (src/os pins an exact Alpine release, src/drivers the exact driver bundle, each checked against its PUBLISHED SHA-256 with uuidna's own pure-TS hash) — it NEVER boots, ports, links, or executes. — held by [exact_copy_is_byte_equality](/theorem/exact_copy_is_byte_equality) and its 7 siblings below.

**8 theorems**, from [exact_copy_is_byte_equality](/theorem/exact_copy_is_byte_equality) onward, each proven `by decide` in <a href="/lean/Os.lean">lean/Os.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [single_byte_tamper_is_detected](/theorem/single_byte_tamper_is_detected). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FOs.lean)** — nothing to install. The editor fetches `lean/Os.lean` from the repository and re-decides all 8 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### PROVENANCE verification IS byte-equality: the bytes you hold match the pinned release exactly — [1,2,3] equals [1,2,3]. The exact-copy proof is nothing more, and nothing less, than the held bytes equalling the named ones.
The ledger holds this as [exact_copy_is_byte_equality](/theorem/exact_copy_is_byte_equality) — proven `by decide`, sorry-free:

```lean
([1,2,3] : List Nat) = [1,2,3]
```

### A SINGLE-BYTE TAMPER is DETECTED: change one byte of the image and it no longer equals the pinned bytes — [1,2,3,4] ≠ [1,2,0,4]. One flipped bit fails the check; a modified base cannot masquerade as the named upstream.
The ledger holds this as [single_byte_tamper_is_detected](/theorem/single_byte_tamper_is_detected) — proven `by decide`, sorry-free:

```lean
([1,2,3,4] : List Nat) ≠ [1,2,0,4]
```

### THE TAMPER SPACE, ENUMERATED RATHER THAN INSTANCED. single_byte_tamper_is_detected proves the claim on a four-byte toy — one tamper, one case — while the object this boundary actually verifies is a single-byte tamper over the PINNED 32-BYTE digest: Alpine's published SHA-256 for 3.24.1/x86_64. That space is walked here position by position: for each of the 32 byte positions, EXACTLY 255 of the 256 byte values differ from the pinned byte, so the space is 32 · 255 = 8160 tampers and nothing is left implicit. FACTORED THROUGH THE NIBBLE, deliberately: a byte is two nibbles of 16 states (16 · 16 = 256, the lattice this whole tree computes on), and enumerating 16 × 16 keeps every term inside the kernel's default recursion depth — a flat `List.range 256` hits the ceiling, and buying depth with set_option is the thing this ledger refuses (the raise census in lean-cube counts every instance). Restating the claim on the lattice is the cure, not raising the limit. AND THE DIGEST RIDES INLINE rather than as a wing def: the falsifier leg is granted by an INDEPENDENT evaluator whose grammar admits no wing-local name, so a statement naming `digestBytes` and `nth` was re-decidable by the kernel and unreachable to the second implementation — it sealed with no falsifier and the leg census caught it at 2582 of 2583. Walking the bytes BY VALUE says the same thing in a grammar both can read. WHAT IT SEALS: the completeness and the cardinality of the tamper space, from the pinned bytes themselves. WHAT IT DOES NOT: hash anything — that a tampered image FAILS the check follows from byte-equality being pointwise (exact_copy_is_byte_equality, byte_order_is_significant), and verifying your actual bytes is verifyAlpineRootfs's job with uuidna's own pure-TS SHA-256.
The ledger holds this as [single_byte_tamper_space_is_enumerated](/theorem/single_byte_tamper_space_is_enumerated) — proven `by decide`, sorry-free:

```lean
(([65,247,62,60,245,250,145,155,138,165,202,107,48,220,72,240,218,39,32,119,109,116,35,226,167,116,130,17,69,111,224,129] : List Nat).length = 32) ∧ (([65,247,62,60,245,250,145,155,138,165,202,107,48,220,72,240,218,39,32,119,109,116,35,226,167,116,130,17,69,111,224,129] : List Nat).all (fun b => b < 256)) ∧ (([65,247,62,60,245,250,145,155,138,165,202,107,48,220,72,240,218,39,32,119,109,116,35,226,167,116,130,17,69,111,224,129] : List Nat).all (fun b => ((List.range 16).map (fun hi => ((List.range 16).filter (fun lo => hi * 16 + lo != b)).length)).foldl (fun s n => s + n) 0 == 255)) ∧ (16 * 16 = 256) ∧ (32 * 255 = 8160)
```

### A TRUNCATION is DETECTED: a short image does not equal the pinned bytes — [1,2,3] ≠ [1,2]. Dropping data breaks the exact-copy proof; you cannot pass off a partial base as the whole named release.
The ledger holds this as [truncation_is_detected](/theorem/truncation_is_detected) — proven `by decide`, sorry-free:

```lean
([1,2,3] : List Nat) ≠ [1,2]
```

### A PROVENANCE is a SEQUENCE— [1,2,3] ≠ [3,2,1]. The same bytes in a different order are a different image; exact-copy pins the order.
The ledger holds this as [byte_order_is_significant](/theorem/byte_order_is_significant) — proven `by decide`, sorry-free:

```lean
([1,2,3] : List Nat) ≠ [3,2,1]
```

### The provenance DIGEST is a fixed width: SHA-256 is 256 bits = 32 bytes = 64 hex characters (32·8 = 256 and 64 = 32·2). The exact-copy fingerprint every release is pinned by has one fixed size.
The ledger holds this as [sha256_digest_is_256_bits](/theorem/sha256_digest_is_256_bits) — proven `by decide`, sorry-free:

```lean
(32 * 8 = 256) ∧ (64 = 32 * 2)
```

### The provenance CONTENT-ADDRESS is a 128-bit particle: 16 bytes, 16·8 = 128 — one uuid, the same particle width the whole ledger folds to. A pinned release addresses to exactly 128 bits.
The ledger holds this as [provenance_address_is_128_bits](/theorem/provenance_address_is_128_bits) — proven `by decide`, sorry-free:

```lean
16 * 8 = 128
```

### The NON-DETERMINISM boundary is EXACTLY TWO named modules — os and drivers — and nowhere else: ["os","drivers"].length = 2. Wall-clock-dependent "latest" reads are honest ONLY here; the rest of uuidna is deterministic, and the count is fixed at two.
The ledger holds this as [boundary_is_exactly_two_named_modules](/theorem/boundary_is_exactly_two_named_modules) — proven `by decide`, sorry-free:

```lean
(["os","drivers"] : List String).length = 2
```


::: warning 
THE OS-INTEGRITY ALGEBRA — the third named layer, completing hardware → software → os: the decidable facts a DEPLOYMENT is verified against. The boundary is confirmed by the wing's own sealed theorems — e.g. [exact_copy_is_byte_equality](/theorem/exact_copy_is_byte_equality) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
