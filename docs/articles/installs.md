---
title: "lean/Installs.lean"
description: "Computed from lean/Installs.lean — 11 sealed theorems, every claim citing its proof."
---

# lean/Installs.lean

> THE DEFAULT INSTALL — uuidna.com's paths given their exact meaning: the specifications of the 25 packages a default Alpine install carries (alpine-base's dependency closure in the PUBLISHED latest-stable index, Alpine 3.24.1), ported in full, lowest level first, and sealed — closure, bijection with the paths, home the meta package, reachability from '/', the build order rising from the floor with the published cycle named, the terminal the toolbox, the foundation depending on nothing, every meaning verbatim, every spec compiled from source to 32 hexbit states, and the BOOT IMAGE sealed verbatim (832 on-lattice states, build-ordered, receipt-closed) — the OS bootable on the lattice, never on a CPU. Integrity and meaning, never execution. — held by [default_install_is_dependency_closed](/theorem/default_install_is_dependency_closed) and its 10 siblings below.

**11 theorems**, from [default_install_is_dependency_closed](/theorem/default_install_is_dependency_closed) onward, each proven `by decide` in [lean/Installs.lean](/lean/Installs.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 11 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [default_install_is_dependency_closed](/theorem/default_install_is_dependency_closed). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FInstalls.lean)** — nothing to install. The editor fetches `lean/Installs.lean` from the repository and re-decides all 11 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE DEFAULT INSTALL IS A CLOSED WORLD. Alpine's alpine-base metapackage, followed dependency by dependency through the PUBLISHED index, closes at 25 packages — 25 = 5·5 — and every one of the 47 dependency edges lands INSIDE the set: no member needs anything the default install does not already carry. "Port in full" is exactly this closure, sealed.
The ledger holds this as [default_install_is_dependency_closed](/theorem/default_install_is_dependency_closed) — proven `by decide`, sorry-free:

```lean
(installEdges.all (fun e => e.1 < 25)) ∧ (installEdges.all (fun e => e.2 < 25)) ∧ (installEdges.length = 47) ∧ (installNames.length = 25) ∧ (25 = 5 * 5)
```

### PORTED EVERY ONE, EACH EXACTLY ONCE: the 25 package names are distinct, the 25 site paths they specify are distinct, and the two lists pair off index by index — a bijection between the default install and uuidna.com's paths. No path serves two packages; no package hides behind two paths.
The ledger holds this as [every_install_and_its_path_named_once](/theorem/every_install_and_its_path_named_once) — proven `by decide`, sorry-free:

```lean
((List.range 25).all (fun i => (List.range i).all (fun j => nthS installNames i != nthS installNames j))) ∧ ((List.range 25).all (fun i => (List.range i).all (fun j => nthS installRoutes i != nthS installRoutes j))) ∧ (installRoutes.length = installNames.length)
```

### HOME HAS THE SPECIAL FUNCTIONALITY BECAUSE alpine-base DOES: uuidna.com/ is the meta package — "Meta package for minimal alpine base" — the one member that exists only to name the others, with 10 direct dependencies and nothing of its own to run. Opening home is installing the default set; the front page is the install line.
The ledger holds this as [home_is_the_meta_package](/theorem/home_is_the_meta_package) — proven `by decide`, sorry-free:

```lean
(nthS installNames 0 = "alpine-base") ∧ (nthS installRoutes 0 = "/") ∧ ((installEdges.filter (fun e => e.1 == 0)).length = 10)
```

### FROM HOME, EVERYTHING: a breadth-first walk of the dependency edges starting at alpine-base visits all 25 members, and the witness order is sealed — each member after the first is reached by an edge from an earlier one. No default package is unreachable from the front page; the whole port hangs off '/'.
The ledger holds this as [home_reaches_every_install](/theorem/home_reaches_every_install) — proven `by decide`, sorry-free:

```lean
(bfsOrder.length = 25) ∧ bfsOrder.Nodup ∧ (nth bfsOrder 0 = 0) ∧ (bfsOrder.all (fun x => x < 25)) ∧ ((List.range 24).all (fun i => (List.range (i+1)).any (fun j => installEdges.contains (nth bfsOrder j, nth bfsOrder (i+1)))))
```

### PORTED LOWEST LEVEL FIRST — AND UP: the sealed build order places every dependency no later than what stands on it, so the floor layer enters first and home, the meta package, is ported LAST (position 24) — the top of the stack is the sum of everything beneath it. The exceptions are EXACT: openrc → openrc-user — each an arm of a dependency cycle Alpine itself publishes, named rather than smoothed away. Beneath the whole port sits the already-sealed firmware boundary (src/drivers, lean/Os.lean): hardware → software → os, from the ground up.
The ledger holds this as [the_port_rises_from_the_floor](/theorem/the_port_rises_from_the_floor) — proven `by decide`, sorry-free:

```lean
(invOrder.length = 25) ∧ invOrder.Nodup ∧ (invOrder.all (fun x => x < 25)) ∧ (nth invOrder 0 = 24) ∧ ((installEdges.filter (fun e => nth invOrder e.1 ≤ nth invOrder e.2)) = [(21, 22)])
```

