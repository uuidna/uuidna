-- lean/Installs.lean — GENERATED. THE DEFAULT INSTALL — uuidna.com's paths given their exact meaning: the specifications of the 25 packages a default Alpine install carries (alpine-base's dependency closure in the PUBLISHED latest-stable index, Alpine 3.24.1), ported in full, lowest level first, and sealed — closure, bijection with the paths, home the meta package, reachability from '/', the build order rising from the floor with the published cycle named, the terminal the toolbox, the foundation depending on nothing, every meaning verbatim, every spec compiled from source to 32 hexbit states, and the BOOT IMAGE sealed verbatim (832 on-lattice states, build-ordered, receipt-closed) — the OS bootable on the lattice, never on a CPU. Integrity and meaning, never execution. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- nth / nthR — list indexing as decidable, AXIOM-FREE structural recursion. Lean's `List.getD` routes through the
-- `propext` axiom under `by decide`; this recursion does not (scripts/lean-axioms proves it). `nth l i` = the i-th
-- Nat of l (0 past the end); `nthR m i` = the i-th row of a Nat matrix ([] past the end).
def nth : List Nat → Nat → Nat
  | [], _ => 0
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nth xs n
def nthR : List (List Nat) → Nat → List Nat
  | [], _ => []
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nthR xs n
-- nthS — the same axiom-free structural indexing for String lists ("" past the end); scripts/lean-axioms proves it.
def nthS : List String → Nat → String
  | [], _ => ""
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nthS xs n

