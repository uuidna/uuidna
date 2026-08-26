// quantum/os/catalogue — ALL OF ALPINE, queryable, offline.
//
// The install port compiles what BOOTS: alpine-base's closure, 25 packages, 32 hexbit states each, sealed in
// lean/Installs.lean and bundled everywhere. This module carries what EXISTS: every package Alpine publishes on
// the pinned branch — 28,639 on latest-stable/x86_64 — so `apk search nodejs` can answer with a version and a
// published checksum instead of "no ported package matches".
//
// THE DISTINCTION THE OLD SURFACE COULD NOT MAKE, and the reason this file exists. `apk search` filtered the 25
// boot packages and, finding nothing, said "(no ported package matches "nodejs")". Read plainly that is a claim
// about UUIDNA'S PORT; read the way a caller actually reads it, it is a claim about ALPINE — and the caller is
// developing a project and deciding what to rest it on. INSTALLED, AVAILABLE and ABSENT are three different
// facts and two of them were one string. Real apk has always drawn this line (`apk list` vs `apk list -a`).
//
// LOADED LAZILY, THROUGH THE RUNTIME'S OWN REGISTRY, for the mcp.ts:38 reason: a top-level `node:fs` import
// rides every bundle that reaches this module and the edge worker has no filesystem. Where the file cannot be
// read the catalogue is ABSENT — and absent is reported as absent, never as a miss. A surface that answers
// "no such package" because it could not open its own index is the exact defect this module was written to end.
//
// Data, never execution: a row names upstream's bytes (its published checksum) and upstream's words (its
// published description). Nothing is installed, linked, unpacked or run — theorem the_os_is_bootable_quantum.
//
// COMPILE IS REAL, NOT A LABEL. The self-test's fourth check used to return `ok: true` with the words
// "32 hexbit states" and never call the unit — so AVAILABLE packages answered from the catalogue without an
// address or hexbits while claiming the same compile the boot closure actually performs. The mint is the same
// `uuidnaPackage` the install port uses; the states are `compileToHexbits` from src/hexbit. If it is named a
// hexbit, the unit computed it.
import { uuidnaPackage } from '../../os/packages/index.js'
import { compileToHexbits, UUID_HEXBITS } from '../../hexbit/index.js'
import { INSTALLS_MIRROR } from './mirror.js'

/** where the committed catalogue lives, repo-relative — one declaration, read by the generator and the reader */
export const CATALOGUE_FILE = 'mirror/alpine-catalogue.tsv'
/** npm/curl-ported apps outside APKINDEX — merged at read time; NOT Alpine distro (repo = overlay). */
export const CATALOGUE_OVERLAY_FILE = 'mirror/alpine-overlay.tsv'
/** Repo tag for overlay rows — distinct from Alpine main/community. */
export const OVERLAY_REPO = 'overlay' as const
export const ALPINE_DISTRO_REPOS = ['main', 'community'] as const

export function isAlpineDistroPackage(p: CataloguePackage): boolean {
  return p.repo === 'main' || p.repo === 'community'
}

export function isOverlayPackage(p: CataloguePackage): boolean {
  return p.repo === OVERLAY_REPO
}
/** the TSV columns, in order — the generator writes these and the parser reads them by position */
export const CATALOGUE_COLUMNS = ['repo', 'name', 'version', 'checksum', 'desc', 'deps', 'provides'] as const

export interface CataloguePackage {
  repo: string          // 'main' | 'community' — which Alpine repository publishes it
  name: string
  version: string
  checksum: string      // upstream's PUBLISHED checksum — the provenance, not a recomputation
  desc: string          // upstream's PUBLISHED one-line description
  deps: string[]        // published dependencies, including the so:/cmd:/pc: provider forms
  provides: string[]    // what it PROVIDES — the other half of the edge, without which a dep cannot be resolved
}

/** What the catalogue knows about itself. `present:false` is a fact about THIS HOST — never about Alpine. */
export interface CatalogueState {
  present: boolean
  count: number
  why: string | null    // when absent: why, so a caller can tell a missing file from an unreadable one
}

const fsm = (): typeof import('node:fs') | null => {
  const p = globalThis as { process?: { getBuiltinModule?: (id: string) => unknown } }
  if (typeof p.process?.getBuiltinModule !== 'function') return null   // the edge: no filesystem, by construction
  try { return p.process.getBuiltinModule('node:fs') as typeof import('node:fs') } catch { return null }
}

