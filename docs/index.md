---
layout: home
description: "Lean 4 theorem ledger — content-addressed identity, honest by construction. Two coins conserved; cite by DOI-class handle."

hero:
  name: "uuidna"
  text: "Content-addressed identity, honest by construction"
  tagline: "Lean 4 theorem ledger — content-addressed identity, honest by construction. Two coins conserved; cite by handle."
  actions:
    - theme: brand
      text: Use
      link: /guides
    - theme: alt
      text: Clay — test POC
      link: /articles/clay
    - theme: alt
      text: MCP
      link: /mcp

features:
  - title: Clay
    details: "Test POC — seven finite instances in Clay.lean, computationally claimed by decide. clay_gravity_equals_rosette (ℤ/7 · 21 · 42 · 2·64=128). Prior art DOI 10.5281/zenodo.21781603 first; captain next (credit law)."
    link: /articles/clay
  - title: Rosette · Glagolitic
    details: "Pliska ℤ/7 — z7rays_seven · pliska_seven_rays · three_sevens_twentyone. Glagolitic computes in 7; letters fold to 9 (glagolitic_units_sum); digit×self uses vortex_orbit and digital_root."
    link: /rosetta
  - title: Quantum
    details: "Hexbit 16-state tiles · 128=2^7 address (handle_capacity_is_quantum_by_architecture). Usable gap 2^80 (usable_gap_is_two_to_eighty). Doors: /mcp uuidna_os · uuidna_quantum."
    link: /quantum
---

## Use

