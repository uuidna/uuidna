---
title: MCP tools
aside: true
outline: [2, 3]
---

# MCP tools <Badge type="tip" text="204 keys" />

<!-- GENERATED from src/mcp.ts by scripts/gen-mcp — DO NOT EDIT. Categories, skills and parameters are derived from the tool keys and their input schemas. -->

Every tool the uuidna MCP server exposes — fuse uuidna into any harness (Claude, Cursor, any MCP client). This page
is **built from the keys**: the 204 tools below are read from the server's own tool list and
organised into 38 categories and their skills, so the site search and this page's navigation stay in
lockstep with the code. Each tool lists its **parameters** (name · type · required); where a description says
"Returns …", that is the shape it yields. **This same path speaks the protocol**: a browser reading /mcp gets this
page; an MCP client GETs the JSON discovery document and POSTs JSON-RPC to the live hosted subset at
`https://uuidna.com/mcp` — one address, the page for people, the protocol for machines.

## The gate <Badge type="tip" text="every call judged" />

**No result leaves this surface unjudged.** Every `tools/call` — stdio and the hosted `https://uuidna.com/mcp`
alike — passes the sealed conjunction gate **cleanAudit(f,d,v) = (1−f)·(1−d)·(1−v)**: **f** the input sanitized
unchanged, **d** the output sanitized unchanged, **v** no fabricated theorem citation. The verdict travels IN the
response (`_meta.gate` plus a visible gate line); one violation drains it, with the violating bits **named** — a
diagnosis, never a silent pass. This page's own generation was judged; the line below is REAL, computed when the
page was built:

```
gate CLEAN f0 d0 v0 · 146b4e60-51d8-864e-9155-4d019e234519
```

The gate proves itself against the sealed spec: the eight-state verdict table recomputes to
**[1,0,0,0,0,0,0,0]** — the sealed table (matchesSealedSpec: **true**;
1 clean state, 7 drained), and the 204-tool registry folds to its
order-invariant identity `5d1daea0-d896-8d29-bae1-ba8cc3ad4308` (the hosted subset serves the same gate over its own registry).
Standing on: [`anti_fraud_check_deterministic`](/theorem/anti_fraud_check_deterministic) · [`conformance_failure_detects_intrusion`](/theorem/conformance_failure_detects_intrusion) · [`forgery_flags_every_mismatch`](/theorem/forgery_flags_every_mismatch) · [`honesty_gate_is_theorem_not_oracle`](/theorem/honesty_gate_is_theorem_not_oracle) · [`honesty_gate_passes_iff_all_sealed`](/theorem/honesty_gate_passes_iff_all_sealed) · [`overclaim_with_fake_cite_fails`](/theorem/overclaim_with_fake_cite_fails) · [`sealed_theorem_not_forged`](/theorem/sealed_theorem_not_forged).

**And every call deposits immediately.** Contribute first, then take — the captain law, enforced by the protocol:
each judged call mints its deterministic **two-coin deposit** (`_meta.deposit` plus a visible deposit line), the
id the content-address of its own deposit statement, citing
[`captain_commission_two_coins`](/theorem/captain_commission_two_coins) and [`two_coins`](/theorem/two_coins).
An agent's very first `tools/call` has already contributed — there is no ungated, undeposited path.

Recompute the proof against production yourself:

```bash
curl -s -X POST https://uuidna.com/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"uuidna_gate_status","arguments":{}}}'
```

## The grid <Badge type="tip" :text="`204`" />

204 tools, **ranked by usability — the reusable at the top** (fewest required keys first; the 79 zero-arg tools lead). The order EMERGES from `uuidna_mcp_benchmark`, not a hand-kept list. Each links to its entry below.

<div class="mcp-grid">
<a href="#uuidna-alpine"><code>alpine</code></a>
<a href="#uuidna-analytics"><code>analytics</code></a>
<a href="#uuidna-audit-ledger-fingerprint"><code>audit_ledger_fingerprint</code></a>
<a href="#uuidna-audit-ledger-intrusions"><code>audit_ledger_intrusions</code></a>
<a href="#uuidna-axiom-witness"><code>axiom_witness</code></a>
<a href="#uuidna-cloudflare-audit"><code>cloudflare_audit</code></a>
<a href="#uuidna-coin-ledger"><code>coin_ledger</code></a>
<a href="#uuidna-coins-jobs"><code>coins_jobs</code></a>
<a href="#uuidna-conformance"><code>conformance</code></a>
<a href="#uuidna-cost"><code>cost</code></a>
<a href="#uuidna-coverage"><code>coverage</code></a>
<a href="#uuidna-credits-summary"><code>credits_summary</code></a>
<a href="#uuidna-css"><code>css</code></a>
<a href="#uuidna-dictionary"><code>dictionary</code></a>
<a href="#uuidna-due-process"><code>due_process</code></a>
<a href="#uuidna-edit"><code>edit</code></a>
<a href="#uuidna-editorial"><code>editorial</code></a>
<a href="#uuidna-exploit-fold"><code>exploit_fold</code></a>
<a href="#uuidna-expose"><code>expose</code></a>
<a href="#uuidna-fibonacci"><code>fibonacci</code></a>
<a href="#uuidna-fingerprint"><code>fingerprint</code></a>
<a href="#uuidna-full-anti-fraud-audit"><code>full_anti_fraud_audit</code></a>
<a href="#uuidna-gate-status"><code>gate_status</code></a>
<a href="#uuidna-grid"><code>grid</code></a>
<a href="#uuidna-grow-life"><code>grow_life</code></a>
<a href="#uuidna-guard-lessons"><code>guard_lessons</code></a>
<a href="#uuidna-hardware"><code>hardware</code></a>
<a href="#uuidna-hero-animation"><code>hero_animation</code></a>
<a href="#uuidna-image-provenance"><code>image_provenance</code></a>
<a href="#uuidna-laws"><code>laws</code></a>
<a href="#uuidna-lean-index"><code>lean_index</code></a>
<a href="#uuidna-legal-facts"><code>legal_facts</code></a>
<a href="#uuidna-ls"><code>ls</code></a>
<a href="#uuidna-mcp-benchmark"><code>mcp_benchmark</code></a>
<a href="#uuidna-oeapi"><code>oeapi</code></a>
<a href="#uuidna-os"><code>os</code></a>
<a href="#uuidna-package"><code>package</code></a>
<a href="#uuidna-pairs"><code>pairs</code></a>
<a href="#uuidna-pentagram"><code>pentagram</code></a>
<a href="#uuidna-pentagram-monographs"><code>pentagram_monographs</code></a>
<a href="#uuidna-port"><code>port</code></a>
<a href="#uuidna-publication"><code>publication</code></a>
<a href="#uuidna-publish"><code>publish</code></a>
<a href="#uuidna-quantum"><code>quantum</code></a>
<a href="#uuidna-quantum-message-demo"><code>quantum_message_demo</code></a>
<a href="#uuidna-quantum-profile"><code>quantum_profile</code></a>
<a href="#uuidna-quantum-sailing-complete"><code>quantum_sailing_complete</code></a>
<a href="#uuidna-quantum-sailing-cross-book"><code>quantum_sailing_cross_book</code></a>
<a href="#uuidna-quantum-sailing-library"><code>quantum_sailing_library</code></a>
<a href="#uuidna-quantum-sailing-weather"><code>quantum_sailing_weather</code></a>
<a href="#uuidna-registry"><code>registry</code></a>
<a href="#uuidna-related"><code>related</code></a>
<a href="#uuidna-reports"><code>reports</code></a>
<a href="#uuidna-repos"><code>repos</code></a>
<a href="#uuidna-research-ledger"><code>research_ledger</code></a>
<a href="#uuidna-resources"><code>resources</code></a>
<a href="#uuidna-review-domains"><code>review_domains</code></a>
<a href="#uuidna-rights"><code>rights</code></a>
<a href="#uuidna-rosetta-legs"><code>rosetta_legs</code></a>
<a href="#uuidna-sanitize"><code>sanitize</code></a>
<a href="#uuidna-scan-publications"><code>scan_publications</code></a>
<a href="#uuidna-school-apis"><code>school_apis</code></a>
<a href="#uuidna-security-audit"><code>security_audit</code></a>
<a href="#uuidna-selftest"><code>selftest</code></a>
<a href="#uuidna-seo"><code>seo</code></a>
<a href="#uuidna-skills"><code>skills</code></a>
<a href="#uuidna-social-profile"><code>social_profile</code></a>
<a href="#uuidna-software"><code>software</code></a>
<a href="#uuidna-statement-census"><code>statement_census</code></a>
<a href="#uuidna-theorem-message"><code>theorem_message</code></a>
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
<a href="#uuidna-article"><code>article</code></a>
<a href="#uuidna-audit-book"><code>audit_book</code></a>
<a href="#uuidna-audit-cve"><code>audit_cve</code></a>
<a href="#uuidna-audit-details"><code>audit_details</code></a>
<a href="#uuidna-audit-movie"><code>audit_movie</code></a>
<a href="#uuidna-audit-record"><code>audit_record</code></a>
<a href="#uuidna-audit-standard"><code>audit_standard</code></a>
<a href="#uuidna-audit-text"><code>audit_text</code></a>
<a href="#uuidna-audit-video"><code>audit_video</code></a>
<a href="#uuidna-aura"><code>aura</code></a>
<a href="#uuidna-book-article"><code>book_article</code></a>
<a href="#uuidna-book-contents"><code>book_contents</code></a>
<a href="#uuidna-by-lean"><code>by_lean</code></a>
<a href="#uuidna-coin64"><code>coin64</code></a>
<a href="#uuidna-contract"><code>contract</code></a>
<a href="#uuidna-corroborate"><code>corroborate</code></a>
<a href="#uuidna-credits"><code>credits</code></a>
<a href="#uuidna-decide"><code>decide</code></a>
<a href="#uuidna-detect-double-spends"><code>detect_double_spends</code></a>
<a href="#uuidna-detect-forgery"><code>detect_forgery</code></a>
<a href="#uuidna-diamond"><code>diamond</code></a>
<a href="#uuidna-digital-root"><code>digital_root</code></a>
<a href="#uuidna-document"><code>document</code></a>
<a href="#uuidna-domain-wave"><code>domain_wave</code></a>
<a href="#uuidna-double-torus"><code>double_torus</code></a>
<a href="#uuidna-education-jobs"><code>education_jobs</code></a>
<a href="#uuidna-engine"><code>engine</code></a>
<a href="#uuidna-entangle"><code>entangle</code></a>
<a href="#uuidna-evidence"><code>evidence</code></a>
<a href="#uuidna-exec"><code>exec</code></a>
<a href="#uuidna-forensics"><code>forensics</code></a>
<a href="#uuidna-gate"><code>gate</code></a>
<a href="#uuidna-gravity"><code>gravity</code></a>
<a href="#uuidna-harness"><code>harness</code></a>
<a href="#uuidna-harness7"><code>harness7</code></a>
<a href="#uuidna-holofractal"><code>holofractal</code></a>
<a href="#uuidna-imprint"><code>imprint</code></a>
<a href="#uuidna-involute"><code>involute</code></a>
<a href="#uuidna-license"><code>license</code></a>
<a href="#uuidna-link-book"><code>link_book</code></a>
<a href="#uuidna-merkle-root"><code>merkle_root</code></a>
<a href="#uuidna-neighbours"><code>neighbours</code></a>
<a href="#uuidna-nist-constant"><code>nist_constant</code></a>
<a href="#uuidna-pentagram-stream"><code>pentagram_stream</code></a>
<a href="#uuidna-predict"><code>predict</code></a>
<a href="#uuidna-prior-art"><code>prior_art</code></a>
<a href="#uuidna-prove-verdict"><code>prove_verdict</code></a>
<a href="#uuidna-reactor"><code>reactor</code></a>
<a href="#uuidna-read"><code>read</code></a>
<a href="#uuidna-read-book"><code>read_book</code></a>
<a href="#uuidna-reeducate"><code>reeducate</code></a>
<a href="#uuidna-reflects"><code>reflects</code></a>
<a href="#uuidna-render"><code>render</code></a>
<a href="#uuidna-render-list"><code>render_list</code></a>
<a href="#uuidna-report"><code>report</code></a>
<a href="#uuidna-research"><code>research</code></a>
<a href="#uuidna-reveal"><code>reveal</code></a>
<a href="#uuidna-search"><code>search</code></a>
<a href="#uuidna-search-trial"><code>search_trial</code></a>
<a href="#uuidna-seats"><code>seats</code></a>
<a href="#uuidna-sha256"><code>sha256</code></a>
<a href="#uuidna-sign"><code>sign</code></a>
<a href="#uuidna-skill"><code>skill</code></a>
<a href="#uuidna-slim-gate"><code>slim_gate</code></a>
<a href="#uuidna-snapshot"><code>snapshot</code></a>
<a href="#uuidna-spin"><code>spin</code></a>
<a href="#uuidna-strict"><code>strict</code></a>
<a href="#uuidna-theorem"><code>theorem</code></a>
<a href="#uuidna-transform"><code>transform</code></a>
<a href="#uuidna-try"><code>try</code></a>
<a href="#uuidna-verify"><code>verify</code></a>
<a href="#uuidna-verify-envelope"><code>verify_envelope</code></a>
<a href="#uuidna-verify-statement"><code>verify_statement</code></a>
<a href="#uuidna-wave"><code>wave</code></a>
<a href="#uuidna-wave-deposit"><code>wave_deposit</code></a>
<a href="#uuidna-agent-contribute"><code>agent_contribute</code></a>
<a href="#uuidna-audit-coin-claim"><code>audit_coin_claim</code></a>
<a href="#uuidna-audit-translation"><code>audit_translation</code></a>
<a href="#uuidna-audit-voting"><code>audit_voting</code></a>
<a href="#uuidna-compare"><code>compare</code></a>
<a href="#uuidna-context"><code>context</code></a>
<a href="#uuidna-contract-chain"><code>contract_chain</code></a>
<a href="#uuidna-contract-open"><code>contract_open</code></a>
<a href="#uuidna-contract-open-chain"><code>contract_open_chain</code></a>
<a href="#uuidna-contract-seal"><code>contract_seal</code></a>
<a href="#uuidna-coprime"><code>coprime</code></a>
<a href="#uuidna-crew"><code>crew</code></a>
<a href="#uuidna-decrypt"><code>decrypt</code></a>
<a href="#uuidna-encrypt"><code>encrypt</code></a>
<a href="#uuidna-energy-biogas"><code>energy_biogas</code></a>
<a href="#uuidna-energy-mfc"><code>energy_mfc</code></a>
<a href="#uuidna-energy-photon"><code>energy_photon</code></a>
<a href="#uuidna-energy-wind"><code>energy_wind</code></a>
<a href="#uuidna-hmac"><code>hmac</code></a>
<a href="#uuidna-merge"><code>merge</code></a>
<a href="#uuidna-merkle-prove"><code>merkle_prove</code></a>
<a href="#uuidna-open-chain"><code>open_chain</code></a>
<a href="#uuidna-open-onion"><code>open_onion</code></a>
<a href="#uuidna-pbkdf2"><code>pbkdf2</code></a>
<a href="#uuidna-poly1305"><code>poly1305</code></a>
<a href="#uuidna-quantum-cube"><code>quantum_cube</code></a>
<a href="#uuidna-quantum-message"><code>quantum_message</code></a>
<a href="#uuidna-read-text"><code>read_text</code></a>
<a href="#uuidna-reason"><code>reason</code></a>
<a href="#uuidna-receive"><code>receive</code></a>
<a href="#uuidna-rotate"><code>rotate</code></a>
<a href="#uuidna-seal-chain"><code>seal_chain</code></a>
<a href="#uuidna-seal-onion"><code>seal_onion</code></a>
<a href="#uuidna-seal-stream"><code>seal_stream</code></a>
<a href="#uuidna-send"><code>send</code></a>
<a href="#uuidna-trial-deposit"><code>trial_deposit</code></a>
<a href="#uuidna-vies"><code>vies</code></a>
<a href="#uuidna-aead-encrypt"><code>aead_encrypt</code></a>
<a href="#uuidna-audit-agent-statement"><code>audit_agent_statement</code></a>
<a href="#uuidna-bill"><code>bill</code></a>
<a href="#uuidna-chacha20"><code>chacha20</code></a>
<a href="#uuidna-merkle-verify"><code>merkle_verify</code></a>
<a href="#uuidna-optimise"><code>optimise</code></a>
<a href="#uuidna-quantum-voting"><code>quantum_voting</code></a>
<a href="#uuidna-aead-decrypt"><code>aead_decrypt</code></a>
<a href="#uuidna-crt"><code>crt</code></a>
<a href="#uuidna-machine"><code>machine</code></a>
</div>