let LOADED: CataloguePackage[] | null = null
let STATE: CatalogueState | null = null

// ── IT MUST RUN IN THE BROWSER TOO (the captain's order, 2026-08-25: "all executes in uuidnaOS in browser").
//
// The first cut read the catalogue through `node:fs` and, finding no filesystem, reported ABSENT. That is honest
// on a runtime that genuinely cannot reach it — but it made the BROWSER, where uuidnaOS is meant to run, a
// permanently crippled host: `apk search nodejs` in a visitor's tab would have answered "the catalogue is absent
// here". Correct, useless, and a self-inflicted ceiling.
//
// A browser CAN reach it; it just cannot reach it SYNCHRONOUSLY. So the load is split from the use: prime once
// with the bytes (fetched, bundled, injected — the source is the caller's business), and every accessor stays
// synchronous and pure afterwards. uuidnaExec is sync by design and stays sync; the OS does not become async
// because one of its hosts has a different way of opening a file.
//
// Node still self-primes from the filesystem on first touch, so nothing host-side changes.

/** Prime the catalogue from raw TSV — the ONE door for a host that cannot read a file synchronously.
 *  Idempotent and explicit: calling it twice with the same bytes is the same world. */
export function primeCatalogue(text: string): CatalogueState {
  const packages = parseCatalogue(text)
  LOADED = packages
  UNIVERSE = null                                        // the dependency universe is derived — it must re-derive
  STATE = packages.length
    ? { present: true, count: packages.length, why: null }
    : { present: false, count: 0, why: 'primed with text that parsed to zero packages — a shape drift, not an empty Alpine' }
  return STATE
}

/** Fetch and prime, for the browser and any other fetch-capable host. The URL is the caller's — the site serves
 *  the same committed bytes the repo holds, so a visitor's tab and a local script read one catalogue.
 *  Returns the state rather than throwing: an unreachable catalogue is a fact to REPORT, not a crash. */
export async function primeCatalogueFrom(url: string): Promise<CatalogueState> {
  // CACHE STORAGE FIRST, so an INSTALLED uuidnaOS is whole offline. The service worker precaches the catalogue at
  // install but deliberately never intercepts asset fetches (a rejecting respondWith once bricked the page), so
  // the read happens HERE rather than in the worker. The catalogue is a committed constant pinned to one Alpine
  // release — cache-first is not staleness, it is the correct answer arriving without a network.
  try {
    const cs = (globalThis as { caches?: CacheStorage }).caches
    if (cs) {
      const hit = await cs.match(url)
      if (hit?.ok) return primeCatalogue(await hit.text())
    }
  } catch { /* no Cache Storage, or it refused — the network is the next honest try, not a failure */ }
  try {
    const res = await fetch(url)
    if (!res.ok) {
      STATE = { present: false, count: 0, why: `catalogue fetch ${url} answered HTTP ${res.status}` }
      LOADED = []
      return STATE
    }
    return primeCatalogue(await res.text())
  } catch (e) {
    LOADED = []
    STATE = { present: false, count: 0, why: `catalogue fetch ${url} failed (${e instanceof Error ? e.message : String(e)}) — offline and not cached` }
    return STATE
  }
}

/** has the catalogue been primed or loaded yet — so a browser boot can ask before it spends a fetch */
export const cataloguePrimed = (): boolean => LOADED !== null

/** parse the committed TSV. Comment lines carry the provenance header and are not packages. */
export const parseCatalogue = (text: string): CataloguePackage[] => {
  const out: CataloguePackage[] = []
  for (const line of text.split('\n')) {
    if (!line || line.charCodeAt(0) === 35) continue                   // '#' — the header, not a row
    const c = line.split('\t')
    if (c.length < 6 || !c[1]) continue
    out.push({ repo: c[0]!, name: c[1]!, version: c[2]!, checksum: c[3]!, desc: c[4]!, deps: c[5]!.split(' ').filter(Boolean), provides: (c[6] ?? '').split(' ').filter(Boolean) })
  }
  return out
}

const sortCatalogue = (packages: CataloguePackage[]): CataloguePackage[] =>
  [...packages].sort((a, b) => (a.repo === b.repo ? (a.name < b.name ? -1 : a.name > b.name ? 1 : 0) : a.repo < b.repo ? -1 : 1))

