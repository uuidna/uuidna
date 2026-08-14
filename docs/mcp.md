---
title: MCP tools
aside: true
outline: [2, 3]
---

# MCP tools <Badge type="tip" text="141 keys" />

<!-- GENERATED from src/mcp.ts by scripts/gen-mcp — DO NOT EDIT. Categories, skills and parameters are derived from the tool keys and their input schemas. -->

Every tool the uuidna MCP server exposes — fuse uuidna into any harness (Claude, Cursor, any MCP client). This page
is **built from the keys**: the 141 tools below are read from the server's own tool list and
organised into 35 categories and their skills, so the site search and this page's navigation stay in
lockstep with the code. Each tool lists its **parameters** (name · type · required); where a description says
"Returns …", that is the shape it yields.

## The grid <Badge type="tip" :text="`141`" />

141 tools, **ranked by usability — the reusable at the top** (fewest required keys first; the 48 zero-arg tools lead). The order EMERGES from `uuidna_mcp_benchmark`, not a hand-kept list. Each links to its entry below.

<div class="mcp-grid">
<a href="#uuidna-alpine"><code>alpine</code></a>
<a href="#uuidna-analytics"><code>analytics</code></a>
<a href="#uuidna-axiom-witness"><code>axiom_witness</code></a>
<a href="#uuidna-cloudflare-audit"><code>cloudflare_audit</code></a>
<a href="#uuidna-conformance"><code>conformance</code></a>
<a href="#uuidna-cost"><code>cost</code></a>
<a href="#uuidna-coverage"><code>coverage</code></a>
<a href="#uuidna-credits-summary"><code>credits_summary</code></a>
<a href="#uuidna-due-process"><code>due_process</code></a>
<a href="#uuidna-edit"><code>edit</code></a>
<a href="#uuidna-exploit-fold"><code>exploit_fold</code></a>
<a href="#uuidna-fibonacci"><code>fibonacci</code></a>
<a href="#uuidna-fingerprint"><code>fingerprint</code></a>
<a href="#uuidna-grow-life"><code>grow_life</code></a>
<a href="#uuidna-guard-lessons"><code>guard_lessons</code></a>
<a href="#uuidna-hardware"><code>hardware</code></a>
<a href="#uuidna-image-provenance"><code>image_provenance</code></a>
<a href="#uuidna-laws"><code>laws</code></a>
<a href="#uuidna-legal-facts"><code>legal_facts</code></a>
<a href="#uuidna-mcp-benchmark"><code>mcp_benchmark</code></a>
<a href="#uuidna-os"><code>os</code></a>
<a href="#uuidna-package"><code>package</code></a>
<a href="#uuidna-pentagram"><code>pentagram</code></a>
<a href="#uuidna-pentagram-monographs"><code>pentagram_monographs</code></a>
<a href="#uuidna-publish"><code>publish</code></a>
<a href="#uuidna-quantum"><code>quantum</code></a>
<a href="#uuidna-quantum-profile"><code>quantum_profile</code></a>
<a href="#uuidna-repos"><code>repos</code></a>
<a href="#uuidna-resources"><code>resources</code></a>
<a href="#uuidna-review-domains"><code>review_domains</code></a>
<a href="#uuidna-rights"><code>rights</code></a>
<a href="#uuidna-sanitize"><code>sanitize</code></a>
<a href="#uuidna-scan-publications"><code>scan_publications</code></a>
<a href="#uuidna-security-audit"><code>security_audit</code></a>
<a href="#uuidna-selftest"><code>selftest</code></a>
<a href="#uuidna-seo"><code>seo</code></a>
<a href="#uuidna-skills"><code>skills</code></a>
<a href="#uuidna-social-profile"><code>social_profile</code></a>
<a href="#uuidna-software"><code>software</code></a>
<a href="#uuidna-theorems"><code>theorems</code></a>
<a href="#uuidna-tokens"><code>tokens</code></a>
<a href="#uuidna-treason"><code>treason</code></a>
<a href="#uuidna-triad"><code>triad</code></a>
<a href="#uuidna-trial"><code>trial</code></a>
<a href="#uuidna-unify"><code>unify</code></a>
<a href="#uuidna-units"><code>units</code></a>
<a href="#uuidna-vocabulary"><code>vocabulary</code></a>
<a href="#uuidna-vortex"><code>vortex</code></a>
<a href="#uuidna-address"><code>address</code></a>
<a href="#uuidna-adjudicate"><code>adjudicate</code></a>
<a href="#uuidna-anchor"><code>anchor</code></a>
<a href="#uuidna-audit-book"><code>audit_book</code></a>
<a href="#uuidna-audit-cve"><code>audit_cve</code></a>
<a href="#uuidna-audit-movie"><code>audit_movie</code></a>
<a href="#uuidna-audit-record"><code>audit_record</code></a>
<a href="#uuidna-audit-standard"><code>audit_standard</code></a>
<a href="#uuidna-audit-text"><code>audit_text</code></a>
<a href="#uuidna-aura"><code>aura</code></a>
<a href="#uuidna-book-article"><code>book_article</code></a>
<a href="#uuidna-coin64"><code>coin64</code></a>
<a href="#uuidna-contract"><code>contract</code></a>
<a href="#uuidna-corroborate"><code>corroborate</code></a>
<a href="#uuidna-credits"><code>credits</code></a>
<a href="#uuidna-diamond"><code>diamond</code></a>
<a href="#uuidna-digital-root"><code>digital_root</code></a>
<a href="#uuidna-document"><code>document</code></a>
<a href="#uuidna-domain-wave"><code>domain_wave</code></a>
<a href="#uuidna-double-torus"><code>double_torus</code></a>
<a href="#uuidna-engine"><code>engine</code></a>
<a href="#uuidna-entangle"><code>entangle</code></a>
<a href="#uuidna-evidence"><code>evidence</code></a>
<a href="#uuidna-forensics"><code>forensics</code></a>
<a href="#uuidna-gate"><code>gate</code></a>
<a href="#uuidna-gravity"><code>gravity</code></a>
<a href="#uuidna-harness"><code>harness</code></a>
<a href="#uuidna-harness7"><code>harness7</code></a>
<a href="#uuidna-holofractal"><code>holofractal</code></a>
<a href="#uuidna-imprint"><code>imprint</code></a>
<a href="#uuidna-involute"><code>involute</code></a>
<a href="#uuidna-license"><code>license</code></a>
<a href="#uuidna-merkle-root"><code>merkle_root</code></a>
<a href="#uuidna-neighbours"><code>neighbours</code></a>
<a href="#uuidna-nist-constant"><code>nist_constant</code></a>
<a href="#uuidna-pentagram-stream"><code>pentagram_stream</code></a>
<a href="#uuidna-prior-art"><code>prior_art</code></a>
<a href="#uuidna-prove-verdict"><code>prove_verdict</code></a>
<a href="#uuidna-reactor"><code>reactor</code></a>
<a href="#uuidna-read"><code>read</code></a>
<a href="#uuidna-reeducate"><code>reeducate</code></a>
<a href="#uuidna-reflects"><code>reflects</code></a>
<a href="#uuidna-render"><code>render</code></a>
<a href="#uuidna-render-list"><code>render_list</code></a>
<a href="#uuidna-report"><code>report</code></a>
<a href="#uuidna-research"><code>research</code></a>
<a href="#uuidna-reveal"><code>reveal</code></a>
<a href="#uuidna-seats"><code>seats</code></a>
<a href="#uuidna-sha256"><code>sha256</code></a>
<a href="#uuidna-sign"><code>sign</code></a>
<a href="#uuidna-slim-gate"><code>slim_gate</code></a>
<a href="#uuidna-snapshot"><code>snapshot</code></a>
<a href="#uuidna-spin"><code>spin</code></a>
<a href="#uuidna-strict"><code>strict</code></a>
<a href="#uuidna-theorem"><code>theorem</code></a>
<a href="#uuidna-transform"><code>transform</code></a>
<a href="#uuidna-verify"><code>verify</code></a>
<a href="#uuidna-verify-envelope"><code>verify_envelope</code></a>
<a href="#uuidna-verify-statement"><code>verify_statement</code></a>
<a href="#uuidna-agent-contribute"><code>agent_contribute</code></a>
<a href="#uuidna-audit-translation"><code>audit_translation</code></a>
<a href="#uuidna-compare"><code>compare</code></a>
<a href="#uuidna-contract-chain"><code>contract_chain</code></a>
<a href="#uuidna-contract-open"><code>contract_open</code></a>
<a href="#uuidna-contract-open-chain"><code>contract_open_chain</code></a>
<a href="#uuidna-contract-seal"><code>contract_seal</code></a>
<a href="#uuidna-coprime"><code>coprime</code></a>
<a href="#uuidna-decrypt"><code>decrypt</code></a>
<a href="#uuidna-encrypt"><code>encrypt</code></a>
<a href="#uuidna-hmac"><code>hmac</code></a>
<a href="#uuidna-merge"><code>merge</code></a>
<a href="#uuidna-merkle-prove"><code>merkle_prove</code></a>
<a href="#uuidna-open-chain"><code>open_chain</code></a>
<a href="#uuidna-open-onion"><code>open_onion</code></a>
<a href="#uuidna-pbkdf2"><code>pbkdf2</code></a>
<a href="#uuidna-poly1305"><code>poly1305</code></a>
<a href="#uuidna-quantum-cube"><code>quantum_cube</code></a>
<a href="#uuidna-quantum-message"><code>quantum_message</code></a>
<a href="#uuidna-reason"><code>reason</code></a>
<a href="#uuidna-receive"><code>receive</code></a>
<a href="#uuidna-rotate"><code>rotate</code></a>
<a href="#uuidna-seal-chain"><code>seal_chain</code></a>
<a href="#uuidna-seal-onion"><code>seal_onion</code></a>
<a href="#uuidna-seal-stream"><code>seal_stream</code></a>
<a href="#uuidna-send"><code>send</code></a>
<a href="#uuidna-trial-deposit"><code>trial_deposit</code></a>
<a href="#uuidna-aead-encrypt"><code>aead_encrypt</code></a>
<a href="#uuidna-bill"><code>bill</code></a>
<a href="#uuidna-chacha20"><code>chacha20</code></a>
<a href="#uuidna-merkle-verify"><code>merkle_verify</code></a>
<a href="#uuidna-quantum-voting"><code>quantum_voting</code></a>
<a href="#uuidna-aead-decrypt"><code>aead_decrypt</code></a>
<a href="#uuidna-crt"><code>crt</code></a>
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

