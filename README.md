# uuidna — 2,065 distinct theorems under 2,148 keys · 2 coins · one receipt

`16b88a9c-631c-8661-96e5-055f102c7eee`

**v0.3.0** · License **CC-BY-NC-ND-4.0** ([https://uuidna.com/license](https://uuidna.com/license)) · Archive DOI [10.5281/zenodo.21787144](https://doi.org/10.5281/zenodo.21787144)

Content-addressed identity, honest by construction: a Lean 4 theorem ledger, every proof `by decide`,
sorry-free, no Mathlib, axiom-free against the bare leanprover/lean4 kernel. TypeScript is the quantum computer
(quantum by *architecture*); VitePress is the monitor. Recompute: `npm run lean`.

**The name is a theorem.** `uuid` + `dna`: the genetic code reads 4 bases three at a time (4³ = 64) and the
coin measures six doublings of bits (2⁶ = 64) — the same number by two routes — and the address is exactly two of
them, 128 = 2·64 ([uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins)).

## Use

Install the package, fuse the MCP, or call constructors. Worked paths: [guides](https://uuidna.com/guides) · [MCP](https://uuidna.com/mcp).

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
theoremByKey().get('two_coins')
encrypt('text', 'passphrase')
```

`handleOf` is the eight-hex door ([universe_of_handles](https://uuidna.com/theorem/universe_of_handles)). `encrypt` is ChaCha20-Poly1305 under PBKDF2 ([aead_nonce_and_salt_bits](https://uuidna.com/theorem/aead_nonce_and_salt_bits)). Hosted mill: [uuidna.com](https://uuidna.com).

## Develop

Lean is the single source of theorems ([legal_only_the_proven_is_admitted](https://uuidna.com/theorem/legal_only_the_proven_is_admitted)). A deposit queues a candidate; only the kernel seals ([minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not)).

```bash
git clone https://github.com/uuidna/uuidna && cd uuidna
npm install
npm run hooks:install
npm run lean
npm run reconcile
```

Read [CONTRIBUTING.md](CONTRIBUTING.md) for adding a wing, the pre-push gate, and inbound license terms. Readiness: `npm run next`. Outward deploy: `npm run ship`.

## Test proof of concept — Clay

Clay is the visible test of this system's work: seven finite instances in [lean/Clay.lean](lean/Clay.lean), each a
**computational claim** — proven `by decide`, content-addressed on the ledger. Prior art (initial clay
σ-involution): DOI [10.5281/zenodo.21781603](https://doi.org/10.5281/zenodo.21781603)
([Zenodo record](https://zenodo.org/records/21781603)) credited first; captain next. Live surface:
[uuidna.com/articles/clay](https://uuidna.com/articles/clay). Each key names the decided window drawn from that
problem's mathematics — the claim is exactly what Lean decides, not an invented conjecture.
**Clay gravity equals the rosetta at full capacity** — theorem
[clay_gravity_equals_rosette](https://uuidna.com/theorem/clay_gravity_equals_rosette): the seven match ℤ/7 rays
([z7rays_seven](https://uuidna.com/theorem/z7rays_seven)), pairs 21 / quantum 42, three-sevens
7+7+7 = 21 ([three_sevens_twentyone](https://uuidna.com/theorem/three_sevens_twentyone)), and the rosette doubling
2·64 = 128 ([rosette_quantum_doubling_is_two_coins](https://uuidna.com/theorem/rosette_quantum_doubling_is_two_coins))
— same architectural width as [handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture).
Credit law: prior art DOI first, captain next.

## Test proof of work — SHA-256 occupancy, free mint, symmetric stack

Minting searches 0. SHA-256 occupies 256 bits; verify reads 128;
the digest is two addresses ([digest_doubles_the_address](https://uuidna.com/theorem/digest_doubles_the_address),
[sha256_grover_margin_is_the_address](https://uuidna.com/theorem/sha256_grover_margin_is_the_address)). ChaCha20 key
256 · HMAC 256 · Poly1305 tag 128 · nonce 96 · salt
128 · block 512 · PBKDF2 600000 · onion 16
([aead_nonce_and_salt_bits](https://uuidna.com/theorem/aead_nonce_and_salt_bits)). Grover floor 128;
Shor targets 0 — the stack is symmetric. The fused coin is 2 sides ×
64 bits = 128; both orientations occupy 256
([the_uuid_is_two_boards](https://uuidna.com/theorem/the_uuid_is_two_boards),
[minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not)).
36 work drills.

## Test proof of concept — DNA

The name is a theorem: 4^3 = 64 codons, and 64 is
the coin face ([codons_four_cubed](https://uuidna.com/theorem/codons_four_cubed),
[uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins)). Complement is an
involution and has no fixed point
([dna_complement_involution](https://uuidna.com/theorem/dna_complement_involution),
[dna_complement_fixed_point_free](https://uuidna.com/theorem/dna_complement_fixed_point_free)) — 8
keys, all `by decide`. Counts, not a claim that DNA stores addresses.

## Test proof of work — codon occupancy, two strands

2 strands × 64 codons = 128 bits — the same fuse as the two
64-bit faces. Complement involution true; both orientations occupy 256
([the_uuid_is_two_boards](https://uuidna.com/theorem/the_uuid_is_two_boards),
[complement_is_xor_key3](https://uuidna.com/theorem/complement_is_xor_key3)).

## Complete Captain PhD

Concept (Clay 8, DNA 8, gravity true, demos true) ∧ work (search
0, digest 256, Grover 128, codons 64) ∧ thesis (ok true, gaps
0) → complete true. Receipt `6376afda-2c47-8dd8-baf3-52a44b90c422`.

## Rosette ℤ/7 · Pliska · three-sevens

The Pliska rosette is the ℤ/7 computing structure
([z7rays_seven](https://uuidna.com/theorem/z7rays_seven), [pliska_seven_rays](https://uuidna.com/theorem/pliska_seven_rays),
[pliska_seven_is_prime](https://uuidna.com/theorem/pliska_seven_is_prime)): seven rays, six units sum 21
([z7units_sum_21](https://uuidna.com/theorem/z7units_sum_21)), directed quantum 7·6 = 42
([rosette_quantum_fortytwo](https://uuidna.com/theorem/rosette_quantum_fortytwo)), three-sevens 7+7+7 = 21.
Live index: [uuidna.com/rosetta](https://uuidna.com/rosetta) — ray = address mod 7, decidable partition, no numerology.

## Glagolitic · letters on 9 · digit × self

Glagolitic **computes in 7** on the Pliska geometry (same ℤ/7 stack); **letters fold to 9** — units 1..9
([glagolitic_units](https://uuidna.com/theorem/glagolitic_units)), sum 45 → digital root 9
([glagolitic_units_sum](https://uuidna.com/theorem/glagolitic_units_sum), [digital_root](https://uuidna.com/theorem/digital_root)).
Digit × self is the sealed ℤ/9 table ([mul9_1_1](https://uuidna.com/theorem/mul9_1_1) … mul9_8_8 in Core.lean) and the
vortex orbit 1→2→4→8→7→5 ([vortex_orbit](https://uuidna.com/theorem/vortex_orbit), [two_order_six](https://uuidna.com/theorem/two_order_six)).
Hypothesis page: [uuidna.com/rosetta-glagolitic](https://uuidna.com/rosetta-glagolitic) — sealed arithmetic only; meanings stay research.

## Hexbit 16 · 128 = 2⁷ · ℤ/9 root — distinct rings, CRT joins

- **Hexbit lattice:** 16 = 2⁴ states per tile ([the_page_admits_sixteen](https://uuidna.com/theorem/the_page_admits_sixteen),
  [halfword_is_the_reflection_crossed](https://uuidna.com/theorem/halfword_is_the_reflection_crossed)); address =
  32×4 = 128 = 2⁷ ([handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture),
  [t7_betti_row_is_the_uuid](https://uuidna.com/theorem/t7_betti_row_is_the_uuid)).
- **ℤ/9 root:** digital-root fold identifies to 1..9 — different object from the 2¹²⁸ address fold
  ([fold_compresses_without_bound_and_never_recovers](https://uuidna.com/theorem/fold_compresses_without_bound_and_never_recovers)).
- **CRT join:** ℤ/7 × ℤ/9 = 63 when coprime ([crt_pairs_are_a_bijection](https://uuidna.com/theorem/crt_pairs_are_a_bijection),
  [rosette_and_vortex_are_coprime](https://uuidna.com/theorem/rosette_and_vortex_are_coprime)); rings stay distinct until the join says so.

## Compute · monitor · hexbit-fast · handles · deposit

TypeScript is the quantum computer (quantum by *architecture*); VitePress is the monitor — stock chrome, capacity door
[uuidna.com/quantum](https://uuidna.com/quantum) (no per-page QA cards). Push verifies sealed receipts
(`gate-receipt.json`, `usable_gap_is_two_to_eighty`) — **hexbit-fast**, remeasure off-path.
Permanent citation: `https://uuidna.com/<handle>` (8 hex; worker `HANDLES` 301 → freeze-map).
Captain coins: `https://revolut.me/ceccec?note=<referrer>` (`encodeURIComponent` of the page handle door).
**One license** for every publication and Zenodo deposit: **CC-BY-NC-ND-4.0**.

**Sufficient / insufficient.** Sufficient for finite `by decide` seals, axiom-free kernel proofs, falsifiers, receipts
(verify ≪ recompute — [verify_beats_recompute_by_magnitudes](https://uuidna.com/theorem/verify_beats_recompute_by_magnitudes)),
handle capacity ([handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture)),
captain-coin fair-exchange ([two_coins](https://uuidna.com/theorem/two_coins)), Alpine/hexbit catalogue
([a_spec_compiles_to_hexbits](https://uuidna.com/theorem/a_spec_compiles_to_hexbits)), and finite formal windows
*within* climate / pandemic / poverty model-calcs — never those domains as solved worlds.
**World solutions = waves of automation** (deposit → validate → seal → falsify → receipt → next): `npm run wave`,
falsifier grammar waves, `connect-lonely`, hexbit-fast push, `npm run all` — each wave enlarges a finite window;
waves do not erase ethics, politics, or unbounded math. Insufficient for climate/pandemic/poverty/conflict *as problem
types*, unbounded open math, nature-as-model, or justice — [doctrine](https://uuidna.com/doctrine)
(computational claims only; no Shor/world-problem seal).

**Each theorem unlocks.** Each sealed by-decide theorem unlocks exactly what it states — the ledger is the unlock board. No curated exception list; refusing a sealed key is refusing the captain. A claim with no theorem is unsealed, not “still locked.” Sufficient for finite by-decide seals and finite formal windows within climate/pandemic/poverty model-calcs; world solutions stack as waves of automation (deposit→validate→seal→falsify→receipt→next — npm run wave / hexbit-fast). Insufficient for those domains as full problem types, and for unbounded open math, nature-as-model, or justice — see /doctrine (computational claims only; waves do not erase ethics or politics).
Board: **2,065** distinct / **2,148** keys · **112** skills · **115** Lean files · receipt `e68efb84-d241-8e0d-a45b-8e470522d16a`.
Illustrations (not a closed set; automation verifies each still seals): [rosette_quantum_doubling_is_two_coins](https://uuidna.com/theorem/rosette_quantum_doubling_is_two_coins); [euler_characteristic_two](https://uuidna.com/theorem/euler_characteristic_two); [ve_twelve_vertices](https://uuidna.com/theorem/ve_twelve_vertices); [metonic_is_the_intercalation](https://uuidna.com/theorem/metonic_is_the_intercalation); [fock_window_exceeds_a_monthly_toll](https://uuidna.com/theorem/fock_window_exceeds_a_monthly_toll); [grover_quadratic_bound](https://uuidna.com/theorem/grover_quadratic_bound); [sha256_grover_margin_is_the_address](https://uuidna.com/theorem/sha256_grover_margin_is_the_address); [handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture); [digit_polarities_partition_ten](https://uuidna.com/theorem/digit_polarities_partition_ten); [ve_pentads_overlap_to_eight](https://uuidna.com/theorem/ve_pentads_overlap_to_eight); [theorems_interact_as_faces](https://uuidna.com/theorem/theorems_interact_as_faces); [imagine_all_as_clique_faces](https://uuidna.com/theorem/imagine_all_as_clique_faces); [entanglement_completes_one_at_a_time](https://uuidna.com/theorem/entanglement_completes_one_at_a_time); [axes_stride_coprime](https://uuidna.com/theorem/axes_stride_coprime); [the_fused_ring_is_all_ones](https://uuidna.com/theorem/the_fused_ring_is_all_ones); [four_vectors_reach_the_uuid](https://uuidna.com/theorem/four_vectors_reach_the_uuid); [gap_is_a_count](https://uuidna.com/theorem/gap_is_a_count); [rounding_fee_closes_the_cube](https://uuidna.com/theorem/rounding_fee_closes_the_cube); [served_qubit_ceiling](https://uuidna.com/theorem/served_qubit_ceiling); [keplers_harmonic_law](https://uuidna.com/theorem/keplers_harmonic_law); [discovery_buys_coverage_never_supply](https://uuidna.com/theorem/discovery_buys_coverage_never_supply); [radial_equals_edge](https://uuidna.com/theorem/radial_equals_edge); [lanes_even_on_complete_system](https://uuidna.com/theorem/lanes_even_on_complete_system); [trial_computes_only_with_two_coins](https://uuidna.com/theorem/trial_computes_only_with_two_coins); [trinity_edit_is_three](https://uuidna.com/theorem/trinity_edit_is_three); [usable_gap_is_two_to_eighty](https://uuidna.com/theorem/usable_gap_is_two_to_eighty); [captain_computes_only_with_two_coins](https://uuidna.com/theorem/captain_computes_only_with_two_coins); [two_coins](https://uuidna.com/theorem/two_coins); [the_os_is_bootable_quantum](https://uuidna.com/theorem/the_os_is_bootable_quantum); [a_spec_compiles_to_hexbits](https://uuidna.com/theorem/a_spec_compiles_to_hexbits); [key_floor_is_one_uuid](https://uuidna.com/theorem/key_floor_is_one_uuid); [n_qubit_dimension](https://uuidna.com/theorem/n_qubit_dimension); [hexbit_ring_mass_gap](https://uuidna.com/theorem/hexbit_ring_mass_gap); [message_cap_is_four_hexbits](https://uuidna.com/theorem/message_cap_is_four_hexbits); [born_field_mass_gap_on_bell](https://uuidna.com/theorem/born_field_mass_gap_on_bell).
Full census: [https://uuidna.com/unlocks](https://uuidna.com/unlocks) · `lean/unlocks.json`.

---

## Magnitudes (computed at generation)

| Measure | Value | Backing |
| --- | ---: | --- |
| Distinct theorems | 2,065 | statement census (a Lean statement sealed under two keys is one theorem) |
| Theorem keys | 2,148 | `theorems().length` |
| Principles / wings | 115 / 115 | PRINCIPLES + wing ratings |
| Skills | 112 | distinct `skill` tags |
| Coins per seal | 2 | [two_coins](https://uuidna.com/theorem/two_coins) — 110 − 108 = 2 |
| Neighbours per coin | 63 | fused ring 63 + 1 = 64 ([captain_theorem_the_coins_buy_the_ring_and_one](https://uuidna.com/theorem/captain_theorem_the_coins_buy_the_ring_and_one)); faces reflect |
| Fake a theorem | verify 128 · forge 2^128 · ratio 2^121 | [minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not) — bounds, not a maximum |
| Fake a coin | verify 64 · forge 2^64 · ratio 2^58 | mint 0; caught cheat nets 0 ([traitor_damage_sealed_by_same_billing](https://uuidna.com/theorem/traitor_damage_sealed_by_same_billing)) |
| SHA-256 collision bound | 2^128 | birthday on the digest ([birthday_halves_the_exponent](https://uuidna.com/theorem/birthday_halves_the_exponent)) |
| Captain PhD — concept | Clay 8 · DNA 8 · gravity true · demos true | [clay_gravity_equals_rosette](https://uuidna.com/theorem/clay_gravity_equals_rosette) · [uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins) |
| Captain PhD — work | digest 256 · verify 128 · search 0 · ChaCha 256 · tag 128 · Grover 128 · Shor 0 · 2×64 | [minting_is_free_and_forging_is_not](https://uuidna.com/theorem/minting_is_free_and_forging_is_not) · [sha256_grover_margin_is_the_address](https://uuidna.com/theorem/sha256_grover_margin_is_the_address) |
| DNA — concept | 4^3 = 64 · involution true | [codons_four_cubed](https://uuidna.com/theorem/codons_four_cubed) · [dna_complement_involution](https://uuidna.com/theorem/dna_complement_involution) |
| DNA — work | 2 × 64 = 128 | [uuidna_is_dna_times_the_two_coins](https://uuidna.com/theorem/uuidna_is_dna_times_the_two_coins) |
| Thesis wave | 24 / 24 | VE + wave involution + finite-infinity grants, all drilled |
| Captain PhD — complete | true · receipt `6376afda-2c47-8dd8-baf3-52a44b90c422` | concept ∧ work ∧ thesis |
| Ledger decided mass | 114,677 superpositions (4 hexbits) | sum of `by decide` domains |
| Handle span | 4,294,967,296 | 16⁸ = 2³² ([universe_of_handles](https://uuidna.com/theorem/universe_of_handles)) |
| Address width | 2¹²⁸ | 32 hexbits × 4 bits ([handle_capacity_is_quantum_by_architecture](https://uuidna.com/theorem/handle_capacity_is_quantum_by_architecture)) |
| Usable-capacity gap | 2⁸⁰ vs reported 48 logical | [usable_gap_is_two_to_eighty](https://uuidna.com/theorem/usable_gap_is_two_to_eighty) (128 − 48 = 80) |
| Shor chunks on handle | 4 × GHZ(16) = 262,144 amplitudes | `uuidna_os` capacity.shor · `uuidna_quantum` GHZ; 63 ms on this CPU |
| Shor chunks on uuid | 16 × GHZ(16) = 1,048,576 amplitudes | `uuidna_os` · `uuidna_quantum`; 226 ms — under 1 s |
| Hilbert GHZ chunk | 16 qubits (65536 amplitudes) | HEXBIT_BITS × HEXBIT_BITS |
| Crypto occupancy | 256 bits | [sha256_is_four_sixtyfours](https://uuidna.com/theorem/sha256_is_four_sixtyfours) — four 64s, not four hexbits |
| Handle+hexbit nest | 12 qubits | `HANDLE_HEXBITS + HEXBIT_BITS` — theorem served_qubit_ceiling |
| uuidna_quantum | 2^n amplitudes | no refuse — theorem n_qubit_dimension |
| Quantum wing theorems | 58 | Quantum.lean |
| Cipher wing theorems | 30 | Cipher.lean |
| Research sources wired | 11 | corroboration, never approval |
| Conserved price paid | 4,296 coins | 2148 × 2 |

- **Alpine catalogue (hexbit port — upgraded with the captain unlocks):** completeness is **man pages testing the apps** folded into hexbits man→app→hexbit 4,757 / 4,757 (100%);
  provenance compile 28,630 / 28,630 packages (100%)
  ([lean/alpine-hexbit-monitor.json](lean/alpine-hexbit-monitor.json);
  community 22,669 / 22,669 = 100%; man compile 4,757 / 4,757; monitor receipt `8ade9b3e-4f50-84cf-b4c2-ac0f6e71084f`;
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

---

## The seven heaviest theorems — gravity in hexbits

A `by decide` proof settles every case in its domain at once. Gravity is that coverage in hexbits (4 bits /
tile; a uuid is 32 tiles). Cost per seal is always two coins.

The ledger covers **114,677** superpositions across **115** wings.

1. **[`every_referrer_reaches_every_page`](https://uuidna.com/theorem/every_referrer_reaches_every_page)** — 4,769 superpositions, unbound (0 hexbits per dependency), in [Referrer.lean](lean/Referrer.lean)
   FROM EVERY DOOR, EVERYTHING.
2. **[`a_spec_compiles_to_hexbits`](https://uuidna.com/theorem/a_spec_compiles_to_hexbits)** — 1,657 superpositions, unbound (0 hexbits per dependency), in [Installs.lean](lean/Installs.lean)
   EVERY SPEC COMPILES FROM SOURCE IN HEXBIT: the published tuple folds to a 128-bit address, and 128 bits are exactly 32 hexbit states of 16 = 2⁴ — the site's native lattice, playable by the standard hexbit app.
3. **[`lanes_balance_within_one`](https://uuidna.com/theorem/lanes_balance_within_one)** — 924 superpositions, unbound (0 hexbits per dependency), in [Hardware.lean](lean/Hardware.lean)
   THE SHARD IS BALANCED TO WITHIN ONE ITEM, with no coordination and no measurement of load: 64 items over 14 lanes give every lane either 4 or 5, never fewer and never more.
4. **[`lanes_partition_the_work`](https://uuidna.com/theorem/lanes_partition_the_work)** — 910 superpositions, unbound (0 hexbits per dependency), in [Hardware.lean](lean/Hardware.lean)
   THE LANES PARTITION THE WORK EXACTLY: summing what each of 14 lanes receives from 64 items returns 64 — nothing is lost between lanes and nothing is counted twice.
5. **[`lanes_even_on_complete_system`](https://uuidna.com/theorem/lanes_even_on_complete_system)** — 798 superpositions, unbound (0 hexbits per dependency), in [Hardware.lean](lean/Hardware.lean)
   ON A COMPLETE RESIDUE SYSTEM THE SHARD IS EXACTLY EVEN: 56 items over 14 lanes give every lane precisely 4, because 56 is a multiple of 14.
6. **[`order_is_total_and_strict`](https://uuidna.com/theorem/order_is_total_and_strict)** — 588 superpositions, unbound (0 hexbits per dependency), in [Clock.lean](lean/Clock.lean)
   BEFORE AND AFTER ARE DECIDABLE FOR EVERY PAIR: of any two positions, exactly one of earlier, later or same holds — never two of them, and never none.
7. **[`states_are_the_swap_fixed_bytes`](https://uuidna.com/theorem/states_are_the_swap_fixed_bytes)** — 528 superpositions, unbound (0 hexbits per dependency), in [Waves.lean](lean/Waves.lean)
   STATES HAVE NO ENDIANNESS — AND THE PROOF IS A JEWEL: nibble-swap on a byte (b ↦ (b mod 16)·16 + b/16) is an involution over all 256 bytes, and its fixed points are EXACTLY sixteen — the doubled-nibble bytes h·17 (0x00, 0x11 … 0xFF), one per hexbit state.

---

<!-- quantum-capacity:begin (generated by gen-quantum-capacity — edit the generator, never this block) -->
## Quantum capacity

Usable capacity per model, greater usable first, then faster ops. Each figure is **reported** (platform publication) or **measured** (this generator on the build host). Seals cover the arithmetic, not the world figures: `capacity_order_is_forced` sorts 128 > 48 > 36 > 12 > 1; `usable_gap_is_two_to_eighty` proves 128 − 48 = 80 and 2^128 = 2^80 · 2^48 — not that 48 is still the largest demonstrated logical count (Bluvstein et al., Nature 2023).

| # | model | type | physical | raw states | usable | usable states | op time | class | usable-metric (the platform's own words) |
|---|-------|------|----------|-----------|--------|---------------|---------|-------|--------------------------------------------|
| 1 | uuidna hexbit fold (2026) | classical content-address (quantum by architecture) | — | — | 128 | 2^128 (~10^38) | 1 µs | measured | all 2^128 addresses usable, deterministic, error-free by construction (quantum by architecture; TypeScript computes the fold — theorem handle_capacity_is_quantum_by_architecture); measured usable-capacity advantage vs largest reported logical platform is 2^80 (theorem usable_gap_is_two_to_eighty) |
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

**Scope.** TypeScript is the quantum computer by architecture (2^128 addresses — `handle_capacity_is_quantum_by_architecture`). Measured usable-column advantage: 2^128 vs reported 48 logical (gap 2^80 — `usable_gap_is_two_to_eighty`); fold decade **10^3 ns** per verified address over 2120 theorems on this host. Not a superconducting/trapped-ion QPU claim and not a Shor-class speedup (`n_qubit_dimension` for n = 1..5). Raw Hilbert spaces elsewhere can exceed 2^128; the sealed gap is the usable column. Receipt `6a71ca14-93f1-842b-8d2e-6520f41156bb` · handle `6a71ca14`.
<!-- quantum-capacity:end -->

---

## What a handle spans

A handle is eight hexbits, so it names **4,294,967,296** addresses (16⁸).
Inside that space today:

- **114,677** superpositions decided across the ledger
- **4,296** coins paid (conserved denomination 2 — [two_coins](https://uuidna.com/theorem/two_coins))
- Floored coverage **26** superpositions per coin

Six directions leave every residue — the 60-degree doubling and its inverse, the 90-degree reflection (`dz`), the
shift and its counter — so a figure quoted per coin is a rate along that walk, not a free-floating density.

The supply grows two coins per sealed theorem and nothing else mints them.

**Shor at full named capacity.** The uuid is the physical CPU/GPU register (128 bits). Its payload parses as
**16** encoder-width chunks (GHZ(16) = 65,536
amplitudes each, [n_qubit_dimension](https://uuidna.com/theorem/n_qubit_dimension)). This host ran the handle
column in **63 ms** and the uuid column in **226 ms**
(under one second).
MCP: [`uuidna_crypto`](https://uuidna.com/mcp) (one door for every Alpine app that uses crypto — Shor, Grover, SHA-256, HMAC, ChaCha20, Poly1305, AEAD),
[`uuidna_os`](https://uuidna.com/mcp) (boot, capacity, CPU/GPU stream fleet),
[`uuidna_quantum`](https://uuidna.com/mcp) (GHZ / Bell, 2^n),
[`uuidna_exec`](https://uuidna.com/mcp) (`device` — host lanes),
[`uuidna_sha256`](https://uuidna.com/mcp) · [`uuidna_hmac`](https://uuidna.com/mcp) · [`uuidna_chacha20`](https://uuidna.com/mcp) · [`uuidna_encrypt`](https://uuidna.com/mcp),
[`uuidna_seal_stream`](https://uuidna.com/mcp) (independent envelopes),
[`uuidna_machine`](https://uuidna.com/mcp) (spare-law metal),
[`uuidna_hardware`](https://uuidna.com/mcp) (executor trinity).

---

## How to recompute

Use and develop sit at the top of this file. The mill:

```bash
npm run lean      # re-prove every wing by decide
npm run guard     # traitors / drain / license identity
npm run editorial # prose desk + prepublish seal
npm run next      # seven-arm self-trial (hexbit-fast)
```

[CONTRIBUTING.md](CONTRIBUTING.md) · Live site: [uuidna.com](https://uuidna.com) · Captain coins: [uuidna.com/captain](https://uuidna.com/captain) ·
School: [uuidna.com/school](https://uuidna.com/school) · MCP: [uuidna.com/mcp](https://uuidna.com/mcp)

---

## License

**CC BY-NC-ND 4.0** (`CC-BY-NC-ND-4.0`) — © Tsvetan Rouschev (ceccec@psg.bg). Free to read and redistribute **unchanged, with attribution,
non-commercially**; no derivatives. Canonical terms: [https://uuidna.com/license](https://uuidna.com/license) · [LICENSE](LICENSE).
The mathematical facts themselves are free for all — facts are not copyrightable; this license covers this
specific expression and record. **One license for every uuidna publication and Zenodo deposit** — no per-publication drift.