/** merge overlay rows into the APKINDEX census — overlay wins on name collision. */
export function mergeCataloguePackages(base: CataloguePackage[], overlay: CataloguePackage[]): CataloguePackage[] {
  const byName = new Map<string, CataloguePackage>()
  for (const p of base) byName.set(p.name, p)
  for (const p of overlay) byName.set(p.name, p)
  return sortCatalogue([...byName.values()])
}

/** serialize package rows for TSV (no header). */
export function catalogueTsvBody(packages: CataloguePackage[]): string {
  return packages.map((p) =>
    [p.repo, p.name, p.version, p.checksum, p.desc, p.deps.join(' '), p.provides.join(' ')].join('\t')).join('\n')
}

function readOverlayPackages(fs: typeof import('node:fs')): CataloguePackage[] {
  try {
    const url = new URL('../../../' + CATALOGUE_OVERLAY_FILE, import.meta.url)
    return parseCatalogue(fs.readFileSync(url, 'utf8'))
  } catch {
    return []
  }
}

/** Load once, cache forever. The catalogue is a committed constant: it cannot change under a running process. */
function load(): { packages: CataloguePackage[]; state: CatalogueState } {
  if (LOADED && STATE) return { packages: LOADED, state: STATE }
  const fs = fsm()
  if (!fs) {
    LOADED = []
    // NOT a verdict about Alpine, and no longer a dead end: this runtime cannot open a file synchronously, so it
    // must be PRIMED. The message names the door rather than just the wall.
    STATE = { present: false, count: 0, why: 'not primed on this runtime (no synchronous filesystem) — call primeCatalogueFrom(url) at boot, e.g. in the browser' }
    return { packages: LOADED, state: STATE }
  }
  try {
    // resolved from this module rather than from cwd: a script run from anywhere must find the same file
    const url = new URL('../../../' + CATALOGUE_FILE, import.meta.url)
    const text = fs.readFileSync(url, 'utf8')
    const base = parseCatalogue(text)
    const overlay = readOverlayPackages(fs)
    LOADED = overlay.length ? mergeCataloguePackages(base, overlay) : base
    STATE = { present: LOADED.length > 0, count: LOADED.length, why: LOADED.length ? null : 'the catalogue file parsed to zero packages' }
  } catch (e) {
    LOADED = []
    STATE = { present: false, count: 0, why: `${CATALOGUE_FILE} could not be read (${e instanceof Error ? e.message : String(e)}) — run \`node dist/scripts/gen-alpine-catalogue.js\`` }
  }
  return { packages: LOADED, state: STATE }
}

/** the catalogue's own state — asked BEFORE any answer, so "absent" never renders as "not found" */
export const catalogueState = (): CatalogueState => load().state
/** every catalogued package (empty when absent — always pair with catalogueState) */
export const catalogue = (): readonly CataloguePackage[] => load().packages

/** one package by exact name, or null. null means "not in the catalogue" ONLY when the catalogue is present. */
export const cataloguePackage = (name: string): CataloguePackage | null =>
  load().packages.find((p) => p.name === name) ?? null

/** search name and published description, name matches first, then alphabetical — bounded, so a one-letter
 *  query cannot return 28,639 lines into a caller's context. `total` is the true count before the cap. */
export const catalogueSearch = (query: string, limit = 40): { hits: CataloguePackage[]; total: number } => {
  const q = query.toLowerCase()
  if (!q) return { hits: [], total: 0 }
  const all = load().packages.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
  all.sort((a, b) => {
    const an = a.name.toLowerCase() === q ? 0 : a.name.toLowerCase().startsWith(q) ? 1 : 2
    const bn = b.name.toLowerCase() === q ? 0 : b.name.toLowerCase().startsWith(q) ? 1 : 2
    return an !== bn ? an - bn : a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  })
  return { hits: all.slice(0, limit), total: all.length }
}

/** who depends on `name` — the reverse edge, over the WHOLE published graph rather than over the 25 that boot */
export const catalogueRdepends = (name: string, limit = 40): { hits: string[]; total: number } => {
  const bare = (d: string): string => d.split(/[<>=~]/)[0]!
  const all = load().packages.filter((p) => p.deps.some((d) => bare(d) === name)).map((p) => p.name).sort()
  return { hits: all.slice(0, limit), total: all.length }
}

