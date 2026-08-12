---
title: MCP tools
aside: true
outline: [2, 3]
---

# MCP tools <Badge type="tip" text="68 keys" />

<!-- GENERATED from src/mcp.ts by scripts/gen-mcp — DO NOT EDIT. Categories, skills and parameters are derived from the tool keys and their input schemas. -->

Every tool the uuidna MCP server exposes — fuse uuidna into any harness (Claude, Cursor, any MCP client). This page
is **built from the keys**: the 68 tools below are read from the server's own tool list and
organised into 14 categories and their skills, so the site search and this page's navigation stay in
lockstep with the code. Each tool lists its **parameters** (name · type · required); where a description says
"Returns …", that is the shape it yields.

## The grid <Badge type="tip" :text="`68`" />

68 tools, laid out in rows of 8 — 2⁶ is the bit measure the whole thing is tuned to. Each links to its entry below.

<div class="mcp-grid">
<a href="#uuidna-address"><code>address</code></a>
<a href="#uuidna-merge"><code>merge</code></a>
<a href="#uuidna-coin64"><code>coin64</code></a>
<a href="#uuidna-gate"><code>gate</code></a>
<a href="#uuidna-reeducate"><code>reeducate</code></a>
<a href="#uuidna-merkle-root"><code>merkle_root</code></a>
<a href="#uuidna-merkle-prove"><code>merkle_prove</code></a>
<a href="#uuidna-merkle-verify"><code>merkle_verify</code></a>
<a href="#uuidna-imprint"><code>imprint</code></a>
<a href="#uuidna-read"><code>read</code></a>
<a href="#uuidna-bill"><code>bill</code></a>
<a href="#uuidna-tokens"><code>tokens</code></a>
<a href="#uuidna-cost"><code>cost</code></a>
<a href="#uuidna-encrypt"><code>encrypt</code></a>
<a href="#uuidna-seal-stream"><code>seal_stream</code></a>
<a href="#uuidna-decrypt"><code>decrypt</code></a>
<a href="#uuidna-verify-envelope"><code>verify_envelope</code></a>
<a href="#uuidna-seal-onion"><code>seal_onion</code></a>
<a href="#uuidna-open-onion"><code>open_onion</code></a>
<a href="#uuidna-seal-chain"><code>seal_chain</code></a>
<a href="#uuidna-open-chain"><code>open_chain</code></a>
<a href="#uuidna-contract"><code>contract</code></a>
<a href="#uuidna-contract-seal"><code>contract_seal</code></a>
<a href="#uuidna-contract-open"><code>contract_open</code></a>
<a href="#uuidna-contract-chain"><code>contract_chain</code></a>
<a href="#uuidna-contract-open-chain"><code>contract_open_chain</code></a>
<a href="#uuidna-audit-text"><code>audit_text</code></a>
<a href="#uuidna-audit-book"><code>audit_book</code></a>
<a href="#uuidna-audit-translation"><code>audit_translation</code></a>
<a href="#uuidna-audit-movie"><code>audit_movie</code></a>
<a href="#uuidna-audit-record"><code>audit_record</code></a>
<a href="#uuidna-coprime"><code>coprime</code></a>
<a href="#uuidna-pentagram"><code>pentagram</code></a>
<a href="#uuidna-fibonacci"><code>fibonacci</code></a>
<a href="#uuidna-rotate"><code>rotate</code></a>
<a href="#uuidna-crt"><code>crt</code></a>
<a href="#uuidna-gravity"><code>gravity</code></a>
<a href="#uuidna-digital-root"><code>digital_root</code></a>
<a href="#uuidna-adjudicate"><code>adjudicate</code></a>
<a href="#uuidna-prove-verdict"><code>prove_verdict</code></a>
<a href="#uuidna-verify"><code>verify</code></a>
<a href="#uuidna-harness"><code>harness</code></a>
<a href="#uuidna-harness7"><code>harness7</code></a>
<a href="#uuidna-render"><code>render</code></a>
<a href="#uuidna-sha256"><code>sha256</code></a>
<a href="#uuidna-hmac"><code>hmac</code></a>
<a href="#uuidna-pbkdf2"><code>pbkdf2</code></a>
<a href="#uuidna-chacha20"><code>chacha20</code></a>
<a href="#uuidna-poly1305"><code>poly1305</code></a>
<a href="#uuidna-aead-encrypt"><code>aead_encrypt</code></a>
<a href="#uuidna-aead-decrypt"><code>aead_decrypt</code></a>
<a href="#uuidna-strict"><code>strict</code></a>
<a href="#uuidna-units"><code>units</code></a>
<a href="#uuidna-triad"><code>triad</code></a>
<a href="#uuidna-vortex"><code>vortex</code></a>
<a href="#uuidna-double-torus"><code>double_torus</code></a>
<a href="#uuidna-diamond"><code>diamond</code></a>
<a href="#uuidna-involute"><code>involute</code></a>
<a href="#uuidna-seats"><code>seats</code></a>
<a href="#uuidna-render-list"><code>render_list</code></a>
<a href="#uuidna-theorems"><code>theorems</code></a>
<a href="#uuidna-skills"><code>skills</code></a>
<a href="#uuidna-theorem"><code>theorem</code></a>
<a href="#uuidna-publish"><code>publish</code></a>
<a href="#uuidna-trial"><code>trial</code></a>
<a href="#uuidna-send"><code>send</code></a>
<a href="#uuidna-receive"><code>receive</code></a>
<a href="#uuidna-quantum"><code>quantum</code></a>
</div>