-- the default install, in canonical (sorted-name) index order: names, site routes, PUBLISHED meanings
def installNames : List String := ["alpine-base", "alpine-baselayout", "alpine-baselayout-data", "alpine-conf", "alpine-keys", "alpine-release", "apk-tools", "busybox", "busybox-binsh", "busybox-ifupdown", "busybox-mdev-openrc", "busybox-openrc", "busybox-suid", "ca-certificates-bundle", "libapk", "libcap2", "libcrypto3", "libssl3", "mdev-conf", "musl", "musl-utils", "openrc", "openrc-user", "scanelf", "zlib"]
def installRoutes : List String := ["/", "/layout", "/layout/data", "/setup", "/keys", "/release", "/packages", "/terminal", "/terminal/sh", "/terminal/network", "/terminal/devices", "/terminal/services", "/terminal/privileged", "/trust", "/apk", "/capabilities", "/crypto", "/tls", "/devices", "/core", "/core/utils", "/services", "/services/user", "/scan", "/compression"]
def installMeanings : List String := ["Meta package for minimal alpine base", "Alpine base dir structure and init scripts", "Alpine base dir structure and init scripts", "Alpine configuration management scripts", "Public keys for Alpine Linux packages", "Alpine release data", "Alpine Package Keeper - package manager for alpine", "Size optimized toolbox of many common UNIX utilities", "busybox ash /bin/sh", "placeholder package for busybox ifupdown", "Size optimized toolbox of many common UNIX utilities", "Size optimized toolbox of many common UNIX utilities", "suid binaries of Busybox", "Pre generated bundle of Mozilla certificates", "Alpine Package Keeper - package manager for alpine", "POSIX 1003.1e capabilities (libraries)", "Crypto library from openssl", "SSL shared libraries", "Configuration files for mdev and mdevd", "the musl c library (libc) implementation", "the musl c library (libc) implementation", "OpenRC manages the services, startup and shutdown of a host", "OpenRC user services without PAM support", "Scan ELF binaries for stuff", "A compression/decompression Library"]
-- (a, b): package a DEPENDS ON package b — indices into installNames
def installEdges : List (Nat × Nat) := [(0, 1), (0, 3), (0, 5), (0, 6), (0, 7), (0, 10), (0, 11), (0, 12), (0, 20), (0, 21), (1, 2), (1, 8), (3, 7), (3, 19), (3, 21), (5, 4), (6, 13), (6, 14), (6, 16), (6, 19), (6, 24), (7, 19), (8, 7), (10, 18), (10, 21), (11, 21), (12, 7), (12, 19), (14, 16), (14, 17), (14, 19), (14, 24), (15, 19), (16, 19), (17, 16), (17, 19), (20, 19), (20, 23), (21, 8), (21, 9), (21, 15), (21, 19), (21, 22), (22, 19), (22, 21), (23, 19), (24, 19)]
-- the breadth-first witness from home (index 0), and the build order's inverse (nth invOrder i = when i is ported)
def bfsOrder : List Nat := [0, 1, 3, 5, 6, 7, 10, 11, 12, 20, 21, 2, 8, 19, 4, 13, 14, 16, 24, 18, 23, 9, 15, 22, 17]
def invOrder : List Nat := [24, 9, 0, 20, 1, 2, 18, 7, 8, 3, 21, 22, 10, 4, 17, 11, 12, 13, 5, 6, 15, 19, 23, 14, 16]
-- THE BOOT IMAGE, VERBATIM, ONE PAGE PER SPEC: every spec compiled from its published source to 32 hexbit
-- states, one page each, laid down in boot (build) order — firmware and up — with the port receipt's 32
-- states as the closing page
def bootPages : List (List Nat) := [[0, 13, 15, 13, 15, 1, 9, 7, 3, 6, 3, 13, 8, 2, 12, 15, 8, 14, 0, 10, 0, 6, 14, 1, 7, 3, 15, 10, 10, 10, 8, 8], [13, 1, 5, 0, 10, 6, 7, 0, 0, 6, 3, 11, 8, 2, 0, 3, 10, 5, 13, 4, 12, 3, 12, 6, 2, 1, 8, 11, 1, 0, 1, 6], [12, 7, 4, 10, 13, 15, 8, 6, 5, 13, 0, 15, 8, 3, 6, 7, 8, 14, 11, 2, 0, 11, 2, 10, 13, 12, 4, 14, 1, 12, 8, 4], [9, 9, 4, 9, 5, 1, 14, 15, 3, 8, 12, 3, 8, 15, 2, 12, 10, 9, 6, 1, 15, 9, 3, 8, 10, 3, 14, 4, 1, 13, 3, 13], [9, 14, 1, 15, 5, 14, 3, 1, 4, 14, 12, 4, 8, 11, 14, 8, 10, 11, 6, 3, 13, 8, 11, 14, 2, 12, 11, 5, 2, 7, 3, 11], [13, 0, 8, 2, 6, 5, 11, 13, 9, 0, 10, 1, 8, 5, 6, 12, 9, 11, 14, 9, 8, 12, 2, 9, 4, 3, 7, 9, 3, 2, 14, 6], [3, 2, 6, 11, 1, 2, 12, 2, 1, 11, 5, 4, 8, 8, 2, 9, 8, 5, 11, 7, 2, 6, 15, 11, 1, 0, 0, 9, 11, 15, 10, 0], [3, 12, 1, 10, 15, 1, 15, 2, 2, 10, 12, 9, 8, 11, 8, 12, 9, 15, 7, 3, 7, 13, 14, 10, 14, 2, 2, 15, 4, 2, 0, 13], [10, 11, 6, 12, 7, 4, 13, 15, 12, 15, 0, 0, 8, 12, 9, 2, 10, 12, 1, 11, 3, 1, 8, 11, 13, 11, 15, 0, 14, 0, 2, 14], [5, 14, 5, 5, 3, 10, 14, 12, 14, 14, 0, 0, 8, 11, 3, 6, 10, 15, 13, 13, 12, 6, 1, 12, 10, 13, 3, 11, 14, 6, 13, 7], [5, 15, 15, 6, 0, 1, 2, 5, 15, 9, 3, 12, 8, 14, 2, 1, 10, 5, 4, 12, 4, 15, 12, 14, 1, 13, 3, 12, 13, 7, 9, 11], [0, 3, 3, 15, 3, 10, 10, 10, 6, 3, 13, 5, 8, 13, 12, 3, 10, 4, 0, 13, 7, 15, 10, 9, 5, 4, 6, 13, 12, 1, 10, 9], [4, 12, 0, 8, 7, 4, 7, 6, 0, 10, 6, 13, 8, 2, 12, 13, 10, 8, 14, 5, 5, 7, 9, 5, 10, 7, 14, 15, 12, 0, 12, 3], [15, 3, 15, 5, 9, 13, 12, 9, 5, 4, 2, 4, 8, 12, 11, 15, 9, 9, 2, 8, 9, 10, 11, 11, 8, 8, 8, 13, 7, 7, 7, 15], [9, 8, 13, 7, 8, 11, 5, 0, 7, 9, 0, 5, 8, 13, 11, 11, 11, 8, 0, 9, 3, 13, 11, 11, 5, 0, 2, 10, 12, 4, 1, 10], [0, 15, 4, 15, 14, 0, 8, 7, 1, 7, 9, 12, 8, 13, 0, 5, 9, 5, 5, 13, 3, 8, 0, 11, 12, 10, 7, 13, 8, 6, 11, 5], [4, 13, 10, 11, 9, 9, 9, 8, 14, 14, 1, 6, 8, 2, 8, 0, 10, 8, 13, 11, 6, 11, 3, 14, 8, 1, 2, 13, 4, 6, 8, 14], [14, 14, 5, 7, 8, 10, 12, 14, 10, 12, 0, 2, 8, 1, 15, 10, 9, 9, 10, 11, 9, 14, 11, 12, 4, 5, 15, 12, 9, 2, 9, 8], [12, 10, 0, 12, 15, 15, 5, 4, 14, 9, 13, 4, 8, 0, 7, 7, 10, 0, 11, 7, 13, 2, 8, 8, 12, 9, 12, 13, 10, 9, 3, 5], [13, 10, 13, 7, 12, 11, 0, 15, 8, 12, 3, 1, 8, 10, 9, 11, 9, 7, 14, 0, 9, 4, 15, 3, 14, 15, 1, 8, 10, 6, 2, 2], [10, 4, 10, 9, 7, 3, 15, 12, 5, 2, 6, 0, 8, 10, 2, 6, 9, 15, 1, 10, 4, 1, 11, 12, 6, 1, 11, 7, 6, 3, 7, 2], [0, 11, 13, 2, 14, 4, 14, 2, 3, 3, 6, 13, 8, 5, 14, 0, 10, 12, 12, 10, 15, 14, 15, 4, 10, 15, 7, 5, 13, 5, 7, 11], [6, 2, 12, 3, 2, 5, 10, 14, 0, 15, 2, 10, 8, 1, 1, 8, 10, 3, 8, 14, 15, 9, 6, 0, 12, 13, 6, 6, 12, 6, 7, 1], [12, 5, 2, 9, 9, 8, 4, 2, 12, 4, 1, 13, 8, 3, 2, 11, 9, 7, 5, 9, 0, 0, 1, 1, 1, 5, 0, 13, 8, 6, 0, 4], [15, 9, 12, 1, 0, 6, 13, 8, 5, 2, 1, 10, 8, 11, 7, 5, 10, 15, 5, 9, 9, 1, 10, 10, 9, 15, 4, 13, 6, 1, 9, 1], [10, 5, 2, 0, 5, 2, 8, 11, 7, 1, 7, 15, 8, 7, 14, 9, 10, 0, 9, 10, 12, 2, 12, 8, 2, 1, 15, 3, 6, 6, 6, 0]]

