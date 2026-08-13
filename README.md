# uuidna

**uuidna = uuid ⊕ dna** — identity's DNA. **Content-addressed identity, honest by construction.**

> A human quantum analog — **simulated on 64-bit hardware** in precise theorem sets, **tuned to 432 Hz** (`k432`: 432 = 2⁴·3³), honest by construction. Public and **free for the public interest** (CC BY-NC-ND 4.0), usable in code and at the public [uuidna.com](https://uuidna.com).

Every value carries its DNA: a reproducible, keyless content-address. The brand holds itself to the same rule —
its own name's DNA is `uuidna_address("uuidna") = fc511532-6e8a-8418-a522-a51b1d46a70c`, reproducible by anyone.
The fold folds every direction at once — `+/−` (reflection), `/` (halving, `O(log N)`), `\` (the other
diagonal) — so it is **order-independent**: any pairing, forward or reverse, collapses to the same root.

`mint` (integrity — every value has a reproducible address) · `mind` (a claim that cites a proof not in
the ledger drains before it holds) · a **holographic merkle proof** (verify the whole from a tiny part, in
`O(log N)`) · a reversible **imprint codec** · a client-side **harness** that reeducates overclaims · a
**measured billing** model.

A content-address proves **integrity, not truth**. It solves none of the seven
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
computes('proves integrity, not truth').binary       // 1  — the honest floor holds

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

**45 tools** exposed, the whole surface — they call the same pure functions this package seals:

- **uuid / identity** — `uuidna_address`, `uuidna_strict`, `uuidna_merge` (order-sensitive fold), `uuidna_coin64` (64-bit coin), `uuidna_imprint`, `uuidna_read`
- **dna (ℤ/9 structure)** — `uuidna_units`, `uuidna_triad`, `uuidna_vortex`, `uuidna_diamond`, `uuidna_involute`, `uuidna_gravity`, `uuidna_double_torus`, `uuidna_digital_root`, `uuidna_seats`
- **holographic proof** — `uuidna_merkle_root`, `uuidna_merkle_prove`, `uuidna_merkle_verify`
- **crypto (pure-TS, KAT-verified)** — `uuidna_sha256`, `uuidna_hmac`, `uuidna_pbkdf2`, `uuidna_chacha20`, `uuidna_poly1305`, `uuidna_aead_encrypt`, `uuidna_aead_decrypt`, `uuidna_encrypt` (with the crypt-salt `step`), `uuidna_seal_stream`, `uuidna_decrypt`, `uuidna_verify_envelope`
- **bidirectional channel** — `uuidna_send` (encrypt → imprint into a uuid stream), `uuidna_receive` (read the uuid stream → decrypt). The channel *is* uuid itself; one side per direction; an advancing `step` closes the equality leak in transit; the wrong key never opens it.
- **honesty / trial** — `uuidna_gate`, `uuidna_reeducate`, `uuidna_adjudicate`, `uuidna_prove_verdict`, `uuidna_verify`, `uuidna_harness`, `uuidna_harness7`, `uuidna_theorems`, `uuidna_theorem`, `uuidna_trial`
- **quantum** — `uuidna_quantum` (the exact classical state-vector simulator — Bell/GHZ, rational distribution, no-signaling marginals, quantum receipt; 2^n amplitudes, no quantum advantage)
- **present / bill** — `uuidna_render`, `uuidna_render_list`, `uuidna_bill`

Integrity, not truth.

## Encryption (layered — real secrecy)

Secrecy is **ChaCha20-Poly1305** (RFC 8439) in **pure TypeScript** — no native WebCrypto — keyed by pure-TS
**PBKDF2-SHA-256** (600k); the uuidna **7d fold** content-addresses the sealed envelope for public integrity.
KAT-verified against the standards' own vectors. Deterministic (convergent): same input → same seal.

```js
import { encrypt, decrypt, verifyEnvelope, sealSequence } from '@uuidna/uuidna'

const sealed = encrypt('beat to windward at 30°', 'a-strong-passphrase')
// { v:1, alg:'ChaCha20-Poly1305', kdf:'PBKDF2-SHA256', iter:600000, salt, nonce, ct, tag, address }
decrypt(sealed, 'a-strong-passphrase')   // 'beat to windward at 30°'
decrypt(sealed, 'wrong')                        // throws — Poly1305 authentication (wrong key or tamper)
verifyEnvelope(sealed)                          // true — public integrity, no key needed
```

**The crypt salt — closing the equality leak.** Pure TS has no secure entropy source, so a content-only salt is
constant in the message's position: two seals of the same plaintext are byte-identical, *revealing equality*
(and recovering the position is a division by zero — the step-fibre collapses; proven in
[`lean/Sequence.lean`](lean/Sequence.lean): `salt_conv_leaks_equality`, `salt_conv_step_is_division_by_zero`). The
fix is an **advancing sequence**: pass a monotonic `step` and the salt becomes injective in it (`salt_seq_injective`),
so the same plaintext seals differently each step — no observer can tell two envelopes hold the same plaintext.

```js
encrypt('ping', key, 0).address !== encrypt('ping', key, 1).address   // true — equality no longer leaks (v:2, seq:0/1)
sealSequence(['ping', 'ping', 'ping'], key)   // three distinct seals; each decrypts; the sequence is the stripe
```

Honest scope: strength is **ChaCha20-Poly1305 + your passphrase entropy** — measured, not asserted. The step is
public and **must advance** (it plays a nonce-counter's role). This closes the *equality* leak; it does **not**
make the content-address (FNV) collision-resistant — that stays non-cryptographic by design, a separate gap.
Private/RBAC messaging builds on this (encrypt to a shared key; a key per role)..

## Formal layer — Lean 4, organized by computing principle

**Every theorem in the ledger**, all proven `by decide` (Lean 4, no Mathlib), verified sorry-free by `npm run lean`,
and organized by **computing principle** in derivation order — the live count and per-principle totals are derived in
[`lean/PRINCIPLE.md`](lean/PRINCIPLE.md) (never hardcoded here, so this prose can't drift from the ledger):

1. **The 8×8 core** (`Core.lean`, 64) — the multiplication table of ℤ/9's non-zero residues; the generator.
2. **The ring ℤ/9** (`Ring.lean`, 234) and **the rosette ℤ/7 / Pliska** (`Rosette.lean`, 145) — the full tables.
3. **Derived, applied, discovered** (vortex algebra, reflection group, division-by-zero, blood/DNA/sound
   structure, self-discovered facts), **the quantum computer** (`Quantum.lean`, 20 — the exact classical
   state-vector simulator: Born rule, no-signaling, GHZ, gate truth-tables, phase algebra and the gate
   involutions), **the seven Clay problems reflected** (`Clay.lean`, 13 — see below), and **one leap** that
   folds the whole vortex into a single proof.

### The seven Clay problems — reflected

`Clay.lean` is **one verified monograph among the 55** — its theorems pass the *same* `by decide` seal as every
theorem in the ledger, with **no special status**. Each of the seven Clay problems is **reflected** into the ℤ/9
structure by the involution `dz(x) = 10 − x`, and each reflection is a **VERIFIED** theorem, exactly like the rest.

What is verified is the **reflection**, never the **problem** — the one distinction that matters. An involution is
its own undo — `dz(dz(x)) = x` — so the round trip returns the problem **unchanged**: it reflects all seven and
**propagates no proof**. **uuidna solves 0 of the 7** — and any solve-claim that cited a proof would *drain*, because no such proof is sealed in the ledger. (In
mathematics six stay open — Riemann, P vs NP, Navier–Stokes, Yang–Mills, Hodge, Birch–Swinnerton-Dyer — and
Poincaré is solved by **Perelman, 2003**, not by uuidna.) Faithful to the
[`millennium-solutions`](https://ceccec.psg.bg/millennium-solutions/) deposit it is extracted from: *it reflects all
seven, and solves none.*

A **theorem computes in Lean, or it is not a theorem** — the recomputation-only capabilities (FNV address,
gate, crypto) are *tools*, not theorems. **Lean is the single source:** `npm run lean` verifies every proof
sorry-free and then derives the one ledger ([`src/theorems/generated.ts`](src/theorems/generated.ts)) that the
package, the MCP tools and the site all consume — nothing is authored elsewhere. The filterable collection of
proven theorems, each with its detailed `by decide` proof, formal statement and content-address, is at
[uuidna.com/theorems](https://uuidna.com/theorems) (one show page per theorem); the whole set folds to one
receipt at [uuidna.com/trials](https://uuidna.com/trials), is indexed by capability at
[uuidna.com/topics](https://uuidna.com/topics), and onto seven ℤ/7 rays at
[uuidna.com/rosetta](https://uuidna.com/rosetta). Regenerate + re-verify: `npm run lean`.

### Adding a domain — `npm run reconcile`

Lean is the single source, but the ledger has a **derived layer** that must stay in lockstep with it:
[`src/theorems/generated.ts`](src/theorems/generated.ts), [`lean/PRINCIPLE.md`](lean/PRINCIPLE.md), `CHANGELOG.md`,
the MCP catalog `docs/mcp.md`, the decide-step costs `lean/heartbeats.json`, and `audit-citations.json`. The pre-push
readiness gate `git diff`s **all** of them, so any one left stale blocks the push. Add a domain — a
`src/scripts/lean-<x>.ts` generator (or a hand-written `.lean`) — then run one command:

```bash
npm run reconcile                          # regenerate the derived layer, sync heartbeats, commit + push
npm run reconcile -- "Add the nim domain"  # with your own commit message
```

It runs `npm run lean` (regenerate + verify every proof), rebuilds the MCP catalog, `--sync`s the heartbeats to 100%
coverage, refreshes the citation audit, and **aborts if the ledger does not reconcile** (`account.js`) *before* any
commit. Only then does it commit (skipped if nothing changed) and `git push origin HEAD` through the readiness gate.

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
| `encrypt`, `decrypt`, `verifyEnvelope`, `sealSequence` | pure-TS ChaCha20-Poly1305 under a 7d-fold envelope; the crypt-salt `step` (and `sealSequence`) closes the equality leak |
| `merge`, `coin64`, `triad` | order-sensitive fold · 64-bit coin · the ℤ/9 non-units {3,6,9} |
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

CC BY-NC-ND 4.0 — free for non-commercial, unmodified redistribution with attribution (Tsvetan Rouschev). Commercial use is billed
on the measured bits saved; the two coins (110 − 108 = 2) are the conserved fair-exchange invariant.