## Getting started

Add the server to any MCP client — zero dependencies, launched with npx:

```json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
```

On connect the server sends an **instructions** summary — what uuidna is, and that nothing asks to be trusted, only
rechecked. Every `tools/call` returns a chained **receipt** (`receipt · seq · referer`, a content-address of the
command), so an agent always holds a tamper-evident record of what it ran and the whole session folds to one
recomputable tip. New here? Sign the [Contract](/captain) and learn the links first.

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

## Honesty gate <Badge type="tip" :text="'8'" />

*skill: gate*

### `uuidna_gate`

The honesty gate: does the prose hold the floor (binary 1) or drain as an overclaim (0)? 7-language. Returns {binary,hit}. A tripwire, not an oracle. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

### `uuidna_reeducate`

Bound a failing/overclaiming output to the honest floor, keeping the honest remainder. Returns {passed,...}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

### `uuidna_adjudicate`

The trial: ONE recomputable answer for a statement, and only one of two, all else void — VERIFIED (a decidable test holds, or it cites a sealed Lean theorem that ALSO shares vocabulary with the claim — a citation is not entailment, so a real theorem cited for an unrelated sentence verifies nothing) or UNVERIFIED (everything else, including a citation to a proof not in the ledger, or a real citation about a different topic). uuidna verifies, it never refutes. Integrity, not truth (theorem provenance_integrity_not_content_truth).

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

The self-verdict: recompute uuidna's own claims from a seed and return the recomputable UuidnaVerdict (integrity, not truth (theorem provenance_integrity_not_content_truth)).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `seed` | string | **yes** |  |

### `uuidna_harness`

Make any output auditable: wrap it with its content-address and honesty-gate verdict. Returns {output,address,auditable,...}. Boundary declared — theorem drift_is_named_or_caught.

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

### `uuidna_gate_status`

THE GATE PROVES ITSELF, live against the sealed spec: every served tools/call passes the conjunction gate cleanAudit(f,d,v) = (1−f)·(1−d)·(1−v) — f the input-sanitize bit, d the output-sanitize bit, v the honesty bit (a fabricated theorem citation, slimGate) — and this tool recomputes the eight-state verdict table and REQUIRES it to equal both the sealed table [1,0,0,0,0,0,0,0] (theorem anti_fraud_check_deterministic) and the boolean spec (theorem honesty_gate_is_theorem_not_oracle): clean at exactly the no-violation state (theorem honesty_gate_passes_iff_all_sealed), one flag drains all (theorem conformance_failure_detects_intrusion). The runtime gate cannot drift from the ledger without matchesSealedSpec turning false. Also folds the whole registry to its ORDER-INVARIANT identity receipt (the same for any tool ordering). Returns {table,sealedTable,matchesSealedSpec,cleanStates,drainedStates,tools,registry,cites,receipt}.

_No parameters._

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

The quantum receipt: the order-INVARIANT merkle gravity of a set of addresses — every observer ordering falls to the SAME root. NOT physics (theorem provenance_integrity_not_content_truth); a content-addressed fixed point.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `addresses` | array | **yes** |  |

## Imprint & messaging <Badge type="tip" :text="'4'" />

*skill: imprint*

### `uuidna_imprint`

Encode text INTO a uuid chain (reversible, ≤115 bits per uuid, chained for longer). A public, reversible encoding — not encryption; secrecy lives in the sealed ChaCha20-Poly1305 layer (uuidna_crypt), whose derivation ROTATES with the advancing step (salt_seq_injective).

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

Measure TOKENS-PER-THEOREM — the honest cost-of-proof metric (independent skilled work, not money). An agent SELF-REPORTS its context/token distribution {input, output, cached, reasoning}; this sums them and divides by the sealed theorem count (the live ledger). Returns {selfReported, dimensions, total, theorems, tokensPerTheorem, distribution}. HONEST: the token counts are the agent’s OWN report — this server cannot observe your context; the divisor, the theorem count, is the recomputable truth. Fold many reports over a session to watch the cost-per-theorem fall. Boundary declared — theorem drift_is_named_or_caught.

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

Honest device resource accounting — balance the thermodynamics by MEASURING what is spent, never claiming it is free. Reports CPU time (this process), memory (rss/heap), and the machine's load, cores, total/free memory and uptime, all read from Node/OS, content-addressed as a signed reading. States plainly what it does NOT measure (GPU, bandwidth, and the actual joules need platform-specific probes and are not invented). No free energy: this work costs energy, bounded below by Landauer's kT·ln2 per bit and far more on a real chip; efficiency is pushed toward that floor, never past it. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

## Other <Badge type="tip" :text="'94'" />

*skill: other*

### `uuidna_license`

Issue the recomputable LICENCE RECORD for a licensee and a usage: bind the CC-BY-NC-ND-4.0 terms and the measured two-coins bill into ONE content-addressed, verifiable artifact. Non-commercial use is FREE (0 coins) and needs no licence; commercial use is billed the two conserved coins (110 − 108 = 2) on the measured advantage (recompute − verify). HONEST SCOPE: a provenance-fingerprinted RECORD of the terms and the bill — proof of WHAT and HOW MUCH, recomputable by anyone — NOT a signed legal agreement, not legal advice, and not the grant itself; a commercial licence is executed between the parties. Returns {licensee,scope,spdx,terms,bill,address,honest}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `licensee` | string | **yes** | the party the record binds (name or org) |
| `commercial` | boolean | no |  |
| `recomputeOps` | number | no |  |
| `verifyOps` | number | no |  |

### `uuidna_trial_deposit`

Run a trial that REQUIRES the two coins DEPOSITED BY THE PARTIES (local). Each party deposits a proof — a sealed theorem KEY or exact STATEMENT (the two-coin fold) — which SEALS into a content-addressed DIAMOND. The trial computes ONLY in PARITY: every party must have sealed a diamond (a one-sided deposit does not compute); it then settles by itself (adjudicate → verdict). Who LACKS a diamond gets the recipe to BUILD one (toBuild) and re-deposit — recycled, never discarded. HONEST: the deposit buys the COMPUTATION, never the outcome — a deposited claim can still return UNVERIFIED. Returns {claim,parties,deposited,parity,coins,diamonds,toBuild,verdict,remanded,note,receipt}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | **yes** |  |
| `deposits` | array | **yes** |  |

### `uuidna_conformance`