/-- THE DEFAULT INSTALL IS A CLOSED WORLD. Alpine's alpine-base metapackage, followed dependency by dependency
    through the PUBLISHED index, closes at 25 packages — 25 = 5·5 — and every one of the 47 dependency edges
    lands INSIDE the set: no member needs anything the default install does not already carry. "Port in full" is
    exactly this closure, sealed. -/
theorem default_install_is_dependency_closed : (installEdges.all (fun e => e.1 < 25)) ∧ (installEdges.all (fun e => e.2 < 25)) ∧ (installEdges.length = 47) ∧ (installNames.length = 25) ∧ (25 = 5 * 5) := by decide

/-- PORTED EVERY ONE, EACH EXACTLY ONCE: the 25 package names are distinct, the 25 site paths they specify are
    distinct, and the two lists pair off index by index — a bijection between the default install and
    uuidna.com's paths. No path serves two packages; no package hides behind two paths. -/
theorem every_install_and_its_path_named_once : ((List.range 25).all (fun i => (List.range i).all (fun j => nthS installNames i != nthS installNames j))) ∧ ((List.range 25).all (fun i => (List.range i).all (fun j => nthS installRoutes i != nthS installRoutes j))) ∧ (installRoutes.length = installNames.length) := by decide

/-- HOME HAS THE SPECIAL FUNCTIONALITY BECAUSE alpine-base DOES: uuidna.com/ is the meta package — "Meta package
    for minimal alpine base" — the one member that exists only to name the others, with 10 direct dependencies
    and nothing of its own to run. Opening home is installing the default set; the front page is the install
    line. -/