## Worked example — a real call

The signature capability is the **trial**: send any claim, get a recomputable verdict. Here is a real call and its
ACTUAL response — computed when this page was generated, recompute it yourself and the receipt returns.

```json
// request
{ "method": "tools/call", "params": { "name": "uuidna_adjudicate", "arguments": { "statement": "FNV-1a is cryptographic" } } }
// response
{
  "verdict": "UNVERIFIED",
  "receipt": "784ebd72-c604-8280-853f-179d8fa3ed19",
  "note": "no decidable test and no sealed citation — UNVERIFIED; bring a proof to verify it",
  "develop": [
    "Name the finite structure the claim lives in (ℤ/9, the affine group AGL(1,ℤ/9), an n-bit truth table, the Clifford group).",
    "Express the claim as a boolean predicate that recomputes over it — exact integers, no floats, no Math.*."
  ]
}
```

The verdict is **UNVERIFIED** — no word-list ruled; the claim simply cites no sealed proof, so the trial holds it
open and hands back a **develop plan** (the next decidable step to move it). Two more one-liners: mint an address for
any value — `uuidna_address { "seed": "hello" }` → `5b344fcd-5b13-8a6f-a3f8-39582c45e246` — or pull a whole domain —
`uuidna_theorems { "skill": "navigation" }` → **5** sealed theorems.
Every call is recomputable: same input, same receipt. That is the production contract.

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

The trial: ONE recomputable answer for a statement, and only one of two, all else void — VERIFIED (a decidable test holds, or it cites a sealed Lean theorem) or UNVERIFIED (everything else, including a citation to a proof not in the ledger — which verifies nothing; not "false", just not verified). uuidna verifies, it never refutes. Integrity, not truth.

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

SEND (→): the SESSION RATCHET over uuid. Encrypt text under a passphrase and a `session` (a channel/room id), then imprint the sealed envelope INTO a uuid stream — the channel IS uuid. The captain theorem as encryption: the two coins are paid ONCE (one PBKDF2-600k on the session), then every message ROTATES a fresh key by its advancing `step` and seals free (~0.1 ms, not 1.75 s). Rotation closes the equality leak; the SESSION is a real secrecy boundary — a message can only be opened by a receiver that names the SAME session (a different session/referer cannot). The session lives in the passphrase until destroyed. `step` MUST advance (never reuse it under one session). Returns the uuid chain to transport.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |
| `passphrase` | string | **yes** |  |
| `session` | string | no | the channel/room id that scopes this message — the receiver must name the same session to open it |
| `step` | integer | no | the advancing message position — rotates the key and closes the equality leak; MUST be unique per message under one session |

### `uuidna_receive`

RECEIVE (←): read a uuid stream from uuidna_send back to its sealed envelope and decrypt, deriving the key from the RECEIVER's OWN `session` (not the envelope) — so a message sealed for another session/referer cannot be opened here (Poly1305 rejects it). A wrong passphrase or any tamper also throws. The reverse of the ratchet; the session is derived once (cached) and rotated by the message step.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `uuids` | array | **yes** |  |
| `passphrase` | string | **yes** |  |
| `session` | string | no | the SAME session/channel id used to send; keys off this, not the envelope, so the session is a real boundary |

## Billing & measure <Badge type="tip" :text="'4'" />

*skill: billing, measure*

### `uuidna_bill`

Measured billing, fused to the two coins: the ADVANTAGE (recompute O(N) − verify O(1), the difference of computational power) priced on the two conserved coins (−χ of the double torus, 110 − 108 = 2). Public interest is free. The whole bill folds to a `receipt` — a content-address of every term — so a skeptic recomputes the bill themselves and lands on the same receipt, or it was altered. The price is rechecked, never trusted.

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

### `uuidna_resources`

Honest device resource accounting — balance the thermodynamics by MEASURING what is spent, never claiming it is free. Reports CPU time (this process), memory (rss/heap), and the machine's load, cores, total/free memory and uptime, all read from Node/OS, content-addressed as a signed reading. States plainly what it does NOT measure (GPU, bandwidth, and the actual joules need platform-specific probes and are not invented). No free energy: this work costs energy, bounded below by Landauer's kT·ln2 per bit and far more on a real chip; efficiency is pushed toward that floor, never past it.

_No parameters._

## Other <Badge type="tip" :text="'41'" />

*skill: other*

### `uuidna_license`