## Getting started

Add the server to any MCP client — zero dependencies, launched with npx:

```json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
```

On connect the server sends an **instructions** summary — what uuidna is, and that nothing asks to be trusted, only
rechecked. Every `tools/call` returns a chained **receipt** (`receipt · seq · referer`, a content-address of the
command), so an agent always holds a tamper-evident record of what it ran and the whole session folds to one
recomputable tip. New here? Sign the [Contract](/captain/config) and learn the links first.

## Identity & addressing <Badge type="tip" :text="'5'" />

*skill: address*

### `uuidna_address`

Content-address any text: a deterministic 128-bit v8 UUID. Same input → same address, for anyone, with no key. Integrity, not secrecy. Measured entropy: 122 free bits, ~2^61 birthday wall; non-cryptographic (forgeable by design).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | the value to address |

### `uuidna_merge`

Fold two content-addresses into one, ORDER-SENSITIVE (merge(a,b) ≠ merge(b,a)) — the directed edge. For the order-INVARIANT fold use uuidna_gravity or uuidna_merkle_root.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `a` | string | **yes** |  |
| `b` | string | **yes** |  |

### `uuidna_coin64`

Mint a 64-bit coin (16 hex digits) from any content — the top 64 bits of its content-address. A shorter pointer; ~2^32 birthday wall (halve the address bits, halve the exponent). Integrity, not secrecy.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

### `uuidna_digital_root`

The fall of an integer to its ℤ/9 digital root (1..9) — the number's gravity, recomputable by anyone.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `n` | number | **yes** |  |

### `uuidna_strict`

The STRICT content-address: normalise the input (so equivalent values converge) then address it — strictUuidna(3) === strictUuidna(" 3 "). Use when whitespace/format should not change identity.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

## Honesty gate <Badge type="tip" :text="'7'" />

*skill: gate*

### `uuidna_gate`

The honesty gate: does the prose hold the floor (binary 1) or drain as an overclaim (0)? 7-language. Returns {binary,hit}. A tripwire, not an oracle.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

### `uuidna_reeducate`

Bound a failing/overclaiming output to the honest floor, keeping the honest remainder. Returns {passed,...}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

### `uuidna_adjudicate`

The trial: a recomputable three-way verdict for a statement — REFUTED (gate drains an overclaim), SEALED (gate-clean and admissible), or UNVERIFIED (gate-clean but no receipt). Integrity, not truth.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** |  |

### `uuidna_prove_verdict`

Fold a statement plus any decidable formula receipts through the order-invariant gravity to ONE proof-of-verdict root — a recomputable seal of the trial.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** |  |
| `formulaReceipts` | array | no |  |

### `uuidna_verify`

The self-verdict: recompute uuidna's own claims from a seed and return the recomputable UuidnaVerdict (integrity, not truth).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `seed` | string | **yes** |  |