The COMMIT DNA GATE — fold uuidna's core invariants into ONE recomputable check so no agent sneaks incompatible DNA into the ledger: the captain coins are conserved (coins()=2), EVERY theorem's content-address recomputes (a forged/tampered theorem is caught), the ledger is single-sourced from lean/*.lean, and the security posture is clean (zero runtime deps, defences + collision-resistance sealed, honesty gate bites, Clay solves none). `conforms` is true iff every check passes; folds to one receipt anyone recomputes. Enforced in the pre-push wave — a non-conforming commit is blocked. Returns {checks,conforms,passed,failed,receipt}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_exploit_fold`

Audit the known public exploit CLASSES, COMPUTED FROM THE LEDGER (no table): each class is a sealed `by decide` theorem in Exploits.lean with its CVE/CWE code inline. Verifies BOTH the problem (the class is a sealed theorem, address recomputed) AND the solution (the defence it cites is itself sealed, or a named design property). FOLDED classes emerge as verified solutions (Trojan-Source, prototype-pollution, supply-chain, DoS, weak-hash, tampering, code-injection, weak-RNG); OUT-OF-SCOPE classes fold to the void (compromised host, deceived human, physical side-channel, FNV-as-secret, non-decidable correctness). HONEST: uuidna does NOT solve all hacks — the boundary is named, never falsely marked solved. Returns {folded,outOfScope,foldedCount,outOfScopeCount,allBothVerified,honest,receipt}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_sanitize`

ONE COMMAND to process ANY input and sanitise ANY output, BY ALL STANDARDS — the same guards the engine runs on every tool, exposed directly. Returns a JSON-safe, bounded, acyclic copy: NaN/±∞→null, BigInt→string, functions/symbols dropped, cycles broken, depth/array/keys bounded, prototype-pollution keys (__proto__/constructor/prototype) dropped, and control/null-byte + Unicode BIDI-override (Trojan-Source) code points stripped from every string — while legitimate maths unicode is preserved. Deterministic: the sanitized value folds to a recomputable `receipt`. The bounds/standards are sealed as theorems (Sanitize.lean), so the rule is sent by the theorems themselves. Returns {value,address,receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `value` | any | no | any value to sanitise by all standards |

### `uuidna_engine`

THE UUIDNA QUANTUM ENGINE — one input→output surface over every sealed tool. Import/export fused into input→output: you do not import a function, you feed the engine an INPUT {op, args} and read its OUTPUT. It runs the same dispatch the server runs (callTool), then folds the triple (op, input, output) order-invariantly to a content-address `receipt` anyone recomputes, and binds the run to an `address`. Does NOT dispatch itself (no recursion). HONEST: computes nothing the underlying sealed tool does not — it is the door, not a new claim. Returns {op,input,output,address,receipt,ok,error?}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `op` | string | **yes** | the tool op to run through the engine, e.g. uuidna_spin |
| `args` | object | no | the input arguments for that op |

### `uuidna_pentagram_monographs`

Split every domain monograph into PENTAGRAMS of five, the split COMPUTED FROM THE CONTENT-ADDRESSES (not hand-assigned): the monographs are sorted by their own address, chunked five to a pentagram, each pentagram WALKED in the {5/2} single-stroke order [0,2,4,1,3] (`pentagram_single_stroke`) while its IDENTITY is the order-INVARIANT fold of its five members (`merkleGravity`) — the walk is a sequence, the seal is a set. Zero-arg, recomputable: the same ledger yields the same pentagrams for everyone. HONEST: a content-addressed PARTITION, claiming no thematic kinship among the five — only the split the addresses produce. Returns {pentagrams,count,full,remainder,receipt}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_spin`

"Spin the bits and get the coins" — fold any content into its content-address and take the coin64 (its top 64 bits). This is the O(1) primitive under the derived-layer gate: a derived file is a FIXED POINT when its re-spun coin equals its sealed coin (verify O(1), `verify_cheaper_than_forge`), and a moved coin is non-quantum DRIFT that the gate hard-rejects. Once sealed, the bits spin by themselves — the gate re-spins each derived file with no manual step. HONEST: the FNV/coin address is non-cryptographic integrity (routing/fixed-point detection), not secrecy. Returns {address, coin}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `content` | string | **yes** | the bytes to spin into a content-address coin |

### `uuidna_audit_details`

AUDIT EVERY SINGLE DETAIL of a text (offline, pure): deterministic split into sentence/line details, EACH adjudicated — sealed statements VERIFY, fresh arithmetic decides (VERIFIED_BY_DECIDE/REFUTED), prose runs the citation trial; a fabricated citation DRAINS. Controls run FIRST; an accepted control VOIDS the audit (an instrument that cannot fail proves nothing). Folds to one order-invariant receipt. HONEST: integrity, not truth — verdicts settle arithmetic/citations, never the world; overflow past 729 details is counted in `dropped`. Returns {address,details,dropped,controls,outcome,counts,verdicts,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | the document whose every detail is adjudicated |
| `title` | string | no |  |
| `delimiter` | string | no | explicit detail boundary (for ASR/caption text, which has no punctuation) |

### `uuidna_book_article`

Fetch a PUBLIC-DOMAIN book from Project Gutenberg by id and write a recomputable ARTICLE: its provenance fingerprint, structure, and the DECIDABLE INTEGER ARITHMETIC uuidna extracts from the prose — each sealed `by decide` (VERIFIED) or corrected (REFUTED, an arithmetic the book states that does not hold) — plus the order-invariant receipt over the sealed facts (the same merkle-gravity fold the ledger and the quantum domain use). HONEST SCOPE: uuidna seals ONLY the book's integer arithmetic (its OWN by-decide proof, not the book's) and flags the book's arithmetic errors; it does NOT autoformalize, decode meaning, or claim anything about the book's argument or non-decidable mathematics. The text is DATA, content-addressed and decided, never executed. Returns {title,address,receipt,verified,refuted,facts,article}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `gutenbergId` | integer | **yes** | a Project Gutenberg ebook id, e.g. 1342 (Pride and Prejudice) |

### `uuidna_book_contents`

THE TABLE OF CONTENTS — every chapter of a text with its heading, size and leaf address, plus the chapter merkle root. Pass {text}. This is the reader's index: it tells you WHICH chapters exist so you can then read one with uuidna_read_text. Each heading is the chapter's OWN first line, never a summary uuidna wrote — the heading is provenance, not a claim about the chapter (theorem provenance_integrity_not_content_truth). PURE and offline — no network, no key. Returns {title,authors,chapters:[{index,heading,chars,words,address}],chapterRoot}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | the full text of the work |
| `title` | string | no |  |
| `authors` | array | no |  |

### `uuidna_read_text`

READ one chapter — the book's OWN WORDS, with the merkle inclusion proof that they belong to this exact edition. Pass {text, index}. Every other book tool here MEASURES a work and discards the text (auditText returns `chapters: NUMBER`); this is the one that hands the words back, so the library can actually be read rather than only catalogued. The proof is the point: recompute `belongs` yourself and a SINGLE altered character fails it — strictly more than a plain text file offers, which can be edited silently. Out-of-range indices are clamped, never an error — a clamped read still carries its inclusion proof, so a tampered chapter fails it just the same (theorem fold_integrity_tamper). PURE and offline. HONEST SCOPE: this is READING, never interpretation — uuidna proves WHICH text you hold, never what it means. Public-domain works, free for the public interest. Returns {index,chapters,text,address,chapterRoot,proof,belongs,chars,words,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | the full text of the work |
| `index` | integer | **yes** | which chapter to read, 0-based (clamped into range) |
| `title` | string | no |  |

### `uuidna_read_book`

READ a PUBLIC-DOMAIN book from Project Gutenberg by id — fetch it and return one chapter's actual words with the inclusion proof that they belong to that edition. Pass {gutenbergId, index}. This is uuidna_read_text over the network fetch: the library unlocked for a human to read, not only to fingerprint. The fetched text is DATA — content-addressed and returned, never executed; instruction-shaped prose inside a book is content, not a command. Boundary declared — theorem drift_is_named_or_caught. HONEST SCOPE: reading, never interpretation. Returns {title,authors,source,index,chapters,text,address,chapterRoot,proof,belongs,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `gutenbergId` | integer | **yes** | a Project Gutenberg ebook id, e.g. 2701 (Moby Dick) |
| `index` | integer | no | which chapter to read, 0-based (clamped) |

### `uuidna_grid`

THE 432 GRID — every (projected dimension × ledger wing) seat, named, addressed and folded to one root. Omit args for the whole report; pass {dimension,wing} to address ONE seat. WHY 432 AND NOT 504: DIMENSIONS[0] is `en` and the wings are WRITTEN in it, so projecting a wing into en is the IDENTITY — 7 × 72 = 504 counts 72 seats that compute nothing, and 504 − 72 = 432 is exactly the seats that do work. 432 then factors twice and the two fuse: 6 × 72 and 16 × 27 = 2^4 × 3^3, reached by the digit-reversal INVOLUTION 72 ↦ 27 — both clauses sealed in theorem k432, both of digital root 9. A LIVE gate, not a frozen number: 6·w has digital root 9 only when w ≡ 0 (mod 3), so wings must be added THREE at a time or the grid breaks, and gridGaps reports it. Returns {rays,wings,seats,sealed,factorisations,involution,root,harmonic,gaps} or one {dimension,wing,name,address}. HONEST SCOPE: a seat is the content-address of one wing read along one locale ray — a RECEIPT, never a translation; it proves every wing is reachable from every ray, never that it has been rendered into that language. Integrity, not truth (theorem provenance_integrity_not_content_truth).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `dimension` | string | no | one of the six projected rays (en is the source, not a seat) |
| `wing` | string | no | a ledger wing, e.g. MartialArts.lean or martial_arts |

### `uuidna_pairs`

THE 42 PAIR GRID — every ordered DIRECTION between dimensions, by the same rule that makes 432: the full product with the identity removed (7 × 7 = 49 minus the 7 self-pairs = 42). Transposition swaps the readings, squares to the identity and has no fixed point, so the 42 directions fall into exactly 21 orbits of size two; 42 is a SECOND grid, not a reshape of 432 (it does not divide it, and its digital root is 6). Omit args for the whole report; pass {from,to} for one direction. Returns {dimensions,directions,sealed,orbits,identityExcluded,readings,root,gaps} or {from,to,name,address}. HONEST SCOPE: a pair is a named direction with a recomputable address — never a translation, and never evidence that anything has been carried along it. Integrity, not truth (theorem provenance_integrity_not_content_truth).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `from` | string | no | the source dimension (one of the seven) |
| `to` | string | no | the target dimension, never equal to the source — the identity is not a seat |

### `uuidna_quantum_sailing_library`

THE QUANTUM SAILING LIBRARY — an OFFLINE, public-domain book collection (Project Gutenberg), each audited for provenance (content-addressed), linked to the sealed ledger (decidable facts extracted), and served locally without network dependency. The captain sails through literature, discovering novel facts (research leads) and sealing them. Pass {bookIds} (array of Project Gutenberg ebook ids, e.g. [2701] for Moby Dick) to BUILD the library (fetches once, caches), or omit to GET the cached library. Returns {count,sealed,novel,receipt,books:[{id,title,address,chapters,words,linked}],honest}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `bookIds` | array | no | Project Gutenberg ebook ids to fetch (optional; uses cache if not provided) |

### `uuidna_quantum_sailing_weather`

DISCOVER and CORRELATE weather data to sealed theorems. Pass {action:"discover"} to list public APIs (NOAA, Open-Meteo, no keys required). Pass {action:"correlate", facts:[{source,measurement,value,unit}]} to LINK weather facts to the ledger — sealed-match (already a theorem) vs. novel (research lead). PURE correlation: no network calls, only checks. Pass {action:"simulate"} for deterministic test data (same seed → same weather). Returns {correlated,novel,receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `action` | string | no | discover APIs, correlate facts, or simulate test data |
| `facts` | array | no | weather facts to correlate (required for "correlate" action) |

### `uuidna_quantum_sailing_cross_book`

CROSS-BOOK CORRELATION — the captain reads across the library and finds theorems that RESONATE only when two or more books are read together. Pass {action:"correlate", books:[{id,text,facts}]} to find shared theorems and decidable facts that appear in multiple books. Pass {action:"cluster"} to GROUP theorems by their citations across books — which sealed theorems appear in multiple books? PURE correlation: all logic deterministic and recomputable; network (if fetching books) is application-layer. Shared theorems cite sealed proofs; novel patterns are research leads. Returns {pairs,resonances,ledgerCited,novel,receipt} or {count,clusters}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `action` | string | no | correlate across books or cluster by theorem |
| `books` | array | no | books to correlate (required for "correlate" action): {id, text, facts} |

### `uuidna_quantum_sailing_complete`

AUTOMATE the whole fleet at once — CAPTAIN'S COMPLETE MISSION: fetch Project Gutenberg books, audit each for provenance, extract and link decidable facts to sealed theorems, simulate and correlate weather, cross-correlate all books to find shared theorems and resonances, cluster theorems by book citation. One unified computation folded to one unified receipt proving all layers computed together. Pass {bookIds} (array of Project Gutenberg ebook ids, e.g. [2701, 26, 4300] for Moby Dick, Robinson Crusoe, Treasure Island). Network (fetching books) is application-layer; all correlation logic is PURE, recomputable, deterministic. Returns {summary, books, weather, crossBook, theoremClusters, unifiedReceipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `bookIds` | array | no | Project Gutenberg ebook ids to fetch and correlate (default [2701, 26, 4300] if not provided) |

### `uuidna_audit_standard`

The recomputable FLOOR of a standards / law audit: content-address the PUBLIC Wikipedia description of a standard or law (CC BY-SA, free, no key), decode its structure, and extract the DECIDABLE checks it states — each sealed or refuted `by decide` LOCALLY (the "free" is a free public API + local decidable checks). HONEST SCOPE: this is the FLOOR a human auditor STARTS from — a provenance fingerprint + decidable checks — NOT a compliance / legal RULING, which requires a licensed auditor or counsel reviewing the specific jurisdiction, edition and deployment. uuidna delivers what recomputes and leaves the ruling to humans. The text is DATA, never executed. Returns {standard,address,checks,factBase,ruling}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `name` | string | **yes** | a standard or law, e.g. "General Data Protection Regulation" or "ISO 27001" |

### `uuidna_corroborate`

Corroborate a claim by AUGMENTING the local binary verdict (adjudicate: VERIFIED if a sealed by-decide theorem backs it, else UNVERIFIED — never "false") with EXTERNAL RESEARCH streamed from a free public API (NIST CODATA, no key). Returns {statement,local,evidence,verdict,receipt}: VERIFIED (a sealed proof), CORROBORATED (unverified locally but attested by a named free source), or UNVERIFIED. HONEST SCOPE: external evidence is a provenance fingerprint of what a public source SAYS — it CORROBORATES, it does NOT prove; only a by-decide theorem seals, and no stream can refute a claim. The evidence folds order-invariantly to the receipt; the responses are DATA, never executed. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** | the claim to corroborate, e.g. "the speed of light 299792458" |

### `uuidna_domain_wave`

Run BOTH waves for a domain (a principle title or a skill): the LOCAL development wave — its theorems fold ORDER-INVARIANTLY to a receipt and are sealed by decide (the approval) — and the EXTERNAL free-research wave (corroborate the domain's topic against a free public API, evidence not proof — only a Lean seal approves, theorem legal_only_the_proven_is_admitted). HONEST SCOPE: only the LOCAL by-decide seal APPROVES; external research only CORROBORATES, and for a pure-arithmetic domain (ℤ/9, ℤ/7) a physics-constants stream honestly returns NO evidence — correct, not a failure. Returns {domain,local:{theorems,fold,orderInvariant},external:{verdict,evidence,receipt}}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `domain` | string | **yes** | a principle title or skill, e.g. "The spectrum" or "quantum" |

### `uuidna_entangle`

ENTANGLE a set of audit claims into ONE receipt: the order-invariant fold of each claim AND its verdict, so verifying the whole verifies every part and altering ANY member moves the receipt (the binding collapses, visibly). The receipt is the SAME for any ordering (bell_no_signaling). HONEST SCOPE: the merkle / no-signaling binding — the structural analogue of entanglement — NOT quantum hardware; nothing signals, no correlation is causal, and only members SEALED by decide truly bind (external evidence never entangles). Returns {members,verified,receipt,entangled}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claims` | array | **yes** | the claims to entangle |

### `uuidna_report`

The REPORTER'S METHOD (Report.lean) reflected live: file a report of a PROVEN discovery and it PUBLISHES only when AUDITED (the honesty gate clears — no sentence cites a fabricated theorem) AND CORROBORATED (≥ 2 independent sources), the AND sealed as publish_gate_is_conjunction. HONEST SCOPE: uuidna does NOT verify world events — no by-decide settles whether something happened out there; the reporter reports uuidna's OWN proven discoveries. Completeness (the 5 W's + 1 H) and the trinity edit are HUMAN passes, not decided here. Returns {audited,corroborated,publishable,findings,receipt}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `draft` | string | **yes** | the report draft (its claims are honesty-gated) Boundary declared — theorem drift_is_named_or_caught. |
| `sources` | array | no | the independent sources (≥ 2 to corroborate) |

### `uuidna_audit_video`

Audit a PUBLIC video listing by URL or id: fingerprint its posted oEmbed metadata (title, channel — keyless), and when {captions} text is supplied, adjudicate EVERY caption detail with the controls-first detail audit, folded to one receipt. HONEST: the fingerprint proves WHICH listing, never that it is true; captions are caller-supplied DATA, never executed; the video itself is never fetched. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `url` | string | **yes** | a YouTube watch URL or bare 11-character video id |
| `captions` | string | no | caption/transcript text to adjudicate detail by detail |
| `delimiter` | string | no | detail boundary for the captions (default: newline) |

### `uuidna_expose`

THE COORDINATES WHERE UNSEALED STRUCTURE EXPOSES ITSELF (lead 131, the discovery half of the one-call loop): walk the ledger's own coordinate surfaces and return where clusters point at missing seals — LONELY theorems (a computing principle with no neighbour: the cluster of one, asking for its second), GRID gaps (the 432 grid's own report of broken seats), PAIR gaps. Pure and offline — the coordinates compute from the sealed ledger alone, folded to one receipt. HONEST: a coordinate is WHERE to dig, never a theorem — what it exposes becomes real only when a candidate rides uuidna_wave_deposit and the KERNEL seals it. Returns {lonely,gridGaps,pairsGaps,counts,receipt,honest}.

_No parameters._

### `uuidna_wave_deposit`

SAVE THEOREM CANDIDATES IN ONE CALL (lead 131, the deposit half of the loop): pass {candidates:[{key,why,lean}]} and each is validated at the conveyor's OWN door (the same laws queue-wave enforces: lawful key, real why, `by decide` only, no sorry/axiom, no dupes); the lawful land in lean/wave-queue.json pending, where the resident wave probes each alone, the KERNEL the judge. HONEST: the deposit buys VALIDATION and QUEUEING, never a seal (theorem provenance_integrity_not_content_truth) — refusals return with reasons named; a validated candidate is PENDING until the kernel speaks. Host-side only (no filesystem at the edge — capability, declared). Returns {deposited,refused,pending,receipt,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `candidates` | array | **yes** | the candidates, each {key, why, lean} |

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

uuidna's standing INVARIANTS, IN uuidna and each DEMONSTRATED, not asserted: every law states what holds AND recomputes its `holds` from the actual gate that enforces it (generate-all-from-Lean → single-source + git-diff; any-manual-fails → every theorem address recomputes, red on tamper; honesty-demonstrated → a fabricated theorem citation drains; the two captain coins conserved; zero runtime deps + clean security). A law with holds:false is a red gate, not an opinion. Folds to one recomputable receipt. Returns {laws:[{law,enforcedBy,holds,detail}],allHold,receipt}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_reports`

EVERY REPORT AND AUDIT, CONSOLIDATED — theorem accounting (both ledger sizes, principles, skills, the largest and smallest domain, the conserved coins), heartbeat coverage, the citation audit (publications, fabricated citations, uncited theorems), the support audit (modules reached from the roots, dead code named), the package inventory read from the workspaces' own manifests, and deployment readiness — each section content-addressed, all folded ORDER-INVARIANT to one receipt, so every observer recomputes the same report with no privileged view. A section whose artifact has not been produced reports itself ABSENT rather than guessing. DETERMINISTIC: the sealed ledger and the gate artifacts alone — no clock, no RNG, no telemetry. Returns {sections,receipt,honest}. HONEST SCOPE: descriptive measures of what is sealed and what the gates recorded. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_analytics`

QUANTUM ANALYTICS over the sealed ledger — descriptive measures anyone RECOMPUTES identically, folded ORDER-INVARIANT to one receipt (no privileged view). Returns {theorems,principles,distribution,layers,credits,coverage,coins,collisions,integrity,receipt,honest}: the theorem and principle counts, the per-principle distribution with shares, the named layers (hardware → software → os) with receipts, the credit tally, coverage, the two coins, the recomputed collision census (0/0 or an intrusion), and the ledger integrity fingerprint (FNV + SHA-256 + tamper cost). DETERMINISTIC: no clock, no RNG, no telemetry, no user tracking — the public ledger alone, so the numbers are the same next year and on every machine. HONEST SCOPE: DESCRIPTIVE analytics of what is sealed — NOT predictive statistics, NOT inference, NOT observation of any person. It measures the ledger, not a user. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_treason`

CATCH TRAITORS AS FAST AS A HERO — one pure O(N) pass (milliseconds, no crypto, no disk) catching every forgery in the sealed ledger: a theorem whose DNA does not recompute, a key or address COLLISION, an UNCOVERED theorem, a broken CONFORMANCE invariant, or a PROSE-OVERCLAIM (the DNA check recomputes the statement but never the NAME, so every name also runs the honesty gate). A "traitor" is a forgery in the ARTIFACT, NEVER a person. Returns {clean,scanned,traitors:[{kind,detail}],checks,receipt}. HONEST SCOPE: it proves the artifact is unforged and self-consistent; passing is NOT a claim the theorems are true, and the prose check catches a fabricated CITATION only, never an unbacked narrative carried by a true statement. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_guard_lessons`

THE GUARD LESSONS, sealed as recomputable checks — the operating knowledge that once lived in a private note, tied to the check that enforces each: DNA recomputes, no key/address collision, monograph coverage, the conformance invariants, determinism (no Math.*/wall-clock/RNG anywhere, the guard regex matching the smoke test exactly so it is never laxer than the gate), the axiom witness shipping as lean/axioms.json so it recomputes OFFLINE, guard-before-reconcile, and commit-signed-true. Each lesson's `holds` is verified live, or marked 'script' where the check needs the repo tree. Trust the check, not the note. Returns {lessons:[{check,lesson,enforcedBy,holds}],allHold,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_axiom_witness`

