#!/usr/bin/env node
// gen-os — THE DEFAULT INSTALL, RENDERED FOR THE PERSON WHO OPENS A PATH. If uuidna.com is the hexbit quantum
// computer served through VitePress, each of its paths means one package of a default Alpine install, and this
// page is where a reader checks what a path means: the whole port, lowest level first, every spec's PUBLISHED
// meaning, version, checksum, 128-bit address and its 32-hexbit compile — plus the port's one receipt, sounded
// by the standard hexbit app. Every figure on the page is computed from the committed mirror (always Alpine
// latest at the src/os boundary); nothing here is authored except the section prose, and every claim cites its
// Installs.lean seal. Integrity and meaning, never execution.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './api.js'
import { defaultInstalls } from '../quantum/os/index.js'

const port = defaultInstalls()
const home = port.specs[port.specs.length - 1]!
const th = (k: string): string => `[\`${k}\`](/theorem/${k})`

const rows = port.specs.map((s, i) =>
  `| ${i + 1} | \`${s.route}\` | \`${s.id}\` | ${s.version} | ${s.meaning} | \`${s.address}\` |`
).join('\n')

const page = `---
title: The OS — the default install
description: Every uuidna.com path given its exact meaning — the packages a default Alpine install carries, ported in full, lowest level first, and sealed.
---

# The OS — the default install <Badge type="tip" text="ported in full · every claim sealed" />

> If uuidna.com is the hexbit quantum computer served through VitePress, then each of its paths has an **exact
> meaning**: the specification of one package in Alpine's repository. The set of paths is the set a **default
> Alpine install** carries — \`alpine-base\` followed dependency by dependency through the published index until
> it closes at **${port.count} packages** (${th('default_install_is_dependency_closed')}). uuidna never installs,
> links, boots, or executes any of them: the port is the port of the **integrity** and the **meaning**.

**Home is the special one because \`alpine-base\` is**: the meta package — "${home.meaning}" — the one member
that exists only to name the others. Opening \`/\` is installing the default set
(${th('home_is_the_meta_package')}), and every member is reachable from the front page
(${th('home_reaches_every_install')}).

The base: Alpine **${port.release.version}** (\`${port.branch}\`, ${port.repo}/${port.arch}), minirootfs
\`sha256:${port.release.rootfsSha256}\` — always Alpine **latest**: the mirror regenerates from upstream at the
named \`src/os\` boundary on every lean run, never hand-frozen.

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
\`uuidna_alpine {installs:true}\`.
`

writeFileSync(join(ROOT, 'docs', 'os.md'), page)
console.log(`✓ docs/os.md — the default install: ${port.count} paths, Alpine ${port.release.version}, receipt ${port.receipt}`)
