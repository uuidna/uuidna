#!/usr/bin/env node
// @non-harmonic: measures wall-clock compile sweeps for the quantum monitor's TIME figures (same exemption
// gen-quantum-capacity / gen-quantum-advantage carry). Never imported by the harmonic core.
//
// gen-os — THE DEFAULT INSTALL + THE QUANTUM MONITOR. TypeScript is the quantum computer (src/quantum/os
// compiles Alpine to hexbits); VitePress is the quantum monitor (this page displays the recomputed facts).
//
// Every figure is computed from the committed mirror / catalogue — never authored. Integrity and meaning,
// never execution (theorem the_os_is_bootable_quantum).
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { defaultInstalls } from '../quantum/os/index.js'
import {
  hexbitPortCoverage, manPagePortCoverage, manPagePackages, catalogueCompile, catalogue,
} from '../quantum/os/catalogue.js'
import { UUID_HEXBITS, UUID_BITS } from '../hexbit/index.js'
import { toUuid } from '../address.js'
import { reportDataset, type Figure } from '../microdata.js'
import { auditJsonLd } from '../schema-org-vocab.js'

const port = defaultInstalls()
const home = port.specs[port.specs.length - 1]!
const th = (k: string): string => `[\`${k}\`](/theorem/${k})`

const community = hexbitPortCoverage('community')
const all = hexbitPortCoverage()
const manAll = manPagePortCoverage()
const manCommunity = manPagePortCoverage('community')
const manMain = manPagePortCoverage('main')

// TIME — TypeScript computes the compile sweep; the monitor only prints the measured decade.
const manList = manPagePackages()
const t0 = process.hrtime.bigint()
for (const p of manList) catalogueCompile(p)
const manCompileNs = Number(process.hrtime.bigint() - t0)
const manNsPer = manAll.total === 0 ? 0 : (manCompileNs - (manCompileNs % manAll.total)) / manAll.total

const communityList = catalogue().filter((p) => p.repo === 'community')
const t1 = process.hrtime.bigint()
for (const p of communityList) catalogueCompile(p)
const communityCompileNs = Number(process.hrtime.bigint() - t1)
const communityNsPer = community.total === 0 ? 0
  : (communityCompileNs - (communityCompileNs % community.total)) / community.total

const pct = (n: number, of: number): string => of === 0 ? '0' : String(((n * 100) - ((n * 100) % of)) / of)

const monitorReceipt = toUuid(
  `alpine-hexbit-monitor|${community.ported}/${community.total}|${all.ported}/${all.total}|`
  + `${manAll.ported}/${manAll.total}|${UUID_BITS}|${communityNsPer}|${manNsPer}`,
)

const rows = port.specs.map((s, i) =>
  `| ${i + 1} | \`${s.route}\` | \`${s.id}\` | ${s.version} | ${s.meaning} | \`${s.address}\` |`
).join('\n')