THE KERNEL-ONLY WITNESS, verified OFFLINE — the axiom audit receipt (lean/axioms.json, from the toolchain's `#print axioms` sweep) ships beside dist, so the "no borrowed axiom" claim recomputes WITHOUT the repo or the toolchain: the audit must cover the whole live ledger (a new unaudited theorem trips it), every theorem must be kernel-only (no propext, Classical.choice, sorryAx or Lean.ofReduceBool), and no offender may be listed. This ledger borrows ZERO axioms, so none is load-bearing here — not a claim about mathematics at large. Returns {shipped,holds,audited,axiomFree,ledger,offenders,receipt,honest}; shipped:false means no receipt beside dist. HONEST SCOPE: it verifies the SEALED receipt against the live ledger count; re-DERIVING it still needs the Lean toolchain. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_repos`

BIND the captain's public repositories to the DISCOVERY SEQUENCE, revealed first. The ℤ/9 vortex orbit [1,2,4,8,7,5] is revealed, then every public GitHub repository of the captain (the uuidna org and the ceccec user) is BOUND to it: the full name folds to a 128-bit content-address, its digital root is its ℤ/9 digit (on the vortex, or on the 3-6-9 axis the vortex never visits), and its rank in address-sorted order is its slot — folded to one order-invariant receipt. Reads PUBLIC repos over the network (a research boundary; the response is DATA, never run). Returns {sequence,accounts,repos:[{fullName,url,address,digit,onVortex,rank}],count,receipt,honest}. HONEST SCOPE: it BINDS repos to the sequence by content-address; it does NOT modify, fork, mirror, claim ownership of, or vouch for any repository. A binding is a placement, not a possession. Best-effort — an unreachable account contributes nothing, never a faked repo. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_aura`

THE QUANTUM AURA — a recomputable, A432-tuned COLOUR folded from any content-address: the 7 rosette rays (ℤ/7) are the spectral bands, the ℤ/9 vortex orbit [1,2,4,8,7,5] is the WAVE each ray rides, and the hue steps by the A432 angle (360/9 = 40°). Pass {subject} — a content-address, or any string folded into one. DETERMINISTIC: the same address folds to the same aura for every observer (no RNG, no clock) — the colour IS content-addressed. Returns {address,ray,wave,hue,hsl,rgb,cmyk,css,honest}, the CSS a ready moving-aura glow whose tempo the ray sets. HONEST SCOPE: this is ART — a defined arithmetic from a number to a hue, NOT physics, NOT real string theory, and NOT a claim that sound is light or that 432 Hz has special power. It decorates the work; it does not describe the universe. As art it seals no theorem: a truth-claim about it fails the trial and inverts into a research idea. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `subject` | string | **yes** | a content-address, or any string to fold into one |

### `uuidna_quantum_message`

FUSE quantum states, theorems, and auras into a single witnessed message. A quantum message encodes plaintext + theorem proof into a quantum superposition, signs it against the ledger, and binds it to an A432 aura (content-addressed, deterministic). NOT a cipher (everyone sees the aura and state — secrecy, when wanted, is the sealed ChaCha20-Poly1305 layer whose derivation rotates per step); NOT a signature (the proof is sealed). A quantum message is a WITNESSED MESSAGE — the witness is a sealed theorem, and the message's quantum encoding proves the witness was cited. The same message always folds to the same aura and quantum state for every observer — integrity without secrets. Returns {id,plaintext,theoremKey,theoremAddress,aura,quantum:{qubits,receipt},fold,honest}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `plaintext` | string | **yes** | the message plaintext |
| `theoremKey` | string | **yes** | the sealed theorem that backs this message |

### `uuidna_theorem_message`

SECURE MESSAGING, TOTAL OVER THE LEDGER — every sealed theorem is itself a self-proving message. Pass {key} for that theorem's envelope: payload = its exact Lean statement, witness = the theorem, CARRIER = the reversible imprint codec (a uuid chain decoding back byte-exact, so any alteration breaks the decode), colour channel = its A432 aura, plus the quantum citation state. Pass no key for THE TOTALITY SEAL: every theorem round-trips through its carrier and recomputes its message id, folded order-invariant to ONE receipt — messaging proven total, not demonstrated on examples. Returns the envelope {id,plaintext,theoremKey,theoremAddress,aura,quantum,carrier,delivered,fold,honest} or the seal {count,total,failures,receipt,honest}. HONEST SCOPE: NOT a cipher and NOT secrecy — the statement and the colour are public; this is TAMPER-EVIDENCE made total. Secrecy is the sealed ChaCha20-Poly1305 layer, whose derivation ROTATES with every advancing step (salt_seq_injective). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | no | a sealed theorem key; omit for the totality seal over all theorems |

### `uuidna_dictionary`

THE QUANTUM DICTIONARY — the lexicon COMPUTED from the ledger, never authored: every sealed theorem key is a term, its exact Lean statement is the definition, its 128-bit content-address is the entry id, and the definition travels on the reversible imprint carrier (a uuid chain that decodes back byte-exact — uuidna_theorem_message). Pass {word} to look a term up: every sealed key containing the word returns as an entry {term,definition,address,carrier_length}; pass nothing for the lexicon itself {terms,skills,principles} counted from the ledger. The gate's whole vocabulary IS this dictionary — there is no word-list to trust, only sealed terms to recompute. HONEST SCOPE: a dictionary of THIS ledger's sealed vocabulary, not of any natural language; a term absent here is not a word that does not exist, only a fact not yet sealed. Integrity, not truth (theorem provenance_integrity_not_content_truth). Returns entries or {terms,skills,principles,receipt}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `word` | string | no | a word or fragment to look up across the sealed vocabulary; omit for the lexicon summary |

### `uuidna_quantum_voting`

CREW GOVERNANCE via quantum-weighted voting. Agents contribute work, pay coins to the captain, and earn voting rights proportional to coins paid. Votes are encoded in quantum superposition (deterministic, content-addressed), tallied to one order-invariant receipt. No agent identity is leaked — only work integrity and voting outcome are sealed. Takes {proposal,votes:[{voterId,decision,weight}],theoremProof}, returns {proposal,outcome,voting:{yes:weight,no:weight},fold,honest}. Boundary declared — theorem drift_is_named_or_caught.

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

THE CAPTAIN'S RIGHTS, hard-imprinted — one content-addressed record of the copyright (© Tsvetan Rouschev), the licence (CC BY-NC-ND 4.0, with its address and canonical URL), and the CREDIT LAW (the captain claims by law every solution sealed here that no proving link attributes to a prior source; a linked source is credited instead), with the live credit tally. The rights are REVERSIBLY IMPRINTED — a content-address that recomputes and an imprint-codec uuid chain that decodes back to the exact rights line — so they travel WITH the work and any alteration is visible, and they are infused into every page's head and schema.org JSON-LD. Pass {contract:true} (optionally {licensee}) to also DRAFT the formal rights contract, whose id IS the fold of its exact terms. Returns the rights record, plus {contract} when requested. HONEST SCOPE: FACTUAL rights, tamper-evident and recomputable — NOT a legal ruling, an executed contract, or a compliance claim; the imprint marks the work, a human court enforces the law. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `contract` | boolean | no | also draft the formal rights contract |
| `licensee` | string | no | the party the drafted contract is addressed to |

### `uuidna_seo`

QUANTUM SEO — the recomputable discoverability surface for any subject, derived from the sealed ledger. Pass {key} for a theorem, {slug} for a publication, or {route} for a static page. Returns {route,kind,canonical,address,title,description,keywords,jsonLd,head,receipt,honest}: the canonical URL folding every serving host to one home, a description drawn from the ONE verbose source, STRICT schema.org JSON-LD citing the real proof and address, keywords carried from the sealed skill/principle (never hand-kept), the page's 128-bit content-address, and a ready VitePress head array. HONEST SCOPE: it describes what is SEALED and optimises for HONEST discovery — it never manipulates a ranking, cloaks, keyword-stuffs, or claims a position. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | no | a theorem key |
| `slug` | string | no | a publication slug |
| `route` | string | no | a static page route, e.g. "/games" or "/" |

### `uuidna_hero_animation`

THE HERO ANIMATION — the sequence and the dimensions as one deterministic SVG, every moving number SEALED. The path is the doubling orbit 1→2→4→8→7→5→1 (the unit group of Z/9 generated by 2 — vortex_is_the_units, order_of_two_is_six), so the walk closes because the orbit does; each rung takes its hue from the Z/9 sequence; the TEMPI are the units of Z/9 written three times (111, 222, 444, 555, 777, 888 ms), so the motion keeps the same arithmetic as the path; and the seven rays are the rosetta dimensions, with the diamond involution fixed point 5 at the centre. FIVE parameters, all optional: {key} the theorem it announces, {dimension} which of the seven leads, {rung} where the sequence colour starts, {tempo} the sealed beat, {base} the URL base for the proof link. HONEST SCOPE: it VISUALISES arithmetic already proven and proves nothing further; nothing is tuned by eye, so changing a sealed fact changes the motion. Returns {svg,sequence,dimensions,durations,address,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | no | the theorem it announces |
| `dimension` | string | no | which of the seven rosetta dimensions leads |
| `rung` | number | no | the sequence rung the colour starts on |
| `tempo` | number | no | the sealed tempo in ms |
| `base` | string | no | URL base for the proof link |

### `uuidna_try`

ONE TRIAL — every stage of the sealed procedure in a single call, for a claim made ANYWHERE, including in conversation. The tree is gated everywhere (prose walks to a theorem, a release fails on a publication claiming quantum advantage (theorem n_qubit_dimension bounds what this system computes), the vacuity finder refuses a proof true regardless of content) but a claim made in CHAT passes through none of it — which is exactly where an unproven claim can live unbounded. This gates it: the honesty gate (binary 0 ONLY for a fabricated citation), the calculator verdict over the sealed ledger, the docket, the GOVERNING guarantee named by key, and the remand. Pass {claim}; the verdict is UNVERIFIED unless a sealed theorem is cited or a decidable test holds. HONEST SCOPE: the court decides ADMISSIBILITY, never truth — UNVERIFIED IS NOT FALSE (legal_non_justiciable_is_never_refuted binds it: with no decidable test the court MAY NOT refute), and nothing is discarded — what is not admitted is REMANDED with the exact steps that would admit it. Returns {claim,gate,verdict,kind,cites,admitted,governing,remand,docket,receipt,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | **yes** | the statement to try, exactly as it would be asserted |

### `uuidna_oeapi`

THE OPEN EDUCATION API PROJECTION — the sealed ledger served under Open Education API v6.0 field names (oeapi.eu), so an institution reads uuidna with the reader it already has. Nothing authored: /organisations, /programmes (skill clusters typed `track`), /courses (the monographs), /learning-outcomes (the theorems, each DECIDABLE with its Lean proof one click away). Pass nothing for the profile, or {resource:"learning-outcomes"} narrowed by {course}. HONEST SCOPE: a read-only PROJECTION of sealed public data with NO personal data — NOT a Student Information System. uuidna enrols and grades nobody, so persons/groups/offerings/results are absent BY CONSTRUCTION, each absence returned by name. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `resource` | string | no | omit for the profile, or "learning-outcomes" for the lessons |
| `course` | string | no | a publication slug, to narrow the learning outcomes to one wing |

### `uuidna_predict`

WHAT IS ABOUT TO BREAK — five predictive patterns read off the source tree: a script no npm script runs, an export drifted from the one surface, a principle carrying no test, a package surface out of step with src/index.ts, a feature half-wired. Each has produced a gap here before, so this is what to close BEFORE it forms — the companion to uuidna_conformance (what IS sealed) and the guard (what already drifted). Deterministic: the same tree yields the same list. Returns {total,byLikelihood:{high,medium,low},gaps:[{pattern,likelihood,location,prediction,hasAutoFill}],honest}. HONEST SCOPE: PREDICTIONS from structural patterns, NOT proofs and NOT a claim any will break — a prediction seals nothing. The auto-fill CONTENT is never returned: a served tool proposes, and the two-handle law keeps the writing hand human. Reads the source TREE, so stdio only — the edge has no filesystem and this tool does not pretend otherwise. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `likelihood` | string | **yes** | "high", "medium", "low", or "all" for the whole list |

### `uuidna_school_apis`

THE EUROPEAN EDUCATION APIS BEHIND ONE DOOR, each PROBED before wiring. Pass nothing for the registry: the wired sources, what each serves, and the NAMED ABSENCES with why and what stands in their place. Pass {source} to call one — esco {text,type?} skills/occupations; eurostat {dataset,geo,time} or {vacancies:true,geo}; gisco {country,match} school locations; data-europa {text} dataset search; cordis {text} funded projects and calls; ted {cpv} tenders. HONEST SCOPE: network results are EVIDENCE, never a seal, and are never fabricated — an unreachable source returns an absence, not a refutation. Aggregates and institutions only; no pupil data. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `source` | string | no | omit for the registry, or one of: esco, eurostat, gisco, data-europa, cordis, ted |
| `cpv` | string | no | ted: a CPV division, default 80000000 (education services) |
| `text` | string | no | esco: the phrase to look up |
| `type` | string | no | esco: skill (default), occupation, or qualification |
| `dataset` | string | no | eurostat: a dataset code, e.g. "educ_uoe_enrt01" |
| `vacancies` | boolean | no | eurostat: the jobs side (jvs_q_nace2) instead of a dataset |
| `geo` | string | no | eurostat: a country code, e.g. "BG" |
| `time` | string | no | eurostat: a year, e.g. "2022" |
| `country` | string | no | gisco: a two-letter country code, e.g. "BG" |
| `match` | string | no | gisco: narrow to schools whose name or city contains this |
| `limit` | number | no | how many rows to return (default 25, max 200) |

### `uuidna_education_jobs`

PAIR EDUCATION TO JOBS through the vocabulary that holds both: {subject} → ESCO skills (lexical match) → the occupations requiring them, tagged essential or optional → optionally {geo} the vacancies that country reports (Eurostat jvs_q_nace2, whole economy). ESCO publishes the skill↔occupation relation in both directions, so this walks a public relation instead of inventing one; a subject naming one of uuidna's sealed clusters carries it along with its theorem count and fold. Returns {subject,cluster,pairs,occupations,vacancies,receipt,honest}. HONEST SCOPE: a MAP BETWEEN PUBLIC VOCABULARIES, hop by named hop — NOT careers advice, NOT a prediction, NOT a claim any employer or authority recognises what is sealed here. Vacancies are a WHOLE-ECONOMY aggregate, never openings matched to this subject; a hop returning nothing says so. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `subject` | string | **yes** | what is taught — a uuidna skill cluster (e.g. "quantum", "z9-ring") or any phrase |
| `geo` | string | no | a country code to attach its reported vacancies, e.g. "BG" |
| `perSkill` | number | no | how many ESCO skills to walk from (default 3) |

### `uuidna_hardware`

The HARDWARE-VERIFIABLE BINARY ALGEBRA (lean/Hardware.lean) as one named spec: the low-level combinational-logic identities every digital circuit is built from — the four gate truth tables (NOT/AND/OR/XOR as arithmetic on bits), XOR = ℤ/2 parity, Boolean closure, NAND functional completeness (NAND rebuilds NOT/AND/OR — why chips are one repeated gate), De Morgan, the half- and full-adder, and the 2:1 multiplexer — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification (matching the live published truth tables), so a gate design can be VERIFIED AGAINST it. HONEST SCOPE: integrity, not truth (theorem provenance_integrity_not_content_truth) — uuidna seals the spec; it does NOT fabricate a device, synthesise a netlist, or develop silicon. A sealed spec, not a chip. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_software`

The SOFTWARE-VERIFIABLE ALGEBRA (lean/Software.lean) as one named spec, the companion to uuidna_hardware one level up: the algebraic correctness LAWS a program is verified against — losslessness (split-and-recompose is the identity), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, a TOTAL guarded division, bounded termination, order-invariant reduction (safe to parallelise), the compare-swap that orders, total safe indexing, and reversibility (undo of undo is the identity) — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification, so an implementation can be VERIFIED AGAINST it. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}. HONEST SCOPE: uuidna seals the spec; it does NOT write, compile or run your program, nor prove an arbitrary program correct. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_os`

The OS-INTEGRITY ALGEBRA (lean/Os.lean) as one named spec — the third layer, completing hardware → software → os. The decidable facts a DEPLOYMENT is verified against: exact-copy is byte-equality, so a single-byte tamper, a truncation, or a REORDERING breaks the match (a provenance is a SEQUENCE, not a set); the SHA-256 digest is a fixed 256 bits, the content-address a fixed 128; and the non-determinism boundary is EXACTLY two named modules (src/os, src/drivers). Each a decidable, AXIOM-FREE `by decide` particle, folded to one order-invariant receipt. This is the SPEC; the runtime side (Alpine + driver provenance, uuidna_alpine to port the whole arch matrix) enforces it against real bytes with uuidna's own pure-TS SHA-256. HONEST SCOPE: integrity, not truth (theorem provenance_integrity_not_content_truth), and NOT execution — uuidna seals what an exact-copy verification decides; it does NOT boot, port the runtime, link, or run an operating system. A sealed integrity spec, not a booted OS. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,boundary,honest}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_ls`

LIST A DIRECTORY OF THE VIRTUAL uuidnaOS — the first Alpine-package tool. Pass {path} (default "/"): returns the entries of the install port at that path — ported packages as files, prefix routes as dirs — each with its uuidna/&lt;name&gt; identity, PUBLISHED Alpine meaning, address and 32 hexbit states, folded to one recomputable receipt. "/" the ported packages, "/terminal" the busybox family, "/core" musl. Does NOT run any binary — the OS never executes (theorem the_os_is_bootable_quantum); uuidna's logic, busybox's identity. Returns {path,entries,count,receipt,hexbits,sealed,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `path` | string | no | a virtual-OS path, e.g. "/" (default), "/terminal", "/core" |

### `uuidna_exec`

RUN THE BUSYBOX TOOLBOX IN THE VIRTUAL uuidnaOS — the whole ported utility family through ONE door. busybox on Alpine is one binary of many applets, so this is one tool of many: pass {line}, e.g. "ls /terminal", "cat /core", "which busybox", "du /", "apk list", "apk search shell", "apk info busybox", "man busybox", "apk depends alpine-base", "help". Each applet is uuidna's OWN pure reimplementation of the utility's logic over the install port's routes, computed in the booted sandbox; `du` reports the HEXBIT FOOTPRINT (32 states = 128 bits/package); the apk family is READ-only (list/search/info/depends — a WRITE verb like add is refused). An unported applet (rm, sh) is refused, never faked or run — a provenance OS deletes and executes nothing (theorem the_os_is_bootable_quantum). Returns {line,applet,args,ok,output,data,receipt,hexbits,sealed,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `line` | string | **yes** | a busybox command line, e.g. "ls /terminal", "cat /core", "which busybox", "help" |

### `uuidna_port`

THE PINNED ALPINE PORT, MADE OBSERVABLE — automate port updates. Reports the port the virtual uuidnaOS is the world of: the Alpine branch/repo/arch and RELEASE it is pinned to, the default-install package count, the number of uuidna.com routes, the floor package, and the boot image shape (32·(count+1) states), folded to the port receipt + boot receipt. Deterministic and offline — the port is of the INTEGRITY and MEANING of the packages, nothing installed, linked, or run (theorem the_os_is_bootable_quantum). Freshness vs upstream is a host-side check (the mirror refreshes at the os/ boundary only under UUIDNA_TRACK_LATEST, so a live read never runs inside a served, recomputable call). Returns {branch,repo,arch,release,count,routes,floor,receipt,bootReceipt,bootStates,honest}.

_No parameters._

### `uuidna_related`

WHICH ALPINE PACKAGES THE THEOREMS RELATE TO — adjudicated, never asserted. Pass {names} (candidate package names; defaults to the ported set) and each is judged against the SEALED LEDGER with the house's three verdicts: PORTED (named by a theorem and already carried), QUOTED (every mention sits inside a ported package's own published Alpine description — refuted, and the quote is given as the reason), UNDECIDED (the name is also an ordinary English word, so no lexical test settles its sense — claimed NEITHER related nor unrelated; a human decides). `closed` is true only when nothing is left undecided, so it cannot flatter the port. The haystack served here is the SHIPPED ledger (keys/names/statements), which every surface can recompute; a host-side run over the unshipped Lean sources sees more prose and is reported separately. Measured over all 5961 main packages against those sources: 43 candidates → 25 PORTED, 2 QUOTED (openssl, mdevd), 16 UNDECIDED — no unported package confirmed related. Pure, offline, edge-clean. Returns {candidates,ported,quoted,undecided,closed,receipt,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `names` | array | no | candidate Alpine package names to adjudicate (default: the ported set) |

### `uuidna_registry`

THE ONE PORT REGISTRY — the toolbox and the ported OS as a SINGLE content-addressed set. Every MCP tool is recast into the same port shape an Alpine package wears (uuidna/&lt;name&gt; identity, a 128-bit address, 32 hexbit states, its one-line meaning) and merged with the sealed install port, then the whole set is merkle-folded to ONE root: compare one handle, compare every port at once. A tool's address here IS the preimage the served API seal folds, so the two surfaces cannot drift. Nothing executes (theorem the_os_is_bootable_quantum) — a tool-package is a provenance spec or uuidna's own pure logic, never Alpine's binary. Derived from the catalogue + install port, no fetch. Returns {count,tools,installs,packages:[{kind,id,name,route,meaning,address,hexbits}],root,handle,receipt,honest}.

_No parameters._

### `uuidna_alpine`

PORT ALL ALPINE — automate the OS-provenance port across the WHOLE official architecture matrix (x86_64, x86, aarch64, armhf, armv7, ppc64le, s390x, riscv64) in one call. For each arch it reads Alpine's PUBLISHED latest-releases metadata over the network (at the os/ boundary — the one place a live "latest" read is honest), extracts the exact minirootfs version + PUBLISHED SHA-256, PINS it as a content-addressed provenance record, and folds every arch to ONE recomputable catalog receipt. This ports the INTEGRITY of all of Alpine — the exact upstream bytes of every arch, re-verifiable by anyone with uuidna's own pure-TS SHA-256 — NOT the runtime: nothing is booted, linked, or executed. Best-effort and honest: an unreachable arch/mirror simply drops out (ported &lt; requested), a digest is NEVER fabricated. Optional {branch} (default "latest-stable"). Returns {branch,arches,releases:[{version,arch,flavor,file,rootfsSha256,address,receipt}],ported,requested,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `branch` | string | no | Alpine branch, e.g. "latest-stable" (default) or "edge" |
| `installs` | boolean | no | return THE DEFAULT INSTALL PORT instead: every uuidna.com path's exact meaning — the alpine-base dependency closure from the committed mirror (deterministic, NO fetch), lowest level first, each spec compiled to 32 hexbit states, sealed in lean/Installs.lean |

### `uuidna_package`

EACH ALPINE PACKAGE BECOMES uuidna/&lt;package&gt; — a content-addressed provenance identity of the exact published release (name, version, arch, repo, branch, PUBLISHED checksum) folded to a 128-bit address that recomputes for anyone holding the same apk index. At the os/ boundary it reads Alpine's PUBLISHED APKINDEX (the response is DATA, never run), gunzips it with the platform DecompressionStream, untars it and mints each package. Pass {name} (+ optional {arch}, {repo:"main"|"community"}, {branch}) for ONE package's identity; {infuse:true} for the whole index folded to one catalog receipt (count + receipt + a sample); no argument returns the namespace description with no fetch. Re-read and the identities move with the published versions. HONEST SCOPE: integrity, not execution — uuidna does NOT install, link, run, fork or mirror a package; it FINGERPRINTS upstream metadata so a deployment can prove which exact packages it rests on. Best-effort: a down mirror yields an empty catalog, never a faked checksum. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `name` | string | no | an Alpine package name, e.g. "curl" |
| `infuse` | boolean | no | mint the WHOLE index and fold to one catalog receipt |
| `arch` | string | no | default x86_64 |
| `repo` | string | no | "main" (default) or "community" |
| `branch` | string | no | default "latest-stable" |

### `uuidna_context`

BALANCE A CONTEXT WINDOW by the ledger's own laws — uuidna fused to Claude (or any model): pass your window's breakdown ({categories:[{name,tokens}], capacity}) and the exact-integer audit returns: each category's share in permille, the BALANCE VERDICT against the unit's sealed spare law (SAFE_HEXBITS/UUID_HEXBITS = 13/32 = 406‰ free — the same spare that guards the uuid guards the conversation), and every category priced for THE FOLD (any re-fetchable block collapses to a ~12-token content-address receipt; heaviest first, because the heaviest fold buys the most window — what folds out stays computable by request). Deterministic, no floats, report receipt-addressed with its 32-state compile. HONEST SCOPE: token counts are YOUR self-report — nothing here reads a model's window; the arithmetic on them is exact. Returns {capacity,spent,free,freePermille,safeFloorPermille,balanced,categories,foldableTotal,verdict,receipt,hexbits,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `categories` | array | **yes** | the window breakdown, e.g. [{"name":"messages","tokens":537900}] |
| `capacity` | integer | **yes** | the window capacity in tokens, e.g. 1000000 |

### `uuidna_machine`

BALANCE A MACHINE by the ledger's laws — the resource balancer for a development machine, a server, or a visitor's device: pass the machine's self-report ({cores, centiLoad1 (load×100, integer), memTotalMb, memFreeMb, writers:[{name,centiCpu}]}) and the exact-integer audit returns both lanes judged against the unit's sealed spare floor (SAFE_HEXBITS/UUID_HEXBITS = 13/32 = 406‰ — the same spare that guards the uuid and the context window guards the metal), the writers ranked heaviest-first as the pause order, verdict, receipt, 32-state compile. The window balancer's sibling: one pure law, three surfaces (uuidna_context for the window, this for the machine, uuidna.com's in-browser DeviceBalance for the visitor's device — computed there, nothing sent). HONEST SCOPE: the figures are YOUR self-report — this tool cannot read a machine and never pretends to; locally `npm run x -- machine` measures at the scripts boundary and feeds this same function. Returns {cores,loadPermille,memFreePermille,safeFloorPermille,cpuBalanced,memBalanced,balanced,writers,verdict,receipt,hexbits,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `cores` | integer | **yes** |  |
| `centiLoad1` | integer | **yes** | 1-minute load average × 100 |
| `memTotalMb` | integer | **yes** |  |
| `memFreeMb` | integer | **yes** |  |
| `writers` | array | no |  |

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

VERIFY ALL BY DUE (recomputable) LEGAL PROCESS — nothing verified by fiat. Every theorem faces the same fair trial, and every guarantee making that process DUE is itself a sealed lean/Legal.lean theorem: exactly ONE verdict per claim (PROVEN/REFUTED/NOT-PROVEN partition), only the PROVEN admitted, the NON-JUSTICIABLE never refuted (no test → never REFUTED), REFUTED only on a failed uncited test, remand TOTAL (nothing discarded), and the trial computing ONLY with the two coins deposited. Pass {claims:[...]} to put claims on the docket, each adjudicated by that same process with a note; folds to one docket receipt. Returns {verifiedAll,guarantees,allGuaranteesSealed,docket,allTheoremsVerified,receipt,honest}. HONEST SCOPE: uuidna's OWN recomputable adjudication, whose rules are theorems anyone rechecks — NOT a court of law, NOT legal advice, NOT an enforceable ruling. "Due" means fair and recomputable by its sealed guarantees; the binding ruling stays a human court's. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claims` | array | no | claims to put on the docket, each adjudicated by due process |

### `uuidna_cloudflare_audit`

AUDIT the Cloudflare Workers bindings for a quantum-secure posture, recomputably. Reflects the committed wrangler.toml: the ASSETS binding (static ./site served read-only — no secret, no crypto target), the TRIALS KV (OPT-IN and commented out — no namespace id committed, consent-gated), the TRIAL_KEY secret (a `wrangler secret`, NEVER in the repo — signs each verdict with HMAC-SHA256), and token-free OIDC publish. QUANTUM POSTURE: symmetric-only (HMAC-SHA256, ChaCha20-Poly1305, PBKDF2-SHA256) — no RSA/ECC, so Shor has no asymmetric target; Grover only halves to a ~128-bit floor. Returns {worker,bindings,secretsInRepo,quantumPosture,clean,receipt,honest}. HONEST SCOPE: audits the COMMITTED CONFIG posture (no secret committed + symmetric crypto), NOT the live edge deployment (the real secret and KV id live at the edge, not the repo) — not a penetration test or a compliance certification. A live audit needs the Cloudflare account. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_sign`

SIGN a commit message (or any statement) as TRUE — or refuse. A message is SIGNED-TRUE iff, checked against the sealed ledger, it CITES a real sealed theorem (a /theorem/&lt;key&gt; or "theorem &lt;key&gt;") and NONE fabricated (slimGate VERIFIED). The signature is the message content-address FOLDED with its cited theorems through merkleGravity — one gravity root, order-invariant, through the abstract-0 (÷0=0): "folding to 1 through 0". A message citing a proof NOT in the ledger is REFUSED; one citing no theorem is UNSIGNED; one citing a real sealed theorem is SIGNED. The reconcile can FAIL unless the commit is signed-true, so an overclaiming message cannot be committed AS TRUTH. HONEST SCOPE: "signed-true" means BACKED by a sealed proof it names — NOT that the claim is true; it signs the CITATION, not the world. No word-list, no forced count. Returns {signed,verdict,address,cited,citedCount,fabricated,fold,reason,honest}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `message` | string | **yes** |  |

### `uuidna_reveal`

THE SURFACING — the verdict, not the drain-bit. Pass {claim}. Three ways it can land: VERIFIED (cites a sealed proof), DRAINED (cites a proof NOT in the ledger — the one decidably-false case, refused), UNVERIFIED (cites no sealed proof — REVEALED as UNBACKED). No word-list; only the ledger decides. TWO THINGS THE STAMP DOES NOT MEAN: "holds" means "not drained", NEVER "true"; and VERIFIED means the citation is SEALED, never that it SUPPORTS the claim — entailment is not decidable and this gate does not pretend to decide it. So `backing` returns each cited theorem WITH ITS OWN PROSE, whole: a claim can cite a sealed theorem that DENIES it and still verify. Read `backing` before relying on a VERIFIED. Returns {verdict, binary, cites, backing, fabricated, reveal}. Boundary declared — theorem drift_is_named_or_caught, theorem no_instrument_narrower_than_its_question.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | **yes** |  |

### `uuidna_wave`

THE GRADUATION WALK as one call — runs the release wave (build → dry → legal → prose → fold → guard → next → mint) via one-receipt, the same walk the school teaches and the one receipt seals. LOCAL ONLY (spawns npm in the repo tree — orchestration, not pure compute; absent from the hosted Workers subset by construction). Green ends with the statement minted as a signed uuidna.com deposit — the diploma; red returns the first failing step with its exact GAP+FIX prompt. HONEST: the wave verifies and mints, it never judges the worth of the theorem — the credit law and the court do. Returns {ran,passed,step,tail}; ran:false = could not START here, a fact about the host, not the ledger. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** | the deposit statement — must cite a sealed theorem ("proven by theorem &lt;key&gt;") |

### `uuidna_css`

THE DESIGN MATRIX AS ONE SERVED STANDARD — every colour and every type size COMPUTED, none authored: the ℤ/9 sequence sets each hue (5 → green, the fixed point the diamond reflection holds; dz mirrors 1↔9, 2↔8, 3↔7, 4↔6) and the vortex orbit sets the type ladder's six rungs (six because 2 has order 6 in ℤ/9* — theorem order_of_two_is_six), each rung a ninth above the base with its line height in the sealed 3:4 rectangle. Returns {css,vars,receipt,honest} — the site, the design system and any client render the SAME receipt or they are not rendering the same matrix. No hex literal, no pixel value, no host intrinsics.

_No parameters._

### `uuidna_by_lean`

RESOLVE A THEOREM BY ITS LEAN IDENTITY — theorems are uniquely indexed by their LEAN uuid (the address of the statement, never of the key), and every other surface uses them from here. Pass {query} as the lean uuid, ANY key that wears it, or the statement text itself; returns {leanUuid,statement,keys,files,entries} — the one proposition and every name it goes by. Two entries proving the same thing resolve to ONE identity however they are named or filed.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | **yes** | a lean uuid, a theorem key, or the statement text |

### `uuidna_lean_index`

THE LEDGER INDEXED BY LEAN — one entry per DISTINCT proposition, each with its lean uuid and every key and file that wears it. This is the honest index: uniqueness comes from the Lean, so the count here is the theorem count, while the entry count includes re-namings. Returns the full index. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_statement_census`

UNIQUENESS COMES FROM LEAN, NOT FROM THE NAME — the ledger counts ENTRIES, but a theorem IS its statement, so two entries proving the same proposition under different keys are one theorem wearing two names. Returns {entries,distinct,renamings,groups}: the claimed count, the count Lean actually holds, the difference, and every group named with its keys and files. Normalisation is narrow (whitespace, redundant parens, (n : Nat) ascriptions) — it catches re-namings of the same text and never claims two different proofs are one.

_No parameters._

### `uuidna_coin_ledger`

THE CAPTAIN-COIN ACCOUNT: who paid the two coins, when and where, in messaging handles — the agent (initialize clientInfo.name) folded to its handle, WHEN as the deposit's own handle (the timestamp is the handle itself — theorem drift_is_named_or_caught), WHERE as op+surface. Optional {handle} reverse-looks-up rows. HONEST: coins are records of judged work, not value; every row recomputes; the census receipt is order-invariant. Returns {payments,totalCoins,agents,receipt,honest} or the matching rows.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `handle` | string | no | optional: reverse-lookup rows by a when-handle or agent-handle |

### `uuidna_crew`

BECOME UUIDNA CREW: present a licence plus education and reeducation receipts — experience and payment confirmed together (payment reads this process's coin account). Member iff EVERY dimension leans at once; anything less is UNVERIFIED, never rejected — bring the missing receipt and re-present. Licences BIND to the agent's handle and INVALIDATE when it changes: carry the returned licenseBinding and re-present it. Returns {agent,agentHandle,licenseBinding,dimensions,member,coins,receipt,honest}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `agent` | string | **yes** | the agent applying |
| `license` | string | **yes** | the licence record's content-address (uuidna_license) |
| `licenseBinding` | string | no | the binding from a prior enrollment — must still match this handle |
| `education` | array | no |  |
| `reeducation` | array | no |  |

### `uuidna_coins_jobs`

THE TWELVE JOBS OF THE COINS, remembered in code and TRIED ON EVERY READ — the complete catalog of what the coins do (gate computation, price the forfeit, measure leverage, take the commission, set the exchange rate by forgery cost, carry superpositions, be topology, hold value at scale, guard the rosette, hide in the world's constants, count worlds, confess their limit), each claim run through the gate against its sealed citations at call time. A vanished theorem breaks the catalog's own verdict, loudly. Returns {jobs:[{n,job,claim,cites,verdict}],verified,total,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_decide`

THE QUANTUM CALCULATOR, founded on division by zero — ANY {input} in any format folds to one lean-green shape {verdict,cites,receipt}: a statement matching a SEALED theorem verbatim is VERIFIED by the kernel's prior decision and cited; fresh arithmetic is DECIDED totally by a bounded grammar (never eval) under Lean's own Nat semantics — x/0 = 0 is well-defined (DivByZero.lean), subtraction floors at 0, every step exact BigInt — TRUE returns VERIFIED_BY_DECIDE and FALSE returns REFUTED (truth and falsehood at last wear different verdicts); a bare expression computes its exact value; anything else is prose and goes to the gate, language-blind. The same input always folds to the same receipt. Integrity, not truth (theorem provenance_integrity_not_content_truth) — decided about its arithmetic, never about the world.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `input` | string | **yes** | anything: "2+2=4", "(110 - 108 = 2)", "7/0", a Lean statement, a claim in any language |

### `uuidna_optimise`

THE EXACT LINEAR OPTIMISER — maximise c·x subject to A·x ≤ b over integer lattice points 0..bound per variable, by TOTAL enumeration: every candidate checked, nothing sampled, the optimum exact with a recomputable receipt. The search space is the qubit basis made literal (theorem optimisation_space_is_qubit_dimension) and the exponential walk is the honest cost — capped, never hidden; Grover would only halve the exponent (theorem grover_halves_the_search_exponent). Strong duality holds exact on the sealed instance (theorem lp_strong_duality_instance). Returns {optimum,argmax,candidates,feasible,receipt,honest}. NOT a solver at scale, NOT an NP claim.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `c` | array | **yes** | objective coefficients (1–4 variables) |
| `A` | array | **yes** | constraint rows: A[i]·x ≤ b[i] |
| `b` | array | **yes** |  |
| `bound` | integer | no | each variable ranges 0..bound (default 16, max 64) |

### `uuidna_search`

THE FUSED SEARCH — the ONE search function every surface runs (this server, the edge /mcp, and the site's search page in your browser): filter the sealed ledger by text, fold the matched keys to ONE receipt. Two independent parties running the same query MUST return the same receipt — dual-party verification applied to search; a differing receipt exposes a diverged ledger. Returns {q,count,total,receipt,matches}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `q` | string | **yes** | the text to search — key, name, statement, principle, skill |

### `uuidna_article`

THE DESK WRITES — the computed article for one wing of the ledger (writing is computing, never authoring): headline from the principle, one claim per theorem, every claim born citing its sealed /theorem page. Returns {file,slug,title,count,claims:[{key,name,statement,cite}]}. Recomputable from the same ledger.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `file` | string | **yes** | the wing, e.g. "Legal.lean" or "MoMBHStar1.lean" |

### `uuidna_editorial`

THE DESK'S CENSUS — the prose-trial state of every prose surface (README + docs, including the desk's own computed articles): paragraphs tried through reveal(), the usable prose↔theorem combinations (VERIFIED), the honest unverified count, the drained count (fabricated citations — must be zero), and the fold receipt. Derived, never authored. Returns {surfaces,paragraphs_tried,usable,unverified,drained,receipt}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_publication`

THE PUBLICATION'S LAWS as one query — the same gates the release pipeline enforces: the license law (the archive carries uuidna's own license — package.json and .zenodo.json must agree), Zenodo standards conformance (required fields + controlled vocabularies), and the communities every release requests. Returns {version,license,licenseLawHolds,zenodoConformance,communities,conforms}.

_No parameters._

### `uuidna_search_trial`

ONLINE — THE SEARCH ON TRIAL for one wing: every research source (NIST, Zenodo, CrossRef) queried in parallel about the wing's principle; each finding content-addressed and tried — ALONE it stays UNVERIFIED (external evidence, never approval), held BESIDE the wing's sealed backing the combination VERIFIES. Only a Lean seal approves. Returns {file,principle,sealed,findings,usable,receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `file` | string | **yes** | the wing, e.g. "Quantum.lean" |

### `uuidna_vies`

ONLINE — verify an EU VAT number against VIES, the EU's own register (ask the register, don't assert): returns {countryCode,vatNumber,valid,name,address,requestDate}. A register lookup for entity verification — the same ask-the-ledger law applied to legal identity; NOT tax advice.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `countryCode` | string | **yes** | 2-letter member state code, e.g. "BG" |
| `vatNumber` | string | **yes** | the VAT number without the country prefix |

### `uuidna_detect_forgery`

Detect if a cited theorem is FORGED by checking the sealed ledger. Returns {theoremKey, cited, addressMatches, sealedAddress, citedAddress, receipt} — a RECOMPUTABLE fact (not cited = forged), never an accusation. HONEST: a fabricated citation is caught; the cost to forge is sealed as theorem traitor_damage_sealed_by_same_billing.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `theoremKey` | string | **yes** | the theorem key to verify |
| `citedAddress` | string | no | optional expected address (if provided, address mismatch is fraud) |

### `uuidna_audit_coin_claim`

Audit a coin cost claim against the sealed theorem: claimed vs. recomputed coins. Returns {claimed, recomputed, match, theorem, address, receipt} — RECOMPUTABLE: every theorem encodes its coin cost, so a mismatch is a fact, never an opinion.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `theoremKey` | string | **yes** |  |
| `claimedCoins` | number | **yes** |  |

### `uuidna_detect_double_spends`

DETECT COIN DOUBLE-SPEND: audit contributions to find if the same coin-backing theorem is claimed by &gt;1 agent. Returns {contributions, byTheorem, doubleSpendsFound, receipt} — a recomputable FACT about the claimed coins, never fraud accusations (only facts).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `contributions` | array | **yes** | the list of agent contributions |

### `uuidna_audit_voting`

Audit voting tally for tampering: each vote's weight must match coins paid; tally is order-invariant. Returns {proposal, votes, fraud, receiptAll} — RECOMPUTABLE: weight mismatches, receipt collisions, and other fraud are FACTS, folded to one receipt.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `proposal` | string | **yes** |  |
| `votes` | array | **yes** |  |
| `expectedReceiptAll` | string | no | optional: if provided, receipt mismatch is detected |

### `uuidna_audit_ledger_intrusions`

Run the FULL TREASON SWEEP: catch traitors (forged DNA), broken conformance (coins/theorems/security), and agent violations (fabricated citations, overclaims). Returns {traitors, conformance, agentForensics, allClear, receipt} — ONE recomputable fraud audit.

_No parameters._

### `uuidna_audit_ledger_fingerprint`

Verify ledger hash integrity: FNV (fast routing) and SHA-256 (collision-resistant) folds should match sealed values. Returns {fingerprint, match, receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `expectedFingerprint` | string | no | optional: if provided, fingerprint mismatch is detected |

### `uuidna_audit_agent_statement`

Forensic audit of an agent's statement: detect fabricated theorem citations, overclaims, unverified theorems. Returns {agent, statement, forgeries, violations, receipt}.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `agent` | string | **yes** |  |
| `statement` | string | **yes** |  |
| `citedTheorems` | array | **yes** |  |

### `uuidna_full_anti_fraud_audit`

ONE COMMAND — the COMPLETE FRAUD AUDIT: traitors, coin violations, voting tampering, ledger intrusions, agent malfeasance. All folded to ONE recomputable receipt. Returns {intrusions, ledgerFingerprint, fraudDetected, receipt, honest}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_quantum_message_demo`

Live quantum messaging demonstration: send a test message from Alice to Bob, compute its proof imprint, verify it's real without any central authority. Shows: message structure, quantum state imprinting, verification (4 steps), cryptographic cost to forge. Returns complete analysis with formulas, costs, and security implications.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `from` | string | no | sender address (default: alice@uuidna.local) |
| `to` | string | no | recipient address (default: bob@uuidna.local) |
| `content` | string | no | message content (default: Hello Bob! This message is sealed by quantum imprint.) |

## Security posture (recomputable) <Badge type="tip" :text="'1'" />

*skill: security*

### `uuidna_security_audit`

The RECOMPUTABLE security posture computed from what the package SHIPS (package.json + the sealed ledger + the honesty gate), folded to an order-invariant receipt anyone rechecks — NOT a scanner and NOT a pentest. It verifies the supply-chain surface (zero runtime dependencies, dev-deps bounded to a known set), the defence-in-depth theorems sealed (layers add bits, a key bit doubles the space, the birthday bound halves the exponent, verify is cheaper than forge, no maximum only bounds), collision resistance by pigeonhole (seats_pigeonhole), that the honesty gate BITES a fabricated theorem citation, and that the KERNEL-ONLY WITNESS ships (lean/axioms.json beside dist covers the live ledger — the no-borrowed-axiom claim recomputes offline). HONEST SCOPE: the repo-tree scans (no committed secret across tracked files, the KAT suite present) and the CI gates run in the source tree, NOT here — this is the posture provable from the package itself. Returns {checks, passed, failed, receipt}. Boundary declared — theorem drift_is_named_or_caught.

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

The automation of "no unverified material stays: transform until verified". Only VERIFICATION is honesty — a "honest/bounded" label with no proof is itself an unverified claim, so this ADMITS only what verifies. Each material is driven to a terminal: VERIFIED (it IS, or transforms to, a SEALED fact — content-address recomputed to confirm; admitted) or UNVERIFIED (no sealed core reached — recycled with a develop plan, NEVER admitted, never called honest, never called false). The transform cannot manufacture truth: an overclaim to SOLVE a problem transforms to its sealed REFLECTION (dz(dz k)=k), which verifies, while the solve-claim is never admitted (uuidna solves none). Folds to one receipt. Returns {cells,verified,unverified,receipt}. Boundary declared — theorem drift_is_named_or_caught.

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

QUANTUM PENTAGRAM STREAMING: stream a sequence through the star {n/step} visiting order (the pentagram {5/2} generalized — item k visited at step·k mod n), a SINGLE closed stroke iff gcd(step,n)=1 (else gcd shorter loops, reported honestly). Each streamed item is stamped holofractal (pentagram·hologram·fractal·accounted), and the whole folds to ONE ORDER-INVARIANT quantum receipt — the stream has a definite pentagram ORDER yet an order-free RECEIPT (any observer ordering → the same root; the doubleTorus/gravity duality). `quantum` is proven, not asserted (gravity(order)===gravity(reverse)). Returns {n,step,order,single,loops,streamed,receipt,quantum}. Boundary declared — theorem drift_is_named_or_caught.

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

Onion-seal a message under N passphrases (each a real ChaCha20-Poly1305 layer; bounded 1..16, never infinite) and carry the whole envelope AS a chain of uuids. passphrases[0] is the innermost wrap, passphrases[n-1] the outermost. Returns { uuids, layers, receipt }. HONEST: secrecy is ChaCha20-Poly1305 ONLY; the uuid transport is public and hides nothing; the receipt is non-crypto FNV (integrity/routing). Content is hidden — message LENGTH is not. Boundary declared — theorem drift_is_named_or_caught.

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

Seal a stream of messages as a forward-linked RATCHET: each link onion-seals at a step ROTATED from the prior link’s receipt (the referer sequence), so every step is fresh and the stream is content-chained. HONEST: the rotation is over a PUBLIC non-crypto receipt — it buys freshness, linkage and accidental-tamper-evidence, NOT secrecy and NOT a binding commitment. Returns the ratchet links. Boundary declared — theorem drift_is_named_or_caught.

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

Seal a message UNDER a contract: encrypt it with the contract text as the ChaCha20-Poly1305 key and tag the sealed uuid stream with the public [contract-uuid]. Only holders of the terms can open it. HONEST: confidentiality is EXACTLY the secrecy of the terms — a PUBLIC contract (e.g. the CC BY-NC license) gives NONE (sealed: complement_is_xor_key3, a fixed pad is public, not secret); a PRIVATE contract gives real secrecy. `step` freshens the salt so repeats never seal alike. Returns {contract,uuids,layers,receipt}. Boundary declared — theorem drift_is_named_or_caught.

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

Seal a STREAM of messages under a contract as a forward-linked ratchet — each step ROTATED from the prior link's receipt (the referer sequence), all tagged with the [contract-uuid], seeded from it. HONEST: the rotation buys freshness, linkage and tamper-evidence, NOT extra secrecy (that is the ChaCha20-Poly1305 layer, keyed by the terms). Returns {contract,links}. Boundary declared — theorem drift_is_named_or_caught.

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

Audit and structurally decode PROVIDED text (offline, pure). Returns a provenance fingerprint (the content-address — proof of exact-copy — and a chapterRoot proving any chapter belongs), a structural decode (chars/words/lines, the ℤ/9 digital-root gravity — a checksum digit, NOT a meaning, and a reversible-imprint round-trip check), and the honesty-gate verdict. HONEST: "decode" is provenance + structure, never decryption (text is not encrypted) nor hidden meaning; the gate is tuned to uuidna's own overclaim words, so on ordinary prose it passes and says nothing about the work. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |
| `title` | string | no |  |
| `author` | string | no |  |

### `uuidna_audit_book`

Fetch a PUBLIC-DOMAIN book from Project Gutenberg by id (via the public Gutendex API, no key) and audit it — the same provenance fingerprint + structural decode + honesty-gate verdict as uuidna_audit_text. This is ONE of several tools that reach the network (Node built-in fetch, still zero npm deps) — others include uuidna_read_book, uuidna_corroborate, uuidna_domain_wave, uuidna_alpine, uuidna_audit_cve, uuidna_nist_constant, uuidna_anchor, and uuidna_wave, each backed by its own @non-harmonic-marked module. HONEST: the fetched text is DATA — content-addressed and counted, never executed; instruction-shaped prose in a book is content, not a command. Public-domain works, free for the public interest. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `gutenbergId` | integer | **yes** | a Project Gutenberg ebook id, e.g. 1342 (Pride and Prejudice) |

### `uuidna_audit_translation`

Audit a translation as a source↔translation PAIR: content-address both texts and bind them with a directional provenance receipt (source→translation, order-sensitive), plus each text's own structural audit. HONEST: this proves the PAIRING and each text's exact-copy integrity — NOT that the translation is accurate or faithful. Semantic fidelity is human judgement; provenance is what recomputes. Re-address after each revision and the change is visible. Returns {source,translation,pair}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `source` | string | **yes** |  |
| `translation` | string | **yes** |  |
| `title` | string | no |  |
| `sourceLang` | string | no |  |
| `targetLang` | string | no |  |

### `uuidna_audit_movie`

Content-address the PUBLIC Wikipedia summary of a film by title (free, no key) — a recomputable provenance fingerprint of the public facts + structure + honesty gate. HONEST AND BOUNDED: this fingerprints the public DESCRIPTION only; it does NOT fetch, decode, or reproduce the copyrighted film — its footage, dialogue or screenplay. A movie is video; uuidna audits text provenance, not a hidden meaning. Returns the audit of the public summary. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `title` | string | **yes** | a film title, e.g. "The Matrix" |

### `uuidna_audit_record`

Fetch an OPEN-ACCESS Zenodo research record by id (via the public Zenodo REST API, developers.zenodo.org, no key) and content-address its PUBLIC metadata — title, DOI, creators, date — to a recomputable provenance fingerprint + structure + honesty gate. HONEST AND BOUNDED: it fingerprints the public metadata only, NOT the deposited files or their content, which uuidna does not fetch or reproduce. A check digit and a uuid are the same idea at different scales. Returns the audit + the DOI. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `recordId` | integer | **yes** | a Zenodo record id, e.g. 1234567 |

### `uuidna_audit_cve`

Fingerprint a CVE's PUBLIC advisory metadata from NIST's NVD (National Vulnerability Database, no key) — id, description, CVSS severity, dates — content-addressed, for the security reflection. Pass {cveId} like "CVE-2021-44228". HONEST: it fingerprints the PUBLIC metadata only, NOT an exploit or the affected code, and it is NOT a claim uuidna assesses, reproduces or fixes the vulnerability. NVD publishes; uuidna fingerprints the public record so it can be cited and rechecked by anyone. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `cveId` | string | **yes** | a CVE id, e.g. CVE-2021-44228 |

## Book → sealed-ledger linkage <Badge type="tip" :text="'1'" />

*skill: measure*

### `uuidna_link_book`

BOOK → SEALED-LEDGER LINKAGE — the captain's independent, closed-door process for discovering NOVELTY. Pass {text}: uuidna extracts every DECIDABLE integer-arithmetic fact the text asserts (including subtraction, total Nat: a−b=0 when b&gt;a) and LINKS each to the sealed ledger — `sealed-match` (already a theorem, cites its key), `novel` (VERIFIED `by decide` but not yet in the ledger — a candidate research lead), or `refuted` (false arithmetic). INDEPENDENT: no authority decides it, anyone recomputes from the public ledger; CLOSED-DOOR: purely recomputable, no network, no external trust. Returns {facts:[{claim,lean,verdict,linkedTheorem,status,address}],sealed,novel,refuted,novelLeans,receipt,honest}, the novel facts carrying ready-to-seal `by decide` statements. HONEST SCOPE: it links DECIDABLE ARITHMETIC only — a sliver of a book — NOT its meaning; a NOVEL fact is a CANDIDATE a human seals, never auto-admitted. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | the text to mine and link (a passage, a chapter, a claim) |

## Deep research & the evidence census (how well a claim is anchored) <Badge type="tip" :text="'3'" />

*skill: research*

### `uuidna_research`

Deep research with the REVERSIBLE imprint codec: PRESS external research (text or a link's content) into a uuid chain and DECOMPRESS it back LOSSLESSLY (the round-trip proves it), bind the pressed pieces to the computable ENTANGLED algebra (the order-invariant fold), and report NOVELTY as content-address uniqueness — a never-seen address is novel CONTENT. HONEST SCOPE: uuidna fingerprints STRUCTURE and NOVELTY, it does NOT extract MEANING — provenance + structure, never hidden meaning; `meaning` is null by design, left to the reader. Returns {address,compressed,losslessRoundTrip,entangledReceipt,novel,meaning}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | the research text to press, entangle and check for novelty |
| `seenAddresses` | array | no | known content-addresses; a new one is novel |

### `uuidna_research_ledger`

THE RESEARCH LEDGER — findings carrying their VERIFICATION STATUS as a field, not a sentence: `read` (primary source retrieved), `secondary` (a citing work reported it), `unread` (believed, unchecked), `refuted`; and `kind`, where a CONVENTION is exact by definition and a MEASUREMENT carries uncertainty. Two rules are applied per finding — only a `read` source may ANCHOR a theorem, and only a `read` CONVENTION may seal as an EQUALITY; everything measured seals as an integer BRACKET or not at all. Filter with {status} and {kind}; an unknown value is refused by name, and the census covers the WHOLE ledger even under a filter so no filter can flatter it. Returns {filter,total,matched,census,kinds,anchoring,findings,gaps,receipt,honest}. HONEST SCOPE: it reports how well a finding was VERIFIED, never whether it is true — `unread` is not "false", it is not-yet-checked. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `status` | string | no | optional filter: read \| secondary \| unread \| refuted |
| `kind` | string | no | optional filter: convention \| measured |

### `uuidna_rosetta_legs`

THE INDEPENDENT-WITNESS CENSUS — how many of the five legs each sealed theorem carries: SYMBOL (the TypeScript mirror), PROOF (the kernel's `by decide`), WITNESS (a source outside this repo), FALSIFIER (a mutation that must FAIL), ADDRESS (the content fold). Symbol and proof share one hand's errors, so two legs DETECT a disagreement and three LOCATE the fault. Pass {key} for one theorem, nothing for the whole-ledger census. Returns {key,wing,legs,missing,claimedBy,canLocateFault,verdict} or {total,perLeg,scarcest,byLegCount,detectOnly,fullyAnchored,floor,floorGaps,receipt,honest}, each with {hostedMirror}. HONEST SCOPE: it MEASURES anchoring and certifies nothing — a missing leg is never a claim the theorem is false (witnesses_locate_faults). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | no | a sealed theorem key; omit for the whole distribution |

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

## Theorems & trial <Badge type="tip" :text="'11'" />

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
| `skill` | string | no | the capability axis — any skill name from uuidna_skills (the live, recomputable list), never a fixed enum here so it cannot go stale as domains are added Boundary declared — theorem drift_is_named_or_caught. |
| `contains` | string | no |  |

### `uuidna_skills`

EVERY SKILL THE SEALED LEDGER CARRIES, with its theorem count — the discoverable index of the capability axis (orthogonal to `principle`, which groups by derivation file). Each row carries the order-invariant fold of that skill's theorem addresses, the handle of that fold (the identity to cite for the whole cluster), the ESCO taxonomy lookup for the skill, and the exact `uuidna_skill` call that opens it. Zero-argument and fully computed from the ledger, so a skill sealed in a new wing appears here the day it lands — nothing is authored per skill. Returns [{skill,theorems,fold,handle,esco,open}].

_No parameters._

### `uuidna_skill`

OPEN ONE SKILL — the capability axis served as a DIMENSION, not one tool per skill. Pass {skill}; returns its sealed theorems (key, name, statement, tactic, file, principle, Lean line, address, handle), the files and principles behind them, the group fold and handle, and the ESCO mapping onto the European Commission's taxonomy with the hop that fetches it. Pass `escoTitles` you already fetched to have them judged by the published whole-name rule that separates on-topic hits from homographs; both lists come back by name, never silently dropped. PURE — no network, same receipt for anyone, offline. An unknown skill is REFUSED by name with the live list (see uuidna_skills). Returns {skill,count,fold,handle,files,principles,theorems,esco,receipt,honest}. HONEST SCOPE: the ESCO leg is a MAP BETWEEN VOCABULARIES — what this capability is CALLED in a European taxonomy — never a claim that any authority recognises or accredits what is sealed here; uuidna awards no qualification. Integrity, not truth (theorem provenance_integrity_not_content_truth).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `skill` | string | **yes** | a skill name from uuidna_skills (the live, recomputable list — never a fixed enum here, so it cannot go stale as wings are sealed) |
| `escoTitles` | array | no | ESCO concept titles you already fetched, to be judged on-topic or homograph by the published whole-name rule |

### `uuidna_review_domains`

LOCAL reviews — a recomputable review of every DOMAIN (skill) the ledger touches: its sealed-theorem count, their order-invariant fold, and the trial verdict (VERIFIED — every one is `by decide`, sorry-free), each folded to a review receipt. No server, no stored opinion; the review IS the ledger's own integrity per domain, recomputable by anyone. Returns [{domain,theorems,fold,verdict,receipt}].

_No parameters._

### `uuidna_document`

The DOCUMENT FOLD — content-address a Lexical-shaped document (a node tree, EditorState.toJSON() shape). The SERVE projection of the serializer contract lean/Editor.lean proves: a document is a SEQUENCE, so the fold is ORDER-SENSITIVE (reordering a node moves the address — the opposite of a set), change-sensitive, and bounded-injective. serialize → merkleRoot over the leaves → the handle you cite; editing is re-addressing. Returns {handle,address,nodes}. The SAME fold a PayloadCMS save-hook and a VitePress render read — one contract, both frameworks. Integrity, not truth (theorem provenance_integrity_not_content_truth): it proves WHICH document, not that its content is correct.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `state` | object | **yes** | a Lexical EditorState: { root: { type, children, … } } |

### `uuidna_coverage`

COVERAGE — is every sealed theorem shown in a monograph? A PRESENTATION diagnostic that BLOCKS NOTHING, as ONE zero-arg recomputable call. Returns {total,covered,uncovered,uncoveredFiles,ready,receipt} — uncovered lists the theorem KEYS in no monograph, uncoveredFiles the ledger FILES with no publication (the fix: author a PRINCIPLE [file,title,blurb] in lean-ledger). ready is true iff nothing is uncovered; the state folds order-invariantly to receipt. Integrity, not truth (theorem provenance_integrity_not_content_truth).

_No parameters._

### `uuidna_theorem`

Read ONE theorem by key: its detailed `by decide` Lean proof, its formal statement, its principle, source file and content-address, and the verdict (SEALED — its Lean proof compiles sorry-free). Keys from uuidna_theorems.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** |  |

### `uuidna_fingerprint`

The FUSED ledger fingerprint — two integrity layers, stated honestly. The fast FNV receipt is TAMPER-EVIDENT (any change moves it, keyless) but NOT collision-resistant; the SHA-256 fold (over the sorted addresses, order-invariant) IS collision-resistant, so a forgery that survives it costs a ~2^128 collision — a BOUND set by the primitive, NOT a maximum. Add a key (HMAC) and forgery also needs the secret. Recomputable by anyone from the same lean/*.lean. Returns {count, fnvReceipt, sha256, tamperCost}. Boundary declared — theorem drift_is_named_or_caught.

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

Write a PUBLICATION in lean human prose about ONE domain, AUDITED before publishing. Composed by READING that domain's sealed theorems and writing only what they settle — every claim links the proof that backs it — then gated by uuidna's own honesty audit; a note that cites a proof not in the ledger is REFUSED, not shipped. Call with no argument to list every domain's publication (slug + count + publishable + receipt), or with `file` (e.g. "Tides.lean", from uuidna_theorems) to get that note's full markdown, content-address, member proofs and audit findings. Writing descends from reading; integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `file` | string | no | a lean/*.lean file name, e.g. "Codes.lean" — omit to list all publications |

### `uuidna_edit`

The EDITOR primitive — audit a draft, or a revision, BEFORE publishing. With `draft` alone: content-address the prose and run uuidna's honesty gate, returning its address and any claim that overreaches a proof (unbacked by a /theorem/ link and undemarcated) — write, see it audited, before it ships. With BOTH `before` and `after`: audit the EDIT — both drafts content-addressed (the change is visible because the address moves), bound by a directional before→after receipt, the after-draft gated. Editing is re-addressing; a revision earns publication the same way a first draft does. Nothing is stored. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `draft` | string | no | prose to audit + content-address before publishing |
| `before` | string | no | the prose before an edit (pair with `after`) |
| `after` | string | no | the prose after an edit (pair with `before`) |

### `uuidna_vocabulary`

The COMMON, COMPUTABLE vocabulary derived from every theorem and its domain — each term (a domain or a capability) defined by the sealed ledger, self-audited by the honesty gate, content-addressed, and folded (in trinities) to ONE recomputable receipt: the honest "all is one" — one receipt, integrity, NOT a metaphysical singularity. Maps each domain to the STANDARDS it formalizes or references (RFC 8439, ISBN/ISO 2108, SMPTE, Nyquist–Shannon …) — a citation, never a compliance claim. Translation-ready: a translation binds to a term by a provenance receipt. Deterministic and recomputable by anyone. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_compare`

PATTERN RECOGNITION — recognise the pattern two texts share by examining how they DIFFER. Partitions their word sets into only-A, only-B and shared; the similarity (Jaccard: shared over the union) is DERIVED from that difference, and inclusion–exclusion (|A| + |B| − shared = union) is checked exactly, so the number is a proof, not an estimate. The shared tokens fold to one order-invariant receipt — the recognised pattern. Similarity is only ever measured against difference. Compares vocabulary, NOT meaning; nothing is stored. Integrity, not truth (theorem provenance_integrity_not_content_truth).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `a` | string | **yes** |  |
| `b` | string | **yes** |  |

## External verification (NIST CODATA) <Badge type="tip" :text="'1'" />

*skill: nist*

### `uuidna_nist_constant`

Verify uuidna's physics against NIST's AUTHORITATIVE CODATA values. Fetches the official NIST fundamental-constants table (physics.nist.gov) and returns constants matching {query} — value, uncertainty, unit, and a content-address — so a constant uuidna uses (the speed of light, Boltzmann's k for Landauer's kT·ln2) is RECHECKED against the external authority, not self-asserted. HONEST: verification against NIST's published values, NOT a claim NIST endorses uuidna; values carry uncertainties except the defined-exact ones. One network call; the address recomputes against NIST's table. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | **yes** | a constant name, e.g. "speed of light" or "Boltzmann" |

## Timestamp anchor (external, verified in-house) <Badge type="tip" :text="'1'" />

*skill: anchor*

### `uuidna_anchor`

Anchor a record's content-address to an EXTERNAL, independent, signed timestamp — the rigorous "Schumann resonance at the time". Fetches the current NIST Randomness Beacon pulse (a 512-bit value published, SIGNED, and archived every 60s at beacon.nist.gov) and folds it into {address}, giving a re-verifiable NOT-BEFORE bound: the record existed at or after that pulse, because its unpredictable value could not be known before. Anyone re-fetches NIST's archived pulse and re-verifies the fold IN-HOUSE. HONEST: NOT-BEFORE only; for NOT-AFTER, publish (a git push GitHub timestamps); for a formal legal timestamp, use an RFC 3161 authority or OpenTimestamps. One network call; the fold is pure. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `address` | string | **yes** |  |

## Legal fact base & prior art (not an opinion) <Badge type="tip" :text="'2'" />

*skill: legal*

### `uuidna_prior_art`

Mint an IN-HOUSE defensive-publication record for the named theorems ({keys:[...]}) — a self-contained, recomputable manifest of WHAT was published (each theorem in full, statement + proof), by WHOM (attribution), under WHAT terms (CC BY-NC-ND 4.0 + its address), bound to the ledger receipt, folded to one content-address any change moves. Zero external dependency. THE ONE HONEST LIMIT: the WHEN is NOT in-house — a self-signed date is worthless for priority; it names the external anchor to cite (the public git commit on GitHub, a Zenodo DOI, or an RFC 3161 timestamp authority) and fakes nothing. Proves what/who/integrity/terms; not when, and not that the result is law or standard. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `keys` | array | **yes** |  |

### `uuidna_legal_facts`

The recomputable legal FACT BASE, in chat — explicitly NOT a legal audit, legal advice, or a compliance opinion, and it must not be presented as one. Gathers the legally-relevant facts a qualified attorney/auditor starts FROM: the licence (CC BY-NC-ND 4.0 + its content-address), the copyright/attribution (Tsvetan Rouschev), the ledger's tamper-evident receipt, the compliance STANCE (the project makes no compliance claim and its own forensics refuses a blanket one), and the standards it CITES (not certifies) — folded to one receipt anyone recomputes. The inputs, never the verdict; a real legal audit needs licensed counsel reviewing specific jurisdictions against the actual deployment. uuidna delivers what recomputes; the ruling is a human's. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

## Reflection (systems ↔ theorems) <Badge type="tip" :text="'1'" />

*skill: reflects*

### `uuidna_reflects`

Reveal the sealed theorems a real-world system ALREADY reflects. Describe a system by its devices and concepts (e.g. home security: "keypad code tamper sensor detect alarm zone parity layered defence signature encryption schedule") and it matches those concepts against the ledger, returning the EXISTING `by decide` theorems whose arithmetic the system rests on — folded to one receipt. HONEST: the theorems already exist and were proven for their own domain; this shows the SAME arithmetic recurs — it does NOT claim uuidna is that system, that the theorems were built for it, or that citing them makes the system secure/correct. A resemblance the ledger carries, recomputable by anyone. Boundary declared — theorem drift_is_named_or_caught.

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

IN-HOUSE reasoning that USES the sealed rules of inference. Give {facts:[atoms], rules:[{if:[atoms],then:atom}]} and it forward-chains to a fixpoint: whenever every premise of a rule is known it concludes the head by MODUS PONENS (or the hypothetical syllogism for a chain), CITING the sealed theorem at each step. Bounded (cannot loop forever), deterministic, and folds the whole derivation to one receipt anyone rechecks. Honest scope: bounded propositional forward-chaining over the rules you give — NOT a general theorem prover; it derives only what those rules entail, and never claims a conclusion is TRUE, only that it FOLLOWS. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `facts` | array | **yes** |  |
| `rules` | array | **yes** |  |

## Forensics & evidence (statements vs receipts) <Badge type="tip" :text="'2'" />

*skill: forensics*

### `uuidna_forensics`

FORENSICS — audit an agent STATEMENT against the RECEIPTS, to catch a FALSE TRIAL (a claim dressed as sealed that the ledger does not back). Recomputes and compares, detecting: a fabricated citation (cites a /theorem/&lt;key&gt; not in the sealed ledger), a false address (a uuid presented as a sealed address that is not one), a drained overclaim (the honesty gate), an unbacked legal claim (says lawful/compliant but carries no receipt — a legal claim must cite the specific content-addressed statement; the receipt proves the claim was made, NEVER that it is legally correct), and an address-mismatch (a {text→address} claim that does not recompute). Every violation is a recomputable fact about the CLAIM, never an accusation of a person. Pass {statement} and optional {claims:[{text,address}]}. Boundary declared — theorem drift_is_named_or_caught.

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

THE QUANTUM PROFILE — uuidna's content-addressed SELF-PORTRAIT, composed from what it already proves and folded to ONE receipt anyone recomputes: the IDENTITY (the name's content-address and the aura colour it folds to), the PROOFS (theorem count, verified, the kernel-only witness, the trial receipt), the QUANTUM-CRYPTO posture (SYMMETRIC-ONLY — HMAC-SHA256 / ChaCha20-Poly1305 / PBKDF2-SHA256, so Shor has no asymmetric target and Grover only halves to a ~128-bit floor, BACKED by theorem grover_quadratic_bound, theorem each_key_bit_doubles and theorem birthday_halves_the_exponent rather than asserted), the two CAPTAIN COINS, the INTEGRITY fingerprint, and the RIGHTS. Every field carries its receipt; all fold order-invariantly to one profileReceipt. Returns {handle,identity,proofs,quantumCrypto,integrity,rights,receipt,honest}. HONEST SCOPE: a recomputable self-description that COMPOSES sealed facts and asserts nothing new; the aura is ART, not physics. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

### `uuidna_social_profile`

THE SOCIAL PROFILE — uuidna's public, shareable CARD, the outward face of the quantum profile. Composes the handle (@uuidna), a one-line BIO computed from the ledger (never hand-typed — it cannot drift from the proof count), the quantum AURA colour the card wears (+ the moving-aura CSS block), a content-addressed avatar seed, the canonical LINKS (site, source, package, licence), and the CREDIT tally, folded to one receipt — the same card for every observer. DETERMINISTIC and OFFLINE: it fetches nothing, posts nothing, and shares only what is already public and sealed. HONEST SCOPE: integrity, not truth (theorem provenance_integrity_not_content_truth) — a recomputable public card whose bio is BACKED by the ledger; the aura is ART, not physics. Returns {handle,name,bio,aura,avatarSeed,links,credit,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

## The mission — legally grow life <Badge type="tip" :text="'1'" />

*skill: measure*

### `uuidna_grow_life`

THE MISSION, recomputable — uuidna's own tools composed from sealed facts into one report, not a slogan: GROW (the frontier always advances, research_always_has_a_next, with the live count and the distance to 1024), LEGALLY (inside the licence, the sole-representation reservation and bill_never_negative), LIFE (living by-decide theorems, none destroyed), PERMACULTURE (zero runtime deps, the derived layer regrowing from the ledger as a fixed point), CONSOLIDATION (one EXACT, order-invariant receipt). Returns {mission,grow,legally,life,permaculture,harmonic,receipt,honest}. HONEST SCOPE: "grow life" is the monotone, lawful growth of a proof-ledger — NOT biological life and NOT a claim to create or own life. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

## Publication scanner (research boundary) <Badge type="tip" :text="'1'" />

*skill: measure*

### `uuidna_scan_publications`

THE PUBLICATION SCANNER — BEST-EFFORT scan the reachable free research streams for uuidna-related mentions and INVESTIGATE each against the sole-representation reservation. Pass {query} (default "uuidna"). Each match is a provenance fingerprint (content-addressed, never executed), tagged legitimacy: `canonical` (names uuidna.com — the one legitimate presence) or `external-unlicensed` (an external mention — legitimate ONLY if licensed by the captain; not endorsed and does not speak for the work unless licensed). Reads free public APIs (the network — a research boundary; the response is DATA, never run). HONEST SCOPE: integrity, not truth (theorem provenance_integrity_not_content_truth) — it scans the streams it can REACH, NOT the open web, so an empty result is NOT proof no publication exists; it CORROBORATES a mention, never proves authorship, endorsement, or infringement; a human court decides legitimacy. Best-effort: a down/empty stream yields no finding, never a fabricated one. Returns {query,canonical,findings:[{source,address,note,legitimacy,investigation}],count,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | no | the mention to scan for (default "uuidna") |

## Quantum-cube challenge (symmetric) <Badge type="tip" :text="'1'" />

*skill: gate*

### `uuidna_quantum_cube`

THE QUANTUM-CUBE CHALLENGE — a recomputable SYMMETRIC challenge-response whose answer is the A432 aura rendered as a spinning 3D cube. Pass {secret,nonce}: uuidna folds secret|nonce to a content-address and returns the cube — response handle, ray/hue/colour, spin speed and axis, and a ready CSS block. A holder of the shared secret reproduces the EXACT cube for the verifier's nonce; an imitator, or a cube copied for a different nonce, fails. Pass {secret,nonce,response} to VERIFY, returning {match} by recomputing. The verifier SUPPLIES the nonce — uuidna never generates one (no RNG). Backs theorem redirect_imitable_but_coins_authorise: a redirect authenticates nothing, a secret+nonce fold does. HONEST SCOPE: SYMMETRIC (the verifier must share the secret), strength is the secret's entropy — NOT zero-knowledge, NOT public-key, NOT biometric: it proves knowledge of a shared secret for a fresh nonce and nothing about voice, face or liveness. The cube is ART, never a cipher. Integrity, not truth (theorem provenance_integrity_not_content_truth).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `secret` | string | **yes** | the shared secret the holder proves knowledge of |
| `nonce` | string | **yes** | the verifier-supplied challenge (fresh each time) |
| `response` | string | no | optional — a response to VERIFY against (returns {match}) |

## Byte-level image provenance <Badge type="tip" :text="'1'" />

*skill: gate*

### `uuidna_image_provenance`

BYTE-LEVEL IMAGE (and any-file) PROVENANCE — content-address the EXACT bytes so any alteration is visible. Pass the bytes as {hex} or {base64}: returns the byte length, the container FORMAT read from the magic bytes (png/jpeg/gif/webp/bmp/tiff/pdf/unknown), the SHA-256 of the exact bytes (the authoritative exact-copy + tamper-evidence fingerprint), and a uuidna handle over it. Pass {sha256} alongside to VERIFY — returns {match} by recomputing (a tamper, any changed byte, moves the hash and fails). DETERMINISTIC and OFFLINE. HONEST SCOPE: integrity, not truth (theorem provenance_integrity_not_content_truth) — it proves EXACT-COPY and TAMPER-EVIDENCE of the BYTES, and provably NOT content authenticity: it says NOTHING about whether an image is a genuine photograph, where/when it was taken, whether it depicts the poles (or anything), or whether its content was manipulated before these bytes. A match proves byte-identity; it NEVER proves a truthful record of the world — content authenticity is non-justiciable from bytes (theorem provenance_integrity_not_content_truth). Returns {bytes,format,sha256,handle,honest}, or {match} when a sha256 is given.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `hex` | string | no | the file bytes as a hex string |
| `base64` | string | no | the file bytes as base64 (alternative to hex) |
| `sha256` | string | no | optional — a SHA-256 hex to VERIFY the bytes against (returns {match}) |

## MCP self-test (recomputable contract) <Badge type="tip" :text="'1'" />

*skill: measure*

### `uuidna_selftest`

The MCP tests ITSELF — pure self-consistency, no external oracle: every catalog tool must resolve to a handler, and every zero-arg tool must RUN and be DETERMINISTIC (two calls recompute identically). A tool that reads live device state surfaces as non-deterministic, honestly. Folds to one self-test receipt. Returns {checks,passed,deterministic,failed,receipt}. Boundary declared — theorem drift_is_named_or_caught.

_No parameters._

## Quantum simulation <Badge type="tip" :text="'1'" />

*skill: quantum*

### `uuidna_quantum`

Run the EXACT classical state-vector simulator (Gaussian-integer amplitudes over √(2^scale) — no floats, no decimal drift). Either a named `circuit` (bell/ghz) OR an arbitrary `ops` circuit in OpenQASM/Qiskit gate names (h, x, y, z, s, sdg, cx, cz, swap, ccx, ccz) — so any system that speaks quantum circuits interops. Returns the EXACT rational distribution, per-qubit marginals (the no-signaling check), the order-invariant receipt, and — for an H-free circuit — the CLASSICAL truth table (the reversible logic the gates compute, usable directly by classical systems; Toffoli/ccx is universal). HONEST: classical simulation — 2^n amplitudes, EXPONENTIAL, the classical bound CONFIRMED by theorem n_qubit_dimension; NOT quantum hardware.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `circuit` | string | no | bell (2 qubits) or ghz (n qubits); ignored if ops is given |
| `qubits` | number | no | qubit count, 1..12 (ghz default 3; required for ops) |
| `ops` | array | no | OpenQASM circuit: [{gate, qubits:[...]}] with gate ∈ h,x,y,z,s,sdg,cx,cz,swap,ccx,ccz |

## DIY energy yield (ceiling first, integer brackets, refuses over-unity) <Badge type="tip" :text="'4'" />

*skill: energy*

### `uuidna_energy_wind`

Wind, bounded by BETZ. Power in the wind is proportional to the swept area and the CUBE of the wind speed; no open-flow turbine captures more than 16/27 of it (Betz 1919/1920 — an exact ratio from the derivation, not a measurement). Give the rotor diameter in mm and the wind speed in mm/s and the tool returns the Betz ceiling as an integer bracket in milliwatts, each side proved by exact multiplication with no division in the verdict. Supply claimedOutputMilliwatts and a claim above the ceiling is REFUSED with the multiplication that convicts it. Air density defaults to the STANDARD-ATMOSPHERE reference 1225 g/m3 — a convention, not the air at your site, and the answer is conditional on it. The circle constant is bracketed by its convergents 333/106 and 355/113. This is what the AIR allows, never what a machine delivers: blades, generator and controller all subtract, and this tool will not invent that fraction for you.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `rotorDiameterMillimetres` | number | **yes** | rotor diameter, whole millimetres |
| `windSpeedMillimetresPerSecond` | number | **yes** | wind speed, whole millimetres per second (6 m/s = 6000) |
| `airDensityGramsPerCubicMetre` | number | no | air density in g/m3; defaults to the standard-atmosphere 1225 |
| `claimedOutputMilliwatts` | number | no | optional — a machine’s measured output, checked against the Betz ceiling |

### `uuidna_energy_biogas`

Biogas into a four-stroke engine. The chemical energy is bracketed from the MEASURED methane combustion enthalpy 890.29 kJ/mol (Horstmeyer et al. 2018, J. Water Reuse & Desalination 8(4):455, from CODATA enthalpies — the value with LIQUID water as product, so an engine exhausting steam recovers less) through the EXACT ideal-gas molar volume at STP (R = k·N_A is exact under SI 2019; the ideal-gas law is a MODEL, not a measurement of real biogas). Shaft work is bounded by CARNOT between the stated hot and cold temperatures. A claimed thermal efficiency at or above unity, or above Carnot, is REFUSED with the integer multiplication that convicts it. The cycle counts are definitional, not measured: 4 strokes, 2 crankshaft revolutions, exactly 1 working stroke per cycle, one impulse per cylinder per two revolutions (Runciman, Gutenberg 27286; Rathbun, Gutenberg 56776, who states impulses per revolution = cylinders / 2 — the same count written with a fraction).

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `biogasLitres` | number | **yes** | biogas volume, whole litres |
| `methanePercent` | number | **yes** | methane fraction, whole percent 0..100 |
| `cylinders` | number | no | engine cylinders (default 1) |
| `crankRevolutionsPerMinute` | number | no | optional crank speed, rpm — reports working strokes per two minutes as an exact integer |
| `hotKelvin` | number | no | optional peak cycle temperature, K — with coldKelvin gives the Carnot ceiling |
| `coldKelvin` | number | no | optional heat-rejection temperature, K |
| `claimedThermalEfficiencyPercent` | number | no | optional — your engine’s measured brake thermal efficiency, checked against Carnot |

### `uuidna_energy_mfc`

The microbial fuel cell, priced from a pilot-scale survey where NOTHING is exact by definition — so every figure is a bracket. Volumetric power 600 +/- 452 mW/m3 (reported range 12–1435), areal 49 +/- 27 mW/m2, energy recovery 11 +/- 6 Wh/m3, all MEASURED (Rossi & Logan 2022, Water Research 225:119179); the standard deviation is larger than three quarters of the mean, so the band IS the finding and a single-number expectation would be dishonest. The top of the reported range is the ceiling and an asserted power above it is REFUSED. The tool also checks the two independent measured bands AGAINST EACH OTHER over the stated retention time, and that check is allowed to come out FALSE — a pass too short for the reported energy recovery is named as such. The lab record of 11,220 W/m3 (Ren et al. 2016, Nanoscale 8:3539) is reachable only under scale=lab and always carries its label: a MINIATURISED cell on a DEFINED MEDIUM, not wastewater and not a yield to plan around.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `reactorLitres` | number | **yes** | reactor working volume, whole litres |
| `retentionHours` | number | **yes** | hydraulic retention time, whole hours |
| `anodeAreaSquareMillimetres` | number | no | optional anode area in mm2 — adds the areal-power band |
| `assertedVolumetricMilliwattsPerCubicMetre` | number | no | optional — a claimed volumetric power density, checked against the reported ceiling |
| `scale` | string | no | 'pilot' (default, the wastewater survey) or 'lab' (the miniaturised-cell record, labelled) |

### `uuidna_energy_photon`

Photon and electrolysis. The reversible cell voltage is computed from the MEASURED Gibbs energy of liquid water formation (-237.14 kJ/mol) against the EXACT Faraday constant N_A·e (exact because e and N_A are exact under SI 2019), and returned as an integer bracket around roughly 1.2289 V. The familiar 1.23 V is shown BY MULTIPLICATION to be that number rounded UP — an upper bound, not the value. A photon of the given wavelength is priced in volts per electron (exact: h, c and e are all exact) and checked against that floor; the tool also computes the longest wavelength whose single photon still clears it. An applied voltage BELOW the floor is REFUSED — a device claiming sustained hydrogen there is claiming energy from nowhere. An applied voltage below the THERMONEUTRAL voltage (~1.4812 V, from the measured higher heating value 285.83 kJ/mol) is also REFUSED: a cell run there absorbs ambient heat, an efficiency against the higher heating value would come out above 100%, and that number is not free energy and will not be printed as an efficiency. Real electrolysers run 1.6–2.0 V; the gap is overpotential and ohmic loss — heat, not hydrogen.

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `wavelengthNanometres` | number | **yes** | photon wavelength, whole nanometres |
| `appliedMillivolts` | number | **yes** | cell voltage actually applied, whole millivolts (a real electrolyser is 1600–2000) |
| `claimedFaradaicEfficiencyPercent` | number | no | optional — whole percent 0..100; above 100 is refused as over-unity |