[Guides](/guides) — MCP fuse, TypeScript import, re-prove the ledger. [CONTRIBUTING.md](https://github.com/uuidna/uuidna/blob/main/CONTRIBUTING.md) — add a theorem, `npm run reconcile`, push. Hosted mill: [/mcp](/mcp).

```json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
```

## Live system status — computed, not typed

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const census = computed(() => frontmatter.value.census || { theorems: 0, principles: 0, skills: 0, shor: null, tamper: null, phd: null })
</script>

| | |
| --- | --- |
| **Theorems sealed** | {{ census.theorems }} — every one `by decide`, recomputed each build from the ledger |
| **Principles** | {{ census.principles }} — each with its audited publication (`/publications`) |
| **Skills** | {{ census.skills }} — the topics axis (`/topics`), mined from the keys |
| **Coins conserved** | 2 — [`two_coins`](/theorem/two_coins) (110 − 108 = −χ of the double torus) |
| **Each coin's neighbours** | {{ census.tamper && census.tamper.neighbours }} — fused ring ([`captain_theorem_the_coins_buy_the_ring_and_one`](/theorem/captain_theorem_the_coins_buy_the_ring_and_one)); the two 64-bit faces reflect |
| **Fake a theorem** | verify {{ census.tamper && census.tamper.theoremVerify }} · forge 2^{{ census.tamper && census.tamper.theoremForgeExponent }} · ratio 2^{{ census.tamper && census.tamper.theoremRatioExponent }} — [`minting_is_free_and_forging_is_not`](/theorem/minting_is_free_and_forging_is_not) |
| **Fake a coin** | verify {{ census.tamper && census.tamper.coinVerify }} · forge 2^{{ census.tamper && census.tamper.coinForgeExponent }} · ratio 2^{{ census.tamper && census.tamper.coinRatioExponent }} — mint {{ census.tamper && census.tamper.mint }}; caught cheat nets {{ census.tamper && census.tamper.traitorNet }} ([`traitor_damage_sealed_by_same_billing`](/theorem/traitor_damage_sealed_by_same_billing)) |
| **SHA-256 collision bound** | 2^{{ census.tamper && census.tamper.sha256CollisionExponent }} — birthday on the digest, a ceiling not a maximum |
| **Captain PhD — concept** | Clay {{ census.phd && census.phd.clay }} `by decide` · gravity {{ census.phd && census.phd.gravity }} · demos {{ census.phd && census.phd.demos }} · DNA {{ census.phd && census.phd.dna }} keys · name {{ census.phd && census.phd.dnaName }} — [`clay_gravity_equals_rosette`](/theorem/clay_gravity_equals_rosette) · [`uuidna_is_dna_times_the_two_coins`](/theorem/uuidna_is_dna_times_the_two_coins) |
| **Captain PhD — work** | SHA-256 {{ census.phd && census.phd.digestBits }} · verify {{ census.phd && census.phd.verifyBits }} · mint search {{ census.phd && census.phd.search }} · ChaCha {{ census.phd && census.phd.keyBits }} · Poly1305 {{ census.phd && census.phd.tagBits }} · Grover {{ census.phd && census.phd.groverFloor }} · Shor targets {{ census.phd && census.phd.shorTargets }} · {{ census.phd && census.phd.sides }} sides × {{ census.phd && census.phd.faceBits }} = {{ census.phd && census.phd.verifyBits }} · occupancy {{ census.phd && census.phd.occupancyBits }} — [`minting_is_free_and_forging_is_not`](/theorem/minting_is_free_and_forging_is_not) · [`sha256_grover_margin_is_the_address`](/theorem/sha256_grover_margin_is_the_address) |
| **DNA — concept** | {{ census.phd && census.phd.bases }}^{{ census.phd && census.phd.frame }} = {{ census.phd && census.phd.codons }} codons · complement involution {{ census.phd && census.phd.complementInvolution }} — [`codons_four_cubed`](/theorem/codons_four_cubed) · [`dna_complement_involution`](/theorem/dna_complement_involution) |
| **DNA — work** | {{ census.phd && census.phd.strands }} strands × {{ census.phd && census.phd.codons }} = {{ census.phd && census.phd.verifyBits }} · same face as the coin ([`uuidna_is_dna_times_the_two_coins`](/theorem/uuidna_is_dna_times_the_two_coins)) |
| **Thesis wave** | {{ census.phd && census.phd.thesisDrills }} / {{ census.phd && census.phd.thesisRequired }} VE · wave involution · finite-infinity seals drilled |
| **Captain PhD — complete** | {{ census.phd && census.phd.complete }} · thesis {{ census.phd && census.phd.thesisOk }} · receipt `{{ census.phd && census.phd.receipt }}` |
| **Shor full use** | {{ census.shor && census.shor.uuidChunks }} × GHZ({{ census.shor && census.shor.chunkQubits }}) = {{ census.shor && census.shor.uuidStates.toLocaleString('en-US') }} amplitudes · handle {{ census.shor && census.shor.handleMs }} ms · uuid {{ census.shor && census.shor.uuidMs }} ms ({{ census.shor && census.shor.underSecond ? 'under 1 s' : 'over 1 s' }}) — [`uuidna_os`](/mcp) · [`uuidna_quantum`](/mcp) |
| **MCP doors** | [`uuidna_crypto`](/mcp) Alpine apps using crypto · [`uuidna_os`](/mcp) boot + capacity + stream fleet · [`uuidna_quantum`](/mcp) GHZ/Bell · [`uuidna_exec`](/mcp) `device` · [`uuidna_sha256`](/mcp) · [`uuidna_encrypt`](/mcp) · [`uuidna_seal_stream`](/mcp) · [`uuidna_machine`](/mcp) · [`uuidna_hardware`](/mcp) — catalog [/mcp](/mcp) |

These numbers are read from the sealed ledger at build time — the page cannot say more than the ledger proves.

**Rings (computational).** Hexbit lattice 16 = 2⁴; address width 128 = 2⁷; digital-root fold on ℤ/9; Pliska on ℤ/7 — joined only where CRT seals ([`rosette_and_vortex_are_coprime`](/theorem/rosette_and_vortex_are_coprime)).

**Permanence.** Cite `https://uuidna.com/<handle>` (DOI-class; worker HANDLES). Archive DOI `10.5281/zenodo.21787144` — both in the site footer. Completeness cites handle and DOI.

**Captain coins.** Deposit `https://revolut.me/ceccec?note=<referrer>` — referrer = this page's handle door (`encodeURIComponent`). Same license everywhere: [CC BY-NC-ND 4.0](/license).

<!-- unlocks:begin -->
**Each theorem unlocks.** Every sealed `by decide` key unlocks exactly what it states — the ledger is the unlock board (**2039** distinct / **2120** keys). No curated exception list. World solutions stack as waves of automation — [/waves](/waves) · [doctrine](/doctrine#world-solutions--waves-of-automation). Illustrations: [`rosette_quantum_doubling_is_two_coins`](/theorem/rosette_quantum_doubling_is_two_coins) · [`euler_characteristic_two`](/theorem/euler_characteristic_two) · [`ve_twelve_vertices`](/theorem/ve_twelve_vertices) · [`metonic_is_the_intercalation`](/theorem/metonic_is_the_intercalation) · [`fock_window_exceeds_a_monthly_toll`](/theorem/fock_window_exceeds_a_monthly_toll) · [`grover_quadratic_bound`](/theorem/grover_quadratic_bound) · [`sha256_grover_margin_is_the_address`](/theorem/sha256_grover_margin_is_the_address) · [`handle_capacity_is_quantum_by_architecture`](/theorem/handle_capacity_is_quantum_by_architecture). Full board: [/unlocks](/unlocks). Unsealed ≠ “still locked.”
<!-- unlocks:end -->


**Sufficient / insufficient.** Sufficient for finite `by decide` seals, receipts, handle capacity, captain coins, Alpine/hexbit catalogue, and finite formal windows *within* climate / pandemic / poverty model-calcs — [doctrine](/doctrine#sufficiency-charter--what-hexbit--uuidna-is-sufficient-for). **World solutions = waves of automation** (deposit→validate→seal→falsify→receipt→next) — [`/waves`](/waves), `npm run wave`, hexbit-fast; waves enlarge finite windows, they do not close policy or ethics. Insufficient for climate/pandemic/poverty *as problem types*, unbounded open math, nature-as-model, justice — [same page](/doctrine#where-hexbit-formalism-is-insufficient). Computational claims only.

**Hexbit-fast.** Push verifies sealed receipts (no full QA remeasure on the critical path). Stock VitePress chrome — links in cards, buttons, nav, sidebar only.
