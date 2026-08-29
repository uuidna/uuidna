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
import { driverBundle } from '../../drivers/driver/index.js'

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
import {
  compileToHexbits, hexbitDoorOf,
  HANDLE_HEXBITS, HANDLE_SPAN, HEXBIT_BITS, HEXBIT_STATES,
  COIN_HEXBITS, UUID_HEXBITS, UUID_BITS, COINS,
  fuseWidth, capacityAt, shorCapacityFit, type ShorCapacityFit,
} from '../../hexbit/index.js'
export { compileToHexbits, hexbitDoorOf }
import { gpuCapacity, type GpuCapacity } from '../../hardware/lanes/index.js'
import { streamFleet } from '../apps/balancer.js'
import { osLayer, type NamedLayer } from '../../layers.js'
import { upgradeFirmware, type FirmwareUpgrade } from './firmware.js'

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
  return { route: routeOf(p.name), id: minted.id, name: p.name, version: p.version, checksum: p.checksum, meaning: p.desc, deps: p.deps, address: minted.address, ...hexbitDoorOf(minted.address) }
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
  return { branch: m.branch, repo: m.repo, arch: m.arch, release: m.release, count: specs.length, specs, receipt, ...hexbitDoorOf(receipt), boot, honest: HONEST }
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

// ── AUTOMATE PORT UPDATES — the port keeps itself current, observably (the captain's order, 2026-08-24) ──────
// The mirror already refreshes at the os/ boundary on every lean run (lean-installs, auto-discovered by lean-all)
// and rewrites ONLY when upstream moved; every surface reads defaultInstalls() so a moved mirror updates them
// all. What was missing was OBSERVABILITY and a DECIDABLE staleness test — a port update you cannot see or
// verify is not automated, it is hoped. portStatus() is the offline, deterministic status of the pinned port;
// portDelta(upstream) is the PURE comparator that decides whether an update is due and names exactly what moved
// (the fetch happens at the boundary, outside these pure functions). Together they let one command — and one
// MCP call — report the port and CATCH a stale pin, so the freshness becomes a signal instead of a silence.

/** The pinned port at a glance — deterministic, offline, edge-clean: the release it is the world of, the package
 *  count, the boot image's shape, the one receipt. This is the port made OBSERVABLE. */
export interface PortStatus {
  branch: string; repo: string; arch: string
  release: { version: string; rootfsSha256: string }
  driver: { flavor: string; file: string; sha256: string; address: string; receipt: string }
  count: number; routes: number; floor: string
  receipt: string; bootReceipt: string; bootStates: number
  honest: string
}
export function portStatus(): PortStatus {
  const p = defaultInstalls()
  const drv = INSTALLS_MIRROR.driver
  const bundle = driverBundle(p.release.version, p.arch, drv.sha256, drv.flavor)
  return {
    branch: p.branch, repo: p.repo, arch: p.arch, release: p.release,
    driver: { flavor: drv.flavor, file: drv.file, sha256: drv.sha256, address: bundle.address, receipt: bundle.receipt },
    count: p.count, routes: p.specs.length, floor: p.specs[0]!.id,
    receipt: p.receipt, bootReceipt: p.boot.address, bootStates: p.boot.count,
    honest: 'The pinned Alpine port made observable: the release the committed mirror is the world of, its netboot/modloop driver bundle, package count and boot shape, folded to one receipt. Integrity and provenance, never execution — the port is of the INTEGRITY and MEANING of the packages, nothing installed, linked, or run (theorem the_os_is_bootable_quantum).',
  }
}

/** One package's move between the pinned mirror and upstream. */
export interface PortChange { name: string; from: string; to: string }
/** The decidable answer to "is a port update due, and exactly what moved?" — PURE over a supplied upstream
 *  mirror (the network read is the caller's, at the boundary). `current` is true iff nothing moved at all. */
export interface PortDelta {
  current: boolean
  releaseFrom: string; releaseTo: string; releaseChanged: boolean
  rootfsFrom: string; rootfsTo: string; rootfsChanged: boolean
  driverFrom: string; driverTo: string; driverChanged: boolean
  countFrom: number; countTo: number
  changed: PortChange[]; added: string[]; removed: string[]
  receipt: string
}
export function portDelta(upstream: InstallsMirror): PortDelta {
  const pinned = INSTALLS_MIRROR
  const key = (p: MirrorPackage): string => p.version + '|' + p.checksum
  const pinnedMap = new Map(pinned.packages.map((p) => [p.name, p]))
  const upMap = new Map(upstream.packages.map((p) => [p.name, p]))
  const changed: PortChange[] = []
  for (const [name, up] of upMap) {
    const was = pinnedMap.get(name)
    if (was && key(was) !== key(up)) changed.push({ name, from: key(was), to: key(up) })
  }
  const added = [...upMap.keys()].filter((n) => !pinnedMap.has(n)).sort()
  const removed = [...pinnedMap.keys()].filter((n) => !upMap.has(n)).sort()
  const releaseChanged = pinned.release.version !== upstream.release.version
  const rootfsChanged = pinned.release.rootfsSha256 !== upstream.release.rootfsSha256
  const driverChanged = pinned.driver.sha256 !== upstream.driver.sha256
  changed.sort((a, b) => (a.name < b.name ? -1 : 1))
  const current = !releaseChanged && !rootfsChanged && !driverChanged
    && changed.length === 0 && added.length === 0 && removed.length === 0
  return {
    current, releaseFrom: pinned.release.version, releaseTo: upstream.release.version, releaseChanged,
    rootfsFrom: pinned.release.rootfsSha256, rootfsTo: upstream.release.rootfsSha256, rootfsChanged,
    driverFrom: pinned.driver.sha256, driverTo: upstream.driver.sha256, driverChanged,
    countFrom: pinned.count, countTo: upstream.packages.length, changed, added, removed,
    receipt: toUuid('port-delta|' + pinned.release.version + '>' + upstream.release.version + '|'
      + pinned.driver.sha256.slice(0, 12) + '>' + upstream.driver.sha256.slice(0, 12) + '|'
      + changed.map((c) => c.name + ':' + c.to).join(',') + '|+' + added.join(',') + '|-' + removed.join(',')),
  }
}