// ── EACH PACKAGE TESTS ITSELF (the captain's order, 2026-08-25: "let each package test itself") ───────────────
//
// A ported package cannot be tested by RUNNING it — uuidnaOS executes nothing (theorem the_os_is_bootable_quantum)
// — so the question is what a package can honestly assert about ITSELF from its own published record. Four things
// can, and each can FAIL, which is the whole requirement (the falsifiability law: an audit that cannot say no is
// not an audit):
//
//   IDENTITY   its name and version are well-formed Alpine identifiers — a row that lost a column fails here
//   PROVENANCE its checksum is a real Q1-prefixed base64 SHA-1 that decodes to exactly 20 bytes. This is the one
//              that makes the port a PORT: the row names upstream's bytes, and a malformed digest names nothing.
//   CLOSURE    every dependency it declares RESOLVES — to a package name, or to a `so:`/`cmd:`/`pc:` token some
//              package in the catalogue actually PROVIDES. This is the test the 25-package port could never run:
//              at 0.087% coverage almost every dependency pointed outside the world and "unresolved" was the
//              normal case. It only becomes a real verdict once the world is complete.
//   COMPILE    it compiles to exactly 32 hexbit states (128 bits), the unit every ported thing is measured in.
//
// WHAT A PASS DOES NOT MEAN, stated because it is the tempting overclaim: that the package works, is safe, or
// installs. It means its published record is internally coherent and its edges land inside the ported world.
// Integrity, not truth (theorem provenance_integrity_not_content_truth).

export type CheckName = 'identity' | 'provenance' | 'closure' | 'compile'
export interface PackageCheck { check: CheckName; ok: boolean; detail: string }
export interface PackageTest { name: string; version: string; ok: boolean; checks: PackageCheck[]; unresolved: string[] }

/** the dependency universe: every package name, plus every token any package PROVIDES. Built once — the closure
 *  check is O(deps) per package against it rather than O(28,639) per dependency. */
let UNIVERSE: Set<string> | null = null
const universe = (): Set<string> => {
  if (UNIVERSE) return UNIVERSE
  const u = new Set<string>()
  for (const p of load().packages) {
    u.add(p.name)
    for (const pv of p.provides) u.add(pv.split('=')[0]!)
  }
  return (UNIVERSE = u)
}

/** the bare token of a dependency: `so:libc.so.6=1.0` → `so:libc.so.6`, `busybox>1.36` → `busybox` */
const bareDep = (d: string): string => d.split('=')[0]!.split(/[<>~]/)[0]!

/** Q1<base64 sha1> — apk's published digest form. It must DECODE, and to exactly 20 bytes. */
const checksumOk = (c: string): boolean => {
  if (!c.startsWith('Q1')) return false
  const b64 = c.slice(2)
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(b64)) return false
  try { return atob(b64).length === 20 } catch { return false }
}

/** catalogueCompile(pkg) → the same mint+compile the boot port uses: published tuple → 128-bit address →
 *  UUID_HEXBITS states on the lattice. Arch and branch are the pinned mirror's; repo is the package's own
 *  (main | community), so a community package does not pretend to live in main. */
export function catalogueCompile(p: CataloguePackage): { id: string; address: string; hexbits: number[] } {
  const minted = uuidnaPackage({
    name: p.name, version: p.version, checksum: p.checksum, repo: p.repo,
    arch: INSTALLS_MIRROR.arch, branch: INSTALLS_MIRROR.branch,
  })
  return { id: minted.id, address: minted.address, hexbits: compileToHexbits(minted.address) }
}

/** packageSelfTest(pkg) → the package's own verdict on its own record. Pure, total, and able to fail. */
export function packageSelfTest(p: CataloguePackage): PackageTest {
  const u = universe()
  const unresolved = p.deps.filter((d) => !d.startsWith('!') && !u.has(bareDep(d)))
  const compiled = catalogueCompile(p)
  const compileOk = compiled.hexbits.length === UUID_HEXBITS
    && compiled.hexbits.every((h) => Number.isInteger(h) && h >= 0 && h < 16)
  const checks: PackageCheck[] = [
    { check: 'identity', ok: /^[A-Za-z0-9._+-]+$/.test(p.name) && /^\d/.test(p.version),
      detail: `${p.name}-${p.version}` },
    { check: 'provenance', ok: checksumOk(p.checksum),
      detail: p.checksum ? `${p.checksum.slice(0, 12)}… decodes to 20 bytes` : '(no published checksum)' },
    { check: 'closure', ok: unresolved.length === 0,
      detail: unresolved.length ? `${unresolved.length} of ${p.deps.length} deps resolve to nothing: ${unresolved.slice(0, 3).join(' ')}` : `${p.deps.length} deps all resolve` },
    { check: 'compile', ok: compileOk,
      detail: compileOk
        ? `${UUID_HEXBITS} hexbit states (128 bits) · ${compiled.address}`
        : `compile produced ${compiled.hexbits.length} states, not ${UUID_HEXBITS}` },
  ]
  return { name: p.name, version: p.version, ok: checks.every((c) => c.ok), checks, unresolved }
}

