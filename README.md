# uuidna — 70,950 distinct theorems under 71,035 keys · 2 coins · one receipt

`743890b4-2023-8126-9a23-a7c67b97d33e`

**What every theorem carries, and what most do not.** proof · address hold for 71,035 of 71,035; **witness 26 of 71,035** (0.0%), **symbol 1339 of 71,035** (1.8%), **falsifier 71033 of 71,035** (99.9%). A witness is an anchor OUTSIDE this repository that a stranger could consult — a published standard, a named author — so that fraction is the one to read first: the arithmetic is kernel-decided throughout, and independent corroboration is scarce. **That scarcity is real and not a recording gap:** 0 anchor(s) named anywhere in this repository fail to reach the wing the census reads, counted by the same rule the leg is decided by, so the two cannot disagree. Nothing here is dropped for being unflattering; every figure is computed by [gen-readme](src/scripts/gen-readme.ts) from [rosetta-legs](src/rosetta-legs.ts).

**v0.3.1** · License **CC-BY-NC-ND-4.0** ([https://uuidna.com/license](https://uuidna.com/license)) · Archive DOI [10.5281/zenodo.22256708](https://doi.org/10.5281/zenodo.22256708)

## Contents

Typography graph — heading depth is document depth (school-paths law).

| Depth | Part | Section |
| ---: | --- | --- |
| 1 | **Hero** | [Abstract](#abstract) — tagline, ledger, name theorem |
| 1 | **Honesty** | [How this is kept honest](#how-this-is-kept-honest) — the five gates and what each cannot see |
| 1 | **Thesis** | [Thesis](#thesis) — Captain PhD seal |
| 2 | ↳ concept | [Proof of concept](#proof-of-concept) — Clay · DNA |
| 2 | ↳ work | [Proof of work](#proof-of-work) — crypto stack · codon occupancy |
| 2 | ↳ geometry | [Geometry](#geometry) — rosette · hexbit |
| 1 | **Use** | [Use](#use) — install · MCP · security ladder |
| 2 | ↳ channel | [UUID channel](#uuid-channel) — wire format |
| 1 | **Develop** | [Develop](#develop) — clone · lean · guard · monitor |
| 2 | ↳ monitor | [Compute · monitor](#compute--monitor--hexbit-fast--handles--deposit) |
| 1 | **Reference** | [Reference](#reference) — magnitudes · gravity · capacity · handle · license |

---

## Abstract

> **Content-addressed identity, honest by construction.** Two coins conserved; cite by DOI-class handle.

Every proof `by decide`, sorry-free, no Mathlib, axiom-free against the bare leanprover/lean4 kernel — and the axiom witness REFUSES TO WRITE rather than certify a ledger it could not cover. Recompute: `npm run lean`.

**What this is.** A ledger whose every row the kernel decided, and whose advantage is VERIFICATION: to trust a result conventionally you re-run it (touching N) or you trust an authority; here you walk one Merkle path (touching log N). That ratio is an identity — exactly (2^p − 1)/p — so it holds on every machine, in every run, and it names the rung where it begins: at p = 1 a rebuild is one merge against a verify of one, and there is NO advantage ([merkle_advantage_starts_above_one_bit](https://uuidna.com/theorem/merkle_advantage_starts_above_one_bit)).

**The state-vector fold.** The state-vector code shipped here holds 2^n amplitudes for n qubits; [n_qubit_dimension](https://uuidna.com/theorem/n_qubit_dimension) decides 2^n for n = 1..5: [2, 4, 8, 16, 32]. This host serves `/.well-known/qpu.json`.

**The 128-bit arithmetic.** 16^8 = 2^32, 2^32 · 2^96 = 2^128 and 2^7 = 128 ([handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture)). 48 < 128, 128 − 48 = 80 and 2^128 = 2^80 · 2^48 ([usable_gap_is_two_to_eighty](https://uuidna.com/theorem/usable_gap_is_two_to_eighty)). 256 / 2 = 128 and 256 % 2 = 0 ([sha256_grover_margin_is_the_address](https://uuidna.com/theorem/sha256_grover_margin_is_the_address)).

**The name is a theorem.** `uuid` + `dna`: 4³ = 64 codons and 2⁶ = 64 coin bits — the same number by two routes — fused as 128 = 2·64 ([uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins)).

---

## In three lines

1. **71,035 theorems and 172,266,157 decided cases, every one decided by the Lean 4 kernel** — sorry-free, no Mathlib, and depending on **no axiom at all**, not even propext. Recompute the whole thing with `npm run lean`.
2. **Nothing here is asserted.** Every number is either walked by the kernel or computed from a rule the kernel checks against the walk. A literal that nobody can recompute is treated as a defect.
3. **The boundary is in the theorem's name.** A result that holds over a window says so where you read it — `coprime_sum_blocked_reduced_3_mod_9`, `fixed_power_law_mod_45`. You never have to hunt a footnote to learn the scope.

**Where the caveats live, so you can stop looking for them in the prose.** This ledger states limits in three fixed
places and nowhere else: the theorem NAME carries the scope, the wing HEADER carries what the wing does and does not
claim, and the table below carries what each gate cannot see. Everything outside those three places is a claim, meant
plainly. If a sentence here reads like hedging, it is misplaced and should be moved into one of the three.

---

## How this is kept honest

A ledger is only worth its refusals. Every claim below survived gates that could have rejected it, and each gate
catches something no other one sees — so a statement that passes all of them has been wrong in four different
ways and corrected each time.

| gate | what it refuses | what it cannot see |
| --- | --- | --- |
| the **kernel** | anything not decidable by `decide` | a statement that is TRUE and says nothing |
| the **vacuity rule** | statements true whatever the world does, INCLUDING inside a walk | a tautology whose two sides are spelled differently |
| the **axiom audit** | any row depending on `propext` or `Classical.choice` — trust base ∅ | a proof only this kernel can check |
| the **falsifier evaluator** | statements a second, independent implementation cannot decide | whether the claim matters |
| the **cross-wing statement check** | the same statement sealed twice under different keys | a duplicate whose text differs but whose content does not |

The vacuity gate exists because four sealed rows were found stating things like `(2604 + 0 = 2604) ∧ (0 = 0)` —
arithmetic true however the prose behaves, under keys claiming otherwise. They were repaired to decide their
subjects, and the rule now runs at the DEPOSIT DOOR rather than after the seal, because a vacuous row that
reaches the ledger cannot be corrected by fixing the generator that produced it.

The axiom audit REFUSES TO WRITE rather than certify partially: *"this run could not cover the ledger, so it has
nothing to certify. Whatever witness is on disk is the previous one — stale, and honestly stale."* One row
depending on an axiom blocks certification of all of them.

**A zero must discriminate.** Every finder here is held to a positive control — feed it the defect it was built
for and it must catch it — because a detector reporting zero is indistinguishable from a detector that is blind.
The vacuity rule read zero over all four vacuous rows before it was made recursive — and read zero again over
a walk asserting w + (100 - w) == 100 over a hundred and one values before it was taught to descend into a walk's BODY. A
quantifier is not evidence: a hundred and one checks that are true for every input decide exactly as much as
one. Both blind spots were found the same way, by feeding the finder the defect it was built for.

**Claims carry their own counterexample.** `merkle_advantage_starts_above_one_bit` proves the verification
advantage is exactly (2^p − 1)/p AND that it does not exist at p = 1, where a rebuild is one merge against a
verify of one. A claim with no floor becomes universal by default; adding the floor to that curve immediately
exposed a wrong denominator that every rung above it had hidden.

## Thesis

> Captain PhD — concept (Clay 8, DNA 10, gravity true, demos true) ∧ work (search 0, digest 256, Grover 128, codons 64) ∧ thesis (ok true, gaps 0) → **complete true**. Thesis wave 24 / 24. Receipt `aef910a4-96cc-8017-923c-ff4021f0825b`.

### Proof of concept

#### Clay

Seven finite instances in [lean/Clay.lean](lean/Clay.lean), each a computational claim proven `by decide`. Prior art (initial clay σ-involution): DOI [10.5281/zenodo.21781603](https://doi.org/10.5281/zenodo.21781603) ([Zenodo record](https://zenodo.org/records/21781603)) credited first; captain next. Live: [uuidna.com/articles/clay](https://uuidna.com/articles/clay). Clay gravity equals the rosetta at full capacity ([clay_gravity_equals_rosette](https://uuidna.com/theorem/clay_gravity_equals_rosette)): seven ℤ/7 rays ([z7rays_seven](https://uuidna.com/theorem/z7rays_seven)), pairs 21 / quantum 42, three-sevens 21, rosette doubling 2·64 = 128 ([rosette_quantum_doubling_is_two_coins](https://uuidna.com/theorem/rosette_quantum_doubling_is_two_coins)).

#### DNA

4^3 = 64 codons = coin face ([codons_four_cubed](https://uuidna.com/theorem/codons_four_cubed), [uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins)). Complement involution, no fixed point — 10 keys ([dna_complement_involution](https://uuidna.com/theorem/dna_complement_involution), [dna_complement_fixed_point_free](https://uuidna.com/theorem/dna_complement_fixed_point_free)). Counts, not a claim that DNA stores addresses.

### Proof of work

#### Crypto stack

Mint searches 0. SHA-256 256 bits; verify 128; digest is two addresses ([digest_doubles_the_address](https://uuidna.com/theorem/digest_doubles_the_address), [sha256_grover_margin_is_the_address](https://uuidna.com/theorem/sha256_grover_margin_is_the_address)). ChaCha20 256 · HMAC 256 · Poly1305 128 · PBKDF2 600000 · onion 16 ([aead_nonce_and_salt_bits](https://uuidna.com/theorem/aead_nonce_and_salt_bits)). Grover floor 128; Shor targets 0 — symmetric stack. Fused coin 2×64 = 128; both orientations 256 ([the_uuid_is_two_boards](https://uuidna.com/theorem/the_uuid_is_two_boards), [minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not)). 36 work drills.

#### Codon occupancy

2 strands × 64 codons = 128 bits — the same fuse as the two 64-bit faces. Complement involution true; both orientations 256 ([complement_is_xor_key3](https://uuidna.com/theorem/complement_is_xor_key3)).

### Geometry

- **Pliska rosette (ℤ/7):** seven rays, units sum 21, directed quantum 42, three-sevens 21 ([z7rays_seven](https://uuidna.com/theorem/z7rays_seven), [rosette_quantum_fortytwo](https://uuidna.com/theorem/rosette_quantum_fortytwo)). Live: [uuidna.com/rosetta](https://uuidna.com/rosetta).
- **Glagolitic (ℤ/9):** letters fold to 9, digital root 9, vortex orbit 1→2→4→8→7→5 ([glagolitic_units](https://uuidna.com/theorem/glagolitic_units), [vortex_orbit](https://uuidna.com/theorem/vortex_orbit)). Hypothesis: [uuidna.com/rosetta-glagolitic](https://uuidna.com/rosetta-glagolitic).
- **Hexbit lattice:** 16 = 2⁴ states per tile; address = 32×4 = 128 = 2⁷ ([the_page_admits_sixteen](https://uuidna.com/theorem/the_page_admits_sixteen), [handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture)). ℤ/9 root fold ≠ 2¹²⁸ address fold ([fold_compresses_without_bound_and_never_recovers](https://uuidna.com/theorem/fold_compresses_without_bound_and_never_recovers)). CRT join ℤ/7×ℤ/9 = 63 ([crt_pairs_are_a_bijection](https://uuidna.com/theorem/crt_pairs_are_a_bijection)).

---

## Use

Install the package, fuse the MCP, or call constructors. Worked paths: [guides](https://uuidna.com/guides) · [MCP](https://uuidna.com/mcp).

### Install

One command. Enter seats all. Cloudflare is one click — this README and [`install.json`](install.json).

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/uuidna/uuidna)

```bash
npx -p @uuidna/uuidna uuidna-install
```

```bash
npm install @uuidna/uuidna
```

```json
{ "mcpServers": { "uuidna": { "command": "npx", "args": ["-y", "@uuidna/uuidna"] } } }
```

```ts
import { handleOf, toUuid, encrypt, theoremByKey } from '@uuidna/uuidna'

const address = toUuid('two_coins')
handleOf(address)
theoremFor('two_coins')
encrypt('text', 'passphrase')
```

`handleOf` is the eight-hex door ([universe_of_handles](https://uuidna.com/theorem/universe_of_handles)). `encrypt` is ChaCha20-Poly1305 under PBKDF2 ([aead_nonce_and_salt_bits](https://uuidna.com/theorem/aead_nonce_and_salt_bits)). Hosted mill: [uuidna.com](https://uuidna.com).

### Quick reference

| Goal | Entry |
| --- | --- |
| Address from text | `toUuid('…')` · door `handleOf(addr)` |
| Encrypt / seal | `encrypt(text, passphrase)` · `sealStream` |
| Theorem lookup | `theoremFor('two_coins')` |
| UUID wire slice | `uuidChannel(addr)` · [layout_groups_thirtytwo](https://uuidna.com/theorem/layout_groups_thirtytwo) |
| MCP (stdio) | `npx @uuidna/uuidna` |
| Hosted MCP | [uuidna.com/mcp](https://uuidna.com/mcp) |
| Docs site | `npm run docs:dev` |
| Re-prove ledger | `npm run lean` |
| Pre-push gate | `npm run guard` |
| Release trial | `npm run next` |

| MCP tool | Role |
| --- | --- |
| [`uuidna_os`](https://uuidna.com/mcp) | boot, capacity, CPU/GPU stream |
| [`uuidna_crypto`](https://uuidna.com/mcp) | Shor, Grover, SHA-256, HMAC, ChaCha20, AEAD |
| [`uuidna_coins`](https://uuidna.com/mcp) | supply + tamper ladder |
| [`uuidna_quantum`](https://uuidna.com/mcp) | GHZ / Bell, 2ⁿ amplitudes |
| [`uuidna_exec`](https://uuidna.com/mcp) | host lanes (`device`) |
| [`uuidna_encrypt`](https://uuidna.com/mcp) · [`uuidna_seal_stream`](https://uuidna.com/mcp) | independent envelopes |

### Security ladder

handle ⊂ coin ⊂ uuid — 2 handles per coin, 4 handle quarters per uuid ([handle_carries_hexbits_and_coins](https://uuidna.com/theorem/handle_carries_hexbits_and_coins), [handle_string_spans_the_quarter](https://uuidna.com/theorem/handle_string_spans_the_quarter)).

Mint is free; verify is one forward recompute ([minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not), [verify_beats_recompute_by_magnitudes](https://uuidna.com/theorem/verify_beats_recompute_by_magnitudes)). Forging must close the whole graph — content-address, both 64-bit faces, 63 neighbour witnesses + 1 closure per face, reflecting boards, handle quarters, 3 rosetta locate legs — 2^128 at uuid ([captain_theorem](https://uuidna.com/theorem/captain_theorem)). No field patches; spin fixed-point or the gate rejects.

| Tier | Verify (bits) | Forge with witnesses |
| --- | ---: | --- |
| Handle (door) | 32 | 2^128 |
| Coin (one face) | 64 | 2^64 (63+1) |
| Theorem (uuid) | 128 | 2^128 (126+2) |

[guides](https://uuidna.com/guides) · [MCP](https://uuidna.com/mcp) · [OS](https://uuidna.com/os) · [School](https://uuidna.com/school) · [doctrine](https://uuidna.com/doctrine)

### UUID channel

The printed uuid is the wire format — RFC 9562 groups sealed as [layout_groups_thirtytwo](https://uuidna.com/theorem/layout_groups_thirtytwo) and [groups_are_four_apart](https://uuidna.com/theorem/groups_are_four_apart). TypeScript reads them through `uuidChannel`, `channelAudit`, and `monographFaceOf` (`src/hexagram.ts`).

| Slice | Width | Constructor | What moves |
| --- | ---: | --- | --- |
| Handle | 8 hex | [handle_is_the_first_group](https://uuidna.com/theorem/handle_is_the_first_group) · `handleOf` | 3D door (residue · ray · wave); one coin of the double torus |
| Hex trinities | 3×4 hex | [message_cap_is_four_hexbits](https://uuidna.com/theorem/message_cap_is_four_hexbits) · `executableStates` | 7D action — three caps = 12 hexbits of program |
| Tail | 12 hex | `tailStates` · `encrypt` / `sealStream` | sealed micro-message envelope in the uuid chain |

Payload store is lazy — route, verify, aura, and secure messaging need only the address; prose body loads when required ([payload_carries_the_strand](https://uuidna.com/theorem/payload_carries_the_strand)). Full channel: [uuidna.com/quantum#uuid-channel](https://uuidna.com/quantum#uuid-channel).

---

## Develop

Lean is the single source of theorems ([legal_only_the_proven_is_admitted](https://uuidna.com/theorem/legal_only_the_proven_is_admitted)). A deposit queues a candidate; only the kernel seals ([minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not)).

```bash
git clone https://github.com/uuidna/uuidna && cd uuidna
npm install
npm run hooks:install
npm run lean          # re-prove every wing by decide
npm run reconcile
npm run guard         # traitors / drain / license identity
npm run editorial     # prose desk + prepublish seal
npm run next          # seven-arm self-trial (hexbit-fast)
```

Read [CONTRIBUTING.md](CONTRIBUTING.md) for adding a wing, the pre-push gate, and inbound license terms. Outward deploy: `npm run ship`. Live site: [uuidna.com](https://uuidna.com) · Captain coins: [uuidna.com/captain](https://uuidna.com/captain).

### Compute · monitor · hexbit-fast · handles · deposit

TypeScript computes it and VitePress monitors it — stock chrome, capacity door
[uuidna.com/quantum](https://uuidna.com/quantum) (no per-page QA cards). Push verifies sealed receipts
(`gate-receipt.json`, `usable_gap_is_two_to_eighty`) — **hexbit-fast**, remeasure off-path.
Permanent citation: `https://uuidna.com/<handle>` (8 hex; worker `HANDLES` 301 → freeze-map).
Captain coins: `https://revolut.me/ceccec?note=<referrer>` (`encodeURIComponent` of the page handle door).
**One license** for every publication and Zenodo deposit: **CC-BY-NC-ND-4.0**.

Scope charter — sufficient / insufficient, world solutions as waves: [doctrine](https://uuidna.com/doctrine) (computational claims only; verify ≪ recompute — [verify_beats_recompute_by_magnitudes](https://uuidna.com/theorem/verify_beats_recompute_by_magnitudes)).

**Each theorem unlocks.** Each sealed by-decide theorem unlocks exactly what it states — the ledger is the unlock board. No curated exception list; refusing a sealed key is refusing the captain. A claim with no theorem is unsealed, not “still locked.” Sufficient for finite by-decide seals and finite formal windows within climate/pandemic/poverty model-calcs; world solutions stack as waves of automation (deposit→validate→seal→falsify→receipt→next — npm run wave / hexbit-fast). Insufficient for those domains as full problem types, and for unbounded open math, nature-as-model, or justice — see /doctrine (computational claims only; waves do not erase ethics or politics).
Board: **70,950** distinct / **71,035** keys · **122** skills · **252** Lean files · receipt `54fbf0c4-a3c2-8c48-8469-8e0a230ecb6a`.
Illustrations (not a closed set; automation verifies each still seals): [rosette_quantum_doubling_is_two_coins](https://uuidna.com/theorem/rosette_quantum_doubling_is_two_coins); [euler_characteristic_two](https://uuidna.com/theorem/euler_characteristic_two); [ve_twelve_vertices](https://uuidna.com/theorem/ve_twelve_vertices); [metonic_is_the_intercalation](https://uuidna.com/theorem/metonic_is_the_intercalation); [fock_window_exceeds_a_monthly_toll](https://uuidna.com/theorem/fock_window_exceeds_a_monthly_toll); [grover_quadratic_bound](https://uuidna.com/theorem/grover_quadratic_bound); [sha256_grover_margin_is_the_address](https://uuidna.com/theorem/sha256_grover_margin_is_the_address); [handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture); [digit_polarities_partition_ten](https://uuidna.com/theorem/digit_polarities_partition_ten); [ve_pentads_overlap_to_eight](https://uuidna.com/theorem/ve_pentads_overlap_to_eight); [theorems_interact_as_faces](https://uuidna.com/theorem/theorems_interact_as_faces); [imagine_all_as_clique_faces](https://uuidna.com/theorem/imagine_all_as_clique_faces); [entanglement_completes_one_at_a_time](https://uuidna.com/theorem/entanglement_completes_one_at_a_time); [axes_stride_coprime](https://uuidna.com/theorem/axes_stride_coprime); [the_fused_ring_is_all_ones](https://uuidna.com/theorem/the_fused_ring_is_all_ones); [four_vectors_reach_the_uuid](https://uuidna.com/theorem/four_vectors_reach_the_uuid); [gap_is_a_count](https://uuidna.com/theorem/gap_is_a_count); [rounding_fee_closes_the_cube](https://uuidna.com/theorem/rounding_fee_closes_the_cube); [served_qubit_ceiling](https://uuidna.com/theorem/served_qubit_ceiling); [keplers_harmonic_law](https://uuidna.com/theorem/keplers_harmonic_law); [discovery_buys_coverage_never_supply](https://uuidna.com/theorem/discovery_buys_coverage_never_supply); [radial_equals_edge](https://uuidna.com/theorem/radial_equals_edge); [lanes_even_on_complete_system](https://uuidna.com/theorem/lanes_even_on_complete_system); [trial_computes_only_with_two_coins](https://uuidna.com/theorem/trial_computes_only_with_two_coins); [trinity_edit_is_three](https://uuidna.com/theorem/trinity_edit_is_three); [usable_gap_is_two_to_eighty](https://uuidna.com/theorem/usable_gap_is_two_to_eighty); [captain_computes_only_with_two_coins](https://uuidna.com/theorem/captain_computes_only_with_two_coins); [two_coins](https://uuidna.com/theorem/two_coins); [the_os_is_bootable_quantum](https://uuidna.com/theorem/the_os_is_bootable_quantum); [a_spec_compiles_to_hexbits](https://uuidna.com/theorem/a_spec_compiles_to_hexbits); [key_floor_is_one_uuid](https://uuidna.com/theorem/key_floor_is_one_uuid); [n_qubit_dimension](https://uuidna.com/theorem/n_qubit_dimension); [hexbit_ring_mass_gap](https://uuidna.com/theorem/hexbit_ring_mass_gap); [message_cap_is_four_hexbits](https://uuidna.com/theorem/message_cap_is_four_hexbits); [born_field_mass_gap_on_bell](https://uuidna.com/theorem/born_field_mass_gap_on_bell).
Full census: [https://uuidna.com/unlocks](https://uuidna.com/unlocks) · `lean/unlocks.json`.

---

## Reference

### Magnitudes (computed at generation)

| Measure | Value | Backing |
| --- | ---: | --- |
| Distinct theorems | 70,950 | statement census (a Lean statement sealed under two keys is one theorem) |
| Theorem keys | 71,035 | `theorems().length` |
| Principles / wings | 252 / 252 | PRINCIPLES + wing ratings |
| Skills | 122 | distinct `skill` tags |
| Coins per seal | 2 | [two_coins](https://uuidna.com/theorem/two_coins) — 110 − 108 = 2 |
| Neighbours per coin | 63 | fused ring 63 + 1 = 64 ([captain_theorem_the_coins_buy_the_ring_and_one](https://uuidna.com/theorem/captain_theorem_the_coins_buy_the_ring_and_one)); faces reflect |
| Fake a handle | verify 32 · forge 2^32 · completes 2^96 · with witnesses 2^128 | 4 quarters span the uuid ([handle_string_spans_the_quarter](https://uuidna.com/theorem/handle_string_spans_the_quarter)); 3 related handles |
| Fake a coin | verify 64 · forge 2^64 · with 63 neighbours + 1 closure = 2^64 | 2 handles per coin ([handle_carries_hexbits_and_coins](https://uuidna.com/theorem/handle_carries_hexbits_and_coins)); 1 reflecting face |
| Fake a theorem | verify 128 · forge 2^128 · ratio 2^121 · 126 neighbour + 2 coin witnesses + 3 locate legs = 2^128 | [minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not) · [captain_theorem](https://uuidna.com/theorem/captain_theorem) (126+2=128); mint 0; caught cheat nets 0 |
| SHA-256 collision bound | 2^128 | birthday on the digest ([birthday_halves_the_exponent](https://uuidna.com/theorem/birthday_halves_the_exponent)) |
| Captain PhD — concept | Clay 8 · DNA 10 · gravity true · demos true | [clay_gravity_equals_rosette](https://uuidna.com/theorem/clay_gravity_equals_rosette) · [uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins) |
| Captain PhD — work | digest 256 · verify 128 · search 0 · ChaCha 256 · tag 128 · Grover 128 · Shor 0 · 2×64 | [minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not) · [sha256_grover_margin_is_the_address](https://uuidna.com/theorem/sha256_grover_margin_is_the_address) |
| DNA — concept | 4^3 = 64 · involution true | [codons_four_cubed](https://uuidna.com/theorem/codons_four_cubed) · [dna_complement_involution](https://uuidna.com/theorem/dna_complement_involution) |
| DNA — work | 2 × 64 = 128 | [uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins) |
| Thesis wave | 24 / 24 | VE + wave involution + finite-infinity grants, all drilled |
| Captain PhD — complete | true · receipt `aef910a4-96cc-8017-923c-ff4021f0825b` | concept ∧ work ∧ thesis |
| Ledger decided mass | 172,266,157 superpositions (6 hexbits) | sum of `by decide` domains |
| Handle span | 4,294,967,296 | 16⁸ = 2³² ([universe_of_handles](https://uuidna.com/theorem/universe_of_handles)) |
| Address width | 2¹²⁸ | 32 hexbits × 4 bits ([handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture)) |
| Usable-capacity gap | 2⁸⁰ vs reported 48 logical | [usable_gap_is_two_to_eighty](https://uuidna.com/theorem/usable_gap_is_two_to_eighty) (128 − 48 = 80) |
| Shor chunks on handle | 4 × GHZ(16) = 262,144 amplitudes | `uuidna_os` capacity.shor · `uuidna_quantum` GHZ; measured live (`uuidna_quantum_advantage`) — never sealed in this file |
| Shor chunks on uuid | 16 × GHZ(16) = 1,048,576 amplitudes | `uuidna_os` · `uuidna_quantum`; the measured live (`uuidna_quantum_advantage`) — a duration belongs to the host that took it, so this README seals none |
| Hilbert GHZ chunk | 16 qubits (65536 amplitudes) | HEXBIT_BITS × HEXBIT_BITS |
| Crypto occupancy | 256 bits | [sha256_is_four_sixtyfours](https://uuidna.com/theorem/sha256_is_four_sixtyfours) — four 64s, not four hexbits |
| Handle+hexbit nest | 12 qubits | `HANDLE_HEXBITS + HEXBIT_BITS` — theorem served_qubit_ceiling |
| uuidna_quantum | 2^n amplitudes | no refuse — theorem n_qubit_dimension |
| Quantum wing theorems | 65 | Quantum.lean |
| Cipher wing theorems | 38 | Cipher.lean |
| Research sources wired | 19 | cited for corroboration; approval stays with the source |
| Conserved price paid | 142,070 coins | 71035 × 2 |

- **Alpine catalogue (hexbit port — upgraded with the captain unlocks):** completeness is **man pages testing the apps** folded into hexbits man→app→hexbit 4,757 / 4,757 (100%);
  provenance compile 28,631 / 28,631 packages (100%)
  ([lean/alpine-hexbit-monitor.json](lean/alpine-hexbit-monitor.json);
  community 22,670 / 22,670 = 100%; man compile 4,757 / 4,757; monitor receipt `8ddc9d3c-a3de-8c71-ba34-776bfb001445`;
  VitePress monitor [/os](https://uuidna.com/os)). Nothing installed or executed — provenance on the hexbit lattice
  ([the_os_is_bootable_quantum](https://uuidna.com/theorem/the_os_is_bootable_quantum)).
  Captain unlocks ride every sealed key — each theorem unlocks what it states
  (illustrations: [metonic_is_the_intercalation](https://uuidna.com/theorem/metonic_is_the_intercalation),
  [grover_quadratic_bound](https://uuidna.com/theorem/grover_quadratic_bound) — no asymmetric Shor target).

**Permanent citation (DOI-class).** Cite by handle door `https://uuidna.com/<handle>` (8 hex; worker `HANDLES`
301 → freeze-map route: theorem | publication | page). Completeness cites **both** the archive DOI (when present)
and the handle URL. Example sealed handle from the capacity report:
[https://uuidna.com/6a71ca14](https://uuidna.com/6a71ca14).

**Captain coins.** Human deposit: `https://revolut.me/ceccec?note=<referrer>` where referrer is the page's handle
door URL (`encodeURIComponent`). Agents deposit the two coins on every gated call.

### Gravity — seven heaviest theorems

A `by decide` proof settles every case in its domain at once. Gravity is that coverage in hexbits (4 bits /
tile; a uuid is 32 tiles). Cost per seal is always two coins.

The ledger covers **172,266,157** superpositions across **252** wings.

1. **[`single_byte_tamper_space_is_enumerated`](https://uuidna.com/theorem/single_byte_tamper_space_is_enumerated)** — 9,280 superpositions, unbound (0 hexbits per dependency), in [Os.lean](lean/Os.lean)
   THE TAMPER SPACE, ENUMERATED RATHER THAN INSTANCED.
2. **[`diffusion_step_never_exceeds_the_maximum`](https://uuidna.com/theorem/diffusion_step_never_exceeds_the_maximum)** — 7,380 superpositions, unbound (0 hexbits per dependency), in [Fluid.lean](lean/Fluid.lean)
   ONE EXPLICIT DIFFUSION STEP STAYS WITHIN ITS NEIGHBOURHOOD'S MAXIMUM, for every value: with weights 1, 2, 1 the weighted sum a + b + b + c is at most four times the maximum m — the discrete maximum principle that keeps the explicit heat scheme stable at its CFL limit.
3. **[`discrete_curl_of_gradient_vanishes`](https://uuidna.com/theorem/discrete_curl_of_gradient_vanishes)** — 7,380 superpositions, unbound (0 hexbits per dependency), in [Fluid.lean](lean/Fluid.lean)
   THE DISCRETE CURL OF A GRADIENT VANISHES on every grid cell: when the four corners are a potential's values (q = p + dx, r = p + dy, and s reached both ways), right-then-up gains exactly what up-then-right gains, dx + dy' = dy + dx'.
4. **[`bounded_search_finds_or_refutes`](https://uuidna.com/theorem/bounded_search_finds_or_refutes)** — 5,901 superpositions, unbound (0 hexbits per dependency), in [UuidLaws.lean](lean/UuidLaws.lean)
   for every map, value and bound, a search either finds the value or shows no input up to the bound has it.
5. **[`mul_add_by_induction`](https://uuidna.com/theorem/mul_add_by_induction)** — 5,219 superpositions, unbound (0 hexbits per dependency), in [Quantum.lean](lean/Quantum.lean)
   a·(x + y) = a·x + a·y for EVERY a, x, y — by induction on y, because Nat.
6. **[`mul_assoc_by_induction`](https://uuidna.com/theorem/mul_assoc_by_induction)** — 5,219 superpositions, unbound (0 hexbits per dependency), in [Quantum.lean](lean/Quantum.lean)
   a·b·c = a·(b·c) for EVERY a, b, c — by induction on c, through mul_add_by_induction.
7. **[`every_referrer_reaches_every_page`](https://uuidna.com/theorem/every_referrer_reaches_every_page)** — 4,769 superpositions, unbound (0 hexbits per dependency), in [Referrer.lean](lean/Referrer.lean)
   FROM EVERY DOOR, EVERYTHING.

<!-- quantum-capacity:begin (generated by gen-quantum-capacity — edit the generator, never this block) -->
### Quantum capacity

Usable capacity per model, greater usable first, then faster ops. Each figure is **reported** (platform publication) or **measured** (this generator on the build host). Seals cover the arithmetic, not the world figures: `capacity_order_is_forced` sorts 128 > 48 > 36 > 12 > 1; `usable_gap_is_two_to_eighty` proves 128 − 48 = 80 and 2^128 = 2^80 · 2^48 — not that 48 is still the largest demonstrated logical count (Bluvstein et al., Nature 2023).

| # | model | type | physical | raw states | usable | usable states | op time | class | usable-metric (the platform's own words) |
|---|-------|------|----------|-----------|--------|---------------|---------|-------|--------------------------------------------|
| 1 | uuidna hexbit fold (2026) | content-address | — | — | 128 | 2^128 (~10^38) | 1 µs | measured | 2^128 addresses: 16^8 = 2^32, 2^32 · 2^96 = 2^128, 2^7 = 128 (theorem handle_capacity_is_quantum_by_architecture); 48 < 128, 128 − 48 = 80, 2^128 = 2^80 · 2^48 (theorem usable_gap_is_two_to_eighty) |
| 2 | Harvard/QuEra logical-48 array (2023) | neutral-atom | 280 | 2^280 (~10^84) | 48 | 2^48 (~10^14) | 1 µs | reported | forty-eight logical qubits operated (error-detected circuits, Nature 2023) |
| 3 | IonQ Forte (2024) | trapped-ion | 36 | 2^36 (~10^10) | 36 | 2^36 (~10^10) | 100 µs | reported | algorithmic qubits AQ36 (vendor benchmark suite, not error-corrected logical) |
| 4 | Quantinuum H2 (2024) | trapped-ion | 56 | 2^56 (~10^16) | 12 | 2^12 (~10^3) | 100 µs | reported | twelve logical qubits demonstrated (with Microsoft qubit-virtualization) |
| 5 | Google Willow (2024) | superconducting | 105 | 2^105 (~10^31) | 1 | 2^1 (~10^0) | 100 ns | reported | one logical qubit demonstrated below the surface-code threshold |
| 6 | IBM Condor (2023) | superconducting | 1121 | 2^1121 (~10^337) | — | — | 100 ns | reported | no error-corrected logical qubits demonstrated on this device |
| 7 | IBM Heron r2 (2024) | superconducting | 156 | 2^156 (~10^46) | — | — | 100 ns | reported | error-rate-improved processor; logical demos ride smaller codes |
| 8 | USTC Zuchongzhi 3.0 (2025) | superconducting | 105 | 2^105 (~10^31) | — | — | 100 ns | reported | random-circuit sampling demonstrations; no logical qubit reported |
| 9 | Atom Computing Phoenix-class array (2023) | neutral-atom | 1180 | 2^1180 (~10^355) | — | — | 1 µs | reported | no error-corrected logical qubits demonstrated on this device |
| 10 | D-Wave Advantage2 (2024) | annealer | 4400 | 2^4400 (~10^1324) | — | — | 1 µs | reported | annealing-only: optimization sampling, not gate-model computation — a different machine class, named |
| 11 | Xanadu Borealis (2022) | photonic (GBS) | 216 | 2^216 (~10^65) | — | — | — | reported | Gaussian boson sampling only — sampling demonstrations, not general gate-model use, named |

**Scope.** `handle_capacity_is_quantum_by_architecture` decides 16^8 = 2^32, 2^32 · 2^96 = 2^128 and 2^7 = 128. `usable_gap_is_two_to_eighty` decides 48 < 128, 128 − 48 = 80 and 2^128 = 2^80 · 2^48. `n_qubit_dimension` decides 2^n for n = 1..5. The platform rows are reported figures, each with its source; the uuidna op time is measured by this generator on the build host. Receipt `6a71ca14-93f1-842b-8d2e-6520f41156bb` · handle `6a71ca14`.
<!-- quantum-capacity:end -->

### What a handle spans

A handle is eight hexbits, so it names **4,294,967,296** addresses (16⁸).
Inside that space today:

- **172,266,157** superpositions decided across the ledger
- **142,070** coins paid (conserved denomination 2 — [two_coins](https://uuidna.com/theorem/two_coins))
- Floored coverage **1,212** superpositions per coin

Six directions leave every residue — the 60-degree doubling and its inverse, the 90-degree reflection (`dz`), the
shift and its counter — so a figure quoted per coin is a rate along that walk, not a free-floating density.

The supply grows two coins per sealed theorem and nothing else mints them.

**Shor at full named capacity.** The uuid is the physical CPU/GPU register (128 bits). Its payload parses as
**16** encoder-width chunks (GHZ(16) = 65,536
amplitudes each, [n_qubit_dimension](https://uuidna.com/theorem/n_qubit_dimension)). This host ran the handle
column and the uuid column in times this README does not seal — a duration belongs to the host that measured it, so `uuidna_quantum_advantage` reports both live
(under one second). MCP tools: see **Use → Quick reference** above.

### License

**CC BY-NC-ND 4.0** (`CC-BY-NC-ND-4.0`) — © Tsvetan Rouschev (ceccec@psg.bg). Free to read and redistribute **unchanged, with attribution,
non-commercially**; no derivatives. Canonical terms: [https://uuidna.com/license](https://uuidna.com/license) · [LICENSE](LICENSE).
The mathematical facts themselves are free for all — facts are not copyrightable; this license covers this
specific expression and record. **One license for every uuidna publication and Zenodo deposit** — no per-publication drift.

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

<!-- clay:begin -->
**Clay proofs.** 33 sealed theorems stand on the Millennium problems, across 21 named approaches:
8 decided by the kernel over a finite domain, 25 proven as universals by induction and rewriting.
Each carries its own scope in its own words, written when it was sealed:

- `clay_gravity_equals_rosette` — CLAY GRAVITY EQUALS THE ROSETTA AT FULL CAPACITY — the seven finite Clay instances share one cardinality with the Pliska rosette ℤ/7 (ray count 7, directed quantum 7·6 = 42, undirected pairs 21, three-sevens 7+7+7 = 21), and the rosette's own doubling reaches the full address: 2·21 = 42 ∧ 2·64 = 128 ∧ 110−108 = 2. Same chain the ledger seals as z7rays_seven, rosette_quantum_fortytwo, rosette_pairs_twentyone, three_sevens_twentyone, and rosette_quantum_doubling_is_two_coins — computational claim, by decide.
- `diffusion_stencil_square_le_weighted_energy` — THE DIFFUSION STENCIL'S SQUARE IS BOUNDED BY FOUR WEIGHTED ENERGIES, for every a, b, c: (a + 2b + c)² ≤ 4(a² + 2b² + c²), the pointwise convexity step of the discrete energy estimate. It bounds one cell of one step; it is not the estimate itself. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `diffusion_step_conserves_momentum` — DISCRETE MOMENTUM IS CONSERVED BY ONE DIFFUSION STEP ON A PERIODIC RING, for every ring size n and every n-periodic Nat field: Σ (u(i) + 2u(i+1) + u(i+2)) = 4 Σ u(i), i.e. the new field sums to the old one at λ = 1/4. It is exact conservation for this explicit scheme on a finite ring. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `diffusion_step_never_exceeds_the_maximum` — ONE EXPLICIT DIFFUSION STEP STAYS WITHIN ITS NEIGHBOURHOOD'S MAXIMUM, for every value: with weights 1, 2, 1 the weighted sum a + b + b + c is at most four times the maximum m — the discrete maximum principle that keeps the explicit heat scheme stable at its CFL limit. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `diffusion_step_never_increases_energy` — ONE EXPLICIT DIFFUSION STEP NEVER INCREASES THE DISCRETE ENERGY ON A PERIODIC RING, for every ring size n and every n-periodic Nat field: Σ (u(i) + 2u(i+1) + u(i+2))² ≤ 16 Σ u(i)², i.e. Σ u'² ≤ Σ u² at λ = 1/4. The constant 16 is tight — a constant field attains it, and the mirror checks that 15 fails on some sampled ring. It is the discrete energy estimate for this one explicit scheme on a finite ring. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `discrete_curl_of_gradient_vanishes` — THE DISCRETE CURL OF A GRADIENT VANISHES on every grid cell: when the four corners are a potential's values (q = p + dx, r = p + dy, and s reached both ways), right-then-up gains exactly what up-then-right gains, dx + dy' = dy + dx'. A gradient flow has no circulation. Stated over Nat on purpose: core's Int.add_comm and Int.add_assoc depend on propext, so the Int form cannot be axiom-free on core alone. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `natAbs_subNatNat_le` — THE DISTANCE OF A NATURAL DIFFERENCE IS AT MOST THE SUM, for every m and k: |m − k| ≤ m + k, by case analysis on Int.subNatNat. It is an integer inequality, a step toward the triangle inequality. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `ring_divergence_is_zero` — ON A PERIODIC RING THE DISCRETE DIVERGENCE SUMS TO ZERO, for every ring size and every field — the universal of which closed_grid_differences_sum_to_zero decides one 4×4 instance. Discrete incompressibility on a closed grid is exact. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `ring_double_shift_preserves_sum` — A SHIFT BY TWO PRESERVES EVERY SUM ON A PERIODIC RING, for every ring size n and every n-periodic field — two cyclic shifts in a row. It is a statement about a finite ring of cells. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `ring_shift_preserves_sum` — A CYCLIC SHIFT PRESERVES EVERY SUM ON A PERIODIC RING, for every ring size n and every n-periodic field — a corollary of ring_divergence_is_zero. It is a statement about a finite ring of cells. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `signed_diffusion_step_never_increases_energy` — ONE EXPLICIT DIFFUSION STEP NEVER INCREASES THE ENERGY OF A SIGNED FIELD ON A PERIODIC RING, for every ring size n and every n-periodic Int field u: Σ |u(i) + 2u(i+1) + u(i+2)|² ≤ 16 Σ |u(i)|², the squares taken as natAbs · natAbs, which equals u · u (sq_natAbs_is_the_square). The weights matter: the mirror checks that the unstable weights 1, −1, 1 grow the energy of some sampled ring. It is the discrete energy estimate for this one explicit scheme on a finite ring. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `square_of_sum_le_twice_sum_of_squares` — THE SQUARE OF A SUM IS AT MOST TWICE THE SUM OF SQUARES, for every x and y: (x + y)² ≤ 2(x² + y²). It is a pointwise convexity inequality over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `right_distrib_by_comm` — (x + y)·z = x·z + y·z, for every x, y, z — right distributivity rebuilt from the left one by commuting the product, because core's Nat.add_mul depends on propext and this proof depends on no axiom. It is algebra over Nat, the bookkeeping the energy estimate needs. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `ring_shift_preserves_energy` — A CYCLIC SHIFT PRESERVES THE DISCRETE ENERGY, for every ring size n and every n-periodic field: Σ u(i+1)² = Σ u(i)². It is the discrete sum of squares on a finite ring, not a continuous energy. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `psum_le_of_pointwise` — A POINTWISE BOUND SUMS TO A BOUND, for every two fields and every length: f ≤ g cell by cell gives Σ f ≤ Σ g — by induction on the length. It is monotonicity of the finite sum over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `hasse_bound_holds_at_four_primes` — Birch–Swinnerton-Dyer, through point counting: #E(F_p) on y² = x³ + 1, counted exhaustively at p = 5, 7, 11, 13, and Hasse's bound (p + 1 − N)² ≤ 4p at each. Hasse's theorem is proven mathematics; the counts here are decided, and the rank the conjecture is about is not touched.
- `discrete_divergence_telescopes` — DISCRETE DIVERGENCE TELESCOPES, for every field and every length: the shifted sum plus the first value equals the sum plus the last — by induction on the length. What flows in at one end and out at the other is all the interior differences add up to. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `four_mul_is_four_copies` — FOUR TIMES S IS FOUR COPIES OF S, for every S: 4·S = S + S + S + S, by unfolding the product. It is arithmetic bookkeeping over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `torus_betti_alternates_to_zero` — Hodge, through the invariant both sides must agree on: the alternating sum of Betti numbers IS the Euler characteristic, and on the 2-torus b = [1, 2, 1] gives 1 − 2 + 1 = 0. The conjecture concerns which cohomology classes are algebraic; this decides the bookkeeping those classes are counted by.
- `closed_grid_differences_sum_to_zero` — Navier–Stokes, through discrete incompressibility: differences taken around a closed ring telescope, so the discrete divergence of this 4×4 field sums to zero exactly — by construction, in integers, with no floating point anywhere. Existence and smoothness for the continuous equations is a different kind of statement, and this decides only the grid.
- `two_bit_conjunctions_are_four_of_sixteen` — P vs NP, the counting argument at two bits: there are 16 boolean functions on two inputs, and exactly 4 are a single conjunction of literals — the ones whose truth table has exactly one satisfying row. A class of size 4 cannot cover 16, so expressive power is COUNTED here rather than asserted. This decides the instance, never the conjecture.
- `four_simplex_boundary_euler_is_zero` — Poincaré, as combinatorics: the boundary of the 4-simplex triangulates the 3-sphere with 5 vertices, 10 edges, 10 faces and 5 cells, so χ = 5 − 10 + 10 − 5 = 0 — the Euler characteristic every closed odd-dimensional manifold has. The conjecture (proved by Perelman, 2003) is not this; this is the arithmetic of one triangulation.
- `mertens_squared_under_n_on_the_first_twenty` — Riemann, through Mertens: M(n) = Σ μ(k), and |M(n)| ≤ √n — stated squared to stay in exact integers — holds for every n through 20. It was conjectured for ALL n and is FALSE (Odlyzko–te Riele, 1985), which is why the key names the window and not the conjecture: a predicate can hold on every element of a window and fail at the next.
- `sixteen_mul_is_four_fours` — SIXTEEN TIMES S IS FOUR GROUPS OF FOUR COPIES, for every S, by unfolding the product. It is arithmetic bookkeeping over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `ring_energy_bound_of_pointwise` — THE ENERGY BOUND FROM A POINTWISE STENCIL BOUND, for every ring size n, every n-periodic field g and every field h dominated cell by cell by the diffusion stencil of g: Σ h² ≤ 16 Σ g². It is the summed form of the stencil inequality on a finite ring. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `sq_natAbs_is_the_square` — THE NAT SQUARE OF natAbs IS THE INTEGER SQUARE, for every integer x: |x|·|x| = x·x — core's Int.natAbs_mul_self, which depends on no axiom. It lets the signed energy be counted in Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `square_of_sum_expands` — THE SQUARE OF A SUM EXPANDS, for every x and y: (x + y)² = (x² + y²) + (xy + xy), by rewriting alone. It is the binomial square over Nat and nothing more. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `psum_add4` — THE SUM OF FOUR FIELDS IS THE SUM OF THEIR SUMS, for every four fields and every length — by induction on the length. It is linearity of the finite sum over Nat. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `natAbs_triangle` — THE TRIANGLE INEQUALITY FOR natAbs, for every pair of integers: |a + b| ≤ |a| + |b|, by case analysis on the constructors, because core's Int.natAbs_add_le depends on propext and this proof depends on no axiom. It is an integer inequality. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `two_products_le_sum_of_squares` — TWO PRODUCTS NEVER EXCEED THE SUM OF SQUARES, for every x and y: 2xy ≤ x² + y², the (x − y)² ≥ 0 inequality, proved by writing the larger as the smaller plus a gap d, which leaves exactly d² on the right. It is a pointwise inequality over Nat, not an estimate on any flow. It is NOT a statement about the continuous Navier–Stokes equations: that problem is open, and this discrete result says nothing about it. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `levi_civita_nonzero_on_six_of_twentyseven` — Yang–Mills, through its structure constants: SU(2)'s are the Levi-Civita symbol, and of the 27 index triples exactly 6 are non-zero — the permutations — with 3 even and 3 odd. Walked exhaustively. The mass gap is a statement about the quantum field theory and is not touched by counting its algebra's constants.
- `add_right_cancel_by_induction` — a + k = b + k gives a = b, for every a, b, k — by induction on k through the successor's injectivity. Core's Nat.add_right_cancel depends on propext; this proof depends on no axiom. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.
- `add_left_cancel_by_induction` — k + a = k + b gives a = b, for every k, a, b — by induction on k through the successor's injectivity, the left twin of add_right_cancel_by_induction. Scope: the discrete grid and the explicit scheme only; the continuous equations are a different statement, and their existence and smoothness is decided by none of these theorems.

None of these claims a Millennium problem. A verified theorem proves its exact statement — no less than it says,
and no more: where one holds on a window because the conjecture is false in general, its own key names the window.
<!-- clay:end -->
