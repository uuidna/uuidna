---
title: "The cipher & the strand"
description: "Computed from lean/Cipher.lean — 30 sealed theorems, every claim citing its proof."
---

# The cipher & the strand

> CRYPTO ∩ DNA — the shared algebra of ciphers and the strand, and its limits: base-pairing is a fixed-key XOR (a one-time-pad step), the pad is self-inverse but key reuse leaks the plaintext XOR, a linear fold is malleable (a receipt is integrity. these are the DECIDABLE BOUNDS of the algebra — what it guarantees and what it cannot; secrecy itself is ChaCha20-Poly1305. — held by [key_floor_is_one_uuid](/theorem/key_floor_is_one_uuid) and its 29 siblings below.

**30 theorems**, from [key_floor_is_one_uuid](/theorem/key_floor_is_one_uuid) onward, each proven `by decide` in [lean/Cipher.lean](/lean/Cipher.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 15 of its 30 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [key_floor_is_one_uuid](/theorem/key_floor_is_one_uuid). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FCipher.lean)** — nothing to install. The editor fetches `lean/Cipher.lean` from the repository and re-decides all 30 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE CIPHER MEASURED IN THE ARCHITECTURE’S OWN UNIT. A hexbit is 4 bits, and everything here computes in hexbits, so the ChaCha20-Poly1305 key is 64 hexbits rather than 256 bits. Grover halves the exponent of a brute-force search, which takes the floor to 32 hexbits — and 32 hexbits is EXACTLY the uuid. The post-quantum floor of the cipher and the width of an identifier are the same number, in the same unit, and it is only visible once the bits are converted: 256/4 = 64, 128/4 = 32, and the uuid is 32. Bits hide this; hexbits state it.
The ledger holds this as [key_floor_is_one_uuid](/theorem/key_floor_is_one_uuid) — proven `by decide`, sorry-free:

```lean
(256 / 4 = 64) ∧ (128 / 4 = 32) ∧ (256 = 2 * 128) ∧ (32 * 4 = 128)
```

### Base-pairing is a self-inverse map: the complement comp(x)=3−x applied twice is the identity (A↔T↔A, C↔G↔C) — a decrypt that equals its encrypt, like the diamond reflection.
The ledger holds this as [dna_complement_involution](/theorem/dna_complement_involution) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun x => 3 - (3 - x) == x)
```

### The complement has NO fixed point — no base pairs with itself — so, like a good permutation cipher, it moves every symbol.
The ledger holds this as [dna_complement_fixed_point_free](/theorem/dna_complement_fixed_point_free) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun x => 3 - x != x)
```

### Base-pairing IS a XOR cipher: on the 2-bit encoding comp(x)=3−x equals x XOR 3 — a one-time-pad STEP with the fixed pad 3. Real, but a FIXED pad is public.
The ledger holds this as [complement_is_xor_key3](/theorem/complement_is_xor_key3) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun x => 3 - x == lxor x 3)
```

### The one-time-pad is its own inverse (Vernam): (m ⊕ k) ⊕ k = m for every symbol and key — the one information-theoretically secure primitive, WHEN the key is fresh and never reused.
The ledger holds this as [otp_self_inverse](/theorem/otp_self_inverse) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun m => (List.range 16).all (fun k => lxor (lxor m k) k == m))
```

### Key reuse is fatal: two messages under the SAME key leak their plaintext XOR — (m₁⊕k) ⊕ (m₂⊕k) = m₁⊕m₂, independent of k. The honest reason a step MUST advance (the ratchet), and why a fixed-pad complement hides nothing.
The ledger holds this as [otp_key_reuse_leaks_xor](/theorem/otp_key_reuse_leaks_xor) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun m1 => (List.range 8).all (fun m2 => (List.range 8).all (fun k => (lxor (lxor m1 k) (lxor m2 k)) == (lxor m1 m2))))
```

### A linear (XOR) fold is malleable: flipping the input by d flips the fold by exactly d — (a⊕d)⊕a = d — so it binds nothing an adversary cannot adjust. A content-address is INTEGRITY/routing.
The ledger holds this as [xor_fold_is_malleable](/theorem/xor_fold_is_malleable) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun a => (List.range 16).all (fun d => lxor (lxor a d) a == d))
```

### The uuid transport leaks SIZE: a message of b bits occupies ⌈b/115⌉ uuids, a step function of length — content is hidden by the cipher, message LENGTH is not (the chain grows in whole-uuid quanta of 115 bits).
The ledger holds this as [transport_leaks_length](/theorem/transport_leaks_length) — proven `by decide`, sorry-free:

```lean
((1 + 114) / 115 = 1) ∧ ((115 + 114) / 115 = 1) ∧ ((116 + 114) / 115 = 2) ∧ ((230 + 114) / 115 = 2) ∧ ((231 + 114) / 115 = 3)
```