/** hexbitPortCoverage(repo?) → how many catalogued packages COMPILE to UUID_HEXBITS on-lattice states.
 *
 *  THE METER THE CLAIM NEEDS. "Ported in hexbits" is the compile check alone — a package whose dependency
 *  closure is incomplete is still a hexbit-ported provenance identity; closure is a different ledger (and is
 *  already counted by packageSelfTest). Absent catalogue → total 0, never a silent 100%.
 *
 *  Measured on the committed mirror (2026-08-26): community 22,678/22,678 · main 5,961/5,961 · all 28,639 —
 *  every published row on the pinned branch folds to 32 states via the same mint the boot port uses. */
export interface HexbitPortCoverage {
  repo: 'main' | 'community' | 'all' | typeof OVERLAY_REPO
  total: number
  ported: number
  missing: string[]   // names that failed compile, capped so a regression names the gap without dumping 28k
}
export function hexbitPortCoverage(repo?: 'main' | 'community' | typeof OVERLAY_REPO | 'all'): HexbitPortCoverage {
  const { packages, state } = load()
  const tag: HexbitPortCoverage['repo'] = repo === OVERLAY_REPO ? OVERLAY_REPO : (repo ?? 'all')
  if (!state.present) return { repo: tag, total: 0, ported: 0, missing: [] }
  const list = repo === OVERLAY_REPO
    ? packages.filter(isOverlayPackage)
    : repo === 'main' || repo === 'community'
      ? packages.filter((p) => p.repo === repo)
      : packages.filter(isAlpineDistroPackage)
  let ported = 0
  const missing: string[] = []
  for (const p of list) {
    const c = catalogueCompile(p)
    const ok = c.hexbits.length === UUID_HEXBITS
      && c.hexbits.every((h) => Number.isInteger(h) && h >= 0 && h < 16)
    if (ok) ported++
    else if (missing.length < 25) missing.push(p.name)
  }
  return { repo: tag, total: list.length, ported, missing }
}

/** Alpine publishes documentation as SEPARATE packages — almost always `<name>-doc`, sometimes
 *  `<name>-man-pages`, plus the system corpora `man-pages` / `man-pages-posix`. That is the man-page port:
 *  the published documentation packages, compiled to hexbits like every other catalogue row. The manpage
 *  BYTES are never held here (theorem the_os_is_bootable_quantum); what is ported is the provenance identity. */
export const isManPagePackage = (p: CataloguePackage | { name: string; desc?: string }): boolean => {
  const n = p.name
  if (n === 'man-pages' || n === 'man-pages-posix') return true
  if (n.endsWith('-doc') || n.endsWith('-man-pages')) return true
  return false
}

/** manPagePackages(repo?) → documentation packages. Default = Alpine distro only (main+community);
 *  pass OVERLAY_REPO for npm/curl overlay ports — excluded from man→app completeness. */
export function manPagePackages(repo?: 'main' | 'community' | typeof OVERLAY_REPO): CataloguePackage[] {
  const { packages, state } = load()
  if (!state.present) return []
  let list = packages.filter(isManPagePackage)
  if (repo) list = list.filter((p) => p.repo === repo)
  else list = list.filter(isAlpineDistroPackage)
  return list
}

/** resolveManPage(name) → the documentation package for a tool or for a doc package itself.
 *  Order: exact match if already a man package → `<name>-doc` → `<name>-man-pages` → null.
 *  Returns null when Alpine publishes no documentation package for that name — a fact about upstream,
 *  never about a failed read. */
export function resolveManPage(name: string): CataloguePackage | null {
  const q = String(name ?? '').trim()
  if (!q) return null
  const hit = cataloguePackage(q)
  if (hit && isManPagePackage(hit)) return hit
  return cataloguePackage(q + '-doc') ?? cataloguePackage(q + '-man-pages')
}

/** manPagePortCoverage(repo?) → hexbit-port meter over documentation packages alone.
 *  Same predicates as hexbitPortCoverage; a separate denominator so a regression in the man surface is named. */