// ── BOOT — every surface runs FROM uuidnaOS (the captain's order, 2026-08-23) ───────────────────────────────
// Boot means what the seal means (the_os_is_bootable_quantum): the VERIFIED LOADING of the compiled default
// install — never execution. bootOS() verifies the whole image and returns the ground a surface stands on;
// it THROWS on a drifted world, so the MCP refuses to serve, the tests refuse to run, and the fault arrives
// named with the receipt. Verified once per process (~4 ms first boot), O(1) after — the floor costs nothing.
/** Four hexbit widths plus nest and encoder a booted uuidnaOS stands on.
 *  servedQubits is HEXBIT_BITS × HEXBIT_BITS (Hilbert 4×4). nestQubits is HANDLE_HEXBITS + HEXBIT_BITS.
 *  Crypto occupancy is sha256IsFourSixtyfours — four 64s, not four hexbits. Numbers only. */
export interface OsQuantumCapacity {
  messageHexbits: number
  handleHexbits: number
  coinHexbits: number
  uuidHexbits: number
  nestQubits: number
  servedQubits: number
  registerQubits: number
  uuidBits: number
  fuseBits: number
  handleSpan: number
  registerStates: number
  servedStates: number
  shor: ShorCapacityFit
  gpu: GpuCapacity
  stream: {
    cpuWorkers: number
    postage: number
    gpuSeat: 'specified'
    idle: { cpuWorkers: number; gpuWorkers: number; total: number }
    atPostage: { cpuWorkers: number; gpuWorkers: number; total: number }
  }
}

function latticeCapacity(): OsQuantumCapacity {
  const gpu = gpuCapacity()
  const postage = gpu.breakEvenAddresses
  const hilbertQubits = HEXBIT_BITS * HEXBIT_BITS
  const hilbertStates = HEXBIT_STATES ** HEXBIT_BITS
  return {
    messageHexbits: HEXBIT_BITS,
    handleHexbits: HANDLE_HEXBITS,
    coinHexbits: COIN_HEXBITS,
    uuidHexbits: UUID_HEXBITS,
    nestQubits: HANDLE_HEXBITS + HEXBIT_BITS,
    servedQubits: hilbertQubits,
    registerQubits: hilbertQubits,
    uuidBits: UUID_BITS,
    fuseBits: capacityAt(fuseWidth(HANDLE_HEXBITS, COINS)),
    handleSpan: HANDLE_SPAN,
    registerStates: hilbertStates,
    servedStates: hilbertStates,
    shor: shorCapacityFit(),
    gpu,
    stream: {
      cpuWorkers: HANDLE_HEXBITS,
      postage,
      gpuSeat: gpu.seat,
      idle: streamFleet(0),
      atPostage: streamFleet(postage),
    },
  }
}

export interface BootedOS {
  port: InstallPort
  boot: BootImage
  receipt: string
  floor: string
  capacity: OsQuantumCapacity
}
let BOOTED: BootedOS | null = null

/** After the image verifies, the four widths and the library register are the capacity this world stands on. */
export function osQuantumCapacity(): OsQuantumCapacity {
  return bootOS().capacity
}

/** The MCP uuidnaOS payload: integrity layer plus the verified lattice boot, capacity, and stream fleet. */
export interface ServedOS {
  layer: NamedLayer
  floor: string
  receipt: string
  boot: BootImage
  portCount: number
  capacity: OsQuantumCapacity
  firmware: FirmwareUpgrade
}

export function servedOS(): ServedOS {
  const os = bootOS()
  return {
    layer: osLayer(),
    floor: os.floor,
    receipt: os.receipt,
    capacity: os.capacity,
    firmware: upgradeFirmware(),
    boot: os.boot,
    portCount: os.port.count,
  }
}

export function bootOS(): BootedOS {
  if (BOOTED) return BOOTED
  const port = defaultInstalls()
  const { boot } = port
  const faults: string[] = []
  if (boot.states.length !== 32 * (port.count + 1)) faults.push(`image is ${boot.states.length} states, not 32·(${port.count}+1)`)
  if (!boot.states.every((h) => Number.isInteger(h) && h >= 0 && h < 16)) faults.push('an off-lattice state cannot load')
  if (boot.states.slice(-32).join(',') !== compileToHexbits(port.receipt).join(',')) faults.push('the receipt page does not close the image')
  if (faults.length) throw new Error('uuidnaOS REFUSED TO BOOT — the world drifted:\n  ' + faults.join('\n  ') + `\n  port receipt: ${port.receipt}`)
  return (BOOTED = { port, boot, receipt: port.receipt, floor: port.specs[0]!.id, capacity: latticeCapacity() })
}

export { catalogue, catalogueState, cataloguePackage, primeCatalogue, primeCatalogueFrom, CATALOGUE_FILE, CATALOGUE_OVERLAY_FILE, type CataloguePackage, type CatalogueState } from './catalogue.js'
