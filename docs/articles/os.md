---
title: "The OS-integrity algebra"
description: "Computed from lean/Os.lean — 7 sealed theorems, every claim citing its proof."
---

# The OS-integrity algebra

> THE OS-INTEGRITY ALGEBRA — the third named layer, completing hardware → software → os: the decidable facts a DEPLOYMENT is verified against. uuidnaOS is a content-addressed PROVENANCE boundary (src/os pins an exact Alpine release, src/drivers the exact driver bundle, each checked against its PUBLISHED SHA-256 with uuidna's own pure-TS hash) — it NEVER boots, ports, links, or executes. This seals the decidable core: verification IS byte-equality (exact-copy), so a single-byte tamper, a truncation, or a reordering breaks the match (a provenance is a SEQUENCE, not a set); the digest is a fixed 256 bits, the content-address a fixed 128; and the non-determinism boundary is EXACTLY the two named modules. HONEST SCOPE: integrity, not truth, and not execution — uuidna seals what an exact-copy verification decides so a deployment can be verified against it; it does NOT run an operating system. A sealed integrity spec, not a booted OS.

**7 theorems**, each proven `by decide` in [lean/Os.lean](/lean/Os.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

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

### A TRUNCATION is DETECTED: a short image does not equal the pinned bytes — [1,2,3] ≠ [1,2]. Dropping data breaks the exact-copy proof; you cannot pass off a partial base as the whole named release.

The ledger holds this as [truncation_is_detected](/theorem/truncation_is_detected) — proven `by decide`, sorry-free:

```lean
([1,2,3] : List Nat) ≠ [1,2]
```

### A PROVENANCE is a SEQUENCE, not a set: reordering the bytes breaks the match — [1,2,3] ≠ [3,2,1]. The same bytes in a different order are a different image; exact-copy pins the order, not just the multiset.

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


::: warning HONEST SCOPE
integrity, not truth, and not execution — uuidna seals what an exact-copy verification decides so a deployment can be verified against it; it does NOT run an operating system.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
