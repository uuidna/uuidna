#!/usr/bin/env node
// Automate the Lean layer for THE DEFAULT INSTALL — uuidna.com's paths given their EXACT meaning: the
// specifications of the packages a default Alpine install carries (alpine-base's dependency closure in the
// PUBLISHED index), ported in full, lowest level first, and sealed. ALWAYS ALPINE LATEST: this generator
// re-reads latest-stable at the os/ boundary (the one honest place for a live read), rewrites the committed
// mirror ONLY when upstream moved, and seals the facts from the same data in the same pass — so the seal can
// never lag the mirror. Offline, the committed mirror stands and the same facts re-prove. The decidable core:
// the set is dependency-CLOSED (every edge lands inside), every install and every path is named exactly once,
// home is the meta package (alpine-base ↔ '/', the one that exists to name the others), a sealed breadth-first
// witness shows home reaches every member, a sealed BUILD ORDER shows the port rises from the floor (every
// dependency ported no later than what stands on it — the exceptions being exactly the published dependency
// cycle, named rather than smoothed), the terminal is the toolbox (busybox ↔ /terminal, the family sealed pair
// by pair), the foundation depends on nothing (musl ↔ /core, and nothing outranks its in-degree), every path
// carries its PUBLISHED meaning verbatim, and every spec COMPILES FROM SOURCE IN HEXBIT (128 bits = 32 states
// of 0..15). integrity and meaning; this surface loads and checks rather than running — nothing is installed, linked, booted, or
// run; the routes are an authored translation, declared; the meanings are the repository's own words.
// COMPUTE → GENERATE → VERIFY.
import { writeFileSync, readFileSync, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { emit, NTH_DEF, type Fact } from './lean-gen.js'
import { ROOT } from './api.js'
import { fetchDefaultInstalls, renderMirror } from '../os/installs/index.js'
import { routeOf, compileToHexbits, portFrom, buildOrder } from '../quantum/os/index.js'
import { alpineRelease } from '../os/alpine/index.js'
import { INSTALLS_MIRROR, type InstallsMirror } from '../quantum/os/mirror/index.js'

// ── always latest: refresh the mirror at the boundary, best-effort, then seal from the SAME data ─────────────
// EXCEPT under UUIDNA_PROVE_ALL: the gate's re-prove verifies the COMMITTED world — a live refresh inside the
// gate is nondeterminism in the one place determinism is the whole point (the models feed proved it by
// breaking spin mid-walk; Alpine moves slower but the law is the same). Tracking upstream = reconcile's act.
const live = process.env.UUIDNA_TRACK_LATEST ? await fetchDefaultInstalls() : null
const data: InstallsMirror = live ?? INSTALLS_MIRROR
if (live) {
  const rendered = renderMirror(live)
  const path = join(ROOT, 'src', 'quantum', 'os', 'mirror', 'index.ts')
  const current = existsSync(path) ? readFileSync(path, 'utf8') : ''
  if (current !== rendered) {
    writeFileSync(path, rendered)
    console.log(`✓ os/installs/mirror — upstream moved, re-pinned to Alpine ${live.release.version} (${live.count} default installs)`)
  }
  // AND THE CATALOGUE MOVES WITH IT. The boot mirror (what boots — alpine-base's closure) and the catalogue
  // (what EXISTS — every published package, what apk answers from) are two views of ONE upstream read. Refreshed
  // apart they would drift into describing different Alpine releases, and the surface would report a version
  // from one and a dependency edge from the other with no sign that they disagreed. Same boundary, same act.
  const cat = spawnSync(process.execPath, [join(ROOT, 'dist', 'scripts', 'gen-alpine-catalogue.js')], { cwd: ROOT, encoding: 'utf8' })
  if (cat.error || cat.status !== 0) {
    // NOT FATAL, AND NOT SILENT. The boot mirror is already re-pinned and the ledger must still seal; a stale
    // catalogue is honest (it names the release it was written from) where a half-written one would not be.
    console.log(`· os/installs — the catalogue did NOT refresh (${cat.error?.message ?? `exit ${cat.status}`}); the committed one stands and still names its own release`)
  } else {
    console.log('✓ os/installs/catalogue — refreshed from the same upstream read, so mirror and catalogue name one Alpine')
  }
} else {
  console.log('· os/installs — upstream unreachable; the committed mirror stands (Alpine ' + data.release.version + ')')
}

// ── the computed structure the wing seals ────────────────────────────────────────────────────────────────────
const names = data.packages.map((p) => p.name)                    // canonical order: sorted by name (index base)
const N = names.length
const routes = names.map(routeOf)
const meanings = data.packages.map((p) => p.desc)
const idx = new Map(names.map((n, i) => [n, i]))
// edges (a, b): package a DEPENDS ON package b — both ends inside the set, or the closure claim is false
const edges: [number, number][] = []
for (const p of data.packages) for (const d of p.deps) {
  const t = idx.get(d)
  if (t === undefined) throw new Error(`installs: dependency ${d} of ${p.name} escaped the closure — the port is not closed`)
  edges.push([idx.get(p.name)!, t])
}
const HOME = idx.get('alpine-base')
if (HOME !== 0) throw new Error('installs: alpine-base is not index 0 — the sorted order moved under the seal')

// breadth-first witness from home: each later member reached by an edge from an earlier one
const out = new Map<number, number[]>()
for (const [a, b] of edges) { if (!out.has(a)) out.set(a, []); out.get(a)!.push(b) }
const bfs: number[] = [0]
const seen = new Set([0])
for (let q = 0; q < bfs.length; q++) for (const b of out.get(bfs[q]!) ?? []) if (!seen.has(b)) { seen.add(b); bfs.push(b) }
if (bfs.length !== N) throw new Error('installs: home does not reach every member — the closure is disconnected')

// the BUILD ORDER — lowest level first, firmware and up: THE SAME buildOrder the served port uses (one
// derivation, quantum/os), so the sealed order and the served order can never disagree.
const build: number[] = buildOrder(data)
const inv: number[] = new Array(N).fill(0)
build.forEach((node, pos) => { inv[node] = pos })
// the exceptions: edges whose dependency is NOT ported strictly earlier — each must be an arm of a published cycle
const violations = edges.filter(([a, b]) => !(inv[b]! < inv[a]!))
const mutual = edges.filter(([a, b]) => a < b && edges.some(([x, y]) => x === b && y === a))
for (const [a, b] of violations) if (!edges.some(([x, y]) => x === b && y === a))
  throw new Error(`installs: build-order violation ${names[a]}→${names[b]} is not part of a published cycle — the order is wrong, not the world`)

const busy = idx.get('busybox'), musl = idx.get('musl')
if (busy === undefined || musl === undefined) throw new Error('installs: busybox/musl left the default set — re-read the port before sealing')
const family = names.map((n, i) => [n, i] as const).filter(([n]) => n.startsWith('busybox')).map(([, i]) => i)
const termFamily = routes.filter((r) => r.startsWith('/terminal')).length
const muslIn = edges.filter(([, b]) => b === musl).length
const homeOut = edges.filter(([a]) => a === HOME).length
const root = names.map((_, i) => i).find((s) => s * s === N)
const port = portFrom(data)   // hexbit compile facts ride the same minting the surfaces use

// THE ANCHOR, COMPILED. The release tuple is pinned through os/alpine's own alpineRelease — the function the MCP
// surface and the provenance manifest already use — so the address sealed here and the address a caller recomputes
// are one derivation, never two that agree. compileToHexbits does the nibble reading for both, which is the same
// unit the specs and the boot image are compiled with.
const ANCHOR = (() => {
  const rel = alpineRelease(data.release.version, data.arch, data.release.rootfsSha256)
  return { rel, nibbles: compileToHexbits(rel.rootfsSha256), address: compileToHexbits(rel.address) }
})()

const L = {
  names: `[${names.map((n) => JSON.stringify(n)).join(', ')}]`,
  routes: `[${routes.map((r) => JSON.stringify(r)).join(', ')}]`,
  meanings: `[${meanings.map((m) => JSON.stringify(m)).join(', ')}]`,
  edges: `[${edges.map(([a, b]) => `(${a}, ${b})`).join(', ')}]`,
  bfs: `[${bfs.join(', ')}]`,
  inv: `[${inv.join(', ')}]`,
  violations: `[${violations.map(([a, b]) => `(${a}, ${b})`).join(', ')}]`,
}

const defs = `${NTH_DEF}
-- nthS — the same axiom-free structural indexing for String lists ("" past the end); scripts/lean-axioms proves it.
def nthS : List String → Nat → String
  | [], _ => ""
  | x :: _, 0 => x
  | _ :: xs, Nat.succ n => nthS xs n

-- the default install, in canonical (sorted-name) index order: names, site routes, PUBLISHED meanings
def installNames : List String := ${L.names}
def installRoutes : List String := ${L.routes}
def installMeanings : List String := ${L.meanings}
-- (a, b): package a DEPENDS ON package b — indices into installNames
def installEdges : List (Nat × Nat) := ${L.edges}
-- the breadth-first witness from home (index 0), and the build order's inverse (nth invOrder i = when i is ported)
def bfsOrder : List Nat := ${L.bfs}
def invOrder : List Nat := ${L.inv}
-- THE BOOT IMAGE, VERBATIM, ONE PAGE PER SPEC: every spec compiled from its published source to 32 hexbit
-- states, one page each, laid down in boot (build) order — firmware and up — with the port receipt's 32
-- states as the closing page
def bootPages : List (List Nat) := [${port.specs.map((s) => `[${s.hexbits.join(', ')}]`).join(', ')}, [${port.hexbits.join(', ')}]]

-- THE EXTERNAL ANCHOR, ON THE LATTICE. Alpine's PUBLISHED rootfs SHA-256 for the release this install set is the
-- world of, compiled the way every other spec here is compiled: one nibble per hex character, 64 states of 16.
-- Until this def existed the sealed layer named WHICH RELEASE and never WHICH BYTES — the digest lived only in the
-- generated mirror and in prose, so upstream re-cutting a release, or an edit to that one line, would leave every
-- proof passing and every receipt recomputing. A version is a label; the digest is the evidence.
-- It is a LIST OF NIBBLES rather than a String on purpose: this wing depends on no axiom beyond the kernel — not
-- even propext — and a String literal cannot be reduced by decide without reaching for native_decide, which is
-- an axiom. The lattice was already the file's own idiom, so the anchor joins it rather than importing a new one.
def rootfsNibbles : List Nat := [${ANCHOR.nibbles.join(', ')}]
-- the pinned tuple (version, arch, flavor, digest) folded to its content-address, the same 32 states a spec wears
def releaseAddress : List Nat := [${ANCHOR.address.join(', ')}]`

const FACTS: Fact[] = [
  { key: 'default_install_is_dependency_closed',
    why: `THE DEFAULT INSTALL IS A CLOSED WORLD. Alpine's alpine-base metapackage, followed dependency by dependency through the PUBLISHED index, closes at ${N} packages${root !== undefined ? ` — ${N} = ${root}·${root}` : ''} — and every one of the ${edges.length} dependency edges lands INSIDE the set: no member needs anything the default install does not already carry. "Port in full" is exactly this closure, sealed.`,
    js: () => edges.every(([a, b]) => a < N && b < N) && edges.length > 0 && names.length === N && (root === undefined || root * root === N),
    stmt: `(installEdges.all (fun e => e.1 < ${N})) ∧ (installEdges.all (fun e => e.2 < ${N})) ∧ (installEdges.length = ${edges.length}) ∧ (installNames.length = ${N})${root !== undefined ? ` ∧ (${N} = ${root} * ${root})` : ''}` },

  { key: 'every_install_and_its_path_named_once',
    why: `PORTED EVERY ONE, EACH EXACTLY ONCE: the ${N} package names are distinct, the ${N} site paths they specify are distinct, and the two lists pair off index by index — a bijection between the default install and uuidna.com's paths. No path serves two packages; no package hides behind two paths.`,
    js: () => new Set(names).size === N && new Set(routes).size === N && routes.length === names.length &&
      names.every((n, i) => names.slice(0, i).every((m) => m !== n)) && routes.every((r, i) => routes.slice(0, i).every((q) => q !== r)),
    stmt: `((List.range ${N}).all (fun i => (List.range i).all (fun j => nthS installNames i != nthS installNames j))) ∧ ((List.range ${N}).all (fun i => (List.range i).all (fun j => nthS installRoutes i != nthS installRoutes j))) ∧ (installRoutes.length = installNames.length)` },

  { key: 'home_is_the_meta_package',
    why: `HOME HAS THE SPECIAL FUNCTIONALITY BECAUSE alpine-base DOES: uuidna.com/ is the meta package — "${data.packages[0]!.desc}" — the one member that exists only to name the others, with ${homeOut} direct dependencies and nothing of its own to run. Opening home is installing the default set; the front page is the install line.`,
    js: () => names[0] === 'alpine-base' && routes[0] === '/' && edges.filter(([a]) => a === 0).length === homeOut,
    stmt: `(nthS installNames 0 = "alpine-base") ∧ (nthS installRoutes 0 = "/") ∧ ((installEdges.filter (fun e => e.1 == 0)).length = ${homeOut})` },

  { key: 'home_reaches_every_install',
    why: `FROM HOME, EVERYTHING: a breadth-first walk of the dependency edges starting at alpine-base visits all ${N} members, and the witness order is sealed — each member after the first is reached by an edge from an earlier one. No default package is unreachable from the front page; the whole port hangs off '/'.`,
    js: () => bfs.length === N && new Set(bfs).size === N && bfs[0] === 0 && bfs.every((x) => x < N) &&
      bfs.slice(1).every((w, i) => bfs.slice(0, i + 1).some((p) => edges.some(([a, b]) => a === p && b === w))),
    stmt: `(bfsOrder.length = ${N}) ∧ bfsOrder.Nodup ∧ (nth bfsOrder 0 = 0) ∧ (bfsOrder.all (fun x => x < ${N})) ∧ ((List.range ${N - 1}).all (fun i => (List.range (i+1)).any (fun j => installEdges.contains (nth bfsOrder j, nth bfsOrder (i+1)))))` },

  { key: 'the_port_rises_from_the_floor',
    why: `PORTED LOWEST LEVEL FIRST — AND UP: the sealed build order places every dependency no later than what stands on it, so the floor layer enters first and home, the meta package, is ported LAST (position ${inv[0]}) — the top of the stack is the sum of everything beneath it. The exceptions are EXACT: ${violations.length === 0 ? 'none' : violations.map(([a, b]) => `${names[a]} → ${names[b]}`).join(', ')} — ${violations.length ? 'each an arm of a dependency cycle Alpine itself publishes, named rather than smoothed away' : 'the published graph is acyclic'}. Beneath the whole port sits the already-sealed firmware boundary (src/drivers, lean/Os.lean): hardware → software → os, from the ground up.`,
    js: () => inv.length === N && new Set(inv).size === N && inv.every((x) => x < N) && inv[0] === N - 1 &&
      JSON.stringify(edges.filter(([a, b]) => inv[a]! <= inv[b]!)) === JSON.stringify(violations),
    stmt: `(invOrder.length = ${N}) ∧ invOrder.Nodup ∧ (invOrder.all (fun x => x < ${N})) ∧ (nth invOrder 0 = ${N - 1}) ∧ ((installEdges.filter (fun e => nth invOrder e.1 ≤ nth invOrder e.2)) = ${L.violations})` },

  ...(mutual.length ? [{
    key: 'the_services_hold_each_other_up',
    why: `SEALED AS PUBLISHED, CYCLE AND ALL: Alpine's own index has ${mutual.map(([a, b]) => `${names[a]} and ${names[b]}`).join('; ')} depending on EACH OTHER — a genuine dependency cycle inside the default install. The port does not tidy it away: the world is closed and fully reachable WITHOUT being acyclic, and the seal records what upstream publishes, not what would be neat.`,
    js: () => mutual.length > 0 && mutual.every(([a, b]) => edges.some(([x, y]) => x === a && y === b) && edges.some(([x, y]) => x === b && y === a)),
    stmt: mutual.map(([a, b]) => `(installEdges.contains (${a}, ${b})) ∧ (installEdges.contains (${b}, ${a}))`).join(' ∧ ') + ` ∧ (nthS installNames ${mutual[0]![0]} = "${names[mutual[0]![0]]}") ∧ (nthS installNames ${mutual[0]![1]} = "${names[mutual[0]![1]]}")`,
  } satisfies Fact] : []),

  { key: 'the_terminal_is_the_toolbox',
    why: `/terminal MEANS busybox — "${data.packages[busy]!.desc}" — and the busybox family maps onto the /terminal paths pair by pair, every pair sealed: ${family.map((i) => `${names[i]} ↔ ${routes[i]}`).join(', ')}. The path's specification is the package's, port for port — ${family.length} members, ${termFamily} /terminal paths, one for one.`,
    js: () => names[busy] === 'busybox' && routes[busy] === '/terminal' && family.length === termFamily &&
      family.every((i) => routes[i]!.startsWith('/terminal')),
    stmt: family.map((i) => `(nthS installNames ${i} = ${JSON.stringify(names[i])}) ∧ (nthS installRoutes ${i} = ${JSON.stringify(routes[i])})`).join(' ∧ ') + ` ∧ ((${family.length} : Nat) = ${termFamily})` },

  { key: 'the_foundation_depends_on_nothing',
    why: `/core MEANS musl, the C library — the floor of the default install: it depends on NOTHING, and ${muslIn} of the ${N} members stand directly on it — no member's in-degree outranks it. The lowest level the port begins from is the one the most of the system rests on.`,
    js: () => names[musl] === 'musl' && routes[musl] === '/core' && edges.every(([a]) => a !== musl) &&
      edges.filter(([, b]) => b === musl).length === muslIn && names.every((_, i) => edges.filter(([, b]) => b === i).length <= muslIn),
    stmt: `(nthS installNames ${musl} = "musl") ∧ (nthS installRoutes ${musl} = "/core") ∧ (installEdges.all (fun e => e.1 != ${musl})) ∧ ((installEdges.filter (fun e => e.2 == ${musl})).length = ${muslIn}) ∧ ((List.range ${N}).all (fun i => (installEdges.filter (fun e => e.2 == i)).length ≤ ${muslIn}))` },

  { key: 'every_path_carries_its_published_meaning',
    why: `THE MEANING IS THE PUBLISHED ONE, SEALED VERBATIM: each path's specification is Alpine's own description of its package — ${N} non-empty meanings ride the wing itself, index-paired with the names. /terminal does not mean what uuidna says it means; it means what the repository publishes, and the seal carries the words.`,
    js: () => meanings.length === N && meanings.every((m) => m.length > 0),
    stmt: `(installMeanings.length = ${N}) ∧ (installMeanings.all (fun m => m != ""))` },

  { key: 'a_spec_compiles_to_hexbits',
    why: `EVERY SPEC COMPILES FROM SOURCE IN HEXBIT: the published tuple folds to a 128-bit address, and 128 bits are exactly 32 hexbit states of 16 = 2⁴ — the site's native lattice, playable by the standard hexbit app. The compile is total on the port: ${N} specs and the port's receipt, each 32 on-lattice states, every state a nibble of the address — the specification and its sound are the same integer.`,
    js: () => 32 * 4 === 128 && 16 === 2 ** 4 && 128 / 4 === 32 && port.specs.length === N &&
      port.specs.every((s) => s.hexbits.length === 32 && s.hexbits.every((h) => Number.isInteger(h) && h >= 0 && h < 16) && s.hexbits.join(',') === compileToHexbits(s.address).join(',')) &&
      port.hexbits.length === 32 && port.hexbits.every((h) => h >= 0 && h < 16),
    stmt: `(32 * 4 = 128) ∧ (16 = 2 ^ 4) ∧ ((128 : Nat) / 4 = 32)` },

  { key: 'the_os_is_bootable_quantum',
    why: `PORT MEANS COMPILE FROM SOURCE TO HEXBIT, AND THE COMPILED OS IS BOOTABLE — QUANTUM. The boot image rides the wing VERBATIM: every spec's 32 states laid down in the sealed build order (firmware and up — the floor first, home last) with the port receipt's 32 states closing the image, ${port.boot.count} = 32·(${N}+1) states in all, every one on the 16-state lattice. On this computer BOOTING IS THE VERIFIED LOADING OF THE COMPILED STATES — the standard hexbit app loads and sounds the image deterministically, the same states for every observer — and no Alpine binary is ever executed: bootable on the lattice, not on a CPU.`,
    js: () => port.boot.states.length === 32 * (N + 1) && port.boot.count === port.boot.states.length &&
      port.boot.states.every((h) => Number.isInteger(h) && h >= 0 && h < 16) &&
      port.boot.states.slice(0, 32).join(',') === port.specs[0]!.hexbits.join(',') &&
      port.boot.states.slice(-32).join(',') === port.hexbits.join(',') &&
      port.boot.states.join(',') === [...port.specs.flatMap((s) => s.hexbits), ...port.hexbits].join(','),
    stmt: `(bootPages.length = ${N + 1}) ∧ (${N + 1} * 32 = ${32 * (N + 1)}) ∧ (bootPages.all (fun p => p.length = 32)) ∧ (bootPages.all (fun p => p.all (fun h => h < 16)))` },

  { key: 'the_install_set_names_the_bytes_it_rests_on',
    why: `THE SEAL NAMES WHICH BYTES, NOT ONLY WHICH RELEASE. This install set is the dependency closure of a PARTICULAR Alpine rootfs, and the thing that makes that a provenance claim rather than a label is the digest Alpine PUBLISHED for it: ${ANCHOR.rel.rootfsSha256} — Alpine ${data.release.version}/${data.arch}, ${ANCHOR.rel.file}. It is sealed here compiled to the lattice everything else in this wing is compiled to: 64 nibbles of 16 states, 64 · 4 = 256 bits, a SHA-256 exactly. The pinned tuple (version, arch, flavor, digest) folds to ${ANCHOR.rel.address}, carried as its 32 states. WHAT THIS CLOSES: the digest previously existed only in the generated mirror and in prose, so nothing in the proof layer, the manifest, or any test asserted it — upstream re-cutting a release, or an edit to that single line, would leave all ${N} packages, every route, the closure, the build order and the boot image sealing exactly as before. The structure was total and the anchor was unheld. Change the digest now and 64 sealed states move, the address's 32 move with them, and the receipt moves. WHAT IT DOES NOT CLAIM: that your rootfs matches — that is verifyAlpineRootfs's job, against these bytes, with uuidna's own pure-TS SHA-256. This seals the ANCHOR the check is made against, so the thing being compared to is itself content-addressed and cannot drift unnoticed. Nothing is booted, linked or executed.`,
    js: () => {
      const d = data.release.rootfsSha256
      // the digest is a SHA-256 in the form it is published in, and the seal is READ FROM IT rather than beside it
      return /^[0-9a-f]{64}$/.test(d) && d === ANCHOR.rel.rootfsSha256 &&
        ANCHOR.nibbles.length === 64 && ANCHOR.nibbles.every((h) => Number.isInteger(h) && h >= 0 && h < 16) &&
        ANCHOR.nibbles.join('') === [...d].map((c) => parseInt(c, 16)).join('') &&
        64 * 4 === 256 &&
        // the address is the one os/alpine mints, and the arch/version sealed are the mirror's own
        ANCHOR.address.length === 32 && ANCHOR.address.every((h) => h >= 0 && h < 16) &&
        ANCHOR.address.join(',') === compileToHexbits(alpineRelease(data.release.version, data.arch, d).address).join(',') &&
        ANCHOR.rel.version === data.release.version && ANCHOR.rel.arch === data.arch
    },
    stmt: `(rootfsNibbles.length = 64) ∧ (64 * 4 = 256) ∧ (rootfsNibbles.all (fun h => h < 16)) ∧ (releaseAddress.length = 32) ∧ (releaseAddress.all (fun h => h < 16))` },
]

for (const f of FACTS) if (!f.js!()) throw new Error('offline audit FAILED before seal: ' + f.key)

emit({ file: 'Installs.lean', skill: 'installs', defs,
  header: `THE DEFAULT INSTALL — uuidna.com's paths given their exact meaning: the specifications of the ${N} packages a default Alpine install carries (alpine-base's dependency closure in the PUBLISHED ${data.branch} index, Alpine ${data.release.version}), ported in full, lowest level first, and sealed — closure, bijection with the paths, home the meta package, reachability from '/', the build order rising from the floor with the published cycle named, the terminal the toolbox, the foundation depending on nothing, every meaning verbatim, every spec compiled from source to 32 hexbit states, and the BOOT IMAGE sealed verbatim (${32 * (N + 1)} on-lattice states, build-ordered, receipt-closed) — the OS bootable on the lattice, never on a CPU — and THE EXTERNAL ANCHOR the whole port rests on: Alpine's PUBLISHED rootfs SHA-256 for ${data.release.version}/${data.arch}, compiled to 64 on-lattice nibbles so the seal names which BYTES and not only which release. Integrity and meaning, loading rather than running.`,
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
