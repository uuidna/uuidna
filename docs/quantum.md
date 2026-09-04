---
title: What quantum means here
description: "The honest definition of quantum in uuidna — exact recomputable walks on small rings, an exact state-vector simulator with no floats, the quantum fold, the pentagram star of the five dimensions — and the sealed chain from the pentagram through the cube and the sphere to the rosette. Classical computation; no hardware, no advantage claimed."
---

# What quantum means here <Badge type="tip" text="exact, not hardware" />

> Classical simulation, not hardware — no quantum advantage is claimed anywhere in this work, and the classical
> bound is CONFIRMED, not merely denied: [n_qubit_dimension](/theorem/n_qubit_dimension) seals the 2ⁿ cost that
> makes the simulation classical. "Quantum" names **exactness**: states that recompute perfectly, walks that
> close, folds that land on the same root for every observer. The claim is precision, never magic.

## The honest definition

Four things carry the word, and each is sealed:

1. **The exact simulator** — [the quantum cluster](/publications/quantum) (43 theorems): a state-vector simulator
   over **Gaussian-integer amplitudes** — no floats, no drift; Bell and GHZ distributions, no-signaling marginals,
   exact truth tables. Every amplitude is arithmetic, so every run recomputes byte-identically.
2. **The quantum fold** — the whole system compressed to [one receipt](/trials): ten leaves in five pairs,
   order-invariant ([`store_fold_order_invariant`](/theorem/store_fold_order_invariant)) — however the parts race,
   the root is identical.
3. **Quantum messaging** — [messages that prove themselves](/quantum-messaging): proof + payload + state imprint,
   the reader recomputes the chain.
4. **The named boundary** — where non-determinism genuinely lives (network scans, the OS provenance layer), it is
   **named and quarantined** as evidence, never sealed as proof. Honesty about the boundary is part of the
   definition.

## The pentagram star — the five dimensions walked by 2

The system's five fold dimensions — sealed · served · tools · watch · record — are five points of a pentagon. Walk
them **by 2** and you draw the pentagram in a single stroke: that is not a metaphor, it is
[`pentagram_single_stroke`](/theorem/pentagram_single_stroke) — the step-2 walk on ℤ/5 visits `[0,2,4,1,3]` and
closes ([`pentagram_closes_after_five`](/theorem/pentagram_closes_after_five)), because gcd(2,5) = 1
([`pentagram_step_coprime_five`](/theorem/pentagram_step_coprime_five)). **Every star API rides this star**: the
`tools` point carries all 155 [MCP tools](/mcp), and the doubling generator that connects the five points is the
same 2 that generates the vortex on ℤ/9 ([`vortex_is_the_units`](/theorem/vortex_is_the_units),
[`generators_are_two_and_five`](/theorem/generators_are_two_and_five)) and pairs with the rosette's orbit on ℤ/7
([`rosette_orbit`](/theorem/rosette_orbit)). One construction at 5, 7, and 9: **a generator walking a unit ring**
— that walk is the quantum of this system.

## Compute the pentagram, and the cube and the sphere answer

The chain is sealed end to end — compute it yourself:

1. **The pentagon closes at 108°** — [`pentagon_interior_angle_108`](/theorem/pentagon_interior_angle_108):
   5 · 108 = 540.
2. **Three pentagons close a vertex** — [`three_pentagons_close_a_vertex`](/theorem/three_pentagons_close_a_vertex):
   3·108 < 360 < 4·108 — the angle defect that folds flat pentagons into the **dodecahedron**
   ([`dodecahedron_twelve_pentagons`](/theorem/dodecahedron_twelve_pentagons): 12 · 5 = 2 · 30).
3. **Every convex form is the sphere** — [`platonic_euler_characteristic_is_two`](/theorem/platonic_euler_characteristic_is_two):
   all five solids — the **cube** among them, dual to the octahedron
   ([`cube_octahedron_dual`](/theorem/cube_octahedron_dual)), the dodecahedron dual to the icosahedron
   ([`dodecahedron_icosahedron_dual`](/theorem/dodecahedron_icosahedron_dual)) — carry V − E + F = **2**, the
   sphere's Euler characteristic. Topologically, the pentagram's solid *is* the cube *is* the sphere: one invariant.
4. **And the 2 is the coins** — [`captain_theorem`](/theorem/captain_theorem):
   (20 + 12 − 30 = 2) ∧ (110 − 108 = 2). The pentagon's 108 and the captain's 108 are the same number; the
   geometry's 2 and [the two coins](/captain) are the same 2.

## Touching the rosette