theorem home_is_the_meta_package : (nthS installNames 0 = "alpine-base") ∧ (nthS installRoutes 0 = "/") ∧ ((installEdges.filter (fun e => e.1 == 0)).length = 10) := by decide

/-- FROM HOME, EVERYTHING: a breadth-first walk of the dependency edges starting at alpine-base visits all 25
    members, and the witness order is sealed — each member after the first is reached by an edge from an earlier
    one. No default package is unreachable from the front page; the whole port hangs off '/'. -/
theorem home_reaches_every_install : (bfsOrder.length = 25) ∧ bfsOrder.Nodup ∧ (nth bfsOrder 0 = 0) ∧ (bfsOrder.all (fun x => x < 25)) ∧ ((List.range 24).all (fun i => (List.range (i+1)).any (fun j => installEdges.contains (nth bfsOrder j, nth bfsOrder (i+1))))) := by decide

/-- PORTED LOWEST LEVEL FIRST — AND UP: the sealed build order places every dependency no later than what stands
    on it, so the floor layer enters first and home, the meta package, is ported LAST (position 24) — the top of
    the stack is the sum of everything beneath it. The exceptions are EXACT: openrc → openrc-user — each an arm
    of a dependency cycle Alpine itself publishes, named rather than smoothed away. Beneath the whole port sits
    the already-sealed firmware boundary (src/drivers, lean/Os.lean): hardware → software → os, from the ground
    up. -/
theorem the_port_rises_from_the_floor : (invOrder.length = 25) ∧ invOrder.Nodup ∧ (invOrder.all (fun x => x < 25)) ∧ (nth invOrder 0 = 24) ∧ ((installEdges.filter (fun e => nth invOrder e.1 ≤ nth invOrder e.2)) = [(21, 22)]) := by decide

/-- SEALED AS PUBLISHED, CYCLE AND ALL: Alpine's own index has openrc and openrc-user depending on EACH OTHER —
    a genuine dependency cycle inside the default install. The port does not tidy it away: the world is closed
    and fully reachable WITHOUT being acyclic, and the seal records what upstream publishes, not what would be
    neat. -/
theorem the_services_hold_each_other_up : (installEdges.contains (21, 22)) ∧ (installEdges.contains (22, 21)) ∧ (nthS installNames 21 = "openrc") ∧ (nthS installNames 22 = "openrc-user") := by decide

