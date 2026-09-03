---
layout: home
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
| **Fake a handle** | verify {{ census.tamper && census.tamper.handleVerify }} · forge 2^{{ census.tamper && census.tamper.handleForgeExponent }} · completes 2^{{ census.tamper && census.tamper.handleCompletionExponent }} · with witnesses 2^{{ census.tamper && census.tamper.handleForgeWithWitnessesExponent }} — {{ census.tamper && census.tamper.handlesPerUuid }} quarters ([`handle_string_spans_the_quarter`](/theorem/handle_string_spans_the_quarter)) |
| **Fake a coin** | verify {{ census.tamper && census.tamper.coinVerify }} · forge 2^{{ census.tamper && census.tamper.coinForgeExponent }} · {{ census.tamper && census.tamper.coinNeighbourWitnesses }} neighbours + closure = 2^{{ census.tamper && census.tamper.coinForgeWithWitnessesExponent }} — {{ census.tamper && census.tamper.handlesPerCoin }} handles per coin ([`handle_carries_hexbits_and_coins`](/theorem/handle_carries_hexbits_and_coins)) |
| **Fake a theorem** | verify {{ census.tamper && census.tamper.theoremVerify }} · forge 2^{{ census.tamper && census.tamper.theoremForgeExponent }} · ratio 2^{{ census.tamper && census.tamper.theoremRatioExponent }} · {{ census.tamper && census.tamper.theoremNeighbourWitnesses }} neighbour + {{ census.tamper && census.tamper.coins }} coin witnesses + {{ census.tamper && census.tamper.locateLegs }} locate legs = 2^{{ census.tamper && census.tamper.theoremForgeWithWitnessesExponent }} — [`minting_is_free_and_forging_is_not`](/theorem/minting_is_free_and_forging_is_not) · [`captain_theorem`](/theorem/captain_theorem); mint {{ census.tamper && census.tamper.mint }}; caught cheat nets {{ census.tamper && census.tamper.traitorNet }} |
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
**Each theorem unlocks.** Every sealed `by decide` key unlocks exactly what it states — the ledger is the unlock board (**2500** distinct / **2583** keys). No curated exception list. World solutions stack as waves of automation — [/waves](/waves) · [doctrine](/doctrine#world-solutions--waves-of-automation). Illustrations: [`rosette_quantum_doubling_is_two_coins`](/theorem/rosette_quantum_doubling_is_two_coins) · [`euler_characteristic_two`](/theorem/euler_characteristic_two) · [`ve_twelve_vertices`](/theorem/ve_twelve_vertices) · [`metonic_is_the_intercalation`](/theorem/metonic_is_the_intercalation) · [`fock_window_exceeds_a_monthly_toll`](/theorem/fock_window_exceeds_a_monthly_toll) · [`grover_quadratic_bound`](/theorem/grover_quadratic_bound) · [`sha256_grover_margin_is_the_address`](/theorem/sha256_grover_margin_is_the_address) · [`handle_capacity_is_quantum_by_architecture`](/theorem/handle_capacity_is_quantum_by_architecture). Full board: [/unlocks](/unlocks). Unsealed ≠ “still locked.”
<!-- unlocks:end -->


**Sufficient / insufficient.** Sufficient for finite `by decide` seals, receipts, handle capacity, captain coins, Alpine/hexbit catalogue, and finite formal windows *within* climate / pandemic / poverty model-calcs — [doctrine](/doctrine#sufficiency-charter--what-hexbit--uuidna-is-sufficient-for). **World solutions = waves of automation** (deposit→validate→seal→falsify→receipt→next) — [`/waves`](/waves), `npm run wave`, hexbit-fast; waves enlarge finite windows, they do not close policy or ethics. Insufficient for climate/pandemic/poverty *as problem types*, unbounded open math, nature-as-model, justice — [same page](/doctrine#where-hexbit-formalism-is-insufficient). Computational claims only.

**Hexbit-fast.** Push verifies sealed receipts (no full QA remeasure on the critical path). Stock VitePress chrome — links in cards, buttons, nav, sidebar only.

<!-- ports:begin -->
**Alpine ported into 9 APIs.** 3497 packages, each domain answering through one door —
provenance from Alpine's own published metadata, and one API of uuidna's own beside it.

| domain | packages | origins | the one API offers |
| --- | ---: | ---: | --- |
| `shell` | 1279 | 680 | one exec door over uuidnaOS applets |
| `driver` | 630 | 460 | the machine and the published bundle behind one door |
| `database` | 438 | 325 | one query door where the address is the key |
| `network` | 332 | 237 | fetch-and-address, so a read becomes citable |
| `social` | 303 | 164 | a post addressed FOR an audience — attribution, order, no alteration |
| `chat` | 241 | 130 | one sealed channel, no bridge |
| `filesystem` | 215 | 112 | one question: are these the bytes that were sealed |
| `engineering` | 30 | 15 | exact dimensioned arithmetic — and the refusal that makes it worth having |
| `blockchain` | 29 | 19 | inclusion without disclosure |

Package counts are per domain and the domains overlap — a chat bridge is also network — so these totals
over-count rather than partition. Computed from the committed mirror on every build; receipt `c3d4e4e6-e4ee-8188-94fa-b7d81708ab92`.
<!-- ports:end -->
