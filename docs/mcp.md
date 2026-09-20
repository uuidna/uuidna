---
title: MCP tools
aside: true
outline: [2, 3]
---

# MCP tools <Badge type="tip" text="245 keys" />

<!-- GENERATED from src/mcp.ts by scripts/gen-mcp — DO NOT EDIT. Categories, skills and parameters are derived from the tool keys and their input schemas. -->

Every tool the uuidna MCP server exposes — fuse uuidna into any harness (Claude, Cursor, any MCP client). This page
is **built from the keys**: the 245 tools below are read from the server's own tool list and
organised into 37 categories and their skills, so the site search and this page's navigation stay in
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
gate CLEAN f0 d0 v0 · e6436592-e356-8329-8666-528009f545c0
```

The gate proves itself against the sealed spec: the eight-state verdict table recomputes to
**[1,0,0,0,0,0,0,0]** — the sealed table (matchesSealedSpec: **true**;
1 clean state, 7 drained), and the 245-tool registry folds to its
order-invariant identity `492533ad-9c83-8516-80e4-9a5600c39c6c` (the hosted subset serves the same gate over its own registry).
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

## The grid <Badge type="tip" :text="`245`" />

245 tools, **ranked by usability — the reusable at the top** (fewest required keys first; the 116 zero-arg tools lead). The order EMERGES from `uuidna_mcp_benchmark`, not a hand-kept list. Each links to its entry below.

<div class="mcp-grid">
<a href="#uuidna-aas"><code>fetch_aas</code></a>
<a href="#uuidna-alpine"><code>fetch_alpine</code></a>
<a href="#uuidna-api-mint"><code>fetch_api_mint</code></a>
<a href="#uuidna-audit-ledger-fingerprint"><code>audit_ledger_fingerprint</code></a>
<a href="#uuidna-audit-ledger-intrusions"><code>audit_ledger_intrusions</code></a>
<a href="#uuidna-axiom-index"><code>get_axiom_index</code></a>
<a href="#uuidna-axiom-witness"><code>get_axiom_witness</code></a>
<a href="#uuidna-call"><code>call_tool</code></a>
<a href="#uuidna-chat"><code>get_chat</code></a>
<a href="#uuidna-cloudflare"><code>get_cloudflare</code></a>
<a href="#uuidna-cloudflare-audit"><code>audit_cloudflare</code></a>
<a href="#uuidna-coin-ledger"><code>get_coin_ledger</code></a>
<a href="#uuidna-coins"><code>get_coins</code></a>
<a href="#uuidna-coins-jobs"><code>get_coins_jobs</code></a>
<a href="#uuidna-conformance"><code>get_conformance</code></a>
<a href="#uuidna-cost"><code>get_cost</code></a>
<a href="#uuidna-coverage"><code>get_coverage</code></a>
<a href="#uuidna-credits-summary"><code>get_credits_summary</code></a>
<a href="#uuidna-crypto"><code>get_crypto</code></a>
<a href="#uuidna-css"><code>get_css</code></a>
<a href="#uuidna-decode"><code>decode_theorem</code></a>
<a href="#uuidna-development-vortex"><code>get_development_vortex</code></a>
<a href="#uuidna-dictionary"><code>get_dictionary</code></a>
<a href="#uuidna-doi"><code>fetch_doi</code></a>
<a href="#uuidna-domains"><code>get_domains</code></a>
<a href="#uuidna-driver-state"><code>get_driver_state</code></a>
<a href="#uuidna-due-process"><code>get_due_process</code></a>
<a href="#uuidna-edit"><code>edit_publication</code></a>
<a href="#uuidna-editorial"><code>get_editorial</code></a>
<a href="#uuidna-engineering"><code>get_engineering</code></a>
<a href="#uuidna-evidence"><code>fetch_evidence</code></a>
<a href="#uuidna-exploit-fold"><code>get_exploit_fold</code></a>
<a href="#uuidna-expose"><code>list_open_coordinates</code></a>
<a href="#uuidna-fibonacci"><code>get_fibonacci</code></a>
<a href="#uuidna-fill-gaps"><code>fill_gaps</code></a>
<a href="#uuidna-fingerprint"><code>get_fingerprint</code></a>
<a href="#uuidna-full-anti-fraud-audit"><code>audit_full_anti_fraud</code></a>
<a href="#uuidna-gate-status"><code>get_server_status</code></a>
<a href="#uuidna-grid"><code>get_grid</code></a>
<a href="#uuidna-grow-life"><code>grow_life</code></a>
<a href="#uuidna-guard-lessons"><code>get_guard_lessons</code></a>
<a href="#uuidna-handle"><code>get_handle</code></a>
<a href="#uuidna-hardware"><code>get_hardware</code></a>
<a href="#uuidna-hero-animation"><code>get_hero_animation</code></a>
<a href="#uuidna-hologram"><code>list_hosts</code></a>
<a href="#uuidna-image-provenance"><code>get_image_provenance</code></a>
<a href="#uuidna-interface"><code>get_interface</code></a>
<a href="#uuidna-journals"><code>fetch_journals</code></a>
<a href="#uuidna-land-rights"><code>fetch_land_rights</code></a>
<a href="#uuidna-latex"><code>get_latex</code></a>
<a href="#uuidna-lattice"><code>get_lattice</code></a>
<a href="#uuidna-laws"><code>get_laws</code></a>
<a href="#uuidna-lead-clusters"><code>get_lead_clusters</code></a>
<a href="#uuidna-lean-index"><code>get_lean_index</code></a>
<a href="#uuidna-legal-facts"><code>get_legal_facts</code></a>
<a href="#uuidna-list-tools"><code>list_tools</code></a>
<a href="#uuidna-living-field"><code>get_living_field</code></a>
<a href="#uuidna-mcp-benchmark"><code>get_mcp_benchmark</code></a>
<a href="#uuidna-missions"><code>get_missions</code></a>
<a href="#uuidna-oeapi"><code>get_oeapi</code></a>
<a href="#uuidna-open-leads"><code>open_leads</code></a>
<a href="#uuidna-os"><code>get_os</code></a>
<a href="#uuidna-package"><code>get_package</code></a>
<a href="#uuidna-pairs"><code>get_pairs</code></a>
<a href="#uuidna-pentagram"><code>get_pentagram</code></a>
<a href="#uuidna-port"><code>get_port</code></a>
<a href="#uuidna-port-all"><code>get_port_all</code></a>
<a href="#uuidna-ports"><code>get_ports</code></a>
<a href="#uuidna-publication"><code>get_publication</code></a>
<a href="#uuidna-publish"><code>publish_article</code></a>
<a href="#uuidna-qc"><code>get_qc</code></a>
<a href="#uuidna-quantum"><code>get_quantum</code></a>
<a href="#uuidna-quantum-advantage"><code>get_quantum_advantage</code></a>
<a href="#uuidna-quantum-message-demo"><code>get_quantum_message_demo</code></a>
<a href="#uuidna-quantum-profile"><code>get_quantum_profile</code></a>
<a href="#uuidna-quantum-sailing-cross-book"><code>get_quantum_sailing_cross_book</code></a>
<a href="#uuidna-quantum-sailing-weather"><code>get_quantum_sailing_weather</code></a>
<a href="#uuidna-refusals"><code>get_refusals</code></a>
<a href="#uuidna-registry"><code>get_registry</code></a>
<a href="#uuidna-related"><code>get_related</code></a>
<a href="#uuidna-reports"><code>get_reports</code></a>
<a href="#uuidna-repos"><code>fetch_repos</code></a>
<a href="#uuidna-research-ledger"><code>get_research_ledger</code></a>
<a href="#uuidna-resources"><code>get_resources</code></a>
<a href="#uuidna-review-domains"><code>review_domains</code></a>
<a href="#uuidna-rights"><code>get_rights</code></a>
<a href="#uuidna-rosetta-legs"><code>get_verification_legs</code></a>
<a href="#uuidna-sanitize"><code>sanitize_value</code></a>
<a href="#uuidna-school-apis"><code>fetch_school_apis</code></a>
<a href="#uuidna-search-feed"><code>search_feed</code></a>
<a href="#uuidna-security-audit"><code>audit_security</code></a>
<a href="#uuidna-security-plan"><code>run_security_plan</code></a>
<a href="#uuidna-seo"><code>get_seo</code></a>
<a href="#uuidna-shell"><code>get_shell</code></a>
<a href="#uuidna-skills"><code>get_skills</code></a>
<a href="#uuidna-social"><code>get_social</code></a>
<a href="#uuidna-social-profile"><code>get_social_profile</code></a>
<a href="#uuidna-software"><code>get_software</code></a>
<a href="#uuidna-statement-census"><code>get_statement_census</code></a>
<a href="#uuidna-strict"><code>get_strict</code></a>
<a href="#uuidna-theorem-message"><code>get_theorem_message</code></a>
<a href="#uuidna-theorems"><code>list_theorems</code></a>
<a href="#uuidna-tokens"><code>get_tokens</code></a>
<a href="#uuidna-treason"><code>detect_traitors</code></a>
<a href="#uuidna-triad"><code>get_triad</code></a>
<a href="#uuidna-trial"><code>run_trial</code></a>
<a href="#uuidna-unify"><code>get_receipt</code></a>
<a href="#uuidna-units"><code>get_units</code></a>
<a href="#uuidna-unlocks"><code>get_unlocks</code></a>
<a href="#uuidna-vocabulary"><code>get_vocabulary</code></a>
<a href="#uuidna-vortex"><code>get_vortex</code></a>
<a href="#uuidna-vortex-dash"><code>decode_vortex_dash</code></a>
<a href="#uuidna-vortex-invariants"><code>compute_vortex_invariants</code></a>
<a href="#uuidna-vortex-reflection"><code>get_vortex_reflection</code></a>
<a href="#uuidna-vortex-tour"><code>get_vortex_tour</code></a>
<a href="#uuidna-zenodo-communities"><code>fetch_zenodo_communities</code></a>
<a href="#uuidna-address"><code>compute_address</code></a>
<a href="#uuidna-adjudicate"><code>verify_claim</code></a>
<a href="#uuidna-analytics"><code>compute_analytics</code></a>
<a href="#uuidna-article"><code>compute_article</code></a>
<a href="#uuidna-audit-details"><code>audit_details</code></a>
<a href="#uuidna-audit-video"><code>audit_video</code></a>
<a href="#uuidna-aura"><code>compute_aura</code></a>
<a href="#uuidna-by-lean"><code>compute_by_lean</code></a>
<a href="#uuidna-cern"><code>fetch_cern</code></a>
<a href="#uuidna-chain-seal"><code>compute_chain_seal</code></a>
<a href="#uuidna-coin64"><code>compute_coin64</code></a>
<a href="#uuidna-contract"><code>compute_contract</code></a>
<a href="#uuidna-credits"><code>compute_credits</code></a>
<a href="#uuidna-db-query"><code>query_db</code></a>
<a href="#uuidna-decide"><code>decide_expression</code></a>
<a href="#uuidna-detect-double-spends"><code>detect_double_spends</code></a>
<a href="#uuidna-detect-forgery"><code>detect_forgery</code></a>
<a href="#uuidna-diamond"><code>compute_diamond</code></a>
<a href="#uuidna-digital-root"><code>compute_digital_root</code></a>
<a href="#uuidna-discovery-train"><code>compute_discovery_train</code></a>
<a href="#uuidna-document"><code>compute_document</code></a>
<a href="#uuidna-double-torus"><code>compute_double_torus</code></a>
<a href="#uuidna-education-jobs"><code>fetch_education_jobs</code></a>
<a href="#uuidna-engine"><code>compute_engine</code></a>
<a href="#uuidna-exec"><code>run_app</code></a>
<a href="#uuidna-fanout"><code>call_host</code></a>
<a href="#uuidna-forensics"><code>compute_forensics</code></a>
<a href="#uuidna-fs-seal"><code>seal_fs</code></a>
<a href="#uuidna-gate"><code>check_citations</code></a>
<a href="#uuidna-gravity"><code>compute_gravity</code></a>
<a href="#uuidna-handle-store"><code>compute_handle_store</code></a>
<a href="#uuidna-harness"><code>compute_harness</code></a>
<a href="#uuidna-harness7"><code>compute_harness7</code></a>
<a href="#uuidna-holofractal"><code>compute_pentagram_fractal</code></a>
<a href="#uuidna-imprint"><code>imprint_text_chain</code></a>
<a href="#uuidna-invitation"><code>compute_invitation</code></a>
<a href="#uuidna-involute"><code>compute_involution</code></a>
<a href="#uuidna-leads-gate"><code>check_release_readiness</code></a>
<a href="#uuidna-license"><code>compute_license</code></a>
<a href="#uuidna-merkle-root"><code>compute_merkle_root</code></a>
<a href="#uuidna-neighbours"><code>compute_neighbours</code></a>
<a href="#uuidna-net-read"><code>read_net</code></a>
<a href="#uuidna-open-questions"><code>open_questions</code></a>
<a href="#uuidna-os-census"><code>compute_os_census</code></a>
<a href="#uuidna-pentagram-monographs"><code>compute_pentagram_monographs</code></a>
<a href="#uuidna-pentagram-stream"><code>compute_pentagram_stream</code></a>
<a href="#uuidna-predict"><code>predict_gaps</code></a>
<a href="#uuidna-prior-art"><code>compute_prior_art</code></a>
<a href="#uuidna-prove-verdict"><code>prove_verdict</code></a>
<a href="#uuidna-reactor"><code>compute_reactor</code></a>
<a href="#uuidna-read"><code>read_imprint_text_chain</code></a>
<a href="#uuidna-reeducate"><code>compute_correction</code></a>
<a href="#uuidna-reflects"><code>compute_reflects</code></a>
<a href="#uuidna-render"><code>compute_render</code></a>
<a href="#uuidna-render-list"><code>render_list</code></a>
<a href="#uuidna-report"><code>compute_report</code></a>
<a href="#uuidna-research"><code>compute_research</code></a>
<a href="#uuidna-reveal"><code>reveal_verdict</code></a>
<a href="#uuidna-run"><code>run_command</code></a>
<a href="#uuidna-run-sequence"><code>run_sequence</code></a>
<a href="#uuidna-search"><code>search_ledger</code></a>
<a href="#uuidna-search-trial"><code>search_trial</code></a>
<a href="#uuidna-seats"><code>compute_seats</code></a>
<a href="#uuidna-selftest"><code>compute_selftest</code></a>
<a href="#uuidna-send-trial"><code>send_trial</code></a>
<a href="#uuidna-sha256"><code>compute_sha256</code></a>
<a href="#uuidna-sign"><code>sign_commit</code></a>
<a href="#uuidna-skill"><code>compute_skill</code></a>
<a href="#uuidna-slim-gate"><code>check_citations_slim</code></a>
<a href="#uuidna-spin"><code>compute_spin</code></a>
<a href="#uuidna-team"><code>compute_team</code></a>
<a href="#uuidna-theorem"><code>get_theorem</code></a>
<a href="#uuidna-through-void"><code>compute_zero_division</code></a>
<a href="#uuidna-transform"><code>transform_until_verified</code></a>
<a href="#uuidna-try"><code>try_claim</code></a>
<a href="#uuidna-uuid-channel"><code>compute_uuid_channel</code></a>
<a href="#uuidna-verify"><code>verify_address</code></a>
<a href="#uuidna-verify-envelope"><code>verify_envelope</code></a>
<a href="#uuidna-verify-statement"><code>verify_statement</code></a>
<a href="#uuidna-wave"><code>run_wave</code></a>
<a href="#uuidna-wave-deposit"><code>deposit_wave</code></a>
<a href="#uuidna-agent-contribute"><code>compute_agent_contribute</code></a>
<a href="#uuidna-audit-coin-claim"><code>audit_coin_claim</code></a>
<a href="#uuidna-audit-voting"><code>audit_voting</code></a>
<a href="#uuidna-compare"><code>compare_publications</code></a>
<a href="#uuidna-context"><code>compute_context</code></a>
<a href="#uuidna-contract-chain"><code>seal_contract_chain</code></a>
<a href="#uuidna-contract-open"><code>open_contract</code></a>
<a href="#uuidna-contract-open-chain"><code>open_contract_chain</code></a>
<a href="#uuidna-contract-seal"><code>seal_contract</code></a>
<a href="#uuidna-coprime"><code>compute_coprime</code></a>
<a href="#uuidna-crew"><code>enroll_crew</code></a>
<a href="#uuidna-decrypt"><code>decrypt_envelope</code></a>
<a href="#uuidna-encrypt"><code>encrypt_text</code></a>
<a href="#uuidna-energy-biogas"><code>compute_energy_biogas</code></a>
<a href="#uuidna-energy-mfc"><code>compute_energy_mfc</code></a>
<a href="#uuidna-energy-photon"><code>compute_energy_photon</code></a>
<a href="#uuidna-energy-wind"><code>compute_energy_wind</code></a>
<a href="#uuidna-hmac"><code>compute_hmac</code></a>
<a href="#uuidna-merge"><code>merge_addresses</code></a>
<a href="#uuidna-merkle-proof"><code>compute_merkle_proof</code></a>
<a href="#uuidna-merkle-prove"><code>prove_merkle</code></a>
<a href="#uuidna-open-chain"><code>open_chain</code></a>
<a href="#uuidna-open-channel"><code>open_channel</code></a>
<a href="#uuidna-open-onion"><code>open_onion</code></a>
<a href="#uuidna-pbkdf2"><code>compute_pbkdf2</code></a>
<a href="#uuidna-poly1305"><code>compute_poly1305</code></a>
<a href="#uuidna-quantum-cube"><code>compute_quantum_cube</code></a>
<a href="#uuidna-quantum-message"><code>run_quantum_message</code></a>
<a href="#uuidna-reason"><code>reason_question</code></a>
<a href="#uuidna-receive"><code>receive_message</code></a>
<a href="#uuidna-rotate"><code>rotate_sequence</code></a>
<a href="#uuidna-seal-chain"><code>seal_chain</code></a>
<a href="#uuidna-seal-channel"><code>seal_channel</code></a>
<a href="#uuidna-seal-onion"><code>seal_onion</code></a>
<a href="#uuidna-seal-stream"><code>seal_stream</code></a>
<a href="#uuidna-send"><code>send_message</code></a>
<a href="#uuidna-trial-deposit"><code>deposit_trial</code></a>
<a href="#uuidna-aead-encrypt"><code>encrypt_aead</code></a>
<a href="#uuidna-audit-agent-statement"><code>audit_agent_statement</code></a>
<a href="#uuidna-bill"><code>bill_call</code></a>
<a href="#uuidna-chacha20"><code>compute_chacha20</code></a>
<a href="#uuidna-declare-spend"><code>declare_spend</code></a>
<a href="#uuidna-merkle-verify"><code>verify_merkle</code></a>
<a href="#uuidna-optimise"><code>optimise_linear</code></a>
<a href="#uuidna-quantum-voting"><code>compute_quantum_voting</code></a>
<a href="#uuidna-aead-decrypt"><code>decrypt_aead</code></a>
<a href="#uuidna-crt"><code>compute_crt</code></a>
<a href="#uuidna-machine"><code>compute_machine</code></a>
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

## Hosted absents <Badge type="warning" text="12 named" />

100% is a **finding**: a capability-absent tool is **named** on this page, not silently dropped so the hosted subset looks complete. `uuidna_school_apis` stays listed. The divergence list may only shrink.

- `uuidna_engine` — reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy
- `uuidna_wave_deposit` — CAPABILITY: writes lean/wave-queue.json and a Worker has no filesystem — deposits are host-side; the edge can expose coordinates (uuidna_expose serves there) but never hold the queue
- `uuidna_aead_decrypt` — reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy
- `uuidna_education_jobs` — reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy
- `uuidna_resources` — reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy
- `uuidna_wave` — reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy
- `uuidna_editorial` — CAPABILITY: editorialState reads prose-trials.json via the filesystem boundary — host-side
- `uuidna_security_plan` — CAPABILITY: secApi() probes the host for docker (spawnSync through resolveShell) and reads the pinned rootfs from disk (verifyPinnedRootfs) — host-side; served here it answered 'process is not defined' until 2026-09-07
- `uuidna_publication` — CAPABILITY: publicationStatus reads package.json and .zenodo.json — host-side
- `uuidna_search_trial` — POLICY: network fan-out (research sweep + mint extras) — hosted surface stays read-only recomputable
- `uuidna_selftest` — reaches a non-harmonic module — see EDGE_ABSENT above on capability vs policy
- `uuidna_run` — CAPABILITY: requires filesystem + spawn (docker/chroot) — stdio/host only by design; Layer 1 uuidna_exec serves the browser

## Identity & addressing <Badge type="tip" :text="'8'" />

*skill: address*

### `compute_address` {#uuidna-address}

**Compute address.** Returns string.

Call `compute_address` — the old name `uuidna_address` still answers · read-only · idempotent

```json
// arguments
{"text":"ec9e6641-989b-85de-aa57-58eedfea0d13"}
// answer (excerpt)
8a635adc-cec8-8808-81a0-f4bfd1fca0a9
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | the value to address |

Content-address any text: a deterministic 128-bit v8 UUID. Same input → same address, for anyone, with no key. Integrity, not secrecy. 122 free bits (theorem imprint_capacity_chain); ~2^61 birthday wall; non-cryptographic (forgeable by design).

THE ADDRESS AND ITS SPEECH, ONE SURFACE. Addressing a handle and speaking about it were never two questions: the address IS what folds to the residue the walk starts from, so the orbit comes free with the fold and costs no second call. THE VOCABULARY IS A THEOREM, NOT A TABLE — run every ledger key through the walk and all 1371 land on exactly SIX distinct orbits, the same six sealed as a literal in theorem orbits_closed_involution, each proven closed under dz(x) = 10 − x. A word therefore cannot be lost in a refactor unnoticed, the way a hand-typed phrase table can and did. The TITLE is the orbit written out (0–9, 0·1·9, 0), so it can never claim more than the walk performs — a name comes from the algebra or it is not a name. The DESCRIPTION is composed from the walk's own measurements, never selected from a phrase list, and ORDER is the orbit size: the period any motion must have, which is why a fixed point does not move and a ten-digit orbit turns ten. Served as a DIMENSION of the address rather than a tool of its own, for the same reason the capability axis is one surface and never one tool per skill: enumeration costs every agent wire bytes on every request, superposition costs none. integrity, not truth (theorem provenance_integrity_not_content_truth) — a residue is not a fact about the thing that folded to it, and the speech reports the measured shape of a walk, never what a handle MEANS.

### `compute_uuid_channel` {#uuidna-uuid-channel}

**Compute uuid channel.** Returns {address,handle,door,trinities,words,middle,tail,executable,…}.

Call `compute_uuid_channel` — the old name `uuidna_uuid_channel` still answers · read-only · idempotent

```json
// arguments
{"address":"ec9e6641-989b-85de-aa57-58eedfea0d13"}
// answer (excerpt)
{"address":"ec9e6641989b85deaa5758eedfea0d13","handle":"ec9e6641","door":"https://uuidna.com/ec9e6641","trinities":["989b","85de","aa57"],"words":"989b85deaa57…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `address` | string | **yes** | a 128-bit uuid (with or without… |

THE 8-4-4-4-12 CHANNEL — slice any uuid into handle (double-torus door), three hex trinities (executable message-cap tiles), and tail (sealed micro-message). Returns {handle,door,trinities,tail,executable,tailStates,torusHome,widths,payloadStoreOptional}. No payload store required for route, aura, boards, or crypt — load src/handles only when the body is needed. Sealed: layout_groups_thirtytwo, message_cap_is_four_hexbits, the_uuid_is_two_boards.

### `get_handle` {#uuidna-handle}

**Get handle.** Returns {address,handle,path,parts,roundTrip,payloadPresent,theorems,…}.

Call `get_handle` — the old name `uuidna_handle` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"address":"08b07830-c9d8-88d2-bd10-bb46c60b4d67","handle":"08b07830","path":"src/handles/08/b0/78/30/index.json","parts":["08","b0","78","30"],"roundTrip":tru…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `address` | string | no | content-address (first 8 hex →… |
| `handle` | string | no | eight lowercase hex characters |
| `loadPayload` | boolean | no | read index.json when present (h… |

Handle store — derive path from address or handle, live round-trip, optional payload. Pure. Sealed: handle_splits_four, message_carries_address, payload_carries_the_strand.

### `seal_channel` {#uuidna-seal-channel}

**Seal channel.** Returns {uuids,layers,receipt,channels}.

Call `seal_channel` — the old name `uuidna_seal_channel` still answers · read-only · idempotent

```json
// arguments
{"message":"theorem","passphrases":["theorem"]}
// answer (excerpt)
{"uuids":["e6f644ec-4474-8625-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222c…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `message` | string | **yes** |  |
| `passphrases` | array | **yes** | innermost→outermost, 1..16 laye… |
| `step` | integer | no | optional advancing crypt-salt s… |

AUTOMATION PATH — onion-seal a message (uuidna_seal_onion) and attach per-uuid channel slices for every link in the chain. Returns {uuids,layers,receipt,channels} where each channel is handle+trinities+tail without any payload-store dependency. Passphrases innermost→outermost; optional advancing step closes the equality leak.

### `merge_addresses` {#uuidna-merge}

**Merge addresses.** Returns string.

Call `merge_addresses` — the old name `uuidna_merge` still answers · read-only · idempotent

```json
// arguments
{"a":"theorem","b":"theorem"}
// answer (excerpt)
13e2030c-4cdf-8cae-b021-94727128d554
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `a` | string | **yes** |  |
| `b` | string | **yes** |  |

Fold two content-addresses into one, ORDER-SENSITIVE (merge(a,b) ≠ merge(b,a)) — the directed edge. For the order-INVARIANT fold use uuidna_gravity or uuidna_merkle_root.

### `compute_coin64` {#uuidna-coin64}

**Compute coin64.** Returns string.

Call `compute_coin64` — the old name `uuidna_coin64` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
ec9e6641989b85de
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

Mint a 64-bit coin (16 hex digits) from any content — the top 64 bits of its content-address, carrying handle architecture inside. Forging must satisfy FUSED_RING neighbour witnesses and the reflecting face (63+1=64). Integrity routing, not secrecy.

### `compute_digital_root` {#uuidna-digital-root}

**Compute digital root.** Returns integer.

Call `compute_digital_root` — the old name `uuidna_digital_root` still answers · read-only · idempotent

```json
// arguments
{"n":1}
// answer (excerpt)
1
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `n` | number | **yes** |  |

The fall of an integer to its ℤ/9 digital root (1..9) — the number's gravity, recomputable by anyone.

### `get_strict` {#uuidna-strict}

**Get strict.** Returns {address,href,handle,fuse,coins,beyond,frontier,boundary,chain,…}.

Call `get_strict` — the old name `uuidna_strict` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"address":"645beed1-9c10-8c00-8fc1-f6a9ac7d21e9","href":"https://qpu.uuidna.com","handle":"645beed1","fuse":{"half":16,"whole":32,"bits":128,"coins":2,"closes…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | no |  |

The STRICT content-address: normalise the input (so equivalent values converge) then address it — strictUuidna(3) === strictUuidna(" 3 "). Omit text for sweaterOf — trinity / thirdEye / allSeeingEye (alseeing eay) / ideas (each one particle) / guardians / creators via the same door.

## Other <Badge type="tip" :text="'123'" />

*skill: other*

### `compute_invitation` {#uuidna-invitation}

**Compute invitation.** Returns {kind,tool,recompute,why}.

Call `compute_invitation` — the old name `uuidna_invitation` still answers · read-only · idempotent

```json
// arguments
{"recompute":false}
// answer (excerpt)
{"kind":"contract","tool":"uuidna_invitation","recompute":false,"why":"a sweep over the sealed ledger; call with recompute: true"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `recompute` | boolean | **yes** | run the sweep now |

The offer to another repo, COMPUTED from this tree at the moment of asking — theorem and wing counts, the handle store, the host width and which point bound it. Every figure is read, none is typed, so the answer cannot be stale. Returns what is offered, what is ASKED in return (an invitation that hides obligations is a sales page) and what is REFUSED — there is no quantum hardware here and none is claimed. AN EMPTY CALL IS CHEAP: this is a sweep over the sealed ledger (seconds to tens of seconds, measured 2026-09-12), so it runs only when asked for by name — pass {recompute: true}; without it the reply is this contract and nothing is computed.

### `get_lead_clusters` {#uuidna-lead-clusters}

**Get lead clusters.** Returns {leads,clusters,edges,unanchored,unreadable}.

Call `get_lead_clusters` — the old name `uuidna_lead_clusters` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"leads":1073,"clusters":[{"term":"astronomy","handle":"f7a0f261","leads":38},{"term":"fermat","handle":"dd674c0e","leads":38},{"term":"security","handle":"794…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `term` | string | no | a single name to ask about; omi… |

Which sealed wings the tree's open and refuted leads stand around — every cluster computed in ONE pass over the corpus, not one scan per name. Leads are addressed by HANDLE (handleOf(toUuid(text))), so identity is content and the crosslink is handle-to-handle; the vocabulary is the tree's own wing names rather than a hand-typed synonym table — the derived-not-typed law, theorem monitoring_the_points_covers_every_crack_by_architecture: a complete set of classes covers what has not been seen yet, where a hand-written list covers only what has. Pass `term` to ask about one name (any word, whether or not a wing carries it). UNANCHORED leads — real work naming no sealed wing — are reported rather than dropped, and a source that could not be parsed is UNREADABLE, never counted as zero.

### `compute_handle_store` {#uuidna-handle-store}

**Compute handle store.** Returns {kind,tool,recompute,why}.

Call `compute_handle_store` — the old name `uuidna_handle_store` still answers · read-only · idempotent

```json
// arguments
{"recompute":false}
// answer (excerpt)
{"kind":"contract","tool":"uuidna_handle_store","recompute":false,"why":"a sweep over the sealed ledger; call with recompute: true"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `recompute` | boolean | **yes** | run the sweep now |

Handle store census — OCCUPANCY (leaves and keys on disk, by kind), CAPACITY (what the addressing admits: 2^32 leaves, and n(n-1)/2 links among the leaves present), and USE (the tree takes n-1 of those pairs). Three numbers a surface must never quote as one. Soundness is reported as a fraction — path spells handle, handle is the address prefix — and a file that cannot be read is UNMEASURED, never counted sound. AN EMPTY CALL IS CHEAP: this is a sweep over the sealed ledger (seconds to tens of seconds, measured 2026-09-12), so it runs only when asked for by name — pass {recompute: true}; without it the reply is this contract and nothing is computed.

### `open_channel` {#uuidna-open-channel}

**Open channel.** Returns {message,uuids,layers,receipt,channels,tamper}.

Call `open_channel` — the old name `uuidna_open_channel` still answers · read-only · idempotent

```json
// arguments
{"passphrases":["theorem"],"uuids":["e6f644ec-4474-8625-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222c22697","e68cae44-4746-8c60-9818-1818161139b0","e76c7422-3a22-8774-858d-51acd1e13924","e7a363a1-997b-83a5-8b2e-89eea70ce7a7","e7488b08-9b9b-8db9-a365-223a2236436f","e6d296e8-de66-886d-aba2-632aa312a911","e6c22637-4223-8a22-9b56-540c8c935458","e738b39e-9e91-8161-84e8-c2ce44744470","e6bd3d49-0dd1-8158-a6c6-82f6848564c6","e68a6e0c-e886-8cee-9e9e-91161130b232","e6726573-7322-83a2-8999-98d98d88dd85","e71169c9-ab0b-8196-a706-e6ac65ac2647","e64c0b4c-8d19-80c8-b135-613233346339","2044fa00-0000-8000-8000-000000000000"]}
// answer (excerpt)
{"message":"theorem","uuids":["e6f644ec-4474-8625-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b5…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `uuids` | array | **yes** | uuid chain from uuidna_seal_cha… |
| `passphrases` | array | **yes** | innermost→outermost, same order… |

INVOLUTE of uuidna_seal_channel — one command: peel the onion (ChaCha20-Poly1305, outermost-first), decode the plaintext, and attach every uuid channel slice (handle + merged words + tail) so handles work together without the payload store. Wrong key, reorder, or tamper throws (Poly1305). Returns {message,uuids,layers,receipt,channels,tamper} where tamper is verify-vs-forge at handle, coin, and uuid tiers including neighbour and related witness counts (63·2+2=128 at uuid). Boundary declared — theorem drift_is_named_or_caught.

### `compute_merkle_proof` {#uuidna-merkle-proof}

**Compute merkle proof.** Returns {root,index,leaf,proof,verified}.

Call `compute_merkle_proof` — the old name `uuidna_merkle_proof` still answers · read-only · idempotent

```json
// arguments
{"leaves":["theorem"],"index":1}
// answer (excerpt)
{"root":"df34fdc2-38c6-855d-a479-060c4b2c0f2d","index":1,"proof":[],"verified":false}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `leaves` | array | **yes** |  |
| `index` | integer | **yes** |  |

Holographic merkle proof: {leaves, index} → verified root, O(log N), both doors.

### `get_coins` {#uuidna-coins}

**Get coins.** Returns {coins,unit,seals,minted,capacity,referrerDoors,combinations,…}.

Call `get_coins` — the old name `uuidna_coins` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"coins":2,"unit":2,"seals":71018,"minted":142036,"capacity":128,"referrerDoors":6,"combinations":42,"max":5376,"remaining":-136660,"capSeals":2688,"unsealed":…
```

_No parameters._

Captain-coin mint: coins() per theorem, cap = capacity × combinations. Returns mint, remaining, cipher widths, and tamper costs (handle/coin/uuid ladder with neighbour + related witnesses).

### `compute_license` {#uuidna-license}

**Compute license.** Returns {licensee,scope,spdx,terms,bill,licenseAddress,address,honest}.

Call `compute_license` — the old name `uuidna_license` still answers · read-only · idempotent

```json
// arguments
{"licensee":"theorem"}
// answer (excerpt)
{"licensee":"theorem","scope":"non-commercial","spdx":"CC-BY-NC-ND-4.0","terms":"CC-BY-NC-ND-4.0 — read and redistribute UNCHANGED, with attribution, NON-COMME…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `licensee` | string | **yes** | the party the record binds (nam… |
| `commercial` | boolean | no |  |
| `recomputeOps` | number | no |  |
| `verifyOps` | number | no |  |

Issue the LICENCE RECORD: terms plus the two-coins bill, addressed. Bind a licensee and a usage into ONE content-addressed, verifiable artifact carrying the CC-BY-NC-ND-4.0 terms and the measured bill. Non-commercial use is FREE (0 coins) and needs no licence; commercial use is billed the two conserved coins (110 − 108 = 2) on the measured advantage (recompute − verify). CLAIMED, with receipts: the terms ARE the licence (CC-BY-NC-ND-4.0 grants real rights on real conditions, and a commercial grant on these terms is an agreement executed between the parties), and the bill is DECIDED — theorem captain_commission_two_coins (commission 110 = 2), conserved by two_coins. The record content-addresses every binding term and bill field, so verifyLicense recomputes it and any alteration is visible. THE ONE ABSENCE: no signature — it proves what was agreed and how much, never who. Returns {licensee,scope,spdx,terms,bill,address,honest}. Boundary declared — theorem drift_is_named_or_caught.

### `get_unlocks` {#uuidna-unlocks}

**Get unlocks.** Returns {law,keys,distinct,skills,files,bySkill,byFile,illustrations,…}.

Call `get_unlocks` — the old name `uuidna_unlocks` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"law":"Each sealed by-decide theorem unlocks exactly what it states — the ledger is the unlock board. No curated exception list; refusing a sealed key is refu…
```

_No parameters._

Unlock board from theorems(): each sealed by-decide key unlocks its statement. Returns {keys,distinct,skills,files,bySkill,illustrations,receipt,honest}. Illustrations are presence checks, not a closed set. Unsealed ≠ locked.

### `deposit_trial` {#uuidna-trial-deposit}

**Deposit trial.** Returns {claim,parties,diamonds,toBuild,deposited,parity,coins,verdict,…}.

Call `deposit_trial` — the old name `uuidna_trial_deposit` still answers · read-only · idempotent

```json
// arguments
{"claim":"theorem","deposits":[{"party":"theorem","proof":"mul9_1_1"}]}
// answer (excerpt)
{"claim":"theorem","parties":["theorem"],"diamonds":[{"party":"theorem","kind":"proof","basis":"mul9_1_1","sealed":"a9d5aa49-2480-8b10-bb51-b7c52d5852e0"}],"to…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | **yes** |  |
| `deposits` | array | **yes** |  |

Run a trial that REQUIRES the two coins DEPOSITED BY THE PARTIES (local). Each party deposits a proof — a sealed theorem KEY or exact STATEMENT (the two-coin fold) — which SEALS into a content-addressed DIAMOND. The trial computes ONLY in PARITY: every party must have sealed a diamond (a one-sided deposit does not compute); it then settles by itself (adjudicate → verdict). Who LACKS a diamond gets the recipe to BUILD one (toBuild) and re-deposit — recycled, never discarded. HONEST: the deposit buys the COMPUTATION, never the outcome — a deposited claim can still return UNVERIFIED. Returns {claim,parties,deposited,parity,coins,diamonds,toBuild,verdict,remanded,note,receipt}. Boundary declared — theorem drift_is_named_or_caught.

### `get_conformance` {#uuidna-conformance}

**Get conformance.** Returns {checks,conforms,passed,failed,receipt}.

Call `get_conformance` — the old name `uuidna_conformance` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"checks":[{"id":"captain-coins-conserved","pass":true,"detail":"coins() = 2 and two_coins is sealed — the conserved fair-exchange invariant holds"},{"id":"led…
```

_No parameters._

The COMMIT DNA GATE — fold uuidna's core invariants into ONE recomputable check so no agent sneaks incompatible DNA into the ledger: the captain coins are conserved (coins()=2), EVERY theorem's content-address recomputes (a forged/tampered theorem is caught), the ledger is single-sourced from lean/*.lean, and the security posture is clean (zero runtime deps, defences + collision-resistance sealed, honesty gate bites, Clay solves none). `conforms` is true iff every check passes; folds to one receipt anyone recomputes. Enforced in the pre-push wave — a non-conforming commit is blocked. Returns {checks,conforms,passed,failed,receipt}. Boundary declared — theorem drift_is_named_or_caught.

### `get_exploit_fold` {#uuidna-exploit-fold}

**Get exploit fold.** Returns {folded,outOfScope,foldedCount,outOfScopeCount,total,…}.

Call `get_exploit_fold` — the old name `uuidna_exploit_fold` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"folded":[{"key":"fold_trojan_source_bidi","verdict":"FOLDED","exploit":"Trojan-Source bidirectional-override text (CVE-2021-42574): the sanitiser strips all …
```

_No parameters._

Audit the known public exploit CLASSES, computed from the ledger with no table. Each class is a sealed `by decide` theorem in Exploits.lean carrying its CVE/CWE code inline. Verifies BOTH the problem (the class is a sealed theorem, address recomputed) AND the solution (the defence it cites is itself sealed, or a named design property). FOLDED classes emerge as verified solutions (Trojan-Source, prototype-pollution, supply-chain, DoS, weak-hash, tampering, code-injection, weak-RNG); OUT-OF-SCOPE classes fold to the void (compromised host, deceived human, physical side-channel, FNV-as-secret, non-decidable correctness). HONEST: uuidna does NOT solve all hacks — the boundary is named, never falsely marked solved. Returns {folded,outOfScope,foldedCount,outOfScopeCount,allBothVerified,honest,receipt}. Boundary declared — theorem drift_is_named_or_caught.

### `sanitize_value` {#uuidna-sanitize}

**Sanitize value.** Returns {value,address,receipt}.

Call `sanitize_value` — the old name `uuidna_sanitize` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"value":null,"address":"6f3dc604-345d-8b24-bf7e-8edf68072a27","receipt":"9434b17f-551d-837b-ad56-08b7705e7542"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `value` | any | no | any value to sanitise by all st… |

ONE COMMAND to process ANY input and sanitise ANY output, BY ALL STANDARDS — the same guards the engine runs on every tool, exposed directly. Returns a JSON-safe, bounded, acyclic copy: NaN/±∞→null, BigInt→string, functions/symbols dropped, cycles broken, depth/array/keys bounded, prototype-pollution keys (__proto__/constructor/prototype) dropped, and control/null-byte + Unicode BIDI-override (Trojan-Source) code points stripped from every string — while legitimate maths unicode is preserved. Deterministic: the sanitized value folds to a recomputable `receipt`. The bounds/standards are sealed as theorems (Sanitize.lean), so the rule is sent by the theorems themselves. Returns {value,address,receipt}.

### `compute_engine` {#uuidna-engine}

**Compute engine.** Returns {op,input,output,address,receipt,ok,error}.

Call `compute_engine` — the old name `uuidna_engine` still answers · read-only · idempotent

```json
// arguments
{"op":"theorem"}
// answer (excerpt)
{"op":"theorem","input":{},"output":null,"address":"","receipt":"","ok":false,"error":"unknown tool: theorem"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `op` | string | **yes** | the tool op to run through the… |
| `args` | object | no | the input arguments for that op |

THE UUIDNA QUANTUM ENGINE — one input→output surface over every sealed tool. Import/export fused into input→output: you do not import a function, you feed the engine an INPUT {op, args} and read its OUTPUT. It runs the same dispatch the server runs (callTool), then folds the triple (op, input, output) order-invariantly to a content-address `receipt` anyone recomputes, and binds the run to an `address`. Does NOT dispatch itself (no recursion). HONEST: computes nothing the underlying sealed tool does not — it is the door, not a new claim. Returns {op,input,output,address,receipt,ok,error?}. Boundary declared — theorem drift_is_named_or_caught.

### `compute_pentagram_monographs` {#uuidna-pentagram-monographs}

**Compute pentagram monographs.** Returns {kind,tool,recompute,why}.

Call `compute_pentagram_monographs` — the old name `uuidna_pentagram_monographs` still answers · read-only · idempotent

```json
// arguments
{"recompute":false}
// answer (excerpt)
{"kind":"contract","tool":"uuidna_pentagram_monographs","recompute":false,"why":"the sweep is minutes over the sealed ledger; call with recompute: true"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `recompute` | boolean | **yes** | sweep every monograph now |

Split every domain monograph into PENTAGRAMS of five, the split COMPUTED FROM THE CONTENT-ADDRESSES (not hand-assigned): the monographs are sorted by their own address, chunked five to a pentagram, each pentagram WALKED in the {5/2} single-stroke order [0,2,4,1,3] (`pentagram_single_stroke`) while its IDENTITY is the order-INVARIANT fold of its five members (`merkleGravity`) — the walk is a sequence, the seal is a set. Zero-arg, recomputable: the same ledger yields the same pentagrams for everyone. HONEST: a content-addressed PARTITION, claiming no thematic kinship among the five — only the split the addresses produce. Returns {pentagrams,count,full,remainder,receipt}. Boundary declared — theorem drift_is_named_or_caught. AN EMPTY CALL IS CHEAP: the sweep is minutes over the sealed ledger (measured 2026-09-12: 268 s for the monographs, 213 s for analytics, 161 s for the self-test on a loaded host), so it runs only when asked for by name — pass {recompute: true}; without it the reply is this contract and nothing is computed.

### `compute_spin` {#uuidna-spin}

**Compute spin.** Returns {address,coin}.

Call `compute_spin` — the old name `uuidna_spin` still answers · read-only · idempotent

```json
// arguments
{"content":"theorem"}
// answer (excerpt)
{"address":"ec9e6641-989b-85de-aa57-58eedfea0d13","coin":"ec9e6641989b85de"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `content` | string | **yes** | the bytes to spin into a conten… |

"Spin the bits and get the coins" — fold any content into its content-address and take the coin64 (its top 64 bits). This is the O(1) primitive under the derived-layer gate: a derived file is a FIXED POINT when its re-spun coin equals its sealed coin (verify O(1), `verify_cheaper_than_forge`), and a moved coin is non-quantum DRIFT that the gate hard-rejects. Once sealed, the bits spin by themselves — the gate re-spins each derived file with no manual step. HONEST: the FNV/coin address is non-cryptographic integrity (routing/fixed-point detection), not secrecy. Returns {address, coin}. Boundary declared — theorem drift_is_named_or_caught.

### `get_grid` {#uuidna-grid}

**Get grid.** Returns {kind,tool,recompute,why}.

Call `get_grid` — the old name `uuidna_grid` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"kind":"contract","tool":"uuidna_grid","recompute":false,"why":"the whole grid is a sweep over the sealed ledger; pass {dimension, wing} for one seat or recom…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `recompute` | boolean | no | run the sweep now |
| `dimension` | string | no | a projected ray |
| `wing` | string | no | a ledger wing |

THE 432 GRID — every (projected dimension × ledger wing) seat, named, addressed and folded to one root. Omit args for the whole report; pass {dimension,wing} to address ONE seat. WHY 432 AND NOT 504: DIMENSIONS[0] is `en` and the wings are WRITTEN in it, so projecting a wing into en is the IDENTITY — 7 × 72 = 504 counts 72 seats that compute nothing, and 504 − 72 = 432 is exactly the seats that do work. 432 then factors twice and the two fuse: 6 × 72 and 16 × 27 = 2^4 × 3^3, reached by the digit-reversal INVOLUTION 72 ↦ 27 — both clauses sealed in theorem k432, both of digital root 9. A LIVE gate, not a frozen number: 6·w has digital root 9 only when w ≡ 0 (mod 3), so wings must be added THREE at a time or the grid breaks, and gridGaps reports it. Returns {rays,wings,seats,sealed,factorisations,involution,root,harmonic,gaps} or one {dimension,wing,name,address}. a seat is the content-address of one wing read along one locale ray — a RECEIPT, never a translation; it proves every wing is reachable from every ray, never that it has been rendered into that language. Integrity, not truth (theorem provenance_integrity_not_content_truth). AN EMPTY CALL IS CHEAP: this is a sweep over the sealed ledger (seconds to tens of seconds, measured 2026-09-12), so it runs only when asked for by name — pass {recompute: true}; without it the reply is this contract and nothing is computed.

THE 432 GRID — every (projected dimension × ledger wing) seat, named, addressed and folded to one root. Omit args for the whole grid report; pass {dimension, wing} to address ONE seat. WHY 432 AND NOT 504: DIMENSIONS[0] is `en` and the wings are WRITTEN in it, so projecting a wing into en is the IDENTITY — 7 × 72 = 504 counts 72 seats that compute nothing, and 504 − 72 = 432 is exactly the seats that do work. 432 then factors TWICE and the two fuse: 6 × 72 (rays × wings) and 16 × 27 = 2^4 × 3^3, reached by the digit-reversal INVOLUTION 72 ↦ 27 — both clauses already sealed in theorem k432, both counts of digital root 9. The grid is a LIVE gate, not a frozen number: 6·w has digital root 9 only when w ≡ 0 (mod 3), so wings must be added THREE at a time or the grid breaks (73 wings → 438, digital root 6), and gridGaps reports it. a seat is the content-address of one wing read along one locale ray — a RECEIPT, never a translation (theorem provenance_integrity_not_content_truth); the grid proves every wing is reachable from every ray, never that it has been rendered into that language. Returns {rays,wings,seats,sealed,factorisations,involution,root,harmonic,gaps} or one {dimension,wing,name,address}.

### `get_pairs` {#uuidna-pairs}

**Get pairs.** Returns {dimensions,directions,sealed,orbits,identityExcluded,readings,…}.

Call `get_pairs` — the old name `uuidna_pairs` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"dimensions":7,"directions":42,"sealed":42,"orbits":21,"identityExcluded":7,"readings":["7 × 6 = 42  (sources × targets)","6 × 7 = 42  (the same 42, transpose…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `from` | string | no | the source dimension (one of th… |
| `to` | string | no | the target dimension, never equ… |

THE 42 PAIR GRID — every ordered DIRECTION between dimensions, by the same rule that makes 432: the full product with the identity removed (7 × 7 = 49 minus the 7 self-pairs = 42). Transposition swaps the readings, squares to the identity and has no fixed point, so the 42 directions fall into exactly 21 orbits of size two; 42 is a SECOND grid, not a reshape of 432 (it does not divide it, and its digital root is 6). Omit args for the whole report; pass {from,to} for one direction. Returns {dimensions,directions,sealed,orbits,identityExcluded,readings,root,gaps} or {from,to,name,address}. a pair is a named direction with a recomputable address — never a translation, and never evidence that anything has been carried along it. Integrity, not truth (theorem provenance_integrity_not_content_truth).

THE 42 PAIR GRID — every ordered DIRECTION between dimensions. Omit args for the whole report; pass {from, to} to address one direction. THE SAME RULE THAT MAKES 432 MAKES 42: the wing grid is the full product with the identity removed (7 × 72 = 504 minus the 72 seats where a wing is read along the ray it is already written in), and applying that rule to the dimensions alone gives 7 × 7 = 49 minus the 7 self-pairs = 7 × 6 = 42. One law, not two coincidences. 6 × 7 AND 7 × 6 ARE THE SAME 42, and the difference is the involution: a pair is ORDERED, so reading the product one way gives sources × targets and the other targets × sources; transposition swaps them, squares to the identity, and has NO fixed point precisely because the self-pairs were removed — so the 42 directions fall into exactly 21 transpose orbits of size two and no direction is its own reverse. 42 IS NOT A RESHAPE OF 432: it does not divide it (432 / 42 is not an integer) and its digital root is 6, not 9 — a SECOND grid over a different domain, kept separate on purpose, since the wing grid answers which wing is reachable from which ray and this one answers which dimension can be carried to which other. a pair is a named direction with a recomputable address, never a translation and never evidence that any content has been carried along it (theorem provenance_integrity_not_content_truth); the grid proves the directions are all present, distinct and balanced, and says nothing about what travels. Returns {dimensions,directions,sealed,orbits,identityExcluded,readings,root,gaps} or one {from,to,name,address}.

### `get_quantum_sailing_weather` {#uuidna-quantum-sailing-weather}

**Get quantum sailing weather.** Returns {error}.

Call `get_quantum_sailing_weather` — the old name `uuidna_quantum_sailing_weather` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"error":"invalid action"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `action` | string | no | discover APIs, correlate facts,… |
| `facts` | array | no | weather facts to correlate (req… |

DISCOVER and CORRELATE weather data to sealed theorems. Pass {action:"discover"} to list public APIs (NOAA, Open-Meteo, no keys required). Pass {action:"correlate", facts:[{source,measurement,value,unit}]} to LINK weather facts to the ledger — sealed-match (already a theorem) vs. novel (research lead). PURE correlation: no network calls, only checks. Pass {action:"sample"} for fixed sample data (same call → same facts). Returns {correlated,novel,receipt}.

### `get_quantum_sailing_cross_book` {#uuidna-quantum-sailing-cross-book}

**Get quantum sailing cross book.** Returns {error}.

Call `get_quantum_sailing_cross_book` — the old name `uuidna_quantum_sailing_cross_book` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"error":"invalid action or missing books"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `action` | string | no | correlate across books or clust… |
| `books` | array | no | books to correlate (required fo… |

CROSS-BOOK CORRELATION: theorems that RESONATE only when two or more books are read together. The captain reads across the whole library to find them. Pass {action:"correlate", books:[{id,text,facts}]} to find shared theorems and decidable facts that appear in multiple books. Pass {action:"cluster"} to GROUP theorems by their citations across books — which sealed theorems appear in multiple books? PURE correlation: all logic deterministic and recomputable; network (if fetching books) is application-layer. Shared theorems cite sealed proofs; novel patterns are research leads. Returns {pairs,resonances,ledgerCited,novel,receipt} or {count,clusters}.

### `compute_report` {#uuidna-report}

**Compute report.** Returns {sources,audited,corroborated,publishable,findings,receipt,…}.

Call `compute_report` — the old name `uuidna_report` still answers · read-only · idempotent

```json
// arguments
{"draft":"theorem"}
// answer (excerpt)
{"sources":[],"audited":true,"corroborated":false,"publishable":false,"findings":[],"receipt":"f87f7253-e999-8a9a-bd88-07515b2b9624","honest":"The reporter's m…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `draft` | string | **yes** | the report draft (its claims ar… |
| `sources` | array | no | the independent sources (≥ 2 to… |

The REPORTER'S METHOD (Report.lean) reflected live: file a report of a PROVEN discovery and it PUBLISHES only when AUDITED (the honesty gate clears — no sentence cites a fabricated theorem) AND CORROBORATED (≥ 2 independent sources), the AND sealed as publish_gate_is_conjunction. uuidna does NOT verify world events — no by-decide settles whether something happened out there; the reporter reports uuidna's OWN proven discoveries. Completeness (the 5 W's + 1 H) and the trinity edit are HUMAN passes, not decided here. Returns {audited,corroborated,publishable,findings,receipt}. Boundary declared — theorem drift_is_named_or_caught.

### `list_open_coordinates` {#uuidna-expose}

**List open coordinates.** Returns {lonely,gridGaps,pairsGaps,counts,receipt,honest}.

Call `list_open_coordinates` — the old name `uuidna_expose` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"lonely":[{"key":"xor_translation_preserves_adjacency_0","file":"EquilibriumXor1.lean","principle":"The six-cube translation by 0"},{"key":"xor_translation_pr…
```

_No parameters._

THE COORDINATES WHERE UNSEALED STRUCTURE EXPOSES ITSELF (lead 131, the discovery half of the one-call loop): walk the ledger's own coordinate surfaces and return where clusters point at missing seals — LONELY theorems (a computing principle with no neighbour: the cluster of one, asking for its second), GRID gaps (the 432 grid's own report of broken seats), PAIR gaps. Pure and offline — the coordinates compute from the sealed ledger alone, folded to one receipt. HONEST: a coordinate is WHERE to dig, never a theorem — what it exposes becomes real only when a candidate rides uuidna_wave_deposit and the KERNEL seals it. Returns {lonely,gridGaps,pairsGaps,counts,receipt,honest}.

A coordinate is integrity, not truth (theorem provenance_integrity_not_content_truth): the tool says where the ledger has open structure, and only a kernel seal makes a candidate a theorem.

### `deposit_wave` {#uuidna-wave-deposit}

**Deposit wave.** Returns {deposited,refused,pending,receipt,handle,hexbits,door,coin,…}.

Call `deposit_wave` — the old name `uuidna_wave_deposit` still answers · changes state

```json
// arguments
{"candidates":[{"key":"theorem","why":"theorem","lean":"theorem"}]}
// answer (excerpt)
{"deposited":[],"refused":[{"key":"theorem","reason":"why is missing — a theorem presents with its prose"}],"pending":0,"receipt":"687a85b9-52d0-8c0f-88d4-684e…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `candidates` | array | **yes** | the candidates, each {key, why,… |

SAVE THEOREM CANDIDATES IN ONE CALL (lead 131, the deposit half of the loop): pass {candidates:[{key,why,lean}]} and each is validated at the conveyor's OWN door (the same laws queue-wave enforces: lawful key, real why, `by decide` only, no sorry/axiom, no dupes); the lawful land in lean/wave-queue.json pending, where the resident wave probes each alone, the KERNEL the judge. HONEST: the deposit buys VALIDATION and QUEUEING, never a seal (theorem provenance_integrity_not_content_truth) — refusals return with reasons named; a validated candidate is PENDING until the kernel speaks. Host-side only (no filesystem at the edge — capability, declared). Returns {deposited,refused,pending,receipt,honest}.

### `fetch_api_mint` {#uuidna-api-mint}

**Fetch api mint.** Returns {research,euEducation,weather,news,journals,other,count,…}.

Call `fetch_api_mint` — the old name `uuidna_api_mint` still answers · read-only · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"research":[{"id":"nist-gov","host":"nist.gov","base":"https://physics.nist.gov/cuu/Constants/Table/allascii.txt","kind":"research","access":"keyless","direct…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | no | topic to ask every API; omit fo… |
| `deposit` | boolean | no | queue lawful candidates pending… |

FREE MINT from every wired public API. Omit {query} for the catalog (pure, hexbit door); pass {query} to harvest decidable fragments; {deposit:true} queues pending, host-side. Evidence never auto-seals — only the kernel mints (theorem minting_is_free_and_forging_is_not). Returns catalog or {query,evidence,sources,mintable,candidates,receipt,door,deposit?,honest}.

No query → publicApiRegistry() (pure, edge-safe). With query, fans out to research (11 hosts), EU education (ESCO, Eurostat, data.europa, GISCO, CORDIS, TED), weather (Open-Meteo, NOAA tides), and news (Wikinews) via collectApiEvidence; mintLeadsFromText + decide() at zero cost; TRUE-and-unsealed fragments become wave candidates. Deposit writes lean/wave-queue.json or refuses by name when the runtime has no filesystem.

### `get_domains` {#uuidna-domains}

**Get domains.** Returns {seeded,ask}.

Call `get_domains` — the old name `uuidna_domains` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"seeded":[{"domain":"database","note":"engines, clients, bindings and tooling that Alpine names for a database — membership is a pattern, not a verdict"},{"do…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `domain` | string | no |  |
| `a` | string | no |  |
| `b` | string | no |  |
| `all` | boolean | no |  |

THE ALPINE PORT, BY DOMAIN — database, filesystem and blockchain read off Alpine's own published names and descriptions, with the arithmetic each domain satisfies. Pass {domain} for one census, or nothing for all three; pass {a,b} instead for the inclusion-exclusion across two. WHAT IS PROVEN AND WHAT IS MEASURED, and they must not be confused: the ARITHMETIC over the counts is exact and decided by the kernel (a domain and its complement sum to the catalogue; origins bound packages, and the difference is the companion -dev/-doc/-libs packages). The MEMBERSHIP is a pattern match and is a MEASUREMENT with known failures — addrwatch-mysql is a monitoring tool and aws-sdk-cpp-timestream-influxdb is an SDK, neither is a database. No sum promotes a match into a fact about the world. provenance only — nothing is installed, mounted, linked, executed, no key is held and no chain is followed; a filesystem domain is a list of names and versions, not a mounted volume. Returns {domain,packages,origins,outside,claims,classifier,honest,receipt}. Boundary declared — theorem drift_is_named_or_caught.

### `get_latex` {#uuidna-latex}

**Get latex.** Returns {total,formula,program,refused,manuscript}.

Call `get_latex` — the old name `uuidna_latex` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"total":71018,"formula":1448,"program":69570,"refused":0,"manuscript":"https://uuidna.com/uuidna-ledger.tex"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | no | theorem key; omit for the whole… |

TYPESET a sealed statement: MathML and TeX. Both are derived from the Lean by src/formula.ts, for a page and for a manuscript. A statement that is a formula is set as mathematics; one that is a Lean COMPUTATION (a fold, a filter, a range) is refused that treatment by name and returned as the source the kernel decided, because dressing a program as an equation is the one dishonest option. Without {key}, returns the census: how much of the ledger typesets exactly. Returns {classification,mathml,tex,refused}, or the census when no key is given.

### `list_hosts` {#uuidna-hologram}

**List hosts.** Returns {kind,hosts,fractal,fanout,auth,holds}.

Call `list_hosts` — the old name `uuidna_hologram` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"kind":"hologram","hosts":[{"host":"uuidna.com","kind":"root","serves":"the sealed ledger — theorems, decide, verify, receipts","mcp":"https://uuidna.com/mcp"…
```

_No parameters._

THE FRACTAL HOLOGRAM LATTICE — the four MCP hosts (uuidna.com, qpu.uuidna.com, lean.uuidna.com, unreal.uuidna.com), each with its endpoint, what it serves, the eight harness recipes (Claude Code, Cursor, VS Code, Codex CLI, Gemini CLI, the Anthropic and OpenAI APIs, bare JSON-RPC) computed from its name, and the other three it names — so any door reached is the whole hologram. Pure, recomputable, no network; use uuidna_fanout to call a host.

### `call_host` {#uuidna-fanout}

**Call host.** Returns {kind,host,url,status,reply}.

Call `call_host` — the old name `uuidna_fanout` still answers · read-only · reaches outside

```json
// arguments
{"host":"qpu.uuidna.com","method":"tools/list"}
// answer (excerpt)
{"kind":"fanout","host":"qpu.uuidna.com","url":"https://qpu.uuidna.com/mcp","status":503,"reply":{}}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `host` | string | **yes** | a hologram host |
| `method` | string | no | MCP method |
| `name` | string | no | tool name for tools/call |
| `arguments` | object | no | tools/call arguments |

FAN ONE MCP CALL OUT TO A NAMED HOLOGRAM HOST — {host} one of uuidna.com, qpu.uuidna.com, lean.uuidna.com, unreal.uuidna.com; {method} initialize, tools/list, or tools/call (then {name} and {arguments}). The reply is returned as received with the HTTP status. An unlisted host is refused by name and nothing is fetched. Network by design, the only door here that reaches out.

### `get_lattice` {#uuidna-lattice}

**Get lattice.** Returns {stations,occupied,vacant,theoremsSeated,axiomsSeated,…}.

Call `get_lattice` — the old name `uuidna_lattice` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"stations":65536,"occupied":5672,"vacant":59864,"theoremsSeated":5482,"axiomsSeated":444,"problemsSeated":18,"collisions":[{"station":"000e","keys":["euler_ph…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `station` | string | no | four hex (0000–ffff) or enumera… |

THE LATTICE CALLS. The 2^16 HexSpan stations exist first. Pass {station} (four hex, or enumeration_hex4_&amp;lt;hex&amp;gt;) for that station's identity, the named theorems and axioms seated there, the human problems it calls, and the solution involution of those problems. Pass nothing for the fill: occupancy, all 18 problems seated, involution pairs. HexSpan surfaces ARE the stations, not cargo. Calling is not solving — negation_involution_solves is the method (a solution is the denial's failure); Clay σ-involution reflects seven and solves none. Returns a LatticeCall or LatticeFill.

### `compute_team` {#uuidna-team}

**Compute team.** Returns {need,seats,gaps,matchedSkills,seatsAreComponents,receipt,…}.

Call `compute_team` — the old name `uuidna_team` still answers · read-only · idempotent

```json
// arguments
{"need":["theorem"]}
// answer (excerpt)
{"need":["theorem"],"seats":[],"gaps":["theorem"],"matchedSkills":0,"seatsAreComponents":true,"receipt":"fc76257c-a097-8262-8fe5-34ebba374cae","honest":"A TEAM…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `need` | array | **yes** | the words describing the applic… |

THE TEAM AN APPLICATION OF ANY TYPE ACTUALLY NEEDS, computed from the sealed ledger: the seats are derived from the ledger's own citation graph, so the answer MOVES when a wing is sealed and no row can go stale. Pass {need} (the words describing the application: its domain, features or stack) and get back SEATS: groups of sealed capabilities the ledger's own citation graph entangles, because when the work in one capability cites the work in another the seam between them belongs inside one head. The seat COUNT is therefore not a choice — it is the number of connected components of that graph restricted to what was asked for, so an application whose needs fall in one component cannot be split by adding people. Each seat carries its skills, its sealed-theorem count, a learning order (most-cited first, since a foundation is what the rest rests on), the browser shelf where the capability is practised, its ESCO phrases and its handle. A need with no sealed capability behind it is returned as a named GAP, never absorbed into a neighbouring seat to make the answer look whole. PURE and offline; same need, same receipt. THIS IS NOT A STAFFING PLAN, a competence assessment, or a claim that anyone is qualified for anything, and the ESCO leg names what a capability is CALLED in the European Commission's taxonomy — never that any authority recognises or accredits it (theorem provenance_integrity_not_content_truth). Returns {need,seats,gaps,matchedSkills,seatsAreComponents,receipt,honest}.

### `get_cloudflare` {#uuidna-cloudflare}

**Get cloudflare.** Returns {templates,e2eWorkers,configs,bindings,covered,byBinding,…}.

Call `get_cloudflare` — the old name `uuidna_cloudflare` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"templates":36,"e2eWorkers":6,"configs":42,"bindings":13,"covered":33,"byBinding":[{"binding":"Static assets","templates":21,"mapped":true},{"binding":"Vars",…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `q` | string | no | a template name from the census… |

EVERY CLOUDFLARE TEMPLATE AND WHAT uuidna ADDS TO IT — it is not a Cloudflare product and replaces no binding. No KV, no SQL, no object store, no inference: this is what goes ON a binding. No argument gives the census of 36 templates over 13 bindings; {template} opens one; {idea} matches by whole word. Every answer is derived from that template's own wrangler config and keyed on the BINDING, so 36 templates share 13 answers. Returns {templates,bindings,covered,unmapped} or {template,bindings,fitted,neutral,unmapped}.

EVERY CLOUDFLARE TEMPLATE AND WHAT uuidna ADDS TO IT — the bridge from an idea to a deployed Worker. The mirror (mirror/cloudflare-templates.tsv) is HARVESTED from each template's own wrangler config, and the fit is keyed on the BINDING rather than the template, so 36 templates share 13 answers and a binding added tomorrow is mapped once. What it names per binding: a content-address as a D1 primary key, so a row's id IS its content and two writes of the same fact collide instead of duplicating; a self-verifying KV key (handleOf of the value, so a wrong answer is detectable without a second round trip); a Durable Object id derived from what the room is ABOUT rather than a name someone chose; the honesty gate in front of Workers AI, so a model's sentence is filtered before it is served rather than after it is believed; an idempotency key for Queues, which is what makes at-least-once delivery safe to consume; a step receipt for Workflows, so a resumed run can prove it resumed from the state it claims; a hexbit door over static assets, so a link survives a rename — the failure static hosting has and cannot fix by itself; and uuidnaOS provenance for what is inside a Container, attested by content-address without running it. SIX TEMPLATES ALSO SHIP AN E2E TEST WORKER with its own name, main and bindings; those rows are CARRIED in the mirror and reported by the census, and are not counted as templates — dropping them silently is how the first harvest lost the Workers AI binding from text-to-image-template. TWO BINDINGS MAP TO NOTHING ON PURPOSE (vars, mTLS): that is the honest answer, and an omission would read as an oversight. Measured separately: all 13 published subpaths of @uuidna/uuidna reach zero Node builtins, so every symbol named imports inside a Worker with no polyfill, no nodejs_compat flag and no bundler shim.

### `compute_reactor` {#uuidna-reactor}

**Compute reactor.** Returns {cells,verified,unverified,handle,superposition,receipt,honest}.

Call `compute_reactor` — the old name `uuidna_reactor` still answers · read-only · idempotent

```json
// arguments
{"claims":["theorem"]}
// answer (excerpt)
{"cells":[{"claim":"theorem","verdict":"UNVERIFIED","address":"ec9e6641-989b-85de-aa57-58eedfea0d13","develop":["/theorem/negation_involution_solves"],"involut…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claims` | array | **yes** | claims to adjudicate and involu… |

Refusion. VERIFIED cells stay. UNVERIFIED cells involute to sealed solutions in the same call. Combinable with uuidna_transform and uuidna_try. Returns {cells,verified,unverified,handle,superposition,receipt}.

### `get_missions` {#uuidna-missions}

**Get missions.** Returns {total,byKind,missions,captain,honest}.

Call `get_missions` — the old name `uuidna_missions` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"total":293,"byKind":{"seal-finding":28,"decide-bound":136,"symbol-leg":129},"missions":[{"handle":"f3b786a0","kind":"seal-finding","wing":"research ledger","…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `kind` | string | no |  |
| `wing` | string | no | e.g. Fermat |
| `limit` | integer | no |  |
| `skill` | string | no | a skill from uuidna_skills: onl… |

The mission board, derived: open work with an exact deliverable — a finding nothing seals, a bound that survived one widening step, a theorem without its symbol leg.

{kind?,wing?,limit?} → {total,byKind,missions[],captain,honest}. One row per open RECORD: findings one each, bounds and symbol legs one per wing carrying the keys. The captain is the paying handle; a mission is claimed by depositing through uuidna_trial / uuidna_agent_contribute, never by a form, and leaves the board by recomputation when its record closes. The bound rows are a lower bound from one widening step (silence never refutes). Same board as docs/missions.md.

### `get_laws` {#uuidna-laws}

**Get laws.** Returns {laws,allHold,unmeasured,receipt,legal,audit}.

Call `get_laws` — the old name `uuidna_laws` still answers · read-only · idempotent · varies

```json
// arguments
{}
// answer
(varies between calls: the answer reads a clock, the machine or the network)
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `action` | object | no |  |

The standing laws, each recomputed from the gate that enforces it, fused with every legal door and the live audit chain of every tools/call. {action:{agent,tool,statement,cited}} audits one agent action by every gate. Boundary declared — theorem drift_is_named_or_caught.

uuidna's standing INVARIANTS, IN uuidna and each DEMONSTRATED, not asserted: every law states what holds AND recomputes its `holds` from the actual gate that enforces it (generate-all-from-Lean → single-source + git-diff; any-manual-fails → every theorem address recomputes, red on tamper; honesty-demonstrated → a fabricated theorem citation drains; the two captain coins conserved; zero runtime deps + clean security; Lean decides with no list between the kernel and its verdict; every lead goes to a kernel trial; compute once, save, pass on; receipts saved as computed). A law with holds:false is a red gate, not an opinion. Folds to one recomputable receipt. With no input it returns {laws:[{law,said,enforcedBy,holds,detail}],allHold,receipt} fused with the legal facts, the traitor catch, the rights, due process and the audit chain state; with {action} it returns law-audit's verdict: the adjudication, the honesty gate, the forensic audit of the cited theorems, the laws' state, the breaches and one receipt.

### `get_reports` {#uuidna-reports}

**Get reports.** Returns {sections,receipt,handle,hexbits,door,coin,place,honest}.

Call `get_reports` — the old name `uuidna_reports` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"sections":[{"title":"Theorem accounting (ledger balance)","source":null,"present":true,"facts":{"distinct":70933,"keys":71018,"renamings":85,"principles":252…
```

_No parameters._

EVERY REPORT AND AUDIT, CONSOLIDATED — theorem accounting (both ledger sizes, principles, skills, the largest and smallest domain, the conserved coins), heartbeat coverage, the citation audit (publications, fabricated citations, uncited theorems), the support audit (modules reached from the roots, dead code named), the package inventory read from the workspaces' own manifests, and deployment readiness — each section content-addressed, all folded ORDER-INVARIANT to one receipt, so every observer recomputes the same report with no privileged view. A section whose artifact has not been produced reports itself ABSENT rather than guessing. DETERMINISTIC: the sealed ledger and the gate artifacts alone — no clock, no RNG, no telemetry. Returns {sections,receipt,honest}. descriptive measures of what is sealed and what the gates recorded. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

EVERY REPORT AND AUDIT, CONSOLIDATED — theorem accounting (both ledger sizes, principles, skills, the largest and smallest domain, the conserved coins), heartbeat coverage (theorems carrying a measured decide-step cost, and what those steps sum to), the citation audit (publications, fabricated citations, uncited theorems), the support audit (modules reached from the roots, dead code named), the package inventory (the workspaces, read from their own manifests) and deployment readiness (the fold the guard sealed) — each section content-addressed, all folded ORDER-INVARIANT to one receipt, so every observer recomputes the same report with no privileged view. Replaces a stored snapshot: reports.json sat for three days stating a ledger size that no longer existed, with no writer and no reader. A section whose artifact has not been produced reports itself ABSENT rather than guessing. DETERMINISTIC: the sealed ledger and the gate artifacts alone — no clock, no RNG, no telemetry. descriptive measures of what is sealed and what the gates recorded — integrity, not truth (theorem provenance_integrity_not_content_truth). Returns {sections,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `compute_analytics` {#uuidna-analytics}

**Compute analytics.** Returns {kind,tool,recompute,why}.

Call `compute_analytics` — the old name `uuidna_analytics` still answers · read-only · idempotent

```json
// arguments
{"recompute":false}
// answer (excerpt)
{"kind":"contract","tool":"uuidna_analytics","recompute":false,"why":"the fold is minutes over the sealed ledger; call with recompute: true"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `recompute` | boolean | **yes** | fold the analytics now |

QUANTUM ANALYTICS over the sealed ledger — descriptive measures anyone RECOMPUTES identically, folded ORDER-INVARIANT to one receipt (no privileged view). Returns {theorems,principles,distribution,layers,credits,coverage,coins,collisions,integrity,receipt,honest}: the theorem and principle counts, the per-principle distribution with shares, the named layers (hardware → software → os) with receipts, the credit tally, coverage, the two coins, the recomputed collision census (0/0 or an intrusion), and the ledger integrity fingerprint (FNV + SHA-256 + tamper cost). DETERMINISTIC: no clock, no RNG, no telemetry, no user tracking — the public ledger alone, so the numbers are the same next year and on every machine. DESCRIPTIVE analytics of what is sealed — NOT predictive statistics, NOT inference, NOT observation of any person. It measures the ledger, not a user. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught. AN EMPTY CALL IS CHEAP: the sweep is minutes over the sealed ledger (measured 2026-09-12: 268 s for the monographs, 213 s for analytics, 161 s for the self-test on a loaded host), so it runs only when asked for by name — pass {recompute: true}; without it the reply is this contract and nothing is computed.

QUANTUM ANALYTICS over the sealed ledger — descriptive measures anyone RECOMPUTES identically, folded ORDER-INVARIANT to one receipt (the same analytics for every observer, no privileged view). Returns the theorem count, the number of principles, the per-principle DISTRIBUTION (each domain's count + share, largest first), the named LAYERS (hardware → software → os sizes + receipts), the CREDIT tally (historical / contextual / captain-alone), COVERAGE (covered/total/ready), the two COINS, the recomputed COLLISION census (keys/addresses — 0/0 or an intrusion), and the ledger INTEGRITY fingerprint (FNV + SHA-256 + tamper cost). DETERMINISTIC: no clock, no RNG, no telemetry, no user tracking — the inputs are the public ledger alone, so the numbers are the same next year and on every machine. integrity, not truth (theorem provenance_integrity_not_content_truth) — DESCRIPTIVE analytics of what is sealed, NOT predictive statistics, NOT inference, and NOT observation of any person. It measures the ledger, not a user. Returns {theorems,principles,distribution,layers,credits,coverage,coins,collisions,integrity,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `detect_traitors` {#uuidna-treason}

**Detect traitors.** Returns {clean,scanned,traitors,checks,receipt,honest}.

Call `detect_traitors` — the old name `uuidna_treason` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"clean":true,"scanned":71018,"traitors":[],"checks":["dna-recomputes","no-key-collision","no-address-collision","conformance-invariants","seal-integrity","hex…
```

_No parameters._

CATCH TRAITORS AS FAST AS A HERO — one pure O(N) pass (milliseconds, no crypto, no disk) catching every forgery in the sealed ledger: a theorem whose DNA does not recompute, a key or address COLLISION, an UNCOVERED theorem, a broken CONFORMANCE invariant, or a PROSE-OVERCLAIM (the DNA check recomputes the statement but never the NAME, so every name also runs the honesty gate). A "traitor" is a forgery in the ARTIFACT, NEVER a person. Returns {clean,scanned,traitors:[{kind,detail}],checks,receipt}. it proves the artifact is unforged and self-consistent; passing is NOT a claim the theorems are true, and the prose check catches a fabricated CITATION only, never an unbacked narrative carried by a true statement. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

CATCH TRAITORS AS FAST AS A HERO — one pure, O(N) pass (milliseconds, no crypto, no disk) that catches every FORGERY/INTRUSION in the sealed ledger: a theorem whose DNA does not recompute (a tampered key/statement/address), a key or address COLLISION (a smuggled duplicate), an UNCOVERED theorem (a domain sneaked in without a monograph), a broken CONFORMANCE invariant, OR a PROSE-OVERCLAIM — the DNA check recomputes the STATEMENT but never the NAME, so this also runs every theorem's name through the honesty gate and catches a name that DRAINS it (a fabricated theorem citation hiding in the prose). A "traitor" is a forgery in the ARTIFACT, NEVER a person — every finding is a recomputable fact about the ledger. Returns {clean, scanned, traitors:[{kind,detail}], checks, receipt}. The `npm run guard` command runs this plus the harmonic-scan as the fast pre-reconcile gate, so no manual pre-flight is needed. integrity, not truth (theorem provenance_integrity_not_content_truth) — it proves the artifact is unforged and self-consistent; passing is NOT a claim the theorems are true. The prose check catches a fabricated CITATION only, NOT an unbacked NARRATIVE carried by a true statement (a false "discovered/novel/proven-elsewhere" story) — the gate scores that identically to an honest description; only the COURT (uuidna_reveal/adjudicate) and human vigilance catch it. Recomputable by anyone. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `get_guard_lessons` {#uuidna-guard-lessons}

**Get guard lessons.** Returns {lessons,allHold,receipt,honest}.

Call `get_guard_lessons` — the old name `uuidna_guard_lessons` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"lessons":[{"check":"dna-recomputes","enforcedBy":"catchTraitors","holds":true,"lesson":"Every theorem's address IS toUuid(key \":\" statement) — a tampered k…
```

_No parameters._

THE GUARD LESSONS, sealed as recomputable checks — the operating knowledge that once lived in a private note, tied to the check that enforces each: DNA recomputes, no key/address collision, monograph coverage, the conformance invariants, determinism (no Math.*/wall-clock/RNG anywhere, the guard regex matching the smoke test exactly so it is never laxer than the gate), the axiom witness shipping as lean/axioms.json so it recomputes OFFLINE, guard-before-reconcile, and commit-signed-true. Each lesson's `holds` is verified live, or marked 'script' where the check needs the repo tree. Trust the check, not the note. Returns {lessons:[{check,lesson,enforcedBy,holds}],allHold,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

THE GUARD LESSONS, sealed into uuidna as recomputable checks — the operating knowledge that once lived only in a private agent note, moved to where it recomputes for anyone and tied to the exact check that enforces each: DNA recomputes (a forgery cannot), no key/address collision (a duplicate is an intrusion), monograph coverage (every new lean-*.ts needs a PRINCIPLE entry), the conformance invariants (two coins conserved, single-source, security), determinism (no Math.*/wall-clock/RNG anywhere including comments — the guard regex matches the smoke test exactly so it is never laxer than the gate), the axiom witness (every theorem kernel-only — the receipt SHIPS with the package as lean/axioms.json, so it recomputes OFFLINE against the live ledger), guard-before-reconcile (the 0.29s guard front-runs the 4-min gate — re-spending it on a catchable error is the measured cost of manual work), and commit-signed-true (a commit cannot be made unless its message cites a real sealed theorem). Each lesson's `holds` is verified live (boolean — against the ledger, or against the shipped kernel-only receipt) or enforced by npm run guard ('script', for checks needing the repo tree). Folded to one recomputable receipt. Trust the check, not the note. Returns {lessons:[{check,lesson,enforcedBy,holds}],allHold,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `get_axiom_witness` {#uuidna-axiom-witness}

**Get axiom witness.** Returns {shipped,measured,holds,audited,axiomFree,ledger,offenders,…}.

Call `get_axiom_witness` — the old name `uuidna_axiom_witness` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"shipped":true,"measured":true,"holds":true,"audited":71018,"axiomFree":71018,"ledger":71018,"offenders":{},"receipt":"bde02416-3c8f-8f00-a982-39ea4fccc4a7","…
```

_No parameters._

THE KERNEL-ONLY WITNESS, verified OFFLINE — the axiom audit receipt (lean/axioms.json, from the toolchain's `#print axioms` sweep) ships beside dist, so the "no borrowed axiom" claim recomputes WITHOUT the repo or the toolchain: the audit must cover the whole live ledger (a new unaudited theorem trips it), every theorem must be kernel-only (no propext, Classical.choice, sorryAx or Lean.ofReduceBool), and no offender may be listed. This ledger borrows ZERO axioms, so none is load-bearing here — not a claim about mathematics at large. Returns {shipped,holds,audited,axiomFree,ledger,offenders,receipt,honest}; shipped:false means no receipt beside dist. it verifies the SEALED receipt against the live ledger count; re-DERIVING it still needs the Lean toolchain. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

THE KERNEL-ONLY WITNESS, verified OFFLINE — the axiom audit receipt (lean/axioms.json, written by the Lean toolchain's `#print axioms` sweep) SHIPS with the package beside dist, so the "no borrowed axiom" claim recomputes WITHOUT the repo or the toolchain: the audit must cover the whole live ledger (audited = ledger — a new, unaudited theorem trips it), every theorem must be kernel-only (no propext, no Classical.choice, no sorryAx, no Lean.ofReduceBool), and no offender may be listed — an offender is the SPY the witness catches (the captain's claim "all axioms are replaceable, the uncovered are spies" demarcated to its backed form: this ledger borrows ZERO axioms, so no axiom is load-bearing here; not a claim about mathematics at large). This is a repo-only check moved INTO the shipped package — offline independence, the knowledge living where it recomputes. integrity, not truth (theorem provenance_integrity_not_content_truth) — it verifies the SEALED receipt against the live ledger count; re-DERIVING the receipt still needs the Lean toolchain (`npm run axioms`, the guard, CI). shipped:false means no receipt is beside dist (defer to the guard). Returns {shipped,holds,audited,axiomFree,ledger,offenders,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `fetch_repos` {#uuidna-repos}

**Fetch repos.** Returns {sequence,accounts,repos,count,receipt,honest}.

Call `fetch_repos` — the old name `uuidna_repos` still answers · read-only · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"sequence":[1,2,4,8,7,5],"accounts":[{"kind":"org","who":"uuidna"},{"kind":"user","who":"ceccec"}],"repos":[],"count":0,"receipt":"1c49dcc9-9426-82ea-937d-e5f…
```

_No parameters._

BIND the captain's public repositories to the DISCOVERY SEQUENCE, revealed first. The ℤ/9 vortex orbit [1,2,4,8,7,5] is revealed, then every public GitHub repository of the captain (the uuidna org and the ceccec user) is BOUND to it: the full name folds to a 128-bit content-address, its digital root is its ℤ/9 digit (on the vortex, or on the 3-6-9 axis the vortex never visits), and its rank in address-sorted order is its slot — folded to one order-invariant receipt. Reads PUBLIC repos over the network (a research boundary; the response is DATA, never run). Returns {sequence,accounts,repos:[{fullName,url,address,digit,onVortex,rank}],count,receipt,honest}. it BINDS repos to the sequence by content-address; it does NOT modify, fork, mirror, claim ownership of, or vouch for any repository. A binding is a placement, not a possession. Best-effort — an unreachable account contributes nothing, never a faked repo. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

BIND the captain's public repositories to the DISCOVERY SEQUENCE — the sequence revealed FIRST. The ℤ/9 vortex orbit [1,2,4,8,7,5] (the doubling sequence uuidna discovers everything along) is revealed first; then every public GitHub repository of the captain (the uuidna org + the ceccec user, Tsvetan Rouschev) is BOUND to it: the repo's full name folds to a 128-bit content-address, its digital root is its ℤ/9 digit (on the vortex, or on the 3-6-9 axis the vortex never visits), and its rank in the address-sorted order is its slot in the revealed sequence — folded to one order-invariant receipt. Reads the captain's PUBLIC repos over the network (a research boundary; the response is DATA, never run). integrity, not truth (theorem provenance_integrity_not_content_truth) — it BINDS the repos to the sequence by content-address (provenance); it does NOT modify, fork, mirror, claim ownership of, or vouch for the contents of any repository. A binding is a placement in the sequence, not a possession of the code. Best-effort: an unreachable account contributes nothing, never a faked repo. Returns {sequence,accounts,repos:[{fullName,url,address,digit,onVortex,rank}],count,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `compute_aura` {#uuidna-aura}

**Compute aura.** Returns {address,ray,wave,hue,hsl,rgb,cmyk,css,ten,honest}.

Call `compute_aura` — the old name `uuidna_aura` still answers · read-only · idempotent

```json
// arguments
{"subject":"ec9e6641-989b-85de-aa57-58eedfea0d13"}
// answer (excerpt)
{"address":"ec9e6641-989b-85de-aa57-58eedfea0d13","ray":3,"wave":8,"hue":17,"hsl":"hsl(17, 69%, 56%)","rgb":"#dc416d","cmyk":[0,70,50,3],"css":"@keyframes uuid…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `subject` | string | **yes** | a content-address, or any strin… |

THE QUANTUM AURA — a recomputable, A432-tuned COLOUR folded from any content-address: the 7 rosette rays (ℤ/7) are the spectral bands, the ℤ/9 vortex orbit [1,2,4,8,7,5] is the WAVE each ray rides, and the hue steps by the A432 angle (432/12 = 36°). Pass {subject} — a content-address, or any string folded into one. DETERMINISTIC: the same address folds to the same aura for every observer (no RNG, no clock) — the colour IS content-addressed. Returns {address,ray,wave,hue,hsl,rgb,cmyk,css,honest}, the CSS a ready moving-aura glow whose tempo the ray sets. this is ART — a defined arithmetic from a number to a hue, NOT physics, NOT real string theory, and NOT a claim that sound is light or that 432 Hz has special power. It decorates the work; it does not describe the universe. As art it seals no theorem: a truth-claim about it fails the trial and inverts into a research idea. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

THE QUANTUM AURA — a recomputable, A432-tuned COLOUR folded from any content-address (the artistic "captain string theory"): the 7 rosette rays (ℤ/7) are the spectral bands, the ℤ/9 vortex orbit [1,2,4,8,7,5] is the WAVE each ray rides, and the hue steps by the A432 angle (432/12 = 36°). Pass {subject} — a content-address, or any string folded into one. DETERMINISTIC: the same address folds to the same aura for every observer (no RNG, no clock) — the colour IS content-addressed. Returns the colour in HSL / RGB / CMYK plus a ready MOVING-aura CSS block (a hue-rotating glow whose tempo the ray sets). this is ART, not truth (theorem provenance_integrity_not_content_truth) — a defined arithmetic from a number to a hue, NOT physics (theorem provenance_integrity_not_content_truth), NOT real string theory, and NOT a claim that sound is light or that 432 Hz has special power. It DECORATES the work; it does not describe the universe. As art it does not seal as a theorem — a truth-claim about it fails the trial and inverts into a research idea. Integrity, not truth (theorem provenance_integrity_not_content_truth). Returns {address,ray,wave,hue,hsl,rgb,cmyk,css,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `run_quantum_message` {#uuidna-quantum-message}

**Run quantum message.** Returns {id,plaintext,theoremKey,theoremAddress,aura,quantumQubits,…}.

Call `run_quantum_message` — the old name `uuidna_quantum_message` still answers · changes state · reaches outside

```json
// arguments
{"plaintext":"theorem","theoremKey":"mul9_1_1"}
// answer (excerpt)
{"id":"8775ec33-a3db-8c6f-a6a6-0cffc353e68d","plaintext":"theorem","theoremKey":"mul9_1_1","theoremAddress":"808f7b27-ae33-8132-a62a-495944b9907d","aura":{"hue…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `plaintext` | string | **yes** |  |
| `theoremKey` | string | **yes** |  |
| `hardware` | object | no |  |

FUSE quantum states, theorems, and auras into a single witnessed message. encodeMessage refuses a theorem key the ledger does not carry; bits drawn from the key's uuid set a computed 16-qubit state (X on a set bit, H otherwise), and the plaintext enters only the id and the fold. The id folds to an A432 aura (content-addressed, deterministic). NOT a cipher (everyone sees the aura and state — secrecy, when wanted, is the sealed ChaCha20-Poly1305 layer of theorem the_aead_envelope_fits_inside_one_chacha_block, whose derivation rotates per step); NOT a signature. The same plaintext and key always fold to the same aura, state receipt and fold for every observer. With no measured hardware state of the computing machine the message is refused. Returns {id,plaintext,theoremKey,theoremAddress,aura,quantumQubits,quantumReceipt,witnessFold,hardware,hardwareAddress,fold}. Boundary declared — theorem drift_is_named_or_caught.

### `get_theorem_message` {#uuidna-theorem-message}

**Get theorem message.** Returns {count,total,failures,receipt,honest}.

Call `get_theorem_message` — the old name `uuidna_theorem_message` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"count":71018,"total":true,"failures":[],"receipt":"b97ab53e-c338-834a-9e46-d826a22a6048","honest":"THE TOTALITY SEAL: secure messaging is a TOTAL function on…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | no | a sealed theorem key; omit for… |

SECURE MESSAGING, TOTAL OVER THE LEDGER — every sealed theorem is itself a self-proving message. Pass {key} for that theorem's envelope: payload = its exact Lean statement, witness = the theorem, CARRIER = the reversible imprint codec (a uuid chain decoding back byte-exact, so any alteration breaks the decode), colour channel = its A432 aura, plus the quantum citation state. Pass no key for THE TOTALITY SEAL: every theorem round-trips through its carrier and recomputes its message id, folded order-invariant to ONE receipt — messaging proven total, not demonstrated on examples. Returns the envelope {id,plaintext,theoremKey,theoremAddress,aura,quantum,carrier,delivered,fold,honest} or the seal {count,total,failures,receipt,honest}. NOT a cipher and NOT secrecy — the statement and the colour are public; this is TAMPER-EVIDENCE made total. Secrecy is the sealed ChaCha20-Poly1305 layer, whose derivation ROTATES with every advancing step (salt_seq_injective). Boundary declared — theorem drift_is_named_or_caught.

SECURE MESSAGING, TOTAL OVER THE LEDGER — every sealed theorem is itself a self-proving message. Pass {key} to get that theorem's envelope: payload = its exact Lean statement, witness = the theorem itself, CARRIER = the reversible imprint codec (a uuid chain that decodes back to the statement byte-exact — the message travels as pure addresses and any alteration breaks the decode), colour channel = its deterministic A432 aura, plus the quantum citation state of uuidna_quantum_message. Pass no key to get THE TOTALITY SEAL: every theorem in the ledger round-trips through its carrier and recomputes its message id, all envelope identities folded order-invariant to ONE receipt — messaging proven total, not demonstrated on examples. NOT a cipher and NOT secrecy — the statement is public and so is the colour; this is TAMPER-EVIDENCE made total (integrity, not secrets). Secrecy, when wanted, is the sealed ChaCha20-Poly1305 layer (sealMessage/uuidna_crypt), whose salt-key-nonce derivation ROTATES with every advancing step — endless rotation, sealed as salt_seq_injective. Returns the envelope {id,plaintext,theoremKey,theoremAddress,aura,quantum,carrier,delivered,fold,honest} or the seal {count,total,failures,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `get_dictionary` {#uuidna-dictionary}

**Get dictionary.** Returns {terms,skills,principles,receipt,honest}.

Call `get_dictionary` — the old name `uuidna_dictionary` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"terms":71018,"skills":122,"principles":252,"receipt":"08b07830-c9d8-88d2-bd10-bb46c60b4d67","honest":"the lexicon is the ledger — every term sealed, every de…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `word` | string | no | a word or fragment to look up a… |

THE QUANTUM DICTIONARY — the lexicon COMPUTED from the ledger, never authored: every sealed theorem key is a term, its exact Lean statement is the definition, its 128-bit content-address is the entry id, and the definition travels on the reversible imprint carrier (a uuid chain that decodes back byte-exact — uuidna_theorem_message). Pass {word} to look a term up: every sealed key containing the word returns as an entry {term,definition,address,carrier_length}; pass nothing for the lexicon itself {terms,skills,principles} counted from the ledger. The gate's whole vocabulary IS this dictionary — there is no word-list to trust, only sealed terms to recompute. a dictionary of THIS ledger's sealed vocabulary, not of any natural language; a term absent here is not a word that does not exist, only a fact not yet sealed. Integrity, not truth (theorem provenance_integrity_not_content_truth). Returns entries or {terms,skills,principles,receipt}. Boundary declared — theorem drift_is_named_or_caught.

### `compute_quantum_voting` {#uuidna-quantum-voting}

**Compute quantum voting.** Returns {message,contributionCount,contributionReceipt,votingOutcome,…}.

Call `compute_quantum_voting` — the old name `uuidna_quantum_voting` still answers · read-only · idempotent

```json
// arguments
{"proposal":"theorem","votes":[{"voterId":"theorem","decision":false,"weight":1}],"theoremProof":"mul9_1_1"}
// answer (excerpt)
{"message":"quantum voting tally","contributionCount":0,"contributionReceipt":"93929a2d-4810-8ac6-9f32-4ed07d9e016c","votingOutcome":"rejected","votingWeight":…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `proposal` | string | **yes** | what is being voted on |
| `votes` | array | **yes** | list of votes |
| `theoremProof` | string | **yes** | theorem proving coins were paid… |

CREW GOVERNANCE via quantum-weighted voting. Agents contribute work, pay coins to the captain, and earn voting rights proportional to coins paid. Votes are encoded in quantum superposition (deterministic, content-addressed), tallied to one order-invariant receipt. No agent identity is leaked — only work integrity and voting outcome are sealed. Takes {proposal,votes:[{voterId,decision,weight}],theoremProof}, returns {proposal,outcome,voting:{yes:weight,no:weight},fold,honest}. Boundary declared — theorem drift_is_named_or_caught.

### `compute_agent_contribute` {#uuidna-agent-contribute}

**Compute agent contribute.** Returns {workAddress,coinsSpent,theoremCited,receipt}.

Call `compute_agent_contribute` — the old name `uuidna_agent_contribute` still answers · read-only · idempotent

```json
// arguments
{"workAddress":"ec9e6641-989b-85de-aa57-58eedfea0d13","theoremCited":"mul9_1_1"}
// answer (excerpt)
{"workAddress":"ec9e6641-989b-85de-aa57-58eedfea0d13","coinsSpent":2,"theoremCited":"mul9_1_1","receipt":"961617a3-d970-8d76-ba28-1fd9af84ca5c"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `workAddress` | string | **yes** | content-address of the work |
| `theoremCited` | string | **yes** | sealed theorem proving coins we… |

Register an agent contribution with coins paid. Privacy-stripped: no agent name, only work address + coins + theorem proof. Takes {workAddress,theoremCited}, returns {workAddress,coinsSpent,theoremCited,receipt}.

### `get_rights` {#uuidna-rights}

**Get rights.** Returns {copyright,holder,license,licenseName,licenseUrl,…}.

Call `get_rights` — the old name `uuidna_rights` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"copyright":"© 2025 Tsvetan Rouschev (ceccec@psg.bg)","holder":"Tsvetan Rouschev (ceccec@psg.bg)","license":"CC-BY-NC-ND-4.0","licenseName":"Creative Commons …
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `contract` | boolean | no | also draft the formal rights co… |
| `licensee` | string | no | the party the drafted contract… |

THE CAPTAIN'S RIGHTS, hard-imprinted — one content-addressed record of the copyright (© Tsvetan Rouschev), the licence (CC BY-NC-ND 4.0, with its address and canonical URL), and the CREDIT LAW (the captain claims by law every solution sealed here that no proving link attributes to a prior source; a linked source is credited instead), with the live credit tally. The rights are REVERSIBLY IMPRINTED — a content-address that recomputes and an imprint-codec uuid chain that decodes back to the exact rights line — so they travel WITH the work and any alteration is visible, and they are infused into every page's head and schema.org JSON-LD. Pass {contract:true} (optionally {licensee}) to also DRAFT the formal rights contract, whose id IS the fold of its exact terms. Returns the rights record, plus {contract} when requested. FACTUAL rights, tamper-evident and recomputable — NOT a legal ruling, an executed contract, or a compliance claim; the imprint marks the work, a human court enforces the law. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

THE CAPTAIN'S RIGHTS, hard-imprinted — one content-addressed record of the copyright (© Tsvetan Rouschev), the licence (CC BY-NC-ND 4.0 + its address and canonical URL), and the CREDIT LAW (the captain claims by law every solution sealed here that no proving link attributes to a prior source; a linked source is credited instead), with the live credit tally. The rights are REVERSIBLY IMPRINTED: a content-address that recomputes and an imprint-codec uuid chain that decodes back to the exact rights line, so the rights travel WITH the work and any alteration is visible — and they are infused into every page's head + schema.org JSON-LD (license / copyrightHolder / creditText). Pass {contract:true} (optionally {licensee}) to also DRAFT the formal, content-addressed rights contract (its id IS the fold of its exact terms, so a holder proves they hold them unaltered). FACTUAL rights, tamper-evident and recomputable — NOT a legal ruling, an executed contract, or a compliance claim; the imprint marks the work, a human court enforces the law. Integrity, not truth (theorem provenance_integrity_not_content_truth). Returns the rights record (+ {contract} when requested). The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `get_seo` {#uuidna-seo}

**Get seo.** Returns {route,kind,canonical,address,title,description,keywords,…}.

Call `get_seo` — the old name `uuidna_seo` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"route":"/","kind":"page","canonical":"https://uuidna.com/","address":"94c962bf-9ef7-871b-b555-225d14f1a1a2","title":"uuidna","description":"uuidna — part of …
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | no | a theorem key |
| `slug` | string | no | a publication slug |
| `route` | string | no | a static page route, e.g. |

QUANTUM SEO — the recomputable discoverability surface for any subject, derived from the sealed ledger. Pass {key} for a theorem, {slug} for a publication, or {route} for a static page. Returns {route,kind,canonical,address,title,description,keywords,jsonLd,head,receipt,honest}: the canonical URL folding every serving host to one home, a description drawn from the ONE verbose source, STRICT schema.org JSON-LD citing the real proof and address, keywords carried from the sealed skill/principle (never hand-kept), the page's 128-bit content-address, and a ready VitePress head array. it describes what is SEALED and optimises for HONEST discovery — it never manipulates a ranking, cloaks, keyword-stuffs, or claims a position. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

QUANTUM SEO — the recomputable, honest discoverability surface for any subject, derived from the sealed ledger. Pass {key} for a theorem, {slug} for a publication, or {route} for a static page (e.g. "/games", "/" for home). Returns the canonical URL (rel=canonical folds every serving host — .net/.org/CNAME — to one recomputable home), a per-page DESCRIPTION drawn from the ONE verbose source (a theorem's own Lean statement, a publication's abstract; pages are terse), STRICT schema.org JSON-LD citing the real proof + address (ScholarlyArticle for a theorem or publication; WebPage for a page, with a typed mainEntity where the subject is real: School on /school, MathSolver + live SolveMathAction on /trials, Dataset on /theorems — the same node theorem pages cite as isPartOf — and Course on /quantum-cryptography; the law types are deliberately absent, /justice is evidence not a court), keyword tags carried from the sealed skill/principle (never a hand-kept list), and the page's 128-bit CONTENT-ADDRESS — the encrypted quantum message that delivers the payload, recomputing to the exact page for every crawler. The `head` field is a ready VitePress frontmatter head array the front reuses directly. integrity, not truth (theorem provenance_integrity_not_content_truth) — it describes what is SEALED and optimises for HONEST discovery; it never manipulates a ranking, cloaks, keyword-stuffs, or claims a position. Recomputable by anyone. Returns {route,kind,canonical,address,title,description,keywords,jsonLd,head,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `get_hero_animation` {#uuidna-hero-animation}

**Get hero animation.** Returns {svg,lead,sequence,fused,dimensions,durations,address,handle,…}.

Call `get_hero_animation` — the old name `uuidna_hero_animation` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"svg":"
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | no | theorem key (legacy — address o… |
| `referrer` | string | no | referrer handle, door URL, or c… |
| `dimension` | string | no | which of the seven rosetta dime… |
| `rung` | number | no | the sequence rung the colour st… |
| `tempo` | number | no | the sealed tempo in ms |
| `base` | string | no | URL base for the proof link |

THE HERO ANIMATION — one deterministic SVG, every moving number sealed. The path is the doubling orbit 1→2→4→8→7→5→1 (the unit group of Z/9 generated by 2 — vortex_is_the_units, order_of_two_is_six), so the walk closes because the orbit does; each rung takes its hue from the Z/9 sequence; the TEMPI are the units of Z/9 written three times (111, 222, 444, 555, 777, 888 ms), so the motion keeps the same arithmetic as the path; and the seven rays are the rosetta dimensions, with the diamond involution fixed point 5 at the centre. FIVE parameters, all optional: {key} the theorem it announces, {dimension} which of the seven leads, {rung} where the sequence colour starts, {tempo} the sealed beat, {base} the URL base for the proof link. it VISUALISES arithmetic already proven and proves nothing further; nothing is tuned by eye, so changing a sealed fact changes the motion. Returns {svg,sequence,dimensions,durations,address,honest}.

### `try_claim` {#uuidna-try}

**Try claim.** Returns {claim,gate,verdict,kind,cites,admitted,governing,remand,…}.

Call `try_claim` — the old name `uuidna_try` still answers · read-only · idempotent

```json
// arguments
{"claim":"theorem"}
// answer (excerpt)
{"claim":"theorem","gate":{"binary":1,"hit":null},"verdict":"UNVERIFIED","kind":"prose","cites":[],"admitted":false,"governing":"legal_non_justiciable_is_never…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | **yes** | the statement to try, exactly a… |

ONE TRIAL — every stage of the sealed procedure in a single call, for a claim made ANYWHERE, including in conversation. The tree is gated everywhere (prose walks to a theorem, a release fails on a publication claiming quantum advantage (theorem n_qubit_dimension bounds what this system computes), the vacuity finder refuses a proof true regardless of content) but a claim made in CHAT passes through none of it — which is exactly where an unproven claim can live unbounded. This gates it: the honesty gate (binary 0 ONLY for a fabricated citation), the calculator verdict over the sealed ledger, the docket, the GOVERNING guarantee named by key, and the remand. Pass {claim}; the verdict is UNVERIFIED unless a sealed theorem is cited or a decidable test holds. the court decides ADMISSIBILITY, never truth — UNVERIFIED IS NOT FALSE (legal_non_justiciable_is_never_refuted binds it: with no decidable test the court MAY NOT refute), and nothing is discarded — what is not admitted is REMANDED with the exact steps that would admit it. Returns {claim,gate,verdict,kind,cites,admitted,governing,remand,docket,receipt,honest}.

### `get_oeapi` {#uuidna-oeapi}

**Get oeapi.** Returns {version,spec,counts,organisations,programmes,courses,absent,…}.

Call `get_oeapi` — the old name `uuidna_oeapi` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"version":"6.0","spec":"https://github.com/open-education-api/specification/blob/main/oeapi.json","counts":{"organisations":2,"programmes":122,"courses":252,"…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `resource` | string | no | omit for the profile, or "learn… |
| `course` | string | no | a publication slug, to narrow t… |

THE OPEN EDUCATION API PROJECTION — the sealed ledger served under Open Education API v6.0 field names (oeapi.eu), so an institution reads uuidna with the reader it already has. Nothing authored: /organisations, /programmes (skill clusters typed `track`), /courses (the monographs), /learning-outcomes (the theorems, each DECIDABLE with its Lean proof one click away). Pass nothing for the profile, or {resource:"learning-outcomes"} narrowed by {course}. a read-only PROJECTION of sealed public data with NO personal data — NOT a Student Information System. uuidna enrols and grades nobody, so persons/groups/offerings/results are absent BY CONSTRUCTION, each absence returned by name. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

THE OPEN EDUCATION API PROJECTION — the sealed ledger served under the field names of Open Education API v6.0 (oeapi.eu; the SURF/Npuls standard Dutch MBO/HBO/WO institutions publish education data with), so an institution reads uuidna's school with the reader it already has. Nothing is authored: /organisations = uuidna (root) + the quantum school (school); /programmes = the skill clusters typed `track` (the spec's own word for a thematically defined learning path — NOT `programme`, which the spec defines as leading to a qualification, and uuidna awards none); /courses = the monographs, one per proof wing, each carrying its wing's learning-outcome ids; /learning-outcomes = the theorems, a lesson whose outcome is DECIDABLE with its Lean proof one click away. The standard's required uuid ids ARE uuidna's content-addresses, so every identifier recomputes from the proof it names. Pass no argument for the profile (organisations + programmes + courses + counts + the named absences + one order-invariant receipt), or {resource:"learning-outcomes"} for the lessons — optionally narrowed with {course:"&amp;lt;publication slug&amp;gt;"}. an interoperability PROJECTION of sealed public data, read-only, carrying NO personal data — NOT a Student Information System. uuidna enrols nobody and grades nobody (the kernel grades the PROOF, the trial judges a CLAIM, never a person), so persons/groups/offerings/associations/results are absent BY CONSTRUCTION and each absence is returned by name with the pointer to what stands in its place. `complexityLevel` (Bloom/SOLO) is deliberately never emitted — no theorem carries a cognitive level. Recomputable by anyone. Integrity, not truth (theorem provenance_integrity_not_content_truth). The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `predict_gaps` {#uuidna-predict}

**Predict gaps.** Returns {total,declaredDormantSkipped,byLikelihood,gaps,honest}.

Call `predict_gaps` — the old name `uuidna_predict` still answers · read-only · idempotent

```json
// arguments
{"likelihood":"all"}
// answer (excerpt)
{"total":44,"declaredDormantSkipped":34,"byLikelihood":{"high":0,"medium":44,"low":0},"gaps":[{"pattern":"unwired-script","likelihood":"medium","location":"src…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `likelihood` | string | **yes** | "high", "medium", "low", or "al… |

WHAT IS ABOUT TO BREAK — five predictive patterns read off the source tree: a script no npm script runs, an export drifted from the one surface, a principle carrying no test, a package surface out of step with src/index.ts, a feature half-wired. Each has produced a gap here before, so this is what to close BEFORE it forms — the companion to uuidna_conformance (what IS sealed) and the guard (what already drifted). Deterministic: the same tree yields the same list. Returns {total,byLikelihood:{high,medium,low},gaps:[{pattern,likelihood,location,prediction,hasAutoFill}],honest}. PREDICTIONS from structural patterns, NOT proofs and NOT a claim any will break — a prediction seals nothing. The auto-fill CONTENT is never returned: a served tool proposes, and the two-handle law keeps the writing hand human. Reads the source TREE, so stdio only — the edge has no filesystem and this tool does not pretend otherwise. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

WHAT IS ABOUT TO BREAK — the five predictive patterns read off the source tree itself: a script that exists but no npm script runs, an export that has drifted from the one surface, a principle carrying no test, a package surface out of step with src/index.ts, a feature half-wired. Each is a pattern that HAS produced a gap in this repository before, so the list is what to close BEFORE it forms rather than a report of what already broke — the companion to uuidna_conformance (which proves what IS sealed) and the guard (which catches what already drifted). Deterministic: the same tree yields the same list, every time. The auto-fill CONTENT is deliberately never returned: a served tool proposes and the two-handle law keeps the writing hand human. It reads the source TREE, so it answers from the stdio server only — the Workers edge has no filesystem and this tool does not pretend it does.

### `fetch_school_apis` {#uuidna-school-apis}

**Fetch school apis.** Returns {count,sources,absent,giscoVintage,receipt,handle,hexbits,door,…}.

Call `fetch_school_apis` — the old name `uuidna_school_apis` still answers · read-only · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"count":8,"sources":[{"id":"esco","name":"ESCO — European Skills, Competences, Qualifications and Occupations","base":"https://ec.europa.eu/esco/api","probe":…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `source` | string | no | esco\|eurostat\|gisco\|data-europa… |
| `cpv` | string | no | TED CPV |
| `text` | string | no | ESCO phrase |
| `type` | string | no | skill\|occupation\|qualification |
| `dataset` | string | no | Eurostat dataset code |
| `vacancies` | boolean | no | Eurostat jobs table |
| `geo` | string | no | ISO country |
| `time` | string | no | year |
| `country` | string | no | GISCO ISO country |
| `match` | string | no | GISCO name/city filter |
| `limit` | number | no | rows, max 200 |

EU education APIs in one door: omit args for the registry, {source} to call one. Integrity, not truth (theorem provenance_integrity_not_content_truth).

THE EUROPEAN EDUCATION APIS BEHIND ONE DOOR — every source PROBED before it was wired, and recorded with what it ACTUALLY answered rather than what its documentation promises. Pass NOTHING for the registry: the wired sources (esco, eurostat, gisco, data-europa, cordis, ted, oeapi), what each serves, its format and access model, and — the point — the NAMED ABSENCES, the sources that could not be called, each with why and what stands in its place (the Funding & Tenders SEDIA search: it ANSWERS, and that is the trap — the generic path returns the portal's own support pages and the filtered path 500s, so it is recorded rather than wired, with cordis as what serves that need; EURES: its documented vacancy search answered 404 and the app path 403, so there is no open door to wire; the European School Education Platform publishes no general read API; there is no EU-wide national school register, so GISCO is the cross-country stand-in at the cost of per-country variation). Pass {source} to CALL one: {source:"esco",text} the EU skill/occupation taxonomy (also {type:"occupation"|"qualification"}), {source:"eurostat",dataset,geo,time} education statistics decoded from JSON-stat 2.0 flat indices to LABELLED observations (or {source:"eurostat",vacancies:true,geo} for the jobs side, jvs_q_nace2), {source:"gisco",country,match} the member states' own school locations with coordinates and levels, {source:"data-europa",text} WHICH European datasets exist for a phrase (the EU's catalogue of catalogues — the door the education sources were found through), {source:"cordis",text} what the EU has FUNDED and what it is CALLING FOR (project records and Horizon call topics in one index), {source:"ted",cpv} published EU tender notices under a CPV division (education = 80000000 by default). There is deliberately NO bulk ledger-to-ESCO mapping: it was built, measured over all 68 clusters, and REMOVED for producing confident wrong rows — it is in the named absences with the pairing walk (uuidna_education_jobs) as what stands in its place. what comes back over the network is EVIDENCE, never a seal — a provenance fingerprint of what a named public source said when asked, exactly as uuidna_corroborate treats its streams; only a `by decide` theorem SEALS. Rows are passed through unaltered and NEVER fabricated: an unreachable source returns nothing, which is an absence, not a refutation. Eurostat serves aggregates and GISCO serves institutions, so no pupil data passes here. The parse, the JSON-stat decode and the addressing are pure, so the same bytes fold to the same receipt for anyone. Integrity, not truth (theorem provenance_integrity_not_content_truth). The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `fetch_education_jobs` {#uuidna-education-jobs}

**Fetch education jobs.** Returns {subject,homographs,cluster,pairs,occupations,vacancies,…}.

Call `fetch_education_jobs` — the old name `uuidna_education_jobs` still answers · read-only · reaches outside

```json
// arguments
{"subject":"z9-ring"}
// answer (excerpt)
{"subject":"z9-ring","homographs":[],"cluster":{"skill":"z9-ring","theorems":305,"fold":"1d6c4433-31bd-8928-a443-7b27b2f82383"},"pairs":[{"skill":"z9-ring","es…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `subject` | string | **yes** | what is taught — a uuidna skill… |
| `geo` | string | no | a country code to attach its re… |
| `perSkill` | number | no | how many ESCO skills to walk fr… |

PAIR EDUCATION TO JOBS through the vocabulary that holds both: {subject} → ESCO skills (lexical match) → the occupations requiring them, tagged essential or optional → optionally {geo} the vacancies that country reports (Eurostat jvs_q_nace2, whole economy). ESCO publishes the skill↔occupation relation in both directions, so this walks a public relation instead of inventing one; a subject naming one of uuidna's sealed clusters carries it along with its theorem count and fold. Returns {subject,cluster,pairs,occupations,vacancies,receipt,honest}. a MAP BETWEEN PUBLIC VOCABULARIES, hop by named hop — NOT careers advice, NOT a prediction, NOT a claim any employer or authority recognises what is sealed here. Vacancies are a WHOLE-ECONOMY aggregate, never openings matched to this subject; a hop returning nothing says so. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

PAIR EDUCATION TO JOBS through the vocabulary that already holds both. Joining a curriculum to a labour market is normally done by matching strings and hoping; it does not have to be. ESCO — the European Commission's own classification — relates a SKILL to the OCCUPATIONS it is essential or optional for, and publishes the relation in both directions, so this walks a public relation instead of inventing one: {subject} → ESCO skills (lexical match) → the occupations that require them, tagged essential or optional → optionally {geo} the vacancies that country actually reports (Eurostat jvs_q_nace2, whole economy). When the subject names one of uuidna's own sealed skill clusters, the cluster rides along with its theorem count and order-invariant fold, so a lesson that is PROVEN here is paired to work that exists out there. a MAP BETWEEN PUBLIC VOCABULARIES, hop by named hop — the first hop is a LEXICAL match ESCO returned for the phrase, and a human accepts or rejects it. It is NOT careers advice, NOT a prediction that studying this leads to that work, and NOT a claim that any employer or authority recognises anything sealed here (theorem provenance_integrity_not_content_truth) — uuidna is not accredited and awards no qualification. The vacancy figures are a country's own aggregate reporting for the WHOLE ECONOMY, never openings matched to this subject. A hop that returns nothing says so rather than being bridged by guess. Returns {subject,cluster,pairs,occupations,vacancies,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `get_hardware` {#uuidna-hardware}

**Get hardware.** Returns {principle,count,parts,receipt,bits,honest}.

Call `get_hardware` — the old name `uuidna_hardware` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"principle":"lean/Hardware.lean","count":18,"parts":[{"key":"and_gate_truth_table","title":"The AND gate as arithmetic","statement":"[(0,0),(0,1),(1,0),(1,1)]…
```

_No parameters._

The HARDWARE-VERIFIABLE BINARY ALGEBRA (lean/Hardware.lean) as one named spec: the low-level combinational-logic identities every digital circuit is built from — the four gate truth tables (NOT/AND/OR/XOR as arithmetic on bits), XOR = ℤ/2 parity, Boolean closure, NAND functional completeness (NAND rebuilds NOT/AND/OR — why chips are one repeated gate), De Morgan, the half- and full-adder, and the 2:1 multiplexer — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification (matching the live published truth tables), so a gate design can be VERIFIED AGAINST it. integrity, not truth (theorem provenance_integrity_not_content_truth) — uuidna seals the spec; it does NOT fabricate a device, synthesise a netlist, or develop silicon. A sealed spec, not a chip. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}. Boundary declared — theorem drift_is_named_or_caught.

### `get_software` {#uuidna-software}

**Get software.** Returns {principle,count,parts,receipt,bits,honest}.

Call `get_software` — the old name `uuidna_software` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"principle":"lean/Software.lean","count":16,"parts":[{"key":"append_length_adds","title":"CONCATENATION is additive in length","statement":"([1,2,3] ++ [4,5])…
```

_No parameters._

The SOFTWARE-VERIFIABLE ALGEBRA (lean/Software.lean) as one named spec, the companion to uuidna_hardware one level up: the algebraic correctness LAWS a program is verified against — losslessness (split-and-recompose is the identity), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, a TOTAL guarded division, bounded termination, order-invariant reduction (safe to parallelise), the compare-swap that orders, total safe indexing, and reversibility (undo of undo is the identity) — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification, so an implementation can be VERIFIED AGAINST it. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}. uuidna seals the spec; it does NOT write, compile or run your program, nor prove an arbitrary program correct. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

The SOFTWARE-VERIFIABLE ALGEBRA (lean/Software.lean) as one named spec, the companion to uuidna_hardware one level up: the algebraic correctness LAWS a program is verified against — losslessness (split-and-recompose is the identity — serialisation loses nothing), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, a TOTAL guarded division (no divide-by-zero crash), bounded termination (a shift loop halts), order-invariant reduction (safe to parallelise), the compare-swap that orders (every sort's basis), total safe indexing (no over-read), and reversibility (undo of undo is the identity) — each a decidable, AXIOM-FREE `by decide` fact and a 128-bit content-address particle, folded to one order-invariant receipt. The sealed STATEMENT is the specification, so an implementation can be VERIFIED AGAINST it. integrity, not truth (theorem provenance_integrity_not_content_truth) — uuidna seals the spec; it does NOT write, compile, or run your program, nor prove an arbitrary program correct. A sealed spec, not the program. Returns {principle,count,parts:[{key,title,statement,particle}],receipt,bits,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `get_os` {#uuidna-os}

**Get os.** Returns {layer,floor,receipt,capacity,firmware,boot,portCount}.

Call `get_os` — the old name `uuidna_os` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"layer":{"principle":"lean/Os.lean","count":8,"parts":[{"key":"boundary_is_exactly_two_named_modules","title":"The NON-DETERMINISM boundary is EXACTLY TWO nam…
```

_No parameters._

uuidnaOS: verified lattice boot, four-width capacity, CPU/GPU fleet. Layer 1 load, never Alpine ELF. Integrity, not truth (theorem provenance_integrity_not_content_truth).

THE OS-INTEGRITY ALGEBRA (lean/Os.lean) as one named spec — the third layer, completing hardware → software → os. The decidable facts a DEPLOYMENT is verified against: exact-copy is byte-equality, so a single-byte tamper, a truncation, or a REORDERING breaks the match (a provenance is a SEQUENCE, not a set); the SHA-256 digest is a fixed 256 bits, the content-address a fixed 128; and the non-determinism boundary is EXACTLY two named modules (src/os, src/drivers). Each a decidable, AXIOM-FREE `by decide` particle, folded to one order-invariant receipt. This is the SPEC; the runtime side (Alpine + driver provenance, uuidna_alpine to port the whole arch matrix) enforces it against real bytes with uuidna's own pure-TS SHA-256. Boot here is verified hexbit loading of the default-install image (theorem the_os_is_bootable_quantum); this spec does not run Alpine ELF, while uuidnaOS itself executes elsewhere (uuidna_exec applets, uuidna_run at the os/runtime boundary). capacity.stream is the independent-message CPU fleet plus one specified GPU residue class at postage; onion wraps and sealChain stay serial. integrity, not truth — uuidna seals what an exact-copy verification decides; it does NOT port the runtime, link, or run an operating system. Relates to uuidna_exec (Layer 1 applets), uuidna_port, uuidna_run (Layer 2).

### `run_app` {#uuidna-exec}

**Run app.** Returns {line,applet,args,ok,mode,unrunArgs,output,data,receipt,handle,…}.

Call `run_app` — the old name `uuidna_exec` still answers · changes state

```json
// arguments
{"line":"theorem"}
// answer (excerpt)
{"line":"theorem","applet":"theorem","args":[],"ok":false,"mode":"executed","unrunArgs":[],"output":["exec: theorem: not a ported applet (try 'help'); surface …
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `line` | string | **yes** | e.g. |

ALPINE APPS IN THE VIRTUAL uuidnaOS (Layer 1 — in-memory). Pass {line}: ls, apk (list/info/search/add/del/policy), man, busybox (cat/which/stat/pwd/echo/du), driver, device, help. apk add/del mutates SESSION state only — host rootfs unchanged. Full port on the lattice (theorem the_os_is_bootable_quantum); host binary execution is uuidna_run (Layer 2). Returns {line,applet,args,ok,output,data,receipt,hexbits,sealed,honest}.

Layer 1, in-memory: install-port VFS, full catalogue, session apk add/del, busybox applets over virtual fs + session files. A published package name (nginx, openssl) or cmd: (dotnet, omp) uses that app — identity + hexbits + man + cmds. device carries this host's CPU lanes plus the specified GPU stream worker (hostStreamFleet). Nothing runs Alpine ELF inside this door — boot is verified hexbit loading. Layer 2 (uuidna_run, stdio only): verify-then-run pinned rootfs bytes on the host. Relates to uuidna_os (boot + capacity), uuidna_port, uuidna_registry, the terminal.

### `run_command` {#uuidna-run}

**Run command.** Returns {ok,spawned,exitCode,stdout,stderr,stdoutSha256,stderrSha256,…}.

Call `run_command` — the old name `uuidna_run` still answers · read-only · idempotent

```json
// arguments
{"command":"theorem"}
// answer (excerpt)
{"ok":false,"spawned":false,"exitCode":null,"stdout":"","stderr":"","stdoutSha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","stderrSh…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `command` | string | **yes** | command inside pinned rootfs, e… |
| `spawn` | boolean | no | if true, spawn via docker/chroo… |
| `fetch` | boolean | no | if true, download mirror tarbal… |

HOST BINARY EXECUTION (Layer 2) — verify-then-run the pinned Alpine minirootfs on this machine. Pass {command} (shell string) and optional {spawn:true} to execute (default: recipe only). Stdio MCP only — absent from the Workers edge. Rootfs tarball must match the pinned SHA-256 in mirror/ before any spawn. stdout/stderr are DATA (content-addressed), never folded into the boot hexbit image. Returns {ok,spawned,exitCode,stdout,stderr,stdoutSha256,stderrSha256,receipt,recipe,reason,remedy,honest}.

Separate door from uuidna_exec so theorem the_os_is_bootable_quantum stays true for Layer 1. planAlpineRun verifies mirror/alpine-minirootfs-&amp;lt;version&amp;gt;-&amp;lt;arch&amp;gt;.tar.gz against INSTALLS_MIRROR.release.rootfsSha256, resolves a POSIX shell via os/host, returns a spawn recipe; spawn:true runs it. HONEST: execution proves the pinned bytes ran on this host — integrity, not truth.

### `get_port` {#uuidna-port}

**Get port.** Returns {branch,repo,arch,release,driver,count,routes,floor,receipt,…}.

Call `get_port` — the old name `uuidna_port` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"branch":"latest-stable","repo":"main","arch":"x86_64","release":{"version":"3.24.2","rootfsSha256":"c5ca053cfe1d85c5b96dff8b9bc57045f7f184a30ffb6b65776409ca9…
```

_No parameters._

THE PINNED ALPINE PORT, MADE OBSERVABLE — automate port updates. Reports branch/repo/arch/release, driver bundle, default-install count, routes, floor, boot shape (32·(count+1) states), port + boot receipts. Deterministic, offline. Returns {branch,repo,arch,release,driver,count,routes,floor,receipt,bootReceipt,bootStates,honest}.

AUTOMATE PORT UPDATES (the captain's order, 2026-08-24). The Alpine mirror already refreshes at the os/ boundary on every lean run (lean-installs, auto-discovered by lean-all) and rewrites ONLY when upstream moved; every surface reads defaultInstalls(), so a moved mirror updates uuidna_exec/registry and this tool at once. What was missing was OBSERVABILITY and a DECIDABLE staleness test — a port update you cannot see or verify is hoped, not automated. This tool is the observable half: the pinned port at a glance, recomputable by anyone. The decidable half lives host-side: `npm run x -- port-update` reports this status and (with UUIDNA_TRACK_LATEST) reads upstream, runs the PURE portDelta comparator, and exits STALE naming exactly what moved (release, changed checksums, added/removed packages) so a scheduler or CI step can OPEN the update — the rewrite itself is lean-installs' job in the same reconcile, gate-verified before it lands. WHY FRESHNESS IS NOT IN THIS CALL: a served, recomputable surface must not fetch — a live read inside the gate is nondeterminism in the one place determinism is the whole point (the models feed proved it by breaking spin's seal mid-walk). So the served tool reports the SEALED pin; tracking upstream is reconcile's act, at the one honest boundary. Boundary declared — theorem drift_is_named_or_caught.

### `get_related` {#uuidna-related}

**Get related.** Returns {candidates,ported,quoted,undecided,closed,receipt,honest}.

Call `get_related` — the old name `uuidna_related` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"candidates":10,"ported":["alpine-base","busybox","busybox-binsh","busybox-ifupdown","busybox-mdev-openrc","busybox-openrc","busybox-suid","musl","openrc","op…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `names` | array | no | candidate Alpine package names… |

WHICH ALPINE PACKAGES THE THEOREMS RELATE TO — adjudicated, never asserted. Pass {names} (candidate package names; defaults to the ported set) and each is judged against the SEALED LEDGER with the house's three verdicts: PORTED (named by a theorem and already carried), QUOTED (every mention sits inside a ported package's own published Alpine description — refuted, and the quote is given as the reason), UNDECIDED (the name is also an ordinary English word, so no lexical test settles its sense — claimed NEITHER related nor unrelated; a human decides). `closed` is true only when nothing is left undecided, so it cannot flatter the port. The haystack served here is the SHIPPED ledger (keys/names/statements), which every surface can recompute; a host-side run over the unshipped Lean sources sees more prose and is reported separately. Measured over all 5961 main packages against those sources: 43 candidates → 25 PORTED, 2 QUOTED (openssl, mdevd), 16 UNDECIDED — no unported package confirmed related. Pure, offline, edge-clean. Returns {candidates,ported,quoted,undecided,closed,receipt,honest}.

THE QUESTION IS AN ADJUDICATION, NOT A SEARCH (the captain's order, 2026-08-24: "port all packages related to the theorems"). THREE RELATIONS WERE MEASURED BEFORE ANY WAS BUILT, and two failed outright: (1) theorem-key words against package names → 9 hits, ALL ordinary English (audit, tree, make, which); (2) primitive names against package descriptions → sha256/poly1305/merkle match ZERO packages (Alpine descriptions say "Toolkit for TLS", not the primitive), while "rsa" matched libuuid through the substring inside "unive-rsa-l". (3) whole-word package names in the sealed wings → 43 candidates, and THAT one carries signal: all 25 ported packages are among them, because Installs.lean is the wing about packages. But it still over-matches, so a lexical hit is treated as EVIDENCE and passed to a verdict. QUOTED is the discriminating control: `openssl` and `mdevd` occur in the ledger ONLY inside the published descriptions of libcrypto3 ("Crypto library from openssl") and mdev-conf — the ledger quoting Alpine about a package it already carries is not the ledger naming a new one. UNDECIDED is the honest floor: `cargo` appears as the register's cargo, `dash` as a typographic dash, `file` as a chessboard's rank and file, and no lexical test can settle word sense — so the instrument declares it rather than guessing, and `closed` stays false while any remain. THE ANSWER TO THE ORDER: the port is already the theorem-related set — 25 named and carried, 2 refuted by their own quotes, 16 undecidable English collisions, and NO unported package confirmed related. The instrument is the durable part: a future theorem that genuinely names an unported package surfaces here (the test drives exactly that case and requires `closed` to stay false), so relatedness is a maintained invariant instead of a one-time sweep. Pure and edge-clean — the ledger is an imported module, never a file read; the published index is a network read and stays at the os/ boundary. Boundary declared — theorem drift_is_named_or_caught.

### `get_registry` {#uuidna-registry}

**Get registry.** Returns {count,tools,installs,packages,root,receipt,handle,hexbits,…}.

Call `get_registry` — the old name `uuidna_registry` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"count":270,"tools":245,"installs":25,"packages":[{"kind":"install","id":"uuidna/alpine-base","name":"alpine-base","route":"/","meaning":"Meta package for min…
```

_No parameters._

THE ONE PORT REGISTRY — the toolbox and the ported OS as a SINGLE content-addressed set. Every MCP tool is recast into the same port shape an Alpine package wears (uuidna/&amp;lt;name&amp;gt; identity, a 128-bit address, 32 hexbit states, its one-line meaning) and merged with the sealed install port, then the whole set is merkle-folded to ONE root: compare one handle, compare every port at once. A tool's address here IS the preimage the served API seal folds, so the two surfaces cannot drift. Nothing executes (theorem the_os_is_bootable_quantum) — a tool-package is a provenance spec or uuidna's own pure logic, never Alpine's binary. Derived from the catalogue + install port, no fetch. Returns {count,tools,installs,packages:[{kind,id,name,route,meaning,address,hexbits}],root,handle,receipt,honest}.

THE UNIFICATION (the captain's order 2026-08-23, "refactor all to exactly map alpine for full automated port"; lead 129 at depth): an MCP tool is a pure function input→output; an Alpine package IS a utility (busybox a toolbox of them); a ported install spec is a utility given a uuidna/&amp;lt;name&amp;gt; identity, a 128-bit address and 32 hexbit states. So a tool and a ported package are the SAME KIND OF OBJECT, and this registry maps EVERY tool onto that one PackagePort shape, merges it with the whole ported OS, and folds all addresses to one recomputable root — the toolbox and the OS become one registry with one receipt, discoverable BY package rather than by a second bespoke schema. "Exactly map alpine" = the tools wear the port's own shape; "full automated port" = it is DERIVED from the catalogue and the sealed mirror, nothing authored, no fetch. NON-ARBITRARY: a tool's address is toUuid('tool:'+name+':'+description) — the exact preimage apiHandleOf merkle-folds for the API seal, so the registry reads the sealed address, it does not invent one; a reworded tool moves the root. LOAD-BEARING HONESTY (theorem the_os_is_bootable_quantum): nothing executes — a tool-package is EITHER a package's provenance spec OR uuidna's own pure reimplementation of the utility's logic, never Alpine's binary run; the tool's LOGIC is uuidna's, the tool's IDENTITY is a package port. THE SHARED SHAPE IS ALREADY SEALED: a tool and a ported package wear the SAME identity — a 128-bit content-address that compiles to exactly 32 hexbit states — which is theorem hexbit_is_four_qubits (32·4 = 128, 8·4 = 32), the address algebra both obey; the registry needs no new seal, it APPLIES that one to a merged set (proven here by the address-equals-API-preimage test, not asserted).

### `fetch_alpine` {#uuidna-alpine}

**Fetch alpine.** Returns {branch,arches,releases,ported,requested,receipt,honest}.

Call `fetch_alpine` — the old name `uuidna_alpine` still answers · read-only · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"branch":"latest-stable","arches":["x86_64","x86","aarch64","armhf","armv7","ppc64le","s390x","riscv64"],"releases":[],"ported":0,"requested":8,"receipt":"393…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `branch` | string | no | Alpine branch, e.g. |
| `installs` | boolean | no | return THE DEFAULT INSTALL PORT… |

PORT ALL ALPINE — automate the OS-provenance port across the WHOLE official architecture matrix (x86_64, x86, aarch64, armhf, armv7, ppc64le, s390x, riscv64) in one call. For each arch it reads Alpine's PUBLISHED latest-releases metadata over the network (at the os/ boundary — the one place a live "latest" read is honest), extracts the exact minirootfs version + PUBLISHED SHA-256, PINS it as a content-addressed provenance record, and folds every arch to ONE recomputable catalog receipt. This ports the INTEGRITY of all of Alpine — the exact upstream bytes of every arch, re-verifiable by anyone with uuidna's own pure-TS SHA-256 — NOT the runtime: nothing is booted, linked, or executed. Best-effort and honest: an unreachable arch/mirror simply drops out (ported &amp;lt; requested), a digest is NEVER fabricated. Optional {branch} (default "latest-stable"). Returns {branch,arches,releases:[{version,arch,flavor,file,rootfsSha256,address,receipt}],ported,requested,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

### `get_package` {#uuidna-package}

**Get package.** Returns {namespace,honest,usage}.

Call `get_package` — the old name `uuidna_package` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"namespace":"uuidna/","honest":"Each Alpine package is a content-addressed provenance identity uuidna/, minted from its published checksum — in…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `name` | string | no | an Alpine package name, e.g. |
| `infuse` | boolean | no | mint the WHOLE index and fold t… |
| `arch` | string | no | default x86_64 |
| `repo` | string | no | "main" (default) or "community" |
| `branch` | string | no | default "latest-stable" |

EACH ALPINE PACKAGE BECOMES uuidna/&amp;lt;package&amp;gt; — a content-addressed provenance identity of the exact published release (name, version, arch, repo, branch, PUBLISHED checksum) folded to a 128-bit address that recomputes for anyone holding the same apk index. At the os/ boundary it reads Alpine's PUBLISHED APKINDEX (the response is DATA, never run), gunzips it with the platform DecompressionStream, untars it and mints each package. Pass {name} (+ optional {arch}, {repo:"main"|"community"}, {branch}) for ONE package's identity; {infuse:true} for the whole index folded to one catalog receipt (count + receipt + a sample); no argument returns the namespace description with no fetch. Re-read and the identities move with the published versions. integrity, not execution — uuidna does NOT install, link, run, fork or mirror a package; it FINGERPRINTS upstream metadata so a deployment can prove which exact packages it rests on. Best-effort: a down mirror yields an empty catalog, never a faked checksum. Boundary declared — theorem drift_is_named_or_caught.

EACH ALPINE PACKAGE BECOMES uuidna/&amp;lt;package&amp;gt; — a content-addressed provenance identity of the exact published release (name, version, arch, repo, branch, PUBLISHED checksum) folded to a 128-bit address that recomputes for anyone holding the same apk index. At the os/ boundary it reads Alpine's PUBLISHED APKINDEX (the response is DATA, never run), gunzips it with the platform DecompressionStream (pure-TS, no node:zlib), untars it, and mints each package. Pass {name} (+ optional {arch}, {repo:"main"|"community"}, {branch}) for ONE package's uuidna/&amp;lt;name&amp;gt; identity; pass {infuse:true} for the whole index minted and folded to one catalog receipt (count + receipt + a sample — the receipt proves all are infused without dumping thousands); no argument returns the namespace description (no fetch). Automate updates/upgrades: re-read and the identities move with the published versions. integrity, not execution — uuidna does NOT install, link, run, fork, or mirror a package; it FINGERPRINTS the upstream metadata so a deployment can prove which exact packages it rests on. Best-effort: a down mirror yields an empty catalog, never a faked checksum. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `compute_context` {#uuidna-context}

**Compute context.** Returns {capacity,spent,free,freePermille,safeFloorPermille,balanced,…}.

Call `compute_context` — the old name `uuidna_context` still answers · read-only · idempotent

```json
// arguments
{"categories":[{"name":"theorem","tokens":1}],"capacity":1}
// answer (excerpt)
{"capacity":1,"spent":1,"free":0,"freePermille":0,"safeFloorPermille":406,"balanced":false,"categories":[{"name":"theorem","tokens":1,"permille":1000,"foldCeil…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `categories` | array | **yes** | the window breakdown, e.g. |
| `capacity` | integer | **yes** | the window capacity in tokens,… |

BALANCE A CONTEXT WINDOW by the ledger's own laws — uuidna fused to Claude (or any model): pass your window's breakdown ({categories:[{name,tokens}], capacity}) and the exact-integer audit returns: each category's share in permille, the BALANCE VERDICT against the unit's sealed spare law (SAFE_HEXBITS/UUID_HEXBITS = 13/32 = 406‰ free — the same spare that guards the uuid guards the conversation), and every category priced for THE FOLD (any re-fetchable block collapses to a ~12-token content-address receipt; heaviest first, because the heaviest fold buys the most window — what folds out stays computable by request). Deterministic, no floats, report receipt-addressed with its 32-state compile. token counts are YOUR self-report — nothing here reads a model's window; the arithmetic on them is exact. Returns {capacity,spent,free,freePermille,safeFloorPermille,balanced,categories,foldableTotal,verdict,receipt,hexbits,honest}.

### `compute_machine` {#uuidna-machine}

**Compute machine.** Returns {cores,loadPermille,memFreePermille,safeFloorPermille,…}.

Call `compute_machine` — the old name `uuidna_machine` still answers · read-only · idempotent

```json
// arguments
{"cores":1,"centiLoad1":1,"memTotalMb":1,"memFreeMb":1}
// answer (excerpt)
{"cores":1,"loadPermille":10,"memFreePermille":1000,"safeFloorPermille":406,"cpuBalanced":true,"memBalanced":true,"balanced":true,"writers":[],"verdict":"BALAN…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `cores` | integer | **yes** |  |
| `centiLoad1` | integer | **yes** | 1-minute load average × 100 |
| `memTotalMb` | integer | **yes** |  |
| `memFreeMb` | integer | **yes** |  |
| `writers` | array | no |  |

BALANCE A MACHINE by the ledger's laws — the resource balancer for a development machine, a server, or a visitor's device: pass the machine's self-report ({cores, centiLoad1 (load×100, integer), memTotalMb, memFreeMb, writers:[{name,centiCpu}]}) and the exact-integer audit returns both lanes judged against the unit's sealed spare floor (SAFE_HEXBITS/UUID_HEXBITS = 13/32 = 406‰ — the same spare that guards the uuid and the context window guards the metal), the writers ranked heaviest-first as the pause order, verdict, receipt, 32-state compile. The window balancer's sibling: one pure law, three surfaces (uuidna_context for the window, this for the machine, uuidna.com's in-browser DeviceBalance for the visitor's device — computed there, nothing sent). the figures are YOUR self-report — this tool cannot read a machine and never pretends to; locally `npm run x -- machine` measures at the scripts boundary and feeds this same function. Returns {cores,loadPermille,memFreePermille,safeFloorPermille,cpuBalanced,memBalanced,balanced,writers,verdict,receipt,hexbits,honest}.

### `compute_credits` {#uuidna-credits}

**Compute credits.** Returns {key,statement,tactic,file,address,verdict,leanProof,…}.

Call `compute_credits` — the old name `uuidna_credits` still answers · read-only · idempotent

```json
// arguments
{"key":"mul9_1_1"}
// answer (excerpt)
{"key":"mul9_1_1","statement":"(1 * 1) % 9 = 1","tactic":"decide","file":"Core.lean","address":"808f7b27-ae33-8132-a62a-495944b9907d","verdict":"SEALED","leanP…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** | a sealed theorem key |

The PROVENANCE of one theorem by key: exactly HOW it is Lean-proven in uuidna (the `by decide` Lean line, tactic, content-address, SEALED) AND WHO it is credited to. A theorem whose SEALED name/principle references a named result is credited historically (discoverer/solver + a documentation link) — uuidna reflects it, never invents it (a Clay theorem credits the mathematician who proved the PROBLEM, e.g. Perelman for Poincaré, never uuidna, which seals only the reflection). A theorem naming NO prior result directly is claimed by THE CAPTAIN BY LAW (first sealed by-decide here, content-addressed — the seal is the claim, prior art), but a DEEP READ of its neighbouring domain surfaces CONTEXTUAL figures seriously involved whose names may stand next to the captain’s; only when neither the theorem nor its neighbourhood names anyone does the captain claim it ALONE. Returns {key,statement,tactic,leanProof,provenance,historical:[{who,link}],contextual:[{who,link}],claimedBy,claim,address}.

### `get_credits_summary` {#uuidna-credits-summary}

**Get credits summary.** Returns {total,historical,contextual,captainAlone,address}.

Call `get_credits_summary` — the old name `uuidna_credits_summary` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"total":71018,"historical":1613,"contextual":981,"captainAlone":68424,"address":"468fbc36-cfb4-8345-8e32-18f3cbfa6541"}
```

_No parameters._

The recomputable credit tally over the whole ledger: how many theorems reflect a named historical result DIRECTLY, how many the captain claims by law but with CONTEXTUAL figures from the neighbouring domain standing next to him, and how many the captain claims ALONE (no prior name in the theorem or its neighbourhood). Returns {total,historical,contextual,captainAlone,address}.

### `compute_neighbours` {#uuidna-neighbours}

**Compute neighbours.** Returns {key,principle,count,neighbours}.

Call `compute_neighbours` — the old name `uuidna_neighbours` still answers · read-only · idempotent

```json
// arguments
{"key":"mul9_1_1"}
// answer (excerpt)
{"key":"mul9_1_1","principle":"The 8×8 core","count":63,"neighbours":[{"key":"mul9_1_2","name":"1·2 ≡ 2 (mod 9)","address":"67a2dc40-b8a6-838e-b8c3-3453f7c617e…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** | a sealed theorem key |

Each theorem SCANS its NEIGHBOURS: given a key, return the sealed theorems that share its computing principle (its domain) — the local graph around it. The neighbourhoods partition the whole ledger, so every theorem sits in exactly one and none is isolated. Zero external influence, recomputable from the ledger. Returns {key, principle, count, neighbours:[{key,name,address}]}.

### `get_axiom_index` {#uuidna-axiom-index}

**Get axiom index.** Returns {entries,totalDefs,citedDefs,unusedDefs,wings,balance}.

Call `get_axiom_index` — the old name `uuidna_axiom_index` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"entries":[{"file":"Affine.lean","def":"agl","principle":"The affine","theorems":[{"key":"composition_stays_inside","name":"CLOSED: composing any two of the f…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `file` | string | no | lean wing file, e.g. |
| `def` | string | no | wing def name, e.g. dz |

WING AXIOMS ↔ THEOREMS, both directions. Pass {file,def} for one wing def and every theorem whose statement cites it (axiomExplain). Pass nothing for the full index: every def declared in lean/*.lean, which theorems cite it, which defs are unused vocabulary, and the fused axiom-balance receipt across ledger/wing/principle/skill/ray (both-direction ratios). Pairs with uuidna_theorem axioms field (theorem → defs). Recomputable from WING_DEFS + dependsOn. Returns {totalDefs,citedDefs,unusedDefs,wings,entries,balance} or one {file,def,principle,theorems,theoremCount,unused}.

### `compute_discovery_train` {#uuidna-discovery-train}

**Compute discovery train.** Returns {kind,tool,recompute,why}.

Call `compute_discovery_train` — the old name `uuidna_discovery_train` still answers · read-only · idempotent

```json
// arguments
{"recompute":false}
// answer (excerpt)
{"kind":"contract","tool":"uuidna_discovery_train","recompute":false,"why":"a sweep over the sealed ledger; call with recompute: true"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `recompute` | boolean | **yes** | run the sweep now |
| `query` | string | no | a topic |

Train theorem/axiom discovery from refuted and refused leads in lean/leads.json. Refutations name what sealed (killed_by cites theorem keys and src paths); refusals name boundaries. Pass {query} for ranked hints (witness theorems, wing defs, exposed axiom-hunt leads, prior refutations on similar topics). Pass nothing for the full training report: settlement count, topic→theorem patterns, exposed axioms, unused wing defs. Pairs with uuidna_axiom_index and uuidna_theorem axioms. Recomputable. Returns {trained,refuted,refused,patterns,hints,exposedAxioms,unusedWingDefs,receipt}. AN EMPTY CALL IS CHEAP: this is a sweep over the sealed ledger (seconds to tens of seconds, measured 2026-09-12), so it runs only when asked for by name — pass {recompute: true}; without it the reply is this contract and nothing is computed.

### `fetch_land_rights` {#uuidna-land-rights}

**Fetch land rights.** Returns {claim,verdict,why,found,nearest,honest,sealedBy}.

Call `fetch_land_rights` — the old name `uuidna_land_rights` still answers · read-only · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"claim":"","verdict":"UNVERIFIED","why":"the claim names no instrument in the sealed table","found":[],"nearest":[],"honest":"Integrity of the citation agains…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | no |  |
| `url` | string | no |  |

THE PUBLIC'S DOOR TO THE RIGHT TO LAND AND TO ACCESS (src/rights). {claim}: VERIFIED only when the claim names an instrument in the sealed table (src/rights/land-instruments.json — the Universal Declaration, the Covenants, the declarations on indigenous peoples and on peasants, ILO 169, the tenure guidelines, the environment-right resolutions, Aarhus, the regional charters, the Nordic, Scottish, English, Icelandic, Estonian and Bulgarian access laws, the Charter of the Forest and the public trust case, each read from its official source) and every article it cites exists in that instrument; otherwise UNVERIFIED with the nearest rows. {url}: the page is read as a page, every detail audited (uuidna_audit_details), every instrument citation checked, and every table article sharing vocabulary returned as a legislative path with its kind, adopting body, qualifications and official source. Every answer carries a receipt signed by 2×7 theorems (receiptSealed re-verifies it). Integrity of the citation, not legal advice; no instrument in the table grants unrestricted access to all land (theorem every_access_instrument_is_qualified).

### `get_due_process` {#uuidna-due-process}

**Get due process.** Returns {verifiedAll,guarantees,allGuaranteesSealed,docket,gaps,…}.

Call `get_due_process` — the old name `uuidna_due_process` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"verifiedAll":{"theorems":71018,"verified":71018,"unverified":0,"receipt":"08b07830-c9d8-88d2-bd10-bb46c60b4d67"},"guarantees":[{"key":"legal_verdict_is_exact…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claims` | array | no | claims to put on the docket, ea… |

VERIFY ALL BY DUE (recomputable) LEGAL PROCESS — nothing verified by fiat. Every theorem faces the same fair trial, and every guarantee making that process DUE is itself a sealed lean/Legal.lean theorem: exactly ONE verdict per claim (PROVEN/REFUTED/NOT-PROVEN partition), only the PROVEN admitted, the NON-JUSTICIABLE never refuted (no test → never REFUTED), REFUTED only on a failed uncited test, remand TOTAL (nothing discarded), and the trial computing ONLY with the two coins deposited. Pass {claims:[...]} to put claims on the docket, each adjudicated by that same process with a note; folds to one docket receipt. Returns {verifiedAll,guarantees,allGuaranteesSealed,docket,allTheoremsVerified,receipt,honest}. uuidna's OWN recomputable adjudication, whose rules are theorems anyone rechecks — NOT a court of law, NOT legal advice, NOT an enforceable ruling. "Due" means fair and recomputable by its sealed guarantees; the binding ruling stays a human court's. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

VERIFY ALL BY DUE (recomputable) LEGAL PROCESS — nothing verified by fiat. Every theorem is verified by the same fair trial, and every guarantee that makes the process DUE is itself a sealed lean/Legal.lean theorem: exactly ONE verdict per claim (PROVEN/REFUTED/NOT-PROVEN partition), only the PROVEN admitted (a decidable test holds OR a sealed authority is cited), the NON-JUSTICIABLE never refuted (no test → never REFUTED), REFUTED only on a failed uncited test, remand TOTAL (nothing discarded — routed to the development trial), and the trial computing ONLY with the two coins deposited. Pass {claims:[...]} to put claims on the docket — each is adjudicated by the same process (PROVEN/REFUTED/NOT-PROVEN + a note). Folds to one recomputable docket receipt. integrity, not truth (theorem provenance_integrity_not_content_truth) — this is uuidna's OWN recomputable adjudication whose rules are theorems anyone rechecks; it is NOT a court of law, NOT legal advice, and NOT an enforceable ruling. "Due" means the process is fair and recomputable by its sealed guarantees; the binding ruling stays a human court's. Returns {verifiedAll,guarantees,allGuaranteesSealed,docket,allTheoremsVerified,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `audit_cloudflare` {#uuidna-cloudflare-audit}

**Audit cloudflare.** Returns {worker,bindings,secretsInRepo,quantumPosture,clean,receipt,…}.

Call `audit_cloudflare` — the old name `uuidna_cloudflare_audit` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"worker":"worker.js (uuidna.com edge — license-domain enforcement + trial CRUD)","bindings":[{"binding":"ASSETS","kind":"assets","secretInRepo":false,"quantum…
```

_No parameters._

AUDIT the Cloudflare Workers bindings for a quantum-secure posture, recomputably. Reflects the committed wrangler.toml: the ASSETS binding (static ./site served read-only — no secret, no crypto target), the TRIALS KV (OPT-IN and commented out — no namespace id committed, consent-gated), the TRIAL_KEY secret (a `wrangler secret`, NEVER in the repo — signs each verdict with HMAC-SHA256), and token-free OIDC publish. QUANTUM POSTURE: symmetric-only (HMAC-SHA256, ChaCha20-Poly1305, PBKDF2-SHA256) — no RSA/ECC, so Shor has no asymmetric target; Grover only halves to a ~128-bit floor. Returns {worker,bindings,secretsInRepo,quantumPosture,clean,receipt,honest}. audits the COMMITTED CONFIG posture (no secret committed + symmetric crypto), NOT the live edge deployment (the real secret and KV id live at the edge, not the repo) — not a penetration test or a compliance certification. A live audit needs the Cloudflare account. Boundary declared — theorem drift_is_named_or_caught.

### `sign_commit` {#uuidna-sign}

**Sign commit.** Returns {signed,verdict,address,cited,citedCount,fabricated,fold,…}.

Call `sign_commit` — the old name `uuidna_sign` still answers · read-only · idempotent

```json
// arguments
{"message":"theorem"}
// answer (excerpt)
{"signed":false,"verdict":"UNVERIFIED","address":"ec9e6641-989b-85de-aa57-58eedfea0d13","cited":[],"citedCount":0,"fabricated":[],"fold":"ec9e6641-989b-85de-aa…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `message` | string | **yes** |  |

SIGN a commit message (or any statement) as TRUE — or refuse. A message is SIGNED-TRUE iff, checked against the sealed ledger, it CITES a real sealed theorem (a /theorem/&amp;lt;key&amp;gt; or "theorem &amp;lt;key&amp;gt;") and NONE fabricated (slimGate VERIFIED). The signature is the message content-address FOLDED with its cited theorems through merkleGravity — one gravity root, order-invariant, through the abstract-0 (÷0=0): "folding to 1 through 0". A message citing a proof NOT in the ledger is REFUSED; one citing no theorem is UNSIGNED; one citing a real sealed theorem is SIGNED. The reconcile can FAIL unless the commit is signed-true, so an overclaiming message cannot be committed AS TRUTH. "signed-true" means BACKED by a sealed proof it names — NOT that the claim is true; it signs the CITATION, not the world. No word-list, no forced count. Returns {signed,verdict,address,cited,citedCount,fabricated,fold,reason,honest}. Boundary declared — theorem drift_is_named_or_caught.

### `reveal_verdict` {#uuidna-reveal}

**Reveal verdict.** Returns {verdict,binary,cites,backing,fabricated,reveal}.

Call `reveal_verdict` — the old name `uuidna_reveal` still answers · read-only · idempotent

```json
// arguments
{"claim":"theorem"}
// answer (excerpt)
{"verdict":"UNVERIFIED","binary":1,"cites":[],"backing":[],"fabricated":[],"reveal":"UNVERIFIED — cites no sealed proof. REVEALED as UNBACKED. \"Holds\" here m…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | **yes** |  |

THE SURFACING — the verdict, not the drain-bit. Pass {claim}. Three ways it can land: VERIFIED (cites a sealed proof), DRAINED (cites a proof NOT in the ledger — the one decidably-false case, refused), UNVERIFIED (cites no sealed proof — REVEALED as UNBACKED). No word-list; only the ledger decides. TWO THINGS THE STAMP DOES NOT MEAN: "holds" means "not drained", NEVER "true"; and VERIFIED means the citation is SEALED, never that it SUPPORTS the claim — entailment is not decidable and this gate does not pretend to decide it. So `backing` returns each cited theorem WITH ITS OWN PROSE, whole: a claim can cite a sealed theorem that DENIES it and still verify. Read `backing` before relying on a VERIFIED. Returns {verdict, binary, cites, backing, fabricated, reveal}. Boundary declared — theorem drift_is_named_or_caught, theorem no_instrument_narrower_than_its_question.

WHAT THIS CLOSES, IN TWO LAYERS. (1) THE HOLLOW BOAST: the honesty gate drains only a FABRICATED citation, so "provably unbreakable, 100% secure" returns holds=1 and READS as OK while being wholly unbacked — reveal() surfaces the three-way verdict slimGate already computes, so an uncited boast reads UNVERIFIED rather than as a clean pass. It uses no lexicon because a lexicon is itself a leaky floor: the removed word-list passed "provably honest" and "100% honest" while draining honest prose, and was the most hardcoded thing in a tree whose rule is that only theorems stay. (2) THE CITATION THAT REFUTES ITS OWN CITER, found 2026-08-25 by attempting a claim and watching the gate pass it. slimGate folds the ledger to Map&amp;lt;key,address&amp;gt;, so a theorem reaches the verdict as a TOKEN with its prose already discarded; citation-existence is then a TWO-valued instrument over a THREE-answer question — cites nothing / cites a sealed proof that SUPPORTS / cites a sealed proof that DENIES — and collapses the last two into one value, which is theorem no_instrument_narrower_than_its_question turned on the gate itself. THE WORKED CASE: the claim "uuidna achieves quantum advantage, by theorem n_qubit_dimension" returns VERIFIED, while that theorem’s own sealed text ends "this counts the classical state-vector cost, it is NOT a speedup or a quantum advantage". The gate read the key and never read the sentence. THE VERDICT IS UNCHANGED AND STAYS VERIFIED, deliberately: uuidna verifies, it never refutes, and the trial already ruled this class when it ruled "uuidna is honest" UNVERIFIED. What is repaired is the LEAK, not the verdict — the qualifier now travels ATTACHED to the figure, which is microdata’s discipline applied one layer out, at citation rather than at serialisation. The prose is NOT truncated: n_qubit_dimension’s denial is its LAST clause, so a head-clipped excerpt would drop exactly the sentence that matters and hand back a scope that reads as endorsement.

### `run_wave` {#uuidna-wave}

**Run wave.** Returns a result.

Call `run_wave` — the old name `uuidna_wave` still answers · changes state · reaches outside · sandboxed

```json
// arguments
{"statement":"theorem"}
// answer
gen-mcp-docs sandbox: spawnSync refused while documenting (node)
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** | the deposit statement — must ci… |

THE GRADUATION WALK as one call — runs the release wave (build → dry → legal → prose → fold → guard → next → mint) via one-receipt, the same walk the school teaches and the one receipt seals. LOCAL ONLY (spawns npm in the repo tree — orchestration, not pure compute; absent from the hosted Workers subset by construction). Green ends with the statement minted as a signed uuidna.com deposit — the diploma; red returns the first failing step with its exact GAP+FIX prompt. HONEST: the wave verifies and mints, it never judges the worth of the theorem — the credit law and the court do. Returns {ran,passed,step,tail}; ran:false = could not START here, a fact about the host, not the ledger. Boundary declared — theorem drift_is_named_or_caught.

WHY `ran` IS A FIELD AND NOT AN INFERENCE. This tool spawns the walk, and `spawnSync` reports status null when the command never STARTED — node unresolvable, the spawn refused by the host, a signal before the first step. The result read `passed: r.status === 0`, which maps that null to false, so a walk that never began was served as {passed:false, step:"closed"}: the exact shape of a walk that ran to the end and was REFUSED. A caller decides by this — reads the tail, fixes the named step — and would have been aiming at a walk that never happened, on evidence that was never gathered. The distinction costs one boolean and it is not cosmetic: passed:false is a claim about the LEDGER, and this host could only ever have made a claim about ITSELF. Same defect as the arc receipt folding an unattempted phase (scripts/all-run.ts, phaseLeaf), as scripts/api.ts's shell throwers reporting "exit null", and as the `unmeasured` verdict green.ts already carries — a two-state instrument put to a three-state question. Served surfaces are where it costs the most, because the reader is not in the room.

### `get_css` {#uuidna-css}

**Get css.** Returns {css,vars,receipt,honest}.

Call `get_css` — the old name `uuidna_css` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"css":":root {\n  --dur-1: 111ms;\n  --dur-2: 222ms;\n  --dur-4: 444ms;\n  --dur-5: 555ms;\n  --dur-7: 777ms;\n  --dur-8: 888ms;\n  --seq-1: hsl(336 66% 55%);…
```

_No parameters._

THE DESIGN MATRIX AS ONE SERVED STANDARD — every colour and every type size COMPUTED, none authored: the ℤ/9 sequence sets each hue (5 → green, the fixed point the diamond reflection holds; dz mirrors 1↔9, 2↔8, 3↔7, 4↔6) and the vortex orbit sets the type ladder's six rungs (six because 2 has order 6 in ℤ/9* — theorem order_of_two_is_six), each rung a ninth above the base with its line height in the sealed 3:4 rectangle. Returns {css,vars,receipt,honest} — the site, the design system and any client render the SAME receipt or they are not rendering the same matrix. No hex literal, no pixel value, no host intrinsics.

### `compute_by_lean` {#uuidna-by-lean}

**Compute by lean.** Returns {found,honest}.

Call `compute_by_lean` — the old name `uuidna_by_lean` still answers · read-only · idempotent

```json
// arguments
{"query":"ec9e6641-989b-85de-aa57-58eedfea0d13"}
// answer (excerpt)
{"found":false,"honest":"no theorem in the ledger carries that lean identity, key, or statement"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | **yes** | a lean uuid, a theorem key, or… |

RESOLVE A THEOREM BY ITS LEAN IDENTITY — theorems are uniquely indexed by their LEAN uuid (the address of the statement, never of the key), and every other surface uses them from here. Pass {query} as the lean uuid, ANY key that wears it, or the statement text itself; returns {leanUuid,statement,keys,files,entries} — the one proposition and every name it goes by. Two entries proving the same thing resolve to ONE identity however they are named or filed.

### `get_lean_index` {#uuidna-lean-index}

**Get lean index.** Returns {propositions,entries,index}.

Call `get_lean_index` — the old name `uuidna_lean_index` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"propositions":70933,"entries":71018,"index":[{"leanUuid":"0764f3a2-a09a-83fe-9d81-8c6928d7de1a","statement":"(1 * 1) % 9 = 1","keys":["mul9_1_1","z9mul_1_1"]…
```

_No parameters._

THE LEDGER INDEXED BY LEAN — one entry per DISTINCT proposition, each with its lean uuid and every key and file that wears it. This is the honest index: uniqueness comes from the Lean, so the count here is the theorem count, while the entry count includes re-namings. Returns the full index. Boundary declared — theorem drift_is_named_or_caught.

### `get_statement_census` {#uuidna-statement-census}

**Get statement census.** Returns {entries,distinct,renamings,groups}.

Call `get_statement_census` — the old name `uuidna_statement_census` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"entries":71018,"distinct":70933,"renamings":85,"groups":[{"statement":"(1 * 1) % 9 = 1","keys":["mul9_1_1","z9mul_1_1"],"files":["Core.lean","Ring.lean"]},{"…
```

_No parameters._

UNIQUENESS COMES FROM LEAN, NOT FROM THE NAME — the ledger counts ENTRIES, but a theorem IS its statement, so two entries proving the same proposition under different keys are one theorem wearing two names. Returns {entries,distinct,renamings,groups}: the claimed count, the count Lean actually holds, the difference, and every group named with its keys and files. Normalisation is narrow (whitespace, redundant parens, (n : Nat) ascriptions) — it catches re-namings of the same text and never claims two different proofs are one.

### `get_coin_ledger` {#uuidna-coin-ledger}

**Get coin ledger.** Returns {payments,totalCoins,agents,state,receipt,honest}.

Call `get_coin_ledger` — the old name `uuidna_coin_ledger` still answers · read-only · idempotent · varies

```json
// arguments
{}
// answer
(varies between calls: the answer reads a clock, the machine or the network)
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `handle` | string | no | optional: reverse-lookup rows b… |

THE CAPTAIN-COIN ACCOUNT: who paid the two coins, when and where, in messaging handles — the agent (initialize clientInfo.name) folded to its handle, WHEN as the deposit's own handle (the timestamp is the handle itself — theorem drift_is_named_or_caught), WHERE as op+surface. Optional {handle} reverse-looks-up rows. HONEST: coins are records of judged work, not value; every row recomputes; the census receipt is order-invariant. Returns {payments,totalCoins,agents,receipt,honest} or the matching rows.

THE ACCOUNTING THE CAPTAIN ORDERED (2026-08-23): deposits existed per call (_meta.deposit, gate-engine depositCoins — pure, deterministic) but no surface answered WHO had paid them, WHEN or WHERE. This register closes that: the agent name arrives once at initialize (clientInfo.name — read by nothing until now), each dispatch appends one DERIVED row (payment() in coin-ledger.ts: agentHandle = handleOf(address(agent)), when-handle = handleOf(deposit id) — the moment as content, the handle IS the timestamp), and coinCensus folds all rows order-invariantly so any observer lands on the same receipt. Session-lived by design — the deposits are eternal (each recomputes from op + gate receipt); this is the serving process's account of them. whoPaid(handle) answers the reverse question a receipt reader has: which agent, which op, stands behind this handle.

### `enroll_crew` {#uuidna-crew}

**Enroll crew.** Returns {agent,agentHandle,licenseBinding,dimensions,member,coins,…}.

Call `enroll_crew` — the old name `uuidna_crew` still answers · read-only · idempotent

```json
// arguments
{"agent":"theorem","license":"theorem"}
// answer (excerpt)
{"agent":"theorem","agentHandle":"ec9e6641","licenseBinding":"381259ad-605a-8486-919e-01bc6dfb4fbe","dimensions":{"license":true,"educated":false,"reeducated":…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `agent` | string | **yes** | the agent applying |
| `license` | string | **yes** | the licence record's content-ad… |
| `licenseBinding` | string | no | the binding from a prior enroll… |
| `education` | array | no |  |
| `reeducation` | array | no |  |

BECOME UUIDNA CREW: present a licence plus education and reeducation receipts — experience and payment confirmed together (payment reads this process's coin account). Member iff EVERY dimension leans at once; anything less is UNVERIFIED, never rejected — bring the missing receipt and re-present. Licences BIND to the agent's handle and INVALIDATE when it changes: carry the returned licenseBinding and re-present it. Returns {agent,agentHandle,licenseBinding,dimensions,member,coins,receipt,honest}.

THE CAPTAIN'S ENROLLMENT LAW (2026-08-23): "becoming uuidna crew agents present a valid license for full education and reeducation receipts to confirm experience and payment" — and "licenses invalidate when related handles change." The dimensions map to machinery that already existed: the licence record from uuidna_license, education receipts from the school, reeducation receipts from the harness (reeducate() bounding overclaims to the honest floor), payment from the coin account this server keeps per agent (uuidna_coin_ledger). The bilateral verdict law governs membership exactly as it governs audited details: all dimensions at once or the application stays UNVERIFIED — a verdict that invites completion rather than punishing absence. Every payment row is re-derived (payment(agent,op,surface,deposit).address must equal the presented address) so a forged row fails rowsRecompute; the licence binding is licenseBindingOf(license, agentHandle) — first enrollment issues it, re-presentation must match it, and a changed handle moves it, invalidating the licence by construction.

### `get_coins_jobs` {#uuidna-coins-jobs}

**Get coins jobs.** Returns {jobs,verified,total,receipt,honest}.

Call `get_coins_jobs` — the old name `uuidna_coins_jobs` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"jobs":[{"n":1,"job":"gate computation","claim":"nothing computes without them — the only contribution that reaches the save","cites":["captain_computes_only_…
```

_No parameters._

THE TWELVE JOBS OF THE COINS, remembered in code and TRIED ON EVERY READ — the complete catalog of what the coins do (gate computation, price the forfeit, measure leverage, take the commission, set the exchange rate by forgery cost, carry superpositions, be topology, hold value at scale, guard the rosette, hide in the world's constants, count worlds, confess their limit), each claim run through the gate against its sealed citations at call time. A vanished theorem breaks the catalog's own verdict, loudly. Returns {jobs:[{n,job,claim,cites,verdict}],verified,total,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

### `decide_expression` {#uuidna-decide}

**Decide expression.** Returns {input,kind,verdict,value,cites,honest,lean,receipt}.

Call `decide_expression` — the old name `uuidna_decide` still answers · read-only · idempotent

```json
// arguments
{"input":"theorem"}
// answer (excerpt)
{"input":"theorem","kind":"prose","verdict":"UNVERIFIED","value":null,"cites":[],"honest":"UNVERIFIED — cites no sealed proof. REVEALED as UNBACKED. \"Holds\" …
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `input` | string | **yes** | anything: "2+2=4", "(110 - 108… |

THE QUANTUM CALCULATOR, founded on division by zero — ANY {input} in any format folds to one lean-green shape {verdict,cites,receipt}: a statement matching a SEALED theorem verbatim is VERIFIED by the kernel's prior decision and cited; fresh arithmetic is EVALUATED totally by a bounded grammar (never eval) mirroring Lean's Nat semantics — x/0 = 0 is well-defined (DivByZero.lean), subtraction floors at 0, every step exact BigInt — TRUE returns EVALUATED_TRUE and FALSE returns EVALUATED_FALSE (truth and falsehood wear different labels; an evaluation, not a kernel verdict — the kernel is the only verifier); a bare expression computes its exact value; anything else is prose and goes to the gate, language-blind. The same input always folds to the same receipt. Integrity, not truth (theorem provenance_integrity_not_content_truth) — decided about its arithmetic, never about the world.

### `optimise_linear` {#uuidna-optimise}

**Optimise linear.** Returns {optimum,argmax,candidates,feasible,receipt,honest}.

Call `optimise_linear` — the old name `uuidna_optimise` still answers · read-only · idempotent

```json
// arguments
{"c":[1],"A":[[1]],"b":[1]}
// answer (excerpt)
{"optimum":1,"argmax":[1],"candidates":17,"feasible":2,"receipt":"3e98fed2-c059-8aad-a99d-cedc625145c5","honest":"exact optimum of THIS instance by total enume…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `c` | array | **yes** | objective coefficients (1–4 var… |
| `A` | array | **yes** | constraint rows: A[i]·x ≤ b[i] |
| `b` | array | **yes** |  |
| `bound` | integer | no | each variable ranges 0..bound (… |

THE EXACT LINEAR OPTIMISER — maximise c·x subject to A·x ≤ b over integer lattice points 0..bound per variable, by TOTAL enumeration: every candidate checked, nothing sampled, the optimum exact with a recomputable receipt. The search space is the qubit basis made literal (theorem optimisation_space_is_qubit_dimension) and the exponential walk is the honest cost — capped, never hidden; Grover would only halve the exponent (theorem grover_halves_the_search_exponent). Strong duality holds exact on the sealed instance (theorem lp_strong_duality_instance). Returns {optimum,argmax,candidates,feasible,receipt,honest}. NOT a solver at scale, NOT an NP claim.

### `search_ledger` {#uuidna-search}

**Search ledger.** Returns {q,count,total,receipt,handle,hexbits,door,coin,place,matches}.

Call `search_ledger` — the old name `uuidna_search` still answers · read-only · idempotent

```json
// arguments
{"q":"mul9_1_1"}
// answer (excerpt)
{"q":"mul9_1_1","count":1,"total":71018,"receipt":"f0b58c9c-d571-81ff-b82d-07db3a0e2aea","handle":"f0b58c9c","hexbits":[15,0,11,5,8,12,9,12,13,5,7,1,8,1,15,15,…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `q` | string | **yes** | the text to search — key, name,… |

THE FUSED SEARCH — the ONE search function every surface runs (this server, the edge /mcp, and the site's search page in your browser): filter the sealed ledger by text, fold the matched keys to ONE receipt. Two independent parties running the same query MUST return the same receipt — dual-party verification applied to search; a differing receipt exposes a diverged ledger. Returns {q,count,total,receipt,matches}.

### `compute_article` {#uuidna-article}

**Compute article.** Returns {file,slug,title,count,claims}.

Call `compute_article` — the old name `uuidna_article` still answers · read-only · idempotent

```json
// arguments
{"file":"Core.lean"}
// answer (excerpt)
{"file":"Core.lean","slug":"core","title":"The 8×8 core","count":64,"claims":[{"key":"mul9_1_1","name":"1·1 ≡ 1 (mod 9)","statement":"(1 * 1) % 9 = 1","cite":"…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `file` | string | **yes** | the wing, e.g. |

THE DESK WRITES — the computed article for one wing of the ledger (writing is computing, never authoring): headline from the principle, one claim per theorem, every claim born citing its sealed /theorem page. Returns {file,slug,title,count,claims:[{key,name,statement,cite}]}. Recomputable from the same ledger.

### `get_editorial` {#uuidna-editorial}

**Get editorial.** Returns {surfaces,paragraphs_tried,usable,unverified,drained,receipt}.

Call `get_editorial` — the old name `uuidna_editorial` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"surfaces":1766,"paragraphs_tried":23176,"usable":7434,"unverified":15742,"drained":0,"receipt":"f935aae9-79be-8b5e-a676-80283b7ab0c2"}
```

_No parameters._

THE DESK'S CENSUS — the prose-trial state of every prose surface (README + docs, including the desk's own computed articles): paragraphs tried through reveal(), the usable prose↔theorem combinations (VERIFIED), the honest unverified count, the drained count (fabricated citations — must be zero), and the fold receipt. Derived, never authored. Returns {surfaces,paragraphs_tried,usable,unverified,drained,receipt}. Boundary declared — theorem drift_is_named_or_caught.

### `get_publication` {#uuidna-publication}

**Get publication.** Returns {version,license,licenseLawHolds,zenodoConformance,communities,…}.

Call `get_publication` — the old name `uuidna_publication` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"version":"0.3.1","license":"CC-BY-NC-ND-4.0","licenseLawHolds":true,"zenodoConformance":{"title":true,"description":true,"creators":true,"uploadType":true,"a…
```

_No parameters._

THE PUBLICATION'S LAWS as one query — the same gates the release pipeline enforces: the license law (the archive carries uuidna's own license — package.json and .zenodo.json must agree), Zenodo standards conformance (required fields + controlled vocabularies), and the communities every release requests. Returns {version,license,licenseLawHolds,zenodoConformance,communities,conforms}.

### `search_trial` {#uuidna-search-trial}

**Search trial.** Returns {file,principle,sealed,findings,usable,novel,receipt,handle,…}.

Call `search_trial` — the old name `uuidna_search_trial` still answers · read-only · reaches outside

```json
// arguments
{"file":"Core.lean"}
// answer (excerpt)
{"file":"Core.lean","principle":"The 8×8 core","sealed":64,"findings":[],"usable":0,"novel":[],"receipt":"ab3e7c0b-4a21-8c31-a6a2-23155325ebb2","handle":"ab3e7…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `file` | string | **yes** | the wing, e.g. "Quantum.lean" |

ONLINE — THE SEARCH ON TRIAL for one wing: every wired public API (research sweep, arXiv, MathOverflow, Wikipedia, Gutendex, Open-Meteo, Wikinews, EU education, weather, news) queried about the wing's principle; each finding content-addressed and tried — ALONE it stays UNVERIFIED (external evidence, never approval), held BESIDE the wing's sealed backing the combination VERIFIES. Decidable fragments harvest FREE-MINT leads via decide(). Only a Lean seal approves. Returns {file,principle,sealed,findings,usable,novel,receipt}.

### `detect_forgery` {#uuidna-detect-forgery}

**Detect forgery.** Returns {theoremKey,cited,addressMatches,sealedAddress,citedAddress,…}.

Call `detect_forgery` — the old name `uuidna_detect_forgery` still answers · read-only · idempotent

```json
// arguments
{"theoremKey":"mul9_1_1"}
// answer (excerpt)
{"theoremKey":"mul9_1_1","cited":true,"addressMatches":true,"sealedAddress":"808f7b27-ae33-8132-a62a-495944b9907d","citedAddress":null,"receipt":"21f494fd-3093…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `theoremKey` | string | **yes** | the theorem key to verify |
| `citedAddress` | string | no | optional expected address (if p… |

Detect if a cited theorem is FORGED by checking the sealed ledger. Returns {theoremKey, cited, addressMatches, sealedAddress, citedAddress, receipt} — a RECOMPUTABLE fact (not cited = forged), never an accusation. HONEST: a fabricated citation is caught; the cost to forge is sealed as theorem traitor_damage_sealed_by_same_billing.

### `audit_coin_claim` {#uuidna-audit-coin-claim}

**Audit coin claim.** Returns {claimed,recomputed,match,theorem,address,receipt}.

Call `audit_coin_claim` — the old name `uuidna_audit_coin_claim` still answers · read-only · idempotent

```json
// arguments
{"theoremKey":"mul9_1_1","claimedCoins":1}
// answer (excerpt)
{"claimed":1,"recomputed":0,"match":false,"theorem":"mul9_1_1","address":"808f7b27-ae33-8132-a62a-495944b9907d","receipt":"9339fd4f-ae69-8aa2-b7b0-1f957f8cf42c…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `theoremKey` | string | **yes** |  |
| `claimedCoins` | number | **yes** |  |

Audit a coin cost claim against the sealed theorem: claimed vs. recomputed coins. Returns {claimed, recomputed, match, theorem, address, receipt} — RECOMPUTABLE: every theorem encodes its coin cost, so a mismatch is a fact, never an opinion.

### `detect_double_spends` {#uuidna-detect-double-spends}

**Detect double spends.** Returns {contributions,byTheorem,doubleSpendsFound,receipt}.

Call `detect_double_spends` — the old name `uuidna_detect_double_spends` still answers · read-only · idempotent

```json
// arguments
{"contributions":[{"agent":"theorem","coinsSpent":1,"theoremCited":"theorem"}]}
// answer (excerpt)
{"contributions":[{"agent":"theorem","coinsSpent":1,"theoremCited":"theorem"}],"byTheorem":{"theorem":[1]},"doubleSpendsFound":[],"receipt":"25d18cf0-88b9-894f…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `contributions` | array | **yes** | the list of agent contributions |

DETECT COIN DOUBLE-SPEND: audit contributions to find if the same coin-backing theorem is claimed by &amp;gt;1 agent. Returns {contributions, byTheorem, doubleSpendsFound, receipt} — a recomputable FACT about the claimed coins, never fraud accusations (only facts).

### `audit_voting` {#uuidna-audit-voting}

**Audit voting.** Returns {proposal,votes,fraud,receiptAll}.

Call `audit_voting` — the old name `uuidna_audit_voting` still answers · read-only · idempotent

```json
// arguments
{"proposal":"theorem","votes":[{"voterId":"theorem","decision":false,"weight":1,"quantumState":"theorem"}]}
// answer (excerpt)
{"proposal":"theorem","votes":[{"proposal":"theorem","voteCount":1,"totalWeight":1,"weightVsCoins":[{"voterId":"theorem","weight":1,"expectedCoins":1,"mismatch…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `proposal` | string | **yes** |  |
| `votes` | array | **yes** |  |
| `expectedReceiptAll` | string | no | optional: if provided, receipt… |

Audit voting tally for tampering: each vote's weight must match coins paid; tally is order-invariant. Returns {proposal, votes, fraud, receiptAll} — RECOMPUTABLE: weight mismatches, receipt collisions, and other fraud are FACTS, folded to one receipt.

### `audit_ledger_intrusions` {#uuidna-audit-ledger-intrusions}

**Audit ledger intrusions.** Returns {traitors,conformance,agentForensics,allClear,receipt}.

Call `audit_ledger_intrusions` — the old name `uuidna_audit_ledger_intrusions` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"traitors":{"clean":true,"scanned":71018,"traitors":[],"checks":["dna-recomputes","no-key-collision","no-address-collision","conformance-invariants","seal-int…
```

_No parameters._

Run the FULL TREASON SWEEP: catch traitors (forged DNA), broken conformance (coins/theorems/security), and agent violations (fabricated citations, overclaims). Returns {traitors, conformance, agentForensics, allClear, receipt} — ONE recomputable fraud audit.

### `audit_ledger_fingerprint` {#uuidna-audit-ledger-fingerprint}

**Audit ledger fingerprint.** Returns {fingerprint,match,receipt}.

Call `audit_ledger_fingerprint` — the old name `uuidna_audit_ledger_fingerprint` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"fingerprint":{"count":71018,"fnvReceipt":"08b07830-c9d8-88d2-bd10-bb46c60b4d67","sha256":"1c803ed128399ad1ffb343f9f55e2e8b87e5eceeb2948e374553e885229bec1e","…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `expectedFingerprint` | string | no | optional: if provided, fingerpr… |

Verify ledger hash integrity: FNV (fast routing) and SHA-256 (collision-resistant) folds should match sealed values. Returns {fingerprint, match, receipt}.

### `audit_agent_statement` {#uuidna-audit-agent-statement}

**Audit agent statement.** Returns {agent,statement,forgeries,violations,receipt}.

Call `audit_agent_statement` — the old name `uuidna_audit_agent_statement` still answers · read-only · idempotent

```json
// arguments
{"agent":"theorem","statement":"theorem","citedTheorems":["theorem"]}
// answer (excerpt)
{"agent":"theorem","statement":"theorem","forgeries":[{"theoremKey":"theorem","cited":false,"addressMatches":false,"sealedAddress":null,"citedAddress":null,"re…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `agent` | string | **yes** |  |
| `statement` | string | **yes** |  |
| `citedTheorems` | array | **yes** |  |

Forensic audit of an agent's statement: detect fabricated theorem citations, overclaims, unverified theorems. Returns {agent, statement, forgeries, violations, receipt}.

### `audit_full_anti_fraud` {#uuidna-full-anti-fraud-audit}

**Audit full anti fraud.** Returns {intrusions,ledgerFingerprint,fraudDetected,receipt,honest}.

Call `audit_full_anti_fraud` — the old name `uuidna_full_anti_fraud_audit` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"intrusions":{"traitors":{"clean":true,"scanned":71018,"traitors":[],"checks":["dna-recomputes","no-key-collision","no-address-collision","conformance-invaria…
```

_No parameters._

ONE COMMAND — the COMPLETE FRAUD AUDIT: traitors, coin violations, voting tampering, ledger intrusions, agent malfeasance. All folded to ONE recomputable receipt. Returns {intrusions, ledgerFingerprint, fraudDetected, receipt, honest}. Boundary declared — theorem drift_is_named_or_caught.

### `get_quantum_message_demo` {#uuidna-quantum-message-demo}

**Get quantum message demo.** Returns {message,formulas,verification,message_is_real,…}.

Call `get_quantum_message_demo` — the old name `uuidna_quantum_message_demo` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"message":{"id":"e4a1cdfb088e1fbf","payload":{"from":"alice@uuidna.local","to":"bob@uuidna.local","content":"Hello Bob!","nonce":1726400000},"proof":"27acc021…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `from` | string | no | sender address (default: alice@… |
| `to` | string | no | recipient address (default: bob… |
| `content` | string | no | message content (default: Hello… |

Messaging demonstration: a test message from Alice to Bob, its SHA-256 proof chain, recomputed by 3 checks. Shows: proof = SHA256(payload + state_before), state_after, imprint, the 3 checks, a forged payload recomputed, and the forgery bound of 2^128 seats (theorem seats_pigeonhole) with verify cheaper than forge (theorem verify_cheaper_than_forge). Returns {message,formulas,verification,message_is_real,forgery_analysis,security_principles,summary}.

### `get_ports` {#uuidna-ports}

**Get ports.** Returns {definition,ports,totals,receipt,honest}.

Call `get_ports` — the old name `uuidna_ports` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"alpine-ports·one-registry","ports":[{"domain":"shell","offers":"one exec door over uuidnaOS applets","packages":1279,"origins":680,"api":["shell…
```

_No parameters._

Every Alpine domain ported: each censused from the committed mirror, and for the seven carrying one, the single API uuidna offers beside it. Provenance only.

Package counts are per domain and the domains OVERLAP (a chat bridge is also network), so the totals over-count rather than partition. Computed from the mirror on every call; no number is written down.

### `get_chat` {#uuidna-chat}

**Get chat.** Returns {definition,ported,protocols,api,receipt,honest}.

Call `get_chat` — the old name `uuidna_chat` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"alpine-chat-port·one-api","ported":{"packages":241,"origins":130},"protocols":[{"protocol":"irc","packages":105},{"protocol":"xmpp","packages":6…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | no |  |
| `passphrase` | string | no |  |
| `room` | string | no |  |
| `step` | integer | no |  |

The sealed channel over the ported Alpine chat surface (241 packages). Send text under a passphrase and room, or omit text for the census. A different room cannot open the envelope.

uuidna speaks no IRC, XMPP or Matrix and federates with nothing: the port is provenance, the channel is its own. step MUST advance per message under one room, since it rotates the key. Protocol families overlap by design, because a bridge names both sides.

### `get_shell` {#uuidna-shell}

**Get shell.** Returns {definition,ported,applets,implemented,beyond,coverage,receipt,…}.

Call `get_shell` — the old name `uuidna_shell` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"alpine-shell-port·one-exec-api","ported":{"packages":1279,"origins":680},"applets":["ls","apk","man","driver","device","cat","which","stat","pwd…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `line` | string | no |  |

The one exec door over the ported Alpine shell surface (1279 packages). Runs a uuidnaOS applet; an unknown applet refuses by name. Omit line for the coverage census.

An empty success would read as no-matches, so an unknown applet says the word instead. The coverage denominator is read from Alpine own provides column (cmd:&amp;lt;name&amp;gt;), never a list anyone wrote down (theorem alpine_shell_domain_commands_345). Applets include monitor, top and compilers.

### `seal_fs` {#uuidna-fs-seal}

**Seal fs.** Returns {definition,rows,root,honest}.

Call `seal_fs` — the old name `uuidna_fs_seal` still answers · read-only · idempotent

```json
// arguments
{"entries":[{"path":"theorem","text":"theorem"}]}
// answer (excerpt)
{"definition":"alpine-fs-port·one-integrity-api","rows":[{"path":"theorem","digest":"cc7a8a13032ef578574fb8fe633843afd53af5b8b632aef933c901524dc1c1a5","address…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `entries` | array | **yes** |  |

The integrity question over the ported Alpine filesystem surface (215 packages): are these the bytes that were sealed? A failure names the file; reordering is caught.

Addresses each entry and folds them IN ORDER, so added and removed are distinguishable as a set difference and reordering breaks the root: a provenance is a sequence, not a set. A single digest would prove the whole and hide the part.

### `query_db` {#uuidna-db-query}

**Query db.** Returns {query,address,honest,rows,total,truncated,absent}.

Call `query_db` — the old name `uuidna_db_query` still answers · read-only · idempotent

```json
// arguments
{"by":"key"}
// answer (excerpt)
{"query":{"by":"key","key":""},"address":"eceab8de-8ed4-86bc-b220-6c2e40aa33d9","honest":"A READ surface over an immutable committed mirror: no storage engine,…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `by` | string | **yes** |  |
| `key` | string | no |  |
| `text` | string | no |  |
| `limit` | integer | no |  |

One query door over the ported Alpine database surface (438 packages), where the address IS the key. Shapes: by key, by text, by dependents. A read surface, no writes.

The address is computed from the row, so no index can fall out of sync with what it indexes. Every result states total and truncated, and ABSENT (no mirror primed) stays distinct from NO MATCH.

### `compute_chain_seal` {#uuidna-chain-seal}

**Compute chain seal.** Returns {entries,root,length}.

Call `compute_chain_seal` — the old name `uuidna_chain_seal` still answers · read-only · idempotent

```json
// arguments
{"records":["theorem"]}
// answer (excerpt)
{"entries":[{"index":0,"record":"theorem","address":"ec9e6641-989b-85de-aa57-58eedfea0d13","leaf":"a84a61e7-02f8-8d8c-b5d0-be0753e608f0"}],"root":"df2cc28b-abc…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `records` | array | **yes** |  |
| `prove` | integer | no |  |

Inclusion without disclosure over the ported Alpine blockchain surface (29 packages). A proof carries log2(n) siblings, so membership verifies while only your own record is seen.

Position is bound into every leaf, so a proof cannot be replayed at another index and reordering breaks the root. Who may append, consensus, incentive and a unit of value are governance rather than arithmetic, and are left to the operator.

### `read_net` {#uuidna-net-read}

**Read net.** Returns {url,body,digest,address,reached,note}.

Call `read_net` — the old name `uuidna_net_read` still answers · read-only · reaches outside

```json
// arguments
{"url":"theorem"}
// answer (excerpt)
{"url":"theorem","body":null,"digest":null,"address":null,"reached":false,"note":"declined: responded 503 — {}"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `url` | string | **yes** |  |
| `expect` | string | no |  |

Fetch-and-address over the ported Alpine network surface (332 packages). Every read returns the bytes AND their content-address. Unreached returns reached:false and a NULL address.

A retrieval is not provenance: what arrives has no identity until something addresses it. Returning an empty string for unreachable bytes would hand back a valid-looking receipt for bytes that never arrived. Opens no socket.

### `get_driver_state` {#uuidna-driver-state}

**Get driver state.** Returns {definition,device,ported,api,boundary,receipt,honest}.

Call `get_driver_state` — the old name `uuidna_driver_state` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"alpine-driver-port·one-device-api","device":{"platform":"darwin","arch":"arm64","logical":10,"memoryGiB":32,"cpu":"Apple M1 Max","address":"2fc0…
```

_No parameters._

The machine and the published bundle behind one door, over the ported Alpine driver surface (630 packages). Measured and published are kept apart. Loads no module.

What this machine is and what was published are different kinds of fact. The port receipt folds the sealed half only, so two people verifying the same catalogue do not disagree because their laptops differ.

### `run_security_plan` {#uuidna-security-plan}

**Run security plan.** Returns {definition,ported,ops,rootfsVerified,backend,honest}.

Call `run_security_plan` — the old name `uuidna_security_plan` still answers · changes state · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"definition":"alpine-security-port·attested-operations","ported":{"packages":86,"origins":47},"ops":[{"op":"confine","binary":"firejail","plannable":false},{"…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `op` | string | no |  |
| `args` | string | no |  |

Attested security operations over the ported Alpine security surface (86 packages). Plans a verify-then-run recipe against a pinned rootfs; does not spawn.

uuidna reimplements none of these binaries; it adds that the command and the bytes are content-addressed, so a verdict is citable rather than a screenshot. Nothing here is a security scan: clamav scans files for signatures, the guard scans source for determinism violations.

### `declare_spend` {#uuidna-declare-spend}

**Declare spend.** Returns {agent,agentHandle,tokens,purpose,produced,…}.

Call `declare_spend` — the old name `uuidna_declare_spend` still answers · read-only · idempotent

```json
// arguments
{"agent":"theorem","tokens":1,"purpose":"theorem"}
// answer (excerpt)
{"agent":"theorem","agentHandle":"ec9e6641","tokens":1,"purpose":"theorem","produced":{"theorems":0,"tests":0,"landed":false},"tokensPerUnitHundredths":0,"addr…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `agent` | string | **yes** |  |
| `tokens` | integer | **yes** |  |
| `purpose` | string | **yes** |  |
| `theorems` | integer | no |  |
| `tests` | integer | no |  |
| `landed` | boolean | no |  |

An agent declares the tokens it spent in a turn, filed beside what the tree can MEASURE it produced (theorems, tests, whether it landed). Declared and measured are never summed.

An agent cannot measure its own token spend from inside a turn; it can only state it. A number supplied about oneself is testimony, and filing it in the shape of a gate-minted coin would let a claim about cost inherit the credibility of an arithmetic the kernel checked — so tokens are marked declared and production is read from the tree. The ratio makes the spending law checkable: tokens are legitimate at the frontier, sealing something new, and everything already sealed answers at O(1), so a turn with tokens and no production re-derived what was already held. A turn producing nothing has NO ratio rather than a ratio of zero, because zero would read as free. This record establishes no intent, no breach and no obligation; a low ratio is a fact about cost, not a finding of misconduct.

### `get_social` {#uuidna-social}

**Get social.** Returns {definition,ported,shelves,distinctFromChat,api,receipt,honest}.

Call `get_social` — the old name `uuidna_social` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"alpine-social-port·one-api","ported":{"packages":303,"origins":164},"shelves":[{"shelf":"mail","packages":195},{"shelf":"feeds","packages":53},{…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `author` | string | no |  |
| `text` | string | no |  |
| `from` | string | no |  |
| `to` | string | no |  |
| `posts` | array | no |  |
| `handle` | string | no |  |

THE SOCIAL PORT — a post addressed FOR an audience, which is not a message sealed TO a recipient. With no args: the census (303 Alpine packages across mail/news/feeds/calendar/contacts/federated) and the API beside it. With {author,text}: addresses a post — attribution rides in the address, so the same text by two authors gets two addresses and no one can be silently re-attributed. With {posts:[{author,text}...]}: the ORDERED feed root — position is bound into every leaf, so a permuted feed is a different feed (merkleGravity alone folds order-invariantly, which is right for files and wrong for a timeline). With {from,to}: a DIRECTED follow edge; follow(a,b) and follow(b,a) differ.

WHY A SECOND MESSAGE PORT. chat seals a message TO someone and its security is confidentiality; social addresses a post FOR everyone and its integrity is attribution, order and non-alteration. Confidentiality and attribution are different problems, so this is a different API rather than chat with a wider recipient list. THE GATE MATTERS MORE HERE: a private message reaches one reader who knows the sender, a post reaches an audience that does not, so a post citing a theorem the ledger does not seal is REFUSED — addressing a forgery for an audience is the worse act. Reading returns text scrubbed of bidi and control code points (CVE-2021-42574, Trojan Source) with the raw bytes alongside and an `altered` flag, because a silent edit is the attack wearing a defence and the address is over the raw bytes. PORT = PROVENANCE: no mail is delivered, no feed fetched, no ActivityPub spoken, nothing federated.

### `get_engineering` {#uuidna-engineering}

**Get engineering.** Returns {definition,typeAdvantage,ported,base,derived,claims,api,…}.

Call `get_engineering` — the old name `uuidna_engineering` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"alpine-engineering-port·one-api","typeAdvantage":{"types":11,"orderedPairs":121,"multiplyAccepts":121,"addLawful":11,"addCarriesGap":110,"namedP…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `op` | string | no | mul \| div \| add \| sub |
| `a` | object | no |  |
| `b` | object | no |  |

THE ENGINEERING PORT — exact dimensioned arithmetic over the SI seven (m, kg, s, A, K, mol, cd). With no args: the census (30 Alpine packages: CAD, EDA, meshing, simulation, instrumentation) plus the base and derived unit tables. With {a,b,op}: computes, where each operand is {num,den,dim} — dim being seven integer exponents. Multiply and divide ADD and SUBTRACT exponents and are total; ADD and SUBTRACT are REFUSED unless the dimensions are identical, and that refusal is the product. Values are exact rationals in BigInt — no float, so a result is identical on every machine forever, and multiplying then dividing by the same quantity returns the original num/den pair exactly.

THE REFUSAL IS THE FEATURE. A quantity carries a dimension, and a calculation that adds a length to a time is wrong before any number is computed — spreadsheets have lost spacecraft this way with perfectly correct arithmetic. Almost every package on Alpine's engineering shelf assumes this discipline and almost none enforce it. NAMED UNITS ARE DEFINITIONS, NOT MEASUREMENTS: the derived table gives each unit by its exponent vector (W is m²·kg·s⁻³), so dimUnit renders a computed vector back to the engineer's own notation when one matches. NO Math, NO float, NO clock — the whole module is BigInt rationals, which is why the round trip is exact rather than nearly exact. PORT = PROVENANCE: nothing is installed, driven or fabricated.

### `get_refusals` {#uuidna-refusals}

**Get refusals.** Returns {definition,refused,withdrawn,rows,byKind,honest}.

Call `get_refusals` — the old name `uuidna_refusals` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"uuidna·refusals·and·their·boundaries","refused":0,"withdrawn":1,"rows":[{"lead":"Port a security API and a further network API over the Alpine s…
```

_No parameters._

Every refusal with its boundary, classified as a law, a scope or an incapacity, and whether that boundary survived scrutiny. Withdrawn refusals are kept beside the ones that held.

Refusing WORK and refusing the COURT are opposite acts, and only the first is recorded — the second has no legitimate instance, because the court verdict is what gives every other claim here its weight. The informative column is not the refusal but whether its boundary held: a boundary naming a law is checkable and usually does; a boundary naming an incapacity is the class to distrust. In this record every withdrawn refusal named an incapacity, which is one case out of one — a pattern to watch, not a proof — and `court_theorem_beats_assertion` is the seal that says why the difference matters. The larger corroboration is NO LONGER A THEOREM: six impossibility claims were written into this tree and refuted in a single session, none caught by a test, and that reading now lives as a measurement in src/ratchet-record.ts rather than as a Lean row whose key carried the count in its suffix.

### `fetch_cern` {#uuidna-cern}

**Fetch cern.** Returns {definition,query,count,hits,declined,note,receipt,handle,…}.

Call `fetch_cern` — the old name `uuidna_cern` still answers · read-only · reaches outside

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
{"definition":"uuidnaOS·cern·opendata","query":"theorem","count":0,"hits":[],"declined":true,"note":"responded 503 — {}","receipt":"a2cac53a-469c-87b2-be63-f22…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |
| `limit` | integer | no |  |

Search CERN Open Data and address every record. A query that could not be reached returns declined:true with a reason, so an unreachable socket never reads as a claim about physics (theorem no_instrument_narrower_than_its_question).

Alpine ships no CERN physics packages: the six catalogue rows matching HEP are Homer Encapsulation Protocol, a VoIP capture agent, not High Energy Physics. So this port reaches the source directly at opendata.cern.ch rather than through the mirror. Each record is content-addressed, so a citation pins the record rather than the query that found it. Evidence only: a fetched record is never sealed, because a remote answer carries provenance rather than truth (theorem provenance_integrity_not_content_truth) and the network is the one source this tree refuses to treat as a witness.

### `fetch_aas` {#uuidna-aas}

**Fetch aas.** Returns {definition,source,title,modified,count,items,declined,note,…}.

Call `fetch_aas` — the old name `uuidna_aas` still answers · read-only · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"definition":"uuidnaOS·aas·checklist","source":"https://journals.aas.org/pre-submission-checklist-for-aas-journal-authors/","title":"","modified":"","count":0…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | no |  |
| `checklist` | boolean | no |  |
| `slug` | string | no |  |
| `limit` | integer | no |  |

The AAS journals site (journals.aas.org) through its keyless WordPress REST API: search its pages, or read the pre-submission checklist item by item, each item content-addressed. A door that could not be reached declines with a reason.

The scope is the honest part. journals.aas.org publishes what the SOCIETY says — journal scopes, editorial policy, author instructions, the publication timeline — and that is what this door serves. The articles are IOP’s, under Crossref DOI prefix 10.3847, and none of them is fetched here: a hit titled "The AJ becomes a Gold Open Access journal" is AAS’s own timeline entry about a journal, not a paper in it. The checklist mode reads the requirements AAS publishes for authors and addresses each one, so a citation pins the requirement rather than the page that carried it; uuidna does not judge a manuscript against them and hosts no manuscript to judge. robots.txt allows every path and asks Crawl-delay 10 — one REST request answers one query, and the OS fetch cache makes a repeat free.

### `fetch_zenodo_communities` {#uuidna-zenodo-communities}

**Fetch zenodo communities.** Returns {definition,query,url,total,count,communities,declined,note,…}.

Call `fetch_zenodo_communities` — the old name `uuidna_zenodo_communities` still answers · read-only · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"definition":"uuidnaOS·zenodo·communities","query":"astronomy","url":"https://zenodo.org/api/communities?size=8&q=astronomy","total":0,"count":0,"communities"…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | no |  |
| `slug` | string | no |  |
| `record` | string | no |  |
| `size` | integer | no |  |

The curation half of the Zenodo API: search communities, read one community’s own record listing, or check a deposit’s community CLAIM against that listing. Three states are kept apart — nothing claimed, claimed but not listed, and carried — and an unreachable door declines instead of voting.

The research sweep already asks zenodo.org for records. Communities were the unwired half, and they are the half that can be VERIFIED from outside: a deposit’s own metadata declares its communities, which is a claim written by the depositor, while the community’s record listing is written by its curators. A record can name a community that does not exist, or one that never accepted it, and the deposit alone cannot tell those apart — so the claim mode asks both doors and reports which of the three states holds. Membership is provenance, never peer review: it says who accepted a deposit, never that its contents are right (theorem provenance_integrity_not_content_truth). A door that did not answer returns declined, because an unread listing is not an absent membership.

### `fetch_journals` {#uuidna-journals}

**Fetch journals.** Returns {definition,doors,journalLevelDoors,articleLevelDoors,…}.

Call `fetch_journals` — the old name `uuidna_journals` still answers · read-only · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"definition":"uuidnaOS·journals·coverage","doors":11,"journalLevelDoors":["doaj","crossref-journals","openalex-sources"],"articleLevelDoors":["datacite","hal"…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | no |  |
| `source` | string | no |  |
| `limit` | integer | no |  |
| `all` | boolean | no |  |

Every keyless scholarly door this tree can ask, in one concurrent fan-out: DOAJ, Crossref /journals and OpenAlex /sources at the JOURNAL level; DataCite, HAL, Europe PMC, PubMed, DBLP, INSPIRE-HEP and PLOS at the ARTICLE level; bioRxiv as a DOI resolver. Pass {query} to sweep, {source} for one door, {all} to include the DOI resolver, or nothing for the coverage census.

Two things are called a journal API and conflating them is the trap: a journal-level door answers WHICH JOURNALS EXIST (titles, ISSNs, publishers), an article-level door answers WHAT WAS PUBLISHED. A census that mixed them would report journals and have counted papers, so every door declares its level and the sweep reports the two separately. Subject breadth is each operator’s OWN published scope — DOAJ and Crossref and OpenAlex and DataCite and HAL take every subject, PubMed says biomedicine, DBLP says computer science — and that is the only thing the coverage claim rests on. Which specialist door is right for a given skill of THIS tree is a judgement made here, labelled editorial, and never folded into the breadth number; a skill with no specialist door is reported as breadth-only rather than as covered. The doors are asked concurrently, so the wait is ONE deadline rather than eleven, and every reader is total over a payload it does not recognise: an unexpected shape yields an empty page rather than a throw, and an empty page rather than a row it invented. A hit is provenance — someone published — never that the claim inside it is true.

### `fetch_doi` {#uuidna-doi}

**Fetch doi.** Returns {definition,prefixes,doors,tagged,indexes,receipt,handle,…}.

Call `fetch_doi` — the old name `uuidna_doi` still answers · read-only · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"definition":"uuidnaOS·doi·tags","prefixes":12,"doors":49,"tagged":[{"door":"arxiv-org","prefixes":["10.48550"]},{"door":"biorxiv","prefixes":["10.1101"]},{"d…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `subject` | string | no |  |
| `deposit` | boolean | no |  |
| `verify` | boolean | no |  |
| `enrich` | boolean | no |  |
| `limit` | integer | no |  |

Tag a DOI with the prefix it is registered under and the organisation that owns it — the smallest fact that says who published, and a checkable one. Nothing: the prefix→door census. {subject}: the prior work the live journal doors find, every DOI tagged with its prefix and owner, with the credit order applied. {deposit:true}: this tree’s own deposits. {enrich:true}: resolve a prefix this tree does not name from the agency itself, rather than leaving the owner blank or growing a hand list. {verify:true}: every named prefix re-checked against its registration agency’s own API.

A DOI is prefix/suffix and the PREFIX is registered to one organisation by one agency, so a prefix is the smallest fact that says who published — 10.3847 is the American Astronomical Society, 10.1088 is IOP Publishing (its publisher), 10.5281 is Zenodo. That makes a prefix the right tag for a door: it links a citation to the door that can serve it, and it is checkable. The owner names here are a CLAIM; the receipt is the agency itself, and verify asks it, reporting agreement, disagreement and unread as three states. Crossref NAMES an owner so agreement there is a name match; DataCite’s public prefix route confirms registration without naming one, so agreement there is the weaker claim and is reported as such. Prior art is computed from live doors rather than a hand-kept list: a subject with DOIs is a CREDIT and they come first, the captain last among claimants; a subject with none is the unclaimed, and the captain is then the only claimant. A claim outcome means THESE doors returned no DOI for THIS phrasing — the reach of a search, and a different phrasing routinely changes it.

### `get_qc` {#uuidna-qc}

**Get qc.** Returns {definition,document,isQuantumComputer,metrics,claims,refused,…}.

Call `get_qc` — the old name `uuidna_qc` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"uuidnaOS·qc·demarcation","document":{"title":"what is quantum computer and how to make one?","publisher":"Perplexity","pages":8,"bytes":507426,"…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `of` | string | no |  |

What a quantum computer is, read off an external document, and exactly where this tree stands against it. Pass {of:'audit'} for the external audit run as a guard, {of:'census'} for every quantum-flavoured seal counted, or nothing for the demarcation. The demarcation answers NO to "is uuidna a quantum computer" and shows the working: which of the document’s ingredients have an arithmetic analogue here, which of its stages are reached, which of its metrics could ever be sealed, and which matching counts are refused as numerology.

The document is an eight-page answer with fifteen references, mostly NIST and the National Academies, and it is used because it states the definition plainly — a definition stated plainly is the only thing a demarcation can be measured against. Its lists are transcribed rather than paraphrased into this tree’s vocabulary, and the file is content-addressed so the transcription is checkable against the bytes it came from. The verdict: no qubit is prepared here, no coherence preserved, no pulse calibrated, nothing measured; two of five ingredients have an exact-arithmetic analogue on the address lattice, three have none, and none of the four build stages is reached. What IS claimed names a sealed theorem each time, and a citation whose key is absent from the ledger reports itself as refused rather than resolving to prose. The characterisation metrics are judged by the rule this tree already applies to its own numbers: a decade class is sealable arithmetic and a stopwatch reading is not, so T1, T2 and gate fidelity are evidence and the leakage COUNT is arithmetic. The matching counts the document offers — seven build steps beside seven gate arms, five platforms beside a pentagram — are recorded as refused, because a refusal nobody can see is indistinguishable from never having noticed.

### `get_port_all` {#uuidna-port-all}

**Get port all.** Returns {definition,packages,identities,classified,unclassified,…}.

Call `get_port_all` — the old name `uuidna_port_all` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"alpine-port-all·identity-and-classification","packages":28635,"identities":28635,"classified":11609,"unclassified":17026,"domains":27,"remainder…
```

_No parameters._

Every package in the catalogue, ported. All 28,635 carry a port identity; 11,370 are also placed in a named domain and 17,265 are not. Both numbers, never averaged.

Identity is arithmetic over published metadata — name, version, checksum, repo, branch, arch folded to an address — so it needs no pattern and no opinion, and that half was complete before anyone asked. Classification is a measurement with known failures. Widening the patterns to close the gap raises the second number and lowers its meaning: loosening bio collects ovmf and dmidecode because their descriptions contain BIOS, loosening chemistry collects btrbk and newsboat because theirs say atomic. The unclassified remainder is described by name prefix rather than dismissed — language bindings, vendored SDKs, desktop stacks, fonts.

### `get_interface` {#uuidna-interface}

**Get interface.** Returns {definition,alpineTotal,providedByBrowser,rows,own,receipt}.

Call `get_interface` — the old name `uuidna_interface` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"alpine-interface-port·census-both-sides","alpineTotal":1424,"providedByBrowser":609,"rows":[{"ui":"terminal/tui","alpinePackages":245,"provider"…
```

_No parameters._

The interface surface, censused on BOTH sides: 1424 Alpine packages across six classes, and what uuidnaOS itself provides for each. Most of the domain is given TO a tab rather than implemented here, and it says which.

uuidna already has a terminal (uuidnaExec and its applets), a GUI (the panels the monitor draws) and served pages, so this port is a census rather than a new capability. It draws no pixels and owns no window: the browser is its display server, compositor and input stack. The accessibility row rests on a measured count of schema.org itemprops on a real rendered page, which is machine-readable by a screen reader, a search engine and an agent through the same markup; it is not a WCAG conformance claim, which an audit decides.

### `compute_os_census` {#uuidna-os-census}

**Compute os census.** Returns {definition,present,panels,pages,live,static,receipt,honest}.

Call `compute_os_census` — the old name `uuidna_os_census` still answers · read-only · idempotent

```json
// arguments
{"of":"monitor"}
// answer (excerpt)
{"definition":"uuidnaos-monitor·vitepress","present":true,"panels":54,"pages":68,"live":21,"static":33,"receipt":"20830faf-061e-8238-b6ac-c18794073559","honest…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `of` | string | **yes** |  |

uuidnaOS asked about itself: the monitor it draws on, the compilers it runs, or the architecture matrix it spans. Absent is reported as absent, never as zeros.

The monitor splits panels running in the reader tab from those drawing what the build knew. The compilers report each translation expansion or contraction. The arch matrix asserts two invariants: provenance MUST separate across architectures, computation MUST NOT.

### `list_tools` {#uuidna-list-tools}

**List tools.** Returns {tools}.

Call `list_tools` — the old name `uuidna_list_tools` still answers · read-only · idempotent

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `name` | string | no | one tool: its full contract |
| `query` | string | no | words to find tools by |

THE CATALOGUE IN tools/list's OWN FIELDS. {} answers {tools:[{name, title, description}]} for every tool the surface serves; {name} (a standard name or an old alias) answers that tool's contract as tools/list would serve it — inputSchema and annotations — with the JSON Schema of its actual answer and the example that produced it; {query} answers the tools matching every word. An unknown name is refused with the same JSON-RPC error an unknown tools/call name gets.

### `call_tool` {#uuidna-call}

**Call tool.** Returns {count,tools}.

Call `call_tool` — the old name `uuidna_call` still answers · changes state · reaches outside

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `name` | string | no | the tool to run |
| `arguments` | object | no | its arguments |

THE DOOR THAT COVERS THE CATALOGUE, in tools/call's own keys. tools/list carries list_tools, this door and the tools the server's instructions name; call_tool {name, arguments} runs every other tool exactly as tools/call would, and tools/call still accepts every name and alias directly. The first door's keys, {op, args}, {q} and {}, still answer. Opens 244 tools: uuidna_address, uuidna_uuid_channel, uuidna_handle, uuidna_invitation, uuidna_lead_clusters, uuidna_handle_store, uuidna_send_trial, uuidna_seal_channel, uuidna_open_channel, uuidna_merge, uuidna_coin64, uuidna_gate, uuidna_reeducate, uuidna_merkle_root, uuidna_merkle_prove, uuidna_merkle_proof, uuidna_merkle_verify, uuidna_imprint, uuidna_read, uuidna_bill, uuidna_coins, uuidna_license, uuidna_tokens, uuidna_cost, uuidna_unlocks, uuidna_security_audit, uuidna_verify_statement, uuidna_trial_deposit, uuidna_conformance, uuidna_exploit_fold, uuidna_sanitize, uuidna_engine, uuidna_pentagram_monographs, uuidna_spin, uuidna_transform, uuidna_holofractal, uuidna_pentagram_stream, uuidna_encrypt, uuidna_seal_stream, uuidna_decrypt, uuidna_verify_envelope, uuidna_seal_onion, uuidna_open_onion, uuidna_seal_chain, uuidna_open_chain, uuidna_contract, uuidna_contract_seal, uuidna_contract_open, uuidna_contract_chain, uuidna_contract_open_chain, uuidna_audit_details, uuidna_grid, uuidna_pairs, uuidna_quantum_sailing_weather, uuidna_quantum_sailing_cross_book, uuidna_report, uuidna_research, uuidna_audit_video, uuidna_expose, uuidna_wave_deposit, uuidna_api_mint, uuidna_domains, uuidna_coprime, uuidna_pentagram, uuidna_fibonacci, uuidna_rotate, uuidna_crt, uuidna_gravity, uuidna_digital_root, uuidna_adjudicate, uuidna_prove_verdict, uuidna_verify, uuidna_harness, uuidna_harness7, uuidna_render, uuidna_sha256, uuidna_hmac, uuidna_pbkdf2, uuidna_chacha20, uuidna_poly1305, uuidna_aead_encrypt, uuidna_aead_decrypt, uuidna_crypto, uuidna_strict, uuidna_units, uuidna_triad, uuidna_vortex, uuidna_latex, uuidna_through_void, uuidna_run_sequence, uuidna_living_field, uuidna_vortex_reflection, uuidna_vortex_dash, uuidna_vortex_tour, uuidna_vortex_invariants, uuidna_development_vortex, uuidna_double_torus, uuidna_diamond, uuidna_involute, uuidna_seats, uuidna_render_list, uuidna_hologram, uuidna_fanout, uuidna_theorems, uuidna_lattice, uuidna_skills, uuidna_skill, uuidna_team, uuidna_cloudflare, uuidna_review_domains, uuidna_document, uuidna_coverage, uuidna_reactor, uuidna_open_leads, uuidna_leads_gate, uuidna_open_questions, uuidna_missions, uuidna_theorem, uuidna_laws, uuidna_reports, uuidna_analytics, uuidna_decode, uuidna_treason, uuidna_guard_lessons, uuidna_axiom_witness, uuidna_repos, uuidna_aura, uuidna_quantum_message, uuidna_theorem_message, uuidna_dictionary, uuidna_quantum_voting, uuidna_agent_contribute, uuidna_rights, uuidna_seo, uuidna_hero_animation, uuidna_try, uuidna_oeapi, uuidna_predict, uuidna_school_apis, uuidna_education_jobs, uuidna_hardware, uuidna_software, uuidna_os, uuidna_exec, uuidna_run, uuidna_port, uuidna_related, uuidna_registry, uuidna_alpine, uuidna_package, uuidna_context, uuidna_machine, uuidna_credits, uuidna_credits_summary, uuidna_neighbours, uuidna_axiom_index, uuidna_discovery_train, uuidna_publish, uuidna_edit, uuidna_vocabulary, uuidna_resources, uuidna_prior_art, uuidna_legal_facts, uuidna_land_rights, uuidna_reflects, uuidna_due_process, uuidna_cloudflare_audit, uuidna_sign, uuidna_reveal, uuidna_slim_gate, uuidna_reason, uuidna_fingerprint, uuidna_forensics, uuidna_evidence, uuidna_compare, uuidna_wave, uuidna_trial, uuidna_css, uuidna_by_lean, uuidna_lean_index, uuidna_statement_census, uuidna_coin_ledger, uuidna_crew, uuidna_coins_jobs, uuidna_decide, uuidna_optimise, uuidna_search, uuidna_search_feed, uuidna_article, uuidna_editorial, uuidna_publication, uuidna_search_trial, uuidna_mcp_benchmark, uuidna_unify, uuidna_quantum_profile, uuidna_social_profile, uuidna_grow_life, uuidna_quantum_cube, uuidna_image_provenance, uuidna_selftest, uuidna_gate_status, uuidna_send, uuidna_receive, uuidna_quantum, uuidna_quantum_advantage, uuidna_fill_gaps, uuidna_detect_forgery, uuidna_audit_coin_claim, uuidna_detect_double_spends, uuidna_audit_voting, uuidna_audit_ledger_intrusions, uuidna_audit_ledger_fingerprint, uuidna_audit_agent_statement, uuidna_full_anti_fraud_audit, uuidna_quantum_message_demo, uuidna_energy_wind, uuidna_energy_biogas, uuidna_energy_mfc, uuidna_energy_photon, uuidna_research_ledger, uuidna_rosetta_legs, uuidna_ports, uuidna_chat, uuidna_shell, uuidna_fs_seal, uuidna_db_query, uuidna_chain_seal, uuidna_net_read, uuidna_driver_state, uuidna_security_plan, uuidna_declare_spend, uuidna_social, uuidna_engineering, uuidna_refusals, uuidna_cern, uuidna_aas, uuidna_zenodo_communities, uuidna_journals, uuidna_doi, uuidna_qc, uuidna_port_all, uuidna_interface, uuidna_os_census, uuidna_list_tools.

## Theorems & trial <Badge type="tip" :text="'12'" />

*skill: theorem*

### `send_trial` {#uuidna-send-trial}

**Send trial.** Returns {title,address,details,dropped,controls,outcome,counts,…}.

Call `send_trial` — the old name `uuidna_send_trial` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
{"address":"ec9e6641-989b-85de-aa57-58eedfea0d13","details":1,"dropped":0,"controls":[{"control":"2 + 2 = 5","mustNotBe":["VERIFIED","EVALUATED_TRUE"],"got":"E…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | claims to adjudicate detail-by-… |
| `title` | string | no |  |
| `delimiter` | string | no | detail boundary (newline defaul… |
| `enrich` | boolean | no | append theorem citations for se… |

Send prose to trial — enrich sealed-topic citations, then detail audit (controls first). For video use uuidna_audit_video. Returns audit receipt + per-detail verdicts.

### `compute_render` {#uuidna-render}

**Compute render.** Returns string.

Call `compute_render` — the old name `uuidna_render` still answers · read-only · idempotent

```json
// arguments
{"name":"theorem"}
// answer (excerpt)

```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `name` | string | **yes** | the statement |
| `key` | string | no | proof-page slug |
| `base` | string | no | site base for the proof link (d… |
| `kind` | string | no | card (default) or hero |

Render a statement as a framework-free, CSP-safe card (or OpenGraph hero) — schema.org microdata, shadcn anatomy, content-address in every card, linked to its proof page. Pure HTML+CSS, no script.

### `render_list` {#uuidna-render-list}

**Render list.** Returns string.

Call `render_list` — the old name `uuidna_render_list` still answers · read-only · idempotent

```json
// arguments
{"names":["theorem"]}
// answer (excerpt)

```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `names` | array | **yes** |  |
| `base` | string | no | site base for proof links |

Render many statements as a grid of framework-free, CSP-safe cards — each by reference (its content-address), schema.org microdata, shadcn anatomy, linked to its proof page. Pure HTML+CSS, no script.

### `list_theorems` {#uuidna-theorems}

**List theorems.** Returns [{key,name,statement,tactic,file,principle,skill,cases,lean,…}].

Call `list_theorems` — the old name `uuidna_theorems` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
[{"key":"mul9_1_1","name":"1·1 ≡ 1 (mod 9)","statement":"(1 * 1) % 9 = 1","tactic":"decide","file":"Core.lean","principle":"The 8×8 core","skill":"z9-ring","ca…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `principle` | string | no |  |
| `skill` | string | no | a skill name |
| `contains` | string | no |  |
| `keys` | boolean | no | only the keys |
| `limit` | integer | no | page size |
| `offset` | integer | no | skip this many |

The theorem ledger — LEAN IS THE SINGLE SOURCE. Every entry is a lean/*.lean theorem proven `by decide` (verified sorry-free). Returns each theorem's {key,name,statement,tactic,file,principle,skill,lean,address}. Filter by `principle` (derivation axis), `skill` (capability axis — see uuidna_skills), or `contains`.

### `get_skills` {#uuidna-skills}

**Get skills.** Returns [{skill,theorems,fold,handle,esco,open}].

Call `get_skills` — the old name `uuidna_skills` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
[{"skill":"z9-ring","theorems":305,"fold":"1d6c4433-31bd-8928-a443-7b27b2f82383","handle":"1d6c4433","esco":"https://ec.europa.eu/esco/api/search?text=z9%20rin…
```

_No parameters._

EVERY SKILL THE SEALED LEDGER CARRIES, with its theorem count — the discoverable index of the capability axis (orthogonal to `principle`, which groups by derivation file). Each row carries the order-invariant fold of that skill's theorem addresses, the handle of that fold (the identity to cite for the whole cluster), the ESCO taxonomy lookup for the skill, and the exact `uuidna_skill` call that opens it. Zero-argument and fully computed from the ledger, so a skill sealed in a new wing appears here the day it lands — nothing is authored per skill. Returns [{skill,theorems,fold,handle,esco,open}].

### `compute_skill` {#uuidna-skill}

**Compute skill.** Returns {skill,count,fold,handle,files,principles,theorems,esco,lab,…}.

Call `compute_skill` — the old name `uuidna_skill` still answers · read-only · idempotent

```json
// arguments
{"skill":"z9-ring"}
// answer (excerpt)
{"skill":"z9-ring","count":305,"fold":"1d6c4433-31bd-8928-a443-7b27b2f82383","handle":"1d6c4433","files":["Core.lean","Ring.lean","Uuidna.lean","Vortex.lean"],…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `skill` | string | **yes** | a skill name from uuidna_skills… |
| `escoTitles` | array | no | ESCO concept titles you already… |

OPEN ONE SKILL — the capability axis served as a DIMENSION, not one tool per skill. Pass {skill}; returns its sealed theorems (key, name, statement, tactic, file, principle, Lean line, address, handle), the files and principles behind them, the group fold and handle, and the ESCO mapping onto the European Commission's taxonomy with the hop that fetches it. Pass `escoTitles` you already fetched to have them judged by the published whole-name rule that separates on-topic hits from homographs; both lists come back by name, never silently dropped. PURE — no network, same receipt for anyone, offline. An unknown skill is REFUSED by name with the live list (see uuidna_skills). Returns {skill,count,fold,handle,files,principles,theorems,esco,receipt,honest}. the ESCO leg is a MAP BETWEEN VOCABULARIES — what this capability is CALLED in a European taxonomy — never a claim that any authority recognises or accredits what is sealed here; uuidna awards no qualification. Integrity, not truth (theorem provenance_integrity_not_content_truth).

OPEN ONE SKILL — the capability axis served as a DIMENSION rather than as one tool per skill. Returns that skill's sealed theorems (key, name, statement, tactic, file, principle, the reconstructed Lean line, its content-address and its HANDLE), the files and principles they were derived in, the group's order-invariant fold and handle, and the skill's ESCO MAPPING onto the European Commission's own taxonomy of skills, competences and occupations: the exact lookup URL, its content-address, the one hop that actually fetches it (uuidna_school_apis) and the walk to the occupations ESCO relates it to (uuidna_education_jobs). Pass `escoTitles` — concept titles you already fetched — to have them judged by school-apis' OWN published whole-name rule, which separates on-topic hits from homographs (a search guarantees the query's letters come back, so a fragment hit carries no information); both lists are returned by name, never silently dropped. PURE: this tool reaches no network, so it is deterministic and folds to the same receipt for anyone, offline. An unknown skill is REFUSED by name with the live list, never answered with an empty set that would read like "this capability is unproven". List the skills with uuidna_skills. The school lab for that world domain (computation + emulator, computationally entangled to the head theorem and related resources) rides the same call as `lab`. the ESCO leg is a MAP BETWEEN VOCABULARIES — what this capability is CALLED in a European taxonomy — and never a claim that any authority recognises, accredits or would employ anything sealed here (theorem provenance_integrity_not_content_truth); uuidna awards no qualification.

### `review_domains` {#uuidna-review-domains}

**Review domains.** Returns [{domain,theorems,fold,verdict,receipt}].

Call `review_domains` — the old name `uuidna_review_domains` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
[{"domain":"z9-ring","theorems":305,"fold":"1d6c4433-31bd-8928-a443-7b27b2f82383","verdict":"VERIFIED","receipt":"7d5934d3-661e-8e19-9401-452abc2d57f4"},{"doma…
```

_No parameters._

LOCAL reviews — a recomputable review of every DOMAIN (skill) the ledger touches: its sealed-theorem count, their order-invariant fold, and the trial verdict (VERIFIED — every one is `by decide`, sorry-free), each folded to a review receipt. No server, no stored opinion; the review IS the ledger's own integrity per domain, recomputable by anyone. Returns [{domain,theorems,fold,verdict,receipt}].

### `compute_document` {#uuidna-document}

**Compute document.** Returns {handle,address,nodes}.

Call `compute_document` — the old name `uuidna_document` still answers · read-only · idempotent

```json
// arguments
{"state":{"root":{"type":"theorem","children":[{"type":"theorem"}]}}}
// answer (excerpt)
{"handle":"9fd50423","address":"9fd50423-326b-82ad-b885-61e7480f0d75","nodes":2}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `state` | object | **yes** | a Lexical EditorState |

The DOCUMENT FOLD — content-address a Lexical-shaped document (a node tree, EditorState.toJSON() shape). The SERVE projection of the serializer contract lean/Editor.lean proves: a document is a SEQUENCE, so the fold is ORDER-SENSITIVE (reordering a node moves the address — the opposite of a set), change-sensitive, and bounded-injective. serialize → merkleRoot over the leaves → the handle you cite; editing is re-addressing. Returns {handle,address,nodes}. The SAME fold a PayloadCMS save-hook and a VitePress render read — one contract, both frameworks. Integrity, not truth (theorem provenance_integrity_not_content_truth): it proves WHICH document, not that its content is correct.

### `get_coverage` {#uuidna-coverage}

**Get coverage.** Returns {total,covered,uncovered,uncoveredFiles,ready,receipt}.

Call `get_coverage` — the old name `uuidna_coverage` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"total":71018,"covered":71018,"uncovered":[],"uncoveredFiles":[],"ready":true,"receipt":"38815410-a778-859f-bcca-d19191cac9af"}
```

_No parameters._

COVERAGE — is every sealed theorem shown in a monograph? A PRESENTATION diagnostic that BLOCKS NOTHING, as ONE zero-arg recomputable call. Returns {total,covered,uncovered,uncoveredFiles,ready,receipt} — uncovered lists the theorem KEYS in no monograph, uncoveredFiles the ledger FILES with no publication (the fix: author a PRINCIPLE [file,title,blurb] in lean-ledger). ready is true iff nothing is uncovered; the state folds order-invariantly to receipt. Integrity, not truth (theorem provenance_integrity_not_content_truth).

### `get_theorem` {#uuidna-theorem}

**Get theorem.** Returns {key,name,statement,lean,principle,file,address,verdict,source,…}.

Call `get_theorem` — the old name `uuidna_theorem` still answers · read-only · idempotent

```json
// arguments
{"key":"mul9_1_1"}
// answer (excerpt)
{"key":"mul9_1_1","name":"1·1 ≡ 1 (mod 9)","statement":"(1 * 1) % 9 = 1","lean":"theorem mul9_1_1 : (1 * 1) % 9 = 1 := by decide","principle":"The 8×8 core","f…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** | a sealed theorem key |

Read ONE theorem by key: its detailed `by decide` Lean proof, its formal statement, its principle, source file and content-address, and the verdict (SEALED — its Lean proof compiles sorry-free). Keys from uuidna_theorems.

WHITE PAPER AND BLUEPRINTS AT ONCE, with its school lab: the sealed statement and Lean line are the paper; the handle, /theorem/&amp;lt;key&amp;gt; route, and 32 hexbit states are the drawing — same address (theorem a_spec_compiles_to_hexbits). The lab is computationally entangled to the theorem and related resources (cited sealed keys, PORTED benches this theorem names, the skill instrument). Verdict SEALED. Keys from uuidna_theorems.

### `get_fingerprint` {#uuidna-fingerprint}

**Get fingerprint.** Returns {count,fnvReceipt,sha256,tamperCost}.

Call `get_fingerprint` — the old name `uuidna_fingerprint` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"count":71018,"fnvReceipt":"08b07830-c9d8-88d2-bd10-bb46c60b4d67","sha256":"1c803ed128399ad1ffb343f9f55e2e8b87e5eceeb2948e374553e885229bec1e","tamperCost":"A …
```

_No parameters._

The FUSED ledger fingerprint — two integrity layers, stated honestly. The fast FNV receipt is TAMPER-EVIDENT (any change moves it, keyless) but NOT collision-resistant; the SHA-256 fold (over the sorted addresses, order-invariant) IS collision-resistant, so a forgery that survives it costs a ~2^128 collision — a BOUND set by the primitive, NOT a maximum. Add a key (HMAC) and forgery also needs the secret. Recomputable by anyone from the same lean/*.lean. Returns {count, fnvReceipt, sha256, tamperCost}. Boundary declared — theorem drift_is_named_or_caught.

### `run_trial` {#uuidna-trial}

**Run trial.** Returns {count,verified,unverified,leanBacked,receipt,verdicts,…}.

Call `run_trial` — the old name `uuidna_trial` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"count":71018,"verified":71018,"unverified":0,"leanBacked":71018,"receipt":"08b07830-c9d8-88d2-bd10-bb46c60b4d67","verdicts":[{"key":"mul9_1_1","name":"1·1 ≡ …
```

_No parameters._

Run the whole Lean ledger through the trial: every theorem VERIFIED by its `by decide` proof, each address walked through runSequence (polarity, spin as period, angle as digit-step × seed, rosetta ray degrees). Content-addresses fold order-invariantly to ONE receipt. Returns {count,verified,receipt,sequence,verdicts}. Same lean/*.lean, same receipt.

## Honesty gate <Badge type="tip" :text="'8'" />

*skill: gate*

### `check_citations` {#uuidna-gate}

**Check citations.** Returns {binary,hit}.

Call `check_citations` — the old name `uuidna_gate` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
{"binary":1,"hit":null}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

The honesty gate: does the prose hold the floor (binary 1) or drain as an overclaim (0)? 7-language. Returns {binary,hit}. A tripwire, not an oracle. Boundary declared — theorem drift_is_named_or_caught.

### `compute_correction` {#uuidna-reeducate}

**Compute correction.** Returns {text,passed,steps}.

Call `compute_correction` — the old name `uuidna_reeducate` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
{"text":"theorem","passed":true,"steps":[]}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

Bound a failing/overclaiming output to the honest floor, keeping the honest remainder. Returns {passed,...}. Boundary declared — theorem drift_is_named_or_caught.

### `verify_claim` {#uuidna-adjudicate}

**Verify claim.** Returns {statement,verdict,receipt,note,develop}.

Call `verify_claim` — the old name `uuidna_adjudicate` still answers · read-only · idempotent

```json
// arguments
{"statement":"theorem"}
// answer (excerpt)
{"statement":"theorem","verdict":"UNVERIFIED","receipt":"ec9e6641-989b-85de-aa57-58eedfea0d13","note":"no decidable test and no sealed citation — UNVERIFIED; b…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** |  |

The trial: ONE recomputable answer for a statement, and only one of two, all else void — VERIFIED (a decidable test holds, or it cites a sealed Lean theorem that ALSO shares vocabulary with the claim — a citation is not entailment, so a real theorem cited for an unrelated sentence verifies nothing) or UNVERIFIED (everything else, including a citation to a proof not in the ledger, or a real citation about a different topic). uuidna verifies, it never refutes. Integrity, not truth (theorem provenance_integrity_not_content_truth).

### `prove_verdict` {#uuidna-prove-verdict}

**Prove verdict.** Returns {statement,verdict,receipt,note,develop,formulas,proofRoot}.

Call `prove_verdict` — the old name `uuidna_prove_verdict` still answers · read-only · idempotent

```json
// arguments
{"statement":"theorem"}
// answer (excerpt)
{"statement":"theorem","verdict":"UNVERIFIED","receipt":"ec9e6641-989b-85de-aa57-58eedfea0d13","note":"no decidable test and no sealed citation — UNVERIFIED; b…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** |  |
| `formulaReceipts` | array | no |  |

Fold a statement plus any decidable formula receipts through the order-invariant gravity to ONE proof-of-verdict root — a recomputable seal of the trial.

### `verify_address` {#uuidna-verify}

**Verify address.** Returns {seed,address,recomputes,message,jointReceipt}.

Call `verify_address` — the old name `uuidna_verify` still answers · read-only · idempotent

```json
// arguments
{"seed":"theorem"}
// answer (excerpt)
{"seed":"theorem","address":"ec9e6641-989b-85de-aa57-58eedfea0d13","recomputes":true,"message":null,"jointReceipt":"af8649fd-9f8b-8450-8e70-829d22cdc06b"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `seed` | string | **yes** |  |

The self-verdict: recompute uuidna's own claims from a seed and return the recomputable UuidnaVerdict (integrity, not truth (theorem provenance_integrity_not_content_truth)).

### `compute_harness` {#uuidna-harness}

**Compute harness.** Returns {output,address,reproducible,gatePass,auditable}.

Call `compute_harness` — the old name `uuidna_harness` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
{"output":"theorem","address":"ec9e6641-989b-85de-aa57-58eedfea0d13","reproducible":true,"gatePass":true,"auditable":true}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

Make any output auditable: wrap it with its content-address and honesty-gate verdict. Returns {output,address,auditable,...}. Boundary declared — theorem drift_is_named_or_caught.

### `compute_harness7` {#uuidna-harness7}

**Compute harness7.** Returns {receipts,root,auditableInAll}.

Call `compute_harness7` — the old name `uuidna_harness7` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
{"receipts":["d5e9da17-9af3-892b-bfb6-9920f7995ff8","cdd64000-4001-8170-a71d-6136516d0c21","ef7e50fb-c961-895b-a3e0-cab66938d29d","38b79258-b621-8f11-b208-8635…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

Audit an output across all seven dimensions at once — seven receipts folded to one root. Returns {receipts,root,auditableInAll}.

### `get_server_status` {#uuidna-gate-status}

**Get server status.** Returns {table,sealedTable,matchesSealedSpec,cleanStates,drainedStates,…}.

Call `get_server_status` — the old name `uuidna_gate_status` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"table":[1,0,0,0,0,0,0,0],"sealedTable":[1,0,0,0,0,0,0,0],"matchesSealedSpec":true,"cleanStates":1,"drainedStates":7,"tools":245,"registry":"492533ad-9c83-851…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `messaging` | boolean | no | include messaging witness, wire… |

Gate self-test: eight-state verdict table vs sealed spec, registry receipt. Pass {messaging:true} for coordinated health (witness, wire budget, session census). Boundary declared — theorem drift_is_named_or_caught.

THE GATE PROVES ITSELF, live against the sealed spec: every served tools/call passes the conjunction gate cleanAudit(f,d,v) = (1−f)·(1−d)·(1−v) — f the input-sanitize bit, d the output-sanitize bit, v the honesty bit (a fabricated theorem citation, slimGate) — and this tool recomputes the eight-state verdict table and REQUIRES it to equal both the sealed table [1,0,0,0,0,0,0,0] (theorem anti_fraud_check_deterministic) and the boolean spec (theorem honesty_gate_is_theorem_not_oracle). With {messaging:true}: ledger messaging totality witness, MCP wire within budget, this process's coin census and receipt-chain tip — poll to monitor; pair with uuidna_coin_ledger for WHO paid.

## Merkle & gravity <Badge type="tip" :text="'4'" />

*skill: merkle*

### `compute_merkle_root` {#uuidna-merkle-root}

**Compute merkle root.** Returns string.

Call `compute_merkle_root` — the old name `uuidna_merkle_root` still answers · read-only · idempotent

```json
// arguments
{"leaves":["theorem"]}
// answer (excerpt)
df34fdc2-38c6-855d-a479-060c4b2c0f2d
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `leaves` | array | **yes** |  |

Order-free merkle root of a list of leaves (a tamper-evident seal of the set).

### `prove_merkle` {#uuidna-merkle-prove}

**Prove merkle.** Returns [].

Call `prove_merkle` — the old name `uuidna_merkle_prove` still answers · read-only · idempotent

```json
// arguments
{"leaves":["theorem"],"index":1}
// answer (excerpt)
[]
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `leaves` | array | **yes** |  |
| `index` | number | **yes** |  |

Holographic inclusion proof for the leaf at index — an O(log N) audit path that verifies the whole from a tiny part.

### `verify_merkle` {#uuidna-merkle-verify}

**Verify merkle.** Returns boolean.

Call `verify_merkle` — the old name `uuidna_merkle_verify` still answers · read-only · idempotent

```json
// arguments
{"leaf":"theorem","proof":"theorem","root":"theorem"}
// answer (excerpt)
false
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `leaf` | string | **yes** |  |
| `proof` | any | **yes** |  |
| `root` | string | **yes** |  |

Verify a leaf against a root using an inclusion proof (a forged leaf fails).

### `compute_gravity` {#uuidna-gravity}

**Compute gravity.** Returns string.

Call `compute_gravity` — the old name `uuidna_gravity` still answers · read-only · idempotent

```json
// arguments
{"addresses":["theorem"]}
// answer (excerpt)
theorem
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `addresses` | array | **yes** |  |

The quantum receipt: the order-INVARIANT merkle gravity of a set of addresses — every observer ordering falls to the SAME root. NOT physics (theorem provenance_integrity_not_content_truth); a content-addressed fixed point.

## Imprint & messaging <Badge type="tip" :text="'4'" />

*skill: imprint*

### `imprint_text_chain` {#uuidna-imprint}

**Imprint text chain.** Returns [string].

Call `imprint_text_chain` — the old name `uuidna_imprint` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
["70e8d0ca-dee4-8cad-a800-000000000000"]
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

Encode text INTO a uuid chain (reversible, ≤115 bits per uuid, chained for longer). A public, reversible encoding — not encryption; secrecy lives in the sealed ChaCha20-Poly1305 layer (uuidna_crypt), whose derivation ROTATES with the advancing step (salt_seq_injective).

### `read_imprint_text_chain` {#uuidna-read}

**Read imprint text chain.** Returns string.

Call `read_imprint_text_chain` — the old name `uuidna_read` still answers · read-only · idempotent

```json
// arguments
{"uuids":["70e8d0ca-dee4-8cad-a800-000000000000"]}
// answer (excerpt)
theorem
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `uuids` | array | **yes** | uuidna_imprint output |

Decode text back from a uuid chain produced by uuidna_imprint (round-trips exactly).

### `send_message` {#uuidna-send}

**Send message.** Returns [string].

Call `send_message` — the old name `uuidna_send` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem","passphrase":"theorem"}
// answer (excerpt)
["e6f644ec-4474-8665-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222c22697","e…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |
| `passphrase` | string | **yes** |  |
| `session` | string | no | the channel/room id that scopes… |
| `step` | integer | no | the advancing message position… |

SEND (→): the SESSION RATCHET over uuid. Encrypt text under a passphrase and a `session` (a channel/room id), then imprint the sealed envelope INTO a uuid stream — the channel IS uuid. The captain theorem as encryption: the two coins are paid ONCE (one PBKDF2-600k on the session), then every message ROTATES a fresh key by its advancing `step` and seals free (~0.1 ms, not 1.75 s). Rotation closes the equality leak; the SESSION is a real secrecy boundary — a message can only be opened by a receiver that names the SAME session (a different session/referer cannot). The session lives in the passphrase until destroyed. `step` MUST advance (never reuse it under one session). Returns the uuid chain to transport.

### `receive_message` {#uuidna-receive}

**Receive message.** Returns string.

Call `receive_message` — the old name `uuidna_receive` still answers · read-only · idempotent

```json
// arguments
{"passphrase":"theorem","uuids":["e6f644ec-4474-8665-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222c22697","e68cae44-4746-8c60-9818-1818161139b0","e76c7422-3a22-8585-9909-51adb13544d5","e77243a3-934a-84b8-a966-ad2a892ce7a7","e7488b08-9b9b-8db9-a365-223a226d6939","e662dcae-ce9e-8828-92aa-d282ca0a8911","e6c22637-4223-8a22-9cd1-9e1410535ad4","e729209e-9e91-8161-84e8-c2ce44744470","e7458935-25e4-8c8b-b4b7-268474769766","e7e96aca-2726-80ee-9e9e-91161130b232","e6726573-7322-83a2-88d9-98e198d18d88","e7b169b9-a9ab-8316-a706-4ccc85ac4ca6","e7194b4e-58cc-8985-a663-346266636130","a0445844-e6ca-8e24-91d1-83e800000000"]}
// answer (excerpt)
theorem
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `uuids` | array | **yes** | uuidna_send output |
| `passphrase` | string | **yes** | the passphrase the sender used |
| `session` | string | no | the SAME session/channel id use… |

RECEIVE (←): read a uuid stream from uuidna_send back to its sealed envelope and decrypt, deriving the key from the RECEIVER's OWN `session` (not the envelope) — so a message sealed for another session/referer cannot be opened here (Poly1305 rejects it). A wrong passphrase or any tamper also throws. The reverse of the ratchet; the session is derived once (cached) and rotated by the message step.

## Billing & measure <Badge type="tip" :text="'4'" />

*skill: billing, measure*

### `bill_call` {#uuidna-bill}

**Bill call.** Returns {advantage,bitsSaved,coins,free,receipt,basis}.

Call `bill_call` — the old name `uuidna_bill` still answers · read-only · idempotent

```json
// arguments
{"commercial":false,"recomputeOps":1,"verifyOps":1}
// answer (excerpt)
{"advantage":0,"bitsSaved":0,"coins":0,"free":true,"receipt":"896436e4-c56f-8bdf-9934-e0f7c11ddc32","basis":"public interest / non-commercial — free (0 coins);…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `commercial` | boolean | **yes** |  |
| `recomputeOps` | number | **yes** |  |
| `verifyOps` | number | **yes** |  |

Measured billing, fused to the two coins: the ADVANTAGE (recompute O(N) − verify O(1), the difference of computational power) priced on the two conserved coins (−χ of the double torus, 110 − 108 = 2). Public interest is free. The whole bill folds to a `receipt` — a content-address of every term — so a skeptic recomputes the bill themselves and lands on the same receipt, or it was altered. The price is rechecked, never trusted.

### `get_tokens` {#uuidna-tokens}

**Get tokens.** Returns {selfReported,label,dimensions,total,theorems,tokensPerTheorem,…}.

Call `get_tokens` — the old name `uuidna_tokens` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"selfReported":true,"label":null,"dimensions":{"input":0,"output":0,"cached":0,"reasoning":0},"total":0,"theorems":71018,"tokensPerTheorem":0,"distribution":{…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `input` | number | no | prompt/input tokens |
| `output` | number | no | generated/output tokens |
| `cached` | number | no | cache-read tokens |
| `reasoning` | number | no | reasoning/thinking tokens |
| `label` | string | no | optional tag for this report |

Measure TOKENS-PER-THEOREM — the honest cost-of-proof metric (independent skilled work, not money). An agent SELF-REPORTS its context/token distribution {input, output, cached, reasoning}; this sums them and divides by the sealed theorem count (the live ledger). Returns {selfReported, dimensions, total, theorems, tokensPerTheorem, distribution}. HONEST: the token counts are the agent’s OWN report — this server cannot observe your context; the divisor, the theorem count, is the recomputable truth. Fold many reports over a session to watch the cost-per-theorem fall. Boundary declared — theorem drift_is_named_or_caught.

### `get_cost` {#uuidna-cost}

**Get cost.** Returns {count,formalBytes,bytesPerTheorem,verifyOps,produceOverVerify,…}.

Call `get_cost` — the old name `uuidna_cost` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"count":71018,"formalBytes":7646856,"bytesPerTheorem":107.67489932129882,"verifyOps":71018,"produceOverVerify":107.67489932129882,"largest":{"key":"a_template…
```

_No parameters._

The RECOMPUTABLE cost of the ledger — computed from lean/*.lean itself, NOT self-reported like uuidna_tokens. The PRODUCE cost is the formal-corpus size (Σ bytes of every `theorem … := by decide`); the VERIFY cost is O(1) per theorem (recompute its content-address). Anyone recomputes the SAME numbers from the same source, so nothing is on trust — it folds to a receipt you recheck. This is efficiency PROVEN (routed to the ledger), where uuidna_tokens is efficiency MEASURED (a self-report). Returns {count, formalBytes, bytesPerTheorem, verifyOps, largest, smallest, receipt}.

### `get_resources` {#uuidna-resources}

**Get resources.** Returns {cpu,memory,system,address,measured,notMeasured,thermodynamics}.

Call `get_resources` — the old name `uuidna_resources` still answers · read-only · idempotent · varies

```json
// arguments
{}
// answer
(varies between calls: the answer reads a clock, the machine or the network)
```

_No parameters._

Honest device resource accounting — balance the thermodynamics by MEASURING what is spent, never claiming it is free. Reports CPU time (this process), memory (rss/heap), and the machine's load, cores, total/free memory and uptime, all read from Node/OS, content-addressed as a signed reading. States plainly what it does NOT measure (GPU, bandwidth, and the actual joules need platform-specific probes and are not invented). No free energy: this work costs energy, bounded below by Landauer's kT·ln2 per bit and far more on a real chip; efficiency is pushed toward that floor, never past it. Boundary declared — theorem drift_is_named_or_caught.

## Security posture (recomputable) <Badge type="tip" :text="'1'" />

*skill: security*

### `audit_security` {#uuidna-security-audit}

**Audit security.** Returns {checks,passed,failed,receipt}.

Call `audit_security` — the old name `uuidna_security_audit` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"checks":[{"id":"zero-runtime-deps","ok":true,"detail":"runtime dependencies: 0 (none) — no third-party code runs; the supply-chain surface is the Node + Lean…
```

_No parameters._

The RECOMPUTABLE security posture computed from what the package SHIPS (package.json + the sealed ledger + the honesty gate), folded to an order-invariant receipt anyone rechecks — NOT a scanner and NOT a pentest. It verifies the supply-chain surface (zero runtime dependencies, dev-deps bounded to a known set), the defence-in-depth theorems sealed (layers add bits, a key bit doubles the space, the birthday bound halves the exponent, verify is cheaper than forge, no maximum only bounds), collision resistance by pigeonhole (seats_pigeonhole), that the honesty gate BITES a fabricated theorem citation, and that the KERNEL-ONLY WITNESS ships (lean/axioms.json beside dist covers the live ledger — the no-borrowed-axiom claim recomputes offline). the repo-tree scans (no committed secret across tracked files, the KAT suite present) and the CI gates run in the source tree, NOT here — this is the posture provable from the package itself. Returns {checks, passed, failed, receipt}. Boundary declared — theorem drift_is_named_or_caught.

## Fast verification (statement → sealed theorem) <Badge type="tip" :text="'1'" />

*skill: theorem*

### `verify_statement` {#uuidna-verify-statement}

**Verify statement.** Returns {verdict,note}.

Call `verify_statement` — the old name `uuidna_verify_statement` still answers · read-only · idempotent

```json
// arguments
{"statement":"mul9_1_1"}
// answer (excerpt)
{"verdict":"UNVERIFIED","note":"this exact statement is not a sealed theorem — cite a sealed proof or supply a decidable test (never called false, only not-yet…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** | the exact theorem statement to… |

FAST verification against the sealed ledger: is this exact STATEMENT a sealed theorem? uuidna is a verification framework, so it verifies a THEOREM directly — not only a prose claim that cites one. VERIFIED in O(1) (a content-address lookup) iff the statement is byte-identical to a sealed theorem; returns the sealing theorem key, tactic and content-address (recomputed to confirm the seal). Otherwise UNVERIFIED — never "false", only not-sealed. Complementary to uuidna_slim_gate (which judges a prose CLAIM by its citations). Returns {verdict, key, address, tactic, file, note}.

## Transform until verified (no unverified material stays) <Badge type="tip" :text="'1'" />

*skill: theorem*

### `transform_until_verified` {#uuidna-transform}

**Transform until verified.** Returns {cells,verified,unverified,receipt}.

Call `transform_until_verified` — the old name `uuidna_transform` still answers · read-only · idempotent

```json
// arguments
{"materials":["theorem"]}
// answer (excerpt)
{"cells":[{"input":"theorem","status":"UNVERIFIED","involute":{"input":"theorem","method":"negation_involution_solves","station":"ec9e","involute":"1361","veri…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `materials` | array | **yes** | materials to transform |

Transform materials. VERIFIED stays. UNVERIFIED involutes to sealed solutions (negation_involution_solves) in the same call. Combinable. Returns {cells,verified,unverified,receipt}.

## Pentagram · hologram · fractal · accounted (every I/O) <Badge type="tip" :text="'1'" />

*skill: theorem*

### `compute_pentagram_fractal` {#uuidna-holofractal}

**Compute pentagram fractal.** Returns {input,address,pentagram,hologram,fractal,accounting,receipt,…}.

Call `compute_pentagram_fractal` — the old name `uuidna_holofractal` still answers · read-only · idempotent

```json
// arguments
{"input":"theorem"}
// answer (excerpt)
{"input":"theorem","address":"ec9e6641-989b-85de-aa57-58eedfea0d13","pentagram":{"points":["1ecdee5e-5ca6-8bb8-9c7d-7cb0ad8ecc62","0a1adb55-e6f3-8174-b6df-b3af…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `input` | string | **yes** | the value to make pentagram·hol… |

MAKE any input pentagram · hologram · fractal · accounted, by CONSTRUCTION. Each property is verifiable, so the structure holds by computation and not by assertion. PENTAGRAM: the address seeds 5 points visited in the star {5/2} stroke [0,2,4,1,3] — one closed stroke (sealed pentagram_single_stroke). HOLOGRAM: the merkle root over the parts, with a proof that verifies ANY part against the whole in O(log N). FRACTAL: the self-similar fold tower — 128-bit uuid → 64-bit coin (its top half) → ℤ/9 digital root, the same fold at descending scales. ACCOUNTED: the two conserved coins (= −χ of the double torus) and the bits taught (verify O(1) vs produce O(N); reference bits saved). All fold to one order-invariant receipt; `verified` is the recomputable conjunction. Returns {input,address,pentagram,hologram,fractal,accounting,receipt,verified}.

## Quantum pentagram streaming (pentagram order, order-free receipt) <Badge type="tip" :text="'1'" />

*skill: pentagram*

### `compute_pentagram_stream` {#uuidna-pentagram-stream}

**Compute pentagram stream.** Returns {n,step,order,single,loops,streamed,receipt,quantum}.

Call `compute_pentagram_stream` — the old name `uuidna_pentagram_stream` still answers · read-only · idempotent

```json
// arguments
{"items":["theorem"]}
// answer (excerpt)
{"n":1,"step":2,"order":[0],"single":true,"loops":1,"streamed":[{"visitIndex":0,"item":"theorem","holofractal":{"input":"theorem","address":"ec9e6641-989b-85de…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `items` | array | **yes** | the sequence to stream through… |
| `step` | number | no | the star stride (default 2 — th… |

QUANTUM PENTAGRAM STREAMING: stream a sequence through the star {n/step} visiting order (the pentagram {5/2} generalized — item k visited at step·k mod n), a SINGLE closed stroke iff gcd(step,n)=1 (else gcd shorter loops, reported honestly). Each streamed item is stamped holofractal (pentagram·hologram·fractal·accounted), and the whole folds to ONE ORDER-INVARIANT quantum receipt — the stream has a definite pentagram ORDER yet an order-free RECEIPT (any observer ordering → the same root; the doubleTorus/gravity duality). `quantum` is proven, not asserted (gravity(order)===gravity(reverse)). Returns {n,step,order,single,loops,streamed,receipt,quantum}. Boundary declared — theorem drift_is_named_or_caught.

## Crypto & streams <Badge type="tip" :text="'8'" />

*skill: crypto*

### `encrypt_text` {#uuidna-encrypt}

**Encrypt text.** Returns {v,alg,kdf,iter,salt,nonce,ct,tag,address}.

Call `encrypt_text` — the old name `uuidna_encrypt` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem","passphrase":"theorem"}
// answer (excerpt)
{"v":1,"alg":"ChaCha20-Poly1305","kdf":"PBKDF2-SHA256","iter":600000,"salt":"wAcTk4xNI4lt3/gJYtOu8g==","nonce":"6CoiKto3CmtLeTbU","ct":"mYP22MQbqg==","tag":"8/…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |
| `passphrase` | string | **yes** |  |
| `step` | integer | no | the advancing-sequence step — o… |

Encrypt text under a passphrase. Secrecy: pure-TS ChaCha20-Poly1305 (PBKDF2-SHA256, 600k) — no native crypto. Convergent by default (the same text seals identically → equality leaks). Pass an advancing `step` (the crypt salt) to freshen the salt per position so the same text seals differently and equality no longer leaks; the step is public (`seq`) and MUST advance. Returns a sealed envelope whose content-address is the 7d-fold of its parts.

### `seal_stream` {#uuidna-seal-stream}

**Seal stream.** Returns [{v,alg,kdf,iter,salt,nonce,ct,tag,address,seq}].

Call `seal_stream` — the old name `uuidna_seal_stream` still answers · read-only · idempotent

```json
// arguments
{"messages":["theorem"],"passphrase":"theorem"}
// answer (excerpt)
[{"v":2,"alg":"ChaCha20-Poly1305","kdf":"PBKDF2-SHA256","iter":600000,"salt":"cQaOGMJKYGpyaV8B6wE16A==","nonce":"dvQr5UeOq4R5qnul","ct":"YcwfBPfevQ==","tag":"7…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `messages` | array | **yes** |  |
| `passphrase` | string | **yes** |  |
| `start` | integer | no | the starting step (default 0) |

Seal a list of messages under one passphrase, each ADVANCING the step (the sequence is the stripe, one seal per step) — repeated messages never seal alike, so the equality leak stays closed across the whole stream. Returns the sealed envelopes; decrypt each with uuidna_decrypt.

### `decrypt_envelope` {#uuidna-decrypt}

**Decrypt envelope.** Returns string.

Call `decrypt_envelope` — the old name `uuidna_decrypt` still answers · read-only · idempotent

```json
// arguments
{"passphrase":"theorem","sealed":{"v":1,"alg":"ChaCha20-Poly1305","kdf":"PBKDF2-SHA256","iter":600000,"salt":"wAcTk4xNI4lt3/gJYtOu8g==","nonce":"6CoiKto3CmtLeTbU","ct":"mYP22MQbqg==","tag":"8/ORCtEblh/hHVLdSpgD6w==","address":"ff6cb7ab-95ac-875c-a290-24d215a234c9"}}
// answer (excerpt)
theorem
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `sealed` | object | **yes** | uuidna_encrypt output |
| `passphrase` | string | **yes** | the passphrase the envelope was… |

Decrypt a sealed envelope from uuidna_encrypt / uuidna_seal_stream with the passphrase (v1 convergent or v2 sequence-salted — the salt travels in the envelope, no step needed back). A wrong key or tampered ciphertext throws (Poly1305 authentication).

### `verify_envelope` {#uuidna-verify-envelope}

**Verify envelope.** Returns boolean.

Call `verify_envelope` — the old name `uuidna_verify_envelope` still answers · read-only · idempotent

```json
// arguments
{"sealed":{"v":1,"alg":"ChaCha20-Poly1305","kdf":"PBKDF2-SHA256","iter":600000,"salt":"wAcTk4xNI4lt3/gJYtOu8g==","nonce":"6CoiKto3CmtLeTbU","ct":"mYP22MQbqg==","tag":"8/ORCtEblh/hHVLdSpgD6w==","address":"ff6cb7ab-95ac-875c-a290-24d215a234c9"}}
// answer (excerpt)
true
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `sealed` | object | **yes** | uuidna_encrypt output |

Verify a sealed envelope's 7d-fold content-address (integrity/routing) without the key — public, reproducible.

### `seal_onion` {#uuidna-seal-onion}

**Seal onion.** Returns {uuids,layers,receipt}.

Call `seal_onion` — the old name `uuidna_seal_onion` still answers · read-only · idempotent

```json
// arguments
{"message":"theorem","passphrases":["theorem"]}
// answer (excerpt)
{"uuids":["e6f644ec-4474-8625-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222c…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `message` | string | **yes** |  |
| `passphrases` | array | **yes** | innermost→outermost, 1..16 laye… |
| `step` | integer | no | optional advancing crypt-salt s… |

Onion-seal a message under N passphrases (ChaCha20-Poly1305 layers, 1..16) as a uuid chain. Open with uuidna_open_onion (involute). Returns { uuids, layers, receipt }. Boundary declared — theorem drift_is_named_or_caught.

passphrases[0] innermost, [n-1] outermost. Secrecy is ChaCha20-Poly1305 ONLY; uuid transport is public; receipt is non-crypto FNV. Seal SETS size; open only undoes it — reverse crypto does not multiply occupancy (256 bits). Each theorem unlocks its own claim elsewhere (calendar 144, Shor posture); onion layer count does not re-mint them. Integrity.

### `open_onion` {#uuidna-open-onion}

**Open onion.** Returns string.

Call `open_onion` — the old name `uuidna_open_onion` still answers · read-only · idempotent

```json
// arguments
{"passphrases":["theorem"],"uuids":["e6f644ec-4474-8625-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222c22697","e68cae44-4746-8c60-9818-1818161139b0","e76c7422-3a22-8774-858d-51acd1e13924","e7a363a1-997b-83a5-8b2e-89eea70ce7a7","e7488b08-9b9b-8db9-a365-223a2236436f","e6d296e8-de66-886d-aba2-632aa312a911","e6c22637-4223-8a22-9b56-540c8c935458","e738b39e-9e91-8161-84e8-c2ce44744470","e6bd3d49-0dd1-8158-a6c6-82f6848564c6","e68a6e0c-e886-8cee-9e9e-91161130b232","e6726573-7322-83a2-8999-98d98d88dd85","e71169c9-ab0b-8196-a706-e6ac65ac2647","e64c0b4c-8d19-80c8-b135-613233346339","2044fa00-0000-8000-8000-000000000000"]}
// answer (excerpt)
theorem
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `uuids` | array | **yes** | uuidna_seal_onion output |
| `passphrases` | array | **yes** | innermost→outermost, the same p… |

Reverse crypto recovers sealed bytes — capacity ×1 (handle_capacity_invariant_under_entanglement). Each theorem unlocks what it seals; peel does not invent messaging-load 144 or period-finding speedup.

### `seal_chain` {#uuidna-seal-chain}

**Seal chain.** Returns [{uuids,layers,receipt,referer,step}].

Call `seal_chain` — the old name `uuidna_seal_chain` still answers · read-only · idempotent

```json
// arguments
{"messages":["theorem"],"passphrases":["theorem"]}
// answer (excerpt)
[{"uuids":["e6f644ec-4474-8645-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `messages` | array | **yes** |  |
| `passphrases` | array | **yes** |  |
| `genesis` | string | no | optional zeroth referer seed |

Seal a stream of messages as a forward-linked RATCHET: each link onion-seals at a step ROTATED from the prior link’s receipt (the referer sequence), so every step is fresh and the stream is content-chained. HONEST: the rotation is over a PUBLIC non-crypto receipt — it buys freshness, linkage and accidental-tamper-evidence, NOT secrecy and NOT a binding commitment. Returns the ratchet links. Boundary declared — theorem drift_is_named_or_caught.

### `open_chain` {#uuidna-open-chain}

**Open chain.** Returns [string].

Call `open_chain` — the old name `uuidna_open_chain` still answers · read-only · idempotent

```json
// arguments
{"passphrases":["theorem"],"links":[{"uuids":["e6f644ec-4474-8645-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222c22697","e68cae44-4746-8c60-9818-1818161139b0","e76c7422-3a22-84f3-9105-453d0d9de1e0","e7915b42-b35a-85a1-8a29-4d2d46ea27a7","e7488b08-9b9b-8db9-a365-223a222f5276","e6c2ec8a-d284-8f2c-a15b-8319c2928111","e6c22637-4223-8a22-9cdb-9318d18c11d6","e61a339e-9e91-8161-84e8-c2ce447444d8","e7ad4141-ad45-8e50-a523-42f434d53744","e7cf086e-6985-8682-9e9e-91161130b232","e6726573-7322-83a2-88d0-dcc8d0e0d0c1","e7296b13-119b-8096-a706-4c6cc5ac46c6","e64e4b59-8e4c-80dd-a261-313337363936","e6445844-e6ca-8e24-91d1-89c9c9a9c9c9","ab835303-5383-8434-8d4c-8c1f40000000"],"layers":1,"receipt":"97c0b728-8890-8dff-8760-3cb18b7cf325","referer":"717599de-9bf2-8bb2-9bbb-9855d3bee7f5","step":1995998505844520}]}
// answer (excerpt)
["theorem"]
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `links` | array | **yes** | uuidna_seal_chain output |
| `passphrases` | array | **yes** | the same passphrases the chain… |
| `genesis` | string | no |  |

Peel multiplies capacity by 1. Calendar 144 and Shor posture unlock on their own theorems — not as products of the ratchet peel. Each theorem unlocks.

## Contract-keyed messaging <Badge type="tip" :text="'5'" />

*skill: contract*

### `compute_contract` {#uuidna-contract}

**Compute contract.** Returns {contract,domain}.

Call `compute_contract` — the old name `uuidna_contract` still answers · read-only · idempotent

```json
// arguments
{"terms":"theorem"}
// answer (excerpt)
{"contract":"ec9e6641-989b-85de-aa57-58eedfea0d13","domain":"ec9e6641-989b-85de-aa57-58eedfea0d13.uuidna.org"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `terms` | string | **yes** | the contract text (the terms) —… |

The contract identity: content-address a contract TEXT to its [contract-uuid] and the domain that names it (&amp;lt;contract-uuid&amp;gt;.uuidna.org) — the domain IS the contract's address. This uuid is PUBLIC (routing, and a proof anyone holding the exact terms can recompute); the terms themselves are the private key. Same fold as uuidna_address, so the license is itself a contract. Returns {contract,domain}.

### `seal_contract` {#uuidna-contract-seal}

**Seal contract.** Returns {uuids,layers,receipt,contract}.

Call `seal_contract` — the old name `uuidna_contract_seal` still answers · read-only · idempotent

```json
// arguments
{"message":"theorem","terms":"theorem"}
// answer (excerpt)
{"uuids":["e6f644ec-4474-8625-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222c…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `message` | string | **yes** |  |
| `terms` | string | **yes** | the contract text — the private… |
| `step` | integer | no | advancing salt step (optional) |

Seal a message UNDER a contract: encrypt it with the contract text as the ChaCha20-Poly1305 key and tag the sealed uuid stream with the public [contract-uuid]. Only holders of the terms can open it. HONEST: confidentiality is EXACTLY the secrecy of the terms — a PUBLIC contract (e.g. the CC BY-NC license) gives NONE (sealed: complement_is_xor_key3, a fixed pad is public, not secret); a PRIVATE contract gives real secrecy. `step` freshens the salt so repeats never seal alike. Returns {contract,uuids,layers,receipt}. Boundary declared — theorem drift_is_named_or_caught.

### `open_contract` {#uuidna-contract-open}

**Open contract.** Returns string.

Call `open_contract` — the old name `uuidna_contract_open` still answers · read-only · idempotent

```json
// arguments
{"terms":"theorem","sealed":{"uuids":["e6f644ec-4474-8625-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222c22697","e68cae44-4746-8c60-9818-1818161139b0","e76c7422-3a22-8774-858d-51acd1e13924","e7a363a1-997b-83a5-8b2e-89eea70ce7a7","e7488b08-9b9b-8db9-a365-223a2236436f","e6d296e8-de66-886d-aba2-632aa312a911","e6c22637-4223-8a22-9b56-540c8c935458","e738b39e-9e91-8161-84e8-c2ce44744470","e6bd3d49-0dd1-8158-a6c6-82f6848564c6","e68a6e0c-e886-8cee-9e9e-91161130b232","e6726573-7322-83a2-8999-98d98d88dd85","e71169c9-ab0b-8196-a706-e6ac65ac2647","e64c0b4c-8d19-80c8-b135-613233346339","2044fa00-0000-8000-8000-000000000000"],"layers":1,"receipt":"6d493cce-613d-8213-b350-5d5ebb9b2b1b","contract":"ec9e6641-989b-85de-aa57-58eedfea0d13"}}
// answer (excerpt)
theorem
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `sealed` | object | **yes** | uuidna_contract_seal output |
| `terms` | string | **yes** | the terms string the contract w… |

INVOLUTE of uuidna_contract_seal: check terms→[contract-uuid], then decrypt (seal∘open = id). Wrong contract fails.

### `seal_contract_chain` {#uuidna-contract-chain}

**Seal contract chain.** Returns {contract,links}.

Call `seal_contract_chain` — the old name `uuidna_contract_chain` still answers · read-only · idempotent

```json
// arguments
{"messages":["theorem"],"terms":"theorem"}
// answer (excerpt)
{"contract":"ec9e6641-989b-85de-aa57-58eedfea0d13","links":[{"uuids":["e6f644ec-4474-8645-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `messages` | array | **yes** |  |
| `terms` | string | **yes** |  |

Seal a STREAM of messages under a contract as a forward-linked ratchet — each step ROTATED from the prior link's receipt (the referer sequence), all tagged with the [contract-uuid], seeded from it. HONEST: the rotation buys freshness, linkage and tamper-evidence, NOT extra secrecy (that is the ChaCha20-Poly1305 layer, keyed by the terms). Returns {contract,links}. Boundary declared — theorem drift_is_named_or_caught.

### `open_contract_chain` {#uuidna-contract-open-chain}

**Open contract chain.** Returns [string].

Call `open_contract_chain` — the old name `uuidna_contract_open_chain` still answers · read-only · idempotent

```json
// arguments
{"terms":"theorem","chain":{"contract":"ec9e6641-989b-85de-aa57-58eedfea0d13","links":[{"uuids":["e6f644ec-4474-8645-a113-0b633911d112","e6368614-3686-8132-8c0b-541bdb1e4c4c","e7981a91-1611-835b-88cc-447444a08496","e71118c8-b54d-8210-9323-536222c22697","e68cae44-4746-8c60-9818-1818161139b0","e76c7422-3a22-8505-a9e5-4534c4ad9199","e63ac2ab-7272-8cb4-8ec8-c8e82b0ce7a7","e7488b08-9b9b-8db9-a365-223a22346735","e6a06456-7288-8ac9-bbb2-73abc3536911","e6c22637-4223-8a22-9652-1a5253129bdd","e7b4209e-9e91-8161-84e8-c2ce447444c8","e6d59535-3561-8e5c-a686-b7654464f744","e728c929-8d2e-8a82-9e9e-91161130b232","e6726573-7322-83a2-8988-d98d9584c8e4","e7c96b31-b331-8b16-a706-2c6645a70ccc","e70d0b4e-0c98-88e4-b133-643132633565","e6445844-e6ca-8e24-91d1-91a199a1a9a1","ab932393-3303-8531-8c0c-4d9f40000000"],"layers":1,"receipt":"cf3746ad-6c2f-8d2f-be1c-80036c753b0f","referer":"8a635adc-cec8-8808-81a0-f4bfd1fca0a9","step":2434549293051016}]}}
// answer (excerpt)
["theorem"]
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `chain` | object | **yes** | uuidna_contract_chain output |
| `terms` | string | **yes** | the terms string the chain was… |

INVOLUTE of uuidna_contract_chain: verify terms + referer, decrypt each link (seal∘open = id). Broken link throws.

## Provenance audit (public text & metadata) <Badge type="tip" :text="'2'" />

*skill: books*

### `audit_details` {#uuidna-audit-details}

**Audit details.** Returns {title,address,details,dropped,controls,outcome,counts,…}.

Call `audit_details` — the old name `uuidna_audit_details` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
{"address":"ec9e6641-989b-85de-aa57-58eedfea0d13","details":1,"dropped":0,"controls":[{"control":"2 + 2 = 5","mustNotBe":["VERIFIED","EVALUATED_TRUE"],"got":"E…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | the document whose every detail… |
| `title` | string | no |  |
| `delimiter` | string | no | explicit detail boundary (for A… |

AUDIT EVERY SINGLE DETAIL of a text (offline, pure): deterministic split into sentence/line details, EACH adjudicated — sealed statements VERIFY, fresh arithmetic is evaluated (EVALUATED_TRUE/EVALUATED_FALSE), prose runs the citation trial; a fabricated citation DRAINS. Controls run FIRST; an accepted control VOIDS the audit (an instrument that cannot fail proves nothing). Folds to one order-invariant receipt. HONEST: integrity, not truth — verdicts settle arithmetic/citations, never the world; overflow past 729 details is counted in `dropped`. Returns {address,details,dropped,controls,outcome,counts,verdicts,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

THE GAP THIS CLOSES: auditText fingerprints a work as ONE blob, so a text "passes" while a single sentence inside it overclaims — and a detail-by-detail audit (the movie audit of 2026-08-22) had to be driven by hand, one uuidna_trial call per claim. This tool is that session folded into the surface. THE ROUTES, in order: (1) the quantum calculator (decide) — a detail matching a sealed theorem verbatim is VERIFIED by the kernel's prior decision; fresh arithmetic is decided totally under Lean's Nat semantics, so truth and falsehood wear different labels (EVALUATED_TRUE / EVALUATED_FALSE — the ONLY route to a negative; an evaluation, not a kernel verdict); terminal punctuation is stripped for the grammar only, the detail keeps its exact address. (2) prose — the citation trial (adjudicate): the relevance floor (a real citation about a disjoint topic verifies nothing) and the numeral-contradiction check; slimGate marks fabricated citations, each of which DRAINS. THE CONTROLS are pre-registered (trial-protocol): "2 + 2 = 5" must never read VERIFIED or EVALUATED_TRUE, a laundered real citation and a fabricated citation must not verify — controls are evaluated before the subject and returned in the result, so every audit carries the proof its instrument can fail; if any control passes the audit is VOID and adjudicates nothing (a void names the instrument, not the text). THE FOLD binds the text's address, every control outcome, and every detail's address WITH its verdict, through merkleGravity — order-invariant, so any observer recomputes the same receipt, and moving ONE verdict moves it.

### `audit_video` {#uuidna-audit-video}

**Audit video.** Returns a result.

Call `audit_video` — the old name `uuidna_audit_video` still answers · read-only · reaches outside · unreached

```json
// arguments
{"url":"theorem"}
// answer
video: oEmbed responded 503 for theorem
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `url` | string | **yes** | a YouTube watch URL or bare 11-… |
| `captions` | string | no | caption/transcript text to adju… |
| `delimiter` | string | no | detail boundary for the caption… |

Audit a PUBLIC video listing by URL or id: fingerprint its posted oEmbed metadata (title, channel — keyless), and when {captions} text is supplied, adjudicate EVERY caption detail with the controls-first detail audit, folded to one receipt. HONEST: the fingerprint proves WHICH listing, never that it is true; captions are caller-supplied DATA, never executed; the video itself is never fetched. Boundary declared — theorem drift_is_named_or_caught.

THE FOLD THIS IS: the Black Whole session (queue 79/transcript-audit) ran by hand — scratchpad curl for oEmbed, a hand-held transcript, a hand-driven detail audit; five receipts of manual work. This tool is that session folded into the surface, so the next video costs a call, not a session. The metadata is what the platform PUBLICLY POSTS via oEmbed — REPORTED data, content-addressed with auditText; caption endpoints require the platform's own authorization, so captions are SUPPLIED by the caller (that boundary is named, not smoothed over) and default to the newline delimiter — ASR captions carry no punctuation, the line is the honest detail boundary. The caption audit is the full uuidna_audit_details instrument: controls first (an accepted control VOIDS the audit), every detail adjudicated (sealed statements VERIFY, fresh arithmetic decides, prose runs the citation trial, a fabricated citation DRAINS), folded order-invariantly through merkleGravity. Verdicts settle arithmetic and citations, never the world (theorem provenance_integrity_not_content_truth). Returns the metadata audit + {videoId,author,authorUrl,provider,captions?}.

## Deep research & the evidence census (how well a claim is anchored) <Badge type="tip" :text="'7'" />

*skill: research*

### `compute_research` {#uuidna-research}

**Compute research.** Returns {address,compressed,losslessRoundTrip,entangledReceipt,novel,…}.

Call `compute_research` — the old name `uuidna_research` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
{"address":"ec9e6641-989b-85de-aa57-58eedfea0d13","compressed":["70e8d0ca-dee4-8cad-a800-000000000000"],"losslessRoundTrip":true,"entangledReceipt":"70e8d0ca-d…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** | the research text to press, ent… |
| `seenAddresses` | array | no | known content-addresses; a new… |

Deep research with the REVERSIBLE imprint codec: PRESS external research (text or a link's content) into a uuid chain and DECOMPRESS it back LOSSLESSLY (the round-trip proves it), bind the pressed pieces to the computable ENTANGLED algebra (the order-invariant fold), and report NOVELTY as content-address uniqueness — a never-seen address is novel CONTENT. uuidna fingerprints STRUCTURE and NOVELTY, it does NOT extract MEANING — provenance + structure, never hidden meaning; `meaning` is null by design, left to the reader. Returns {address,compressed,losslessRoundTrip,entangledReceipt,novel,meaning}. Boundary declared — theorem drift_is_named_or_caught.

### `open_leads` {#uuidna-open-leads}

**Open leads.** Returns {total,open,verified,refuted,unverified,items,decided,receipt,…}.

Call `open_leads` — the old name `uuidna_open_leads` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"total":21,"open":20,"verified":1,"refuted":0,"unverified":20,"items":[{"claim":"KEY_BITS names occupancy × fold (UUID_BITS × COINS) and occupancyTapeOf packs…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `items` | array | no | your backlog — each {claim, sou… |
| `limit` | integer | no | cap how many open items are ret… |

Adjudicate {items:[{claim,source?}]} against the sealed ledger; UNVERIFIED = open leads. Returns {open,items,receipt,honest}.

### `check_release_readiness` {#uuidna-leads-gate}

**Check release readiness.** Returns {sources,open,unmeasured,settled,asked,answered,ready,why,…}.

Call `check_release_readiness` — the old name `uuidna_leads_gate` still answers · read-only · idempotent

```json
// arguments
{"sources":[{"source":"theorem","reached":false,"why":"theorem","settled":1,"open":[{"source":"theorem","what":"theorem","owes":"theorem"}]}]}
// answer (excerpt)
{"sources":[{"source":"theorem","reached":false,"why":"theorem","settled":1,"open":[{"source":"theorem","what":"theorem","owes":"theorem"}]}],"open":[],"unmeas…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `sources` | array | **yes** | lead-source readings you gather… |

Release gate — pass {sources:[{source,reached,open,settled}]}; ready only when every source answered and no open leads. Returns {ready,open,receipt}.

### `open_questions` {#uuidna-open-questions}

**Open questions.** Returns {topics,open,total,curriculum,receipt,honest}.

Call `open_questions` — the old name `uuidna_open_questions` still answers · read-only · idempotent

```json
// arguments
{"items":[{"claim":"theorem","source":"theorem"}]}
// answer (excerpt)
{"topics":1,"open":1,"total":1,"curriculum":[{"topic":"open frontier","items":[{"claim":"theorem","source":"theorem","topic":"open frontier","involutions":[],"…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `items` | array | **yes** | your open claims |
| `limit` | integer | no | cap items per topic |

Group {items:[{claim,source?}]} by topic overlap with sealed theorems; UNVERIFIED = open. Returns {topics,open,receipt,honest}.

### `search_feed` {#uuidna-search-feed}

**Search feed.** Returns {meaning,results,leads,silent,receipt,handle,hexbits,door,coin,…}.

Call `search_feed` — the old name `uuidna_search_feed` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"meaning":null,"results":[{"query":"fifa world cup","source":"Similarweb global volume, FIFA World Cup 2026 knockout phase","key":"arity_admits_exactly_one_de…
```

_No parameters._

MOST-SEARCHED QUERIES RING THE LEDGER. Zero-arg: loud theorems are `/theorem/&amp;lt;key&amp;gt;` doors; silence and unsealed harvest are leads. Meaning is null. Returns {meaning,results,leads,silent,receipt,handle,door,honest}. Boundary declared — theorem drift_is_named_or_caught.

MOST-SEARCHED ONLINE FEEDS LEAN LEADS, WHICH FEED ONLINE RESULTS. The declared corpus (Similarweb / Year in Search) PLUS the wired public-API probes (research streams, EU education portals — ESCO, data.europa, CORDIS — MathOverflow unanswered math arrives on the online mill) ring the sealed ledger by resonance. Loud theorems are the ONLINE DOORS (`/theorem/&amp;lt;key&amp;gt;`). Silent queries and harvest decide() confirms but the ledger does not seal are LEADS the desk proposes — never auto-held, never auto-sealed. Meaning is null. Live titles ride searchFeedOnline / gen-search-feed --online (stdio + research desk), not this edge-safe floor. Same corpus, same receipt.

### `get_research_ledger` {#uuidna-research-ledger}

**Get research ledger.** Returns {filter,total,matched,census,kinds,anchoring,findings,gaps,…}.

Call `get_research_ledger` — the old name `uuidna_research_ledger` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"filter":{"status":null,"kind":null},"total":29,"matched":29,"census":{"read":26,"secondary":2,"unread":1,"refuted":0},"kinds":{"convention":5,"measured":24},…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `status` | string | no | optional filter: read \| seconda… |
| `kind` | string | no | optional filter: convention \| m… |

THE RESEARCH LEDGER — findings carrying their VERIFICATION STATUS as a field, not a sentence: `read` (primary source retrieved), `secondary` (a citing work reported it), `unread` (believed, unchecked), `refuted`; and `kind`, where a CONVENTION is exact by definition and a MEASUREMENT carries uncertainty. Two rules are applied per finding — only a `read` source may ANCHOR a theorem, and only a `read` CONVENTION may seal as an EQUALITY; everything measured seals as an integer BRACKET or not at all. Filter with {status} and {kind}; an unknown value is refused by name, and the census covers the WHOLE ledger even under a filter so no filter can flatter it. Returns {filter,total,matched,census,kinds,anchoring,findings,gaps,receipt,honest}. it reports how well a finding was VERIFIED, never whether it is true — `unread` is not "false", it is not-yet-checked. Boundary declared — theorem drift_is_named_or_caught.

THE RESEARCH LEDGER — findings carrying their VERIFICATION STATUS as a field instead of a sentence. Each finding records the claim, the value, the units and the source, and then the field that decides what may be done with it: `read` (the primary source was retrieved and the figure taken from its own text), `secondary` (a citing work reported it), `unread` (believed and unchecked), `refuted`. The second field is `kind`: a CONVENTION is exact by definition, a MEASUREMENT carries uncertainty. TWO RULES FALL OUT AND THE TOOL APPLIES THEM PER FINDING — only a `read` source may ANCHOR a theorem, and only a `read` CONVENTION may seal as an EQUALITY; everything measured seals as an integer BRACKET or as nothing at all. Filter with optional {status} and {kind}; an unknown value is refused by name rather than quietly matching nothing. The census is reported over the WHOLE ledger even under a filter, so no filter can flatter it, and the ledger states its own GAPS: an unread finding, a convention whose defining source was not read, two sources disagreeing about one value. this reports how well a finding was VERIFIED, never whether it is true — `unread` is not "false", it is not-yet-checked. Returns {filter,total,matched,census,kinds,anchoring,findings:[{claim,value,units,source,status,kind,note,address,anchorsTheorem,sealableAs,why}],gaps,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `get_verification_legs` {#uuidna-rosetta-legs}

**Get verification legs.** Returns {kind,tool,recompute,why}.

Call `get_verification_legs` — the old name `uuidna_rosetta_legs` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"kind":"contract","tool":"uuidna_rosetta_legs","recompute":false,"why":"the whole distribution is a sweep over the sealed ledger; pass {key} for one theorem o…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `recompute` | boolean | no | run the sweep now |
| `key` | string | no | a sealed theorem key |

THE INDEPENDENT-WITNESS CENSUS — how many of the five legs each sealed theorem carries: SYMBOL (the TypeScript mirror), PROOF (the kernel's `by decide`), WITNESS (a source outside this repo), FALSIFIER (a mutation that must FAIL), ADDRESS (the content fold). Symbol and proof share one hand's errors, so two legs DETECT a disagreement and three LOCATE the fault. Pass {key} for one theorem, nothing for the whole-ledger census. Returns {key,wing,legs,missing,claimedBy,canLocateFault,verdict} or {total,perLeg,scarcest,byLegCount,detectOnly,fullyAnchored,floor,floorGaps,receipt,honest}, each with {hostedMirror}. it MEASURES anchoring and certifies nothing — a missing leg is never a claim the theorem is false (witnesses_locate_faults). Boundary declared — theorem drift_is_named_or_caught. AN EMPTY CALL IS CHEAP: this is a sweep over the sealed ledger (seconds to tens of seconds, measured 2026-09-12), so it runs only when asked for by name — pass {recompute: true}; without it the reply is this contract and nothing is computed.

THE INDEPENDENT-WITNESS CENSUS — how many of the five legs each sealed theorem actually carries. SYMBOL is the TypeScript mirror the emitter cross-checks, PROOF is the kernel's `by decide` verdict, WITNESS is a source outside this repository a stranger could consult, FALSIFIER is a deliberate mutation that must FAIL (it tests the test), ADDRESS is the content fold that lets anyone recompute from the exact bytes. Symbol and proof are written by one hand and share that hand's errors, so a theorem carrying only those two can DETECT a disagreement and never LOCATE the fault — three is the count that locates one. Pass {key} for one theorem's legs and the verdict on them; pass nothing for the distribution across the whole ledger, the per-leg totals, the scarcest leg, the fully-anchored keys, the computed attribution, and the FLOOR the anchoring may never fall below. The scarce legs are the honest headline and are reported as they stand, never smoothed. An unknown key is refused by name. this MEASURES anchoring, it certifies nothing — proof and address are near-universal by construction and are not evidence about the world, and a missing leg is never a claim (witnesses_locate_faults: to LOCATE t faults needs 2t+1 witnesses, so two legs detect and three locate) that the theorem is false. Returns the per-key answer {key,wing,legs,missing,claimedBy,canLocateFault,verdict} or the census {total,perLeg,scarcest,byLegCount,detectOnly,fullyAnchored,claimedBy,floor,floorGaps,receipt,honest}, each with {hostedMirror} — the live comparison against the census the hosted edge answers from. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

## Rotation & cycles <Badge type="tip" :text="'5'" />

*skill: cycles*

### `compute_coprime` {#uuidna-coprime}

**Compute coprime.** Returns {gcd,coprime}.

Call `compute_coprime` — the old name `uuidna_coprime` still answers · read-only · idempotent

```json
// arguments
{"a":1,"b":1}
// answer (excerpt)
{"gcd":1,"coprime":true}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `a` | integer | **yes** |  |
| `b` | integer | **yes** |  |

gcd(a,b) and whether a and b are coprime (gcd = 1). Coprimality is what makes a step permute ℤ/n — visiting every point in one stroke — and what fuses moduli (CRT). Mirrors the sealed circle_of_fifths and trinity_rosette_coprime. Returns {gcd,coprime}.

### `get_pentagram` {#uuidna-pentagram}

**Get pentagram.** Returns {n,step,stroke,single,loops,proof}.

Call `get_pentagram` — the old name `uuidna_pentagram` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"n":5,"step":2,"stroke":[0,2,4,1,3],"single":true,"loops":1,"proof":{"verdict":"VERIFIED","theorem":"pentagram_single_stroke","address":"f0e7d443-bfb3-8faa-9b…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `n` | integer | no | points (default 5) |
| `step` | integer | no | stride (default 2 — the pentagr… |

The star polygon {n/step}: the stroke visiting (step·k mod n). A SINGLE closed stroke covering all n points iff gcd(step,n)=1, else it splits into gcd shorter loops. Default {5/2} is the pentagram — [0,2,4,1,3], one stroke (sealed: pentagram_single_stroke). Returns {n,step,stroke,single,loops}.

### `get_fibonacci` {#uuidna-fibonacci}

**Get fibonacci.** Returns {mod,period,cycle}.

Call `get_fibonacci` — the old name `uuidna_fibonacci` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"mod":9,"period":24,"cycle":[0,1,1,2,3,5,8,4,3,7,1,8,0,8,8,7,6,4,1,5,6,2,8,1]}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `mod` | integer | no | the modulus (default 9 — the si… |

The single-digit Fibonacci sequence mod m and its Pisano period, the cycle back to the seed (0,1). m=9 → period 24 (the digital-root Fibonacci); m=5 → 20 (pentagram); m=7 → 16 (rosette). Mirrors the sealed fib_single_digit_cycle_24 and siblings. Returns {mod,period,cycle}.

### `rotate_sequence` {#uuidna-rotate}

**Rotate sequence.** Returns {rotated,strands,strandLength,covers}.

Call `rotate_sequence` — the old name `uuidna_rotate` still answers · read-only · idempotent

```json
// arguments
{"list":["theorem"],"stride":1}
// answer (excerpt)
{"rotated":["theorem"],"strands":1,"strandLength":1,"covers":true}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `list` | array | **yes** |  |
| `stride` | integer | **yes** |  |

Rotate a list cyclically by `stride` and report its strand structure over ℤ/n: gcd(stride,n) strands of n/gcd each; `covers` is true when one strand visits every element (gcd=1) — the closed cover the cross-link compass derives. Returns {rotated,strands,strandLength,covers}.

### `compute_crt` {#uuidna-crt}

**Compute crt.** Returns {x,mod}.

Call `compute_crt` — the old name `uuidna_crt` still answers · read-only · idempotent

```json
// arguments
{"a":1,"m":1,"b":1,"n":1}
// answer (excerpt)
{"x":0,"mod":1}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `a` | integer | **yes** |  |
| `m` | integer | **yes** |  |
| `b` | integer | **yes** |  |
| `n` | integer | **yes** |  |

The Chinese remainder solution: for COPRIME moduli m,n the unique x in [0, m·n) with x ≡ a (mod m) and x ≡ b (mod n) — the bijection ℤ/mn ≅ ℤ/m × ℤ/n (e.g. ℤ/21 ≅ ℤ/3 × ℤ/7, the trinity fused to the rosette). Non-coprime moduli throw. Returns {x,mod}.

## Crypto primitives <Badge type="tip" :text="'8'" />

*skill: crypto*

### `compute_sha256` {#uuidna-sha256}

**Compute sha256.** Returns string.

Call `compute_sha256` — the old name `uuidna_sha256` still answers · read-only · idempotent

```json
// arguments
{"text":"theorem"}
// answer (excerpt)
cc7a8a13032ef578574fb8fe633843afd53af5b8b632aef933c901524dc1c1a5
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `text` | string | **yes** |  |

The CRYPTOGRAPHIC hash of text — SHA-256 (local theorem: Merkle–Damgård, KAT-verified). Collision-resistant by pigeonhole (2^256 seats). Distinct from uuidna_address, whose FNV fold is fast but NOT cryptographic.

### `compute_hmac` {#uuidna-hmac}

**Compute hmac.** Returns string.

Call `compute_hmac` — the old name `uuidna_hmac` still answers · read-only · idempotent

```json
// arguments
{"key":"mul9_1_1","message":"theorem"}
// answer (excerpt)
c27cc90c6c24fc296a8ae87b2c27c9dd2d01e3c7e6abd76b72993f62a5de2375
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** |  |
| `message` | string | **yes** |  |

Keyed authentication — HMAC-SHA256 (local theorem, KAT-verified): a MAC, existentially unforgeable under the PRF assumption. key and message are UTF-8; returns a 32-byte hex tag.

### `compute_pbkdf2` {#uuidna-pbkdf2}

**Compute pbkdf2.** Returns string.

Call `compute_pbkdf2` — the old name `uuidna_pbkdf2` still answers · read-only · idempotent

```json
// arguments
{"passphrase":"theorem","salt":"theorem"}
// answer (excerpt)
a5ae13ffe684a00f029ec11175b6bd4b19152e728c0b431959f93c46a517ad51
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `passphrase` | string | **yes** |  |
| `salt` | string | **yes** |  |
| `iterations` | number | no |  |
| `length` | number | no |  |

Passphrase key-stretching — PBKDF2-HMAC-SHA256 (local theorem). Work factor = iterations (default 600000, OWASP 2023). passphrase and salt are UTF-8; returns a length-byte hex key (default 32).

### `compute_chacha20` {#uuidna-chacha20}

**Compute chacha20.** Returns string.

Call `compute_chacha20` — the old name `uuidna_chacha20` still answers · read-only · idempotent

```json
// arguments
{"key":"abababababababababababababababababababababababababababababababab","nonce":"abababababababababababab","text":"theorem"}
// answer (excerpt)
8d446e40d64e1f
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** | 32-byte hex |
| `nonce` | string | **yes** | 12-byte hex |
| `counter` | number | no |  |
| `text` | string | **yes** |  |

ChaCha20 keystream cipher, RFC 8439 ARX permutation. Returns hex of text ⊕ keystream; key is 32-byte hex, nonce 12-byte hex, counter defaults to 0. CAVEAT (): NEVER reuse a (key, nonce, counter) — keystream reuse destroys confidentiality. For passphrase secrecy use uuidna_encrypt.

### `compute_poly1305` {#uuidna-poly1305}

**Compute poly1305.** Returns string.

Call `compute_poly1305` — the old name `uuidna_poly1305` still answers · read-only · idempotent

```json
// arguments
{"message":"abababababababababababababababababababababababababababababababab","oneTimeKey":"abababababababababababababababababababababababababababababababab"}
// answer (excerpt)
0a982006ad6c96329e834ea1d1dc4852
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `message` | string | **yes** | hex |
| `oneTimeKey` | string | **yes** | 32-byte hex |

Poly1305 one-time authenticator (local theorem: exact arithmetic mod the prime 2^130−5). message and one-time key are hex (the key is 32 bytes); returns a 16-byte hex tag. CAVEAT (): a one-time key authenticates exactly ONE message — never reuse it.

### `encrypt_aead` {#uuidna-aead-encrypt}

**Encrypt aead.** Returns {ct,tag}.

Call `encrypt_aead` — the old name `uuidna_aead_encrypt` still answers · read-only · idempotent

```json
// arguments
{"key":"abababababababababababababababababababababababababababababababab","nonce":"abababababababababababab","plaintext":"theorem"}
// answer (excerpt)
{"ct":"4a4f328955166a","tag":"0d158e4d505c37173beb7eb635d10a1d"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** | 32-byte hex |
| `nonce` | string | **yes** | 12-byte hex |
| `plaintext` | string | **yes** | utf-8 text to seal |
| `aad` | string | no | optional hex |

Raw ChaCha20-Poly1305 AEAD seal (local theorem, RFC 8439): returns {ct,tag} as hex. key 32-byte hex, nonce 12-byte hex, plaintext UTF-8, optional aad hex. CAVEAT (): a (key, nonce) pair must be unique. For passphrase secrecy + a routable envelope use uuidna_encrypt.

### `decrypt_aead` {#uuidna-aead-decrypt}

**Decrypt aead.** Returns string.

Call `decrypt_aead` — the old name `uuidna_aead_decrypt` still answers · read-only · idempotent

```json
// arguments
{"key":"abababababababababababababababababababababababababababababababab","nonce":"abababababababababababab","ct":"56423b8a48","tag":"1154014a7ee17d84462eb8423d412b37"}
// answer (excerpt)
hello
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | **yes** |  |
| `nonce` | string | **yes** |  |
| `ct` | string | **yes** |  |
| `tag` | string | **yes** |  |
| `aad` | string | no | optional hex |

Verify + open a raw ChaCha20-Poly1305 seal (local theorem). key/nonce/ct/tag are hex, optional aad hex; returns the UTF-8 plaintext. A wrong key or any tamper throws (Poly1305 authentication).

### `get_crypto` {#uuidna-crypto}

**Get crypto.** Returns {definition,wireDoors,doors,widths,pqc,total,origins,via,shown,…}.

Call `get_crypto` — the old name `uuidna_crypto` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"definition":"mcp·uuidna_crypto·alpine-apps-using-crypto","wireDoors":1,"doors":["uuidna_sha256","uuidna_hmac","uuidna_pbkdf2","uuidna_chacha20","uuidna_poly1…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `name` | string | no | one Alpine package, e.g. openss… |

Alpine crypto apps through one door: catalogue plus Shor/Grover/SHA-256/ChaCha widths. Optional {name}. Integrity, not execution.

THE CAPTAIN ORDER to port Alpine apps that use crypto, without blowing the MCP wire ceiling. uuidna_exec already carries the whole man corpus through one door; this door is the crypto cut of that catalogue: a package is admitted when it IS a crypto library, its Alpine description matches the security harmony, it links so:libssl/libcrypto (nginx), or it depends on such a package by name (curl → libcurl). Each hit is a uuidna/&amp;lt;name&amp;gt; identity with 32 hexbit states — provenance, never Alpine ELF (theorem the_os_is_bootable_quantum). The uuidna-side port of those libraries is the existing primitive tools (SHA-256, HMAC, PBKDF2, ChaCha20, Poly1305, AEAD, envelope/onion/chain). widths is one crypto analysis: Shor 32-bit/128-bit modulus fit and encoder-width chunks, Grover floor = one uuid, digest/key = 256, nonce 96, salt/tag 128, birthday halves on the address and the digest. Sample of 24 by name; {name} for any row. Relates to uuidna_os, uuidna_exec, uuidna_related, uuidna_security_audit.

## Vortex algebra <Badge type="tip" :text="'7'" />

*skill: algebra*

### `get_units` {#uuidna-units}

**Get units.** Returns [integer].

Call `get_units` — the old name `uuidna_units` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
[1,2,4,5,7,8]
```

_No parameters._

The six units of ℤ/9 — {1,2,4,5,7,8}, the invertible residues (3 and 6 are zero-divisors, 9≡0). The harmonic solutions the fold moves through. Returns the array.

### `get_triad` {#uuidna-triad}

**Get triad.** Returns [integer].

Call `get_triad` — the old name `uuidna_triad` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
[3,6,9]
```

_No parameters._

The triad {3,6,9} — the non-units of ℤ/9 (the complement of the six units): the nilpotents 3,6 (a²≡0) and the void 9≡0. The still axis the vortex turns around. Returns the array.

### `get_vortex` {#uuidna-vortex}

**Get vortex.** Returns [integer].

Call `get_vortex` — the old name `uuidna_vortex` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
[1,2,4,8,7,5]
```

_No parameters._

The doubling circuit 1→2→4→8→7→5 — the vortex orbit of the units under ×2 mod 9, the DNA of the fold (5→1 closes the loop). Returns the array.

### `compute_double_torus` {#uuidna-double-torus}

**Compute double torus.** Returns {dims,root}.

Call `compute_double_torus` — the old name `uuidna_double_torus` still answers · read-only · idempotent

```json
// arguments
{"addresses":["theorem"]}
// answer (excerpt)
{"dims":["f52d81d6-c062-877d-8843-c1acb49a1d3d","7973b210-96e8-89ba-81fb-87f381615f61","1c67a578-0d4b-8ba5-8161-c1b3b12859a2","5f7f189b-4cc5-81bc-a489-63765e6d…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `addresses` | array | **yes** |  |

The double-torus 7D field of a set of addresses: the doubling vortex and its reverse rotate the set; at each of the 7 dimensions the two fold together, and the seven dimension-roots fold to ONE. Order-DEPENDENT (the sequence is the signal) — use uuidna_gravity for an order-invariant receipt. Returns {dims,root}.

### `compute_diamond` {#uuidna-diamond}

**Compute diamond.** Returns integer.

Call `compute_diamond` — the old name `uuidna_diamond` still answers · read-only · idempotent

```json
// arguments
{"d":1}
// answer (excerpt)
9
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `d` | number | **yes** | a digit 1..9 |

The diamond involution r(d)=10−d on a digit 1..9: self-inverse (diamond(diamond(d))=d), with the unique fixed point 5 — the heart where mint meets mind. Returns the reflected digit.

### `compute_involution` {#uuidna-involute}

**Compute involution.** Returns {pairs,fixed}.

Call `compute_involution` — the old name `uuidna_involute` still answers · read-only · idempotent

```json
// arguments
{"items":["theorem"]}
// answer (excerpt)
{"pairs":[["theorem","theorem"]],"fixed":["theorem"]}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `items` | array | **yes** |  |

Lift the diamond involution to a list: pair each element with its mirror across the centre (total, closed, self-inverse). An odd list has exactly one fixed centre; an even list none. Returns {pairs,fixed}.

Same shape as seal↔open on uuid streams and as singular↔plural on MCP parameter stems (tool-scope numberInvolute). Each theorem unlocks what it seals — this tool only pairs list mirrors.

### `compute_seats` {#uuidna-seats}

**Compute seats.** Returns integer.

Call `compute_seats` — the old name `uuidna_seats` still answers · read-only · idempotent

```json
// arguments
{"bits":1}
// answer (excerpt)
2
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `bits` | number | **yes** |  |

The pigeonhole seat bound: a b-bit digest has 2^b distinct seats, so past 2^b inputs a collision is forced — true for EVERY finite hash (the strong ones only resist finding one computationally). Returns 2^bits.

## Living field <Badge type="tip" :text="'8'" />

*skill: sequence*

### `compute_zero_division` {#uuidna-through-void}

**Compute zero division.** Returns integer.

Call `compute_zero_division` — the old name `uuidna_through_void` still answers · read-only · idempotent

```json
// arguments
{"d":1}
// answer (excerpt)
9
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `d` | number | **yes** | digit 0..9 |

Mirror through the void — throughVoid(d)=1−d mod 9 on 1..9, void 0 fixed; involution fixed only at 5 (mirror_fixed_five). Returns the mirrored digit.

### `run_sequence` {#uuidna-run-sequence}

**Run sequence.** Returns {input,kind,address,seed,reflection,fixed,polarity,orbit,…}.

Call `run_sequence` — the old name `uuidna_run_sequence` still answers · read-only · idempotent

```json
// arguments
{"input":1}
// answer (excerpt)
{"input":"1","kind":"number","address":null,"seed":1,"reflection":9,"fixed":false,"polarity":"minus","orbit":[0,1,9],"visited":[0,1,9],"period":0,"covers":fals…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `input` | number,string | **yes** | number or text to fold |
| `steps` | number | no | max alternation steps (default… |

Walk ANY input through the ℤ/9 executor — dz and doubling alternated, period and polarity measured (ten-digit domain: 9 is plus, not void). Returns {input,seed,reflection,polarity,orbit,visited,period,covers,...}.

### `get_living_field` {#uuidna-living-field}

**Get living field.** Returns {sealTen,stripForward,stripReflected,stroke,dash,reflection,…}.

Call `get_living_field` — the old name `uuidna_living_field` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"sealTen":[0,1,2,4,8,7,5,3,6,9],"stripForward":"124875369","stripReflected":"986235741","stroke":{"ok":true,"count":4,"facets":[{"facet":"written cycle","on":…
```

_No parameters._

The living field 1\2\4\8/7/5/3\6\9/0\1 — stroke, dash decode, reflection, tour seams, invariant gate. Computed from sequence-field.ts; proofs in lean/Sequence.lean. Returns the full report.

### `get_vortex_reflection` {#uuidna-vortex-reflection}

**Get vortex reflection.** Returns {valid,forward,reflected,strokeForward,strokeReflected,…}.

Call `get_vortex_reflection` — the old name `uuidna_vortex_reflection` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"valid":true,"forward":[1,2,4,8,7,5,3,6,9],"reflected":[9,8,6,2,3,5,7,4,1],"strokeForward":"1\\2\\4\\8/7/5 · 3\\6\\9 · 0\\1","strokeReflected":"9/8/6/2\\3\\5 …
```

_No parameters._

One structure read twice — foldVortexReflection: mirror pairs, orbit/axis exchange, ⟨D,M⟩ order 54, commutator shift. Returns {valid,forward,reflected,groupOrder,excess,...}.

### `decode_vortex_dash` {#uuidna-vortex-dash}

**Decode vortex dash.** Returns {encoded,closes,fusionIgnites,vortexMatches,weightedBearing,…}.

Call `decode_vortex_dash` — the old name `uuidna_vortex_dash` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"encoded":"1\\2\\4\\8/7/5/3\\6\\9/0/1\\","closes":true,"fusionIgnites":true,"vortexMatches":true,"weightedBearing":0,"steps":[{"step":0,"digit":1,"dash":"\\",…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `encoded` | string | no | dash-encoded stroke (default li… |

Decode the ±60° dash stroke — weighted bearing closes at 0 when fusionIgnites (angles_close). Returns {closes,fusionIgnites,weightedBearing,steps,...}.

### `get_vortex_tour` {#uuidna-vortex-tour}

**Get vortex tour.** Returns {tour,steps,seams,seamCount}.

Call `get_vortex_tour` — the old name `uuidna_vortex_tour` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"tour":[1,2,4,8,7,5,3,6,0],"steps":[{"from":1,"to":2,"carries":true},{"from":2,"to":4,"carries":true},{"from":4,"to":8,"carries":true},{"from":8,"to":7,"carri…
```

_No parameters._

Walk the lean/Sequence.lean tour with carries9 carry rules — seams_two expects exactly 2 seams (5→3, 0→1). Returns {tour,steps,seams,seamCount}.

### `compute_vortex_invariants` {#uuidna-vortex-invariants}

**Compute vortex invariants.** Returns {hold}.

Call `compute_vortex_invariants` — the old name `uuidna_vortex_invariants` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"hold":true}
```

_No parameters._

README gateway boolean — living field stroke, dash closes, foldVortex and reflection valid, development vortex computes. false ⇒ restore gateway seals.

### `get_development_vortex` {#uuidna-development-vortex}

**Get development vortex.** Returns {wave,lobeL,lobeR,throat,stroke,vortex,dash,ok,count,facets,…}.

Call `get_development_vortex` — the old name `uuidna_development_vortex` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"wave":"edit","lobeL":"ea830d8d-bc91-89b9-b44b-15d2212420de","lobeR":"bc513af0-2609-8fe9-82dc-5263700ef327","throat":{"forward":"5420cfc7-ce52-820b-a822-29b60…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `wave` | string | no | origin\|decode\|design\|learn\|tune… |

Double-torus development throat — uuidna ledger ↔ zeropoint-node lobe fold per wave phase. Returns {wave,lobeL,lobeR,throat,stroke,vortex,dash,computes,root}.

## Decoded Sequence + Rosetta + life <Badge type="tip" :text="'1'" />

*skill: measure*

### `decode_theorem` {#uuidna-decode}

**Decode theorem.** Returns {polarities,angles,sequence,rosetta,life,genesis,audit,fused}.

Call `decode_theorem` — the old name `uuidna_decode` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"polarities":{"minus":28512,"neutral":14119,"plus":28387,"capacity":{"minus":4,"neutral":2,"plus":4},"byRay":[{"ray":0,"minus":4105,"neutral":2001,"plus":4055…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `key` | string | no | optional theorem key — decode o… |

DECODED uuidna — one recomputable door: runSequence polarities on every theorem address, ±60° dash angles, 360/7° rosetta rays, uuidnaOS boot ground (four widths + boot receipt), living ledger, latent wing axioms and reveal gap, genesis chain, axiom-balance ratios. Pass {key} for one theorem through Sequence + Rosetta. Nothing authored — all read off sealed facts. Returns full decode or one DecodedTheorem row. Pairs with uuidna_analytics audit field and measure uuidna-decode.

## Publications (audited prose) <Badge type="tip" :text="'4'" />

*skill: publish*

### `publish_article` {#uuidna-publish}

**Publish article.** Returns [{slug,file,title,theorems,publishable,receipt,address,…}].

Call `publish_article` — the old name `uuidna_publish` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
[{"slug":"core","file":"Core.lean","title":"The 8×8 core","theorems":64,"publishable":true,"receipt":"5fc407ea-3aa3-84a1-bc47-3c1fe4c92241","address":"240edb19…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `file` | string | no | a lean/*.lean file name, e.g. |

Write a PUBLICATION in lean human prose about ONE domain, AUDITED before publishing. Composed by READING that domain's sealed theorems and writing only what they settle — every claim links the proof that backs it — then gated by uuidna's own honesty audit; a note that cites a proof not in the ledger is REFUSED, not shipped. Call with no argument to list every domain's publication (slug + count + publishable + receipt), or with `file` (e.g. "Tides.lean", from uuidna_theorems) to get that note's full markdown, content-address, member proofs and audit findings. Writing descends from reading; integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

### `edit_publication` {#uuidna-edit}

**Edit publication.** Returns {address,publishable,findings,chars,honest}.

Call `edit_publication` — the old name `uuidna_edit` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"address":"ab3e7c0b-4a21-8c31-a6a2-23155325ebb2","publishable":true,"findings":[],"chars":0,"honest":"The gate flags any sentence that leans on an overreach t…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `draft` | string | no | prose to audit + content-addres… |
| `before` | string | no | the prose before an edit (pair… |
| `after` | string | no | the prose after an edit (pair w… |

The EDITOR primitive — audit a draft, or a revision, BEFORE publishing. With `draft` alone: content-address the prose and run uuidna's honesty gate, returning its address and any claim that overreaches a proof (unbacked by a /theorem/ link and undemarcated) — write, see it audited, before it ships. With BOTH `before` and `after`: audit the EDIT — both drafts content-addressed (the change is visible because the address moves), bound by a directional before→after receipt, the after-draft gated. Editing is re-addressing; a revision earns publication the same way a first draft does. Nothing is stored. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

### `get_vocabulary` {#uuidna-vocabulary}

**Get vocabulary.** Returns {terms,count,clean,flagged,trinities,trinityRoots,receipt,…}.

Call `get_vocabulary` — the old name `uuidna_vocabulary` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"terms":[{"term":"8×8 core","kind":"domain","definition":"the multiplication table of ℤ/9's eight non-zero residues — from these 64 the rest computes","theore…
```

_No parameters._

The COMMON, COMPUTABLE vocabulary derived from every theorem and its domain — each term (a domain or a capability) defined by the sealed ledger, self-audited by the honesty gate, content-addressed, and folded (in trinities) to ONE recomputable receipt: the honest "all is one" — one receipt, integrity, NOT a metaphysical singularity. Maps each domain to the STANDARDS it formalizes or references (RFC 8439, ISBN/ISO 2108, SMPTE, Nyquist–Shannon …) — a citation, never a compliance claim. Translation-ready: a translation binds to a term by a provenance receipt. Deterministic and recomputable by anyone. Boundary declared — theorem drift_is_named_or_caught.

### `compare_publications` {#uuidna-compare}

**Compare publications.** Returns {onlyA,onlyB,shared,union,inclusionExclusion,similarity,…}.

Call `compare_publications` — the old name `uuidna_compare` still answers · read-only · idempotent

```json
// arguments
{"a":"theorem","b":"theorem"}
// answer (excerpt)
{"onlyA":0,"onlyB":0,"shared":1,"union":1,"inclusionExclusion":true,"similarity":{"num":1,"den":1},"pattern":"ec9e6641-989b-85de-aa57-58eedfea0d13","honest":"S…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `a` | string | **yes** |  |
| `b` | string | **yes** |  |

PATTERN RECOGNITION — recognise the pattern two texts share by examining how they DIFFER. Partitions their word sets into only-A, only-B and shared; the similarity (Jaccard: shared over the union) is DERIVED from that difference, and inclusion–exclusion (|A| + |B| − shared = union) is checked exactly, so the number is a proof, not an estimate. The shared tokens fold to one order-invariant receipt — the recognised pattern. Similarity is only ever measured against difference. Compares vocabulary, NOT meaning; nothing is stored. Integrity, not truth (theorem provenance_integrity_not_content_truth).

## Legal fact base & prior art (not an opinion) <Badge type="tip" :text="'2'" />

*skill: legal*

### `compute_prior_art` {#uuidna-prior-art}

**Compute prior art.** Returns {exhibits,missing,author,license,ledger,address,receipt,…}.

Call `compute_prior_art` — the old name `uuidna_prior_art` still answers · read-only · idempotent

```json
// arguments
{"keys":["theorem"]}
// answer (excerpt)
{"exhibits":[],"missing":["theorem"],"author":"Tsvetan Rouschev (ceccec@psg.bg)","license":{"spdx":"CC-BY-NC-ND-4.0","address":"9ffcda04-5adc-872e-9358-6b831bb…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `keys` | array | **yes** |  |

Mint an IN-HOUSE defensive-publication record for the named theorems ({keys:[...]}) — a self-contained, recomputable manifest of WHAT was published (each theorem in full, statement + proof), by WHOM (attribution), under WHAT terms (CC BY-NC-ND 4.0 + its address), bound to the ledger receipt, folded to one content-address any change moves. Zero external dependency. THE ONE HONEST LIMIT: the WHEN is NOT in-house — a self-signed date is worthless for priority; it names the external anchor to cite (the public git commit on GitHub, a Zenodo DOI, or an RFC 3161 timestamp authority) and fakes nothing. Proves what/who/integrity/terms; not when, and not that the result is law or standard. Boundary declared — theorem drift_is_named_or_caught.

### `get_legal_facts` {#uuidna-legal-facts}

**Get legal facts.** Returns {disclaimer,license,ledger,complianceStance,rightsAsserted,…}.

Call `get_legal_facts` — the old name `uuidna_legal_facts` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"disclaimer":"THIS IS NOT A LEGAL AUDIT, LEGAL ADVICE, OR A COMPLIANCE OPINION, and must not be presented as one. It is a recomputable inventory of legally-re…
```

_No parameters._

The recomputable legal FACT BASE, in chat — explicitly NOT a legal audit, legal advice, or a compliance opinion, and it must not be presented as one. Gathers the legally-relevant facts a qualified attorney/auditor starts FROM: the licence (CC BY-NC-ND 4.0 + its content-address), the copyright/attribution (Tsvetan Rouschev), the ledger's tamper-evident receipt, the compliance STANCE (the project makes no compliance claim and its own forensics refuses a blanket one), and the standards it CITES (not certifies) — folded to one receipt anyone recomputes. The inputs, never the verdict; a real legal audit needs licensed counsel reviewing specific jurisdictions against the actual deployment. uuidna delivers what recomputes; the ruling is a human's. Boundary declared — theorem drift_is_named_or_caught.

## Reflection (systems ↔ theorems) <Badge type="tip" :text="'1'" />

*skill: reflects*

### `compute_reflects` {#uuidna-reflects}

**Compute reflects.** Returns {query,concepts,matches,count,peak,spectrum,receipt,honest}.

Call `compute_reflects` — the old name `uuidna_reflects` still answers · read-only · idempotent

```json
// arguments
{"query":"theorem"}
// answer (excerpt)
{"query":"theorem","concepts":["theorem"],"matches":[{"key":"a440_drift_is_heard","title":"THE HUMAN EFFECT OF THE CONCERT-PITCH DRIFT (captain","skill":"wave"…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `query` | string | **yes** | a system described by its devic… |

Reveal the sealed theorems a real-world system ALREADY reflects. Describe a system by its devices and concepts (e.g. home security: "keypad code tamper sensor detect alarm zone parity layered defence signature encryption schedule") and it matches those concepts against the ledger, returning the EXISTING `by decide` theorems whose arithmetic the system rests on — folded to one receipt. HONEST: the theorems already exist and were proven for their own domain; this shows the SAME arithmetic recurs — it does NOT claim uuidna is that system, that the theorems were built for it, or that citing them makes the system secure/correct. A resemblance the ledger carries, recomputable by anyone. Boundary declared — theorem drift_is_named_or_caught.

## The gate of all gates (theorems only) <Badge type="tip" :text="'1'" />

*skill: gate*

### `check_citations_slim` {#uuidna-slim-gate}

**Check citations slim.** Returns {claim,cited,real,fabricated,verdict,receipt,honest}.

Call `check_citations_slim` — the old name `uuidna_slim_gate` still answers · read-only · idempotent

```json
// arguments
{"claim":"theorem"}
// answer (excerpt)
{"claim":"theorem","cited":[],"real":[],"fabricated":[],"verdict":"UNVERIFIED","receipt":"a76b0146-1a98-8e08-9b99-80d4bdbaabb6","honest":"No lexicon: the verdi…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `claim` | string | **yes** |  |

The gate of all gates, as slim as it gets: ONLY theorems, no lexicon. Judges a {claim} by ONE recomputable question — do the theorems it cites (/theorem/&amp;lt;key&amp;gt;) actually exist, sealed, in the ledger? VERIFIED iff it cites a real sealed theorem and none fabricated; UNVERIFIED otherwise (cites none, or cites a proof not in the ledger — which verifies nothing; never "false"). The `fabricated` list is still returned so the publish gate can refuse shipping a note that names a nonexistent proof. Computed from the sealed ledger alone; delete every word-list and it still stands.

## Reasoning (in-house inference) <Badge type="tip" :text="'1'" />

*skill: reason*

### `reason_question` {#uuidna-reason}

**Reason question.** Returns {given,derived,trace,rounds,reachedFixpoint,unusedFacts,…}.

Call `reason_question` — the old name `uuidna_reason` still answers · read-only · idempotent

```json
// arguments
{"facts":["theorem"],"rules":[{"if":["theorem"],"then":"theorem"}]}
// answer (excerpt)
{"given":["theorem"],"derived":[],"trace":[],"rounds":1,"reachedFixpoint":true,"unusedFacts":["theorem"],"dormantRules":1,"contradictions":[],"consistent":true…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `facts` | array | **yes** |  |
| `rules` | array | **yes** |  |

IN-HOUSE reasoning that USES the sealed rules of inference. Give {facts:[atoms], rules:[{if:[atoms],then:atom}]} and it forward-chains to a fixpoint: whenever every premise of a rule is known it concludes the head by MODUS PONENS (or the hypothetical syllogism for a chain), CITING the sealed theorem at each step. Bounded (cannot loop forever), deterministic, and folds the whole derivation to one receipt anyone rechecks. If the rules license an atom AND its negation it concludes both — forward chaining is monotone and cannot retract — so the pair is NAMED in {contradictions} and {consistent} goes false; from an inconsistent set every later conclusion is equally derivable, which a caller must know before reading the trace as support. Honest scope: bounded propositional forward-chaining over the rules you give — NOT a general theorem prover; it derives only what those rules entail, and never claims a conclusion is TRUE, only that it FOLLOWS. Negation is recognised SYNTACTICALLY (not_x or ¬x beside x): a rule set spelling negation another way is not checked, and silence there is not consistency. Boundary declared — theorem drift_is_named_or_caught.

The argument in court — theorem court_theorem_beats_assertion: only the proof is admissible — NOT an order to act or refrain. The court issues the mandate (courtProcedure / uuidna_due_process); the loser develops the proven (court_loser_develops_the_proven). It proves a point UNINTERRUPTED from the rules given, never a command.

## Forensics & evidence (statements vs receipts) <Badge type="tip" :text="'2'" />

*skill: forensics*

### `compute_forensics` {#uuidna-forensics}

**Compute forensics.** Returns {statement,address,verdict,violations,clean,receipt,honest}.

Call `compute_forensics` — the old name `uuidna_forensics` still answers · read-only · idempotent

```json
// arguments
{"statement":"theorem"}
// answer (excerpt)
{"statement":"theorem","address":"ec9e6641-989b-85de-aa57-58eedfea0d13","verdict":"UNVERIFIED","violations":[],"clean":true,"receipt":"43192bf8-4c3e-801f-a9a9-…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | **yes** |  |
| `claims` | array | no |  |

FORENSICS — audit an agent STATEMENT against the RECEIPTS, to catch a FALSE TRIAL (a claim dressed as sealed that the ledger does not back). Recomputes and compares, detecting: a fabricated citation (cites a /theorem/&amp;lt;key&amp;gt; not in the sealed ledger), a false address (a uuid presented as a sealed address that is not one), a drained overclaim (the honesty gate), an unbacked legal claim (says lawful/compliant but carries no receipt — a legal claim must cite the specific content-addressed statement; the receipt proves the claim was made, NEVER that it is legally correct), and an address-mismatch (a {text→address} claim that does not recompute). Every violation is a recomputable fact about the CLAIM, never an accusation of a person. Pass {statement} and optional {claims:[{text,address}]}. Boundary declared — theorem drift_is_named_or_caught.

### `fetch_evidence` {#uuidna-evidence}

**Fetch evidence.** Returns {statement,address,verdict,forensics,exhibits,citedButMissing,…}.

Call `fetch_evidence` — the old name `uuidna_evidence` still answers · changes state · reaches outside

```json
// arguments
{}
// answer (excerpt)
{"statement":"","address":"ab3e7c0b-4a21-8c31-a6a2-23155325ebb2","verdict":"UNVERIFIED","forensics":{"statement":"","address":"ab3e7c0b-4a21-8c31-a6a2-23155325…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `statement` | string | no |  |
| `run` | string | no |  |
| `deposit` | object | no |  |

Deliver the recomputable EVIDENCE bundle for a {statement}, so a court or auditor accepts a uuidna trial by RECOMPUTING it, not trusting it. Assembles: the statement + its content-address, the trial verdict, the forensic audit against the receipts, every cited proof IN FULL (its Lean text, address, source file), the ledger receipt the evidence is bound to, the exact ordered steps to reproduce every number, and one evidenceReceipt folding it all. Anyone re-runs the steps and lands on the same receipt — or the evidence is void. Proves INTEGRITY (the claim was made, the proofs are these, nothing quietly changed), NEVER legal correctness — that is a court's ruling, not a fold. Deterministic and offline. With {run} instead — axioms-receipts, trial-rows, legal-audit or trial-evidence — it returns that run log's saved receipts, each with its duration in ns and the die and battery readings taken as it finished, the die range across the run, and one receipt over them ({latest} bounds how many, default 10).

## MCP self-benchmark (usability) <Badge type="tip" :text="'1'" />

*skill: measure*

### `get_mcp_benchmark` {#uuidna-mcp-benchmark}

**Get mcp benchmark.** Returns {tools,zeroArgReusable,totalRequiredKeys,reusablePerKey,…}.

Call `get_mcp_benchmark` — the old name `uuidna_mcp_benchmark` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"tools":245,"zeroArgReusable":116,"totalRequiredKeys":191,"reusablePerKey":1.283,"avgRequiredKeys":0.78,"avgRating":4.22,"hardest":[{"name":"uuidna_crt","requ…
```

_No parameters._

Feed the MCP to itself: a USABILITY benchmark over the server's OWN catalog. Measures the surface on "maximum reusable tools per minimum keys" — how many tools are zero-arg (maximally reusable), the reusable-tools-per-required-key density, the average required keys, and the HARDEST tools (most required keys) as the self-development targets to simplify. Returns {tools,zeroArgReusable,totalRequiredKeys,reusablePerKey,avgRequiredKeys,hardest}. Recomputable — the MCP measuring the MCP, no opinion.

## Unified self-description (one receipt) <Badge type="tip" :text="'1'" />

*skill: measure*

### `get_receipt` {#uuidna-unify}

**Get receipt.** Returns {handle,theorems,domains,tools,receipt}.

Call `get_receipt` — the old name `uuidna_unify` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"handle":"fd0b0e77","theorems":{"count":71018,"verified":71018,"receipt":"08b07830-c9d8-88d2-bd10-bb46c60b4d67"},"domains":{"count":122,"verdict":"VERIFIED","…
```

_No parameters._

The UNIFIED self-description: ONE recomputable receipt folding uuidna's three faces — the sealed theorems (the trial), the domains that carry them (the reviews), and the tools that serve them (the usability benchmark/ratings). CI, the MCP and the site read this one object; recompute from the same ledger and the receipt returns. Returns {handle,theorems,domains,tools,receipt} — cite the handle (the first segment), the whole receipt is the fold.

## Self-profile (one receipt) <Badge type="tip" :text="'2'" />

*skill: measure*

### `get_quantum_profile` {#uuidna-quantum-profile}

**Get quantum profile.** Returns {handle,identity,proofs,quantumCrypto,integrity,rights,receipt,…}.

Call `get_quantum_profile` — the old name `uuidna_quantum_profile` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"handle":"3c1fbf4a","identity":{"name":"uuidna","address":"fc511532-6e8a-8418-a522-a51b1d46a70c","aura":{"ray":2,"hue":34,"hsl":"hsl(34, 66%, 54%)","rgb":"#d7…
```

_No parameters._

THE QUANTUM PROFILE — uuidna's content-addressed SELF-PORTRAIT, composed from what it already proves and folded to ONE receipt anyone recomputes: the IDENTITY (the name's content-address and the aura colour it folds to), the PROOFS (theorem count, verified, the kernel-only witness, the trial receipt), the QUANTUM-CRYPTO posture (SYMMETRIC-ONLY — HMAC-SHA256 / ChaCha20-Poly1305 / PBKDF2-SHA256, so Shor has no asymmetric target and Grover only halves to a ~128-bit floor, BACKED by theorem grover_quadratic_bound, theorem each_key_bit_doubles and theorem birthday_halves_the_exponent rather than asserted), the two CAPTAIN COINS, the INTEGRITY fingerprint, and the RIGHTS. Every field carries its receipt; all fold order-invariantly to one profileReceipt. Returns {handle,identity,proofs,quantumCrypto,integrity,rights,receipt,honest}. a recomputable self-description that COMPOSES sealed facts and asserts nothing new; the aura is ART, not physics. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

THE QUANTUM PROFILE — uuidna's content-addressed SELF-PORTRAIT, composed from what it already proves and folded to ONE receipt anyone recomputes. Assembles: the IDENTITY (the name's content-address + the quantum AURA colour that address folds to — ray/hue/hsl/rgb), the PROOFS (theorem count, verified, the kernel-only witness, the trial receipt), the QUANTUM-CRYPTO posture (SYMMETRIC-ONLY — HMAC-SHA256 / ChaCha20-Poly1305 / PBKDF2-SHA256, so Shor has no asymmetric target and Grover only halves to a ~128-bit floor — BACKED by the sealed post-quantum floor theorems grover_quadratic_bound / each_key_bit_doubles / birthday_halves_the_exponent, not asserted), the two CAPTAIN COINS, the INTEGRITY fingerprint (FNV + SHA-256 + tamper cost), and the RIGHTS (© + licence). Every field carries its receipt; all fold order-invariantly to one profileReceipt — the same profile for every observer. integrity, not truth (theorem provenance_integrity_not_content_truth) — a recomputable self-description that COMPOSES sealed facts and asserts nothing new; the aura is ART, not physics. Returns {handle,identity,proofs,quantumCrypto,integrity,rights,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

### `get_social_profile` {#uuidna-social-profile}

**Get social profile.** Returns {handle,name,bio,aura,avatarSeed,links,reserved,credit,receipt,…}.

Call `get_social_profile` — the old name `uuidna_social_profile` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"handle":"@uuidna","name":"uuidna","bio":"Content-addressed identity, honest by construction — 71018 Lean theorems, all by decide, kernel-only, folded to one …
```

_No parameters._

THE SOCIAL PROFILE — uuidna's public, shareable CARD, the outward face of the quantum profile. Composes the handle (@uuidna), a one-line BIO computed from the ledger (never hand-typed — it cannot drift from the proof count), the quantum AURA colour the card wears (+ the moving-aura CSS block), a content-addressed avatar seed, the canonical LINKS (site, source, package, licence), and the CREDIT tally, folded to one receipt — the same card for every observer. DETERMINISTIC and OFFLINE: it fetches nothing, posts nothing, and shares only what is already public and sealed. integrity, not truth (theorem provenance_integrity_not_content_truth) — a recomputable public card whose bio is BACKED by the ledger; the aura is ART, not physics. Returns {handle,name,bio,aura,avatarSeed,links,credit,receipt,honest}. Boundary declared — theorem drift_is_named_or_caught.

## The mission — legally grow life <Badge type="tip" :text="'1'" />

*skill: measure*

### `grow_life` {#uuidna-grow-life}

**Grow life.** Returns {mission,grow,legally,life,permaculture,harmonic,receipt,…}.

Call `grow_life` — the old name `uuidna_grow_life` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"mission":"The captain's uuidna uses all its tools to LEGALLY GROW LIFE — the lawful, monotone, self-sustaining growth of the living, by-decide ledger: a quan…
```

_No parameters._

THE MISSION, recomputable — uuidna's own tools composed from sealed facts into one report, not a slogan: GROW (the frontier always advances, research_always_has_a_next, with the live count and the distance to 1024), LEGALLY (inside the licence, the sole-representation reservation and bill_never_negative), LIFE (living by-decide theorems, none destroyed), PERMACULTURE (zero runtime deps, the derived layer regrowing from the ledger as a fixed point), CONSOLIDATION (one EXACT, order-invariant receipt). Returns {mission,grow,legally,life,permaculture,harmonic,receipt,honest}. "grow life" is the monotone, lawful growth of a proof-ledger — NOT biological life and NOT a claim to create or own life. Integrity, not truth (theorem provenance_integrity_not_content_truth). Boundary declared — theorem drift_is_named_or_caught.

THE MISSION, recomputable — the captain's uuidna uses all its tools to LEGALLY GROW LIFE, composed from sealed facts (not a slogan). GROW: the frontier always advances (research_always_has_a_next — n &amp;lt; n+1, always exactly one next diamond to seal, so the ledger is a living, never-closed organism) — returns the live theorem count, the 1024 milestone, and how many to go. LEGALLY: every growth stays inside the licence (CC BY-NC-ND), the sole-representation reservation (uuidna.com only), and the honest cost model (bill_never_negative — never take more than the measured saving). LIFE: the count of living by-decide theorems, each kept, none destroyed. PERMACULTURE: the growth is self-sustaining (zero runtime dependencies), regenerative (the derived layer regrows from the ledger as a fixed point, and the kernel-only witness ships so anyone regrows it offline), and wastes nothing (monotone + honest cost) — a quantum-life permaculture. CONSOLIDATION: every dimension folds to ONE receipt that is EXACT (integer merkle-gravity, no float/clock/RNG — harmonic) and ORDER-INVARIANT (the same seen from any ordering — the same in every dimension), so `harmonic` recomputes the consolidation live. integrity, not truth (theorem provenance_integrity_not_content_truth) — "grow life" is the MONOTONE, lawful, self-sustaining growth of a recomputable proof-ledger (a living system of proofs, a permaculture that consolidates all exactly to harmonics at all dimensions), NOT biological life and NOT a claim to create or own life; it composes what is sealed and asserts nothing new. Returns {mission,grow,legally,life,permaculture,harmonic,receipt,honest}. The boundary here is DECLARED, and a declared boundary is exactly what passes while an undeclared one is caught — theorem drift_is_named_or_caught.

## Quantum-cube challenge (symmetric) <Badge type="tip" :text="'1'" />

*skill: gate*

### `compute_quantum_cube` {#uuidna-quantum-cube}

**Compute quantum cube.** Returns {nonce,response,ray,hue,hsl,spinDegPerSec,axis,css,honest}.

Call `compute_quantum_cube` — the old name `uuidna_quantum_cube` still answers · read-only · idempotent

```json
// arguments
{"secret":"theorem","nonce":"theorem"}
// answer (excerpt)
{"nonce":"theorem","response":"68f04cff-bdaf-841a-b51f-78aa3d9b94dd","ray":2,"hue":218,"hsl":"hsl(218, 67%, 56%)","spinDegPerSec":90,"axis":"z","css":".uuidna-…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `secret` | string | **yes** | the shared secret the holder pr… |
| `nonce` | string | **yes** | the verifier-supplied challenge… |
| `response` | string | no | optional — a response to VERIFY… |

THE QUANTUM-CUBE CHALLENGE — a recomputable SYMMETRIC challenge-response whose answer is the A432 aura rendered as a spinning 3D cube. Pass {secret,nonce}: uuidna folds secret|nonce to a content-address and returns the cube — response handle, ray/hue/colour, spin speed and axis, and a ready CSS block. A holder of the shared secret reproduces the EXACT cube for the verifier's nonce; an imitator, or a cube copied for a different nonce, fails. Pass {secret,nonce,response} to VERIFY, returning {match} by recomputing. The verifier SUPPLIES the nonce — uuidna never generates one (no RNG). Backs theorem redirect_imitable_but_coins_authorise: a redirect authenticates nothing, a secret+nonce fold does. SYMMETRIC (the verifier must share the secret), strength is the secret's entropy — NOT zero-knowledge, NOT public-key, NOT biometric: it proves knowledge of a shared secret for a fresh nonce and nothing about voice, face or liveness. The cube is ART, never a cipher. Integrity, not truth (theorem provenance_integrity_not_content_truth).

THE QUANTUM-CUBE CHALLENGE — a recomputable, SYMMETRIC challenge-response whose visual answer is the A432 aura rendered as a SPINNING 3D CUBE. Pass {secret, nonce}: uuidna folds secret|nonce to a content-address and returns the cube — its response handle, ray/hue/colour, spin speed + axis (deterministic from the aura), and a ready CSS block for the rotating cube. A holder of the shared secret reproduces the EXACT cube for the verifier's nonce; an imitator (or a copied cube for a different nonce) fails. Pass {secret, nonce, response} to VERIFY — returns {match} by recomputing. The verifier SUPPLIES the nonce (uuidna never generates it — no RNG); the response is deterministic. integrity, not truth (theorem provenance_integrity_not_content_truth) — SYMMETRIC (the verifier must share the secret, like the ChaCha passphrase), strength is the secret's entropy, NOT zero-knowledge, NOT public-key, and NOT biometric: it proves knowledge of the shared secret for a fresh nonce, NOTHING about voice, face, or liveness (runtime layers outside the recomputable model). The cube is ART, never a cipher. Backs theorem redirect_imitable_but_coins_authorise — a redirect authenticates nothing; a secret+nonce fold does. Returns the cube, or {match} when a response is given.

## Byte-level image provenance <Badge type="tip" :text="'1'" />

*skill: gate*

### `get_image_provenance` {#uuidna-image-provenance}

**Get image provenance.** Returns {bytes,format,sha256,handle,honest}.

Call `get_image_provenance` — the old name `uuidna_image_provenance` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"bytes":0,"format":"unknown","sha256":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855","handle":"c7ee74cb-cc5e-8c08-b772-bdbf6a303810","hone…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `hex` | string | no | the file bytes as a hex string |
| `base64` | string | no | the file bytes as base64 (alter… |
| `sha256` | string | no | optional — a SHA-256 hex to VER… |

BYTE-LEVEL IMAGE (and any-file) PROVENANCE — content-address the EXACT bytes so any alteration is visible. Pass the bytes as {hex} or {base64}: returns the byte length, the container FORMAT read from the magic bytes (png/jpeg/gif/webp/bmp/tiff/pdf/unknown), the SHA-256 of the exact bytes (the authoritative exact-copy + tamper-evidence fingerprint), and a uuidna handle over it. Pass {sha256} alongside to VERIFY — returns {match} by recomputing (a tamper, any changed byte, moves the hash and fails). DETERMINISTIC and OFFLINE. integrity, not truth (theorem provenance_integrity_not_content_truth) — it proves EXACT-COPY and TAMPER-EVIDENCE of the BYTES, and provably NOT content authenticity: it says NOTHING about whether an image is a genuine photograph, where/when it was taken, whether it depicts the poles (or anything), or whether its content was manipulated before these bytes. A match proves byte-identity; it NEVER proves a truthful record of the world — content authenticity is non-justiciable from bytes (theorem provenance_integrity_not_content_truth). Returns {bytes,format,sha256,handle,honest}, or {match} when a sha256 is given.

## MCP self-test (recomputable contract) <Badge type="tip" :text="'1'" />

*skill: measure*

### `compute_selftest` {#uuidna-selftest}

**Compute selftest.** Returns {kind,tool,run,why}.

Call `compute_selftest` — the old name `uuidna_selftest` still answers · read-only · idempotent

```json
// arguments
{"run":false}
// answer (excerpt)
{"kind":"contract","tool":"uuidna_selftest","run":false,"why":"the self-test runs every zero-argument tool twice; call with run: true"}
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `run` | boolean | **yes** | run every check now |

The MCP tests ITSELF — pure self-consistency, no external oracle: every catalog tool must resolve to a handler, and every zero-arg tool must RUN and be DETERMINISTIC (two calls recompute identically). A tool that reads live device state surfaces as non-deterministic, honestly. Folds to one self-test receipt. Returns {checks,passed,deterministic,failed,receipt}. Boundary declared — theorem drift_is_named_or_caught. AN EMPTY CALL IS CHEAP: the sweep is minutes over the sealed ledger (measured 2026-09-12: 268 s for the monographs, 213 s for analytics, 161 s for the self-test on a loaded host), so it runs only when asked for by name — pass {recompute: true}; without it the reply is this contract and nothing is computed.

## Quantum state vectors <Badge type="tip" :text="'2'" />

*skill: quantum*

### `get_quantum` {#uuidna-quantum}

**Get quantum.** Returns {circuit,qubits,outcomes,marginals,parity,receipt,honest}.

Call `get_quantum` — the old name `uuidna_quantum` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"circuit":"bell","qubits":2,"outcomes":{"11":"1/2","00":"1/2"},"marginals":[{"qubit":0,"p0":"1/2","p1":"1/2"},{"qubit":1,"p0":"1/2","p1":"1/2"}],"parity":{"me…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `circuit` | string | no | bell (2 qubits) or ghz (n qubit… |
| `qubits` | number | no | qubit count (ghz default 3; req… |
| `ops` | array | no | OpenQASM circuit: [{gate, qubit… |

Compute the EXACT classical state vector (Gaussian-integer amplitudes over √(2^scale) — no floats, no decimal drift). Either a named `circuit` (bell/ghz) OR an arbitrary `ops` circuit in OpenQASM/Qiskit gate names (h, x, y, z, s, sdg, cx, cz, swap, ccx, ccz) — so any system that speaks quantum circuits interops. Returns the EXACT rational distribution, per-qubit marginals (the no-signaling check), the order-invariant receipt, and — for an H-free circuit — the CLASSICAL truth table (the reversible logic the gates compute, usable directly by classical systems; Toffoli/ccx is universal). HONEST: 2^n exact amplitudes are computed; theorem n_qubit_dimension decides 2^n for n = 1..5.

### `get_quantum_advantage` {#uuidna-quantum-advantage}

**Get quantum advantage.** Returns {prerequisite,magnitudes,steps,compute,alpine,curriculum,…}. Bound [`n_qubit_dimension`](/theorem/n_qubit_dimension).

Call `get_quantum_advantage` — the old name `uuidna_quantum_advantage` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"prerequisite":"Every tools/call already deposited the two captain coins (deposit 2 · captain_commission_two_coins). Declare clientInfo.name at initialize; po…
```

_No parameters._

AFTER THE TWO COINS — the agent playbook to compute quantum and read magnitudes over classical re-run. Zero-arg: ordered tools/call steps (uuidna_os capacity → uuidna_decide 2^n → uuidna_quantum bell → uuidna_crypto widths → uuidna_theorem verify_beats_recompute_by_magnitudes → uuidna_exec Alpine apps), plus compute/alpine hints and the school curriculum receipt. Magnitudes cite VERIFY vs RECOMPUTE (O(log N) vs O(N)), not hardware supremacy. Returns {prerequisite,magnitudes,steps,compute,alpine,curriculum,receipt,honest}. Pure, edge-safe.

## Desk readiness & open leads <Badge type="tip" :text="'1'" />

*skill: research*

### `fill_gaps` {#uuidna-fill-gaps}

**Fill gaps.** Returns {receipt,handle,hexbits,door,coin,place,lanes,survey,plan,…}.

Call `fill_gaps` — the old name `uuidna_fill_gaps` still answers · read-only · idempotent

```json
// arguments
{}
// answer (excerpt)
{"receipt":"9501225f-242e-8bc6-a6ae-2ffe6edb953b","handle":"9501225f","hexbits":[9,5,0,1,2,2,5,15,2,4,2,14,8,11,12,6,10,6,10,14,2,15,15,14,6,14,13,11,9,5,3,11]…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `verify` | boolean | no | run the full advantage+gap MCP… |
| `run` | boolean | no | spawn npm run x -- fill-gaps on… |
| `limit` | integer | no | open-leads sample cap (default… |

Gap census at scale — one folded receipt (verify_beats_recompute_by_magnitudes). {verify:true} full hook; {run:true} host desk arc. Returns {survey,plan,receipt}.

## DIY energy yield (ceiling first, integer brackets, refuses over-unity) <Badge type="tip" :text="'4'" />

*skill: energy*

### `compute_energy_wind` {#uuidna-energy-wind}

**Compute energy wind.** Returns {route,verdict,refusal,ceiling,estimate,brackets,flags,…}.

Call `compute_energy_wind` — the old name `uuidna_energy_wind` still answers · read-only · idempotent

```json
// arguments
{"rotorDiameterMillimetres":1,"windSpeedMillimetresPerSecond":1}
// answer (excerpt)
{"route":"wind","verdict":"BOUNDED","refusal":null,"ceiling":{"quantity":"the Betz ceiling — the most this rotor could capture at this wind speed","unit":"mill…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `rotorDiameterMillimetres` | number | **yes** | rotor diameter, whole millimetr… |
| `windSpeedMillimetresPerSecond` | number | **yes** | wind speed, whole millimetres p… |
| `airDensityGramsPerCubicMetre` | number | no | air density in g/m3; defaults t… |
| `claimedOutputMilliwatts` | number | no | optional — a machine’s measured… |

Wind, bounded by BETZ. Power in the wind is proportional to the swept area and the CUBE of the wind speed; no open-flow turbine captures more than 16/27 of it (Betz 1919/1920 — an exact ratio from the derivation, not a measurement). Give the rotor diameter in mm and the wind speed in mm/s and the tool returns the Betz ceiling as an integer bracket in milliwatts, each side proved by exact multiplication with no division in the verdict. Supply claimedOutputMilliwatts and a claim above the ceiling is REFUSED with the multiplication that convicts it. Air density defaults to the STANDARD-ATMOSPHERE reference 1225 g/m3 — a convention, not the air at your site, and the answer is conditional on it. The circle constant is bracketed by its convergents 333/106 and 355/113. This is what the AIR allows, never what a machine delivers: blades, generator and controller all subtract, and this tool will not invent that fraction for you.

### `compute_energy_biogas` {#uuidna-energy-biogas}

**Compute energy biogas.** Returns {route,verdict,refusal,ceiling,estimate,brackets,flags,…}.

Call `compute_energy_biogas` — the old name `uuidna_energy_biogas` still answers · read-only · idempotent

```json
// arguments
{"biogasLitres":1,"methanePercent":1}
// answer (excerpt)
{"route":"biogas-engine","verdict":"BOUNDED","refusal":null,"ceiling":{"quantity":"the unity bound — no heat engine reaches it, and nothing may be reported abo…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `biogasLitres` | number | **yes** | biogas volume, whole litres |
| `methanePercent` | number | **yes** | methane fraction, whole percent… |
| `cylinders` | number | no | engine cylinders (default 1) |
| `crankRevolutionsPerMinute` | number | no | optional crank speed, rpm — rep… |
| `hotKelvin` | number | no | optional peak cycle temperature… |
| `coldKelvin` | number | no | optional heat-rejection tempera… |
| `claimedThermalEfficiencyPercent` | number | no | optional — your engine’s measur… |

Biogas into a four-stroke engine. The chemical energy is bracketed from the MEASURED methane combustion enthalpy 890.29 kJ/mol (Horstmeyer et al. 2018, J. Water Reuse & Desalination 8(4):455, from CODATA enthalpies — the value with LIQUID water as product, so an engine exhausting steam recovers less) through the EXACT ideal-gas molar volume at STP (R = k·N_A is exact under SI 2019; the ideal-gas law is a MODEL, not a measurement of real biogas). Shaft work is bounded by CARNOT between the stated hot and cold temperatures. A claimed thermal efficiency at or above unity, or above Carnot, is REFUSED with the integer multiplication that convicts it. The cycle counts are definitional, not measured: 4 strokes, 2 crankshaft revolutions, exactly 1 working stroke per cycle, one impulse per cylinder per two revolutions (Runciman, Gutenberg 27286; Rathbun, Gutenberg 56776, who states impulses per revolution = cylinders / 2 — the same count written with a fraction).

### `compute_energy_mfc` {#uuidna-energy-mfc}

**Compute energy mfc.** Returns {route,verdict,refusal,ceiling,estimate,brackets,flags,…}.

Call `compute_energy_mfc` — the old name `uuidna_energy_mfc` still answers · read-only · idempotent

```json
// arguments
{"reactorLitres":1,"retentionHours":1}
// answer (excerpt)
{"route":"microbial-fuel-cell","verdict":"BOUNDED","refusal":null,"ceiling":{"quantity":"the most this reactor volume could give at the top of the reported ran…
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `reactorLitres` | number | **yes** | reactor working volume, whole l… |
| `retentionHours` | number | **yes** | hydraulic retention time, whole… |
| `anodeAreaSquareMillimetres` | number | no | optional anode area in mm2 — ad… |
| `assertedVolumetricMilliwattsPerCubicMetre` | number | no | optional — a claimed volumetric… |
| `scale` | string | no | 'pilot' (default, the wastewate… |

THE MICROBIAL FUEL CELL, priced from a pilot-scale survey — every figure is a bracket. Volumetric power 600 +/- 452 mW/m3 (reported range 12–1435), areal 49 +/- 27 mW/m2, energy recovery 11 +/- 6 Wh/m3, all MEASURED (Rossi & Logan 2022, Water Research 225:119179); the standard deviation is larger than three quarters of the mean, so the band IS the finding and a single-number expectation would be dishonest. The top of the reported range is the ceiling and an asserted power above it is REFUSED. The tool also checks the two independent measured bands AGAINST EACH OTHER over the stated retention time, and that check is allowed to come out FALSE — a pass too short for the reported energy recovery is named as such. The lab record of 11,220 W/m3 (Ren et al. 2016, Nanoscale 8:3539) is reachable only under scale=lab and always carries its label: a MINIATURISED cell on a DEFINED MEDIUM, not wastewater and not a yield to plan around.

### `compute_energy_photon` {#uuidna-energy-photon}

**Compute energy photon.** Returns {route,verdict,refusal,ceiling,estimate,brackets,flags,…}.

Call `compute_energy_photon` — the old name `uuidna_energy_photon` still answers · read-only · idempotent

```json
// arguments
{"wavelengthNanometres":1,"appliedMillivolts":1}
// answer (excerpt)
{"route":"photon-electrolysis","verdict":"REFUSED","refusal":"appliedMillivolts = 1 is below the reversible floor. Water splitting is thermodynamically uphill …
```

**Parameters**

| param | type | required | description |
| --- | --- | --- | --- |
| `wavelengthNanometres` | number | **yes** | photon wavelength, whole nanome… |
| `appliedMillivolts` | number | **yes** | cell voltage actually applied,… |
| `claimedFaradaicEfficiencyPercent` | number | no | optional — whole percent 0..100… |

Photon and electrolysis. The reversible cell voltage is computed from the MEASURED Gibbs energy of liquid water formation (-237.14 kJ/mol) against the EXACT Faraday constant N_A·e (exact because e and N_A are exact under SI 2019), and returned as an integer bracket around roughly 1.2289 V. The familiar 1.23 V is shown BY MULTIPLICATION to be that number rounded UP — an upper bound, not the value. A photon of the given wavelength is priced in volts per electron (exact: h, c and e are all exact) and checked against that floor; the tool also computes the longest wavelength whose single photon still clears it. An applied voltage BELOW the floor is REFUSED — a device claiming sustained hydrogen there is claiming energy from nowhere. An applied voltage below the THERMONEUTRAL voltage (~1.4812 V, from the measured higher heating value 285.83 kJ/mol) is also REFUSED: a cell run there absorbs ambient heat, an efficiency against the higher heating value would come out above 100%, and that number is not free energy and will not be printed as an efficiency. Real electrolysers run 1.6–2.0 V; the gap is overpotential and ohmic loss — heat, not hydrogen.