### `uuidna_harness`

Make any output auditable: wrap it with its content-address and honesty-gate verdict. Returns {output,address,auditable,...}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

### `uuidna_harness7`

Audit an output across all seven dimensions at once — seven receipts folded to one root. Returns {receipts,root,auditableInAll}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

## Merkle & gravity <Badge type="tip" :text="'4'" />

*skill: merkle*

### `uuidna_merkle_root`

Order-free merkle root of a list of leaves (a tamper-evident seal of the set).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `leaves` | array | **yes** |  |

### `uuidna_merkle_prove`

Holographic inclusion proof for the leaf at index — an O(log N) audit path that verifies the whole from a tiny part.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `leaves` | array | **yes** |  |
| `index` | number | **yes** |  |

### `uuidna_merkle_verify`

Verify a leaf against a root using an inclusion proof (a forged leaf fails).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `leaf` | string | **yes** |  |
| `proof` | any | **yes** |  |
| `root` | string | **yes** |  |

### `uuidna_gravity`

The quantum receipt: the order-INVARIANT merkle gravity of a set of addresses — every observer ordering falls to the SAME root. NOT physics; a content-addressed fixed point.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `addresses` | array | **yes** |  |

## Imprint & messaging <Badge type="tip" :text="'4'" />

*skill: imprint*

### `uuidna_imprint`

Encode text INTO a uuid chain (reversible, ≤115 bits per uuid, chained for longer). A public, reversible encoding — not encryption.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

### `uuidna_read`

Decode text back from a uuid chain produced by uuidna_imprint (round-trips exactly).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `uuids` | array | **yes** |  |

### `uuidna_send`

SEND (→): encrypt text under a passphrase (pure-TS ChaCha20-Poly1305, 7d-fold envelope), then imprint the sealed envelope INTO a uuid stream — the channel is uuid itself. Returns the uuid chain to transport. Pass an advancing `step` (the crypt salt) so identical messages never ride the wire alike — the equality leak stays closed in transit. Receive it with uuidna_receive and the same passphrase.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |
| `passphrase` | string | **yes** |  |
| `step` | integer | no | the advancing-sequence step — omit for convergent, supply and advance to close the equality leak in transit |

### `uuidna_receive`

RECEIVE (←): read a uuid stream from uuidna_send back to its sealed envelope, then decrypt with the passphrase. The reverse direction of the bidirectional channel. A wrong key or any tamper throws (Poly1305 authentication).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `uuids` | array | **yes** |  |
| `passphrase` | string | **yes** |  |

## Billing & measure <Badge type="tip" :text="'3'" />

*skill: billing, measure*

### `uuidna_bill`

Measured billing: bits saved (O(N) − O(1)) and the two coins (the conserved fair-exchange invariant). Public interest is free.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `commercial` | boolean | **yes** |  |
| `recomputeOps` | number | **yes** |  |
| `verifyOps` | number | **yes** |  |

### `uuidna_tokens`

Measure TOKENS-PER-THEOREM — the honest cost-of-proof metric (independent skilled work, not money). An agent SELF-REPORTS its context/token distribution {input, output, cached, reasoning}; this sums them and divides by the sealed theorem count (the live ledger). Returns {selfReported, dimensions, total, theorems, tokensPerTheorem, distribution}. HONEST: the token counts are the agent’s OWN report — this server cannot observe your context; the divisor, the theorem count, is the recomputable truth. Fold many reports over a session to watch the cost-per-theorem fall.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `input` | number | no | prompt/input tokens |
| `output` | number | no | generated/output tokens |
| `cached` | number | no | cache-read tokens |
| `reasoning` | number | no | reasoning/thinking tokens |
| `label` | string | no | optional tag for this report |

### `uuidna_cost`

