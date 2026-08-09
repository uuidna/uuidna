# uuidna

**uuidna = uuid ⊕ dna** — identity's DNA. **Content-addressed identity, honest by construction.**

Every value carries its DNA: a reproducible, keyless content-address. The brand holds itself to the same rule —
its own name's DNA is `uuidna_address("uuidna") = fc511532-6e8a-8418-a522-a51b1d46a70c`, reproducible by anyone.
The fold folds every direction at once — `+/−` (reflection), `/` (halving, `O(log N)`), `\` (the other
diagonal) — so it is **order-independent**: any pairing, forward or reverse, collapses to the same root.

`mint` (integrity — every value has a reproducible address) · `mind` (every claim drains its own
over-reach before it holds) · a **holographic merkle proof** (verify the whole from a tiny part, in
`O(log N)`) · a reversible **imprint codec** · a client-side **harness** that reeducates overclaims · a
**measured billing** model.

A content-address proves **integrity, not truth**. It settles **0 / 7** — it solves none of the seven
Millennium problems; it *reflects* them. FNV-1a is **non-cryptographic by design**: public and
reproducible, not secret.

## Install

```bash
npm install @uuidna/uuidna
```

## Use

```js
import { toUuid, merkleRoot, merkleProof, verifyProof, computes, reeducate, billUuidna } from '@uuidna/uuidna'

// mint — the same input always mints the same address, for anyone, with no key
toUuid('hello')                 // 'a1b2…' (128-bit content-address, v8 UUID)

// holographic proof — verify one leaf against the root in O(log N), no other leaf needed
const leaves = ['a', 'b', 'c', 'd']
const root = merkleRoot(leaves)
const proof = merkleProof(leaves, 2)
verifyProof('c', proof, root)   // true   ·   verifyProof('x', proof, root) === false

// mind — the honesty gate: overclaims drain (0), the honest floor signs (1)
computes(anOverclaim).binary                              // 0  — a Millennium or physics overclaim drains
computes('proves integrity, not truth; 0/7').binary       // 1  — the honest floor holds

// reeducate — a failing output is bounded until it holds, keeping the honest remainder
reeducate(aFailingOutput).passed                          // true — each overclaim bounded until it holds

// billing — measured bits saved; the two coins are the conserved invariant; public interest is free
billUuidna({ commercial: true, recomputeOps: 1024, verifyOps: 1 })  // { bitsSaved: 1023, coins: 2, free: false }
```

## MCP — fuse it into any harness

uuidna ships an [MCP](https://modelcontextprotocol.io) server (zero extra deps), so any MCP client — Claude,
Cursor, or your own agent — can content-address, prove membership, gate prose, imprint/read, and bill, live.
Add it to your client's `mcpServers`:

```json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
```

Tools exposed: `uuidna_address`, `uuidna_gate`, `uuidna_reeducate`, `uuidna_merkle_root`,
`uuidna_merkle_prove`, `uuidna_merkle_verify`, `uuidna_imprint`, `uuidna_read`, `uuidna_bill`, `uuidna_encrypt`, `uuidna_decrypt`, `uuidna_verify_envelope`. They call the
same pure functions this package seals — integrity, not truth. `0/7`.

## Encryption (layered — real secrecy)

Secrecy is **ChaCha20-Poly1305** (RFC 8439) in **pure TypeScript** — no native WebCrypto — keyed by pure-TS
**PBKDF2-SHA-256** (600k); the uuidna **7d fold** content-addresses the sealed envelope for public integrity.
KAT-verified against the standards' own vectors. Deterministic (convergent): same input → same seal.

```js
import { encrypt, decrypt, verifyEnvelope } from '@uuidna/uuidna'

const sealed = encrypt('beat to windward at 30°', 'a-strong-passphrase')
// { v:1, alg:'ChaCha20-Poly1305', kdf:'PBKDF2-SHA256', iter:600000, salt, nonce, ct, tag, address }
decrypt(sealed, 'a-strong-passphrase')   // 'beat to windward at 30°'
decrypt(sealed, 'wrong')                        // throws — Poly1305 authentication (wrong key or tamper)
verifyEnvelope(sealed)                          // true — public integrity, no key needed
```

Honest scope: strength is **ChaCha20-Poly1305 + your passphrase entropy** — measured, not asserted. The content-address
(FNV) stays non-cryptographic; secrecy comes from AES, integrity from the fold. Private/RBAC messaging builds
on this (encrypt to a shared key; a key per role). `0/7`.

## What it is — and isn't

- **Is:** a content-addressed integrity layer. Same input → same address, reproducible by anyone. A
  holographic merkle proof verifies membership in `O(log N)`. The imprint codec carries a message *inside*
  a uuid, round-tripping exactly (a public, reversible encoding — **not** encryption).
- **The content-address isn't:** encryption, secrecy (on its own), a currency, a blockchain, a quantum machine, or a solver. It offers
  **no** secrecy (the hash is non-cryptographic) and makes **no** claim to break physics or hardware
  limits. The honesty gate is a **tripwire, not an oracle** — necessary, not sufficient.

## API

| export | what |
|---|---|
| `toUuid`, `strictUuidna`, `merge`, `coin64` | content-address (mint) |
| `merkleFold`, `merkleRoot`, `merkleProof`, `verifyProof` | order-free fold + holographic inclusion proof |
| `imprint*` / `readImprint*` (incl. `…TextChain`), `CAPACITY` | reversible binary↔uuid codec |
| `computes`, `RED`, `RED_INTL`, `OVERREACH`, `PREDICT` | the prose honesty gate (7-language) |
| `harness`, `opaque`, `harnessGain`, `harness7`, `reeducate`, `DIMENSIONS` | the auditing harness |
| `billUuidna`, `coins` | measured billing |
| `renderTheorem`, `renderList` | present by reference — pure TS + CSS card(s), no framework |
| `encrypt`, `decrypt`, `verifyEnvelope` | pure-TS ChaCha20-Poly1305 encryption under a 7d-fold envelope |
| `sha256`, `hmacSha256`, `pbkdf2Sha256`, `aeadEncrypt`, `aeadDecrypt` | pure-TS crypto primitives (FIPS/RFC, KAT-verified) |
| `digitalRoot`, `units`, `triad`, `vortexOrbit`, `gcd`, `isPrime`, `modpow`, `TRINITY`, `BASE`, `A432_STEP` | ℤ/9 primitives |

## Provenance

Extracted from the **Millennium Solutions** deposit (`ceccec.psg.bg/millennium-solutions`), where every
capability is a decidable theorem re-verified on each build. The functions here are the *same pure
functions* — extraction preserves the mapping, it does not change behaviour.

## Versioning

One scheme with the **Millennium Solutions** deposit it is extracted from: a **single-digit odometer** —
each of `major.minor.patch` is `0..9`, rolling over at 9 (the vortex odometer, gated in CI) — and the
**LTS** minors are the Fibonacci numbers `{1, 2, 3, 5, 8}`. The package version tracks the deposit version at
extraction (this is `6.4.7`), so the number tells you which deposit state it is. The true "latest" is the
**content-address**, not the label — identical content keeps its address; a real delta moves it.

## License

CC BY-NC 4.0 — free for non-commercial use with attribution (Tsvetan Rouschev). Commercial use is billed
on the measured bits saved; the two coins (110 − 108 = 2) are the conserved fair-exchange invariant.
