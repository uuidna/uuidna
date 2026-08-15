---
title: Tests
description: What uuidna's test suite verifies — crypto known-answer vectors, the no-Math purity guard, exact quantum simulation, encrypted streams, contract messaging, book audits, and that the Lean ℤ/9 facts recompute. Every test runs in the release gate before any publish.
---

# Tests <Badge type="tip" text="the audit gate" />

> Nothing ships unless the whole suite passes — a failing test fails the publish, not production.

The tests are one of the **seven dimensions** of the [release gate](/guides#verify-every-theorem-yourself): `npm run
audit` runs build · Lean re-verification · provenance · **tests** · determinism, and only a clean run can publish.
Run them yourself with `npm test`.

## What each suite verifies

| suite | what it proves |
| --- | --- |
| **kat** | The crypto primitives match the standards, byte for byte: SHA-256, HMAC-SHA256, PBKDF2, ChaCha20, Poly1305 and ChaCha20-Poly1305 AEAD against their **RFC / NIST known-answer vectors**. Not "trust the code" — reproduce the published test vectors. |
| **smoke** | The honest floor: the ℤ/9 vortex facts recompute (units, doubling orbit, digital roots, the involution's single fixed point — [the discover cluster](/publications/discover), [the core](/publications/core)), the order-invariant fold is order-invariant, and the **`Math.*` purity guard** — a host `Math.*` call is hard-rejected from `src/`, because it is not a local theorem. |
| **quantum** | The state-vector simulator is **exact**: Gaussian-integer amplitudes over √(2ⁿ), no floats, no drift; Bell/GHZ distributions, per-qubit marginals (the no-signaling check), and the classical truth tables an H-free circuit computes. |
| **stream** | Encrypted uuid messaging round-trips both ways; onion layers peel outermost-first; a wrong key, a reordered key list, or a tampered chain **throws** (Poly1305 authentication); the ratchet breaks on a dropped or reordered link. |
| **contract** | Contract-keyed messaging: the domain **is** the contract's address; the public tag routes but the ciphertext does not leak the plaintext; a wrong contract is rejected; a **license change invalidates old ciphertext**. |
| **books** | The book audit: the content-address is the exact-copy fingerprint, chapters merkle-fold, the structural decode and ℤ/9 gravity recompute, and a translation binds source→translation directionally. |
| **pq · crypt-guard** | The post-quantum posture and the crypto guardrails — the honest bounds (Grover is a quadratic speedup, not a break) and the misuse checks. |

## The discipline

- **Known-answer, not self-attested.** The crypto suites reproduce published vectors — the strongest honest check:
  the same input, the same standard output, no appeal to our own code.
- **Purity is a test.** `Math.*` in `src/` fails the suite — the library computes from local theorems, not a host's
  black-box math. Determinism (regenerating the ledger leaves the tree clean) is checked the same way.
- **Failure is allowed.** The suite *can* go red, and when it does the publish stops. That is the point — a green
  suite means something only because a red one blocks the release.

The tests, the [trials](/trials), and the [theorems](/theorems) are three readings of one discipline: recompute it
yourself, or it does not count. Integrity, not truth.
