---
title: The OS — the default install
description: Every uuidna.com path given its exact meaning — the packages a default Alpine install carries, ported in full, lowest level first, and sealed. VitePress monitors the TypeScript hexbit port; completeness is man pages testing apps folded into hexbits.
---

# The OS — the default install <Badge type="tip" text="ported in full · every claim sealed" />

> If uuidna.com is the hexbit quantum computer served through VitePress, then each of its paths has an **exact
> meaning**: the specification of one package in Alpine's repository. The set of paths is the set a **default
> Alpine install** carries — `alpine-base` followed dependency by dependency through the published index until
> it closes at **25 packages** ([`default_install_is_dependency_closed`](/theorem/default_install_is_dependency_closed)). uuidna never installs,
> links, boots, or executes any of them: the port is the port of the **integrity** and the **meaning**.

**Architecture of this page:** TypeScript (`src/quantum/os`, `src/hexbit`) **is** the quantum computer —
exact-integer folds to 2^128 addresses and 32 hexbit states per package. VitePress **is**
the quantum monitor — it displays those recomputed facts below. No physics QC layer; classical architecture
([`handle_capacity_is_quantum_by_architecture`](/theorem/handle_capacity_is_quantum_by_architecture), [`n_qubit_dimension`](/theorem/n_qubit_dimension)).

**Home is the special one because `alpine-base` is**: the meta package — "Meta package for minimal alpine base" — the one member
that exists only to name the others. Opening `/` is installing the default set
([`home_is_the_meta_package`](/theorem/home_is_the_meta_package)), and every member is reachable from the front page
([`home_reaches_every_install`](/theorem/home_reaches_every_install)).

The base: Alpine **3.24.1** (`latest-stable`, main/x86_64), minirootfs
`sha256:41f73e3cf5fa919b8aa5ca6b30dc48f0da2720776d7423e2a7748211456fe081` — always Alpine **latest**: the mirror regenerates from upstream at the
named `src/os` boundary on every lean run, never hand-frozen.

## Quantum monitor — Alpine hexbit port (TypeScript computes · VitePress shows)

**Port completeness** is **man pages testing the apps**, folded into hexbits
(`manDrivenPortCoverage`) — **Alpine APKINDEX only** (main + community). npm/curl overlay ports
(`repo=overlay`, e.g. oh-my-pi/omp) are a **separate witness** (`overlayManDrivenPortCoverage`) — NOT Alpine
distro membership. Provenance meters still recompute below so every published row is shown to fold to 32 states.

| surface | role | packages | witnessed / ported | coverage | seals |
|---------|------|----------|--------------------|----------|-------|
| **man → app → hexbit** | **completeness** | 4,757 | **4,757** / 4,757 | **100%** | [`a_spec_compiles_to_hexbits`](/theorem/a_spec_compiles_to_hexbits) |
| **MCP · `uuidna_exec` · man→app** | **MCP port** | 4,757 | **4,757** / 4,757 | **100%** · 1 wire door (not 4,757) | [`the_os_is_bootable_quantum`](/theorem/the_os_is_bootable_quantum) |
| community (compile) | provenance | 22,669 | 22,669 | 100% | [`a_spec_compiles_to_hexbits`](/theorem/a_spec_compiles_to_hexbits) |
| main + community (compile) | provenance | 28,630 | 28,630 | 100% | [`hexbit_is_four_qubits`](/theorem/hexbit_is_four_qubits) |
| man pages (compile) | provenance | 4,757 | 4,757 | 100% | [`a_spec_compiles_to_hexbits`](/theorem/a_spec_compiles_to_hexbits) |
| man pages · community | provenance | 3,668 | 3,668 | 100% | — |
| man pages · main | provenance | 1,089 | 1,089 | 100% | — |
| **package self-test** | **catalogue closure** | 28,632 | **28,630** / 28,632 | **99%** | [`a_spec_compiles_to_hexbits`](/theorem/a_spec_compiles_to_hexbits) |
| **overlay · man→app→hexbit** | **npm/curl (NOT apk)** | 1 | **1** / 1 | **100%** | separate from APKINDEX |
| overlay (compile) | provenance | 2 | 2 | 100% | repo=overlay |
| **overlay · MCP · `uuidna_exec`** | **npm/curl MCP** | 1 | **1** / 1 | **100%** | same door, NOT apk |