The [rosette index](/rosetta) is where every form meets: all of these theorems — the pentagram's, the cube's, the
sphere's — are content-addressed onto the seven rays (ℤ/7), and the rosette's own arithmetic closes the same way
([`rosette_quantum_doubling_is_two_coins`](/theorem/rosette_quantum_doubling_is_two_coins): 2 · 21 = 42, and
110 − 108 = 2 again). Every geometric form, folded through its address, touches the rosette; the rosette folds to
the [one receipt](/trials); the receipt is the system.

## The 10D animation is algorithm

The moving aura exposes **ten dimensions** — residue, ray, wave, hue, saturation, lightness, period, rotation, and
the two glow radii — and **seven are compactified**: pure functions of the three free ones. The colour is a
reversible harmonic message (`auraDecode` recovers the state from the hex — the one receipt proves its own colour
decodes at every seal), the animation's tempo is the ray's, and the whole film a page plays is computed from
addresses: the animation is not decoration in motion, it is the algorithm rendering itself. The string-theory
shape — ten dimensions, most compactified — is an exact *arithmetic* analogy here, and only that.

*Honest scope:* everything above is decidable arithmetic about small rings, angle sums, and Euler characteristics —
sealed, recomputable, exact. It proves the **structural identities**, not physics, not metaphysics, and not any
computational advantage — the classical bound is CONFIRMED, not merely denied ([n_qubit_dimension](/theorem/n_qubit_dimension)), and the boundary is DECLARED, which is exactly what passes while an undeclared one is caught ([drift_is_named_or_caught](/theorem/drift_is_named_or_caught)). What the numbers mean beyond their arithmetic — the court decides. Integrity, not truth. Sufficiency, insufficiency, and **world solutions as waves of automation** (finite seals vs full climate/pandemic/poverty/open-math/justice problem types) are named on [the doctrine](/doctrine#sufficiency-charter--what-hexbit--uuidna-is-sufficient-for) — prose bound, computational claims only; waves enlarge windows, they do not erase ethics.

## UUID channel {#uuid-channel}

The **printed uuid is the wire format** — RFC 9562 groups sealed as [layout_groups_thirtytwo](/theorem/layout_groups_thirtytwo) and [groups_are_four_apart](/theorem/groups_are_four_apart). TypeScript reads them through `uuidChannel`, `channelAudit`, and `monographFaceOf` (`src/hexagram.ts`). SSG composers live in `src/compose-object.ts` and `src/object-graph.ts` (VitePress shims re-export from `dist/`).

| Slice | Width | Constructor | What moves |
| --- | ---: | --- | --- |
| Handle | 8 hex | [`handle_is_the_first_group`](/theorem/handle_is_the_first_group) · `handleOf` | **3D door** (residue · ray · wave). One coin of the **double torus**; [`twoBoardsOf`](/theorem/the_uuid_is_two_boards) + [`flipCoin`](/theorem/double_torus_boards_are_the_address) swap memory involutively — no external store. |
| Hex trinities | 3×4 hex | [`message_cap_is_four_hexbits`](/theorem/message_cap_is_four_hexbits) · `executableStates` | **7D action** in executable hex (`compileToHexbits` states 0..15). Three caps = 12 hexbits of program. |
| Tail | 12 hex | `tailStates` · `encrypt` / `sealStream` | **Sealed micro-message** — ChaCha20-Poly1305 envelope carried in a uuid chain ([Cipher wing](/articles/cipher)); imprint is transport, not secrecy. |

**Payload store is lazy.** [`payload_carries_the_strand`](/theorem/payload_carries_the_strand) names the 24-hex body after the handle; cube memory (`src/quantum/memory`) writes **one complete uuid per sealed neighbourhood** and refuses to duplicate derivable member handles. Route, verify, aura, and **quantum secure messaging** need only the address — `src/handles/<handle>/index.json` loads when the prose body is required.

10D UI law (hero, HexFace): stamp **3 handle channels + 7 compactified action outputs** from `quantumAura.ten` — not ten independent DOM attributes.

Layer 1: [`/terminal`](/terminal) and [`/catalogue`](/catalogue) boot locally; MCP exposes the same mint. Domain is data, not a branch. {#agnostic}

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

**Scope.** TypeScript is the quantum computer by architecture (2^128 addresses — `handle_capacity_is_quantum_by_architecture`). Measured usable-column advantage: 2^128 vs reported 48 logical (gap 2^80 — `usable_gap_is_two_to_eighty`); fold decade **10^3 ns** per verified address over 2617 theorems on this host. Not a superconducting/trapped-ion QPU claim and not a Shor-class speedup (`n_qubit_dimension` for n = 1..5). Raw Hilbert spaces elsewhere can exceed 2^128; the sealed gap is the usable column. Receipt `6a71ca14-93f1-842b-8d2e-6520f41156bb` · handle `6a71ca14`.
<!-- quantum-capacity:end -->