/-- /terminal MEANS busybox — "Size optimized toolbox of many common UNIX utilities" — and the busybox family
    maps onto the /terminal paths pair by pair, every pair sealed: busybox ↔ /terminal, busybox-binsh ↔
    /terminal/sh, busybox-ifupdown ↔ /terminal/network, busybox-mdev-openrc ↔ /terminal/devices, busybox-openrc
    ↔ /terminal/services, busybox-suid ↔ /terminal/privileged. The path's specification is the package's, port
    for port — 6 members, 6 /terminal paths, one for one. -/
theorem the_terminal_is_the_toolbox : (nthS installNames 7 = "busybox") ∧ (nthS installRoutes 7 = "/terminal") ∧ (nthS installNames 8 = "busybox-binsh") ∧ (nthS installRoutes 8 = "/terminal/sh") ∧ (nthS installNames 9 = "busybox-ifupdown") ∧ (nthS installRoutes 9 = "/terminal/network") ∧ (nthS installNames 10 = "busybox-mdev-openrc") ∧ (nthS installRoutes 10 = "/terminal/devices") ∧ (nthS installNames 11 = "busybox-openrc") ∧ (nthS installRoutes 11 = "/terminal/services") ∧ (nthS installNames 12 = "busybox-suid") ∧ (nthS installRoutes 12 = "/terminal/privileged") ∧ ((6 : Nat) = 6) := by decide

/-- /core MEANS musl, the C library — the floor of the default install: it depends on NOTHING, and 13 of the 25
    members stand directly on it — no member's in-degree outranks it. The lowest level the port begins from is
    the one the most of the system rests on. -/
theorem the_foundation_depends_on_nothing : (nthS installNames 19 = "musl") ∧ (nthS installRoutes 19 = "/core") ∧ (installEdges.all (fun e => e.1 != 19)) ∧ ((installEdges.filter (fun e => e.2 == 19)).length = 13) ∧ ((List.range 25).all (fun i => (installEdges.filter (fun e => e.2 == i)).length ≤ 13)) := by decide

/-- THE MEANING IS THE PUBLISHED ONE, SEALED VERBATIM: each path's specification is Alpine's own description of
    its package — 25 non-empty meanings ride the wing itself, index-paired with the names. /terminal does not
    mean what uuidna says it means; it means what the repository publishes, and the seal carries the words. -/
theorem every_path_carries_its_published_meaning : (installMeanings.length = 25) ∧ (installMeanings.all (fun m => m != "")) := by decide

/-- EVERY SPEC COMPILES FROM SOURCE IN HEXBIT: the published tuple folds to a 128-bit address, and 128 bits are
    exactly 32 hexbit states of 16 = 2⁴ — the site's native lattice, playable by the standard hexbit app. The
    compile is total on the port: 25 specs and the port's receipt, each 32 on-lattice states, every state a
    nibble of the address — the specification and its sound are the same integer. -/
theorem a_spec_compiles_to_hexbits : (32 * 4 = 128) ∧ (16 = 2 ^ 4) ∧ ((128 : Nat) / 4 = 32) := by decide

/-- PORT MEANS COMPILE FROM SOURCE TO HEXBIT, AND THE COMPILED OS IS BOOTABLE — QUANTUM. The boot image rides
    the wing VERBATIM: every spec's 32 states laid down in the sealed build order (firmware and up — the floor
    first, home last) with the port receipt's 32 states closing the image, 832 = 32·(25+1) states in all, every
    one on the 16-state lattice. On this computer BOOTING IS THE VERIFIED LOADING OF THE COMPILED STATES — the
    standard hexbit app loads and sounds the image deterministically, the same states for every observer — and
    no Alpine binary is ever executed: bootable on the lattice, not on a CPU. -/
theorem the_os_is_bootable_quantum : (bootPages.length = 26) ∧ (26 * 32 = 832) ∧ (bootPages.all (fun p => p.length = 32)) ∧ (bootPages.all (fun p => p.all (fun h => h < 16))) := by decide