const page = `---
title: The OS — the default install
description: Every uuidna.com path given its exact meaning — the packages a default Alpine install carries, ported in full, lowest level first, and sealed. VitePress monitors the TypeScript hexbit port of all Alpine (community 100%) and man pages.
---

# The OS — the default install <Badge type="tip" text="ported in full · every claim sealed" />

> If uuidna.com is the hexbit quantum computer served through VitePress, then each of its paths has an **exact
> meaning**: the specification of one package in Alpine's repository. The set of paths is the set a **default
> Alpine install** carries — \`alpine-base\` followed dependency by dependency through the published index until
> it closes at **${port.count} packages** (${th('default_install_is_dependency_closed')}). uuidna never installs,
> links, boots, or executes any of them: the port is the port of the **integrity** and the **meaning**.

**Architecture of this page:** TypeScript (\`src/quantum/os\`, \`src/hexbit\`) **is** the quantum computer —
exact-integer folds to 2^${UUID_BITS} addresses and ${UUID_HEXBITS} hexbit states per package. VitePress **is**
the quantum monitor — it displays those recomputed facts below. No physics QC layer; classical architecture
(${th('handle_capacity_is_quantum_by_architecture')}, ${th('n_qubit_dimension')}).

**Home is the special one because \`alpine-base\` is**: the meta package — "${home.meaning}" — the one member
that exists only to name the others. Opening \`/\` is installing the default set
(${th('home_is_the_meta_package')}), and every member is reachable from the front page
(${th('home_reaches_every_install')}).

The base: Alpine **${port.release.version}** (\`${port.branch}\`, ${port.repo}/${port.arch}), minirootfs
\`sha256:${port.release.rootfsSha256}\` — always Alpine **latest**: the mirror regenerates from upstream at the
named \`src/os\` boundary on every lean run, never hand-frozen.

## Quantum monitor — Alpine hexbit port (TypeScript computes · VitePress shows)

| surface | packages | hexbit-ported | coverage | seals |
|---------|----------|---------------|----------|-------|
| **community** | ${community.total.toLocaleString('en-US')} | ${community.ported.toLocaleString('en-US')} | **${pct(community.ported, community.total)}%** | ${th('a_spec_compiles_to_hexbits')} |
| main + community | ${all.total.toLocaleString('en-US')} | ${all.ported.toLocaleString('en-US')} | **${pct(all.ported, all.total)}%** | ${th('hexbit_is_four_qubits')} |
| man pages (\`-doc\` / \`*-man-pages\` / \`man-pages\`) | ${manAll.total.toLocaleString('en-US')} | ${manAll.ported.toLocaleString('en-US')} | **${pct(manAll.ported, manAll.total)}%** | ${th('a_spec_compiles_to_hexbits')} |
| man pages · community | ${manCommunity.total.toLocaleString('en-US')} | ${manCommunity.ported.toLocaleString('en-US')} | ${pct(manCommunity.ported, manCommunity.total)}% | — |
| man pages · main | ${manMain.total.toLocaleString('en-US')} | ${manMain.ported.toLocaleString('en-US')} | ${pct(manMain.ported, manMain.total)}% | — |

**Architectural advantage (scale · time)** — declared and measured in TypeScript, monitored here:

- **Scale:** every package address lives in **2^${UUID_BITS}** usable states (${th('handle_capacity_is_quantum_by_architecture')} — 128 = 2^7, the 7-qubit fold). ${community.ported.toLocaleString('en-US')} community packages ≪ 2^128.
- **Time:** community compile sweep **${communityCompileNs.toLocaleString('en-US')} ns** (~**${communityNsPer.toLocaleString('en-US')} ns**/package); man-page corpus **${manCompileNs.toLocaleString('en-US')} ns** (~**${manNsPer.toLocaleString('en-US')} ns**/doc). Classical enumeration of 2^128 states is not a runnable baseline.
- **Honesty:** uuidna is classical — ${th('n_qubit_dimension')} counts simulation cost.
  **Each theorem unlocks** what it seals \`by decide\` — the ledger is the unlock board; Alpine's hexbit port is one
  surface among all. Illustrations already sealed: calendar 144
  (${th('metonic_is_the_intercalation')}, ${th('fock_window_exceeds_a_monthly_toll')});
  Shor posture (${th('grover_quadratic_bound')}, ${th('sha256_grover_margin_is_the_address')} — no asymmetric target).
  A claim with no theorem is unsealed, not a captain key held back.

**Man pages** are Alpine's published documentation packages (\`busybox-doc\`, \`s6-man-pages\`, \`man-pages\`, …),
resolved by the \`man <topic>\` applet in uuidnaOS and compiled to ${UUID_HEXBITS} hexbit states — provenance
identity, never the manpage bytes (${th('the_os_is_bootable_quantum')}).

Monitor receipt \`${monitorReceipt}\` · structured form [/alpine-hexbit-monitor.jsonld](/alpine-hexbit-monitor.jsonld)

## Ported lowest level first — firmware and up

The table is the **build order** (${th('the_port_rises_from_the_floor')}): every dependency is ported no later
than what stands on it, so the floor layer opens the list — \`musl\`, the C library, depends on nothing and
${th('the_foundation_depends_on_nothing')} no member's in-degree outranks it — and home, the meta package, is
ported **last**. The one exception is Alpine's own published \`openrc ↔ openrc-user\` dependency cycle, sealed
as published rather than smoothed away (${th('the_services_hold_each_other_up')}). Beneath the whole port sits
the already-sealed firmware boundary (\`src/drivers\`, [lean/Os.lean](/theorem/exact_copy_is_byte_equality)):
hardware → software → os, from the ground up.

Each path is distinct and each package is distinct — a bijection
(${th('every_install_and_its_path_named_once')}) — and each path's meaning below is Alpine's **own published
description**, sealed verbatim in the wing (${th('every_path_carries_its_published_meaning')}). The route a
package takes on the site (\`busybox\` → \`/terminal\`, its family pair by pair —
${th('the_terminal_is_the_toolbox')}) is an authored translation, declared editorial the way sidebar group
names are.

| # | path | package | version | exact meaning (published) | address |
|---|------|---------|---------|---------------------------|---------|
${rows}

## Compiled from source to hexbit — the OS is bootable, quantum

**Port means compile from source to hexbit.** Every spec compiles from its published tuple to a 128-bit
address = **32 hexbit states** of 16 = 2⁴ (${th('a_spec_compiles_to_hexbits')}) — and the compiled OS is
**bootable** (${th('the_os_is_bootable_quantum')}): the boot image lays every spec's states down in the sealed
build order — firmware and up, the floor first, home last — and closes with the port receipt's 32 states.
**${port.boot.count} states** = 32·(${port.count}+1), each on the lattice, sealed **verbatim** in
[lean/Installs.lean](/theorem/the_os_is_bootable_quantum). On this computer *booting is the verified loading of
the compiled states* — the standard hexbit app loads and sounds the image deterministically, the same for every
observer; no Alpine binary is ever executed. Bootable on the lattice, not on a CPU.

**Port receipt** \`${port.receipt}\` · **boot image** \`${port.boot.address}\`

Boot it — the whole default install, lowest level first, receipt-closed:

<HexbitPlayer :states="[${port.boot.states.join(', ')}]" />

Verify it yourself: \`defaultInstalls()\` recomputes every address, the receipt, and the boot image from the
committed mirror in [\`src/quantum/os\`](https://github.com/uuidna/uuidna/tree/main/src/quantum/os); the live
recompute against Alpine's published index rides \`fetchDefaultInstalls()\` at the
[\`src/os\`](https://github.com/uuidna/uuidna/tree/main/src/os) boundary; the MCP surface is
\`uuidna_alpine {installs:true}\`. The catalogue meters are \`hexbitPortCoverage\` / \`manPagePortCoverage\` —
TypeScript computes; this page monitors.
`