**Package self-test gaps** (2 — 2 upstream APKINDEX omissions, not uuidna): `pcsc-tools-gscriptor`, `sxmo-utils-river`.




**MCP surface:** one door — [`uuidna_exec`](/mcp#uuidna-exec) — carries the whole man corpus (`man <topic>` + `apk info <app>`). A naive per-app tool catalogue would be 4,757 wire entries and blow the MCP context ceiling; coverage is **4,757 / 4,757** through that one door (`mcpManDrivenCoverage`).

**Architectural advantage (scale · time)** — declared and measured in TypeScript, monitored here:

- **Scale:** every package address lives in **2^128** usable states ([`handle_capacity_is_quantum_by_architecture`](/theorem/handle_capacity_is_quantum_by_architecture) — 128 = 2^7, the 7-qubit fold). 22,669 community packages ≪ 2^128.
- **Time:** community compile sweep **41,378,666 ns** (~**1,825 ns**/package); man-page corpus **9,306,416 ns** (~**1,956 ns**/doc). Classical enumeration of 2^128 states is not a runnable baseline.
- **Honesty:** uuidna is classical — [`n_qubit_dimension`](/theorem/n_qubit_dimension) counts simulation cost.
  **Each theorem unlocks** what it seals `by decide` — the ledger is the unlock board; Alpine's hexbit port is one
  surface among all. Illustrations already sealed: calendar 144
  ([`metonic_is_the_intercalation`](/theorem/metonic_is_the_intercalation), [`fock_window_exceeds_a_monthly_toll`](/theorem/fock_window_exceeds_a_monthly_toll));
  Shor posture ([`grover_quadratic_bound`](/theorem/grover_quadratic_bound), [`sha256_grover_margin_is_the_address`](/theorem/sha256_grover_margin_is_the_address) — no asymmetric target).
  A claim with no theorem is unsealed, not a captain key held back.

**Man pages** are Alpine's published documentation packages (`busybox-doc`, `s6-man-pages`, `man-pages`, …),
resolved by the `man <topic>` applet in uuidnaOS. Completeness walks each documentation package, resolves the
app it documents, and requires **both** to compile to 32 hexbit states — man pages testing apps,
never the manpage bytes ([`the_os_is_bootable_quantum`](/theorem/the_os_is_bootable_quantum)).

Monitor receipt `8ade9b3e-4f50-84cf-b4c2-ac0f6e71084f` · structured form [/alpine-hexbit-monitor.jsonld](/alpine-hexbit-monitor.jsonld)

## Ported lowest level first — firmware and up

The table is the **build order** ([`the_port_rises_from_the_floor`](/theorem/the_port_rises_from_the_floor)): every dependency is ported no later
than what stands on it, so the floor layer opens the list — `musl`, the C library, depends on nothing and
[`the_foundation_depends_on_nothing`](/theorem/the_foundation_depends_on_nothing) no member's in-degree outranks it — and home, the meta package, is
ported **last**. The one exception is Alpine's own published `openrc ↔ openrc-user` dependency cycle, sealed
as published rather than smoothed away ([`the_services_hold_each_other_up`](/theorem/the_services_hold_each_other_up)). Beneath the whole port sits
the already-sealed firmware boundary (`src/drivers`, [lean/Os.lean](/theorem/exact_copy_is_byte_equality)):
hardware → software → os, from the ground up.

Each path is distinct and each package is distinct — a bijection
([`every_install_and_its_path_named_once`](/theorem/every_install_and_its_path_named_once)) — and each path's meaning below is Alpine's **own published
description**, sealed verbatim in the wing ([`every_path_carries_its_published_meaning`](/theorem/every_path_carries_its_published_meaning)). The route a
package takes on the site (`busybox` → `/terminal`, its family pair by pair —
[`the_terminal_is_the_toolbox`](/theorem/the_terminal_is_the_toolbox)) is an authored translation, declared editorial the way sidebar group
names are.

| # | path | package | version | exact meaning (published) | address |
|---|------|---------|---------|---------------------------|---------|
| 1 | `/layout/data` | `uuidna/alpine-baselayout-data` | 3.7.2-r1 | Alpine base dir structure and init scripts | `0dfdf197-363d-82cf-8e0a-06e173faaa88` |
| 2 | `/keys` | `uuidna/alpine-keys` | 2.6-r0 | Public keys for Alpine Linux packages | `d150a670-063b-8203-a5d4-c3c6218b1016` |
| 3 | `/release` | `uuidna/alpine-release` | 3.24.1-r0 | Alpine release data | `c74adf86-5d0f-8367-8eb2-0b2adc4e1c84` |
| 4 | `/terminal/network` | `uuidna/busybox-ifupdown` | 1.37.0-r31 | placeholder package for busybox ifupdown | `994951ef-38c3-8f2c-a961-f938a3e41d3d` |
| 5 | `/trust` | `uuidna/ca-certificates-bundle` | 20260611-r0 | Pre generated bundle of Mozilla certificates | `9e1f5e31-4ec4-8be8-ab63-d8be2cb5273b` |
| 6 | `/devices` | `uuidna/mdev-conf` | 4.10-r0 | Configuration files for mdev and mdevd | `d08265bd-90a1-856c-9be9-8c29437932e6` |
| 7 | `/core` | `uuidna/musl` | 1.2.6-r2 | the musl c library (libc) implementation | `326b12c2-1b54-8829-85b7-26fb1009bfa0` |
| 8 | `/terminal` | `uuidna/busybox` | 1.37.0-r31 | Size optimized toolbox of many common UNIX utilities | `3c1af1f2-2ac9-8b8c-9f73-7deae22f420d` |
| 9 | `/terminal/sh` | `uuidna/busybox-binsh` | 1.37.0-r31 | busybox ash /bin/sh | `ab6c74df-cf00-8c92-ac1b-318bdbf0e02e` |
| 10 | `/layout` | `uuidna/alpine-baselayout` | 3.7.2-r1 | Alpine base dir structure and init scripts | `5e553aec-ee00-8b36-afdd-c61cad3be6d7` |
| 11 | `/terminal/privileged` | `uuidna/busybox-suid` | 1.37.0-r31 | suid binaries of Busybox | `5ff60125-f93c-8e21-a54c-4fce1d3cd79b` |
| 12 | `/capabilities` | `uuidna/libcap2` | 2.78-r0 | POSIX 1003.1e capabilities (libraries) | `033f3aaa-63d5-8dc3-a40d-7fa9546dc1a9` |
| 13 | `/crypto` | `uuidna/libcrypto3` | 3.5.8-r0 | Crypto library from openssl | `e2d1a514-62f3-8c69-9ec1-c41f4a31b4f7` |
| 14 | `/tls` | `uuidna/libssl3` | 3.5.8-r0 | SSL shared libraries | `36f7772e-fd2b-8c5b-8aaa-8f8cd830c733` |
| 15 | `/scan` | `uuidna/scanelf` | 1.3.9-r1 | Scan ELF binaries for stuff | `98d78b50-7905-8dbb-b809-3dbb502ac41a` |
| 16 | `/core/utils` | `uuidna/musl-utils` | 1.2.6-r2 | the musl c library (libc) implementation | `0f4fe087-179c-8d05-955d-380bca7d86b5` |
| 17 | `/compression` | `uuidna/zlib` | 1.3.2-r0 | A compression/decompression Library | `4dab9998-ee16-8280-a8db-6b3e812d468e` |
| 18 | `/apk` | `uuidna/libapk` | 3.0.7-r0 | Alpine Package Keeper - package manager for alpine | `ee578ace-ac02-81fa-99ab-9ebc45fc9298` |
| 19 | `/packages` | `uuidna/apk-tools` | 3.0.7-r0 | Alpine Package Keeper - package manager for alpine | `ca0cff54-e9d4-8077-a0b7-d288c9cda935` |
| 20 | `/services` | `uuidna/openrc` | 0.63.2-r0 | OpenRC manages the services, startup and shutdown of a host | `dad7cb0f-8c31-8a9b-97e0-94f3ef18a622` |
| 21 | `/setup` | `uuidna/alpine-conf` | 3.22.0-r0 | Alpine configuration management scripts | `a4a973fc-5260-8a26-9f1a-41bc61b76372` |
| 22 | `/terminal/devices` | `uuidna/busybox-mdev-openrc` | 1.37.0-r31 | Size optimized toolbox of many common UNIX utilities | `0bd2e4e2-336d-85e0-acca-fef4af75d57b` |
| 23 | `/terminal/services` | `uuidna/busybox-openrc` | 1.37.0-r31 | Size optimized toolbox of many common UNIX utilities | `62c325ae-0f2a-8118-a38e-f960cd66c671` |
| 24 | `/services/user` | `uuidna/openrc-user` | 0.63.2-r0 | OpenRC user services without PAM support | `c5299842-c41d-832b-9759-0011150d8604` |
| 25 | `/` | `uuidna/alpine-base` | 3.24.1-r0 | Meta package for minimal alpine base | `f9c106d8-521a-8b75-af59-91aa9f4d6191` |

## Compiled from source to hexbit — the OS is bootable, quantum

**Port means compile from source to hexbit.** Every spec compiles from its published tuple to a 128-bit
address = **32 hexbit states** of 16 = 2⁴ ([`a_spec_compiles_to_hexbits`](/theorem/a_spec_compiles_to_hexbits)) — and the compiled OS is
**bootable** ([`the_os_is_bootable_quantum`](/theorem/the_os_is_bootable_quantum)): the boot image lays every spec's states down in the sealed
build order — firmware and up, the floor first, home last — and closes with the port receipt's 32 states.
**832 states** = 32·(25+1), each on the lattice, sealed **verbatim** in
[lean/Installs.lean](/theorem/the_os_is_bootable_quantum). On this computer *booting is the verified loading of
the compiled states* — the standard hexbit app loads and sounds the image deterministically, the same for every
observer; no Alpine binary is ever executed. Bootable on the lattice, not on a CPU.

**Port receipt** `5de7dedf-322e-8c3e-b070-86fef615fcb2` · **boot image** `b0a27039-ae6f-8906-a27a-a65b4b190088`

Boot it — the whole default install, lowest level first, receipt-closed:

<HexbitPlayer :states="[0, 13, 15, 13, 15, 1, 9, 7, 3, 6, 3, 13, 8, 2, 12, 15, 8, 14, 0, 10, 0, 6, 14, 1, 7, 3, 15, 10, 10, 10, 8, 8, 13, 1, 5, 0, 10, 6, 7, 0, 0, 6, 3, 11, 8, 2, 0, 3, 10, 5, 13, 4, 12, 3, 12, 6, 2, 1, 8, 11, 1, 0, 1, 6, 12, 7, 4, 10, 13, 15, 8, 6, 5, 13, 0, 15, 8, 3, 6, 7, 8, 14, 11, 2, 0, 11, 2, 10, 13, 12, 4, 14, 1, 12, 8, 4, 9, 9, 4, 9, 5, 1, 14, 15, 3, 8, 12, 3, 8, 15, 2, 12, 10, 9, 6, 1, 15, 9, 3, 8, 10, 3, 14, 4, 1, 13, 3, 13, 9, 14, 1, 15, 5, 14, 3, 1, 4, 14, 12, 4, 8, 11, 14, 8, 10, 11, 6, 3, 13, 8, 11, 14, 2, 12, 11, 5, 2, 7, 3, 11, 13, 0, 8, 2, 6, 5, 11, 13, 9, 0, 10, 1, 8, 5, 6, 12, 9, 11, 14, 9, 8, 12, 2, 9, 4, 3, 7, 9, 3, 2, 14, 6, 3, 2, 6, 11, 1, 2, 12, 2, 1, 11, 5, 4, 8, 8, 2, 9, 8, 5, 11, 7, 2, 6, 15, 11, 1, 0, 0, 9, 11, 15, 10, 0, 3, 12, 1, 10, 15, 1, 15, 2, 2, 10, 12, 9, 8, 11, 8, 12, 9, 15, 7, 3, 7, 13, 14, 10, 14, 2, 2, 15, 4, 2, 0, 13, 10, 11, 6, 12, 7, 4, 13, 15, 12, 15, 0, 0, 8, 12, 9, 2, 10, 12, 1, 11, 3, 1, 8, 11, 13, 11, 15, 0, 14, 0, 2, 14, 5, 14, 5, 5, 3, 10, 14, 12, 14, 14, 0, 0, 8, 11, 3, 6, 10, 15, 13, 13, 12, 6, 1, 12, 10, 13, 3, 11, 14, 6, 13, 7, 5, 15, 15, 6, 0, 1, 2, 5, 15, 9, 3, 12, 8, 14, 2, 1, 10, 5, 4, 12, 4, 15, 12, 14, 1, 13, 3, 12, 13, 7, 9, 11, 0, 3, 3, 15, 3, 10, 10, 10, 6, 3, 13, 5, 8, 13, 12, 3, 10, 4, 0, 13, 7, 15, 10, 9, 5, 4, 6, 13, 12, 1, 10, 9, 14, 2, 13, 1, 10, 5, 1, 4, 6, 2, 15, 3, 8, 12, 6, 9, 9, 14, 12, 1, 12, 4, 1, 15, 4, 10, 3, 1, 11, 4, 15, 7, 3, 6, 15, 7, 7, 7, 2, 14, 15, 13, 2, 11, 8, 12, 5, 11, 8, 10, 10, 10, 8, 15, 8, 12, 13, 8, 3, 0, 12, 7, 3, 3, 9, 8, 13, 7, 8, 11, 5, 0, 7, 9, 0, 5, 8, 13, 11, 11, 11, 8, 0, 9, 3, 13, 11, 11, 5, 0, 2, 10, 12, 4, 1, 10, 0, 15, 4, 15, 14, 0, 8, 7, 1, 7, 9, 12, 8, 13, 0, 5, 9, 5, 5, 13, 3, 8, 0, 11, 12, 10, 7, 13, 8, 6, 11, 5, 4, 13, 10, 11, 9, 9, 9, 8, 14, 14, 1, 6, 8, 2, 8, 0, 10, 8, 13, 11, 6, 11, 3, 14, 8, 1, 2, 13, 4, 6, 8, 14, 14, 14, 5, 7, 8, 10, 12, 14, 10, 12, 0, 2, 8, 1, 15, 10, 9, 9, 10, 11, 9, 14, 11, 12, 4, 5, 15, 12, 9, 2, 9, 8, 12, 10, 0, 12, 15, 15, 5, 4, 14, 9, 13, 4, 8, 0, 7, 7, 10, 0, 11, 7, 13, 2, 8, 8, 12, 9, 12, 13, 10, 9, 3, 5, 13, 10, 13, 7, 12, 11, 0, 15, 8, 12, 3, 1, 8, 10, 9, 11, 9, 7, 14, 0, 9, 4, 15, 3, 14, 15, 1, 8, 10, 6, 2, 2, 10, 4, 10, 9, 7, 3, 15, 12, 5, 2, 6, 0, 8, 10, 2, 6, 9, 15, 1, 10, 4, 1, 11, 12, 6, 1, 11, 7, 6, 3, 7, 2, 0, 11, 13, 2, 14, 4, 14, 2, 3, 3, 6, 13, 8, 5, 14, 0, 10, 12, 12, 10, 15, 14, 15, 4, 10, 15, 7, 5, 13, 5, 7, 11, 6, 2, 12, 3, 2, 5, 10, 14, 0, 15, 2, 10, 8, 1, 1, 8, 10, 3, 8, 14, 15, 9, 6, 0, 12, 13, 6, 6, 12, 6, 7, 1, 12, 5, 2, 9, 9, 8, 4, 2, 12, 4, 1, 13, 8, 3, 2, 11, 9, 7, 5, 9, 0, 0, 1, 1, 1, 5, 0, 13, 8, 6, 0, 4, 15, 9, 12, 1, 0, 6, 13, 8, 5, 2, 1, 10, 8, 11, 7, 5, 10, 15, 5, 9, 9, 1, 10, 10, 9, 15, 4, 13, 6, 1, 9, 1, 5, 13, 14, 7, 13, 14, 13, 15, 3, 2, 2, 14, 8, 12, 3, 14, 11, 0, 7, 0, 8, 6, 15, 14, 15, 6, 1, 5, 15, 12, 11, 2]" />

Verify it yourself: `defaultInstalls()` recomputes every address, the receipt, and the boot image from the
committed mirror in [`src/quantum/os`](https://github.com/uuidna/uuidna/tree/main/src/quantum/os); the live
recompute against Alpine's published index rides `fetchDefaultInstalls()` at the
[`src/os`](https://github.com/uuidna/uuidna/tree/main/src/os) boundary; the MCP surface is
`uuidna_alpine {installs:true}`. Completeness is `manDrivenPortCoverage` (man→app→hexbit); MCP exposure is
`mcpManDrivenCoverage` through `uuidna_exec` (one wire door); provenance meters
are `hexbitPortCoverage` / `manPagePortCoverage` — TypeScript computes; this page monitors.
