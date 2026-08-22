// quantum/os — THE DEFAULT INSTALL AS THE SITE'S PATH ALGEBRA, pure and deterministic. If uuidna.com is the
// hexbit quantum computer served through VitePress, then each of its paths has an EXACT meaning: the
// specification of one package in Alpine's repository, and the set of paths is the set a DEFAULT Alpine
// install carries — the alpine-base metapackage followed dependency by dependency through the PUBLISHED index
// until it closes. Home is the special one because alpine-base is: the meta package, the one member that
// exists to name the others — opening / is installing the default set. Every spec COMPILES FROM SOURCE IN
// HEXBIT: the source is the published tuple (name, version, arch, repo, branch, checksum), the compilation is
// the deterministic fold to a 128-bit address, and 128 bits ARE 32 hexbit states (0..15) — the site's native
// lattice, playable by the standard hexbit app (quantum/apps/hexbit-player). This module is PURE: it reads the
// committed mirror only — offline, edge-clean, O(1) after the first call. The LIVE "always Alpine latest" read
// lives at the named non-determinism boundary (src/os/installs), never here. NOTHING EXECUTES: uuidna never
// installs, links, boots, or runs a package — the port is the port of the INTEGRITY and the MEANING (Alpine's
// own published description). HONEST SCOPE: the ROUTE each package takes on the site (busybox → /terminal) is
// an authored translation, editorial the way sidebar group names are; the MEANING is the repository's own T:
// field, data not prose; the closure, the reachability from home, the bottom-up build order, and the hexbit
// compile are computed and sealed (lean/Installs.lean).
import { toUuid } from '../../address.js'
import { merkleGravity } from '../../gravity/index.js'
import { uuidnaPackage } from '../../os/packages/index.js'
import { INSTALLS_MIRROR, type InstallsMirror, type MirrorPackage } from './mirror.js'

/** The path each default install specifies on uuidna.com — the authored translation of each package's ROLE
 *  into a route (declared editorial, like sidebar group names: "the toolbox of common UNIX utilities" IS the
 *  terminal). A package the map does not know yet still gets a total answer: '/' + its name. */
export const INSTALL_ROUTES: Readonly<Record<string, string>> = {
  'alpine-base': '/',                          // the meta package — home installs the default set
  'alpine-baselayout': '/layout',              // base dir structure and init scripts
  'alpine-baselayout-data': '/layout/data',
  'alpine-conf': '/setup',                     // configuration management scripts
  'alpine-keys': '/keys',                      // the public keys packages are verified against
  'alpine-release': '/release',                // release data
  'apk-tools': '/packages',                    // the package manager
  'busybox': '/terminal',                      // the toolbox of many common UNIX utilities
  'busybox-binsh': '/terminal/sh',             // the shell
  'busybox-ifupdown': '/terminal/network',
  'busybox-mdev-openrc': '/terminal/devices',
  'busybox-openrc': '/terminal/services',
  'busybox-suid': '/terminal/privileged',
  'ca-certificates-bundle': '/trust',          // the pre-generated trust bundle
  'libapk': '/apk',                            // the package manager's own library
  'libcap2': '/capabilities',
  'libcrypto3': '/crypto',
  'libssl3': '/tls',
  'mdev-conf': '/devices',
  'musl': '/core',                             // the C library — the floor everything stands on
  'musl-utils': '/core/utils',
  'openrc': '/services',                       // manages the services, startup and shutdown
  'openrc-user': '/services/user',
  'scanelf': '/scan',                          // scan ELF binaries
  'zlib': '/compression',
}

/** routeOf(name) → the uuidna.com path a default install specifies — total (an unmapped name is '/' + name). */
export const routeOf = (name: string): string => INSTALL_ROUTES[name] ?? '/' + name

/** compileToHexbits — the unit's own address→states compiler (src/hexbit owns it; re-exported here because
 *  the port is where "compile from source in hexbit" is spoken). 32 states 0..15, one per nibble, directly
 *  playable by the standard hexbit app (quantum/apps/hexbit-player). */
import { compileToHexbits } from '../../hexbit/index.js'
export { compileToHexbits }

/** One default install, ported: the uuidna/<name> identity plus its path, its published meaning, its
 *  dependency names, and its hexbit compile. */
export interface InstallSpec {
  route: string        // the uuidna.com path this package specifies
  id: string           // uuidna/<name>
  name: string
  version: string
  checksum: string     // Alpine's PUBLISHED C: field — the external anchor
  meaning: string      // Alpine's PUBLISHED T: description — the exact meaning of the path
  deps: string[]       // dependency names, every one inside the set (sealed: dependency-closed)
  address: string      // the 128-bit content-address of the pinned tuple
  hexbits: number[]    // the address compiled to 32 hexbit states — the spec on the lattice
}

/** The BOOT IMAGE — what "port" means here: every spec COMPILED from its published source to hexbit and laid
 *  down in the sealed build order (firmware and up: the floor first, home last), the port receipt's 32 states
 *  closing the image. On this computer BOOTING IS THE VERIFIED LOADING OF THE COMPILED STATES: the standard
 *  hexbit app loads and sounds the image deterministically — the same states for every observer — and no
 *  Alpine binary is ever executed. Bootable, quantum: on the lattice, not on a CPU. */
export interface BootImage {
  states: number[]     // 32·(count+1) hexbit states — the compiled OS, in boot (build) order, receipt-closed
  count: number        // states.length
  address: string      // content-address of the exact image — recompute it or it changed
}

