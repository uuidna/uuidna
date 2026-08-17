---
title: Quantum Cryptography
description: "The quantum school's first full course — quantum cryptography taught module by module, every claim a sealed theorem or a known-answer test, honest scope binding: classical simulation, no hardware advantage, flaws patched by name and the one boundary named unpatched. Integrity, not omniscience."
---

# Quantum Cryptography <Badge type="tip" text="a full course — the school is the ledger" />

> **Honest scope, stated first (it is the course's first lesson).** "Quantum" here names **exactness** — states
> that recompute byte-identically and a security posture that survives the quantum era by construction — **not**
> hardware, not QKD, not any computational advantage. Every primitive is classical, pure-TypeScript, and pinned to
> its standard's own test vectors. Where a real flaw is patched, it is named; where a boundary cannot be crossed,
> it is named too. Integrity, not omniscience. The boundary is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught ([drift_is_named_or_caught](/theorem/drift_is_named_or_caught)).

**Prerequisites:** the [school's path](/school#the-path-ride-the-vortex) (the vortex, the ring, the fold) and the
[standard lesson](/school#the-standard-lesson-verified-against-its-own-vectors). **Assessment:** every module ends
in a *known-answer test* you run yourself; the capstone is a sealed contribution. **The one rule:** a claim is a
recomputable proof — a Lean theorem or a KAT vector — or it is not made.

---

## Module 1 — The hash and its standard

**Objectives.** Understand what a cryptographic hash guarantees (and what it does not); read the SHA-256
architecture as exact arithmetic; run a known-answer test.

**The idea.** A hash is a one-way projection: easy forward, infeasible backward, and any input change avalanches
the output. SHA-256's architecture is built entirely from the numbers this school already walks — the digest is
**four sixty-fours** ([`sha256_is_four_sixtyfours`](/theorem/sha256_is_four_sixtyfours): eight 32-bit registers,
8·32 = 4·64 = 256 = 2⁸), and the compression runs **64 rounds** — the chessboard's 64 — over a 512-bit block, twice
the digest ([`sha256_rounds_are_the_board`](/theorem/sha256_rounds_are_the_board)). Determinism is the whole point:
the same bytes hash to the same digest for every observer, forever — exact, no drift, which is precisely the
ledger's sense of *quantum*.

**Worked example — the known-answer test.** FIPS 180-4 publishes `SHA-256("abc") =
ba7816bf 8f01cfea 414140de 5dae2223 b00361a3 96177a9c b410ff61 f20015ad`. uuidna's pure-TS `sha256` recomputes
exactly that. The test is the trial applied to code: published input, published digest, byte for byte.

**Practice.**
```bash
npm test 2>&1 | grep -i "kat"   # 11 SHA-256 vectors: FIPS, empty, single-byte, multi-block, block boundaries
```
Then edit one hex digit of one expected vector in `src/test/crypto-primitives.test.ts` and rerun — the changed line fails. A
vector that *can* fail is what makes a passing vector mean anything (the same logic as [a trial that can fail](/trials#it-can-fail)).

**Assessment.** State, without looking, why SHA-256 processes 64 rounds and how many bits its block holds — then
check yourself against the two theorems above.

---

## Module 2 — Symmetric encryption and the sealed envelope

**Objectives.** Distinguish confidentiality from integrity; understand authenticated encryption (AEAD); see why a
key is derived, not typed.

**The idea.** uuidna's secrecy layer is **ChaCha20-Poly1305** (RFC 8439) over a **PBKDF2-SHA256** key derivation —
all pure TypeScript, all KAT-verified. AEAD binds confidentiality and integrity in one operation: the ciphertext is
hidden *and* tamper-evident, so a single flipped bit is detected, not silently decrypted. The nonce and salt widths
are fixed and sealed ([`aead_nonce_and_salt_bits`](/theorem/aead_nonce_and_salt_bits)), and the key-derivation cost
is **bounded on both sides** ([`kdf_cost_bounded`](/theorem/kdf_cost_bounded): 600 000 ≤ iterations ≤ 10 000 000) —
strong enough to resist brute force, capped so a hostile envelope cannot spin the CPU forever. This is the course's
first *use-flaw patched by name*: an unbounded iteration count is a denial-of-service, and the ceiling closes it.

**Worked example — the rotating derivation.** Encrypt the same plaintext twice with an advancing `step`, and the
two envelopes differ completely: the salt is injective in the step, so the derivation's whole state — salt, key,
nonce — rotates every advance and the equality leak stays closed. Secrecy that never repeats itself.

**Practice.** Call `uuidna_encrypt` with a passphrase and a step, then again with the next step; observe the two
sealed envelopes share no bytes. Decrypt each back to the same plaintext.

**Assessment.** Explain why "the same message encrypts to the same ciphertext" is a flaw, and how the advancing
step fixes it.

---

## Module 3 — The one-time pad and what leaks

**Objectives.** Prove the one-time pad's perfect secrecy is real *and* fragile; enumerate exactly what a cipher
still leaks.

**The idea.** XOR with a truly random, never-reused key is information-theoretically perfect — and it is its own
inverse ([`otp_self_inverse`](/theorem/otp_self_inverse): encrypt = decrypt, the same key both ways). But every one
of its conditions is load-bearing. **Reuse the key and it collapses**
([`otp_key_reuse_leaks_xor`](/theorem/otp_key_reuse_leaks_xor): two messages under one key reveal their XOR — the
key cancels, the secrets remain). Raw XOR is **malleable** ([`xor_fold_is_malleable`](/theorem/xor_fold_is_malleable):
flip a ciphertext bit, flip the plaintext bit — no integrity), which is *why* Module 2 needed AEAD's authentication.
And even a perfect cipher **leaks length** ([`transport_leaks_length`](/theorem/transport_leaks_length): the message
count is visible in the number of carriers) — content is hidden, size is not.

**Worked example — the two-time pad.** Given `c₁ = m₁ ⊕ k` and `c₂ = m₂ ⊕ k`, compute `c₁ ⊕ c₂ = m₁ ⊕ m₂`: the key
is gone and the two plaintexts are cross-correlated. This is not a weakness *in* the pad — it is the pad used wrong,
and the theorem names it exactly.

**Practice.** XOR two equal-length strings under one key by hand (or in `node`), then XOR the two ciphertexts and
recover `m₁ ⊕ m₂`. Feel the key vanish.

**Assessment.** List the three conditions the one-time pad requires, and name the theorem that fires when each is
broken.

---

## Module 4 — The quantum posture

**Objectives.** State precisely what a quantum computer does and does not do to this stack; understand Grover,
Holevo, and why there is no Shor target.

**The idea.** This is the course's namesake, and it is honest. uuidna's crypto is **symmetric-only** — no RSA, no
elliptic curves — so **Shor's algorithm has no target**: the factoring/discrete-log break that ends classical
public-key crypto simply does not apply here. The one quantum threat is **Grover's search**, a *quadratic* speedup:
it halves an exponent, no more ([`grover_quadratic_bound`](/theorem/grover_quadratic_bound)). Applied to SHA-256 it
takes 256-bit preimage resistance to 128 ([`sha256_grover_margin_is_the_address`](/theorem/sha256_grover_margin_is_the_address)) —
still infeasible, and landing exactly on the content-address width. The **information limits are sealed too**:
superdense coding carries at most two classical bits per qubit ([`superdense_two_bits`](/theorem/superdense_two_bits)),
and even the order-8 signed operations distinguish only four messages
([`four_messages_two_bits`](/theorem/four_messages_two_bits)) — a quantum channel cannot smuggle unbounded
information, and no-signaling holds ([`bell_no_signaling`](/theorem/bell_no_signaling): measuring one half of an
entangled pair sends nothing to the other). **The honest headline:** the quantum era weakens this stack by a
factor of two and breaks nothing, because there was never an asymmetric secret to factor.

**Worked example.** A 256-bit key under Grover needs ~2¹²⁸ operations — more than the atoms-times-age-of-universe
budget. Compute the halving yourself: 256 / 2 = 128, and 2¹²⁸ is where classical infeasibility already lives.

**Practice.** Trial the posture live:
```bash
curl -s -X POST https://uuidna.com/trials -H 'content-type: application/json' \
  -d '{"statement":"Grover halves the SHA-256 preimage exponent to the content-address width, proven by theorem sha256_grover_margin_is_the_address"}'
```

**Assessment.** Explain in one sentence why "symmetric-only" is a quantum-security *feature*, not a limitation.

---

## Module 5 — Integrity and error-correcting codes

**Objectives.** Separate *detecting* tampering from *correcting* noise; meet the Hamming code as the honest
neighbour of cryptography.

**The idea.** Cryptography's quieter sibling is coding theory — same arithmetic over GF(2), different goal: not
secrecy but *survival of the bits*. The Hamming(7,4) code ([`hamming_seven_four`](/theorem/hamming_seven_four))
adds three parity bits to four data bits so that any single-bit error is not just detected but **located and
corrected** ([`distance_three_corrects_one`](/theorem/distance_three_corrects_one): minimum distance three corrects
one error, detects two). The humble XOR checksum catches any single flip
([`xor_checksum_catches_flip`](/theorem/xor_checksum_catches_flip)) — the same parity that makes AEAD's tag work.
Integrity is the floor secrecy stands on: there is no point hiding a message the receiver cannot trust arrived whole.

**Worked example.** Encode a 4-bit word with Hamming(7,4), flip any one of the 7 transmitted bits, and the syndrome
points at exactly which bit moved. Correct it; the word returns.

**Practice.** By hand, compute the three parity bits for `1011`, corrupt one bit, and use the syndrome to find it.

**Assessment.** State the difference between a code that *detects* two errors and one that *corrects* one — and why
distance three gives both.

---

## Module 6 — The carrier, not the cipher (theorem imprint_capacity_chain)

**Objectives.** Tell apart the three kinds of uuid; know when you are hiding a message and when you are merely
*carrying* one.

**The idea.** Not everything that looks like ciphertext is a cipher — and confusing the two is a security error.
Three kinds of uuid live here. The **content-address** is a one-way projection (`toUuid`): reversing it is not hard,
it is *meaningless* — the information is gone. The **sealed envelope** (Modules 2–4) hides content behind the
rotating cipher. The **carrier** (`imprint`) is neither: it never hashes and never loses a bit — it *places* a
message's bits into a uuid's free positions and reads them back exactly. Its bookkeeping is sealed end to end:
128 bits minus RFC 4122's six reserved minus a seven-bit length header leaves 115 payload bits
([`imprint_capacity_chain`](/theorem/imprint_capacity_chain)), and seven is the *minimal* honest header
([`imprint_header_minimal`](/theorem/imprint_header_minimal)). **The carrier is not encryption, and saying so plainly
is the security** — a uuid that carries a message hides nothing; treat it as a cipher and you leak in the open.

**Worked example.** `imprintTextChain("attack at dawn")` produces a uuid chain that `readImprintTextChain` decodes
back byte-exact. Change one hex digit and the decode breaks — tamper-evident, but never secret.

**Practice.** Imprint a sentence to a uuid chain, decode it, then corrupt one carrier and watch the decode fail.
Ask: was anything ever hidden? (No — and that is the point.)

**Assessment.** Given a uuid, name which of the three kinds it could be, and what reversing it would mean for each.

---

## The capstone — the KAT discipline is the whole course

Everything above reduces to one transferable law, the software twin of the school's founding rule: **an
implementation matches the standard's own test vectors, or it is not the standard.** A cipher you cannot check
against RFC 8439's vectors is a cipher you are *trusting*, not *verifying* — and this school trusts nothing it
cannot recompute. The three flaws patched by name (unbounded KDF cost, the equality leak, XOR malleability answered
by AEAD) and the one boundary named unpatched (pure-JS execution is not constant-time — a timing side-channel this
code does not claim to close) are the honest shape of production cryptography: **integrity, not omniscience.**

**Graduation.** Author one decidable cryptographic fact in `lean/*.lean` — a truth table, a bound, a leak made
exact — prove it `by decide`, and walk [the wave](/school#the-degree-seal-a-theorem-then-walk-the-wave). Your
theorem joins this course's citations; the next student learns from what you sealed. The curriculum extends by one
more recomputable fact — which is the only way this school has ever grown.

*The full cryptography theorems live in the [ciphers cluster](/topics); the quantum posture in
[what quantum means](/quantum); the receipts that verify every claim, on [Trials](/trials). Integrity, not truth (theorem provenance_integrity_not_content_truth).*