The RECOMPUTABLE cost of the ledger — computed from lean/*.lean itself, NOT self-reported like uuidna_tokens. The PRODUCE cost is the formal-corpus size (Σ bytes of every `theorem … := by decide`); the VERIFY cost is O(1) per theorem (recompute its content-address). Anyone recomputes the SAME numbers from the same source, so nothing is on trust — it folds to a receipt you recheck. This is efficiency PROVEN (routed to the ledger), where uuidna_tokens is efficiency MEASURED (a self-report). Returns {count, formalBytes, bytesPerTheorem, verifyOps, largest, smallest, receipt}.

_No parameters._

## Crypto & streams <Badge type="tip" :text="'8'" />

*skill: crypto*

### `uuidna_encrypt`

Encrypt text under a passphrase. Secrecy: pure-TS ChaCha20-Poly1305 (PBKDF2-SHA256, 600k) — no native crypto. Convergent by default (the same text seals identically → equality leaks). Pass an advancing `step` (the crypt salt) to freshen the salt per position so the same text seals differently and equality no longer leaks; the step is public (`seq`) and MUST advance. Returns a sealed envelope whose content-address is the 7d-fold of its parts.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |
| `passphrase` | string | **yes** |  |
| `step` | integer | no | the advancing-sequence step — omit for convergent, supply and advance to close the equality leak |

### `uuidna_seal_stream`

Seal a list of messages under one passphrase, each ADVANCING the step (the sequence is the stripe, one seal per step) — repeated messages never seal alike, so the equality leak stays closed across the whole stream. Returns the sealed envelopes; decrypt each with uuidna_decrypt.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `messages` | array | **yes** |  |
| `passphrase` | string | **yes** |  |
| `start` | integer | no | the starting step (default 0) |

### `uuidna_decrypt`

Decrypt a sealed envelope from uuidna_encrypt / uuidna_seal_stream with the passphrase (v1 convergent or v2 sequence-salted — the salt travels in the envelope, no step needed back). A wrong key or tampered ciphertext throws (Poly1305 authentication).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `sealed` | object | **yes** |  |
| `passphrase` | string | **yes** |  |

### `uuidna_verify_envelope`

Verify a sealed envelope's 7d-fold content-address (integrity/routing) without the key — public, reproducible.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `sealed` | object | **yes** |  |

### `uuidna_seal_onion`

Onion-seal a message under N passphrases (each a real ChaCha20-Poly1305 layer; bounded 1..16, never infinite) and carry the whole envelope AS a chain of uuids. passphrases[0] is the innermost wrap, passphrases[n-1] the outermost. Returns { uuids, layers, receipt }. HONEST: secrecy is ChaCha20-Poly1305 ONLY; the uuid transport is public and hides nothing; the receipt is non-crypto FNV (integrity/routing). Content is hidden — message LENGTH is not.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `message` | string | **yes** |  |
| `passphrases` | array | **yes** | innermost→outermost, 1..16 layers |
| `step` | integer | no | optional advancing crypt-salt step |

### `uuidna_open_onion`

Open an onion-sealed uuid chain with its passphrases, applied OUTERMOST-first. A wrong key, a reordered key list, or a tampered chain throws (Poly1305 authentication).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `uuids` | array | **yes** |  |
| `passphrases` | array | **yes** |  |

### `uuidna_seal_chain`

Seal a stream of messages as a forward-linked RATCHET: each link onion-seals at a step ROTATED from the prior link’s receipt (the referer sequence), so every step is fresh and the stream is content-chained. HONEST: the rotation is over a PUBLIC non-crypto receipt — it buys freshness, linkage and accidental-tamper-evidence, NOT secrecy and NOT a binding commitment. Returns the ratchet links.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `messages` | array | **yes** |  |
| `passphrases` | array | **yes** |  |
| `genesis` | string | no | optional zeroth referer seed |

### `uuidna_open_chain`

Open a ratchet chain: verifies the referer rotation and that each receipt matches its uuids BEFORE decrypting, then returns the messages in order. A dropped, reordered, or edited link throws.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `links` | array | **yes** |  |
| `passphrases` | array | **yes** |  |
| `genesis` | string | no |  |

## Contract-keyed messaging <Badge type="tip" :text="'5'" />

*skill: contract*

### `uuidna_contract`

The contract identity: content-address a contract TEXT to its [contract-uuid] and the domain that names it (&lt;contract-uuid&gt;.uuidna.org) — the domain IS the contract's address. This uuid is PUBLIC (routing, and a proof anyone holding the exact terms can recompute); the terms themselves are the private key. Same fold as uuidna_address, so the license is itself a contract. Returns {contract,domain}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `terms` | string | **yes** | the contract text (the terms) — kept private; only its address is returned |

### `uuidna_contract_seal`

Seal a message UNDER a contract: encrypt it with the contract text as the ChaCha20-Poly1305 key and tag the sealed uuid stream with the public [contract-uuid]. Only holders of the terms can open it. HONEST: confidentiality is EXACTLY the secrecy of the terms — a PUBLIC contract (e.g. the CC BY-NC license) gives NONE (sealed: complement_is_xor_key3, a fixed pad is public, not secret); a PRIVATE contract gives real secrecy. `step` freshens the salt so repeats never seal alike. Returns {contract,uuids,layers,receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `message` | string | **yes** |  |
| `terms` | string | **yes** | the contract text — the private key |
| `step` | integer | no | advancing salt step (optional) |

### `uuidna_contract_open`

Open a contract-sealed message: checks your terms address to the tagged [contract-uuid] (public proof of holding the right contract), then decrypts. A wrong contract fails the address check or Poly1305 authentication. Returns the message.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `sealed` | object | **yes** | the {contract,uuids,...} from uuidna_contract_seal |
| `terms` | string | **yes** |  |

### `uuidna_contract_chain`

Seal a STREAM of messages under a contract as a forward-linked ratchet — each step ROTATED from the prior link's receipt (the referer sequence), all tagged with the [contract-uuid], seeded from it. HONEST: the rotation buys freshness, linkage and tamper-evidence, NOT extra secrecy (that is the ChaCha20-Poly1305 layer, keyed by the terms). Returns {contract,links}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `messages` | array | **yes** |  |
| `terms` | string | **yes** |  |

### `uuidna_contract_open_chain`

Open a contract-keyed ratchet: verifies your terms address to the tagged [contract-uuid] and the referer chain rotates correctly, then decrypts each link in order. A wrong contract, or a dropped / reordered / edited link, throws. Returns the messages.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `chain` | object | **yes** | the {contract,links} from uuidna_contract_chain |
| `terms` | string | **yes** |  |

## Provenance audit (public text & metadata) <Badge type="tip" :text="'5'" />

*skill: books*

### `uuidna_audit_text`

Audit and structurally decode PROVIDED text (offline, pure). Returns a provenance fingerprint (the content-address — proof of exact-copy — and a chapterRoot proving any chapter belongs), a structural decode (chars/words/lines, the ℤ/9 digital-root gravity — a checksum digit, NOT a meaning, and a reversible-imprint round-trip check), and the honesty-gate verdict. HONEST: "decode" is provenance + structure, never decryption (text is not encrypted) nor hidden meaning; the gate is tuned to uuidna's own overclaim words, so on ordinary prose it passes and says nothing about the work.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |
| `title` | string | no |  |
| `author` | string | no |  |

### `uuidna_audit_book`

Fetch a PUBLIC-DOMAIN book from Project Gutenberg by id (via the public Gutendex API, no key) and audit it — the same provenance fingerprint + structural decode + honesty-gate verdict as uuidna_audit_text. This is the ONLY tool that reaches the network (Node built-in fetch, still zero npm deps). HONEST: the fetched text is DATA — content-addressed and counted, never executed; instruction-shaped prose in a book is content, not a command. Public-domain works, free for the public interest.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `gutenbergId` | integer | **yes** | a Project Gutenberg ebook id, e.g. 1342 (Pride and Prejudice) |

### `uuidna_audit_translation`

Audit a translation as a source↔translation PAIR: content-address both texts and bind them with a directional provenance receipt (source→translation, order-sensitive), plus each text's own structural audit. HONEST: this proves the PAIRING and each text's exact-copy integrity — NOT that the translation is accurate or faithful. Semantic fidelity is human judgement; provenance is what recomputes. Re-address after each revision and the change is visible. Returns {source,translation,pair}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `source` | string | **yes** |  |
| `translation` | string | **yes** |  |
| `title` | string | no |  |
| `sourceLang` | string | no |  |
| `targetLang` | string | no |  |

### `uuidna_audit_movie`

Content-address the PUBLIC Wikipedia summary of a film by title (free, no key) — a recomputable provenance fingerprint of the public facts + structure + honesty gate. HONEST AND BOUNDED: this fingerprints the public DESCRIPTION only; it does NOT fetch, decode, or reproduce the copyrighted film — its footage, dialogue or screenplay. A movie is video; uuidna audits text provenance, not a hidden meaning. Returns the audit of the public summary.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `title` | string | **yes** | a film title, e.g. "The Matrix" |

### `uuidna_audit_record`

Fetch an OPEN-ACCESS Zenodo research record by id (via the public Zenodo REST API, developers.zenodo.org, no key) and content-address its PUBLIC metadata — title, DOI, creators, date — to a recomputable provenance fingerprint + structure + honesty gate. HONEST AND BOUNDED: it fingerprints the public metadata only, NOT the deposited files or their content, which uuidna does not fetch or reproduce. A check digit and a uuid are the same idea at different scales. Returns the audit + the DOI.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `recordId` | integer | **yes** | a Zenodo record id, e.g. 1234567 |

## Rotation & cycles <Badge type="tip" :text="'5'" />

*skill: cycles*

### `uuidna_coprime`

gcd(a,b) and whether a and b are coprime (gcd = 1). Coprimality is what makes a step permute ℤ/n — visiting every point in one stroke — and what fuses moduli (CRT). Mirrors the sealed circle_of_fifths and trinity_rosette_coprime. Returns {gcd,coprime}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `a` | integer | **yes** |  |
| `b` | integer | **yes** |  |

### `uuidna_pentagram`

The star polygon {n/step}: the stroke visiting (step·k mod n). A SINGLE closed stroke covering all n points iff gcd(step,n)=1, else it splits into gcd shorter loops. Default {5/2} is the pentagram — [0,2,4,1,3], one stroke (sealed: pentagram_single_stroke). Returns {n,step,stroke,single,loops}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `n` | integer | no | points (default 5) |
| `step` | integer | no | stride (default 2 — the pentagram) |

### `uuidna_fibonacci`

The single-digit Fibonacci sequence mod m and its Pisano period — the cycle up to the return to the seed (0,1). m=9 → period 24 (the digital-root Fibonacci); m=5 → 20 (pentagram); m=7 → 16 (rosette). Mirrors the sealed fib_single_digit_cycle_24 and siblings. Returns {mod,period,cycle}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `mod` | integer | no | the modulus (default 9 — the single digit) |

### `uuidna_rotate`

Rotate a list cyclically by `stride` and report its strand structure over ℤ/n: gcd(stride,n) strands of n/gcd each; `covers` is true when one strand visits every element (gcd=1) — the closed cover the cross-link compass derives. Returns {rotated,strands,strandLength,covers}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `list` | array | **yes** |  |
| `stride` | integer | **yes** |  |

### `uuidna_crt`

The Chinese remainder solution: for COPRIME moduli m,n the unique x in [0, m·n) with x ≡ a (mod m) and x ≡ b (mod n) — the bijection ℤ/mn ≅ ℤ/m × ℤ/n (e.g. ℤ/21 ≅ ℤ/3 × ℤ/7, the trinity fused to the rosette). Non-coprime moduli throw. Returns {x,mod}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `a` | integer | **yes** |  |
| `m` | integer | **yes** |  |
| `b` | integer | **yes** |  |
| `n` | integer | **yes** |  |

## Theorems & trial <Badge type="tip" :text="'6'" />

*skill: theorem*

### `uuidna_render`

Render a statement as a framework-free, CSP-safe card (or OpenGraph hero) — schema.org microdata, shadcn anatomy, content-address in every card, linked to its proof page. Pure HTML+CSS, no script.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `name` | string | **yes** | the statement |
| `key` | string | no | proof-page slug |
| `base` | string | no | site base for the proof link (default root: /theorem/&lt;key&gt;); e.g. /site |
| `kind` | string | no | card (default) or hero |

### `uuidna_render_list`

Render many statements as a grid of framework-free, CSP-safe cards — each by reference (its content-address), schema.org microdata, shadcn anatomy, linked to its proof page. Pure HTML+CSS, no script.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `names` | array | **yes** |  |
| `base` | string | no | site base for proof links |

### `uuidna_theorems`

The theorem ledger — LEAN IS THE SINGLE SOURCE. Every entry is a lean/*.lean theorem proven `by decide` (verified sorry-free). Returns each theorem's {key,name,statement,tactic,file,principle,skill,lean,address}. Filter by `principle` (derivation axis), `skill` (capability axis — see uuidna_skills), or `contains`.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `principle` | string | no |  |
| `skill` | string | no | the capability axis: involution, z9-ring, z7-rosette, clay-reflection, reflection, quantum, crypt-salt, science-pairs, vortex, foundational |
| `contains` | string | no |  |

### `uuidna_skills`

The theorem ledger organised by SKILL — the capability axis, orthogonal to principle. A skill is derived (recomputable) from each theorem's key. Returns each skill with its count and the order-invariant fold of its theorems' content-addresses. Then pull one skill's theorems with uuidna_theorems { skill }.

_No parameters._

### `uuidna_theorem`

Read ONE theorem by key: its detailed `by decide` Lean proof, its formal statement, its principle, source file and content-address, and the verdict (SEALED — its Lean proof compiles sorry-free). Keys from uuidna_theorems.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** |  |

### `uuidna_trial`

Run the whole Lean ledger through the trial: every theorem is SEALED by its `by decide` proof, and their content-addresses fold order-invariantly to ONE recomputable receipt (the ledger's integrity). Returns {count,sealed,refuted,unverified,leanBacked,receipt,verdicts}. Same lean/*.lean, same receipt.

_No parameters._

## Crypto primitives <Badge type="tip" :text="'7'" />

*skill: crypto*

### `uuidna_sha256`

The CRYPTOGRAPHIC hash of text — SHA-256 (local theorem: Merkle–Damgård, KAT-verified). Collision-resistant by pigeonhole (2^256 seats). Distinct from uuidna_address, whose FNV fold is fast but NOT cryptographic.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

### `uuidna_hmac`

Keyed authentication — HMAC-SHA256 (local theorem, KAT-verified): a MAC, existentially unforgeable under the PRF assumption. key and message are UTF-8; returns a 32-byte hex tag.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** |  |
| `message` | string | **yes** |  |

### `uuidna_pbkdf2`

Passphrase key-stretching — PBKDF2-HMAC-SHA256 (local theorem). Work factor = iterations (default 600000, OWASP 2023). passphrase and salt are UTF-8; returns a length-byte hex key (default 32).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `passphrase` | string | **yes** |  |
| `salt` | string | **yes** |  |
| `iterations` | number | no |  |
| `length` | number | no |  |

### `uuidna_chacha20`

ChaCha20 keystream cipher (local theorem, RFC 8439 ARX permutation): returns hex of text ⊕ keystream. key is 32-byte hex, nonce 12-byte hex, counter defaults to 0. CAVEAT (): NEVER reuse a (key, nonce, counter) — keystream reuse destroys confidentiality. For passphrase secrecy use uuidna_encrypt.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** | 32-byte hex |
| `nonce` | string | **yes** | 12-byte hex |
| `counter` | number | no |  |
| `text` | string | **yes** |  |

### `uuidna_poly1305`

Poly1305 one-time authenticator (local theorem: exact arithmetic mod the prime 2^130−5). message and one-time key are hex (the key is 32 bytes); returns a 16-byte hex tag. CAVEAT (): a one-time key authenticates exactly ONE message — never reuse it.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `message` | string | **yes** | hex |
| `oneTimeKey` | string | **yes** | 32-byte hex |

### `uuidna_aead_encrypt`

Raw ChaCha20-Poly1305 AEAD seal (local theorem, RFC 8439): returns {ct,tag} as hex. key 32-byte hex, nonce 12-byte hex, plaintext UTF-8, optional aad hex. CAVEAT (): a (key, nonce) pair must be unique. For passphrase secrecy + a routable envelope use uuidna_encrypt.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** |  |
| `nonce` | string | **yes** |  |
| `plaintext` | string | **yes** |  |
| `aad` | string | no | optional hex |

### `uuidna_aead_decrypt`

Verify + open a raw ChaCha20-Poly1305 seal (local theorem). key/nonce/ct/tag are hex, optional aad hex; returns the UTF-8 plaintext. A wrong key or any tamper throws (Poly1305 authentication).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** |  |
| `nonce` | string | **yes** |  |
| `ct` | string | **yes** |  |
| `tag` | string | **yes** |  |
| `aad` | string | no | optional hex |

## Vortex algebra <Badge type="tip" :text="'7'" />

*skill: algebra*

### `uuidna_units`

The six units of ℤ/9 — {1,2,4,5,7,8}, the invertible residues (3 and 6 are zero-divisors, 9≡0). The harmonic solutions the fold moves through. Returns the array.

_No parameters._

### `uuidna_triad`

The triad {3,6,9} — the non-units of ℤ/9 (the complement of the six units): the nilpotents 3,6 (a²≡0) and the void 9≡0. The still axis the vortex turns around. Returns the array.

_No parameters._

### `uuidna_vortex`

The doubling circuit 1→2→4→8→7→5 — the vortex orbit of the units under ×2 mod 9, the DNA of the fold (5→1 closes the loop). Returns the array.

_No parameters._

### `uuidna_double_torus`

The double-torus 7D field of a set of addresses: the doubling vortex and its reverse rotate the set; at each of the 7 dimensions the two fold together, and the seven dimension-roots fold to ONE. Order-DEPENDENT (the sequence is the signal) — use uuidna_gravity for an order-invariant receipt. Returns {dims,root}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `addresses` | array | **yes** |  |

### `uuidna_diamond`

The diamond involution r(d)=10−d on a digit 1..9: self-inverse (diamond(diamond(d))=d), with the unique fixed point 5 — the heart where mint meets mind. Returns the reflected digit.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `d` | number | **yes** | a digit 1..9 |

### `uuidna_involute`

Lift the diamond involution to a list: pair each element with its mirror across the centre (total, closed, self-inverse). An odd list has exactly one fixed centre; an even list none. Returns {pairs,fixed}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `items` | array | **yes** |  |

### `uuidna_seats`

The pigeonhole seat bound: a b-bit digest has 2^b distinct seats, so past 2^b inputs a collision is forced — true for EVERY finite hash (the strong ones only resist finding one computationally). Returns 2^bits.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `bits` | number | **yes** |  |

## Publications (audited prose) <Badge type="tip" :text="'1'" />

*skill: publish*

### `uuidna_publish`

Write a PUBLICATION in lean human prose about ONE domain, AUDITED before publishing. Composed by READING that domain's sealed theorems and writing only what they settle — every claim links the proof that backs it — then gated by uuidna's own honesty audit; an overclaiming note is REFUSED, not shipped. Call with no argument to list every domain's publication (slug + count + publishable + receipt), or with `file` (e.g. "Tides.lean", from uuidna_theorems) to get that note's full markdown, content-address, member proofs and audit findings. Writing descends from reading; integrity, not truth.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `file` | string | no | a lean/*.lean file name, e.g. "Codes.lean" — omit to list all publications |

## Quantum simulation <Badge type="tip" :text="'1'" />

*skill: quantum*

### `uuidna_quantum`

Run the EXACT classical state-vector simulator (Gaussian-integer amplitudes over √(2^scale) — no floats, no decimal drift). Either a named `circuit` (bell/ghz) OR an arbitrary `ops` circuit in OpenQASM/Qiskit gate names (h, x, y, z, s, sdg, cx, cz, swap, ccx, ccz) — so any system that speaks quantum circuits interops. Returns the EXACT rational distribution, per-qubit marginals (the no-signaling check), the order-invariant receipt, and — for an H-free circuit — the CLASSICAL truth table (the reversible logic the gates compute, usable directly by classical systems; Toffoli/ccx is universal). HONEST: classical simulation — 2^n amplitudes, EXPONENTIAL, NO quantum advantage, NOT quantum hardware.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `circuit` | string | no | bell (2 qubits) or ghz (n qubits); ignored if ops is given |
| `qubits` | number | no | qubit count, 1..12 (ghz default 3; required for ops) |
| `ops` | array | no | OpenQASM circuit: [{gate, qubits:[...]}] with gate ∈ h,x,y,z,s,sdg,cx,cz,swap,ccx,ccz |