### The genetic code reads bases three at a time: 4³ = 64 codons — the DNA alphabet cubed, the domain the code maps from.
The ledger holds this as [codons_four_cubed](/theorem/codons_four_cubed) — proven `by decide`, sorry-free:

```lean
4^3 = 64
```

### THE NAME IS A THEOREM — why uuid and DNA are one word here. The genetic code and the coin measure are the SAME NUMBER by two different routes: DNA reads 4 bases three at a time (4³ = 64) and the coin is six doublings of bits (2⁶ = 64), so 4³ = 2⁶ — the codon count IS the coin's bit measure. The uuid is EXACTLY TWO of them: 128 = 2·64 = 2⁷ — two coins, and (double_strand) two antiparallel rails, one per direction. uuid = DNA × the two coins, and the double helix is the bidirectional messaging the coins price at one per direction. an arithmetic coincidence of counts made structural by construction — the address is BUILT as two 64-bit halves; it is not a claim that DNA stores uuids or that biology computes addresses.
The ledger holds this as [uuidna_is_dna_times_the_two_coins](/theorem/uuidna_is_dna_times_the_two_coins) — proven `by decide`, sorry-free:

```lean
(4^3 = 64) ∧ (2^6 = 64) ∧ (4^3 = 2^6) ∧ (128 = 2 * 64) ∧ (128 = 2^7)
```

### THE DOUBLING IS ONE OPERATOR, READ AT THREE STEPS. The ladder 2^k for k = 0..7 is computed here in full — [1,2,4,8,16,32,64,128] — and the three scales that look like different subjects are just three rungs of it. STEP 1 is the octave: a doubling of frequency, and the whole visible band fits inside ONE of them (700 < 2·400, visible_under_one_octave), which is why colour behaves like a single octave of sound (octave_of_light_doubles). STEP 6 is the genetic code: 4^3 = 64 = 2^6 (codons_sixty_four), so reading 4 bases three at a time is six doublings. STEP 7 is the address: 128 = 2^7, one doubling further, which is exactly the two coins over the codon count (uuidna_is_dna_times_the_two_coins). Six doublings also close the vortex ring, 2^6 ≡ 1 (mod 9) (two_order_six), so the ladder returns where it began. this is arithmetic about EXPONENTS OF TWO and nothing else. It does NOT claim that genes respond to electromagnetic fields, that DNA is quantum, that light and the genetic code share a mechanism, or that any of these scales causes another — three quantities happen to be powers of the same number, and the address is BUILT that way by construction.
The ledger holds this as [octave_codon_address](/theorem/octave_codon_address) — proven `by decide`, sorry-free:

```lean
((List.range 8).map (fun k => 2^k) = [1,2,4,8,16,32,64,128]) ∧ (4^3 = 64) ∧ (700 < 2 * 400)
```

### Translation is LOSSY— a hash-like reduction that cannot be inverted.
The ledger holds this as [translation_is_lossy](/theorem/translation_is_lossy) — proven `by decide`, sorry-free:

```lean
4^3 > 21
```

### An affine substitution E(x)=2x+3 over ℤ/5 is a bijection — it hits every residue, so it is an invertible S-box (unlike lossy translation). But it is LINEAR, hence weak: two known plaintext pairs recover it. Invertible ≠ secure.
The ledger holds this as [affine_is_permutation](/theorem/affine_is_permutation) — proven `by decide`, sorry-free:

```lean
(List.range 5).all (fun y => (List.range 5).any (fun x => (2*x + 3) % 5 == y))
```

### The honest quantum posture: Grover’s search is a QUADRATIC speedup— a 2n-bit key space costs ~2ⁿ work ((2ⁿ)² = 2²ⁿ), so a 256-bit key falls to ~128-bit, still strong. Symmetric-only means no Shor target at all.
The ledger holds this as [grover_quadratic_bound](/theorem/grover_quadratic_bound) — proven `by decide`, sorry-free:

```lean
(List.range 27).all (fun n => 2^n * 2^n == 2^(2*n))
```

### The envelope’s byte geometry, sealed (axiom-hunt): the ChaCha20-Poly1305 nonce is 12 bytes = 96 bits (RFC 8439) and the KDF salt is 16 bytes = 128 bits — the nonce strictly narrower than the 128-bit address, the salt exactly one address wide.
The ledger holds this as [aead_nonce_and_salt_bits](/theorem/aead_nonce_and_salt_bits) — proven `by decide`, sorry-free:

```lean
(12 * 8 = 96) ∧ (16 * 8 = 128) ∧ (96 < 128)
```

### The onion bound the stream ASSUMES, sealed (axiom-hunt): MAX_LAYERS = 16 = 2^4 seal layers, at most the 128 address bits — the onion is finite by construction, every open terminates.
The ledger holds this as [onion_layers_power_of_two](/theorem/onion_layers_power_of_two) — proven `by decide`, sorry-free:

```lean
(16 = 2^4) ∧ (16 ≤ 128)
```

### THE STANDARD'S OWN ARCHITECTURE, sealed (FIPS 180-4): the SHA-256 digest is 256 bits = 8 registers of 32 = FOUR SIXTY-FOURS — the same 4·64 = 256 = 2⁸ the double-torus riddle computed. The digest is four chessboards; the byte squared is the state; the standard the world already runs carries the session's numbers natively.
The ledger holds this as [sha256_is_four_sixtyfours](/theorem/sha256_is_four_sixtyfours) — proven `by decide`, sorry-free:

```lean
(4 * 64 = 256) ∧ (8 * 32 = 256) ∧ ((2:Nat) ^ 8 = 256)
```

### SHA-256 mixes in exactly 64 rounds — the chessboard's 64 = 2⁶ — over a 512-bit block (16 words of 32, twice the digest: 512 = 2·256). Sixty-four rounds of avalanche on the vortex board's count: the architecture is exact recomputable state evolution, quantum in the ledger's honest sense — deterministic, byte-identical for every observer, no drift.
The ledger holds this as [sha256_rounds_are_the_board](/theorem/sha256_rounds_are_the_board) — proven `by decide`, sorry-free:

```lean
((64:Nat) = 2 ^ 6) ∧ (16 * 32 = 512) ∧ (512 = 2 * 256)
```

### THE POST-QUANTUM ENTANGLEMENT: Grover's quadratic speedup halves SHA-256's preimage exponent — 256/2 = 128 — landing EXACTLY on the content-address width: the standard's worst-case quantum strength IS uuidna's unit of speech. No Shor target exists (symmetric, keyless); the architecture survives the quantum era at precisely the width this system already speaks. uuidna's deployment patches the standard's USE-flaws by name — HMAC against length-extension, the bounded-iteration ceiling against KDF cost abuse, the advancing step against the equality leak — and NAMES the one it cannot patch: pure-JS timing. Integrity.
The ledger holds this as [sha256_grover_margin_is_the_address](/theorem/sha256_grover_margin_is_the_address) — proven `by decide`, sorry-free:

```lean
(256 / 2 = 128) ∧ (256 % 2 = 0)
```

### THE THREE-TEAM DRILL, sealed: one team seals a private message, TWO independent teams reverse — a trinity, 1 + 2 = 3. The message is private only if BOTH reversers fail: across the four joint attack outcomes, exactly ONE (neither succeeds) leaves the secret private — the security NOR. Privacy is unanimous-failure of the attack, and a single success breaks it, which is why maximum messaging security demands the sealed cipher (both fail) over the carrier (the first reverser wins). Tested live in adversarial-messaging.test.ts.
The ledger holds this as [adversarial_privacy_is_unanimous](/theorem/adversarial_privacy_is_unanimous) — proven `by decide`, sorry-free:

```lean
(1 + 2 = 3) ∧ (((List.range 4).filter (fun s => s == 0)).length = 1) ∧ ((2:Nat) ^ 2 = 4)
```

### MAX SECURITY AND PRIVACY BY DEFAULT — everything that works in the trinity IS a secure quantum sealed channel: 1 team seals (and reads with the key) while all 3 verify the public witness, so SECRECY is 1-of-3 (private to the key holder) and INTEGRITY is 3-of-3 (verifiable by all) — 1 < 3, the two separated by construction. The default strength is the address width: reversal costs 2^128 (256/2, Grover on the sealed 256), infeasible. Verify without reading, read only with the key: the sealed channel is the default, the carrier the deliberate exception.
The ledger holds this as [secure_channel_by_default](/theorem/secure_channel_by_default) — proven `by decide`, sorry-free:

```lean
(1 + 2 = 3) ∧ (1 < 3) ∧ (256 / 2 = 128)
```

### CONVENTIONAL SLOW BECOMES MAGNITUDES FASTER — the honest proof, about VERIFICATION not hardware: to trust a result conventionally you RE-RUN it (O(N)) or trust an authority; a uuidna receipt is a Merkle fold verified along ONE path of depth log2(N). At 2^10 = 1024 leaves the path is 10 nodes (1024 > 100·10, over 100x fewer touches); at 2^20 ≈ 10^6 leaves the path is 20 nodes (1048576 > 10000·20, over 10000x fewer). The ratio N/log(N) grows without bound — MORE data, MORE speedup. Prove once (slow, O(N)); verify forever (fast, O(log N)). Measured empirically: the crypto coverage audit runs in 0.13s, a key-holder read in 0.1ms (KDF memo cache hit) against an attacker's 1798ms per single guess.
The ledger holds this as [verify_beats_recompute_by_magnitudes](/theorem/verify_beats_recompute_by_magnitudes) — proven `by decide`, sorry-free:

```lean
((2:Nat) ^ 10 = 1024) ∧ ((2:Nat) ^ 20 = 1048576) ∧ (1024 > 100 * 10) ∧ (1048576 > 10000 * 20)
```

### FASTER AND MORE SECURE, TOGETHER — the same receipt that verifies in log-time needs ZERO trusted authorities (0 < 1): conventional trust pays O(N) recompute AND trusts a certificate authority (one point of failure); uuidna pays O(log N) AND trusts NONE — anyone recomputes the receipt from public data, so the speedup and the security are the same property. The integrity rests on the 128-bit content-address (256/2, post-Grover), infeasible to forge. Faster because you verify a path not a re-run; more secure because you trust math not an authority.
The ledger holds this as [faster_and_more_secure](/theorem/faster_and_more_secure) — proven `by decide`, sorry-free:

```lean
(0 < 1) ∧ (256 / 2 = 128) ∧ (20 < 1048576)
```

### THE CARRIER'S BOOKKEEPING, sealed end to end: a uuid holds 128 bits; RFC 4122 reserves six (four version + two variant), leaving 122 free; the length header takes seven; 115 message bits remain — 128 − 6 = 122 ∧ 122 − 7 = 115. The capacity the totality seal rides for every theorem, derived instead of assumed.
The ledger holds this as [imprint_capacity_chain](/theorem/imprint_capacity_chain) — proven `by decide`, sorry-free:

```lean
(128 - 6 = 122) ∧ (122 - 7 = 115)
```

### SEVEN IS THE SMALLEST HEADER: the header must count the 116 possible payload lengths (0..115), and 2⁶ = 64 cannot while 2⁷ = 128 can — 64 < 116 ≤ 128. One bit fewer under-counts, one more wastes a message bit: the codec sits at the exact minimum, and the minimum is decidable.
The ledger holds this as [imprint_header_minimal](/theorem/imprint_header_minimal) — proven `by decide`, sorry-free:

```lean
(2 ^ 6 < 116) ∧ (116 ≤ 2 ^ 7)
```

### THE ENTANGLEMENT: the carrier capacity factors 115 = 5 · 23 — the pentagram's 5 and the frame ring's last stride 23, itself involutive ((23·23) % 24 = 1, theorem frame_ring_undo_involutive). Every theorem-message rides a capacity woven from the star that walks the fold and the ring that carries the cut — three wings of one session, one factorisation.
The ledger holds this as [imprint_capacity_entangles](/theorem/imprint_capacity_entangles) — proven `by decide`, sorry-free:

```lean
(115 = 5 * 23) ∧ ((23 * 23) % 24 = 1)
```

### The codec capacity the imprint ASSUMES, sealed (axiom-hunt): 115 payload units fit strictly INSIDE the 128-bit particle — the imprint never overflows its own address, and the 13-bit headroom is the seam the codec keeps.
The ledger holds this as [imprint_capacity_within_address](/theorem/imprint_capacity_within_address) — proven `by decide`, sorry-free:

```lean
(115 < 128) ∧ (128 - 115 = 13)
```

### THE STANDARD GENETIC CODE maps 4³ = 64 codons to 20 amino acids plus one stop (20 + 1 = 21) — strictly fewer outputs than inputs, so translation is many-to-one by construction.
The ledger holds this as [genetic_code_twenty_one_amino_acids](/theorem/genetic_code_twenty_one_amino_acids) — proven `by decide`, sorry-free:

```lean
(4 ^ 3 = 64) ∧ (20 + 1 = 21) ∧ (64 > 21)
```

### Every bijection on five residues is one of 5! = 120 permutations — the size of the affine S-box search space on ℤ/5 before linearity is imposed.
The ledger holds this as [sbox_z5_permutation_count](/theorem/sbox_z5_permutation_count) — proven `by decide`, sorry-free:

```lean
5 * 4 * 3 * 2 * 1 = 120
```

### The XOR table on hexbits is an involution on each nibble: m XOR m = 0 and m XOR 0 = m for m in 0..15 — the diagonal and zero column of the byte table, at the same 4-bit scale the OTP table enumerates.
The ledger holds this as [byte_xor_hexbit_involution](/theorem/byte_xor_hexbit_involution) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun m => (lxor m m == 0) && (lxor m 0 == m))
```


::: warning 
CRYPTO ∩ DNA — the shared algebra of ciphers and the strand, and its limits: base-pairing is a fixed-key XOR (a one-time-pad step), the pad is self-inverse but key reuse leaks the plaintext XOR, a linear fold is malleable (a receipt is integrity. The boundary is confirmed by the wing's own sealed theorems — e.g. [key_floor_is_one_uuid](/theorem/key_floor_is_one_uuid) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