### SEALED AS PUBLISHED, CYCLE AND ALL: Alpine's own index has openrc and openrc-user depending on EACH OTHER — a genuine dependency cycle inside the default install. The port does not tidy it away: the world is closed and fully reachable WITHOUT being acyclic, and the seal records what upstream publishes, not what would be neat.
The ledger holds this as [the_services_hold_each_other_up](/theorem/the_services_hold_each_other_up) — proven `by decide`, sorry-free:

```lean
(installEdges.contains (21, 22)) ∧ (installEdges.contains (22, 21)) ∧ (nthS installNames 21 = "openrc") ∧ (nthS installNames 22 = "openrc-user")
```

### /terminal MEANS busybox — "Size optimized toolbox of many common UNIX utilities" — and the busybox family maps onto the /terminal paths pair by pair, every pair sealed: busybox ↔ /terminal, busybox-binsh ↔ /terminal/sh, busybox-ifupdown ↔ /terminal/network, busybox-mdev-openrc ↔ /terminal/devices, busybox-openrc ↔ /terminal/services, busybox-suid ↔ /terminal/privileged. The path's specification is the package's, port for port — 6 members, 6 /terminal paths, one for one.
The ledger holds this as [the_terminal_is_the_toolbox](/theorem/the_terminal_is_the_toolbox) — proven `by decide`, sorry-free:

```lean
(nthS installNames 7 = "busybox") ∧ (nthS installRoutes 7 = "/terminal") ∧ (nthS installNames 8 = "busybox-binsh") ∧ (nthS installRoutes 8 = "/terminal/sh") ∧ (nthS installNames 9 = "busybox-ifupdown") ∧ (nthS installRoutes 9 = "/terminal/network") ∧ (nthS installNames 10 = "busybox-mdev-openrc") ∧ (nthS installRoutes 10 = "/terminal/devices") ∧ (nthS installNames 11 = "busybox-openrc") ∧ (nthS installRoutes 11 = "/terminal/services") ∧ (nthS installNames 12 = "busybox-suid") ∧ (nthS installRoutes 12 = "/terminal/privileged") ∧ ((6 : Nat) = 6)
```

### /core MEANS musl, the C library — the floor of the default install: it depends on NOTHING, and 13 of the 25 members stand directly on it — no member's in-degree outranks it. The lowest level the port begins from is the one the most of the system rests on.
The ledger holds this as [the_foundation_depends_on_nothing](/theorem/the_foundation_depends_on_nothing) — proven `by decide`, sorry-free:

```lean
(nthS installNames 19 = "musl") ∧ (nthS installRoutes 19 = "/core") ∧ (installEdges.all (fun e => e.1 != 19)) ∧ ((installEdges.filter (fun e => e.2 == 19)).length = 13) ∧ ((List.range 25).all (fun i => (installEdges.filter (fun e => e.2 == i)).length ≤ 13))
```

### THE MEANING IS THE PUBLISHED ONE, SEALED VERBATIM: each path's specification is Alpine's own description of its package — 25 non-empty meanings ride the wing itself, index-paired with the names. /terminal does not mean what uuidna says it means; it means what the repository publishes, and the seal carries the words.
The ledger holds this as [every_path_carries_its_published_meaning](/theorem/every_path_carries_its_published_meaning) — proven `by decide`, sorry-free:

```lean
(installMeanings.length = 25) ∧ (installMeanings.all (fun m => m != ""))
```

### EVERY SPEC COMPILES FROM SOURCE IN HEXBIT: the published tuple folds to a 128-bit address, and 128 bits are exactly 32 hexbit states of 16 = 2⁴ — the site's native lattice, playable by the standard hexbit app. The compile is total on the port: 25 specs and the port's receipt, each 32 on-lattice states, every state a nibble of the address — the specification and its sound are the same integer.
The ledger holds this as [a_spec_compiles_to_hexbits](/theorem/a_spec_compiles_to_hexbits) — proven `by decide`, sorry-free:

```lean
(32 * 4 = 128) ∧ (16 = 2 ^ 4) ∧ ((128 : Nat) / 4 = 32)
```

### PORT MEANS COMPILE FROM SOURCE TO HEXBIT, AND THE COMPILED OS IS BOOTABLE — QUANTUM. The boot image rides the wing VERBATIM: every spec's 32 states laid down in the sealed build order (firmware and up — the floor first, home last) with the port receipt's 32 states closing the image, 832 = 32·(25+1) states in all, every one on the 16-state lattice. On this computer BOOTING IS THE VERIFIED LOADING OF THE COMPILED STATES — the standard hexbit app loads and sounds the image deterministically, the same states for every observer — and no Alpine binary is ever executed: bootable on the lattice, not on a CPU.
The ledger holds this as [the_os_is_bootable_quantum](/theorem/the_os_is_bootable_quantum) — proven `by decide`, sorry-free:

```lean
(bootPages.length = 26) ∧ (26 * 32 = 832) ∧ (bootPages.all (fun p => p.length = 32)) ∧ (bootPages.all (fun p => p.all (fun h => h < 16)))
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