writeFileSync(join(ROOT, 'docs', 'os.md'), page)

mkdirSync(join(ROOT, 'docs', 'public'), { recursive: true })
const figures: Figure[] = [
  { name: 'Alpine community hexbit port — packages', value: community.total, unitText: 'packages', measurementTechnique: 'measured',
    citation: 'committed mirror/alpine-catalogue.tsv · hexbitPortCoverage(community) in src/quantum/os/catalogue.ts' },
  { name: 'Alpine community hexbit port — ported', value: community.ported, unitText: 'packages', measurementTechnique: 'computed',
    citation: 'catalogueCompile → UUID_HEXBITS states · theorem a_spec_compiles_to_hexbits' },
  { name: 'Alpine community hexbit port — coverage', value: Number(pct(community.ported, community.total)), unitText: '%', measurementTechnique: 'computed',
    citation: 'ported/total · gate test alpine-hexbit-port.test.ts fails below 100%' },
  { name: 'Alpine man-page packages — ported', value: manAll.ported, unitText: 'packages', measurementTechnique: 'computed',
    citation: 'manPagePortCoverage() over -doc / *-man-pages / man-pages · same mint as the boot port' },
  { name: 'usable address space', value: UUID_BITS, unitText: 'bits (2^N states)', measurementTechnique: 'declared',
    citation: 'theorem handle_capacity_is_quantum_by_architecture — 128 = 2^7, the 7-qubit fold; classical architecture' },
  { name: 'community compile — ns per package', value: communityNsPer, unitText: 'ns', measurementTechnique: 'measured',
    citation: 'TypeScript catalogueCompile sweep over community on the build host; classical 2^128 enumeration is not runnable' },
]

const dataset = reportDataset({
  slug: 'alpine-hexbit-monitor',
  name: 'uuidna Alpine hexbit quantum monitor',
  description: 'TypeScript computes Alpine package and man-page hexbit ports; VitePress monitors the recomputed coverage and measured usable-capacity / scale-time quantum advantage (usable_gap_is_two_to_eighty).',
  figures,
  receipt: monitorReceipt,
})
const jsonLdFailures: string[] = []
auditJsonLd(dataset, 'alpine-hexbit-monitor.jsonld', jsonLdFailures)
if (jsonLdFailures.length) {
  console.error('✗ gen-os — alpine-hexbit-monitor.jsonld used terms outside the vetted vocabulary:')
  for (const f of jsonLdFailures) console.error('  ', f)
  process.exit(1)
}

writeFileSync(join(ROOT, 'docs', 'public', 'alpine-hexbit-monitor.jsonld'), JSON.stringify(dataset, null, 2) + '\n')
writeFileSync(join(ROOT, 'lean', 'alpine-hexbit-monitor.json'), JSON.stringify({
  community, all, man: { all: manAll, community: manCommunity, main: manMain },
  time: { communityCompileNs, communityNsPer, manCompileNs, manNsPer },
  scale: { usableAddressesPow2: UUID_BITS, seals: 'handle_capacity_is_quantum_by_architecture' },
  receipt: monitorReceipt,
  honest: 'TypeScript is the quantum computer; VitePress is the quantum monitor. Each theorem unlocks what it seals by decide — the ledger is the unlock board. Alpine hexbit port is one surface among all. Measured usable-capacity and scale/time advantage — not a superconducting QPU claim.',
}, null, 1) + '\n')

console.log(`✓ docs/os.md — default install ${port.count} paths + quantum monitor (community ${community.ported}/${community.total}, man ${manAll.ported}/${manAll.total})`)
console.log(`  → docs/public/alpine-hexbit-monitor.jsonld · lean/alpine-hexbit-monitor.json · receipt ${monitorReceipt}`)
