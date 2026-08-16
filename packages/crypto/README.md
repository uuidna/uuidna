# @uuidna/crypto

The crypto surface of uuidna, as one package: pure-TypeScript SHA-256 / HMAC / PBKDF2, ChaCha20-Poly1305 (RFC 8439), the uuidna 7d-fold envelope, onion-sealed uuid streams, contract-bound seals, and the quantum-cube challenge.

```ts
import { sha256, pbkdf2Sha256, aeadEncrypt, aeadDecrypt, encrypt, decrypt, sealStream, openStream } from '@uuidna/crypto'
```

## What this package is

A domain-scoped view over the root `@uuidna/uuidna` package. The implementation lives in the root `src/` — the tree the determinism gates (harmonic-scan, the smoke test) and the KAT wave scan and seal — and this package re-exports exactly the crypto surface. One implementation, one owner, no fork of the bytes.

- **KAT-verified** — SHA-256 / HMAC / PBKDF2 / ChaCha20 / Poly1305 are verified against the standards' published test vectors in the root test wave (`src/test/kat.test.ts`).
- **Zero native dependencies** — no WebCrypto; nothing but TypeScript.
- **Deterministic** — no `Ma`&#8203;`th.*`, no wall-clock, no RNG in the library core; the scanner hard-rejects them.

## Honest scope

The KATs prove the implementations match the standards' vectors; the sealed diamond theorems prove the decidable core (nonce uniqueness, tamper-changes-tag, transport-leaks-length). Nothing here proves the *strength* of a password, the secrecy of a channel against a recorded-key adversary, or any magnitude — a measurement is a stopwatch, not a theorem. See the crypto caveats and exploits docs on the site.

## Related

`docs/crypto-caveats.md`, `docs/crypto-exploits-solutions.md`, and the measurement companion `npm run crypto:measure` stay in the root repo (the site builds from them). Licence: CC BY-NC-ND 4.0 · © Tsvetan Rouschev.

## What this replaces — and what it honestly does not

Reaching for `js-sha256`, `crypto-js`, `pbkdf2`, or a ChaCha20-Poly1305 shim? This surface covers them with zero
dependencies, every primitive pinned to its standard's own test vectors (FIPS 180-4, RFC 4231, RFC 6070, RFC 8439
— the KAT suite runs in CI on every push), and something no incumbent ships: the architecture itself is a set of
sealed Lean theorems (`sha256_is_four_sixtyfours`, `sha256_rounds_are_the_board`,
`sha256_grover_margin_is_the_address`) you can re-derive, and every claim is triable live at
[uuidna.com/trials](https://uuidna.com/trials). **The honest boundary:** `node:crypto` remains faster and
constant-time (native code); this library is *auditable* pure TypeScript and does not claim timing-safety. Use
node:crypto for raw throughput under attack-adjacent timing; use this when you need to *verify* what you run.