export function manPagePortCoverage(repo?: 'main' | 'community'): HexbitPortCoverage {
  const list = manPagePackages(repo)
  const tag: HexbitPortCoverage['repo'] = repo ?? 'all'
  let ported = 0
  const missing: string[] = []
  for (const p of list) {
    const c = catalogueCompile(p)
    const ok = c.hexbits.length === UUID_HEXBITS
      && c.hexbits.every((h) => Number.isInteger(h) && h >= 0 && h < 16)
    if (ok) ported++
    else if (missing.length < 25) missing.push(p.name)
  }
  return { repo: tag, total: list.length, ported, missing }
}

// ── MAN PAGES TESTING THE APPS → HEXBITS (the captain's order: this IS 100% port completeness) ───────────────
//
// Package-count compile coverage (hexbitPortCoverage / manPagePortCoverage) is PROVENANCE — every published row
// folds to 32 states. It is NOT the completeness witness. Completeness is: for each documentation package,
// resolve the APP it documents, prove BOTH compile to on-lattice hexbits, and fold the triad. Man pages test
// apps; hexbits seal the proof. TypeScript computes; VitePress monitors.
//
// Gaps are NAMED, never padded. A -doc row whose documented origin Alpine never published as a package fails
// the witness — that is a fact about the catalogue, not a licence to claim 100%.

/** How the documented app was resolved from a man-page package. */
export type ManAppVia = 'corpus' | 'origin' | 'gtk-doc' | 'libs' | 'dev' | 'provides' | 'self'

export interface ManAppResolution {
  man: CataloguePackage
  app: CataloguePackage
  via: ManAppVia
}

/** Candidate origins a documentation package may document, most-specific first.
 *  `-gtk-doc` is Alpine's gtk-doc API-docs split (documents the library, not a fictional `*-gtk` package). */
export function manAppOriginCandidates(manName: string): string[] {
  const n = String(manName ?? '').trim()
  if (!n) return []
  if (n === 'man-pages' || n === 'man-pages-posix') return [n]
  const out: string[] = []
  const add = (o: string): void => { if (o && o !== n && !out.includes(o)) out.push(o) }
  if (n.endsWith('-man-pages')) add(n.slice(0, -'-man-pages'.length))
  if (n.endsWith('-gtk-doc')) add(n.slice(0, -'-gtk-doc'.length))
  if (n.endsWith('-doc')) add(n.slice(0, -'-doc'.length))
  return out
}

const hexbitsOk = (p: CataloguePackage): boolean => {
  const c = catalogueCompile(p)
  return c.hexbits.length === UUID_HEXBITS
    && c.hexbits.every((h) => Number.isInteger(h) && h >= 0 && h < 16)
}

/** resolveManApp(man) → the catalogued app that man pages test, or null when Alpine published docs for nothing
 *  in this catalogue. Corpora and provide-bearing `*-doc` tools (e.g. gtk-doc) resolve to themselves. */
export function resolveManApp(man: CataloguePackage | string): ManAppResolution | null {
  const pkg = typeof man === 'string' ? cataloguePackage(man) : man
  if (!pkg || !isManPagePackage(pkg)) return null
  if (pkg.name === 'man-pages' || pkg.name === 'man-pages-posix')
    return { man: pkg, app: pkg, via: 'corpus' }

  for (const origin of manAppOriginCandidates(pkg.name)) {
    const hit = cataloguePackage(origin)
    if (hit) {
      const via: ManAppVia = pkg.name.endsWith('-gtk-doc') && origin === pkg.name.slice(0, -'-gtk-doc'.length)
        ? 'gtk-doc' : 'origin'
      return { man: pkg, app: hit, via }
    }
    const libs = cataloguePackage(origin + '-libs')
    if (libs) return { man: pkg, app: libs, via: 'libs' }
    const dev = cataloguePackage(origin + '-dev')
    if (dev) return { man: pkg, app: dev, via: 'dev' }
    // PROVIDES — bare tokens OR Alpine's cmd:/pc: forms under this origin name.
    // `dotnet-doc` documents `cmd:dotnet` published by `dotnet-host` (no package named `dotnet`).
    // Matching only the bare token left byVia.provides at 0 and orphaned three real apps.
    const providers = load().packages
      .filter((p) => p.provides.some((pv) => {
        const token = pv.split('=')[0]!
        return token === origin || token === `cmd:${origin}` || token === `pc:${origin}`
      }))
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    if (providers[0]) return { man: pkg, app: providers[0], via: 'provides' }
  }

  // SELF — a published package that ends in -doc but IS the app (gtk-doc the tool; annotated-doc the library).
  // Only when it PROVIDES something: empty provides means docs-only with no subject in this catalogue.
  if (pkg.provides.length > 0) return { man: pkg, app: pkg, via: 'self' }
  return null
}