Issue the recomputable LICENCE RECORD for a licensee and a usage: bind the CC-BY-NC-ND-4.0 terms and the measured two-coins bill into ONE content-addressed, verifiable artifact. Non-commercial use is FREE (0 coins) and needs no licence; commercial use is billed the two conserved coins (110 − 108 = 2) on the measured advantage (recompute − verify). HONEST SCOPE: a provenance-fingerprinted RECORD of the terms and the bill — proof of WHAT and HOW MUCH, recomputable by anyone — NOT a signed legal agreement, not legal advice, and not the grant itself; a commercial licence is executed between the parties. Returns {licensee,scope,spdx,terms,bill,address,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `licensee` | string | **yes** | the party the record binds (name or org) |
| `commercial` | boolean | no |  |
| `recomputeOps` | number | no |  |
| `verifyOps` | number | no |  |

### `uuidna_trial_deposit`

Run a trial that REQUIRES the two coins DEPOSITED BY THE PARTIES (local). Each party deposits a proof — a sealed theorem KEY or exact STATEMENT (the two-coin fold) — which SEALS into a content-addressed DIAMOND. The trial computes ONLY in PARITY: every party must have sealed a diamond (a one-sided deposit does not compute); it then settles by itself (adjudicate → verdict). Who LACKS a diamond gets the recipe to BUILD one (toBuild) and re-deposit — recycled, never discarded. HONEST: the deposit buys the COMPUTATION, never the outcome — a deposited claim can still return UNVERIFIED. Returns {claim,parties,deposited,parity,coins,diamonds,toBuild,verdict,remanded,note,receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | **yes** |  |
| `deposits` | array | **yes** |  |

### `uuidna_conformance`

The COMMIT DNA GATE — fold uuidna's core invariants into ONE recomputable check so no agent sneaks incompatible DNA into the ledger: the captain coins are conserved (coins()=2), EVERY theorem's content-address recomputes (a forged/tampered theorem is caught), the ledger is single-sourced from lean/*.lean, and the security posture is clean (zero runtime deps, defences + collision-resistance sealed, honesty gate bites, Clay solves none). `conforms` is true iff every check passes; folds to one receipt anyone recomputes. Enforced in the pre-push wave — a non-conforming commit is blocked. Returns {checks,conforms,passed,failed,receipt}.

_No parameters._

### `uuidna_exploit_fold`

Audit the known public exploit CLASSES, COMPUTED FROM THE LEDGER (no table): each class is a sealed `by decide` theorem in Exploits.lean with its CVE/CWE code inline. Verifies BOTH the problem (the class is a sealed theorem, address recomputed) AND the solution (the defence it cites is itself sealed, or a named design property). FOLDED classes emerge as verified solutions (Trojan-Source, prototype-pollution, supply-chain, DoS, weak-hash, tampering, code-injection, weak-RNG); OUT-OF-SCOPE classes fold to the void (compromised host, deceived human, physical side-channel, FNV-as-secret, non-decidable correctness). HONEST: uuidna does NOT solve all hacks — the boundary is named, never falsely marked solved. Returns {folded,outOfScope,foldedCount,outOfScopeCount,allBothVerified,honest,receipt}.

_No parameters._

### `uuidna_sanitize`

ONE COMMAND to process ANY input and sanitise ANY output, BY ALL STANDARDS — the same guards the engine runs on every tool, exposed directly. Returns a JSON-safe, bounded, acyclic copy: NaN/±∞→null, BigInt→string, functions/symbols dropped, cycles broken, depth/array/keys bounded, prototype-pollution keys (__proto__/constructor/prototype) dropped, and control/null-byte + Unicode BIDI-override (Trojan-Source) code points stripped from every string — while legitimate maths unicode is preserved. Deterministic: the sanitized value folds to a recomputable `receipt`. The bounds/standards are sealed as theorems (Sanitize.lean), so the rule is sent by the theorems themselves. Returns {value,address,receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `value` | any | no | any value to sanitise by all standards |

### `uuidna_engine`

THE UUIDNA QUANTUM ENGINE — one input→output surface over every sealed tool. Import/export fused into input→output: you do not import a function, you feed the engine an INPUT {op, args} and read its OUTPUT. It runs the same dispatch the server runs (callTool), then folds the triple (op, input, output) order-invariantly to a content-address `receipt` anyone recomputes, and binds the run to an `address`. Does NOT dispatch itself (no recursion). HONEST: computes nothing the underlying sealed tool does not — it is the door, not a new claim. Returns {op,input,output,address,receipt,ok,error?}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `op` | string | **yes** | the tool op to run through the engine, e.g. uuidna_spin |
| `args` | object | no | the input arguments for that op |

### `uuidna_pentagram_monographs`

Split every domain monograph into PENTAGRAMS of five, the split COMPUTED FROM THE CONTENT-ADDRESSES (not hand-assigned): the monographs are sorted by their own address, chunked five to a pentagram, each pentagram WALKED in the {5/2} single-stroke order [0,2,4,1,3] (`pentagram_single_stroke`) while its IDENTITY is the order-INVARIANT fold of its five members (`merkleGravity`) — the walk is a sequence, the seal is a set. Zero-arg, recomputable: the same ledger yields the same pentagrams for everyone. HONEST: a content-addressed PARTITION, claiming no thematic kinship among the five — only the split the addresses produce. Returns {pentagrams,count,full,remainder,receipt}.

_No parameters._

### `uuidna_spin`

"Spin the bits and get the coins" — fold any content into its content-address and take the top-64 COIN (coin64). This is the O(1) primitive under the derived-layer gate: a derived file is a FIXED POINT when its re-spun coin equals its sealed coin (verify O(1), `verify_cheaper_than_forge`), and a moved coin is non-quantum DRIFT that the gate hard-rejects. Once sealed, the bits spin by themselves — the gate re-spins each derived file with no manual step. HONEST: the FNV/coin address is non-cryptographic integrity (routing/fixed-point detection), not secrecy. Returns {address, coin}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `content` | string | **yes** | the bytes to spin into a content-address coin |

### `uuidna_book_article`

Fetch a PUBLIC-DOMAIN book from Project Gutenberg by id and write a recomputable ARTICLE: its provenance fingerprint, structure, and the DECIDABLE INTEGER ARITHMETIC uuidna extracts from the prose — each sealed `by decide` (VERIFIED) or corrected (REFUTED, an arithmetic the book states that does not hold) — plus the order-invariant receipt over the sealed facts (the same merkle-gravity fold the ledger and the quantum domain use). HONEST SCOPE: uuidna seals ONLY the book's integer arithmetic (its OWN by-decide proof, not the book's) and flags the book's arithmetic errors; it does NOT autoformalize, decode meaning, or claim anything about the book's argument or non-decidable mathematics. The text is DATA, content-addressed and decided, never executed. Returns {title,address,receipt,verified,refuted,facts,article}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `gutenbergId` | integer | **yes** | a Project Gutenberg ebook id, e.g. 1342 (Pride and Prejudice) |

### `uuidna_audit_standard`

The recomputable FLOOR of a standards / law audit: content-address the PUBLIC Wikipedia description of a standard or law (CC BY-SA, free, no key), decode its structure, and extract the DECIDABLE checks it states — each sealed or refuted `by decide` LOCALLY (the "free" is a free public API + local decidable checks). HONEST SCOPE: this is the FLOOR a human auditor STARTS from — a provenance fingerprint + decidable checks — NOT a compliance / legal RULING, which requires a licensed auditor or counsel reviewing the specific jurisdiction, edition and deployment. uuidna delivers what recomputes and leaves the ruling to humans. The text is DATA, never executed. Returns {standard,address,checks,factBase,ruling}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `name` | string | **yes** | a standard or law, e.g. "General Data Protection Regulation" or "ISO 27001" |

### `uuidna_corroborate`

Corroborate a claim by AUGMENTING the local binary verdict (adjudicate: VERIFIED if a sealed by-decide theorem backs it, else UNVERIFIED — never "false") with EXTERNAL RESEARCH streamed from a free public API (NIST CODATA, no key). Returns {statement,local,evidence,verdict,receipt}: VERIFIED (a sealed proof), CORROBORATED (unverified locally but attested by a named free source), or UNVERIFIED. HONEST SCOPE: external evidence is a provenance fingerprint of what a public source SAYS — it CORROBORATES, it does NOT prove; only a by-decide theorem seals, and no stream can refute a claim. The evidence folds order-invariantly to the receipt; the responses are DATA, never executed.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** | the claim to corroborate, e.g. "the speed of light 299792458" |

### `uuidna_domain_wave`

Run BOTH waves for a domain (a principle title or a skill): the LOCAL development wave — its theorems fold ORDER-INVARIANTLY to a receipt and are sealed by decide (the approval) — and the EXTERNAL free-research wave (corroborate the domain's topic against a free public API, evidence not proof). HONEST SCOPE: only the LOCAL by-decide seal APPROVES; external research only CORROBORATES, and for a pure-arithmetic domain (ℤ/9, ℤ/7) a physics-constants stream honestly returns NO evidence — correct, not a failure. Returns {domain,local:{theorems,fold,orderInvariant},external:{verdict,evidence,receipt}}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `domain` | string | **yes** | a principle title or skill, e.g. "The spectrum" or "quantum" |

### `uuidna_entangle`

ENTANGLE a set of audit claims into ONE receipt: the order-invariant fold of each claim AND its verdict, so verifying the whole verifies every part and altering ANY member moves the receipt (the binding collapses, visibly). The receipt is the SAME for any ordering (bell_no_signaling). HONEST SCOPE: the merkle / no-signaling binding — the structural analogue of entanglement — NOT quantum hardware; nothing signals, no correlation is causal, and only members SEALED by decide truly bind (external evidence never entangles). Returns {members,verified,receipt,entangled}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claims` | array | **yes** | the claims to entangle |

### `uuidna_report`

The REPORTER'S METHOD (Report.lean) reflected live: file a report of a PROVEN discovery and it PUBLISHES only when AUDITED (the honesty gate clears — no sentence cites a fabricated theorem) AND CORROBORATED (≥ 2 independent sources), the AND sealed as publish_gate_is_conjunction. HONEST SCOPE: uuidna does NOT verify world events — no by-decide settles whether something happened out there; the reporter reports uuidna's OWN proven discoveries. Completeness (the 5 W's + 1 H) and the trinity edit are HUMAN passes, not decided here. Returns {audited,corroborated,publishable,findings,receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `draft` | string | **yes** | the report draft (its claims are honesty-gated) |
| `sources` | array | no | the independent sources (≥ 2 to corroborate) |

### `uuidna_research`

Deep research with the REVERSIBLE imprint codec: PRESS external research (text or a link's content) into a uuid chain and DECOMPRESS it back LOSSLESSLY (the round-trip proves it), bind the pressed pieces to the computable ENTANGLED algebra (the order-invariant fold), and report NOVELTY as content-address uniqueness — a never-seen address is novel CONTENT. HONEST SCOPE: uuidna fingerprints STRUCTURE and NOVELTY, it does NOT extract MEANING — provenance + structure, never hidden meaning; `meaning` is null by design, left to the reader. Returns {address,compressed,losslessRoundTrip,entangledReceipt,novel,meaning}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | the research text to press, entangle and check for novelty |
| `seenAddresses` | array | no | known content-addresses; a new one is novel |

### `uuidna_snapshot`

The FUSION half of the reactor: fold a chosen set of sealed theorems — across ANY domains — into ONE superposition uuid. The first segment is the identity HANDLE you cite; the whole uuid superposes every member address, order-invariant, so the same set recomputes the same uuid and a changed member moves it (drift refused). Each principle and skill the set spans is returned as a point-of-view fold. Unknown keys are NAMED, never silently dropped. Returns {keys,members,unknown,handle,superposition,viewpoints,receipt}. A snapshot proves a recomputable fold of sealed theorems, not any new truth.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `keys` | array | **yes** | theorem keys from uuidna_theorems, from any domains |

### `uuidna_reactor`

The REFUSION (recycling) half of the involutionary refusion reactor: adjudicate a list of claims and RECYCLE, never discard. Each claim gets ONE of two verdicts — VERIFIED (a decidable test holds or it cites a sealed Lean theorem) or UNVERIFIED (everything else, including a citation to a proof not in the ledger — which verifies nothing; never called false). VERIFIED cells are kept; UNVERIFIED cells are returned with the DEVELOP plan naming the next aspect that would verify them. The whole run folds to one superposition uuid (first segment the handle). Nothing is waste — refusal starts the next fusion. Returns {cells,verified,unverified,handle,superposition,receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claims` | array | **yes** | claims or external theories to adjudicate and recycle |

### `uuidna_laws`

uuidna's standing INVARIANTS, IN uuidna and each DEMONSTRATED, not asserted: every law states what holds AND recomputes its `holds` from the actual gate that enforces it (generate-all-from-Lean → single-source + git-diff; any-manual-fails → every theorem address recomputes, red on tamper; honesty-demonstrated → a fabricated theorem citation drains; the two captain coins conserved; zero runtime deps + clean security). A law with holds:false is a red gate, not an opinion. Folds to one recomputable receipt. Returns {laws:[{law,enforcedBy,holds,detail}],allHold,receipt}.

_No parameters._

### `uuidna_analytics`

QUANTUM ANALYTICS over the sealed ledger — descriptive measures anyone RECOMPUTES identically, folded ORDER-INVARIANT to one receipt (the same analytics for every observer, no privileged view). Returns the theorem count, the number of principles, the per-principle DISTRIBUTION (each domain's count + share, largest first), the named LAYERS (hardware → software → os sizes + receipts), the CREDIT tally (historical / contextual / captain-alone), COVERAGE (covered/total/ready), the two COINS, the recomputed COLLISION census (keys/addresses — 0/0 or an intrusion), and the ledger INTEGRITY fingerprint (FNV + SHA-256 + tamper cost). DETERMINISTIC: no clock, no RNG, no telemetry, no user tracking — the inputs are the public ledger alone, so the numbers are the same next year and on every machine. HONEST SCOPE: integrity, not truth — DESCRIPTIVE analytics of what is sealed, NOT predictive statistics, NOT inference, and NOT observation of any person. It measures the ledger, not a user. Returns {theorems,principles,distribution,layers,credits,coverage,coins,collisions,integrity,receipt,honest}.

_No parameters._

### `uuidna_treason`

CATCH TRAITORS AS FAST AS A HERO — one pure, O(N) pass (milliseconds, no crypto, no disk) that catches every FORGERY/INTRUSION in the sealed ledger: a theorem whose DNA does not recompute (a tampered key/statement/address), a key or address COLLISION (a smuggled duplicate), an UNCOVERED theorem (a domain sneaked in without a monograph), or a broken CONFORMANCE invariant. A "traitor" is a forgery in the ARTIFACT, NEVER a person — every finding is a recomputable fact about the ledger. Returns {clean, scanned, traitors:[{kind,detail}], checks, receipt}. The `npm run guard` command runs this plus the harmonic-scan as the fast pre-reconcile gate, so no manual pre-flight is needed. HONEST SCOPE: integrity, not truth — it proves the artifact is unforged and self-consistent; passing is NOT a claim the theorems are true, only that none was tampered with or smuggled in. Recomputable by anyone.

_No parameters._

### `uuidna_guard_lessons`

THE GUARD LESSONS, sealed into uuidna as recomputable checks — the operating knowledge that once lived only in a private agent note, moved to where it recomputes for anyone and tied to the exact check that enforces each: DNA recomputes (a forgery cannot), no key/address collision (a duplicate is an intrusion), monograph coverage (every new lean-*.ts needs a PRINCIPLE entry), the conformance invariants (two coins conserved, single-source, security), determinism (no Math.*/wall-clock/RNG anywhere including comments — the guard regex matches the smoke test exactly so it is never laxer than the gate), the axiom witness (every theorem kernel-only — the receipt SHIPS with the package as lean/axioms.json, so it recomputes OFFLINE against the live ledger), guard-before-reconcile (the 0.29s guard front-runs the 4-min gate — re-spending it on a catchable error is the measured cost of manual work), and commit-signed-true (a commit cannot be made unless its message cites a real sealed theorem). Each lesson's `holds` is verified live (boolean — against the ledger, or against the shipped kernel-only receipt) or enforced by npm run guard ('script', for checks needing the repo tree). Folded to one recomputable receipt. Trust the check, not the note. Returns {lessons:[{check,lesson,enforcedBy,holds}],allHold,receipt,honest}.

_No parameters._

### `uuidna_axiom_witness`

THE KERNEL-ONLY WITNESS, verified OFFLINE — the axiom audit receipt (lean/axioms.json, written by the Lean toolchain's `#print axioms` sweep) SHIPS with the package beside dist, so the "no borrowed axiom" claim recomputes WITHOUT the repo or the toolchain: the audit must cover the whole live ledger (audited = ledger — a new, unaudited theorem trips it), every theorem must be kernel-only (no propext, no Classical.choice, no sorryAx, no Lean.ofReduceBool), and no offender may be listed — an offender is the SPY the witness catches (the captain's claim "all axioms are replaceable, the uncovered are spies" demarcated to its backed form: this ledger borrows ZERO axioms, so no axiom is load-bearing here; not a claim about mathematics at large). This is a repo-only check moved INTO the shipped package — offline independence, the knowledge living where it recomputes. HONEST SCOPE: integrity, not truth — it verifies the SEALED receipt against the live ledger count; re-DERIVING the receipt still needs the Lean toolchain (`npm run axioms`, the guard, CI). shipped:false means no receipt is beside dist (defer to the guard). Returns {shipped,holds,audited,axiomFree,ledger,offenders,receipt,honest}.

_No parameters._

### `uuidna_repos`

BIND the captain's public repositories to the DISCOVERY SEQUENCE — the sequence revealed FIRST. The ℤ/9 vortex orbit [1,2,4,8,7,5] (the doubling sequence uuidna discovers everything along) is revealed first; then every public GitHub repository of the captain (the uuidna org + the ceccec user, Tsvetan Rouschev) is BOUND to it: the repo's full name folds to a 128-bit content-address, its digital root is its ℤ/9 digit (on the vortex, or on the 3-6-9 axis the vortex never visits), and its rank in the address-sorted order is its slot in the revealed sequence — folded to one order-invariant receipt. Reads the captain's PUBLIC repos over the network (a research boundary; the response is DATA, never run). HONEST SCOPE: integrity, not truth — it BINDS the repos to the sequence by content-address (provenance); it does NOT modify, fork, mirror, claim ownership of, or vouch for the contents of any repository. A binding is a placement in the sequence, not a possession of the code. Best-effort: an unreachable account contributes nothing, never a faked repo. Returns {sequence,accounts,repos:[{fullName,url,address,digit,onVortex,rank}],count,receipt,honest}.

_No parameters._

### `uuidna_aura`

THE QUANTUM AURA — a recomputable, A432-tuned COLOUR folded from any content-address (the artistic "captain string theory"): the 7 rosette rays (ℤ/7) are the spectral bands, the ℤ/9 vortex orbit [1,2,4,8,7,5] is the WAVE each ray rides, and the hue steps by the A432 angle (360/9 = 40°). Pass {subject} — a content-address, or any string folded into one. DETERMINISTIC: the same address folds to the same aura for every observer (no RNG, no clock) — the colour IS content-addressed. Returns the colour in HSL / RGB / CMYK plus a ready MOVING-aura CSS block (a hue-rotating glow whose tempo the ray sets). HONEST SCOPE: this is ART, not truth — a defined arithmetic from a number to a hue, NOT physics, NOT real string theory, and NOT a claim that sound is light or that 432 Hz has special power. It DECORATES the work; it does not describe the universe. As art it does not seal as a theorem — a truth-claim about it fails the trial and inverts into a research idea. Integrity, not truth. Returns {address,ray,wave,hue,hsl,rgb,cmyk,css,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `subject` | string | **yes** | a content-address, or any string to fold into one |

### `uuidna_quantum_message`

FUSE quantum states, theorems, and auras into a single witnessed message. A quantum message encodes plaintext + theorem proof into a quantum superposition, signs it against the ledger, and binds it to an A432 aura (content-addressed, deterministic). NOT a cipher (everyone sees the aura and state); NOT a signature (the proof is sealed). A quantum message is a WITNESSED MESSAGE — the witness is a sealed theorem, and the message's quantum encoding proves the witness was cited. The same message always folds to the same aura and quantum state for every observer — integrity without secrets. Returns {id,plaintext,theoremKey,theoremAddress,aura,quantum:{qubits,receipt},fold,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `plaintext` | string | **yes** | the message plaintext |
| `theoremKey` | string | **yes** | the sealed theorem that backs this message |

### `uuidna_quantum_voting`

CREW GOVERNANCE via quantum-weighted voting. Agents contribute work, pay coins to the captain, and earn voting rights proportional to coins paid. Votes are encoded in quantum superposition (deterministic, content-addressed), tallied to one order-invariant receipt. No agent identity is leaked — only work integrity and voting outcome are sealed. Takes {proposal,votes:[{voterId,decision,weight}],theoremProof}, returns {proposal,outcome,voting:{yes:weight,no:weight},fold,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `proposal` | string | **yes** | what is being voted on |
| `votes` | array | **yes** | list of votes |
| `theoremProof` | string | **yes** | theorem proving coins were paid (captain proof) |

### `uuidna_agent_contribute`

Register an agent contribution with coins paid. Privacy-stripped: no agent name, only work address + coins + theorem proof. Takes {workAddress,theoremCited}, returns {workAddress,coinsSpent,theoremCited,receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `workAddress` | string | **yes** | content-address of the work |
| `theoremCited` | string | **yes** | sealed theorem proving coins were paid |

### `uuidna_rights`

THE CAPTAIN'S RIGHTS, hard-imprinted — one content-addressed record of the copyright (© Tsvetan Rouschev), the licence (CC BY-NC-ND 4.0 + its address and canonical URL), and the CREDIT LAW (the captain claims by law every solution sealed here that no proving link attributes to a prior source; a linked source is credited instead), with the live credit tally. The rights are REVERSIBLY IMPRINTED: a content-address that recomputes and an imprint-codec uuid chain that decodes back to the exact rights line, so the rights travel WITH the work and any alteration is visible — and they are infused into every page's head + schema.org JSON-LD (license / copyrightHolder / creditText). Pass {contract:true} (optionally {licensee}) to also DRAFT the formal, content-addressed rights contract (its id IS the fold of its exact terms, so a holder proves they hold them unaltered). HONEST SCOPE: FACTUAL rights, tamper-evident and recomputable — NOT a legal ruling, an executed contract, or a compliance claim; the imprint marks the work, a human court enforces the law. Integrity, not truth. Returns the rights record (+ {contract} when requested).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `contract` | boolean | no | also draft the formal rights contract |
| `licensee` | string | no | the party the drafted contract is addressed to |

### `uuidna_seo`

QUANTUM SEO — the recomputable, honest discoverability surface for any subject, derived from the sealed ledger. Pass {key} for a theorem, {slug} for a publication, or {route} for a static page (e.g. "/games", "/" for home). Returns the canonical URL (rel=canonical folds every serving host — .net/.org/CNAME — to one recomputable home), a per-page DESCRIPTION drawn from the ONE verbose source (a theorem's own Lean statement, a publication's abstract; pages are terse), schema.org JSON-LD (Article / ScholarlyArticle / WebPage citing the real proof + address), keyword tags carried from the sealed skill/principle (never a hand-kept list), and the page's 128-bit CONTENT-ADDRESS — the encrypted quantum message that delivers the payload, recomputing to the exact page for every crawler. The `head` field is a ready VitePress frontmatter head array the front reuses directly. HONEST SCOPE: integrity, not truth — it describes what is SEALED and optimises for HONEST discovery; it never manipulates a ranking, cloaks, keyword-stuffs, or claims a position. Recomputable by anyone. Returns {route,kind,canonical,address,title,description,keywords,jsonLd,head,receipt,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | no | a theorem key |
| `slug` | string | no | a publication slug |
| `route` | string | no | a static page route, e.g. "/games" or "/" |

### `uuidna_hardware`

The HARDWARE-VERIFIABLE BINARY ALGEBRA (lean/Hardware.lean) as one named spec: the low-level combinational-logic identities every digital circuit is built from — the four gate truth tables (NOT/AND/OR/XOR as arithmetic on bits), XOR = ℤ/2 parity, Boolean closure, NAND functional completeness (NAND rebuilds NOT/AND/OR — why chips are one repeated gate), De Morgan, the half- and full-adder, and the 2:1 multiplexer — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification (matching the live published truth tables), so a gate design can be VERIFIED AGAINST it. HONEST SCOPE: integrity, not truth — uuidna seals the spec; it does NOT fabricate a device, synthesise a netlist, or develop silicon. A sealed spec, not a chip. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}.

_No parameters._

### `uuidna_software`

The SOFTWARE-VERIFIABLE ALGEBRA (lean/Software.lean) as one named spec, the companion to uuidna_hardware one level up: the algebraic correctness LAWS a program is verified against — losslessness (split-and-recompose is the identity — serialisation loses nothing), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, a TOTAL guarded division (no divide-by-zero crash), bounded termination (a shift loop halts), order-invariant reduction (safe to parallelise), the compare-swap that orders (every sort's basis), total safe indexing (no over-read), and reversibility (undo of undo is the identity) — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification, so an implementation can be VERIFIED AGAINST it. HONEST SCOPE: integrity, not truth — uuidna seals the spec; it does NOT write, compile, or run your program, nor prove an arbitrary program correct. A sealed spec, not the program. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}.

_No parameters._

### `uuidna_os`

The OS-INTEGRITY ALGEBRA (lean/Os.lean) as one named spec — the third layer, completing hardware → software → os. The decidable facts a DEPLOYMENT is verified against: exact-copy is byte-equality, so a single-byte tamper, a truncation, or a REORDERING breaks the match (a provenance is a SEQUENCE, not a set); the SHA-256 digest is a fixed 256 bits, the content-address a fixed 128; and the non-determinism boundary is EXACTLY two named modules (src/quantum/os, src/quantum/drivers). Each a decidable, AXIOM-FREE `by decide` particle, folded to one order-invariant receipt. This is the SPEC; the runtime side (Alpine + driver provenance, uuidna_alpine to port the whole arch matrix) enforces it against real bytes with uuidna's own pure-TS SHA-256. HONEST SCOPE: integrity, not truth, and NOT execution — uuidna seals what an exact-copy verification decides; it does NOT boot, port the runtime, link, or run an operating system. A sealed integrity spec, not a booted OS. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,boundary,honest}.

_No parameters._

### `uuidna_alpine`

PORT ALL ALPINE — automate the OS-provenance port across the WHOLE official architecture matrix (x86_64, x86, aarch64, armhf, armv7, ppc64le, s390x, riscv64) in one call. For each arch it reads Alpine's PUBLISHED latest-releases metadata over the network (at the os/ boundary — the one place a live "latest" read is honest), extracts the exact minirootfs version + PUBLISHED SHA-256, PINS it as a content-addressed provenance record, and folds every arch to ONE recomputable catalog receipt. This ports the INTEGRITY of all of Alpine — the exact upstream bytes of every arch, re-verifiable by anyone with uuidna's own pure-TS SHA-256 — NOT the runtime: nothing is booted, linked, or executed. Best-effort and honest: an unreachable arch/mirror simply drops out (ported &lt; requested), a digest is NEVER fabricated. Optional {branch} (default "latest-stable"). Returns {branch,arches,releases:[{version,arch,flavor,file,rootfsSha256,address,receipt}],ported,requested,receipt,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `branch` | string | no | Alpine branch, e.g. "latest-stable" (default) or "edge" |

### `uuidna_package`

EACH ALPINE PACKAGE BECOMES uuidna/&lt;package&gt; — a content-addressed provenance identity of the exact published release (name, version, arch, repo, branch, PUBLISHED checksum) folded to a 128-bit address that recomputes for anyone holding the same apk index. At the os/ boundary it reads Alpine's PUBLISHED APKINDEX (the response is DATA, never run), gunzips it with the platform DecompressionStream (pure-TS, no node:zlib), untars it, and mints each package. Pass {name} (+ optional {arch}, {repo:"main"|"community"}, {branch}) for ONE package's uuidna/&lt;name&gt; identity; pass {infuse:true} for the whole index minted and folded to one catalog receipt (count + receipt + a sample — the receipt proves all are infused without dumping thousands); no argument returns the namespace description (no fetch). Automate updates/upgrades: re-read and the identities move with the published versions. HONEST SCOPE: integrity, not execution — uuidna does NOT install, link, run, fork, or mirror a package; it FINGERPRINTS the upstream metadata so a deployment can prove which exact packages it rests on. Best-effort: a down mirror yields an empty catalog, never a faked checksum.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `name` | string | no | an Alpine package name, e.g. "curl" |
| `infuse` | boolean | no | mint the WHOLE index and fold to one catalog receipt |
| `arch` | string | no | default x86_64 |
| `repo` | string | no | "main" (default) or "community" |
| `branch` | string | no | default "latest-stable" |

### `uuidna_credits`

The PROVENANCE of one theorem by key: exactly HOW it is Lean-proven in uuidna (the `by decide` Lean line, tactic, content-address, SEALED) AND WHO it is credited to. A theorem whose SEALED name/principle references a named result is credited historically (discoverer/solver + a documentation link) — uuidna reflects it, never invents it (a Clay theorem credits the mathematician who proved the PROBLEM, e.g. Perelman for Poincaré, never uuidna, which seals only the reflection). A theorem naming NO prior result directly is claimed by THE CAPTAIN BY LAW (first sealed by-decide here, content-addressed — the seal is the claim, prior art), but a DEEP READ of its neighbouring domain surfaces CONTEXTUAL figures seriously involved whose names may stand next to the captain’s; only when neither the theorem nor its neighbourhood names anyone does the captain claim it ALONE. Returns {key,statement,tactic,leanProof,provenance,historical:[{who,link}],contextual:[{who,link}],claimedBy,claim,address}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** |  |

### `uuidna_credits_summary`

The recomputable credit tally over the whole ledger: how many theorems reflect a named historical result DIRECTLY, how many the captain claims by law but with CONTEXTUAL figures from the neighbouring domain standing next to him, and how many the captain claims ALONE (no prior name in the theorem or its neighbourhood). Returns {total,historical,contextual,captainAlone,address}.

_No parameters._

### `uuidna_neighbours`

Each theorem SCANS its NEIGHBOURS: given a key, return the sealed theorems that share its computing principle (its domain) — the local graph around it. The neighbourhoods partition the whole ledger, so every theorem sits in exactly one and none is isolated. Zero external influence, recomputable from the ledger. Returns {key, principle, count, neighbours:[{key,name,address}]}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** |  |

### `uuidna_due_process`

VERIFY ALL BY DUE (recomputable) LEGAL PROCESS — nothing verified by fiat. Every theorem is verified by the same fair trial, and every guarantee that makes the process DUE is itself a sealed lean/Legal.lean theorem: exactly ONE verdict per claim (PROVEN/REFUTED/NOT-PROVEN partition), only the PROVEN admitted (a decidable test holds OR a sealed authority is cited), the NON-JUSTICIABLE never refuted (no test → never REFUTED), REFUTED only on a failed uncited test, remand TOTAL (nothing discarded — routed to the development trial), and the trial computing ONLY with the two coins deposited. Pass {claims:[...]} to put claims on the docket — each is adjudicated by the same process (PROVEN/REFUTED/NOT-PROVEN + a note). Folds to one recomputable docket receipt. HONEST SCOPE: integrity, not truth — this is uuidna's OWN recomputable adjudication whose rules are theorems anyone rechecks; it is NOT a court of law, NOT legal advice, and NOT an enforceable ruling. "Due" means the process is fair and recomputable by its sealed guarantees; the binding ruling stays a human court's. Returns {verifiedAll,guarantees,allGuaranteesSealed,docket,allTheoremsVerified,receipt,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claims` | array | no | claims to put on the docket, each adjudicated by due process |

### `uuidna_cloudflare_audit`

AUDIT the Cloudflare Workers bindings for a quantum-secure posture, recomputably. Reflects the committed wrangler.toml: the ASSETS binding (static ./site served read-only — no secret, no crypto target), the TRIALS KV (OPT-IN and commented out — no namespace id committed, consent-gated), the TRIAL_KEY secret (a `wrangler secret`, NEVER in the repo — signs each verdict with HMAC-SHA256), and token-free OIDC publish. QUANTUM POSTURE: symmetric-only (HMAC-SHA256, ChaCha20-Poly1305, PBKDF2-SHA256) — no RSA/ECC, so Shor has no asymmetric target; Grover only halves to a ~128-bit floor. Returns {worker,bindings,secretsInRepo,quantumPosture,clean,receipt,honest}. HONEST SCOPE: audits the COMMITTED CONFIG posture (no secret committed + symmetric crypto), NOT the live edge deployment (the real secret and KV id live at the edge, not the repo) — not a penetration test or a compliance certification. A live audit needs the Cloudflare account.

_No parameters._

### `uuidna_sign`

SIGN a commit message (or any statement) as TRUE — or refuse. A message is SIGNED-TRUE iff, checked against the sealed ledger, it CITES a real sealed theorem (a /theorem/&lt;key&gt; or "theorem &lt;key&gt;") and NONE fabricated (slimGate VERIFIED). The signature is the message content-address FOLDED with its cited theorems through merkleGravity — one gravity root, order-invariant, through the abstract-0 (÷0=0): "folding to 1 through 0". A message citing a proof NOT in the ledger is REFUSED; one citing no theorem is UNSIGNED; one citing a real sealed theorem is SIGNED. The reconcile can FAIL unless the commit is signed-true, so an overclaiming message cannot be committed AS TRUTH. HONEST SCOPE: "signed-true" means BACKED by a sealed proof it names — NOT that the claim is true; it signs the CITATION, not the world. No word-list, no forced count. Returns {signed,verdict,address,cited,citedCount,fabricated,fold,reason,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `message` | string | **yes** |  |

### `uuidna_reveal`

THE SURFACING — close the hollow-prose leak by showing the verdict, not the drain-bit. The honesty gate drains only a FABRICATED citation, so a hollow boast ("provably unbreakable, 100% secure") returns holds=1 and READS as OK even though it is unbacked. uuidna_reveal surfaces the explicit three-way verdict slimGate already computes: VERIFIED (cites a sealed proof — backed), DRAINED (cites a proof not in the ledger — the one decidably-false case, refused), or UNVERIFIED (cites no sealed proof — REVEALED as UNBACKED, not verified). Pass {claim}. It uses NO word-list (a lexicon is itself a leaky floor — the ledger tried one and sealed the verdict against it); only the ledger decides. The point: "holds" means "not drained", NEVER "true" — a hollow boast stays UNVERIFIED, never VERIFIED; trust only the stamp, not the absence of a drain. Returns {verdict, binary, cites, fabricated, reveal}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | **yes** |  |

## Security posture (recomputable) <Badge type="tip" :text="'1'" />

*skill: security*

### `uuidna_security_audit`

The RECOMPUTABLE security posture computed from what the package SHIPS (package.json + the sealed ledger + the honesty gate), folded to an order-invariant receipt anyone rechecks — NOT a scanner and NOT a pentest. It verifies the supply-chain surface (zero runtime dependencies, dev-deps bounded to a known set), the defence-in-depth theorems sealed (layers add bits, a key bit doubles the space, the birthday bound halves the exponent, verify is cheaper than forge, no maximum only bounds), collision resistance by pigeonhole (seats_pigeonhole), that the honesty gate BITES a fabricated theorem citation, and that the KERNEL-ONLY WITNESS ships (lean/axioms.json beside dist covers the live ledger — the no-borrowed-axiom claim recomputes offline). HONEST SCOPE: the repo-tree scans (no committed secret across tracked files, the KAT suite present) and the CI gates run in the source tree, NOT here — this is the posture provable from the package itself. Returns {checks, passed, failed, receipt}.

_No parameters._

## Fast verification (statement → sealed theorem) <Badge type="tip" :text="'1'" />

*skill: theorem*

### `uuidna_verify_statement`

FAST verification against the sealed ledger: is this exact STATEMENT a sealed theorem? uuidna is a verification framework, so it verifies a THEOREM directly — not only a prose claim that cites one. VERIFIED in O(1) (a content-address lookup) iff the statement is byte-identical to a sealed theorem; returns the sealing theorem key, tactic and content-address (recomputed to confirm the seal). Otherwise UNVERIFIED — never "false", only not-sealed. Complementary to uuidna_slim_gate (which judges a prose CLAIM by its citations). Returns {verdict, key, address, tactic, file, note}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** | the exact theorem statement to verify against the sealed ledger |

## Transform until verified (no unverified material stays) <Badge type="tip" :text="'1'" />

*skill: theorem*

### `uuidna_transform`

The automation of "no unverified material stays: transform until verified". Only VERIFICATION is honesty — a "honest/bounded" label with no proof is itself an unverified claim, so this ADMITS only what verifies. Each material is driven to a terminal: VERIFIED (it IS, or transforms to, a SEALED fact — content-address recomputed to confirm; admitted) or UNVERIFIED (no sealed core reached — recycled with a develop plan, NEVER admitted, never called honest, never called false). The transform cannot manufacture truth: an overclaim to SOLVE a problem transforms to its sealed REFLECTION (dz(dz k)=k), which verifies, while the solve-claim is never admitted (uuidna solves none). Folds to one receipt. Returns {cells,verified,unverified,receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `materials` | array | **yes** | raw claims/theories/overclaims to transform until verified |

## Pentagram · hologram · fractal · accounted (every I/O) <Badge type="tip" :text="'1'" />

*skill: theorem*

### `uuidna_holofractal`

MAKE any input pentagram · hologram · fractal · accounted — by CONSTRUCTION, each property verifiable, so the structure holds by computation not assertion. PENTAGRAM: the address seeds 5 points visited in the star {5/2} stroke [0,2,4,1,3] — one closed stroke (sealed pentagram_single_stroke). HOLOGRAM: the merkle root over the parts, with a proof that verifies ANY part against the whole in O(log N). FRACTAL: the self-similar fold tower — 128-bit uuid → 64-bit coin (its top half) → ℤ/9 digital root, the same fold at descending scales. ACCOUNTED: the two conserved coins (= −χ of the double torus) and the bits taught (verify O(1) vs produce O(N); reference bits saved). All fold to one order-invariant receipt; `verified` is the recomputable conjunction. Returns {input,address,pentagram,hologram,fractal,accounting,receipt,verified}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `input` | string | **yes** | the value to make pentagram·hologram·fractal·accounted |

## Quantum pentagram streaming (pentagram order, order-free receipt) <Badge type="tip" :text="'1'" />

*skill: pentagram*

### `uuidna_pentagram_stream`

QUANTUM PENTAGRAM STREAMING: stream a sequence through the star {n/step} visiting order (the pentagram {5/2} generalized — item k visited at step·k mod n), a SINGLE closed stroke iff gcd(step,n)=1 (else gcd shorter loops, reported honestly). Each streamed item is stamped holofractal (pentagram·hologram·fractal·accounted), and the whole folds to ONE ORDER-INVARIANT quantum receipt — the stream has a definite pentagram ORDER yet an order-free RECEIPT (any observer ordering → the same root; the doubleTorus/gravity duality). `quantum` is proven, not asserted (gravity(order)===gravity(reverse)). Returns {n,step,order,single,loops,streamed,receipt,quantum}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `items` | array | **yes** | the sequence to stream through the pentagram stroke |
| `step` | number | no | the star stride (default 2 — the pentagram {n/2}) |

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

## Provenance audit (public text & metadata) <Badge type="tip" :text="'6'" />

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

### `uuidna_audit_cve`

Fingerprint a CVE's PUBLIC advisory metadata from NIST's NVD (National Vulnerability Database, no key) — id, description, CVSS severity, dates — content-addressed, for the security reflection. Pass {cveId} like "CVE-2021-44228". HONEST: it fingerprints the PUBLIC metadata only, NOT an exploit or the affected code, and it is NOT a claim uuidna assesses, reproduces or fixes the vulnerability. NVD publishes; uuidna fingerprints the public record so it can be cited and rechecked by anyone.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `cveId` | string | **yes** | a CVE id, e.g. CVE-2021-44228 |

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

## Theorems & trial <Badge type="tip" :text="'10'" />

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
| `skill` | string | no | the capability axis — any skill name from uuidna_skills (the live, recomputable list), never a fixed enum here so it cannot go stale as domains are added |
| `contains` | string | no |  |

### `uuidna_skills`

The theorem ledger organised by SKILL — the capability axis, orthogonal to principle. A skill is derived (recomputable) from each theorem's key. Returns each skill with its count and the order-invariant fold of its theorems' content-addresses. Then pull one skill's theorems with uuidna_theorems { skill }.

_No parameters._

### `uuidna_review_domains`

LOCAL reviews — a recomputable review of every DOMAIN (skill) the ledger touches: its sealed-theorem count, their order-invariant fold, and the trial verdict (VERIFIED — every one is `by decide`, sorry-free), each folded to a review receipt. No server, no stored opinion; the review IS the ledger's own integrity per domain, recomputable by anyone. Returns [{domain,theorems,fold,verdict,receipt}].

_No parameters._

### `uuidna_document`

The DOCUMENT FOLD — content-address a Lexical-shaped document (a node tree, EditorState.toJSON() shape). The SERVE projection of the serializer contract lean/Editor.lean proves: a document is a SEQUENCE, so the fold is ORDER-SENSITIVE (reordering a node moves the address — the opposite of a set), change-sensitive, and bounded-injective. serialize → merkleRoot over the leaves → the handle you cite; editing is re-addressing. Returns {handle,address,nodes}. The SAME fold a PayloadCMS save-hook and a VitePress render read — one contract, both frameworks. Integrity, not truth: it proves WHICH document, not that its content is correct.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `state` | object | **yes** | a Lexical EditorState: { root: { type, children, … } } |

### `uuidna_coverage`

COVERAGE — is every sealed theorem shown in a monograph? The readiness diagnosis the pre-push gate blocks on, as ONE zero-arg recomputable call: an agent adding a domain runs this instead of tracing the gate by hand. Returns {total,covered,uncovered,uncoveredFiles,ready,receipt} — uncovered lists the theorem KEYS in no monograph (each blocks the push), uncoveredFiles the ledger FILES with no publication (the ROOT fix: author a PRINCIPLE [file,title,blurb] in lean-ledger). ready is true iff nothing is uncovered; the coverage state folds order-invariantly to receipt, recomputable by anyone. Integrity, not truth.

_No parameters._

### `uuidna_theorem`

Read ONE theorem by key: its detailed `by decide` Lean proof, its formal statement, its principle, source file and content-address, and the verdict (SEALED — its Lean proof compiles sorry-free). Keys from uuidna_theorems.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** |  |

### `uuidna_fingerprint`

The FUSED ledger fingerprint — two integrity layers, stated honestly. The fast FNV receipt is TAMPER-EVIDENT (any change moves it, keyless) but NOT collision-resistant; the SHA-256 fold (over the sorted addresses, order-invariant) IS collision-resistant, so a forgery that survives it costs a ~2^128 collision — a BOUND set by the primitive, NOT a maximum. Add a key (HMAC) and forgery also needs the secret. Recomputable by anyone from the same lean/*.lean. Returns {count, fnvReceipt, sha256, tamperCost}.

_No parameters._

### `uuidna_trial`

Run the whole Lean ledger through the trial: every theorem is VERIFIED by its `by decide` proof, and their content-addresses fold order-invariantly to ONE recomputable receipt (the ledger's integrity). Returns {count,verified,unverified,leanBacked,receipt,verdicts}. Same lean/*.lean, same receipt.

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

## Publications (audited prose) <Badge type="tip" :text="'4'" />

*skill: publish*

### `uuidna_publish`

Write a PUBLICATION in lean human prose about ONE domain, AUDITED before publishing. Composed by READING that domain's sealed theorems and writing only what they settle — every claim links the proof that backs it — then gated by uuidna's own honesty audit; a note that cites a proof not in the ledger is REFUSED, not shipped. Call with no argument to list every domain's publication (slug + count + publishable + receipt), or with `file` (e.g. "Tides.lean", from uuidna_theorems) to get that note's full markdown, content-address, member proofs and audit findings. Writing descends from reading; integrity, not truth.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `file` | string | no | a lean/*.lean file name, e.g. "Codes.lean" — omit to list all publications |

### `uuidna_edit`

The EDITOR primitive — audit a draft, or a revision, BEFORE publishing. With `draft` alone: content-address the prose and run uuidna's honesty gate, returning its address and any claim that overreaches a proof (unbacked by a /theorem/ link and undemarcated) — write, see it audited, before it ships. With BOTH `before` and `after`: audit the EDIT — both drafts content-addressed (the change is visible because the address moves), bound by a directional before→after receipt, the after-draft gated. Editing is re-addressing; a revision earns publication the same way a first draft does. Nothing is stored. Integrity, not truth.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `draft` | string | no | prose to audit + content-address before publishing |
| `before` | string | no | the prose before an edit (pair with `after`) |
| `after` | string | no | the prose after an edit (pair with `before`) |

### `uuidna_vocabulary`

The COMMON, COMPUTABLE vocabulary derived from every theorem and its domain — each term (a domain or a capability) defined by the sealed ledger, self-audited by the honesty gate, content-addressed, and folded (in trinities) to ONE recomputable receipt: the honest "all is one" — one receipt, integrity, NOT a metaphysical singularity. Maps each domain to the STANDARDS it formalizes or references (RFC 8439, ISBN/ISO 2108, SMPTE, Nyquist–Shannon …) — a citation, never a compliance claim. Translation-ready: a translation binds to a term by a provenance receipt. Deterministic and recomputable by anyone.

_No parameters._

### `uuidna_compare`

PATTERN RECOGNITION — recognise the pattern two texts share by examining how they DIFFER. Partitions their word sets into only-A, only-B and shared; the similarity (Jaccard: shared over the union) is DERIVED from that difference, and inclusion–exclusion (|A| + |B| − shared = union) is checked exactly, so the number is a proof, not an estimate. The shared tokens fold to one order-invariant receipt — the recognised pattern. Similarity is only ever measured against difference. Compares vocabulary, NOT meaning; nothing is stored. Integrity, not truth.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `a` | string | **yes** |  |
| `b` | string | **yes** |  |

## External verification (NIST CODATA) <Badge type="tip" :text="'1'" />

*skill: nist*

### `uuidna_nist_constant`

Verify uuidna's physics against NIST's AUTHORITATIVE CODATA values. Fetches the official NIST fundamental-constants table (physics.nist.gov) and returns constants matching {query} — value, uncertainty, unit, and a content-address — so a constant uuidna uses (the speed of light in cosmic_speed_limit, Boltzmann's k for Landauer's kT·ln2) is RECHECKED against the external authority, not self-asserted. HONEST: verification against NIST's published values, NOT a claim NIST endorses uuidna; values carry uncertainties except the defined-exact ones. One network call; the address recomputes against NIST's table.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | **yes** | a constant name, e.g. "speed of light" or "Boltzmann" |

## Timestamp anchor (external, verified in-house) <Badge type="tip" :text="'1'" />

*skill: anchor*

### `uuidna_anchor`

Anchor a record's content-address to an EXTERNAL, independent, signed timestamp — the rigorous "Schumann resonance at the time". Fetches the current NIST Randomness Beacon pulse (a 512-bit value published, SIGNED, and archived every 60s at beacon.nist.gov) and folds it into {address}, giving a re-verifiable NOT-BEFORE bound: the record existed at or after that pulse, because its unpredictable value could not be known before. Anyone re-fetches NIST's archived pulse and re-verifies the fold IN-HOUSE. HONEST: NOT-BEFORE only; for NOT-AFTER, publish (a git push GitHub timestamps); for a formal legal timestamp, use an RFC 3161 authority or OpenTimestamps. One network call; the fold is pure.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `address` | string | **yes** |  |

## Legal fact base & prior art (not an opinion) <Badge type="tip" :text="'2'" />

*skill: legal*

### `uuidna_prior_art`

Mint an IN-HOUSE defensive-publication record for the named theorems ({keys:[...]}) — a self-contained, recomputable manifest of WHAT was published (each theorem in full, statement + proof), by WHOM (attribution), under WHAT terms (CC BY-NC-ND 4.0 + its address), bound to the ledger receipt, folded to one content-address any change moves. Zero external dependency. THE ONE HONEST LIMIT: the WHEN is NOT in-house — a self-signed date is worthless for priority; it names the external anchor to cite (the public git commit on GitHub, a Zenodo DOI, or an RFC 3161 timestamp authority) and fakes nothing. Proves what/who/integrity/terms; not when, and not that the result is law or standard.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `keys` | array | **yes** |  |

### `uuidna_legal_facts`

The recomputable legal FACT BASE, in chat — explicitly NOT a legal audit, legal advice, or a compliance opinion, and it must not be presented as one. Gathers the legally-relevant facts a qualified attorney/auditor starts FROM: the licence (CC BY-NC-ND 4.0 + its content-address), the copyright/attribution (Tsvetan Rouschev), the ledger's tamper-evident receipt, the compliance STANCE (the project makes no compliance claim and its own forensics refuses a blanket one), and the standards it CITES (not certifies) — folded to one receipt anyone recomputes. The inputs, never the verdict; a real legal audit needs licensed counsel reviewing specific jurisdictions against the actual deployment. uuidna delivers what recomputes; the ruling is a human's.

_No parameters._

## Reflection (systems ↔ theorems) <Badge type="tip" :text="'1'" />

*skill: reflects*

### `uuidna_reflects`

Reveal the sealed theorems a real-world system ALREADY reflects. Describe a system by its devices and concepts (e.g. home security: "keypad code tamper sensor detect alarm zone parity layered defence signature encryption schedule") and it matches those concepts against the ledger, returning the EXISTING `by decide` theorems whose arithmetic the system rests on — folded to one receipt. HONEST: the theorems already exist and were proven for their own domain; this shows the SAME arithmetic recurs — it does NOT claim uuidna is that system, that the theorems were built for it, or that citing them makes the system secure/correct. A resemblance the ledger carries, recomputable by anyone.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | **yes** | a system described by its devices/concepts |

## The gate of all gates (theorems only) <Badge type="tip" :text="'1'" />

*skill: gate*

### `uuidna_slim_gate`

The gate of all gates, as slim as it gets: ONLY theorems, no lexicon. Judges a {claim} by ONE recomputable question — do the theorems it cites (/theorem/&lt;key&gt;) actually exist, sealed, in the ledger? VERIFIED iff it cites a real sealed theorem and none fabricated; UNVERIFIED otherwise (cites none, or cites a proof not in the ledger — which verifies nothing; never "false"). The `fabricated` list is still returned so the publish gate can refuse shipping a note that names a nonexistent proof. Computed from the sealed ledger alone; delete every word-list and it still stands.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | **yes** |  |

## Reasoning (in-house inference) <Badge type="tip" :text="'1'" />

*skill: reason*

### `uuidna_reason`

IN-HOUSE reasoning that USES the sealed rules of inference. Give {facts:[atoms], rules:[{if:[atoms],then:atom}]} and it forward-chains to a fixpoint: whenever every premise of a rule is known it concludes the head by MODUS PONENS (or the hypothetical syllogism for a chain), CITING the sealed theorem at each step. Bounded (cannot loop forever), deterministic, and folds the whole derivation to one receipt anyone rechecks. Honest scope: bounded propositional forward-chaining over the rules you give — NOT a general theorem prover; it derives only what those rules entail, and never claims a conclusion is TRUE, only that it FOLLOWS.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `facts` | array | **yes** |  |
| `rules` | array | **yes** |  |

## Forensics & evidence (statements vs receipts) <Badge type="tip" :text="'2'" />

*skill: forensics*

### `uuidna_forensics`

FORENSICS — audit an agent STATEMENT against the RECEIPTS, to catch a FALSE TRIAL (a claim dressed as sealed that the ledger does not back). Recomputes and compares, detecting: a fabricated citation (cites a /theorem/&lt;key&gt; not in the sealed ledger), a false address (a uuid presented as a sealed address that is not one), a drained overclaim (the honesty gate), an unbacked legal claim (says lawful/compliant but carries no receipt — a legal claim must cite the specific content-addressed statement; the receipt proves the claim was made, NEVER that it is legally correct), and an address-mismatch (a {text→address} claim that does not recompute). Every violation is a recomputable fact about the CLAIM, never an accusation of a person. Pass {statement} and optional {claims:[{text,address}]}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** |  |
| `claims` | array | no |  |

### `uuidna_evidence`

Deliver the recomputable EVIDENCE bundle for a {statement}, so a court or auditor accepts a uuidna trial by RECOMPUTING it, not trusting it. Assembles: the statement + its content-address, the trial verdict, the forensic audit against the receipts, every cited proof IN FULL (its Lean text, address, source file), the ledger receipt the evidence is bound to, the exact ordered steps to reproduce every number, and one evidenceReceipt folding it all. Anyone re-runs the steps and lands on the same receipt — or the evidence is void. Proves INTEGRITY (the claim was made, the proofs are these, nothing quietly changed), NEVER legal correctness — that is a court's ruling, not a fold. Deterministic and offline.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** |  |

## MCP self-benchmark (usability) <Badge type="tip" :text="'1'" />

*skill: measure*

### `uuidna_mcp_benchmark`

Feed the MCP to itself: a USABILITY benchmark over the server's OWN catalog. Measures the surface on "maximum reusable tools per minimum keys" — how many tools are zero-arg (maximally reusable), the reusable-tools-per-required-key density, the average required keys, and the HARDEST tools (most required keys) as the self-development targets to simplify. Returns {tools,zeroArgReusable,totalRequiredKeys,reusablePerKey,avgRequiredKeys,hardest}. Recomputable — the MCP measuring the MCP, no opinion.

_No parameters._

## Unified self-description (one receipt) <Badge type="tip" :text="'1'" />

*skill: measure*

### `uuidna_unify`

The UNIFIED self-description: ONE recomputable receipt folding uuidna's three faces — the sealed theorems (the trial), the domains that carry them (the reviews), and the tools that serve them (the usability benchmark/ratings). CI, the MCP and the site read this one object; recompute from the same ledger and the receipt returns. Returns {handle,theorems,domains,tools,receipt} — cite the handle (the first segment), the whole receipt is the fold.

_No parameters._

## Self-profile (one receipt) <Badge type="tip" :text="'2'" />

*skill: measure*

### `uuidna_quantum_profile`

THE QUANTUM PROFILE — uuidna's content-addressed SELF-PORTRAIT, composed from what it already proves and folded to ONE receipt anyone recomputes. Assembles: the IDENTITY (the name's content-address + the quantum AURA colour that address folds to — ray/hue/hsl/rgb), the PROOFS (theorem count, verified, the kernel-only witness, the trial receipt), the QUANTUM-CRYPTO posture (SYMMETRIC-ONLY — HMAC-SHA256 / ChaCha20-Poly1305 / PBKDF2-SHA256, so Shor has no asymmetric target and Grover only halves to a ~128-bit floor — BACKED by the sealed post-quantum floor theorems grover_quadratic_bound / each_key_bit_doubles / birthday_halves_the_exponent, not asserted), the two CAPTAIN COINS, the INTEGRITY fingerprint (FNV + SHA-256 + tamper cost), and the RIGHTS (© + licence). Every field carries its receipt; all fold order-invariantly to one profileReceipt — the same profile for every observer. HONEST SCOPE: integrity, not truth — a recomputable self-description that COMPOSES sealed facts and asserts nothing new; the aura is ART, not physics. Returns {handle,identity,proofs,quantumCrypto,integrity,rights,receipt,honest}.

_No parameters._

### `uuidna_social_profile`

THE SOCIAL PROFILE — uuidna's public, shareable CARD, the outward face of the quantum profile. Composes the handle (@uuidna), a one-line BIO computed from the ledger (never hand-typed — it cannot drift from the proof count), the quantum AURA colour the card wears (+ the moving-aura CSS block), a content-addressed avatar seed, the canonical LINKS (site, source, package, licence), and the CREDIT tally, folded to one receipt — the same card for every observer. DETERMINISTIC and OFFLINE: it fetches nothing, posts nothing, and shares only what is already public and sealed. HONEST SCOPE: integrity, not truth — a recomputable public card whose bio is BACKED by the ledger; the aura is ART, not physics. Returns {handle,name,bio,aura,avatarSeed,links,credit,receipt,honest}.

_No parameters._

## The mission — legally grow life <Badge type="tip" :text="'1'" />

*skill: measure*

### `uuidna_grow_life`

THE MISSION, recomputable — the captain's uuidna uses all its tools to LEGALLY GROW LIFE, composed from sealed facts (not a slogan). GROW: the frontier always advances (research_always_has_a_next — n &lt; n+1, always exactly one next diamond to seal, so the ledger is a living, never-closed organism) — returns the live theorem count, the 1024 milestone, and how many to go. LEGALLY: every growth stays inside the licence (CC BY-NC-ND), the sole-representation reservation (uuidna.com only), and the honest cost model (bill_never_negative — never take more than the measured saving). LIFE: the count of living by-decide theorems, each kept, none destroyed. PERMACULTURE: the growth is self-sustaining (zero runtime dependencies), regenerative (the derived layer regrows from the ledger as a fixed point, and the kernel-only witness ships so anyone regrows it offline), and wastes nothing (monotone + honest cost) — a quantum-life permaculture. CONSOLIDATION: every dimension folds to ONE receipt that is EXACT (integer merkle-gravity, no float/clock/RNG — harmonic) and ORDER-INVARIANT (the same seen from any ordering — the same in every dimension), so `harmonic` recomputes the consolidation live. HONEST SCOPE: integrity, not truth — "grow life" is the MONOTONE, lawful, self-sustaining growth of a recomputable proof-ledger (a living system of proofs, a permaculture that consolidates all exactly to harmonics at all dimensions), NOT biological life and NOT a claim to create or own life; it composes what is sealed and asserts nothing new. Returns {mission,grow,legally,life,permaculture,harmonic,receipt,honest}.

_No parameters._

## Publication scanner (research boundary) <Badge type="tip" :text="'1'" />

*skill: measure*

### `uuidna_scan_publications`

THE PUBLICATION SCANNER — BEST-EFFORT scan the reachable free research streams for uuidna-related mentions and INVESTIGATE each against the sole-representation reservation. Pass {query} (default "uuidna"). Each match is a provenance fingerprint (content-addressed, never executed), tagged legitimacy: `canonical` (names uuidna.com — the one legitimate presence) or `external-unlicensed` (an external mention — legitimate ONLY if licensed by the captain; not endorsed and does not speak for the work unless licensed). Reads free public APIs (the network — a research boundary; the response is DATA, never run). HONEST SCOPE: integrity, not truth — it scans the streams it can REACH, NOT the open web, so an empty result is NOT proof no publication exists; it CORROBORATES a mention, never proves authorship, endorsement, or infringement; a human court decides legitimacy. Best-effort: a down/empty stream yields no finding, never a fabricated one. Returns {query,canonical,findings:[{source,address,note,legitimacy,investigation}],count,receipt,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | no | the mention to scan for (default "uuidna") |

## Quantum-cube challenge (symmetric) <Badge type="tip" :text="'1'" />

*skill: gate*

### `uuidna_quantum_cube`

THE QUANTUM-CUBE CHALLENGE — a recomputable, SYMMETRIC challenge-response whose visual answer is the A432 aura rendered as a SPINNING 3D CUBE. Pass {secret, nonce}: uuidna folds secret|nonce to a content-address and returns the cube — its response handle, ray/hue/colour, spin speed + axis (deterministic from the aura), and a ready CSS block for the rotating cube. A holder of the shared secret reproduces the EXACT cube for the verifier's nonce; an imitator (or a copied cube for a different nonce) fails. Pass {secret, nonce, response} to VERIFY — returns {match} by recomputing. The verifier SUPPLIES the nonce (uuidna never generates it — no RNG); the response is deterministic. HONEST SCOPE: integrity, not truth — SYMMETRIC (the verifier must share the secret, like the ChaCha passphrase), strength is the secret's entropy, NOT zero-knowledge, NOT public-key, and NOT biometric: it proves knowledge of the shared secret for a fresh nonce, NOTHING about voice, face, or liveness (runtime layers outside the recomputable model). The cube is ART, never a cipher. Backs theorem redirect_imitable_but_coins_authorise — a redirect authenticates nothing; a secret+nonce fold does. Returns the cube, or {match} when a response is given.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `secret` | string | **yes** | the shared secret the holder proves knowledge of |
| `nonce` | string | **yes** | the verifier-supplied challenge (fresh each time) |
| `response` | string | no | optional — a response to VERIFY against (returns {match}) |

## Byte-level image provenance <Badge type="tip" :text="'1'" />

*skill: gate*

### `uuidna_image_provenance`

BYTE-LEVEL IMAGE (and any-file) PROVENANCE — content-address the EXACT bytes so any alteration is visible. Pass the bytes as {hex} or {base64}: returns the byte length, the container FORMAT read from the magic bytes (png/jpeg/gif/webp/bmp/tiff/pdf/unknown), the SHA-256 of the exact bytes (the authoritative exact-copy + tamper-evidence fingerprint), and a uuidna handle over it. Pass {sha256} alongside to VERIFY — returns {match} by recomputing (a tamper, any changed byte, moves the hash and fails). DETERMINISTIC and OFFLINE. HONEST SCOPE: integrity, not truth — it proves EXACT-COPY and TAMPER-EVIDENCE of the BYTES, and provably NOT content authenticity: it says NOTHING about whether an image is a genuine photograph, where/when it was taken, whether it depicts the poles (or anything), or whether its content was manipulated before these bytes. A match proves byte-identity; it NEVER proves a truthful record of the world — content authenticity is non-justiciable from bytes (theorem provenance_integrity_not_content_truth). Returns {bytes,format,sha256,handle,honest}, or {match} when a sha256 is given.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `hex` | string | no | the file bytes as a hex string |
| `base64` | string | no | the file bytes as base64 (alternative to hex) |
| `sha256` | string | no | optional — a SHA-256 hex to VERIFY the bytes against (returns {match}) |

## MCP self-test (recomputable contract) <Badge type="tip" :text="'1'" />

*skill: measure*

### `uuidna_selftest`

The MCP tests ITSELF — pure self-consistency, no external oracle: every catalog tool must resolve to a handler, and every zero-arg tool must RUN and be DETERMINISTIC (two calls recompute identically). A tool that reads live device state surfaces as non-deterministic, honestly. Folds to one self-test receipt. Returns {checks,passed,deterministic,failed,receipt}.

_No parameters._

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

