---
title: "The cryptographic primitives"
description: "Computed from lean/Crypto.lean — 9 sealed theorems, every claim citing its proof."
---

# The cryptographic primitives

> THE CRYPTO WING — the primitives this tree implements, sealed as decidable arithmetic. WHY IT EXISTS: on 2026-09-05 the team surface was run over a live estate's application portfolio and `crypto` came back as a GAP, because this tree implements SHA-256, SHA-512/384/224, HMAC, PBKDF2, ChaCha20, Poly1305 and the AEAD over them — every one verified against the standards' own test vectors — and NO SEALED THEOREM NAMED ANY OF THEM. The KAT suite proved the primitives; the ledger claimed nothing about them. CLAIMED HERE: every arithmetic fact below, each closed by the Lean 4 kernel over its own finite domain and axiom-free. They are structural laws of the primitives' SHAPE — how the SHA-2 digests tile the 64-state board and which one does not, how SHA-256's padding closes every block across two blocks of enumerated lengths, where SHA-512's doubling of SHA-256 stops, how ChaCha20's sixteen state words partition, what the AEAD envelope costs, why HMAC has two pads rather than one, what PBKDF2's block count is over every length to a kilobit, and how a digest lands whole on this tree's own addressing. Each is paired with a JS witness that RECOMPUTES it from this tree's implementation, so a sealed statement cannot drift from the code it describes. NOT CLAIMED, AND NAMED SO NOBODY READS IT IN: none of this is a security result. That SHA-256 is collision resistant, that ChaCha20 is indistinguishable from random, that Poly1305 is unforgeable, that 600000 PBKDF2 iterations suffice — no theorem here touches any of it, and the kernel could not decide them if asked. Those rest on cryptanalysis and on the standards' own review; the KAT suite checks that these implementations compute what the standards say. A structural law is worth sealing because it is checkable, and calling it a security proof would be the overreach this ledger refuses. TWO ENUMERATIONS, not samples: the padding law walks all 128 message lengths 0..127 (two full blocks, so every residue mod 64 appears twice and the boundary is crossed inside the domain) and the PBKDF2 ceiling walks all 129 lengths 0..128. ONE FORM CHANGED DELIBERATELY: the implementation's padding expression passes through a negative intermediate, which Lean's truncating Nat subtraction computes differently, so the sealed form never leaves the naturals and the witness checks both agree on all 128 lengths before the kernel is asked. — held by [three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not](/theorem/three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not) and its 8 siblings below.

**9 theorems**, from [three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not](/theorem/three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not) onward, each proven `by decide` in <a href="/lean/Crypto.lean">lean/Crypto.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 9 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not](/theorem/three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCrypto.lean)** — nothing to install. The editor fetches `lean/Crypto.lean` from the repository and re-decides all 9 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### CLAIMED: of the four SHA-2 digests this tree computes, 256, 384 and 512 bits tile the 64-bit board exactly — 4, 6 and 8 boards — and 224 alone does not, at three and a half.
The ledger holds this as [three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not](/theorem/three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not) — proven `by decide`, sorry-free:

```lean
(28 * 8 = 224) ∧ (32 * 8 = 256) ∧ (48 * 8 = 384) ∧ (64 * 8 = 512) ∧ (256 % 64 = 0) ∧ (384 % 64 = 0) ∧ (512 % 64 = 0) ∧ (224 % 64 = 32) ∧ (224 = 3 * 64 + 32)
```

### CLAIMED by enumeration over all 128 message lengths 0..127: the padded length is a multiple of 64 for every one, and the padding added is never fewer than 9 bytes nor more than 72.
The ledger holds this as [sha256_padding_closes_every_block_over_two_blocks_of_lengths](/theorem/sha256_padding_closes_every_block_over_two_blocks_of_lengths) — proven `by decide`, sorry-free:

```lean
(∀ l : Fin 128, (l.val + 9 + ((64 - ((l.val + 9) % 64)) % 64)) % 64 = 0 ∧ 9 ≤ (9 + ((64 - ((l.val + 9) % 64)) % 64)) ∧ (9 + ((64 - ((l.val + 9) % 64)) % 64)) ≤ 72)
```

### CLAIMED: SHA-512 doubles SHA-256's word, block and digest exactly — 64 bits, 128 bytes, 64 bytes — and its round count does NOT double: 80, not 128, a difference of 16.
The ledger holds this as [sha512_doubles_the_word_block_and_digest_but_not_the_rounds](/theorem/sha512_doubles_the_word_block_and_digest_but_not_the_rounds) — proven `by decide`, sorry-free:

```lean
(64 = 2 * 32) ∧ (128 = 2 * 64) ∧ (1024 = 2 * 512) ∧ (80 ≠ 2 * 64) ∧ (80 - 64 = 16)
```

### CLAIMED: ChaCha20's sixteen state words partition exactly as 4 constants + 8 key + 1 counter + 3 nonce; sixteen 32-bit words are 512 bits, which is the 64-byte block the implementation emits; twenty rounds are ten double-rounds; and the quarter-round rotations 16, 12, 8 and 7 sum to 43.
The ledger holds this as [the_chacha_state_partitions_into_constants_key_counter_and_nonce](/theorem/the_chacha_state_partitions_into_constants_key_counter_and_nonce) — proven `by decide`, sorry-free:

```lean
(4 + 8 + 1 + 3 = 16) ∧ (16 * 32 = 512) ∧ (512 / 8 = 64) ∧ (20 = 2 * 10) ∧ (16 + 12 + 8 + 7 = 43)
```

### CLAIMED: key 32 + nonce 12 + tag 16 is 60 bytes — the whole AEAD envelope, strictly less than the 64-byte block with 4 bytes to spare — AND, by enumeration over all 64 plaintext lengths 0..63, the overhead is exactly 16 bytes at every one of them, so it does not grow with the message.
The ledger holds this as [the_aead_envelope_fits_inside_one_chacha_block](/theorem/the_aead_envelope_fits_inside_one_chacha_block) — proven `by decide`, sorry-free:

```lean
(32 + 12 + 16 = 60) ∧ (60 < 64) ∧ (64 - 60 = 4) ∧ (∀ n : Fin 64, n.val + 16 - n.val = 16)
```

### CLAIMED: HMAC's two pads 0x36 and 0x5c are 54 and 92, their difference is 38, and their exclusive-or is 106 — which is 0x6a, a byte with four bits set.
The ledger holds this as [the_hmac_pads_differ_in_the_bits_that_carry](/theorem/the_hmac_pads_differ_in_the_bits_that_carry) — proven `by decide`, sorry-free:

```lean
(54 = 32 + 16 + 4 + 2) ∧ (92 = 64 + 16 + 8 + 4) ∧ (16 + 4 = 20) ∧ (54 + 92 - 2 * 20 = 106) ∧ (106 = 64 + 32 + 8 + 2) ∧ (92 - 54 = 38)
```

### CLAIMED by enumeration over all 129 derived-key lengths 0..128: the number of PBKDF2 blocks is the ceiling of the length over 32, and the blocks always cover the length without wasting a whole block.
The ledger holds this as [pbkdf2_block_count_is_the_ceiling_over_every_length_to_a_kilobit](/theorem/pbkdf2_block_count_is_the_ceiling_over_every_length_to_a_kilobit) — proven `by decide`, sorry-free:

```lean
(∀ d : Fin 129, ((d.val + 31) / 32) * 32 ≥ d.val ∧ (d.val = 0 ∨ (((d.val + 31) / 32) - 1) * 32 < d.val))
```

### CLAIMED: a SHA-256 digest is 256 bits, which is exactly two 128-bit uuids, four 64-state boards, and sixty-four hexbits — the same quantity counted four ways, all whole.
The ledger holds this as [a_sha256_digest_is_two_uuids_and_four_boards_at_once](/theorem/a_sha256_digest_is_two_uuids_and_four_boards_at_once) — proven `by decide`, sorry-free:

```lean
(256 = 2 * 128) ∧ (256 = 4 * 64) ∧ (256 / 4 = 64) ∧ (32 * 8 = 256) ∧ (256 % 128 = 0) ∧ (256 % 64 = 0)
```

### CLAIMED by enumeration over all 25 balances from −12 to +12, carried on the mirror index i ↦ 24 − i: the claim involution applied twice returns every balance unchanged, it moves every balance except one, and the honest statement (balance 0, index 12) is its UNIQUE fixed point.
The ledger holds this as [the_claim_involution_fixes_only_the_honest_statement](/theorem/the_claim_involution_fixes_only_the_honest_statement) — proven `by decide`, sorry-free:

```lean
(∀ i : Fin 25, (24 - (24 - i.val) = i.val) ∧ (i.val = 12 ∨ 24 - i.val ≠ i.val)) ∧ (24 - 12 = 12)
```


::: warning 
THE CRYPTO WING — the primitives this tree implements, sealed as decidable arithmetic. The boundary is confirmed by the wing's own sealed theorems — e.g. [three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not](/theorem/three_sha2_digests_tile_the_sixtyfour_board_and_sha224_does_not) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