/** One man→app→hexbit witness. `ok` means man pages tested an app and both fold to UUID_HEXBITS states. */
export interface ManAppWitness {
  man: string
  app: string | null
  via: ManAppVia | null
  manHexbits: boolean
  appHexbits: boolean
  ok: boolean
  detail: string
}

export function manAppWitness(man: CataloguePackage): ManAppWitness {
  const manOk = hexbitsOk(man)
  const resolved = resolveManApp(man)
  if (!resolved) {
    return {
      man: man.name, app: null, via: null, manHexbits: manOk, appHexbits: false, ok: false,
      detail: manOk
        ? `${man.name} compiles but documents no catalogued app — an orphan documentation package`
        : `${man.name} fails hexbit compile and documents no catalogued app`,
    }
  }
  const appOk = hexbitsOk(resolved.app)
  const ok = manOk && appOk
  return {
    man: man.name,
    app: resolved.app.name,
    via: resolved.via,
    manHexbits: manOk,
    appHexbits: appOk,
    ok,
    detail: ok
      ? `man ${man.name} → app ${resolved.app.name} (${resolved.via}) · both ${UUID_HEXBITS} hexbits`
      : `man ${man.name} → app ${resolved.app.name} (${resolved.via}) · manHexbits=${manOk} appHexbits=${appOk}`,
  }
}

/** manDrivenPortCoverage — THE port-completeness meter: man pages testing apps, folded into hexbits.
 *  Denominator = documentation packages. Numerator = witnesses that pass. Package-count compile % is a different
 *  ledger (provenance); do not read that as this. Absent catalogue → total 0. */
export interface ManDrivenPortCoverage {
  definition: 'man→app→hexbit'
  total: number
  witnessed: number
  missing: string[]
  gaps: { man: string; why: string }[]
  byVia: Record<ManAppVia, number>
}
export function manDrivenPortCoverage(repo?: 'main' | 'community'): ManDrivenPortCoverage {
  const list = manPagePackages(repo)
  const byVia: Record<ManAppVia, number> = {
    corpus: 0, origin: 0, 'gtk-doc': 0, libs: 0, dev: 0, provides: 0, self: 0,
  }
  let witnessed = 0
  const missing: string[] = []
  const gaps: { man: string; why: string }[] = []
  for (const man of list) {
    const w = manAppWitness(man)
    if (w.ok) {
      witnessed++
      if (w.via) byVia[w.via]++
    } else {
      if (missing.length < 25) missing.push(man.name)
      if (gaps.length < 25) gaps.push({ man: man.name, why: w.detail })
    }
  }
  return { definition: 'man→app→hexbit', total: list.length, witnessed, missing, gaps, byVia }
}

/** overlayManDrivenPortCoverage — npm/curl ports in overlay repo; NOT Alpine distro completeness. */
export function overlayManDrivenPortCoverage(): ManDrivenPortCoverage {
  const list = manPagePackages(OVERLAY_REPO)
  const byVia: Record<ManAppVia, number> = {
    corpus: 0, origin: 0, 'gtk-doc': 0, libs: 0, dev: 0, provides: 0, self: 0,
  }
  let witnessed = 0
  const missing: string[] = []
  const gaps: { man: string; why: string }[] = []
  for (const man of list) {
    const w = manAppWitness(man)
    if (w.ok) {
      witnessed++
      if (w.via) byVia[w.via]++
    } else {
      if (missing.length < 25) missing.push(man.name)
      if (gaps.length < 25) gaps.push({ man: man.name, why: w.detail })
    }
  }
  return { definition: 'man→app→hexbit', total: list.length, witnessed, missing, gaps, byVia }
}

export interface SuiteResult {
  tested: number; passed: number; failed: number
  present: boolean; why: string | null
  failures: PackageTest[]
  byCheck: Record<CheckName, number>
}

/** testAllPackages() → every catalogued package tests itself. `tested` is the DENOMINATOR and it is reported:
 *  an absent catalogue yields tested:0 with present:false, which is not "everything passed". */