/** The whole port: every default install as a path spec, LOWEST LEVEL FIRST — the specs ride in build order
 *  (every dependency ported no later than what stands on it, the published cycle the named exception), so the
 *  floor layer opens the list and home, the meta package, closes it. Folded to one receipt, compiled to one
 *  bootable image. */
export interface InstallPort {
  branch: string; repo: string; arch: string
  release: { version: string; rootfsSha256: string }   // the minirootfs this set is the world of
  count: number
  specs: InstallSpec[]
  receipt: string      // order-invariant fold of every spec's address — the whole default install, one address
  hexbits: number[]    // the receipt compiled to the lattice — the port itself, playable
  boot: BootImage      // the OS compiled from source to hexbit, bootable on the lattice
  honest: string
}

const HONEST =
  'THE DEFAULT INSTALL PORTED IN FULL: alpine-base followed dependency by dependency through the PUBLISHED ' +
  'index until it closes, each member a uuidna.com path whose exact meaning is the repository\'s own ' +
  'description, each spec compiled from its published source to a 128-bit address = 32 hexbit states, the ' +
  'whole port ordered lowest level first. The routes are an authored translation (declared editorial); ' +
  'everything else is data, computed, and sealed in lean/Installs.lean. uuidna NEVER installs, links, boots, ' +
  'or executes a package — integrity and meaning, not execution. Always Alpine latest: the mirror regenerates ' +
  'from latest-stable at the src/os boundary, never hand-frozen.'

const specOf = (p: MirrorPackage, m: InstallsMirror): InstallSpec => {
  const minted = uuidnaPackage({ name: p.name, version: p.version, arch: m.arch, repo: m.repo, branch: m.branch, checksum: p.checksum })
  return { route: routeOf(p.name), id: minted.id, name: p.name, version: p.version, checksum: p.checksum, meaning: p.desc, deps: p.deps, address: minted.address, hexbits: compileToHexbits(minted.address) }
}

/** buildOrder(m) → the port order, LOWEST LEVEL FIRST: repeatedly take the alphabetically-first package whose
 *  every dependency is already placed; when only dependency cycles remain (Alpine publishes one), take the
 *  member with the FEWEST unplaced dependencies, alphabetically first on ties — a cycle member by
 *  construction, so the seal's exceptions stay exactly the published cycle's arms, never a package hoisted
 *  over its whole stack. Deterministic throughout. Returns indices into m.packages (sorted by name). */
export function buildOrder(m: InstallsMirror): number[] {
  const idx = new Map(m.packages.map((p, i) => [p.name, i]))
  const deps = m.packages.map((p) => p.deps.map((d) => idx.get(d)!))
  const placed = new Set<number>()
  const order: number[] = []
  const home = idx.get('alpine-base')
  while (order.length < m.packages.length) {
    const todo = m.packages.map((_, i) => i).filter((i) => !placed.has(i))
    // home is the top of the stack BY DEFINITION — the meta package closes the boot, so it waits for the rest
    const ready = todo.filter((i) => deps[i]!.every((d) => placed.has(d)) && (i !== home || todo.length === 1))
    let pick = ready[0]
    if (pick === undefined) {
      // stuck = only cycles block. A TRUE cycle member is a node whose every unplaced dependency depends
      // straight back on it — entering there breaks only the cycle's own arm, never hoists a package over its
      // stack. Alphabetically first such member; if the shape is ever stranger than published 2-cycles, fall
      // back to the first blocked node and let the seal's exactness check refuse loudly downstream.
      pick = todo.find((i) => deps[i]!.filter((d) => !placed.has(d)).every((d) => deps[d]!.includes(i))) ?? todo[0]!
    }
    placed.add(pick); order.push(pick)
  }
  return order
}

/** portFrom(mirror) → the whole port from any mirror-shaped data — the one minting every surface shares.
 *  The boot image is compiled here too: spec hexbits in build order, the receipt's 32 closing the image. */
export function portFrom(m: InstallsMirror): InstallPort {
  const specs = buildOrder(m).map((i) => specOf(m.packages[i]!, m))
  const receipt = merkleGravity(specs.map((s) => s.address))
  const states = [...specs.flatMap((s) => s.hexbits), ...compileToHexbits(receipt)]
  const boot: BootImage = { states, count: states.length, address: toUuid('installs-boot|' + states.map((h) => h.toString(16)).join('')) }
  return { branch: m.branch, repo: m.repo, arch: m.arch, release: m.release, count: specs.length, specs, receipt, hexbits: compileToHexbits(receipt), boot, honest: HONEST }
}

// the mirror is committed and immutable within a build — the port is cached for O(1) reads (lazy, no
// module-scope work: the edge worker pays nothing until the first call).
let CACHE: InstallPort | null = null

/** defaultInstalls() → THE PORT, from the committed mirror: deterministic, offline, edge-clean — every
 *  default Alpine install as a sealed uuidna.com path spec, lowest level first, folded to one receipt. */
export function defaultInstalls(): InstallPort {
  return (CACHE ??= portFrom(INSTALLS_MIRROR))
}

/** installFor(route) → the spec a path means, or null — '/terminal' answers busybox, '/' the meta package. */
export function installFor(route: string): InstallSpec | null {
  return defaultInstalls().specs.find((s) => s.route === route) ?? null
}