export function testAllPackages(limitFailures = 25): SuiteResult {
  const { packages, state } = load()
  const failures: PackageTest[] = []
  const byCheck: Record<CheckName, number> = { identity: 0, provenance: 0, closure: 0, compile: 0 }
  let passed = 0
  for (const p of packages) {
    const t = packageSelfTest(p)
    if (t.ok) { passed++; continue }
    for (const c of t.checks) if (!c.ok) byCheck[c.check]++
    if (failures.length < limitFailures) failures.push(t)
  }
  return { tested: packages.length, passed, failed: packages.length - passed, present: state.present, why: state.why, failures, byCheck }
}

// ── THE SAME SUITE, WITHOUT HOLDING THE FRAME. uuidnaOS runs this in a browser, where the cost is not the total
// but the LONGEST UNINTERRUPTED BLOCK: past roughly 50 ms the page stops answering clicks and keystrokes.
//
// MEASURED, AND THE FIRST MEASUREMENT WAS THE WRONG ONE. This tree's standard timing discipline is warm-the-callee
// then take the floor, because a cold pass times the compiler rather than the work — gen-quantum-capacity learned
// that when one cold sweep read 10662 ns per fold against 48-132 ns warm, wide enough to straddle a decade.
// Applied here it reports 25 ms, comfortably under the threshold, and it is measuring a pass that never happens:
// testAllPackages runs ONCE PER PAGE LOAD, so the visitor's only call is the cold one. Cold, in a fresh process:
// 98, 91, 87, 88 ms. Which pass to time is decided by how often the operation runs in production, and warm-floor
// is the right rule for a repeated fold and the wrong one for a once-per-load walk.
//
// So the work is split, and it splits cleanly because every package's self-test is already independent — nothing
// here was ever serial by nature, only by construction. Between chunks it yields to the host so a frame can paint.
//
// ADDITIVE ON PURPOSE: testAllPackages above is unchanged and still synchronous. Turning it async would ripple
// through every caller and its own suite, on a tree several sessions are mid-edit in, to fix a stutter.
//
// AND IT RUNS TO COMPLETION OR IT DOES NOT ANSWER. A chunked walk that returned what it had finished would be a
// partial count wearing a full one's clothes — the absence-as-a-clean-result this catalogue's own `present`/`why`
// pair exists to refuse. There is no early exit: `tested` is the whole catalogue on every path that returns.

/** Hand the host a chance to paint. `scheduler.yield()` where the runtime offers it (Chromium PWAs), otherwise a
 *  macrotask — both return control to the event loop, which is the whole requirement. Not a clock: nothing here
 *  reads elapsed time, so the determinism law is untouched. */
const breathe = (): Promise<void> => {
  const sch = (globalThis as { scheduler?: { yield?: () => Promise<void> } }).scheduler
  if (typeof sch?.yield === 'function') return sch.yield()
  return new Promise<void>((resolve) => { setTimeout(resolve, 0) })
}

/** testAllPackages, chunked so no single block holds the main thread. Same result, same denominator, same refusal
 *  when the catalogue is absent — only the scheduling differs. `chunk` is packages per uninterrupted block. */
export async function testAllPackagesChunked(chunk = 1500, limitFailures = 25): Promise<SuiteResult> {
  const { packages, state } = load()
  // THE PARSE IS ITS OWN BLOCK, and separating it is what actually works. Measured: parsing 7 MB of TSV costs
  // 35 ms and cannot be divided, while the self-test walk costs 56 ms and divides freely. Chunking only the walk
  // left them fused into one 53 ms span — still over the threshold — because load() ran inside the same
  // uninterrupted stretch as the first chunk. One yield here separates the indivisible cost from the divisible
  // one, and the longest block becomes the parse alone.
  await breathe()
  const failures: PackageTest[] = []
  const byCheck: Record<CheckName, number> = { identity: 0, provenance: 0, closure: 0, compile: 0 }
  let passed = 0
  for (let i = 0; i < packages.length; i++) {
    const t = packageSelfTest(packages[i]!)
    if (t.ok) passed++
    else {
      for (const c of t.checks) if (!c.ok) byCheck[c.check]++
      if (failures.length < limitFailures) failures.push(t)
    }
    // the last chunk needs no yield: there is nothing after it to unblock
    if ((i + 1) % chunk === 0 && i + 1 < packages.length) await breathe()
  }
  return { tested: packages.length, passed, failed: packages.length - passed, present: state.present, why: state.why, failures, byCheck }
}
